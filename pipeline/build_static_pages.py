#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Plain-HTML pages of the text, one per sutta, for search engines and readers
without JavaScript.  PILOT (2026-10-02): the Dīghanikāya canon only.

WHY.  The reader is ONE URL to a crawler: a position lives in the #fragment,
which Google ignores, and the text arrives as JSON after the page loads.  So
none of the corpus could come up in a search for a sutta's name or a Pāḷi
phrase (Search Console, 2026-10-01: about seven pages of the main site
indexed).  These pages publish the same text as plain HTML; the reader stays
exactly as it is, and every page links into it at the same paragraph.

WHAT IT READS — nothing it does not already publish:
  site/reader/nav.json   titles and structure (layer → nikāya → volume → tree)
  site/<vol>.json        paragraphs (text, n, printed page)
The nav tree's `key` is "<vol>#<index into paragraphs[]>", the same key the
reader's hash uses, so "Open in the reader" lands on the same paragraph.

WHAT IT WRITES:
  site/t/<nik>/index.html            the nikāya's table of contents
  site/t/<nik>/<NN>-<slug>.html      one page per sutta (NN = running number)
  site/sitemap-texts.xml             every page above

Usage:
  python3 pipeline/build_static_pages.py            # writes
  python3 pipeline/build_static_pages.py --check    # builds in memory, reports, writes nothing

