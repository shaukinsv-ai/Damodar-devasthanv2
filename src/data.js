// Festival/event data + committee. Dates use ISO format (Asia/Kolkata local).
// Plausible 2026 dates for major Hindu festivals; temple-specific events placed
// on traditional days. Add notes in 'kind' to drive filters/colors.

window.EVENTS = [
  { id: "ekadashi-jun", name: "Nirjala Ekadashi", deva: "निर्जला एकादशी",
    start: "2026-05-27T05:30:00", end: "2026-05-27T20:00:00",
    kind: "ekadashi", featured: false,
    dress: "Traditional. White or yellow preferred.",
    desc: "Observance of the strictest Ekadashi vrat. Special abhishek of Lord Damodar at dawn followed by collective bhajan in the sabhamandap.",
    img: "Temple courtyard at dawn — lamps lit, devotees in white" },

  { id: "ashadhi", name: "Ashadhi Ekadashi", deva: "आषाढी एकादशी",
    start: "2026-07-15T05:00:00", end: "2026-07-15T21:30:00",
    kind: "ekadashi", featured: true,
    dress: "White or saffron. Tulsi mala welcome.",
    desc: "Ashadhi Ekadashi — the auspicious day when Lord Vishnu reclines on the Kshirsagar. Mahapooja, Vishnu Sahasranama recital, and night-long bhajan.",
    img: "Vishnu sahasranam recital — oil lamps in rows" },

  { id: "naga-panchami", name: "Naga Panchami", deva: "नाग पंचमी",
    start: "2026-07-28T06:00:00", end: "2026-07-28T19:00:00",
    kind: "festival", featured: false,
    dress: "Traditional.",
    desc: "Worship of the serpent deities at the Kushawati riverbank shrine. Milk and turmeric offering at the Naga stones behind the sanctum.",
    img: "Naga stones at riverbank — turmeric & milk offering" },

  { id: "janmashtami", name: "Krishna Janmashtami", deva: "श्री कृष्ण जन्माष्टमी",
    start: "2026-09-04T18:00:00", end: "2026-09-05T01:30:00",
    kind: "festival", featured: true,
    dress: "Festive traditional. Children encouraged to dress as Krishna/Radha.",
    desc: "Midnight celebration of Sri Krishna's birth. Jhula seva, dahi-handi, and the traditional Goa-style folk bhajan tradition of the Kushawati valley.",
    img: "Jhula seva at midnight — baby Krishna idol, jasmine garlands" },

  { id: "ganesh-chaturthi", name: "Ganesh Chaturthi", deva: "गणेश चतुर्थी",
    start: "2026-09-14T07:00:00", end: "2026-09-14T22:00:00",
    kind: "festival", featured: false,
    dress: "Festive.",
    desc: "Traditional Goan Chaturthi celebrations. Community installation in the front mandap, followed by aartis at dawn and dusk for one and a half days.",
    img: "Ganesh idol in mandap — marigold, modaks, oil lamps" },

  { id: "navratri", name: "Navratri", deva: "नवरात्रि",
    start: "2026-10-11T18:30:00", end: "2026-10-19T21:00:00",
    kind: "festival", featured: false,
    dress: "Colors of the day. Refer notice board.",
    desc: "Nine nights of garba and traditional folk dance in the temple courtyard. Each evening dedicated to a form of the Devi.",
    img: "Garba evening — courtyard strung with marigold lights" },

  { id: "diwali", name: "Diwali — Lakshmi Pujan", deva: "दीपावली · लक्ष्मी पूजन",
    start: "2026-11-08T17:30:00", end: "2026-11-08T22:00:00",
    kind: "festival", featured: false,
    dress: "Traditional, festive.",
    desc: "Temple-wide deepotsav: every step, niche and balustrade is lined with earthen diyas. Lakshmi pujan begins after sunset.",
    img: "Temple steps lined with thousands of diyas at dusk" },

  { id: "datta-jayanti", name: "Datta Jayanti", deva: "दत्त जयंती",
    start: "2026-12-23T05:00:00", end: "2026-12-23T20:00:00",
    kind: "festival", featured: false,
    dress: "Traditional.",
    desc: "Birth anniversary of Lord Dattatreya. Reading of the Gurucharitra and a community meal in the bhojanshala.",
    img: "Dattatreya idol — three faces, garlanded" },

  { id: "rathotsav", name: "Annual Rathotsav", deva: "रथोत्सव",
    start: "2027-01-25T06:00:00", end: "2027-01-26T22:00:00",
    kind: "rathotsav", featured: true,
    dress: "Festive traditional. White recommended for rath-pulling.",
    desc: "The temple's signature festival — a two-day chariot procession of Lord Damodar through the streets of the village, attended by devotees from across Goa.",
    img: "Ornate wooden rath in procession — devotees pulling ropes" },

  { id: "mahashivratri", name: "Mahashivratri", deva: "महाशिवरात्रि",
    start: "2027-02-15T18:00:00", end: "2027-02-16T06:00:00",
    kind: "festival", featured: true,
    dress: "Black or white. Rudraksha mala welcome.",
    desc: "Night-long jagaran with four prahar pujas. Bilva abhishek through the night and the celebrated Shivratri bhajan parampara of the Kushawati valley.",
    img: "Shivalinga with bilva leaves — oil-lamp procession at night" },

  { id: "shigmo", name: "Shigmo", deva: "शिगमो",
    start: "2027-03-13T16:00:00", end: "2027-03-20T22:00:00",
    kind: "festival", featured: true,
    dress: "Traditional Goan attire. Bright colours.",
    desc: "Goa's spring festival. A week of folk performances — Ghode Modni, Talgadi, Romta Mell — in the temple precinct, ending in the symbolic Holi bonfire.",
    img: "Shigmo Ghode Modni dance — masks, drums, marigolds" },

  { id: "ramnavami", name: "Ram Navami", deva: "राम नवमी",
    start: "2027-04-15T05:30:00", end: "2027-04-15T20:00:00",
    kind: "festival", featured: false,
    dress: "Traditional.",
    desc: "Akhand Ramayana paath through the day, concluding with the noon celebration of Lord Rama's birth.",
    img: "Ramayan paath — book on stand, garlands, oil lamps" },

  { id: "hanuman-jayanti", name: "Hanuman Jayanti", deva: "हनुमान जयंती",
    start: "2027-04-21T05:30:00", end: "2027-04-21T19:30:00",
    kind: "festival", featured: false,
    dress: "Saffron or red.",
    desc: "Sundarkand paath at dawn, followed by sindoor abhishek and prasad of besan ladoos.",
    img: "Hanuman idol with sindoor — garland of red flowers" },
];

