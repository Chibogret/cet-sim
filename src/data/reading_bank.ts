import { Question, ReadingPassage } from '../types/question';

// 1. Separate array for passages to avoid repetition
export const readingPassages: ReadingPassage[] = [
    {
        groupId: "RC-PASS-1",
        contextTitle: "Passage 1",
        instruction: "Basahin ang tula at sagutin ang mga tanong.",
        passage: "Babahagya ko nang sa noo nahagkan,\nSa mata ko'y luha ang nangag-unahan,\nisang panyong puti ang ikinakaway\nnang siya'y iwan ko sa tabi ng hagdan!...\nSa gayong kalungkot na paghihiwalay,\nnalulumbay ako't siya'y nalulumbay!\n\nNang sa tarangkahan ako'y makabagtas,\npasigaw ang sabing \"Umuwi ka agad,\"\nAng sagot ko'y \"Oo, hindi magluluwat!...\"\nNakangiti ako, luha'y nalalaglag!\nAt ako'y nagtuloy, tinunton ang landas,\nna kabyak ang puso't, naiwan ang kabyak…\n\nLubog na ang Araw, kalat na ang dilim\nat ang Buwan nama'y ibig nang magningning;\nNakaurasyon na noong aking datnin\nang pinagsadya kong malayong lupain;\nk'wagong nasa kubo't may ibong itim\nang nagsasalubong sa aking pagdating!\n\nSa pinto ng nar'ong tahana'y kumatok,\nako'y pinatuloy ng magandang loob;\nkumain ng konti, natulog sa lungkot\nna ang puso'y tila ayaw nang tumibok;\nang kawiakaan ko, pusong naglalagot,\ntumigil kung ako'y talaga nang tulog!\n\nNang kinabukasang magawak ang dilim,\nAraw'y namintanang mata'y nagniningning,\nsinimulan ko na ang dapat kong gawin:\nAko'y nag-araro, naglinang, nagtanim,\nnang magdi-Disyembre, tanim sa kaingin,\nAy ginapas ko na't sa irog dadalhin!\n\nAt umuwi akong taglay ko ang lahat,\nmga bungangkahoy at sansakong bigas,\nbulaklak ng damo sa gilid ng landas\nay sinisinop ko't panghandog sa liyag,\nnang ako'y umalis siya'y umiiyak,\nO! ngayon marahil siya'y magagalak!\n\nAt ako'y nagtulin halos lakad-takbo!\nSa may dakong ami'y mayroon pang musiko,\nang aming tahana'y masayang totoo\nat ang panauhin ay nagkakagulo!\n\"Salamat sa Diyos!\" ang naibigkas ko,\n\"nalalaman nila na darating ako!\"\n\nNgunit, O! Tadhana! Pinto nang mabuksan,\nako'y napapikit sa aking namasdan!\napat na kandila ang nangagbabantay\nsa paligid-ligid ng irog kong bangkay,\nmukhang nakangiti at nang aking hagkan\nang parang sinabi'y…\"Paalam! Paalam!\"\n\n- Ang Pagbabalik, Jose Corazon de Jesus"
    },
    {
        groupId: "RC-PASS-2",
        contextTitle: "Passage 2",
        instruction: "Read the following passage and answer the questions that follow.",
        passage: "Not everyone flies. In fact, some people go to a good deal of trouble to avoid taking airplanes altogether. This attitude may be difficult to understand, particularly for veteran air travelers, who appreciate the benefits of airplane travel and could not accomplish half of what they do if they did not fly. Confirmed nonfliers, however, mention problems of air travel, and those most hostile to flying cite the dates and locations of airplane disasters. Yet in spite of complaints and some travelers' deep-seated fears of flying, air transport continues to offer a combination of convenience, speed, and safety unmatched by any other means of transportation.\n\nOpponents of flying point out that air travel can be inconvenient. They maintain, for example, that passengers on closely connecting flights may have to wait several hours at their destinations before their luggage appears. Actually, though, airlines provide conveniences unparalleled anywhere else in the travel industry. Luggage is almost never lost or mishandled, and if it should be delayed, the airlines always arrange to deliver the luggage to the passenger. Statistics vary among airlines, but most confirm that only one passenger in ten thousand will suffer a loss or delay with baggage. Unlike train and bus stations, most airports also have set aside long-term parking areas where passengers can safely leave their cars for extended periods of time. In addition, most have rapid transfer systems, such as buses and carts, which conduct passengers and their luggage from the parking areas to the terminal. The airlines also relieve their customers of the burden of hauling their luggage with curbside check-in service.\n\nSome people may say that flights are often delayed or cancelled, but such problems are really infrequent and do not lessen the overall speed of air travel. Even with an occasional few hours' delay, travel time by air is well ahead of travel by car, bus, or train. No one can deny that airplanes cut to a fraction the traveling time between two points. And for great distances, anything but air transport is inconceivable. Imagine spending three and one-half days of a short vacation or of a work week sitting on a bus between Washington, D.C., and San Francisco, when an airplane could have flown you from coast to coast in about five hours.\n\nDespite the speed and convenience of air travel, however, many people are troubled by an overwhelming fear of flying, based quite understandably on the attention given to airplane crashes. But these events are truly rare, almost freakish occurrences. In fact, it is their rarity that makes them newsworthy. The chances of being involved in an airplane accident are miniscule for any air traveler. Those who ride in automobiles are one hundred times more likely to suffer injury than are air passengers, yet people ride in and drive automobiles every day. Most people do not realize that airplanes actually enjoy the best safety record of all the modes of travel, given the huge numbers of people they carry and the millions of miles they cover every year.\n\nClearly, flying makes traveling easier, faster, and safer than other methods of transportation. While those who shun airplanes constitute only a small percentage of travelers, they might be fewer still if they examined the facts and statistics. And if these people could conquer their fears enough to give flying a chance, they might make some pleasant discoveries. With veteran travelers, they might come to enjoy the automatic ramps that whiz passengers from one end of a terminal to another, the thrill of takeoffs, and the view of clean clouds, rainbow sunsets, and the earth curving thousands of feet below. These people would then know why they fly.\n\n- Why Fly?, Prentice Hall Grammar and Composition 2"
    },
    {
        groupId: "RC-PASS-3",
        contextTitle: "Passage 3",
        instruction: "Basahin ang sumusunod na teksto at sagutin ang mga tanong.",
        passage: "Ang ningning ay nakasisilaw at nakasisira sa paningin. Ang liwanag ay kinakailangan ng mata, upang mapagwari ang buong katunayan ng mga bagay-bagay.\nAng bubog kung tinatamaan ng nag-aapoy na sikat ng araw ay nagniningning; ngunit sumusugat sa kamay ng nagaganyak na dumampot.\nAng ningning ay madaya.\nAting hanapin ang liwanag, tayo'y huwag mabighani sa ningning. Sa katunayan ng masamang kaugalian: Nagdaraan ang isang karwaheng maningning na hinihila ng kabayong matulin. Tayo'y nagpupugay at ang isasaloob ay mahal na tao ang nakalulan. Datapwa'y marahil naman ay isang magnanakaw; marahil sa ilalim ng kanyang ipinatatanghal na kamahalan at mga hiyas na tinataglay ay natatago ang isang pusong sukaban.\nNagdaraan ang isang maralita na nagkakanghirap sa pinapasan. Tayo'y mapapangiti at isasaloob: Saan kaya ninakaw? Datapwa'y maliwanag nating nakikita sa pawis ng kanyang noo at sa hapo ng kanyang katawan na siya'y nabubuhay sa sipag at kapagalang tunay.\nAy! Sa ating pang-uga-ugali ay lubhang nangapit ang pagsamba sa ningning at pagtakwil sa liwanag.\nIto na nga ang dahilang isa pa na kung kaya ang tao at ang mga bayan ay namumuhay sa hinagpis at dalita.\nIto na nga ang dahilan na kung kaya ang mga loob na inaakay ng kapalaluan at ng kasakiman ay nagpupumilit na lumitaw na maningning, lalung-lalo na nga ang mga hari at mga pinuno na pinagkatiwalaan ng sa ikagiginhawa ng kanilang mga kampon, at walang ibang nasa kundi ang mamalagi sa kapangyarihan sukdang ikainis at ikamatay ng Bayan na nagbigay sa kanila ng kapangyarihang ito.\nTayo'y mapagsampalataya sa ningning; huwag nating pagtakhan na ang ibig mabuhay sa dugo ng ating mga ugat ay magbalatkayo ng maningning.\nAy! Kung an gating dinudulugan at hinahainan ng puspos na galang ay ang maliwanag at magandang-asal at matapat na loob, ang kahit sino ay walang mapagningning pagkat di natin pahahalagahan, at ang mga isip at akalang ano pa man ay hindi hihiwalay sa maliwanag na banal na landas ng katwiran.\nAng kaliluhan at ang katampalasanan ay humahanap ng ningning upang huwag mapagmalas ng mga matang tumatanghal ang kanilang kapangitan; ngunit ang kagalingan at ang pag-ibig na dalisay ay hubad, mahinhin, at maliwanag na napatatanaw sa paningin.\nAng lumipas na pinapanginoon ng Tagalog ay labis na nagpapatunay ng katotohanan nito.\nMapalad ang araw ng liwanag!\nAy! Ang anak ng Bayan, ang kapatid ko, ay matututo kayang kumuha ng halimbawa at lakas sa pinagdaanang mga hirap at binatang mga kaapihan?\n\n- Ang Ningning at Ang Liwanag, Emilio Jacinto"
    },
    {
        groupId: "RC-PASS-4",
        contextTitle: "Passage 4",
        passage: "Isa sa mga salitang napag-aralan natin sa wikang Pilipino ay ang salitang nabansot. Kapag ang isang bagay raw ay dapat pang lumaki ngunit ito'y tumigil na sa paglaki, ang bagay na ito raw ay nabansot. Marami raw uri ng pagkabansot, ngunit ang pinakamalungkot na uri raw ay ang pagkabansot ng isipan, ng puso, at ng diwa.\n\nAng panahon ng kabataan ay panahon ng paglaki, ngunit ang ating paglaki ay kailangang paglaki at pag-unlad ng ating buong katauhan, hindi lamang ng ating sukat at timbang. Kung ga-poste man ang ating taas at ga-pison man ang ating bigat, ngunit kung ang pag-iisip naman nati'y ga-kulisap lamang, kay pangit na kabansutan.\n\nKung tumangkad man tayong tangkad-kawayan, at bumilog man tayong bilog-tapayan, ngunit kung tayo nama'y tulad ni \"Bondying\" na di mapagkatiwalaan – anong laking kakulangan. Kung magkakatawan tayong katawang \"Tarzan\" at mapatalas ang ating isipang sintalas ng kay Rizal, ngunit kung ang ating kalooban nama'y itim na duwende ng kasamaan – anong kapinsalaan para sa kinabukasan.\n\nKinabukasan. Kabataan, tayo raw ang pag-asa ng Inang Bayan. Tayo raw ang maghahatid sa kanya sa langit ng kasaganaan at karangalan, o hihila sa kanya sa putik ng kahirapan at kahihiyan. Ang panahon ng pagkilos ay ngayon, hindi bukas, hindi sa isang taon. Araw-araw ay tumutuwid tayong palangit o bumabaluktot tayong paputik. Tamang-tama ang sabi ng ating mga ninunong kung ano raw ang kinamihasnan ay siyang pagkakatandaan. Huwag nating akalaing makapagpapabaya tayo ng ating pag-aaral ngayon at sa araw ng bukas ay bigla tayong magiging mga dalubhasang magpapaunlad ng bayan. Huwag nating akalaing makapandaraya tayo ngayon sa ating mga pagsusulit, makakupit sa ating mga magulang at mahiwagang araw ng bukas makakaya nating balikatin ang mabibigat na suliranin ng ating bansa. Huwag nating akalaing mapaglulublob tayo ngayon sa kalaswaan at kahalayan, at sa mahiwagang araw ng bukas bigla tayong magiging ulirang mga magulang.\n\nKabataan, ang tunay na pag-ibig sa bayan, ang tunay na nasyonalismo, ay wala sa tamis ng pangarap, wala rin sa pagpag ng dila. Ang tunay na pag-ibig ay nasa pawis ng gawa.\n\n- Sa Kabataan, Onofre Pagsanghan"
    },
    {
        groupId: "RC-PASS-5",
        contextTitle: "Passage 5",
        passage: "Ang tao sa kanyang kabataan pa lamang ay dapat nang kakitaan at karinggan ng kanyang paninindigan bilang isang mamamayan. Matuto siyang magbulay-bulay ng mga bagay-bagay sa kanyang paligid lalo't nahihinggil sa kalayaan, katahimikan, at kaunlaran ng bayan. Ang kapansanan ay di sagwil upang makapaglingkod sa inang-bayan.\n\nNangingiti kayo, sapagkat narito ako sa inyong harapan. Nagbubuka ako ng bibig at pilit kong pinalalaki ang aking maliit na tinig!\n\nTunay, ako'y musmos pa lamang kung inyong pagmamasdan. Subalit ang aking puso ay singhugis at sinlaki na rin ng inyong puso. Ang aking dibdib ay sintibay na rin ng inyong dibdib. Pahat man ang aking diwa ay nakauulinig ang aking pandinig at nakakikita ang aking mga mata. Nadarama ko ang agay-ay ng hangin, ang init ng araw, ang pintig ng buhay. Nalalasahan ko ang linamnam ng ligaya at tamis ng tuwa. Nananamnam ko ang pait ng apdo at saklap ng dalamhati. Nahuhulo ko na rin ang ganda ng kabutihan at kapangitan ng kasamaan.\n\nKahapon ay nasaksihan ko kung papaanong inakay ng isang batang lalaki ang isang matandang ina. Sa kalaparan ng mataong lansangan ay tumawid sila; at ang matanda ay nailayo sa panganib at kamatayan. Aniko sa sarili, gayundin ang dapat kong gawin!\n\nNgunit kanina sa tindahan ng Intsik sa panulukan ay nanghilakbot ako sa king nakita. May binatilyong kagaya ko, datapwa't may hawak na bote ng alak at sa mga bulang kanilang nilalagok ay unti-unti silang nangawala sa kanilang sari-sarili. Maya-maya pa'y naghalibasan sa isa't isa. Ang ilan ay nangalugmok at nangahandusay. Ang iba nama'y sugatang nagsipanakbuhan. O! kasuklam-sukmal na panoorin… Naibulong ko na lamang: A, hindi ko sila dapat pamarisan!\n\nKatutunghay ko pa lamang sa pahayagang ngayon na aking dala. Isang panawagan sa kabataan ang magpatala upang ihanda ang kanilang sarili sa pagsasanggalang sa kalagayan ng bayan. Kaya naman ako… akong nabibilang sa kabataan ay naririto ngayon at dumudulog sa inyo. Opo, ako… akong si Magiting ay naririto upang ilaan ang aking sarili sa paglilingkod sa Lupang Tinubuan!\n\nBakit kayo nangingiti? Bakit nga? Bakit ninyo ako pinagmamasdan mula paa hanggang ulo? Mula ulo hanggang paa? Bakit? A! dahil ba sa ako'y isang pilay? At putol ang isang paa? Iyan ba ang dahilan kung bakit nag-aatubili kayong ako ay tanggapin? Iyan ba ang sanhi kung bakit minamaliit ninyo ang aking alok na paglilingkod?\n\nMga ginoo, nagkakamali kayo! Ako'y naririto upang magpatala – upang lumaban; hindi upang tumakbo!\n\n- Ako si Magiting, Consolacion P. Conde"
    },
    {
        groupId: "RC-PASS-6A",
        contextTitle: "Passage 6A",
        instruction: "Suriin ang sumusunod na talahanayan ng iskedyul ng barko at sagutin ang mga tanong.",
        passage: "Suriin ang sumusunod na talahanayan ng iskedyul ng barko at sagutin ang mga sumusunod na tanong.\n\n| RUTA | ARAW | ORAS |\n|---|---|---|\n| Cebu – Manila | Lunes | 6:45 n.u. |\n| Cebu – Manila | Martes | 9:45 n.u. |\n| Cebu – Manila | Huwebes | 9:45 n.u. |\n| Cebu – Manila | Biyernes | 9:15 n.u. |\n| Manila – Cebu | Miyerkules | 7:45 n.g. |\n| Manila – Cebu | Huwebes | 10:45 n.g. |\n| Manila – Cebu | Biyernes | 6:45 n.g. |\n| Manila – Cebu | Linggo | 8:45 n.u. |\n| Cebu – Cagayan de Oro | Lunes | 9:45 n.u. |\n| Cebu – Cagayan de Oro | Huwebes | 8:45 n.g. |\n| Cebu – Cagayan de Oro | Sabado | 9:15 n.g. |\n| Cagayan de Oro – Cebu | Lunes | 10:45 n.g. |\n| Cagayan de Oro – Cebu | Miyerkules | 11:15 n.g. |\n| Cagayan de Oro – Cebu | Biyernes | 10:15 n.u. |\n| Cebu – Nasipit | Sabado | 9:15 n.g. |\n| Nasipit – Cebu | Martes | 5:45 n.u. |\n| Cebu – Zamboanga | Biyernes | 11:59 n.g. |\n| Zamboanga – Cebu | Linggo | 10:15 n.g. |\n| Cebu – Cotabato (via Zamboanga) | Biyernes | 11:59 n.g. |\n| Cotabato – Cebu (via Zamboanga) | Linggo | 10:45 n.u. |"
    },
    {
        groupId: "RC-PASS-6B",
        contextTitle: "Passage 6B",
        passage: "Ang tao ay nagtataglay ng tatlong katangian kaya siya ang pinakadakila sa nilalang ng Diyos. Nilikha ng Diyos ang mga halaman at ang mga ito ay may kaluluwang panghalaman, na maaaring mabuhay, lumaki, yumabong at magpakarami. Nilalang din ng Diyos ang mga hayop at ang mga ito ay nagtataglay rin ng kaluluwang \"vegetalia\" datapwat nakadarama. Ang hayop ay maari ring mabuhay, lumaki at magpakarami, bilang karagdagan, pinagkalooban siya ng kaluluwang nakararamdam. Nadarama ng hayop ang lahat ng bagay na natambad sa kanyang sintido o sangkap na pandama.\n\nAng tao ay nilikha na may kaluluwang panghalaman at may kaluluwang pandamdam, datapwat bilang karagdagan sa dalawang katangiang ito, siya ay pinagkalooban ng kaluluwang ispiritual. Sa pamamagitan nito, bukod pa siya ay maaring mabuhay, lumaki at magpakarami, pinagkalooban pa rin siya ng katalinuhan, at kalayaan na piliin ang bawat ibig ayon sa itinatadhana ng kanyang kalooban.\n\nSa kalayaang nasabi, maari siyang gumawa ng mabuti at masama. Sa katotohanang iyan, ang katangiang nagpadakila sa kanya, na maging malaya ay kakambal naman ang isang kapanagutan sa kanyang mga gawain. Dito naiaakma at mailalapat ang katarungan, na sapagkat siya ay nakagawa naman ng kabuktutan at lihis sa mabuting asal, karampatang nalalaan naman sa kanya ang kaparusahan."
    },
    {
        groupId: "RC-PASS-7",
        contextTitle: "Passage 7",
        passage: "SUPER FERRY SHIPPING LINES\n\n| RUTA | ARAW | ORAS |\n|---|---|---|\n| Cebu – Manila | Lunes | 6:45 n.u. |\n| Cebu – Manila | Martes | 9:45 n.u. |\n| Cebu – Manila | Huwebes | 9:45 n.u. |\n| Cebu – Manila | Biyernes | 9:15 n.u. |\n| Manila – Cebu | Miyerkules | 7:45 n.g. |\n| Manila – Cebu | Huwebes | 10:45 n.g. |\n| Manila – Cebu | Biyernes | 6:45 n.g. |\n| Manila – Cebu | Linggo | 8:45 n.u. |\n| Cebu – Cagayan de Oro | Lunes | 9:45 n.u. |\n| Cebu – Cagayan de Oro | Huwebes | 8:45 n.g. |\n| Cebu – Cagayan de Oro | Sabado | 9:15 n.g. |\n| Cagayan de Oro – Cebu | Lunes | 10:45 n.g. |\n| Cagayan de Oro – Cebu | Miyerkules | 11:15 n.g. |\n| Cagayan de Oro – Cebu | Biyernes | 10:15 n.u. |\n| Cebu – Nasipit | Sabado | 9:15 n.g. |\n| Nasipit – Cebu | Martes | 5:45 n.u. |\n| Cebu – Zamboanga | Biyernes | 11:59 n.g. |\n| Zamboanga – Cebu | Linggo | 10:15 n.g. |\n| Cebu – Cotabato (via Zamboanga) | Biyernes | 11:59 n.g. |\n| Cotabato – Cebu (via Zamboanga) | Linggo | 10:45 n.u. |"
    },
    {
        groupId: "RC-PASS-8",
        contextTitle: "Passage 8",
        passage: "Once upon a time, son,\nthey used to laugh with their hearts\nand laugh with their eyes:\nbut now they only laugh with their teeth,\nwhile their ice-block-cold eyes\nsearch behind my shadow.\n\nThere was a time indeed\nthey used to shake hands with their hearts:\nbut that's gone, son.\nNow they shake hands without hearts\nwhile their left hands search\nmy empty pockets.\n\n'Feel at home!' 'Come again':\nthey say, and when I come\nagain and feel\nat home, once, twice,\nthere will be no thrice –\nfor then I find doors shut on me.\n\nSo I have learned many things, son.\nI have learned to wear many faces\nlike dresses – homeface,\nofficeface, streetface, hostface,\ncocktailface, with all their conforming smiles\nlike a fixed portrait smile.\n\nAnd I have learned too\nto laugh with only my teeth\nand shake hands without my heart.\nI have also learned to say, 'Goodbye',\nwhen I mean 'Good-riddance':\nto say 'Glad to meet you',\nwithout being glad; and to say 'It's been\nnice talking to you', after being bored.\n\nBut believe me, son.\nI want to be what I used to be\nwhen I was like you. I want\nto unlearn all these muting things.\nMost of all, I want to relearn\nhow to laugh, for my laugh in the mirror \nshows only my teeth like a snake's bare fangs!\n\nSo show me, son,\nhow to laugh; show me how\nI used to laugh and smile\nonce upon a time when I was like you.\n\n- Once Upon a Time, Gabriel Okara"
    },
    {
        groupId: "RC-PASS-9",
        contextTitle: "Passage 9",
        passage: "Insofar as man is an animal, he lives by struggle, he lives at the expense of others whom he fears and hates. Life then is war.\nPeace is much harder to define. Peace is neither an original paradisiacal (a state possessing extreme delight) state nor a form of co-existence by mutual consent. Peace is something we can only sense and search for. True peace is more difficult and unusual than any other achievement even for two persons who live together and need each other.\nFor thousands of years we have known the mighty and fundamental maxim: \"Thou shalt not kill.\" Yet we have created a science and technology that manufactures explosives and poison gases.\nMany believe that the last war set in motion such a gigantic mechanism of horror that future generations would be frightened of ever making war again. But opinion is absolutely mistaken. Fear teaches men nothing. If men enjoy killing, no memory of war will deter them. Nor will the knowledge of the material damage wrought by war.\nThat is why I believe that world peace cannot be brought about by preaching, organization, and propaganda, just as a philosopher's stone cannot be invented by a congress of chemists. What then can give rise to a true spirit of peace on earth? Not commandments and not practical experience. Like all human progress, the love of peace must come from knowledge which may be seen and formulated in a thousand different ways. But it must always embody one truth: the knowledge of the living substance in each of us, of the secret magic, the secret godliness that each of us bears within him. Where that supreme knowledge is present (as in Jesus, Buddha, Plato, or Lao-Tzu), a threshold is crossed beyond which miracles begin. There, war and enmity cease. An enemy becomes a brother; death becomes birth; disgrace, honor; calamity, good fortune.\nWhat I am saying is self-evident. But just as every soldier shot to death is the eternal repetition of an error, so the truth must be repeated forever and ever in a thousand forms.\n\n- War and Peace, Herman Hesse"
    },
    {
        groupId: "RC-PASS-10",
        contextTitle: "Passage 10",
        passage: "(1) You see this gentle stream, that glides,\n(2) Shoved on, by quick-succeeding tides:\n(3) Try if this sober stream you can\n(4) Follow to th' wilder ocean,\n(5) And see, if there it keeps unspent\n(6) In that congesting element.\n(7) Next, from that world of waters, then\n(8) By pores and caverns back again\n(9) Induct that inadultrate same\n(10) Stream to the spring from whence it came.\n(11) This with a wonder when ye do,\n(12) An easy, and else easier too:\n(13) Then may ye collect the grains\n(14) Of my particular remains,\n(15) After a thousand lusters hurled,\n(16) By ruffling winds, above the world.\n \n— Proof to No Purpose, Robert Herrick (1591-1674)"
    },
    {
        groupId: "RC-PASS-11",
        contextTitle: "Passage 11",
        passage: "My mistress' eyes are nothing like the sun;\nCoral is far more red than her lips' red;\nIf snow be white, why then her breasts are dun;\nIf hairs be wires, black wires grow on her head.\nI have seem roses damask'd, red and white,\nBut no such roses see I in her cheeks;\nAnd in some perfumes is there more delight\nThan in the breath that from my mistress reeks.\nI love to hear her speak,—yet well I know\nThat music hath a far more pleasing sound;\nI grant I never saw a goddess go,—\nMy mistress, when she walks, treads on the ground;\n And yet, by heaven, I think my love as rare\n As any she bely'd with false compare\n\n— Sonnet 130, William Shakespeare (1564-1616)"
    },
    {
        groupId: "RC-PASS-12",
        contextTitle: "Passage 12",
        passage: "(1)On the other side, heat and vivacity in age is an excellent composition for business. Young men are fitter to (2)invent than to judge, fitter for execution than for counsel, and fitter for new projects than for settled (3)business. For the experience of age, in things that fall within the compass of it, directeth them, but in new (4)things abuseth them. The errors of young men are the ruin of business; but the errors of aged men amount (5)but to this, that more might have been done, or sooner. Young men, in the conduct and manage of actions, (6)embrace more than they can hold; stir more than they can quiet; fly to the end, without consideration of the (7)means and degrees; pursue some few principles which they have chanced upon absurdly; care not to (8)innovate, which draws inconveniences; use extreme remedies at first; and, that which doublet all errors, will (9) not acknowledge or retract them; like an unready horse that will neither stop nor turn."
    },
    {
        groupId: "RC-PASS-13",
        contextTitle: "Passage 13",
        passage: "Matagal na, Huwan\nmatagal nang ipokrito ang laro mong ito\nmatagal nang ika'y may trono sa impyerno\nat nilulumot na ang kapwa mo tao\nsa iyo, lumang tugtugin na ang pag-ibig sa Diyos;\nang takot ay wala na't nilamon ng siglo,\nang ginto mong pader, malaya kay Kristo.\n\nNatuwa ka sa iyong panalo\nang bahay mo'y pito, ang kotse ay walo\nsa bahay-ampunan, sa \"Mental Hospital\",\nkaharap-harap mo, kamera't potograpo.\n\nNagagalit kang madaya ng iba;\nnapopoot kang madaig sa kita\nbago ang maskara'y suut-suot mo na\nat ang simbaha'y ginawa mong bangketa.\n\nPaluhud-luhod ka kung Linggo't Huwebes Santos,\nTapos duduran mo ang pulubi sa kanto\nmagmumura ka't manloloko ng tao\nnasisikmura mo ang ganitong serbisyo?\n\nHuwan, O Huwan!\nBakit? O bakit ba?\nAng magandang larawan ginawa mong dikdikan.\nDapat bang isigaw at ipagbulgaran...\n\n- May Plastik ang Mundo, Odie Cruz Lacsamana"
    }
];

