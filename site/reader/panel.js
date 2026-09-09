/* OSBCT word-lookup panel — reader2 integration, BEHIND A FLAG.
   ---------------------------------------------------------------------------
   Enable with `?wl=1` in the URL, or once with localStorage['osbct-wl']='1'.
   `?wl=0` turns it off again.  Nothing runs, nothing is fetched and no event
   is bound while the flag is off, so a reader who has not asked for it meets
   exactly the reader that shipped before.

   WHAT IT SHOWS, AND WHOSE VOICE IT SPEAKS IN (§9)
     Edition   — DEFAULT.  The edition's own glosses: the aṭṭhakathā and ṭīkā
                 explaining the word, from roadmap step 3.
     PED       — the PTS Pali-English Dictionary 1921–25, public domain.  A
                 reference, marked as one; not the panel's voice.
     header    — corpus occurrence counts from roadmap step 1.
   Abhidhāna, PEU and PPN are NOT here.  The prototype has them and they are
   the better lexical authority; they wait on the permissions recorded in
   claude/panel_prototype_built.md.  DPD is not here either and will not be:
   it is a build-time filter, never a voice (§9).

   HOW THE EDITION TAB ORDERS ITSELF — measured, not assumed (2026-08-02)
   The obvious ranking was proximity: put first the gloss sitting in the
   commentary paragraph the link map ties to the canon paragraph on screen.
   Measured over all 40 canon volumes and all 187,248 gloss rows:

       a proximity row exists for   6.5% of clicks that get any gloss
       and when it exists it is really about this passage 57% of the time
       (Dīgha 84 · Khuddaka 80 · Majjhima 79 · Vinaya 63 · Aṅguttara 61 ·
        Saṁyutta 39 · Abhidhamma 36 — the Abhidhamma volumes share one
        Pañcapakaraṇa commentary and their paragraph numbers collide)

   So proximity is NOT the ranking.  The tab LEADS WITH THE OCCURRENCES and
   says how many there are.  What earns a place at the top is a checkable
   claim, not a positional guess: a row is promoted only when the phrase it
   glosses — the words the edition printed in bold — actually stands in the
   paragraph on screen.  `row.k` carries that phrase's stems; the check runs
   here, at click time, against the text already rendered.  Measured ON THE RULE
   THAT SHIPS — 2,000 clicks driven through this very file in Chromium, not a
   Python restatement of it — that rule reaches 75.2% of glossed clicks and
   96.6% of the >50-row band, which was the band the whole exercise was about
   (13.3% of canon clicks).  This comment said 80.9% / 99.3% for four sessions;
   those came from `_panel/proximity_variant.py`, which tests a different rule
   against a different link map.  96.6% against 99.3% over 384 clicks in that
   band (s.e. ~0.9%) is a real difference, not sampling noise.  See
   `claude/judging_sheet_for_the_shipped_rule.md` §3.

   FOUR GROUPS, each with a criterion a reader could check for themselves:
       "in the commentary on this paragraph"   phrase present AND the row sits
                                               in the linked paragraph   4.0%
       "on a phrase that stands in this ¶"     phrase present, >1 word
       "on the word itself"                    the edition glosses this form
                                               alone — true wherever it stands,
                                               and said that way
       "all occurrences"                       the rest, in the edition's order

   Click recovery is caret-based: no per-word spans (roadmap §5).
   Chrome goes through i18n.js.  The Pāḷi never does.                        */
