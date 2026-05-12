// Oral cavity pathology deck — built from oral_cavity_full_detailed_guide.pdf
// + six structured infographic prompt MDs (congenital → systemic → viral →
// bacterial/fungal/trauma → immune/chemical → neoplasia & staging).

export const ORAL_SUITS = {
  congenital: {
    label: "Congenital Anomalies",
    color: "#a855f7",
    emoji: "🧬",
  },
  systemic: {
    label: "Systemic & Degenerative",
    color: "#f59e0b",
    emoji: "🫀",
  },
  viral: {
    label: "Viral Stomatitis",
    color: "#3b82f6",
    emoji: "🦠",
  },
  bacterial: {
    label: "Bacterial / Fungal / Trauma",
    color: "#ef4444",
    emoji: "🍄",
  },
  immune: {
    label: "Immune / Chemical / Hypersensitivity",
    color: "#ec4899",
    emoji: "⚡",
  },
  neoplasia: {
    label: "Neoplasia & Staging",
    color: "#6366f1",
    emoji: "🎗",
  },
};

export const oralCards = [
  // ===================== CONGENITAL ANOMALIES (4) =====================
  {
    id: 1,
    name: "Palatoschisis / Cheiloschisis",
    suit: "congenital",
    tier: 2,
    etiology: "Congenital fusion failure during embryogenesis (palate halves or lips)",
    species: "Charolais cattle, dogs",
    mechanism:
      "Two halves of the palate fail to fuse → abnormal communication between oral and nasal cavities. Cheiloschisis = lip fusion failure ('harelip'), often co-occurs with palatoschisis",
    lesions:
      "Cleft palate / cleft lip; poor suckling → milk enters nasal cavity + lungs → aspiration pneumonia, stunted growth, malnutrition. Severity often warrants euthanasia",
    keyClue: "Charolais cattle + dogs; aspiration pneumonia from milk leaking into lungs",
    pearls: "Roof of mouth never finished construction — milk leaks upward into the lungs",
  },
  {
    id: 2,
    name: "Prognathism / Brachygnathism",
    suit: "congenital",
    tier: 1,
    etiology: "Congenital jaw length asymmetry",
    species: "Dogs, sheep, multiple livestock species",
    mechanism:
      "Prognathism = abnormally LONG upper jaw. Brachygnathism = abnormally SHORT lower jaw. Result is malocclusion — teeth misalign and traumatize gums on every chew",
    lesions:
      "Repeated gum erosion + ulceration → pain → secondary bacterial infection → ↓ food intake → weight loss",
    keyClue: "Jaw-length asymmetry → chronic malocclusion-induced gingival trauma",
    pearls: "Jaws like badly aligned scissors damaging gums continuously",
  },
  {
    id: 3,
    name: "Ectopic Hairs",
    suit: "congenital",
    tier: 1,
    etiology: "Embryologic misplacement",
    species: "Rare across species",
    mechanism:
      "Oral mucosa and skin share embryologic origin → in rare cases, hair-producing tissue develops in abnormal locations such as the tongue",
    lesions: "Hairs growing inside the mouth (often on the tongue) — usually incidental",
    keyClue: "Incidental finding — no major clinical consequence",
    pearls: "Hair got lost and grew inside the mouth",
  },
  {
    id: 4,
    name: "Epitheliogenesis Imperfecta",
    suit: "congenital",
    tier: 2,
    etiology: "Autosomal recessive inheritance",
    species: "Piglets, cattle, horses",
    mechanism:
      "Portions of oral mucosa fail to develop properly → missing mucosal covering exposes the underlying muscle to the oral environment",
    lesions: "Pink-brown depressed lesions; exposed muscle; ↑ bacterial invasion risk",
    keyClue: "Pink-brown depressed lesions with exposed muscle; autosomal recessive",
    pearls: "Tongue born without its protective armor",
  },

  // ===================== SYSTEMIC & DEGENERATIVE (5) =====================
  {
    id: 5,
    name: "Vitamin E / Selenium Deficiency Degeneration",
    suit: "systemic",
    tier: 2,
    etiology: "Nutritional deficiency of antioxidants (Vit E + Se)",
    species: "Ruminants, horses, pigs",
    mechanism:
      "Vit E + Se normally protect cell membranes against oxidation. Without them, oxidative injury damages striated muscle fibers (tongue, skeletal, AND cardiac)",
    lesions:
      "White muscle lesions with a 'cooked meat' appearance in tongue, skeletal, and cardiac muscle; weakness, locomotor disorders, SUDDEN DEATH if cardiac involvement",
    keyClue: "White 'cooked meat' muscle lesions — including the tongue — from oxidative injury",
    pearls: "Without antioxidants, muscles cook themselves from oxidative damage",
  },
  {
    id: 6,
    name: "Circumscribed Calcinosis",
    suit: "systemic",
    tier: 3,
    etiology: "Focal dystrophic mineralization from repeated local trauma",
    species: "More common in dogs",
    mechanism:
      "Damaged tissue (tongue biting, rough plants, pressure points) becomes calciphilic → calcium salts (phosphate/carbonate) precipitate locally. Blood Ca is NORMAL — distinguishes from metastatic mineralization (which has hypercalcemia)",
    lesions:
      "Hard, chalky white nodules; persistent; secondary macrophage inflammation around the deposits",
    keyClue:
      "Hard chalky white nodules with NORMAL blood Ca (dystrophic, not metastatic, mineralization)",
    pearls: "Repeated trauma slowly turns tissue into chalk-like stone",
  },
  {
    id: 7,
    name: "Petechial Macules",
    suit: "systemic",
    tier: 1,
    etiology: "Systemic vascular injury",
    species: "All species",
    mechanism:
      "Endothelial injury during septicemia, toxemia, or DIC → vascular leakage → pinpoint hemorrhages visible on the gingiva",
    lesions: "Tiny dark pinpoint hemorrhages on the gingiva",
    keyClue: "Pinpoint gingival hemorrhages → think septicemia / toxemia / DIC",
    pearls: "Sepsis sprays tiny red dots over the gums — oral exam reveals systemic infection",
  },
  {
    id: 8,
    name: "Uremic Ulcers",
    suit: "systemic",
    tier: 2,
    etiology: "Kidney failure / severe uremia",
    species: "All species (especially dogs, cats)",
    mechanism:
      "Urea accumulates in saliva → oral bacteria convert urea to ammonia → ammonia chemically BURNS oral epithelium → ulcers form. Urea also damages endothelium → vasculitis + thrombosis",
    lesions:
      "Oral ulcers and necrosis (tongue + palate); severe HALITOSIS ('uremic breath')",
    keyClue: "Uremic breath + tongue/palate ulcers → 4-step urea → ammonia → chemical burn",
    pearls: "Kidney failure makes the mouth chemically burn itself",
  },
  {
    id: 9,
    name: "Jaundice (oral signs)",
    suit: "systemic",
    tier: 1,
    etiology: "Pre-hepatic (hemolysis), hepatic (liver dysfunction), or post-hepatic (bile obstruction)",
    species: "All species",
    mechanism: "Bilirubin accumulates in plasma → deposits in mucosa → yellow discoloration",
    lesions:
      "Yellow / saffron mucous membranes; orange tint if congestion is present. Compare to CYANOSIS — bluish mucosa from poor oxygenation",
    keyClue: "Yellow/saffron oral mucosa — staging by pre/hepatic/post-hepatic mechanism",
    pearls: "Bilirubin paints the mucosa yellow",
  },

  // ===================== VIRAL STOMATITIS (4) =====================
  {
    id: 10,
    name: "Vesicular Stomatitis",
    suit: "viral",
    tier: 3,
    etiology: "Picornavirus (FMD), Rhabdovirus, Calicivirus, Enterovirus",
    species: "Cattle, sheep, pigs, horses (depending on agent)",
    mechanism:
      "Viruses infect epithelial cells → intracellular edema → acantholysis (loss of cell-cell adhesion) → intercellular edema → vesicle formation. Vesicles rupture into erosions",
    lesions:
      "Vesicles (fluid-filled blisters) that rupture into erosions; hypersalivation, pain, reduced eating",
    keyClue: "VESICLE = picorna / rhabdo / calici / entero; FMD is the notifiable picornavirus",
    pearls: "Viruses inflate fluid bubbles inside the oral epithelium",
  },
  {
    id: 11,
    name: "Erosive Stomatitis — Pestivirus (Mucosal Disease / BVD)",
    suit: "viral",
    tier: 3,
    etiology: "Pestivirus (BVD virus, family Flaviviridae)",
    species: "Cattle",
    mechanism:
      "DIRECT destruction of ALL epithelial layers including the basal cells → full-thickness epithelial loss",
    lesions: "Deep ulcers, severe pain, extensive tissue loss",
    keyClue: "Direct destruction of all epithelial layers (basal cells included)",
    pearls:
      "Contrast with MCF: Pesti destroys the epithelium directly; gamma-herpes destroys its blood supply",
  },
  {
    id: 12,
    name: "Erosive Stomatitis — Gamma-Herpesvirus (Malignant Catarrhal Fever)",
    suit: "viral",
    tier: 3,
    etiology: "Ovine/caprine gamma-herpesvirus (MCF / gangrenous coryza)",
    species: "Cattle (with sheep/goat exposure)",
    mechanism:
      "IMMUNE-MEDIATED vasculitis → ischemic necrosis of oral mucosa (and elsewhere). Not direct epithelial destruction",
    lesions: "Deep ulcers from ischemic necrosis, severe pain, extensive tissue loss",
    keyClue: "Vasculitis-driven ischemic ulcers (not direct epithelial destruction)",
    pearls: "Gamma-herpesvirus = the vascular-mechanism mucosal-disease look-alike",
  },
  {
    id: 13,
    name: "Papular Stomatitis (Orf / Contagious Ecthyma)",
    suit: "viral",
    tier: 2,
    etiology: "Parapoxvirus",
    species: "Cattle, sheep, goats, HUMANS (zoonotic — Orf)",
    mechanism:
      "Stimulates epithelial PROLIFERATION (not destruction). Lesion timeline: papule → pustule → scab → ulcer",
    lesions: "Raised papules, thickened lips, crusting around the mouth",
    keyClue: "ZOONOTIC parapox — papule → pustule → scab → ulcer evolution",
    pearls: "The only viral stomatitis that proliferates rather than destroys — tiny bumps become crusty volcanoes",
  },

  // ===================== BACTERIAL / FUNGAL / TRAUMA (5) =====================
  {
    id: 14,
    name: "Necrotizing Glossitis (Fusobacterium necrophorum)",
    suit: "bacterial",
    tier: 3,
    etiology: "Fusobacterium necrophorum (Gram-negative, filamentous, anaerobic)",
    species: "Cattle, sheep, all species with tongue ulceration",
    mechanism:
      "After tongue ulcer, bacteria invade exposed tissue → toxins KILL neutrophils + promote necrosis + cause suppuration. Hematogenous spread → LIVER ABSCESSES",
    lesions: "Tongue destruction, deep abscesses, liver abscesses via bloodstream",
    keyClue: "Anaerobic filamentous G-neg invader → tongue ulcer + LIVER abscess (portal spread)",
    pearls: "Bacteria invade the wounded tongue and progressively eat it",
  },
  {
    id: 15,
    name: "Candida albicans Superinfection",
    suit: "bacterial",
    tier: 2,
    etiology: "Candida albicans (opportunistic yeast/fungus)",
    species: "Immunocompromised across species",
    mechanism:
      "Mycelial filaments invade tissue → invade blood vessels → thrombosis → ischemic necrosis. May extend to esophagus (esophagitis)",
    lesions:
      "Yellow necrotic coating, deep rapidly spreading lesions; esophagitis if extensive",
    keyClue: "Yellow necrotic coating + vessel-invasion → ischemic mechanism (not toxin-mediated)",
    pearls: "Fungal roots choke blood vessels and kill tissue",
  },
  {
    id: 16,
    name: "Actinobacillosis ('Wooden Tongue')",
    suit: "bacterial",
    tier: 3,
    etiology: "Actinobacillus lignieresii (Gram-negative)",
    species: "Cattle (classic), sheep",
    mechanism:
      "Trauma-associated infection of SOFT tissue → granulomatous inflammation of tongue",
    lesions: "Hard, enlarged tongue; granulomatous inflammation; difficulty eating",
    keyClue:
      "BacIllus → softer (TONGUE). Hard enlarged tongue from granulomas. Distinguish from Actinomycosis (bone)",
    pearls: "The tongue slowly turns into wood",
  },
  {
    id: 17,
    name: "Actinomycosis ('Lumpy Jaw')",
    suit: "bacterial",
    tier: 3,
    etiology: "Actinomyces pyogenes",
    species: "Cattle",
    mechanism:
      "Trauma-associated infection of HARD tissue → suppurative chronic inflammation with BONE invasion → osteomyelitis",
    lesions: "Suppurative chronic mandibular/maxillary lesions; bone invasion; osteomyelitis",
    keyClue:
      "Myces → bony (JAW). Lumpy jaw with osteomyelitis. Distinguish from Actinobacillosis (tongue)",
    pearls: "BacIllus = softer tongue / Myces = bony jaw — #1 disambiguation point",
  },
  {
    id: 18,
    name: "Less Pathogenic Bacterial Infections",
    suit: "bacterial",
    tier: 1,
    etiology: "Minor environmental bacteria entering after trauma",
    species: "All species",
    mechanism: "Trauma → bacterial entry → local inflammation → fibrous encapsulation",
    lesions: "Small abscesses; local inflammation; usually walled off by fibrosis",
    keyClue: "Walled-off small abscess after trauma — less severe than Fusobacterium",
    pearls: "All these conditions require a mucosal breach to invade",
  },

  // ===================== IMMUNE / CHEMICAL / HYPERSENSITIVITY (5) =====================
  {
    id: 19,
    name: "Autoimmune Stomatitis",
    suit: "immune",
    tier: 2,
    etiology: "Host immune attack on self oral tissues",
    species: "Dogs, cats",
    mechanism: "Immune system mistakenly attacks oral mucosa directly",
    lesions:
      "Chronic ulcers, painful and recurrent inflammation, progressive tissue destruction",
    keyClue: "Chronic recurrent ulcers WITHOUT infection — biopsy is key",
    pearls: "The body mistakes its own mouth as the enemy. Always exclude infection first",
  },
  {
    id: 20,
    name: "Chemical Stomatitis",
    suit: "immune",
    tier: 1,
    etiology: "Toxic chemicals or irritating substances",
    species: "All species",
    mechanism: "Direct chemical destruction of epithelium",
    lesions: "Burns, necrosis, ulceration",
    keyClue: "Acute, sharply demarcated necrosis with chemical exposure history",
    pearls: "The mouth suffers a chemical burn — look for caustic / plant / cleaning agent history",
  },
  {
    id: 21,
    name: "Granulomatous & Necrotizing Stomatitis",
    suit: "immune",
    tier: 3,
    etiology: "Immune / hypersensitivity disorders",
    species: "Cats (most common)",
    mechanism:
      "Hypersensitivity-driven granuloma formation with necrosis and severe chronic inflammation",
    lesions: "Granulomas, necrosis, severe chronic inflammation",
    keyClue: "Granulomas + necrosis in a CAT — overlaps with feline chronic gingivostomatitis",
    pearls: "Cats >> dogs for granulomatous and hypersensitivity oral lesions",
  },
  {
    id: 22,
    name: "Ulcerative Cheilitis",
    suit: "immune",
    tier: 2,
    etiology: "Often hypersensitivity- or autoimmune-driven",
    species: "Dogs, cats",
    mechanism: "Inflammation localizes to the lips with ulcerative epithelial loss",
    lesions: "Lip ulceration, pain, difficulty eating",
    keyClue: "Ulcers RESTRICTED to the lips",
    pearls: "Lip-only distribution narrows the differential",
  },
  {
    id: 23,
    name: "Nodular Stomatitis",
    suit: "immune",
    tier: 2,
    etiology: "Often hypersensitivity-linked",
    species: "Dogs, cats",
    mechanism: "Chronic inflammatory response forms nodules within oral tissues",
    lesions: "Persistent inflammatory nodules",
    keyClue: "Persistent inflammatory NODULES (not ulcers) — hypersensitivity-linked",
    pearls: "Three driving categories (autoimmune / chemical / hypersensitivity) → one common painful inflamed mouth",
  },

  // ===================== NEOPLASIA & STAGING (6) =====================
  {
    id: 24,
    name: "Papillomatosis",
    suit: "neoplasia",
    tier: 1,
    etiology: "Papillomavirus",
    species: "Young dogs (classic)",
    mechanism:
      "Viral induction of epithelial proliferation → benign wart-like masses, often multiple",
    lesions: "Wart-like benign masses, often multiple, in the oral cavity of young dogs",
    keyClue: "Multiple wart-like masses in a YOUNG DOG — papillomavirus, often self-resolves",
    pearls: "Benign and often self-resolving — no aggressive treatment usually needed",
  },
  {
    id: 25,
    name: "Epulis",
    suit: "neoplasia",
    tier: 2,
    etiology: "Benign gingival tumor",
    species: "Dogs (most common)",
    mechanism: "Localized benign proliferation of gingival tissue",
    lesions: "Firm gingival mass; slow-growing; interferes with chewing",
    keyClue: "Firm SLOW-GROWING gingival mass — benign but biopsy to exclude SCC",
    pearls: "Gingival but BENIGN — easily confused with malignant masses, biopsy needed",
  },
  {
    id: 26,
    name: "Squamous Cell Carcinoma (SCC)",
    suit: "neoplasia",
    tier: 3,
    etiology: "Malignant epithelial neoplasm",
    species: "Cats (#1 oral malignancy), dogs",
    mechanism:
      "Two gross forms: TEREBRATING (drilling, deeply invasive) and NODULAR EXOPHYTIC (raised, outward-growing). Aggressive invasion into surrounding tissue and bone",
    lesions: "Ulceration, BONE invasion, local tissue destruction, aggressive behavior",
    keyClue: "#1 malignant oral tumor — drills through tissue AND bone",
    pearls: "Cancer drills through oral tissue and bone — two forms, both aggressive",
  },
  {
    id: 27,
    name: "Fibrosarcoma",
    suit: "neoplasia",
    tier: 3,
    etiology: "Malignant mesenchymal (connective tissue) neoplasm",
    species: "Dogs, cats",
    mechanism:
      "Aggressive local invasion with rapid growth and poorly-defined margins — difficult surgical control",
    lesions: "Rapid-growth invasive mass with poorly-defined margins",
    keyClue: "Recurs after surgery — margins are unclear; mesenchymal malignancy",
    pearls: "SCC = epithelial malignancy; Fibrosarcoma = mesenchymal malignancy — both aggressive locally",
  },
  {
    id: 28,
    name: "Extremely Malignant Oral Tumors",
    suit: "neoplasia",
    tier: 3,
    etiology: "Aggressive malignancies of various tissue origin",
    species: "Multiple",
    mechanism:
      "Combine bone destruction + lymph node infiltration + distant metastasis + severe local invasion — i.e. stage 4 behavior",
    lesions: "Bone destruction, lymph node involvement, distant metastasis, severe tissue invasion",
    keyClue: "Bone destruction + lymph node + lung mets = Stage 4 prognosis",
    pearls: "Staging tells prognosis better than tumor type alone",
  },
  {
    id: 29,
    name: "Tumor Staging (Stages 1–4)",
    suit: "neoplasia",
    tier: 2,
    etiology: "Clinical staging framework for oral neoplasia",
    species: "All species",
    mechanism:
      "Progression spectrum: Stage 1 = localized lesion. Stage 2 = local extension + infiltration. Stage 3 = regional LYMPH NODE involvement. Stage 4 = DISTANT METASTASIS",
    lesions: "Stage determines lesion distribution: local → adjacent → nodes → distant organs",
    keyClue: "Local → nearby tissues → lymph nodes → entire body (1→2→3→4)",
    pearls: "Stage 4 = distant metastasis = poorest prognosis; staging > tumor type for outcome",
  },
];

export const oralDeck = {
  slug: "oral",
  title: "Oral Cavity Pathology",
  routePrefix: "/oral",
  suits: ORAL_SUITS,
  cards: oralCards,
  fieldLabels: {
    etiology: "Etiology / agent",
    species: "Species",
    mechanism: "Mechanism",
    lesions: "Lesions / signs",
    keyClue: "Key clue",
    pearls: "Pearl",
  },
  prompts: {
    identifyNoun: "lesion",
    keyClueNoun: "KEY CLUE / pathognomonic feature",
    affectsVerb: "affects which species",
    caseFileTitle: "🦷 Case file",
    diagnoseVerb: "Diagnose",
  },
};
