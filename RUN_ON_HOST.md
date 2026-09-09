# Run on the host — 2026-09-09: E078 applied, v2.10.1

Four commands, in this order — upload BEFORE push, tag AFTER push:

```bash
cd ~/Documents/OSBCT
./pipeline/r2_upload.sh      # rclone: 3 freq shards change (a_, yam, ay) — the WLV bump
                             # 20260909a means nothing until these are in the bucket
git push                     # v2.10.1: E078, WLV 20260909a, panel.js?v=20260909a
git tag v2.10.1
git push origin v2.10.1
```

Then say so in the chat: the GitHub release (notes in `docs/RELEASE_NOTES_v2.10.1.md`)
and the Zenodo DOI are done from the browser pane, and the DOI is recorded in
CITATION.cff + README afterwards.

Live checks, cache-busted, after Pages has had its minutes:

```
https://buddha-dhamma.net/build.json?cb=…            -> {"build": "319bd7d32d81", "date": "2026-09-09"}
https://buddha-dhamma.net/reader/reader2.html?cb=…#25KhuA06#38   scroll to p. 58:
                                                        "hoti. Ayaṁ tāvetthapadato"
https://dict.buddha-dhamma.net/lookup/freq/ay.json?v=20260909a   -> "ayaṁ":[23595,…
python3 pipeline/verify_live.py
```

---

# Run on the host — 2026-09-06, later: the dictionary manifests

Two commands, in this order:

```bash
cd ~/Documents/OSBCT
./pipeline/r2_upload.sh      # rclone: 3 manifests + 3 index.diag.json change
git push                     # WLV 20260906a, panel.js?v=20260906a, stamp 6dec7aac7e71
```

Then `build.json?cb=…` → `6dec7aac7e71`, `python3 pipeline/verify_live.py`
(it prints `WLV 20260906a   panel.js?v=20260906a`), and one cache-busted
fetch of the store:

```
https://dict.buddha-dhamma.net/lookup_eval/index.json?v=20260906a
   ->  176,574 bytes (was 652,959); "shards":{"form":{"ph":1,…
```

If that still shows `{"keys":…,"bytes":…}` entries, the upload did not run.

**Done 2026-09-06: uploaded and pushed; all three slim manifests confirmed
live from the pane (176,574 bytes); `build.json` → `6dec7aac7e71`.**

**The upload's `!! MISMATCH` — lookup_eval 24,885 in the bucket, 24,851
tracked — is EXPLAINED and predates today.** The 34 extra objects are exactly
the 34 `hw/*.json.gz` shards that commit `2fec02624` deleted from git when
`hw/` was re-sharded; `rclone copy` never deletes, so they stayed in the
bucket. No manifest names them, so nothing fetches them. To make the count
honest again (optional, any time):

```bash
cd ~/Documents/OSBCT
git log --diff-filter=D --name-only --pretty=format: -- stores/lookup_eval site/lookup_eval \
  | grep . | sed 's#^site/#stores/#' | sort -u \
  | comm -23 - <(git ls-files stores/lookup_eval | sort) \
  | sed 's#^stores/lookup_eval/##' > /tmp/stale_r2.txt
wc -l /tmp/stale_r2.txt          # must say 34
rclone delete osbct-r2:osbct-dict/lookup_eval --files-from /tmp/stale_r2.txt --dry-run
rclone delete osbct-r2:osbct-dict/lookup_eval --files-from /tmp/stale_r2.txt
```

Then the next `r2_upload.sh` run reports 24,851 = 24,851.

---

# Run on the host — 2026-09-06, the v2.10.0 release

Order matters: push, verify, THEN tag.

```bash
cd ~/Documents/OSBCT
git push
```

Wait for the deploy; `build.json?cb=…` must read **`bf930a3f6108`**, and the
footer of every page `v2.10.0`. Then `python3 pipeline/verify_live.py`.
Only when that says LIVE SITE MATCHES:

```bash
git tag v2.10.0 && git push origin v2.10.0
```

