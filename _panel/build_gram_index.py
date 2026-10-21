"""Build site/reader/gram-index.json for the reader pane's links into the IEBH grammars.

gramaticas.buddha-dhamma.net sends no CORS header, so the pane cannot read that site's own
indexes; this small file ships with the reader instead.  It holds, read only from a checkout
of bthar-mx/gramaticas-pali-es:
  g: glossary lemma key -> anchor ids on /recursos/glosario/ (#g-<id>); 1 = the key itself
     (from the page's own `const DATA`, groups `agrupado`);
  r: Saddanīti root name key -> [[id, [gaṇa numbers], es gloss, en gloss], ...]
     (recursos/raices/raices.json; anchor #r<id> on /recursos/raices/).
Keys: lower case, ṁ = ṃ, everything but letters and digits dropped (the glossary page's
fusion key, as in Padakosa's terms.py).

    python3 _panel/build_gram_index.py ~/Documents/gramaticas-pali-es site/reader/gram-index.json
"""
import json, re, sys, unicodedata

_KEEP = re.compile(r"[^0-9a-zāīūṅñṭḍṇḷṃ]")


def key(s):
    s = unicodedata.normalize("NFC", s or "").lower().replace("ṁ", "ṃ")
    return _KEEP.sub("", s)


def short(s, n=48):
    s = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()
    return s if len(s) <= n else s[:n - 1].rstrip() + "…"


def main(src, out):
    html = open(src + "/site/recursos/glosario/index.html", encoding="utf-8").read()
    d, _ = json.JSONDecoder().raw_decode(html, html.index("const DATA = ") + len("const DATA = "))
    G = {}
    for g in d["agrupado"]:
        ids = G.setdefault(key(g["p"]), [])
        if g["id"] not in ids:
            ids.append(g["id"])
    G = {k: (1 if v == [k] else v) for k, v in G.items()}
    r = json.load(open(src + "/recursos/raices/raices.json", encoding="utf-8"))
    R = {}
    for x in r["raices"]:
        gs = sorted({y.get("gana") for y in x.get("refs") or [] if y.get("gana")})
        for n in x.get("raices") or []:
            R.setdefault(key(n), []).append([x["id"], gs, short(x.get("es")), short(x.get("en"))])
    o = {"v": 1, "src": "gramaticas-pali-es: site/recursos/glosario (agrupado) + recursos/raices/raices.json",
         "g": G, "r": R}
    with open(out, "w", encoding="utf-8") as f:
        json.dump(o, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{out}: {len(G)} glossary keys, {len(R)} root names")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