(function () {
'use strict';

// ---------------------------------------------------------------- the flag --
var q = new URLSearchParams(location.search);
if (q.has('wl')) {
  try { localStorage.setItem('osbct-wl', q.get('wl') === '0' ? '0' : '1'); } catch (e) {}
}
// DEFAULT ON since 2026-08-02.  `?wl=0` turns it off and the choice sticks.
//
// !!! IT WAS OFF BY DEFAULT AND THAT MADE IT UNREACHABLE.  Not "hard to find" —
// unreachable.  Measured across the whole of site/: NO link, button or script
// anywhere carries `?wl=1` or ever writes `osbct-wl`, so a reader arriving at
// buddha-dhamma.net/reader/reader2.html got `localStorage` unset, `ON` false,
// this early return, and a word-click that did nothing.  v2.2.0 was deployed,
// tagged, released — and reached nobody. The only way in was to know the query
// parameter existed and type it by hand.
//
// The argument for off-by-default was that an unshipped feature should not
// touch a reader who did not ask for it.  That expired when the panel shipped,
// was gated and was verified live.  What replaced it is a worse property: with
// the flag off the panel leaves NO trace at all — no node, no fetch, nothing in
// the DOM — so "off" and "broken" are indistinguishable from outside.  That is
// not hypothetical either; it cost three separate wrong diagnoses on this
// project's own live site, by someone who knew the flag existed.
//
// §9 is not at risk: `wl` exposes only the publishable panel — the edition's
// own glosses, the corpus counts, and the public-domain PED.  Every source with
// an unresolved licence or an excluded voice sits behind `wle`, which is
// SEPARATE and STAYS OFF.  Do not fold the two together.
var ON = true;
try { if (localStorage.getItem('osbct-wl') === '0') ON = false; } catch (e) {}
if (q.get('wl') === '1') ON = true;
if (q.get('wl') === '0') ON = false;
if (!ON) return;

// A SECOND FLAG FOR THE EVALUATION DICTIONARIES (?wle=1).  Every source it
// adds either has an unresolved redistribution licence (Abhidhāna, PEU, PPN)
// or is excluded by §9 as a voice however it is licensed (DPD).  They are
// worth reading and they are not the project's to publish, so they sit behind
// their own switch, off unless asked for, each banner'd where it is shown, and
// their data lives in stores/lookup_eval/, served from the R2 bucket.  ?wl=1
// alone is still Edition + PED and nothing else.
//
// (This said "site/lookup_eval/ which is gitignored" until 2026-08-07.  Both
// halves had stopped being true: the store is tracked -- force-added past the
// .gitignore rule when it was published -- and it has moved to stores/.
// Corrected here rather than left, because panel.js already carries one
// contradiction of this kind on the record and does not need a second.)
if (q.has('wle')) {
  try { localStorage.setItem('osbct-wle', q.get('wle') === '0' ? '0' : '1'); } catch (e) {}
}
// DEFAULT ON since 2026-08-02: every visitor gets every tab.  `?wle=0` turns
// them off and the choice sticks.  The licences this was waiting on are
// settled -- DPD is CC BY-NC-SA 4.0, the Abhidhāna and PEU are a Gift of
// Dhamma, free distribution only -- and each notice travels with its source in
// the panel (`.wl-rights`).  `stores/lookup_eval/` is tracked, and served from
// the R2 bucket rather than deployed with the site -- DEPLOY_SCALE §6a.
var EVAL = true;
try { if (localStorage.getItem('osbct-wle') === '0') EVAL = false; } catch (e) {}
if (q.get('wle') === '1') EVAL = true;
if (q.get('wle') === '0') EVAL = false;

// ------------------------------------------------------ the APD tab's gear --
// DECIDED BY THE READER, 2026-08-06, implemented 2026-08-09: two sections open
// by default, in this order — CPED then PED — and a gear to choose one or
// more of the others.  Edition, Abhidhāna and DPD are NOT in the gear: the
// first two because they ARE §9's authority, DPD because §9 excludes it as a
// voice however it is licensed; the popover says so in one line so the
// absence reads as deliberate.  HIDDEN MUST NOT MEAN ABSENT: a switched-off
// section that has a hit for this word still draws a one-line collapsed
// header with its count, opening in place on click, for that word only.
// State persists here, beside `osbct-wle`.
var GEARKEY = 'osbct-apdgear';
function gearGet() {
  try { return JSON.parse(localStorage.getItem(GEARKEY) || '{}') || {}; }
  catch (e) { return {}; }
}
function gearSet(g) {
  try { localStorage.setItem(GEARKEY, JSON.stringify(g)); } catch (e) {}
}
// `C` (CPED) and `_ped` are the decided defaults; they are always open and
// deliberately not offered in the gear.
function gearOpen(id) {
  if (id === 'C' || id === '_ped') return true;
  return !!gearGet()[id];
}

// ------------------------------------------------------------ i18n strings --
// Same shape and the same fallback discipline reader2 uses: if i18n.js has not
// loaded, a bare t() in a render path throws and takes the panel with it.
var S = {
  // The tab is named for WHAT IT HOLDS -- the edition's glosses -- not for the
  // edition itself; the tooltip carries the fuller sense unchanged.
  wl_edition:   {en: 'Gloss', es: 'Glosa'},
  wl_ped:       {en: 'PED', es: 'PED'},
  wl_tip_ed:    {en: 'The edition’s own glosses — aṭṭhakathā and ṭīkā',
                 es: 'Las glosas de la edición misma — aṭṭhakathā y ṭīkā'},
  wl_tip_ped:   {en: 'PTS Pali-English Dictionary (Rhys Davids & Stede, 1921–25) — public domain',
                 es: 'PTS Pali-English Dictionary (Rhys Davids y Stede, 1921–25) — dominio público'},
  wl_corpus:    {en: 'corpus', es: 'corpus'},
  wl_canon:     {en: 'canon', es: 'canon'},
  wl_comm:      {en: 'aṭṭh.', es: 'aṭṭh.'},
  wl_sub:       {en: 'ṭīkā', es: 'ṭīkā'},
  wl_loading:   {en: 'Loading…', es: 'Cargando…'},
  wl_close:     {en: 'Close', es: 'Cerrar'},
  wl_ed_src:    {en: 'The edition’s own glosses (bold lemma + -ti formula, step 3). '
                   + 'Ordered as the books stand: volume, then paragraph.',
                 es: 'Las glosas de la edición misma (lema en negrita + fórmula -ti, paso 3). '
                   + 'En el orden de los libros: volumen y luego párrafo.'},
  wl_prox:      {en: 'In the commentary on this paragraph',
                 es: 'En el comentario a este párrafo'},
  wl_here:      {en: 'On a phrase that stands in this paragraph',
                 es: 'Sobre una frase que está en este párrafo'},
  wl_word:      {en: 'On the word itself',
                 es: 'Sobre la palabra misma'},
  wl_rest:      {en: 'Other occurrences', es: 'Otras apariciones'},
  wl_checked:   {en: 'shown first because the phrase the edition glosses stands '
                   + 'in this paragraph — checked, not guessed',
                 es: 'se muestra primero porque la frase que glosa la edición está '
                   + 'en este párrafo — comprobado, no supuesto'},
  wl_why_word:  {en: 'the edition glosses this form on its own, wherever it stands',
                 es: 'la edición glosa esta forma por sí sola, dondequiera que esté'},
  wl_nogloss:   {en: 'The edition gives no gloss for this form.',
                 es: 'La edición no da ninguna glosa para esta forma.'},
  wl_noped:     {en: 'No PED entry reachable from this form.',
                 es: 'Ninguna entrada del PED es alcanzable desde esta forma.'},
  wl_ped_src:   {en: 'The Pali Text Society’s Pali-English Dictionary, T. W. Rhys Davids '
                   + '& William Stede, 1921–25 (public domain). A reference, not this '
                   + 'edition’s voice.',
                 es: 'The Pali Text Society’s Pali-English Dictionary, T. W. Rhys Davids '
                   + 'y William Stede, 1921–25 (dominio público). Una referencia, no la '
                   + 'voz de esta edición.'},
  wl_trunc:     {en: '…continues in the text (cut short by the next lemma — flagged, not patched)',
                 es: '…continúa en el texto (cortada por el lema siguiente — señalado, no corregido)'},
  wl_quoted:    {en: 'quoted', es: 'citada'},
  wl_series:    {en: '-ādi: heads a series', es: '-ādi: encabeza una serie'},
  wl_more:      {en: 'Show more', es: 'Mostrar más'},
  wl_of:        {en: 'of', es: 'de'},
  wl_pilot:     {en: 'Word lookup — in testing', es: 'Consulta de palabras — en pruebas'},
  wl_dpd:       {en: 'DPD', es: 'DPD'},
  wl_abhi:      {en: 'Abhidhāna', es: 'Abhidhāna'},
  wl_peu:       {en: 'PEU', es: 'PEU'},
  wl_cped:      {en: 'CPED', es: 'CPED'},
  wl_ppn:       {en: 'PPN', es: 'PPN'},
  wl_ny:        {en: 'Nyanatiloka', es: 'Nyanatiloka'},
  wl_vri:       {en: 'VRI', es: 'VRI'},
  wl_pwg:       {en: 'PWG', es: 'PWG'},
  wl_tpm:       {en: 'TPM', es: 'TPM'},
  wl_rt:        {en: 'Roots', es: 'Raíces'},
  wl_uhs:       {en: 'U Hau Sein', es: 'U Hau Sein'},
  wl_dict:      {en: 'APD', es: 'APD'},
  wl_gear_tip:  {en: 'Choose which dictionaries open in this tab',
                 es: 'Elegir qué diccionarios se abren en esta pestaña'},
  wl_more_dicts:{en: '%d more dictionaries have this word',
                 es: '%d diccionarios más tienen esta palabra'},
  wl_fam_missing:{en: 'The family data could not be loaded.',
                  es: 'Los datos de la familia no se pudieron cargar.'},
  wl_gear_note: {en: 'CPED and PED always open. Edition and Abhidhāna are the authority (§9) and keep their own tabs; DPD is excluded by §9 — none of the three is an option here.',
                 es: 'CPED y PED siempre abiertos. La Edición y el Abhidhāna son la autoridad (§9) y tienen sus propias pestañas; el DPD queda excluido por §9 — ninguno de los tres es opción aquí.'},
  wl_ped_tab:   {en: 'PED', es: 'PED'},
  wl_tip_dict:  {en: 'The dictionaries aggregated at dictionary.sutta.org, plus CPED and PPN — '
                   + 'one section each, in order of authority. Reference, never the panel’s voice (§9).',
                 es: 'Los diccionarios reunidos en dictionary.sutta.org, más CPED y PPN — '
                   + 'una sección cada uno, por orden de autoridad. Referencia, nunca la voz del panel (§9).'},
  wl_jump:      {en: 'In this word:', es: 'En esta palabra:'},
  wl_type:      {en: 'Look up a Pāḷi word', es: 'Buscar una palabra pāḷi'},
  wl_type_tip:  {en: 'Type a Pāḷi word — diacritics optional',
                 es: 'Escriba una palabra pāḷi — diacríticos opcionales'},
  wl_notfound:  {en: 'No entry for “%s” in the corpus or the dictionaries.',
                 es: 'No hay entrada para «%s» en el corpus ni en los diccionarios.'},
  // THE MISS MESSAGE SAID THE CORPUS DID NOT HAVE THE WORD, AND FOR A STEM THE
  // EDITION ONLY EVER INFLECTS THAT IS FALSE.  `lookup/freq` holds 12 forms of
  // `yathānisinna`, 52 occurrences, and the panel said "not in the corpus".
  // These forms are shown BEFORE the message, and the message then says what
  // is actually true: no entry under that exact spelling.
  // Offered, not imposed: the reader typed a real word and keeps it (2026-08-10).
  wl_also:      {en: 'Also spelt:', es: 'También escrito:'},
  wl_prefix:    {en: 'Forms in the edition beginning with “%s”:',
                 es: 'Formas en la edición que empiezan por «%s»:'},
  wl_prefix_n:  {en: '%d forms · %d occurrences',
                 es: '%d formas · %d apariciones'},
  wl_goto:      {en: 'Open this passage in the reader',
                 es: 'Abrir este pasaje en el lector'},
  wl_nodict:    {en: 'No dictionary reached from this form.',
                 es: 'Ningún diccionario alcanzado desde esta forma.'},
  wl_tip_dpd:   {en: 'Digital Pāḷi Dictionary (Bodhirasa) — CC BY-NC-SA 4.0',
                 es: 'Digital Pāḷi Dictionary (Bodhirasa) — CC BY-NC-SA 4.0'},
  wl_tip_abhi:  {en: 'Tipiṭaka-Pāḷi-Myanmā-Abhidhāna (Ministry of Religious Affairs, Yangon) — the lexical authority (§9)',
                 es: 'Tipiṭaka-Pāḷi-Myanmā-Abhidhāna (Ministerio de Asuntos Religiosos, Yangón) — la autoridad léxica (§9)'},
  wl_tip_peu:   {en: 'PEU — the Abhidhāna’s English rendering (encoded by Bodhirasa)',
                 es: 'PEU — la versión inglesa del Abhidhāna (codificada por Bodhirasa)'},
  // ---- SHARING TERMS, SHOWN TO THE READER WITH THE SOURCE ITSELF ----
  // Not a footnote and not a page the reader has to go and find: the terms
  // travel with the entry, the way the licence notes already travel with the
  // data in site/lookup/index.json.
  wl_cc_dpd:    {en: 'Creative Commons CC BY-NC-SA 4.0 — attribution, non-commercial, share alike.',
                 es: 'Creative Commons CC BY-NC-SA 4.0 — atribución, no comercial, compartir igual.'},
  wl_dhamma:    {en: 'Freely available as a Gift of Dhamma. This material may only be '
                   + 'distributed free of charge.',
                 es: 'Disponible libremente como Regalo del Dhamma. Este material sólo '
                   + 'puede distribuirse de forma gratuita.'},
  wl_tip_cped:  {en: 'Concise Pali-English Dictionary (A.P. Buddhadatta)',
                 es: 'Concise Pali-English Dictionary (A.P. Buddhadatta)'},
  wl_tip_ppn:   {en: 'Dictionary of Pāli Proper Names (G.P. Malalasekera)',
                 es: 'Dictionary of Pāli Proper Names (G.P. Malalasekera)'},
  wl_tip_ny:    {en: 'Buddhist Dictionary (Nyanatiloka Mahāthera) — a doctrinal glossary, not a lexicon',
                 es: 'Buddhist Dictionary (Nyanatiloka Mahāthera) — un glosario doctrinal, no un léxico'},
  wl_tip_vri:   {en: 'Pali-Dictionary, Vipassana Research Institute',
                 es: 'Pali-Dictionary, Vipassana Research Institute'},
  wl_tip_pwg:   {en: 'Pali Word Grammar from the Pali Myanmar Dictionary — Burmese, converted from Zawgyi',
                 es: 'Pali Word Grammar del Pali Myanmar Dictionary — birmano, convertido desde Zawgyi'},
  wl_tip_tpm:   {en: 'Tipiṭaka Pāḷi-Myanmar Dictionary — Burmese, converted from Zawgyi; a second copy of the Abhidhāna’s digitisation',
                 es: 'Tipiṭaka Pāḷi-Myanmar Dictionary — birmano, convertido desde Zawgyi; segunda copia de la digitalización del Abhidhāna'},
  wl_tip_rt:    {en: 'Pali Roots Dictionary (ဓာတ်အဘိဓာန်) — Burmese, converted from Zawgyi',
                 es: 'Pali Roots Dictionary (ဓာတ်အဘိဓာန်) — birmano, convertido desde Zawgyi'},
  wl_tip_uhs:   {en: 'U Hau Sein’s Pāḷi-Myanmar Dictionary — Burmese, converted from Zawgyi',
                 es: 'Diccionario Pāḷi-birmano de U Hau Sein — birmano, convertido desde Zawgyi'},
  // !!! THE OLD NOTICE ANSWERED A QUESTION NO READER WAS ASKING.  It spoke
  // about redistribution licences and about §9's editorial position, which
  // are the project's concerns and not the reader's, and it did so above
  // every entry.  Replaced 2026-08-02 at the reader's direction, with his
  // reasoning recorded because it governs the whole tab: a gloss written in
  // Pāḷi is no use to someone who cannot yet read Pāḷi, and that is almost
  // everyone.  The dictionaries are here to be learned from; the honest
  // caution is about ACCURACY, and it points at the Gloss tab, which is the
  // edition speaking in its own voice.
  wl_eval:      {en: 'This dictionary is offered as it is as a reference for the '
                   + 'study of Pāḷi. We cannot guarantee its accuracy. For accurate '
                   + 'definitions use the Gloss tab. All the dictionaries provided '
                   + 'here are found freely available on the Internet.',
                 es: 'Este diccionario se ofrece tal cual, como referencia para el '
                   + 'estudio del Pāḷi. No podemos garantizar su exactitud. Para '
                   + 'definiciones precisas use la pestaña Glosa. Todos los '
                   + 'diccionarios aquí ofrecidos se encuentran libremente '
                   + 'disponibles en Internet.'},
  // The same caution in the plural, for the APD tab, where it is said ONCE
  // above the whole list rather than under each dictionary in it.
  wl_eval_pl:   {en: 'These dictionaries are offered as they are as a reference for '
                   + 'the study of Pāḷi. We cannot guarantee their accuracy. For '
                   + 'accurate definitions use the Gloss tab. All the dictionaries '
                   + 'provided here are found freely available on the Internet.',
                 es: 'Estos diccionarios se ofrecen tal cual, como referencia para el '
                   + 'estudio del Pāḷi. No podemos garantizar su exactitud. Para '
                   + 'definiciones precisas use la pestaña Glosa. Todos los '
                   + 'diccionarios aquí ofrecidos se encuentran libremente '
                   + 'disponibles en Internet.'},
  wl_zg:        {en: 'Burmese, transcoded from Zawgyi to Unicode and verified by character census (§3).',
                 es: 'Birmano, transcodificado de Zawgyi a Unicode y verificado por censo de caracteres (§3).'},
  wl_mt:        {en: 'machine-translated (Google) — withheld by default',
                 es: 'traducción automática (Google) — retenida por omisión'},
  wl_mt_show:   {en: 'Show the machine translation anyway',
                 es: 'Mostrar la traducción automática de todos modos'},
  wl_cites:     {en: 'Citations:', es: 'Citas:'},
  wl_cites_note:{en: '(transcoded from the Burmese; an abbreviation without a settled reading is left as printed)',
                 es: '(transcritas del birmano; una abreviatura sin lectura establecida se deja como está impresa)'},
  wl_en_btn:    {en: 'English (PEU) ⇣', es: 'Inglés (PEU) ⇣'},
  wl_en_attr:   {en: 'PEU’s English rendering of this entry. A translation, not the authority: where they differ, the Abhidhāna governs.',
                 es: 'La versión inglesa del PEU de esta entrada. Una traducción, no la autoridad: donde difieran, gobierna el Abhidhāna.'},
  wl_back:      {en: 'Back', es: 'Atrás'},
  wl_noentry:   {en: 'No entry for the resolved lemma(s).',
                 es: 'Ninguna entrada para el lema resuelto.'},
  wl_thisvol:   {en: 'this volume', es: 'este volumen'},
  // ---- WordNet, the English→English layer (reader's decision 2026-08-02)
  wl_wn_tab:    {en: 'English', es: 'Inglés'},
  wl_wn_src:    {en: 'WordNet 3.1 · Princeton University',
                 es: 'WordNet 3.1 · Universidad de Princeton'},
  wl_wn_why:    {en: 'An English word from another dictionary’s definition, '
                     + 'explained in English. WordNet is not an authority on '
                     + 'Pāḷi and says nothing about this text.',
                 es: 'Una palabra inglesa de la definición de otro diccionario, '
                     + 'explicada en inglés. WordNet no es autoridad sobre el '
                     + 'Pāḷi y no dice nada sobre este texto.'},
  wl_wn_from:   {en: 'inflected form of', es: 'forma flexionada de'},
  wl_wn_syn:    {en: 'also', es: 'también'},
  wl_wn_pali:   {en: 'Also a form in the edition — look it up there',
                 es: 'También es una forma de la edición — búscala allí'},
  wl_pos_n:     {en: 'noun', es: 'sustantivo'},
  wl_pos_v:     {en: 'verb', es: 'verbo'},
  wl_pos_a:     {en: 'adjective', es: 'adjetivo'},
  wl_pos_r:     {en: 'adverb', es: 'adverbio'}
};
if (window.I18N) for (var k in S) if (!window.I18N[k]) window.I18N[k] = S[k];
function T(key) {
  if (window.t && window.I18N && window.I18N[key]) return window.t(key);
  var lang = 'en';
  try { lang = localStorage.getItem('osbct-lang') || 'en'; } catch (e) {}
  return (S[key] && (S[key][lang] || S[key].en)) || key;
}

// ------------------------------------------------------------------- utils --
var FOLD = {'ā':'a','ī':'i','ū':'u','ṁ':'m','ṃ':'m','ṅ':'n','ñ':'n','ṭ':'t','ḍ':'d','ṇ':'n','ḷ':'l'};
function fold(s) { return s.toLowerCase().replace(/[āīūṁṃṅñṭḍṇḷ]/g, function (c) { return FOLD[c] || c; }); }
var VOW = 'aiueo';
// the same normalisation build_lookup.py used to write row.k — they must agree
function stem(w) {
  var f = fold(w).replace(/(.)\1+/g, '$1');
  while (f && (f.slice(-1) === 'm' || f.slice(-1) === 'n' || VOW.indexOf(f.slice(-1)) >= 0))
    f = f.slice(0, -1);
  return f;
}
// `ṃ` is in the set because the reader may be DISPLAYING the modern niggahita
// (reader2's toggle, 2026-08-15): the caret walk reads the DOM as shown, so a
// click on `evaṃ` must not stop at the ṃ and hand back `eva`.  Everything
// downstream still speaks the edition's ṁ — see niggCanon below.
var PALI = 'aāiīuūeokgṅcjñṭḍṇtdnpbmyrlvshḷṁṃ';
var PALISET = {}; (PALI + PALI.toUpperCase()).split('').forEach(function (c) { PALISET[c] = 1; });
var APOS = {'’': 1, "'": 1};
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
// Compare two renderings of the SAME PED entry.  The shipped set and PCED's
// dictionary "P" carry identical text differing only in fullwidth punctuation
// (`，．（）` against `,.()`) and in markup, so the key keeps letters and digits
// and throws the rest away.  Used only for PED, which is English.
function pedKey(s) {
  return String(s).replace(/<[^>]*>/g, ' ').toLowerCase()
    .replace(/[^0-9a-zāīūṁṃṅñṭḍṇḷ]+/g, '');
}

// the shard manifest decides the shard name (adaptive prefix, see index.json)
var MAN = null;
function shardName(set, key) {
  var f = fold(key), m = MAN && MAN.shards && MAN.shards[set];
  if (!m) return (f.slice(0, 2) + '__').slice(0, 2);
  for (var d = 2; d <= 40; d++) {
    var name = (f.slice(0, d) + new Array(d + 1).join('_')).slice(0, d);
    if (m[name]) return name;
  }
  return (f.slice(0, 2) + '__').slice(0, 2);
}
function safeName(k) {
  return fold(k).split('').map(function (c) {
    return /[a-z0-9]/.test(c) ? c : '-' + c.charCodeAt(0) + '-'; }).join('');
}

var CACHE = {};
// !!! NOTHING THE PANEL FETCHED CARRIED A VERSION, AND THE BROWSER KEPT IT ALL.
// reader2 appends `?v=BUILD` to every data URL it loads and this file did not,
// so once a reader had opened the panel, their browser served the FIRST
// index.json and the FIRST shards it ever saw, for as long as its cache lived.
// That is how a rebuilt lookup_eval/ produced "APD 22" with a single PED
// section on the reader's machine while rendering all eleven sections here:
// their manifest was hours old, had no `apd_order`, and so named no sections
// to draw.  Every fetch is versioned now, and WLV must be bumped whenever the
// data is rebuilt -- as must the `?v=` on the <script> tag in reader2.html.
// 2026-08-09: the dpd/ shards were REBUILT (DPD 2026-07-28 refresh + the
// family stubs stamped with their keys) and stores/lookup_eval/family/ is
// NEW — both must be uploaded to the R2 bucket beside the rest, or
// production 404s and only the unpacked-archive fallback works.
// 2026-08-10: `stores/lookup_eval/hw/` is NEW — 6,751 shards, the APD books and
// the Abhidhāna keyed on their own headwords (hwlook(), below).  IT IS SERVED
// FROM R2 LIKE THE REST, so `pipeline/r2_upload.sh` must run before this bump
// means anything: the manifest is fetched `?v=WLV`, and a reader who gets the
// new version against a bucket that has no `hw/` gets a 404 and the same "no
// entry" they get today.  Upload first, bump second.
var WLV = '20260909a';

// ---------------------------------------------------- gzipped shard sets --
// WHY THE SHARDS ARE STORED GZIPPED, AND WHY THAT IS NOT THE SAME AS
// TRANSFER COMPRESSION.  GitHub Pages already gzips a .json response over the
// wire, so the reader was never downloading the expanded bytes.  What the
// expanded bytes cost is the PUBLISHED SITE SIZE, which GitHub caps at 1 GB,
// and DPD's 379 MB of shards did not fit under it.  Storing them pre-gzipped
// (43.7 MB, 8.68x) buys the cap back, at the price of inflating here instead
// of in the network layer.
//
// WHICH sets are stored that way is the manifest's business, never this
// file's: `index.json` carries a `gz` list, so DPD-only and everything-gzipped
// are the same code path with different data.  A hardcoded list here is
// exactly the mistake that once made `āmanteti` show 2 sources where the site
// showed 10.
function gzSet(man, set) {
  return !!(man && man.gz && man.gz.indexOf(set) >= 0);
}
// DecompressionStream('gzip') is Safari 16.4+ / 93.7% of global traffic.  The
// remaining 6.3% must not silently get an empty panel, so INFLATE is a real
// fallback, not a stub -- see inflate.js's raw-DEFLATE decoder below.
var HAS_DS = (typeof DecompressionStream === 'function');
// ---- raw DEFLATE (RFC 1951), for browsers without DecompressionStream ------
// 6.3% of global traffic lacks DecompressionStream (Safari < 16.4).  Once the
// `lookup/` shards are gzipped too, that 6.3% would lose the WHOLE panel, not
// one tab -- so this is a real decoder, verified against every published shard,
// not a stub.  Returns null on any malformed input; the caller treats null the
// same as a failed fetch.
function rawInflate(b, pos) {
  var out = new Uint8Array(65536), olen = 0;
  var bitbuf = 0, bitcnt = 0, p = pos;
  function bits(n) {
    while (bitcnt < n) {
      if (p >= b.length) throw 0;
      bitbuf = (bitbuf | (b[p++] << bitcnt)) >>> 0; bitcnt += 8;
    }
    var v = bitbuf & ((1 << n) - 1);
    bitbuf >>>= n; bitcnt -= n;
    return v;
  }
  function grow(n) {
    if (olen + n <= out.length) return;
    var cap = out.length;
    while (cap < olen + n) cap *= 2;
    var t = new Uint8Array(cap); t.set(out.subarray(0, olen)); out = t;
  }
  function build(lengths, count0) {
    var maxbits = 0, i, N = count0 === undefined ? lengths.length : count0;
    for (i = 0; i < N; i++) if (lengths[i] > maxbits) maxbits = lengths[i];
    var count = new Int32Array(maxbits + 1);
    for (i = 0; i < N; i++) count[lengths[i]]++;
    count[0] = 0;
    var offs = new Int32Array(maxbits + 2), s = 0;
    for (i = 1; i <= maxbits; i++) { offs[i] = s; s += count[i]; }
    var symbol = new Int32Array(s);
    for (i = 0; i < N; i++) if (lengths[i]) symbol[offs[lengths[i]]++] = i;
    return {count: count, symbol: symbol, max: maxbits};
  }
  function decode(h) {
    var code = 0, first = 0, index = 0, len, cnt;
    for (len = 1; len <= h.max; len++) {
      code |= bits(1);
      cnt = h.count[len];
      if (code - first < cnt) return h.symbol[index + (code - first)];
      index += cnt; first = (first + cnt) << 1; code <<= 1;
    }
    throw 0;
  }
  var LBASE = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,
               115,131,163,195,227,258],
      LEXT  = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],
      DBASE = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,
               1537,2049,3073,4097,6145,8193,12289,16385,24577],
      DEXT  = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
  var ORD = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
  var fixedL = null, fixedD = null;
  try {
    for (;;) {
      var last = bits(1), type = bits(2), lh, dh, i, k;
      if (type === 0) {
        bitbuf = 0; bitcnt = 0;                      // discard to byte boundary
        if (p + 4 > b.length) throw 0;
        var len = b[p] | (b[p + 1] << 8);
        var nlen = b[p + 2] | (b[p + 3] << 8);
        if ((len ^ 0xffff) !== nlen) throw 0;
        p += 4;
        if (p + len > b.length) throw 0;
        grow(len);
        for (i = 0; i < len; i++) out[olen++] = b[p++];
      } else if (type === 1 || type === 2) {
        if (type === 1) {
          if (!fixedL) {
            var fl = new Uint8Array(288), fd = new Uint8Array(30);
            for (k = 0; k < 144; k++) fl[k] = 8;
            for (; k < 256; k++) fl[k] = 9;
            for (; k < 280; k++) fl[k] = 7;
            for (; k < 288; k++) fl[k] = 8;
            for (k = 0; k < 30; k++) fd[k] = 5;
            fixedL = build(fl); fixedD = build(fd);
          }
          lh = fixedL; dh = fixedD;
        } else {
          var hlit = bits(5) + 257, hdist = bits(5) + 1, hclen = bits(4) + 4;
          var cl = new Uint8Array(19);
          for (k = 0; k < hclen; k++) cl[ORD[k]] = bits(3);
          var ch = build(cl);
          var lens = new Uint8Array(hlit + hdist), n = 0, prev = 0, sym, rep;
          while (n < lens.length) {
            sym = decode(ch);
            if (sym < 16) lens[n++] = prev = sym;
            else if (sym === 16) { rep = 3 + bits(2);
                                   while (rep-- && n < lens.length) lens[n++] = prev; }
            else if (sym === 17) { rep = 3 + bits(3);
                                   while (rep-- && n < lens.length) lens[n++] = 0; prev = 0; }
            else { rep = 11 + bits(7);
                   while (rep-- && n < lens.length) lens[n++] = 0; prev = 0; }
          }
          lh = build(lens, hlit);
          dh = build(lens.subarray(hlit));
        }
        for (;;) {
          var s2 = decode(lh);
          if (s2 < 256) { grow(1); out[olen++] = s2; }
          else if (s2 === 256) break;
          else {
            s2 -= 257; if (s2 >= 29) throw 0;
            var length = LBASE[s2] + bits(LEXT[s2]);
            var ds = decode(dh); if (ds >= 30) throw 0;
            var dist = DBASE[ds] + bits(DEXT[ds]);
            var from = olen - dist; if (from < 0) throw 0;
            grow(length);
            for (var q = 0; q < length; q++) out[olen++] = out[from + q];
          }
        }
      } else throw 0;
      if (last) break;
    }
  } catch (e) { return null; }
  try { return new TextDecoder().decode(out.subarray(0, olen)); }
  catch (e) { return null; }
}
function ungzip(buf) {
  var b = new Uint8Array(buf);
  // gzip header: 10 bytes fixed, then optional FEXTRA/FNAME/FCOMMENT/FHCRC
  if (b.length < 18 || b[0] !== 0x1f || b[1] !== 0x8b || b[2] !== 8) return null;
  var flg = b[3], p = 10;
  if (flg & 4) { p += 2 + (b[p] | (b[p + 1] << 8)); }
  if (flg & 8) { while (p < b.length && b[p]) p++; p++; }
  if (flg & 16) { while (p < b.length && b[p]) p++; p++; }
  if (flg & 2) p += 2;
  return rawInflate(b, p);
}
// !!! THE ARCHIVE MUST BE ABLE TO READ ITS OWN DICTIONARIES.  Added 2026-08-07.
//
// The stores moved to an R2 bucket the same day, and `BASE`/`EBASE` below name
// it absolutely.  That alone would have defeated the very argument that chose
// Option D over Option B (DEPLOY_SCALE §5a): the stores stay tracked so they
// stay inside the Zenodo deposit -- and a release tarball does carry all 24,599
// of them, checked with `git archive`, there is no export-ignore -- but a reader
// unpacking that deposit in ten years would have every shard on disk beside a
// panel that looks for them at a domain which may no longer exist.  Empty tabs,
// no error, and the files sitting right there.  We would have preserved the data
// and taught the reader to ignore it.
//
// So: try the bucket, and on ANY failure -- 404, DNS, CORS, offline -- retry once
// against the path the files occupy inside the repository itself.  panel.js is
// loaded by site/reader/reader2.html, so relative URLs resolve from site/reader/
// and '../../stores/lookup/' is the store in an unpacked archive.  On the live
// site the same path cannot climb above the document root, resolves to
// /stores/lookup/, and 404s harmlessly -- so this branch is inert in production
// and only ever runs where it is needed.
//
// It costs a second request per MISS, never per hit.
var ABASE = '../../stores/lookup/';
var AEBASE = '../../stores/lookup_eval/';
function altUrl(url) {
  // BASE and EBASE are declared below this point; `var` hoists the declaration
  // but not the value, and altUrl only ever runs at fetch time, long after they
  // are assigned.  Guarded anyway rather than relying on that, because a null
  // prefix would make indexOf match at 0 and rewrite every URL.
  if (BASE && url.indexOf(BASE) === 0) return ABASE + url.slice(BASE.length);
  if (EBASE && url.indexOf(EBASE) === 0) return AEBASE + url.slice(EBASE.length);
  return null;   // already relative, or something else entirely: no second try
}
function jfetch(url, gz) {
  if (CACHE[url]) return CACHE[url];
  return CACHE[url] = jfetch1(url, gz).then(function (v) {
    if (v !== null && v !== undefined) return v;
    var alt = altUrl(url);
    return alt ? jfetch1(alt, gz) : null;
  });
}
function jfetch1(url, gz) {
  var u = (gz ? url + '.gz' : url);
  u += (u.indexOf('?') >= 0 ? '&' : '?') + 'v=' + WLV;
  return fetch(u).then(function (r) {
    if (!r.ok) return null;
    if (!gz) return r.json();
    // !!! SNIFF THE BODY, DO NOT TRUST THE URL.  A .gz can arrive here in
    // EITHER of two states and the difference is the host's, not ours:
    //
    //   * opaque -- Content-Type: application/gzip and no Content-Encoding,
    //     so the browser hands over the compressed bytes untouched.  This is
    //     what a plain static server does, and what localhost does.
    //   * ALREADY INFLATED -- a host that sets `Content-Encoding: gzip` on
    //     the response makes the browser inflate it in the network layer, and
    //     what lands here is ordinary JSON.
    //
    // Inflating the second case produces null and an empty tab.  `python3 -m
    // http.server` never sets that header, so localhost and every gate pass
    // are blind to it -- which is exactly the kind of difference between the
    // test rig and the real host that this project has been bitten by before.
    // Two magic bytes settle it, and cost nothing.
    return r.arrayBuffer().then(function (ab) {
      var b = new Uint8Array(ab);
      if (b.length < 2 || b[0] !== 0x1f || b[1] !== 0x8b) {
        try { return JSON.parse(new TextDecoder().decode(b)); }
        catch (e) { return null; }
      }
      if (HAS_DS)
        return new Response(new Blob([ab]).stream()
                 .pipeThrough(new DecompressionStream('gzip'))).json()
               .catch(function () { return null; });
      var s = ungzip(ab);
      return s == null ? null : JSON.parse(s);
    });
  }).catch(function () { return null; });
}
// !!! THE SHARD DATA IS NO LONGER SERVED FROM THIS SITE.  Changed 2026-08-07
// per docs/DEPLOY_SCALE.md §6a — the reader's decision D+B: the stores stay in
// the repository (so they stay inside the Zenodo deposit) but move out of
// site/, and are served from a Cloudflare R2 bucket.  Pages then publishes
// ~2,000 files instead of 26,576, which is what the ten-minute publish ceiling
// was actually failing on.
//
// THESE TWO LINES ARE THE WHOLE SWITCH, AND REVERTING IS EDITING THEM BACK.
// The previous values are kept here deliberately, not in the history alone:
//
//     var BASE  = '../lookup/';
//     var EBASE = '../lookup_eval/';
//
// The old comment, still true of the relative form and the reason it had '../':
// this file runs from site/reader/, so a bare 'lookup/…' resolved to
// /reader/lookup/ and every fetch 404'd in silence — which is exactly what the
// first run of gate_reader.py found: the panel opened, the header was right,
// and every count was empty.
//
// PROVEN AGAINST THE REAL BUCKET before this line changed, not after:
// `node pipeline/check_r2_origin.js https://dict.buddha-dhamma.net` — 38 passed,
// 0 failed, including the three negative controls.  R2 serves the .gz shards
// OPAQUE (Content-Type: application/gzip, no Content-Encoding), the same state
// GitHub Pages serves them in, so jfetch's magic-byte branch is unchanged.
// The 164 non-ASCII and 458 space-containing shard names survive the round
// trip intact; both were probed on purpose.
var BASE = 'https://dict.buddha-dhamma.net/lookup/';
var EBASE = 'https://dict.buddha-dhamma.net/lookup_eval/';
// The manifest names the shards; without it shardName() guesses a 2-character
// prefix that mostly does not exist.  Nothing may look anything up until it has
// landed, so every lookup waits on the same promise.
var MANP = null, EMAN = null, EMANP = null;
function manifest() {
  if (!MANP) MANP = jfetch(BASE + 'index.json').then(function (m) { MAN = m; return m; });
  return MANP;
}
function emanifest() {
  if (!EMANP) EMANP = jfetch(EBASE + 'index.json').then(function (m) { EMAN = m; return m; });
  return EMANP;
}
function eShardName(set, key) {
  var f = fold(key), m = EMAN && EMAN.shards && EMAN.shards[set];
  if (!m) return null;
  for (var d = 2; d <= 40; d++) {
    var name = (f.slice(0, d) + new Array(d + 1).join('_')).slice(0, d);
    if (m[name]) return name;
  }
  return null;
}
// !!! A TYPED WORD IS NOT A CLICKED ONE, AND THE STORE IS KEYED EXACTLY.
// `look()` picks its shard by the FOLDED key -- so `nibbana` and `nibbāna`
// land in the same file -- and then reads `o[key]`, which is exact.  A
// reader typing without diacritics would therefore reach the right shard
// and miss every entry in it, which reads as "the word is not in the
// canon": a confident wrong answer, the shape this project keeps meeting.
//
// So resolve the typed string against the shard's own keys before looking
// anything up.  Exact wins; then the case-folded form; then the
// diacritic-folded one, shortest first so `nibbana` prefers `nibbāna` over
// `nibbanaṁ`.  Returns null when the shard genuinely has nothing, and the
// caller SAYS so rather than opening an empty panel.
function resolveTyped(q) {
  var w = (q || '').trim();
  if (!w) return Promise.resolve(null);
  return manifest().then(function () {
    return jfetch(BASE + 'freq/' + shardName('freq', w) + '.json',
                  gzSet(MAN, 'freq'));
  }).then(function (o) {
    if (!o) return null;
    // !!! WHAT THE READER TYPED IS WHAT THE READER GETS.  Reader, 2026-08-10:
    // "If I type kiriya it should not change to kiriyā.  If I type itthi it
    // should not correct to itthī after pressing enter."
    //
    // THIS REVERSES THE ORDER SET ON 2026-08-05, and the reason that order
    // existed is kept here because it is a real reason and it is now met a
    // different way.  It read: `nibbana` IS a key -- it occurs once -- so
    // exact-first sends a reader who typed it to a hapax instead of to
    // `nibbāna`, which occurs 17,211 times; right by the letter, useless in
    // fact.  The rule chosen then was that a plain-ASCII query asks for the
    // COMMONEST reading of what it spells.
    //
    // What that rule did in practice was substitute a word the reader had not
    // typed, SILENTLY.  `kiriya` occurs 4 times and `kiriyā` 296; `itthi` 45
    // and `itthī` 825.  Both typed spellings are real words of the edition,
    // and the reader asking for one was shown the other with nothing said.
    //
    // So: an exact key wins, always.  The frequency argument is answered by
    // `siblings()` instead, which offers the commoner spelling as a LINE the
    // reader can click rather than as a decision taken for them -- the same
    // information, without the substitution.  A query that is NOT a key still
    // falls through to the fold match, which is what makes diacritics optional
    // (§7) and what the search box's own placeholder promises.
    if (o[w] !== undefined) return w;
    var lc = w.toLowerCase();
    if (o[lc] !== undefined) return lc;
    var f = fold(w), best = null, bestN = -1;
    for (var k in o) {
      if (fold(k) !== f) continue;
      var n = (o[k] && o[k][0]) || 0;
      if (n > bestN || (n === bestN && best !== null && k.length < best.length)) {
        best = k; bestN = n;
      }
    }
    if (best !== null) return best;
    // !!! AND IF THE CORPUS DOES NOT HAVE IT, ASK THE DICTIONARIES BEFORE
    // SAYING NO.  Everything above this line queries `lookup/freq/`, which is
    // the set of words that OCCUR IN THE TIPIṬAKA.  So the search box was
    // gated on the corpus while the panel it opens is mostly dictionaries, and
    // a headword the edition never inflects bare could not be typed at all.
    // That is the `atappaka` report of 2026-08-05: the word is in the
    // Abhidhāna and in the APD, the corpus has only `atappakaṁ`, `atappake`,
    // `atappakena`, `atappako`, and the box answered "not found".
    // A word the reader can read in a dictionary must be a word the reader can
    // type. Only reached when the corpus has already missed, so it costs
    // nothing on the common path.
    return inDicts(w).then(function (hit) {
      if (hit) return w;
      return lc === w ? null : inDicts(lc).then(function (h2) { return h2 ? lc : null; });
    });
  }).catch(function () { return null; });
}
// Is this word a KEY in any dictionary the panel serves?  Not "does it look
// like a word" and not a fold search -- an exact key, which is what `lookup`
// will go on to fetch.  PED ships publicly; `lem` and `dpd` are the evaluation
// store and `elook` already returns null when that is switched off, so this
// answers "no" for a reader who has turned those sources off, which is right.
// !!! AND `hw` IS ONE OF THEM, OR THE FIX REACHES A CLICK AND NOT THE SEARCH
// BOX.  Wiring the own-headword store into lookup() alone made `yathānisinna`
// answer when a reader CLICKS it in the text, while the search box went on
// saying "not found" — because the box asks this function, and this function
// asked the three sets keyed through DPD.  That is the atappaka defect of
// 2026-08-05 exactly, one store later: a word the reader can read in a
// dictionary must be a word the reader can type.
function inDicts(w) {
  return Promise.all([
    look('ped', w).catch(function () { return null; }),
    elook('lem', w).catch(function () { return null; }),
    elook('dpd', w).catch(function () { return null; }),
    hwlook(w).catch(function () { return null; })
  ]).then(function (r) { return !!(r[0] || r[1] || r[2] || r[3]); });
}
// THE CORPUS FORMS THAT BEGIN WITH WHAT WAS TYPED.  One shard fetch: prefix
// sharding puts every key beginning with fold(q) in the shard fold(q) names —
// or in a shallower one holding a superset of them — so the whole answer is in
// the file `shardName` already resolves to, and there is nothing to scan.
//
// It returns [] rather than guessing when the shard cannot be named, which is
// the short-query case (a two-letter query may sit under shards split deeper
// than the query is long).  A miss then reads exactly as it does today.
// !!! AND A LITERAL PREFIX IS THE WRONG MATCH FOR PĀḶI (reader, 2026-08-10, on
// the first live look at this list).  It offered SEVEN forms of `yathānisinna`
// and 16 occurrences where the corpus has TWELVE and 52 — because the final
// vowel of a stem inflects, and `yathānisinnova`, `yathānisinneneva`,
// `yathānisinnesu`, `yathānisinno`, `yathānisinnoyeva` do not begin with
// `yathānisinna` at all.  The commonest form of the whole set, `yathānisinnova`
// at 27 occurrences — more than half the total — was the one being dropped, and
// the count line stated 7 and 16 as if they were the answer.  A summary that
// contradicts the data it summarises, one day after that was written down.
//
// So the match trims ONE trailing vowel or nasal from the folded query, and the
// heading then names the prefix actually used — `yathānisinn`, accented,
// because fold() is one character for one character and the typed string can be
// sliced to the same length.  Nothing is implied about morphology: this is not
// a lemma search (that waits on the Kaccāyana work), it is a wider prefix,
// honestly labelled.
// THE OTHER SPELLINGS OF WHAT WAS TYPED, OFFERED AND NOT IMPOSED.
// The 2026-08-05 order silently opened the commonest reading of a plain-ASCII
// query; the reader asked for that to stop (2026-08-10) and it has.  The
// argument behind it was still sound — `nibbana` occurs once and `nibbāna`
// 17,211 — so the information survives as a line: every other corpus form that
// folds to the same string, commonest first, each one a click.  Nothing is
// substituted and nothing is hidden.
//
// The shard is the one `resolveTyped` has already fetched, so this costs no
// request: `jfetch` memoises by URL.
function siblings(word) {
  var f = fold(word || '');
  if (!f) return Promise.resolve([]);
  return manifest().then(function () {
    return jfetch(BASE + 'freq/' + shardName('freq', f) + '.json',
                  gzSet(MAN, 'freq'));
  }).then(function (o) {
    if (!o) return [];
    var out = [];
    for (var k in o) {
      if (k === word || fold(k) !== f) continue;
      out.push({w: k, n: (o[k] && o[k][0]) || 0});
    }
    out.sort(function (a, b) { return b.n - a.n || a.w.length - b.w.length; });
    return out.slice(0, 6);
  }).catch(function () { return []; });
}
var PFX_MAX = 24;
function prefixOf(q) {
  var f = fold((q || '').trim());
  return (f.length > 4 && 'aiueom'.indexOf(f.slice(-1)) >= 0) ? f.slice(0, -1) : f;
}
function corpusPrefix(q) {
  var typed = (q || '').trim(), f = prefixOf(typed), exact = fold(typed);
  if (f.length < 3) return Promise.resolve([]);
  return manifest().then(function () {
    return jfetch(BASE + 'freq/' + shardName('freq', f) + '.json',
                  gzSet(MAN, 'freq'));
  }).then(function (o) {
    if (!o) return [];
    var out = [];
    for (var k in o) {
      if (fold(k).indexOf(f) !== 0) continue;
      if (fold(k) === exact) continue;      // an exact key is not a suggestion
      out.push({w: k, n: (o[k] && o[k][0]) || 0});
    }
    // commonest first — the same ordering rule resolveTyped uses when a plain
    // ASCII spelling has to choose between readings; ties to the shorter form.
    out.sort(function (a, b) { return b.n - a.n || a.w.length - b.w.length; });
    return out.slice(0, PFX_MAX);
  }).catch(function () { return []; });
}
function look(set, key) {
  return manifest().then(function () {
    return jfetch(BASE + set + '/' + shardName(set, key) + '.json', gzSet(MAN, set));
  }).then(function (o) {
    return o ? (o[key] !== undefined ? o[key] : o[key.toLowerCase()]) : null;
  });
}
// the evaluation store, same shard scheme, different manifest and directory
function elook(set, key) {
  if (!EVAL) return Promise.resolve(null);
  return emanifest().then(function () {
    var n = eShardName(set, key);
    return n ? jfetch(EBASE + set + '/' + n + '.json', gzSet(EMAN, set)) : null;
  }).then(function (o) {
    if (!o) return null;
    var v = o[key] !== undefined ? o[key] : o[key.toLowerCase()];
    // an oversize value lives in its own file; the shard holds only a marker
    // !!! AN OVERSIZE LEMMA RECORD IS NOW PAGED BY KEY, NOT JUST BY ROW.  A
    // record carrying all twenty-four APD dictionaries can exceed the shard
    // cap on its own, so build_lookup splits it across files; fetching only
    // page 0 would silently drop whichever dictionaries fell on later pages.
    if (v && v.big && v.pages) {
      var jobs = [];
      for (var i = 0; i < v.pages; i++)
        jobs.push(jfetch(EBASE + set + '/big/' + safeName(key) + '.' + i + '.json',
                         gzSet(EMAN, set)));
      return Promise.all(jobs).then(function (pgs) {
        var out = null;
        pgs.forEach(function (pg) {
          if (!pg || !pg.rows) return;
          if (Array.isArray(pg.rows)) out = (out || []).concat(pg.rows);
          else { out = out || {}; for (var k2 in pg.rows) out[k2] = pg.rows[k2]; }
        });
        return out;
      });
    }
    return v;
  });
}

