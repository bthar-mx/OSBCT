# Closing 2026-09-08 — the hit was marked per text NODE, and the commentary bolds half a word

> # `claude/the_hit_was_marked_per_node_not_per_word.md`. Gate:
> # `pipeline/check_hit_landing.js`, red first on 5 of its 7 assertions.
>
> **Two reader reports, one measured cause, plus a third defect found while
> measuring.** All in `reader2.html`; `search.html` was checked and never had it.
>
> 1. **"Sometimes clicking an occurrence does not take one to the exact place."**
>    **Length was a red herring** — the 2026-08-02 fix already marks first and
>    scrolls to the mark. But `landOn` falls back to centring the paragraph when
>    NO MARK IS MADE, and `markNeedles` matched inside each TEXT NODE separately.
>    The edition bolds the lemma and leaves the enclitic outside — `<b>Bhūtesū</b>ti`
>    — so the word is in the paragraph's text and in no single node.
>    **185,177 of 512,798 bold spans end mid-word, 36.1%; 55-67% in the
>    commentaries.** Worse than a miss: where a word occurs both split and
>    unsplit, only the unsplit one marked and the reader was scrolled THERE —
>    highlighted, but the wrong instance. Now matched across nodes.
> 2. **"Going back to the search box, the dropdown does not appear; I delete the
>    last letters and retype."** The workaround was the diagnosis: `doSearch` ran
>    only on `input`, and `openHit` hides the dropdown. A `focus` handler now
>    re-runs it from cache.
> 3. **Found while measuring: `markInEl` folded diacritics UNCONDITIONALLY**,
>    so with search exact-by-default a reader could search `tassā` and arrive on
>    a highlighted `tassa`. Proven — unaccented `nidhaya` marked all six accented
>    `nidhāya`. The mark now follows `sFold`. Same ground as exact-by-default.
>
> **What the gate cannot do:** jsdom has no layout, so it proves a mark is MADE
> and not that the reader ARRIVES at it. If a hit is ever reported as landing
> wrong while this gate is green, the fault is in `settleTo`, not in marking.

# Closing 2026-09-06 — a phrase is consecutive tokens; the position store was measured and not built

> # READ `claude/search_exact_by_default_and_postings_shards.md`, `claude/sweep_by_gram_not_by_key_list.md`, `claude/names_by_gram_not_whole.md` AND `claude/phrase_positions_are_a_different_semantic.md` BEFORE TOUCHING search.html, reader2.html, panel.js, searchcore.js OR site/index/.
>
> **Item 2 (phrase positions), measured first:** a position store could not
> reproduce the page's phrase answer, because the page's rule was a SUBSTRING
> of the text and positions are TOKENS — `tassa bhagavato` counted 63
> paragraphs of *etassa bhagavato*; *dhammā”ti* was refused for `dhammā ti`.
> `pipeline/measure_phrase_semantics.py` has both columns for 15 phrases.
> Decision put to the reader; **reader chose the token rule**; recommendation
> taken: change the RULE on the text already read, do NOT build the store
> (the byte win is small and unproven by any log).
>
> **Gate red first:** `check_search.js` `truth()` in tokens + 12 assertions
> (`tassa bhagavato` 437/318 not 527/379; `kāyena vācāya` 195/134 not
> 183/124; the line names the rule). Red on `a1cac54f3ff2`:
> `check_search_red_run_2026-09-06_phrase.txt`. **Then:** `searchcore.js`
> `phraseCount()` — the builder's `_TOK`, each word = its resolved keys,
> consecutive; both paths. Result line: `· consecutive words · exact
> diacritics`; help text on both pages; i18n `s_consec` en/es. Gate and the
> Python measurement agree. perf unchanged; all gates green.
>
> **Then, the same day:** the ↑ button on search.html (`1e40d0083`);
> **v2.10.0 released** — three-file bump `9be290313` (stamp `bf930a3f6108`),
> pushed and verified live by the reader (17 checks), tag cut LAST, GitHub
> release published from the pane, Zenodo DOI **10.5281/zenodo.22527597**
> read from the record (version 2.10.0, 451 MB deposit, "New in 2.10.0"
> present) and recorded in CITATION.cff + README (`7f34045c7`, NOT pushed —
> `git push` owed, docs only).
>
> **Later still: the dictionary manifests slimmed** — 653/375/272 KB → 177/65/73
> KB, the per-shard {keys, bytes} the panel never read moved to
> `index.diag.json`; `perf_search` now one ceiling (520 KB) for every row,
> red first on the two lookup rows; `check_lookup_reach` 12/12,
> `check_hw_reach` green; WLV `20260906a`, `panel.js?v=20260906a`, stamp
> `6dec7aac7e71`. `claude/dictionary_manifests_slimmed.md`.
>
> ## Owed / open
>
> 1. ~~r2_upload + push~~ **Done:** uploaded, pushed, `build.json` →
>    `6dec7aac7e71`, the three slim manifests confirmed live from the pane.
>    The upload's MISMATCH (24,885 vs 24,851) is explained in
>    `RUN_ON_HOST.md`: 34 stale `hw/*.json.gz` from the `2fec02624`
>    re-sharding that `rclone copy` never deleted; harmless; a cleanup
>    command is written there, optional.
> 2. The position store (`tq/`) — buildable on the token rule if a measured
>    need appears; not proposed.
> 3. `*vaggo` 23.4 MB of prefix-named postings; `27KhuA08` Contents; the
>    seven `_`-terminal tn/ shards — as in the fourth session's box.

# Closing 2026-09-05 (fourth session) — the section names are one n-gram shard; names.json is the fallback

