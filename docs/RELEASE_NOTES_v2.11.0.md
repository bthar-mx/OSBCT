v2.11.0 — the reader's word pane, and the Dīghanikāya as plain pages

*Released 21 October 2026. 118 volumes, 89,512 paragraphs — no text changed.*

**No reading changes in this release.** 118 volumes, 89,512 paragraphs, 54,036 variant readings and
27,153 cross-references are identical to v2.10.1. Everything new is in how the text is read.

## The word pane

Click a word in the reader and the pane on the right opens. In this release:

- **The Abhidhāna tab reads IEBH's edition** of the *Tipiṭaka Pāḷi-Myanmā Abhidhāna*
  (abhidhana.buddha-dhamma.net): romanised Pāḷi, Burmese, and draft Spanish and English renderings,
  each marked as a draft. It opens first. The older Burmese-only digitisation is still there, folded.
- **Links into the IEBH grammars** at gramaticas.buddha-dhamma.net: "Grammatical term ↗" when the clicked
  word is itself a term of the IEBH glossary, and "Root √… ↗" beside DPD's root, matched by gaṇa to the
  Saddanīti roots. The index is shipped as `site/reader/gram-index.json` (`_panel/build_gram_index.py`),
  because that site cannot be read from another one.
- **DPD entries by headword** (ālapana finds ālapana 1 and 2), with the clicked form marked in DPD's own
  declension table.
- **The clicked word is also selected**, so ⌘C copies it and Padakosa's ⌃⌥P can look it up.
- **A sandhi line** in the header, for the 363,254 corpus forms that have no DPD headword: the IEBH sandhi
  solver's reading where it has one of the strong kinds (decided by IEBH, an IEBH pattern, Nandisena's bank,
  signed — 33,030 forms); otherwise DPD's own split, labelled as DPD's and unverified; the solver's automatic
  proposals only folded, and only where it signals sandhi. Built by `_panel/build_sandhi.py`.
- **A Sandhi button** under that line runs the IEBH solver on the clicked word, any word, in the reader's
  browser. The engine is an unmodified copy of the one published at
  gramaticas.buddha-dhamma.net/recursos/solucionador/ (bthar-mx/gramaticas-pali-es 54e2cbe, engine
  version 2.4, CC BY-NC-ND 4.0), made by `_panel/build_solver.py`: `site/reader/sandhi-solver.js` and its
  lexicon. Nothing is downloaded until the button is pressed; the first press loads the engine and the
  parts of the lexicon that word needs.

The sandhi data and the solver's lexicon were built with DPD (DPD's split; DPD's form list in the
lexicon), so both are in the evaluation store, `stores/lookup_eval/`, served from R2 and shown only while
that store is on — as the DPD tab is. In the solver's mode (solo-canon) DPD takes no part in a reading.

## Plain-text pages

- **The Dīghanikāya as 34 plain HTML pages**, one per sutta, with an index (`site/t/dn/`,
  `pipeline/build_static_pages.py`): sections as headings, the printed page at each paragraph, variant
  markers kept, and under each paragraph a link to its commentaries; "Open in the reader" lands on the
  same paragraph.
- **For search engines**: `robots.txt`, `sitemap.xml` and `sitemap-texts.xml`, a description and a
  canonical URL on every page, and a "Study tools" block on the landing page.
- `pipeline/retitle_pdfs.py` sets the title of each of the 118 Unicode PDFs to its work's name.

## How to cite

Concept DOI [10.5281/zenodo.21495338](https://doi.org/10.5281/zenodo.21495338) (always the newest
version); this version's DOI is added to `CITATION.cff` once Zenodo has minted it.