// ---------------------------------------- the dictionaries' OWN headwords --
// !!! DPD DECIDED WHICH WORDS THE ABHIDHĀNA WAS ALLOWED TO ANSWER, AND IT
// SILENCED 77.8% OF IT.  `build_eval.py` builds the `lem` key set as corpus
// forms → DPD index → DPD headwords, and then attaches the Abhidhāna and all
// the APD books TO THOSE LEMMAS AND NOTHING ELSE.  The question the build asks
// is therefore not "does the Abhidhāna have this word?" but "does DPD have a
// headword for some corpus form of it?" — and §9 admits the Abhidhāna as the
// ONLY dictionary that is an authority while ranking DPD lowest.  163,453 of
// 210,111 headwords were unreachable.  The reader met it as `yathānisinna`
// returning "no entry" while dictionary.sutta.org answered it, from two books
// sitting in our own `_dictsrc/`.  `claude/dpd_gates_the_abhidhana.md`.
//
// `stores/lookup_eval/hw/` is that store, keyed on fold(headword) — which
// lowercases AND strips diacritics, so `Yathānisinna`, `yathānisinna` and
// `yathanisinna` are one key and the capitalised `acc` trap cannot bite.  It
// carries ITS OWN MANIFEST: `build_eval.py` rewrites the eval index.json
// wholesale on every run, so an `hw` entry there would vanish on the next
// rebuild, silently, the way `family/` vanished from a commit.
//
// IT IS ADDITIVE AND IT IS CONSULTED LAST.  Only when `lem` has returned
// nothing — the path that says "no entry" today — so no word that answers now
// can answer differently, and the cost on the common path is zero requests.
var HWMANP = null, HWMAN = null;
function hwmanifest() {
  if (!HWMANP) HWMANP = jfetch(EBASE + 'hw/index.json')
    .then(function (m) { HWMAN = m; return m; });
  return HWMANP;
}
function hwlook(key) {
  if (!EVAL) return Promise.resolve(null);
  var f = fold(key || '');
  if (!f) return Promise.resolve(null);
  return hwmanifest().then(function (m) {
    if (!m || !m.shards) return null;
    for (var d = 2; d <= 40; d++) {
      var name = (f.slice(0, d) + new Array(d + 1).join('_')).slice(0, d);
      if (m.shards[name])
        return jfetch(EBASE + 'hw/' + name + '.json', gzSet(m, 'hw'));
    }
    return null;
  }).then(function (o) {
    return o && o[f] !== undefined ? o[f] : null;
  }).catch(function () { return null; });
}

