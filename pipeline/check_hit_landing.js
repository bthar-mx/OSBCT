// ARRIVING AT A SEARCH HIT: does the reader land on the WORD, and on the RIGHT one?
//
// READER-REPORTED 2026-09-08: "sometimes, not always, clicking one of the
// occurrences — maybe because the passage is long — does not take one to the
// exact place of that passage."
//
// LENGTH IS NOT THE CAUSE, and this gate exists so that is not re-guessed.
// The 2026-08-02 fix already handles long paragraphs: `landOn` marks the word
// first and scrolls to the MARK, not to the paragraph. But it falls back:
//
//     if(q) markInEl(el,q);
//     await settleTo(el.querySelector('mark.shl')||el);
//
// so when NO MARK IS MADE it centres the paragraph — the pre-fix behaviour, and
// the report. Length only decides how visible the miss is.
//
// WHY A MARK IS MISSED: `markNeedles` walks TEXT NODES one at a time. The
// edition's commentary idiom sets the lemma in bold and leaves its enclitic
// outside — `<b>Bhūtesū</b>ti`, `<b>daṇḍan</b>ti` — so the word is in the
// paragraph's TEXT and in no single NODE. Measured over the repo:
// 185,177 of 512,798 bold spans end mid-word (36.1%); 55-67% in the
// commentaries. This is not a rare corner, it is the commentary's normal shape.
//
// The half-broken case matters as much as the missed one: where a word occurs
// both split and unsplit, the reader marks only the unsplit occurrence and
// scrolls THERE — so it lands on the wrong instance and still looks like "not
// the exact place". `25Khu08` ¶211 is the reader's own screenshot and has all
// three cases in one paragraph, which is why it is the fixture.
//
// AND THE HIGHLIGHT MUST ASK THE SAME QUESTION AS THE SEARCH. `markInEl` folded
// diacritics unconditionally, so with search exact-by-default a reader could
// search `tassā` and arrive on a highlighted `tassa`. Asserted below in both
// modes, because a highlight that answers a different question than the query
// is a provenance defect, not a cosmetic one.
//
//   node pipeline/check_hit_landing.js
const fs=require('fs'),path=require('path');const {JSDOM}=require('jsdom');const R='site/reader';
const resolve=u=>{u=String(u).split('?')[0];if(u.startsWith('../'))return path.join('site',u.slice(3));if(u.startsWith('http')){try{u=new URL(u).pathname.replace(/^\//,'');}catch(e){}return path.join(R,u);}return path.join(R,u);};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function inlineScripts(h){return h.replace(/<script src="([^"]+)"[^>]*><\/script>/g,(m,u)=>{let t=null;try{t=fs.readFileSync(resolve(u),'utf8');}catch(e){}return t==null?m:'<script>'+t+'</script>';});}
function boot(){
  const dom=new JSDOM(inlineScripts(fs.readFileSync(R+'/reader2.html','utf8')),
    {runScripts:'dangerously',pretendToBeVisual:true,url:'http://x/',beforeParse(w){
      w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
      w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=()=>{};
      w.fetch=u=>{const f=resolve(u);let t=null;try{t=fs.readFileSync(f,'utf8');}catch(e){}
        return Promise.resolve({ok:t!=null,status:t!=null?200:404,
          json:()=>Promise.resolve(t?JSON.parse(t):{}),text:()=>Promise.resolve(t||'')});};}});
  return dom.window;
}

const VOL='25Khu08', ORD=294;   // ¶211, Khaggavisāṇasuttaniddesa — the screenshot

// THE UNIT IS MARK ELEMENTS, AND A SPLIT MATCH IS TWO OF THEM — one per node it
// spans. That is not a fudge to fit the new output; the numbers below are
// derived from the PRE-FIX measurement of the fixture, which counted, for each
// query, its occurrences in the paragraph's text and how many of those sat
// inside a single text node:
//
//   query        in text   in one node   therefore split   marks = split*2 + rest
//   bhūtesūti       1           0               1                    2
//   sabbesūti       2           1               1                    3
//   daṇḍanti        3           1               2                    5
//   nidhāya         6           6               0                    6
//
// The red run before the fix reported 0, 1, 1 and 6 — recorded in the commit
// message. A reader sees adjacent marks across a `</b>` as one highlighted word,
// which is the point.
//
// query, fold mode, expected mark elements, why
const CASES=[
  // split across <b>…</b> and its enclitic: the missed case
  ['bhūtesūti', false, 2, 'occurs once, ONLY as <b>Bhūtesū</b>ti — the missed hit'],
  // occurs twice: once split, once not. Both must mark, or the reader is sent
  // to the second when the snippet showed the first.
  ['sabbesūti', false, 3, 'occurs twice, one split by bold — both must mark'],
  ['daṇḍanti',  false, 5, 'occurs three times, two split by bold'],
  // the control: nothing split, and it already worked. If this ever changes,
  // the cross-node rewrite broke the ordinary case.
  ['nidhāya',   false, 6, 'CONTROL — no bold split, worked before and must still'],
  // fold parity with the search box
  ['nidhaya',   false, 0, 'exact mode must NOT mark the accented form'],
  ['nidhaya',   true,  6, 'folded mode must mark all six accented forms'],
];

(async()=>{
  const w=boot(); await wait(1500);
  try{ await w.openKey(VOL+'#'+ORD,'canon'); }catch(e){ console.log('open failed:',e.message); }
  for(let k=0;k<80;k++){ await wait(90); if(w.document.getElementById('p-'+VOL+'-'+ORD)) break; }
  const el=w.document.getElementById('p-'+VOL+'-'+ORD);
  const fails=[];
  console.log('landing on a search hit — '+VOL+'#'+ORD+' (¶211)');
  if(!el){ console.log('  FAIL  the fixture paragraph never rendered'); process.exit(1); }

  for(const [q,fold,want,why] of CASES){
    [...el.querySelectorAll('mark.shl')].forEach(m=>{m.replaceWith(w.document.createTextNode(m.textContent));});
    el.normalize();
    try{ w.eval('sFold='+(fold?'true':'false')+';'); }catch(e){}
    try{ w.markInEl(el,q); }catch(e){ console.log('  markInEl threw: '+e.message); }
    const got=el.querySelectorAll('mark.shl').length;
    const tag=q.padEnd(11)+(fold?' [folded]':' [exact] ');
    if(got===want) console.log('  ok    '+tag+' '+got+' mark(s) — '+why);
    else{ console.log('  FAIL  '+tag+' '+got+' mark(s), want '+want+' — '+why);
      fails.push(q+(fold?' folded':' exact')+': '+got+' not '+want); }
  }

  // ---- the dropdown must come back when the box is focused again ----
  // Reader-reported the same day: after clicking a result, returning to the
  // search box shows nothing; the workaround is to delete letters and retype.
  // `doSearch` only ever runs on `input`, and `openHit` hides the dropdown — so
  // focus alone leaves it hidden. Deleting and retyping fires `input`, which is
  // exactly why that workaround works and why it is the tell.
  const dd=w.document.getElementById('sdrop'), sq=w.document.getElementById('sq');
  if(!dd||!sq){ console.log('  FAIL  search box or dropdown missing'); fails.push('no search box'); }
  else{
    sq.value='nidhāya';
    sq.dispatchEvent(new w.Event('input',{bubbles:true}));
    for(let k=0;k<60&&dd.hidden;k++) await wait(120);
    const shown=!dd.hidden;
    dd.hidden=true;                                   // what openHit does on click
    sq.dispatchEvent(new w.Event('focus',{bubbles:true}));
    for(let k=0;k<40&&dd.hidden;k++) await wait(120);
    const back=!dd.hidden;
    if(!shown){ console.log('  SKIP  dropdown never opened on input — index unavailable here'); }
    else if(back) console.log('  ok    dropdown returns when the box is focused again');
    else{ console.log('  FAIL  dropdown stays hidden on focus; only an `input` event brings it back'
                      +' — the reader has to delete letters and retype');
      fails.push('dropdown does not return on focus'); }
  }

  if(fails.length){ console.log('\nHIT LANDING FAILED:'); fails.forEach(f=>console.log('  - '+f));
    process.exit(1); }
  console.log('\nall green');
  process.exit(0);
})();