window.COMMITTEE = [
  { name: "Shri Ramakant V. Naik",       role: "Adhyaksha · President",       since: 2019 },
  { name: "Shri Shrinivas D. Kamat",     role: "Upadhyaksha · Vice President", since: 2021 },
  { name: "Shri Prabhakar G. Shenoy",    role: "Khazanchi · Treasurer",         since: 2020 },
  { name: "Smt. Madhavi S. Borkar",      role: "Sachiv · Secretary",            since: 2022 },
  { name: "Shri Devidas N. Phaldesai",   role: "Trustee · Heritage",            since: 2014 },
  { name: "Shri Vasudev R. Bhat",        role: "Trustee · Estate",              since: 2017 },
  { name: "Smt. Anuradha P. Naik",       role: "Event Committee · Chair",       since: 2022 },
  { name: "Shri Gurudas M. Korgaonkar",  role: "Event Committee",               since: 2023 },
  { name: "Shri Atmaram S. Desai",       role: "Pujari Pramukh",                since: 2009 },
  { name: "Smt. Saraswati V. Hegde",     role: "Bhajan Mandali · Lead",         since: 2018 },
  { name: "Shri Yogesh A. Mahale",       role: "Volunteers · Coordinator",      since: 2024 },
  { name: "Smt. Sushila R. Pednekar",    role: "Bhojanshala · Annapurna",       since: 2016 },
];