// -------------------------------------------------- WordNet, the English --
// !!! THE REFERENCE TABS ARE WRITTEN IN PHILOLOGISTS' ENGLISH -- "almsman",
// "mendicant", "denominative", "periphrastic", "aorist" -- and this project's
// stated audience is Spanish-speaking.  They meet that English before they
// meet the Pāḷi.  So an English word inside another dictionary's definition is
// clickable and this is what answers it.  Reader's decision, 2026-08-02.
//
// IT DOES NOT TOUCH §9.  §9 governs which dictionaries may speak about PĀḶI.
// An English dictionary explaining an English word in someone else's gloss is
// not a Pāḷi authority, and the view says so in as many words.  It is
// attributed like every other source, because §9's attribution obligation is
// not limited to the Abhidhāna.
//
// The store is `site/lookup/wn/`, built by `_panel/build_wordnet.py` and
// sharded by the same adaptive prefix as every other set, so `look()` reaches
// it unchanged.  A value is EITHER a list of senses
// `[[pos, definition, [examples], [synonyms]], …]` OR a string, the lemma an
// irregular inflection belongs to (WordNet's own exception lists, folded in at
// build time so the browser needs no exception file).
//
// The REGULAR inflections are Morphy's detachment table, and they are here
// rather than in the data because expanding them into keys would multiply the
// store several times over for forms a reader may never click.
var WN_RULES = [['ses', 's'], ['xes', 'x'], ['zes', 'z'], ['ches', 'ch'],
                ['shes', 'sh'], ['ies', 'y'], ['men', 'man'], ['s', ''],
                ['es', 'e'], ['es', ''], ['ed', 'e'], ['ed', ''],
                ['ing', 'e'], ['ing', ''], ['est', 'e'], ['est', ''],
                ['er', 'e'], ['er', '']];
function wnCandidates(w) {
  var out = [], seen = {};
  function add(x) { if (x && x.length > 1 && !seen[x]) { seen[x] = 1; out.push(x); } }
  add(w);
  WN_RULES.forEach(function (r) {
    if (w.length > r[0].length && w.slice(-r[0].length) === r[0])
      add(w.slice(0, w.length - r[0].length) + r[1]);
  });
  return out;
}
// -> {key, senses, from} or null.  `from` is the word as clicked when the
// answer came from an inflected form, so the view can say which lemma it read.
function wnLook(word) {
  var w = String(word || '').toLowerCase();
  if (!/^[a-z][a-z'\-]*$/.test(w)) return Promise.resolve(null);
  var cands = wnCandidates(w), i = 0;
  function step() {
    if (i >= cands.length) return Promise.resolve(null);
    var k = cands[i++];
    return look('wn', k).then(function (v) {
      if (!v) return step();
      if (typeof v === 'string')
        return look('wn', v).then(function (v2) {
          return (v2 && typeof v2 !== 'string')
            ? {key: v, senses: v2, from: w} : step();
        });
      return {key: k, senses: v, from: (k === w ? null : w)};
    });
  }
  return step();
}
var WN_POS = {n: 'wl_pos_n', v: 'wl_pos_v', a: 'wl_pos_a', r: 'wl_pos_r'};
// `alsoPali` is true when the corpus ALSO carries this string.  74 of the
// 6,503 distinct pure-ASCII forms in 09Ma01, 16An02 and 11MaA02 do -- `na`,
// `ti`, `ca`, `so`, `pare` -- so the route to the edition is one click away
// rather than a wrong answer the reader cannot get out of.
function renderWn(word, r, alsoPali, paraEl) {
  current = {word: word, para: paraEl, en: true};
  var h = '<div class="wl-src">' + esc(T('wl_wn_src')) + '</div>';
  if (r.from)
    h += '<div class="wl-flag">' + esc(T('wl_wn_from')) + ' <b>' + esc(r.key) + '</b></div>';
  h += '<ol class="wl-wn">';
  (r.senses || []).forEach(function (s) {
    h += '<li><span class="wl-wn-pos">' + esc(T(WN_POS[s[0]] || 'wl_pos_n'))
       + '</span> ' + esc(s[1] || '');
    if (s[3] && s[3].length)
      h += '<div class="wl-wn-syn">' + esc(T('wl_wn_syn')) + ': '
         + esc(s[3].join(', ')) + '</div>';
    (s[2] || []).forEach(function (e) {
      h += '<div class="wl-wn-ex">“' + esc(e) + '”</div>';
    });
    h += '</li>';
  });
  h += '</ol>';
  if (alsoPali)
    h += '<button class="wl-topali" type="button">' + esc(T('wl_wn_pali')) + '</button>';
  h += '<div class="wl-why">' + esc(T('wl_wn_why')) + '</div>';
  document.getElementById('wlw').textContent = word;
  document.getElementById('wlc').textContent = '';
  document.getElementById('wlt').innerHTML =
    '<button role="tab" data-tab="wn" aria-selected="true" class="on">'
    + esc(T('wl_wn_tab')) + '</button>';
  var body = document.getElementById('wlb');
  body.innerHTML = h;
  var b = body.querySelector('.wl-topali');
  // no HIST push: this is a lateral move INSIDE the detour, and the entry
  // already on the stack is the Pāḷi word the reader left.  Pushing here is
  // what would put an English word back on a stack that `wlback` renders
  // through the Pāḷi path.
  if (b) b.addEventListener('click', function () {
    lookup(word, current && current.para, true);
  });
  el.dataset.state = 'ready';
}

// -------------------------------------------------------------- the markup --
var CSS = ''
+ '#wl{position:fixed;z-index:60;background:var(--panel);color:var(--fg);'
+ 'border-left:1px solid var(--line);box-shadow:-2px 0 18px rgba(0,0,0,.10);'
+ 'display:none;flex-direction:column;font-family:Inter,system-ui,sans-serif}'
+ '#wl.open{display:flex}'
+ 'body.wl-side #wl{top:52px;right:0;bottom:0;width:380px}'
+ 'body.wl-sheet #wl{left:0;right:0;bottom:0;top:auto;width:auto;max-height:62vh;'
+ 'border-left:none;border-top:2px solid var(--accent);box-shadow:0 -6px 20px rgba(0,0,0,.22)}'
+ '#wl .wl-h{padding:9px 12px 0;border-bottom:1px solid var(--line);background:var(--app)}'
+ '#wl .wl-w{font-family:"Gentium Plus",Georgia,serif;font-size:22px;font-weight:700;'
+ 'padding-right:26px;word-break:break-word}'
+ '#wl .wl-c{font-size:11px;color:var(--mut);margin:2px 0 7px}'
+ '#wl .wl-find{margin-left:7px;border:1px solid var(--line);background:none;'
+ 'color:var(--mut);border-radius:6px;width:22px;height:22px;line-height:1;'
+ 'font-size:14px;cursor:pointer;vertical-align:middle;padding:0}'
+ '#wl .wl-find:hover,#wl .wl-find.on{color:var(--fg);border-color:var(--fg)}'
+ '#wl .wl-q{font-family:"Gentium Plus",Georgia,serif;font-size:19px;'
+ 'width:100%;box-sizing:border-box;border:1px solid var(--fg);border-radius:7px;'
+ 'background:var(--panel);color:var(--fg);padding:2px 8px}'
+ '#wl .wl-c b{color:var(--fg)}'
+ '#wl .wl-x{position:absolute;top:6px;right:9px;border:none;background:none;'
+ 'font-size:17px;color:var(--mut);cursor:pointer;line-height:1}'
+ '#wl .wl-tabs{display:flex;gap:3px;flex-wrap:wrap}'
+ '#wl .wl-tabs button{font:600 12px/1 Inter,system-ui,sans-serif;border:1px solid var(--line);'
+ 'border-bottom:none;background:var(--chip);color:var(--chipfg);padding:7px 10px 8px;'
+ 'border-radius:8px 8px 0 0;cursor:pointer;position:relative}'
+ '#wl .wl-tabs button[aria-selected=true]{background:var(--panel);color:var(--accent)}'
+ '#wl .wl-tabs button.dis{opacity:.42;cursor:default}'
+ '#wl .wl-tabs button .wl-n{font-weight:400;opacity:.7}'
// !!! THE SECOND TOOLTIP LIVED HERE, AND IT IS WHY THE READER SAW TWO
// (2026-08-05, screenshot: the DPD tab drawing "Digital Pāḷi Dictionary
// (Bodhirasa) — CC BY-NC-SA 4.0" twice at once).
//
// This rule drew a CSS-only tooltip from `data-tip` with `::after`.  reader2's
// delegated `mouseover` handler ALSO fires on every `[data-tip]` and draws
// `#tiptip` from the same attribute.  One attribute, two renderers, both
// correct on their own terms and both visible together.  Moving `#tiptip`
// above the tab did not fix it — it separated them, which is how the second
// one became obvious.
//
// The `::after` is the weaker of the two and it is the one that goes: it is
// `position:absolute` inside the panel so the panel's own overflow can clip
// it, it is pinned `top:calc(100% + 5px)` with no flip and no viewport
// clamping, and being a pseudo-element it cannot be inspected by any gate.
// `#tiptip` is rendered on <body>, cannot be clipped, flips and clamps, and
// prefers ABOVE inside `#wl` so it no longer covers the panel's own notice.
//
// Nothing replaces this rule: the tabs keep `data-tip` and reader2 draws it.
  // !!! THE PANEL FOLLOWS THE READER'S OWN TEXT SIZE.  This was 13.5px, flat,
  // so the A- / A+ buttons in the top bar moved the canon text and did nothing
  // at all to the pane holding the definitions -- the one place a reader who
  // enlarged the text because they needed to was going in order to look more
  // closely.  `--rsize` now lives on :root (reader2.html) precisely so this
  // fixed-position element can see it; the fallback is its default, 15.5px.
+ '#wl .wl-b{overflow-y:auto;overflow-wrap:break-word;padding:10px 12px 18px;flex:1 1 auto;'
+ 'font-size:calc(var(--rsize, 15.5px) - 2px);line-height:1.55}'
+ '#wl .wl-cite a.wl-go{color:inherit;text-decoration:none;border-bottom:1px dotted currentColor}'
+ '#wl .wl-cite a.wl-go:hover{color:var(--acc,inherit);border-bottom-style:solid}'
+ '#wl .wl-src{font-size:11px;color:var(--mut);margin:0 0 8px}'
  // the sharing terms: same weight as the attribution, but set apart so it
  // reads as a condition rather than a credit
  // opacity:.9 used to sit on top of --mut and compounded the contrast problem
  // -- two dimmings for one effect.  The colour does the work on its own.
+ '#wl .wl-rights{font-size:11px;color:var(--mut);margin:-4px 0 10px;'
+ 'padding:5px 8px;border-left:2px solid var(--mut)}'
+ '#wl .wl-sub{font-size:11px;letter-spacing:.06em;text-transform:uppercase;'
+ 'color:var(--mut);margin:12px 0 4px}'
+ '#wl .wl-promo{border:1px solid var(--line);border-left:3px solid var(--comm);'
+ 'border-radius:8px;padding:2px 9px;background:var(--app)}'
+ '#wl .wl-wordgrp{border:1px solid var(--line);border-left:3px solid var(--canon);'
+ 'border-radius:8px;padding:2px 9px}'
  // !!! THIS LINE IS AN ARGUMENT, NOT A FOOTNOTE.  "shown first because the
  // phrase the edition glosses stands in this paragraph -- checked, not
  // guessed" is the entire design claim of the Gloss tab: the sentence that
  // separates a promotion from a guess, and the one thing a reader cannot
  // verify for themselves.  It was 10.5px in --mut, which made it the least
  // legible text in the interface.
+ '#wl .wl-why{font-size:11px;color:var(--fg);margin:3px 0 0;font-style:italic}'
+ '#wl .wl-row{border-top:1px solid var(--line);padding:7px 0 5px}'
+ '#wl .wl-promo .wl-row:first-child,#wl .wl-wordgrp .wl-row:first-child,'
+ '#wl .wl-row:first-of-type{border-top:none}'
  // !!! PĀḶI IN THE PANEL IS THE SAME SIZE AS THE PĀḶI THAT WAS CLICKED.
  // These two set no size at all, so they inherited the panel body -- the same
  // script, the same language, two pixels smaller in the place the reader went
  // in order to see it better.  Gentium's small x-height made the gap read
  // wider than 2px beside Inter.  English and metadata stay where they are;
  // only the Pāḷi comes back up to --rsize.
+ '#wl .wl-lem{font-family:"Gentium Plus",Georgia,serif;font-weight:700;font-size:var(--rsize, 15.5px)}'
+ '#wl .wl-g{font-family:"Gentium Plus",Georgia,serif;font-size:var(--rsize, 15.5px)}'
+ '#wl .wl-cite{font-size:11px;color:var(--mut);margin-top:2px}'
+ '#wl .wl-flag{font-size:11px;color:var(--mut)}'
// WordNet: an ordered list of senses, each with its part of speech, its
// synonyms and WordNet's own examples.  English, so it takes the panel's
// English size (A1) and not the Pāḷi face.
+ '#wl .wl-wn{margin:2px 0 6px;padding-left:1.4em}'
+ '#wl .wl-wn li{margin:5px 0}'
+ '#wl .wl-wn-pos{color:var(--accent);font-style:italic;margin-right:4px}'
+ '#wl .wl-wn-syn,#wl .wl-wn-ex{font-size:11.5px;color:var(--mut);margin-top:2px}'
+ '#wl .wl-topali{font:600 12px Inter,system-ui,sans-serif;color:var(--accent);'
+ 'background:none;border:1px dashed var(--line);border-radius:6px;'
+ 'padding:6px 10px;cursor:pointer;margin:6px 0;display:block}'
+ '#wl .wl-more{font:600 12px Inter,system-ui,sans-serif;color:var(--accent);'
+ 'background:none;border:1px dashed var(--line);border-radius:6px;padding:6px 10px;'
+ 'cursor:pointer;margin:10px 0}'
+ '#wl .wl-none{color:var(--mut);font-size:12.5px}'
// the corpus forms offered before a miss message: chips, wrapping, each one a
// lookup of that form.  Deliberately quiet — they are a suggestion, not an
// answer, and the message below them still says the typed word has no entry.
+ '#wl .wl-prefix{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0 10px}'
+ '#wl .wl-pfx{font:400 12.5px/1.3 Inter,system-ui,sans-serif;color:var(--fg);'
+ 'background:none;border:1px solid var(--line);border-radius:6px;'
+ 'padding:3px 7px;cursor:pointer}'
+ '#wl .wl-pfx:hover{border-color:var(--accent);color:var(--accent)}'
+ '#wl .wl-sibs{margin-top:5px;display:flex;flex-wrap:wrap;gap:5px;align-items:baseline}'
+ '#wl .wl-sib{font:400 12.5px/1.3 Inter,system-ui,sans-serif;color:var(--fg);'
+ 'background:none;border:1px solid var(--line);border-radius:6px;'
+ 'padding:2px 6px;cursor:pointer}'
+ '#wl .wl-sib:hover{border-color:var(--accent);color:var(--accent)}'
// SMALL BUT VISIBLE, at the reader's direction.  It was --mut, which the
// 2026-08-02 contrast survey measured at 3.40:1 on --app — under AA, i.e.
// not reliably legible, which for a caution is the wrong failure.
// SMALL BUT VISIBLE, at the reader's direction, and smaller again once it
// stopped repeating under every dictionary.  It was --mut, which the
// 2026-08-02 contrast survey measured at 3.40:1 on --app -- under AA, i.e.
// not reliably legible, which for a caution is the wrong way to fail.
// (The first version of this rule carried TWO font-size declarations and
// the second silently won.  One only.)
+ '#wl .wl-banner{background:var(--app);color:var(--fg);font-size:10.5px;'
+ 'line-height:1.45;border:1px solid var(--line);'
+ 'border-radius:6px;padding:5px 8px;margin:0 0 10px}'
  // !!! BURMESE NEEDS MORE ROOM THAN LATIN, NOT LESS.  1.9 line-height was
  // already right; the size was not.  Stacked consonants, asat and kinzi are
  // exactly what the character census exists to verify, and at 15px they are
  // hard to tell apart -- a conversion the reader cannot see is a conversion
  // the reader cannot check.  One pixel above --rsize, so it stays the largest
  // thing in the body at every setting of A- / A+.
+ '#wl .wl-my{font-family:"Padauk","Myanmar Text","Myanmar MN","Myanmar Sangam MN","Noto Sans Myanmar",serif;'
+ 'font-size:calc(var(--rsize, 15.5px) + 1px);line-height:1.9;margin:.25em 0}'
  // the etymology line is Burmese too and was a further pixel down at 14px --
  // the same fault as above, one line lower, and not named in the brief
+ '#wl .wl-etym{color:var(--comm);font-family:"Padauk","Myanmar Text","Myanmar MN","Myanmar Sangam MN",serif;'
+ 'font-size:var(--rsize, 15.5px);line-height:1.9}'
+ '#wl .wl-cites{font-size:11px;color:var(--fg);background:var(--app);'
+ 'border-radius:5px;padding:4px 7px;margin:.3em 0}'
+ '#wl .wl-reveal{font:600 11px Inter,system-ui,sans-serif;color:var(--accent);'
+ 'background:none;border:1px dashed var(--line);border-radius:5px;'
+ 'padding:4px 8px;cursor:pointer;margin:.3em 0}'
+ '#wl .wl-inline{border-left:3px solid var(--line);padding-left:8px;margin:.3em 0}'
+ '#wl .wl-hidden{display:none}'
+ '#wl .wl-sec{border-top:1px solid var(--line);padding-top:10px;margin-top:14px}'
+ '#wl .wl-sec:first-of-type{border-top:none;margin-top:0;padding-top:0}'
+ '#wl .wl-sec .wl-sub{margin-top:0;color:var(--accent);font-size:11.5px}'
+ '#wl .wl-jump{font-size:11.5px;line-height:1.9;padding:0 0 10px;'
+ 'border-bottom:1px solid var(--line);margin-bottom:12px}'
/* the APD gear (decided 2026-08-06): a small control above the jump strip, a
   popover of checkboxes, and the one-line header a switched-off section keeps
   when it has a hit — hidden must not mean absent */
+ '#wl .wl-gearrow{display:flex;justify-content:flex-end;position:relative;margin:0 0 4px}'
+ '#wl .wl-gear{background:none;border:1px solid var(--line);border-radius:8px;'
+ 'color:var(--mut);cursor:pointer;font-size:13px;line-height:1;padding:3px 8px}'
+ '#wl .wl-gear:hover{background:var(--hover);color:var(--accent)}'
+ '#wl .wl-gearpop{position:absolute;right:0;top:26px;z-index:6;background:var(--panel);'
+ 'border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 22px rgba(0,0,0,.2);'
+ 'padding:10px 12px;max-height:44vh;overflow:auto;min-width:230px;text-align:left}'
+ '#wl .wl-gearnote{display:block;margin-bottom:8px;line-height:1.45}'
+ '#wl .wl-gearopt{display:block;font-size:12.5px;margin:5px 0;cursor:pointer}'
+ '#wl .wl-moredicts{display:block;background:none;border:none;border-top:1px solid var(--line);'
+ 'color:var(--mut);cursor:pointer;font:inherit;font-size:12px;'
+ 'margin-top:14px;padding:10px 0 0;text-align:left;width:100%}'
+ '#wl .wl-moredicts:hover{color:var(--accent)}'
+ '#wl .wl-jump a{color:var(--accent);text-decoration:underline;'
+ 'text-decoration-style:dotted;text-underline-offset:2px;margin-right:2px}'
+ '#wl .wl-ext{overflow-wrap:break-word}'
+ '#wl .wl-ext table,#wl .wl-ext img{max-width:100%}'
/* DPD's declension grid is wider than any panel; it spilled 34px past the
   edge and the gate's geometry check caught it.  Scroll it, do not squash it:
   a declension table with collapsed columns is worse than one you drag. */
+ '#wl .wl-ext .inflection{display:block;overflow-x:auto;max-width:100%}'
+ '#wl .wl-ext .inflection table{max-width:none}'
/* !!! and not every DPD table is inside .inflection -- the gate reported a
   bare TBODY 34px past the edge.  Give every table in an entry its own
   horizontal scroller instead of trusting DPD's markup to be consistent. */
+ '#wl .wl-ext{max-width:100%}'
+ '#wl .wl-ext table{display:block;overflow-x:auto;max-width:100%;width:max-content}'
+ '#wl .wl-ext table tbody,#wl .wl-ext table thead{width:max-content}'
+ '#wl .wl-ext pre{white-space:pre-wrap;word-break:break-word}'
+ '#wl .wl-ext table{border-collapse:collapse;font-size:11.5px}'
/* DPD'S OWN CHIPS -- grammar, examples, declension, root family, compound
   family, idioms -- each open a block DPD keeps hidden inside the entry. They
   are how a DPD entry is read and the reader asked for them, so they are kept
   as chips, set smaller and warmer than the real tabs above so the two rows
   are told apart by weight.
   !!! This block went in once before and silently did not apply: the string it
   was replacing had drifted, the replace matched nothing, and there was no
   assertion to say so -- the chips rendered as four run-together blue links.
   Anchored and asserted now. */
+ '#wl .wl-ext a.dpd-button{display:inline-block;font:600 10.5px/1 Inter,system-ui,sans-serif;'
+ 'color:var(--chipfg);background:var(--chip);border:1px solid var(--line);'
+ 'border-radius:9px;padding:5px 9px;margin:3px 4px 0 0;text-decoration:none;'
+ 'cursor:pointer;white-space:nowrap}'
+ '#wl .wl-ext a.dpd-button:hover{background:var(--hover);color:var(--fg)}'
+ '#wl .wl-ext .button-box{margin:6px 0 3px}'
/* ...and the blocks they open must START closed.  DPD marks them
   `class="dpd content hidden"` and relies on its own stylesheet, which is not
   here -- so every one of them was open, and the entry arrived as a wall with
   the chips doing nothing visible. */
+ '#wl .wl-ext .content.hidden,#wl .wl-ext .dpd.hidden{display:none}'
/* DPD's feedback prompts point at DPD's own site and are addressed to its
   editors, not to a reader of this edition. */
+ '#wl .wl-ext a.dpd-link{display:none}'
+ '#wl .wl-ext p.dpd-footer{display:none}'
+ '#wl .wl-ext td,#wl .wl-ext th{border:1px solid var(--line);padding:1px 4px}'
+ '#wl .wl-back{border:1px solid var(--line);background:var(--panel);'
+ 'color:var(--accent);border-radius:5px;font:700 13px/1 Inter,system-ui,sans-serif;'
+ 'padding:3px 7px;cursor:pointer;margin-right:6px;display:none}'
+ '#wl .wl-back.on{display:inline-block}'
+ '#wl .wl-ped p{margin:.35em 0}'
+ /* !!! THE PANEL IS position:fixed AND THE PAGE IS A GRID, SO NOTHING
     REFLOWED FOR IT.  Measured in Chromium by sweeping the viewport
     (gate_reader.py --breakpoints): at every width from 1500 down to 1180 the
     canon paragraph's right edge sat 190-350px INSIDE the panel — the side
     panel was simply printed on top of the text it was explaining, and the
     text column never moved.  reader2's main region is `.main` (grid-area:
     main), so that is what has to give up the width. */
  'body.wl-side.wl-open .main{padding-right:380px}'
+ 'body.wl-sheet.wl-open .main{padding-bottom:64vh}'
+ '.wl-mark{background:var(--hl);border-radius:2px}'
  // the hover affordance.  `pointer-events:none` is not optional — the overlay
  // sits directly over the word, and without it every click would land on the
  // underline instead of the text and the panel would never open.
+ '.wl-hov{position:fixed;pointer-events:none;z-index:40;'
+ 'border-bottom:1px solid var(--accent);opacity:.5}'
+ '.para.wl-hot{cursor:pointer}';

var el = null;
function build() {
  var s = document.createElement('style'); s.textContent = CSS;
  document.head.appendChild(s);
  el = document.createElement('aside');
  el.id = 'wl'; el.setAttribute('aria-label', 'Word lookup');
  el.innerHTML =
    '<div class="wl-h"><button class="wl-x" id="wlx" title="' + esc(T('wl_close')) + '">✕</button>'
    + '<div class="wl-w"><button class="wl-back" id="wlback" title="'
    + esc(T('wl_back')) + '">‹</button><span id="wlw">&nbsp;</span>'
    + '<button class="wl-find" id="wlfind" title="'
    + esc(T('wl_type_tip')) + '" aria-label="' + esc(T('wl_type')) + '">⌕</button>'
    + '<input class="wl-q" id="wlq" type="search" hidden autocomplete="off"'
    + ' spellcheck="false" placeholder="' + esc(T('wl_type')) + '">'
    + '</div>'
    + '<div class="wl-c" id="wlc"></div>'
    + '<div class="wl-tabs" id="wlt" role="tablist"></div></div>'
    + '<div class="wl-b" id="wlb"></div>';
  document.body.appendChild(el);
  document.getElementById('wlx').addEventListener('click', close);
  // THE HEADWORD IS ALSO THE SEARCH BOX.  The reader asked for it in the
  // place the clicked word appears, which is right: it is the same question
  // asked two ways, and a word merely heard should be as reachable as one
  // found in a text.
  (function () {
    var q = document.getElementById('wlq'), w = document.getElementById('wlw'),
        f = document.getElementById('wlfind');
    function open_() {
      q.hidden = false; w.style.display = 'none'; f.classList.add('on');
      q.value = ''; q.focus();
    }
    function shut() {
      q.hidden = true; w.style.display = ''; f.classList.remove('on');
    }
    f.addEventListener('click', function () {
      if (q.hidden) open_(); else shut();
    });
    w.addEventListener('click', open_);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { shut(); return; }
      if (e.key !== 'Enter') return;
      var typed = niggCanon(q.value.trim());  // typed ṃ is the edition's ṁ
      if (!typed) return;
      // the paragraph context is carried over, so the Edition tab still
      // knows where the reader is standing -- a typed word is looked up
      // FROM somewhere, exactly as a clicked one is
      var para = current && current.para;
      resolveTyped(typed).then(function (key) {
        if (!key) {
          // !!! THE MISS MESSAGE MADE A CLAIM ABOUT THE CORPUS THAT THE CORPUS
          // CONTRADICTS.  "No entry for X in the corpus or the dictionaries"
          // is wrong about the first half whenever X is a stem the edition
          // only ever prints inflected: `yathānisinna` has TWELVE forms in
          // `lookup/freq`, 52 occurrences, 34 in the Aṭṭhakathā and 18 in the
          // Ṭīkā.  Showing them costs one shard fetch, on the miss path only,
          // and turns a dead end into the answer the reader was after.
          //
          // This is the MIRROR of the `atappaka` fallback in resolveTyped
          // above: that one made a dictionary HEADWORD typable; this one makes
          // a STEM THE EDITION ONLY INFLECTS findable.
          return corpusPrefix(typed).then(function (hits) {
            var h = '';
            if (hits && hits.length) {
              var tot = 0;
              hits.forEach(function (x) { tot += x.n; });
              // the heading names the prefix ACTUALLY matched, not what was
              // typed — see prefixOf(): sliced off the typed string, so it
              // keeps its diacritics
              h += '<div class="wl-sec"><div class="wl-sub">'
                 + esc(T('wl_prefix').replace('%s',
                       typed.slice(0, prefixOf(typed).length)))
                 + ' <span class="wl-flag">('
                 + esc(T('wl_prefix_n').replace('%d', hits.length).replace('%d', tot))
                 + ')</span></div><div class="wl-prefix">'
                 + hits.map(function (x) {
                     return '<button type="button" class="wl-pfx" data-w="'
                          + esc(x.w) + '">' + esc(x.w)
                          + ' <span class="wl-cite">' + x.n + '</span></button>';
                   }).join(' ') + '</div></div>';
            }
            h += '<p class="wl-none">'
               + esc(T('wl_notfound').replace('%s', typed)) + '</p>';
            var body = document.getElementById('wlb');
            body.innerHTML = h;
            Array.prototype.forEach.call(body.querySelectorAll('.wl-pfx'),
              function (b) {
                b.addEventListener('click', function () {
                  lookup(b.dataset.w, para, true);
                });
              });
            document.getElementById('wlt').innerHTML = '';
            document.getElementById('wlc').textContent = '';
            w.textContent = typed;
            el.dataset.state = 'ready';
            shut();
          });
        }
        shut();
        lookup(key, para, true);
      });
    });
  })();
  document.getElementById('wlback').addEventListener('click', function () {
    var prev = HIST.pop();
    updateBack();
    if (prev) lookup(prev.word, prev.para, true);
  });
  // RECURSIVE LOOKUP.  A word inside the panel is a word like any other: the
  // same caret recovery runs on the panel body, and the paragraph context is
  // carried over so the Edition tab still knows where the reader is standing.
  // It fires only when the corpus actually has the word — an English or
  // Burmese word in a dictionary entry is a silent no-op rather than an empty
  // panel.
  // !!! AND SINCE 2026-08-03 THE PANEL ROUTES THAT CLICK BY LANGUAGE.  The
  // recovery here reads ENGLISH letters too (`wordAt(..., true)`): the Pāḷi
  // alphabet has no f, q, w, x or z, so with the Pāḷi set alone "few" gave
  // nothing and "explain" broke in half at the x.
  //
  // The rule, and it was measured before it was chosen:
  //   * a word carrying a Pāḷi diacritic is Pāḷi and goes where it always went;
  //   * a pure-ASCII word is looked for in WordNet FIRST, because the prose in
  //     this pane is English and that is what the reader is reading.  Of the
  //     6,503 distinct pure-ASCII forms in 09Ma01, 16An02 and 11MaA02, 74
  //     (1.1%) are also WordNet keys and nearly all of those are two-letter
  //     particles -- `na`, `ti`, `ca`, `so`.  Those 74 get a one-click route
  //     to the edition instead of a dead end;
  //   * anything WordNet does not have falls through to the corpus lookup,
  //     exactly as before, and is still a silent no-op when the corpus has
  //     nothing either.
  document.getElementById('wlb').addEventListener('click', function (ev) {
    if (ev.target.closest('a,button')) return;
    var hit = wordAt(ev.clientX, ev.clientY, true);
    if (!hit || !current || hit.word === current.word) return;
    var w = hit.word, para = current.para;
    function goPali() {
      look('freq', w).then(function (fr) {
        if (!fr || !current) return;
        HIST.push({word: current.word, para: current.para});
        updateBack();
        lookup(w, para, true);
      });
    }
    if (/[āīūṁṃṅñṭḍṇḷ]/.test(w)) return goPali();
    wnLook(w).then(function (r) {
      if (!r || !current) return goPali();
      look('freq', w).then(function (fr) {
        // !!! BACK NEEDED TWO CLICKS, AND THE FIRST ONE LANDED SOMEWHERE
        // WRONG (user-reported 2026-08-03).  Measured: `bhikkhu` -> English
        // `mendicant` -> English `religious`, then Back gave the pane headed
        // `mendicant` WITH THE PĀḶI TABS AND NO COUNTS -- because `wlback`
        // calls `lookup()`, which is the Pāḷi path, on whatever it popped.  An
        // English word rendered through the Pāḷi panel is an empty answer
        // wearing an honest one's face, and only the SECOND click reached the
        // word the reader came from.
        //
        // HIST NOW RECORDS PĀḶI VIEWS ONLY.  The English layer is a detour,
        // not a destination -- however many English words deep the reader
        // goes, one Back returns to the Pāḷi word they left, and everything
        // `wlback` can pop is something `lookup()` can actually render.
        if (!current.en) {
          HIST.push({word: current.word, para: current.para});
          updateBack();
        }
        renderWn(w, r, !!fr, para);
      });
    });
  });
  layout();
  addEventListener('resize', layout);
  try {
    var m = document.querySelector('.main');
    if (m && window.ResizeObserver) new ResizeObserver(layout).observe(m);
  } catch (e) {}
}

