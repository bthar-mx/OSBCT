/* The IEBH sandhi solver, copied unmodified for the reader pane's Sandhi button.
 * Source: bthar-mx/gramaticas-pali-es 54e2cbe8614ce159479266ce09cad043fb79b9d3, site/recursos/solucionador/index.html,
 * the <script id="motor"> block (gramaticas.buddha-dhamma.net/recursos/solucionador/).
 * (c) IEBH / BTHAR, CC BY-NC-ND 4.0. Do not edit: regenerate with _panel/build_solver.py.
 * Block SHA-256 b79b943cb4a32431f98f0c058adbc2ef098f911b6bdc81630b006a55d6af6a09. It is wrapped in one function scope and nothing else is added. */
(function () {

/* ══ EL MOTOR ══ Este bloque no toca el DOM: el arnés de la etapa 4
   (nuestro/js/arnes_pagina.js) lo evalúa en Node tal como está publicado y
   comprueba que sus secuencias sean byte-idénticas a las del Python sobre
   las 266 formas del banco. Si se edita algo del motor, se edita en
   nuestro/js/ y se regenera: esta copia la escribe el generador. */
const DATA = {"suttas":[{"kac":1,"ru":1,"sad":null,"pali":"Attho akkharasaññāto","es":"El significado se conoce por las letras.","split":"Attho + akkharasaññāto, 2"},{"kac":2,"ru":2,"sad":"1, 2","pali":"Akkharā p’ ādayo ekacattālīsaṃ","es":"Las letras son cuarenta y una, comenzando con ‘a’.","split":"Akkharā + api + a-ādayo + ekacattālīsaṃ, 4"},{"kac":3,"ru":3,"sad":"3","pali":"Tatth’ odantā sarā aṭṭha","es":"Entre ellas, las ocho [letras] terminadas en ‘o’ se denominan “vocales”.","split":"Tattha + o-antā + sarā + aṭṭha, 4"},{"kac":4,"ru":4,"sad":"4","pali":"Lahumattā tayo rassā","es":"Las tres [vocales] de medida leve son cortas.","split":"Lahumattā + tayo + rassā, 3"},{"kac":5,"ru":5,"sad":"5","pali":"Aññe dīghā","es":"Las demás son largas.","split":"Aññe + dīghā, 2"},{"kac":6,"ru":8,"sad":"6","pali":"Sesā byañjanā","es":"Las restantes son consonantes.","split":"Sesā + byañjanā, 2"},{"kac":7,"ru":9,"sad":"7","pali":"Vaggā pañcapañcaso mantā","es":"Los [grupos] de cinco en cinco, son agrupadas.","split":"Vaggā + pañcapañcaso + ma-antā, 3"},{"kac":8,"ru":10,"sad":"8","pali":"Aṃ iti niggahitaṃ","es":"‘Ṃ’ es niggahita.","split":"Aṃ + iti + niggahitaṃ, 3"},{"kac":9,"ru":11,"sad":null,"pali":"Parasamaññā payoge","es":"En caso de necesidad, [se usan] los términos de otros.","split":"Para + samaññā + payoge, 3"},{"kac":10,"ru":12,"sad":"28","pali":"Pubbam adhoṭhitam assaraṃ sarena viyojaye","es":"Se debería separar de la vocal a la [consonante] anterior, que yace debajo, desprovista de vocal.","split":"Pubbaṃ + adhoṭhitaṃ + assaraṃ + sarena + viyojaye, 5"},{"kac":11,"ru":14,"sad":"29","pali":"Naye paraṃ yutte","es":"Cuando sea apropiado, se debería trasladar [la consonante] a la [letra] siguiente.","split":"Naye + paraṃ + yutte, 3"},{"kac":12,"ru":13,"sad":"30","pali":"Sarā sare lopaṃ","es":"Las vocales se eliden cuando una vocal sigue.","split":"Sarā + sare + lopaṃ, 3"},{"kac":13,"ru":15,"sad":"31","pali":"Vā paro asarūpā","es":"Opcionalmente, [se elide] la [vocal] siguiente después de [una vocal] disímil.","split":"Vā + paro + a-sarūpā, 3"},{"kac":14,"ru":16,"sad":"34","pali":"Kvac’ āsavaṇṇaṃ lutte","es":"A veces, cuando [la vocal anterior] ha sido elidida [la vocal siguiente se vuelve] disímil.","split":"Kvaci + a-savaṇṇaṃ + lutte, 3"},{"kac":15,"ru":17,"sad":"36","pali":"Dīghaṃ","es":"Larga.","split":"Dīghaṃ, 1"},{"kac":16,"ru":18,"sad":"35","pali":"Pubbo ca","es":"Y la anterior.","split":"Pubbo + ca, 2"},{"kac":17,"ru":19,"sad":"43","pali":"Yam edantass’ ādeso","es":"‘Y’ [es] la sustitución de la ‘e’ final.","split":"Yaṃ + e-antassa + ādeso, 3"},{"kac":18,"ru":20,"sad":"44","pali":"Vam od-udantānaṃ","es":"‘V’, de los que terminan en ‘o’ y ‘u’.","split":"Vaṃ + o-u-dantānaṃ, 2"},{"kac":19,"ru":22,"sad":"46, 47","pali":"Sabbo caṃ ti","es":"Toda [sílaba] ‘ti’, [se vuelve] ‘c’.","split":"Sabbo + ca + ti, 3"},{"kac":20,"ru":27,"sad":"50","pali":"Do dhassa ca","es":"Y, ‘da’ de ‘dha’.","split":"Do + dhassa + ca, 3"},{"kac":21,"ru":21,"sad":"51","pali":"Ivaṇṇo yaṃ navā","es":"Ocasionalmente, la letra ‘i’, [se vuelve] ‘y’.","split":"I-vaṇṇo + yaṃ + navā, 3"},{"kac":22,"ru":28,"sad":"52","pali":"Evādissa ri pubbo ca rasso","es":"Del comienzo de “eva”, ‘ri’, y la anterior, corta.","split":"Eva-ādissa + ri + pubbo + ca + rasso, 5"},{"kac":23,"ru":36,"sad":"62","pali":"Sarā pakati byañjane","es":"Cuando una consonante sigue, [las vocales mantienen su forma] original.","split":"Sarā + pakati + byañjane, 3"},{"kac":24,"ru":35,"sad":"63","pali":"Sare kvaci","es":"A veces, cuando una vocal sigue.","split":"Sare + kvaci, 2"},{"kac":25,"ru":37,"sad":"64, 71, 165","pali":"Dīghaṃ","es":"Larga.","split":"Dīghaṃ, 1"},{"kac":26,"ru":38,"sad":"65, 179","pali":"Rassaṃ","es":"Corta.","split":"Rassaṃ, 1"},{"kac":27,"ru":39,"sad":"66, 163-4","pali":"Lopañ ca tatrākāro","es":"Elisión, y allí, la letra ‘a’.","split":"Lopaṃ + ca + tatra + a-kāro, 4"},{"kac":28,"ru":40,"sad":"67","pali":"Para dvebhāvo ṭhāne","es":"Duplicación de la siguiente en el lugar apropiado.","split":"Para + dve-bhāvo + ṭhāne, 3"},{"kac":29,"ru":42,"sad":"68","pali":"Vagge ghosāghosānaṃ tatiya-paṭhamā","es":"En las agrupadas, la primera y la tercera, de las sordas y sonoras.","split":"Vagge + ghosa-aghosānaṃ + tatiya-paṭhamā, 3"},{"kac":30,"ru":58,"sad":"153","pali":"Aṃ byañjane niggahitaṃ","es":"Cuando una consonante sigue, el niggahita ‘ṃ’.","split":"Aṃ + byañjane + niggahitaṃ, 3"},{"kac":31,"ru":49,"sad":"138-9","pali":"Vaggantaṃ vā vagge","es":"Opcionalmente, cuando una [consonante] agrupada sigue, la final del grupo.","split":"Vagga-antaṃ + vā + vagge, 3"},{"kac":32,"ru":50,"sad":"140","pali":"E-he ñaṃ","es":"Cuando ‘e’ y ‘h’, ‘ñ’.","split":"E-he + ñaṃ, 2"},{"kac":33,"ru":51,"sad":"141","pali":"Sa ye ca","es":"Y cuando ‘y’, junto con [ṃ].","split":"Sa + ye + ca, 3"},{"kac":34,"ru":52,"sad":"142-5","pali":"Ma-dā sare","es":"Cuando una vocal sigue, ‘m’ y ‘d’.","split":"Ma-dā + sare, 2"},{"kac":35,"ru":34,"sad":"56","pali":"Ya-va-ma-da-na-ta-ra-lā c’ āgamā","es":"Y las inserciones ‘y’, ‘v’, ‘m’, ‘d’, ‘n’, ‘t’, ‘r’ y ‘l’.","split":"Ya-va-ma-da-na-ta-ra-lā + ca + āgamā, 3"},{"kac":36,"ru":47,"sad":"130","pali":"Kvaci o byañjane","es":"A veces, cuando una consonante sigue, ‘o’.","split":"Kvaci + o + byañjane, 3"},{"kac":37,"ru":57,"sad":"146","pali":"Niggahitañ ca","es":"Y el niggahita.","split":"Niggahitaṃ + ca, 2"},{"kac":38,"ru":53,"sad":"147","pali":"Kvaci lopaṃ","es":"A veces, elisión.","split":"Kvaci + lopaṃ, 2"},{"kac":39,"ru":54,"sad":"147","pali":"Byañjane ca","es":"Y cuando una consonante sigue.","split":"Byañjane + ca, 2"},{"kac":40,"ru":55,"sad":"148","pali":"Paro vā saro","es":"Opcionalmente, la vocal siguiente.","split":"Paro + vā + saro, 3"},{"kac":41,"ru":56,"sad":"135-6, 149","pali":"Byañjano ca visaññogo","es":"Y la consonante, simple.","split":"Byañjano + ca + vi-saññogo, 3"},{"kac":42,"ru":32,"sad":"53","pali":"Go sare puthass’ āgamo kvaci","es":"A veces, inserción de ‘g’ [al final] de “putha”, cuando una vocal sigue.","split":"Go + sare + putha-ssa + āgamo + kvaci, 5"},{"kac":43,"ru":33,"sad":"54","pali":"Pāssa c’ anto rasso","es":"Y al final de ‘pā’, [inserción de ‘g’,] corta.","split":"Pā-ssa + ca + anto + rasso, 4"},{"kac":44,"ru":24,"sad":"57","pali":"Abbho abhi","es":"‘Abhi’, ‘abbh’.","split":"Abbho + abhi, 2"},{"kac":45,"ru":25,"sad":"58","pali":"Ajjho adhi","es":"‘Adhi’, ‘ajjh’.","split":"Ajjho + adhi, 2"},{"kac":46,"ru":26,"sad":"59","pali":"Te na vā ivaṇṇe","es":"Opcionalmente, cuando ‘i’ e ‘ī’ siguen, estos no [se aplican].","split":"Te + na + vā + i-vaṇṇe, 4"},{"kac":47,"ru":23,"sad":"60","pali":"Atissa c’ antassa","es":"Y al final de ‘ati’.","split":"Atissa + ca + antassa, 3"},{"kac":48,"ru":43,"sad":"137","pali":"Kvaci paṭi patissa","es":"A veces, ‘paṭi’ por ‘pati’.","split":"Kvaci + paṭi + patissa, 3"},{"kac":49,"ru":44,"sad":"129","pali":"Puthass u byañjane","es":"Cuando una consonante sigue, ‘u’ de [el final de] “putha”.","split":"Putha-ssa + u + byañjane, 3"},{"kac":50,"ru":45,"sad":"126","pali":"O avassa","es":"‘O’ de ‘ava’.","split":"O + avassa, 2"},{"kac":51,"ru":59,"sad":"150, 154","pali":"Anupadiṭṭhānaṃ vuttayogato","es":"De los no mostrados, según las reglas mencionadas.","split":"An-upadiṭṭhānaṃ + vutta-yogato, 2"}],"version":"2.4","fecha":"2026-09-14","nota":"EL PASAJE VIAJA YA CON EL VEREDICTO. El .md exportado no decía de qué texto salía cada veredicto, y la página lo tenía delante: el pasaje está en la caja cuando se adjudica. Reconstruirlo después cuesta caro —tres lotes seguidos hubo que rastrearlos a mano contra el corpus, y dos no se recuperaron enteros—, y no siempre se puede, porque el repositorio tiene listas de formas y no el texto corrido de los comentarios. Se guarda POR VEREDICTO y no «lo que haya ahora en la caja», porque el tablero sobrevive al cambio de pasaje a propósito: un envío abarcó cuatro, y sellar a las fichas antiguas el texto de hoy sería equivocarse con aplomo, que es peor que callar. Cada ficha se queda con el suyo, igual que ya se queda con la señal y con la primera lectura del día en que se registró; los textos distintos se guardan una vez y la ficha apunta al número. Antes, en la 2.3: TREINTA Y DOS CASOS DEL KHAGGAVISĀṆASUTTAVAṆṆANĀ, y uno de ellos corrige a la propia herramienta. «Kappeti» no es juntura sino verbo —«eko seyyaṁ kappeti», con «seyyaṁ» por objeto y en serie con otros cuatro verbos—, y el motor la daba por «kappe + iti» CON SEÑAL SEGURA, por el patrón adjudicado de las enclíticas del 2026-08-28. Un falso positivo de un patrón firmado es peor que una primera lectura desafortunada, porque la página lo enseñaba con la atribución del IEBH encima; el patrón alcanza a 1.921 formas, 128 de ellas acabadas en «-eti», que es donde un verbo de la séptima no se distingue de «X-e + iti». Lo vio un estudiante. Entran con ello ocho junturas que el lote había dejado pasar, y dos de ellas —«yaṃkiñci» y «dīghamaddhānasaṃsaraṃ»— el motor no las señalaba siquiera, porque la forma unida está ella misma atestiguada en la edición y la señal por léxico no puede verla. Antes, en la 2.2: EL PIE Y EL ENLACE DE VUELTA YA HABLAN INGLÉS. Eran lo último que se quedaba en español con el botón EN puesto; van ahora en los dos idiomas, y la fórmula de la licencia es la misma que usan las páginas de capítulo. La lengua de arranque la pone el sistema del lector mientras no elija, y su elección viaja al resto del sitio. Antes, en la 2.1: LO REGISTRADO A MANO YA SE VE SIEMPRE. La 1.12 dio esto por hecho y lo cumplía a medias: el bloque de registradas preguntaba «¿está en el pasaje?» cuando la pregunta era «¿ya tiene tarjeta?». Las dos sólo coinciden si todo lo del pasaje recibe tarjeta, y no es así, porque la página sólo la da a lo que el motor señala. De modo que una voz presente en el pasaje y no señalada —el caso mismo para el que existe la caja: un sandhi que se ve leyendo y que el motor se saltó— no recibía tarjeta por ningún lado, y sin tarjeta no hay campo de nota, ni de escalera, ni botón de borrar: el veredicto viajaba al .md solo. LO ENCONTRÓ UN ESTUDIANTE LEYENDO EL CÓDIGO, después de que dos lotes suyos salieran así y de escribir a mano en el archivo exportado las escaleras que la página no le pedía. Con ello, el .md dice ahora de dónde sale cada veredicto: de la tarjeta del solucionador o de la caja del revisor, que antes no se distinguía. Las cuentas del encabezado no cambian —lo registrado a mano sigue fuera de ellas—, porque miden al detector y no al revisor. Antes, en la 2.0: EL MOTOR YA NO ES SÓLO KACCĀYANA, y por eso cambió el número entero. El 2026-08-30 entró en él la primera operación que Kaccāyana no enuncia: SADDANĪTI SUTTAMĀLĀ §49 —«evassekāre itissaññassa cissa vo»—, sin la cual «tveva» no ofrecía su lectura citativa. Hasta entonces la herramienta explicaba el canon con una sola gramática; desde entonces, con las que hagan falta, y lo dice en cada escalera que la cita. Lo demás de esa noche va con ello: «tveva» = ti + eva y «avijjāyatveva» = tu + eva, adjudicados después de RETIRAR una primera adjudicación que daba por única una voz de dos lecturas; y con el criterio que lo gobierna, que es del IEBH: hay formas de sandhi teóricamente plausibles que son inverosímiles en el Tipiṭaka — recomponer no basta, y atestiguar la pieza no atestigua la juntura. Del 2026-08-31: enviar a la cola pide identidad verificada, con dos papeles —revisor y aprendiz—, de modo que cada veredicto sabe de quién viene y la atribución deja de suponerse. Y en la 1.12: LO REGISTRADO A MANO SE EMPEZÓ A VER. Una voz dada de alta por el campo «sandhi no detectado» no aparecía por ninguna parte, porque la página sólo dibuja tarjeta para lo que el motor señala y una voz registrada a mano es, por definición, una sobre la que el motor calla. Desde entonces llevan su tarjeta, rotulada aparte y a la vista aunque se analice otro pasaje, con su campo de nota y de escalera — pero sólo las que NO estaban en el pasaje analizado, que es la mitad que faltaba y que corrige la 2.1.","nota_en":"THE PASSAGE NOW TRAVELS WITH THE VERDICT. The exported .md did not say which text each verdict came from, and the page had it in front of it all along — the passage is in the box when the verdict is made. Recovering it afterwards is expensive: three batches in a row had to be traced by hand against the corpus, and two were never fully recovered, because the repository holds lists of forms and not the running text of the commentaries. It is stored PER VERDICT and not «whatever is in the box now», because the board deliberately outlives a change of passage: one export covered four of them, and stamping today's text on the older entries would be wrong with an air of authority, which is worse than silence. Each card keeps its own, just as it already keeps the signal and the first reading of the day it was registered. Distinct texts are stored once and the card points at the number. Earlier: THIRTY-TWO CASES FROM THE KHAGGAVISĀṆASUTTAVAṆṆANĀ, and one of them corrects the tool itself. «Kappeti» is not a juncture but a verb — «eko seyyaṁ kappeti», with «seyyaṁ» as its object, in a series with four other verbs — and the engine read it as «kappe + iti» WITH A SURE SIGNAL, by the enclitic pattern adjudicated on 2026-08-28. A false positive from a signed pattern is worse than an unlucky first reading, because the page displayed it under the IEBH's attribution; the pattern reaches 1,921 forms, 128 of them ending in «-eti», where a class-VII verb cannot be told from «X-e + iti». A student found it. Eight junctures the batch had passed over enter with it, two of which — «yaṃkiñci» and «dīghamaddhānasaṃsaraṃ» — the engine did not flag at all, because the joined form is itself attested in the edition and the lexical signal cannot see it. Earlier: THE FOOTER AND THE BACK LINK NOW SPEAK ENGLISH. They were the last things left in Spanish with the EN button on; they now go in both languages, and the wording of the licence is the same one the chapter pages use. The starting language is set by the reader's system until they choose, and their choice travels to the rest of the site. Earlier versions of this page are described in the Spanish note.","huella":{"reglas.json":"ab6c7603a774922542f050fdac7d89371ef19dbae55e60ff9205fafc64c3fb79","coincide":false,"guardada":"534a7a2eb5221f79b39c99d2b7d7ebb1b09d4be7e405ec90421fd02e4ab600fe"},"reglas":{"ce":[{"f":"yass’ indriyāni","comp":"yassa indriyāni","ref":"Dh. 27","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["yassa indriyāni","yass a indriyāni (§10)","yass indriyāni (§12)","yassindriyāni (§11)","yass’ indriyāni (EM)"],"full":true,"kac_seq":12,"verificada":true},{"f":"lokaggo","comp":"loka + aggo","ref":"Ap. i 166","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["loka aggo","lok a aggo (§10)","lok aggo (§12)","lokaggo (§11)"],"full":true,"derivada":true},{"f":"bhavāsavo","comp":"bhava + āsavo","ref":"D. iii 181","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["bhava āsavo","bhav a āsavo (§10)","bhav āsavo (§12)","bhavāsavo (§11)"],"full":true,"derivada":true},{"f":"yass’ īdisā","comp":"yassa īdisā","ref":"Sad. iii §30","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["yassa īdisā","yass a īdisā (§10)","yass īdisā (§12)","yassīdisā (§11)","yass’ īdisā (EM)"],"full":true,"derivada":true},{"f":"ajj’ uposatho","comp":"ajja uposatho","ref":"Vin. iii 145","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["ajja uposatho","ajj a uposatho (§10)","ajj uposatho (§12)","ajjuposatho (§11)","ajj’ uposatho (EM)"],"full":true,"derivada":true},{"f":"ekenūnāni","comp":"ekena + ūnāni","ref":"DA. i 5","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["ekena ūnāni","eken a ūnāni (§10)","eken ūnāni (§12)","ekenūnāni (§11)"],"full":true,"derivada":true},{"f":"bhavesanā","comp":"bhava + esanā","ref":"A. iii 281","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["bhava esanā","bhav a esanā (§10)","bhav esanā (§12)","bhavesanā (§11)"],"full":true,"derivada":true},{"f":"bhavogho","comp":"bhava + ogho","ref":"S. ii 452","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["bhava ogho","bhav a ogho (§10)","bhav ogho (§12)","bhavogho (§11)"],"full":true,"derivada":true},{"f":"tadāhaṃ","comp":"tadā ahaṃ","ref":"A. i 110","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":15,"s":["tadā ahaṃ","tad ā ahaṃ (§10)","tad ahaṃ (§12)","tad āhaṃ (§15)","tadāhaṃ (§11)"],"full":true,"derivada":true},{"f":"avijjāsavo","comp":"avijjā + āsavo","ref":"Iti. 228","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["avijjā āsavo","avijj ā āsavo (§10)","avijj āsavo (§12)","avijjāsavo (§11)"],"full":true,"derivada":true},{"f":"paññindriya","comp":"paññā + indriya","ref":"M. ii 144","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["paññā indriya","paññ ā indriya (§10)","paññ indriya (§12)","paññindriya (§11)"],"full":true,"derivada":true},{"f":"sabb’ ītiyo","comp":"sabbā ītiyo","ref":"Bv. 320","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["sabbā ītiyo","sabb ā ītiyo (§10)","sabb ītiyo (§12)","sabbītiyo (§11)","sabb’ ītiyo (EM)"],"full":true,"derivada":true},{"f":"tad’ uṭṭhahi","comp":"tadā uṭṭhahi","ref":"J. ii 69","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["tadā uṭṭhahi","tad ā uṭṭhahi (§10)","tad uṭṭhahi (§12)","taduṭṭhahi (§11)","tad’ uṭṭhahi (EM)"],"full":true,"derivada":true},{"f":"nāganāsūrū","comp":"nāganāsā + ūrū","ref":"J. ii 67","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["nāganāsā ūrū","nāganās ā ūrū (§10)","nāganās ūrū (§12)","nāganāsūrū (§11)"],"full":true,"derivada":true},{"f":"tass’ evaṃ","comp":"tassā evaṃ","ref":"Ap. ii 207","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["tassā evaṃ","tass ā evaṃ (§10)","tass evaṃ (§12)","tassevaṃ (§11)","tass’ evaṃ (EM)"],"full":true,"derivada":true},{"f":"avijjogho","comp":"avijjā + ogho","ref":"D. iii 192","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["avijjā ogho","avijj ā ogho (§10)","avijj ogho (§12)","avijjogho (§11)"],"full":true,"derivada":true},{"f":"labhant’ atthe","comp":"labhanti atthe","ref":"A. i 229","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["labhanti atthe","labhant i atthe (§10)","labhant atthe (§12)","labhantatthe (§11)","labhant’ atthe (EM)"],"full":true,"derivada":true},{"f":"agg’ āhito","comp":"aggi āhito","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["aggi āhito","agg i āhito (§10)","agg āhito (§12)","aggāhito (§11)","agg’ āhito (EM)"],"full":true,"derivada":true},{"f":"tīṇ’ imāni","comp":"tīṇi imāni","ref":"M. iii 201","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["tīṇi imāni","tīṇ i imāni (§10)","tīṇ imāni (§12)","tīṇimāni (§11)","tīṇ’ imāni (EM)"],"full":true,"derivada":true},{"f":"adhīritaṃ","comp":"adhi + īritaṃ","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["adhi īritaṃ","adh i īritaṃ (§10)","adh īritaṃ (§12)","adhīritaṃ (§11)"],"full":true,"kac_seq":46,"verificada":true},{"f":"isuttamo","comp":"isi + uttamo","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["isi uttamo","is i uttamo (§10)","is uttamo (§12)","isuttamo (§11)"],"full":true,"derivada":true},{"f":"udadhūmiyo","comp":"udadhi + ūmiyo","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["udadhi ūmiyo","udadh i ūmiyo (§10)","udadh ūmiyo (§12)","udadhūmiyo (§11)"],"full":true,"derivada":true},{"f":"no h’ etaṃ","comp":"no hi etaṃ","ref":"D. ii 49","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["no hi etaṃ","no h i etaṃ (§10)","no h etaṃ (§12)","nohetaṃ (§11)","no h’ etaṃ (EM)"],"full":true,"kac_seq":12,"verificada":true},{"f":"aggobhāso","comp":"aggi + obhāso","ref":"A. i 457","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["aggi obhāso","agg i obhāso (§10)","agg obhāso (§12)","aggobhāso (§11)"],"full":true,"derivada":true},{"f":"tuṇh’ assa","comp":"tuṇhī assa","ref":"Vin. i 225","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["tuṇhī assa","tuṇh ī assa (§10)","tuṇh assa (§12)","tuṇhassa (§11)","tuṇh’ assa (EM)"],"full":true,"derivada":true},{"f":"khaṇant’ ālukalambāni","comp":"khaṇantī ālu- kalambāni","ref":"J. ii 368","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["khaṇantī ālukalambāni","khaṇant ī ālukalambāni (§10)","khaṇant ālukalambāni (§12)","khaṇantālukalambāni (§11)","khaṇant’ ālukalambāni (EM)"],"full":true,"derivada":true},{"f":"migīva","comp":"migī iva","ref":"J. ii 352","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":15,"s":["migī iva","mig ī iva (§10)","mig iva (§12)","mig īva (§15)","migīva (§11)"],"full":true,"derivada":true},{"f":"bhikkhun’ īritaṃ","comp":"bhikkhunī īritaṃ","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["bhikkhunī īritaṃ","bhikkhun ī īritaṃ (§10)","bhikkhun īritaṃ (§12)","bhikkhunīritaṃ (§11)","bhikkhun’ īritaṃ (EM)"],"full":true,"derivada":true},{"f":"pivaṃ bhāgirath’ odakaṃ","comp":"pivaṃ bhāgirathī udakaṃ","ref":"J. ii 55","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":14,"s":["pivaṃ bhāgirathī udakaṃ","pivaṃ bhāgirath ī udakaṃ (§10)","pivaṃ bhāgirath odakaṃ (§14)","pivaṃ bhāgirathodakaṃ (§11)","pivaṃ bhāgirath’ odakaṃ (EM)"],"full":true,"derivada":true},{"f":"rājinūrū","comp":"rājinī + ūrū","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["rājinī ūrū","rājin ī ūrū (§10)","rājin ūrū (§12)","rājinūrū (§11)"],"full":true,"derivada":true},{"f":"kāmuk’ esā","comp":"kāmukī esā","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["kāmukī esā","kāmuk ī esā (§10)","kāmuk esā (§12)","kāmukesā (§11)","kāmuk’ esā (EM)"],"full":true,"derivada":true},{"f":"bhikkhunovādo","comp":"bhikkhunī + ovādo","ref":"Vin. v 366","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["bhikkhunī ovādo","bhikkhun ī ovādo (§10)","bhikkhun ovādo (§12)","bhikkhunovādo (§11)"],"full":true,"derivada":true},{"f":"ucchaggaṃ","comp":"ucchu + aggaṃ","ref":"Vis. i 167","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["ucchu aggaṃ","ucch u aggaṃ (§10)","ucch aggaṃ (§12)","ucchaggaṃ (§11)"],"full":true,"derivada":true},{"f":"dhātāyatanāni","comp":"dhātu + āyatanāni","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["dhātu āyatanāni","dhāt u āyatanāni (§10)","dhāt āyatanāni (§12)","dhātāyatanāni (§11)"],"full":true,"derivada":true},{"f":"dhātindriyāni","comp":"dhātu + indriyāni","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["dhātu indriyāni","dhāt u indriyāni (§10)","dhāt indriyāni (§12)","dhātindriyāni (§11)"],"full":true,"derivada":true},{"f":"dhātīritā","comp":"dhātu + īritā","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["dhātu īritā","dhāt u īritā (§10)","dhāt īritā (§12)","dhātīritā (§11)"],"full":true,"derivada":true},{"f":"māt’ upaṭṭhānaṃ","comp":"mātu upaṭṭhānaṃ","ref":"SnA. ii 23","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["mātu upaṭṭhānaṃ","māt u upaṭṭhānaṃ (§10)","māt upaṭṭhānaṃ (§12)","mātupaṭṭhānaṃ (§11)","māt’ upaṭṭhānaṃ (EM)"],"full":true,"derivada":true},{"f":"dhītūrū","comp":"dhītu + ūrū","ref":"Sad. iii 13","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["dhītu ūrū","dhīt u ūrū (§10)","dhīt ūrū (§12)","dhītūrū (§11)"],"full":true,"derivada":true},{"f":"ānent’ etaṃ pabhāvatiṃ","comp":"ānentu etaṃ pabhāvatiṃ","ref":"J. ii 69","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["ānentu etaṃ pabhāvatiṃ","ānent u etaṃ pabhāvatiṃ (§10)","ānent etaṃ pabhāvatiṃ (§12)","ānentetaṃ pabhāvatiṃ (§11)","ānent’ etaṃ pabhāvatiṃ (EM)"],"full":true,"derivada":true},{"f":"vijjobhāso","comp":"vijju + obhāso","ref":"DA. ii 26","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["vijju obhāso","vijj u obhāso (§10)","vijj obhāso (§12)","vijjobhāso (§11)"],"full":true,"derivada":true},{"f":"vāmūr’ addasa sāmikaṃ","comp":"vāmūrū addasa sāmikaṃ","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["vāmūrū addasa sāmikaṃ","vāmūr ū addasa sāmikaṃ (§10)","vāmūr addasa sāmikaṃ (§12)","vāmūraddasa sāmikaṃ (§11)","vāmūr’ addasa sāmikaṃ (EM)"],"full":true,"derivada":true},{"f":"jambādīni","comp":"jambū + ādīni","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["jambū ādīni","jamb ū ādīni (§10)","jamb ādīni (§12)","jambādīni (§11)"],"full":true,"derivada":true},{"f":"jambissaro","comp":"jambū + issaro","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["jambū issaro","jamb ū issaro (§10)","jamb issaro (§12)","jambissaro (§11)"],"full":true,"derivada":true},{"f":"jamb’ īritā vatena","comp":"jambū īritā vātena","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["jambū īritā vātena","jamb ū īritā vātena (§10)","jamb īritā vātena (§12)","jamb īritā vatena (§26)","jambīritā vatena (§11)","jamb’ īritā vatena (EM)"],"full":true,"aforismo":true,"nota":"El acortamiento de «vātena» en «vatena» queda fuera de la juntura: o es métrico o es errata del documento.","kac_seq_refs":["§10","§12","§26","§11"]},{"f":"vadhūdaraṃ","comp":"vadhū + udaraṃ","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":15,"s":["vadhū udaraṃ","vadh ū udaraṃ (§10)","vadh udaraṃ (§12)","vadh ūdaraṃ (§15)","vadhūdaraṃ (§11)"],"full":true,"derivada":true},{"f":"sarabhūmivego","comp":"sarabhū + ūmivego","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["sarabhū ūmivego","sarabh ū ūmivego (§10)","sarabh ūmivego (§12)","sarabhūmivego (§11)"],"full":true,"derivada":true},{"f":"nāganāsūr’ esā","comp":"nāganāsūrū esā","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["nāganāsūrū esā","nāganāsūr ū esā (§10)","nāganāsūr esā (§12)","nāganāsūresā (§11)","nāganāsūr’ esā (EM)"],"full":true,"derivada":true},{"f":"jamb’ onatā vātena","comp":"jambū onatā vātena","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["jambū onatā vātena","jamb ū onatā vātena (§10)","jamb onatā vātena (§12)","jambonatā vātena (§11)","jamb’ onatā vātena (EM)"],"full":true,"derivada":true},{"f":"puttā m’ atthi","comp":"puttā me atthi","ref":"Dh. 22","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["puttā me atthi","puttā m e atthi (§10)","puttā m atthi (§12)","puttā matthi (§11)","puttā m’ atthi (EM)"],"full":true,"derivada":true},{"f":"ya’ m’ āsi hadayassitaṃ","comp":"yaṃ me āsi hadayassitaṃ","ref":"J. i 121","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["yaṃ me āsi hadayassitaṃ","ya me āsi hadayassitaṃ (§39)","ya m e āsi hadayassitaṃ (§10)","ya m āsi hadayassitaṃ (§12)","yamāsi hadayassitaṃ (§11)","ya’ m’ āsi hadayassitaṃ (EM)"],"full":true,"aforismo":true,"kac_seq_refs":["§39","§10","§12","§11"]},{"f":"yo m’ issaro","comp":"yo me issaro","ref":"J. ii 305","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["yo me issaro","yo m e issaro (§10)","yo m issaro (§12)","yo missaro (§11)","yo m’ issaro (EM)"],"full":true,"derivada":true},{"f":"vacanaṃ m’ īritaṃ","comp":"vacanaṃ me īritaṃ","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["vacanaṃ me īritaṃ","vacanaṃ m e īritaṃ (§10)","vacanaṃ m īritaṃ (§12)","vacanaṃ mīritaṃ (§11)","vacanaṃ m’ īritaṃ (EM)"],"full":true,"derivada":true},{"f":"gāthā m’ udīritā","comp":"gāthā me udīritā","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["gāthā me udīritā","gāthā m e udīritā (§10)","gāthā m udīritā (§12)","gāthā mudīritā (§11)","gāthā m’ udīritā (EM)"],"full":true,"derivada":true},{"f":"sobhaṇā m’ ūrū","comp":"sobhaṇā me ūrū","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["sobhaṇā me ūrū","sobhaṇā m e ūrū (§10)","sobhaṇā m ūrū (§12)","sobhaṇā mūrū (§11)","sobhaṇā m’ ūrū (EM)"],"full":true,"derivada":true},{"f":"sutaṃ m’ etaṃ, bho Gotama","comp":"sutaṃ me etaṃ, bho Gotama","ref":"D. i 127","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["sutaṃ me etaṃ, bho Gotama","sutaṃ m e etaṃ, bho Gotama (§10)","sutaṃ m etaṃ, bho Gotama (§12)","sutaṃ metaṃ, bho Gotama (§11)","sutaṃ m’ etaṃ, bho Gotama (EM)"],"full":true,"derivada":true},{"f":"laddho m’ okāso","comp":"laddho me okāso","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["laddho me okāso","laddho m e okāso (§10)","laddho m okāso (§12)","laddho mokāso (§11)","laddho m’ okāso (EM)"],"full":true,"derivada":true},{"f":"ur’ assa dukkho bhavissati","comp":"uro assa dukkho bhavissati","ref":"Vin. ii 169","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["uro assa dukkho bhavissati","ur o assa dukkho bhavissati (§10)","ur assa dukkho bhavissati (§12)","urassa dukkho bhavissati (§11)","ur’ assa dukkho bhavissati (EM)"],"full":true,"derivada":true},{"f":"es’ āvuso","comp":"eso āvuso","ref":"Vin. iii 307","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["eso āvuso","es o āvuso (§10)","es āvuso (§12)","esāvuso (§11)","es’ āvuso (EM)"],"full":true,"derivada":true},{"f":"tiss’ itthiyo","comp":"tisso itthiyo","ref":"Ap. ii 291","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["tisso itthiyo","tiss o itthiyo (§10)","tiss itthiyo (§12)","tissitthiyo (§11)","tiss’ itthiyo (EM)"],"full":true,"derivada":true},{"f":"catass’ ītiyo","comp":"catasso ītiyo","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["catasso ītiyo","catass o ītiyo (§10)","catass ītiyo (§12)","catassītiyo (§11)","catass’ ītiyo (EM)"],"full":true,"derivada":true},{"f":"na-y-idha satt’ upalabbhati","comp":"na-y-idha satto upalabbhati","ref":"S. i 137","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["na-y-idha satto upalabbhati","na-y-idha satt o upalabbhati (§10)","na-y-idha satt upalabbhati (§12)","na-y-idha sattupalabbhati (§11)","na-y-idha satt’ upalabbhati (EM)"],"full":true,"derivada":true},{"f":"catass’ ūmiyo","comp":"catasso ūmiyo","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["catasso ūmiyo","catass o ūmiyo (§10)","catass ūmiyo (§12)","catassūmiyo (§11)","catass’ ūmiyo (EM)"],"full":true,"derivada":true},{"f":"taṃ kut’ ettha labbhā","comp":"taṃ kuto ettha labbhā","ref":"Vin. i 12","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["taṃ kuto ettha labbhā","taṃ kut o ettha labbhā (§10)","taṃ kut ettha labbhā (§12)","taṃ kutettha labbhā (§11)","taṃ kut’ ettha labbhā (EM)"],"full":true,"derivada":true},{"f":"cattār’ oghā savanti te","comp":"cattāro oghā savanti te","ref":"Sad. iii 14","sec":"sara","secName":"SARA-SANDHI","rule":"1","title":"Una vocal que precede a otra vocal se elide","kac":12,"s":["cattāro oghā savanti te","cattār o oghā savanti te (§10)","cattār oghā savanti te (§12)","cattāroghā savanti te (§11)","cattār’ oghā savanti te (EM)"],"full":true,"derivada":true},{"f":"yassa ’dāni","comp":"yassa idāni","ref":"Vin. iii 321","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["yassa idāni","yass a idāni (§10)","yass a dāni (§13)","yassadāni (§11)","yassa ’dāni (EM)"],"full":true,"derivada":true},{"f":"chayā ’va","comp":"chayā iva","ref":"Dhp. 13","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["chayā iva","chay ā iva (§10)","chay ā va (§13)","chayāva (§11)","chayā ’va (EM)"],"full":true,"derivada":true},{"f":"kathā ’va kā","comp":"kathā eva kā","ref":"Vis. i 55","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["kathā eva kā","kathā e va kā (§10)","kathā va kā (§13)","kathāva kā (§11)","kathā ’va kā (EM)"],"full":true,"derivada":true},{"f":"iti ’ssa","comp":"iti assa","ref":"Vin. ii 196","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["iti assa","it i assa (§10)","it i ssa (§13)","itissa (§11)","iti ’ssa (EM)"],"full":true,"kac_seq":16,"verificada":true},{"f":"assamaṇī ’si","comp":"assamaṇī asi","ref":"Vin. i 72","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["assamaṇī asi","assamaṇ ī asi (§10)","assamaṇ ī si (§13)","assamaṇīsi (§11)","assamaṇī ’si (EM)"],"full":true,"derivada":true},{"f":"cakkhundriyaṃ","comp":"cakkhu + indriyaṃ","ref":"D. iii 189","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["cakkhu indriyaṃ","cakkh u indriyaṃ (§10)","cakkh u ndriyaṃ (§13)","cakkhundriyaṃ (§11)"],"full":true,"derivada":true},{"f":"akataññū ’si","comp":"akataññū asi","ref":"Dh. 68","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["akataññū asi","akataññ ū asi (§10)","akataññ ū si (§13)","akataññūsi (§11)","akataññū ’si (EM)"],"full":true,"derivada":true},{"f":"vande ’haṃ","comp":"vande ahaṃ","ref":"NdA. i 1","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["vande ahaṃ","vand e ahaṃ (§10)","vand e haṃ (§13)","vandehaṃ (§11)","vande ’haṃ (EM)"],"full":true,"derivada":true},{"f":"so ’haṃ","comp":"so ahaṃ","ref":"D. i 55","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["so ahaṃ","s o ahaṃ (§10)","s o haṃ (§13)","sohaṃ (§11)","so ’haṃ (EM)"],"full":true,"derivada":true},{"f":"Moggallāno ’si","comp":"Moggallāno āsi","ref":"J. ii 113","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["Moggallāno āsi","Moggallān o āsi (§10)","Moggallān o si (§13)","Moggallānosi (§11)","Moggallāno ’si (EM)"],"full":true,"derivada":true},{"f":"cattāro ’me","comp":"cattāro ime","ref":"D. i 86","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["cattāro ime","cattār o ime (§10)","cattār o me (§13)","cattārome (§11)","cattāro 'me (EM)"],"full":true,"kac_seq":13,"verificada":true},{"f":"pāto ’va","comp":"pāto eva","ref":"J. i 269","sec":"sara","secName":"SARA-SANDHI","rule":"2","title":"Cuando dos vocales contiguas son disímiles, la segunda a veces se elide","kac":13,"s":["pāto eva","pāt o eva (§10)","pāt o va (§13)","pātova (§11)","pāto ’va (EM)"],"full":true,"derivada":true},{"f":"bandhusseva","comp":"bandhussa iva","ref":"Kac. §14","sec":"sara","secName":"SARA-SANDHI","rule":"3","title":"A veces las vocales “i”, “ī” y “u”, “ū”, cuando siguen a una vocal disímil que ha sido elidida, se convierten en “e” y “o” respectivamente","kac":14,"s":["bandhussa iva","bandhuss a iva (§10)","bandhuss iva (§12)","bandhuss eva (§14)","bandhusseva (§11)"],"full":true,"kac_seq":14,"verificada":true},{"f":"upekkhati","comp":"upa + ikkhati","ref":"Bv. 319","sec":"sara","secName":"SARA-SANDHI","rule":"3","title":"A veces las vocales “i”, “ī” y “u”, “ū”, cuando siguen a una vocal disímil que ha sido elidida, se convierten en “e” y “o” respectivamente","kac":14,"s":["upa ikkhati","up a ikkhati (§10)","up ekkhati (§14)","upekkhati (§11)"],"full":true,"derivada":true},{"f":"upeto","comp":"upa + ito","ref":"Vbh. 255","sec":"sara","secName":"SARA-SANDHI","rule":"3","title":"A veces las vocales “i”, “ī” y “u”, “ū”, cuando siguen a una vocal disímil que ha sido elidida, se convierten en “e” y “o” respectivamente","kac":14,"s":["upa ito","up a ito (§10)","up eto (§14)","upeto (§11)"],"full":true,"derivada":true},{"f":"avecca","comp":"ava + icca","ref":"M. iii 296","sec":"sara","secName":"SARA-SANDHI","rule":"3","title":"A veces las vocales “i”, “ī” y “u”, “ū”, cuando siguen a una vocal disímil que ha sido elidida, se convierten en “e” y “o” respectivamente","kac":14,"s":["ava icca","av a icca (§10)","av ecca (§14)","avecca (§11)"],"full":true,"derivada":true},{"f":"jineritaṃ","comp":"jina + īritaṃ","ref":"Rū. §16","sec":"sara","secName":"SARA-SANDHI","rule":"3","title":"A veces las vocales “i”, “ī” y “u”, “ū”, cuando siguen a una vocal disímil que ha sido elidida, se convierten en “e” y “o” respectivamente","kac":14,"s":["jina īritaṃ","jin a īritaṃ (§10)","jin eritaṃ (§14)","jineritaṃ (§11)"],"full":true,"derivada":true},{"f":"nopeti","comp":"na upeti","ref":"Sn. 395","sec":"sara","secName":"SARA-SANDHI","rule":"3","title":"A veces las vocales “i”, “ī” y “u”, “ū”, cuando siguen a una vocal disímil que ha sido elidida, se convierten en “e” y “o” respectivamente","kac":14,"s":["na upeti","n a upeti (§10)","n upeti (§12)","n opeti (§14)","nopeti (§11)","n' opeti (EM)"],"full":true,"kac_seq":14,"verificada":true},{"f":"candodayo","comp":"canda + udayo","ref":"DhA. i 329","sec":"sara","secName":"SARA-SANDHI","rule":"3","title":"A veces las vocales “i”, “ī” y “u”, “ū”, cuando siguen a una vocal disímil que ha sido elidida, se convierten en “e” y “o” respectivamente","kac":14,"s":["canda udayo","cand a udayo (§10)","cand odayo (§14)","candodayo (§11)"],"full":true,"derivada":true},{"f":"yathodake","comp":"yathā udake","ref":"J. i 48","sec":"sara","secName":"SARA-SANDHI","rule":"3","title":"A veces las vocales “i”, “ī” y “u”, “ū”, cuando siguen a una vocal disímil que ha sido elidida, se convierten en “e” y “o” respectivamente","kac":14,"s":["yathā udake","yath ā udake (§10)","yath odake (§14)","yathodake (§11)"],"full":true,"derivada":true},{"f":"tatrāyaṃ","comp":"tatra ayaṃ","ref":"Dh. 67","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["tatra ayaṃ","tatr a ayaṃ (§10)","tatr ayaṃ (§12)","tatr āyaṃ (§15)","tatrāyaṃ (§11)"],"full":true,"derivada":true},{"f":"itarītarena","comp":"itara + itarena","ref":"S. i 399","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["itara itarena","itar a itarena (§10)","itar itarena (§12)","itar ītarena (§15)","itarītarena (§11)"],"full":true,"derivada":true},{"f":"cūbhayaṃ","comp":"ca ubhayaṃ","ref":"Dh. 71","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["ca ubhayaṃ","c a ubhayaṃ (§10)","c ubhayaṃ (§12)","c ūbhayaṃ (§15)","cūbhayaṃ (§11)","cūbhayaṃ (EM)"],"full":true,"kac_seq":15,"verificada":true},{"f":"tadāhaṃ","comp":"tadā ahaṃ","ref":"Ap. ii 261","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["tadā ahaṃ","tad ā ahaṃ (§10)","tad ahaṃ (§12)","tad āhaṃ (§15)","tadāhaṃ (§11)"],"full":true,"derivada":true},{"f":"saddhīdha","comp":"saddhā idha","ref":"S. i 39","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["saddhā idha","saddh ā idha (§10)","saddh idha (§12)","saddh īdha (§15)","saddhīdha (§11)","saddhīdha (EM)"],"full":true,"kac_seq":15,"verificada":true},{"f":"tathūpamaṃ","comp":"tathā + upamaṃ","ref":"Khp. 6","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["tathā upamaṃ","tath ā upamaṃ (§10)","tath upamaṃ (§12)","tath ūpamaṃ (§15)","tathūpamaṃ (§11)"],"full":true,"kac_seq":14,"verificada":true},{"f":"idānāhaṃ","comp":"idāni ahaṃ","ref":"Ap. ii 126","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["idāni ahaṃ","idān i ahaṃ (§10)","idān ahaṃ (§12)","idān āhaṃ (§15)","idānāhaṃ (§11)"],"full":true,"derivada":true},{"f":"gacchāmīti","comp":"gacchāmi iti","ref":"D. ii 232","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["gacchāmi iti","gacchām i iti (§10)","gacchām iti (§12)","gacchām īti (§15)","gacchāmīti (§11)"],"full":true,"derivada":true},{"f":"vūpasamo","comp":"vi + upasamo","ref":"D. ii 129","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["vi upasamo","v i upasamo (§10)","v upasamo (§12)","v ūpasamo (§15)","vūpasamo (§11)"],"full":true,"derivada":true},{"f":"bahūpakāraṃ","comp":"bahu + upakāraṃ","ref":"Iti. 201","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["bahu upakāraṃ","bah u upakāraṃ (§10)","bah upakāraṃ (§12)","bah ūpakāraṃ (§15)","bahūpakāraṃ (§11)"],"full":true,"derivada":true},{"f":"sacāyaṃ","comp":"sace ayaṃ","ref":"D. i 81","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["sace ayaṃ","sac e ayaṃ (§10)","sac ayaṃ (§12)","sac āyaṃ (§15)","sacāyaṃ (§11)"],"full":true,"derivada":true},{"f":"appassutāyaṃ","comp":"appassuto ayaṃ","ref":"Dh. 36","sec":"sara","secName":"SARA-SANDHI","rule":"4","title":"A veces cuando la vocal precedente ha sido elidida, la vocal siguiente se alarga","kac":15,"s":["appassuto ayaṃ","appassut o ayaṃ (§10)","appassut ayaṃ (§12)","appassut āyaṃ (§15)","appassutāyaṃ (§11)","appassut' āyaṃ (EM)"],"full":true,"kac_seq":24,"verificada":true},{"f":"lokassāti","comp":"lokassa iti","ref":"A. ii 276","sec":"sara","secName":"SARA-SANDHI","rule":"5","title":"A veces cuando la vocal siguiente ha sido elidida, la vocal precedente se alarga","kac":16,"s":["lokassa iti","lokass a iti (§10)","lokass a ti (§13)","lokass ā ti (§16)","lokassāti (§11)"],"full":true,"derivada":true},{"f":"vītipatanti","comp":"vi + atipatanti","ref":"Sn. 386","sec":"sara","secName":"SARA-SANDHI","rule":"5","title":"A veces cuando la vocal siguiente ha sido elidida, la vocal precedente se alarga","kac":16,"s":["vi atipatanti","v i atipatanti (§10)","v i tipatanti (§13)","v ī tipatanti (§16)","vītipatanti (§11)"],"full":true,"derivada":true},{"f":"jīvitahetūpi","comp":"jīvitahetu api","ref":"Cp. 403","sec":"sara","secName":"SARA-SANDHI","rule":"5","title":"A veces cuando la vocal siguiente ha sido elidida, la vocal precedente se alarga","kac":16,"s":["jīvitahetu api","jīvitahet u api (§10)","jīvitahet u pi (§13)","jīvitahet ū pi (§16)","jīvitahetūpi (§11)"],"full":true,"derivada":true},{"f":"vijjūva","comp":"vijju iva","ref":"Bv. 357","sec":"sara","secName":"SARA-SANDHI","rule":"5","title":"A veces cuando la vocal siguiente ha sido elidida, la vocal precedente se alarga","kac":16,"s":["vijju iva","vijj u iva (§10)","vijj u va (§13)","vijj ū va (§16)","vijjūva (§11)"],"full":true,"derivada":true},{"f":"myāyaṃ","comp":"me ayaṃ","ref":"Vin. iii 5","sec":"sara","secName":"SARA-SANDHI","rule":"6","title":"A veces cuando una vocal sigue, “e” se convierte en “y”","kac":17,"s":["me ayaṃ","m e ayaṃ (§10)","m y ayaṃ (§17)","m y āyaṃ (§25)","myāyaṃ (§11)","my āyaṃ (EM)"],"full":true,"kac_seq":17,"verificada":true},{"f":"tyāhaṃ","comp":"te ahaṃ","ref":"J. i 2","sec":"sara","secName":"SARA-SANDHI","rule":"6","title":"A veces cuando una vocal sigue, “e” se convierte en “y”","kac":17,"s":["te ahaṃ","t e ahaṃ (§10)","t y ahaṃ (§17)","t y āhaṃ (§25)","tyāhaṃ (§11)","ty āhaṃ (EM)"],"full":true,"kac_seq":17,"verificada":true},{"f":"ty assa","comp":"te assa","ref":"S. i 99","sec":"sara","secName":"SARA-SANDHI","rule":"6","title":"A veces cuando una vocal sigue, “e” se convierte en “y”","kac":17,"s":["te assa","t e assa (§10)","t y assa (§17)","tyassa (§11)","ty assa (EM)"],"full":true,"derivada":true},{"f":"tyāssa","comp":"te assa","ref":"A. i 153","sec":"sara","secName":"SARA-SANDHI","rule":"6","title":"A veces cuando una vocal sigue, “e” se convierte en “y”","kac":17,"s":["te assa","t e assa (§10)","ty assa (§17)","ty āssa (§15)","tyāssa (§11)"],"full":true,"derivada":true},{"f":"pabbatyāhaṃ","comp":"pabbate ahaṃ","ref":"J. ii 182","sec":"sara","secName":"SARA-SANDHI","rule":"6","title":"A veces cuando una vocal sigue, “e” se convierte en “y”","kac":17,"s":["pabbate ahaṃ","pabbat e ahaṃ (§10)","pabbaty ahaṃ (§17)","pabbaty āhaṃ (§15)","pabbatyāhaṃ (§11)"],"full":true,"derivada":true},{"f":"kyassa","comp":"ke assa","ref":"S. i 180","sec":"sara","secName":"SARA-SANDHI","rule":"6","title":"A veces cuando una vocal sigue, “e” se convierte en “y”","kac":17,"s":["ke assa","k e assa (§10)","k y assa (§17)","kyassa (§11)"],"full":true,"derivada":true},{"f":"kyāssa","comp":"ke assa","ref":"Sn. 426","sec":"sara","secName":"SARA-SANDHI","rule":"6","title":"A veces cuando una vocal sigue, “e” se convierte en “y”","kac":17,"s":["ke assa","k e assa (§10)","ky assa (§17)","ky āssa (§15)","kyāssa (§11)"],"full":true,"derivada":true},{"f":"yāvatakv assa kāyo","comp":"yāvatako assa kāyo","ref":"D. ii 15","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["yāvatako assa kāyo","yāvatak o assa kāyo (§10)","yāvatakv assa kāyo (§18)","yāvatakvassa kāyo (§11)","yāvatakv assa kāyo (EM)"],"full":true,"derivada":true},{"f":"kv attho","comp":"ko attho","ref":"Vin. ii 203","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["ko attho","k o attho (§10)","k v attho (§18)","kvattho (§11)","kv attho (EM)"],"full":true,"derivada":true},{"f":"kv idha","comp":"ko idha","ref":"J. ii 48","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["ko idha","k o idha (§10)","k v idha (§18)","kvidha (§11)","kv idha (EM)"],"full":true,"derivada":true},{"f":"khv assa","comp":"kho assa","ref":"D. i 133","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["kho assa","kh o assa (§10)","kh v assa (§18)","khvassa (§11)","khv assa (EM)"],"full":true,"derivada":true},{"f":"khv idha","comp":"kho idha","ref":"Vin. iv 488","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["kho idha","kh o idha (§10)","kh v idha (§18)","khvidha (§11)","khv idha (EM)"],"full":true,"derivada":true},{"f":"yvāyaṃ","comp":"yo ayaṃ","ref":"D. ii 222","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["yo ayaṃ","y o ayaṃ (§10)","yv ayaṃ (§18)","yv āyaṃ (§15)","yvāyaṃ (§11)"],"full":true,"derivada":true},{"f":"yatvādhikaraṇaṃ","comp":"yato adhikaraṇaṃ","ref":"D. i 66","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["yato adhikaraṇaṃ","yat o adhikaraṇaṃ (§10)","yatv adhikaraṇaṃ (§18)","yatv ādhikaraṇaṃ (§15)","yatvādhikaraṇaṃ (§11)"],"full":true,"derivada":true},{"f":"sv assa","comp":"so assa","ref":"A. iii 213","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["so assa","s o assa (§10)","s v assa (§18)","svassa (§11)","sv assa (EM)"],"full":true,"kac_seq":18,"verificada":true},{"f":"sv eva","comp":"so eva","ref":"D. ii 228","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["so eva","s o eva (§10)","s v eva (§18)","sveva (§11)","sv eva (EM)"],"full":true,"derivada":true},{"f":"anv addhamāsaṃ","comp":"anu addhamāsaṃ","ref":"A. i 232","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["anu addhamāsaṃ","an u addhamāsaṃ (§10)","an v addhamāsaṃ (§18)","anvaddhamāsaṃ (§11)","anv addhamāsaṃ (EM)"],"full":true,"derivada":true},{"f":"anveti","comp":"anu + eti","ref":"Dh. 13","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["anu eti","anv eti (§18)","anveti (§11)"],"full":true,"kac_seq":51,"verificada":true},{"f":"svāgataṃ","comp":"su + āgataṃ","ref":"M. ii 308","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["su āgataṃ","s u āgataṃ (§10)","s v āgataṃ (§18)","svāgataṃ (§11)"],"full":true,"derivada":true},{"f":"dvākāro","comp":"du + ākāro","ref":"Ps. 116","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["du ākāro","d u ākāro (§10)","d v ākāro (§18)","dvākāro (§11)"],"full":true,"derivada":true},{"f":"cakkhvāpāthaṃ","comp":"cakkhu + āpāthaṃ","ref":"Rū. §20","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["cakkhu āpāthaṃ","cakkh u āpāthaṃ (§10)","cakkh v āpāthaṃ (§18)","cakkhvāpāthaṃ (§11)"],"full":true,"derivada":true},{"f":"bahvābādho","comp":"bahu + ābādho","ref":"V. iv 215","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["bahu ābādho","bah u ābādho (§10)","bah v ābādho (§18)","bahvābādho (§11)","bahv ābādho (EM)"],"full":true,"kac_seq":18,"verificada":true},{"f":"pātvākāsi","comp":"pātu + akāsi","ref":"M. ii 262","sec":"sara","secName":"SARA-SANDHI","rule":"7","title":"A veces cuando una vocal sigue, “o” y “u” se convierten en “v”","kac":18,"s":["pātu akāsi","pāt u akāsi (§10)","pātv akāsi (§18)","pātv ākāsi (§15)","pātvākāsi (§11)"],"full":true,"derivada":true},{"f":"paṭisanthāravuty assa","comp":"paṭisanthāravutti","ref":"Dh. 67","sec":"sara","secName":"SARA-SANDHI","rule":"8","title":"A veces cuando una vocal sigue, “i”, “ī” se convierten en “y”","kac":21,"s":["paṭisanthāravutti assa","paṭisanthāravutt i assa (§10)","paṭisanthāravutt y assa (§21)","paṭisanthāravut y assa (por “ca” en §41)","paṭisanthāravutyassa (§11)","paṭisanthāravuty assa (EM)"],"full":true,"kac_seq":21,"verificada":true},{"f":"byañjanaṃ","comp":"vi + añjanaṃ","ref":"Vin. ii 252","sec":"sara","secName":"SARA-SANDHI","rule":"8","title":"A veces cuando una vocal sigue, “i”, “ī” se convierten en “y”","kac":21,"s":["vi añjanaṃ","v i añjanaṃ (§10)","v y añjanaṃ (§21)","b y añjanaṃ (por «ca» en §20)","byañjanaṃ (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§21","§11"]},{"f":"nadyāsanno","comp":"nadī + āsanno","ref":"Rū. §21","sec":"sara","secName":"SARA-SANDHI","rule":"8","title":"A veces cuando una vocal sigue, “i”, “ī” se convierten en “y”","kac":21,"s":["nadī āsanno","nad ī āsanno (§10)","nad y āsanno (§21)","nadyāsanno (§11)"],"full":true,"derivada":true},{"f":"icc antaṃ","comp":"iti + antaṃ","ref":"M. iii 55","sec":"sara","secName":"SARA-SANDHI","rule":"9","title":"A veces, cuando una vocal sigue, la sílaba “ti” de “ati”, “pati” y “iti” se convierte en “c” y ésta se duplica","kac":19,"s":["iti antaṃ","it i antaṃ (§10)","i c antaṃ (§19)","i cc antaṃ (§28)","iccantaṃ (§11)","icc antaṃ (EM)"],"full":true,"aforismo":true,"comp_doc":"ati + antaṃ","nota":"Los componentes del documento dicen «ati + antaṃ», pero «ati» da «accantaṃ», como deriva el propio capítulo en §19. «icc antaṃ» exige «iti».","kac_seq_refs":["§10","§19","§28","§11"]},{"f":"paccayo","comp":"pati + ayo","ref":"Vin. i 204","sec":"sara","secName":"SARA-SANDHI","rule":"9","title":"A veces, cuando una vocal sigue, la sílaba “ti” de “ati”, “pati” y “iti” se convierte en “c” y ésta se duplica","kac":19,"s":["pati ayo","pac ayo (§19)","pacc ayo (§28)","paccayo (§11)"],"full":true,"derivada":true},{"f":"icc assa","comp":"iti assa","ref":"Vin. i 265","sec":"sara","secName":"SARA-SANDHI","rule":"9","title":"A veces, cuando una vocal sigue, la sílaba “ti” de “ati”, “pati” y “iti” se convierte en “c” y ésta se duplica","kac":19,"s":["iti assa","ic assa (§19)","icc assa (§28)","iccassa (§11)","icc assa (EM)"],"full":true,"kac_seq":19,"verificada":true},{"f":"abbhuggato","comp":"abhi + uggato","ref":"Vin. i 1","sec":"sara","secName":"SARA-SANDHI","rule":"10","title":"El prefijo “abhi” cuando va seguido por una vocal se substituye por “abbh”","kac":44,"s":["abhi uggato","abbh uggato (§44)","abbhuggato (§11)"],"full":true,"derivada":true},{"f":"abbhokāso","comp":"abhi + okāso","ref":"D. i 59","sec":"sara","secName":"SARA-SANDHI","rule":"10","title":"El prefijo “abhi” cuando va seguido por una vocal se substituye por “abbh”","kac":44,"s":["abhi okāso","abbh okāso (§44)","abbhokāso (§11)"],"full":true,"derivada":true},{"f":"ajjhagamā","comp":"adhi + agamā","ref":"Vin. i 28","sec":"sara","secName":"SARA-SANDHI","rule":"11","title":"El prefijo “adhi” cuando va seguido por una vocal se substituye por “ajjh”","kac":45,"s":["adhi agamā","ajjh agamā (§45)","ajjhagamā (§11)"],"full":true,"derivada":true},{"f":"ajjhupagato","comp":"adhi + upagato","ref":"Vin. i 28","sec":"sara","secName":"SARA-SANDHI","rule":"11","title":"El prefijo “adhi” cuando va seguido por una vocal se substituye por “ajjh”","kac":45,"s":["adhi upagato","ajjh upagato (§45)","ajjhupagato (§11)"],"full":true,"derivada":true},{"f":"ekaṃ idāhaṃ","comp":"ekaṃ idha ahaṃ","ref":"D. i 86","sec":"sara","secName":"SARA-SANDHI","rule":"12","title":"A veces, cuando va seguido por una vocal, la sílaba “dha” de “idha”, se convierte en “da”","kac":20,"s":["ekaṃ idha ahaṃ","ekaṃ idh a ahaṃ (§10)","ekaṃ idh ahaṃ (§12)","ekaṃ ida ahaṃ (§20)","ekaṃ id a ahaṃ (§10)","ekaṃ id ahaṃ (§12)","ekaṃ id āhaṃ (§15)","ekaṃ idāhaṃ (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§20","§10","§12","§15","§11"]},{"f":"yatha-r-iva","comp":"yathā eva","ref":"D. i 85","sec":"sara","secName":"SARA-SANDHI","rule":"13","title":"A veces, después de “yathā” y “tathā”, la “e” de “eva” se convierte en “ri”","kac":22,"s":["yathā eva","yath ā eva (§10)","yath ā riva, yath a riva (§22)","yathariva (§11)","yatha-r-iva (EM)"],"full":true,"kac_seq":22,"verificada":true},{"f":"tatha-r-iva","comp":"tathā eva","ref":"Kac. §22","sec":"sara","secName":"SARA-SANDHI","rule":"13","title":"A veces, después de “yathā” y “tathā”, la “e” de “eva” se convierte en “ri”","kac":22,"s":["tathā eva","tath ā eva (§10)","tath ā riva, tath a riva (§22)","tathariva (§11)","tatha-r-iva (EM)"],"full":true,"kac_seq":22,"verificada":true},{"f":"tiyantaṃ","comp":"ti antaṃ","ref":"Rū. §30","sec":"sara","secName":"SARA-SANDHI","rule":"14","title":"A veces, cuanda una vocal sigue, “i”, “ī” y “u”, “ū”, se convierten en “iya” y “uva” respectivamente","kac":35,"s":["ti antaṃ","ti yantaṃ (§35)","tiyantaṃ (§11)"],"full":true,"derivada":true},{"f":"tiyaddhaṃ","comp":"ti addhaṃ","ref":"Vis. i 194","sec":"sara","secName":"SARA-SANDHI","rule":"14","title":"A veces, cuanda una vocal sigue, “i”, “ī” y “u”, “ū”, se convierten en “iya” y “uva” respectivamente","kac":35,"s":["ti addhaṃ","ti yaddhaṃ (§35)","tiyaddhaṃ (§11)"],"full":true,"derivada":true},{"f":"du-v-aṅgikaṃ","comp":"du + aṅgikaṃ","ref":"Dhs. 46","sec":"sara","secName":"SARA-SANDHI","rule":"14","title":"A veces, cuanda una vocal sigue, “i”, “ī” y “u”, “ū”, se convierten en “iya” y “uva” respectivamente","kac":35,"s":["du aṅgikaṃ","du vaṅgikaṃ (§35)","duvaṅgikaṃ (§11)","du-v-aṅgikaṃ (EM)"],"full":true,"derivada":true},{"f":"bhikkhu-v-āsane","comp":"bhikkhu + āsane","ref":"Rū. §30","sec":"sara","secName":"SARA-SANDHI","rule":"14","title":"A veces, cuanda una vocal sigue, “i”, “ī” y “u”, “ū”, se convierten en “iya” y “uva” respectivamente","kac":35,"s":["bhikkhu āsane","bhikkhu vāsane (§35)","bhikkhuvāsane (§11)","bhikkhu-v-āsane (EM)"],"full":true,"derivada":true},{"f":"yatha-y-idaṃ","comp":"yathā idaṃ","ref":"D. i 85","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["yathā idaṃ","yathā y idaṃ (§35)","yatha y idaṃ (§26)","yathayidaṃ (§11)","yatha-y-idaṃ (EM)"],"full":true,"kac_seq":35,"verificada":true},{"f":"na-y-idaṃ","comp":"na idaṃ","ref":"S. i 382","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["na idaṃ","na y idaṃ (§35)","nayidaṃ (§11)","na-y-idaṃ (EM)"],"full":true,"derivada":true},{"f":"sati-y-eva","comp":"sati eva","ref":"DA. ii 344","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["sati eva","sati y eva (§35)","satiyeva (§11)","sati-y-eva (EM)"],"full":true,"derivada":true},{"f":"so-y-eva","comp":"so eva","ref":"Vis. i 142","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["so eva","so y eva (§35)","soyeva (§11)","so-y-eva (EM)"],"full":true,"derivada":true},{"f":"vi-y-ākāsi","comp":"vi + ākāsi","ref":"Bv. 306","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["vi ākāsi","vi y ākāsi (§35)","viyākāsi (§11)","vi-y-ākāsi (EM)"],"full":true,"derivada":true},{"f":"pari-y-anto","comp":"pari + anto","ref":"Pv. 166","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["pari anto","pari y anto (§35)","pariyanto (§11)","pari-y-anto (EM)"],"full":true,"derivada":true},{"f":"ti-v-aṅgikaṃ","comp":"ti + aṅgikaṃ","ref":"Dhs. 44","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["ti aṅgikaṃ","ti v aṅgikaṃ (§35)","tivaṅgikaṃ (§11)","ti-v-aṅgikaṃ (EM)"],"full":true,"derivada":true},{"f":"pavuccati","comp":"pa + uccati","ref":"S. i 5","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["pa uccati","pa v uccati (§35)","pavuccati (§11)"],"full":true,"derivada":true},{"f":"lahu-m-essati","comp":"lahu essati","ref":"Dh. 66","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["lahu essati","lahu m essati (§35)","lahumessati (§11)","lahu-m-essati (EM)"],"full":true,"derivada":true},{"f":"bhadro kasā-m-iva","comp":"bhadro kasā iva","ref":"Dh. 24","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["bhadro kasā iva","bhadro kasā miva (§35)","bhadro kasāmiva (§11)","bhadro kasā-m-iva (EM)"],"full":true,"derivada":true},{"f":"u-d-aggo","comp":"u + aggo","ref":"Pv. 188","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["u aggo","u d aggo (§35)","udaggo (§11)","u-d-aggo (EM)"],"full":true,"derivada":true},{"f":"saki-d-eva","comp":"saki eva","ref":"M. i 40","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["saki eva","saki d eva (§35)","sakideva (§11)","saki-d-eva (EM)"],"full":true,"derivada":true},{"f":"ito-n-āyati","comp":"ito āyati","ref":"Rū. §34","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["ito āyati","ito n āyati (§35)","itonāyati (§11)","ito-n-āyati (EM)"],"full":true,"derivada":true},{"f":"tasmā-t-iha","comp":"tasmā iha","ref":"M. i 15","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["tasmā iha","tasmā t iha (§35)","tasmātiha (§11)","tasmā-t-iha (EM)"],"full":true,"derivada":true},{"f":"puna-r-eva","comp":"puna eva","ref":"Dh. 62","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["puna eva","puna r eva (§35)","punareva (§11)","puna-r-eva (EM)"],"full":true,"derivada":true},{"f":"du-r-āgataṃ","comp":"du + āgataṃ","ref":"A. ii 144","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["du āgataṃ","du r āgataṃ (§35)","durāgataṃ (§11)","du-r-āgataṃ (EM)"],"full":true,"derivada":true},{"f":"catu-r-aṅgikaṃ","comp":"catu + aṅgikaṃ","ref":"Dhs. 43","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["catu aṅgikaṃ","catu r aṅgikaṃ (§35)","caturaṅgikaṃ (§11)","catu-r-aṅgikaṃ (EM)"],"full":true,"derivada":true},{"f":"cha-ḷ-abhiññā","comp":"cha + abhiññā","ref":"S. i 193","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["cha abhiññā","cha ḷabhiññā (§35)","chaḷabhiññā (§11)","cha-ḷ-abhiññā (EM)"],"full":true,"derivada":true},{"f":"su-h-ujū","comp":"su + ujū","ref":"Khp. 10","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["su ujū","su h ujū (§35)","suhujū (§11)","su-h-ujū (EM)"],"full":true,"derivada":true},{"f":"puthag eva","comp":"putha + eva","ref":"Kac. §42","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["putha eva","putha g eva (§42)","puthageva (§11)","puthag eva (EM)"],"full":true,"kac_seq":42,"verificada":true},{"f":"pag eva","comp":"pā eva","ref":"J. i 111","sec":"sara","secName":"SARA-SANDHI","rule":"15","title":"A veces, cuando una vocal sigue, se inserta alguna de las siguientes consonantes: “y”, “v”, “m”, “d”, “n”, “t”, “r”, “l”, “h”, “g”","kac":35,"s":["pā eva","pā g eva, pa g eva (§43)","pageva (§11)","pag eva (EM)"],"full":true,"kac_seq":43,"verificada":true},{"f":"tyāssa mittā honti","comp":"te assa mittā honti","ref":"D. iii 149","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"1.1","title":"Para facilitar la pronunciación en los discursos","kac":17,"s":["te assa mittā honti","t e assa mittā honti (§10)","ty assa mittā honti (§17)","ty āssa mittā honti (§15)","tyāssa mittā honti (§11)"],"full":true,"derivada":true},{"f":"yvāyaṃ","comp":"yo ayaṃ","ref":"D. ii 222","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"1.1","title":"Para facilitar la pronunciación en los discursos","kac":18,"s":["yo ayaṃ","y o ayaṃ (§10)","yv ayaṃ (§18)","yv āyaṃ (§15)","yvāyaṃ (§11)"],"full":true,"derivada":true},{"f":"madhu vā maññati bālo","comp":"madhu va maññati bālo","ref":"Dh. 23","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"1.2","title":"Por razones métricas","kac":25,"s":["madhu va maññati bālo","madhu v a maññati bālo (§10)","madhu vā maññati bālo (§25)","madhu vāmaññati bālo (§11)","madhu vā maññati bālo (EM)"],"full":true,"derivada":true},{"f":"khantī paramaṃ","comp":"khanti paramaṃ","ref":"Dh. 41","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"1.2","title":"Por razones métricas","kac":25,"s":["khanti paramaṃ","khantī paramaṃ (§25)"],"full":true,"kac_seq":25,"verificada":true},{"f":"bhovādi nāma","comp":"bhovādī nāma","ref":"Dh. 70","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"2.1","title":"Por razones métricas","kac":26,"s":["bhovādī nāma","bhovādi nāma (§26)"],"full":true,"kac_seq":26,"verificada":true},{"f":"puggala dhammadasā","comp":"puggalā dhammadasā","ref":"Vv. 76","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"2.1","title":"Por razones métricas","kac":26,"s":["puggalā dhammadasā","puggala dhammadasā (§26)","puggaladhammadasā (§11)","puggala dhammadasā (EM)"],"full":true,"derivada":true},{"f":"yatha-y-idaṃ","comp":"yathā idaṃ","ref":"D. i 85","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"2.2","title":"Cuando se inserta una consonante","kac":26,"s":["yathā idaṃ","yathā y idaṃ (§35)","yatha y idaṃ (§26)","yathayidaṃ (§11)","yatha-y-idaṃ (EM)"],"full":true,"kac_seq":35,"verificada":true},{"f":"samma-d-akkhāto","comp":"sammā + akkhāto","ref":"D. iii 178","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"2.2","title":"Cuando se inserta una consonante","kac":35,"s":["sammā akkhāto","sammā dakkhāto (§35)","samma dakkhāto (§26)","sammadakkhāto (§11)","samma-d-akkhāto (EM)"],"full":true,"derivada":true},{"f":"parakkamo","comp":"parā + kamo","ref":"Dhs. 19","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"2.3","title":"Cuando se duplica una consonante","kac":26,"s":["parā kamo","par ā kamo (§10)","par a kamo (§26)","para kkamo (§28)","parakkamo (§11)"],"full":true,"kac_seq":51,"verificada":true},{"f":"taṇhakkhayo","comp":"taṇhā + khayo","ref":"Dh. 64","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"2.3","title":"Cuando se duplica una consonante","kac":26,"s":["taṇhā khayo","taṇha khayo (§26)","taṇha kkhayo (§28)","taṇhakkhayo (§11)"],"full":true,"derivada":true},{"f":"esa dhammo","comp":"eso dhammo","ref":"Dh. 14","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"3","title":"A veces, la “o” de “eta” y “ta”, cuando va seguida por una consonante, se elide","kac":27,"s":["eso dhammo","es o dhammo (§10)","es dhammo, es a dhammo (§27)","esa dhammo (§11)"],"full":true,"kac_seq":27,"verificada":true},{"f":"sa sīlavā","comp":"so sīlavā","ref":"Dh. 25","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"3","title":"A veces, la “o” de “eta” y “ta”, cuando va seguida por una consonante, se elide","kac":27,"s":["so sīlavā","s o sīlavā (§10)","s sīlavā, s a sīlavā (§27)","sa sīlavā (§11)"],"full":true,"kac_seq":27,"verificada":true},{"f":"esa attho","comp":"eso attho","ref":"A. ii 50","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"3","title":"A veces, la “o” de “eta” y “ta”, cuando va seguida por una consonante, se elide","kac":27,"s":["eso attho","es o attho (§10)","es attho (§27)","es a attho (§27)","esa attho (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§27","§27","§11"]},{"f":"esa ābhogo","comp":"eso ābhogo","ref":"Vis. i 330","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"3","title":"A veces, la “o” de “eta” y “ta”, cuando va seguida por una consonante, se elide","kac":27,"s":["eso ābhogo","es o ābhogo (§10)","es ābhogo (§27)","es a ābhogo (§27)","esa ābhogo (§11)"],"full":true,"aforismo":true,"nota":"El documento imprime «esa ābhogho»; es errata: la «gh» no está en «eso ābhogo» ni la introduce ninguna regla. Corregido a «esa ābhogo».","kac_seq_refs":["§10","§27","§27","§11"]},{"f":"suppasanno","comp":"su + pasanno","ref":"DhA. i 155","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["su pasanno","su ppasanno (§28)","suppasanno (§11)"],"full":true,"derivada":true},{"f":"suppatiṭṭho","comp":"su + patiṭṭho","ref":"A. ii 324","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["su patiṭṭho","su ppatiṭṭho (§28)","suppatiṭṭho (§11)"],"full":true,"derivada":true},{"f":"suppaṭipanno","comp":"su + paṭipanno","ref":"D. ii 80","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["su paṭipanno","su ppaṭipanno (§28)","suppaṭipanno (§11)"],"full":true,"derivada":true},{"f":"paṭikkamati","comp":"paṭi +√kamu + a + ti","ref":"D. ii 269","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["paṭi kamati","paṭi k kamati (§28)","paṭikkamati (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§28","§11"]},{"f":"akkamati","comp":"ā +√kamu + a + ti","ref":"J. ii 121","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["ā kamati","ā k kamati (§28)","a k kamati (§26)","akkamati (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§28","§26","§11"]},{"f":"kusalattikaṃ","comp":"kusala + tikaṃ","ref":"DhsA. 79","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["kusala tikaṃ","kusala ttikaṃ (§28)","kusalattikaṃ (§11)"],"full":true,"derivada":true},{"f":"ratanattayaṃ","comp":"ratana + tayaṃ","ref":"KhpA. 6","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["ratana tayaṃ","ratana ttayaṃ (§28)","ratanattayaṃ (§11)"],"full":true,"derivada":true},{"f":"ekattiṃsa","comp":"eka + tiṃsa","ref":"VinA. iv 114","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["eka tiṃsa","eka ttiṃsa (§28)","ekattiṃsa (§11)"],"full":true,"derivada":true},{"f":"dukkaraṃ","comp":"du + karaṃ","ref":"D. iii 29","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["du karaṃ","du kkaraṃ (§28)","dukkaraṃ (§11)"],"full":true,"derivada":true},{"f":"suyyati","comp":"√su + ya + ti","ref":"Sn. 452","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["su yati","su y yati (§28)","suyyati (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§28","§11"]},{"f":"jaccandho","comp":"jāti + andho","ref":"D. ii 262","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"4","title":"A veces, después de una vocal, la consonante siguiente se duplica","kac":28,"s":["jāti andho","jāt i andho (§10)","jāt y andho (§21)","jā c andho (§269)","jā cc andho (§28)","ja cc andho (§26)","jaccandho (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§21","§269","§28","§26","§11"]},{"f":"jaccandho","comp":"jāti + andho","ref":"D. ii 262","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"5","title":"A veces, las consonantes conjuntas “ty”, “ly”, “ny”, “dy” se convierten en “c”, “l”, “ñ”, “j” respectivamente y después éstas se duplican","kac":269,"s":["jāti andho","jāt i andho (§10)","jāt y andho (§21)","jā c andho (§269)","jā cc andho (§28)","ja cc andho (§26)","jaccandho (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§21","§269","§28","§26","§11"]},{"f":"vipallāso","comp":"vipali + āso","ref":"Pe. 182","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"5","title":"A veces, las consonantes conjuntas “ty”, “ly”, “ny”, “dy” se convierten en “c”, “l”, “ñ”, “j” respectivamente y después éstas se duplican","kac":12,"s":["vipali āso","vipal i āso (§10)","vipal āso (§12)","vipall āso (§28)","vipallāso (§11)"],"full":true,"derivada":true},{"f":"aññāyo","comp":"ani + āyo","ref":"Rū. § 41","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"5","title":"A veces, las consonantes conjuntas “ty”, “ly”, “ny”, “dy” se convierten en “c”, “l”, “ñ”, “j” respectivamente y después éstas se duplican","kac":269,"s":["ani āyo","an i āyo (§10)","an y āyo (§21)","a ñ āyo (§269)","a ññ āyo (§28)","aññāyo (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§21","§269","§28","§11"]},{"f":"yajjevaṃ","comp":"yadi + evaṃ","ref":"Rū. §41","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"5","title":"A veces, las consonantes conjuntas “ty”, “ly”, “ny”, “dy” se convierten en “c”, “l”, “ñ”, “j” respectivamente y después éstas se duplican","kac":269,"s":["yadi evaṃ","yad i evaṃ (§10)","yad y evaṃ (§21)","ya j evaṃ (§269)","ya jj evaṃ (§28)","yajjevaṃ (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§21","§269","§28","§11"]},{"f":"appekacce","comp":"api + ekacce","ref":"D. ii 33","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"5","title":"A veces, las consonantes conjuntas “ty”, “ly”, “ny”, “dy” se convierten en “c”, “l”, “ñ”, “j” respectivamente y después éstas se duplican","kac":12,"s":["api ekacce","ap i ekacce (§10)","ap ekacce (§12)","app ekacce (§28)","appekacce (§11)"],"full":true,"derivada":true},{"f":"nigghoso","comp":"ni + ghoso","ref":"S. 191","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"6","title":"A veces, después de una vocal, la segunda y cuarta consonante de las agrupadas se duplican en la primera y tercera de las agrupadas respectivamente","kac":35,"s":["ni ghoso","ni gghoso (§35)","nigghoso (§11)"],"full":true,"derivada":true},{"f":"paṭhamajjhānaṃ","comp":"paṭhama + jhānaṃ","ref":"T. ii 431","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"6","title":"A veces, después de una vocal, la segunda y cuarta consonante de las agrupadas se duplican en la primera y tercera de las agrupadas respectivamente","kac":28,"s":["paṭhama jhānaṃ","paṭhama jjhānaṃ (§28)","paṭhamajjhānaṃ (§11)"],"full":true,"derivada":true},{"f":"uddhāro","comp":"u + dhāro","ref":"Vin. ii 377","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"6","title":"A veces, después de una vocal, la segunda y cuarta consonante de las agrupadas se duplican en la primera y tercera de las agrupadas respectivamente","kac":35,"s":["u dhāro","u ddhāro (§35)","uddhāro (§11)"],"full":true,"derivada":true},{"f":"bojjhaṅgo","comp":"bodhi + aṅgo","ref":"S. iii 283","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"6","title":"A veces, después de una vocal, la segunda y cuarta consonante de las agrupadas se duplican en la primera y tercera de las agrupadas respectivamente","kac":29,"s":["bodhi aṅgo","bodh i aṅgo (§10)","bodh y aṅgo (§21)","bo jh aṅgo (§269)","bo jjh aṅgo (§29)","bojjhaṅgo (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§21","§269","§29","§11"]},{"f":"pañcakkhandhā","comp":"pañca + khandhā","ref":"S. ii 22","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"6","title":"A veces, después de una vocal, la segunda y cuarta consonante de las agrupadas se duplican en la primera y tercera de las agrupadas respectivamente","kac":28,"s":["pañca khandhā","pañca kkhandhā (§28)","pañcakkhandhā (§11)"],"full":true,"derivada":true},{"f":"nipphalaṃ","comp":"ni + phalaṃ","ref":"J. ii 261","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"6","title":"A veces, después de una vocal, la segunda y cuarta consonante de las agrupadas se duplican en la primera y tercera de las agrupadas respectivamente","kac":28,"s":["ni phalaṃ","ni pphalaṃ (§28)","nipphalaṃ (§11)"],"full":true,"derivada":true},{"f":"taṇhākkhayo","comp":"taṇhā + khayo","ref":"D. ii 31","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"6","title":"A veces, después de una vocal, la segunda y cuarta consonante de las agrupadas se duplican en la primera y tercera de las agrupadas respectivamente","kac":28,"s":["taṇhā khayo","taṇhā kkhayo (§28)","taṇhākkhayo (§11)"],"full":true,"derivada":true},{"f":"nicchayo","comp":"ni + chayo","ref":"Ap. ii 164","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"6","title":"A veces, después de una vocal, la segunda y cuarta consonante de las agrupadas se duplican en la primera y tercera de las agrupadas respectivamente","kac":29,"s":["ni chayo","ni c chayo (§29)","nicchayo (§11)"],"full":true,"aforismo":true,"comp_doc":"ni + cayo","nota":"Los componentes del documento dicen «ni + cayo»; con «c» sola §29 daría «niccayo». La forma atestiguada exige «chayo» (ni + √chi).","kac_seq_refs":["§29","§11"]},{"f":"paṭihaññati","comp":"pati + haññati","ref":"M. iii 222","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"7","title":"A veces el prefijo “pati” cuando va seguido por una vocal o una consonante, se convierte en “paṭi”","kac":48,"s":["pati haññati","paṭi haññati (§48)","paṭihaññati (§11)"],"full":true,"kac_seq":48,"verificada":true},{"f":"paṭaggi","comp":"pati + aggi","ref":"Vin. iv 288","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"7","title":"A veces el prefijo “pati” cuando va seguido por una vocal o una consonante, se convierte en “paṭi”","kac":48,"s":["pati aggi","pat i aggi (§10)","pat aggi (§12)","paṭ aggi (§48)","paṭaggi (§11)"],"full":true,"kac_seq":48,"verificada":true},{"f":"puthujjano","comp":"putha + jano","ref":"D. ii 197","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"8","title":"Cuando va seguida por una consonante, la vocal final de “putha” se convierte en “u”","kac":49,"s":["putha jano","puth a jano (§10)","puth u jano (§49)","puth u jjano (§28)","puthujjano (§11)"],"full":true,"kac_seq":49,"verificada":true},{"f":"puthubhūtaṃ","comp":"putha + bhūtaṃ","ref":"S. i 329","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"8","title":"Cuando va seguida por una consonante, la vocal final de “putha” se convierte en “u”","kac":49,"s":["putha bhūtaṃ","puth a bhūtaṃ (§10)","puth u bhūtaṃ (§49)","puthubhūtaṃ (§11)"],"full":true,"kac_seq":49,"verificada":true},{"f":"okāso","comp":"ava + kāso","ref":"A. i 251","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"9","title":"A veces, cuando va seguido por una consonante, el prefijo “ava” se convierte en “o”","kac":50,"s":["ava kāso","o kāso (§50)","okāso (§11)"],"full":true,"derivada":true},{"f":"ovadati","comp":"ava + vadati","ref":"M. ii 236","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"9","title":"A veces, cuando va seguido por una consonante, el prefijo “ava” se convierte en “o”","kac":50,"s":["ava vadati","o vadati (§50)","ovadati (§11)"],"full":true,"derivada":true},{"f":"uggate","comp":"ava + gate","ref":"Cp. 413","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"10","title":"En algunos casos, cuando va seguida por una consonante, la letra “o”, la substitución del prefijo “ava”, se convierte en “u”","kac":79,"s":["ava gate","o gate (§50)","u gate (§79)","u g gate (§28)","uggate (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§50","§79","§28","§11"]},{"f":"parosahassaṃ","comp":"para + sahassaṃ","ref":"D. i 84","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"11","title":"A veces, cuando una consonante sigue, hay insersión de la letra “o”","kac":36,"s":["para sahassaṃ","par a sahassaṃ (§10)","par sahassaṃ (§12)","par o sahassaṃ (§36)","parosahassaṃ (§11)"],"full":true,"kac_seq":36,"verificada":true},{"f":"manomayaṃ","comp":"mana + mayaṃ","ref":"D. i 73","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"12","title":"Cuando hay elisión de la inflexión nominal, la vocal final del grupo de “mana” se convierte en “o”","kac":183,"s":["mana mayaṃ","man a mayaṃ (§10)","man o mayaṃ (§183)","manomayaṃ (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§183","§11"]},{"f":"tamonudo","comp":"tama + nudo","ref":"Sn. 450","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"12","title":"Cuando hay elisión de la inflexión nominal, la vocal final del grupo de “mana” se convierte en “o”","kac":183,"s":["tama nudo","tam a nudo (§10)","tam o nudo (§183)","tamonudo (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§183","§11"]},{"f":"rahogato","comp":"raha + gato","ref":"M. ii 307","sec":"byanjana","secName":"BYAÑJANA-SANDHI","rule":"12","title":"Cuando hay elisión de la inflexión nominal, la vocal final del grupo de “mana” se convierte en “o”","kac":183,"s":["raha gato","rah a gato (§10)","rah o gato (§183)","rahogato (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§10","§183","§11"]},{"f":"saṅgaho","comp":"saṃ + gaho","ref":"M. i 248","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"1","title":"A veces, cuando va seguida por una consonante agrupada, la “niggahīta” se convierte en en la última consonante del grupo","kac":31,"s":["saṃ gaho","saṅ gaho (§31)","saṅgaho (§11)"],"full":true,"derivada":true},{"f":"dhammañ ca","comp":"dhammaṃ ca","ref":"D. ii 36","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"1","title":"A veces, cuando va seguida por una consonante agrupada, la “niggahīta” se convierte en en la última consonante del grupo","kac":31,"s":["dhammaṃ ca","dhammañ ca (§31)","dhammañca (§11)","dhammañ ca (EM)"],"full":true,"derivada":true},{"f":"taṇ ṭhānaṃ","comp":"taṃ + ṭhānaṃ","ref":"Vbh. 344","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"1","title":"A veces, cuando va seguida por una consonante agrupada, la “niggahīta” se convierte en en la última consonante del grupo","kac":31,"s":["taṃ ṭhānaṃ","taṇ ṭhānaṃ (§31)","taṇṭhānaṃ (§11)","taṇ ṭhānaṃ (EM)"],"full":true,"derivada":true},{"f":"tannissitaṃ","comp":"taṃ + nissitaṃ","ref":"M. iii 51","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"1","title":"A veces, cuando va seguida por una consonante agrupada, la “niggahīta” se convierte en en la última consonante del grupo","kac":31,"s":["taṃ nissitaṃ","tan nissitaṃ (§31)","tannissitaṃ (§11)"],"full":true,"derivada":true},{"f":"sambhūto","comp":"saṃ + bhūto","ref":"A. ii 432","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"1","title":"A veces, cuando va seguida por una consonante agrupada, la “niggahīta” se convierte en en la última consonante del grupo","kac":31,"s":["saṃ bhūto","sam bhūto (§31)","sambhūto (§11)"],"full":true,"derivada":true},{"f":"sallakkhaṇā","comp":"saṃ + lakkhaṇā","ref":"Dhs. 19","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"2","title":"A veces, cuando la consonante “l” sigue, la “niggahīta” del prefijo “saṃ” y del final de “puma” se convierte en “l”","kac":31,"s":["saṃ lakkhaṇā","sal lakkhaṇā (§31)","sallakkhaṇā (§11)"],"full":true,"derivada":true},{"f":"sallekho","comp":"saṃ + lekho","ref":"M. i 50","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"2","title":"A veces, cuando la consonante “l” sigue, la “niggahīta” del prefijo “saṃ” y del final de “puma” se convierte en “l”","kac":31,"s":["saṃ lekho","sal lekho (§31)","sallekho (§11)"],"full":true,"derivada":true},{"f":"pulliṅgaṃ","comp":"puṃ + liṅgaṃ","ref":"PsA. ii 57","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"2","title":"A veces, cuando la consonante “l” sigue, la “niggahīta” del prefijo “saṃ” y del final de “puma” se convierte en “l”","kac":31,"s":["puṃ liṅgaṃ","pul liṅgaṃ (§31)","pulliṅgaṃ (§11)"],"full":true,"derivada":true},{"f":"paccattañ ñeva","comp":"paccattaṃ eva","ref":"D. ii 58","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"3","title":"A veces, cuando “eva” y “hi” siguen, la “niggahīta” se convierte en “ñ”; y ésta se duplica cuando va seguida por “eva”","kac":32,"s":["paccattaṃ eva","paccatañ eva (§32)","paccataññ eva (§28)","paccattaññeva (§11)","paccattañ ñeva (EM)"],"full":true,"kac_seq":32,"verificada":true},{"f":"tañ ñeva","comp":"taṃ eva","ref":"Vin. i 345","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"3","title":"A veces, cuando “eva” y “hi” siguen, la “niggahīta” se convierte en “ñ”; y ésta se duplica cuando va seguida por “eva”","kac":32,"s":["taṃ eva","tañ eva (§32)","taññ eva (§28)","taññeva (§11)","tañ ñeva (EM)"],"full":true,"derivada":true},{"f":"tañ hi","comp":"taṃ hi","ref":"D. i 84","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"3","title":"A veces, cuando “eva” y “hi” siguen, la “niggahīta” se convierte en “ñ”; y ésta se duplica cuando va seguida por “eva”","kac":32,"s":["* taṃ hi","tañ hi (§32)","tañhi (§11)","tañ hi (EM)"],"full":true,"kac_seq":32,"verificada":true},{"f":"evañ hi","comp":"evaṃ hi","ref":"M. ii 78","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"3","title":"A veces, cuando “eva” y “hi” siguen, la “niggahīta” se convierte en “ñ”; y ésta se duplica cuando va seguida por “eva”","kac":32,"s":["evaṃ hi","evañ hi (§32)","evañhi (§11)","evañ hi (EM)"],"full":true,"kac_seq":32,"verificada":true},{"f":"saññogo","comp":"saṃ + yogo","ref":"Ps. 135","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"4","title":"A veces, cuando “y” sigue, la “niggahīta” junto con “y” se convierte en “ñ”; y ésta se duplica","kac":33,"s":["saṃ yogo","sañ ñogo (§33)","saññogo (§11)","saññogo (EM)"],"full":true,"kac_seq":33,"verificada":true},{"f":"saññato","comp":"saṃ + yato","ref":"A. i 331","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"4","title":"A veces, cuando “y” sigue, la “niggahīta” junto con “y” se convierte en “ñ”; y ésta se duplica","kac":33,"s":["saṃ yato","sañ ñato (§33)","saññato (§11)"],"full":true,"derivada":true},{"f":"saññojanaṃ","comp":"saṃ + yojanaṃ","ref":"Pṭn. iv 370","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"4","title":"A veces, cuando “y” sigue, la “niggahīta” junto con “y” se convierte en “ñ”; y ésta se duplica","kac":33,"s":["saṃ yojanaṃ","sañ ñojanaṃ (§33)","saññojanaṃ (§11)"],"full":true,"derivada":true},{"f":"yañ ñad eva","comp":"yaṃ yad eva","ref":"D. ii 72","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"4","title":"A veces, cuando “y” sigue, la “niggahīta” junto con “y” se convierte en “ñ”; y ésta se duplica","kac":33,"s":["yaṃ yad eva","yañ ñad eva (§33)","yaññad eva (§11)","yañ ñad eva (EM)"],"full":true,"derivada":true},{"f":"tam ahaṃ","comp":"taṃ ahaṃ","ref":"D. ii 196","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"5","title":"A veces, cuando una vocal sigue, la “niggahīta” se convierte en “m” y “d”","kac":34,"s":["taṃ ahaṃ","tam ahaṃ (§34)","tamahaṃ (§11)","tam ahaṃ (EM)"],"full":true,"kac_seq":34,"verificada":true},{"f":"yam āhu","comp":"yaṃ āhu","ref":"Sn. 413","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"5","title":"A veces, cuando una vocal sigue, la “niggahīta” se convierte en “m” y “d”","kac":34,"s":["yaṃ āhu","yam āhu (§34)","yamāhu (§11)","yam āhu (EM)"],"full":true,"derivada":true},{"f":"dhanam eva","comp":"dhanaṃ eva","ref":"Pv. 158","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"5","title":"A veces, cuando una vocal sigue, la “niggahīta” se convierte en “m” y “d”","kac":34,"s":["dhanaṃ eva","dhanam eva (§34)","dhanameva (§11)","dhanam eva (EM)"],"full":true,"derivada":true},{"f":"yad aniccaṃ","comp":"yaṃ aniccaṃ","ref":"S. ii 19","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"5","title":"A veces, cuando una vocal sigue, la “niggahīta” se convierte en “m” y “d”","kac":34,"s":["yaṃ aniccaṃ","yad aniccaṃ (§34)","yadaniccaṃ (§11)","yad aniccaṃ (EM)"],"full":true,"derivada":true},{"f":"tad anattā","comp":"taṃ anattā","ref":"S. ii 19","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"5","title":"A veces, cuando una vocal sigue, la “niggahīta” se convierte en “m” y “d”","kac":34,"s":["taṃ anattā","tad anattā (§34)","tadanattā (§11)","tad anattā (EM)"],"full":true,"derivada":true},{"f":"etad avoca","comp":"etaṃ avoca","ref":"D. ii 2","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"5","title":"A veces, cuando una vocal sigue, la “niggahīta” se convierte en “m” y “d”","kac":34,"s":["etaṃ avoca","etad avoca (§34)","etadavoca (§11)","etad avoca (EM)"],"full":true,"kac_seq":34,"verificada":true},{"f":"tāsāhaṃ","comp":"tāsaṃ ahaṃ","ref":"A. i 526","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"6","title":"A veces, cuando una vocal sigue, la “niggahīta” se elide","kac":38,"s":["tāsaṃ ahaṃ","tāsa ahaṃ (§38)","tās a ahaṃ (§10)","tās ahaṃ (§12)","tās āhaṃ (§15)","tāsāhaṃ (§11)"],"full":true,"kac_seq":38,"verificada":true},{"f":"evāhaṃ","comp":"evaṃ ahaṃ","ref":"Bv. 308","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"6","title":"A veces, cuando una vocal sigue, la “niggahīta” se elide","kac":38,"s":["evaṃ ahaṃ","eva ahaṃ (§38)","ev a ahaṃ (§10)","ev ahaṃ (§12)","ev āhaṃ (§15)","evāhaṃ (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§38","§10","§12","§15","§11"]},{"f":"kyāhaṃ","comp":"kiṃ ahaṃ","ref":"Vin. I 196","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"6","title":"A veces, cuando una vocal sigue, la “niggahīta” se elide","kac":38,"s":["kiṃ ahaṃ","ki ahaṃ (§38)","k i ahaṃ (§10)","k y ahaṃ (§21)","k y āhaṃ (§15)","kyāhaṃ (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§38","§10","§21","§15","§11"]},{"f":"ariyasaccāna’ dassanaṃ","comp":"ariyasaccānaṃ dassanaṃ","ref":"Khp. 4","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"7","title":"A veces, cuando una consonante sigue, la “niggahīta” se elide","kac":39,"s":["ariyasaccānaṃ dassanaṃ","ariyasaccāna dassanaṃ (§39)","ariyasaccānadassanaṃ (§11)","ariyasaccāna’ dassanaṃ (EM)"],"full":true,"kac_seq":39,"verificada":true},{"f":"buddhāna’ sāsanaṃ","comp":"buddhānaṃ sāsanaṃ","ref":"Dh. 41","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"7","title":"A veces, cuando una consonante sigue, la “niggahīta” se elide","kac":39,"s":["buddhānaṃ sāsanaṃ","buddhāna sāsanaṃ (§39)","buddhānasāsanaṃ (§11)","buddhāna’ sāsanaṃ (EM)"],"full":true,"kac_seq":39,"verificada":true},{"f":"sāratto","comp":"saṃ + ratto","ref":"M. ii 47","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"7","title":"A veces, cuando una consonante sigue, la “niggahīta” se elide","kac":39,"s":["saṃ ratto","sa ratto (§39)","sā ratto (§25)","sāratto (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§39","§25","§11"]},{"f":"sārāgo","comp":"saṃ + rāgo","ref":"M. iii 289","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"7","title":"A veces, cuando una consonante sigue, la “niggahīta” se elide","kac":39,"s":["saṃ rāgo","sa rāgo (§39)","sā rāgo (§25)","sārāgo (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§39","§25","§11"]},{"f":"katan ti","comp":"kataṃ iti","ref":"A. i 51","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"8","title":"A veces, la vocal después de la “niggahīta” se elide y la “niggahīta” se convierte en la consonante final del grupo correspondiente","kac":40,"s":["kataṃ iti","kataṃ ti (§40)","katan ti (§31)","katanti (§11)","katan ti (EM)"],"full":true,"aforismo":true,"kac_seq_refs":["§40","§31","§11"]},{"f":"idam pi","comp":"idaṃ api","ref":"D. ii 31","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"8","title":"A veces, la vocal después de la “niggahīta” se elide y la “niggahīta” se convierte en la consonante final del grupo correspondiente","kac":40,"s":["idaṃ api","idaṃ pi (§40)","idam pi (§31)","idampi (§11)","idam pi (EM)"],"full":true,"aforismo":true,"kac_seq_refs":["§40","§31","§11"]},{"f":"tvaṃ ’si","comp":"tvaṃ asi","ref":"Vv. 115","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"8","title":"A veces, la vocal después de la “niggahīta” se elide y la “niggahīta” se convierte en la consonante final del grupo correspondiente","kac":13,"s":["tvaṃ asi","tvaṃ a si (§10)","tvaṃ si (§13)","tvaṃsi (§11)","tvaṃ ’si (EM)"],"full":true,"derivada":true},{"f":"evaṃ ’sa","comp":"evaṃ assa","ref":"M. i 13","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"9","title":"A veces, cuando la vocal siguiente a la “niggahīta” se elide, si la consonante siguiente es conjunta, ésta se convierte en no-conjunta","kac":41,"s":["evaṃ assa","evaṃ ssa (§40)","evaṃ sa (§41)","evaṃsa (§11)","evaṃ ’sa (EM)"],"full":true,"kac_seq":41,"verificada":true},{"f":"pupphaṃ ’sā","comp":"pupphaṃ assā","ref":"Vin. i 21","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"9","title":"A veces, cuando la vocal siguiente a la “niggahīta” se elide, si la consonante siguiente es conjunta, ésta se convierte en no-conjunta","kac":41,"s":["pupphaṃ assā","pupphaṃ ssā (§40)","pupphaṃ sā (§41)","pupphaṃsā (§11)","pupphaṃ ’sā (EM)"],"full":true,"kac_seq":41,"verificada":true},{"f":"cakkhuṃ udapādi","comp":"cakkhu udapādi","ref":"D. ii 28","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"10","title":"A veces, cuando una vocal o una consonante sigue, se inserta la “niggahīta”","kac":37,"s":["cakkhu udapādi","cakkhu ṃ udapādi (§37)","cakkhuṃ udapādi (§11)"],"full":true,"kac_seq":37,"verificada":true},{"f":"avaṃsiro","comp":"ava + siro","ref":"J. i 10","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"10","title":"A veces, cuando una vocal o una consonante sigue, se inserta la “niggahīta”","kac":37,"s":["ava siro","ava ṃ siro (§37)","avaṃsiro (§11)"],"full":true,"kac_seq":37,"verificada":true},{"f":"aṇuṃthūlāni","comp":"aṇu + thūlāni","ref":"Dh. 51","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"10","title":"A veces, cuando una vocal o una consonante sigue, se inserta la “niggahīta”","kac":37,"s":["aṇu thūlāni","aṇu ṃ thūlāni (§37)","aṇuṃthūlāni (§11)"],"full":true,"kac_seq":37,"verificada":true},{"f":"yāvañ c’ idaṃ","comp":"yāva ca idaṃ","ref":"S. ii 77","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"10","title":"A veces, cuando una vocal o una consonante sigue, se inserta la “niggahīta”","kac":37,"s":["yāva ca idaṃ","yāvaṃ ca idaṃ (§37)","yāvañ ca idaṃ (§31)","yāvañ c a idaṃ (§10)","yāvañ c idaṃ (§12)","yāvañ cidaṃ (§11)","yāvañ c’ idaṃ (EM)"],"full":true,"aforismo":true,"kac_seq_refs":["§37","§31","§10","§12","§11"]},{"f":"payirudāhāsi","comp":"pariyudāhāsi","ref":"D. ii 179","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"11","title":"A veces hay transposición de las letras “r”, “h”, “n”","kac":51,"s":["pariyudāhāsi","payirudāhāsi (§51)"],"full":true,"aforismo":true,"kac_seq_refs":["§51"]},{"f":"bavhābādho","comp":"bahvābādho","ref":"S. i 91","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"11","title":"A veces hay transposición de las letras “r”, “h”, “n”","kac":51,"s":["bahu ābādho","bah u ābādho (§10)","bah v ābādho (§18)","bahvābādho (§11)","bavhābādho (§51)"],"full":true,"kac_seq":18,"verificada":true,"nota":"La regla es la transposición de «r», «h», «n»; el paso final traspone la «h» y la «v», que es justamente lo que ilustra."},{"f":"anabhineyya","comp":"na + abhineyya","ref":"Vin. i 224","sec":"niggahita","secName":"NIGGAHITA-SANDHI","rule":"11","title":"A veces hay transposición de las letras “r”, “h”, “n”","kac":51,"s":["na abhineyya","an abhineyya (§51)","anabhineyya (§11)"],"full":true,"aforismo":true,"kac_seq_refs":["§51","§11"]},{"f":"bhikkhave evaṃ vadāmi","comp":"bhikkhave evaṃ vadāmi","ref":"S. i 221","sec":"pakati","secName":"PAKATI-SANDHI","rule":"1.1","title":"Voces en vocativo cuando no están seguidas por “iti”","kac":24,"s":["bhikkhave evaṃ vadāmi (§24)"],"full":true,"aforismo":true},{"f":"Sāriputta idha","comp":"Sāriputta idha","ref":"Vin. i 10","sec":"pakati","secName":"PAKATI-SANDHI","rule":"1.1","title":"Voces en vocativo cuando no están seguidas por “iti”","kac":24,"s":["Sāriputta idha (§24)"],"full":true,"aforismo":true},{"f":"āyasmā Ānando","comp":"āyasmā Ānando","ref":"D. i 43","sec":"pakati","secName":"PAKATI-SANDHI","rule":"1.2","title":"Cuando no hay un compuesto, la voces que terminan en vocales largas","kac":24,"s":["āyasmā Ānando (§24)"],"full":true,"aforismo":true},{"f":"eko ekāya","comp":"eko ekāya","ref":"Vin. i 286","sec":"pakati","secName":"PAKATI-SANDHI","rule":"1.2","title":"Cuando no hay un compuesto, la voces que terminan en vocales largas","kac":24,"s":["eko ekāya (§24)"],"full":true,"aforismo":true},{"f":"no abhikkamo","comp":"no abhikkamo","ref":"S. iii 71","sec":"pakati","secName":"PAKATI-SANDHI","rule":"1.2","title":"Cuando no hay un compuesto, la voces que terminan en vocales largas","kac":24,"s":["no abhikkamo (§24)"],"full":true,"aforismo":true},{"f":"gāthāhi ajjhabhāsi","comp":"gāthāhi ajjhabhāsi","ref":"Sn. 335","sec":"pakati","secName":"PAKATI-SANDHI","rule":"1.3","title":"Las vocales “i” y “u” que pertenecen a nombres y están seguidas por verbos en el tiempo pasado","kac":24,"s":["gāthāhi ajjhabhāsi (§24)"],"full":true,"aforismo":true},{"f":"satthu adāsi","comp":"satthu adāsi","ref":"ApA. I 285","sec":"pakati","secName":"PAKATI-SANDHI","rule":"1.3","title":"Las vocales “i” y “u” que pertenecen a nombres y están seguidas por verbos en el tiempo pasado","kac":24,"s":["satthu adāsi (§24)"],"full":true,"aforismo":true},{"f":"Manopubbaṅgamā dhammā","comp":"Manopubbaṅgamā dhammā","ref":"Dh. 13","sec":"pakati","secName":"PAKATI-SANDHI","rule":"2","title":"A veces, la vocal que precede, cuando va seguida por una consonante, permanece sin cambios","kac":23,"s":["Manopubbaṅgamā dhammā (§23)"],"full":true,"aforismo":true,"sin_cambio":true,"nota":"Ejemplo del propio aforismo §23 en el Sandhi-kappa: la vocal larga persiste sin más, porque le sigue una consonante."},{"f":"pamādo maccuno padaṃ","comp":"pamādo maccuno padaṃ","ref":"Dh. 16","sec":"pakati","secName":"PAKATI-SANDHI","rule":"2","title":"A veces, la vocal que precede, cuando va seguida por una consonante, permanece sin cambios","kac":23,"s":["pamādo maccuno padaṃ (§23)"],"full":true,"aforismo":true,"sin_cambio":true,"nota":"Ejemplo del propio aforismo §23 en el Sandhi-kappa: la vocal larga persiste sin más, porque le sigue una consonante."},{"f":"tiṇṇo pāraṅgato ahu","comp":"tiṇṇo pāraṅgato ahu","ref":"Dh. 72","sec":"pakati","secName":"PAKATI-SANDHI","rule":"2","title":"A veces, la vocal que precede, cuando va seguida por una consonante, permanece sin cambios","kac":23,"s":["tiṇṇo pāraṅgato ahu (§23)"],"full":true,"aforismo":true,"sin_cambio":true,"nota":"Ejemplo del propio aforismo §23 en el Sandhi-kappa: la vocal larga persiste sin más, porque le sigue una consonante."},{"f":"bhadro kasā-m-iva","comp":"bhadro kasā iva","ref":"Dh. 24","sec":"pakati","secName":"PAKATI-SANDHI","rule":"2","title":"A veces, la vocal que precede, cuando va seguida por una consonante, permanece sin cambios","kac":23,"s":["bhadro kasā iva (§23)","bhadro kasā miva (§35)","bhadro kasāmiva (§11)","bhadro kasā-m-iva (EM)"],"full":true,"derivada":true,"sin_cambio":true,"nota":"Ejemplo de Nandisena. Ilustra §23 de forma indirecta: la ‘ā’ de «kasā» sólo queda ante consonante después de que §35 inserte la ‘m’."},{"f":"vedanākkhandho","comp":"vedanā + khandho","ref":"D. iii 195","sec":"pakati","secName":"PAKATI-SANDHI","rule":"2","title":"A veces, la vocal que precede, cuando va seguida por una consonante, permanece sin cambios","kac":23,"s":["vedanā khandho (§23)","vedanā kkhandho (§28)","vedanākkhandho (§11)"],"full":true,"derivada":true,"sin_cambio":true,"nota":"Ejemplo de Nandisena. La ‘ā’ persiste ante ‘kh’, y §28 la duplica."},{"f":"evaṃ vutte","comp":"evaṃ vutte","ref":"Vin. i 7","sec":"pakati","secName":"PAKATI-SANDHI","rule":"3","title":"A veces, cuando una consonante sigue, la “niggahīta” permanece sin cambio","kac":30,"s":["evaṃ vutte (§30)"],"full":true,"aforismo":true},{"f":"taṃ sādhu","comp":"taṃ sādhu","ref":"S. i 208","sec":"pakati","secName":"PAKATI-SANDHI","rule":"3","title":"A veces, cuando una consonante sigue, la “niggahīta” permanece sin cambio","kac":30,"s":["taṃ sādhu (§30)"],"full":true,"aforismo":true},{"f":"ekaṃ samayaṃ","comp":"ekaṃ samayaṃ","ref":"M. i 1","sec":"pakati","secName":"PAKATI-SANDHI","rule":"3","title":"A veces, cuando una consonante sigue, la “niggahīta” permanece sin cambio","kac":30,"s":["ekaṃ samayaṃ (§30)"],"full":true,"aforismo":true}]},"tablas":{"origen":"recursos/sandhi/tablas-sandhi-nandisena.json","procedencia":"firmada por el Venerable Nandisena","filas":[{"sec":"sara","n":"1","aforismo":"Una vocal que precede a otra vocal se elide.","referencia":"KAC. §12","referencia_suttas":[12],"ej_original":"yassa indriyāni yass a indriyāni (§10) yass indriyāni (§12) yassindriyāni (§11) yass’ indriyāni (EM)","secuencias":[{"pasos":[{"texto":"yass a indriyāni","citas":["§10"],"suttas":[10],"forma_de_partida":"yassa indriyāni","corte_comprobado":true},{"texto":"yass indriyāni","citas":["§12"],"suttas":[12]},{"texto":"yassindriyāni","citas":["§11"],"suttas":[11]},{"texto":"yass’ indriyāni","citas":["EM"],"suttas":[]}],"forma_inicial":"yassa indriyāni","sin_paso_11":false,"forma_final":"yassindriyāni","em":"yass’ indriyāni","suttas_que_operan":[12],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"2","aforismo":"Cuando dos vocales contiguas son disímiles, opcionalmente la segunda se elide.","referencia":"KAC. §13","referencia_suttas":[13],"ej_original":"pañca indriyāni pañc a indriyāni (§10)20 pañc indriyāni (§12) pañcindriyāni (§11) pañc' indriyāni (EM)","secuencias":[{"pasos":[{"texto":"pañc a indriyāni","citas":["§10"],"suttas":[10],"forma_de_partida":"pañca indriyāni","corte_comprobado":true},{"texto":"pañc indriyāni","citas":["§12"],"suttas":[12]},{"texto":"pañcindriyāni","citas":["§11"],"suttas":[11]},{"texto":"pañc' indriyāni","citas":["EM"],"suttas":[]}],"forma_inicial":"pañca indriyāni","sin_paso_11":false,"forma_final":"pañcindriyāni","em":"pañc' indriyāni","suttas_que_operan":[12],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"3","aforismo":"Cuando la vocal precedente ha sido elidida, a veces, la vocal siguiente se alarga.","referencia":"KAC. §15","referencia_suttas":[15],"ej_original":"saddhā idha saddh ā idha (§10) saddh idha (§12) saddh īdha (§15) saddhīdha (§11) saddh’ īdha (EM)","secuencias":[{"pasos":[{"texto":"saddh ā idha","citas":["§10"],"suttas":[10],"forma_de_partida":"saddhā idha","corte_comprobado":true},{"texto":"saddh idha","citas":["§12"],"suttas":[12]},{"texto":"saddh īdha","citas":["§15"],"suttas":[15]},{"texto":"saddhīdha","citas":["§11"],"suttas":[11]},{"texto":"saddh’ īdha","citas":["EM"],"suttas":[]}],"forma_inicial":"saddhā idha","sin_paso_11":false,"forma_final":"saddhīdha","em":"saddh’ īdha","suttas_que_operan":[12,15],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"4","aforismo":"Cuando la vocal siguiente ha sido elidida, a veces, la vocal precedente se alarga.","referencia":"KAC. §16","referencia_suttas":[16],"ej_original":"sādhu iti sādh u iti (§10) sādh u ti (§13) sādh ū ti (§16) sādhūti (§11) sādhū ti (EM)","secuencias":[{"pasos":[{"texto":"sādh u iti","citas":["§10"],"suttas":[10],"forma_de_partida":"sādhu iti","corte_comprobado":true},{"texto":"sādh u ti","citas":["§13"],"suttas":[13]},{"texto":"sādh ū ti","citas":["§16"],"suttas":[16]},{"texto":"sādhūti","citas":["§11"],"suttas":[11]},{"texto":"sādhū ti","citas":["EM"],"suttas":[]}],"forma_inicial":"sādhu iti","sin_paso_11":false,"forma_final":"sādhūti","em":"sādhū ti","suttas_que_operan":[13,16],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"5","aforismo":"A veces cuando las vocales ‘i’, ‘ī’ y ‘u’, ‘ū’ siguen a una vocal disímil que ha sido elidida, se convierten en ‘e’ y ‘o’ respectivamente.","referencia":"KAC. §14","referencia_suttas":[14],"ej_original":"na upeti n a upeti (§10) n upeti (§12) n opeti (§14) nopeti (§11) n’ opeti (EM)","secuencias":[{"pasos":[{"texto":"n a upeti","citas":["§10"],"suttas":[10],"forma_de_partida":"na upeti","corte_comprobado":true},{"texto":"n upeti","citas":["§12"],"suttas":[12]},{"texto":"n opeti","citas":["§14"],"suttas":[14]},{"texto":"nopeti","citas":["§11"],"suttas":[11]},{"texto":"n’ opeti","citas":["EM"],"suttas":[]}],"forma_inicial":"na upeti","sin_paso_11":false,"forma_final":"nopeti","em":"n’ opeti","suttas_que_operan":[12,14],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"6","aforismo":"Cuando una vocal sigue, a veces ‘e’ se convierte en ‘y’.","referencia":"KAC. §17","referencia_suttas":[17],"ej_original":"me ayaṃ m e ayaṃ (§10) m y ayaṃ (§17) m y āyaṃ (§25) myāyaṃ (§11) my āyaṃ (EM)","secuencias":[{"pasos":[{"texto":"m e ayaṃ","citas":["§10"],"suttas":[10],"forma_de_partida":"me ayaṃ","corte_comprobado":true},{"texto":"m y ayaṃ","citas":["§17"],"suttas":[17]},{"texto":"m y āyaṃ","citas":["§25"],"suttas":[25]},{"texto":"myāyaṃ","citas":["§11"],"suttas":[11]},{"texto":"my āyaṃ","citas":["EM"],"suttas":[]}],"forma_inicial":"me ayaṃ","sin_paso_11":false,"forma_final":"myāyaṃ","em":"my āyaṃ","suttas_que_operan":[17,25],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"7","aforismo":"Cuando una vocal sigue, a veces, ‘o’ y ‘u’ se convierten en ‘v’.","referencia":"KAC. §18","referencia_suttas":[18],"ej_original":"so assa s o assa (§10) s v assa (§18) svassa (§11) sv assa (EM)","secuencias":[{"pasos":[{"texto":"s o assa","citas":["§10"],"suttas":[10],"forma_de_partida":"so assa","corte_comprobado":true},{"texto":"s v assa","citas":["§18"],"suttas":[18]},{"texto":"svassa","citas":["§11"],"suttas":[11]},{"texto":"sv assa","citas":["EM"],"suttas":[]}],"forma_inicial":"so assa","sin_paso_11":false,"forma_final":"svassa","em":"sv assa","suttas_que_operan":[18],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"8","aforismo":"Cuando una vocal sigue, ocasionalmente, ‘i’, ‘ī’ se convierten en ‘y’.","referencia":"KAC. §21","referencia_suttas":[21],"ej_original":"paṭisanthāravutti assa paṭisanthāravutt i assa (§10) paṭisanthāravutt y assa (§21) paṭisanthāravut y assa (por “ca” en §41) paṭisanthāravutyassa (§11) paṭisanthāravuty assa (EM)","secuencias":[{"pasos":[{"texto":"paṭisanthāravutt i assa","citas":["§10"],"suttas":[10],"forma_de_partida":"paṭisanthāravutti assa","corte_comprobado":true},{"texto":"paṭisanthāravutt y assa","citas":["§21"],"suttas":[21]},{"texto":"paṭisanthāravut y assa","citas":["por “ca” en §41"],"suttas":[41]},{"texto":"paṭisanthāravutyassa","citas":["§11"],"suttas":[11]},{"texto":"paṭisanthāravuty assa","citas":["EM"],"suttas":[]}],"forma_inicial":"paṭisanthāravutti assa","sin_paso_11":false,"forma_final":"paṭisanthāravutyassa","em":"paṭisanthāravuty assa","suttas_que_operan":[21,41],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"9","aforismo":"Cuando una vocal sigue, la sílaba ‘ti’ de ‘ati’, ‘pati’ e ‘iti’ se convierte en ‘c’ y ésta se duplica.","referencia":"KAC. §19 KAC. §28","referencia_suttas":[19,28],"ej_original":"iti etaṃ ic etaṃ (§19) icc etaṃ (§28) iccetaṃ (§11) icc etaṃ (EM)","secuencias":[{"pasos":[{"texto":"iti etaṃ ic etaṃ","citas":["§19"],"suttas":[19]},{"texto":"icc etaṃ","citas":["§28"],"suttas":[28]},{"texto":"iccetaṃ","citas":["§11"],"suttas":[11]},{"texto":"icc etaṃ","citas":["EM"],"suttas":[]}],"forma_inicial":"iti etaṃ ic etaṃ","sin_paso_11":false,"forma_final":"iccetaṃ","em":"icc etaṃ","suttas_que_operan":[19,28],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"10","aforismo":"Cuando va seguida por una vocal, a veces, la sílaba ‘dha’ de ‘idha’, se convierte en ‘da’.","referencia":"KAC. §20","referencia_suttas":[20],"ej_original":"idha eva idh a eva (§10) idh eva (§12) idheva (§11) idh' eva (EM)","secuencias":[{"pasos":[{"texto":"idh a eva","citas":["§10"],"suttas":[10],"forma_de_partida":"idha eva","corte_comprobado":true},{"texto":"idh eva","citas":["§12"],"suttas":[12]},{"texto":"idheva","citas":["§11"],"suttas":[11]},{"texto":"idh' eva","citas":["EM"],"suttas":[]}],"forma_inicial":"idha eva","sin_paso_11":false,"forma_final":"idheva","em":"idh' eva","suttas_que_operan":[12],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"11","aforismo":"Después de “yathā” y “tathā”, la ‘e’ de “eva” se convierte en ‘ri’.","referencia":"KAC. §22","referencia_suttas":[22],"ej_original":"yathā eva yath ā eva (§10) yath ā riva, yath a riva (§22) yathariva (§11) yatha-r-iva (EM)","secuencias":[{"pasos":[{"texto":"yath ā eva","citas":["§10"],"suttas":[10],"forma_de_partida":"yathā eva","corte_comprobado":true},{"texto":"yath ā riva, yath a riva","citas":["§22"],"suttas":[22]},{"texto":"yathariva","citas":["§11"],"suttas":[11]},{"texto":"yatha-r-iva","citas":["EM"],"suttas":[]}],"forma_inicial":"yathā eva","sin_paso_11":false,"forma_final":"yathariva","em":"yatha-r-iva","suttas_que_operan":[22],"une_bien":true,"em_coincide":true}]},{"sec":"sara","n":"12","aforismo":"El prefijo ‘abhi’ cuando va seguido por una vocal se sustituye por ‘abbh’.","referencia":"KAC. §44","referencia_suttas":[44],"ej_original":"abhi udīritaṃ abbh udīritaṃ (§44) abbhudīritaṃ (§11)","secuencias":[{"pasos":[{"texto":"abbh udīritaṃ","citas":["§44"],"suttas":[44],"forma_de_partida":"abhi udīritaṃ"},{"texto":"abbhudīritaṃ","citas":["§11"],"suttas":[11]}],"forma_inicial":"abhi udīritaṃ","sin_paso_11":false,"forma_final":"abbhudīritaṃ","em":null,"suttas_que_operan":[44],"une_bien":true}]},{"sec":"sara","n":"13","aforismo":"El prefijo ‘adhi’ cuando va seguido por una vocal se sustituye por ‘ajjh’.","referencia":"KAC. §45","referencia_suttas":[45],"ej_original":"adhi okāse  ajjh okāse (§45) ajjhokāse (§11)","secuencias":[{"pasos":[{"texto":"ajjh okāse","citas":["§45"],"suttas":[45],"forma_de_partida":"adhi okāse"},{"texto":"ajjhokāse","citas":["§11"],"suttas":[11]}],"forma_inicial":"adhi okāse","sin_paso_11":false,"forma_final":"ajjhokāse","em":null,"suttas_que_operan":[45],"une_bien":true}]},{"sec":"sara","n":"14","aforismo":"Cuando una vocal sigue, ‘i’, ‘ī’ y ‘u’, ‘ū’, se convierten en ‘ya’ y ‘uva’ respectivamente.","referencia":"KAC. §70 RŪ. §30","referencia_suttas":[70,30],"ej_original":"tiyantaṃ =  ti + antaṃ (‘i’ de ‘ti’ recibe el nombre de ‘jha’ (§58); ‘i’ se sustituye por ‘iya’ (§70); ‘a’ de ‘iya’ se elide (§83)).  bhikkhuvāsane = bhikkhu + āsane (‘u’ de “bhikkhu” recibe el nombre de ‘la’ (§58); ‘u’ se sustituye por ‘uva’(§70); ‘a’ de ‘uva’ se elide (§83)).","aparte":"no es una secuencia: es prosa que describe dos análisis con §58, §70 y §83, aforismos de fuera del capítulo 1"},{"sec":"sara","n":"15","aforismo":"Cuando una vocal sigue, a veces, se inserta alguna de las siguientes consonantes: ‘y’, ‘v’, ‘m’, ‘d’, ‘n’, ‘t’, ‘r’, ‘l’, ‘h’, ‘g’.","referencia":"KAC. §35","referencia_suttas":[35],"ej_original":"na imassa na y imassa (§35) nayimassa (§11) na-y-imassa (EM)","secuencias":[{"pasos":[{"texto":"na y imassa","citas":["§35"],"suttas":[35],"forma_de_partida":"na imassa"},{"texto":"nayimassa","citas":["§11"],"suttas":[11]},{"texto":"na-y-imassa","citas":["EM"],"suttas":[]}],"forma_inicial":"na imassa","sin_paso_11":false,"forma_final":"nayimassa","em":"na-y-imassa","suttas_que_operan":[35],"une_bien":true,"em_coincide":true}]},{"sec":"byanjana","n":"1","aforismo":"A veces, una vocal, cuando va seguida por una consonante, se alarga.","referencia":"KAC. §25","referencia_suttas":[25],"ej_original":"khanti paramaṃ khantī paramaṃ (§25)","secuencias":[{"pasos":[{"texto":"khanti paramaṃ khantī paramaṃ","citas":["§25"],"suttas":[25]}],"forma_inicial":"khanti paramaṃ khantī paramaṃ","sin_paso_11":true,"forma_final":"khanti paramaṃ khantī paramaṃ","em":null,"suttas_que_operan":[25]}]},{"sec":"byanjana","n":"2","aforismo":"A veces, una vocal, cuando va seguida por una consonante, se acorta.","referencia":"KAC. §26","referencia_suttas":[26],"ej_original":"bhovādī nāma bhovādi nāma (§26)","secuencias":[{"pasos":[{"texto":"bhovādī nāma bhovādi nāma","citas":["§26"],"suttas":[26]}],"forma_inicial":"bhovādī nāma bhovādi nāma","sin_paso_11":true,"forma_final":"bhovādī nāma bhovādi nāma","em":null,"suttas_que_operan":[26]}]},{"sec":"byanjana","n":"3","aforismo":"A veces, la “o” de “eta” y “ta”, cuando va seguida por una consonante, se elide.","referencia":"KAC. §27","referencia_suttas":[27],"ej_original":"s o sīlavā (§10) s sīlavā, s a sīlavā (§27) sa sīlavā (§11)","secuencias":[{"pasos":[{"texto":"s o sīlavā","citas":["§10"],"suttas":[10]},{"texto":"s sīlavā, s a sīlavā","citas":["§27"],"suttas":[27]},{"texto":"sa sīlavā","citas":["§11"],"suttas":[11]}],"forma_inicial":"s o sīlavā","sin_paso_11":false,"forma_final":"sa sīlavā","em":null,"suttas_que_operan":[27],"une_bien":true}]},{"sec":"byanjana","n":"4","aforismo":"A veces, después de una vocal, la consonante siguiente se duplica.","referencia":"KAC. §28","referencia_suttas":[28],"ej_original":"idha pamādo idha ppamādo (§28) idhappamādo (§11) idha ppamādo (EM)","secuencias":[{"pasos":[{"texto":"idha ppamādo","citas":["§28"],"suttas":[28],"forma_de_partida":"idha pamādo"},{"texto":"idhappamādo","citas":["§11"],"suttas":[11]},{"texto":"idha ppamādo","citas":["EM"],"suttas":[]}],"forma_inicial":"idha pamādo","sin_paso_11":false,"forma_final":"idhappamādo","em":"idha ppamādo","suttas_que_operan":[28],"une_bien":true,"em_coincide":true}]},{"sec":"byanjana","n":"5","aforismo":"A veces, las consonantes conjuntas ‘ty’, ‘ly’, ‘ny’, ‘dy’ se convierten en ‘c’, ‘l’, ‘ñ’, ‘j’ respectivamente y después éstas se duplican.","referencia":"KAC. §269 RŪ. §41","referencia_suttas":[269,41],"ej_original":"jāti + andho jāti + andho (§10) jāty + andho (§21) jāc + andho (§269) jācc + andho (§28) jāccandho (§10)","secuencias":[{"pasos":[{"texto":"jāti + andho","citas":["§10"],"suttas":[10],"forma_de_partida":"jāti + andho","corte_comprobado":true},{"texto":"jāty + andho","citas":["§21"],"suttas":[21]},{"texto":"jāc + andho","citas":["§269"],"suttas":[269]},{"texto":"jācc + andho","citas":["§28"],"suttas":[28]},{"texto":"jāccandho","citas":["§10"],"suttas":[10]}],"forma_inicial":"jāti + andho","sin_paso_11":true,"forma_final":"jāccandho","em":null,"suttas_que_operan":[21,28,269]}]},{"sec":"byanjana","n":"6","aforismo":"A veces, después de una vocal, la segunda y cuarta consonante de las agrupadas se duplican en la primera y tercera de las agrupadas respectivamente.","referencia":"KAC. §29","referencia_suttas":[29],"ej_original":"yatra ṭhitaṃ yatra ṭṭhitaṃ (§29) yatraṭṭhitaṃ (§11) yatra ṭṭhitaṃ (EM)","secuencias":[{"pasos":[{"texto":"yatra ṭṭhitaṃ","citas":["§29"],"suttas":[29],"forma_de_partida":"yatra ṭhitaṃ"},{"texto":"yatraṭṭhitaṃ","citas":["§11"],"suttas":[11]},{"texto":"yatra ṭṭhitaṃ","citas":["EM"],"suttas":[]}],"forma_inicial":"yatra ṭhitaṃ","sin_paso_11":false,"forma_final":"yatraṭṭhitaṃ","em":"yatra ṭṭhitaṃ","suttas_que_operan":[29],"une_bien":true,"em_coincide":true}]},{"sec":"byanjana","n":"7","aforismo":"A veces el prefijo ‘pati’ cuando va seguido por una vocal o una consonante, se convierte en ‘paṭi’.","referencia":"KAC. §48","referencia_suttas":[48],"ej_original":"pati haññati paṭi haññati (§48) paṭihaññati (§11)","secuencias":[{"pasos":[{"texto":"paṭi haññati","citas":["§48"],"suttas":[48],"forma_de_partida":"pati haññati"},{"texto":"paṭihaññati","citas":["§11"],"suttas":[11]}],"forma_inicial":"pati haññati","sin_paso_11":false,"forma_final":"paṭihaññati","em":null,"suttas_que_operan":[48],"une_bien":true}]},{"sec":"byanjana","n":"8","aforismo":"Cuando va seguida por una consonante, la vocal final de “putha” se convierte en “u”.","referencia":"KAC. §49","referencia_suttas":[49],"ej_original":"putha jano puth a jano (§10) puth u jano (§49) puth u jjano (§28) puthujjano (§11)","secuencias":[{"pasos":[{"texto":"puth a jano","citas":["§10"],"suttas":[10],"forma_de_partida":"putha jano","corte_comprobado":true},{"texto":"puth u jano","citas":["§49"],"suttas":[49]},{"texto":"puth u jjano","citas":["§28"],"suttas":[28]},{"texto":"puthujjano","citas":["§11"],"suttas":[11]}],"forma_inicial":"putha jano","sin_paso_11":false,"forma_final":"puthujjano","em":null,"suttas_que_operan":[28,49],"une_bien":true}]},{"sec":"byanjana","n":"9","aforismo":"A veces, cuando va seguido por una consonante, el prefijo ‘ava’ se convierte en ‘o’.","referencia":"KAC. §50","referencia_suttas":[50],"ej_original":"ava naddhā o naddhā (§50) onaddhā (§11)","secuencias":[{"pasos":[{"texto":"o naddhā","citas":["§50"],"suttas":[50],"forma_de_partida":"ava naddhā"},{"texto":"onaddhā","citas":["§11"],"suttas":[11]}],"forma_inicial":"ava naddhā","sin_paso_11":false,"forma_final":"onaddhā","em":null,"suttas_que_operan":[50],"une_bien":true}]},{"sec":"byanjana","n":"10","aforismo":"En algunos casos, cuando va seguida por una consonante, la letra ‘o’, la substitución del prefijo ‘ava’, se convierte en ‘u’.","referencia":"KAC. §79 RŪ. §46","referencia_suttas":[79,46],"ej_original":"ava + gate o + gate (§50) u + gate (§79) u + ggate (§28) uggate (§11)","secuencias":[{"pasos":[{"texto":"ava + gate o + gate","citas":["§50"],"suttas":[50]},{"texto":"u + gate","citas":["§79"],"suttas":[79]},{"texto":"u + ggate","citas":["§28"],"suttas":[28]},{"texto":"uggate","citas":["§11"],"suttas":[11]}],"forma_inicial":"ava + gate o + gate","sin_paso_11":false,"forma_final":"uggate","em":null,"suttas_que_operan":[28,50,79],"une_bien":false,"une_sin_el_mas":true}]},{"sec":"byanjana","n":"11","aforismo":"A veces, cuando una consonante sigue, hay inserción de la letra ‘o’.","referencia":"KAC. §36","referencia_suttas":[36],"ej_original":"para sahassaṃ par a sahassaṃ (§10) par sahassaṃ (§12) par o sahassaṃ (§36) parosahassaṃ (§11)","secuencias":[{"pasos":[{"texto":"par a sahassaṃ","citas":["§10"],"suttas":[10],"forma_de_partida":"para sahassaṃ","corte_comprobado":true},{"texto":"par sahassaṃ","citas":["§12"],"suttas":[12]},{"texto":"par o sahassaṃ","citas":["§36"],"suttas":[36]},{"texto":"parosahassaṃ","citas":["§11"],"suttas":[11]}],"forma_inicial":"para sahassaṃ","sin_paso_11":false,"forma_final":"parosahassaṃ","em":null,"suttas_que_operan":[12,36],"une_bien":true}]},{"sec":"byanjana","n":"12","aforismo":"Cuando hay elisión de la inflexión nominal, la vocal final del grupo de ‘mana’ se convierte en ‘o’.","referencia":"KAC. §183 RŪ. §48","referencia_suttas":[183,48],"ej_original":"mana mayaṃ man a mayaṃ (§10) man o mayaṃ (§183) manomayaṃ (§11)","secuencias":[{"pasos":[{"texto":"man a mayaṃ","citas":["§10"],"suttas":[10],"forma_de_partida":"mana mayaṃ","corte_comprobado":true},{"texto":"man o mayaṃ","citas":["§183"],"suttas":[183]},{"texto":"manomayaṃ","citas":["§11"],"suttas":[11]}],"forma_inicial":"mana mayaṃ","sin_paso_11":false,"forma_final":"manomayaṃ","em":null,"suttas_que_operan":[183],"une_bien":true}]},{"sec":"niggahita","n":"1","aforismo":"A veces, cuando va seguida por una consonante agrupada, la “niggahīta” se convierte en la última consonante del grupo.","referencia":"KAC. §31","referencia_suttas":[31],"ej_original":"dhammaṃ care dhammañ care (§31) dhammañcare (§11) dhammañ care (EM)","secuencias":[{"pasos":[{"texto":"dhammañ care","citas":["§31"],"suttas":[31],"forma_de_partida":"dhammaṃ care"},{"texto":"dhammañcare","citas":["§11"],"suttas":[11]},{"texto":"dhammañ care","citas":["EM"],"suttas":[]}],"forma_inicial":"dhammaṃ care","sin_paso_11":false,"forma_final":"dhammañcare","em":"dhammañ care","suttas_que_operan":[31],"une_bien":true,"em_coincide":true}]},{"sec":"niggahita","n":"2","aforismo":"A veces, cuando la consonante ‘l’ sigue, la “niggahīta” del prefijo ‘saṃ’ y del final de “puma” se convierte en ‘l’.","referencia":"KAC. §31 RŪ. §49","referencia_suttas":[31,49],"ej_original":"puggaṃ aṃ puggal aṃ (por “vā” en §31) puggalaṃ (§11)","secuencias":[{"pasos":[{"texto":"puggal aṃ","citas":["por “vā” en §31"],"suttas":[31],"forma_de_partida":"puggaṃ aṃ"},{"texto":"puggalaṃ","citas":["§11"],"suttas":[11]}],"forma_inicial":"puggaṃ aṃ","sin_paso_11":false,"forma_final":"puggalaṃ","em":null,"suttas_que_operan":[31],"une_bien":true}]},{"sec":"niggahita","n":"3","aforismo":"A veces, cuando “eva” y “hi” siguen, la “niggahīta” se convierte en ‘ñ’; y ésta se duplica cuando va seguida por “eva”.","referencia":"KAC. §27","referencia_suttas":[27],"ej_original":"paccattaṃ eva paccatañ eva (§32) paccataññ eva (§28) paccattaññeva (§11) paccattañ ñeva (EM)  taṃ hi tañ hi (§32) tañhi (§11) tañ hi (EM)","secuencias":[{"pasos":[{"texto":"paccattaṃ eva paccatañ eva","citas":["§32"],"suttas":[32]},{"texto":"paccataññ eva","citas":["§28"],"suttas":[28]},{"texto":"paccattaññeva","citas":["§11"],"suttas":[11]},{"texto":"paccattañ ñeva","citas":["EM"],"suttas":[]}],"forma_inicial":"paccattaṃ eva paccatañ eva","sin_paso_11":false,"forma_final":"paccattaññeva","em":"paccattañ ñeva","suttas_que_operan":[28,32],"une_bien":false,"em_coincide":true},{"pasos":[{"texto":"tañ hi","citas":["§32"],"suttas":[32],"forma_de_partida":"taṃ hi"},{"texto":"tañhi","citas":["§11"],"suttas":[11]},{"texto":"tañ hi","citas":["EM"],"suttas":[]}],"forma_inicial":"taṃ hi","sin_paso_11":false,"forma_final":"tañhi","em":"tañ hi","suttas_que_operan":[32],"une_bien":true,"em_coincide":true}]},{"sec":"niggahita","n":"4","aforismo":"A veces, cuando ‘y’ sigue, la “niggahīta” junto con ‘y’ se convierte en ‘ñ’; y ésta se duplica.","referencia":"KAC. §28","referencia_suttas":[28],"ej_original":"saṃ yogo sañ ñogo (§33) saññogo (§11) (EM)","secuencias":[{"pasos":[{"texto":"sañ ñogo","citas":["§33"],"suttas":[33],"forma_de_partida":"saṃ yogo"},{"texto":"saññogo","citas":["§11"],"suttas":[11]}],"forma_inicial":"saṃ yogo","sin_paso_11":false,"forma_final":"saññogo","em":null,"suttas_que_operan":[33],"une_bien":true}]},{"sec":"niggahita","n":"5","aforismo":"A veces, cuando una vocal sigue, la “niggahīta” se convierte en ‘m’ y ‘d’.","referencia":"KAC. §34","referencia_suttas":[34],"ej_original":"taṃ ahaṃ tam ahaṃ (§34) tamahaṃ (§11) tam ahaṃ (EM)  etaṃ avoca etad avoca (§34) etadavoca (§11) etad avoca (EM)","secuencias":[{"pasos":[{"texto":"tam ahaṃ","citas":["§34"],"suttas":[34],"forma_de_partida":"taṃ ahaṃ"},{"texto":"tamahaṃ","citas":["§11"],"suttas":[11]},{"texto":"tam ahaṃ","citas":["EM"],"suttas":[]}],"forma_inicial":"taṃ ahaṃ","sin_paso_11":false,"forma_final":"tamahaṃ","em":"tam ahaṃ","suttas_que_operan":[34],"une_bien":true,"em_coincide":true},{"pasos":[{"texto":"etad avoca","citas":["§34"],"suttas":[34],"forma_de_partida":"etaṃ avoca"},{"texto":"etadavoca","citas":["§11"],"suttas":[11]},{"texto":"etad avoca","citas":["EM"],"suttas":[]}],"forma_inicial":"etaṃ avoca","sin_paso_11":false,"forma_final":"etadavoca","em":"etad avoca","suttas_que_operan":[34],"une_bien":true,"em_coincide":true}]},{"sec":"niggahita","n":"6","aforismo":"A veces, cuando una vocal sigue, la “niggahīta” se elide.","referencia":"KAC. §38","referencia_suttas":[38],"ej_original":"tāsaṃ ahaṃ tāsa ahaṃ (§38) tās a ahaṃ (§10) tās ahaṃ (§12) tās āhaṃ (§15) tāsāhaṃ (§11)","secuencias":[{"pasos":[{"texto":"tāsaṃ ahaṃ tāsa ahaṃ","citas":["§38"],"suttas":[38]},{"texto":"tās a ahaṃ","citas":["§10"],"suttas":[10]},{"texto":"tās ahaṃ","citas":["§12"],"suttas":[12]},{"texto":"tās āhaṃ","citas":["§15"],"suttas":[15]},{"texto":"tāsāhaṃ","citas":["§11"],"suttas":[11]}],"forma_inicial":"tāsaṃ ahaṃ tāsa ahaṃ","sin_paso_11":false,"forma_final":"tāsāhaṃ","em":null,"suttas_que_operan":[12,15,38],"une_bien":true}]},{"sec":"niggahita","n":"7","aforismo":"A veces, cuando una consonante sigue, la “niggahīta” se elide.","referencia":"KAC. §39","referencia_suttas":[39],"ej_original":"ariyasaccānaṃ dassanaṃ ariyasaccāna dassanaṃ (§39) ariyasaccānadassanaṃ (§11) ariyasaccāna’ dassanaṃ (EM)","secuencias":[{"pasos":[{"texto":"ariyasaccāna dassanaṃ","citas":["§39"],"suttas":[39],"forma_de_partida":"ariyasaccānaṃ dassanaṃ"},{"texto":"ariyasaccānadassanaṃ","citas":["§11"],"suttas":[11]},{"texto":"ariyasaccāna’ dassanaṃ","citas":["EM"],"suttas":[]}],"forma_inicial":"ariyasaccānaṃ dassanaṃ","sin_paso_11":false,"forma_final":"ariyasaccānadassanaṃ","em":"ariyasaccāna’ dassanaṃ","suttas_que_operan":[39],"une_bien":true,"em_coincide":true}]},{"sec":"niggahita","n":"8","aforismo":"A veces, la vocal después de la “niggahīta” se elide y la “niggahīta” se convierte en la consonante final del grupo correspondiente.","referencia":"KAC. §40","referencia_suttas":[40],"ej_original":"abhinanduṃ iti abhinanduṃ ti (§40)  abhinandun ti (§31) abhinandunti (§11) abhinandun ti (EM)","secuencias":[{"pasos":[{"texto":"abhinanduṃ iti abhinanduṃ ti","citas":["§40"],"suttas":[40]},{"texto":"abhinandun ti","citas":["§31"],"suttas":[31]},{"texto":"abhinandunti","citas":["§11"],"suttas":[11]},{"texto":"abhinandun ti","citas":["EM"],"suttas":[]}],"forma_inicial":"abhinanduṃ iti abhinanduṃ ti","sin_paso_11":false,"forma_final":"abhinandunti","em":"abhinandun ti","suttas_que_operan":[31,40],"une_bien":true,"em_coincide":true}]},{"sec":"niggahita","n":"9","aforismo":"A veces, cuando la vocal siguiente a la “niggahīta” se elide, si la consonante siguiente es conjunta, ésta se convierte en no-conjunta.","referencia":"KAC. §41","referencia_suttas":[41],"ej_original":"evaṃ assa evaṃ ssa (§40) evaṃ sa (§41) evaṃsa (§11) evaṃ ’sa (EM)","secuencias":[{"pasos":[{"texto":"evaṃ assa evaṃ ssa","citas":["§40"],"suttas":[40]},{"texto":"evaṃ sa","citas":["§41"],"suttas":[41]},{"texto":"evaṃsa","citas":["§11"],"suttas":[11]},{"texto":"evaṃ ’sa","citas":["EM"],"suttas":[]}],"forma_inicial":"evaṃ assa evaṃ ssa","sin_paso_11":false,"forma_final":"evaṃsa","em":"evaṃ ’sa","suttas_que_operan":[40,41],"une_bien":true,"em_coincide":true}]},{"sec":"niggahita","n":"10","aforismo":"A veces, cuando una vocal o una consonante sigue, se inserta la “niggahīta”.","referencia":"KAC. §37","referencia_suttas":[37],"ej_original":"cakkhu udapādi cakkhu ṃ udapādi (§37) cakkhuṃ udapādi (§11)  ava siro ava ṃ siro (§37) avaṃsiro (§11)","secuencias":[{"pasos":[{"texto":"cakkhu ṃ udapādi","citas":["§37"],"suttas":[37],"forma_de_partida":"cakkhu udapādi"},{"texto":"cakkhuṃ udapādi","citas":["§11"],"suttas":[11]}],"forma_inicial":"cakkhu udapādi","sin_paso_11":false,"forma_final":"cakkhuṃ udapādi","em":null,"suttas_que_operan":[37],"une_bien":true},{"pasos":[{"texto":"ava ṃ siro","citas":["§37"],"suttas":[37],"forma_de_partida":"ava siro"},{"texto":"avaṃsiro","citas":["§11"],"suttas":[11]}],"forma_inicial":"ava siro","sin_paso_11":false,"forma_final":"avaṃsiro","em":null,"suttas_que_operan":[37],"une_bien":true}]},{"sec":"niggahita","n":"11","aforismo":"A veces hay transposición de las letras ‘r’, ‘h’, ‘n’.","referencia":"KAC. §51 RŪ §59","referencia_suttas":[51,59],"ej_original":"bahvābādho bavhābādho (por “ca” de §20)","secuencias":[{"pasos":[{"texto":"bahvābādho bavhābādho","citas":["por “ca” de §20"],"suttas":[20]}],"forma_inicial":"bahvābādho bavhābādho","sin_paso_11":true,"forma_final":"bahvābādho bavhābādho","em":null,"suttas_que_operan":[20]}]},{"sec":"pakati","n":"1","aforismo":"A veces, la vocal que precede, cuando va seguida por una vocal, permanece sin cambios.","referencia":"KAC. §24","referencia_suttas":[24],"ej_original":"bhikkhave evaṃ vadāmi (§24)","secuencias":[{"pasos":[{"texto":"bhikkhave evaṃ vadāmi","citas":["§24"],"suttas":[24]}],"forma_inicial":"bhikkhave evaṃ vadāmi","sin_paso_11":true,"forma_final":"bhikkhave evaṃ vadāmi","em":null,"suttas_que_operan":[24]}]},{"sec":"pakati","n":"2","aforismo":"A veces, la vocal que precede, cuando va seguida por una consonante, permanece sin cambios.","referencia":"KAC. §23","referencia_suttas":[23],"ej_original":"manopubbaṅgamā dhammā (§23)","secuencias":[{"pasos":[{"texto":"manopubbaṅgamā dhammā","citas":["§23"],"suttas":[23]}],"forma_inicial":"manopubbaṅgamā dhammā","sin_paso_11":true,"forma_final":"manopubbaṅgamā dhammā","em":null,"suttas_que_operan":[23]}]},{"sec":"pakati","n":"3","aforismo":"A veces, cuando una consonante sigue, la “niggahīta” permanece sin cambio.","referencia":"KAC. §30","referencia_suttas":[30],"ej_original":"evaṃ vutte (§30)","secuencias":[{"pasos":[{"texto":"evaṃ vutte","citas":["§30"],"suttas":[30]}],"forma_inicial":"evaṃ vutte","sin_paso_11":true,"forma_final":"evaṃ vutte","em":null,"suttas_que_operan":[30]}]}]},"listas":{"_meta":{"que_es":"Listas cerradas de indeclinables: los 20 prefijos (upasagga) y las partículas (nipāta).","de_donde":"«Indeclinables (avyaya)» y «Partículas (nipāta)», material preparado por Bhikkhu Nandisena. Publicaciones IEBH. Basados en Rū. 126 y Sad. iii 361; y en Rū. 132-136, Sad. iii 369-391, Rū-ṭī. 81-86.","para_que":"El método las usa para RECHAZAR, no para proponer: «una pieza no es palabra si está en las listas cerradas de desinencias, sufijos o prefijos». Y son las que alimentan la puerta de detección.","advertencia":"Los lemas de nipāta se extrajeron del texto del PDF con un patrón; conviene cotejarlos antes de usarlos como lista cerrada estricta. Los 20 upasagga sí están enumerados explícitamente en la fuente.","fecha":"2026-08-19"},"upasagga":["PA","PARĀ","NI","NĪ","U","DU","SAṂ","VI","AVA","ANU","PARI","ADHI","ABHI","PATI","SU","Ā","ATI","API","APA","UPA"],"nipata":["a","aciraṃ","ajja","ajjhattaṃ","aññatra","aññadatthu","aññadā","atha","vā","atho","atthi","addhā","adho","antarā","antaṃ","anto","aparajju","apācīnaṃ","api","ca","kho","khalu","nāma","nu","eva","abhikkhaṇaṃ","abhiṇhaṃ","abhito","amā","ambho","araṃ","are","alaṃ","alikaṃ","assu","aho","āma","ārakā","ārā","āvi","āvuso","āsuṃ","iṅgha","iti","itthaṃ","idāni","idha","iva","iha","īsakaṃ","uccaṃ","uda","udāhu","uddhaṃ","upari","ekajjhaṃ","ekadā","ekamantaṃ","etarahi","evaṃ","pi","hi","opāyikaṃ","oraṃ","kacci","katthaci","kathaṃ","kathañci","kadā","kadāci","karahaci","kallaṃ","kasmā","kahaṃ","kāmaṃ","kālaṃ","kiṃ","su","kiñcāpi","kinti","kinnu","kira","kīva","ku","kudācanaṃ","ko","kvaci","kvacini","khippaṃ","carahi","ciraṃ","cirassaṃ","ce","jātu","jātucche","taṃ","taggha","tato","tathā","tadā","tadāni","tasmā","dartāva","tāvatā","tiriyaṃ","tiro","tu","dartuṇṇaṃ","tuṇhī","tuvaṭaṃ","tena","divā","duṭṭhu","atthu","dhi","dhīdhī","dhuvaṃ","uddhana","naṃ","nattaṃ","nanu","namo","nāna","nānaṃ","nānā","niccaṃ","nīcaṃ","nūna","no","paccattaṃ","pacchā","pana","parajja","parammukhā","parasuve","parito","pare","pāto","pāraṃ","puthu","puna","punappunaṃ","purā","pure","pecca","bahi","bahiddhā","bāhirā","bāhiraṃ","bhiyyo","bhūtapubbaṃ","bho","manaṃ","mā","mārisa","mārisā","micchā","musā","muhuṃ","muhuttaṃ","yagghe","kutoci","yathā","yadā","yadi","yasmā","yāva","yāvatā","ratti","raho","rite","re","labbhā","lahu","va","vata","vatha","vinā","visuṃ","ve","vo","saṃ","sakiṃ","sakkā","sakkhi","sacchi","saṇikaṃ","satataṃ","sadā","saddhiṃ","sabbadā","samaṃ","samantato","samantā","sampati","samma","sammukhā","sayaṃ","sasakkaṃ","saha","sādhu","sāmaṃ","sāmantā","sāhu","suṭṭhu","sudaṃ","suvatthi","suve","seyyathīdaṃ","sve","sotthi","ha","handa","hambho","have","haṃ","hā","hiyyo","huraṃ","he","heṭṭhā"]},"casos":{"_que_es":"Casos adjudicados por lectores del solucionador. Decisión del Venerable (briefing 30 §3.5): la herramienta mejora con los fallos que reporten los lectores, y cada fallo es un caso de prueba permanente. Cada caso lleva su fuente y su fecha: es una adjudicación atribuida, no una heurística. El motor los consulta como al banco: un caso con sandhi=true da señal «segura» y pone primera la lectura adjudicada si el motor la produce; uno con sandhi=false es prueba de regresión de que la señal calla. Se comprueban con: node nuestro/js/arnes_casos.js","no_sandhi":[{"terminaciones":["tvā","tvāna"],"fuente":"IEBH, 2026-08-28 · comentario de Vedanā (sesión 32)","nota":"En palabras del IEBH: «forms ending in tvā and tvāna are absolutives, indeclinable, so they should not be flagged as sandhi». La señal calla en toda voz con esas terminaciones — phusitvā, katvā, disvāna…—; las lecturas que recomponen siguen visibles al pegar la voz sola, como en todo silencio. Un caso adjudicado sandhi=true mandaría sobre esta regla (el caso manda), pero hoy no existe ninguno."},{"formas":["pañca"],"fuente":"IEBH, 2026-08-30 · «con pañca ésa sería la excepción»","nota":"«Pañca» —cinco— NO es sandhi: no es «paṃ + ca», sino una voz llana. Se escribe como excepción nombrada de la familia de §31 («ñca» = ṃ + ca), que el IEBH firmó el 2026-08-28.\n\nMEDIDO el 2026-08-30, sobre las 9.526 voces del canon acabadas en «ñca» (masa 68.595): el motor afirma 6.061, deja 1.696 en «posible» y calla 1.769. De las diez voces con la SILUETA de pañca —forma frecuente y base rarísima— las otras nueve SÍ son sandhi (ummattikādīnañca = ummattikādīnaṃ + ca, aṭṭhamakañca, sukhatthañca, duvūpasantañca…). Pañca es la única excepción de su forma en todo el canon.\n\nHOY LA REGLA ES INERTE, y conviene decirlo: a pañca ya la calla el resguardo de la base residual —«paṃ» aparece 1 vez y «pañca» 8.192, de modo que «paṃ» no llega a candidata—, y `_silenciar_no_sandhi` sólo actúa donde hay señal. Se escribe para que la excepción esté NOMBRADA y no dependa de un accidente de cuentas: si algún día se ensancha el resguardo, pañca sigue callada por su nombre y no por su aritmética.\n\nY ése es el punto, porque el ensanche está sobre la mesa: quitando el resguardo a esta familia, el patrón afirmaría 315 formas más, y de esas 315 sólo DOS son malas —pañca, y taṃsampayuttakānañca por base residual («taṃsampayuttakānaña», 1)—. Las otras 313 son lecturas correctas que hoy se silencian: kāmarāgānusayañca (622), paṭighānusayañca (602), mānānusayañca (445), assādañca (190)… Ensanchar el resguardo es del IEBH; esta entrada sólo le quita a esa decisión su riesgo más grande."}],"patrones":[{"segunda":"iti","remanente":"ti","clase_vocal":true,"fuente":"IEBH, 2026-08-28 · pauta de las enclíticas (SN 1.1, DN 2)","nota":"La cola de «iti» del discurso directo. Si entre las lecturas verificadas hay exactamente UNA primera voz atestiguada en el canon con «iti» de segunda, ésa se afirma: abhisambuddho + iti. Regla de la clase vocálica, adjudicada por el IEBH el 2026-08-28: «hotīti es sólo hoti + iti y hotūti es sólo hotu + iti» — la vocal que sobrevive ante «ti» conserva la clase de la vocal final de la base (a/ā, i/ī, u/ū, e, o), y las bases de otra clase quedan excluidas; en el corpus, hotīti 7.621, hotūti 213, hotāti 0. Desempate adjudicado: entre la base breve y su gemela alargada (pabbajjāya / pabbajjāyā, hoti / hotī) se afirma la BREVE — la larga suele ser el producto del propio sandhi—. Con bases distintas de verdad el patrón calla y la duda se declara."},{"segunda":"api","fuente":"IEBH, 2026-08-28 · pauta de las enclíticas (DN 2)","nota":"La cola de «pi» (api con la vocal elidida, §13): yepi = ye + api, tepi = te + api. La lectura con «pi» suelto sería yuxtaposición sin operación y queda fuera del encargo, así que api es la única segunda voz en alcance."},{"segunda":"ca","fuente":"IEBH, 2026-08-28 · verso «Samāhito sampajāno» (Vedanā) y el informe de familias","nota":"La familia del sandhi de niggahīta ante «ca» (§31): vedanānañca = vedanānaṃ + ca, maggañca = maggaṃ + ca, tañca, evañca, yañca, kathañca… En palabras del IEBH: «this is niggahita sandhi, sandhi 101». Firmada tras el informe de familias de la sesión 32: 41 de las 46 formas «no sabe» de la familia se afirman por base única atestiguada, sin un solo riesgo de base residual. Mismo mecanismo que «iti» y «api»: base única atestiguada, con el resguardo de la base residual.","_resguardo":"El RESGUARDO DE LA BASE RESIDUAL, adjudicado por el IEBH el 2026-08-28 (sesión 32) para TODOS los patrones y aplicado en el mecanismo (_aplicar_patron / aplicarPatron): una base candidata debe ser al menos tan frecuente en el canon como la forma entera. Sin él, «ho» (4 apariciones) concedía la unicidad y el patrón afirmaba hoti (59.320) como ho + iti — y pajānāti, bhaṇati, vadati, karoti…—; del otro lado, «cakkhundriyaña» (1) negaba la unicidad a cakkhundriyaṃ + ca. La base residual ni concede ni bloquea: no cuenta como candidata."},{"clase":"niggahita_m","fuente":"IEBH, 2026-08-29 · firma de §34 (la clase de «idamavoca»)","nota":"Niggahīta → m ante vocal (§34), con la segunda voz CORRIENTE (avoca, ahaṃ, eva…), no una partícula fija. Palabras del IEBH al firmar: «§34 is approved since anytime you find the niggahita changed to 'm' before a vowel, it means this rule applies». A diferencia de los patrones por segunda voz, la clase la identifica la «m» de la juntura, y la licencia es la unicidad de la LECTURA de la clase: candidatas las lecturas verificadas (base, seg) con base terminada en «ṃ» y seg empezando en vocal cuya superficie es exactamente base[:-1] + «m» + seg, las dos voces atestiguadas; el resguardo de la base residual se aplica por los DOS lados (cada voz al menos tan frecuente que la forma entera); gemelas de vocal inicial (ayaṃ/āyaṃ) → la de inicial BREVE; si queda exactamente una, se afirma, y si no, el patrón calla. Medido antes de la firma (informe-niggahita-m.md, 2026-08-29): 54 formas afirmables, masa 31.344, 37 de ellas entonces sin señal ninguna. Mecanismo: _patron_niggahita_m (Python) / patronNiggahitaM (JS). RÉGIMEN MEDIDO (IEBH, 2026-08-30): el patrón sólo afirma formas cuya frecuencia en el canon alcanza el piso 159 —la frecuencia del puesto 5.000, que es hasta donde llegó la medición del informe—. Fuera de ese régimen el resguardo se debilita (con la forma rara, el piso de las candidatas cae) y aparecieron afirmaciones falsas que la medición nunca vio: jātimaraṇā (frec 3) salía como jātiṃ + araṇā siendo el compuesto jāti+maraṇa, y vedhamānehi (7) como vedhaṃ + ānehi siendo el participio vedhamāna. Las formas raras callan hasta que el IEBH amplíe la licencia.","frec_minima":159}],"casos":[{"forma":"tenupasaṅkami","sandhi":true,"componentes":"tena + upasaṅkami","fuente":"IEBH, 2026-08-28 · SN 1.1 Oghataraṇasutta","nota":"La señal por frecuencia no puede verlo: la forma aparece 1.763 veces en el canon y su segunda voz «upasaṅkami» sólo 231 — el sandhi formulaico es más frecuente que sus propias piezas. Por eso existe este archivo."},{"forma":"etadavoca","sandhi":true,"componentes":"etaṃ + avoca","fuente":"IEBH, 2026-08-28 · SN 1.1 Oghataraṇasutta","nota":"Ya estaba en el banco y la firmada sale primera; el caso lo fija como regresión."},{"forma":"oghamatarīti","sandhi":true,"componentes":"oghamatari + iti","fuente":"IEBH, 2026-08-28 · SN 1.1 Oghataraṇasutta","nota":"La secuencia correcta es §10 · §12 · §15 · §11. El motor la producía como segunda lectura entre 18; la adjudicación la pone primera."},{"forma":"sāvatthiyaṃ","sandhi":false,"fuente":"IEBH, 2026-08-28 · SN 1.1 Oghataraṇasutta","nota":"Locativo de Sāvatthī, voz entera. La señal falsa que se vio venía de un defecto del tokenizador de la página (amputaba la ṁ final), corregido el mismo día."},{"forma":"kathaṃ","sandhi":false,"fuente":"IEBH, 2026-08-28 · SN 1.1 Oghataraṇasutta","nota":"Adverbio interrogativo, voz entera. Mismo defecto del tokenizador."},{"forma":"tvaṃ","sandhi":false,"fuente":"IEBH, 2026-08-28 · SN 1.1 Oghataraṇasutta","nota":"Pronombre, voz entera. Mismo defecto del tokenizador."},{"forma":"navo","sandhi":false,"fuente":"IEBH, 2026-08-28 · DN 2","nota":"«navo ca pabbajjāya»: adjetivo, voz entera. La señal de frecuencia proponía naṃ + vo (§39); falso."},{"forma":"ceva","sandhi":true,"componentes":"ca + eva","grado":"habitual","fuente":"IEBH, 2026-08-28 · DN 2","nota":"Adjudicación HABITUAL, no exclusiva — en palabras del IEBH: «ceva could be ca eva or ce eva or ci eva and so on; most of the time is ca eva», y decidir un pasaje concreto pediría leer los Comentarios. Se afirma la lectura habitual y las demás quedan a la vista, plegadas. Distinto del grado exclusivo de hotīti («es sólo hoti + iti»)."},{"forma":"pajānāti","sandhi":false,"fuente":"IEBH, 2026-08-28 · verso «Samāhito sampajāno» (Vedanā)","nota":"En palabras del IEBH: «pajānāti is a verb of fifth group kiyādi-gaṇa, not sandhi». Voz entera. El patrón de «iti» la afirmaba como pajāna + iti porque «pajāna» (1 aparición en el canon) resultaba la única base atestiguada — la unicidad concedida por una base residual. El caso apaga la señal; el defecto general del patrón queda medido y espera regla firmada."},{"forma":"vedanānañca","sandhi":true,"componentes":"vedanānaṃ + ca","fuente":"IEBH, 2026-08-28 · verso «Samāhito sampajāno» (Vedanā)","nota":"Sandhi de niggahīta (§31): la ṃ se asimila en ñ ante c. El motor ya producía esta lectura primera con señal «posible», pero sin autoridad no la afirmaba y declaraba «no sabe» entre 20 lecturas. En palabras del IEBH: «this is niggahita sandhi, sandhi 101». La familia entera (…ñca ← …ṃ + ca) es candidata a patrón; ver el informe de familias."},{"forma":"maggañca","sandhi":true,"componentes":"maggaṃ + ca","fuente":"IEBH, 2026-08-28 · verso «Samāhito sampajāno» (Vedanā)","nota":"Mismo sandhi de niggahīta (§31) que vedanānañca: maggaṃ + ca. Primera lectura del motor, señal «posible», sin afirmación por falta de autoridad. El caso la afirma; la regla general de la familia espera firma."},{"forma":"cetā","sandhi":true,"componentes":"ca + etā","fuente":"IEBH, 2026-08-28 · verso «Samāhito sampajāno» (Vedanā): «yattha cetā nirujjhanti»","nota":"En palabras del IEBH: «in this verse cetā is sandhi ca etā». El motor producía ca + etā (§12) como primera lectura, pero la señal callaba del todo: la detección busca la enclítica como SEGUNDA voz (…ñca, …ti, …pi) y aquí la partícula es la PRIMERA — el punto ciego estructural de tenupasaṅkami, ahora del lado proclítico. La familia entera (cāyaṃ, cassa, cetaṃ, cidaṃ… y las gemelas con na-, sv-, yv-) es candidata a regla de primera voz; no existe todavía mecanismo de patrón por primera voz: decidirlo pide firma."},{"forma":"phusitva","sandhi":false,"fuente":"IEBH, 2026-08-28 · comentario de Vedanā («Phussa phussa vayaṁ passanti…»)","nota":"En palabras del IEBH: «phusitva is actually phusitvā, an absolutive» — voz entera, escrita sin la ā final en la fuente pegada (la misma frase trae «phusitvā» bien escrito al lado). La señal proponía phusita + va («posible»); falso: no hay juntura, hay una vocal final abreviada en la transmisión. El motor no corrige la edición ni la entrada: calla."},{"forma":"passanto","sandhi":false,"fuente":"IEBH, 2026-08-28 · comentario de Vedanā («Phussa phussa vayaṁ passanti…»)","nota":"En palabras del IEBH: «passanto, present participle, identified as sandhi» — participio presente, voz entera. La señal proponía passa + anto («posible»); falso. Compárese con «navo» y «pajānāti»: la flexión corriente no es juntura. La des-flexión por paradigmas (mapa de la sesión 32, punto 6) es la señal que mataría esta clase entera de falsos candidatos."},{"forma":"idamavoca","sandhi":true,"componentes":"idaṃ + avoca","fuente":"IEBH, 2026-08-28 · pasaje de Kassapo devaputto (SN)","nota":"En palabras del IEBH: «idamavoca = idaṃ avoca. There are many of these in the whole Tipiṭaka». El motor ya producía idaṃ + avoca (§34, la ṃ se hace m ante vocal) como PRIMERA lectura, pero la señal callaba: «avoca» no es nipāta y la capa «posible» no la ve — la misma clase estructural de tenupasaṅkami. La familia entera (§34 con segunda voz corriente: kimahaṃ = kiṃ + ahaṃ, etc.) es candidata a regla firmada; medirla antes de firmarla."},{"forma":"idamavocaṃ","sandhi":true,"componentes":"idaṃ + avocaṃ","fuente":"IEBH, 2026-08-28 · serie de idamavoca (SN)","nota":"De la serie señalada por el IEBH junto a idamavoca. §34; el motor la producía primera con señal «posible»; el caso la afirma."},{"forma":"idamavocuṃ","sandhi":true,"componentes":"idaṃ + avocuṃ","fuente":"IEBH, 2026-08-28 · serie de idamavoca (SN)","nota":"De la serie señalada por el IEBH junto a idamavoca. §34; el motor la producía primera con señal «posible»; el caso la afirma."},{"forma":"idamavocāyasmā","sandhi":true,"componentes":"idaṃ + avoca + āyasmā","fuente":"IEBH, 2026-08-28 · serie de idamavoca (SN)","nota":"En palabras del IEBH: «idamavocāyasmā = idaṃ avoca āyasmā». TRES voces: dos junturas (§34 y elisión ante āyasmā). El motor de hoy propone un solo corte y no puede derivarla — es la mitad que falta del mapa de la sesión 32, punto 4 (combinar())—: el caso da la señal y muestra la lectura adjudicada como pendiente de derivación."},{"forma":"idamavocanti","sandhi":true,"componentes":"idaṃ + avocaṃ + iti","fuente":"IEBH, 2026-08-28 · serie de idamavoca (SN)","nota":"En palabras del IEBH: «idamavocanti = idam avocaṃ iti». TRES voces: §34 (ṃ → m ante vocal) y la cola de «iti» con la ṃ asimilada ante t (§31). Como idamavocāyasmā: el motor de un solo corte no la deriva todavía; el caso da la señal y la lectura adjudicada va primera, pendiente de derivación."},{"forma":"yenāyasmā","sandhi":true,"componentes":"yena + āyasmā","fuente":"IEBH, 2026-08-28 · MN 61 Ambalaṭṭhikarāhulovādasutta","nota":"En palabras del IEBH: «yenāyasmā = yen' āyasmā» — la voz subyacente es yena, con la a final elidida (§12), como tena en tenupasaṅkami: es la otra mitad de la MISMA fórmula («yenāyasmā Rāhulo tenupasaṅkami»). La señal callaba porque «āyasmā» no es nipāta — la clase estructural de tenupasaṅkami e idamavoca, que espera su regla firmada."},{"forma":"dūratova","sandhi":true,"componentes":"dūrato + eva","fuente":"IEBH, 2026-08-28 · MN 61 Ambalaṭṭhikarāhulovādasutta","nota":"Adjudicado por el IEBH, confirmado a la pregunta expresa: «it is dūrato eva» — el «va» de la superficie es eva con la e elidida (§13), no la partícula va suelta. El motor ya la producía primera; la señal callaba. La lectura dūrato + iva sigue visible, plegada."},{"forma":"coraṃ","sandhi":false,"fuente":"IEBH, 2026-08-28 · revisión en la página","nota":"En palabras del IEBH: «coraṁ is not sandhi». Voz entera (acusativo de cora). La señal de frecuencia proponía ca + oraṃ («posible»); falso."},{"forma":"evamidaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"evaṃ + idaṁ"},{"forma":"dīghamaddhānaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"dīghaṃ + addhānaṁ"},{"forma":"mamañceva","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"mamaṃ + ca + eva"},{"forma":"passasanto","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"Evameva","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"evaṃ + eva"},{"forma":"ajjhattabahiddhā","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"kāyanupassī","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"satova","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"sato + eva"},{"forma":"suññāgāragatovā","fuente":"IEBH, 2026-08-29 · adjudicado en el chat (pakati, §23)","sandhi":true,"componentes":"suññāgāragato + vā"},{"forma":"tenupasaṅkama","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"tena + upasaṅkama","nota":"El veredicto decía «ten' + upasaṅkama», la escritura moderna con la elisión ya hecha; la observación del mismo lote da las voces subyacentes («tenupasaṅkama = tena upasaṅkama»), que son las que el caso guarda — como su hermana tenupasaṅkami = tena + upasaṅkami, el primer caso del proyecto. Corregido a mano con esta nota, 2026-08-29."},{"forma":"evamāha","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"evaṃ + āha"},{"forma":"hime","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"hi + ime"},{"forma":"tenupasaṅkamiṃsu","fuente":"IEBH, 2026-08-29 · observaciones de la revisión en la página","sandhi":true,"componentes":"tena + upasaṅkamiṃsu"},{"forma":"tenupasaṅkamissāma","fuente":"IEBH, 2026-08-29 · observaciones de la revisión en la página","sandhi":true,"componentes":"tena + upasaṅkamissāma"},{"forma":"evamāhaṃsu","fuente":"IEBH, 2026-08-29 · observaciones de la revisión en la página","sandhi":true,"componentes":"evaṃ + āhaṃsu"},{"forma":"evamāhāro","fuente":"IEBH, 2026-08-29 · observaciones de la revisión en la página","sandhi":true,"componentes":"evaṃ + āhāro"},{"forma":"evamāhu","fuente":"IEBH, 2026-08-29 · observaciones de la revisión en la página","sandhi":true,"componentes":"evaṃ + āhu"},{"forma":"Evametaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"evaṃ + etaṃ"},{"forma":"Vesālikāpi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"vesālikā + api"},{"forma":"Allakappakāpi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"allakappakā + api"},{"forma":"Rāmagāmakāpi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"rāmagāmakā + api"},{"forma":"Veṭṭhadīpakopi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"veṭṭhadīpako + api"},{"forma":"Kosinārakāpi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"Kosinārakā + api"},{"forma":"thūpañca","fuente":"IEBH, 2026-08-29 · revisión en la página (confirmados thūpañca y Pāveyyakāpi en el chat)","sandhi":true,"componentes":"thūpaṃ + ca"},{"forma":"Kapilavatthuvāsīpi","fuente":"IEBH, 2026-08-29 · revisión en la página (confirmados thūpañca y Pāveyyakāpi en el chat)","sandhi":true,"componentes":"kapilavatthuvāsī + api"},{"forma":"Pāveyyakāpi","fuente":"IEBH, 2026-08-29 · revisión en la página (confirmados thūpañca y Pāveyyakāpi en el chat)","sandhi":true,"componentes":"Pāveyyakā + api"},{"forma":"Doṇopi","fuente":"IEBH, 2026-08-29 · revisión en la página (confirmados thūpañca y Pāveyyakāpi en el chat)","sandhi":true,"componentes":"doṇo + api"},{"forma":"Pippalivaniyāpi","fuente":"IEBH, 2026-08-29 · revisión en la página (confirmados thūpañca y Pāveyyakāpi en el chat)","sandhi":true,"componentes":"pippalivaniyā + api"},{"forma":"bhūtapubbanti","fuente":"IEBH, 2026-08-29 · revisión en la página (confirmados thūpañca y Pāveyyakāpi en el chat)","sandhi":true,"componentes":"bhūtapubbaṃ + iti"},{"forma":"sikkhitabbanti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"sikkhitabbaṃ + iti"},{"forma":"vattissāmā”ti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"vattissāma + iti"},{"forma":"paññāti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"paññā + iti"},{"forma":"mahantapātubhāvādīhi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"mahantapātubhāvatā","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"Ekañhi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"ekaṃ + hi"},{"forma":"upādinnakasantānepi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"upādinnakasantāne + api"},{"forma":"paññāsañca","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"paññāsaṃ + ca"},{"forma":"anupādinnakasantānepi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"anupādinnakasantāne + api"},{"forma":"mahantapātubhāvatoti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"mahantapātubhāvato + iti"},{"forma":"mahābhūtānī”ti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"mahābhūtāni + iti"},{"forma":"cāti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"ca + iti"},{"forma":"Mahābhūtāti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"mahābhūtā + iti"},{"forma":"tenassa","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"tena + assa"},{"forma":"Pabbajitampi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"pabbajitaṃ + api"},{"forma":"teneva","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"tena + eva"},{"forma":"velaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"cesā","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"ca + esā"},{"forma":"atikkamiyeva","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"atikkami + yeva"},{"forma":"Moḷiyaphaggunoti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"moḷiyaphagguno + iti"},{"forma":"tividhampi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"tividhaṃ + api"},{"forma":"Sotaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"Mano","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"kenacideva","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"kenacid + eva"},{"forma":"caṅkamati","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"natthi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"dhammiko","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"panettha","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"pana + ettha"},{"forma":"nisīdā”ti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"nisīda + iti"},{"forma":"Etadeva","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"etaṃ + eva"},{"forma":"caṅkamantaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"svāyaṃ","sandhi":true,"componentes":"so + ayaṃ","fuente":"IEBH, 2026-08-29 · en el chat, sobre el informe de proclíticas","nota":"En palabras del IEBH: «svāyam is always so ayaṃ». Grado EXCLUSIVO, como hotīti: no se ofrece otra lectura. De la clase proclítica —la partícula o el pronombre es la PRIMERA voz—, que no tiene todavía mecanismo de patrón: mientras no lo tenga, el caso es la vía."},{"forma":"netaṃ","sandhi":true,"componentes":"na + etaṃ","grado":"habitual","fuente":"IEBH, 2026-08-29 · en el chat, sobre el informe de proclíticas","nota":"En palabras del IEBH: «mostly cetā = ca etā and netaṃ = na etaṃ». Grado HABITUAL, no exclusivo, como ceva: se afirma la lectura habitual y las demás quedan a la vista, plegadas. Su gemela cetā ya era caso desde el 2026-08-28."},{"forma":"dhammoti","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"dhammo + iti"},{"forma":"Ghoṭamukhopi","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"ghoṭamukho + api"},{"forma":"tañca","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"taṃ + ca"},{"forma":"Ekamidāhaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"ekaṃ + idha + ahaṃ","escalera_iebh":["ekaṃ idha ahaṃ","ekam idha ahaṃ (§34)","— y para «idha ahaṃ»:","idha ahaṃ","idh a ahaṃ (§10)","idh ahaṃ (§12)","ida ahaṃ (§20)","id a ahaṃ (§10)","id ahaṃ (§12)","id āhaṃ (§15)","idāhaṃ (§11)"],"escalera_fuente":"IEBH, 2026-08-29 · observaciones del lote 22:48 (verbatim)"},{"forma":"balavā","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"atṭṭhasaṭṭhibhikkhusatasahassaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"Asoko","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"-pa-","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"jīvati","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":false},{"forma":"yaṁnūnāhaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"yaṃ + nūna + ahaṃ","escalera_iebh":["yaṃ nūna ahaṃ","yaṃ nūn a ahaṃ (§10)","yaṃ nūn ahaṃ (§12)","yaṃ nūn āhaṃ (§15)","yaṃ nūnāhaṃ (§11)"],"escalera_fuente":"IEBH, 2026-08-29 · observaciones del lote 22:48 (verbatim)"},{"forma":"khvāhaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"kho + ahaṃ","escalera_iebh":["kho ahaṃ","kh o ahaṃ (§10)","kh v ahaṃ (§18)","kh v āhaṃ (§15)"],"escalera_fuente":"IEBH, 2026-08-29 · observaciones del lote 22:48 (verbatim)"},{"forma":"yenāhaṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"yena + ahaṃ","nota":"El IEBH: «yenāhaṁ = yena ahaṃ this is easy to do the sequence»."},{"forma":"pāturahosiṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"pātu + ahosiṃ","escalera_iebh":["pātu ahosiṃ","pātur ahosiṃ (§35)"],"escalera_fuente":"IEBH, 2026-08-29 · observaciones del lote 22:48 (verbatim)","nota":"COMPONENTES CORREGIDOS a mano, 2026-08-29, con las palabras del IEBH en el mismo lote: «pāturahosiṁ = pātu ahosiṃ → pātur ahosiṃ §35». El caso guardaba «pātur + ahosiṃ», que es la voz con la consonante de §35 ya insertada, no la voz subyacente. Mismo arreglo y mismo motivo que tenupasaṅkama. Y el aviso del IEBH, que vale para toda una familia: «take note of this because it happens frequently»."},{"forma":"etadavocuṁ","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"etaṃ + avocuṃ","nota":"Pregunta del IEBH en el mismo lote: «I don't understand why you didn't catch this one when we have met etadavoca = etaṃ avoca». La respuesta es §34 con segunda voz corriente: hoy NO es patrón, así que cada forma de la familia hay que adjudicarla una a una — etadavoca, idamavoca, idamavocaṃ, evamāha… Es exactamente lo que la firma de §34 (aprobada el 2026-08-29, sin implementar) viene a resolver de un golpe."},{"forma":"sabbesaṁyeva","fuente":"IEBH, 2026-08-29 · revisión en la página","sandhi":true,"componentes":"sabbesaṃ + eva","escalera_iebh":["sabbesaṃ eva","sabbesaṃ y eva (§35)","sabbesaṁyeva (§11)"],"escalera_fuente":"IEBH, 2026-08-29 · observaciones del lote 22:48 (verbatim)","nota":"COMPONENTES CORREGIDOS a mano, 2026-08-29, con las palabras del IEBH en el mismo lote: «sabbesaṁyeva = sabbesaṃ eva → sabbesaṃ y eva §35 → sabbesaṁyeva §11». El caso guardaba «sabbesaṁ + yeva», con la «y» de §35 pegada a la segunda voz. Mismo arreglo y mismo motivo que tenupasaṅkama."},{"forma":"tattheva","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"tattha + eva"},{"forma":"gacchatha","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"jānāthā”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"jānātha + iti"},{"forma":"tiṇacchadana3n”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"tiṇacchadanaṃ + iti","nota":"COMPONENTES CORREGIDOS a mano, 2026-08-30: el campo guardó «tiṇacchadananti + = + tiṇacchadanaṃ + iti» porque el revisor escribió la ecuación entera («voz = componentes») en el campo que sólo esperaba los componentes, y el separador la tragó. Su veredicto, inequívoco en la propia ecuación, es «tiṇacchadanaṃ + iti». El campo de la página y el incorporador quedan endurecidos el mismo día para que no vuelva a pasar."},{"forma":"karothāti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"karotha + iti"},{"forma":"karontī”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"karonti + iti"},{"forma":"ovassatīti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"ovassati + iti"},{"forma":"Haratha","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"bhadramukhāti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"bhadramukha + iti"},{"forma":"abhivissattho”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"abhivissattho + iti"},{"forma":"khvāssa","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"kho + assa"},{"forma":"etadahosi","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"etaṃ + ahosi"},{"forma":"uttiṇamakaṁsu","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"uttiṇaṃ + akaṁsu"},{"forma":"sabbantaṁ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"kumbhakāroti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"kumbhakāro + iti"},{"forma":"Ghaṭikāraṁ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"cāyaṁ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"ca + ayaṃ"},{"forma":"yāva","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"hevaṁ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"hi + evaṃ","nota":"COMPONENTES CORREGIDOS a mano, 2026-08-30: el campo guardó «hevaṃ + = + hi + evaṃ» porque el revisor escribió la ecuación entera («voz = componentes») en el campo que sólo esperaba los componentes, y el separador la tragó. Su veredicto, inequívoco en la propia ecuación, es «hi + evaṃ». El campo de la página y el incorporador quedan endurecidos el mismo día para que no vuelva a pasar."},{"forma":"khāyatī”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"khāyati + iti"},{"forma":"evamayaṁ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"evaṃ + ayaṃ"},{"forma":"nātivattati","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"na + ativattati"},{"forma":"atthītissa","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"atthi + iti + assa"},{"forma":"viññāṇanti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"viññāṇaṃ + iti"},{"forma":"nāmarūpanti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"nāmarūpaṃ + iti"},{"forma":"phassoti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"phasso + iti"},{"forma":"vedanāti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"vedanā + iti"},{"forma":"taṇhāti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"taṇhā + iti"},{"forma":"upādānanti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"upādānaṃ + iti"},{"forma":"bhavoti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"bhavo + iti"},{"forma":"jātīti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"jāti + iti"},{"forma":"iccassa","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"iti + assa"},{"forma":"jāti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false,"nota":"Nota del revisor (verbatim): jāti is noun that means birth"},{"forma":"evametassa","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"evaṃ + etassa"},{"forma":"panetaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"pana + etaṃ"},{"forma":"tadānanda","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"tadā + ānanda","escalera_iebh":["tadā ānanda","tad ā ānanda (§10)","tad ānanda (§12)","tadānanda (§11)"],"escalera_fuente":"IEBH, 2026-08-30 · observaciones del lote 13:46 (verbatim)"},{"forma":"imināpetaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"iminā + api + etaṃ","nota":"Nota del revisor (verbatim): please note that I made a mistake in the recorded phrase. It should be imināpetaṃ = iminā api etaṃ. — Corrige el veredicto anterior, «iminā + pi + etaṃ», incorporado el 2026-08-30 desde el mismo lote: la enmienda venía en las observaciones, que el incorporador no lee.","escalera_iebh":["iminā api etaṃ","imin ā api etaṃ (§10)","imin api etaṃ (§12)","imin āpi etaṃ (§13)","imin āp i etaṃ (§10)","imin āp etaṃ (§12)","imināpetaṃ (§11)"],"escalera_fuente":"IEBH, 2026-08-30 · observaciones del lote 13:46 (verbatim)"},{"forma":"nābhavissa","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"na + abhavissa"},{"forma":"sabbenasabbaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"sabbena + sabbaṃ"},{"forma":"sabbathāsabbaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"sabbathā + sabbaṃ"},{"forma":"sarisapānaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"hetaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"hi + etaṃ"},{"forma":"tasmātihānanda","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"tasmā + tiha + ānanda","nota":"Nota del revisor (verbatim): Include this explanation every time 'tasmātiha' (= tasmā iha) is found. La «t» (§35) se inserta para evitar hiato entre la vocal final de «tasmā» y la vocal inicial de «iha». El indeclinable «iha» tiene el mismo significado que «idha», aquí.","escalera_derivada":["tasmā iha","tasmā t iha (§35)","tasmātiha (§11)","tasmātih a ānanda (§10)","tasmātih ānanda (§12)","tasmātihānanda (§11)"],"escalera_derivada_fuente":"Derivada por combinar_varias() y verificada por recomposición (2026-08-30): única cadena de las candidatas que reproduce la forma atestiguada. La primera juntura es la que el revisor explica en la nota. Los componentes guardados dicen «tiha»; la derivación arranca de «iha», que es «tiha» sin la «t» de §35 — pendiente de su parecer."},{"forma":"eseva","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"eso + eva","nota":"Nota del revisor (verbatim): eso + eva"},{"forma":"yadidaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"yaṃ + idaṃ"},{"forma":"paññāyethāti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"paññāyetha + iti","escalera_iebh":["paññāyetha iti","paññāyeth a iti §10","paññāyeth a ti §13","paññāyeth ā ti §16","paññāyethāti §11"],"escalera_fuente":"IEBH, 2026-08-30 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"ārakkho","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"kalaha","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"dveme","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"dve + ime"},{"forma":"pabbajitena","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"Katamā","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"sammā-ājīvo","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"yampicchaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"yaṃ + api + icchaṃ"},{"forma":"jātipi","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"jāti + api","escalera_iebh":["jāti api","jāt i api §10","jāt i pi §13","jātipi §11"],"escalera_fuente":"IEBH, 2026-08-30 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"jarāpi","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"jarā + api","escalera_iebh":["jarā api","jar ā api §10","jar ā pi §13","jarāpi §11"],"escalera_fuente":"IEBH, 2026-08-30 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"byādhipi","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"byādhi + api","escalera_iebh":["byādhi + api","byādh i api §10","byādh i pi §13","byādhipi §11"],"escalera_fuente":"IEBH, 2026-08-30 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"maraṇampi","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"maraṇaṃ + api"},{"forma":"tampi","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"taṃ + api"},{"forma":"ayameva","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"ayaṃ + eva"},{"forma":"tassāyeva","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"tassā + yeva"},{"forma":"panidaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"pana + idaṃ"},{"forma":"sacchikatan”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"sacchikataṃ + iti"},{"forma":"sacchikātabban”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"sacchikātabbaṃ + iti"},{"forma":"ariyasaccan”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"ariyasaccaṃ + iti"},{"forma":"bhāvetabban”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"bhāvetabbaṃ + iti"},{"forma":"bhāvitan”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"bhāvitaṃ + iti"},{"forma":"neva","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"na + eva","escalera_iebh":["na + eva","n a eva"],"escalera_fuente":"IEBH, 2026-08-30 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"yāvakīvañca","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"yāvakīvaṃ + ca"},{"forma":"abhisambuddhoti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"abhisambuddho + iti"},{"forma":"tāvāhaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"tāva + ahaṃ"},{"forma":"athāhaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"atha + ahaṃ"},{"forma":"page","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false,"nota":"Nota del revisor (verbatim): this is the page number pasted by mistake."},{"forma":"ayamantimā","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"ayaṃ + antimā"},{"forma":"abhinandunti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"abhinanduṃ + iti"},{"forma":"natthidāni","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"natthi + idāni"},{"forma":"ñāṇañca","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"ñāṇaṃ + ca"},{"forma":"punabbhavoti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"punabbhavo + iti"},{"forma":"nirodhadhammanti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"nirodhadhammaṃ + iti"},{"forma":"pavattitaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":false},{"forma":"saddamanussāvesuṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"saddaṃ + anussāvesuṃ"},{"forma":"lokasmin”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"lokasmiṃ + iti"},{"forma":"Itiha","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"iti + ha"},{"forma":"ayañca","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"ayaṃ + ca"},{"forma":"saṅkampi","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"saṅkaṃ + api"},{"forma":"sampakampi","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"sampakaṃ + api"},{"forma":"pāturahosi","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"pātur + ahosi"},{"forma":"hidaṃ","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"hi + idaṃ"},{"forma":"devānubhāvanti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"devānubhāvaṃ + iti"},{"forma":"Koṇḍañño”ti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"koṇḍañño + iti"},{"forma":"ahosīti","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"ahosi + iti"},{"forma":"idhānanda","fuente":"IEBH, 2026-08-30 · precisión en la sesión","sandhi":true,"componentes":"idha + ānanda"},{"forma":"hānanda","fuente":"IEBH, 2026-08-30 · precisión en la sesión","sandhi":true,"componentes":"hi + ānanda"},{"forma":"tesamayaṃ","fuente":"IEBH, 2026-08-30 · precisión en la sesión","sandhi":true,"componentes":"tesaṃ + ayaṃ"},{"forma":"aññāsikoṇḍaññotveva","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"iti + eva","nota":"Nota del revisor (verbatim): I am seeing the \"tveva\" sometimes can mean \"iti eva\" and sometimes can mean \"tu eva\". For example in the following \"sabbe kāmā ‘kāmā’ tveva saṅkhaṃ gacchanti\", \"tveva\" is \"iti eva\" but in \"avijjāya tveva\", \"tveva\" is \"tu eva\". In this case it is \"iti eva\". — La autoridad del paso 'i' → 'v' ante la 'e' de «eva» es Saddanīti Suttamālā 49 «Evass' ekāre itiss' aññassa c' issa vo», cotejada contra Helmer Smith, Saddanīti III, p. 617, que da entre sus cuatro ejemplos «Isigili tv eva» y «Samantapāsādikā tv eva» — la misma fórmula del nombre. Kaccāyana no tiene sutta correspondiente: el aparato de Smith da «Kc» para los suttas 50 y 51 y ninguno para el 49.","escalera_iebh":["aññāsikoṇḍañño iti eva","aññāsikoṇḍaññ o iti eva §10","aññāsikoṇḍaññ o ti eva §13","aññāsikoṇḍaññ o tv eva Saddanīti Suttamālā §49","aññāsikoṇḍaññotveva §11"],"escalera_fuente":"IEBH, 2026-08-30 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"tveva","fuente":"IEBH, 2026-08-30 · revisión en la página","sandhi":true,"componentes":"ti + eva","nota":"Nota del revisor (verbatim): La autoridad es Saddanīti Suttamālā 49, «Evass' ekāre itiss' aññassa c' issa vo» — ante la 'e' de «eva», la 'i' de «iti» se sustituye por 'v' —, cotejada contra Helmer Smith, Saddanīti III, p. 617, entre cuyos cuatro ejemplos están «Isigili tv eva» y «Samantapāsādikā tv eva», que son la misma fórmula del nombre que «“Aññāsikoṇḍañño” tveva». Kaccāyana no tiene sutta correspondiente. ADVERTENCIA, y es del proyecto, no del revisor: «tveva» tiene una segunda lectura con autoridad propia, «tu + eva» por Kaccāyana §18, que es la correcta en «avijjāya tveva» (voz unida «avijjāyatveva», 14 veces en la edición). La ficha admite UNA lectura por forma y el motor analiza una voz por vez, sin ver la vecina, de modo que aquí se afirma la citativa y la otra deja de mostrarse. Véase docs/solucionador/tveva-dos-lecturas.md."},{"forma":"avijjāyatveva","fuente":"IEBH, 2026-08-30 · precisión en la sesión","sandhi":true,"componentes":"tu + eva","nota":"Nota del revisor (verbatim): Aquí «tveva» es «tu + eva» por Kaccāyana §18, «Vam od-udantānaṃ» — 'o' y 'u' finales se sustituyen por 'v' ante vocal —, y no la lectura citativa. Es la otra mitad del par que el IEBH identificó el 2026-08-30: «sabbe kāmā ‘kāmā’ tveva saṅkhaṃ gacchanti» es citativo y «avijjāya tveva» no lo es. La clave es la voz unida porque la ficha admite una lectura por forma y «tveva» suelto está adjudicado como citativo; donde la edición imprime las dos voces separadas, el motor ve «tveva» y dará la citativa, que ahí no corresponde. Véase docs/solucionador/tveva-dos-lecturas.md.","escalera_iebh":["avijjāya tu eva","avijjāya t u eva (§10)","avijjāya t v eva (§18)","avijjāyatveva (§11)"],"escalera_fuente":"IEBH, 2026-08-30 · precisión en la sesión · escalera del revisor (verbatim)"},{"forma":"Dvemāni","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"Dve + imāni"},{"forma":"pīti","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":false},{"forma":"pubbeva","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"pubbe + eva"},{"forma":"sampajaññañca","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"sampajaññaṃ + ca"},{"forma":"sukhavihārī”ti","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"sukhavihārī + iti"},{"forma":"nissaraṇan”ti","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"nissaraṇaṃ + iti"},{"forma":"vivicceva","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"vivicca + eva"},{"forma":"kirame","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"kira + ime"},{"forma":"paṭiventī”ti","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"paṭiventi + iti","escalera_iebh":["paṭiventi iti","paṭivent i iti §10","paṭivent iti §12","paṭivent īti §15","paṭiventīti §11"],"escalera_fuente":"IEBH, 2026-08-31 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"caparaṃ","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"ca + aparaṃ"},{"forma":"sukhañca","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"sukhaṃ + ca"},{"forma":"atthitvevassa","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"atthi + iti + eva + assa","escalera_iebh":["atthi + iti + eva + assa","atthi iti eva assa","atth i iti eva assa §10","atth iti eva assa §12","atth it i eva assa §10","atth it v eva assa Saddanīti Suttamālā §49","atth it v ev a assa §10","atth it v ev assa §12","atthitvevassa §11"],"escalera_fuente":"IEBH, 2026-08-31 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"māṇavako","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":false},{"forma":"paṭikacceva","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"paṭikacca + eva"},{"forma":"abhirameyyāmahaṃ","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"abhirameyyāmi + ahaṃ"},{"forma":"dānāhaṃ","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"dāni + ahaṃ"},{"forma":"paṭikūlā”ti","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"paṭikūlā + iti"},{"forma":"etamatthaṃ","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"etaṃ + atthaṃ"},{"forma":"ācikkhitunti","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"ācikkhituṃ + iti"},{"forma":"duvaggenapi","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"duvaggena + api"},{"forma":"tivaggenapi","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"tivaggena + api"},{"forma":"upasampādetunti","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":true,"componentes":"upasampādetuṃ + iti"},{"forma":"ācikkheyyātha","fuente":"IEBH, 2026-08-31 · revisión en la página","sandhi":false},{"forma":"Sotena","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":false},{"forma":"bhikkhavo”ti","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"bhikkhavo + iti"},{"forma":"Bhadante”ti","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"bhadante + iti"},{"forma":"vatteti","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":false},{"forma":"bahudhāpi","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"bahudhā + api"},{"forma":"Pathaviyāpi","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"pathaviyā + api"},{"forma":"Udakepi","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"udake + api"},{"forma":"Ākāsepi","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"ākāse + api"},{"forma":"Sadosaṃ","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":false},{"forma":"cittan”ti","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"cittaṃ + iti"},{"forma":"suṇāti","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":false},{"forma":"Sa-uttaraṃ","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":false},{"forma":"ekampi","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"ekaṃ + api"},{"forma":"dvepi","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"dve + api"},{"forma":"sa-uddesaṃ","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":false},{"forma":"bhonto","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":false},{"forma":"upapannā”ti","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"upapannā + iti"},{"forma":"diṭṭheva","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"diṭṭhe + eva"},{"forma":"ekopi","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"eko + api"},{"forma":"Imepi","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"ime + api"},{"forma":"brahmalokāpi","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"brahmalokā + api","escalera_iebh":["brahmalokā api"],"escalera_fuente":"IEBH, 2026-09-01 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"Evamevaṃ","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"evaṃ + evaṃ"},{"forma":"aṅgantveva","fuente":"IEBH, 2026-09-01 · revisión en la página","sandhi":true,"componentes":"aṅgaṃ + iti + eva"},{"forma":"avekkhatha","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":false},{"forma":"tevijjābhāvappattito","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":false},{"forma":"tāvimaṃ","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"tāva + imaṃ"},{"forma":"idānimhi","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"idāni + amhi"},{"forma":"vuttanayameva","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"vuttanayaṃ + eva"},{"forma":"vuṭṭhāsinti","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"vuṭṭhāsiṃ + iti"},{"forma":"aniccātipi","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"aniccā + iti + api"},{"forma":"dukkhātipi","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"dukkhā + iti + api"},{"forma":"anattātipi","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"anattā + iti + api"},{"forma":"vipassathāti","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"vipassatha + iti"},{"forma":"Idañca","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"idaṃ + ca"},{"forma":"aññesañca","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"aññesaṃ + ca"},{"forma":"Paṭācārānusāsaninti","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"paṭācārānusāsaniṃ + iti"},{"forma":"sāsanan”tipi","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"sāsanaṃ + iti + api"},{"forma":"Ayampi","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"ayaṃ + api"},{"forma":"vimuccatī”ti","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"vimuccati + iti"},{"forma":"katakiccā”ti","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"katakiccā + iti"},{"forma":"anusāsanī”ti-ādi","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"anusāsanī + iti"},{"forma":"sukkhaḍākaṃva","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"sukkhaḍākaṃ + iva"},{"forma":"kumbhiyanti","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"kumbhiyaṃ + iti"},{"forma":"abhāsitthāti","fuente":"IEBH, 2026-09-02 · revisión en la página","sandhi":true,"componentes":"abhāsittha + iti"},{"forma":"sugatīsuyeva","fuente":"IEBH, 2026-09-03 · revisión del lote de un estudiante","sandhi":true,"componentes":"sugatīsu + eva"},{"forma":"Guttātissā","fuente":"IEBH, 2026-09-03 · revisión del lote de un estudiante","sandhi":true,"componentes":"guttā + iti + assā","escalera_iebh":["guttā iti assā","gutt ā iti assā (§10)","gutt ā ti assā (§13)","gutt ā t i assā (§10)","gutt ā t i ssā (§13)","guttātissā (§11)"],"escalera_fuente":"IEBH, 2026-09-03 · revisión del lote de un estudiante · escalera del revisor (verbatim)"},{"forma":"yathānisinnova","fuente":"IEBH, 2026-09-03 · revisión del lote de un estudiante","sandhi":true,"componentes":"yathā + nisinno + eva"},{"forma":"tatthevantaradhāyi","fuente":"IEBH, 2026-09-03 · revisión del lote de un estudiante","sandhi":true,"componentes":"tattha + eva + antaradhāyi","nota":"Nota del revisor (verbatim): falta la sequencia a este sandhi adjudicado"},{"forma":"orako","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false},{"forma":"cirasseva","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"cirassa + eva"},{"forma":"Cālaṃ","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false},{"forma":"athassa","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"atha + assa"},{"forma":"upaṭṭhapetvānāti-ādikā","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"upaṭṭhapetvānāti-ādikā: upaṭṭhapetvāna + iti + ādikā","escalera_iebh":["upaṭṭhapetvāna iti ādikā"],"escalera_fuente":"IEBH, 2026-09-05 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"Cālāti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"cālā + iti"},{"forma":"Upacālāti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"upacālā + iti"},{"forma":"Sīsūpacālāti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"sīsūpacālā + iti"},{"forma":"tissopi","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"tisso + api"},{"forma":"puttānampi","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"puttānaṃ + api"},{"forma":"idameva","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"idaṃ + eva"},{"forma":"Sīsūpacāle”ti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"sīsūpacāle + iti"},{"forma":"pabbajī”ti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"pabbaji + iti"},{"forma":"pabbajito”ti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"pabbajito + iti"},{"forma":"etadavocā”ti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"etaṃ + avoca + iti","escalera_iebh":["etaṃ avoca iti"],"escalera_fuente":"IEBH, 2026-09-05 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"vicchinditukāmo","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false,"nota":"Nota del revisor (verbatim): es sandhi interno"},{"forma":"muṇḍāsī”ti-ādiṃ","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"muṇḍāsī”ti-ādiṃ: muṇḍā + asi + iti + ādiṃ","escalera_iebh":["muṇḍā asi iti ādiṃ"],"escalera_fuente":"IEBH, 2026-09-05 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"katakiccabhāvavibhāvanena","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false},{"forma":"visayātikkamaṃ","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false,"nota":"Nota del revisor (verbatim): es sandhi interno"},{"forma":"vatthuhi","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false},{"forma":"vuttameva","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"vuttaṃ + eva"},{"forma":"sativepullappattiyā","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false},{"forma":"paññāvepullappattiyā","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false},{"forma":"Buddhādīhi","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false},{"forma":"Kinnu","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"kinnu: kiṃ + nu","escalera_iebh":["kiṃ nu","kin nu §31","kinnu §11"],"escalera_fuente":"IEBH, 2026-09-05 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"rocesī”ti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"rocesi + iti"},{"forma":"upahāretukāmena","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":false},{"forma":"rocemī”ti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"rocema + iti"},{"forma":"kāmāpi","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"kāma + api","escalera_iebh":["kāmā api","kām ā api §10","kām api §12","kām āpi §15","kāmāpi §11"],"escalera_fuente":"IEBH, 2026-09-05 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"paribhuñjitabbāti","fuente":"IEBH, 2026-09-05 · revisión en la página","sandhi":true,"componentes":"paribhuñjitabbāti: paribhuñjitabbā + iti","escalera_iebh":["paribhuñjitabbā iti"],"escalera_fuente":"IEBH, 2026-09-05 · revisión en la página · escalera del revisor (verbatim)"},{"forma":"dhammamadesesi","fuente":"IEBH, 2026-09-06 · revisión del lote de un estudiante","sandhi":true,"componentes":"dhammaṃ + adesesi"},{"forma":"māhu","fuente":"IEBH, 2026-09-06 · revisión del lote de un estudiante","sandhi":true,"componentes":"mā + ahu","nota":"Nota del revisor (verbatim): El prohibitivo «mā» con el aoristo «ahu», no «āhu» de «āha». Lo fija el pasaje: «Bhuñjāhi kāmaratiyo, m’ āhu pacchānutāpinī ti» (Thī 190; y Selā, Thī III 57-59), que el proyecto vierte «no seas una que se arrepienta después»."},{"forma":"tvamasi","fuente":"IEBH, 2026-09-06 · revisión del lote de un estudiante","sandhi":true,"componentes":"tvaṃ + asi"},{"forma":"tassāhaṃ","fuente":"IEBH, 2026-09-06 · revisión del lote de un estudiante","sandhi":true,"componentes":"tassa + ahaṃ","nota":"Nota del revisor (verbatim): Lectura adjudicada para Cālā 187 y Upacālā 194, donde el antecedente es masculino: «Atthi Sakyakule jāto, Buddho appaṭipuggalo. So me dhammam adesesi». ATENCIÓN: la forma se resuelve por el género del antecedente y NO por regla alguna; las dos lecturas recomponen con la misma secuencia desde el segundo paso. En Candā 126, Vijayā 172 y Uttarā 178 el antecedente es femenino y la lectura es «tassā + ahaṃ». Mientras la ficha admita una sola lectura por forma, este caso la afirma también donde no vale."},{"forma":"muṇḍāsi","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"muṇḍā + asi"},{"forma":"kimidaṃ","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"kiṃ + idaṃ"},{"forma":"caṭṭhaṅgikaṃ","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"ca + aṭṭhaṅgikaṃ"},{"forma":"antakā”ti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"antakā + iti"},{"forma":"upaṭṭhapetvānāti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"upaṭṭhapetvāna + iti"},{"forma":"Bhikkhunīti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"bhikkhunī + iti"},{"forma":"Bhāvitindriyāti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"bhāvitindriyā + iti"},{"forma":"bhāvitasaddhādipañcindriyā","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":false},{"forma":"santanti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"santaṃ + iti"},{"forma":"Saṅkhārūpasamanti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"saṅkhārūpasamaṃ + iti"},{"forma":"Sukhanti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"sukhaṃ + iti"},{"forma":"uddissā”ti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"uddissa + iti"},{"forma":"tesañca","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"tesaṃ + ca"},{"forma":"muṇḍāva","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"muṇḍā + eva"},{"forma":"pāsaṇḍeti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"pāsaṇḍe + iti"},{"forma":"tāpasaparibbājakādīnaṃ","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":false},{"forma":"samayantare","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":false},{"forma":"momuhāti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"momuhā + iti"},{"forma":"nāmidaṃ","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"nāma + idaṃ"},{"forma":"kālikaṃ","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":false},{"forma":"paribbhamasīti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"paribbhamasi + iti"},{"forma":"bahiddhā”ti-ādimāha","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"bahiddhā + iti + ādiṃ + āha"},{"forma":"kuṭīsakabahukārādikā","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":false},{"forma":"diṭṭhipāsañca","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"diṭṭhipāsaṃ + ca"},{"forma":"oḍḍentīti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"oḍḍenti + iti"},{"forma":"pāsaṇḍāti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"pāsaṇḍā + iti"},{"forma":"tenāha","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"tena + āha"},{"forma":"upanissitā”ti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"upanissitā + iti"},{"forma":"ādiyiṃsūti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"ādiyiṃsu + iti"},{"forma":"yadaggena","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"yaṃ + aggena"},{"forma":"tadaggena","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"taṃ + aggena"},{"forma":"vijānantīti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"vijānanti + iti"},{"forma":"pāsaṇḍino","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":false},{"forma":"sassatadiṭṭhigatasannissitā","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":false},{"forma":"pavattatī”ti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"pavattati + iti"},{"forma":"pavattidhammampi","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"pavattidhammaṃ + api"},{"forma":"kovidāti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"kovidā + iti"},{"forma":"nivattatī”ti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"nivattati + iti"},{"forma":"nivattidhammassāpi","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"nivattidhammassa + api"},{"forma":"pavattidhammamaggepi","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"pavattidhammamagge + api"},{"forma":"kimaṅgaṃ","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"kiṃ + aṅgaṃ"},{"forma":"nivattidhammeti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"nivattidhamme + iti"},{"forma":"muṇḍāsīti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"muṇḍā + asi + iti"},{"forma":"jāto”ti-ādivuttaṃ","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"jāto + iti + ādi + vuttaṃ"},{"forma":"samatikkamanti","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":true,"componentes":"samatikkamaṃ + iti"},{"forma":"samatikkamanupāyaṃ","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":false},{"forma":"diṭṭhijālaviniveṭhanaṃ","fuente":"IEBH, 2026-09-07 · revisión en la página","sandhi":false},{"forma":"sabbesūti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"sabbesu + iti"},{"forma":"Bhūtesūti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"bhūtesu + iti"},{"forma":"Ayamettha","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"ayaṃ + ettha"},{"forma":"Nidhāyāti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"nidhāya + iti"},{"forma":"Daṇḍanti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"daṇḍaṃ + iti"},{"forma":"kāyavacīmanodaṇḍaṃ","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":false},{"forma":"daṇḍayatīti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"daṇḍayati + iti"},{"forma":"pāpetīti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"pāpeti + iti"},{"forma":"Aviheṭhayanti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"aviheṭhayaṃ + iti"},{"forma":"aviheṭhayanto","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":false},{"forma":"Tesanti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"tesaṃ + iti"},{"forma":"khetrajo","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":false},{"forma":"dinnako","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":false},{"forma":"antevāsikoti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"antevāsiko + iti"},{"forma":"sahāyanti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"sahāyaṃ + iti"},{"forma":"iccheyyāti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"iccheyya + iti"},{"forma":"Ekoti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"eko + iti"},{"forma":"ekantavigatakilesoti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"ekantavigatakileso + iti"},{"forma":"Samaṇasahassassāpi","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"samaṇasahassassa + api"},{"forma":"kappeti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":false,"nota":"Nota del revisor (verbatim): No es juntura sino verbo, con «seyyaṁ» por objeto y en serie con otros verbos: «Eko tiṭṭhati, eko gacchati, eko nisīdati, eko seyyaṁ kappeti, eko iriyati vattatīti» (Khaggavisāṇasuttavaṇṇanā). El motor la daba por «kappe + iti» con señal SEGURA, por el patrón adjudicado de las enclíticas del 2026-08-28: es un falso positivo de ese patrón, que alcanza a 1.921 formas y a 128 acabadas en «-eti», donde un verbo de la séptima conjugación no se distingue de «X-e + iti»."},{"forma":"vattatīti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"vattati + iti"},{"forma":"paribbaje”ti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"paribbaje + iti"},{"forma":"anuppādadhammāti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"anuppādadhammā + iti"},{"forma":"kāyaduccaritādīnametaṃ","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"kāyaduccaritādīnaṃ + etaṃ"},{"forma":"aññatarampīti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"aññataraṃ + api + iti"},{"forma":"puttamiccheyyāti","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"puttaṃ + iccheyya + iti"},{"forma":"adutiyaṭṭhena","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":false},{"forma":"evamādīnavaṃ","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"evaṃ + ādīnavaṃ"},{"forma":"sāmaññeva","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"sāmaṃ + eva"},{"forma":"yaṃkiñci","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"yaṃ + kiñci","nota":"Nota del revisor (verbatim): El solucionador no la señala: la forma unida está atestiguada en la edición y la señal por léxico no puede verla. Es pakati — no ocurre operación ninguna—, de modo que no hay secuencia que derivar."},{"forma":"dīghamaddhānasaṃsaraṃ","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"dīghaṃ + addhānaṃ + saṃsaraṃ","nota":"Nota del revisor (verbatim): Tampoco la señala el solucionador, por lo mismo."},{"forma":"nidhāyātipi","fuente":"IEBH, 2026-09-08 · revisión del lote de un estudiante","sandhi":true,"componentes":"nidhāya + iti + api","nota":"Nota del revisor (verbatim): Es la misma juntura de «Nidhāyāti» —nidhāya + iti— con «api» detrás, de modo que su secuencia empieza con los cinco pasos de aquélla y sigue con tres más: §10 · §13 · §16 · §11 · §10 · §13 · §11."},{"forma":"pariyādiyanavacanametaṃ","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"pariyādiyanavacanaṃ + etaṃ"},{"forma":"Tasāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"tasā + iti"},{"forma":"yesañca","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"yesaṃ + ca"},{"forma":"Thāvarāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"thāvarā + iti"},{"forma":"paṭippassambhitvāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"paṭippassambhitvā + iti"},{"forma":"aññatarampi","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"aññataraṃ + api"},{"forma":"ekamekampi","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"ekaṃ + ekaṃ + api"},{"forma":"sattaṃ","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"sabbepi","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"sabbe + api"},{"forma":"aviheṭhayantoti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"aviheṭhayanto + iti"},{"forma":"puttamiccheyya","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"puttaṃ + iccheyya"},{"forma":"nāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"na + iti"},{"forma":"Puttāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"puttā + iti"},{"forma":"nisajjanaṃ","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"sayanaṃ","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"puttampi","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"puttaṃ + api"},{"forma":"sambhattaṃ","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"abhijappeyyāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"abhijappeyya + iti"},{"forma":"yadicchati","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"yaṃ + icchati"},{"forma":"kāmayamānassāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"kāmayamānassa + iti"},{"forma":"kāmāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"kāmā + iti"},{"forma":"raṭṭhañca","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"raṭṭhaṃ + ca"},{"forma":"taṇhārammaṇā","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"kāmanīyaṭṭhena","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"rajanīyaṭṭhena","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"madanīyaṭṭhena","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"kāma","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"hehisīti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"hehisi + iti"},{"forma":"abhijappamānassāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"abhijappamānassa + iti"},{"forma":"samijjhatīti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"samijjhati + iti"},{"forma":"ceti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"ce + iti"},{"forma":"Tanti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"taṃ + iti"},{"forma":"vindatīti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"vindati + iti"},{"forma":"hotīti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"hoti + iti"},{"forma":"addhāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"addhā + iti"},{"forma":"nissaṃsayavacanaṃ","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"avatthāpanavacanametaṃ","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"avatthāpanavacanaṃ + etaṃ"},{"forma":"Pītīti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"pīti + iti"},{"forma":"Manoti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"mano + iti"},{"forma":"ekuppādo","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"yadicchatīti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"ya ṃ + icchati + iti"},{"forma":"laddhāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"laddhā + iti"},{"forma":"Maccoti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"macco + iti"},{"forma":"mānavo","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"jantu","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":false},{"forma":"vāti","fuente":"IEBH, 2026-09-08 · revisión en la página","sandhi":true,"componentes":"vā + iti"},{"forma":"tassattho","fuente":"IEBH, 2026-09-14 · revisión del lote de un estudiante","sandhi":true,"componentes":"tassa + attho"},{"forma":"tenevāha","fuente":"IEBH, 2026-09-14 · revisión del lote de un estudiante","sandhi":true,"componentes":"tena + eva + āha","nota":"Nota del revisor (verbatim): El motor no la señala y propone «teneva + iha». Compárese con «tenāha» = tena + āha, adjudicada el 2026-09-07."},{"forma":"kāmasukhamanubhūtan”ti","fuente":"IEBH, 2026-09-14 · revisión del lote de un estudiante","sandhi":true,"componentes":"kāmasukhaṃ + anubhūtaṃ + iti","nota":"Nota del revisor (verbatim): Son tres voces y dos junturas. El estudiante envió «kāmasukhaṃ + anubhūtanti», que recompone y cuya segunda voz está atestiguada, pero esconde la segunda juntura: «anubhūtanti» es a su vez «anubhūtaṃ + iti» (§40 · §31 · §11)."},{"forma":"cettha","fuente":"IEBH, 2026-09-14 · revisión del lote de un estudiante","sandhi":true,"componentes":"ca + ettha"},{"forma":"yāvadeva","fuente":"IEBH, 2026-09-14 · revisión del lote de un estudiante","sandhi":true,"componentes":"yāva + eva","nota":"Nota del revisor (verbatim): El motor no la señala y propone «yāvade + eva», que no es voz. La juntura es la 'd' insertada de §35 —«Ya-va-ma-da-na-ta-ra-lā c' āgamā»—, de modo que la secuencia es de dos pasos: «yāva d eva (§35); yāvadeva (§11)». Es el ejemplo más claro del capítulo de unos componentes que dejan ver la operación."},{"forma":"pākaṭoyamatthoti","fuente":"IEBH, 2026-09-14 · revisión del lote de un estudiante","sandhi":true,"componentes":"pākaṭo + ayaṃ + attho + iti","nota":"Nota del revisor (verbatim): Cuatro voces y tres junturas; el motor corta en dos, «pākaṭoyamattho + iti». Sólo la primera juntura se verifica sola —pākaṭo + ayaṃ → pākaṭoyaṃ, §10 · §13 · §11—: el plegado de las cuatro no recompone porque los intermedios «pākaṭoyaṃ» y «pākaṭoyamattho» no están atestiguados sueltos, que es el límite documentado de combinar_varias()."},{"forma":"jātasseva","fuente":"IEBH, 2026-09-14 · revisión del lote de un estudiante","sandhi":true,"componentes":"jātassa + eva"},{"forma":"yattakānatthā","fuente":"IEBH, 2026-09-14 · revisión del lote de un estudiante","sandhi":true,"componentes":"yattakā + anatthā","nota":"Nota del revisor (verbatim): Las dos lecturas recomponen —«yattakāni + atthā», que es la del motor, y ésta—, de modo que ninguna regla las separa. Lo decide la edición, que imprime «yattakā’natthā»: el apóstrofo está donde la SEGUNDA voz perdió su vocal, y eso apunta a «anatthā». La marca del editor es el testigo, no el aforismo."},{"forma":"hatthapādānachedanaṃ","fuente":"IEBH, 2026-09-14 · revisión del lote de un estudiante","sandhi":false,"nota":"Nota del revisor (verbatim): No es juntura sino compuesto."},{"forma":"rūpādīni","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":false},{"forma":"atthādhigamattho","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":false},{"forma":"maraṇameva","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"maraṇaṃ + eva"},{"forma":"jarārogādayo","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":false},{"forma":"sambhavantī”ti","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"sambhavanti + iti"},{"forma":"chedanan”ti","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"chedanaṃ + iti"},{"forma":"Hatthapādachedanāpadesena","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":false},{"forma":"kammakāraṇāpi","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"kammakāraṇā + api"},{"forma":"evāti","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"eva + iti"},{"forma":"nigacchatī”ti","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"nigacchati + iti"},{"forma":"Jīvitaviyojanamuṭṭhippahārādisaṅkhātaṃ","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":false},{"forma":"andubandhanādisaṅkhātaṃ","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":false},{"forma":"aññañca","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"aññaṃ + ca"},{"forma":"kāmānañca","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"kāmānaṃ + ca"},{"forma":"accantameva","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"accantaṃ + eva"},{"forma":"jāto”ti-ādimāha","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"jāto + iti + ādiṃ + āha"},{"forma":"aparājitoti","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"aparājito + iti"},{"forma":"uttānameva","fuente":"IEBH, 2026-09-14 · revisión en la página","sandhi":true,"componentes":"uttānaṃ + eva"},{"forma":"Careti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"care + iti"},{"forma":"adhigatapphalānaṃ","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"adhigata + phalānaṃ"},{"forma":"Paccekabuddhasāvakānanti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"paccekabuddhasāvakānaṃ + iti"},{"forma":"Yathāha","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"yathā + āha","nota":"Nota del revisor (verbatim): El motor no la señala y propone «yathā + iha». Es la ambigüedad de «tenāha», donde conviven «+ āha», «+ iha», «+ ha» y «+ aha»: todas recomponen y ninguna señal del repositorio las separa. Lo decide el pasaje."},{"forma":"cariyāti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"cariyā + iti"},{"forma":"iriyāpathacariyā”ti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"iriyāpathacariyā + iti"},{"forma":"bhaveyyāti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"bhaveyya + iti"},{"forma":"āyatantīti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"āyatanti + iti"},{"forma":"visesamadhigacchatīti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"visesaṃ + adhigacchati + iti","nota":"Nota del revisor (verbatim): Tres voces y dos junturas. El estudiante envió «visesamadhigacchati + iti», que recompone y cuya primera voz está atestiguada, pero esconde la primera juntura: «visesamadhigacchati» es a su vez «visesaṃ + adhigacchati» (§34 · §11)."},{"forma":"caratī”ti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"carati + iti"},{"forma":"tāhipi","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"tāhi + api"},{"forma":"Khaggavisāṇakappoti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"khaggavisāṇakappo + iti"},{"forma":"khaggamigasiṅgaṃ","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":false,"nota":"Nota del revisor (verbatim): No es juntura sino compuesto (samāsa)."},{"forma":"panāyaṃ","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"pana + ayaṃ","nota":"Nota del revisor (verbatim): El motor propone «pana + āyaṃ», y «āyaṃ» no es voz."},{"forma":"mantayamānā”ti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"mantayamānā + iti"},{"forma":"evamādīsu","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"evaṃ + ādīsu"},{"forma":"khaggavisāṇasadisoti","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"khaggavisāṇasadiso + iti"},{"forma":"aparāpi","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"aparā + api","nota":"Nota del revisor (verbatim): El motor propone «apara + api». Las dos recomponen; lo decide el pasaje."},{"forma":"tāvettha","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":true,"componentes":"tāva + ettha","nota":"Nota del revisor (verbatim): El lote la envió como «tāvetthapadato», que no es una palabra sino dos: la juntura acaba en «tāvettha» y «padato» va suelta detrás. Se comprueba en que «etthapadato» no está atestiguado y «padato» sí."},{"forma":"upaṭṭhahanto","fuente":"IEBH, 2026-09-10 · revisión del lote de un estudiante","sandhi":false,"nota":"Nota del revisor (verbatim): No es juntura sino participio presente."}]}};

/* Mini-require: los módulos de nuestro/js/ tal cual, envueltos. */
const __f = {};
const __m = {};
function __def(n, f){ __f[n] = f; }
function __req(p){
  const n = p.replace(/^\.\//, "");
  if(!(n in __m)){
    const module = { exports: {} };
    __m[n] = module.exports;
    __f[n](module, module.exports, __req);
    __m[n] = module.exports;
  }
  return __m[n];
}

__def("normalizar", function(module, exports, require) {
// Porte fiel de `nuestro/normalizar.py` (etapa 1 del porte a JS, sesión 31).
// `cotejo()`: la forma canónica para COMPARAR dos voces pāḷi. Nunca para
// guardar ni para mostrar. Pasos, en este orden (CLAUDE.md §4):
//   1. NFC  2. saca apóstrofos, guiones, comillas y espacios  3. minúscula
//   4. ṁ (U+1E41) → ṃ (U+1E43)  — después de minúscula, para que Ṁ llegue.
// El Python queda como referencia permanente; todo cambio acá se mide contra
// él con `nuestro/js/arnes.js`.

"use strict";

const APOSTROFOS = "’'";
const GUIONES = "-‐‑‒–—−";
// Comillas de cita de la edición (2026-08-28, instrucción del Venerable):
// «oghamatarī”ti» es «oghamatarīti». Igual que en el Python.
const COMILLAS = "“”„\"«»‹›‘";
// El guion se escapa: sin la barra, dentro de la clase formaría un RANGO
// U+0027–U+2010 que se traga todas las letras ASCII.
const BORRAR = new RegExp("[" + (APOSTROFOS + GUIONES + COMILLAS)
    .replace(/[.*+?^${}()|[\]\\-]/g, "\\$&") + "]", "gu");

function cotejo(t) {
    t = t.normalize("NFC");
    t = t.replace(BORRAR, "");
    t = t.replace(/\s+/gu, "");
    t = t.toLowerCase();
    return t.replace(/ṁ/gu, "ṃ");   // ṁ → ṃ
}

function iguales(a, b) { return cotejo(a) === cotejo(b); }

module.exports = { cotejo, iguales };

});

__def("operaciones", function(module, exports, require) {
// Porte fiel de `nuestro/operaciones.py`. Las operaciones de sandhi, hacia
// adelante: UNA POR AFORISMO, con su enunciado arriba, tal como manda el
// proyecto. Estas funciones no deciden: aplican. Quien decide es la
// recomposición. Ninguna operación se agrega sin enunciado.
//
// Convención de pasos (CLAUDE.md §3): el texto primero, los segmentos
// separados por espacios, la cita entre paréntesis al final.

"use strict";

const VOCALES = "aāiīuūeo";
const LARGA = { a: "ā", i: "ī", u: "ū" };
const CORTA = { "ā": "a", "ī": "i", "ū": "u" };

// Las cinco series y su nasal final, «la última consonante del grupo».
const VAGGA = {
    k: "ṅ", kh: "ṅ", g: "ṅ", gh: "ṅ", "ṅ": "ṅ",
    c: "ñ", ch: "ñ", j: "ñ", jh: "ñ", "ñ": "ñ",
    "ṭ": "ṇ", "ṭh": "ṇ", "ḍ": "ṇ", "ḍh": "ṇ", "ṇ": "ṇ",
    t: "n", th: "n", d: "n", dh: "n", n: "n",
    p: "m", ph: "m", b: "m", bh: "m", m: "m",
};
// La segunda y cuarta de cada serie, y la primera y tercera con que se
// duplican (§29).
const SEGUNDA_CUARTA = {
    kh: "k", gh: "g", ch: "c", jh: "j",
    "ṭh": "ṭ", "ḍh": "ḍ", th: "t", dh: "d",
    ph: "p", bh: "b",
};
const DIGRAFOS = Object.keys(SEGUNDA_CUARTA);

// §269, con la ampliación que el propio documento enuncia debajo de la regla.
const CONJUNTAS = { ty: "c", ly: "l", ny: "ñ", dy: "j", sy: "s",
                    thy: "ch", dhy: "jh", "ṇy": "ñ" };

// La lista de la Rūpasiddhi Nāma que fija el grupo de «mana» (§183).
const GRUPO_MANA = new Set(["vaca", "vaya", "teja", "tapa", "ceta", "tama",
    "yasa", "aya", "paya", "sira", "chanda", "sara", "ura", "raha",
    "aha", "mana"]);

function nfc(t) { return t.normalize("NFC"); }

function cot(t) {
    t = nfc(t).replace(/’/g, "").replace(/'/g, "").replace(/-/g, "");
    return t.replace(/\s+/gu, "").toLowerCase().replace(/ṁ/gu, "ṃ");
}

function primeraLetra(t) {
    const dos = t.slice(0, 2);
    return (DIGRAFOS.includes(dos) || dos in VAGGA) ? dos : t.slice(0, 1);
}

function cierre(pasos, unido, atestiguada) {
    // Añade §11 y, si procede, el paso de la edición moderna.
    // `atestiguada === null` es el modo enumeración: no se compara.
    pasos = pasos.concat([`${unido} (§11)`]);
    if (atestiguada === null || atestiguada === undefined) return pasos;
    if (cot(unido) !== cot(atestiguada)) return null;
    if (nfc(atestiguada).trim() !== nfc(unido).trim())
        pasos.push(`${atestiguada} (EM)`);
    return pasos;
}

function sep10(a, b) {
    // §10 sobre la voz anterior: raíz · vocal final · voz siguiente.
    if (!a || !VOCALES.includes(a[a.length - 1]) || a.length < 2) return null;
    return [a.slice(0, -1), a[a.length - 1]];
}

// ── Vocal + vocal ───────────────────────────────────────────────────────

function op14(a, b, F) {
    // §14 — «A veces las vocales "i", "ī" y "u", "ū", cuando siguen a una
    // vocal disímil que ha sido elidida, se convierten en "e" y "o"
    // respectivamente». La disímil es sólo «a» y «ā» (nota 3).
    const s = sep10(a, b);
    if (!s || !b || !"iīuū".includes(b[0]) || !"aā".includes(s[1])) return null;
    const [raiz, v] = s;
    const nuevo = ("iī".includes(b[0]) ? "e" : "o") + b.slice(1);
    return cierre([`${a} ${b}`,
                   `${raiz} ${v} ${b} (§10)`,
                   `${raiz} ${b} (§12)`,
                   `${raiz} ${nuevo} (§14)`], raiz + nuevo, F);
}

function op19(a, b, F) {
    // §19 — «la sílaba "ti" de "ati", "pati" y "iti" se convierte en "c" y
    // ésta se duplica». La duplicación la hace §28.
    if (a.slice(-2) !== "ti" || !["a", "pa", "i"].includes(a.slice(0, -2))
        || !b || !VOCALES.includes(b[0])) return null;
    const raiz = a.slice(0, -2);
    return cierre([`${a} ${b}`,
                   `${raiz}c ${b} (§19)`,
                   `${raiz}cc ${b} (§28)`], raiz + "cc" + b, F);
}

function op20(a, b, F) {
    // §20 — «la sílaba "dha" de "idha", se convierte en "da"».
    if (a !== "idha" || !b || !VOCALES.includes(b[0])) return null;
    return cierre([`${a} ${b}`,
                   `ida ${b} (§20)`], "ida" + b, F);
}

function op22(a, b, F) {
    // §22 — «después de "yathā" y "tathā", la "e" de "eva" se convierte en
    // "ri"».
    if (!["yathā", "tathā"].includes(a) || b !== "eva") return null;
    const corto = a.slice(0, -1) + "a";
    return cierre([`${a} ${b}`,
                   `${a} riva (§22)`,
                   `${corto} riva (§22)`], corto + "riva", F);
}

// ── Vocal + consonante ──────────────────────────────────────────────────

function op25(a, b, F) {
    // §25 — «una vocal, cuando va seguida por una consonante, se alarga».
    if (!a || !(a[a.length - 1] in LARGA) || !b || VOCALES.includes(b[0]))
        return null;
    const largo = a.slice(0, -1) + LARGA[a[a.length - 1]];
    const pasos = [`${a} ${b}`, `${largo} ${b} (§25)`];
    return cierre(pasos.slice(), largo + b, F)
        || cierre(pasos.slice(), largo + " " + b, F);
}

function op26(a, b, F) {
    // §26 — «una vocal, cuando va seguida por una consonante, se acorta».
    if (!a || !(a[a.length - 1] in CORTA) || !b || VOCALES.includes(b[0]))
        return null;
    const corto = a.slice(0, -1) + CORTA[a[a.length - 1]];
    const pasos = [`${a} ${b}`, `${corto} ${b} (§26)`];
    return cierre(pasos.slice(), corto + b, F)
        || cierre(pasos.slice(), corto + " " + b, F);
}

function op27(a, b, F) {
    // §27 — «la "o" de "eta" y "ta", cuando va seguida por una consonante, se
    // elide». El enunciado nombra «eta» y «ta»: las voces son `eso` y `so`.
    if (!["eso", "so"].includes(a) || !b || VOCALES.includes(b[0])) return null;
    const raiz = a.slice(0, -1);
    return cierre([`${a} ${b}`,
                   `${raiz} o ${b} (§10)`,
                   `${raiz} ${b}, ${raiz} a ${b} (§27)`], raiz + "a " + b, F);
}

function op29(a, b, F) {
    // §29 — «la segunda y cuarta consonante de las agrupadas se duplican en
    // la primera y tercera de las agrupadas respectivamente».
    if (!a || !VOCALES.includes(a[a.length - 1])) return null;
    const ini = primeraLetra(b);
    if (!(ini in SEGUNDA_CUARTA)) return null;
    const doble = SEGUNDA_CUARTA[ini] + b;
    return cierre([`${a} ${b}`,
                   `${a} ${doble} (§29)`], a + doble, F);
}

function op36(a, b, F) {
    // §36 — «cuando una consonante sigue, hay insersión de la letra "o"».
    const s = sep10(a, b);
    if (!s || !b || VOCALES.includes(b[0])) return null;
    const [raiz, v] = s;
    return cierre([`${a} ${b}`,
                   `${raiz} ${v} ${b} (§10)`,
                   `${raiz} ${b} (§12)`,
                   `${raiz} o ${b} (§36)`], raiz + "o" + b, F);
}

function op44(a, b, F) {
    // §44 — «el prefijo "abhi" cuando va seguido por una vocal se substituye
    // por "abbh"».
    if (a !== "abhi" || !b || !VOCALES.includes(b[0])) return null;
    return cierre([`${a} ${b}`,
                   `abbh ${b} (§44)`], "abbh" + b, F);
}

function op45(a, b, F) {
    // §45 — «el prefijo "adhi" cuando va seguido por una vocal se substituye
    // por "ajjh"».
    if (a !== "adhi" || !b || !VOCALES.includes(b[0])) return null;
    return cierre([`${a} ${b}`,
                   `ajjh ${b} (§45)`], "ajjh" + b, F);
}

function op48(a, b, F) {
    // §48 — «el prefijo "pati" cuando va seguido por una vocal o una
    // consonante, se convierte en "paṭi"».
    if (a !== "pati") return null;
    return cierre([`${a} ${b}`,
                   `paṭi ${b} (§48)`], "paṭi" + b, F);
}

function op49(a, b, F) {
    // §49 — «cuando va seguida por una consonante, la vocal final de "putha"
    // se convierte en "u"». El paso de duplicación lo hace §28.
    if (a !== "putha" || !b || VOCALES.includes(b[0])) return null;
    const ini = primeraLetra(b);
    const pasos = [`${a} ${b}`,
                   `puth a ${b} (§10)`,
                   `puth u ${b} (§49)`];
    const r = cierre(pasos.slice(), "puthu" + b, F);
    if (r) return r;
    return cierre(pasos.concat([`puth u ${ini}${b} (§28)`]),
                  "puthu" + ini + b, F);
}

function op50(a, b, F) {
    // §50 — «cuando va seguido por una consonante, el prefijo "ava" se
    // convierte en "o"».
    if (a !== "ava" || !b || VOCALES.includes(b[0])) return null;
    return cierre([`${a} ${b}`,
                   `o ${b} (§50)`], "o" + b, F);
}

function op79(a, b, F) {
    // §79 — «la letra "o", la substitución del prefijo "ava", se convierte en
    // "u"». Va después de §50, y §28 duplica.
    if (a !== "ava" || !b || VOCALES.includes(b[0])) return null;
    const ini = primeraLetra(b);
    const pasos = [`${a} ${b}`,
                   `o ${b} (§50)`,
                   `u ${b} (§79)`];
    const r = cierre(pasos.slice(), "u" + b, F);
    if (r) return r;
    return cierre(pasos.concat([`u ${ini}${b} (§28)`]), "u" + ini + b, F);
}

function op183(a, b, F) {
    // §183 — «cuando hay elisión de la inflexión nominal, la vocal final del
    // grupo de "mana" se convierte en "o"». El grupo lo fija la lista de la
    // Rūpasiddhi Nāma.
    if (!GRUPO_MANA.has(a)) return null;
    return cierre([`${a} ${b}`,
                   `${a.slice(0, -1)} ${a[a.length - 1]} ${b} (§10)`,
                   `${a.slice(0, -1)} o ${b} (§183)`],
                  a.slice(0, -1) + "o" + b, F);
}

function op269(a, b, F) {
    // §269 — «las consonantes conjuntas "ty", "ly", "ny", "dy" se convierten
    // en "c", "l", "ñ", "j" respectivamente y después éstas se duplican». El
    // documento amplía debajo a "sy", "thy", "dhy", "ṇy". Va después de §21.
    const s = sep10(a, b);
    if (!s || !b || !VOCALES.includes(b[0])) return null;
    const [raiz, v] = s;
    if (!"iī".includes(v)) return null;
    const conj = primeraLetra(raiz.slice(-1)) + "y";
    if (!(conj in CONJUNTAS)) return null;
    const nueva = CONJUNTAS[conj];
    const base = raiz.slice(0, -1);
    const pasos = [`${a} ${b}`,
                   `${raiz} ${v} ${b} (§10)`,
                   `${raiz} y ${b} (§21)`,
                   `${base + nueva} ${b} (§269)`,
                   `${base + nueva + nueva} ${b} (§28)`];
    return cierre(pasos, base + nueva + nueva + b, F);
}

// ── Niggahīta ───────────────────────────────────────────────────────────

function op31(a, b, F) {
    // §31 — «cuando va seguida por una consonante agrupada, la "niggahīta" se
    // convierte en la última consonante del grupo». Nota 14: k→ṅ, c→ñ, ṭ→ṇ,
    // t→n, p→m.
    if (!a.endsWith("ṃ")) return null;
    const ini = primeraLetra(b);
    if (!(ini in VAGGA)) return null;
    const nuevo = a.slice(0, -1) + VAGGA[ini];
    const pasos = [`${a} ${b}`, `${nuevo} ${b} (§31)`];
    return cierre(pasos.slice(), nuevo + b, F)
        || cierre(pasos.slice(), nuevo + " " + b, F);
}

function op31L(a, b, F) {
    // El «vā» de §31: la niggahīta se vuelve «l» ante «l». Su regla
    // niggahita 2 lo enuncia y §31 no: restringida a «saṃ» y «puma»:
    // `saṃ + lakkhaṇā`, `saṃ + lekho`, `puṃ + liṅgaṃ`.
    if (!["saṃ", "puṃ"].includes(a) || !b.startsWith("l")) return null;
    const nuevo = a.slice(0, -1) + "l";
    const pasos = [`${a} ${b}`,
                   `${nuevo} ${b} (por "vā" en §31)`];
    return cierre(pasos.slice(), nuevo + b, F)
        || cierre(pasos.slice(), nuevo + " " + b, F);
}

function opS49(a, b, F) {
    // Saddanīti Suttamālā 49 — la 'i' se vuelve 'v' ante la 'e' de «eva».
    // PRIMERA operación del motor que NO es de Kaccāyana, y por eso se cita
    // con su obra entera: aquí «§N» a secas significa Kaccāyana.
    //
    //   49. Evass' ekāre itiss' aññassa c' issa vo.
    //   «itv eva coro asim āvudhañ ca; vilapatv eva so dijo; Isigili tv
    //   eva; Samantapāsādikā tv eva». Kvacī ti kiṃ: icc eva.
    //
    // Cotejado contra Helmer Smith, Saddanīti III (Suttamālā), p. 617.
    // Kaccāyana no tiene sutta correspondiente: el aparato de Smith da «Kc»
    // para el 50 y el 51 y ninguno para el 49.
    //
    // Dos restricciones, las dos del texto: sólo ante «eva» («evassa
    // ekāre»), y sólo 'i', no 'ī' («issa», la letra) — la misma lectura
    // estricta que se hace con §18, que dice «okāra-ukāra» y no cubre «ū».
    //
    // Espejo exacto de op_S49 en nuestro/operaciones.py. Si uno cambia,
    // cambian los dos: los arneses comparan forma por forma.
    // ALCANCE: se exige que la primera voz acabe en «-ti». Es restricción
    // NUESTRA, no del sutta —él dice «issa» y «aññassa ca saddassa»—, pero
    // sus cuatro ejemplos son unánimemente «-ti». Medido: sin ella el sutta
    // gana 248 formas y con ella 234; las 14 que caen son todas falsas
    // («sveva» = so + eva, no si + eva). El porqué entero, en el Python.
    if (!a || !a.endsWith("ti") || !b.startsWith("eva")) return null;
    const raiz = a.slice(0, -1);
    const nuevo = raiz + "v";
    const pasos = [`${a} ${b}`,
                   `${raiz} i ${b} (§10)`,
                   `${raiz} v ${b} (Saddanīti Suttamālā §49)`];
    return cierre(pasos, nuevo + b, F);
}

function op35L(a, b, F) {
    // La «ḷ» que se inserta después de «cha». §35 no la enumera; la nota 9
    // del documento sí: «Se inserta "ḷ" después de "cha" y numerales.» Se
    // implementa por la nota y se cita por la nota.
    if (a !== "cha" || !b || !VOCALES.includes(b[0])) return null;
    const pasos = [`${a} ${b}`,
                   `${a} ḷ ${b} (§35, nota 9)`];
    return cierre(pasos.slice(), a + "ḷ" + b, F)
        || cierre(pasos.slice(), a + "ḷ " + b, F);
}

function op32(a, b, F) {
    // §32 — «cuando "eva" y "hi" siguen, la "niggahīta" se convierte en "ñ";
    // y ésta se duplica cuando va seguida por "eva"».
    if (!a.endsWith("ṃ") || !["eva", "hi"].includes(b)) return null;
    const base = a.slice(0, -1) + "ñ";
    if (b === "hi") {
        // La forma unida primero (ver el porqué en el Python).
        const pasos = [`${a} ${b}`, `${base} hi (§32)`];
        return cierre(pasos.slice(), base + "hi", F)
            || cierre(pasos.slice(), base + " hi", F);
    }
    const pasos = [`${a} ${b}`,
                   `${base} eva (§32)`,
                   `${base} ñeva (§28)`];
    return cierre(pasos.slice(), base + "ñeva", F)
        || cierre(pasos.slice(), base + " ñeva", F);
}

function op33(a, b, F) {
    // §33 — «cuando "y" sigue, la "niggahīta" junto con "y" se convierte en
    // "ñ"; y ésta se duplica». Sólo "saṃ" y el pronombre "ya" (nota 15).
    if (!a.endsWith("ṃ") || !b.startsWith("y")) return null;
    const base = a.slice(0, -1) + "ñ";
    const resto = b.slice(1);
    const pasos = [`${a} ${b}`,
                   `${base} ñ${resto} (§33)`];
    return cierre(pasos.slice(), base + "ñ" + resto, F)
        || cierre(pasos.slice(), base + " ñ" + resto, F);
}

function op34(a, b, F) {
    // §34 — «cuando una vocal sigue, la "niggahīta" se convierte en "m" y
    // "d"». En "d" sólo después de "ya", "ta" y "eta" (nota 16).
    if (!a.endsWith("ṃ") || !b || !VOCALES.includes(b[0])) return null;
    for (const letra of ["m", "d"]) {
        if (letra === "d" && !["ya", "ta", "eta"].includes(a.slice(0, -1)))
            continue;
        const nuevo = a.slice(0, -1) + letra;
        const r = cierre([`${a} ${b}`,
                          `${nuevo} ${b} (§34)`], nuevo + b, F)
            || cierre([`${a} ${b}`,
                       `${nuevo} ${b} (§34)`], nuevo + " " + b, F);
        if (r) return r;
    }
    return null;
}

function op37(a, b, F) {
    // §37 — «cuando una vocal o una consonante sigue, se inserta la
    // "niggahīta"».
    return cierre([`${a} ${b}`,
                   `${a} ṃ ${b} (§37)`], a + "ṃ" + b, F)
        || cierre([`${a} ${b}`,
                   `${a} ṃ ${b} (§37)`], a + "ṃ " + b, F);
}

function op38(a, b, F) {
    // §38 — «cuando una vocal sigue, la "niggahīta" se elide». La nota 17
    // añade: elidida la niggahīta, se elide la vocal anterior y se alarga la
    // siguiente.
    if (!a.endsWith("ṃ") || !b || !VOCALES.includes(b[0])) return null;
    const sin = a.slice(0, -1);
    const pasos = [`${a} ${b}`, `${sin} ${b} (§38)`];
    const r = cierre(pasos.slice(), sin + b, F)
        || cierre(pasos.slice(), sin + " " + b, F);
    if (r) return r;
    const s = sep10(sin, b);
    if (!s || !(b[0] in LARGA)) return null;
    const [raiz, v] = s;
    const largo = LARGA[b[0]] + b.slice(1);
    return cierre(pasos.concat([`${raiz} ${v} ${b} (§10)`,
                                `${raiz} ${b} (§12)`,
                                `${raiz} ${largo} (§15)`]), raiz + largo, F);
}

function op39(a, b, F) {
    // §39 — «cuando una consonante sigue, la "niggahīta" se elide».
    if (!a.endsWith("ṃ") || !b || VOCALES.includes(b[0])) return null;
    const sin = a.slice(0, -1);
    const pasos = [`${a} ${b}`, `${sin} ${b} (§39)`];
    return cierre(pasos.slice(), sin + b, F)
        || cierre(pasos.slice(), sin + " " + b, F);
}

function op40(a, b, F) {
    // §40 — «la vocal después de la "niggahīta" se elide y la "niggahīta" se
    // convierte en la consonante final del grupo correspondiente».
    if (!a.endsWith("ṃ") || !b || !VOCALES.includes(b[0]) || b.length < 2)
        return null;
    const sinv = b.slice(1);
    const ini = primeraLetra(sinv);
    let pasos = [`${a} ${b}`, `${a} ${sinv} (§40)`];
    if (ini in VAGGA) {
        const nuevo = a.slice(0, -1) + VAGGA[ini];
        pasos = pasos.concat([`${nuevo} ${sinv} (§31)`]);
        return cierre(pasos.slice(), nuevo + sinv, F)
            || cierre(pasos.slice(), nuevo + " " + sinv, F);
    }
    return cierre(pasos.slice(), a + sinv, F)
        || cierre(pasos.slice(), a + " " + sinv, F);
}

function op41(a, b, F) {
    // §41 — «cuando la vocal siguiente a la "niggahīta" se elide, si la
    // consonante siguiente es conjunta, ésta se convierte en no-conjunta».
    if (!a.endsWith("ṃ") || !b || !VOCALES.includes(b[0]) || b.length < 3)
        return null;
    const sinv = b.slice(1);
    if (sinv.length < 2 || sinv[0] !== sinv[1]) return null;
    const simple = sinv.slice(1);
    const pasos = [`${a} ${b}`,
                   `${a} ${sinv} (§40)`,
                   `${a} ${simple} (§41)`];
    return cierre(pasos.slice(), a + simple, F)
        || cierre(pasos.slice(), a + " " + simple, F);
}

function op51(a, b, F) {
    // §51 — «a veces hay transposición de las letras "r", "h", "n"». Se
    // prueban los dos saltos —el contiguo y el de una letra en medio—, que
    // son los que las tres formas del banco atestiguan. Quien decide sigue
    // siendo la recomposición.
    if (!a) return null;
    const salidas = [];
    for (let i = 0; i < a.length; i++) {
        if (!"rhn".includes(a[i])) continue;
        for (const salto of [1, 2]) {
            for (const j of [i - salto, i + salto]) {
                if (!(j >= 0 && j < a.length)) continue;
                const letras = a.split("");
                [letras[i], letras[j]] = [letras[j], letras[i]];
                salidas.push(letras.join(""));
            }
        }
    }
    for (const trans of salidas) {
        const pasos = [`${a} ${b}`.trim(),
                       `${trans} ${b} (§51)`.trim()];
        const r = b
            ? (cierre(pasos.slice(), trans + b, F)
               || cierre(pasos.slice(), trans + " " + b, F))
            : cierre(pasos.slice(), trans, F);
        if (r) return r;
    }
    return null;
}

// ── Cadenas de dos operaciones ──────────────────────────────────────────
// Cada aforismo de sustitución nombra SU vocal y SU letra (enunciados del
// Sandhi-kappa): §17 sólo «e»→y; §18 sólo «o»,«u»→v; §21 sólo «i»,«ī»→y.
const VOCAL_SUST = { 17: "e", 18: "ou", 21: "iī" };
const LETRA_SUST = { 17: "y", 18: "v", 21: "y" };

function _sustitucion(a, b, n) {
    const s = sep10(a, b);
    if (!s || !b || !VOCALES.includes(b[0])) return null;
    const [raiz, v] = s;
    if (!VOCAL_SUST[n].includes(v)) return null;
    return [raiz, v, LETRA_SUST[n]];
}

function licenciaSustitucion(a, b, n) {
    // ¿Licencia el aforismo `n` esta sustitución? Se pregunta ANTES de llamar
    // al derivador del Venerable, que aplica los tres sin mirar la vocal.
    return _sustitucion(a, b, n) !== null;
}

const CLASE_VOCAL = { "a": "a", "ā": "a", "i": "i", "ī": "i",
                      "u": "u", "ū": "u", "e": "e", "o": "o" };

function licenciaElisionSiguiente(a, b) {
    // §13 es «Vā paro asarūpā» — la siguiente se elide tras vocal DISÍMIL.
    // Con vocales de la misma clase (a/ā, i/ī, u/ū, e, o) manda §12 (+§15):
    // adjudicación del IEBH (2026-08-29, observación sobre assasāmīti). La
    // propia edición concuerda: tadāhaṃ, migīva y vadhūdaraṃ están bajo
    // «una vocal que precede a otra se elide». Espejo exacto de
    // `licencia_elision_siguiente` en operaciones.py.
    const prev = a && a.endsWith("ṃ") ? a.slice(0, -1) : a;   // «38+13»
    if (!prev || !b) return true;
    const u = prev[prev.length - 1], v = b[0];
    if (u in CLASE_VOCAL && v in CLASE_VOCAL
            && CLASE_VOCAL[u] === CLASE_VOCAL[v]) return false;
    return true;
}

function _cadenaSustAlarga(a, b, F, n) {
    // §17/§18/§21 y después §25. Del banco: «me ayaṃ · m e ayaṃ (§10) ·
    // m y ayaṃ (§17) · m y āyaṃ (§25) · myāyaṃ (§11)».
    const s = _sustitucion(a, b, n);
    if (!s || !(b[0] in LARGA)) return null;
    const [raiz, v, letra] = s;
    const largo = LARGA[b[0]] + b.slice(1);
    return cierre([`${a} ${b}`,
                   `${raiz} ${v} ${b} (§10)`,
                   `${raiz} ${letra} ${b} (§${n})`,
                   `${raiz} ${letra} ${largo} (§25)`],
                  raiz + letra + largo, F);
}

function op1725(a, b, F) { return _cadenaSustAlarga(a, b, F, 17); }
function op1825(a, b, F) { return _cadenaSustAlarga(a, b, F, 18); }
function op2125(a, b, F) { return _cadenaSustAlarga(a, b, F, 21); }

function op3526(a, b, F) {
    // §35 y después §26. Del banco, byañjana 2.2: «yathā idaṃ» da
    // «yatha-y-idaṃ»: §35 inserta la «y» y §26 acorta la «ā».
    if (!a || !(a[a.length - 1] in CORTA)) return null;
    const corto = a.slice(0, -1) + CORTA[a[a.length - 1]];
    for (const letra of "yvmdntrlhg") {
        const r = cierre([`${a} ${b}`,
                          `${a} ${letra} ${b} (§35)`,
                          `${corto} ${letra} ${b} (§26)`],
                         corto + letra + b, F);
        if (r) return r;
    }
    return null;
}

function _cadena38(a, b, F, segunda) {
    // §38 y después §12 o §13. Elidida la niggahīta, las dos voces quedan
    // vocal contra vocal, y ahí §12 y §13 se aplican por su propio enunciado.
    // De «paripucchiṃ ahaṃ»: §38 deja «paripucchi ahaṃ», §12 da
    // «paripucchahaṃ». De «cāriṃ ahaṃ»: §38 y §13 dan «cārihaṃ».
    if (!a.endsWith("ṃ") || !b || !VOCALES.includes(b[0])) return null;
    const sin = a.slice(0, -1);
    const s = sep10(sin, b);
    if (!s) return null;
    const [raiz, v] = s;
    const pasos = [`${a} ${b}`,
                   `${sin} ${b} (§38)`,
                   `${raiz} ${v} ${b} (§10)`];
    if (segunda === 12)
        return cierre(pasos.concat([`${raiz} ${b} (§12)`]), raiz + b, F);
    if (b.length < 2) return null;
    return cierre(pasos.concat([`${raiz} ${v} ${b.slice(1)} (§13)`]),
                  raiz + v + b.slice(1), F);
}

function op3812(a, b, F) { return _cadena38(a, b, F, 12); }
function op3813(a, b, F) { return _cadena38(a, b, F, 13); }

// Claves como en el Python: números para los aforismos, cadenas para las
// combinaciones. Un Map admite las dos sin coerción.
const TODAS = new Map([
    [14, op14], [19, op19], [20, op20], [22, op22], [25, op25], [26, op26],
    [27, op27], [29, op29], [31, op31], [32, op32], [33, op33], [34, op34],
    [36, op36], [37, op37], [38, op38], [39, op39], [40, op40], [41, op41],
    [44, op44], [45, op45], [48, op48], [49, op49], [50, op50], [51, op51],
    [79, op79], [183, op183], [269, op269],
    ["17+25", op1725], ["18+25", op1825], ["21+25", op2125],
    ["35+26", op3526], ["38+12", op3812], ["38+13", op3813],
    ["31vā", op31L], ["35nota9", op35L],
    // «S49» y no 49: el 49 de este motor es el de KACCĀYANA y está tomado.
    ["S49", opS49],
]);

module.exports = {
    VOCALES, LARGA, CORTA, VAGGA, SEGUNDA_CUARTA, CONJUNTAS, GRUPO_MANA,
    VOCAL_SUST, LETRA_SUST, TODAS,
    primeraLetra, licenciaSustitucion, licenciaElisionSiguiente, cierre, sep10, cot,
};

});

__def("derivar", function(module, exports, require) {
// Porte fiel de `herramientas/derivar_secuencias.py` — EL VERIFICADOR del
// Venerable. Quien propone (motor.js) y quien verifica son distintos, a
// propósito; este archivo no se «mejora»: se transcribe. La regla de oro: una
// secuencia sólo se emite si, al aplicarla, se llega exactamente a la forma
// atestiguada. Si no coincide, no se emite nada.
//
// OJO: el `cotejo()` de este archivo NO es el de normalizar.js. El del
// verificador sólo hace NFC, saca ’ ' - y espacios; no baja a minúscula ni
// lleva ṁ a ṃ. Así está en el Python y así se porta.

"use strict";

const VOCALES = "aāiīuūeo";
// LARGA mapea e→e y o→o a propósito: es el original del Venerable. El paso
// calcado que eso produce lo descarta el motor (`pasoQueNoHaceNada`), no éste.
const LARGA = { a: "ā", i: "ī", u: "ū", e: "e", o: "o" };

function nfc(t) { return t.normalize("NFC"); }

function cotejo(t) {
    t = nfc(t).replace(/’/g, "").replace(/'/g, "").replace(/-/g, "");
    return t.replace(/\s+/gu, "");
}

function dosVoces(comp) {
    const partes = comp.trim().split(/\s*\+\s*|\s+/u).filter(x => x);
    return partes.length === 2 ? partes : null;
}

function cierre(pasos, unido, atestiguada) {
    pasos.push(unido + " (§11)");
    if (cotejo(unido) !== cotejo(atestiguada)) return null;
    if (nfc(atestiguada).trim() !== nfc(unido).trim())
        pasos.push(atestiguada + " (EM)");
    return pasos;
}

// ── Un derivador por aforismo ───────────────────────────────────────────

function dElideAnterior(a, b, atestiguada, n) {
    // §12: se separa la vocal final de la primera voz y se elide.
    if (!a || !VOCALES.includes(a[a.length - 1])) return null;
    const raiz = a.slice(0, -1), v = a[a.length - 1];
    if (!raiz) return null;
    return cierre([`${a} ${b}`,
                   `${raiz} ${v} ${b} (§10)`,
                   `${raiz} ${b} (§${n})`],
                  raiz + b, atestiguada);
}

function dElideSiguiente(a, b, atestiguada, n) {
    // §13: se elide la vocal inicial de la segunda voz.
    if (!a || !VOCALES.includes(a[a.length - 1]) || !b || !VOCALES.includes(b[0]))
        return null;
    const raiz = a.slice(0, -1), v = a[a.length - 1];
    if (!raiz || b.length < 2) return null;
    return cierre([`${a} ${b}`,
                   `${raiz} ${v} ${b} (§10)`,
                   `${raiz} ${v} ${b.slice(1)} (§${n})`],
                  raiz + v + b.slice(1), atestiguada);
}

function dElideYAlarga(a, b, atestiguada, n) {
    // §15: elidida la anterior, la siguiente se alarga.
    if (!a || !VOCALES.includes(a[a.length - 1]) || !b || !VOCALES.includes(b[0]))
        return null;
    const raiz = a.slice(0, -1), v = a[a.length - 1];
    if (!raiz || !(b[0] in LARGA)) return null;
    const largo = LARGA[b[0]] + b.slice(1);
    return cierre([`${a} ${b}`,
                   `${raiz} ${v} ${b} (§10)`,
                   `${raiz} ${b} (§12)`,
                   `${raiz} ${largo} (§${n})`],
                  raiz + largo, atestiguada);
}

function dAlargaAnterior(a, b, atestiguada, n) {
    // §16: elidida la siguiente, la anterior se alarga.
    if (!a || !VOCALES.includes(a[a.length - 1]) || !b || !VOCALES.includes(b[0]))
        return null;
    const raiz = a.slice(0, -1), v = a[a.length - 1];
    if (!raiz || !(v in LARGA) || b.length < 2) return null;
    return cierre([`${a} ${b}`,
                   `${raiz} ${v} ${b} (§10)`,
                   `${raiz} ${v} ${b.slice(1)} (§13)`,
                   `${raiz} ${LARGA[v]} ${b.slice(1)} (§${n})`],
                  raiz + LARGA[v] + b.slice(1), atestiguada);
}

function dSustituyeAnterior(a, b, atestiguada, n, destino) {
    // §17 (e→y), §18 (o,u→v), §21 (i,ī→y): cambia la vocal final.
    if (!a || !VOCALES.includes(a[a.length - 1])) return null;
    const raiz = a.slice(0, -1), v = a[a.length - 1];
    if (!raiz) return null;
    return cierre([`${a} ${b}`,
                   `${raiz} ${v} ${b} (§10)`,
                   `${raiz} ${destino} ${b} (§${n})`],
                  raiz + destino + b, atestiguada);
}

function dDuplica(a, b, atestiguada, n) {
    // §28: se duplica la consonante inicial de la segunda voz.
    if (!b || VOCALES.includes(b[0])) return null;
    const doble = b[0] + b;
    return cierre([`${a} ${b}`,
                   `${a} ${doble} (§${n})`],
                  a + doble, atestiguada);
}

function dInserta(a, b, atestiguada, n, letra) {
    // §35: se inserta una consonante entre las dos voces.
    return cierre([`${a} ${b}`,
                   `${a} ${letra} ${b} (§${n})`],
                  a + letra + b, atestiguada);
}

function derivar(kac, comp, atestiguada) {
    const par = dosVoces(comp);
    if (!par) return null;
    const [a, b] = par;
    const intentos = [];
    if (kac === 12) intentos.push(() => dElideAnterior(a, b, atestiguada, 12));
    else if (kac === 13) intentos.push(() => dElideSiguiente(a, b, atestiguada, 13));
    else if (kac === 15) intentos.push(() => dElideYAlarga(a, b, atestiguada, 15));
    else if (kac === 16) intentos.push(() => dAlargaAnterior(a, b, atestiguada, 16));
    else if (kac === 17 || kac === 18 || kac === 21) {
        for (const destino of ["y", "v"])
            intentos.push(() => dSustituyeAnterior(a, b, atestiguada, kac, destino));
    } else if (kac === 28) intentos.push(() => dDuplica(a, b, atestiguada, 28));
    else if (kac === 35) {
        for (const letra of "yvmdntrlhg")
            intentos.push(() => dInserta(a, b, atestiguada, 35, letra));
    }
    for (const f of intentos) {
        const r = f();
        if (r) return r;
    }
    return null;
}

module.exports = { derivar };

});

__def("motor", function(module, exports, require) {
// Porte fiel del núcleo de `nuestro/solucionar_sandhis.py` — etapa 1 del
// porte a JS (briefing sesión 30 §6): `cotejo()`, las operaciones, el bucle
// proponer-verificar y la lógica del verificador.
//
// **Proponer y verificar. Nunca afirmar.** Se propone un corte y una cadena
// de reglas, se aplica la cadena, y tiene que reproducir exactamente la forma
// de entrada. Si no coincide, se descarta. Se devuelven TODAS las lecturas
// válidas, no una.
//
// Modo de esta etapa: **solo-canon** (decisión del Venerable, 2026-08-28).
// El léxico es el corpus convertido del Sexto Concilio; el DPD no interviene
// en ninguna capa. `descomposicion()` devuelve por eso siempre `[]`.
//
// El motor no lee archivos: recibe los datos por `iniciar()`. Así el mismo
// núcleo sirve en Node (el arnés carga JSON del árbol) y en el navegador
// (etapa 4, carga bajo demanda). El Python queda como referencia permanente;
// todo cambio acá se mide contra él con `arnes.js`.

"use strict";

const { cotejo } = require("./normalizar");
const OP = require("./operaciones");
const D = require("./derivar");

const VOCALES = "aāiīuūeo";
const NASALES = "ṅñṇnm";
const MARCAS = "’'-";

// El estado que en Python vive en `_cache`. Se llena con `iniciar()`.
const _cache = { lexico: null, nipata: new Set(), lexicoBanco: new Set(),
                 banco: new Map(), canon: new Set(), huella: null };

function partirComponentes(t) {
    t = (t || "").trim();
    if (!t) return [];
    if (t.includes(" + ")) return t.split(" + ").map(x => x.trim());
    return t.split(/\s+/u).filter(x => x);
}

// ── Iniciar: el léxico del canon y las voces del propio banco ───────────
//
// Réplica de la parte de `cargar()` que la etapa 1 necesita. En solo-canon
// el léxico entero es el corpus del Sexto Concilio (118 volúmenes), más el
// segundo léxico: las voces que el propio banco atestigua como componente
// —`putha`, `vipali`, `ani`, `chayo`…—. Ese añadido hace circular la medida
// del banco, y así está dicho en el informe; el número que vale es el del
// corpus, que estas voces no tocan.
function iniciar({ formasCanon, lexico, reglas, tablas, listas, huella,
                   casos }) {
    // El léxico base: o una lista de formas crudas (`formasCanon`, se cotejan
    // acá), o un objeto con `.has()` sobre formas YA cotejadas — el léxico
    // fragmentado con carga bajo demanda de la etapa 2.
    let base;
    if (formasCanon) {
        base = new Set();
        for (const f of formasCanon) base.add(cotejo(f));
    } else {
        base = lexico;
    }

    // El índice del banco: cotejo(f) → [{dato, archivo, clave}], en el orden
    // del Python — primero reglas.json, después las Tablas.
    _cache.banco = new Map();
    const meter = (f, entrada) => {
        const k = cotejo(f);
        if (!_cache.banco.has(k)) _cache.banco.set(k, []);
        _cache.banco.get(k).push(entrada);
    };
    reglas.ce.forEach((c, i) => meter(c.f, {
        dato: c, archivo: "recursos/sandhi/reglas.json",
        clave: `ce[${i}]` }));
    if (tablas) {
        tablas.filas.forEach((fila, i) => {
            (fila.secuencias || []).forEach((s, j) => {
                // La clave es la forma RESULTANTE (em o forma_final), no la
                // inicial: el banco se consulta por lo que el lector pega.
                const f = s.em || s.forma_final;
                if (f) meter(f, {
                    dato: s,
                    archivo: "recursos/sandhi/tablas-nandisena-secuencias.json",
                    clave: `filas[${i}].secuencias[${j}]` });
            });
        });
    }

    // El segundo léxico: las voces que el propio banco atestigua como
    // componente y el corpus no trae. Hace circular la medida del banco (así
    // está dicho en el informe); el número que vale es el del corpus.
    const entradas = [];
    for (const lista of _cache.banco.values()) {
        for (const { dato } of lista) {
            entradas.push("s" in dato ? (dato.comp || "")
                                      : (dato.forma_inicial || ""));
        }
    }
    const extra = new Set();
    for (const comp of entradas) {
        for (const pieza of partirComponentes(comp)) {
            const q = cotejo(pieza);
            // len>=3, alfabética, sin «√» ni «+» — igual que el Python.
            if (q.length >= 3 && /^\p{L}+$/u.test(q)
                && !pieza.includes("√") && !pieza.includes("+"))
                extra.add(q);
        }
    }
    _cache.lexicoBanco = new Set(
        [...extra].filter(q => !base.has(q)));
    const lb = _cache.lexicoBanco;
    _cache.lexico = { has: q => base.has(q) || lb.has(q) };

    // La capa `--canon` del modo DPD queda apagada y vacía: este porte es
    // solo-canon por decisión del Venerable (2026-08-28).
    _cache.canon = new Set();
    _cache.nipata = new Set((listas ? listas.nipata : []).map(cotejo));
    _cache.huella = huella === undefined ? null : huella;
    // Las cuentas del canon, si el léxico las trae (léxico fragmentado):
    // árbitro de la señal «posible» de la etapa 3. Con un Set de formas
    // (arnés de la etapa 1) no hay cuentas y la señal «posible» calla.
    _cache.frecuencia = typeof base.frecuencia === "function"
        ? q => base.frecuencia(q) : () => 0;
    // El testigo del DPD (decisión del IEBH, 2026-08-28): sólo se enciende
    // si el léxico lo declara (`conDpd`) — con fragmentos sin la marca,
    // «no figura en el DPD» sería verdad de todo. Con un Set de formas
    // (arnés de la etapa 1) queda apagado, como el Python sin --dpd-filtro.
    _cache.esDpd = (base.conDpd && typeof base.enDpd === "function")
        ? q => base.enDpd(q) : null;
    // Los casos adjudicados por lectores: cada fallo reportado, un caso
    // permanente con fuente y fecha (decisión del Venerable, briefing 30
    // §3.5). El motor los consulta como al banco.
    _cache.casos = new Map();
    for (const c of ((casos && casos.casos) || []))
        _cache.casos.set(cotejo(c.forma), c);
    _cache.patrones = (casos && casos.patrones) || [];
    _cache.noSandhi = (casos && casos.no_sandhi) || [];
}

function esPalabra(t) { return _cache.lexico.has(cotejo(t)); }

// ── Las descomposiciones del DPD: fuera, por decisión del Venerable ─────
// En el Python, `descomposicion()` bisecta el TSV del DPD si existe. En el
// porte el DPD no interviene: siempre `[]`. (El archivo tampoco vino en la
// entrega; el Python de referencia mide con él ausente.)
function descomposicion(_voz) { return []; }

// ── El vecindario ───────────────────────────────────────────────────────
// Para cada punto de corte se enumeran las voces que, de existir, podrían
// haber producido ese prefijo y ese sufijo. No decide: enumera. Filtra el
// léxico, y decide la recomposición.

function vecinosA(pre) {
    const v = new Set([pre]);
    if (pre) {
        for (const x of VOCALES) {
            v.add(pre + x);                    // se le elidió la vocal final (§12…)
            v.add(pre.slice(0, -1) + x);       // se le sustituyó (y, v, largo, corto)
        }
        v.add(pre + "ṃ");                      // se le elidió la niggahīta (§38, §39)
        for (const x of VOCALES) {
            // §38 y la nota 17: elididas niggahīta Y vocal anterior, el
            // prefijo queda desnudo — de «paripucchiṃ» queda «paripucch».
            v.add(pre + x + "ṃ");
        }
        const ult = pre[pre.length - 1];
        if (NASALES.includes(ult)) v.add(pre.slice(0, -1) + "ṃ");  // §31–§33
        if ("md".includes(ult)) v.add(pre.slice(0, -1) + "ṃ");     // §34
        if (pre.endsWith("abbh")) v.add(pre.slice(0, -4) + "abhi"); // §44
        if (pre.endsWith("ajjh")) v.add(pre.slice(0, -4) + "adhi"); // §45
        if (pre.endsWith("paṭi")) v.add(pre.slice(0, -4) + "pati"); // §48
        if (pre.endsWith("o") || pre.endsWith("u"))
            v.add(pre.slice(0, -1) + "ava");                        // §50, §79
        if ("yvmdntrlhg".includes(ult))
            v.add(pre.slice(0, -1));           // se le insertó una consonante (§35)
        // Devolver la niggahīta: §31 la volvió nasal de serie, §32/§33 «ñ»,
        // el «vā» de §31 «l». Sin esto, de `taññeva` nunca salía `taṃ + eva`.
        if ("ṅñṇnml".includes(ult)) v.add(pre.slice(0, -1) + "ṃ");
        if (pre.endsWith("cc") || pre.endsWith("c"))
            v.add(pre.replace(/c+$/u, "") + "ti");  // §19: «ti» quedó en «c»
        // §51: transposición de r, h, n — los dos saltos que el banco
        // atestigua. Sin esto, de «anabhineyya» nunca se propone «na».
        for (let i = 0; i < pre.length; i++) {
            if (!"rhn".includes(pre[i])) continue;
            for (const salto of [1, 2]) {
                for (const j of [i - salto, i + salto]) {
                    if (j >= 0 && j < pre.length) {
                        const L = pre.split("");
                        [L[i], L[j]] = [L[j], L[i]];
                        v.add(L.join(""));
                    }
                }
            }
        }
    }
    v.delete("");
    return v;
}

function vecinosB(suf) {
    const v = new Set([suf]);
    if (suf) {
        for (const x of VOCALES) {
            v.add(x + suf);                    // se le elidió la vocal inicial (§13)
            v.add(x + suf.slice(1));           // se le sustituyó o alargó (§14, §15…)
        }
        if (suf.length > 1 && suf[0] === suf[1])
            v.add(suf.slice(1));               // se duplicó (§28, §29)
        if (suf.length > 1
            && ["kk", "cc", "ṭṭ", "tt", "pp"].includes(suf.slice(0, 2)))
            v.add(suf.slice(1));
        if ("yvmdntrlhg".includes(suf[0]))
            v.add(suf.slice(1));               // se insertó una consonante (§35)
        if (suf[0] === "ḷ")
            v.add(suf.slice(1));               // la «ḷ» de la nota 9, tras «cha»
        // §32 y §33 dejan una «ñ» al principio de la voz que sigue.
        if (suf[0] === "ñ") {
            v.add(suf.slice(1));               // §32: la «ñ» duplicada
            v.add("y" + suf.slice(1));         // §33: la «y» que se volvió «ñ»
        }
        if (suf.startsWith("riva"))
            v.add("eva" + suf.slice(4));       // §22: la «e» de «eva» dio «ri»
        for (const [dig, simple] of Object.entries(OP.SEGUNDA_CUARTA)) {
            if (suf.startsWith(simple + dig))
                v.add(suf.slice(simple.length));   // §29
        }
    }
    v.delete("");
    return v;
}

// ── El filtro de cadenas, del lado nuestro ──────────────────────────────

function sinAnotacion(paso) {
    // El texto de un paso, sin la anotación final entre paréntesis. Se
    // reconoce CUALQUIER paréntesis final (el contrato del encargo).
    return (paso || "").replace(/\s*\([^)]*\)\s*$/u, "").trim();
}

function pasoQueNoHaceNada(pasos) {
    // ¿Hay un paso cuyo texto es idéntico al anterior? Un aforismo que no
    // cambia una letra no se aplicó; se descarta la cadena entera.
    let prev = null;
    for (const paso of pasos) {
        const texto = sinAnotacion(paso);
        if (prev !== null && texto === prev) return true;
        prev = texto;
    }
    return false;
}

function letraAjena(n, pasos) {
    // ¿El paso de §17/§18/§21 sustituye por la letra que NO es la suya?
    const marca = `(§${n})`;
    const letra = OP.LETRA_SUST[n];
    for (const paso of pasos) {
        if (!paso.trimEnd().endsWith(marca)) continue;
        const solas = sinAnotacion(paso).split(/\s+/u)
            .filter(x => x === "y" || x === "v");
        if (solas.length && !(solas.length === 1 && solas[0] === letra))
            return true;
    }
    return false;
}

function bienFormada(pasos) {
    // El último segmento de cada paso tiene que poder pronunciarse: una voz
    // sin vocal no es una voz. (Red de seguridad; hoy no descarta nada.)
    for (const paso of pasos) {
        const texto = sinAnotacion(paso);
        for (const alternativa of texto.split(",")) {
            const fichas = alternativa.split(/\s+/u).filter(x => x);
            if (fichas.length) {
                const ult = fichas[fichas.length - 1];
                if (![...ult].some(c => VOCALES.includes(c))) return false;
            }
        }
    }
    return true;
}

// ── Aplicar la operación §n ─────────────────────────────────────────────
// Para las nueve que el Venerable implementó, el verificador es el suyo;
// para las demás, el nuestro, con su enunciado.

const NUEVE_DEL_VENERABLE = new Set([12, 13, 15, 16, 17, 18, 21, 28, 35]);

function esVocalSust(n) {
    return typeof n === "number" && Object.prototype.hasOwnProperty
        .call(OP.VOCAL_SUST, n);
}

function forward(n, a, b, F) {
    if (esVocalSust(n) && !OP.licenciaSustitucion(a, b, n)) {
        // §17 sustituye la «e» final, §18 la «o» y la «u», §21 la «i» y la
        // «ī»: no se le pregunta al derivador por un aforismo que no cubre
        // el par.
        return null;
    }
    if ((n === 13 || n === 16 || n === "38+13")
            && !OP.licenciaElisionSiguiente(a, b)) {
        // §13 es «Vā paro asarūpā»: sólo tras vocal DISÍMIL. Con vocales
        // de la misma clase manda §12 (+§15) — adjudicación del IEBH,
        // 2026-08-29, observación sobre assasāmīti.
        return null;
    }
    let pasos;
    if (typeof n === "number" && NUEVE_DEL_VENERABLE.has(n)) {
        pasos = D.derivar(n, a + " " + b, F);
    } else {
        const f = OP.TODAS.get(n);
        pasos = f ? f(a, b, F) : null;
    }
    if (!pasos) return null;
    if (pasoQueNoHaceNada(pasos)) return null;
    if (esVocalSust(n) && letraAjena(n, pasos)) return null;
    return pasos;
}

const ORDEN = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 44, 45, 48, 49, 50, 51,
    79, 183, 269, "17+25", "18+25", "21+25", "35+26", "38+12", "38+13",
    "31vā", "35nota9", "S49"];

// ── Filtros de voces ────────────────────────────────────────────────────

function soloVocal(t) {
    // Una sola vocal no puede ser la voz que sigue: los upasagga son
    // prefijos, van delante, nunca detrás.
    const c = cotejo(t);
    return c.length === 1 && VOCALES.includes(c);
}

function esDesinencia(t) {
    // Una vocal más niggahīta no es una voz: es una desinencia (`aṃ`, `iṃ`,
    // `uṃ`). `taṃ`, `yaṃ`, `kiṃ` sí son voces: tienen consonante.
    const c = cotejo(t);
    return c.length === 2 && VOCALES.includes(c[0]) && c[1] === "ṃ";
}

function compuestoDelLexico(t, piezas = 3) {
    // La voz no está en el léxico, pero es la suma de voces que sí están.
    // No analiza el compuesto —fuera del encargo—: sólo comprueba que lo es.
    const lex = _cache.lexico;
    t = cotejo(t);
    if (t.length < 6) return null;
    if (lex.has(t)) return [t];
    if (piezas < 2) return null;
    for (let i = 3; i < t.length - 2; i++) {
        const a = t.slice(0, i), b = t.slice(i);
        if (!lex.has(a)) continue;
        if (lex.has(b)) return [a, b];
        const resto = compuestoDelLexico(b, piezas - 1);
        if (resto) return [a].concat(resto);
    }
    return null;
}

// ── Comparadores: el orden del Python, exactamente ──────────────────────
// Python ordena por (dpd, nipāta, str(sutta), componentes). Las cadenas se
// comparan por puntos de código; para el pāḷi (BMP) el `<` de JS coincide.

function cmpStr(a, b) { return a < b ? -1 : a > b ? 1 : 0; }

function cmpLista(a, b) {
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) {
        const c = cmpStr(a[i], b[i]);
        if (c) return c;
    }
    return a.length - b.length;
}

// ── Proponer: de la forma a los componentes ─────────────────────────────

function proponer(F, unaVoz = true, compuestos = false) {
    // Todas las lecturas que recomponen exactamente F. Ordenadas, sin
    // repetir. `unaVoz` distingue los dos casos del punto D10: dentro de una
    // palabra, una cadena cuya yuxtaposición ya da la forma es un rodeo.
    const lex = _cache.lexico;
    const vistas = new Set();
    const out = [];
    for (let i = 1; i < F.length; i++) {
        const admisible = compuestos
            ? (x => lex.has(cotejo(x)) || Boolean(compuestoDelLexico(x)))
            : (x => lex.has(cotejo(x)));
        const A = [...vecinosA(F.slice(0, i))]
            .filter(x => admisible(x) && !esDesinencia(x));
        if (!A.length) continue;
        const B = [...vecinosB(F.slice(i))]
            .filter(x => lex.has(cotejo(x)) && !soloVocal(x)
                && !esDesinencia(x));
        for (const a of A) {
            for (const b of B) {
                for (const n of ORDEN) {
                    const k = a + "\u0000" + b + "\u0000" + String(n)
                        + typeof n;
                    if (vistas.has(k)) continue;
                    vistas.add(k);
                    if (unaVoz && cotejo(a) + cotejo(b) === F) {
                        // Elidir algo y volver a ponerlo no es explicar
                        // nada: sin diferencia con la yuxtaposición no hay
                        // operación que citar.
                        continue;
                    }
                    const pasos = forward(n, a, b, F);
                    if (!pasos || !bienFormada(pasos)) continue;
                    out.push({ componentes: [a, b], sutta: n, pasos,
                               reconstruida: F, recompone: true,
                               procedencia: "propuesta automática" });
                }
            }
        }
    }
    // En solo-canon `descomposicion()` calla siempre: el primer criterio del
    // orden (coincidir con el DPD) no mueve nada, y queda el de nipāta.
    const dpd = new Set();
    for (const d of descomposicion(F)) {
        for (let i = 0; i < d.length - 1; i++)
            dpd.add(cotejo(d[i]) + "+" + cotejo(d[i + 1]));
        dpd.add(cotejo(d[0]) + "+" + cotejo(d.slice(1).join("")));
    }
    const nip = _cache.nipata;
    const claveDpd = x => dpd.has(x.componentes.map(cotejo).join("+")) ? 0 : 1;
    // Con el testigo encendido, una lectura cuyas DOS piezas figuran en el
    // diccionario va antes que una con piezas que sólo el corpus atestigua:
    // `na + atthi` antes que `natti + hi`. Ordenación, no análisis.
    const dic = _cache.esDpd;
    const claveDic = dic
        ? (x => x.componentes.every(y => dic(cotejo(y))) ? 0 : 1)
        : (() => 0);
    const claveNip = x =>
        nip.has(cotejo(x.componentes[x.componentes.length - 1])) ? 0 : 1;
    out.sort((x, y) =>
        (claveDpd(x) - claveDpd(y))
        || (claveDic(x) - claveDic(y))
        || (claveNip(x) - claveNip(y))
        || cmpStr(String(x.sutta), String(y.sutta))
        || cmpLista(x.componentes, y.componentes));
    for (const x of out)
        if (dpd.has(x.componentes.map(cotejo).join("+"))) x.dpd = true;
    return out;
}

function proponerEnFrase(escrita) {
    // Una frase tiene varias junturas y el sandhi ocurre en una. Se prueba
    // cada juntura por separado y se deja el resto de la frase intacto.
    const fichas = escrita.split(/\s+/u).filter(x => x);
    if (fichas.length < 2) return [];
    const out = [];
    for (let i = 0; i < fichas.length - 1; i++) {
        for (const l of proponer(cotejo(fichas[i] + fichas[i + 1]), false)) {
            const copia = Object.assign({}, l);
            copia.contexto = { antes: fichas.slice(0, i),
                               despues: fichas.slice(i + 2) };
            copia.reconstruida = fichas.slice(0, i)
                .concat([fichas[i] + fichas[i + 1]])
                .concat(fichas.slice(i + 2)).join(" ");
            out.push(copia);
        }
    }
    return out;
}

function proponerEnMarca(voz) {
    // Cuando el escriba dijo dónde está la juntura —apóstrofo o guion—, se
    // propone ahí y no a ciegas. El guion puede marcar un compuesto sin
    // operación; el apóstrofo marca una elisión.
    const partes = voz.split(new RegExp("[" + MARCAS + "]", "u"));
    if (partes.length !== 2 || !partes.every(x => x)) return [];
    const [aPre, bSuf] = partes;
    const F = cotejo(voz);
    const lex = _cache.lexico;
    if (voz.includes("-") && lex.has(cotejo(aPre)) && lex.has(cotejo(bSuf))
        && cotejo(aPre) + cotejo(bSuf) === F)
        return [{ yuxtaposicion_declarada: [aPre, bSuf] }];
    const vistas = new Set();
    const out = [];
    const A = [...vecinosA(cotejo(aPre))]
        .filter(x => lex.has(cotejo(x)) && !esDesinencia(x));
    const B = [...vecinosB(cotejo(bSuf))]
        .filter(x => lex.has(cotejo(x)) && !soloVocal(x) && !esDesinencia(x));
    for (const a of A) {
        for (const b of B) {
            for (const n of ORDEN) {
                const k = a + "\u0000" + b + "\u0000" + String(n) + typeof n;
                if (vistas.has(k)) continue;
                vistas.add(k);
                const pasos = forward(n, a, b, F);
                if (!pasos || !bienFormada(pasos)) continue;
                out.push({ componentes: [a, b], sutta: n, pasos,
                           reconstruida: F, recompone: true,
                           procedencia: "propuesta automática",
                           corte_declarado: true });
            }
        }
    }
    const nip = _cache.nipata;
    const claveNip = x =>
        nip.has(cotejo(x.componentes[x.componentes.length - 1])) ? 0 : 1;
    out.sort((x, y) =>
        (claveNip(x) - claveNip(y))
        || cmpStr(String(x.sutta), String(y.sutta))
        || cmpLista(x.componentes, y.componentes));
    return out;
}

function yuxtaposicion(F) {
    // Los cortes que parten la forma en dos voces reales SIN ninguna
    // operación: un compuesto, fuera del encargo.
    const lex = _cache.lexico;
    const out = [];
    for (let i = 2; i < F.length - 1; i++) {
        const a = F.slice(0, i), b = F.slice(i);
        if (lex.has(cotejo(a)) && lex.has(cotejo(b))
            && !esDesinencia(a) && !esDesinencia(b) && !soloVocal(b))
            out.push([a, b]);
    }
    return out;
}

// ── Resolver: el porte de `solucionar()` ────────────────────────────────

// Pakati es la ausencia de operación: no hay corte que buscar.
const PAKATI = new Set([23, 24, 30]);
const N_OP = ORDEN.filter(n => typeof n === "number").length;

function nombreLexico() {
    // El porte es solo-canon: el DPD no interviene y no se nombra.
    return "del canon (Sexto Concilio)";
}

function huellaBanco() {
    // En Python se calcula acá, leyendo el archivo. El motor JS no lee
    // archivos: la huella la calcula quien carga (el arnés en Node, el
    // cargador en el navegador) y la pasa por `iniciar()`.
    return _cache.huella;
}

function juntarIguales(lecturas) {
    // Dos fuentes pueden traer la misma lectura: se muestra una vez, con las
    // dos procedencias. La clave incluye la cadena, no sólo los componentes
    // —si difieren en un paso o un aforismo son DOS lecturas y salen las
    // dos—. El paso «(EM)» no distingue: es la edición moderna, no un
    // aforismo. Los espacios tampoco.
    const fusion = new Map();
    for (const x of lecturas) {
        const pasosClave = x.pasos.map(
            p => p.split(/\s+/u).filter(t => t).join(" "));
        while (pasosClave.length
               && pasosClave[pasosClave.length - 1].trimEnd().endsWith("(EM)"))
            pasosClave.pop();
        const k = cotejo(x.componentes.join(""))
            + "\u0000" + pasosClave.join("\u0000");
        if (fusion.has(k)) {
            const y = fusion.get(k);
            if (x.origen) {
                if (!y.tambien_en) y.tambien_en = [];
                y.tambien_en.push(x.origen);
            }
            if (x.procedencia === "firmada") y.procedencia = "firmada";
        } else {
            fusion.set(k, x);
        }
    }
    return [...fusion.values()];
}

function compuestoAparente(c) {
    // La forma se parte, sin operación, en dos voces del léxico de las que
    // la segunda NO es una partícula: un compuesto junta dos nombres.
    const nip = _cache.nipata;
    for (const [, b] of yuxtaposicion(c)) {
        const cb = cotejo(b);
        if (!nip.has(cb) && cb.length >= 3) return true;
    }
    return false;
}

function senal(voz) {
    // ¿Hay motivo para SOSPECHAR sandhi en esta voz, antes de proponer nada?
    // Señales medidas (`medir_deteccion_canon.py`). La del DPD calla en
    // solo-canon.
    const c = cotejo(voz);
    if ([...MARCAS].some(x => voz.includes(x))) {
        // En solo-canon el sello ortográfico asciende a señal: es la
        // edición diciendo dónde está la juntura.
        return ["segura", "la edición marcó la juntura: apóstrofo o guion"];
    }
    if (descomposicion(voz).length)
        return ["segura",
                "el DPD publica su propia descomposición de esta voz"];
    if (c.endsWith("ti") && c.length > 3 && "āīū".includes(c[c.length - 3]))
        return ["segura", "cola de «iti»: vocal larga antes de «ti»"];
    if (!esPalabra(voz) && !compuestoAparente(c))
        return ["segura", "la voz no está en el léxico " + nombreLexico()
                + ", y tampoco se parte en dos voces del léxico sin operación"];
    return [null, ""];
}

function paresDelLexico(F) {
    // Los cortes que parten la voz en dos voces que el léxico reconoce.
    // Filtra exactamente igual que `proponer()`, y por la misma razón.
    const lex = _cache.lexico;
    const out = [];
    for (let i = 1; i < F.length; i++) {
        const A = [...vecinosA(F.slice(0, i))]
            .filter(x => lex.has(cotejo(x)) && !esDesinencia(x));
        if (!A.length) continue;
        for (const b of [...vecinosB(F.slice(i))]
            .filter(x => lex.has(cotejo(x)) && !soloVocal(x)
                && !esDesinencia(x))) {
            for (const a of A) out.push([a, b]);
        }
    }
    return out;
}

function porQueNo(voz, k) {
    // Por qué no se resolvió, dicho en el orden en que sirve. No se propone
    // una corrección de lo escrito: se informa qué se comprobó.
    const entera = esPalabra(voz);
    const pares = paresDelLexico(k);
    const d = {
        la_voz_esta_en_el_lexico: entera,
        cortes_en_dos_voces_del_lexico: pares.length,
        ejemplos_de_corte: pares.slice(0, 6).map(p => p.join(" + ")),
        aforismos_probados: ORDEN.filter(n => typeof n === "number"),
    };
    if (!entera && !pares.length)
        return ["la voz NO está en el léxico " + nombreLexico()
            + ", y ningún corte la parte en dos voces que el léxico "
            + "reconozca. O la forma está mal escrita, o alguna de sus "
            + "piezas falta en el léxico.", d];
    if (!entera)
        return ["la voz NO está en el léxico " + nombreLexico()
            + `. Hay ${pares.length} corte(s) en dos voces reales, pero `
            + `ninguna de las ${N_OP} operaciones enunciadas los lleva a `
            + "esta forma. Conviene revisar cómo está escrita antes de "
            + "buscarle una regla.", d];
    if (!pares.length)
        return ["la voz está en el léxico como palabra entera, pero ningún "
            + "corte la parte en dos voces que el léxico reconozca.", d];
    return [`hay ${pares.length} corte(s) en dos voces del léxico, pero `
        + `ninguna de las ${N_OP} operaciones enunciadas los lleva a esta `
        + "forma. Puede que la operación no esté enunciada en el capítulo 1, "
        + "o que el análisis necesite más de dos piezas.", d];
}

// Los aforismos «ruidosos» para la DETECCIÓN, no para la validez: alargar o
// acortar (§25, §26), duplicar (§28, §29) e insertar (§35, §37) producen
// lecturas verificadas sobre flexiones corrientes. La lectura se publica
// igual; lo que no hace es, por sí sola, encender la señal.
const RUIDOSAS = new Set([25, 26, 28, 29, 35, 37, "35+26", "35nota9"]);

function solucionar(voz) {
    // Resuelve, y completa la señal con lo que las lecturas permiten decir
    // (la señal «posible» de la etapa 3). El cuerpo está en `_solucionar`;
    // esta envoltura sólo toca `senal`/`senal_motivo`, nunca las lecturas
    // ni el estado. Números y porqués: `_ascender_senal` del Python.
    const r = _solucionar(voz);
    ascenderSenal(r);
    silenciarNoSandhi(r);
    aplicarCaso(r);
    aplicarPatron(r);
    return r;
}

function silenciarNoSandhi(r) {
    // Las reglas negativas adjudicadas (`no_sandhi` de casos-reportados):
    // la primera, del IEBH (2026-08-28): -tvā y -tvāna son absolutivos,
    // indeclinables — la señal calla. Va ANTES de aplicarCaso: un caso
    // sandhi=true mandaría sobre la regla. Porqués:
    // `_silenciar_no_sandhi` del Python.
    if (!r.senal) return;
    const c = r.cotejo;
    for (const regla of (_cache.noSandhi || [])) {
        // Por TERMINACIÓN (-tvā, -tvāna: la clase entera) o por FORMA
        // exacta (pañca: la voz suelta). Las dos hacen falta y no son
        // intercambiables: una terminación «ñca» callaría la familia
        // entera de §31, que es justamente la firmada.
        const formas = (regla.formas || []).map(f => cotejo(f));
        if ((regla.terminaciones || []).some(t => c.endsWith(t))
            || formas.includes(c)) {
            r.senal = null;
            r.senal_motivo = null;
            return;
        }
    }
}

function patronNiggahitaM(r, patron, frec, fForma) {
    // El patrón de §34: niggahīta → m ante vocal, con segunda voz corriente.
    // Aprobado por el IEBH el 2026-08-29. Candidatas: lecturas verificadas
    // (base, seg) con base en «ṃ», seg en vocal y superficie EXACTAMENTE
    // base[:-1] + "m" + seg; resguardo por los DOS lados (piso =
    // max(frec(forma), 1)); gemelas de vocal inicial → la BREVE; si queda
    // exactamente UNA, se afirma. Receta, medición y porqués:
    // `_patron_niggahita_m` del Python (informe-niggahita-m.md). Régimen
    // medido (IEBH, 2026-08-30): sólo afirma formas con frecuencia >=
    // frec_minima; fuera de ahí el resguardo se debilita y la medición no
    // llegó — porqués en el Python.
    if (fForma < (patron.frec_minima || 0)) return false;
    const sup = r.cotejo;
    const piso = Math.max(fForma, 1);
    const cand = new Set();
    for (const l of (r.lecturas || [])) {
        const comp = (l.componentes || []).map(cotejo);
        if (comp.length === 2 && comp[0].length >= 2
            && comp[0].endsWith("ṃ")
            && OP.VOCALES.includes(comp[1][0] || "")
            && comp[0].slice(0, -1) + "m" + comp[1] === sup
            && (frec(comp[0]) || 0) >= piso
            && (frec(comp[1]) || 0) >= piso)
            cand.add(comp[0] + " " + comp[1]);
    }
    let pares = [...cand].sort().map(x => x.split(" "));
    if (pares.length === 2) {
        const [[b1, s1], [b2, s2]] = pares;
        if (b1 === b2 && s1 && s2 && s1.slice(1) === s2.slice(1)
            && OP.LARGA[s1[0]] === s2[0])
            pares = [[b1, s1]];
    }
    if (pares.length !== 1) return false;
    const base = pares[0][0], seg = pares[0][1];
    const delante = [], detras = [];
    for (const l of r.lecturas) {
        const comp = (l.componentes || []).map(cotejo);
        if (comp.length === 2 && comp[0] === base && comp[1] === seg) {
            l.patron = patron.fuente || "";
            delante.push(l);
        } else {
            detras.push(l);
        }
    }
    r.lecturas = delante.concat(detras);
    r.senal = "segura";
    r.senal_motivo = `niggahīta → m ante vocal (§34): la única lectura de `
        + `la clase que pasa el resguardo es «${base} + ${seg}» — patrón `
        + `adjudicado (${patron.fuente || ""})`;
    return true;
}

function aplicarPatron(r) {
    // Los patrones adjudicados: cola enclítica con base única atestiguada.
    // Porqués y licencia: `_aplicar_patron` del Python. La unicidad es la
    // licencia, no la frecuencia; el caso y el banco mandan sobre el patrón.
    if (r.del_banco
        || r.escrita.trim().split(/\s+/u).filter(t => t).length !== 1)
        return;
    const casoDe = _cache.casos.get(r.cotejo);
    if (casoDe && !casoDe.sandhi) return;   // adjudicado no-sandhi: calla
    const lecturas = r.lecturas || [];
    if (lecturas.length && (lecturas[0].adjudicada || lecturas[0].origen))
        return;
    const frec = _cache.frecuencia;
    const fForma = frec(r.cotejo) || 0;
    for (const patron of (_cache.patrones || [])) {
        // La clase de §34 no se declara por la segunda voz sino por la «m»
        // de la juntura: otra licencia, otra función. Porqués y receta
        // medida: `_patron_niggahita_m` del Python.
        if (patron.clase === "niggahita_m") {
            if (patronNiggahitaM(r, patron, frec, fForma)) return;
            continue;
        }
        const seg = cotejo(patron.segunda || "");
        if (!seg) continue;
        // El resguardo de la base residual, adjudicado por el IEBH
        // (2026-08-28, sesión 32): la base candidata debe ser al menos tan
        // frecuente como la forma entera — «ho» (4) ya no concede la
        // unicidad a hoti (59.320), ni una base de 1 aparición la niega.
        // Porqués completos: `_aplicar_patron` del Python.
        let bases = new Set();
        for (const l of lecturas) {
            const comp = (l.componentes || []).map(cotejo);
            if (comp.length === 2 && comp[1] === seg
                && (frec(comp[0]) || 0) >= Math.max(fForma, 1))
                bases.add(comp[0]);
        }
        // Regla de la clase vocálica, adjudicada por el IEBH (2026-08-28):
        // «hotīti es sólo hoti + iti y hotūti es sólo hotu + iti». Ver
        // `_aplicar_patron` del Python.
        if (patron.clase_vocal && patron.remanente) {
            const rem = patron.remanente;
            const sup = r.cotejo;
            if (sup.endsWith(rem) && sup.length > rem.length) {
                const vSup = sup[sup.length - rem.length - 1];
                const clase = { "a": "a", "ā": "a", "i": "i", "ī": "i",
                                "u": "u", "ū": "u", "e": "e", "o": "o" };
                if (vSup in clase) {
                    bases = new Set([...bases].filter(
                        b => b && b[b.length - 1] in clase
                            && clase[b[b.length - 1]] === clase[vSup]));
                }
            }
        }
        // Desempate adjudicado: la base breve frente a su gemela con la
        // vocal final alargada (pabbajjāya / pabbajjāyā) — la larga suele
        // ser el producto del propio sandhi. Ver `_aplicar_patron`.
        if (bases.size === 2) {
            const par = [...bases].sort();
            const corta = par[0], larga = par[1];
            const L = OP.LARGA[corta[corta.length - 1]];
            if (L && corta.slice(0, -1) + L === larga)
                bases = new Set([corta]);
        }
        if (bases.size !== 1) continue;
        const base = [...bases][0];
        const delante = [], detras = [];
        for (const l of lecturas) {
            const comp = (l.componentes || []).map(cotejo);
            if (comp.length === 2 && comp[0] === base && comp[1] === seg) {
                l.patron = patron.fuente || "";
                delante.push(l);
            } else {
                detras.push(l);
            }
        }
        r.lecturas = delante.concat(detras);
        r.senal = "segura";
        r.senal_motivo = `cola de «${seg}»: la única primera voz atestiguada `
            + `en el canon es «${base}» — patrón adjudicado `
            + `(${patron.fuente || ""})`;
        return;
    }
}

function aplicarCaso(r) {
    // Un caso adjudicado manda sobre la señal, y su lectura va primera —
    // con su fuente, siempre. Porqués y el primer caso (tenupasaṅkami):
    // `_aplicar_caso` del Python.
    const caso = _cache.casos.get(r.cotejo);
    if (!caso) return;
    if (!caso.sandhi) {
        // Adjudicado NO-sandhi: la adjudicación manda sobre la heurística y
        // la señal se apaga (caso «navo», DN 2).
        if (r.senal) { r.senal = null; r.senal_motivo = ""; }
        return;
    }
    const objetivo = partirComponentes(caso.componentes || "").map(cotejo);
    const delante = [], detras = [];
    for (const l of (r.lecturas || [])) {
        const comp = (l.componentes || []).map(cotejo);
        if (objetivo.length && comp.length === objetivo.length
            && comp.every((x, i) => x === objetivo[i])) {
            l.adjudicada = caso.fuente || "";
            delante.push(l);
        } else {
            detras.push(l);
        }
    }
    if (objetivo.length && !delante.length) {
        // El motor no produce (todavía) la lectura adjudicada — casos de
        // TRES voces (idamavocāyasmā). Va primera, sintética, pendiente de
        // derivación. Porqués: `_aplicar_caso` del Python.
        // El paréntesis dice el porqué VERDADERO: tres voces piden
        // combinar(); dos voces que el motor no corta (pakati §23) no son
        // junturas múltiples. Espejo de `_aplicar_caso` (2026-08-29).
        const porque = objetivo.length > 2
            ? "junturas múltiples" : "el motor no propone este corte";
        delante.push({
            componentes: partirComponentes(caso.componentes || ""),
            pasos: [],
            adjudicada: caso.fuente || "",
            pendiente: `el motor aún no deriva esta lectura (${porque})`,
        });
    }
    r.lecturas = delante.concat(detras);
    // La adjudicación asciende la señal a «segura» venga de donde venga;
    // si ya era «segura» por otra vía, el motivo original se conserva.
    if (r.senal !== "segura") {
        r.senal = "segura";
        r.senal_motivo = "caso adjudicado: " + (caso.fuente || "");
    }
}

function ascenderSenal(r) {
    if (r.senal || r.escrita.trim().split(/\s+/u).filter(t => t).length !== 1)
        return;
    if (r.del_banco && r.estado !== "sin_sandhi_por_regla") {
        r.senal = "segura";
        r.senal_motivo = "la forma está en el banco, con secuencia de "
            + "procedencia";
        return;
    }
    const frec = _cache.frecuencia;
    const nip = _cache.nipata;
    const fF = frec(r.cotejo);
    for (const l of (r.lecturas || [])) {
        const comp = (l.componentes || []).map(cotejo);
        if (comp.length < 2 || !nip.has(comp[comp.length - 1])) continue;
        if (RUIDOSAS.has(l.sutta)) continue;
        if (Math.min(...comp.map(c => frec(c))) > fF) {
            r.senal = "posible";
            r.senal_motivo = "una lectura verificada la parte en dos voces "
                + "más frecuentes en el canon que la forma entera, con la "
                + "segunda en la lista cerrada de nipāta";
            return;
        }
    }
    // El testigo del DPD: la voz está escrita pero no figura en el
    // diccionario ni se parte en dos voces del diccionario sin operación —
    // lo típico de un producto de sandhi. Números y porqués:
    // `_ascender_senal` del Python.
    const dic = _cache.esDpd;
    if (dic && !dic(r.cotejo) && !compuestoDpd(r.cotejo)) {
        r.senal = "posible";
        r.senal_motivo = "la voz no figura en el diccionario (DPD, "
            + "testigo de ocurrencia) ni se parte en dos "
            + "voces del diccionario sin operación";
    }
}

function compuestoDpd(c) {
    // ¿Se parte en dos voces del diccionario por simple concatenación?
    const dic = _cache.esDpd;
    if (!dic) return false;
    for (let i = 2; i < c.length - 1; i++) {
        if (dic(c.slice(0, i)) && dic(c.slice(i))) return true;
    }
    return false;
}

function _solucionar(voz) {
    const k = cotejo(voz);
    const r = { escrita: voz, cotejo: k, estado: null, motivo: null,
                lecturas: [], banco: huellaBanco() };
    const fichas = voz.trim().split(/\s+/u).filter(t => t);
    if (fichas.length === 1) {
        const [s, m] = senal(voz);
        r.senal = s; r.senal_motivo = m;
    } else {
        r.senal = null; r.senal_motivo = "";
    }

    if (_cache.banco.has(k)) {
        for (const { dato, archivo, clave } of _cache.banco.get(k)) {
            let pasos, comp, primerPasoDe, proc, ref, sinOp;
            if ("s" in dato) {                                // reglas.json
                pasos = dato.s.slice();
                comp = partirComponentes(dato.comp || "");
                primerPasoDe = null;
                // La etiqueta tiene que ser cierta: «firmada» sólo con la
                // marca `verificada` del banco.
                proc = dato.verificada ? "firmada"
                                       : "del banco, sin comprobar";
                ref = dato.ref !== undefined ? dato.ref : null;
                sinOp = Boolean(dato.sin_cambio) || dato.sec === "pakati";
            } else {                                          // las Tablas
                pasos = (dato.pasos || []).map(p =>
                    p.texto + (p.citas && p.citas.length
                        ? "  (" + p.citas.join(", ") + ")" : ""));
                const inicial = dato.forma_inicial || "";
                // La forma de partida es el primer paso; las Tablas la
                // guardan aparte y arrancan en §10. Sin unificar, la misma
                // cadena salía dos veces.
                if (inicial && (!pasos.length
                    || pasos[0].trimEnd().endsWith(")")))
                    pasos = [inicial].concat(pasos);
                comp = partirComponentes(inicial);
                const p0 = (dato.pasos && dato.pasos.length
                    ? dato.pasos : [{}])[0];
                primerPasoDe = p0.forma_de_partida !== undefined
                    ? p0.forma_de_partida : null;
                proc = "firmada";
                ref = dato.referencia !== undefined ? dato.referencia : null;
                sinOp = !(dato.suttas_que_operan
                          && dato.suttas_que_operan.length);
            }
            // «Sin operación» sólo si ninguna opera: si la cadena cita un
            // aforismo que no es pakati ni andamiaje (§10, §11), opera.
            const citados = new Set();
            for (const m of pasos.join(" ").matchAll(/§\s*(\d+)/gu))
                citados.add(parseInt(m[1], 10));
            for (const excl of [...PAKATI, 10, 11]) citados.delete(excl);
            if (citados.size) sinOp = false;
            const ultimo = pasos.length
                ? sinAnotacion(pasos[pasos.length - 1]) : "";
            let recompone = Boolean(ultimo) && cotejo(ultimo) === k;
            if (recompone && proc === "del banco, sin comprobar")
                proc = "del banco, último paso comprobado";
            r.lecturas.push({
                componentes: comp, pasos,
                reconstruida: pasos.length ? pasos[pasos.length - 1] : voz,
                recompone, procedencia: proc,
                origen: { archivo, clave }, referencia: ref,
                sin_operacion: sinOp, primer_paso_de: primerPasoDe,
            });
        }
        r.lecturas = juntarIguales(r.lecturas);

        // Las filas de las Tablas que quedaron mal partidas: al paso pegado
        // le falta `forma_de_partida`, y una fila pakati legítima tiene un
        // solo paso — se exige más de uno.
        for (const x of r.lecturas) {
            if (!(((x.origen && x.origen.archivo) || "").includes("tablas")))
                continue;
            if (x.pasos.length > 1 && !x.primer_paso_de)
                x.fila_mal_partida = true;
        }
        r.banco_mal_partido = r.lecturas
            .filter(x => x.fila_mal_partida)
            .map(x => ({ componentes: x.componentes, pasos: x.pasos,
                         origen: x.origen }));
        r.lecturas = r.lecturas.filter(x => !x.fila_mal_partida);

        // Lo que no recompone no se publica; se anota aparte para que el
        // defecto del banco se vea en vez de taparse.
        r.banco_no_recompone = r.lecturas
            .filter(x => !x.recompone)
            .map(x => ({ componentes: x.componentes, pasos: x.pasos,
                         origen: x.origen }));
        r.lecturas = r.lecturas.filter(x => x.recompone);

        // Y lo que el motor encuentra además no se esconde: la firmada va
        // primera, con su procedencia; las demás detrás.
        const firmadas = r.lecturas.length;
        r.lecturas = juntarIguales(r.lecturas.concat(proponer(k)));
        r.lecturas.sort((x, y) => (x.origen ? 0 : 1) - (y.origen ? 0 : 1));
        r.del_banco = firmadas;

        if (!r.lecturas.length) {
            r.estado = "no_resuelto";
            r.motivo = "el banco trae esta forma pero su cadena no la "
                + "reproduce, y el motor no propone otra";
        } else if (r.lecturas.every(x => x.sin_operacion)) {
            r.estado = "sin_sandhi_por_regla";
        } else if (r.lecturas.length === 1
                   && r.lecturas[0].procedencia === "firmada") {
            r.estado = "firmada";
        } else {
            r.estado = "candidatos";
        }
        return r;
    }

    if (fichas.length > 1) {
        r.lecturas = proponerEnFrase(
            voz.replace(/’/g, "'").replace(/'/g, ""));
    } else {
        // La capa `--canon` del modo DPD no existe en este porte: es
        // solo-canon y `_cache.canon` queda vacío a propósito.
        const marcadas = [...MARCAS].some(m => voz.includes(m))
            ? proponerEnMarca(voz) : [];
        if (marcadas.length && "yuxtaposicion_declarada" in marcadas[0]) {
            r.estado = "fuera_del_alcance";
            r.entera = esPalabra(voz);
            const [a, b] = marcadas[0].yuxtaposicion_declarada;
            r.motivo = "la marca de la edición separa dos voces del léxico "
                + `sin ninguna operación —${a} + ${b}—: es un compuesto, `
                + "y los compuestos están fuera del encargo.";
            return r;
        }
        r.lecturas = marcadas.length ? marcadas : proponer(k);
        if (!r.lecturas.length) {
            // Segunda pasada, sólo si la primera no dijo nada: la voz
            // anterior puede ser un compuesto que el léxico no lista.
            r.lecturas = proponer(k, true, true);
        }
    }
    r.entera = esPalabra(voz);
    if (r.lecturas.length) {
        // «Resuelto» pide un segundo testigo: una sola lectura sin origen
        // ni testigo no es una resolución, es que no se encontró más.
        const una = r.lecturas.length === 1 ? r.lecturas[0] : null;
        r.estado = (una && (una.origen || una.dpd)) ? "resuelto"
                                                    : "candidatos";
        return r;
    }

    // Sin lecturas: los tres silencios, y no se dicen igual.
    const yux = fichas.length === 1 ? yuxtaposicion(k) : [];
    if (r.entera) {
        r.estado = "sin_sandhi";
        r.motivo = "la voz está entera en el léxico y ninguna de las "
            + `${N_OP} operaciones enunciadas encuentra un corte que la `
            + "explique: no hay nada que separar.";
        return r;
    }
    if (yux.length) {
        r.estado = "fuera_del_alcance";
        r.motivo = "la forma se parte en dos voces **sin ninguna operación** "
            + `—${yux[0].join(" + ")}—: es un compuesto, y los compuestos `
            + "están fuera del encargo.";
        r.diagnostico = {
            yuxtaposiciones: yux.slice(0, 6).map(x => x.join(" + ")) };
        return r;
    }
    r.estado = "no_resuelto";
    const [motivo, diagnostico] = porQueNo(voz, k);
    r.motivo = motivo;
    r.diagnostico = diagnostico;
    return r;
}

module.exports = {
    iniciar, cotejo, esPalabra, partirComponentes,
    proponer, proponerEnFrase, proponerEnMarca, yuxtaposicion,
    compuestoDelLexico, forward, ORDEN,
    solucionar, juntarIguales, senal, paresDelLexico, porQueNo,
    PAKATI,
    _cache,
};

});


const MOTOR = __req("motor");

const __fetchJson = (typeof globalThis.__fetchJsonNode === "function")
  ? globalThis.__fetchJsonNode
  : (u => fetch(u).then(r => {
      if(!r.ok) throw new Error(u + ": " + r.status);
      return r.json();
    }));

/* El léxico fragmentado, con carga bajo demanda. `preparar(texto)` baja los
   fragmentos que ese texto puede llegar a consultar: las letras del propio
   texto en forma de cotejo, más las vocales y la «y»/«v» que el vecindario
   puede anteponer. Con eso el cierre está demostrado: ningún candidato del
   motor empieza por una letra fuera de ese conjunto. */
function crearLexico(base){
  let indice = null;
  const cargados = new Map();
  let faltantes = 0;
  return {
    async preparar(texto){
      if(!indice) indice = await __fetchJson(base + "indice.json");
      const letras = new Set(MOTOR.cotejo(texto));
      for(const x of "aāiīuūeoyv") letras.add(x);
      await Promise.all([...letras]
        .filter(l => indice.fragmentos[l] && !cargados.has(l))
        .map(async l => {
          // Cada entrada es [forma, cuenta] o [forma, cuenta, 1]: la cuenta
          // (canon) arbitra la frecuencia; el 1 dice que figura en el DPD,
          // el testigo silencioso. El léxico es la unión canon ∪ DPD.
          const m = new Map();
          for(const e of await __fetchJson(base + indice.fragmentos[l].archivo))
            m.set(e[0], [e[1] || 0, e[2] || 0]);
          cargados.set(l, m);
        }));
    },
    has(q){
      if(!q) return false;
      const m = cargados.get(q[0]);
      if(m) return m.has(q);
      if(indice && !indice.fragmentos[q[0]]) return false;
      faltantes++;
      return false;
    },
    frecuencia(q){
      const m = q && cargados.get(q[0]);
      const e = m && m.get(q);
      return e ? e[0] : 0;
    },
    enDpd(q){
      const m = q && cargados.get(q[0]);
      const e = m && m.get(q);
      return e ? e[1] === 1 : false;
    },
    get conDpd(){ return Boolean(indice && indice.con_dpd); },
    get faltantes(){ return faltantes; },
  };
}

const LEXICO = crearLexico("lexico/");
let __iniciado = false;
function iniciarMotor(){
  if(__iniciado) return;
  MOTOR.iniciar({ lexico: LEXICO, reglas: DATA.reglas, tablas: DATA.tablas,
                  listas: DATA.listas, huella: DATA.huella,
                  casos: DATA.casos });
  __iniciado = true;
}

/* Lo que el arnés y la interfaz comparten. */
const SOLUCIONADOR = {
  async preparar(texto){ await LEXICO.preparar(texto); iniciarMotor(); },
  solucionar(voz){ iniciarMotor(); return MOTOR.solucionar(voz); },
  cotejo: (t) => MOTOR.cotejo(t),
  lexico: LEXICO,
  version: DATA.version,
};
if (typeof globalThis !== "undefined") globalThis.SOLUCIONADOR = SOLUCIONADOR;

})();
