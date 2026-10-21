# Sixth Buddhist Council Tipiṭaka (Chaṭṭhasaṅgītipiṭaka)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21495338.svg)](https://doi.org/10.5281/zenodo.21495338)

A searchable, cross-referenced **Unicode** corpus of the Sixth Buddhist Council recension of the
Pāḷi Tipiṭaka, together with its **Aṭṭhakathā** (commentaries) and **Ṭīkā** (subcommentaries) —
118 volumes in all.

**Live site:** https://buddha-dhamma.net

A project of the Instituto de Estudios Buddhistas Hispano (IEBH) and Buddhismo Theravāda
Hispano A.R. (BTHAR).

---

## What this is

The source edition (Ministry of Religious Affairs, Yangon; Pāḷi Series, romanised from the
Myanmar-script Sixth Council edition) was distributed as PDFs whose text layer used a legacy
8-bit font (VZTimes) mapped to Latin-1 code points instead of Unicode — so copying *nibbāna*
produced `nibbÈna`. This project converts that legacy text to verified Unicode, extracts the
structure of the edition, links the three layers, and publishes the result as a static website.

Key facts:

- **118 volumes** — 40 Tipiṭaka, 52 Aṭṭhakathā, 26 Ṭīkā
- **89,512 paragraphs**, hierarchically addressed and anchored to printed page numbers
- **54,000+ variant readings** extracted from the footnote apparatus, tagged by witness siglum
- **~94%** of canon paragraphs linked to their commentary (interval model), and onward to subcommentary
- Pages render **pixel-identically to the print** — only the text layer was corrected

The method, verification, and known limitations are documented in [`docs/`](docs/).

## Repository layout

| Path | Contents |
|---|---|
| `site/` | the complete static website (reader, search, downloads, about) — directly deployable |
| `site/index/` | per-volume search shards + diacritic-folded term index |
| `site/reader/` | reader app, cross-layer link shards, variant apparatus |
| `data/` | canonical data: `concordance.json` (volume map), `links_all.json` (all cross-layer links) |
| `pipeline/` | extraction code (`extract.py`); see [`docs/`](docs/) for the full method |
| `docs/` | method and verification reports |

The source and Unicode PDFs are **not** in this repository (freely distributable on the terms
above; served from Cloudflare
R2 and archived on Zenodo). See `.gitignore`.

## Deploying

`site/` is a self-contained static site. See [`site/DEPLOY.md`](site/DEPLOY.md). In short: it is served
by GitHub Pages, published from `site/` by `.github/workflows/deploy-pages.yml` on every push to
`main`; the downloadable PDFs are on Cloudflare R2 (see
[`site/DOWNLOADS-R2-SETUP.md`](site/DOWNLOADS-R2-SETUP.md)). The Cloudflare Pages route described in
`DEPLOY.md` is an alternative and is not live.

## Source & licensing

**Text.** The Pāḷi text is from the Sixth Council edition published by the Ministry of Religious
Affairs, Yangon, for free distribution as a Gift of the Dhamma. The edition's own notice permits
duplication for **free, non-commercial distribution**, and this project redistributes it on those
terms. It is *not* public domain. Anyone intending commercial reuse should confirm the applicable
terms with the original publisher rather than relying on this repository — see
[`LICENSE.md`](LICENSE.md).

**This project's code and data** (the pipeline, the website, the extracted structure, links, and
apparatus) are released under the licence in [`LICENSE.md`](LICENSE.md).

## How to cite

See [`CITATION.cff`](CITATION.cff). Each release is archived on Zenodo. Cite the **concept DOI**
[10.5281/zenodo.21495338](https://doi.org/10.5281/zenodo.21495338), which always resolves to the
newest version; individual versions have their own DOIs
([v2.11.0](https://doi.org/10.5281/zenodo.23541744),
[v2.10.0](https://doi.org/10.5281/zenodo.22527597),
[v2.9.0](https://doi.org/10.5281/zenodo.22421817),
[v2.8.0](https://doi.org/10.5281/zenodo.21967270),
[v2.7.1](https://doi.org/10.5281/zenodo.21864177),
[v2.7.0](https://doi.org/10.5281/zenodo.21863987)).

## Contact

admin@iebh.org · admin@bthar.org