// LAYOUT — decided by the width the TEXT would be left with, measured, not by
// a viewport breakpoint guessed from the prototype.
//
// The prototype's rule was "side panel at >= ~1140px".  Swept inside reader2
// (gate_reader.py --breakpoints) that is wrong twice over.  First, reader2
// keeps a 300px left pane above 861px, so the same viewport leaves far less
// text; at 1180px the canon column came out at 456px — 59 characters, below a
// comfortable measure.  Second, the reader lets the user HIDE that pane, and
// then 300px comes back: a rule keyed on the viewport cannot see the
// difference and would give a reader with the pane hidden a bottom sheet on a
// screen with room to spare.
//
// So the rule reads the region the text actually lives in.  `.main` is
// reader2's grid area; its clientWidth does not change when the panel adds
// padding, so it is a stable measure of what there is to divide.
var PANEL_W = 380;      // must match the width in CSS above
var TEXT_MIN = 550;     // ≈ 65 characters at the reader's default size,
                        // measured: 1240px viewport with the pane shown
function mainW() {
  var m = document.querySelector('.main');
  return m ? m.clientWidth : innerWidth;
}
function layout() {
  var side = mainW() >= PANEL_W + TEXT_MIN;
  document.body.classList.toggle('wl-side', side);
  document.body.classList.toggle('wl-sheet', !side);
}
function close() {
  el.classList.remove('open');
  document.body.classList.remove('wl-open');
  unmark();
}

// !!! IN SHEET MODE THE PANEL COVERS THE WORD IT IS EXPLAINING.  Measured on a
// real 390x844 phone viewport in Chromium: the sheet's top edge lands at y=321
// and the clicked word sat at y=460, behind it — the reader taps a word and the
// answer arrives on top of the question.  reader2 scrolls in `.scroll`, so that
// is what has to move; the word is put a little above the sheet, not merely
// "into view", or it ends up flush against the edge.
function keepWordVisible() {
  if (!markEl || !document.body.classList.contains('wl-sheet')) return;
  var sc = document.getElementById('scroll');
  if (!sc) return;
  var limit = el.getBoundingClientRect().top - 12;
  var r = markEl.getBoundingClientRect();
  if (r.bottom <= limit && r.top >= 56) return;
  var target = 56 + (limit - 56) * 0.45;       // a little above the middle
  sc.scrollTop += (r.top - target);
}

