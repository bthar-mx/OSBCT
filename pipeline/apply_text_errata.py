#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Apply CONFIRMED edition errata from data/errata.json to the served text.

WRITTEN 2026-09-09 for E078 (25KhuA06, printed p. 58: the edition prints
"hoti. A yaṁ" for "hoti. Ayaṁ"), the first erratum of the printed EDITION —
not of the conversion — that the reader decided should reach the served text.

WHAT THIS IS, AND WHAT IT IS NOT.  Working principle 3 forbids silently
correcting the edition.  This tool does the opposite of silently: it applies
ONLY register entries that carry `apply_from` and `apply_to` (the same idiom
`data/glyph_errata.json` uses for conversion faults), the printed reading stays
in the register beside the emendation and who made it, and the Errata page
shows both.  An entry without those two fields is a belief and changes nothing.

WHERE THE TEXT LIVES, and why each copy is touched here rather than rebuilt:
  site/<VOL>.json              paragraphs[ord].text — the corpus the reader draws
  site/reader/verse/<VOL>.json the verse store repeats the paragraph's text in
                               `before`/`after` items and group padas; the
                               reader draws THOSE when the entry exists
  site/reader/bold/<VOL>.bold.json  character ranges into the raw text: every
                               range after the change shifts by Δ
  site/reader/pbreak/<VOL>.json character offsets into the raw text AND into
                               the drawn items — NOT patched here: re-derive it
                               (`_xc/pagemark/derive.py <VOL> --out
                               site/reader/pbreak`, old file moved away first);
                               `check_derived.py` proves it, and so refuses to
                               stamp until it is done.
The search index (`build_search_index.py <VOL> --write`, then `--terms
--write`, `build_term_postings.py`, `build_gram_shards.py`) and the word-
frequency store are rebuilt/patched by hand after this, as the register entry
records.  `corpus/*.txt` and `corpus/*.json` keep the printed form: they are
the superseded working snapshot (see E040's note), not a served file.

REFUSES rather than guesses: `apply_from` must occur EXACTLY ONCE in the
named paragraph, once in the verse store's items for that ordinal (or not at
all), and `apply_to` must not already be present (idempotence is reported,
not silently repeated).

Usage:  python3 pipeline/apply_text_errata.py [E078 ...] [--write]
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, 'data', 'errata.json')


def load(p):
    return json.load(open(p, encoding='utf-8'))


def dump(o, p, style):
    # match the file's existing style — json.dump's default (`, ` / `: `, one
    # line) is what site/<VOL>.json and the side-maps carry; a re-serialisation
    # must not restyle a 2 MB file for one word
    indent, seps = style
    tmp = p + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as fh:
        json.dump(o, fh, ensure_ascii=False, indent=indent, separators=seps)
    os.replace(tmp, p)


def style_of(p):
    """(indent, separators) of an existing JSON file, so the rewrite is byte-stable."""
    with open(p, encoding='utf-8') as fh:
        head = fh.read(400)
    indent = None
    if head.startswith('{\n') or head.startswith('[\n'):
        line = head.split('\n')[1]
        indent = len(line) - len(line.lstrip(' '))
    seps = (', ', ': ') if '": ' in head else (',', ':')
    if indent is not None: seps = (',', ': ')
    return indent, seps


def apply_one(e, write):
    vol, ord_, a, b = e['volume'], int(e['ord']), e['apply_from'], e['apply_to']
    delta = len(b) - len(a)
    print('%s  %s ord %d  %r -> %r  (Δ%+d)' % (e['id'], vol, ord_, a, b, delta))
    ok = True
    # ---- the corpus paragraph ------------------------------------------------
    cp = os.path.join(ROOT, 'site', vol + '.json')
    C = load(cp)
    t = C['paragraphs'][ord_]['text']
    n = t.count(a)
    if n == 0 and b in t:
        print('   corpus: already applied'); pos = t.find(b)
    elif n != 1:
        print('   corpus: REFUSING — apply_from occurs %d times in ord %d' % (n, ord_)); return False
    else:
        pos = t.find(a)
        if write:
            C['paragraphs'][ord_]['text'] = t[:pos] + b + t[pos + len(a):]
            dump(C, cp, style_of(cp))
        print('   corpus: offset %d of %d%s' % (pos, len(t), '' if write else '  (dry run)'))
    # ---- the verse store -----------------------------------------------------
    vp = os.path.join(ROOT, 'site', 'reader', 'verse', vol + '.json')
    if os.path.exists(vp):
        V = load(vp); ent = V.get(str(ord_))
        hits = []
        if ent:
            for key in ('before', 'after'):
                for i, it in enumerate(ent.get(key) or []):
                    if isinstance(it, str) and a in it: hits.append((key, i))
            for gi, g in enumerate(ent.get('groups') or []):
                for li, it in enumerate(g if isinstance(g, list) else g.get('lines', [])):
                    if isinstance(it, str) and a in it: hits.append(('groups', gi, li))
        if len(hits) > 1:
            print('   verse: REFUSING — apply_from in %d items' % len(hits)); return False
        if hits:
            h = hits[0]
            if write:
                if h[0] in ('before', 'after'):
                    ent[h[0]][h[1]] = ent[h[0]][h[1]].replace(a, b, 1)
                else:
                    g = ent['groups'][h[1]]
                    if isinstance(g, list): g[h[2]] = g[h[2]].replace(a, b, 1)
                    else: g['lines'][h[2]] = g['lines'][h[2]].replace(a, b, 1)
                dump(V, vp, style_of(vp))
            print('   verse: item %s%s' % (h, '' if write else '  (dry run)'))
        else:
            print('   verse: no item carries apply_from (nothing to do)')
    # ---- bold ranges after the change shift by Δ ----------------------------
    bp = os.path.join(ROOT, 'site', 'reader', 'bold', vol + '.bold.json')
    if delta and os.path.exists(bp):
        B = load(bp); rs = B.get(str(ord_)) or []
        moved = [r for r in rs if r[0] >= pos + len(a)]
        inside = [r for r in rs if r[0] < pos + len(a) and r[1] > pos]
        if inside:
            print('   bold: REFUSING — %d range(s) overlap the change: %s' % (len(inside), inside)); return False
        if moved and write:
            for r in rs:
                if r[0] >= pos + len(a): r[0] += delta; r[1] += delta
            dump(B, bp, style_of(bp))
        print('   bold: %d range(s) after the change shifted by %+d' % (len(moved), delta))
    # ---- pbreak: report, never patch ----------------------------------------
    pp = os.path.join(ROOT, 'site', 'reader', 'pbreak', vol + '.json')
    if delta and os.path.exists(pp):
        pb = load(pp).get(str(ord_)) or []
        later = [x for x in pb if x[0] > pos]
        print('   pbreak: %d page break(s) after the change in ord %d — RE-DERIVE '
              'site/reader/pbreak/%s.json (offsets are stale by %+d until then)'
              % (len(later), ord_, vol, delta))
    return ok


def main():
    write = '--write' in sys.argv
    want = [a for a in sys.argv[1:] if not a.startswith('--')]
    E = load(REG)
    todo = [e for e in E['entries'] if e.get('apply_from') and e.get('apply_to')
            and (not want or e['id'] in want)]
    if not todo:
        print('no entry carries apply_from/apply_to' + (' among %s' % want if want else '')); return 1
    bad = 0
    for e in todo:
        if 'ord' not in e:
            print('%s: REFUSING — no `ord`' % e['id']); bad += 1; continue
        if not apply_one(e, write): bad += 1
    if not write:
        print('DRY RUN — pass --write')
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