> # READ `claude/search_exact_by_default_and_postings_shards.md`, `claude/sweep_by_gram_not_by_key_list.md` AND `claude/names_by_gram_not_whole.md` BEFORE TOUCHING search.html, reader2.html, panel.js, searchcore.js OR site/index/.
>
> **State at the start:** HEAD == origin/main == `e54900ddf`, tree clean, live
> `188e9c25d629` verified — the third session's push was done by the reader.
>
> **Measured first** (`perf_search.js`, all within baseline): the largest file
> every cold query read was `index/names.json`, **1.09 MB raw / 255 KB gz**,
> fetched whole before the first query on BOTH pages and scanned on every
> search; the cold median word read 2.28 MB raw, 1.09 of it this file.
>
> **Gates red first.** `check_search.js` had NO assertion on section hits; it
> gained 16 (the painted list must equal what names.json ranks under each
> page's own rule; `abhabbasutta` found in titles only; layer chip; fold
> switch; wiring). `perf_search.js` ceiling 1.25 MB → **520 KB** (the lookup
> rows get 700 KB: `lookup_eval/index.json` is 653 KB on R2, an open item
> named in the file). Red: 4 wiring FAIL + 10 max FAIL — runs delivered as
> `check_search_red_run_2026-09-05_names.txt`, `perf_search_red_run_…_names.txt`.
>
> **Then the store:** `site/index/tn/<gram>.json` — the labels whose folded
> LETTERS contain one n-gram, with all their rows and each row's names.json
> index, deepened until ≤ 200 KB; **890 files, 22.9 MB**; built by
> `pipeline/build_name_shards.py` AFTER `build_name_index.py`, self-verified.
> `searchcore.js names(fq)` picks the cheapest gram and returns an object of
> names.json's shape in its order; the pages' matching/ranking is unchanged.
> **`check_name_shards.js`: 1,712 query × mode combinations vs names.json, 0
> differences** — kept as a gate. After: cold word 2.28 → 1.22 MB raw, 0.57 →
> 0.33 gz, waves 9 → 6; every search −0.24 MB gz, +1 request; max file ≤ 0.51 MB.
> Baseline re-recorded. `verify_live.py` fetches `tn/index.json` (17 checks).
>
> **Committed `aff6dfac1`, stamped `a1cac54f3ff2`, dated 2026-09-05; pushed by
> the reader; deploy #229 (7,635 files under `site/`) landed; `build.json`
> → `a1cac54f3ff2`; `verify_live.py` from the host: LIVE SITE MATCHES (17
> checks, `tn/index.json` included).** Nothing is owed.
>
> ## Open
>
> 1. Phrase positions — measured in the third session, design recorded there
>    (separate `tq/` store fetched only for phrases; builder re-tokenises),
>    not built. Reader's call.
> 2. `*vaggo` still reads 23.4 MB of prefix-named postings for 199 keys. No
>    logs say real queries take that shape; not proposed.
> 3. `27KhuA08` ☰ Contents rebuild — advisory, `RUN_ON_HOST.md` "Not done,
>    deliberately".
> 4. Release bump for the tg/ + tn/ changes (three-file checklist:
>    .zenodo.json, CITATION.cff, i18n.js; tag cut LAST, after the push) —
>    reader's call.
> 5. `lookup_eval/index.json` (653 KB, R2) is now the largest file any page
>    reads; a store change, not done here.
> 6. The seven `_`-terminal tn/ shards over the cap (`na_` 548 KB) are read
>    only when a query offers nothing cheaper; none of the gate's queries does.
>
> Gates run green: check_search, check_name_shards, perf_search (baseline
> re-recorded), check_reader_range 37/37, check_archive_fallback 11/11,
> check_lookup_reach 12/12, check_columns.

# Closing 2026-09-05 (third session) — the sweep reads one n-gram shard; k.txt is the fallback

