"""Build stores/lookup_eval/sandhi/: what is known about the junctures of corpus forms DPD has no entry for.

Shared by the reader pane (site/reader/panel.js) and Padakosa. One record per form of the Sixth Council
corpus that has no DPD headword (DPD v0.4.20260926 `lookup.headwords` empty), keyed on the form as the
edition writes it (lower case, niggahīta ṁ):

  i   the IEBH sandhi solver's readings of the strong kinds — adjudicated by IEBH, signed, from Bhikkhu
      Nandisena's bank, or an adjudicated pattern: [[components, [§N…], kind, by, [steps…]], …]
  a   its automatic proposals (each recomposes the form by rule; NOT attested as the reading), at most 3,
      and only when the solver signals sandhi in the form — the solver's own rule: what it does not
      signal it does not shout (solucionar_sandhis.senal): [[components, [§N…]], …];  an = how many
  g   the solver's sandhi signal ("segura" / "posible"), when it gave one
  d   DPD's own deconstruction (`lookup.deconstructor`), at most 2, "a + b" — DPD's, unverified

Solver: bthar-mx/gramaticas-pali-es (commit in sandhi/index.json), nuestro/solucionar_sandhis.py in the
site's mode (SOLO_CANON: the lexicon is the Sixth Council corpus; DPD takes no part). §9 of the OSBCT norms:
DPD's split is shown only labelled as DPD's and unverified.

It goes in the EVALUATION store, not in stores/lookup/: a record may carry DPD's split, and stores/lookup/
holds no DPD (see .gitignore). Same convention as dpd/, family/ and hw/: each shard is written as .json.gz
(tracked, served, sniffed by the panel) and as .json (kept on disk, ignored); the manifest lists `gz`.

Sharding as build_lookup.py: a key sits in the shard named by the shortest prefix of fold(key), padded
with '_', that the manifest lists (depth 2 up); shards are split until under the cap. The manifest is
sandhi/index.json, separate from lookup_eval/index.json (which build_eval.py rewrites whole).

    python3 build_sandhi.py SOLVED_DIR DPD_DB CORPUS_FORMAS_JSON OUT_DIR GRAM_COMMIT DPD_VERSION
"""
import glob, gzip, json, os, re, sqlite3, sys

CAP = 150000
F = {"ā": "a", "ī": "i", "ū": "u", "ṁ": "m", "ṃ": "m", "ṅ": "n", "ñ": "n", "ṭ": "t", "ḍ": "d", "ṇ": "n", "ḷ": "l"}
STRONG = {"adjudicated", "signed", "bank", "pattern"}


def fold(s):
    return "".join(F.get(c, c) for c in s.lower())


def ed(s):
    return s.replace("ṃ", "ṁ")


def suttas(steps):
    out = []
    for s in steps:
        for n in re.findall(r"§(\d+)", s):
            if int(n) not in out:
                out.append(int(n))
    return out


def main(solved_dir, dpd_db, corpus_json, out_dir, gram_commit, dpd_version):
    recs = {}
    bad = 0
    for fn in sorted(glob.glob(os.path.join(solved_dir, "solved.*.jsonl"))):
        for line in open(fn, encoding="utf-8"):
            try:
                r = json.loads(line)
            except ValueError:
                bad += 1
                continue
            if "err" in r:
                continue
            L = r.get("L") or []
            strong = [[[ed(c) for c in x["c"]], suttas(x["p"]), x["k"], x.get("by") or "", [ed(p) for p in x["p"]]]
                      for x in L if x["k"] in STRONG][:6]
            auto = [x for x in L if x["k"] == "auto"]
            o = {}
            if strong:
                o["i"] = strong
            if auto and r.get("g"):
                o["a"] = [[[ed(c) for c in x["c"]], suttas(x["p"])] for x in auto[:3]]
                o["an"] = len(auto)
            if r.get("g"):
                o["g"] = r["g"]
            recs[r["f"]] = o
    db = sqlite3.connect(dpd_db)
    nd = 0
    for f in list(recs):
        row = db.execute("select deconstructor from lookup where lookup_key=?", (f,)).fetchone()
        if row and row[0] and row[0] != "[]":
            try:
                d = json.loads(row[0])
            except ValueError:
                d = []
            if d:
                recs[f]["d"] = [ed(x) for x in d[:2]]
                nd += 1
    recs = {ed(k): v for k, v in recs.items() if v.get("i") or v.get("a") or v.get("d")}

    # shards
    os.makedirs(os.path.join(out_dir, "sandhi"), exist_ok=True)
    shards = {}

    def place(keys, depth):
        groups = {}
        for k in keys:
            groups.setdefault((fold(k)[:depth] + "_" * depth)[:depth], []).append(k)
        for name, ks in groups.items():
            body = json.dumps({k: recs[k] for k in sorted(ks)}, ensure_ascii=False, separators=(",", ":"))
            if len(body.encode()) > CAP and depth < 40 and len({(fold(k)[:depth + 1] + "_" * (depth + 1))[:depth + 1] for k in ks}) > 1:
                place(ks, depth + 1)
            else:
                shards[name] = body
    place(list(recs), 2)
    for name, body in shards.items():
        with open(os.path.join(out_dir, "sandhi", name + ".json"), "w", encoding="utf-8") as fh:
            fh.write(body)
        with gzip.GzipFile(os.path.join(out_dir, "sandhi", name + ".json.gz"), "wb", mtime=0) as fh:
            fh.write(body.encode("utf-8"))
    n_i = sum(1 for v in recs.values() if v.get("i"))
    n_a = sum(1 for v in recs.values() if v.get("a") and not v.get("i"))
    n_d = sum(1 for v in recs.values() if v.get("d") and not v.get("i") and not v.get("a"))
    man = {"built": "_panel/build_sandhi.py",
           "shard_key": "adaptive: the shortest prefix of fold(form), padded with '_', that names a shard here; try depth 2 upward",
           "cap_bytes": CAP, "gz": True,
           "keys": len(recs), "with_iebh": n_i, "auto_only": n_a, "dpd_only": n_d, "unreadable_lines": bad,
           "source": {"forms": "every form of the Sixth Council corpus (gramaticas-pali-es recursos/corpus/corpus-formas.json) "
                                "with no DPD headword",
                      "iebh": f"IEBH sandhi solver, bthar-mx/gramaticas-pali-es {gram_commit}, site mode (solo-canon)",
                      "dpd": f"Digital Pāḷi Dictionary {dpd_version}, lookup.deconstructor — Bodhirasa Bhikkhu, CC BY-NC-SA 4.0; "
                             "shown only as DPD's, unverified (§9)"},
           "shards": {n: 1 for n in sorted(shards)}}
    with open(os.path.join(out_dir, "sandhi", "index.json"), "w", encoding="utf-8") as fh:
        json.dump(man, fh, ensure_ascii=False, indent=1)
    print(json.dumps({k: v for k, v in man.items() if k != "shards"}, ensure_ascii=False, indent=1), len(shards), "shards")


if __name__ == "__main__":
    main(*sys.argv[1:7])
