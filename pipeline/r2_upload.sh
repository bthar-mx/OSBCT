#!/usr/bin/env bash
#
# Upload the dictionary stores to the Cloudflare R2 bucket.
#
# WRITTEN 2026-08-07 for the D+B decision in docs/DEPLOY_SCALE.md 6a.  Run by
# the reader, on his own machine, with his own credentials.  NOTHING in this
# file contains a secret and nothing in it should ever be made to: rclone holds
# the credentials in its own config, which is the point.
#
# ---------------------------------------------------------------------------
# WHAT THIS DOES *NOT* DO, AND THAT IS DELIBERATE
#
# It does not move, delete or rewrite a single file in the repository.  It is a
# COPY to a second place, so that the second place can be tested before
# anything depends on it.
#
# Where it copies FROM is detected below, because the stores moved on
# 2026-08-07: they were at `site/lookup/` and `site/lookup_eval/` while Pages
# still published them, and are at `stores/` now that it does not.  The script
# works either side of that move and prints which it found.
#
# Re-running is cheap and is the intended way to update a dictionary:
# `--checksum` sends only what actually changed.  That is the answer to "can we
# update the dictionaries?" -- an update becomes a sync to the bucket plus a
# repo commit, and the Pages deploy never sees it.
#
# ---------------------------------------------------------------------------
# ONE-TIME SETUP, BY HAND, BEFORE THE FIRST RUN
#
#   1. Create the R2 bucket in the Cloudflare dashboard.
#   2. Bind a custom domain to it (working name: dict.buddha-dhamma.net).
#      A custom domain, not the r2.dev development URL -- r2.dev is rate
#      limited and not meant to be depended on.
#   3. Apply the CORS policy in `pipeline/r2_cors.json`.  dict.<domain> is a
#      DIFFERENT ORIGIN from <domain>, so without this every fetch fails and
#      the dictionary panel is silently empty.
#   4. `rclone config` -- new remote, type `s3`, provider `Cloudflare`,
#      endpoint `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`, and an R2 API
#      token with Object Read & Write.  Name the remote `osbct-r2`.
#   5. Set BUCKET below, then run this script from the repository root.
#
# ---------------------------------------------------------------------------
# THE CONTENT-TYPE DECISION, WHICH IS THE WHOLE RISK -- see DEPLOY_SCALE 6b
#
# `jfetch` (site/reader/panel.js:499) sniffs the gzip magic bytes because a
# `.gz` can arrive EITHER as opaque compressed bytes (host sets no
# Content-Encoding, panel inflates it itself) OR already inflated by the
# browser (host sets `Content-Encoding: gzip`).  Both branches exist; only one
# runs, and which one is the HOST's choice.
#
# This script deliberately chooses the OPAQUE form -- `application/gzip`, no
# `Content-Encoding` -- because that is what GitHub Pages does today and what
# is therefore already proven in production.  Changing the origin and the
# encoding semantics in the same step would mean a failure could be either.
#
# If you change this, you are changing which branch of `jfetch` runs in
# production, and `pipeline/check_r2_origin.js` must be re-run.  Do not change
# it casually and do not change it at the same time as anything else.
#
set -euo pipefail

BUCKET="${OSBCT_R2_BUCKET:-osbct-dict}"
REMOTE="${OSBCT_R2_REMOTE:-osbct-r2}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Cache-Control.  Every fetch is versioned `?v=WLV` (panel.js:346), so in
# principle these objects could be immutable for a year.  They are NOT set that
# way yet, because the WLV bump is a human step with no gate behind it and a
# forgotten bump against a one-year cache is unrecoverable for a reader who has
# already loaded the page.  One day is the honest setting until that gate
# exists; raise it afterwards, not before.  DEPLOY_SCALE 6c.
CACHE="public, max-age=86400"

if ! command -v rclone >/dev/null 2>&1; then
  echo "rclone is not installed.  https://rclone.org/downloads/" >&2
  exit 1
fi

# Where the stores live.  DETECTED, not assumed, so this script works before
# the relocation of 6a step 4 and after it -- and says which it found, rather
# than uploading nothing and reporting success, which is the failure this
# project keeps meeting.
if   [ -d "$ROOT/stores/lookup" ] && [ -d "$ROOT/stores/lookup_eval" ]; then STORE=stores
elif [ -d "$ROOT/site/lookup" ]   && [ -d "$ROOT/site/lookup_eval" ];   then STORE=site
else
  echo "Cannot find lookup/ and lookup_eval/ under $ROOT/stores/ or $ROOT/site/." >&2
  exit 1
fi
echo "==> stores found under ${STORE}/"

echo "==> uploading to ${REMOTE}:${BUCKET}"
echo "    source: $ROOT/${STORE}/{lookup,lookup_eval}"
echo