> # READ `claude/search_exact_by_default_and_postings_shards.md` AND `claude/sweep_by_gram_not_by_key_list.md` BEFORE TOUCHING search.html, reader2.html, panel.js, searchcore.js OR site/index/.
>
> **Confirmed at the start, from a fresh session's own system prompt: §7 begins
> "Diacritics are matched exactly by default". The paste took.** (The header
> comment of the source doc still says "Pasted into the instructions field:
> PENDING" — that line is now stale in the doc, and only there.)
>
> **Measured first** (`perf_search.js`, all within baseline): `*vaggo` 36.9 MB raw
> of which `k.txt` 12.5; `amakasālāna` 17.4 of which 12.5; everything else a
> search reads is ≤ 515 KB. **Gates red first**: check_search 5 FAIL, perf_search's
> new `max` column (largest single file, absolute 1.25 MB) 2 FAIL — runs delivered
> as `check_search_red_run_2026-09-05_lever3.txt` and `perf_search_red_run_…`.
>
> **Then the store:** `site/index/tg/<gram>.txt` — the keys containing one folded
> n-gram, deepened by the following character until ≤ 500 KB (`_` = the key ends
> there); 2,841 files, 197.7 MB on disk, ONE read per query. `searchcore.js
> sweep()` picks the query's cheapest gram and verifies every key by the same
> substring/pattern the k.txt scan used, then sorts — **928 query × mode
> combinations against the k.txt path: 0 differences.** After: `*vaggo` 9.01 →
> 6.36 MB gz, `amakasālāna` 3.99 → 1.35, max file 12.47 → 1.09 MB. Baseline
> re-recorded. `pipeline/build_gram_shards.py`, run AFTER `build_term_postings.py`.
>
> Subtitle fixed: 89,512 paragraphs (verified from the corpus), en and es.
>
> **Committed locally: `5fa09d7cd`, stamped `188e9c25d629`, dated 2026-09-05**
> (sandbox clock checked against the environment date). **NOT pushed — the
> sandbox cannot reach GitHub.** `RUN_ON_HOST.md` has the command. The push adds
> 2,842 files under `site/` (3,902 → 6,744): the Pages file-count clock in
> `deploy-pages.yml` applies; 3,902 deployed, 6,744 is untried.
>
> ## Measured, not built — item 2 (phrase positions)
>
> Positions in the postings would grow `tp/` from 70 to ~117 MB (8,082,470
> occurrences over 5,084,125 (key, paragraph) postings), i.e. **+66 % on every
> single-word search** if they live in the same shards. And the win is smaller
> than the 190-chunk figure suggests: `evaṁ me sutaṁ` draws 212 rows of its 663
> candidates, and those rows need their text anyway. The phrases that DO pay are
> the ones with many non-adjacent co-occurrences: `dhamm* ti` reads 471 chunks
> for 10,609 and-only candidates to draw 261 rows; `bhagavā etadavoca` 1,083
> and-only. **If it is done, do it as a SEPARATE position store fetched only for
> phrases (`tq/`, sharded like `tp/`), so the cold single-word path is untouched
> — and it needs the builder to re-tokenise paragraphs the way
> `build_search_index.py` does, since the per-volume `inv` holds counts only.**
> Not started; the reader decides whether the trade is worth a second 47 MB store.
>
> ## Owed / open
>
> 1. **Push and verify:** `build.json?cb=…` → `188e9c25d629`, then
>    `python3 pipeline/verify_live.py` (it now fetches `tg/index.json` too).
> 2. `index/names.json` is **1.09 MB**, fetched once per page and scanned on every
>    search — found by the new gate; the largest file a search reads now.
> 3. `*vaggo` is still 24.5 MB raw: the postings of its 199 keys lie across ~150
>    prefix-named shards. Prefix-named postings serve a suffix query badly by
>    construction; a suffix-named set would be a second 70 MB store. No logs say
>    real queries take this shape.
> 4. Item 2 above (phrase positions) — measured, design recorded, not built.
> 5. `27KhuA08`'s ☰ Contents — advisory, `RUN_ON_HOST.md` "Not done, deliberately".
> 6. Sandbox note: this session's sandbox could not unlink anything under the
>    mounted repo until deletion was granted (`.git/index.lock` from a plain
>    `git status` blocked `git add`); grant it before the first git write.
>
> Gates run green: check_search, perf_search (baseline re-recorded), check_reader_range
> 37/37, check_archive_fallback, check_lookup_reach 12/12, check_columns.

# Closing 2026-09-05 (second session) — search rebuilt: exact diacritics, no more volume downloads

> # THE SEARCH CHANGED SHAPE TODAY. READ `claude/search_exact_by_default_and_postings_shards.md` BEFORE TOUCHING search.html, reader2.html, panel.js OR site/index/.
>
> **Measured first, on the live site, in the browser pane** (the previous session could
> not load it; that was its tooling): Pages and R2 BOTH compress in transit
> (0.19–0.25), so pre-compression was never the missing win. The cost of a search
> was the per-volume `<VOL>.idx.json`: `tassā` pulled 117 of them, ~40 MB compressed,
> 190 MB parsed, 4.2 s. A dictionary lookup was a chain six round trips deep.
>
> **§0 first, gate red first.** `tassa` ≠ `tassā`: the index keys are now the PRINTED
> tokens, matching is exact by default, folding is the `a = ā` chip (both pages,
> remembered), and every result line names the mode. `check_search.js` failed 15
> assertions on `a164a57cc4c3` (the run is delivered with the session as
> `check_search_red_run_2026-09-05.txt`), and is green now, legacy fallback included.
> 34,134 folded keys (5.3%) were merging printed forms.
>
> **Then the store.** `site/index/tp/` (1,031 postings shards, folded-prefix names,
> ≤ 500 KB) + `site/index/tx/` (1,008 text chunks) replace `tb/`; one shard answers a
> word, text is fetched for the rows drawn. `site/searchcore.js` is the ONE
> implementation — the two pages are its UIs. `tassā`: 43.3 → 2.26 MB on the wire.
> `pipeline/perf_search.js` is the performance gate (`perf_baseline.json`; the
> pre-change numbers are in `perf_baseline_2026-09-05_before.json`).
>
> **Dictionary:** `elook('form')` starts beside the first tier; three manifests warm on
> pointerdown. NO store changed — no `r2_upload.sh`, no `WLV` bump; `panel.js?v=20260905a`.
>
> ## Later the same day (closing 2026-09-05)
>
> * Live and verified: `13d1e3a5b704`, then the checker fix `77803fb2b`, then
>   `120fae346` (chip renamed **"Ignore diacritics"**, result line says
>   "diacritics ignored", tooltip 14.5px) — stamped `bb27db107e1d`. Live check
>   of that last one is owed: `build.json?cb=…` → `bb27db107e1d`, then
>   `python3 pipeline/verify_live.py` from the host.
> * The reader pasted the revised project instructions (§7). This session could
>   not confirm it from the field; a NEW session sees it in its own system
>   prompt — §7 must begin "Diacritics are matched exactly by default". If it
>   still says "essential for usability", the paste did not take.
> * **Cloudflare cache rule for `dict.buddha-dhamma.net` DONE** by the reader
>   (Eligible for cache, Edge TTL 3 days, ignore origin cache-control). Measured
>   after: every dictionary file `HIT` on the second request, 100–145 ms against
>   300–800 ms before. Remember it when the stores change: `r2_upload.sh` +
>   `WLV` bump still cache-bust correctly because the URLs carry `?v=WLV`.
> * `verify_live.py` no longer compares the `panel.js?v=` tag against `WLV` —
>   they version code and data independently (`77803fb2b`).
>
> ## Owed / open
>
> 1. **Lever 3 of the brief — `k.txt`.** Substring and `*`-suffix searches still
>    pull a 12.5 MB (2.7 MB gz) key list and scan it. Unmeasured how often real
>    queries take that path (no logs). An n-gram or suffix structure would end it.
> 2. **Phrase searches read every candidate paragraph** (`evaṁ me sutaṁ`: 190 text
>    chunks). Positions in the postings would decide adjacency without text —
>    a bigger store, a later change. `perf_search.js` is the gate for both.
> 3. `27KhuA08`'s ☰ Contents — advisory, from the first session of the day.
> 4. The site's subtitle still says "83,751 paragraphs"; the corpus has 89,512.
>    Cosmetic, both pages and i18n.js.
> 5. The Cloudflare dashboard cannot be driven from the built-in browser pane
>    (Turnstile refuses it). Use the reader's own Chrome, or Claude in Chrome.
>
> Gates run green this session: check_search, check_lookup_reach (12/12), check_apd_gear,
> check_columns, check_reader_range (37/37 — it had to learn to inline searchcore.js),
> check_archive_fallback, check_dimmed, check_tipplace, check_layout 06Di01, perf_search.
> `git ls-files site/` grows by ~2,040 files (tp/ + tx/) and loses 275 (tb/): if a Pages
> deploy times out at ~11m40s, `deploy-pages.yml`'s note on the file-count clock applies.

# Closing 2026-09-05 (first session) — where things stood

> # ⚠ THE DATES OF THE 2026-09-05 SESSION WERE WRITTEN AS 2026-08-26, AND ARE NOW CORRECTED
>
> **IT HAPPENED AGAIN, in the same repo, the same way, ten days after it was
> written up as a lesson.** The sandbox clock read `Aug 26` for most of the
> session; the real date was **2026-09-05**. I took the clock instead of the
> date the environment stated, and dated the whole session's work to the
> PREVIOUS session's day.
>
> **Extent, measured not estimated: 18 committed lines across 9 files, plus 3 in
> an untracked brief. All corrected.** One reference was left alone because it is
> right: `check_sections.py` saying `27KhuA08` *refused* on 2026-08-26 — that
> refusal really was the earlier session.
>
> **`site/build.json` carried `"date": "2026-08-26"` and was SERVED that way**,
> because `stamp_build.py` takes `datetime.date.today()` from whatever machine
> stamps it. Its comment claims "the date is true by construction — nobody has to
> remember to bump it". **That claim is false on a machine with a wrong clock**,
> and this is the second time this project has been bitten by the same clock.
> Re-stamped `a164a57cc4c3`, dated 2026-09-05.
>
> **The commit messages of 2026-09-05 carry no dates of their own** — checked —
> so unlike the 08-23/08-26 episode below, nothing is stranded in the history.
> The three commits are `613c6362a`, `b9ae2be2a`, `b32c7b2b3`.
>
> ## The 2026-09-05 session — pushed, live, and one re-stamp owed
>
> All three commits are **pushed**. What remains is the date correction above:
> the tree is stamped `a164a57cc4c3` and needs one more `./push.sh`.
>
> **REBASED onto ten commits that arrived from elsewhere while this session was
> running** — `e64d725f2`…`2b3f0203a`, all provenance and licensing work:
> `README.md`, `LICENSE.md`, `CITATION.cff`, `.zenodo.json` and `site/about.html`.
> None of it touches the corpus, the links or the reader, and the rebase was
> clean. **But `site/about.html` is under `site/`, so the stamp had to be redone
> against the merged tree**: `5c3142ddb8be` never existed as a pushed build and
> should not be looked for. The live build after this push is `a164a57cc4c3`, and
> it carries their about-page and citation changes as well as this session's.
>
> What that session did, each part gated red first:
>
> 1. **`27KhuA08` written — 84 section names, distinct 0 → 83.** The four
>    "extra" body headings that made it refuse are all PRINTED IN THE MĀTIKĀ;
>    the Mātikā reader was undercounting for two independent reasons (a
>    run-length heuristic broken by page feet and vagga lines, and `NUM` not
>    matching the range-numbered `8-9. Niddā-suniddāvimānavaṇṇanā`). **The
>    instrument was wrong, not the scan — the fifth rule again.** True count 84
>    on both sides. `19Khu02` and `28KhuA09` re-run byte-identical, so the
>    shared pattern change disturbed neither. **name-match 76.669 → 77.231%
>    over 18,582 links**, up from 17,440.
>    `claude/sections_the_edition_prints.md` §8a.
> 2. **Columns view: the canon was rendering under the Aṭṭhakathā heading.**
>    Reader-reported with a screenshot. **The column ORDER was never wrong** —
>    `.rowline` is `display:contents` and a row emitted more grid items than
>    there were columns, because `block()` prepends a page rule and a band cell
>    can hold several targets. `18Khu01` row 0 emitted 23 items into 2 columns.
>    Fixed with one `.cell` wrapper per layer, so it holds for every band
>    combination. New gate `pipeline/check_columns.js`, red on 5 cases across
>    3 volumes first.
>    `claude/the_columns_were_never_out_of_order.md`.
>
> 3. **Row hover in Columns was dead, and is fixed.** Flagged in that same
>    session as a QUESTION the instrument could not answer — jsdom has no
>    hit-testing — and **answered by the reader looking at the screen**. It had
>    never worked: the handlers sat on the boxless `.rowline`. It hid behind
>    `.para:hover .tools`, which is pure CSS and always worked, so the buttons
>    appeared and the row looked alive.
>
> **`27KhuA08`'s ☰ Contents is NOT yet rebuilt** — advisory, not blocking; see
> `RUN_ON_HOST.md` §3.

> # OF THE FIRST SESSION: NOTHING IS OWED. EVERYTHING OF IT IS SHIPPED AND LIVE.
>
> **Live build `2b856038234a`, dated 2026-08-26**, cache-busted — the
> repository's own. **Verified by content, not only by the stamp:** the served
> `19Khu02.json` carries `"sutta": "Paṭhamapīṭhavimānavatthu"`, a section name
> that did not exist in the corpus that morning.
>
> The `pbreak` rebuild that blocked the stamp was done on the host and **both
> volumes came back byte-identical** (`8cb75b08…`, `8362787b…`) — proof the
> section-name write touched nothing but the `sutta` field. Working tree clean,
> nothing unpushed.
>
> **THE REPO MOVED on 2026-08-25**: `admin-iebh` → the organization
> `bthar-mx`. Remote is `git@github.com:bthar-mx/OSBCT.git`. Pages survived;
> domain verification did not and was redone the same day. See `HANDOFF.md`
> "START HERE (updated 2026-08-25a)". **A stale live build read right after the
> move looks like the transfer broke something — it did not; the first read was
> simply taken before Pages finished.**
>
> ## ⚠ THE DATES IN THIS FILE WERE WRONG AND ARE NOW CORRECTED
>
> The whole session of **2026-08-26** was written up as **2026-08-23**: the
> sandbox clock was three days behind and I inferred the date from file mtimes
> instead of running `date`. Corrected across eleven files (76 occurrences).
> **The COMMIT MESSAGES of that day still say 08-23 and cannot be corrected** —
> `45a557383`, `356121bc8`, `ec25f72c7`, `fb11b1421`, `7649bda6d`, `f4318cb5a`
> and their neighbours are all one day's work, 2026-08-26. Do not read them as
> a separate earlier session.

---

## What happened on 2026-08-26 — one day, in order

1. **`19Khu02 → 27KhuA08`, 437 links** moved off the commentary's reprint and
   onto the comment. Gated red first, four printed pages read.
2. **The worksheet re-measured** — and the answer was bigger than the numbers:
   the pairs fall into **three book shapes**, only one of which is repairable.
3. **`19Khu02 → 28KhuA09`, 350 links.** It mixes shapes A and B; the `tail()`
   guard is the only reason 101 correct links were not moved off the commentary.
4. **Shape C decided: leave as printed.** ~3,000 links closed as *not a defect*.
5. **`mark_condemned.py --verify` was found dead** — crashing, not passing, since
   `verdict` was introduced. No gate ran it.
6. **The silence measured**, and it is not silence: about a third of the
   "uncommented" verses are glossed collectively. **This corrected a claim I had
   made the same morning.**
7. **Section names extracted and written** — `19Khu02` 3 distinct → 444,
   `28KhuA09` 1 → 47, both gated red first and read off printed pages.

**Two of the day's largest findings came from an instrument being wrong, not
from the work planned.** When a measure and a reading disagreed, the reading won
every time.

---

> **Older box, still true where it does not conflict with the above.**
>
> **2026-08-26 — nothing is owed and nothing is broken.** Checked, not assumed:
>
> * **The site was current at the START of the day** at `c97a3f99fdb2`
>   (2026-08-16); it is now `2b856038234a`. The *uncached* fetch that morning
>   still answered `1f2819473f91 / 2026-08-08`, the v2.6.0 stamp. **That is the
>   third time this cache has told this project the deploy failed.** It had not.
>   Never read a deploy without a cache-buster — and give Pages time to finish
>   before concluding anything, which is the fourth instance of the same lesson.
> * **The `hw` store is on R2**, so §3a below is finished, upload and all —
>   see `_xc/hy2/start_here_2026-08-09.md` §0b for the probes and the negative
>   control. `WLV 20260810a` matches the live build.
> * **Every offline gate is green**, re-run today, a week after v2.8.0:
>   `check_links.py` and `check_concordance.py` both "no measure regressed",
>   `check_apd_gear.js` all green, `check_search.js` all green,
>   `check_lookup_reach.js` 12/0.
> * **v2.8.0 is released and deposited**, its DOI read from the record and in
>   `CITATION.cff` (commit `96e1eb0e8`). The niggahita display toggle — edition
>   ṁ ↔ modern ṃ, display only — is live.
>
> ~~**`RUN_ON_HOST.md` is stale**~~ — rewritten 2026-08-26, **and now itself
> history: every step in it was run and none is outstanding.**

---

## 1. ~~Two commands, then you are done for the day~~ — done, 2026-08-09

```bash
cd ~/Documents/OSBCT
rm -f _probe_band_verse.js      # my jsdom probe; the sandbox cannot delete it
./push.sh                       # COMMIT_MSG.bak carries the findings commit
```

That commit changes no text, moves no link, and touches nothing under
`site/` — so there was **no stamp, no Pages run and no R2 sync needed.**
It was the two findings notes plus the corrected handoff.

## 2. Where things stood on 08-09 (superseded by the box above)

**Shipped and clean.** v2.7.0 and v2.7.1 both released, deposited and in the
citation ledger — `10.5281/zenodo.21863987` and `10.5281/zenodo.21864177`, both
read from the record. Live site serves build `92157e0692e0`, verified
cache-busted. R2 fully synced: bucket counts match git, the origin gate is green
at 38/38, and the family store returns 200. Errata register: **49 confirmed, 18
candidate, 1 resolved, of 68.** Gates green — links and concordance "no measure
regressed", search all green, `check_derived --deep` all fresh.

**Nothing is broken and nothing is unshipped.** Everything below is either work
you parked deliberately, or something nobody has looked at yet.

---

## 3. What to tell a new chat

### 3a. ~~The dictionary gate~~ — **DONE 2026-08-10, UPLOAD CONFIRMED 2026-08-26**

Kept because the account of *why* it was five coupled steps is still the best
description of what a store change costs. All five landed: the new `hw` store
(191,928 keys, largest shard 147,337 B under the 150 kB cap), `lem` untouched,
`check_apd_gear.js` extended and run red first, and the R2 upload — the step
that was owed for thirteen days — now verified against the live origin.
**Only item 5 remains, and it always was separate: the §2/§9 redistribution
question.** What follows is the brief as it was written.

It is not vague, it is **five coupled steps, each with a gate**, and one of them
touches production:

1. The key set roughly **quadruples** — 52,757 → 210,111+ headwords. Sharding,
   the 150 KB byte cap and the gz layer all have to be re-measured, not assumed.
2. The store is **served from Cloudflare R2**, not from Pages. So it needs an
   upload and a `WLV` bump, and until both happen production keeps serving the
   old store while the repo looks fixed. That is the failure mode the DPD family
   rebuild already hit once.
3. `panel.js` needs a new lookup path, and the **APD gear list** must learn the
   new sections.
4. `pipeline/check_apd_gear.js` (27 assertions) must be **extended and made to
   fail on the current build first**.
5. **The licence question gets louder.** These sources sit in `lookup_eval/`
   because redistribution is unresolved (§2, §9). Making 163,453 more headwords
   reachable does not change that, but it does raise the stakes of getting it
   settled — and it must be settled separately, not inside this fix.

Two facts that make it tractable, both verified:

* **The safe design is a NEW store, not a wider `lem`.** Key it on the
  dictionaries' own headwords, leave `lem` and the DPD path untouched, and have
  the panel consult the new store when `lem` misses. Additive, so no existing
  gate can regress.
* **That design needs no GoldenDict.** `_panel/build_eval.py:48` reads
  `GD_DIR`, defaulting to a path that no longer exists — re-running the whole
  eval build would need the GoldenDict folder mounted again. But the two files
  the fix needs, `_dictsrc/pced_full.jsonl.gz` (24 MB) and `_dictsrc/pm12e.csv`
  (42 MB), are **in the folder already**.

**One hazard to state up front: `_dictsrc/` is gitignored** (`.gitignore:183`).
Those sources exist on your machine and nowhere else — not in git, not in the
Zenodo deposit. Do not let a session assume it can re-fetch them.

Paste this:

> Continuing OSBCT. Repo at Documents/OSBCT; request access to that folder.
> Read `_xc/hy2/start_here_2026-08-09.md` §0b, then
> `claude/dpd_gates_the_abhidhana.md` in full.
>
> The task: make the Tipiṭaka Pāḷi-Myanmā-Abhidhāna and the APD books reachable
> by their OWN headwords instead of through DPD's index. Today 163,453 of
> 210,111 headwords (77.8%) are unreachable because `_panel/build_eval.py:64–89`
> keys everything on `LEMMAS`, which is built from DPD. §9 makes the Abhidhāna
> the only dictionary that is an authority and ranks DPD lowest; the build
> inverts that.
>
> Constraints, in order:
> 1. Do NOT widen `lem`. Build a SEPARATE store from `_dictsrc/pced_full.jsonl.gz`
>    and `_dictsrc/pm12e.csv` — both already in the folder — keyed on the
>    dictionaries' own accented headwords. Additive, so no existing gate can
>    regress. `_dictsrc/` is gitignored; it exists nowhere else.
> 2. Mind the key case: PCED's `acc` is capitalised (`Yathānisinna`) while
>    `panel.js look()` tries the exact key then `toLowerCase()`. Fold on write.
> 3. Measure sharding and the 150 KB cap BEFORE building. The key set roughly
>    quadruples.
> 4. Extend `pipeline/check_apd_gear.js` and make the new assertion FAIL on the
>    current build first — `yathānisinna` must return the book B and book K
>    entries. Show me the failing run before the fix.
> 5. The store is served from R2: the job is not done until `r2_upload.sh` has
>    run and `WLV` is bumped. Say so explicitly when you reach that point.
> 6. Do not touch the §2/§9 redistribution question. It is separate.
>
> Separately and cheaply, if there is time: a prefix fallback in the word-lookup
> pane before the "no entry" message, showing the corpus forms that begin with
> what was typed. `lookup/freq` already has them — 12 forms of `yathānisinna`,
> 52 occurrences. It is the mirror of the `atappaka` fix at `panel.js:714`.

### 3b. Alternative, if you would rather do the links

> Continuing OSBCT. Repo at Documents/OSBCT; request access to that folder.
> Read `_xc/hy2/start_here_2026-08-09.md` — it supersedes the 08-08 pm handoff
> and carries three retractions from that session, which are there on purpose.
> Then read `claude/vimanavatthu_atthakatha_quotes_then_glosses.md`.
>
> The work I want to start is item 1 of that handoff: the commentary→canon link
> for `19Khu02 → 27KhuA08`, taken as one book. The structure is already measured
> — quotes reprinted under the canon's numbers, then glosses restarting at the
> same numbers — and every link currently lands on the quote. Do not write a
> corpus-wide rule; the offsets take 26 distinct values in that one volume and
> half the quotes have no gloss at all.
>
> Before changing anything, add the failing assertion to `pipeline/check_links.py`
> — `19Khu02` ¶333 must not resolve to `27KhuA08#467`, which is the verse
> reprinted, when the comment is `#511`. Make it fail on the current build first.

**The four rules that were earned the hard way on 08-09, and should be said to
any session that starts fresh:**

1. **Never typeset filler Pāḷi**, not even in a sketch. A mockup of this corpus
   is a claim about this corpus. Pull the paragraph.
2. **Render, do not infer.** Line breaks come from `verse/`, not from the `text`
   field; nothing about the reader can be concluded from the source.
3. **Bust the cache when measuring what is live**, or you are measuring the past.
4. **Never key the canon by paragraph number** — see
   `claude/paragraph_numbers_are_not_a_key.md`. It caught me again on 08-09.

---

## 4. Everything that remains

### Ready to decide — yours, nothing blocks them

* ~~**`none` vs `dim`.**~~ **DECIDED 2026-08-26 by the reader: `dim`.** A dead
  "no commentary" and a condemned "link disputed" both render as the dimmed
  chip. The 3,163 concordance violations land in that style. Not yet
  implemented — and it should still be **rendered and photographed against the
  real reader before it ships**, because the decision was made from a
  description and nothing has ever been drawn. If the two states turn out to be
  indistinguishable in use, that is a fact to bring back, not to absorb.
* **Capping the concordance tooltip.** Seven volume codes for `18Khu01`. Cap at
  three with "+4 more", show a count only, or leave it.
* **The legacy links artifact** `check_derived` flags — loaded by nothing.
  Retire or rebuild.
* **The search heavy half** — per-volume shard split into postings + text. Only
  if common-word searches actually hurt you in use.

### The links — one book at a time

* ~~`19Khu02 → 27KhuA08` first~~ — **DONE 2026-08-26. 437 links moved off the
  reprint and onto the comment**, gated red first, verified on four printed
  pages, 470 uncommented verses deliberately left alone.
  `claude/vimanavatthu_links_moved_to_the_gloss.md`. 16 pairs remain.
* ~~RE-MEASURE THE WORKSHEET~~ — **DONE 2026-08-26.**
  `pipeline/measure_requotation.py` replaces the 08-09 measurement, and the
  worksheet is rewritten. **21,621 direct links, 7,437 on a bare reprint, 3,369
  movable.** The important result is not the count but that the pairs fall into
  **three shapes**, not one:
  * **A** — reprint and comment in separate paragraphs under the same number.
    Repairable, and what 27KhuA08 was. `28KhuA09` 348, `40KhuA21` 765,
    `39KhuA20` 590, `34KhuA15` 511, `38KhuA19` 310.
  * **B** — reprint and comment in the SAME paragraph. Nothing to move.
  * **C** — verses run in a block, the comment is collective and **unnumbered**.
    `42KhuA23` 1103, `30KhuA11` 887, `41KhuA22` 528, `31KhuA12` 433,
    `29KhuA10` 67. **DECIDED 2026-08-26: LEAVE AS IT IS** — "if in the PDF is
    like this, keep it as it is". ~3,000 links closed as *not a defect*.
    Imposing a structure the edition does not print would be principle 3
    reaching the link layer.
* ~~Next: `19Khu02 → 28KhuA09`~~ — **DONE 2026-08-26. 350 links moved**, gated
  red first, printed pages 7, 161 and 191. It **mixes shapes A and B**: 101 of
  its links already landed on a paragraph that reprints *and then comments*, and
  the `tail()` guard is the only reason they were not moved off the commentary.
  A repair script right for one book is not thereby right for the next.
* Next in this line: the three big Jātaka pairs — `40KhuA21` 765 movable,
  `39KhuA20` 590, `38KhuA19` 310 — and `34KhuA15` 511 (Buddhavaṁsa). Check for
  the shape-B mixture in each before applying, as 28KhuA09 required.
* **The shadowing defect FIRST** within the placer work: it moves links off
  paragraphs the edition addressed *by number*, which is the strongest evidence
  there is.
* Then: the three placer recommendations (blocking 20Khu03 vaggas 2–42, computed
  in `_xc/linksk_toc/`), the three inversions (vaggas 18, 34, 35), the
  printed-page spot check `_xc/hy2/20Khu03_vaggas2-42_dryrun.md`, the
  concordance gate when vaggas 2–42 land.
* A printed-page ground-truth sample and provenance tiers in the UI are what
  turn "accurate" into a number.

### Measured, not repaired

* **5,616 CANON PARAGRAPHS ANSWER TO THE PREVIOUS BOOK'S SECTION NAME**, in 44
  volumes — found 2026-08-26. A book's opening paragraphs often carry no `sutta`
  field, and the name was being carried forward across the boundary: all 340
  paragraphs from the start of Petavatthu in `19Khu02` to its first section were
  labelled with a *Vimānavatthu* section. Worst: 19Khu02 678, 01Vin01 399,
  28KhuA09 397, 02ViT02 318, 26VsmT02 299, 25Khu08 295.
  `check_links.py:name_at` now stops at a book boundary — which moved name-match
  from "76.126% of 20,784" to **"76.442% of 16,657", i.e. 4,127 comparisons
  (19.9%) had been made against a name from the wrong book** — but that only
  stops it being *measured*. **The reader still shows those paragraphs under the
  wrong heading.**
  **DIAGNOSED 2026-08-26: it is not a fallback question, it is MISSING DATA.**
  The edition prints a section name there — p.143 of `19Khu02` prints
  `1. Khettūpamapetavatthu` above ¶1 of the Petavatthu, and the corpus has
  nothing. `pipeline/extract_sections.py` reads them from `pali-unicode/`:
  **4,279 printed headings over the 40 canon volumes, 1,301 absent from the
  corpus**, and on `19Khu02` — 3,660 paragraphs carrying **3** section names —
  it finds 501 and resolves **501/501 in order, 0 backwards, 0 unresolvable**.
  **Nothing has been written.** 1,301 is a FLOOR: the extractor is blind in
  20Khu03, 29Abhi01 and 36–40Abhi, which is a fault in the instrument, not
  evidence the edition prints no sections there.
  **APPLIED 2026-08-26 to `19Khu02` (476 names, 3 distinct → 444) and
  `28KhuA09` (51 names, 1 → 47), both gated red first and verified on printed
  pages.** `name-match` went 76.442 → 76.141 (canon side only, half-applied) →
  **76.670** once the commentary side followed — more pairs checkable *and* more
  agreeing, which is the shape a real repair makes.
  ~~**`27KhuA08` REFUSES**: body 83, Mātikā 79.~~ **RESOLVED AND WRITTEN
  2026-09-05: 84 names, distinct 0 → 83.** All four "extras"
  are printed in the Mātikā; the front-matter reader was dropping them, for two
  independent reasons — a run-length heuristic that the printed list's own page
  feet and vagga lines interrupt, and `NUM` not matching the range-numbered
  `8-9. Niddā-suniddāvimānavaṇṇanā`, which also hid that section from the BODY
  scan. Had the Mātikā gate merely counted instead of refusing, those nine
  paragraphs would have shipped under `Uposathāvimānavaṇṇanā`. §8a.
  **115 volumes untouched.** The canon reader is blind in 20Khu03, 29Abhi01 and
  36–40Abhi; the commentary reader has been tried on exactly two volumes.
  Still open: the vagga at ord 483 (`'Itthivimāna      4. Mañjiṭṭhakavagga'`,
  two headings glued), and the three headings stored as numbered paragraphs.
  `claude/sections_the_edition_prints.md` §7–8.
* **The unnumbered-siglum class.** 2,535 paragraphs in 76 volumes carry a `*`,
  `+`, `x` or `( )` mark; **1,427 have no apparatus entry at all.** Two known
  defects: the `+` note absent from `10Ma02.app.json` ¶296, and unnumbered notes
  glued onto numbered ones. `_review/sigla_report.json`.
* **The verse branch for band blocks** (`asSpine`). Confirmed by rendering.
  Needs care: `hide/` maps assume the branch runs, and on 20KhuA01 ten hidden
  ordinals are merge-absorbed into neighbours' verse entries.
* **The hyphen family's remainder** — the consonant branch (1,521, ca-saddo
  class, unadjudicated), `extract.py:204` hygiene, and the undrawn bold spans:
  **remeasure before believing the old ~17%.**
