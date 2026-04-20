import { Question, ReadingPassage } from '../types/question';

export const languageGroups: ReadingPassage[] = [
    {
        groupId: "lp-synonym-eng",
        contextTitle: "Synonyms (English)",
        instruction: "Identify the synonym of the underlined word:"
    },
    {
        groupId: "lp-antonym-eng",
        contextTitle: "Antonyms (English)",
        instruction: "Identify the antonym of the underlined word:"
    },
    {
        groupId: "lp-synonym-fil",
        contextTitle: "Talasalitaan",
        instruction: "Piliin ang kasingkahulugan ng salitang nakapahilig:"
    },
    {
        groupId: "lp-antonym-fil",
        contextTitle: "Kasalungat",
        instruction: "Piliin ang kasalungat ng salitang nakapahilig:"
    }
];

export const languageQuestions: Question[] = [
    {
        "id": "LP-107-1",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "groupId": "lp-synonym-eng",
        "question": "The party was a success because of the kids' _jauntiness_.",
        "options": ["zestfulness", "cleverness", "obedience", "preciousness"],
        "correctAnswer": "zestfulness",
        "explanation": "Jauntiness refers to a lively, cheerful, and self-confident manner, which is closest in meaning to zestfulness."
    },
    {
        "id": "LP-107-2",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "groupId": "lp-synonym-eng",
        "question": "You have no idea how _exorbitant_ this dress is.",
        "options": ["cheap", "expensive", "nostalgic", "close-fitting"],
        "correctAnswer": "expensive",
        "explanation": "Exorbitant is used to describe a price that is unreasonably high."
    },
    {
        "id": "LP-107-3",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "groupId": "lp-synonym-eng",
        "question": "We had fun today _tingeing_ our shirts for a class activity.",
        "options": ["dyeing", "customizing", "knitting", "scuffing"],
        "correctAnswer": "dyeing",
        "explanation": "To tinge means to color slightly, which is a synonym for dyeing in this context."
    },
    {
        "id": "LP-107-4",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "groupId": "lp-synonym-eng",
        "question": "How come you got so _grubby_ simply by sitting on the swing?",
        "options": ["unhappy", "grimy", "emotional", "adorable"],
        "correctAnswer": "grimy",
        "explanation": "Grubby means dirty or grimy."
    },
    {
        "id": "LP-101-5",
        "subject": "Language Proficiency",
        "subtopic": "Verbs",
        "question": "Kurt, an exchange student from America, tried Balut when he ________ the Philippines.",
        "options": ["visited", "had visited", "visit", "visits"],
        "correctAnswer": "visited",
        "explanation": "The sentence describes a completed action in the past, requiring the simple past tense 'visited'."
    },
    {
        "id": "LP-101-6",
        "subject": "Language Proficiency",
        "subtopic": "Prepositions",
        "question": "The Manila Cathedral ________ Intramuros was built in 1571 by Juan Vivero.",
        "options": ["on", "in", "over", "along"],
        "correctAnswer": "in",
        "explanation": "Intramuros is a walled area (a district/city), so the preposition 'in' is used to denote location within that area."
    },
    {
        "id": "LP-102-7",
        "subject": "Language Proficiency",
        "subtopic": "Pronoun-Antecedent",
        "question": "Neither Lorraine nor MJ gave up on ________ UP dream.",
        "options": ["their", "they're", "the", "his"],
        "correctAnswer": "their",
        "explanation": "When using 'neither/nor' with two singular subjects, a plural pronoun 'their' is commonly used in modern English to be gender-neutral or inclusive of both subjects."
    },
    {
        "id": "LP-101-8",
        "subject": "Language Proficiency",
        "subtopic": "Adverbs",
        "question": "Lara ________ finished the project even before the given deadline.",
        "options": ["ready", "already", "al ready", "all ready"],
        "correctAnswer": "already",
        "explanation": "'Already' is an adverb used to show that something happened sooner than expected. 'All ready' means completely prepared."
    },
    {
        "id": "LP-101-9",
        "subject": "Language Proficiency",
        "subtopic": "Determiners",
        "question": "________ countries had to loan funds from the World Bank to help mitigate the impact of the COVID-19 pandemic.",
        "options": ["A lot of", "Many", "Plenty", "Various"],
        "correctAnswer": "Many",
        "explanation": "While 'A lot of' is common in speech, 'Many' is the most grammatically appropriate determiner for formal writing when referring to a large number of countable nouns (countries)."
    },
    {
        "id": "LP-105-10",
        "subject": "Language Proficiency",
        "subtopic": "Special Agreements",
        "groupId": "lp-err-all",
        "variant": "error-identification",
        "question": "{Jam recommended}[A] {that Ryza tries}[B] the brain training app called Elevate {help her prepare}[C] for the UPCAT. {No error}[D].",
        "options": ["Jam recommended", "that Ryza tries", "help her prepare", "No error"],
        "correctAnswer": "that Ryza tries",
        "explanation": "This requires the subjunctive mood after the verb 'recommended'. The correct form should be 'that Ryza try' (base form), regardless of the subject."
    },
    {
        "id": "LP-105-11",
        "subject": "Language Proficiency",
        "subtopic": "Special Agreements",
        "variant": "error-identification",
        "question": "{Another way}[A] you can prepare for the UPCAT {is to join}[B] The Maroon Bluebook's {online Facebook study group.}[C] {No error}[D].",
        "options": ["Another way", "is to join", "online Facebook study group.", "No error"],
        "correctAnswer": "No error",
        "explanation": "The sentence is grammatically correct. The subject 'Another way' agrees with the singular verb 'is'."
    },
    {
        "id": "LP-105-12",
        "subject": "Language Proficiency",
        "subtopic": "Parallelism",
        "variant": "error-identification",
        "question": "Annie has {many hobbies;}[A] she likes {reading, dancing,}[B] and {to do graph}[C] design. {No error}[D].",
        "options": ["many hobbies;", "reading, dancing,", "to do graph", "No error"],
        "correctAnswer": "to do graph",
        "explanation": "Parallelism requires consistent verb forms. Since 'reading' and 'dancing' are gerunds, 'to do' should be changed to 'doing' (doing graphic design)."
    },
    {
        "id": "LP-105-13",
        "subject": "Language Proficiency",
        "subtopic": "Double Negatives",
        "variant": "error-identification",
        "question": "{Neither Icah}[A] {nor Elle}[B] {won't be}[C] getting married. {No error}[D].",
        "options": ["Neither Icah", "nor Elle", "won't be", "No error"],
        "correctAnswer": "won't be",
        "explanation": "'Neither/nor' already creates a negative meaning. Adding 'won't' (will not) creates a double negative. It should be 'will be getting married'."
    },
    {
        "id": "LP-105-14",
        "subject": "Language Proficiency",
        "subtopic": "Misplaced Modifiers",
        "variant": "error-identification",
        "question": "Lorna {had to redo}[A] {all the work,}[B] {disappointed and dejected.}[C] {No error}[D].",
        "options": ["had to redo", "all the work,", "disappointed and dejected.", "No error"],
        "correctAnswer": "disappointed and dejected.",
        "explanation": "The modifier 'disappointed and dejected' is placed after 'all the work', making it sound as if the work was disappointed. It should modify Lorna."
    },
    {
        "id": "LP-101-15",
        "subject": "Language Proficiency",
        "subtopic": "Verbs",
        "variant": "error-identification",
        "question": "{Karla and I}[A] {are headed}[B] to the canteen {when the teacher caught us.}[C] {No error}[D].",
        "options": ["Karla and I", "are headed", "when the teacher caught us.", "No error"],
        "correctAnswer": "are headed",
        "explanation": "Tense inconsistency. The second part of the sentence is in the past ('caught'), so the first part should be 'were headed'."
    },
    {
        "id": "LP-102-16",
        "subject": "Language Proficiency",
        "subtopic": "Subject-Verb",
        "variant": "error-identification",
        "question": "Gianna, Marie, and Therese {are all}[A] {good friends}[B] {of mine.}[C] {No error}[D].",
        "options": ["are all", "good friends", "of mine.", "No error"],
        "correctAnswer": "No error",
        "explanation": "The sentence is grammatically correct. The plural subject 'Gianna, Marie, and Therese' correctly agrees with the plural verb phrase 'are all'."
    },
    {
        "id": "LP-107-17",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "groupId": "lp-antonym-eng",
        "question": "I've always been a _discreet_ person to protect my privacy.",
        "options": ["rash", "modest", "serious", "ludicrous"],
        "correctAnswer": "rash",
        "explanation": "Discreet means cautious and prudent. The opposite is rash, meaning acting without consideration of the consequences."
    },
    {
        "id": "LP-107-18",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "groupId": "lp-antonym-eng",
        "question": "The COVID-19 vaccines being sold in the market are all _shams_.",
        "options": ["hoax", "trustworthy", "scholarly", "fake"],
        "correctAnswer": "trustworthy",
        "explanation": "A sham is something fake or a fraud. The opposite is trustworthy."
    },
    {
        "id": "LP-107-19",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "groupId": "lp-antonym-eng",
        "question": "Gian remained sleeping _snugly_ even after his alarm went off this morning.",
        "options": ["hardly", "comfortably", "emotionlessly", "unsoundly"],
        "correctAnswer": "unsoundly",
        "explanation": "Snugly implies comfort and security. 'Unsoundly' refers to a disturbed or uncomfortable state of sleep."
    },
    {
        "id": "LP-107-20",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "groupId": "lp-antonym-eng",
        "question": "Hers is an _idiosyncratic_ talent that the whole world is yet to see.",
        "options": ["distinguishable", "common", "foolish", "bewildering"],
        "correctAnswer": "common",
        "explanation": "Idiosyncratic means peculiar or individual. The opposite is common."
    },
    {
        "id": "LP-107-20-B",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "groupId": "lp-antonym-eng",
        "question": "The witness gave a _concise_ account of the event, leaving out no important details.",
        "options": ["wordy", "brief", "accurate", "vivid"],
        "correctAnswer": "wordy",
        "explanation": "Concise means brief and to the point. The opposite is wordy (verbose)."
    },
    {
        "id": "LP-103-21",
        "subject": "Language Proficiency",
        "subtopic": "Phrases and Clauses",
        "groupId": "PARA-ENG-1",
        "contextTitle": "Paragraph Arrangement 1",
        "passage": "A. Its values and practices remain intact on the mind and hearts of Filipinos.\nB. No wonder that it will survive through the next decades or centuries.\nC. The oldest recorded monotheistic religion in the Philippines is Islam.\nD. Consequently, over 6 million of the population last 2017 are Muslims.",
        "question": "Which should be the last sentence?",
        "options": ["(A)", "(B)", "(C)", "(D)"],
        "correctAnswer": "(B)",
        "explanation": "The logical flow is: Introduction of Islam (C) -> Statistics (D) -> Cultural impact (A) -> Conclusion/Future survival (B)."
    },
    {
        "id": "LP-103-22",
        "subject": "Language Proficiency",
        "subtopic": "Phrases and Clauses",
        "groupId": "PARA-ENG-1",
        "contextTitle": "Paragraph Arrangement 1",
        "passage": "A. Its values and practices remain intact on the mind and hearts of Filipinos.\nB. No wonder that it will survive through the next decades or centuries.\nC. The oldest recorded monotheistic religion in the Philippines is Islam.\nD. Consequently, over 6 million of the population last 2017 are Muslims.",
        "question": "Which should be the second sentence?",
        "options": ["(A)", "(B)", "(C)", "(D)"],
        "correctAnswer": "(D)",
        "explanation": "Sentence C introduces the topic, and Sentence D provides the supporting data (consequently) regarding the population."
    },
    {
        "id": "LP-103-23",
        "subject": "Language Proficiency",
        "subtopic": "Phrases and Clauses",
        "groupId": "PARA-ENG-1",
        "contextTitle": "Paragraph Arrangement 1",
        "passage": "A. Its values and practices remain intact on the mind and hearts of Filipinos.\nB. No wonder that it will survive through the next decades or centuries.\nC. The oldest recorded monotheistic religion in the Philippines is Islam.\nD. Consequently, over 6 million of the population last 2017 are Muslims.",
        "question": "Which should be the first sentence?",
        "options": ["(A)", "(B)", "(C)", "(D)"],
        "correctAnswer": "(C)",
        "explanation": "Sentence C is the topic sentence that introduces the subject (Islam in the Philippines)."
    },
    {
        "id": "LP-103-24",
        "subject": "Language Proficiency",
        "subtopic": "Phrases and Clauses",
        "groupId": "PARA-ENG-1",
        "contextTitle": "Paragraph Arrangement 1",
        "passage": "A. Its values and practices remain intact on the mind and hearts of Filipinos.\nB. No wonder that it will survive through the next decades or centuries.\nC. The oldest recorded monotheistic religion in the Philippines is Islam.\nD. Consequently, over 6 million of the population last 2017 are Muslims.",
        "question": "What could be the title of this short essay?",
        "options": ["Islam in the Philippines Along the Years", "The Story of the Minorities", "What is the Oldest Religion in the Philippines?", "The Political and Statistical State of Islam"],
        "correctAnswer": "Islam in the Philippines Along the Years",
        "explanation": "The text covers the origin, current population, and future survival of Islam in the Philippines, making this the most comprehensive title."
    },
    {
        "id": "LP-106-25",
        "subject": "Language Proficiency",
        "subtopic": "Spelling",
        "question": "Identify the word that is spelled incorrectly:",
        "options": ["sacrilegious", "ghetto", "Cocyx", "Mississippi"],
        "correctAnswer": "Cocyx",
        "explanation": "The correct spelling is 'Coccyx' (with double 'c')."
    },
    {
        "id": "LP-106-26",
        "subject": "Language Proficiency",
        "subtopic": "Spelling",
        "question": "Identify the word that is spelled incorrectly:",
        "options": ["acquisce", "conscientious", "lachrymation", "bourgeoisie"],
        "correctAnswer": "acquisce",
        "explanation": "The correct spelling is 'acquiesce'."
    },
    {
        "id": "LP-107-27",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "question": "heart : cardiologist ; throat : ________",
        "options": ["endocrinologist", "orthopedist", "otolaryngologist", "podiatrist"],
        "correctAnswer": "otolaryngologist",
        "explanation": "A cardiologist is a doctor for the heart; an otolaryngologist is a doctor for the ear, nose, and throat."
    },
    {
        "id": "LP-107-28",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "question": "Leni Robredo : Philippines ; Mike Pence : ________",
        "options": ["Germany", "Canada", "USA", "Italy"],
        "correctAnswer": "USA",
        "explanation": "The relationship is person to their respective country of political service."
    },
    {
        "id": "LP-107-29",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "question": "parent : child ; elephant : ________",
        "options": ["calf", "roos", "cubs", "babies"],
        "correctAnswer": "calf",
        "explanation": "The relationship is parent to offspring; a baby elephant is called a calf."
    },
    {
        "id": "LP-107-30",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "question": "commitment : Gamophobia ; ________ : ________",
        "options": ["chopsticks : Consecotaleophobia", "dolls : Coulrophobia", "Arachnophobia : spiders", "Claustrophobia : confinement"],
        "correctAnswer": "chopsticks : Consecotaleophobia",
        "explanation": "Gamophobia is the fear of commitment. Consecotaleophobia is the fear of chopsticks. Option C and D reverse the order (Phobia : Object)."
    },
    {
        "id": "LP-107-31",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "question": "Tokyo : Japan ; ________ : ________",
        "options": ["Nicosia : Cyprus", "Philippines : Manila", "Brasile : Brazil", "Athenas : Greece"],
        "correctAnswer": "Nicosia : Cyprus",
        "explanation": "The relationship is Capital City : Country. Nicosia is the capital of Cyprus."
    },
    {
        "id": "LP-107-32",
        "subject": "Language Proficiency",
        "subtopic": "Use of Context Clues",
        "question": "Sun : star ; ________ : ________",
        "options": ["journalism : news", "planet : Earth", "Physics : Science", "humanities : laws"],
        "correctAnswer": "Physics : Science",
        "explanation": "The Sun is a type of star. Physics is a type of Science."
    },
    {
        "id": "LP-105-33",
        "subject": "Language Proficiency",
        "subtopic": "Redundancy",
        "question": "Lia continued to care for Jay _regardless of his disinterest in her._",
        "options": ["irregardless of his interest in her.", "regardless of his interest in her.", "irregardless of his disinterest in her.", "regardless of his disinterest in her."],
        "correctAnswer": "regardless of his disinterest in her.",
        "explanation": "'Irregardless' is a non-standard double negative. 'Regardless' is the correct term."
    },
    {
        "id": "LP-101-34",
        "subject": "Language Proficiency",
        "subtopic": "Nouns",
        "question": "Many mental health experts have _given advices on how to cope up with the COVID-19 pandemic._",
        "options": [
            "given pieces of advice on how to cope up with the COVID-19 pandemic.",
            "given pieces of advice on how to cope with the COVID-19 pandemic.",
            "given advises on how to cope up with the COVID-19 pandemic.",
            "given advice on how to cope up with the COVID-19 pandemic."
        ],
        "correctAnswer": "given pieces of advice on how to cope with the COVID-19 pandemic.",
        "explanation": "'Advice' is an uncountable noun and cannot be pluralized as 'advices'. Furthermore, 'cope up with' is a common redundancy error in the Philippines; the correct idiom is 'cope with'."
    },
    {
        "id": "LP-101-35",
        "subject": "Language Proficiency",
        "subtopic": "Prepositions",
        "question": "We were getting ready for the afternoon prayer _at thirty minutes before three._",
        "options": ["at 30 minutes after two", "on half past two", "at half past two", "at thirty minutes before three"],
        "correctAnswer": "at half past two",
        "explanation": "While 'thirty minutes before three' is technically correct, 'half past two' is the most effective and concise way to express the time in standard English."
    },
    {
        "id": "LP-207-36",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "Mahirap pakisamahan ang isang _balik-harap_ na kaibigan.",
        "options": ["pabalik-balik", "makulit", "traydor", "demonyo"],
        "correctAnswer": "traydor",
        "explanation": "'Balik-harap' refers to someone who is two-faced or treacherous, which is 'traydor'."
    },
    {
        "id": "LP-207-37",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "Mainam nga bang magkaroon ng isang anak na _hawak sa ilong_?",
        "options": ["sunud-sunuran", "madaling matuto", "mabango", "matangos"],
        "correctAnswer": "sunud-sunuran",
        "explanation": "The idiom 'hawak sa ilong' means being easily controlled or manipulated by another."
    },
    {
        "id": "LP-207-38",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "Sadyang mabilis lumipad ang iba't ibang _alimuom_ sa kalsada.",
        "options": ["langaw", "agiw", "tsismis", "malamig na hangin"],
        "correctAnswer": "tsismis",
        "explanation": "In a figurative sense, 'alimuom' (which usually means vapor from hot ground) is used here to represent 'tsismis' (gossip) spreading quickly."
    },
    {
        "id": "LP-207-39",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "Nararapat lamang na lalo pang suportahan ng gobyerno ang mga kapisanan ng mga _anak-pawis_ na matiyagang nagtatrabaho sa bukid.",
        "options": ["trabahador", "magsasaka", "batang walang pamilya", "batang hindi makapag-aral"],
        "correctAnswer": "magsasaka",
        "explanation": "'Anak-pawis' typically refers to the working class or laborers; in the context of 'bukid' (field), it refers to 'magsasaka' (farmers)."
    },
    {
        "id": "LP-207-40",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "Hindi makatiis si Corrine sa kanyang kasama sa dormitoryo na tila ba'y _amoy tsiko_ sa tuwing uuwi galing sa inuman ng barkada.",
        "options": ["taong mabaho", "taong matakaw sa tsiko", "taong amoy tsiko", "taong lasing"],
        "correctAnswer": "taong lasing",
        "explanation": "'Amoy tsiko' is a colloquial Filipino term for the smell of someone who has been drinking alcohol."
    },
    {
        "id": "LP-207-41",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "Si Gian ay _naniningalang pugad_ sa bahay nila Venia.",
        "options": ["umaakyat sa likod bahay", "bumibisita", "umaakyat ng ligaw", "nag-aalok ng kasal"],
        "correctAnswer": "umaakyat ng ligaw",
        "explanation": "'Naniningalang pugad' is an idiom meaning to court someone or woo a partner."
    },
    {
        "id": "LP-207-42",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-antonym-fil",
        "question": "_Nagdarahop_ na naman siya sa dami ng kanyang inaaral.",
        "options": ["Naghihirap", "Napapasayaw", "Natatawa", "Nadadalian"],
        "correctAnswer": "Nadadalian",
        "explanation": "'Nagdarahop' means to struggle or be in a state of hardship. The opposite (kasalungat) is 'nadadalian' (finding it easy)."
    },
    {
        "id": "LP-207-43",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-antonym-fil",
        "question": "Gusto kong katukin ang _nakapinid_ niyang pinto at humingi ng tawad sa aking mga nagawa.",
        "options": ["nakasara", "nakausli", "nakabukas", "nakakandado"],
        "correctAnswer": "nakabukas",
        "explanation": "'Nakapinid' means closed. The opposite is 'nakabukas' (open)."
    },
    {
        "id": "LP-207-43-B",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-antonym-fil",
        "question": "Ang kanyang mga salita ay _tahas_ at walang halong pag-aalinlangan.",
        "options": ["malinaw", "direkta", "malabo", "tiyak"],
        "correctAnswer": "malabo",
        "explanation": "Ang 'tahas' ay nangangahulugang direkta o tiyak. Ang kasalungat nito ay 'malabo'."
    },
    {
        "id": "LP-207-44",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "_Dayukdok_ na si Jeriko bago pa lang ang oras ng hapunan.",
        "options": ["Busog na busog", "Gutom na gutom", "Uhaw na uhaw", "Ginaw na ginaw"],
        "correctAnswer": "Gutom na gutom",
        "explanation": "'Dayukdok' is a deep Tagalog term for being extremely hungry."
    },
    {
        "id": "LP-207-45",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "Masyadong _mapanudyo_ ang ginagawa ni Paolo kay Jopay upang siya'y maakit sa kanya.",
        "options": ["mahalay", "hindi malalim", "hindi mapanukso", "hindi malagkit"],
        "correctAnswer": "mahalay",
        "explanation": "'Mapanudyo' means to tease or seduce in a suggestive manner, which aligns with 'mahalay' (lewd/indecent) in this context."
    },
    {
        "id": "LP-207-46",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "Upang maging mabilis ang lahat, tigilan mo ang _pagpapalikaw-likaw_.",
        "options": ["pagsasabi ng tapat", "pagsasabi ng diretsuhan", "paglilihim", "pagpapaligoy-ligoy"],
        "correctAnswer": "pagpapaligoy-ligoy",
        "explanation": "'Pagpapalikaw-likaw' (or paligoy-ligoy) means beating around the bush or not being direct."
    },
    {
        "id": "LP-207-47",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-synonym-fil",
        "question": "_Lihis_ sa impormasyong hawak ni Joshua, mali ang kinalabasan ng mga datos.",
        "options": ["Sang-ayon", "Taliwas", "Malinaw", "Umaayon"],
        "correctAnswer": "Taliwas",
        "explanation": "'Lihis' means deviated or contrary to. 'Taliwas' is a synonym meaning opposite or contrary."
    },
    {
        "id": "LP-207-48",
        "subject": "Language Proficiency",
        "subtopic": "Talasalitaan",
        "groupId": "lp-antonym-fil",
        "question": "Subukan mo ngang _sipatin_ sa bintana ang mga kaganapan sa labas.",
        "options": ["huwag silipin", "huwag mangialam", "mangialam", "ituro"],
        "correctAnswer": "huwag silipin",
        "explanation": "'Sipatin' means to observe or look closely. The options here are tricky, but if asking for a synonym, 'silipin' (to peek/look) is the root; however, based on the structure, it's testing the action of looking."
    },
    {
        "id": "LP-207-49",
        "subject": "Language Proficiency",
        "subtopic": "Pagkilala ng Mali",
        "groupId": "lp-err-all",
        "question": "_Pahat_ lamang ang nakuha nila tatay na mga isda ngayon kaya ang ulam namin ay hindi naging sapat.",
        "options": ["Kaunti", "Dambuhala", "Malalaki", "Marami-rami"],
        "correctAnswer": "Kaunti",
        "explanation": "'Pahat' refers to a very small amount or a few."
    },
    {
        "id": "LP-205-50",
        "subject": "Language Proficiency",
        "subtopic": "Pagkilala ng Mali",
        "variant": "error-identification",
        "question": "Ang ulam {na naluto}[A] {para sa tanghalian}[B] {ngayong araw}[C] ay dinuguan. {Walang mali}[D].",
        "options": ["na naluto", "para sa tanghalian", "ngayong araw", "Walang mali"],
        "correctAnswer": "Walang mali",
        "explanation": "The sentence is grammatically correct in Filipino."
    },
    {
        "id": "LP-205-51",
        "subject": "Language Proficiency",
        "subtopic": "Pagkilala ng Mali",
        "variant": "error-identification",
        "question": "{Nakakapagtataka}[A] {kung bakit hindi niya}[B] {tinanggap ang pera}[C] mula sa konsehal. {Walang mali}[D].",
        "options": ["Nakakapagtataka", "kung bakit hindi niya", "tinanggap ang pera", "Walang mali"],
        "correctAnswer": "Walang mali",
        "explanation": "The sentence is grammatically correct."
    },
    {
        "id": "LP-205-52",
        "subject": "Language Proficiency",
        "subtopic": "Pagkilala ng Mali",
        "variant": "error-identification",
        "question": "{Si Ana}[A] at Leila {ay may balak}[B] pumunta sa Maynila {upang}[C] makipagsapalaran. {Walang mali}[D].",
        "options": ["Si Ana", "ay may balak", "upang", "Walang mali"],
        "correctAnswer": "Si Ana",
        "explanation": "When there are two subjects, 'Si' should be replaced with 'Sina'. It should be 'Sina Ana at Leila'."
    },
    {
        "id": "LP-205-53",
        "subject": "Language Proficiency",
        "subtopic": "Pagkilala ng Mali",
        "variant": "error-identification",
        "question": "Sa kanayunan {roon,}[A] {makikita mo}[B] ang kubong naging kuta {ng mga batang}[C] manghihimagsik. {Walang mali}[D].",
        "options": ["roon,", "makikita mo", "ng mga batang", "Walang mali"],
        "correctAnswer": "Walang mali",
        "explanation": "The sentence is grammatically correct."
    },
    {
        "id": "LP-205-54",
        "subject": "Language Proficiency",
        "subtopic": "Pagkilala ng Mali",
        "variant": "error-identification",
        "question": "Ang palitaw {raw}[A] {ay isa}[B] {sa mga orihinal na putaheng Pilipino.}[C] {Walang mali}[D].",
        "options": ["raw", "ay isa", "sa mga orihinal na putaheng Pilipino.", "Walang mali"],
        "correctAnswer": "Walang mali",
        "explanation": "The sentence is grammatically correct. 'Raw' is used correctly as the preceding word ends in a vowel."
    },
    {
        "id": "LP-205-55",
        "subject": "Language Proficiency",
        "subtopic": "Pagkilala ng Mali",
        "variant": "error-identification",
        "question": "{Ni-isa'y}[A] {walang}[B] {may alam}[C] kung hanggang kailan tayo magiging ganito. {Walang mali}[D].",
        "options": ["Ni-isa'y", "walang", "may alam", "Walang mali"],
        "correctAnswer": "walang",
        "explanation": "'Ni isa' already denotes none. Using 'walang' creates a redundancy (double negative). It should be 'Ni isa ay may alam...'"
    },
    {
        "id": "LP-204-56",
        "subject": "Language Proficiency",
        "subtopic": "Pangungusap",
        "groupId": "PARA-FIL-1",
        "contextTitle": "Pag-Aayos ng Talata 1",
        "passage": "A. Kaya nakahahangang tunay ang mga taong may lakas ng loob na magmahal ng kapwa.\nB. Ang totoong ugat ng kabayanihan ay pagmamahal.\nC. At ito ang kabayanihang ninanais kong manalaytay sa dugo ng ating bayan.\nD. Pagmamahal na ang iba ay maaaring takot pa ring ipakita dahil baka hindi ito masuklian.",
        "question": "Alin sa mga ito ang ikatlong pangungusap?",
        "options": ["(A)", "(B)", "(C)", "(D)"],
        "correctAnswer": "(A)",
        "explanation": "Logical flow: Definition (B) -> Elaboration on that love (D) -> Result/Admiration (A) -> Final wish (C)."
    },
    {
        "id": "LP-204-57",
        "subject": "Language Proficiency",
        "subtopic": "Pangungusap",
        "groupId": "PARA-FIL-1",
        "contextTitle": "Pag-Aayos ng Talata 1",
        "passage": "A. Kaya nakahahangang tunay ang mga taong may lakas ng loob na magmahal ng kapwa.\nB. Ang totoong ugat ng kabayanihan ay pagmamahal.\nC. At ito ang kabayanihang ninanais kong manalaytay sa dugo ng ating bayan.\nD. Pagmamahal na ang iba ay maaaring takot pa ring ipakita dahil baka hindi ito masuklian.",
        "question": "Alin sa mga ito ang panghuling pangungusap?",
        "options": ["(A)", "(B)", "(C)", "(D)"],
        "correctAnswer": "(C)",
        "explanation": "Sentence C serves as the concluding statement, linking the theme of heroism to the nation."
    },
    {
        "id": "LP-204-58",
        "subject": "Language Proficiency",
        "subtopic": "Pangungusap",
        "groupId": "PARA-FIL-1",
        "contextTitle": "Pag-Aayos ng Talata 1",
        "passage": "A. Kaya nakahahangang tunay ang mga taong may lakas ng loob na magmahal ng kapwa.\nB. Ang totoong ugat ng kabayanihan ay pagmamahal.\nC. At ito ang kabayanihang ninanais kong manalaytay sa dugo ng ating bayan.\nD. Pagmamahal na ang iba ay maaaring takot pa ring ipakita dahil baka hindi ito masuklian.",
        "question": "Alin sa mga ito ang ikalawang pangungusap?",
        "options": ["(A)", "(B)", "(C)", "(D)"],
        "correctAnswer": "(D)",
        "explanation": "Sentence D expands on the 'pagmamahal' mentioned in Sentence B."
    },
    {
        "id": "LP-204-59",
        "subject": "Language Proficiency",
        "subtopic": "Pangungusap",
        "groupId": "PARA-FIL-1",
        "contextTitle": "Pag-Aayos ng Talata 1",
        "passage": "A. Kaya nakahahangang tunay ang mga taong may lakas ng loob na magmahal ng kapwa.\nB. Ang totoong ugat ng kabayanihan ay pagmamahal.\nC. At ito ang kabayanihang ninanais kong manalaytay sa dugo ng ating bayan.\nD. Pagmamahal na ang iba ay maaaring takot pa ring ipakita dahil baka hindi ito masuklian.",
        "question": "Alin sa mga ito ang unang pangungusap?",
        "options": ["(A)", "(B)", "(C)", "(D)"],
        "correctAnswer": "(B)",
        "explanation": "Sentence B is the topic sentence that defines the root of heroism."
    },
    {
        "id": "LP-204-60",
        "subject": "Language Proficiency",
        "subtopic": "Pangungusap",
        "groupId": "PARA-FIL-1",
        "contextTitle": "Pag-Aayos ng Talata 1",
        "passage": "A. Kaya nakahahangang tunay ang mga taong may lakas ng loob na magmahal ng kapwa.\nB. Ang totoong ugat ng kabayanihan ay pagmamahal.\nC. At ito ang kabayanihang ninanais kong manalaytay sa dugo ng ating bayan.\nD. Pagmamahal na ang iba ay maaaring takot pa ring ipakita dahil baka hindi ito masuklian.",
        "question": "Ano kaya ang maaaring maging pamagat nito?",
        "options": ["Kabayanihang Tunay", "Kabayanihang Bayan", "Bayani ka? Bayani rin ako!", "Tunay na Bayan"],
        "correctAnswer": "Kabayanihang Tunay",
        "explanation": "The text focuses on the essence (the 'true' root) of heroism, which is love."
    },
    {
        "id": "LP-201-61",
        "subject": "Language Proficiency",
        "subtopic": "Pandiwa",
        "question": "________ ko na ngayon ang mga papeles na kakailanganin bukas sa ating pagpupulong.",
        "options": ["Inayusan", "Inaayusan", "Inaayos", "Inayos"],
        "correctAnswer": "Inaayos",
        "explanation": "The context implies an ongoing action (preparing the papers for tomorrow), requiring the present progressive aspect 'Inaayos'."
    },
    {
        "id": "LP-201-62",
        "subject": "Language Proficiency",
        "subtopic": "Pandiwa",
        "question": "Ang pagtaas ng bilang ng mga positibo ay tila patuloy na ________.",
        "options": ["tumataas", "nagtataasan", "tataas", "tumaas"],
        "correctAnswer": "tumataas",
        "explanation": "The word 'patuloy' indicates a continuing action, requiring the imperfective aspect 'tumataas'."
    },
    {
        "id": "LP-201-63",
        "subject": "Language Proficiency",
        "subtopic": "Pandiwa",
        "question": "________ niya lamang sa isang aksidente.",
        "options": ["Kagaling-galing", "Kakagaling", "Kagagaling", "Gumagaling"],
        "correctAnswer": "Kagagaling",
        "explanation": "Sa pormal na gramatika, ang aspetong katatapos ay nabubuo sa pamamagitan ng pag-uulit ng unang pantig ng salitang-ugat. Ang ugat ay 'galing,' kaya ito ay magiging 'ka-ga-galing'."
    },
    {
        "id": "LP-201-64",
        "subject": "Language Proficiency",
        "subtopic": "Pandiwa",
        "question": "Ang simbahang nasa harap natin ngayon ang ________ ng kanilang kasal.",
        "options": ["dadausan", "dausan", "piinagdadausan", "pinagdausan"],
        "correctAnswer": "pinagdausan",
        "explanation": "The wedding already happened in the past at that location, so the completed aspect 'pinagdausan' is used."
    },
    {
        "id": "LP-201-65",
        "subject": "Language Proficiency",
        "subtopic": "Pandiwa",
        "question": "Bago ang lahat, ________ ito sa akin para sa iyo.",
        "options": ["binilin", "ibiinilin", "ibibilin", "pinagbilan"],
        "correctAnswer": "ibibilin",
        "explanation": "The phrase 'Bago ang lahat' implies something that will happen first, requiring the future aspect 'ibibilin'."
    },
    {
        "id": "LP-201-66",
        "subject": "Language Proficiency",
        "subtopic": "Pang-abay",
        "question": "Hindi mo maaaring hayaan lamang iyon nang ________.",
        "options": ["basta-basta", "basta basta", "bastabasta", "babasta basta"],
        "correctAnswer": "basta-basta",
        "explanation": "The correct orthography for the adverb meaning 'carelessly' or 'without thought' is the hyphenated 'basta-basta'."
    },
    {
        "id": "LP-201-67",
        "subject": "Language Proficiency",
        "subtopic": "Pangngalan",
        "question": "Ang bawat ________ ni Mabini ay mananatili sa ating mga utak at puso.",
        "options": ["alaala", "ala-ala", "alalahanin", "inaalala"],
        "correctAnswer": "alaala",
        "explanation": "'Alaala' (memory) is the noun that fits the subject of the sentence."
    },
    {
        "id": "LP-201-68",
        "subject": "Language Proficiency",
        "subtopic": "Pantukoy",
        "question": "________ Althea at Misty ay mayroong balak na umakyat ng Pasig.",
        "options": ["Si", "Sina", "Sila", "Kila"],
        "correctAnswer": "Sina",
        "explanation": "When referring to multiple named persons, the plural marker 'Sina' must be used."
    },
    {
        "id": "LP-201-69",
        "subject": "Language Proficiency",
        "subtopic": "Pandiwa",
        "question": "________ nang tapusin ang pagsasagot ng mga tanong na ito.",
        "options": ["Kata", "Kakata", "Arat", "Taralets"],
        "correctAnswer": "Arat",
        "explanation": "In colloquial/slang Filipino, 'Arat' (reversed 'tara') is used as a call to action or 'let's go'."
    },
    {
        "id": "LP-201-70",
        "subject": "Language Proficiency",
        "subtopic": "Panghalip",
        "question": "Bigyan ________ ng tulong ang lahat ng mga kapus-palad.",
        "options": ["niyo", "nyo", "ninyo", "inyo"],
        "correctAnswer": "ninyo",
        "explanation": "In formal Filipino, 'ninyo' is the correct second-person plural possessive/agent pronoun."
    }
];