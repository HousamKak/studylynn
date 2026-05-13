// Veterinary Toxicology deck — built from the toxico 1,2,3 PDF + nine
// structured infographic prompt MDs (vocabulary → classification → doses
// → kinetics → dynamics → enzymes → systems).

export const TOXICO_SUITS = {
  fundamentals: {
    label: "Vocabulary & Classification",
    color: "#6366f1",
    emoji: "📜",
  },
  doses: {
    label: "Dose Concepts",
    color: "#f59e0b",
    emoji: "⚖️",
  },
  kinetics: {
    label: "Toxicokinetics (ADME)",
    color: "#22d3ee",
    emoji: "🌊",
  },
  dynamics: {
    label: "Toxicodynamics & DNA Adducts",
    color: "#ec4899",
    emoji: "🧬",
  },
  enzymes: {
    label: "Enzyme Inhibition & Non-Specific",
    color: "#ef4444",
    emoji: "🔒",
  },
  systems: {
    label: "Hb, Neuro, Mutagenic & Endocrine",
    color: "#a855f7",
    emoji: "❤️",
  },
};

export const toxicoCards = [
  // ===================== FUNDAMENTALS (5) =====================
  {
    id: 1,
    name: "Toxin vs Toxicant",
    suit: "fundamentals",
    tier: 1,
    etiology: "Vocabulary distinction",
    species: "All",
    mechanism:
      "Toxin = toxic substance produced by bacteria / parasites / plants (biological origin). Toxicant = synthetic / xenobiotic chemical with toxic potential",
    lesions: "Both can cause harm at sufficient dose; classification matters for source-tracing",
    keyClue:
      "Toxin = biological. Toxicant = synthetic / xenobiotic. Don't confuse them in clinical writeups",
    pearls: "Snake venom = toxin. Insecticide = toxicant. Same outcome, different origin",
  },
  {
    id: 2,
    name: "Toxicology — the Science",
    suit: "fundamentals",
    tier: 1,
    etiology: "Discipline definition",
    species: "—",
    mechanism:
      "Studies all interactions of xenobiotics with living structures — nature, properties, mechanism, detection, treatment",
    lesions: "Three aspects: experimental (LD50 + chronic studies), analytical (GC, HPLC, AAS), clinical (case management)",
    keyClue: "3 aspects = experimental + analytical + clinical",
    pearls: "Toxicology is the umbrella; toxicosis, toxaemia, poisoning sit underneath as clinical entities",
  },
  {
    id: 3,
    name: "Acute Poisoning",
    suit: "fundamentals",
    tier: 1,
    etiology: "Single high-dose or ≤24 h cumulative exposure",
    species: "All",
    mechanism:
      "Rapid onset of intense symptoms — typically minutes to hours after exposure. Exception: lead can produce an acute episode after weeks of low-dose intake",
    lesions: "Rapid, intense clinical signs; mortality if not addressed",
    keyClue: "Single dose OR repeats within 24 h → rapid intense onset",
    pearls: "LD50 = the experimental benchmark for ranking acute toxicity",
  },
  {
    id: 4,
    name: "Chronic Poisoning",
    suit: "fundamentals",
    tier: 2,
    etiology: "Repeated low-dose exposure over weeks to years",
    species: "All",
    mechanism:
      "Slow accumulation → mild, slowly developing symptoms. May or may not be reversible. Cumulative toxins: lead (weeks → saturnism), copper (months), fluorine (years → fluorosis)",
    lesions: "Variable, often organ-specific (liver, kidney, marrow, CNS)",
    keyClue:
      "Three classic cumulative toxins: Pb (weeks), Cu (months), F (years). 'Subacute' = milder than acute, in between",
    pearls: "Reversibility depends on whether bonds are covalent or competitive",
  },
  {
    id: 5,
    name: "Classification Axes (4)",
    suit: "fundamentals",
    tier: 2,
    etiology: "Reference framework",
    species: "—",
    mechanism:
      "Every toxic substance can be classified along 4 axes simultaneously: (1) chemical nature — mineral / organic / gaseous; (2) mechanism — caustic / thiolytic / metHb / anticholinesterase / biosynthesis disruptor; (3) use — insecticide / herbicide / fungicide / rodenticide; (4) hazard — 15 international hazard pictograms",
    lesions: "Mechanism axis predicts antidote strategy (e.g. thiolytic → chelator)",
    keyClue: "4 axes: chemical · mechanism · use · hazard. Pb fits multiple at once",
    pearls: "Hazard pictograms are internationally standardized — recognize on sight",
  },

  // ===================== DOSE CONCEPTS (5) =====================
  {
    id: 6,
    name: "LD50 — Lethal Dose 50%",
    suit: "doses",
    tier: 2,
    etiology: "Experimental toxicity benchmark",
    species: "Determined per species + per route",
    mechanism:
      "Single dose that kills 50% of test animals. Sometimes applied to repeated dosing within 24 h. Always specify species + route (oral, IV, SC, IP, inhalation)",
    lesions: "—",
    keyClue: "Single dose / 50% mortality / mg/kg / species + route specified",
    pearls:
      "Coumafen: 50 mg/kg single in dogs vs 5 mg/kg/day × 5–10 days → repeated dosing dramatically lowers effective lethal dose",
  },
  {
    id: 7,
    name: "MTD — Maximum Tolerated Dose",
    suit: "doses",
    tier: 2,
    etiology: "Experimental ceiling concept",
    species: "Determined per species",
    mechanism:
      "Highest dose in LD50 studies at which NO mortality occurred — but symptoms of poisoning are still observed",
    lesions: "Toxic clinical signs but no deaths",
    keyClue: "0% mortality but symptoms allowed (≠ NOAEL which allows neither)",
    pearls: "MTD sits between NOAEL (no symptoms) and LD50 (50% kill)",
  },
  {
    id: 8,
    name: "NOAEL — No Observed Adverse Effect Level",
    suit: "doses",
    tier: 2,
    etiology: "Repeated-dose toxicity reference",
    species: "Mammalian models (rat, dog)",
    mechanism:
      "Highest repeated dose (30 days – 2 years) producing NO biochemical, microscopic, macroscopic, or clinical abnormality. Expressed in mg/kg/day",
    lesions: "By definition: none",
    keyClue: "No effect at all — biochemical, micro, macro, or clinical",
    pearls: "NOAEL is the reference value used to derive the ADI",
  },
  {
    id: 9,
    name: "ADI — Acceptable Daily Intake",
    suit: "doses",
    tier: 2,
    etiology: "Human-facing safety limit",
    species: "Humans (extrapolated from mammals)",
    mechanism:
      "Amount a human can ingest daily, lifelong, with NO risk. Calculated as NOAEL ÷ safety coefficient (100 or 1000)",
    lesions: "—",
    keyClue: "Human-only; mg/kg/day; ADI = NOAEL ÷ 100 or 1000",
    pearls: "Safety factor accounts for interspecies + individual variation",
  },
  {
    id: 10,
    name: "MRL & PPM Units",
    suit: "doses",
    tier: 2,
    etiology: "Food-safety + units of concentration",
    species: "Humans (food consumers)",
    mechanism:
      "MRL = max residue allowed in foodstuffs (animal/plant), set by WHO/FAO. Expressed in ppm. ppm = mg/kg for solids; ppm = mL gas/m³ air for gases. ppb = 1 µg/kg = ppm × 1/1000. For gases: mg/m³ = ppm × density. Always specify fresh vs dried sample",
    lesions: "—",
    keyClue: "Solid: ppm = mg/kg. Gas: ppm = mL/m³. ppb = ppm × 1/1000",
    pearls: "An 80%-water sample at 1 ppm fresh = 0.2 ppm dried — context matters",
  },

  // ===================== TOXICOKINETICS / ADME (10) =====================
  {
    id: 11,
    name: "Oral Absorption Route",
    suit: "kinetics",
    tier: 1,
    etiology: "Ingestion (most common veterinary scenario)",
    species: "All",
    mechanism:
      "Toxin reaches digestive tract → absorbed across gut wall. Subject to gastric pH, intestinal flora, food content, motility, and first-pass hepatic metabolism",
    lesions: "GI signs early; systemic toxicity after first-pass clears the liver",
    keyClue: "Most common route in vet tox; first-pass metabolism applies",
    pearls: "Activated charcoal targets this route specifically",
  },
  {
    id: 12,
    name: "Respiratory Absorption Route",
    suit: "kinetics",
    tier: 2,
    etiology: "Inhalation of aerosols, mists, gases, dusts",
    species: "All",
    mechanism:
      "Particles < 10 µm reach pulmonary alveoli → high absorption. Particles > 10 µm trapped higher up → poor absorption. Repeated silica or asbestos inhalation → bronchopulmonary fibrosis → mesothelioma",
    lesions: "Reflex spasm, pulmonary / laryngeal edema; fibrosis with chronic exposure",
    keyClue: "10 µm threshold — < 10 µm reaches alveoli",
    pearls: "Carbon monoxide is the textbook respiratory toxin",
  },
  {
    id: 13,
    name: "Cutaneous Absorption Route",
    suit: "kinetics",
    tier: 3,
    etiology: "Skin contact with lipophilic substances",
    species: "All (handlers as well as patients)",
    mechanism:
      "Lipophilic substances cross skin readily, especially when dissolved in organic solvents or in emulsion form. Occurs during immersion AND spraying",
    lesions: "Systemic toxicity without GI signs; site-specific irritation possible",
    keyClue:
      "Mosquito control example — insecticide absorbed by handlers 20× MORE through skin than through inhalation",
    pearls: "Parathion, nicotine, aniline dyes — all classic cutaneous absorbers",
  },
  {
    id: 14,
    name: "Plasma Transport Forms",
    suit: "kinetics",
    tier: 2,
    etiology: "Distribution biophysics",
    species: "All",
    mechanism:
      "Polar substances → travel free in plasma → diffuse rapidly into extracellular fluid → filtered renally. Non-polar / lipophilic substances → bind albumin / lipoproteins → free fraction in equilibrium with bound fraction → cross membranes slowly. Some non-polar agents (CO, lead, anesthetics) carried inside red blood cells",
    lesions: "—",
    keyClue: "Polar = free in plasma. Non-polar = protein-bound. Lead / CO / anesthetics ride RBCs",
    pearls: "Protein-binding modulates speed of CNS penetration",
  },
  {
    id: 15,
    name: "Lipophilic Distribution & Bioaccumulation",
    suit: "kinetics",
    tier: 3,
    etiology: "Repeated low-dose exposure to lipophilic toxins",
    species: "Ruminants + carnivores (fat-storing)",
    mechanism:
      "Single dose → vascularized organs hold the most toxin (sheep HCH: brain + liver = 20 ppm, fat < 10 ppm). Repeated dosing → adipose tissue affinity dominates and accumulates. Lindane example: daily-dosed sheep store > 100 ppm in fat, < 10 ppm elsewhere",
    lesions: "Silent accumulation; weight loss releases stored toxin → acute poisoning episode",
    keyClue: "Weight loss releases stored lipophilic toxins → acute symptoms",
    pearls: "Organochlorine insecticides (HCH, DDT, lindane) are the classic bioaccumulators",
  },
  {
    id: 16,
    name: "Bioactivation — Parathion & Malathion",
    suit: "kinetics",
    tier: 3,
    etiology: "Hepatic CYP450 oxidation",
    species: "All; agricultural workers + livestock exposure",
    mechanism:
      "Parathion → paraoxon (potent cholinesterase inhibitor). Malathion → malaoxon, toxicity ~ 40 × parent. Parent OPs are 'prototoxins' — the active danger is the metabolite, not the molecule sprayed",
    lesions: "Cholinergic toxicity (SLUDGE + nicotinic + central) once metabolite is formed",
    keyClue: "Malaoxon = 40 × malathion. Parent OPs are prototoxins",
    pearls: "Liver microsome induction can ACCELERATE bioactivation — not always protective",
  },
  {
    id: 17,
    name: "Bioactivation — Methanol → Formic Acid",
    suit: "kinetics",
    tier: 2,
    etiology: "Methanol ingestion (windshield washer, illicit alcohol)",
    species: "All; primates + humans most sensitive",
    mechanism:
      "Methanol oxidized by alcohol dehydrogenase → formaldehyde → formic acid. Formic acid is toxic to the optic nerve → permanent blindness",
    lesions: "Metabolic acidosis + retinal toxicity + optic nerve damage",
    keyClue: "Formic acid (metabolite) is what blinds — not methanol itself",
    pearls: "Antidote: fomepizole or ethanol (compete for ADH), buy time + dialyze",
  },
  {
    id: 18,
    name: "Bioactivation — Ethylene Glycol → Oxalic Acid",
    suit: "kinetics",
    tier: 2,
    etiology: "Antifreeze ingestion (sweet taste → pet exposure)",
    species: "Dogs, cats",
    mechanism:
      "Ethylene glycol oxidized by alcohol dehydrogenase → glycolaldehyde → glycolic acid → oxalic acid. Oxalate precipitates with Ca²⁺ → calcium oxalate crystals deposit in renal tubules",
    lesions: "Renal tubular necrosis with characteristic birefringent oxalate crystals",
    keyClue: "Calcium oxalate crystals in kidney = pathognomonic",
    pearls: "Antidote: fomepizole / ethanol — block ADH",
  },
  {
    id: 19,
    name: "Cat Phenol Vulnerability",
    suit: "kinetics",
    tier: 3,
    etiology: "Hereditary deficiency of phenol glucuronyl transferase",
    species: "Cats (species-specific deficiency)",
    mechanism:
      "Cats cannot glucuronidate hydroxylated aromatics → phenols accumulate. Clearance: ~3 days in cats vs ~8 h in dogs",
    lesions: "Salivation, vomiting, seizures, LIVER NECROSIS",
    keyClue:
      "Cats clear phenols ~9× SLOWER than dogs → liver necrosis from products labeled 'safe' (insecticides, essential oils, human meds)",
    pearls: "Always check whether a 'safe' product was tested in cats — many phenols aren't",
  },
  {
    id: 20,
    name: "Enterohepatic Recirculation",
    suit: "kinetics",
    tier: 3,
    etiology: "Biliary excretion + gut-flora hydrolysis loop",
    species: "All; clinically relevant for heavy-metal + mycotoxin poisonings",
    mechanism:
      "Liver excretes conjugated toxin into bile → bile + intestinal flora HYDROLYZE the conjugate → non-polar product is reabsorbed → returns to liver → re-conjugated → secreted again. Up to 90% of methylmercury excreted in bile is reabsorbed this way",
    lesions: "Prolonged systemic toxicity even after exposure ends",
    keyClue: "Block the loop → enhance fecal excretion (activated charcoal, cholestyramine)",
    pearls: "Therapeutic target — interrupting recirculation is a real antidote strategy",
  },

  // ===================== DYNAMICS & DNA ADDUCTS (5) =====================
  {
    id: 21,
    name: "Toxicoavailable Entity",
    suit: "dynamics",
    tier: 2,
    etiology: "Core toxicodynamic concept",
    species: "—",
    mechanism:
      "After absorption + distribution, the 'toxicoavailable entity' is the set of parent toxin + reactive metabolites (electrophiles, radicals) that ESCAPED detoxification and now act on endogenous receptors. Local concentration at the receptor = toxicodisibility",
    lesions: "From allergic reaction → necrosis → irreversible mutation, depending on dose + target",
    keyClue:
      "Subcellular targets: membrane, ER, mitochondria, nucleus. Molecular targets: proteins, DNA/RNA, lipids, coenzymes, vitamins, glutathione",
    pearls: "Most damage comes from reactive METABOLITES, not the parent molecule",
  },
  {
    id: 22,
    name: "Guanine — Top DNA Target",
    suit: "dynamics",
    tier: 2,
    etiology: "Nucleic-acid reactivity",
    species: "—",
    mechanism:
      "All four DNA bases have nucleophilic centers (N7, N3, exocyclic amines), but GUANINE has the HIGHEST frequency of toxicodynamic adduct formation. Electrophilic toxicoavailable entities form covalent bonds preferentially with guanine",
    lesions: "DNA adducts → mispairing → mutation → tumor / teratogenic outcome",
    keyClue: "Guanine = #1 DNA target. Adducts here drive carcinogenesis",
    pearls: "Adenine, cytosine, thymine, uracil also reactive — just less so",
  },
  {
    id: 23,
    name: "Benzo(a)pyrene → BPDE",
    suit: "dynamics",
    tier: 3,
    etiology: "PAH from incomplete combustion (300–600 °C)",
    species: "All; smokers + barbecue eaters disproportionately exposed",
    mechanism:
      "Sources: tobacco smoke, diesel exhaust, grilled meat, biomass / forest fires, toast. Yellow crystal, 5 fused rings. Bioactivated in lung cells to Benzo(a)pyrene-diol-epoxide (BPDE) → intercalates DNA → DEAMINATES guanine → guanine now pairs with adenine instead of cytosine → G:C → A:T transversion mutation",
    lesions: "Lung malignancy, especially in chronic smokers; bioaccumulates in marine filter-feeders",
    keyClue: "BPDE deaminates guanine → guanine mispairs with adenine → textbook smoking-lung mutation",
    pearls: "Used as a TRACER molecule for all PAHs in environmental sampling",
  },
  {
    id: 24,
    name: "Aflatoxin B1",
    suit: "dynamics",
    tier: 3,
    etiology: "Aspergillus flavus mycotoxin (moldy peanuts, maize, grain)",
    species: "Ducks (most sensitive), dogs, cattle, humans",
    mechanism:
      "Liver CYP450 bioactivates AFB1 → AFB1-8,9-epoxide → covalent adduct at N7 of guanine → hepatocellular DNA damage. One of the most potent natural carcinogens known",
    lesions: "Hepatocellular carcinoma, hepatic necrosis, immunosuppression",
    keyClue: "AFB1 → epoxide → N7-guanine adduct → liver cancer",
    pearls:
      "Reactive metabolite, not the parent, does the damage — and the liver is where it's both formed and where it bites",
  },
  {
    id: 25,
    name: "Glutathione Depletion",
    suit: "dynamics",
    tier: 2,
    etiology: "Mechanism shared by many electrophilic toxins",
    species: "All; cats especially vulnerable (limited GSH synthesis)",
    mechanism:
      "Glutathione (GSH) is the cell's main soluble antioxidant + electrophile sink. Reactive metabolites consume GSH conjugating into harmless mercapturate. Once GSH is depleted, downstream electrophiles attack proteins + DNA freely",
    lesions: "Oxidative stress, hepatocellular necrosis, lipid peroxidation",
    keyClue: "GSH depletion = the tipping point where damage starts",
    pearls:
      "Paracetamol toxicity in cats = classic GSH-depletion story; N-acetylcysteine = GSH precursor antidote",
  },

  // ===================== ENZYMES & NON-SPECIFIC (8) =====================
  {
    id: 26,
    name: "Caustic / Irritating Toxins",
    suit: "enzymes",
    tier: 1,
    etiology: "Concentrated acids, bases, phenols, halogens, heavy-metal salts",
    species: "All; skin + mucous membranes most vulnerable",
    mechanism:
      "Denature proteins → chemical burns (like thermal burns). Non-specific damage to any cell in contact",
    lesions:
      "Mucosal necrosis, ulceration, deep tissue burns. Paraquat → severe tongue / oral / pharyngeal / digestive necrosis even at sub-lethal doses",
    keyClue: "Non-specific protein denaturation; skin + mucous membranes hit first",
    pearls:
      "Lead at high single dose = caustic on GI. At low chronic dose = damages proximal renal tubules. As³⁺ (arsenite) = caustic + necrotic on stomach + intestine",
  },
  {
    id: 27,
    name: "Covalent Bonding (Alkylation)",
    suit: "enzymes",
    tier: 2,
    etiology: "Reactive metabolites + alkylating agents",
    species: "All",
    mechanism:
      "Toxin / metabolite forms COVALENT (often alkyl) bonds with tissue macromolecules — DNA, proteins, lipids. Correlation: degree of alkylation ↔ severity of necrosis",
    lesions: "Mutation, carcinogenesis, irreversible necrosis",
    keyClue: "Covalent = irreversible. Basis of mutagenic + carcinogenic toxins",
    pearls: "Contrast with competitive / non-covalent inhibition (carbamates, early OP) which can reverse",
  },
  {
    id: 28,
    name: "Organophosphates & Carbamates (Cholinesterase)",
    suit: "enzymes",
    tier: 3,
    etiology: "Pesticides — many agricultural + household formulations",
    species: "All; cats + birds + fish most sensitive",
    mechanism:
      "Compete with acetylcholine at cholinesterase active site. OPs are hydrolyzed but part of the molecule REMAINS bound → progressive enzyme inhibition ('aging'). Carbamates dissociate → reversible. ACh accumulates at: postganglionic muscarinic (SLUDGE, miosis, bradycardia), neuromuscular junction (fasciculations, paralysis), CNS (seizures, coma)",
    lesions: "Cholinergic crisis: salivation, lacrimation, urination, defecation, GI cramps, emesis",
    keyClue: "3 syndromes: muscarinic + nicotinic + central. OP = irreversible, carbamate = reversible",
    pearls: "Antidote: atropine (muscarinic block) + 2-PAM / pralidoxime (regenerates AChE before aging)",
  },
  {
    id: 29,
    name: "Arsenic — Thiol-Group Inhibition",
    suit: "enzymes",
    tier: 3,
    etiology: "Trivalent inorganic arsenic (arsenite) + aliphatic organic As pesticides",
    species: "All; livestock (older pesticide / dip exposure)",
    mechanism:
      "High affinity for thiol (-SH) groups in enzymes + proteins. Inhibits lipoic acid (coenzyme of pyruvate dehydrogenase + α-ketoglutarate dehydrogenase) → blocks citric acid cycle. Disrupts redox + cellular respiration in liver, kidney, heart",
    lesions: "Multi-organ failure (liver + kidney + heart); GI necrosis from caustic + thiol effects",
    keyClue: "-SH inhibitor → lipoic acid → citric acid cycle stops",
    pearls: "Antidote: chelators rich in -SH (dimercaprol, D-penicillamine, DMSA) — outcompete the bind",
  },
  {
    id: 30,
    name: "Cyanide — Cytochrome Oxidase",
    suit: "enzymes",
    tier: 3,
    etiology: "Cyanogenic glycosides (sorghum, cassava, stone fruit pits); industrial cyanide",
    species: "All; ruminants on cyanogenic plants",
    mechanism:
      "CN⁻ has affinity for trivalent metals → binds Fe³⁺ of cytochrome oxidase. Stable complex → IRREVERSIBLY inhibits the respiratory chain → cellular anoxia despite normal blood O₂",
    lesions:
      "Sudden CNS damage, bright cherry-red venous blood (O₂ unused), rapid death from CNS failure",
    keyClue: "Cellular anoxia with normal blood O₂; bright red venous blood",
    pearls:
      "Antidotes: sodium nitrite (forms metHb → binds CN⁻ off cytochrome ox) + sodium thiosulfate (converts to thiocyanate, excreted) OR hydroxocobalamin (forms cyanocobalamin, excreted)",
  },
  {
    id: 31,
    name: "Anticoagulant Rodenticides (Vitamin K Epoxide Reductase)",
    suit: "enzymes",
    tier: 3,
    etiology: "Coumarin + indanedione rodenticides (warfarin, brodifacoum, bromadiolone, diphacinone)",
    species: "Rodents (target); dogs + cats (accidental ingestion)",
    mechanism:
      "Non-competitive inhibition of vitamin K1 epoxide reductase → cannot regenerate active vitamin K1 from epoxide form → cannot activate PPSB clotting factors (Prothrombin, Proconvertin, Stuart factor, antihemophilic B)",
    lesions:
      "Coagulopathy: hemorrhages (mucosal, body cavities, joints, CNS), prolonged PT + PTT, anemia, sudden death from internal bleeding",
    keyClue: "Vitamin K cycle blocked → bleeding 2–5 days later (latency = factor half-life)",
    pearls:
      "Antidote: vitamin K1 (phytomenadione) — long-acting agents require WEEKS of treatment",
  },
  {
    id: 32,
    name: "Pyrethroids — Membrane ATPase / Na Channels",
    suit: "enzymes",
    tier: 2,
    etiology: "Synthetic pyrethroid insecticides (permethrin = non-cyano; deltamethrin = cyano)",
    species: "All; CATS especially vulnerable (lack glucuronidation)",
    mechanism:
      "NON-CYANATED (permethrin) inhibit Na⁺/K⁺ ATPase + keep voltage-gated Na⁺ channels OPEN → axon repetitively depolarizes → tremor, hyperexcitability. CYANATED (cyfluthrin, cypermethrin, deltamethrin, fenvalerate) bind GABA receptor → open Cl⁻ channel → hyperpolarization → paralysis",
    lesions: "Tremors, seizures, hypersalivation, hyperthermia, paralysis (cyano form)",
    keyClue: "Non-cyano → Na channel → tremor. Cyano → GABA Cl → paralysis",
    pearls: "NEVER apply dog permethrin spot-ons to cats — fatal in cats",
  },
  {
    id: 33,
    name: "Dinitrophenols — Oxidative Phosphorylation Uncoupling",
    suit: "enzymes",
    tier: 3,
    etiology: "Dinitrophenol herbicides — dinoseb, dinoterb, DNOC",
    species: "All; banned in EU since April 2000 (aquatic toxicity)",
    mechanism:
      "Uncouple oxidation from ATP storage in mitochondria. Energy released as HEAT instead of ATP. Cellular oxidation (esp. carbohydrate) continues without ATP capture",
    lesions:
      "Hyperthermia 42–43 °C overwhelms thermoregulation. ATP deficiency disrupts many metabolic processes. Often fatal",
    keyClue: "Hyperthermia 42–43 °C from uncoupled mitochondria = pathognomonic",
    pearls: "Same mechanism as 2,4-DNP weight-loss drugs (illicit, deadly)",
  },

  // ===================== SYSTEMS — Hb, NEURO, MUTAGENIC, ENDOCRINE (12) =====================
  {
    id: 34,
    name: "Carbon Monoxide (HbCO)",
    suit: "systems",
    tier: 2,
    etiology: "Incomplete combustion — heaters, engines, fires, smoke inhalation",
    species: "All",
    mechanism:
      "CO has 220–250× greater affinity for hemoglobin than O₂. Forms carboxyhemoglobin (HbCO) → cannot transport O₂. Reaction poorly reversible",
    lesions: "Tissue anoxia, cherry-red mucous membranes, CNS damage, death",
    keyClue: "220–250× O₂ affinity; HbCO; cherry-red mucous membranes",
    pearls: "Treatment: 100% O₂ shifts equilibrium; hyperbaric O₂ for severe cases",
  },
  {
    id: 35,
    name: "Methemoglobin-Inducers (Nitrites & Chlorates)",
    suit: "systems",
    tier: 3,
    etiology: "Nitrites (water + cured meat + fertilizer runoff), chlorate herbicides, paracetamol in cats",
    species: "All; cats especially with paracetamol",
    mechanism:
      "Oxidize Fe²⁺ → Fe³⁺ in hemoglobin → methemoglobin (cannot bind O₂). Disrupts redox systems that maintain Fe²⁺. NITRITES additionally vasodilate → compounds tissue anoxia",
    lesions: "Cyanosis with CHOCOLATE-BROWN blood, hypoxia, CNS damage, death",
    keyClue: "Chocolate-brown blood = pathognomonic for methemoglobinemia",
    pearls: "Antidote: methylene blue (reduces metHb back to Hb); ascorbate as adjunct",
  },
  {
    id: 36,
    name: "Lead — Heme Biosynthesis",
    suit: "systems",
    tier: 3,
    etiology:
      "Old paint, lead shot, batteries, contaminated soil/water, industrial exposure",
    species: "All; dogs + cattle + waterfowl + young animals especially",
    mechanism:
      "Lead concentrates in bone marrow (50× blood level). Inhibits 3 heme-synthesis enzymes: (1) ALA dehydratase → ↑ urinary ALA. (2) Coproporphyrinogen decarboxylase → ↑ urinary coproporphyrin + basophilic stippling of RBCs. (3) Heme synthetase (ferrochelatase) → protoporphyrin binds zinc → protoporphyrin-zinc (PPZ) complex",
    lesions:
      "Microcytic hypochromic anemia, basophilic stippling, ↑ urinary ALA + coproporphyrin, ↑ PPZ. PPZ rises ~ 3–4 weeks, peaks ~ 2 months, persists after exposure ends",
    keyClue: "Basophilic stippling of RBCs + ↑ PPZ + ↑ urinary ALA = lab triad",
    pearls: "Antidotes: chelators — CaEDTA, succimer (DMSA), D-penicillamine",
  },
  {
    id: 37,
    name: "Lead — Neurotoxicity",
    suit: "systems",
    tier: 3,
    etiology: "Same as heme entry — chronic Pb exposure",
    species: "All; developing brains most vulnerable",
    mechanism:
      "Multiple mechanisms simultaneously: (1) competes with Ca²⁺ at ganglionic synapses + NMJ → ACh + CNS mediator release disrupted. (2) interferes with dopamine reuptake. (3) GABA interference. (4) demyelination + peripheral nerve conduction disorders",
    lesions: "Behavior change, seizures, cortical blindness, peripheral neuropathy, megaesophagus (dogs)",
    keyClue: "Pb hits Ca, GABA, dopamine, AND myelin — multimodal neuro damage",
    pearls: "Lead encephalopathy in cattle = blindness, head-pressing, seizures",
  },
  {
    id: 38,
    name: "Methylmercury (Plasmalogen + DNA Mutagen)",
    suit: "systems",
    tier: 3,
    etiology: "Fish (bioaccumulation through aquatic food chain), industrial mercury contamination",
    species: "All; carnivores eating contaminated fish",
    mechanism:
      "CH₃Hg⁺ catalyzes hydrolysis of PLASMALOGENS — phospholipids specific to neuronal membranes → membrane weakening + neuronal lysis. SEPARATELY, the electrophilic CH₃Hg⁺ acts as ALKYLATING agent on DNA bases (especially thymine) → DNA denaturation + chromosomal breaks + teratogenicity",
    lesions:
      "Neuronal lysis, demyelination, cerebellar atrophy, blindness. Mutagenic + teratogenic damage. Up to 90% of bile-excreted CH₃Hg⁺ reabsorbed → chronicity",
    keyClue: "Neurotoxin + mutagen + teratogen — triple-threat heavy metal",
    pearls: "Minamata disease historic landmark; pregnant patients + neonates highest risk",
  },
  {
    id: 39,
    name: "Strychnine (Glycine / Renshaw Antagonism)",
    suit: "systems",
    tier: 2,
    etiology: "Strychnine bait (rodenticide / predator control)",
    species: "Dogs (malicious poisoning), wildlife",
    mechanism:
      "Competitive antagonist of GLYCINE at postsynaptic glycine receptors. Glycine is the inhibitory neurotransmitter at Renshaw cell synapses (which dampen motor neurons). Without inhibition → unopposed motor neuron firing → tetanic extensor contraction",
    lesions: "OPISTHOTONOS, hyperreflexia, seizures triggered by minor stimulus, respiratory arrest",
    keyClue: "Opisthotonos + extensor rigidity + stimulus-triggered seizures = strychnine",
    pearls: "Supportive: dark quiet room, muscle relaxants (diazepam, methocarbamol), no specific antidote",
  },
  {
    id: 40,
    name: "Crimidine (Vitamin B6 Antagonism)",
    suit: "systems",
    tier: 2,
    etiology: "Crimidine rodenticide",
    species: "Mammals + birds",
    mechanism:
      "Antagonizes pyridoxine (vitamin B6) in CNS → disrupts GABA synthesis (which requires B6-dependent glutamic acid decarboxylase) → convulsions",
    lesions: "Generalized seizures, convulsant clinical picture",
    keyClue: "B6 antagonism → ↓ GABA synthesis → seizures",
    pearls: "Antidote: pyridoxine (vitamin B6) supplementation",
  },
  {
    id: 41,
    name: "Metaldehyde (Serotonin + GABA)",
    suit: "systems",
    tier: 2,
    etiology: "Slug + snail bait pellets",
    species: "Dogs (most common accidental ingestion), cats, livestock",
    mechanism:
      "Decreases brain 5-HT (serotonin) + decreases CNS GABA. Loss of inhibitory tone → tremors, seizures. Also causes metabolic acidosis + hyperthermia",
    lesions: "Severe tremors, seizures, hyperthermia, metabolic acidosis",
    keyClue: "'Shake-and-bake' poisoning — tremors + hyperthermia after garden access",
    pearls: "Treat: decontamination, diazepam / methocarbamol, active cooling, IV fluids",
  },
  {
    id: 42,
    name: "Paraquat (Superoxide → Pulmonary Fibrosis)",
    suit: "systems",
    tier: 3,
    etiology: "Paraquat + diquat herbicides",
    species: "All; small animals via accidental ingestion",
    mechanism:
      "Reduced paraquat competes with NADP⁺ for electrons → reacts with O₂ → SUPEROXIDE ions (O₂•⁻) → bind unsaturated lipids → lipid peroxides → alter pulmonary surfactant + destroy pulmonary epithelium",
    lesions:
      "Phase 1: GI burns (caustic — see card 26). Phase 2: hepatic + renal damage. Phase 3 (days–weeks): IRREVERSIBLE pulmonary fibrosis — the eventual killer",
    keyClue: "Lung fibrosis arrives DAYS after exposure and cannot be reversed",
    pearls: "Banned/restricted in many countries; supplemental O₂ ACCELERATES damage — avoid",
  },
  {
    id: 43,
    name: "Lindane (Chromosomal Aberrations)",
    suit: "systems",
    tier: 2,
    etiology: "Organochlorine insecticide (γ-HCH)",
    species: "All; classic bioaccumulator in fat",
    mechanism:
      "Demonstrated to cause chromosomal aberrations in hamster fibroblast cultures (in vitro). Mechanism: GABA receptor antagonism in CNS + mutagenic / carcinogenic concern from chromosomal damage",
    lesions: "Acute: tremors, seizures (CNS). Chronic: bioaccumulation in fat, mutagenic concern",
    keyClue: "Stores in fat — weight loss releases stored toxin → acute symptoms",
    pearls: "Banned in most agricultural use; persistent organic pollutant (POP)",
  },
  {
    id: 44,
    name: "POPs — Persistent Organic Pollutants (Immunotoxicity)",
    suit: "systems",
    tier: 3,
    etiology: "PCBs, dioxins, organochlorines, brominated flame retardants",
    species: "All; top-predator species most affected by bioaccumulation",
    mechanism:
      "Resist photolytic / biological / chemical degradation → persist in environment + biomagnify up food chain. Cause immune dysfunction: immunosuppression, allergy, autoimmune reactions",
    lesions:
      "↑ infections (immunosuppression), allergic disease, autoimmune phenomena, reproductive failure",
    keyClue: "POPs = environmental + immune toxicity at population level",
    pearls: "Regulated under Stockholm Convention; banned but legacy contamination persists",
  },
  {
    id: 45,
    name: "Endocrine Disruptors (PCBs, Dioxins, Pesticides)",
    suit: "systems",
    tier: 3,
    etiology: "PCBs, dioxins, many pesticides, plasticizers (BPA), some pharmaceuticals",
    species: "All; developing organisms (fetus, neonate) most vulnerable",
    mechanism:
      "Exogenous agent that interferes with hormone synthesis, secretion, transport, binding, action, or elimination. Disrupts homeostasis, reproduction, development, behavior. May mimic hormones (estrogen-like) or block receptors",
    lesions:
      "Reproductive failure, developmental abnormalities, behavioral disturbances, intersex phenotypes in wildlife",
    keyClue: "Hormone interference at ANY step in the signaling chain — chronic, low-dose, long-latency",
    pearls:
      "Wildlife sentinels: alligator gonad anomalies (Lake Apopka), feminized fish in rivers, declining sperm counts — all linked to EDC exposure",
  },
];