# !!! THE SOURCE OF TRUTH IS `git ls-files`, NOT THE FILESYSTEM.
#
# CORRECTED 2026-08-07, AFTER THIS SCRIPT SHIPPED THE BUG IT WAS WARNED ABOUT.
# The first version walked the directory with --include globs.  That uploaded
# 11,229 files that are DELIBERATELY GITIGNORED: `site/lookup_eval/dpd/*.json`,
# the uncompressed originals kept locally so a rebuild need not start from
# nothing.  Only the `.gz` is tracked and only the `.gz` is ever fetched --
# `index.json` lists `dpd` in its `gz` array, so the panel never asks for them.
#
# lookup_eval landed 28,509 objects against 17,280 tracked.  28,509 is exactly
# the count on disk.  DEPLOY_SCALE 1a states this hazard in as many words --
# "measuring the working tree counts 11,229 files and ~360 MB that are never
# deployed" -- and this script was written after that sentence and walked into
# it anyway.  The count check below is what caught it.
#
# So every pass is now driven by a FILE LIST derived from git, and the
# filesystem is only ever read for the bytes of files git already named.  What
# Pages publishes and what the bucket serves are then the same set by
# construction rather than by coincidence.
#
# Three passes still, because the content type differs per kind and rclone
# applies --header-upload to everything it touches in one run.

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

for pair in "lookup" "lookup_eval"; do
  SRC="$ROOT/$STORE/$pair"
  DST="${REMOTE}:${BUCKET}/$pair"

  # -z because 164 shard names are not ASCII and 458 contain a space; plain
  # `git ls-files` would octal-escape and quote those and every one would then
  # fail to upload.  Paths are made relative to SRC, which is what --files-from
  # expects.
  git -C "$ROOT" ls-files -z "$STORE/$pair" \
    | tr '\0' '\n' \
    | sed "s|^$STORE/$pair/||" > "$TMP/$pair.all"

  # A filename containing a newline would silently split into two useless
  # entries here.  None does today; check rather than trust, because the
  # failure would be a missing shard nobody notices.
  n_lines=$(wc -l < "$TMP/$pair.all" | tr -d ' ')
  n_files=$(git -C "$ROOT" ls-files -z "$STORE/$pair" | tr -dc '\0' | wc -c | tr -d ' ')
  if [ "$n_lines" != "$n_files" ]; then
    echo "!! $pair: $n_lines lines from $n_files files -- a path contains a newline." >&2
    exit 1
  fi

  grep    -e '\.json$'                    "$TMP/$pair.all" > "$TMP/$pair.json"  || true
  grep    -e '\.json\.gz$'                "$TMP/$pair.all" > "$TMP/$pair.gz"    || true
  grep -v -e '\.json$' -e '\.json\.gz$'   "$TMP/$pair.all" > "$TMP/$pair.other" || true

  echo "--> $pair : plain .json (application/json)  [$(wc -l < "$TMP/$pair.json" | tr -d ' ') files]"
  rclone copy "$SRC" "$DST" \
    --files-from "$TMP/$pair.json" \
    --header-upload "Content-Type: application/json; charset=utf-8" \
    --header-upload "Cache-Control: $CACHE" \
    --checksum --transfers 32 --checkers 32 --stats 10s

  echo "--> $pair : gzipped shards (application/gzip, NO Content-Encoding)  [$(wc -l < "$TMP/$pair.gz" | tr -d ' ') files]"
  rclone copy "$SRC" "$DST" \
    --files-from "$TMP/$pair.gz" \
    --header-upload "Content-Type: application/gzip" \
    --header-upload "Cache-Control: $CACHE" \
    --checksum --transfers 32 --checkers 32 --stats 10s

  if [ -s "$TMP/$pair.other" ]; then
    echo "--> $pair : everything else (LICENSE and any stray file)  [$(wc -l < "$TMP/$pair.other" | tr -d ' ') files]"
    rclone copy "$SRC" "$DST" \
      --files-from "$TMP/$pair.other" \
      --header-upload "Content-Type: text/plain; charset=utf-8" \
      --header-upload "Cache-Control: $CACHE" \
      --checksum --transfers 8 --checkers 8 --stats 10s
  fi
done

# --- files at the STORE ROOT, not inside either store ------------------------
# Currently just index.html, which exists because R2 returns "Object not found"
# for a bare visit to the domain: public buckets do not list at the root and R2
# has NO index-document support, so the page is served only because a URL
# rewrite on the zone maps `/` to `/index.html`.  If the root 404s again, check
# that rule before re-uploading anything.
git -C "$ROOT" ls-files -z --  "$STORE/*" ":(exclude)$STORE/lookup/*" ":(exclude)$STORE/lookup_eval/*" \
  | tr '\0' '\n' | sed "s|^$STORE/||" > "$TMP/root.all"
if [ -s "$TMP/root.all" ]; then
  echo "--> store root : [$(wc -l < "$TMP/root.all" | tr -d ' ') files]"
  rclone copy "$ROOT/$STORE" "${REMOTE}:${BUCKET}" \
    --files-from "$TMP/root.all" \
    --header-upload "Content-Type: text/html; charset=utf-8" \
    --header-upload "Cache-Control: $CACHE" \
    --checksum --transfers 4 --checkers 4 --stats 10s
fi

echo
echo "==> counting what landed"
for pair in "lookup" "lookup_eval"; do
  n=$(rclone size "${REMOTE}:${BUCKET}/$pair" --json | python3 -c 'import json,sys;print(json.load(sys.stdin)["count"])')
  local_n=$(cd "$ROOT" && git ls-files "$STORE/$pair" | wc -l | tr -d ' ')
  echo "    $pair : $n in the bucket, $local_n tracked in git"
  if [ "$n" != "$local_n" ]; then
    echo "    !! MISMATCH.  Do not proceed to the origin gate until this is explained." >&2
  fi
done

echo
echo "Next: run pipeline/check_r2_origin.js against the custom domain."
echo "Do NOT relocate anything out of site/ until that gate is green."