// 2. Questions array relying solely on 'groupId' to join with the passages.
export const readingQuestions: Question[] = [
    {
        "id": "RC-1304-1",
        "subject": "Reading Comprehension",
        "subtopic": "Data Interpretation",
        "groupId": "RC-PASS-6A",
        "question": "Anong araw at oras ang biyahe ng barko mula Manila patungong Cebu kung Linggo?",
        "options": [
            "7:45 n.g.",
            "10:45 n.g.",
            "6:45 n.g.",
            "8:45 n.u."
        ],
        "correctAnswer": "8:45 n.u.",
        "explanation": "Batay sa talahanayan, ang rutang Manila – Cebu sa araw ng Linggo ay may oras na 8:45 n.u."
    },
    {
        "id": "RC-1304-2",
        "subject": "Reading Comprehension",
        "subtopic": "Data Interpretation",
        "groupId": "RC-PASS-6A",
        "question": "Aling ruta ang may biyahe tuwing Martes ng alas-5:45 ng umaga?",
        "options": [
            "Cebu – Manila",
            "Manila – Cebu",
            "Nasipit – Cebu",
            "Cebu – Nasipit"
        ],
        "correctAnswer": "Nasipit – Cebu",
        "explanation": "Sa talahanayan, ang 'Nasipit – Cebu' ay may iskedyul tuwing Martes sa oras na 5:45 n.u."
    },
    {
        "id": "RC-1304-3",
        "subject": "Reading Comprehension",
        "subtopic": "Data Interpretation",
        "groupId": "RC-PASS-6A",
        "question": "Ilang beses sa isang linggo ang biyahe mula Cebu patungong Manila?",
        "options": [
            "2",
            "3",
            "4",
            "5"
        ],
        "correctAnswer": "4",
        "explanation": "Ang rutang Cebu – Manila ay may apat na biyahe: Lunes, Martes, Huwebes, at Biyernes."
    },
    {
        "id": "RC-1304-4",
        "subject": "Reading Comprehension",
        "subtopic": "Data Interpretation",
        "groupId": "RC-PASS-6A",
        "question": "Aling biyahe ang umaalis ng dakong hatinggabi (11:59 n.g.) tuwing Biyernes?",
        "options": [
            "Zamboanga – Cebu",
            "Cebu – Zamboanga",
            "Cagayan de Oro – Cebu",
            "Cebu – Nasipit"
        ],
        "correctAnswer": "Cebu – Zamboanga",
        "explanation": "Ayon sa talahanayan, ang Cebu – Zamboanga (at ang via Cotabato) ay umaalis tuwing Biyernes ng 11:59 n.g."
    },
    {
        "id": "RC-1301-5",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-1",
        "question": "Sino ang persona sa loob ng tula?",
        "options": [
            "taong patuloy na umaasa",
            "taong humihingi ng pag-unawa",
            "taong nawawalan ng pag-asa",
            "taong nagtatrabaho malayo sa mahal sa buhay"
        ],
        "correctAnswer": "taong nagtatrabaho malayo sa mahal sa buhay",
        "explanation": "Ang persona ay nagtungo sa malayong lupain upang mag-araro at magtanim, at nag-uwi ng kanyang mga pinaghirapan para sa kanyang mahal, kaya siya ay isang taong nagtatrabaho malayo sa mahal sa buhay."
    },
    {
        "id": "RC-1301-6",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-1",
        "question": "Alin sa mga sumusunod ang mahihinuhang nagsasalita sa tula?",
        "options": [
            "anak na naulila",
            "asawang naulila",
            "kapatid na napariwara",
            "inang mapagmahal"
        ],
        "correctAnswer": "asawang naulila",
        "explanation": "Tinatawag ng persona ang namatay na 'irog' at naiwang 'kabyak ng puso,' na nagpapahiwatig na siya ay isang asawang naulila."
    },
    {
        "id": "RC-1301-7",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-1",
        "question": "Alin sa mga sumusunod na kaisipan ang hindi mahihinuha sa loob ng tula?",
        "options": [
            "Sabik na umuwi ang persona sa piling ng kanyang minamahal.",
            "Hindi alam ng persona na may karamdaman ang kanyang minamahal.",
            "Hindi inaasahan ng persona ang pagkawala ng kanyang minamahal.",
            "Labis na nalulungkot ang persona sa tuwing siya'y lalayo sa kanyang minamahal."
        ],
        "correctAnswer": "Labis na nalulungkot ang persona sa tuwing siya'y lalayo sa kanyang minamahal.",
        "explanation": "Ang tula ay nagkukuwento tungkol sa isang partikular at tiyak na pag-alis at hindi nagpapahiwatig na 'sa tuwing' (every time) lalayo ang persona ay ganito ang nangyayari."
    },
    {
        "id": "RC-1301-8",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-1",
        "question": "Ano ang ibig sabihin ng magawak ang dilim?",
        "options": [
            "maghirap",
            "magising",
            "magliwanag",
            "magkalat"
        ],
        "correctAnswer": "magliwanag",
        "explanation": "Ang 'pag-gawak ng dilim' ay nangangahulugang paghiwalay ng dilim upang pumasok ang liwanag o ang pagsikat ng araw."
    },
    {
        "id": "RC-1301-9",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-1",
        "question": "Ano ang damdaming nakapaloob sa ika-anim na taludtod?",
        "options": [
            "pananabik",
            "panghihinayang",
            "pagkalito",
            "pamimintuho"
        ],
        "correctAnswer": "pananabik",
        "explanation": "Sa saknong na naglalaman ng 'At umuwi akong taglay ko ang lahat... O! ngayon marahil siya'y magagalak!', nakapaloob ang matinding pananabik ng persona na muling makita ang kanyang mahal."
    },
    {
        "id": "RC-1301-10",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-1",
        "question": "Ano ang damdaming ipinahihiwatig sa kabuuan ng tula?",
        "options": [
            "pagmamahal",
            "kapaguran",
            "pagdadalamhati",
            "kabiguan"
        ],
        "correctAnswer": "pagdadalamhati",
        "explanation": "Ang kabuuan ng tula ay umiikot sa malungkot na paghihiwalay at sa huli ay sa kalunos-lunos na trahedya ng pagkamatay ng minamahal, kaya pagdadalamhati ang pangunahing damdamin nito."
    },
    {
        "id": "RC-1301-11",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-1",
        "question": "Alin sa mga sumusunod ang hindi ipinahihiwatig ng persona?",
        "options": [
            "galit sa mga pangyayari",
            "pananabik na muling makapiling ang kabiyak",
            "labis na pagmamahal sa kabiyak",
            "hinagpis sa kapalaran ng kabiyak"
        ],
        "correctAnswer": "galit sa mga pangyayari",
        "explanation": "Ipinapakita ng persona ang matinding lungkot, pananabik, at pagmamahal, ngunit walang tuwirang galit na ipinahihiwatig sa tula, tanging kalumbayan sa sinapit na kapalaran."
    },
    {
        "id": "RC-1302-12",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-2",
        "question": "The author's main purpose in this passage is",
        "options": [
            "to inform people about the convenience of traveling by air.",
            "to persuade people to forget their fear of flying.",
            "to explain the advantages and disadvantages of air travel.",
            "to criticize people who fear air travel."
        ],
        "correctAnswer": "to persuade people to forget their fear of flying.",
        "explanation": "The entire passage is structured as an argument to reassure fearful flyers by highlighting statistics regarding safety, speed, and convenience, aiming to persuade them to give flying a chance."
    },
    {
        "id": "RC-1302-13",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-2",
        "question": "Which of the following is NOT cited in the passage?",
        "options": [
            "Flying makes traveling faster.",
            "Airlines provide conveniences unparalleled in the travel industry.",
            "Air travel costs more than any other mode of transportation.",
            "Airplanes enjoy the best safety record of all the modes of travel."
        ],
        "correctAnswer": "Air travel costs more than any other mode of transportation.",
        "explanation": "The text discusses speed, convenience, and safety of air travel in great detail, but it never mentions the relative financial cost of taking an airplane compared to other modes of transportation."
    },
    {
        "id": "RC-1302-14",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-2",
        "question": "According to the passage, which of the following is TRUE?",
        "options": [
            "Air traveling is much more expensive than driving.",
            "Opponents of flying have never traveled by air.",
            "The rarity of airplane crashes is what makes them newsworthy.",
            "Most airplane crashes are caused by the huge number of people they carry."
        ],
        "correctAnswer": "The rarity of airplane crashes is what makes them newsworthy.",
        "explanation": "In the fourth paragraph, the author explicitly states: 'But these events are truly rare, almost freakish occurrences. In fact, it is their rarity that makes them newsworthy.'"
    },
    {
        "id": "RC-1302-15",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-2",
        "question": "Based on the author's argument about air travel, which statement would the author be most likely to agree with?",
        "options": [
            "People must be forced to board planes.",
            "Airplanes should be the basic mode of transportation.",
            "Flying makes travel experience more enjoyable.",
            "People who fear flying have known someone who died in a plane crash."
        ],
        "correctAnswer": "Flying makes travel experience more enjoyable.",
        "explanation": "In the concluding paragraph, the author notes that if people conquered their fears, they would 'make some pleasant discoveries' and enjoy the thrill and sights from the sky, thereby making travel more enjoyable."
    },
    {
        "id": "RC-1302-16",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-2",
        "question": "According to the passage, those who ride in automobiles",
        "options": [
            "have not traveled by air even once.",
            "are one hundred times more likely to suffer injury than are air passengers.",
            "are most likely victims of delayed or cancelled flights.",
            "enjoy traveling long distances by land."
        ],
        "correctAnswer": "are one hundred times more likely to suffer injury than are air passengers.",
        "explanation": "The text directly states in the fourth paragraph: 'Those who ride in automobiles are one hundred times more likely to suffer injury than are air passengers...'"
    },
    {
        "id": "RC-1302-17",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-2",
        "question": "It can be inferred from the passage that",
        "options": [
            "the author works for an airline company.",
            "the author enjoys the convenience brought by air travel.",
            "the author has never traveled by land.",
            "the author has suffered injury through land travel."
        ],
        "correctAnswer": "the author enjoys the convenience brought by air travel.",
        "explanation": "Because the author passionately argues for the benefits, speed, and joys of flying while vividly detailing its conveniences, it's highly inferable that they themselves enjoy these conveniences."
    },
    {
        "id": "RC-1302-18",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-2",
        "question": "Which of the following best summarizes the passage?",
        "options": [
            "Airlines provide conveniences not provided in other modes of travel.",
            "The chances of being involved in an airplane accident are minuscule for any air traveler.",
            "For great distances, anything but air transport is inconceivable.",
            "Flying makes traveling easier, faster, and safer than other methods of transportation."
        ],
        "correctAnswer": "Flying makes traveling easier, faster, and safer than other methods of transportation.",
        "explanation": "This encapsulates the entire passage's argument, explicitly restating the topic sentence of the concluding paragraph which integrates the points on convenience, speed, and safety."
    },
    {
        "id": "RC-1302-19",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-3",
        "question": "Ano ang nais iparating ng may-akda sa ika-apat at ika-limang talata?",
        "options": [
            "Likas sa tao ang paghanga at pag-imbot sa tagumpay ng kapwa.",
            "Likas sa tao ang paghamak sa kapintasan ng kapwa.",
            "Likas sa tao ang paghusga sa iba batay sa panlabas na kaanyuan at katayuan sa buhay.",
            "Likas sa tao ang pagiging mapagmataas."
        ],
        "correctAnswer": "Likas sa tao ang paghusga sa iba batay sa panlabas na kaanyuan at katayuan sa buhay.",
        "explanation": "Sa mga talatang ito inihambing ang taong nakasakay sa maningning na karwahe na agad pinagpupugayan (kahit baka magnanakaw) at ang maralitang pawisan na agad pinaghihinalaan (kahit nagsisikap nang marangal), na nagpapakita na tayo'y bumabatay sa panlabas na anyo."
    },
    {
        "id": "RC-1302-20",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-3",
        "question": "Alin sa mga sumusunod ang naglalarawan sa saloobin ng manunulat?",
        "options": [
            "paghanga sa taong nagsisikap na magtagumpay sa buhay",
            "pag-imbot sa mga mahal na tao",
            "awa sa mararalita",
            "pagkadismaya sa pagsamba ng tao sa mga materyal na bagay"
        ],
        "correctAnswer": "pagkadismaya sa pagsamba ng tao sa mga materyal na bagay",
        "explanation": "Ang buong sanaysay ay umiikot sa paghihinagpis at pagkadismaya ng may-akda sa hilig ng mga tao na sambahin ang huwad na ningning (materyal na kayamanan/panlabas na anyo) at balewalain ang liwanag (katotohanan at kabutihan)."
    },
    {
        "id": "RC-1302-21",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-3",
        "question": "Alin sa mga sumusunod na kaisipan ang hindi ipinahahayag sa teksto?",
        "options": [
            "Ang mga mahal na tao ay hindi kailanman gumagawa ng di mabubuting bagay.",
            "Tayo bilang mga tao ay pumapanig sa kapangyarihan at kayamanan, hindi sa kabutihan.",
            "Kailangan natin ang liwanag upang malaman ang katotohanan.",
            "Patuloy na naghihirap ang ating bayan dahil sa pagkiling natin sa mga materyal na bagay."
        ],
        "correctAnswer": "Ang mga mahal na tao ay hindi kailanman gumagawa ng di mabubuting bagay.",
        "explanation": "Taliwas sa pahayag na ito, sinabi mismo sa sanaysay na ang akala nating 'mahal na tao' sa maningning na karwahe ay 'marahil naman ay isang magnanakaw'."
    },
    {
        "id": "RC-1302-22",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-3",
        "question": "Ano ang layunin ng may-akda sa pagsusulat ng kanyang sanaysay?",
        "options": [
            "hamunin ang mga hari at pinunong walang ibang nasa kundi ang ikabubuti ng sarili",
            "bigyang-papuri ang mga taong patuloy na nagsisikap upang magtagumpay",
            "ipaliwanag ang kabutihang dulot ng pagtitiwala sa ating mga pinuno",
            "hikayatin ang mga tao na mas maging mapagmatyag tungo sa kagalingang-panlahat"
        ],
        "correctAnswer": "hikayatin ang mga tao na mas maging mapagmatyag tungo sa kagalingang-panlahat",
        "explanation": "Ang may-akda ay nagbibigay-babala sa madla na huwag magpalinlang sa 'ningning' upang makita nila ang tunay na 'liwanag' tungo sa pangkalahatang kapakanan at makalaya mula sa pang-aabuso."
    },
    {
        "id": "RC-1302-23",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-3",
        "question": "Ayon sa akda, ano ang dahilan ng pagnanais ng mga pinuno na mamalagi sa kapangyarihan?",
        "options": [
            "Nais nilang sila ay patuloy na sambahin ng mga mamamayan.",
            "Nais nilang patuloy na maghari at gawin ang anumang nais nila.",
            "Nais nilang guminhawa ang kanilang buhay, at ang kanilang mga kapanalig.",
            "Nais nilang patuloy na maglingkod sa bayan."
        ],
        "correctAnswer": "Nais nilang guminhawa ang kanilang buhay, at ang kanilang mga kapanalig.",
        "explanation": "Tinukoy ng may-akda na ang mga pinuno ay namamalagi sa kapangyarihan 'para sa ikagiginhawa ng kanilang mga kampon'."
    },
    {
        "id": "RC-1302-24",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-3",
        "question": "Ano ang nais ipakahulugan ng may-akda sa unang pangungusap?",
        "options": [
            "Nakabubulag ang labis na kayamanan at kapangyarihan.",
            "Walang buting maidudulot ang kapangyarihan at kayamanan.",
            "Ang kapangyarihan at kayamanan ay maaaring maging sanhi ng kamalian, ng maling mga desisyon at paghusga.",
            "Hindi nakikita ng taong mapanaghili sa kayamanan at kapangyarihan ng iba kung ano ang tama o mali."
        ],
        "correctAnswer": "Nakabubulag ang labis na kayamanan at kapangyarihan.",
        "explanation": "Ang talinghaga ng 'ningning na nakasisilaw' ay direktang kumakatawan sa panlabas na anyo, kayamanan, at kapangyarihan na bumubulag sa tao sa katotohanan."
    },
    {
        "id": "RC-1302-25",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-3",
        "question": "Ang kaliluhan ay nangangahulugang",
        "options": [
            "kalapastanganan.",
            "paghihikahos.",
            "kataksilan.",
            "kapalaluan."
        ],
        "correctAnswer": "kataksilan.",
        "explanation": "Ang salitang 'kaliluhan' (mula sa salitang ugat na lilo) ay kasingkahulugan ng kataksilan o pagtataksil."
    },
    {
        "id": "RC-1302-26",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-4",
        "question": "Anong uri ng pagkabansot ang ibig tukuyin ng may-akda?",
        "options": [
            "pagkabansot ng paglaki",
            "pagkabansot ng pang-unawa",
            "pagkabansot ng isipan, ng puso, at ng diwa",
            "pagkabansot ng karunungan at kaalaman"
        ],
        "correctAnswer": "pagkabansot ng isipan, ng puso, at ng diwa",
        "explanation": "Sa unang talata ay tuwirang sinasabi ng may-akda: '...ngunit ang pinakamalungkot na uri raw ay ang pagkabansot ng isipan, ng puso, at ng diwa.'"
    },
    {
        "id": "RC-1302-27",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-4",
        "question": "Bakit sinabing ang pagkabansot ng isipan, puso, at diwa ang pinakamalungkot na uri ng pagkabansot?",
        "options": [
            "Hindi tayo matututong makipag-kapwa kung tayo ay kulang sa tamang pag-iisip.",
            "Kung hindi tayo mapagkakatiwalaan ay hindi nanaisin ng ating kapwa na tayo ay makasama.",
            "Maghahatid ng pinsala sa ating bayan kung ang ating puso at diwa ay puno ng kabuktutan.",
            "Ang pag-unlad ng katauhan ang makatutulong sa atin, sa ating kapwa, at sa ating bayan."
        ],
        "correctAnswer": "Maghahatid ng pinsala sa ating bayan kung ang ating puso at diwa ay puno ng kabuktutan.",
        "explanation": "Ayon sa akda, kung ang kalooban nati'y puno ng kasamaan, ihahatid natin ang Inang Bayan 'sa putik ng kahirapan at kahihiyan' (isang malaking kapinsalaan para sa kinabukasan)."
    },
    {
        "id": "RC-1302-28",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-4",
        "question": "Ang layunin ng may-akda sa pagsulat ng sanaysay ay",
        "options": [
            "ipaliwanag ang iba't ibang uri ng pagkabansot.",
            "bigyang-diin na hindi sapat ang lumaki sa sukat, timbang, at kaalaman.",
            "gisingin ang kabataan at ipaalala kung ano ang dapat na bigyang-halaga sa buhay.",
            "ipaalala sa kabataan ang kahalagahan ng pagmamahal sa bayan."
        ],
        "correctAnswer": "gisingin ang kabataan at ipaalala kung ano ang dapat na bigyang-halaga sa buhay.",
        "explanation": "Nais gisingin ng may-akda ang kamalayan ng mga kabataan sa kahalagahan ng pagpapalago hindi lamang ng katawan at isip kundi lalo na ng mabuting kaugalian at gawa para sa kinabukasan."
    },
    {
        "id": "RC-1302-29",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-4",
        "question": "Ayon sa akda, ang ating paglaki ay",
        "options": [
            "kailangang paglaki at pag-unlad ng ating buong katauhan.",
            "nararapat na paglaki at pag-unlad ng ating buong katauhan, lalo na ng ating sukat at timbang.",
            "dapat nating pangalagaan upang tayo ay hindi mabansot.",
            "tanda ng ating kahandaan sa paglilingkod sa ating bayan."
        ],
        "correctAnswer": "kailangang paglaki at pag-unlad ng ating buong katauhan.",
        "explanation": "Malinaw na sinabi sa ikalawang talata: 'ang ating paglaki ay kailangang paglaki at pag-unlad ng ating buong katauhan'."
    },
    {
        "id": "RC-1302-30",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-4",
        "question": "Alin sa mga sumusunod ang hindi ipinahahayag sa teksto?",
        "options": [
            "Ayon sa ating mga ninuno, kung ano ang nakasanayan nating gawin ay mananatili hanggang sa tayo ay tumanda.",
            "Ang kabataan ang maghahatid sa ating bayan sa karangalan o sa kahihiyan.",
            "Hindi natin dapat bigyang halaga ang pisikal nating paglaki.",
            "Napakalaking kakulangan kung tayo ay tumangkad at bumilog, ngunit hindi mapagkakatiwalaan."
        ],
        "correctAnswer": "Hindi natin dapat bigyang halaga ang pisikal nating paglaki.",
        "explanation": "Sinasabi sa sanaysay na hindi 'lamang' (not only) sukat at timbang ang dapat lumaki, ngunit hindi nito sinasabing huwag na itong bigyang halaga nang tuluyan."
    },
    {
        "id": "RC-1302-31",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-4",
        "question": "Ano ang nais ipahiwatig ng may-akda nang sabihin niyang \"ang tunay na pag-ibig sa bayan ay wala sa tamis ng pangarap, wala rin sa pagpag ng dila kundi nasa pawis at gawa\"?",
        "options": [
            "Ang pagmamahal sa bayan ay masusukat sa dami ng ating nagawa para dito.",
            "Hindi nating kailangang ipahayag ang ating pagmamahal at pagmamalasakit sa ating bayan.",
            "Hindi sapat na ipahayag natin ang pagmamahal natin sa bayan, dapat ay ipakita natin ito sa pamamagitan ng paggawa ng mga bagay na makabubuti sa ating bansa.",
            "Ang ating mga pangarap at gawain ay dapat nating ialay sa ating dakilang bayan."
        ],
        "correctAnswer": "Hindi sapat na ipahayag natin ang pagmamahal natin sa bayan, dapat ay ipakita natin ito sa pamamagitan ng paggawa ng mga bagay na makabubuti sa ating bansa.",
        "explanation": "Ipinapakita nito na ang salita lamang ay hindi sapat ('wala rin sa pagpag ng dila'); kinakailangan ang aktwal na pagkilos at pawis upang mapatunayan ang nasyonalismo."
    },
    {
        "id": "RC-1302-32",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-4",
        "question": "Ang pinakamahalagang tanda ng paglaki ay",
        "options": [
            "ang pagtitiwala natin sa ating sarili.",
            "ang pagiging handa natin sa pagharap sa mga pagsubok sa buhay.",
            "ang pag-unlad ng ating buong katauhan.",
            "ang pagiging handa nating magsilbi nang buong puso sa ating bayan."
        ],
        "correctAnswer": "ang pag-unlad ng ating buong katauhan.",
        "explanation": "Nakasaad sa teksto na 'ang ating paglaki ay kailangang paglaki at pag-unlad ng ating buong katauhan' dahil hindi ito nakabase lamang sa pisikal kundi maging sa diwa, puso, at moralidad."
    },
    {
        "id": "RC-1303-33",
        "subject": "Reading Comprehension",
        "subtopic": "Short Stories",
        "groupId": "RC-PASS-5",
        "question": "Anong uri ng katauhan ang maaaninag kay Magiting batay sa kanyang talumpati?",
        "options": [
            "isang kabataang sa kabila ng kapansanan ay handang gampanan ang kanyang tungkulin bilang isang mabuting mamamayan",
            "isang kabataang takot na mapariwara sa buhay",
            "isang kabataang hindi takot magpahayag ng kanyang damdamin at saloobin",
            "isang kabataang nakaaalam ng tunay na pangyayari sa paligid at handang gawin ang lahat upang siya ay hindi maligaw ng landas"
        ],
        "correctAnswer": "isang kabataang sa kabila ng kapansanan ay handang gampanan ang kanyang tungkulin bilang isang mabuting mamamayan",
        "explanation": "Bagama't siya ay pilay (putol ang paa) at isang paslit, buong giting niyang ipriniprisinta ang kanyang sarili para maglingkod sa bayan."
    },
    {
        "id": "RC-1303-34",
        "subject": "Reading Comprehension",
        "subtopic": "Short Stories",
        "groupId": "RC-PASS-5",
        "question": "Paano nakatulong sa paglago ni Magiting bilang tao ang dalawang magkasalungat ng pangyayaring kanyang nasaksihan?",
        "options": [
            "Namulat ang kanyang isipan sa mga pangyayari sa kanyang kapaligiran, at napagtanto niya kung ano ang nararapat niyang gawin.",
            "Natuklasan niya ang epekto ng pag-inom ng alak, hindi lamang sa katawan kundi maging sa pag-iisip.",
            "Napagtanto niya na sa panahon ngayon ay mayroon pa ring mga kabataang nagpapahalaga sa kanilang mga magulang.",
            "Naging panatag ang kanyang kalooban na maaaring sa pagtanda niya ay gagabayan at poprotektahan din siya ng kanyang magiging anak."
        ],
        "correctAnswer": "Namulat ang kanyang isipan sa mga pangyayari sa kanyang kapaligiran, at napagtanto niya kung ano ang nararapat niyang gawin.",
        "explanation": "Ang mabuting halimbawa ng batang umaakay at masamang halimbawa ng mga kabataang naglalasing ay nagbigay-daan upang malaman ni Magiting kung ano ang dapat ('gayundin ang dapat kong gawin') at hindi dapat pamarisan."
    },
    {
        "id": "RC-1303-35",
        "subject": "Reading Comprehension",
        "subtopic": "Short Stories",
        "groupId": "RC-PASS-5",
        "question": "Ano ang binalak gawin ni Magiting nang mabasa niya sa pahayagan ang panawagan sa mga kabataan upang maglingkod sa bayan?",
        "options": [
            "tumakbo bilang isang opisyal ng gobyerno",
            "umakto na wala siyang nabasa",
            "tumugon sa panawagan sa kabataan na magpatala",
            "lumapit sa kinuukulan at ipahayag ang kanyang saloobin"
        ],
        "correctAnswer": "tumugon sa panawagan sa kabataan na magpatala",
        "explanation": "Sinabi niya nang tuwiran: 'Isang panawagan sa kabataan ang magpatala... Kaya naman ako... ay naririto ngayon at dumudulog sa inyo... upang magpatala'."
    },
    {
        "id": "RC-1303-36",
        "subject": "Reading Comprehension",
        "subtopic": "Short Stories",
        "groupId": "RC-PASS-5",
        "question": "Anong damdamin mayroon si Magiting sa kanyang pahayag na \"Kaya naman ako…akong nabibilang sa kabataan ay naririto ngayon at dumudulog sa inyo! Opo, ako…akong si Magiting ay naririto upang ilaan ang aking sarili sa paglilingkod sa Lupang Tinubuan\"?",
        "options": [
            "pag-aalala",
            "pagsusumamo",
            "pag-aalinlangan",
            "pagmamalaki"
        ],
        "correctAnswer": "pagmamalaki",
        "explanation": "Sinasabi niya ito ng may buong tapang at dangal (pagmamalaki) upang patunayan na siya, bagama't bata pa at may kapansanan, ay naroon upang buong pusong maglingkod sa bayan."
    },
    {
        "id": "RC-1303-37",
        "subject": "Reading Comprehension",
        "subtopic": "Short Stories",
        "groupId": "RC-PASS-5",
        "question": "Ano ang ibig sabihin ng sagwil sa tula?",
        "options": [
            "suliranin",
            "hadlang",
            "sagot",
            "tulong"
        ],
        "correctAnswer": "hadlang",
        "explanation": "Ang salitang 'sagwil' ay magkasingkahulugan ng balakid o hadlang, na nangangahulugang ang kapansanan ay hindi hadlang upang maglingkod."
    },
    {
        "id": "RC-1303-38",
        "subject": "Reading Comprehension",
        "subtopic": "Short Stories",
        "groupId": "RC-PASS-5",
        "question": "Sa nabasang akda, alin sa mga sumusunod ang maipalalagay nating tama?",
        "options": [
            "Isang hadlang sa paglilingkod sa bayan ang kapansanan ni Magiting.",
            "Hindi nakikitang dahilan ni Magiting ang kanyang kapansanan upang maging hadlang sa kanyang paglilingkod sa bayan.",
            "Ang mga kabataan, lalo na ang mga may kapansanan, ay hindi naniniwalang sa murang edad nila ay makapaglilingkod na sila sa bayan.",
            "Hindi mulat ang mga kabataan ngayon sa mga pangyayari sa kapaligiran na maka-iimpluwensiya sa kanilang kinabukasan."
        ],
        "correctAnswer": "Hindi nakikitang dahilan ni Magiting ang kanyang kapansanan upang maging hadlang sa kanyang paglilingkod sa bayan.",
        "explanation": "Pinaninindigan ni Magiting na hindi sagwil o hadlang ang pagiging pilay niya sa kagustuhang mapaglingkuran ang Lupang Tinubuan."
    },
    {
        "id": "RC-1303-39",
        "subject": "Reading Comprehension",
        "subtopic": "Short Stories",
        "groupId": "RC-PASS-5",
        "question": "Ano ang nais ipakahulugan ni Magiting sa ikatlong talata?",
        "options": [
            "Sa kabila ng kanyang kabataan ay hindi lingid sa kanya ang mga pangyayari sa kanyang paligid.",
            "Nalalaman na niya ang lahat ng bagay sa mundo.",
            "Alam na niya ang tama at mali.",
            "Hindi na siya batang kailangang protektahan sa lahat ng pagkakataon."
        ],
        "correctAnswer": "Sa kabila ng kanyang kabataan ay hindi lingid sa kanya ang mga pangyayari sa kanyang paligid.",
        "explanation": "Sa ikatlong talata, ipinahihiwatig ni Magiting na kahit siya ay bata pa ('pahat man ang aking diwa'), naririnig, nakikita, at nadarama niya ang mga totoong pangyayari sa mundo."
    },
    {
        "id": "RC-1302-40",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-6B",
        "question": "Ayon sa sanaysay, ang tao ay",
        "options": [
            "nilikha para sa lahat.",
            "ang pinakadakila sa lahat.",
            "hindi mabubuhay kung wala ang lahat.",
            "kakaiba sa lahat."
        ],
        "correctAnswer": "ang pinakadakila sa lahat.",
        "explanation": "Sinasabi sa unang linya ng sanaysay na: 'Ang tao ay nagtataglay ng tatlong katangian kaya siya ang pinakadakila sa nilalang ng Diyos.'"
    },
    {
        "id": "RC-1302-41",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-6B",
        "question": "Sa pangungusap na \"Dito naiaakma at mailalapat ang katarungan, na sapagkat siya ay nakagawa naman ng _kabuktutan_ at lihis sa mabuting asal, karampatang nalalaan naman sa kanya ang kaparusahan.\", ang salitang sinalungguhitan ay nangangahulugang",
        "options": [
            "kapalpakan",
            "kabalisahan",
            "katuturan",
            "kasamaan"
        ],
        "correctAnswer": "kasamaan",
        "explanation": "Ang salitang 'kabuktutan' ay nangangahulugang kalikuan o kasamaan."
    },
    {
        "id": "RC-1302-42",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-6B",
        "question": "Anong uri ng teksto ang binasa?",
        "options": [
            "ekspositori",
            "naratibo",
            "argumentatibo",
            "deskriptibo"
        ],
        "correctAnswer": "ekspositori",
        "explanation": "Ito ay nagpapaliwanag at naglalahad ng impormasyon o konsepto hinggil sa mga uri ng kaluluwa at kalikasan ng tao, kaya't ito ay ekspositori."
    },
    {
        "id": "RC-1302-43",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-6B",
        "question": "Ano ang kaisipang nangingibabaw sa ikatlong talata ng tekstong binasa?",
        "options": [
            "Ang tao ay indibidwal na bukod na pinagpala ng Diyos sa lahat ng nilikha.",
            "Ang tao ang siyang pag-asa ng lahat ng nilikha ng Diyos.",
            "Ang tao ay biniyayaan ng kalayaan upang gawin ang alam niyang naaayon at ang bawat gawain ay may kaakibat na kapalit.",
            "Ang tao ay nagkakamali rin at may karampatang parusa ang bawat kasalanan."
        ],
        "correctAnswer": "Ang tao ay biniyayaan ng kalayaan upang gawin ang alam niyang naaayon at ang bawat gawain ay may kaakibat na kapalit.",
        "explanation": "Pinaliwanag sa ikatlong talata na ang kalayaan ng tao na gumawa ng mabuti o masama ay laging may kakambal na kapanagutan o consequences."
    },
    {
        "id": "RC-1307-44",
        "subject": "Reading Comprehension",
        "subtopic": "Comic Strips, Editorial Cartoon, Graphs",
        "groupId": "RC-PASS-7",
        "question": "Anong mga araw may byahe ng gabi patungong Cebu?",
        "options": [
            "Lunes, Martes, Huwebes, Sabado, at Linggo",
            "Lunes, Miyerkules, Biyernes, at Linggo",
            "Martes, Miyerkules, Sabado, at Linggo",
            "Lunes, Miyerkules, Huwebes, Biyernes, at Linggo"
        ],
        "correctAnswer": "Lunes, Miyerkules, Huwebes, Biyernes, at Linggo",
        "explanation": "Batay sa talahanayan, ang mga byaheng gabi ('n.g.') na may rutang patungong Cebu ay: Manila-Cebu (Miyerkules, Huwebes, Biyernes), Cagayan de Oro-Cebu (Lunes, Miyerkules), at Zamboanga-Cebu (Linggo)."
    },
    {
        "id": "RC-1307-45",
        "subject": "Reading Comprehension",
        "subtopic": "Comic Strips, Editorial Cartoon, Graphs",
        "groupId": "RC-PASS-7",
        "question": "Anong mga araw may barkong bumabyahe ng 10:45 n.g.?",
        "options": [
            "Biyernes at Linggo",
            "Lunes at Huwebes",
            "Sabado at Linggo",
            "Miyerkules at Sabado"
        ],
        "correctAnswer": "Lunes at Huwebes",
        "explanation": "Sa talahanayan, ang may oras na 10:45 n.g. ay ang ruta ng Manila-Cebu (Huwebes) at Cagayan de Oro-Cebu (Lunes)."
    },
    {
        "id": "RC-1307-46",
        "subject": "Reading Comprehension",
        "subtopic": "Comic Strips, Editorial Cartoon, Graphs",
        "groupId": "RC-PASS-7",
        "question": "Ilang biyahe ng barko mayroon ang Super Ferry Shipping Lines tuwing Linggo?",
        "options": [
            "5",
            "2",
            "4",
            "3"
        ],
        "correctAnswer": "3",
        "explanation": "Tuwing Linggo, may byahe mula Manila-Cebu (8:45 n.u.), Zamboanga-Cebu (10:15 n.g.), at Cotabato-Cebu (10:45 n.u.). Kaya mayroong tatlo (3) lahat."
    },
    {
        "id": "RC-1307-47",
        "subject": "Reading Comprehension",
        "subtopic": "Comic Strips, Editorial Cartoon, Graphs",
        "groupId": "RC-PASS-7",
        "question": "Saang lugar may pinakamaraming byahe ang Super Ferry Shipping Lines?",
        "options": [
            "Cebu",
            "Manila",
            "Cagayan de Oro",
            "Zamboanga"
        ],
        "correctAnswer": "Cebu",
        "explanation": "Mapapansin sa talahanayan na halos lahat ng byahe (20 sa 20 listed routes) ay umaalis papunta o kaya'y nagmumula sa Cebu, na ginagawa itong hub ng nasabing shipping lines."
    },
    {
        "id": "RC-1307-48",
        "subject": "Reading Comprehension",
        "subtopic": "Comic Strips, Editorial Cartoon, Graphs",
        "groupId": "RC-PASS-7",
        "question": "Anong oras ang byahe mula Nasipit patungong Cebu?",
        "options": [
            "6:45 n.g.",
            "10:15 n.g.",
            "5:45 n.u.",
            "11:15 n.g."
        ],
        "correctAnswer": "5:45 n.u.",
        "explanation": "Batay sa talahanayan, ang rutang Nasipit-Cebu ay bumabyahe kapag Martes ng 5:45 n.u."
    },
    {
        "id": "RC-1307-49",
        "subject": "Reading Comprehension",
        "subtopic": "Comic Strips, Editorial Cartoon, Graphs",
        "groupId": "RC-PASS-7",
        "question": "Ilang araw nagkakaroon ng byaheng Cebu-Cagayan de Oro?",
        "options": [
            "8",
            "3",
            "5",
            "4"
        ],
        "correctAnswer": "3",
        "explanation": "Ang rutang Cebu-Cagayan de Oro ay makikita tuwing Lunes, Huwebes, at Sabado. Kaya nagkakaroon ng byahe rito sa tatlong (3) araw."
    },
    {
        "id": "RC-1301-50",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-8",
        "question": "To whom is the poem addressed?",
        "options": [
            "People nowadays",
            "The author's son",
            "Disrespectful suitors",
            "Noble men of yesterday"
        ],
        "correctAnswer": "The author's son",
        "explanation": "The speaker repeatedly refers to the listener as 'son' (e.g., 'Once upon a time, son,' and 'So show me, son'), indicating the poem is addressed to his son."
    },
    // {
    //     "id": "RC-1301-51",
    //     "subject": "Reading Comprehension",
    //     "subtopic": "Poetry",
    //     "groupId": "RC-PASS-8",
    //     "question": "Okara contrasts the past with the present. What does this signify?",
    //     "options": [
    //         "People before laughed with their hearts. Now, their laughter lacks warmth and spirit.",
    //         "Once, showing hospitality to guests was a common thing. But these days, no one wants visitors.",
    //         "Hypocrisy and pretensions are the salient features of human behavior today.",
    //         "The concept of friendship is not what it used to be."
    //     ],
    //     "correctAnswer": "People before laughed with their hearts. Now, their laughter lacks warmth and spirit.",
    //     "explanation": "The opening lines specifically draw the contrast: 'they used to laugh with their hearts... but now they only laugh with their teeth, while their ice-block-cold eyes...' showing a shift from genuine warmth to spirited coldness."
    // },
    {
        "id": "RC-1301-51",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-8",
        "question": "Okara contrasts the past with the present. What does this signify?",
        "options": [
            "People before laughed with their hearts. Now, their laughter lacks warmth and spirit.",
            "Once, showing hospitality to guests was a common thing. But these days, no one wants visitors.",
            "Hypocrisy and pretensions are the salient features of human behavior today.",
            "The concept of friendship is not what it used to be."
        ],
        "correctAnswer": "Hypocrisy and pretensions are the salient features of human behavior today.",
        "explanation": "The contrast between the past (laughing/shaking hands with the heart) and the present (laughing with teeth/shaking hands without hearts) signifies the overarching theme of the poem: the prevalence of hypocrisy, superficiality, and pretension in modern society.",
    },
    {
        "id": "RC-1301-52",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-8",
        "question": "Is this poem a criticism of modern life?",
        "options": [
            "No, because people are still the same as they were.",
            "No, because people still act accordingly on the situations they are faced with.",
            "Yes, because people's morals and manners have declined over time.",
            "Yes, because people's behaviors are just superficial."
        ],
        "correctAnswer": "Yes, because people's behaviors are just superficial.",
        "explanation": "The poem heavily criticizes the superficiality and fakeness of modern life, observing that people 'wear many faces' and smile without true feeling."
    },
    {
        "id": "RC-1301-53",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-8",
        "question": "The poet addresses the poem to his son because of the following EXCEPT",
        "options": [
            "he sees his own past in him.",
            "to show that once upon a time, morals and values dominated the world of human beings.",
            "he wants him to maintain simplicity, openness of the heart and innocence.",
            "to show that people change."
        ],
        "correctAnswer": "to show that people change.",
        "explanation": "While people do change, the speaker addresses his son specifically because he wants to relearn innocence from him and sees his past self in him, not merely to demonstrate the fact that people change."
    },
    {
        "id": "RC-1301-54",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-8",
        "question": "What does the description \"laugh with their teeth\" illustrate?",
        "options": [
            "ignorance",
            "mocking",
            "indifference",
            "insincerity"
        ],
        "correctAnswer": "insincerity",
        "explanation": "Laughing 'only with their teeth' means they are faking the emotion without the heart being involved, illustrating insincerity."
    },
    {
        "id": "RC-1302-55",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-9",
        "question": "According to the passage, what can bring world peace?",
        "options": [
            "love",
            "trust",
            "knowledge",
            "belief"
        ],
        "correctAnswer": "knowledge",
        "explanation": "The passage explicitly states: 'the love of peace must come from knowledge which may be seen and formulated in a thousand different ways.'"
    },
    {
        "id": "RC-1302-56",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-9",
        "question": "What does the statement \"Life is war\" mean?",
        "options": [
            "We always fight with each other.",
            "We all enjoy hurting each other.",
            "We live in constant struggle to survive.",
            "Only the greatest and the bravest survive."
        ],
        "correctAnswer": "We live in constant struggle to survive.",
        "explanation": "The author explains that insofar as man is an animal, he lives by struggle and at the expense of others, which equates to a constant struggle to survive."
    },
    {
        "id": "RC-1302-57",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-9",
        "question": "The author states all of the following EXCEPT",
        "options": [
            "Man lives at the expense of others.",
            "World peace is unattainable.",
            "Fear teaches men nothing.",
            "Peace is hard to define."
        ],
        "correctAnswer": "World peace is unattainable.",
        "explanation": "The author does not say world peace is unattainable; rather, he argues it can be attained through a supreme 'knowledge of the living substance in each of us', which crosses a threshold to miracles."
    },
    {
        "id": "RC-1302-58",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-9",
        "question": "What is the author's purpose in comparing world peace to a philosopher's stone?",
        "options": [
            "World peace requires several processes.",
            "World peace and a philosopher's stone can only be attained through a miracle.",
            "World peace, like a philosopher's stone, is something mankind has been seeking for thousands of years.",
            "World peace costs too high a price to be able to achieve."
        ],
        "correctAnswer": "World peace and a philosopher's stone can only be attained through a miracle.",
        "explanation": "The text explains that peace cannot be manufactured systematically ('invented by a congress of chemists') but requires crossing a threshold of supreme knowledge 'beyond which miracles begin', much like the mystical philosopher's stone."
    },
    {
        "id": "RC-1302-59",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-9",
        "question": "What does the author mean in the fourth paragraph?",
        "options": [
            "Man fears the damage wrought by war.",
            "Man's search for peace necessitates the occurrence of war.",
            "Man enjoys killing, that he seeks war himself.",
            "Fear doesn't encumber man from war."
        ],
        "correctAnswer": "Fear doesn't encumber man from war.",
        "explanation": "The author specifically states 'Fear teaches men nothing' and no memory of the horror of war will deter them, meaning fear does not encumber or hinder man from making war."
    },
    {
        "id": "RC-1302-60",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-9",
        "question": "Based on the author's argument about war and survival, which statement would the author be most likely to agree with?",
        "options": [
            "As long as men believe that killing is a means of survival, war will never cease to exist.",
            "Men do not fear war.",
            "Men act nonchalantly to damages wrought by war.",
            "Propaganda and preaching can give rise to a true spirit of peace on earth."
        ],
        "correctAnswer": "As long as men believe that killing is a means of survival, war will never cease to exist.",
        "explanation": "Since the author notes that as an animal, man lives by struggle (war) for survival, he would agree that as long as man views this dynamic as necessary, war will not end until profound inner knowledge is realized."
    },
    {
        "id": "RC-1301-61",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-10",
        "question": "The theme of this poem addresses the subject of",
        "options": [
            "water cycles.",
            "life cycles.",
            "seasons and weather of the world.",
            "the instabilities of life."
        ],
        "correctAnswer": "water cycles.",
        "explanation": "The literal subject and extended metaphor of the poem is the movement of water from the stream, to the ocean, and back (the water cycle) used to illustrate the impossibility of recovering something once dispersed."
    },
    {
        "id": "RC-1301-62",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-10",
        "question": "As seen in lines 3 to 5, the speaker's attitude toward the silent auditor seems to be somewhat",
        "options": [
            "mocking.",
            "challenging.",
            "loving.",
            "deferential."
        ],
        "correctAnswer": "challenging.",
        "explanation": "The speaker challenges the auditor ('Try if this sober stream you can Follow...') to perform an impossible task."
    },
    {
        "id": "RC-1301-63",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-10",
        "question": "Within the context of the poem, the speaker's \"remains\" in line 14 can be seen as his\n I. work left to be done.\n II. remnant of material possessions.\n III. dead body.\n IV. surviving writings.",
        "options": [
            "I only",
            "II, III, and IV only",
            "II and III only",
            "III and IV only"
        ],
        "correctAnswer": "III and IV only",
        "explanation": "In poetic contexts, one's 'remains' that are scattered to the winds refer typically to one's physical ashes (dead body) and one's literary remains (surviving writings) scattered throughout time."
    },
    // {
    //     "id": "RC-1301-64",
    //     "subject": "Reading Comprehension",
    //     "subtopic": "Poetry",
    //     "groupId": "RC-PASS-10",
    //     "question": "As the word is used in line 14, \"particular\" describes the speaker's \"remains\" as all the following EXCEPT",
    //     "options": [
    //         "apart from others.",
    //         "personal.",
    //         "special rather than general.",
    //         "precise."
    //     ],
    //     "correctAnswer": "special rather than general.",
    //     "explanation": "Here, 'particular' refers to his precise, individual, specific personal particles (apart from others) rather than something 'special' as in exalted or superior."
    // },
    {
        "id": "RC-1301-64",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-10",
        "question": "As the word is used in line 14, \"particular\" describes the speaker's \"remains\" as all the following EXCEPT",
        "options": [
            "apart from others.",
            "personal.",
            "special rather than general.",
            "precise."
        ],
        "correctAnswer": "precise.",
        "explanation": "In the phrase 'particular remains', 'particular' means specific, individual, or personal (apart from others). While 'special rather than general' is a synonym for specific, 'precise' typically refers to exactness or accuracy, which is not the intended meaning in this context.",
    },
    {
        "id": "RC-1301-65",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-10",
        "question": "Figuratively, the stream represents",
        "options": [
            "part of the water cycle.",
            "the source for the ocean.",
            "people in a state of innocence.",
            "literary works."
        ],
        "correctAnswer": "people in a state of innocence.",
        "explanation": "A 'sober stream' often figures as a metaphor for an individual human life or an innocent soul progressing into the vast, mingling 'wilder ocean' of the world or eternity."
    },
    {
        "id": "RC-1301-66",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-10",
        "question": "Which literary device is used in line 3?",
        "options": [
            "Parody",
            "Allusion",
            "Personification",
            "Assonance"
        ],
        "correctAnswer": "Personification",
        "explanation": "Referring to the stream as 'sober' gives it a human attribute (sobriety, meaning serious or calm), which is personification."
    },
    {
        "id": "RC-1301-67",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-10",
        "question": "In the title, \"to No Purpose\" means",
        "options": [
            "irrelevant.",
            "unresolved.",
            "untalented.",
            "misdirected."
        ],
        "correctAnswer": "unresolved.",
        "explanation": "'To No Purpose' generally means it is a futile, unresolved act, just as trying to trace the water's path back exactly is pointless and cannot be resolved."
    },
    {
        "id": "RC-1301-68",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-11",
        "question": "Shakespeare's sonnet 130 is",
        "options": [
            "a satire on the deficiencies of the speaker's mistress.",
            "a belittling of a loved one for the amusement of friends.",
            "a playful expression of faults to irritate the lady.",
            "a tribute to the uniqueness and beauty of the speaker's mistress."
        ],
        "correctAnswer": "a tribute to the uniqueness and beauty of the speaker's mistress.",
        "explanation": "Despite listing her faults or lack of conventional idealized traits, the concluding couplet shows it is actually a genuine tribute asserting that his love is as rare and valuable as anyone praised with false comparisons."
    },
    {
        "id": "RC-1301-69",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-11",
        "question": "By \"false compare\" the speaker means that",
        "options": [
            "the conventional praises of mistresses by poets are romantic lies.",
            "to win love one must compare the charms of mistresses with the beauties in nature.",
            "the women whom men love must be worshipped as goddesses.",
            "love poetry must abound in hyperbole."
        ],
        "correctAnswer": "the conventional praises of mistresses by poets are romantic lies.",
        "explanation": "The 'false compare' references the hyperbolic, clichéd metaphors common in poetry at the time, which Shakespeare critiques as being unrealistic lies."
    },
    {
        "id": "RC-1301-70",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-11",
        "question": "The speaker in Shakespeare's sonnet",
        "options": [
            "reveals the lack of love for his mistress.",
            "is an arrogant and egoistic lover.",
            "envies the verbal dexterity of his fellow poets.",
            "raises the reader's suspicions about his feelings and then tells honestly how he feels."
        ],
        "correctAnswer": "raises the reader's suspicions about his feelings and then tells honestly how he feels.",
        "explanation": "The first 12 lines make the reader suspect the speaker is insulting his mistress, but the final two lines turn it around to reveal his deep, honest love."
    },
    {
        "id": "RC-1301-71",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-11",
        "question": "The true intent of the speaker is revealed best by",
        "options": [
            "the outrageousness of his metaphors.",
            "his imaginative conceits.",
            "the subtle nuances in each description.",
            "the contrast between the first twelve lines and the last two."
        ],
        "correctAnswer": "the contrast between the first twelve lines and the last two.",
        "explanation": "The turn (volta) happens in the concluding couplet, providing a stark contrast to the preceding criticisms, establishing his genuine affection."
    },
    {
        "id": "RC-1301-72",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-11",
        "question": "The essential element of this sonnet is",
        "options": [
            "praise of a mistress.",
            "search for the blemishes in a loved one.",
            "a lover's compromise with reality.",
            "mockery of a convention in love poetry."
        ],
        "correctAnswer": "mockery of a convention in love poetry.",
        "explanation": "The entire poem operates by systematically mocking the Petrarchan convention of comparing parts of a woman's body to nature in exaggerated terms."
    },
    {
        "id": "RC-1302-73",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-12",
        "question": "What does the author mean in lines 2-3 when he writes, \"Young men are fitter to invent than to judge, fitter for execution than for counsel, and fitter for new projects than for settled business\"?",
        "options": [
            "Young men are better thinkers, doers, and projects innovators than older men.",
            "Older men are better suited to assess, counsel, and determine new ventures.",
            "Young men are better thinkers and doers but older men are more effective project innovators.",
            "The young are better suited for those areas demanding less wisdom, less negotiation, and more physical exertion."
        ],
        "correctAnswer": "Young men are better thinkers, doers, and projects innovators than older men.",
        "explanation": "In context, the passage explicitly asserts that young men excel in invention (thinkers/innovators), execution (doers), and new projects."
    },
    {
        "id": "RC-1302-74",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-12",
        "question": "What does the author mean in lines 3-4 when he writes, \"For the experience of age, in things that fall within the compass of it, directeth them, but in new things abuseth them\"?",
        "options": [
            "Experience learned over time may be insightful when dealing with new areas as historical knowledge may be applied to these new areas.",
            "New experiences may be an actual detriment when it comes to items involving new areas.",
            "New experiences can refresh business direction rather than past lessons learned.",
            "Experience learned over time may be usefully applied in areas where the experience was learned but becomes a hindrance when new areas are encountered."
        ],
        "correctAnswer": "Experience learned over time may be usefully applied in areas where the experience was learned but becomes a hindrance when new areas are encountered.",
        "explanation": "The text explains that experience works well within familiar territory ('within the compass of it') but misleads ('abuseth them') when faced with brand-new circumstances."
    },
    {
        "id": "RC-1302-75",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-12",
        "question": "As established in the passage, which comparative would best describe the assessment of young to older men in business?",
        "options": [
            "Methodical versus hardened",
            "Brash versus seasoned",
            "Stately versus unruly",
            "Diplomatic versus harried"
        ],
        "correctAnswer": "Brash versus seasoned",
        "explanation": "Young men are described as flying to the end, using extreme remedies, and acting like an 'unready horse' (brash), while older men have experience and judgment (seasoned)."
    },
    {
        "id": "RC-1302-76",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-12",
        "question": "What does the author mean with the phrase, \"like an unready horse that will neither stop nor turn,\" in line 9?",
        "options": [
            "He is comparing a young man to a horse that is either too young or inadequately trained and therefore will not yield or follow instruction.",
            "He is praising the tenacity of the young man who does not stop even though he may be tired.",
            "He is likening the young man to a horse that is not yet ready to ride or work because he has not been prepared by the seasoned older man yet, but once started, he will not let his trainer down.",
            "He is saying that the young man is not yet ready for instruction and should be assigned new projects where he can use his youth and vitality exclusively."
        ],
        "correctAnswer": "He is comparing a young man to a horse that is either too young or inadequately trained and therefore will not yield or follow instruction.",
        "explanation": "The phrase criticizes the young men for not acknowledging or retracting their errors, meaning they are headstrong and unyielding like a poorly trained horse."
    },
    {
        "id": "RC-1302-77",
        "subject": "Reading Comprehension",
        "subtopic": "Essays, Articles, Speeches",
        "groupId": "RC-PASS-12",
        "question": "What is the main idea of the passage?",
        "options": [
            "Retention of older men preserves the business to older clients.",
            "There is a certain business savvy than can be accomplished only over time.",
            "New strategies and ventures are best implemented with the younger men in control.",
            "Here is more opportunity for business success when young men control."
        ],
        "correctAnswer": "There is a certain business savvy than can be accomplished only over time.",
        "explanation": "The passage highlights the value of the experience of age in settled business and judgment, showing that there are key advantages (savvy) achieved only through aging and experience, while acknowledging youth's role in invention."
    },
    {
        "id": "RC-1301-78",
        "subject": "Reading Comprehension",
        "subtopic": "Poetry",
        "groupId": "RC-PASS-13",
        "question": "Ang ipinahihiwatig ng pamagat ay",
        "options": [
            "nagkalat ang mga huwad na bagay sa ating kapaligiran.",
            "laganap ang pagbabalatkayo sa ating bansa.",
            "laganap ang mapagkunwari sa iba't-ibang panig ng daigdig.",
            "puro huwad ang makikita natin sa ating paligid."
        ],
        "correctAnswer": "laganap ang mapagkunwari sa iba't-ibang panig ng daigdig.",
        "explanation": "Ang pamagat na 'May Plastik ang Mundo' na naka-adres kay 'Huwan' (Juan, na tumutukoy sa lipunang Pilipino) ay nagpapahiwatig ng talamak na pagbabalatkayo (hypocrisy) ng mga tao."
    }
];
