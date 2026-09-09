# v2.10.1 — one word of the text changes, and the fault is the printed edition's own

*Released 9 September 2026. 118 volumes, 89,512 paragraphs — one word moves.*

**One reading changes in this release**, and it is stated here first. In 25KhuA06
(Paramatthajotikā on the Suttanipāta, Khaggavisāṇasutta, printed p. 58) the edition prints
the closing formula as

    hoti. A yaṁ tāvetthapadato atthavaṇṇanā.

with a space inside *Ayaṁ*, at the end of a line. This is a misprint of the printed edition,
not of the conversion: the original PDF's text layer carries the two tokens `A` and `yaṁ`
with an ordinary inter-word gap, and the page image shows the same. It was reported by the
reader on 9 September and verified at the printed page before anything was touched.

## What was done

**Recorded first.** Erratum **E078** in the register (`data/errata.json`, the site's Errata
page, `docs/PDF_ERRATA.md`): printed reading preserved verbatim, emendation *Ayaṁ* attributed
to the reader, confirmed, cited to p. 58.

**Then applied, at the reader's decision.** The served text now reads *Ayaṁ tāvetthapadato
atthavaṇṇanā*. A new tool, `pipeline/apply_text_errata.py`, applies only register entries
that carry an explicit `apply_from → apply_to` pair, refuses anything ambiguous, and reports
what else the change touches. Here: the corpus paragraph (`site/25KhuA06.json`, ord 38), the
verse store's copy of the paragraph, the page-break map (re-derived by its own tool — the
change is one character shorter, so the two page breaks later in the paragraph moved by one),
the search index and its postings shards, and the three word-frequency counters the
dictionary panel shows (*a*, *yaṁ*, *ayaṁ*; stores on R2, `WLV` 20260909a).

This is the first erratum of the printed edition — as opposed to a corrupted glyph of the
conversion — applied to the served text. The register's rule stands: the printed reading is
never overwritten in the record, and the Errata page shows both.

## What did not change

Nothing else. 118 volumes, 89,512 paragraphs, 54,036 variant readings and 27,153
cross-references are identical to v2.10.0. All gates green (`check_search`, `perf_search`
within baseline, `check_lookup_reach` 12/12, `check_hit_landing`, `check_columns`,
`check_reader_range` 37/37, `check_page_fidelity` 25KhuA06 0 misses).