* **18 register candidates**, plus the per-entry audit of the 22 other-layer
  entries. The PDF correction itself (ToUnicode injection, one volume first)
  stays on standby by your decision.

### The reader — found 2026-09-05

* ~~**Columns view put the canon under the Aṭṭhakathā heading.**~~ **FIXED**,
  gated by `pipeline/check_columns.js`. Kept here because the shape of the
  report matters: the reader said "P should be on the left", and **the column
  order was never wrong**. Acting on the report as phrased would have moved the
  headings away from the columns. `claude/the_columns_were_never_out_of_order.md`.
* ~~**Open, and it needs a browser: does row hover work in Columns at all?**~~
  **ANSWERED BY THE READER 2026-09-05 — it did not, and now does.** `.rowline`
  is `display:contents`, generates no box, and the handlers were on it, so
  `mouseenter` never fired. It survived because `.para:hover .tools` is pure CSS
  on a real box: the buttons appeared, so the row looked alive, while the half
  that says *which commentary belongs to this verse* was dead. Handlers moved to
  `.cell`. **The gate proves the wiring and cannot prove the pointer** — jsdom
  has no hit-testing, which is exactly the half that was broken. Instrument for
  the wiring, reader for the pointer; this one needed both.
* **AND THEN THE GATE WENT GREEN WHILE THE FEATURE STAYED INVISIBLE.** The
  reader looked again and said "only one lights", unchanged. Measured in a real
  browser: the row DID go hot and both paragraphs took the highlight — but
  `--hover` is **15 levels out of 255** from the page in dark, so the only
  visible change was the toolbar, which is on one paragraph. Now `--active` with
  a `--faint` outline. **A gate on "does the class get applied" is not a gate on
  the feature**; `check_columns.js` now asserts a minimum token contrast in both
  palettes, threshold derived from the rejected and accepted values, negative
  control run. Three rounds on this one defect, the instrument wrong differently
  each time, and a reader right every time.