// ------------------------------------------- caret-based click recovery ----
// `en` widens the alphabet to the ASCII letters.  It is passed ONLY for
// clicks inside the panel, where the prose is English: the reader's own text
// is Pāḷi and must keep the Pāḷi set, or a stray Latin word in the apparatus
// would start behaving like a headword.
function wordAt(x, y, en) {
  var node, off, c, r;
  if (document.caretPositionFromPoint) {
    c = document.caretPositionFromPoint(x, y); if (!c) return null;
    node = c.offsetNode; off = c.offset;
  } else if (document.caretRangeFromPoint) {
    r = document.caretRangeFromPoint(x, y); if (!r) return null;
    node = r.startContainer; off = r.startOffset;
  } else return null;
  if (!node || node.nodeType !== 3) return null;
  var t = node.textContent;
  function isL(ch) {
    return !!PALISET[ch]
      || !!(en && ch && ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')));
  }
  function isW(i) {
    var ch = t[i]; if (ch === undefined) return false;
    if (PALISET[ch]) return true;
    if (en && ch >= 'a' && ch <= 'z') return true;
    if (en && ch >= 'A' && ch <= 'Z') return true;
    if (APOS[ch]) return !!(isL(t[i - 1] || '') && isL(t[i + 1] || ''));
    return false;
  }
  if (!isW(off) && !isW(off - 1)) return null;
  var a = isW(off) ? off : off - 1, b = a;
  while (a > 0 && isW(a - 1)) a--;
  while (b < t.length - 1 && isW(b + 1)) b++;
  var w = t.slice(a, b + 1).replace(/(\d{1,2})$/, '');
  // The DOM may show the modern ṃ (display toggle); every key downstream —
  // corpus forms, dictionary rows, freq shards — is stored with the edition's
  // ṁ.  Canonicalise HERE, at the single point where a word leaves the DOM.
  // `a`/`b` stay valid: the node's text is untouched, only the copy changes.
  w = niggCanon(w);
  return w ? {word: w, node: node, a: a, b: b} : null;
}
function niggCanon(s) { return s.replace(/ṃ/g, 'ṁ').replace(/Ṃ/g, 'Ṁ'); }

var markEl = null;
function unmark() {
  if (!markEl) return;
  var p = markEl.parentNode;
  while (markEl.firstChild) p.insertBefore(markEl.firstChild, markEl);
  p.removeChild(markEl); p.normalize(); markEl = null;
}
function mark(node, a, b) {
  unmark();
  var r = document.createRange(); r.setStart(node, a); r.setEnd(node, b + 1);
  markEl = document.createElement('mark'); markEl.className = 'wl-mark';
  try { r.surroundContents(markEl); } catch (e) { markEl = null; }
}

// ------------------------------------------------- the hover affordance ----
// ENABLED IS NOT THE SAME AS VISIBLE.  Defaulting the panel on made it reachable
// but not discoverable: nothing in the reader says that a word can be clicked,
// so a visitor reads the page and never finds it.  This underlines the word
// under the pointer and turns the cursor, so the text reveals itself as
// clickable when explored, and nothing is added to the page for a reader who
// does not explore.
//
// !!! IT DOES NOT USE mark().  `mark()` calls `surroundContents`, which splits
// the text node and inserts an element; doing that on every mouse move would
// collapse the reader's text selection continuously, churn `normalize()` over
// the paragraph, and invalidate layout inside blocks that are deliberately
// `content-visibility:auto`.  So the underline is an OVERLAY positioned from
// the range's client rects — the text DOM is never touched.
//
// !!! AND IT IS NOT BOUND AT ALL ON A PHONE.  There is no hover on a touch
// screen, so a pointermove listener there would be pure cost on the device this
// project has a performance history with.  `(hover:hover) and (pointer:fine)`
// gates it.  The consequence is real and accepted: on a phone the panel remains
// undiscoverable until someone taps a word.  If that matters, it needs a
// different affordance, not this one.
var hovEls = [], hovKey = '', hovPara = null, hovRaf = 0, hovXY = null;

function hoverClear() {
  for (var i = 0; i < hovEls.length; i++)
    if (hovEls[i].parentNode) hovEls[i].parentNode.removeChild(hovEls[i]);
  hovEls = []; hovKey = '';
  if (hovPara) { hovPara.classList.remove('wl-hot'); hovPara = null; }
}

function hoverDraw() {
  hovRaf = 0;
  var xy = hovXY; if (!xy) return;
  var p = xy.t && xy.t.closest && xy.t.closest('.para');
  // the same exclusions the click handler uses, or the underline would promise
  // a lookup on a footnote link or an apparatus block that will never happen
  if (!p || (xy.t.closest && xy.t.closest('a,button,.tools,.app'))) {
    hoverClear(); return;
  }
  var hit = wordAt(xy.x, xy.y);
  if (!hit) { hoverClear(); return; }
  var key = hit.word + '|' + hit.a + '|' + hit.b;
  if (key === hovKey && hovPara === p) return;      // same word, nothing to do
  hoverClear();
  var r = document.createRange();
  try { r.setStart(hit.node, hit.a); r.setEnd(hit.node, hit.b + 1); }
  catch (e) { return; }
  var rects = r.getClientRects();
  for (var i = 0; i < rects.length; i++) {          // a word can wrap a line
    var q = rects[i];
    if (!q.width || q.top < 56) continue;           // under the top bar: skip
    var d = document.createElement('div');
    d.className = 'wl-hov';
    d.style.left = q.left + 'px'; d.style.top = q.top + 'px';
    d.style.width = q.width + 'px'; d.style.height = q.height + 'px';
    document.body.appendChild(d); hovEls.push(d);
  }
  if (hovEls.length) { hovKey = key; hovPara = p; p.classList.add('wl-hot'); }
}

function hoverBind() {
  if (!(window.matchMedia
        && matchMedia('(hover: hover) and (pointer: fine)').matches)) return;
  document.addEventListener('pointermove', function (ev) {
    if (ev.pointerType && ev.pointerType !== 'mouse') return;
    hovXY = {x: ev.clientX, y: ev.clientY, t: ev.target};
    // at most one hit-test per frame, however fast the pointer moves
    if (!hovRaf) hovRaf = requestAnimationFrame(hoverDraw);
  }, {passive: true});
  // the rects are viewport-relative, so anything that moves the text
  // invalidates them.  Clearing is cheap and the next move redraws.
  ['scroll', 'resize', 'wheel'].forEach(function (e) {
    window.addEventListener(e, hoverClear, {passive: true, capture: true});
  });
  document.addEventListener('pointerdown', hoverClear, true);
  return true;
}

// ------------------------------------------------------------- the lookup --
var current = null;
var HIST = [];
function updateBack() {
  var b = document.getElementById('wlback');
  if (b) b.classList.toggle('on', HIST.length > 0);
}
function paraTextOf(node) {
  var p = node && node.parentNode;
  while (p && !(p.classList && p.classList.contains('para'))) p = p.parentNode;
  return p;
}

// The paragraph's stems WITH THEIR COUNTS.  A two-word lemma has to find two
// words, or `Tassa tassā` would count as satisfied by a single `tassa`.
function poolOf(text) {
  var pool = {};
  function add(w) { var s = stem(w); if (s) pool[s] = (pool[s] || 0) + 1; }
  (text.match(/[aāiīuūeokgṅcjñṭḍṇtdnpbmyrlvshḷṁṃAĀIĪUŪEOKGṄCJÑṬḌṆTDNPBMYRLVSHḶṀṂ’'-]+/g) || [])
    .forEach(function (w) {
      add(w);
      if (w.indexOf('-') >= 0)
        w.split('-').forEach(function (part) { if (part) add(part); });
    });
  return pool;
}
function inPara(row, pool) {
  if (!row.k || !row.k.length) return false;
  var need = {}, i;
  for (i = 0; i < row.k.length; i++) need[row.k[i]] = (need[row.k[i]] || 0) + 1;
  for (var s in need) if (!(pool[s] >= need[s])) return false;
  return true;
}

function lookup(word, paraEl, inPanel) {
  if (!inPanel) { HIST.length = 0; updateBack(); }   // a click in the text starts fresh
  current = {word: word, para: paraEl};
  el.classList.add('open');
  el.dataset.state = 'loading';
  document.body.classList.add('wl-open');
  document.getElementById('wlw').textContent = word;
  document.getElementById('wlc').textContent = T('wl_loading');
  document.getElementById('wlb').innerHTML = '';

  var vo = volOrdOf(paraEl);
  // !!! THE EVALUATION STORE WAS ASKED ONLY AFTER THE EDITION HAD ANSWERED
  // (2026-09-05, measured: one cold lookup on the live reader was a chain
  // SIX round trips deep — manifest → freq/gloss/forms → eval manifest + ped
  // → form → dpd/lem → ord — about 1.9 s at ~150 ms a hop, with small files
  // throughout; the bytes were never the cost).  `elook('form')` depends on
  // nothing the first tier returns, so it starts HERE, beside it, and the
  // eval manifest is warmed with the edition's at pointerdown.  Four hops
  // now, three once the manifests are warm.  Nothing about WHAT is looked up
  // changed: the same sets, in the same order of authority.
  var pEval = elook('form', word).then(function (fr) {
    if (!fr) fr = {h: [word], b: [word]};
    return Promise.all([
      Promise.all((fr.h || []).map(function (h) {
        return elook('dpd', h).then(function (e) { return {h: h, e: e}; }); })),
      Promise.all((fr.b || []).map(function (b) {
        return elook('lem', b).then(function (e) { return {b: b, e: e}; }); }))
    ]).then(function (z) {
      return {dpd: z[0].filter(function (x) { return x.e; }),
              lem: z[1].filter(function (x) { return x.e; })};
    });
  }).then(function (ev) {
    // ...and if `lem` still has nothing, ask the dictionaries by their OWN
    // headwords before the panel says "no entry".  See hwlook() above: this
    // runs ONLY on the miss path, and what it appends is an ordinary lemma
    // record, so the Abhidhāna tab, the APD sections, the counts and the
    // gear all render it with no further change anywhere.
    if (ev.lem.length) return ev;
    return hwlook(word).then(function (v) {
      if (v) ev.lem.push({b: (v.w && v.w[0]) || word, e: v});
      return ev;
    });
  });
  Promise.all([look('freq', word), look('gloss', word), look('forms', word),
               vo ? loadLinks(vo.vol) : Promise.resolve(null),
               siblings(word)])
    .then(function (res) {
      if (!current || current.word !== word) return;   // superseded by a later click
      var freq = res[0], gl = res[1], forms = res[2], sibs = res[4];
      var linked = vo ? linkedKeys(res[3], vo.ord) : {};
      // A high-frequency form's rows do not fit in a shard (`tattha` alone has
      // 718): the shard carries only the count and the rows live in paged
      // files.  Fetch the first page now — the panel must never claim a total
      // it has not got, nor show a count with nothing behind it.
      var big = gl && !Array.isArray(gl) && gl.big ? gl : null;
      var pGloss = big
        ? jfetch(BASE + 'gloss/big/' + safeName(word) + '.0.json', gzSet(MAN, 'gloss'))
        : Promise.resolve(null);
      var pPed = (forms && forms.length)
        ? Promise.all(forms.map(function (h) {
            return look('ped', h).then(function (e) { return {h: h, e: e}; }); }))
        : Promise.resolve([]);
      // the evaluation store: form -> {h: DPD headwords, b: base lemmas},
      // then one fetch per headword and per lemma — `pEval`, started above
      // beside the first tier (2026-09-05).
      // !!! THE EVALUATION STORE WAS ENTERED THROUGH `form` AND NOWHERE ELSE,
      // AND `form` HOLDS ONLY WHAT THE CORPUS INFLECTS (2026-08-05, reader:
      // "when I search atappaka it does not find anything, however this word is
      // in the Tipiṭaka Pāḷi-Myanmā Abhidhāna").  `atappaka` IS in the store —
      // `lookup_eval/lem/ata.json` — but the bare headword is not a surface
      // form, so `fr` was null and the two sets that DO hold the word were
      // never asked.  Measured over the whole store: 34,821 of 52,757 lemma
      // entries (66.0%) and 57,198 of 74,146 DPD headwords (77.1%) were
      // unreachable.  The repair (in `pEval`) treats a `form` miss as "then
      // the word may BE a lemma or a headword".
      return Promise.all([pGloss, pPed, pEval]).then(function (r2) {
        if (!current || current.word !== word) return;
        var page0 = r2[0], ped = r2[1], ev = r2[2];
        var rows = Array.isArray(gl) ? gl : (page0 ? page0.rows : []);
        var nGloss = big ? big.big : rows.length;
        // the ordinal maps for the volumes these rows cite, so the citations
        // can be links.  Awaited: rowHtml is synchronous, and a map that
        // arrives after the render silently leaves every citation plain.
        return loadOrds(rows).then(function () {
        render({word: word, para: paraEl, freq: freq, rows: rows,
                linked: linked, ev: ev, sibs: sibs,
                big: !!big, page: page0 ? page0.page : null,
                pages: page0 ? page0.pages : null, nGloss: nGloss,
                ped: ped.filter(function (p) { return p.e; })});
        });
      });
    });
}

// !!! ELEVEN TABS WAS TOO MANY, AND THE READER SAID SO (2026-08-02).  A tab
// row that wraps to three lines is a menu, not a choice, and it also put the
// modern lexica on the same visual footing as the edition's own glosses --
// which is the one thing §9 is about.  So there are now THREE tabs:
//
//     Edition           the edition's own glosses.  Always first, always default.
//     Abhidhāna         the §9 lexical authority, with PEU's English inside each
//                       entry behind its attributed reveal, as before.
//     Pāḷi Dictionary   everything else, stacked as SECTIONS inside one tab, in
//                       order of authority, each with its own attribution and
//                       banner.  This is the shape dictionary.sutta.org itself
//                       uses, and what the reader asked for.
//
// Nothing is lost: every source still has its own heading, count and
// attribution, and DPD is still last and still banner'd.
var DICT_SECTIONS = [
  ['ped',  'wl_ped',  'wl_tip_ped'],
  ['cped', 'wl_cped', 'wl_tip_cped'],
  ['ny',   'wl_ny',   'wl_tip_ny'],
  ['vri',  'wl_vri',  'wl_tip_vri'],
  ['ppn',  'wl_ppn',  'wl_tip_ppn'],
  ['uhs',  'wl_uhs',  'wl_tip_uhs'],
  ['rt',   'wl_rt',   'wl_tip_rt'],
  ['tpm',  'wl_tpm',  'wl_tip_tpm'],
  ['pwg',  'wl_pwg',  'wl_tip_pwg']
  // DPD is NOT a section here: with the evaluation flag on it has its own tab,
  // first, and with the flag off it is not in the build at all.
];

function tabBtn(id, label, n, dis, tip) {
  // no `disabled` attribute: it swallows hover events, and the tooltip with
  // them, in Safari.  A class + aria-disabled + a click guard instead.
  return '<button role="tab" data-tab="' + id + '" aria-selected="false"'
    + (dis ? ' class="dis" aria-disabled="true"' : '')
    + (tip ? ' data-tip="' + esc(tip) + '"' : '') + '>'
    + esc(label) + (n != null ? ' <span class="wl-n">' + n + '</span>' : '') + '</button>';
}

function render(d) {
  var tabs = document.getElementById('wlt'), body = document.getElementById('wlb');
  var c = d.freq;
  document.getElementById('wlc').innerHTML = (c
    ? '<b>' + c[0] + '</b> ' + esc(T('wl_corpus')) + ' · ' + c[1] + ' ' + esc(T('wl_canon'))
      + ' · ' + c[2] + ' ' + esc(T('wl_comm')) + ' · ' + c[3] + ' ' + esc(T('wl_sub'))
    : '')
    // the other spellings of this word, offered — never substituted.  See
    // siblings(): this is what replaced the silent correction of 2026-08-05.
    + ((d.sibs && d.sibs.length)
       ? '<div class="wl-sibs"><span class="wl-cite">' + esc(T('wl_also')) + '</span> '
         + d.sibs.map(function (s) {
             return '<button type="button" class="wl-sib" data-w="' + esc(s.w) + '">'
                  + esc(s.w) + ' <span class="wl-cite">' + s.n + '</span></button>';
           }).join(' ') + '</div>'
       : '');
  Array.prototype.forEach.call(
    document.getElementById('wlc').querySelectorAll('.wl-sib'), function (b) {
      b.addEventListener('click', function () {
        HIST.push({word: d.word, para: d.para}); updateBack();
        lookup(b.dataset.w, d.para, true);
      });
    });
  // how many entries each evaluation source has for this word
  d.n = {};
  var lems = (d.ev && d.ev.lem) || [];
  function count(field, listy) {
    var n = 0;
    lems.forEach(function (L) {
      var v = L.e[field];
      if (v) n += listy ? v.length : 1;
    });
    return n;
  }
  d.n.dpd = (d.ev && d.ev.dpd) ? d.ev.dpd.length : 0;
  d.n.abhi = count('a', true);
  d.n.peu = count('p', false);
  // APD: one section per dictionary the manifest knows about.  Nothing here is
  // named in this file -- if the build adds a dictionary, the panel shows it.
  //
  // !!! EVERY BODY IS DEDUPED, AND THE DUPLICATES CAME FROM TWO PLACES AT ONCE.
  // The reader clicked `Nandane` and the tab said 102.  Measured: that was
  // 1 PED + 100 APD + 1 DPPN, and of the 100 only 50 were distinct.
  //
  //   * WITHIN one lemma -- `build_eval.py` keys PCED on `fold(k)` for each of
  //     {hw, acc, cap}.  The set dedupes the RAW spellings, then fold() collapses
  //     them to one key, so the same body is appended once per distinct raw
  //     spelling.  60.9% of every APD row in the store is an exact duplicate and
  //     100% of lemmas are affected.  The build is fixed too, but the panel must
  //     not depend on a rebuild to stop showing a gloss three times.
  //   * ACROSS lemmas -- `fr.b` for `Nandane` is ["nandana","nandanā"], which
  //     fold to the same key, so all ten dictionaries return byte-identical
  //     lists and each was concatenated twice.  7,938 forms (3.15%) do this.
  //
  // Bodies are whitespace-collapsed by the build, so exact string equality is
  // the right test; `lem` keeps the FIRST spelling that produced the body.
  d.apd = {};
  var apdSeen = {};
  lems.forEach(function (L) {
    var m = L.e.apd;
    if (!m) return;
    for (var id in m) {
      var into = d.apd[id] || (d.apd[id] = []);
      var seen = apdSeen[id] || (apdSeen[id] = {});
      m[id].forEach(function (t) {
        if (seen[t]) return;
        seen[t] = 1;
        into.push({lem: L.b, body: t});
      });
    }
  });
  for (var _id in d.apd) if (!d.apd[_id].length) delete d.apd[_id];

  // !!! PED WAS IN THIS TAB TWICE.  The `_ped` section is the shipped PED set;
  // APD id `P` is "PTS P-E Dictionary" -- the SAME dictionary from the same PCED
  // dataset, differing only in fullwidth punctuation.  For `Nandane` that put one
  // PED entry on screen five times.  So they are merged into one section: the
  // shipped rows first (cleaner punctuation, reached through the DPD synonym
  // index), then any `P` row that is not already there under normalisation --
  // which keeps whatever reach `P` has without showing anything twice.
  d.pedRows = [];
  var pedSeen = {};
  d.ped.forEach(function (p) {
    p.e.forEach(function (body) {
      pedSeen[pedKey(body)] = 1;
      d.pedRows.push({lem: p.h, body: body, html: true});
    });
  });
  if (EVAL) {
    (d.apd.P || []).forEach(function (r) {
      var k = pedKey(r.body);
      if (pedSeen[k]) return;
      pedSeen[k] = 1;
      d.pedRows.push({lem: r.lem, body: r.body, html: false});
    });
    delete d.apd.P;                    // it is the PED section now, not its own
  }
  d.n.ped = d.pedRows.length;
  d.n.ppn = EVAL ? count('pn', true) : 0;

  // !!! THE BADGE COUNTS DICTIONARIES, NOT ENTRIES.  On the aggregate tab the
  // question a number answers is "how many dictionaries have this word" -- the
  // per-section entry totals are already in the jump strip and the headings.
  // On the publishable panel the same tab IS one dictionary, so there the badge
  // stays an entry count; "PED 1" would say nothing.
  var nDict;
  if (EVAL) {
    nDict = 0;
    for (var id in d.apd) nDict++;
    if (d.pedRows.length) nDict++;
    if (d.n.ppn) nDict++;
  } else {
    nDict = d.pedRows.length;
  }
  d.nDict = nDict;
  // TAB ORDER DEPENDS ON WHICH PANEL THIS IS, AND THAT IS THE WHOLE POINT.
  //
  // With the evaluation flag ON this is the reader's own comparison surface,
  // and they want it in the prototype's order: DPD first, the edition last.
  // That is a working preference about a local tool, and §9 does not reach it.
  //
  // With the flag OFF this is the publishable panel, there IS no DPD, and the
  // edition is first because it is the only voice there is. So §9's guarantee
  // is kept exactly where it applies, and the gate asserts it there.
  var html = EVAL
    ? tabBtn('dpd',  T('wl_dpd'),  d.n.dpd || null, !d.n.dpd, T('wl_tip_dpd'))
      + tabBtn('abhi', T('wl_abhi'), d.n.abhi || null, !d.n.abhi, T('wl_tip_abhi'))
      + tabBtn('dict', T('wl_dict'), nDict || null, !nDict, T('wl_tip_dict'))
      + tabBtn('ed',   T('wl_edition'), d.nGloss || null, !d.nGloss, T('wl_tip_ed'))
    : tabBtn('ed',   T('wl_edition'), d.nGloss || null, !d.nGloss, T('wl_tip_ed'))
      + tabBtn('dict', T('wl_ped_tab'), nDict || null, !nDict, T('wl_tip_ped'));
  tabs.innerHTML = html;
  Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (b) {
    b.addEventListener('click', function () {
      if (!b.classList.contains('dis')) show(b.dataset.tab, d); });
  });
  // Edition is the default tab, always — never a dictionary (§9)
  var first = EVAL
    ? (d.n.dpd ? 'dpd' : d.n.abhi ? 'abhi' : nDict ? 'dict' : 'ed')
    : (d.nGloss ? 'ed' : nDict ? 'dict' : 'ed');
  show(first, d);
  keepWordVisible();
  el.dataset.state = 'ready';
}

// !!! EVERY INTERACTIVE THING IN THE PANEL BODY IS WIRED HERE, AND THREE OF
// THEM WERE NOT.  `body.innerHTML = ...` throws away the listeners with the
// markup, so every control has to be bound again on each render -- and this
// function had drifted until it bound exactly one of four:
//
//   * DPD's chips had NO click handler at all.  They looked right and did
//     nothing.  Reported by the reader as "the chips are dead", and they were.
//   * the reveals (`English (PEU) ⇣`, `Show the machine translation anyway`)
//     had none either, so the Abhidhāna's English and PEU's segregated
//     machine translation could not be opened.
//   * the jump strip in the dictionary tab did nothing.
//   * "Show more" queried `button.more`, but the class had been renamed to
//     `wl-more` in the namespacing pass -- so paging through a high-frequency
//     word's glosses was dead too, and nothing said so.
//
// Each was a silent `String.replace` that matched nothing, applied nothing and
// asserted nothing.  The gate now PRESSES these, rather than checking they
// exist: see gate_reader.py assertion 12.
function show(tab, d, keepGear) {
  var tabs = document.getElementById('wlt'), body = document.getElementById('wlb');
  Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (b) {
    b.setAttribute('aria-selected', b.dataset.tab === tab ? 'true' : 'false'); });
  body.innerHTML = tab === 'ed'   ? viewEd(d)
                 : tab === 'abhi' ? viewAbhi(d)
                 : tab === 'dpd'  ? viewDpd(d)
                 : viewDict(d);
  body.scrollTop = 0;
  // a gear change re-renders this tab; the popover reopens so several
  // sections can be chosen without reopening it each time
  if (keepGear) {
    var gp0 = body.querySelector('.wl-gearpop');
    if (gp0) gp0.hidden = false;
  }

  // 1. paging through a form with more gloss rows than a shard may hold
  var more = body.querySelector('button.wl-more');
  if (more) more.addEventListener('click', function () { loadMore(d, more); });

  // 2. our own reveals: the attributed English under an Abhidhāna entry, and
  //    PEU's machine-translated block
  Array.prototype.forEach.call(body.querySelectorAll('button.wl-reveal'),
    function (b) {
      b.addEventListener('click', function () {
        var t = b.nextElementSibling;
        if (t) t.classList.toggle('wl-hidden');
      });
    });

  // 3. DPD's own chips — grammar, examples, declension, root family, compound
  //    family, idioms.  Each carries data-target naming a block DPD ships
  //    closed; the chip toggles it.  DPD's ids are per-headword
  //    (`declension_bhikkhave`), so scope the lookup to the panel body and
  //    match by attribute — an id starting with a digit would break
  //    getElementById-style selectors.
  Array.prototype.forEach.call(body.querySelectorAll('a.dpd-button[data-target]'),
    function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        // scope to the chip's own entry row: DPD numbers homonym ids
        // (grammar_deseti_1 / _2), but scoping is what makes that a
        // guarantee rather than luck
        var row = a.closest('.wl-row') || body;
        var target = row.querySelector('[id="' + a.dataset.target + '"]')
                  || body.querySelector('[id="' + a.dataset.target + '"]');
        if (!target) return;
        // ONE BLOCK OPEN PER ENTRY (2026-08-09, user request: "when clicking
        // another label the one that is open should close").  Opening a block
        // closes its siblings; clicking the open block's own chip closes it.
        var opening = target.classList.contains('hidden');
        Array.prototype.forEach.call(row.querySelectorAll('.dpd.content'),
          function (c) { if (c !== target) c.classList.add('hidden'); });
        target.classList.toggle('hidden', !opening);
        if (opening) famFill(target);
      });
    });

  // 5. the APD gear (decided 2026-08-06).  A checkbox change persists beside
  //    `osbct-wle`, re-renders THIS tab, and keeps the popover open so
  //    several sections can be set in one visit.
  var gear = body.querySelector('.wl-gear');
  if (gear) gear.addEventListener('click', function () {
    var p = body.querySelector('.wl-gearpop');
    if (p) p.hidden = !p.hidden;
  });
  Array.prototype.forEach.call(body.querySelectorAll('input[data-wl-gear]'),
    function (cb) {
      cb.addEventListener('change', function () {
        var g = gearGet();
        if (cb.checked) g[cb.dataset.wlGear] = 1; else delete g[cb.dataset.wlGear];
        gearSet(g);
        show('dict', d, true);
      });
    });

  // 6. the "N more dictionaries" summary line opens the gear, which is where
  //    the choosing happens — the gear state itself is untouched by the click
  Array.prototype.forEach.call(body.querySelectorAll('button[data-wl-gearline]'),
    function (b) {
      b.addEventListener('click', function () {
        var p = body.querySelector('.wl-gearpop');
        if (p) { p.hidden = false; }
        body.scrollTop = 0;
      });
    });

  // 4. the jump strip scrolls inside the panel instead of navigating the page
  Array.prototype.forEach.call(body.querySelectorAll('.wl-jump a'), function (a) {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var t = body.querySelector(a.getAttribute('href'));
      if (t) body.scrollTop += t.getBoundingClientRect().top
                             - body.getBoundingClientRect().top - 6;
    });
  });
}