The text is published exactly as stored (the edition's ṁ); nothing is
normalised, corrected or translated here.
"""
import html
import json
import os
import re
import sys
import unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'site')
BASE = 'https://buddha-dhamma.net'

# Which nikāyas to build: nav label → (url slug, citation prefix).
# PILOT: Dīgha only.  Add rows here to extend.
NIKAYAS = {
    'Dīghanikāya': ('dn', 'DN'),
}


def slug(label):
    s = re.sub(r'^\d+\.\s*', '', label)
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()
    return re.sub(r'-?sutta$', '', s) or 'text'


def esc(s):
    return html.escape(s, quote=True)


# The variant-note markers the edition glues to the annotated word
# (`Bhaddante”ti1`, `sāvake3`).  SAME rule as the reader's FNM in
# reader/reader2.html (2026-08-08 decisions): a 1–2 digit number after a
# lowercase Pāḷi letter or a closing ) ” ’ », never after an opening bracket,
# space or stop; applied after the leading paragraph number is set aside.
# They are kept, as <sup>, because they are part of the edition's text; the
# notes themselves are in the reader.
FNM = re.compile(r'([a-zāīūṁṅñṭḍṇḷ)”’»])(\d{1,2})(?!\d)')
LEAD = re.compile(r'^\s*(\d+(?:-\d+)?\.)\s*')


def render_text(t):
    m = LEAD.match(t)
    lead, rest = (m.group(1), t[m.end():]) if m else ('', t)
    out, cur = [], 0
    for mm in FNM.finditer(rest):
        a = mm.start(2)
        out.append(esc(rest[cur:a]))
        out.append('<sup class="fnm" title="variant note: see the reader">%s</sup>' % mm.group(2))
        cur = mm.end(2)
    out.append(esc(rest[cur:]))
    return (('<span class="num">%s</span> ' % esc(lead)) if lead else '') + ''.join(out)


def clean_label(label):
    return re.sub(r'^\d+\.\s*', '', label).strip()


CSS = """:root{--fg:#20201c;--mut:#7a736a;--line:#e6e1d8;--accent:#7a5b34;--bg:#faf8f4;--card:#fff}
html[data-theme=dark]{--fg:#e7e2d8;--mut:#9a9184;--line:#332f28;--accent:#cba976;--bg:#171511;--card:#211e18}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:'Gentium Plus',Georgia,serif;line-height:1.7}
.wrap{max-width:760px;margin:0 auto;padding:22px 18px 60px}
nav.crumbs{font:13px/1.5 system-ui,sans-serif;color:var(--mut);margin-bottom:18px}
nav.crumbs a{color:var(--accent);text-decoration:none}
h1{font-size:28px;line-height:1.25;margin:0 0 4px}
.sub{font:13px/1.5 system-ui,sans-serif;color:var(--mut);margin-bottom:18px}
.tools{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 26px;font:14px system-ui,sans-serif}
.tools a{color:var(--accent);border:1px solid var(--line);background:var(--card);border-radius:7px;padding:6px 12px;text-decoration:none}
h2{font-size:19px;margin:30px 0 8px;color:var(--accent);font-weight:normal}
p{margin:0 0 14px}
.pg{font:11px system-ui,sans-serif;color:var(--mut);margin-right:6px;white-space:nowrap;border:1px solid var(--line);border-radius:4px;padding:0 4px}
.pn{font:12px system-ui,sans-serif;color:var(--mut);text-decoration:none;margin-right:4px}
.pager{display:flex;justify-content:space-between;gap:12px;margin-top:40px;padding-top:16px;border-top:1px solid var(--line);font:14px system-ui,sans-serif}
.pager a{color:var(--accent);text-decoration:none}
.foot{margin-top:28px;font:11.5px/1.6 system-ui,sans-serif;color:var(--mut)}
.foot a,.sub a{color:var(--accent)}
sup.fnm{font:10px system-ui,sans-serif;color:var(--mut);margin-left:1px}
.num{color:var(--mut)}
ol.toc{padding-left:1.4em}ol.toc li{margin:4px 0}ol.toc a{color:var(--accent);text-decoration:none}
.vol{margin-top:26px;font:12px system-ui,sans-serif;color:var(--mut);text-transform:uppercase;letter-spacing:.05em}
@media (prefers-color-scheme:dark){html:not([data-theme=light]){--fg:#e7e2d8;--mut:#9a9184;--line:#332f28;--accent:#cba976;--bg:#171511;--card:#211e18}}
"""

THEME_JS = ("<script>try{var t=localStorage.getItem('osbct-theme');"
            "if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>")


def page_shell(title, desc, canon, crumbs, body, ld):
    crumb_html = ' › '.join(
        '<a href="%s">%s</a>' % (esc(u), esc(t)) if u else esc(t) for t, u in crumbs)
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{esc(canon)}">
<meta property="og:type" content="article">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{esc(canon)}">
<link rel="preload" href="/fonts/gentium-plus-latin-ext-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link href="/fonts/fonts.css" rel="stylesheet">
<style>{CSS}</style>
{THEME_JS}
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body>
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">{crumb_html}</nav>
{body}
<div class="foot">Sixth Buddhist Council (Chaṭṭha Saṅgāyana) edition, romanised from the text published by the
Ministry of Religious Affairs, Yangon (Pāḷi Series, 2008). Text as in the edition, without the variant apparatus;
the <a href="/reader/reader2.html">reader</a> has the variants and the commentary links.
A project of the Instituto de Estudios Buddhistas Hispano (IEBH) and BTHAR · <a href="/">buddha-dhamma.net</a></div>
</div>
</body>
</html>
"""


def breadcrumb_ld(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": u}
                                for i, (n, u) in enumerate(items) if u]}


def build(write):
    nav = json.load(open(os.path.join(SITE, 'reader', 'nav.json'), encoding='utf-8'))
    canon_layer = next(L for L in nav['layers'] if L['layer'] == 'canon')
    out_files = {}
    urls = []
    report = []
    for nk in canon_layer['nikayas']:
        if nk['nikaya'] not in NIKAYAS:
            continue
        nslug, cite = NIKAYAS[nk['nikaya']]
        nik_url = f'{BASE}/t/{nslug}/'
        # collect suttas in order across the nikāya's volumes
        suttas = []
        for v in nk['volumes']:
            vol = v['vol']
            data = json.load(open(os.path.join(SITE, vol + '.json'), encoding='utf-8'))
            paras = data['paragraphs']
            idx_by_key = {p['key']: i for i, p in enumerate(paras)}
            tree = v['tree']
            for ti, node in enumerate(tree):
                start = idx_by_key[node['key']]
                end = idx_by_key[tree[ti + 1]['key']] if ti + 1 < len(tree) else len(paras)
                sections = {}
                for kid in node.get('kids', []):
                    k = idx_by_key.get(kid['key'])
                    if k is not None and start <= k < end:
                        sections.setdefault(k, clean_label(kid['label']))
                suttas.append(dict(vol=vol, vtitle=v['title'], label=clean_label(node['label']),
                                   key=node['key'], paras=paras[start:end], start=start,
                                   sections=sections))
        for i, s in enumerate(suttas):
            s['num'] = i + 1
            s['file'] = '%02d-%s.html' % (s['num'], slug(s['label']))
            s['url'] = f"{nik_url}{s['file']}"

        # sutta pages
        for i, s in enumerate(suttas):
            title = f"{s['label']} ({cite} {s['num']}) · {nk['nikaya']} · Sixth Council Tipiṭaka"
            first = re.sub(r'^\d+(-\d+)?\.\s*', '', s['paras'][0]['text']) if s['paras'] else ''
            desc = (f"{s['label']}, {cite} {s['num']}, {s['vtitle']}: full Pāḷi text, Sixth Council edition. "
                    + first)[:300].rsplit(' ', 1)[0] + '…'
            parts = [f"<h1 lang=\"pi\">{esc(s['label'])}</h1>",
                     f"<div class=\"sub\">{cite} {s['num']} · <span lang=\"pi\">{esc(s['vtitle'])}</span> · "
                     f"{len(s['paras'])} paragraphs</div>",
                     f"<div class=\"tools\"><a href=\"/reader/reader2.html#{esc(s['key'])}\">Open in the reader "
                     f"(variants, commentary)</a><a href=\"./\">All {cite} suttas</a></div>",
                     '<main lang="pi">']
            last_pg = None
            for j, p in enumerate(s['paras']):
                k = s['start'] + j
                if k in s['sections'] and s['sections'][k] != s['label']:
                    parts.append(f"<h2>{esc(s['sections'][k])}</h2>")
                pg = ''
                if p.get('printed') is not None and p['printed'] != last_pg:
                    pg = f"<span class=\"pg\" lang=\"en\" title=\"printed page where this paragraph begins\">p. {p['printed']}</span> "
                    last_pg = p['printed']
                parts.append(f"<p id=\"p{p['n']}\">{pg}{render_text(p['text'])}</p>")
            parts.append('</main>')
            prev = suttas[i - 1] if i else None
            nxt = suttas[i + 1] if i + 1 < len(suttas) else None
            parts.append('<div class="pager">'
                         + (f"<a href=\"{prev['file']}\">← {cite} {prev['num']} {esc(prev['label'])}</a>" if prev else '<span></span>')
                         + (f"<a href=\"{nxt['file']}\">{cite} {nxt['num']} {esc(nxt['label'])} →</a>" if nxt else '<span></span>')
                         + '</div>')
            crumbs = [('buddha-dhamma.net', '/'), ('Tipiṭaka', '/t/'), (nk['nikaya'], './'),
                      (s['vtitle'], None)]
            ld = breadcrumb_ld([('Sixth Council Tipiṭaka', BASE + '/'), (nk['nikaya'], nik_url),
                                (s['label'], s['url'])])
            out_files[os.path.join('t', nslug, s['file'])] = page_shell(
                title, desc, s['url'], [(t, u) for t, u in crumbs if t != 'Tipiṭaka'], '\n'.join(parts), ld)
            urls.append(s['url'])
            report.append(f"{cite} {s['num']:>2}  {s['label']:<28} {len(s['paras']):>4} ¶  "
                          f"{sum(len(p['text']) for p in s['paras']):>7} chars")

        # nikāya index
        body = [f"<h1 lang=\"pi\">{esc(nk['nikaya'])}</h1>",
                f"<div class=\"sub\">Pāḷi text of the {len(suttas)} suttas, Sixth Council edition · "
                f"plain pages; the <a href=\"/reader/reader2.html\">reader</a> has variants and commentary</div>"]
        cur = None
        for s in suttas:
            if s['vtitle'] != cur:
                if cur is not None:
                    body.append('</ol>')
                body.append(f"<div class=\"vol\" lang=\"pi\">{esc(s['vtitle'])}</div><ol class=\"toc\" start=\"{s['num']}\">")
                cur = s['vtitle']
            body.append(f"<li><a href=\"{s['file']}\" lang=\"pi\">{esc(s['label'])}</a></li>")
        body.append('</ol>')
        title = f"{nk['nikaya']}: Pāḷi text of the {len(suttas)} suttas · Sixth Council Tipiṭaka"
        desc = (f"The {nk['nikaya']} ({cite} 1–{len(suttas)}) in the Sixth Buddhist Council (Chaṭṭha Saṅgāyana) "
                f"edition: full Pāḷi text of every sutta, one page each.")
        out_files[os.path.join('t', nslug, 'index.html')] = page_shell(
            title, desc, nik_url, [('buddha-dhamma.net', '/'), (nk['nikaya'], None)], '\n'.join(body),
            breadcrumb_ld([('Sixth Council Tipiṭaka', BASE + '/'), (nk['nikaya'], nik_url)]))
        urls.insert(0, nik_url)

    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<!-- Written by pipeline/build_static_pages.py; do not edit by hand. -->',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f'  <url><loc>{u}</loc></url>' for u in urls]
    sm.append('</urlset>')
    out_files['sitemap-texts.xml'] = '\n'.join(sm) + '\n'

    total = sum(len(c.encode('utf-8')) for c in out_files.values())
    print('\n'.join(report))
    print(f"\n{len(out_files)} files, {total/1024:.0f} KB, {len(urls)} URLs in sitemap-texts.xml")
    if write:
        for rel, content in out_files.items():
            path = os.path.join(SITE, rel)
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
        print('written under site/')
    return 0


if __name__ == '__main__':
    sys.exit(build('--check' not in sys.argv))
