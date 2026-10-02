# Static per-text pages — plan (2026-10-01)

## Why

Search Console and `site:` searches (2026-10-01) show the main site has about
seven indexed pages. The reader is **one URL** to a crawler: a position like
`reader2.html#25KhuA06#38` lives in the `#fragment`, which Google ignores, and
the text arrives as JSON after the page loads. So none of the 89,512
paragraphs can come up in a search for a sutta name or a Pāḷi phrase.

The fix is to also publish the text as plain HTML, one page per section, and
keep the interactive reader exactly as it is.

## What exists to build from

* `site/<vol>.json`: `paragraphs[]` (`n`, `sutta`, `vagga`, `book`,
  `printed`, `pdf_page`, `text`, …) and `headings[]`.
* `site/reader/nav.json`: per layer → nikāya → volume → `tree` of
  `{label, key: "<vol>#<n>", kids}`. **30,729 nodes, 25,099 leaves**:
  canon 13,149 · aṭṭhakathā 6,550 · ṭīkā 5,400.
* The cross-layer link maps (`reader/linksk/`), for "commentary on this
  passage" links.

## Proposed output

`pipeline/build_static_pages.py`, run after the data builds and before
`stamp_build.py`, writes:

```
site/t/<vol>/<slug>.html     one page per chosen nav node
site/t/<vol>/index.html      volume table of contents
site/t/index.html            the whole tree (layer → nikāya → volume)
site/sitemap-texts-<layer>.xml   (each under 50,000 URLs)
site/sitemap.xml             becomes a sitemap index listing the above + pages
```

Each page:

* **Title:** `<label> — <volume title> · Sixth Council Tipiṭaka`, e.g.
  `Brahmajālasutta — Sīlakkhandhavaggapāḷi · Sixth Council Tipiṭaka`.
* **Description:** the first ~150 characters of the section's Pāḷi.
* **Body:** the paragraphs as plain `<p id="p<n>">` with printed page numbers.
  `lang="pi"` on the text, plus breadcrumbs (layer › nikāya › volume ›
  parents).
* **Links:** previous / next section; "Aṭṭhakathā / Ṭīkā on this passage"
  from the link maps; **"Open in the reader"** → `reader2.html#<vol>#<n>`.
* **Canonical:** to itself. JSON-LD `BreadcrumbList`.
* **Shared assets:** no reader JavaScript; `fonts/fonts.css` and one small CSS
  file.

## Decisions to make before building

1. **Granularity.** One page per *leaf* (25,099 pages) is the simplest rule.
   But some leaves are tiny (a single verse) and some huge. A rule like "the
   deepest node whose text is ≤ 60 KB, merging tiny siblings" gives fewer,
   better pages. Measure the size distribution first (`_navprobe.py` style).
2. **Hosting size.** Text JSON is ~116 MB; plain HTML adds roughly the same.
   GitHub Pages recommends ≤ 1 GB per published site, and the deploy history
   (DEPLOY workflow notes: 26,576 files, timeouts) says to measure the
   artifact before adding ~25k files. If it is too close: publish `site/t/`
   from Cloudflare Pages (a separate project on a path or subdomain such as
   `texts.buddha-dhamma.net`), with the same generator.
3. **Variant apparatus.** Include it as footnotes (more useful, larger pages)
   or leave it to the reader (smaller pages)?
4. **Niggahita.** Publish the edition's ṁ (as stored), and put "ṃ" in the
   description/keywords so both spellings match.
5. **Gates.** Add the generator to `check_derived.py` (pages older than their
   JSON = stale), and a `verify_static.py` that spot-checks paragraph counts
   per volume against the JSON.

## Rollout

1. Canon only, one nikāya (Dīgha), check in Search Console after 1–2 weeks.
2. Rest of the canon, then aṭṭhakathā, then ṭīkā.
3. Watch Search Console → Pages ("Crawled – currently not indexed" is the
   signal that pages are too thin or too alike).