export const toxicoDeck = {
  slug: "toxico",
  title: "Veterinary Toxicology",
  routePrefix: "/toxico",
  suits: TOXICO_SUITS,
  cards: toxicoCards,
  fieldLabels: {
    etiology: "Class / source",
    species: "Most affected",
    mechanism: "Mechanism",
    lesions: "Effects / signs",
    keyClue: "Key clue",
    pearls: "Pearl",
  },
  prompts: {
    identifyNoun: "toxin",
    keyClueNoun: "KEY CLUE / hallmark",
    affectsVerb: "primarily affects which species",
    caseFileTitle: "⚗️ Case file",
    diagnoseVerb: "Identify",
  },
  infographics: [
    {
      id: 1,
      title: "Toxicology Vocabulary & Aspects",
      file: "01-vocabulary-aspects",
      suits: ["fundamentals"],
    },
    {
      id: 2,
      title: "Classification of Toxics — 4 Axes",
      file: "02-classification-of-toxics",
      suits: ["fundamentals"],
    },
    {
      id: 3,
      title: "Dose Concepts & Toxicity Measurement",
      file: "03-dose-concepts",
      suits: ["doses"],
    },
    {
      id: 4,
      title: "Toxicokinetics — Absorption Routes",
      file: "04-absorption-routes",
      suits: ["kinetics"],
    },
    {
      id: 5,
      title: "Distribution & Biotransformation",
      file: "05-distribution-biotransformation",
      suits: ["kinetics"],
    },
    {
      id: 6,
      title: "Toxin Elimination Pathways",
      file: "06-elimination-pathways",
      suits: ["kinetics"],
    },
    {
      id: 7,
      title: "Toxicodynamics — Cellular Targets & DNA Adducts",
      file: "07-toxicodynamics-cellular-targets",
      suits: ["dynamics"],
    },
    {
      id: 8,
      title: "Non-Specific Toxicity & Enzyme Inhibition",
      file: "08-nonspecific-enzyme-inhibition",
      suits: ["enzymes"],
    },
    {
      id: 9,
      title: "Hb, Neurotoxic, Mutagenic & Endocrine Mechanisms",
      file: "09-hemoglobin-neuro-mutagenic",
      suits: ["systems"],
    },
  ],
};