Then on GitHub (browser pane is fine): Releases → Draft a new release → tag
`v2.10.0` → title `v2.10.0 — a phrase is consecutive words` → body from
`docs/RELEASE_NOTES_v2.10.0.md` → Publish. Zenodo mints the DOI from the
published release; read it FROM THE RECORD (zenodo.org, Versions panel) and
add it to CITATION.cff (identifiers list, description "Zenodo archive of
v2.10.0 (6 September 2026)") and the README "How to cite" list. Check the
record says version 2.10.0 with the "New in 2.10.0" paragraph.

---

# Run on the host — 2026-09-06

```bash
cd ~/Documents/OSBCT
git push
```

Plain `git push`; the commit is made. Stamped **`e42bb5313b1d`, dated
2026-09-06** (the second stamp of the day: the ↑ button on search.html after
the phrase rule). Code-only under `site/` (searchcore.js, search.html,
reader2.html, i18n.js, the stamped pages) — no new files. Then:

```
https://buddha-dhamma.net/build.json?cb=<anything-new>
   ->  {"build": "18920c3b3e15", "date": "2026-09-06"}
https://buddha-dhamma.net/search.html?cb=<anything-new>
   ->  search `tassa bhagavato`: 437 occurrence(s) in 318 paragraph(s), 89 volume(s)
       — and 1,727 paragraph(s) with all 2 words, not adjacent · consecutive words · exact diacritics.
       (was 527 / 379 / 1,666 under the substring rule)
```

Then `python3 pipeline/verify_live.py` from the host.

---

# Run on the host — 2026-09-05 (fourth session)

## The command

```bash
cd ~/Documents/OSBCT
git push
```

**Plain `git push`, not `./push.sh`.** The commit is already made from the
sandbox, which cannot reach github.com — HEAD's subject is "Search: the
section names are read as one n-gram shard (tn/), not the 1.09 MB
names.json". `./push.sh` would stop at guard 2, correctly, because
`COMMIT_MSG.bak` is HEAD's message.

The tree is stamped **`a1cac54f3ff2`, dated 2026-09-05** (sandbox clock
checked against the environment's date: both 2026-09-05). Do not re-stamp.

**This push adds 891 files under `site/index/tn/`** (`git ls-files site/`
6,744 → 7,635, +23 MB raw). The third session's 2,842-file push deployed in
1m45s; if this one times out at ~11m40s, start a FRESH "Run workflow", never
"Re-run failed jobs". Then, cache-busted:

```
https://buddha-dhamma.net/build.json?cb=<anything-new>
   ->  {"build": "a1cac54f3ff2", "date": "2026-09-05"}
https://buddha-dhamma.net/search.html?cb=<anything-new>
   ->  search `abhabbasutta`: "Found in the section titles" — 3 sections
       (Network tab: index/tn/index.json and ONE tn/*.json, no index/names.json)
   ->  search `vagga`: Sections — 2590, showing 40, above the text rows
```

Then `python3 pipeline/verify_live.py` from the host — it now fetches
`index/tn/index.json` as well (17 checks).

---

# Run on the host — 2026-09-05 (third session)

## The command

```bash
cd ~/Documents/OSBCT
git push
```

**Plain `git push`, not `./push.sh`.** The commit is already made — HEAD is
`5fa09d7cd`, "Search: the substring / *-suffix sweep reads one n-gram shard
(tg/), not the 12.5 MB k.txt" — from the sandbox, which cannot reach github.com.
`./push.sh` would stop at guard 2, correctly, because `COMMIT_MSG.bak` is HEAD's
message.

The tree is stamped **`188e9c25d629`, dated 2026-09-05** (sandbox clock checked
against the environment's date: both 2026-09-05). Do not re-stamp.

**This push adds 2,842 files under `site/index/tg/`** (`git ls-files site/`
3,902 → 6,744, +198 MB raw). The Pages file-count clock note in
`deploy-pages.yml` applies: if the run times out at ~11m40s, start a FRESH
"Run workflow", never "Re-run failed jobs". Then, cache-busted:

```
https://buddha-dhamma.net/build.json?cb=<anything-new>
   ->  {"build": "188e9c25d629", "date": "2026-09-05"}
https://buddha-dhamma.net/search.html?cb=<anything-new>
   ->  search `*vaggo`: 199 occurrence(s) in 109 paragraph(s), 55 volume(s) · exact diacritics
       (Network tab: index/tg/index.json and ONE or a few tg/*.txt, no tp/k.txt)
   ->  search `amakasālāna`: 44 occurrence(s) in 38 paragraph(s), 26 volume(s)
   ->  subtitle reads 89,512 paragraphs
```

Then `python3 pipeline/verify_live.py` from the host — it now fetches
`index/tg/index.json` as well.

---

# Run on the host — 2026-09-05 (second session)

## The command

```bash
cd ~/Documents/OSBCT
git push
```

(Evening: the same command again for `120fae346` + this note — the chip rename,
stamp `bb27db107e1d`. Then `build.json?cb=…` should read `bb27db107e1d`.)

**Plain `git push`, not `./push.sh`.** The commit is already made — HEAD, whose subject is
"Search: exact diacritics by default; postings shards + text chunks replace
per-volume downloads" — by `./push.sh` run from the sandbox, which committed and
then could not reach github.com (no DNS there). Running `./push.sh` again would
stop at guard 2, correctly, because `COMMIT_MSG.bak` is the message of HEAD.

The tree is stamped **`13d1e3a5b704`, dated 2026-09-05** (sandbox clock checked
against the environment's date: both 2026-09-05). Do not re-stamp: nothing under
`site/` has changed since, and `stamp_build.py` is not idempotent.

Then, **once Pages has finished** — this deploy adds ~2,040 files under
`site/index/` (tp/ + tx/) and removes 275 (tb/), so give it the four minutes and
more — check cache-busted:

```
https://buddha-dhamma.net/build.json?cb=<anything-new>
   ->  {"build": "13d1e3a5b704", "date": "2026-09-05"}
https://buddha-dhamma.net/search.html?cb=<anything-new>
   ->  search `tassā`: 4,322 occurrence(s) … · exact diacritics
       click `a = ā`, again: 36,644 … · diacritics folded
```

Then `python3 pipeline/verify_live.py` from the host — it now fetches
`searchcore.js` and `index/tp/index.json` as well.

## Then paste the project instructions

§7 was revised (folding is no longer "essential for usability"). The whole
revised file was delivered as `OSBCT_Project_Instructions.md` in the session
outputs: replace the project's knowledge copy, paste it into the "Set project
instructions" field, and update the header line that says PENDING.

---

# Run on the host — 2026-09-05 (first session) — DONE, kept as record


## The command

```bash
cd ~/Documents/OSBCT
./push.sh
```

`COMMIT_MSG.bak` carries **the date correction**. The three earlier commits of
this session are already pushed; this last one fixes dates that were written as
`2026-08-26` when the real date was `2026-09-05`, and re-stamps `build.json`,
whose `date` field had shipped wrong.

The build IS stamped `a164a57cc4c3`, so guard 3 will pass, and
`push.sh` clears the stale zero-byte `.git/index.lock` itself — expected, no
action needed.

Then, **once Pages has finished**, check cache-busted — and check **both** fields
this time:

```
https://buddha-dhamma.net/build.json?cb=<anything-new>
   ->  {"build": "a164a57cc4c3", "date": "2026-09-05"}
```

The `date` is the one that was wrong. It comes from the clock of whatever machine
runs `stamp_build.py`, and an agent sandbox's clock was ten days behind.

The previous deploy took about **four minutes**; the first two reads still
answered the old stamp. That is now the fifth instance of the same lesson. Do not
conclude a deploy failed from an early read.

## Then look at Columns again — the one thing no gate covers

Open `12Sam01` in **Columns** with **P and A** on, and hover a Pāḷi paragraph.

**Both paragraphs in that row should now take a clearly lighter panel together**,
with a defined outline — not just the one you are pointing at.

The wiring was already right before this build; what changed is that the panel
is now `--active` with a `--faint` outline instead of `--hover` with a `--line`
one. Measured in a real browser, the old pair sat **15 levels out of 255** from
the page in the dark theme, which is why it read as "only one lights": the only
unmistakable change was the toolbar, and the toolbar appears on one paragraph.
The new pair is 23 levels dark, 26 light.

If it is still hard to see, say so — the number is now gated
(`check_columns.js`, minimum 20, negative control run against the old value), so
raising it is a one-line change to a threshold that is documented as derived
from your reading rather than picked.

Everything else there was checked and is fine: the columns hold their own layers
(reported fine), the spacing in a cell holding a long commentary run (reported
fine), and the hover buttons (confirmed by screenshot, correctly layer-aware —
A|T on the canon paragraph, P|T on the commentary).

**Why this still needs an eye.** `pipeline/check_columns.js` proves the wiring —
an event arriving at a cell reaches the row — but jsdom has no layout and no
hit-testing, so it cannot prove the pointer would ever reach the cell. That is
exactly the half that was broken, and it was a reader looking at the screen that
found it. Instrument for the wiring, reader for the pointer.

## Not done, deliberately

* **`site/reader/sections/` was NOT rebuilt** for `19Khu02`, `28KhuA09` or
  `27KhuA08`. `check_derived` reports it as ADVISORY, not blocking. The `sutta`
  field feeds the citation and title bar — verified by rendering: `27KhuA08` ¶244
  offers `Aṭṭhakathā, Dāsivimānavaṇṇanā § (p.82)` and ¶362
  `Aṭṭhakathā, Niddā-suniddāvimānavaṇṇanā § (p.106)`, both page numbers matching
  the pages the headings were read on. But the **☰ Contents is built by
  `buildOutline` from `c.headings`**, a separate artefact, so it does not yet
  list those sections. Rebuilding the per-volume nav is its own piece of work —
  "NEVER import one; run as a subprocess".
* **`_xc/cols/probe_columns.js` and `probe_27_cite.js` are kept**, not tidied
  away. They are how the findings were established and they are cheap to re-run.

## One property of the tooling, so it does not mislead

`stamp_build.py` **is not idempotent**: BUILD is a hash over the JSON under
`site/`, and `site/build.json` is one of those files, so writing the stamp
changes the input to the next stamp. A dry run right after a `--write` reports a
different number and nothing is wrong. Do not re-run `--write` "to be safe" — it
produces a spurious build and dirties a clean tree. Verify a deploy by comparing
the fetched `build.json` against the committed `site/build.json`.