* **`check_fn_markers.js` OOMs at node's default heap** and passes at
  `--max-old-space-size=6144`. Pre-existing (it never renders the columns
  branch). Either raise it in the script or say so where the gates are listed —
  right now it looks like a failure.
* **`site/reader/sections/` is stale for all three volumes that got section
  names** — `19Khu02`, `28KhuA09`, `27KhuA08`. Advisory, not blocking. The ☰
  Contents is built by `buildOutline` from `c.headings`, NOT from the `sutta`
  field, so the Contents does not yet list those sections even though the
  citation and title bar do.

### One property of the tooling, recorded so it does not mislead twice

* **`stamp_build.py` IS NOT IDEMPOTENT, and a dry run is not a verification.**
  BUILD is a hash over the 2,086 JSON files under `site/` — and `site/build.json`
  is one of them. So writing the stamp changes the input to the next stamp: after
  `--write` produced `8196f1a01c65`, an immediate dry run reported the tree
  hashing to `2798a6a45568`. **Nothing was wrong.** Do not re-run `--write` "to
  be safe": it produces a spurious new build and dirties a clean tree. And do not
  use a dry run to check that the live stamp matches the tree — it cannot.
  Verify a deploy by fetching `build.json` cache-busted and comparing it to
  `site/build.json`, which is what the committed stamp actually says.