// THE CITATION IS A LINK INTO THE PASSAGE IT COMES FROM.
//
// A gloss row says "this is what 42KhuA23 §118 says about your word", and until
// now the reader had to go and find §118 by hand.  The row carries the volume
// and the printed paragraph NUMBER; reader2 routes on the paragraph's ORDINAL
// (`#VOL/<index>`, see resolveHash) and the two are not the same -- unnumbered
// paragraphs, `n_to` spans and `covers` all push them apart.  So the build ships
// `reader/ord/<VOL>.json`, a plain {n: ordinal} map per volume, 724 kB for all
// 118 of them, and the panel loads only the volumes actually on screen.
//
// If the map is missing or the number is not in it the citation stays plain
// text rather than becoming a link that goes nowhere.  A dead link in an
// apparatus is worse than no link: it makes the reader doubt the reference.
var ORD = {};
function ordOf(r) {
  var m = ORD[r.v];
  return (m && r.n != null && m[String(r.n)] != null) ? m[String(r.n)] : null;
}
function loadOrds(rows) {
  var want = {};
  (rows || []).forEach(function (r) { if (r.v && !(r.v in ORD)) want[r.v] = 1; });
  var vols = Object.keys(want);
  if (!vols.length) return Promise.resolve();
  return Promise.all(vols.map(function (v) {
    return jfetch('ord/' + v + '.json').then(function (m) { ORD[v] = m || {}; });
  }));
}

function rowHtml(r) {
  var o = ordOf(r);
  var cite = esc(r.v) + ' §' + (r.n != null ? r.n : '—')
           + (r.p ? ' · p.' + r.p : '') + (r.s ? ' · ' + esc(r.s) : '');
  return '<div class="wl-row"><span class="wl-lem wl-g">' + esc(r.l) + '</span>'
    + (r.q ? ' <span class="wl-flag">(' + esc(T('wl_quoted')) + ')</span>' : '')
    + (r.h ? ' <span class="wl-flag">(' + esc(T('wl_series')) + ')</span>' : '')
    + ' — <span class="wl-g">' + esc(r.g) + '</span>'
    + (r.t ? '<div class="wl-flag">' + esc(T('wl_trunc')) + '</div>' : '')
    + '<div class="wl-cite">'
    + (o != null
       ? '<a class="wl-go" href="#' + esc(r.v) + '/' + o + '" title="'
         + esc(T('wl_goto')) + '">' + cite + ' \u2192</a>'
       : cite)
    + '</div></div>';
}

// Which target paragraphs does the edition's link map tie this one to?
//
// !!! reader2 declares its own `state` with `const` at script top level, which
// does NOT put it on `window` — reading `window.state.links` from here gets
// undefined, silently, and every gloss would fall out of the promoted group
// with no error to show for it.  So the panel loads the same map itself.  That
// also keeps the coupling to one thing that is already a published file
// (`linksk/<VOL>.links.json`, keyed by ordinal) rather than to reader2's
// internals, which another session may be changing.
function volOrdOf(paraEl) {
  var m = paraEl && paraEl.id && /^p-(.+)-(\d+)$/.exec(paraEl.id);
  return m ? {vol: m[1], ord: m[2]} : null;
}
function loadLinks(vol) {
  return jfetch('linksk/' + vol + '.links.json');
}
function linkedKeys(links, ord) {
  var out = {}, e = (links && links[String(ord)]) || {};
  ['commentary', 'subcommentary'].forEach(function (layer) {
    // `direct` only: a `covered` target is the builder's "nearest earlier
    // number" fallback, not something the edition says, and this map is what
    // makes a gloss row claim to be "in the commentary on this paragraph"
    (e[layer] || []).forEach(function (t) {
      if (t && t.n != null && t.state === 'direct')
        out[t.key.split('#')[0] + '|' + t.n] = 1; });
  });
  return out;
}

function viewEd(d) {
  var h = '<div class="wl-src">' + esc(T('wl_ed_src')) + '</div>';
  if (!d.nGloss) return h + '<p class="wl-none">' + esc(T('wl_nogloss')) + '</p>';
  var rows = d.rows;
  var pool = d.para ? poolOf(d.para.textContent) : {};
  var linked = d.linked || {};
  // FOUR GROUPS, EACH WITH A CRITERION THAT CAN BE STATED AND CHECKED.
  //
  // !!! The first version had two, and the second of them was a lie by
  // omission.  "The lemma stands in this paragraph" is a real coincidence for a
  // multi-word lemma and NO information at all for a one-word one: if the
  // reader clicked `tattha`, then a row whose whole lemma is `tattha` is
  // trivially "in this paragraph".  Measured over the corpus: the two-group
  // rule fired on 80.9% of glossed clicks, and 30% of what it promoted was that
  // empty one-word case.  (Those two numbers describe the SUPERSEDED rule and
  // were taken with the superseded tooling; the shipped four-group rule
  // measures 75.2%, and the 30% has not been re-measured against it.  Do not
  // quote either for what ships.)  A one-word gloss is worth having — the edition
  // defining the word plainly — so it keeps a group; it just must not be
  // dressed up as being about this passage.
  var prox = [], here = [], word = [], rest = [];
  rows.forEach(function (r) {
    var multi = (r.w || (r.k || []).length) > 1;   // words printed in bold
    if (inPara(r, pool)) {
      if (linked[r.v + '|' + r.n]) prox.push(r);
      else if (multi) here.push(r);
      else word.push(r);
    } else rest.push(r);
  });
  if (prox.length)
    h += '<div class="wl-sub">' + esc(T('wl_prox')) + '</div><div class="wl-promo">'
       + prox.map(rowHtml).join('') + '</div>'
       + '<div class="wl-why">' + esc(T('wl_checked')) + '</div>';
  if (here.length)
    h += '<div class="wl-sub">' + esc(T('wl_here')) + '</div><div class="wl-promo">'
       + here.map(rowHtml).join('') + '</div>'
       + (prox.length ? '' : '<div class="wl-why">' + esc(T('wl_checked')) + '</div>');
  if (word.length)
    h += '<div class="wl-sub">' + esc(T('wl_word')) + '</div><div class="wl-wordgrp">'
       + word.map(rowHtml).join('') + '</div>'
       + '<div class="wl-why">' + esc(T('wl_why_word')) + '</div>';
  if (rest.length)
    // !!! "All occurrences (1 of 5)" read as though it were showing one of
    // five, when it was showing the one that had NOT been promoted.  The count
    // that belongs here is the size of this group; the total is on the tab.
    h += '<div class="wl-sub">' + esc(T('wl_rest')) + ' <span class="wl-flag">('
       + rest.length + ')</span></div>'
       + rest.map(rowHtml).join('');
  if (d.big && d.pages && d.page + 1 < d.pages)
    h += '<button class="wl-more">' + esc(T('wl_more')) + ' — '
       + ((d.page + 1) * 120) + ' ' + esc(T('wl_of')) + ' ' + d.nGloss + '</button>';
  return h;
}

function loadMore(d, btn) {
  var next = (d.page == null ? 0 : d.page + 1);
  if (next >= d.pages) return;
  btn.disabled = true;
  jfetch(BASE + 'gloss/big/' + safeName(d.word) + '.' + next + '.json',
         gzSet(MAN, 'gloss'))
    .then(function (o) {
      if (!o) return;
      d.rows = d.rows.concat(o.rows); d.page = o.page; d.pages = o.pages;
      // a paged-in batch cites volumes the first page never did
      loadOrds(o.rows).then(function () { show('ed', d); });
    });
}

function viewPed(d) {
  var h = '<div class="wl-src">' + esc(T('wl_ped_src')) + '</div>';
  if (!d.ped.length) return h + '<p class="wl-none">' + esc(T('wl_noped')) + '</p>';
  d.ped.forEach(function (p) {
    p.e.forEach(function (body) {
      h += '<div class="wl-row wl-ped"><div class="wl-lem wl-g">' + esc(p.h) + '</div>'
         + '<div>' + body + '</div></div>';
    });
  });
  return h;
}



// ---------------------------------------------------- evaluation views ----
// Every one of these opens with an attribution line and the evaluation banner.
// Sources are never merged: one tab, one source, and PEU's English appears
// inside an Abhidhāna entry only in an attributed, collapsed reveal.
// !!! THE SHARING TERMS RIDE WITH THE SOURCE, NOT IN A FOOTER.  A reader
// looking at an entry has to be able to see, without leaving it, what they may
// do with it.  `rights` is a T() key or null; it prints under the attribution.
// !!! THE DICTIONARIES' OWN MARKUP WAS BEING SHOWN AS TEXT (2026-08-02,
// user-reported).  Every body here went through `esc()`, so a `<br>` in the
// source arrived on screen as the four characters `<br>`.  Measured over
// site/lookup_eval/{lem,form}: 137,190 strings carry one, and two fields
// carry one in EVERY entry — K 45,847/45,847 and B 45,635/45,635; R is
// 34,073 of 40,265.  The data also carries <p> <b> <span> <i> <abbr>
// <ul>/<li>.
//
// ESCAPE FIRST, THEN LET A KNOWN LIST BACK THROUGH.  The reverse — strip
// what looks dangerous and pass the rest — is the shape that always leaks.
// Attributes are dropped whole, so there is no href, no style, no event
// handler, and nothing outside the list survives at all.  This is a
// third-party corpus of unknown provenance rendered into the reader's page;
// it is not a place to be permissive.
var SAFE_TAGS = {br: 1, b: 1, strong: 1, i: 1, em: 1, p: 1,
                 ul: 1, ol: 1, li: 1, sub: 1, sup: 1};
function rich(x) {
  if (x == null) return '';
  return esc(String(x)).replace(
    /&lt;(\/?)\s*([a-zA-Z][a-zA-Z0-9]*)(?:[^&]*?)?&gt;/g,
    function (m, slash, tag) {
      var t = tag.toLowerCase();
      return SAFE_TAGS[t] ? '<' + slash + t + '>' : '';
    });
}
// `authority` omits the not-guaranteed notice.  It is passed by exactly one
// view, and the reason is §9: the Abhidhāna is the lexical authority of this
// edition — the Sixth Council's own lexicon over the Sixth Council's own text,
// its definitions drawn from the Aṭṭhakathā and Ṭīkā.  The notice says "we
// cannot guarantee its accuracy … for accurate definitions use the Glosa tab",
// which is the right thing to say about a modern lexicon standing outside the
// text and the wrong thing to say about the tradition's own glosses.  Reader's
// instruction, 2026-08-03.  Its attribution and rights lines stay: those are
// §9's other obligation and are not in question.
function evHead(srcLine, extra, rights, authority) {
  return (authority ? '' : '<div class="wl-banner">' + esc(T('wl_eval')) + '</div>')
       + '<div class="wl-src">' + esc(srcLine) + (extra ? ' ' + esc(extra) : '')
       + '</div>'
       + (rights ? '<div class="wl-rights">' + esc(T(rights)) + '</div>' : '');
}

