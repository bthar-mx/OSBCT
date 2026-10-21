"""Build the reader pane's Sandhi button: an unmodified copy of the IEBH sandhi solver and its lexicon.

IEBH, 2026-10-21: the pane shows the stored sandhi readings (stores/lookup_eval/sandhi/) only for forms DPD
has no headword for; a Sandhi button that runs the solver on the clicked word, as Padakosa's does, is wanted.

The solver is the one published at gramaticas.buddha-dhamma.net/recursos/solucionador/ (repository
bthar-mx/gramaticas-pali-es, IEBH / BTHAR, CC BY-NC-ND 4.0). That page carries the engine as one block,
<script id="motor">, which never touches the DOM and which the gramaticas repository checks to be
byte-identical in its sequences to the Python solver over the 266 forms of the bank. That site sends no CORS
header, so the pane cannot read it from there; this script copies it here:

  site/reader/sandhi-solver.js        the <script id="motor"> block, byte for byte, inside one function
                                      scope (so its top-level names cannot collide with the reader's) and
                                      after a comment naming its source; it sets globalThis.SOLUCIONADOR.
  stores/lookup_eval/solver/lexico/   the solver's lexicon: indice.json as published, each fragment as
                                      .json.gz (tracked) and .json (on disk, ignored), as dpd/, hw/, sandhi/.
  stores/lookup_eval/solver/index.json  source commit, engine SHA-256 and version, fragment count.

The lexicon goes in the EVALUATION store, not in site/ or stores/lookup/: its own index says it was built
from the corpus forms AND DPD's form list (`con_dpd`), and stores/lookup/ carries no DPD. In the site's
mode (solo-canon, decision of the Venerable, 2026-08-28) DPD takes no part in a reading; the pane shows the
button only when the evaluation store is on, like the stored sandhi line.

Nothing in the engine or the lexicon is edited. To update: rerun on a newer gramaticas checkout, then
r2_upload.sh (the lexicon) and a Pages run (the engine).

    python3 _panel/build_solver.py GRAMATICAS_DIR GRAM_COMMIT
    (GRAMATICAS_DIR holds site/recursos/solucionador/index.html and lexico/)
"""
import gzip, hashlib, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OPEN, CLOSE = '<script id="motor">', '</script>'


def main(gram_dir, commit):
    page_dir = os.path.join(gram_dir, "site", "recursos", "solucionador")
    page = open(os.path.join(page_dir, "index.html"), encoding="utf-8").read()
    i = page.find(OPEN)
    if i < 0 or page.find(OPEN, i + 1) >= 0:
        sys.exit("expected exactly one <script id=\"motor\"> block")
    i += len(OPEN)
    j = page.find(CLOSE, i)
    motor = page[i:j]
    if "globalThis.SOLUCIONADOR" not in motor or "__fetchJsonNode" not in motor:
        sys.exit("the engine block no longer has the interface the pane uses (SOLUCIONADOR, __fetchJsonNode)")
    if re.search(r"\bdocument\b|\bwindow\b", motor.split("const DATA", 1)[0]):
        print("note: the engine's preamble mentions document/window", file=sys.stderr)
    sha = hashlib.sha256(motor.encode("utf-8")).hexdigest()
    m = re.search(r'"version"\s*:\s*"([^"]*)"', motor)
    version = m.group(1) if m else ""

    js = os.path.join(ROOT, "site", "reader", "sandhi-solver.js")
    with open(js, "w", encoding="utf-8") as f:
        f.write("/* The IEBH sandhi solver, copied unmodified for the reader pane's Sandhi button.\n"
                f" * Source: bthar-mx/gramaticas-pali-es {commit}, site/recursos/solucionador/index.html,\n"
                " * the <script id=\"motor\"> block (gramaticas.buddha-dhamma.net/recursos/solucionador/).\n"
                " * (c) IEBH / BTHAR, CC BY-NC-ND 4.0. Do not edit: regenerate with _panel/build_solver.py.\n"
                f" * Block SHA-256 {sha}. It is wrapped in one function scope and nothing else is added. */\n"
                "(function () {\n")
        f.write(motor)
        f.write("\n})();\n")

    src = os.path.join(page_dir, "lexico")
    out = os.path.join(ROOT, "stores", "lookup_eval", "solver", "lexico")
    os.makedirs(out, exist_ok=True)
    idx = json.load(open(os.path.join(src, "indice.json"), encoding="utf-8"))
    files = sorted({v["archivo"] for v in idx["fragmentos"].values()})
    raw = gz = 0
    for fn in files:
        b = open(os.path.join(src, fn), "rb").read()
        json.loads(b)                                   # a broken fragment stops the build
        open(os.path.join(out, fn), "wb").write(b)
        z = gzip.compress(b, 9, mtime=0)
        open(os.path.join(out, fn + ".gz"), "wb").write(z)
        raw += len(b); gz += len(z)
    with open(os.path.join(out, "indice.json"), "wb") as f:
        f.write(open(os.path.join(src, "indice.json"), "rb").read())
    man = {"source": "bthar-mx/gramaticas-pali-es", "commit": commit, "engine_sha256": sha,
           "engine_version": version, "fragments": len(files), "forms": idx.get("total"),
           "con_dpd": idx.get("con_dpd"), "gz": True, "licence": "CC BY-NC-ND 4.0, IEBH / BTHAR"}
    with open(os.path.join(ROOT, "stores", "lookup_eval", "solver", "index.json"), "w", encoding="utf-8") as f:
        json.dump(man, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"engine {len(motor):,} chars, sha256 {sha[:12]}, version {version!r} -> site/reader/sandhi-solver.js")
    print(f"lexicon {len(files)} fragments, {idx.get('total'):,} forms, {raw/1e6:.1f} MB -> {gz/1e6:.1f} MB gzipped")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