### Never looked at

* **397 note numbers have no marker anywhere in their paragraph** — 0.9% of
  44,917. Either the keying or the extraction is off by a paragraph.
* **The marker→note pairing is unestablished for a third of the corpus** —
  23,099 of 69,000. Closing it means keying notes to the marker's OFFSET.
* **The verse map re-segments markers away from the paragraph text** — 27Khu10
  reports 494 against 564 *the other way*. A question about `verse/`.
* **X007**, now suspect for the same stale-snapshot reason as the nine
  withdrawn. Check it against the live PDF before asking about it again.
* **`corpus/*.errata.json` still feeds the review sheet** — refresh the snapshot
  or have `build_glyph_review.py` read the served text, or the next sheet
  re-raises the nine withdrawn sites.

### Housekeeping

* Nine kintipañha heads still tail-of-paragraph; BLOCKBREAK off; `position`
  unmeasured for 114 of 118 volumes; the WLV gate; the offline package (§2
  permission first); `.gitignore`'s stale store rule.
* **Three gate gaps.** `check_r2_origin.js` cannot tell "reachable and absent"
  from "unreachable" — its negative control passes when the network is down —
  and it covers neither `lookup_eval/family/` nor `form/`. The shape of a real
  404 from that bucket is now known (empty body, no `Content-Type`, unlike a
  present object's `application/gzip`), so the discrimination is cheap to add.
* **And the third, found 2026-08-26: nothing checks that the reverse link maps
  are derivable from the forward ones.** They had drifted again — `32KhuA13`
  was missing 33 entries, and `28KhuA09`/`41KhuA22` had six entries attributed
  to the wrong canon paragraph — all of it predating this session's work and
  none of it noticed by any gate. Rebuilt and now consistent, but the same
  silence will return after the next link repair that forgets `build_rev.py`.
  §7b of `claude/vimanavatthu_links_moved_to_the_gloss.md`.
* `v2.7.0` is a lightweight tag where v2.4.0–v2.6.0 are annotated. It has a DOI.
  **Leave it**; recorded so nobody rediscovers it as a defect.