// !!! DPD SHIPS THREE OF ITS SIX BLOCKS EMPTY (2026-08-09, user-reported:
// "when clicking root family it does not load... the same with compound
// family and idioms. Only the first three work").  In DPD's own web app
// `family_root`, `family_compound` and `family_idiom` are fetched LAZILY from
// its server; the archived entry carries only the stub — literally
// `root family loading...` — so the chip opened a promise nothing would ever
// keep.  Grammar, examples and declension are inline, which is why exactly
// those three worked.
// A chip whose block is a stub is REMOVED along with the stub, not disabled:
// a control that can never work is not information, it is furniture.
// Bringing the families back is a STORE job — rebuild lookup_eval with DPD's
// family tables — recorded in the handoff, not attempted from the panel.
function dpdScrub(h) {
  h = String(h);
  var dead = {};
  // a hidden block whose whole content is `...loading...` is a stub; DPD
  // writes these ids unquoted, but both forms are matched
  h = h.replace(/<div class="dpd content hidden" id="?([^ >"]+)"?>[^<]*loading\.\.\.<\/div>/g,
    function (_m, id) { dead[id] = 1; return ''; });
  if (Object.keys(dead).length)
    // DPD writes every attribute UNQUOTED (`class=dpd-button
    // data-target=family_root_…`), so the class is asserted by lookahead and
    // the target captured with quotes optional
    h = h.replace(/<a (?=[^>]*class="?dpd-button)[^>]*data-target="?([^ >"]+)"?[^>]*>[^<]*<\/a>/g,
      function (m, t) { return dead[t] ? '' : m; });
  return h;
}
// THE FAMILY BLOCKS ARRIVE ON DEMAND (2026-08-09) — the same lazy shape
// DPD's own app uses, from OUR origin: the rebuilt entries carry `data-fk`
// (the family keys the old trim threw away with the scripts), and
// stores/lookup_eval/family/{root,comp,idm}/<p2>.json holds the content,
// pre-rendered at build time in DPD's own template wording.
var FAMT = {family_root_: 'root', family_compound_: 'comp', family_idiom_: 'idm'};
function famFill(div) {
  if (!div || !div.dataset.fk || div.dataset.famDone) return;
  div.dataset.famDone = '1';
  var t = null;
  for (var pfx in FAMT) if (div.id.indexOf(pfx) === 0) t = FAMT[pfx];
  if (!t) return;
  var keys; try { keys = JSON.parse(div.dataset.fk); } catch (e) { return; }
  div.innerHTML = '<span class="wl-cite">…</span>';
  Promise.all(keys.map(function (k) {
    var letters = fold(k).replace(/[^a-z]/g, '');
    var p2 = (letters.length >= 2 ? letters.slice(0, 2) : (letters + '_').slice(0, 2)) || '__';
    return jfetch(EBASE + 'family/' + t + '/' + p2 + '.json', true)
      .then(function (m) { return (m && m[k]) || null; });
  })).then(function (parts) {
    var html = parts.filter(Boolean).join('');
    div.innerHTML = html
      || ('<span class="wl-cite">' + esc(T('wl_fam_missing')) + '</span>');
  });
}
function viewDpd(d) {
  var h = evHead(T('wl_tip_dpd'), '', 'wl_cc_dpd');
  var e = (d.ev && d.ev.dpd) || [];
  if (!e.length) return h + '<p class="wl-none">' + esc(T('wl_noentry')) + '</p>';
  // DPD's entry carries its own chips -- grammar, examples, declension --
  // each opening a block it keeps hidden.  They are how the entry is read,
  // so they are passed through as DPD draws them (scrubbed of the stub
  // blocks above) and wired up in show().
  e.forEach(function (x, i) {
    h += '<div class="wl-row"><span class="wl-cite">' + (i + 1) + '. </span>'
       + '<span class="wl-lem wl-g">' + esc(x.h) + '</span>'
       + '<div class="wl-ext wl-dpd">' + dpdScrub(x.e) + '</div></div>';
  });
  return h;
}

function viewAbhi(d) {
  var h = evHead(T('wl_tip_abhi'), '', 'wl_dhamma', true);   // §9: the authority
  var i = 0;
  ((d.ev && d.ev.lem) || []).forEach(function (L) {
    (L.e.a || []).forEach(function (row) {
      i++;
      // row = [Burmese headword+POS, Burmese etymology, roman etymology,
      //        Burmese definition, [transcoded citations]]
      var myhead = row[0], myetym = row[1], rometym = row[2],
          mydef = row[3], cites = row[4] || [];
      h += '<div class="wl-row"><span class="wl-cite">' + i + '. </span>'
         + '<span class="wl-lem wl-g">' + esc(L.b) + '</span> '
         + '<span class="wl-my">' + rich(myhead) + '</span>'
         + ((myetym || rometym)
            ? '<div class="wl-etym">' + esc(myetym)
              + (rometym ? ' <span class="wl-cite">' + esc(rometym) + '</span>' : '')
              + '</div>' : '')
         + '<div class="wl-my">' + rich(mydef) + '</div>'
         + (cites.length
            ? '<div class="wl-cites">' + esc(T('wl_cites')) + ' '
              + cites.map(esc).join(' · ')
              + ' <span class="wl-cite">' + esc(T('wl_cites_note')) + '</span></div>'
            : '');
      if (L.e.p) {
        h += '<button class="wl-reveal">' + esc(T('wl_en_btn')) + '</button>'
           + '<div class="wl-inline wl-hidden"><div class="wl-src">'
           + esc(L.e.pm ? T('wl_mt') : T('wl_en_attr')) + '</div>' + L.e.p + '</div>';
      }
      h += '</div>';
    });
  });
  if (!i) h += '<p class="wl-none">' + esc(T('wl_noentry')) + '</p>';
  return h;
}

function viewPeu(d) {
  var h = evHead(T('wl_tip_peu'), '', 'wl_dhamma');
  var human = '', mt = '', i = 0;
  ((d.ev && d.ev.lem) || []).forEach(function (L) {
    if (!L.e.p) return;
    i++;
    var ent = '<div class="wl-row"><span class="wl-cite">' + i + '. </span>'
            + '<span class="wl-lem wl-g">' + esc(L.e.pk || L.b) + '</span>'
            + '<div class="wl-ext">' + L.e.p + '</div></div>';
    if (L.e.pm) mt += ent; else human += ent;
  });
  h += human;
  // machine translation is never mixed in: it is withheld behind its own press
  if (mt)
    h += '<div class="wl-banner">' + esc(T('wl_mt')) + '</div>'
       + '<button class="wl-reveal">' + esc(T('wl_mt_show')) + '</button>'
       + '<div class="wl-mt wl-hidden">' + mt + '</div>';
  if (!i) h += '<p class="wl-none">' + esc(T('wl_noentry')) + '</p>';
  return h;
}


// ONE TAB, MANY SOURCES.  Each keeps its own heading, count, attribution and
// banner -- a section, not a merge.  A jump strip at the top says what is in
// here for this word, so the reader can see at a glance without scrolling.
// The manifest's order is a PRESENTATION preference.  If it is missing -- an
// older index.json, a build that did not write one -- the sections must still
// all appear, just unordered.  Silently showing none of them because a list of
// preferences was absent is how this failed on the reader's machine.
// !!! THE TWO SHORTEST ANSWERS GO FIRST (2026-08-02, at the reader's
// direction).  `C` is the Concise Pāli-English Dictionary and `NCP` the New
// Concise; their entries are a line or two, which is what someone asking
// "what does this word mean" needs, and the build's order buried NCP last
// behind eleven longer ones.  Pinned here rather than in the manifest so a
// rebuild of the evaluation store cannot quietly undo it; ids absent from
// the build are simply skipped.
var APD_FIRST = ['C', 'NCP'];
function apdOrder(d) {
  var order = APD_FIRST.concat((EMAN && EMAN.apd_order) || []);
  var have = Object.keys((d && d.apd) || {});
  var seen = {}, out = [];
  order.forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(id); } });
  have.sort().forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(id); } });
  return out;
}
function apdBook(id) {
  var b = (EMAN && EMAN.apd_books && EMAN.apd_books[id]) || {};
  return {name: b.name || id, author: b.author || '', lang: b.lang || '?'};
}
function apdZawgyi(id) {
  return ((EMAN && EMAN.apd_zawgyi) || []).indexOf(id) >= 0;
}

// ONE TAB, MANY SOURCES -- and the sources come from the BUILD's book table,
// never from a list kept here.  The first version named six dictionaries in
// this file; the build imported six; and the reader found `āmanteti` showing
// two where dictionary.sutta.org shows ten.  Whatever the build ingests is
// what this renders, so the two cannot drift apart again.
// Each section keeps its own heading, count and attribution -- sections, not a
// merge -- and a jump strip says what is in here for this word.
function viewDict(d) {
  var have = [];
  // THE ORDER IS THE READER'S DECISION OF 2026-08-06: CPED, then PED — the
  // two that open by default — then NCP and the rest.  This moves PED up
  // between the concise pair the 2026-08-02 pinning put first; the pinning's
  // reason (shortest answers first) survives in CPED still leading, and PED
  // second is the decision itself.
  function apdEntry(id) {
    var rows = d.apd && d.apd[id];
    if (!rows || !rows.length) return null;
    var bk = apdBook(id);
    return {id: id, label: bk.name, n: rows.length, ev: true,
            src: bk.author + (apdZawgyi(id) ? ' — ' + T('wl_zg') : '')};
  }
  var e;
  if (EVAL) { e = apdEntry('C'); if (e) have.push(e); }
  // `d.pedRows` is the merged PED section — the shipped set plus whatever PCED's
  // "P" adds that is not already in it.  `d.apd.P` has been removed by render().
  if (d.pedRows && d.pedRows.length)
    have.push({id: '_ped', label: T('wl_ped_tab'),
               src: T('wl_tip_ped'), n: d.pedRows.length, ev: false});
  if (EVAL) {
    e = apdEntry('NCP'); if (e) have.push(e);
    apdOrder(d).forEach(function (id) {
      if (APD_FIRST.indexOf(id) >= 0) return;      // C and NCP already placed
      var e2 = apdEntry(id);
      if (e2) have.push(e2);
    });
    if (d.n.ppn) have.push({id: '_ppn', label: T('wl_ppn'), n: d.n.ppn, ev: true,
                            src: T('wl_tip_ppn')});
  }
  if (!have.length)
    return '<p class="wl-none">' + esc(T('wl_nodict')) + '</p>';

  // !!! SAID ONCE, ABOVE THE LIST.  It was emitted inside every section, so a
  // word carried by six dictionaries printed the same four sentences six
  // times and pushed the definitions off the screen.  It belongs after the
  // 'In this word:' line and before the first dictionary's name, in the
  // plural, because that is what it is describing.
  var h = '';
  // the gear, above everything, so the choice of sections is made where the
  // sections are (decided 2026-08-06; the catalogue is the BUILD's, not a
  // list kept here, for the reason viewDict's own header records)
  if (EVAL) {
    var cat = [], seen = {C: 1, P: 1};
    ['NCP'].concat((EMAN && EMAN.apd_order) || []).forEach(function (id) {
      if (!seen[id]) { seen[id] = 1; cat.push({id: id, label: apdBook(id).name}); }
    });
    cat.push({id: '_ppn', label: T('wl_ppn')});
    var g = gearGet();
    h += '<div class="wl-gearrow"><button type="button" class="wl-gear" title="'
       + esc(T('wl_gear_tip')) + '">⚙</button>'
       + '<div class="wl-gearpop" hidden>'
       + '<div class="wl-cite wl-gearnote">' + esc(T('wl_gear_note')) + '</div>'
       + cat.map(function (c) {
           return '<label class="wl-gearopt"><input type="checkbox" data-wl-gear="'
                + c.id + '"' + (g[c.id] ? ' checked' : '') + '> ' + esc(c.label) + '</label>';
         }).join('')
       + '</div></div>';
  }
  // ONLY THE OPEN SECTIONS (reader, 2026-08-09: "shouldn't the list of
  // dictionaries in this word show only the ones selected in the gear?").
  // A closed section already IS its own one-line header carrying label and
  // count, so listing it here too said everything twice.  The strip keeps
  // its jump role for the sections actually open — which is where an entry
  // can be long enough to need jumping past.
  // !!! A TAB THAT COUNTS ITS DICTIONARIES AND THEN DRAWS NONE OF THEM.
  // Reader-reported 2026-08-10 and rendered to confirm it: `yathānisinna`
  // showed `APD 2` and the body held ONE grey line — because the only sections
  // that open by default are CPED and PED (the decision of 2026-08-06) and the
  // word is in neither.  For `Akalaṅka`, whose one source is the proper-names
  // section, the tab said 1 and drew nothing at all.
  //
  // The defaults are not the problem and are not changed: where CPED or PED
  // has the word, everything below behaves exactly as it did.  What is fixed
  // is the case the defaults cannot cover — if NOTHING would be open, the
  // first section opens, because a count with nothing behind it is the failure
  // this panel keeps being caught by, and "hidden must not mean absent" was the
  // reason the summary line exists in the first place.
  //
  // It touches no persisted state: the gear still says what the reader chose,
  // and this word alone is drawn.
  var forced = have.some(function (t) { return gearOpen(t.id); })
             ? null : (have[0] && have[0].id);
  var isOpen = function (t) { return gearOpen(t.id) || t.id === forced; };
  var openHave = have.filter(isOpen);
  if (openHave.length > 1) {
    h += '<div class="wl-jump"><span class="wl-cite">' + esc(T('wl_jump')) + '</span> '
       + openHave.map(function (t) {
           return '<a href="#wl-s-' + t.id + '">' + esc(t.label)
                + ' <span class="wl-cite">' + t.n + '</span></a>';
         }).join(' · ') + '</div>';
  }
  if (have.some(function (t) { return t.ev; }))
    h += '<div class="wl-banner">'
       + esc(T(have.length > 1 ? 'wl_eval_pl' : 'wl_eval')) + '</div>';
  var closedN = 0;
  have.forEach(function (t) {
    if (!isOpen(t)) { closedN++; return; }
    h += '<div class="wl-sec" id="wl-s-' + t.id + '">'
       + '<div class="wl-sub">' + esc(t.label)
       + ' <span class="wl-flag">(' + t.n + ')</span></div>'
       + '<div class="wl-src">' + esc(t.src) + '</div>'
       + sectionBody(d, t.id)
       + '</div>';
  });
  // HIDDEN MUST NOT MEAN ABSENT — but seven one-line headers were clutter
  // (reader, 2026-08-09, trying this before deciding whether to remove even
  // it).  ONE summary line says how many more dictionaries carry THIS word —
  // the fact the gear alone can never state — and clicking it opens the gear.
  if (closedN) {
    h += '<button type="button" class="wl-moredicts" data-wl-gearline="1">'
       + esc(T('wl_more_dicts').replace('%d', closedN)) + ' · ⚙</button>';
  }
  return h;
}

function sectionBody(d, key) {
  var h = '';
  if (key === '_ped') {
    // rows from the shipped set carry PED's own markup; rows contributed by
    // PCED "P" are plain text and are escaped.
    d.pedRows.forEach(function (r) {
      h += '<div class="wl-row"><div class="wl-lem wl-g">' + esc(r.lem) + '</div>'
         + '<div class="wl-ext">' + (r.html ? r.body : rich(r.body)) + '</div></div>';
    });
    return h;
  }
  if (key === '_ppn') {
    ((d.ev && d.ev.lem) || []).forEach(function (L) {
      (L.e.pn || []).forEach(function (ent) {
        h += '<div class="wl-row"><span class="wl-lem wl-g">' + esc(L.b) + '</span>'
           + '<div class="wl-ext">' + ent + '</div></div>';
      });
    });
    return h;
  }
  var rows = d.apd[key] || [], burmese = apdZawgyi(key);
  rows.forEach(function (r, i) {
    h += '<div class="wl-row"><span class="wl-cite">' + (i + 1) + '. </span>'
       + '<span class="wl-lem wl-g">' + esc(r.lem) + '</span>'
       + '<div class="' + (burmese ? 'wl-my' : 'wl-ext') + '">'
       + rich(r.body) + '</div></div>';
  });
  return h;
}

function dpdBody(d) {
  var h = '', e = (d.ev && d.ev.dpd) || [];
  e.forEach(function (x, i) {
    h += '<div class="wl-row"><span class="wl-cite">' + (i + 1) + '. </span>'
       + '<span class="wl-lem wl-g">' + esc(x.h) + '</span>'
       + '<div class="wl-ext">' + x.e + '</div></div>';
  });
  return h;
}

function lexBody(d, key) {
  var field = LEXFIELD[key], h = '', i = 0;
  if (!field) return '';
  ((d.ev && d.ev.lem) || []).forEach(function (L) {
    var v = L.e[field];
    if (!v) return;
    (Array.isArray(v) ? v : [v]).forEach(function (ent) {
      i++;
      h += '<div class="wl-row"><span class="wl-cite">' + i + '. </span>'
         + '<span class="wl-lem wl-g">' + esc(L.b) + '</span>'
         + '<div class="' + (LEXBURMESE[key] ? 'wl-my' : 'wl-ext') + '">'
         + (LEXBURMESE[key] ? rich(ent) : ent) + '</div></div>';
    });
  });
  return h;
}

var LEXFIELD = {cped: 'cp', ppn: 'pn', ny: 'ny', vri: 'vri',
                pwg: 'pwg', tpm: 'tpm', rt: 'rt', uhs: 'uhs'};
var LEXTIP = {cped: 'wl_tip_cped', ppn: 'wl_tip_ppn', ny: 'wl_tip_ny',
              vri: 'wl_tip_vri', pwg: 'wl_tip_pwg', tpm: 'wl_tip_tpm',
              rt: 'wl_tip_rt', uhs: 'wl_tip_uhs'};
var LEXBURMESE = {pwg: 1, tpm: 1, rt: 1, uhs: 1};

function viewLex(d, tab) {
  var field = LEXFIELD[tab];
  if (!field) return '<p class="wl-none">' + esc(T('wl_noentry')) + '</p>';
  var h = evHead(T(LEXTIP[tab]), LEXBURMESE[tab] ? T('wl_zg') : '');
  var i = 0;
  ((d.ev && d.ev.lem) || []).forEach(function (L) {
    var v = L.e[field];
    if (!v) return;
    (Array.isArray(v) ? v : [v]).forEach(function (ent) {
      i++;
      h += '<div class="wl-row"><span class="wl-cite">' + i + '. </span>'
         + '<span class="wl-lem wl-g">' + esc(L.b) + '</span>'
         + '<div class="' + (LEXBURMESE[tab] ? 'wl-my' : 'wl-ext') + '">'
         + (LEXBURMESE[tab] ? rich(ent) : ent) + '</div></div>';
    });
  });
  if (!i) h += '<p class="wl-none">' + esc(T('wl_noentry')) + '</p>';
  return h;
}

// ------------------------------------------------------------------- wire --
function start() {
  build();
  // !!! DO NOT FETCH THE MANIFEST AT BOOT.  `manifest()` was called here, so
  // turning the panel on by default would have put `lookup/index.json` —
  // 312 kB — on every reader's load path, whether or not they ever touch a
  // word.  Measured on a phone (390x844, CPU 4x) that was the ENTIRE cost of
  // the new default: +312 kB and +1 request, against +16 DOM nodes and
  // +0.36 MB of heap.  It is the same shape as search.html fetching its 21 MB
  // term list before anyone had typed, and it gets the same treatment.
  //
  // `look()` already awaits `manifest()` before every shard fetch, so removing
  // this costs nothing but the first click's latency — and even that is paid
  // back by warming on the pointerdown that PRECEDES the click, scoped to the
  // text itself so a reader who only scrolls and never taps a word never
  // fetches it at all.
  hoverBind();
  var warmed = false;
  document.addEventListener('pointerdown', function (ev) {
    if (warmed) return;
    if (!(ev.target.closest && ev.target.closest('.para'))) return;
    warmed = true;
    // all three manifests, not one: the eval and hw manifests were fetched
    // only when first needed, which put them on the click's critical path
    // (2026-09-05).  Same trigger, same scope, two more small files.
    manifest(); emanifest(); hwmanifest();
  }, true);
  document.addEventListener('click', function (ev) {
    if (el && el.contains(ev.target)) return;
    var p = ev.target.closest && ev.target.closest('.para');
    if (!p) return;
    if (ev.target.closest('a,button,.tools,.app')) return;
    var hit = wordAt(ev.clientX, ev.clientY);
    if (!hit) return;
    mark(hit.node, hit.a, hit.b);
    lookup(hit.word, p);
  }, true);
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', start);
else start();

// exposed for the gate
window.WL = {lookup: function (w, p) { return lookup(w, p); },
             // the English resolver, so the gate can assert the morphology
             // (`mendicants` -> `mendicant`) without going through a click
             wn: function (w) { return wnLook(w); },
             panelW: PANEL_W, textMin: TEXT_MIN, layout: layout, on: true};
})();
