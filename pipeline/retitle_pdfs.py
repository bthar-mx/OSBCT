#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Give the 118 Unicode PDFs a real title, for search results and for the
reader's own PDF viewer tab.

WHY (2026-10-02).  Google indexes the PDFs on files.buddha-dhamma.net, and a
PDF's result shows its /Title.  The edition's titles are ASCII stubs from the
2008 Word export -- "Silakkhandhavaggapali ", "Suttanipatatthakatha_01" --
with no diacritics and no hint of what edition they are.

WHAT IT CHANGES, AND NOTHING ELSE:
  * /Title  (document info) and dc:title (XMP)  ->
        "<work> — Sixth Buddhist Council Tipiṭaka (Chaṭṭha Saṅgāyana)"
    where <work> is the name site/downloads.data.json already shows.
  * /Keywords (document info) and pdf:Keywords (XMP), which were empty.
Author, Subject, Producer, Creator, every page, every font and the corrected
/ToUnicode maps are left exactly as they are.

It never writes over a PDF.  It writes copies to OUT (outside the repo) and
VERIFIES each copy against its original: same page count, and for every page
the same content-stream bytes and the same font resources (ToUnicode included),
compared by SHA-256.  A copy that differs in anything but the metadata is
deleted and reported.  Swapping the verified copies in is a separate, manual
step (see the end of the run's output).

Usage:  python3 pipeline/retitle_pdfs.py OUT_DIR [layer ...]     layers: pali atthakatha tika
"""
import hashlib, json, os, sys
import pikepdf

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUFFIX = ' — Sixth Buddhist Council Tipiṭaka (Chaṭṭha Saṅgāyana)'
KEYWORDS = 'Tipiṭaka; Tipitaka; Pāḷi; Pali; Chaṭṭha Saṅgāyana; Chattha Sangayana; Sixth Buddhist Council; Theravāda'


def obj_bytes(o, depth=0, seen=None):
    """Stable digest of a PDF object graph (streams by raw bytes)."""
    seen = seen if seen is not None else set()
    h = hashlib.sha256()
    def walk(x, d):
        if d > 12:
            return
        if isinstance(x, pikepdf.Stream):
            og = x.objgen
            if og in seen and og != (0, 0):
                h.update(b'R%d' % og[0]); return
            seen.add(og)
            h.update(x.read_raw_bytes())
            walk(pikepdf.Dictionary({k: v for k, v in x.items() if k not in ('/Length',)}), d + 1)
        elif isinstance(x, pikepdf.Dictionary):
            for k in sorted(x.keys()):
                h.update(k.encode()); walk(x[k], d + 1)
        elif isinstance(x, pikepdf.Array):
            for v in x:
                walk(v, d + 1)
        else:
            h.update(repr(x).encode())
    walk(o, depth)
    return h.hexdigest()


def page_digests(pdf):
    out = []
    for p in pdf.pages:
        c = p.obj.get('/Contents')
        fonts = p.obj.get('/Resources', {}).get('/Font') if '/Resources' in p.obj else None
        out.append((obj_bytes(c) if c is not None else '', obj_bytes(fonts) if fonts is not None else ''))
    return out


def main():
    if len(sys.argv) < 2:
        print(__doc__); return 2
    out_dir = sys.argv[1]
    layers = sys.argv[2:] or ['pali', 'atthakatha', 'tika']
    data = json.load(open(os.path.join(ROOT, 'site', 'downloads.data.json'), encoding='utf-8'))
    ok = bad = 0
    for layer in layers:
        for e in data[layer]:
            src = os.path.join(ROOT, e['key'])
            dst = os.path.join(out_dir, e['key'])
            if os.path.exists(dst):
                print('skip (exists)', e['key']); ok += 1; continue
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            title = e['work'] + SUFFIX
            with pikepdf.open(src) as pdf:
                before = (len(pdf.pages), page_digests(pdf))
                pdf.docinfo['/Title'] = title
                pdf.docinfo['/Keywords'] = KEYWORDS
                with pdf.open_metadata(set_pikepdf_as_editor=False, update_docinfo=False) as m:
                    m['dc:title'] = title
                    m['pdf:Keywords'] = KEYWORDS
                pdf.save(dst, preserve_pdfa=True)
            with pikepdf.open(dst) as chk:
                after = (len(chk.pages), page_digests(chk))
                got = str(chk.docinfo.get('/Title'))
            if before == after and got == title:
                ok += 1
                print('ok  ', e['key'], '|', title)
            else:
                bad += 1
                os.remove(dst)
                print('FAIL', e['key'], 'pages %d->%d' % (before[0], after[0]), 'title ok' if got == title else 'title wrong')
    print(f'\n{ok} verified, {bad} failed.')
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
