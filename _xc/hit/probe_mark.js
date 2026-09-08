// Why does a search hit SOMETIMES land on the paragraph but not on the word?
//
// Reader-reported 2026-09-08: "sometimes, not always, clicking one of the
// occurrences, maybe because the passage is long, does not take one to the
// exact place."
//
// The 2026-08-02 fix already answered the general case — mark FIRST, then
// scroll to the mark, then settle. `landOn` is:
//
//     if(q) markInEl(el,q);
//     await settleTo(el.querySelector('mark.shl')||el);
//
// so when NO MARK IS MADE it falls back to `settleTo(el)` — centring the
// paragraph — which is exactly the pre-fix behaviour and exactly the report.
// The question is therefore not "does scrolling work" but "when does marking
// silently fail".
//
// HYPOTHESIS: `markNeedles` walks TEXT NODES one at a time
// (`createTreeWalker(el, SHOW_TEXT)`) and matches inside each. The edition's
// commentary idiom sets the lemma in bold and leaves its enclitic outside it —
// `<b>sabbesū</b>ti`, `<b>daṇḍan</b>ti` — so a query spanning that boundary
// exists in the paragraph's TEXT and in no single text NODE.
// Measured over the repo: 185,177 of 512,798 bold spans end mid-word (36.1%);
// 55-67% in the commentary volumes.
//
//   node _xc/hit/probe_mark.js
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
(async()=>{
  const VOL='25Khu08', ORD=294;               // the reader's own screenshot, ¶211
  const w=boot(); await wait(1500);
  try{ await w.openKey(VOL+'#'+ORD,'canon'); }catch(e){ console.log('open:',e.message); }
  for(let k=0;k<80;k++){ await wait(90);
    if(w.document.getElementById('p-'+VOL+'-'+ORD)) break; }
  const el=w.document.getElementById('p-'+VOL+'-'+ORD);
  if(!el){ console.log('paragraph never rendered'); process.exit(1); }

  const txt=el.textContent;
  const nodes=[]; const tw=w.document.createTreeWalker(el,w.NodeFilter.SHOW_TEXT,null);
  while(tw.nextNode()) nodes.push(tw.currentNode.nodeValue);
  console.log(VOL+'#'+ORD+'  rendered: '+txt.length+' chars in '+nodes.length+' text nodes');

  const HL={'ā':'a','ī':'i','ū':'u','ṁ':'m','ṃ':'m','ṅ':'n','ñ':'n','ṭ':'t','ḍ':'d','ṇ':'n','ḷ':'l'};
  const fold=s=>s.toLowerCase().replace(/[āīūṁṃṅñṭḍṇḷ]/g,c=>HL[c]||c);

  for(const q of ['nidhāya','nidhaya','sabbesuti']){
    // how many times does it occur in the paragraph's TEXT?
    const f=fold(txt), fq=fold(q); let inText=0,i=f.indexOf(fq);
    while(i>=0){ inText++; i=f.indexOf(fq,i+1); }
    // how many times inside a SINGLE text node — which is all markNeedles sees?
    let inNode=0;
    for(const n of nodes){ const fn=fold(n); let j=fn.indexOf(fq);
      while(j>=0){ inNode++; j=fn.indexOf(fq,j+1); } }
    // what the reader actually does
    [...el.querySelectorAll('mark.shl')].forEach(m=>{m.replaceWith(w.document.createTextNode(m.textContent));});
    el.normalize();
    try{ w.markInEl(el,q); }catch(e){ console.log('markInEl threw:',e.message); }
    const marks=el.querySelectorAll('mark.shl').length;
    const verdict = marks? 'marks -> scrolls to the WORD'
                         : 'NO MARK -> falls back to centring the PARAGRAPH';
    console.log('  '+q.padEnd(12)+' occurrences in the paragraph TEXT: '+inText
                +' | inside a single text NODE: '+inNode
                +' | marks made: '+marks+'   '+verdict);
  }
  process.exit(0);
})();