window.GALLERY = [
  { tag: "Sabhamandap · Mahashivratri 2025",          ratio: "16/11" },
  { tag: "Kushawati riverbank at dawn",                ratio: "3/4"  },
  { tag: "Rathotsav procession · 2024",                ratio: "4/3"  },
  { tag: "Temple gopuram detail — laterite carving",   ratio: "3/4"  },
  { tag: "Shigmo Ghode Modni · 2025",                  ratio: "4/3"  },
  { tag: "Diwali — courtyard diyas",                   ratio: "1/1"  },
  { tag: "Bhajan mandali · weekly Saptah",             ratio: "4/5"  },
  { tag: "Drone shot — temple complex aerial",         ratio: "16/10"},
  { tag: "Naga shrine · riverbank",                    ratio: "3/4"  },
  { tag: "Annapurna seva · community meal",            ratio: "4/3"  },
  { tag: "Ganesh Chaturthi mandap",                    ratio: "1/1"  },
  { tag: "Heritage archive · 1962 photograph",         ratio: "4/3"  },
];

// i18n. Strings for the most visible UI strings; falls back to English.
window.I18N = {
  en: {
    nav: { home:"Home", about:"About", events:"Events", calendar:"Calendar",
           committee:"Committee", gallery:"Gallery", donate:"Donate", contact:"Contact" },
    hero: {
      kicker: "Shri Damodar Devasthan · Kushawati Valley, Goa",
      title: "A river, a stone, and seven hundred years of light.",
      sub: "Home of the Damodar lineage since its relocation from Margao in 1565. A temple of song, of harvest, and of the slow Goan dusk.",
      cta1: "Add Festival Calendar", cta2: "Visit the temple",
      next: "Next festival",
    },
    footer: { trust:"Devasthan Trust · Reg. No. GOA/REG/E-04217", made:"In service of Shri Damodar" },
  },
  mr: {
    nav: { home:"मुख्यपृष्ठ", about:"देवस्थाना विषयी", events:"उत्सव", calendar:"पंचांग",
           committee:"समिती", gallery:"दालन", donate:"देणगी", contact:"संपर्क" },
    hero: {
      kicker: "श्री दामोदर देवस्थान · कुशावती खोरे, गोवा",
      title: "एक नदी, एक शिळा, सातशे वर्षांचा प्रकाश.",
      sub: "१५६५ साली मडगाव वरून स्थानांतरित झाल्यापासून दामोदर परंपरेचे निवासस्थान. भजनांचा, सुगीचा आणि गोव्याच्या संथ संध्याकाळचा हा देव.",
      cta1: "पंचांग जोडा", cta2: "देवस्थानाला भेट द्या",
      next: "पुढील उत्सव",
    },
    footer: { trust:"देवस्थान न्यास · नोंदणी क्र. GOA/REG/E-04217", made:"श्री दामोदराच्या सेवेत" },
  },
  kok: {
    nav: { home:"मुखेल पान", about:"देवस्थाना विशीं", events:"उत्सव", calendar:"पंचांग",
           committee:"समिती", gallery:"प्रदर्शन", donate:"दान", contact:"संपर्क" },
    hero: {
      kicker: "श्री दामोदर देवस्थान · कुशावती देग, गोंय",
      title: "एक न्हंय, एक फातर, सातशें वर्सांचो उजवाड.",
      sub: "१५६५ वर्सा मडगांवांत थावन हांगा हाडलेल्या उपरांत दामोदर वंशाचें घर. भजनां, सुगी आनी गोंयच्या सकाळसांज्याचो ह्या देवळाचो वारसो.",
      cta1: "पंचांग जोडात", cta2: "देवस्थानाक येयात",
      next: "मुखावेलो उत्सव",
    },
    footer: { trust:"देवस्थान न्यास · नोंदणी क्र. GOA/REG/E-04217", made:"श्री दामोदराच्या सेवेंत" },
  },
};

window.POOJA_TIMINGS = [
  { name: "Kakad Aarti",    deva: "काकड आरती",   time: "05:00 — 05:30" },
  { name: "Mangal Snan",    deva: "मंगल स्नान",   time: "05:30 — 06:30" },
  { name: "Naivedya Pooja", deva: "नैवेद्य पूजा",  time: "12:00 — 12:30" },
  { name: "Sandhya Aarti",  deva: "संध्या आरती",   time: "19:00 — 19:30" },
  { name: "Shej Aarti",     deva: "शेज आरती",      time: "20:30 — 21:00" },
];
