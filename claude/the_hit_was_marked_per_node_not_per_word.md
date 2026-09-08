# The hit was marked per text NODE, and the commentary sets half a word in bold

**Reader-reported 2026-09-08**, two things in one message:

> sometimes, not always, clicking one of the occurrences — maybe because the
> passage is long — it does not take one to the exact place of that passage.

> when one goes back to the search box to see other instances found for that
> word, the dialog box with the previously found instances does not appear
> anymore. What I do is delete the last letters and retype.

Both fixed. A third defect was found while measuring the first and is fixed with
it. All three were gated red before anything was changed —
`pipeline/check_hit_landing.js`.

---

## 1. The length was a red herring, and the code already said so

`landOn` is three lines:

    if(q) markInEl(el,q);
    await settleTo(el.querySelector('mark.shl')||el);

The 2026-08-02 session had already met this report — *"it does not take one to
the exact place where it is but one has to look around to find it"* — and fixed
the general case properly: **mark the word first, then scroll to the MARK**, then
settle in a loop because the layout is still moving. Long paragraphs are exactly
what that fix was for, and it works.

But it falls back. `el.querySelector('mark.shl')||el` — **when no mark is made it
centres the paragraph**, which is precisely the pre-fix behaviour and precisely
the report. So the question was never "does scrolling work"; it was **when does
marking silently fail**. Length only decides how visible the miss is.

## 2. It fails on the commentary's own idiom

`markNeedles` walked the text nodes and matched **inside each one separately**.
The edition sets the lemma in bold and leaves its enclitic outside:

    <b>Bhūtesū</b>ti          <b>daṇḍan</b>ti          <b>sabbesū</b>ti

So the word is in the paragraph's **text** and in no single **node**, and nothing
matched.

**This is not a rare corner. It is the commentary's normal shape.** Measured over
the repo — every `site/reader/bold/*.bold.json` against its volume:

    185,177 of 512,798 bold spans end mid-word — 36.1%

    worst: 28Khu11 67.3%, 41KhuA22 66.6%, 40KhuA21 65.2%, 34KhuA15 61.0%,
           42KhuA23 60.2%, 39KhuA20 59.8%, 14SamA01 58.2%, 19AnA03 56.2%

## 3. The half-broken case was as bad as the missed one

`25Khu08` ¶211 — the paragraph in the reader's own screenshot — holds all three
cases at once. Measured in a real render, before the fix:

| query | occurrences in the text | inside one node | marks made | what the reader got |
|---|---:|---:|---:|---|
| `bhūtesūti` | 1 | 0 | **0** | paragraph centred, word not found |
| `sabbesūti` | 2 | 1 | 1 | scrolled to the **second**, unsplit one |
| `daṇḍanti` | 3 | 1 | 1 | scrolled to the **third** |
| `nidhāya` | 6 | 6 | 6 | correct |

The middle rows are why the report says *sometimes*. Something **was**
highlighted, so it did not look broken — it just was not the occurrence the
snippet had shown. The screenshot shows this exactly: the highlight sits on
`pariyādiyanavacanametaṁ sabbesūti`, the later unsplit one, not on the bold
`<b>sabbesū</b>ti` at the head of the gloss.

## 4. The fix

One string over the whole element with an offset per node, match in that, then
paint each node's share of every match — back to front, so replacing a node
cannot invalidate the offsets still to come. A match crossing a boundary becomes
two adjacent `<mark>`s, which is right: they are two nodes, and the reader sees
one highlighted word.

Guarded, not assumed: the offset map only holds while normalising is 1:1 in
length. It is for this alphabet, and if it ever is not, the function returns 0
rather than marking the wrong slice.

**`search.html` never had this.** It builds its snippets from the raw `text`
string rather than from the DOM, so there are no nodes to split. Checked before
being claimed.

## 5. The third defect, found while measuring: the highlight folded when the search did not

`markInEl` folded diacritics **unconditionally**. That was right while search
folded by default; it is wrong now that search is exact by default. Proven before
it was changed — unaccented `nidhaya` marked all six accented `nidhāya` in the
fixture.

So a reader could search `tassā`, exactly, and arrive on a highlighted `tassa`.
**`tassa` and `tassā` are different words**; a mark that says otherwise is a
provenance defect, not a cosmetic one — the same ground on which exact-by-default
was chosen. The mode now follows `sFold`, the flag the box and the result line
already show.

## 6. The dropdown: the workaround was the diagnosis

The dropdown is built only by `doSearch`, and `doSearch` ran only on `input`.
`openHit` hides it when a result is clicked. So after visiting one hit the
results still existed and nothing could show them again — and **deleting a letter
worked because it fires `input`**. The reader's own workaround named the cause.

Now a `focus` handler re-runs the search when the box has something in it and the
dropdown is hidden. Re-running rather than un-hiding the old markup is
deliberate: the layer chip, the fold switch and the index may all have moved
since, and a stale list that looks live is worse than none. Everything it needs
is in `SC`'s cache, so it repaints without a fetch.

## 7. The gate, and the one thing it cannot do

`pipeline/check_hit_landing.js`, red first on five of its seven assertions:

    bhūtesūti  0 marks, want 2      sabbesūti 1, want 3      daṇḍanti 1, want 5
    nidhaya [exact] 6, want 0       dropdown stays hidden on focus
    nidhāya 6 ok (control)          nidhaya [folded] 6 ok (control)

**The expected counts were derived before the fix, not read off it.** The unit is
mark *elements*, and a split match is two of them — one per node it spans — so
the numbers are `split*2 + rest`, computed from the pre-fix table in §3.

What it cannot do: jsdom has no layout, so it proves a mark is **made** and
cannot prove the reader **arrives** at it. `settleTo` is unchanged and was
verified by eye in 2026-08-02. If a hit is ever reported as still landing wrong
while this gate is green, the fault is in scrolling, not in marking, and that is
the half a browser has to answer.
