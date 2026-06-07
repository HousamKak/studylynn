// Veterinary Antimicrobial Pharmacology deck — "Chemotherapy of Microbial
// Diseases". Built from the 12-page handwritten antibiotics notes
// (cell-wall β-lactams → glycopeptides → 30S/50S protein-synthesis inhibitors
// → nucleic-acid inhibitors → folate antagonists).
//
// Suits group the drugs by their mechanistic target, the way the notes do:
//   betalactam → β-lactam cell-wall agents (penicillins, cephalosporins, carbapenems)
//   cellwall   → non-β-lactam cell-wall agents (vancomycin, bacitracin/colistin)
//   ribo30s    → 30S protein-synthesis inhibitors (tetracyclines, aminoglycosides)
//   ribo50s    → 50S protein-synthesis inhibitors (macrolides, lincosamides, chloramphenicol, spectinomycin)
//   nucleic    → nucleic-acid inhibitors (fluoroquinolones, rifampin)
//   folate     → folate-pathway antagonists (sulfonamides, trimethoprim)

export const ANTIMICROBIAL_SUITS = {
  betalactam: {
    label: "β-Lactams (Cell Wall)",
    color: "#3b82f6",
    emoji: "🛡️",
  },
  cellwall: {
    label: "Glycopeptides & Polypeptides",
    color: "#8b5cf6",
    emoji: "🧱",
  },
  ribo30s: {
    label: "30S Protein-Synthesis Inhibitors",
    color: "#f59e0b",
    emoji: "🧬",
  },
  ribo50s: {
    label: "50S Protein-Synthesis Inhibitors",
    color: "#ec4899",
    emoji: "⚛️",
  },
  nucleic: {
    label: "Nucleic-Acid Inhibitors",
    color: "#06b6d4",
    emoji: "🧪",
  },
  folate: {
    label: "Folate Antagonists",
    color: "#10b981",
    emoji: "🍃",
  },
};

export const antimicrobialCards = [
  // ===================== β-LACTAMS (12) =====================
  {
    id: 1,
    name: "β-Lactam Mechanism (PBPs)",
    suit: "betalactam",
    tier: 1,
    etiology: "Cell-wall synthesis inhibitor — shared β-lactam principle",
    species: "All — Gram +ve generally more susceptible",
    mechanism:
      "Bactericidal and time-dependent. Inhibit transpeptidase by binding penicillin-binding proteins (PBPs) → weak cell wall → bacterial rupture. Different β-lactams differ in their spectra and affinities for the various PBP types",
    lesions:
      "Hypersensitivity is the most common adverse effect; very wide safety margin otherwise",
    keyClue:
      "Bind PBPs → block transpeptidase → defective cell wall → lysis (bactericidal, time-dependent)",
    pearls:
      "Time-dependent killing → keep the drug above MIC as long as possible (frequent dosing > big dose)",
  },
  {
    id: 2,
    name: "β-Lactam Resistance",
    suit: "betalactam",
    tier: 2,
    etiology: "Acquired resistance — three routes",
    species: "All bacteria; Gram −ve resist more easily",
    mechanism:
      "1) β-lactamase production (MAJOR) — hydrolyzes the β-lactam ring (penicillinases, cephalosporinases, extended-spectrum enzymes; groups A–D). 2) ↓ penetration through the membrane to reach wall enzymes (Gram −ve outer layer; drug must diffuse through porins) ± active efflux pumps. 3) Altered target PBPs",
    lesions: "—",
    keyClue:
      "β-lactamase (hydrolyzes the ring) is the major route; also ↓ porin penetration and altered PBPs",
    pearls:
      "Gram −ve resist more easily because of the extra outer membrane layer the drug must cross",
  },
  {
    id: 3,
    name: "Natural Penicillins (Penicillin G & V)",
    suit: "betalactam",
    tier: 1,
    etiology: "Natural penicillin",
    species: "Initial infections & leptospirosis",
    mechanism:
      "Narrow spectrum. Penicillin G is inactivated by acidic gastric pH → NOT given orally (parenteral). Penicillin V is acid-stable → oral (limited use). 1 mg penicillin sodium = 1667 units",
    lesions: "Hypersensitivity",
    keyClue:
      "Peni G = inactivated by acid, must be parenteral; Peni V = acid-stable, oral",
    pearls: "Classic use: leptospirosis and early infections",
  },
  {
    id: 4,
    name: "Aminopenicillins (Ampicillin, Amoxicillin)",
    suit: "betalactam",
    tier: 2,
    etiology: "Aminopenicillin (extended-spectrum penicillin)",
    species: "Broad use; oral, parenteral, intramammary",
    mechanism:
      "Broader spectrum than penicillin G. Oral absorption: amoxicillin > ampicillin (ampicillin interacts with food → poor bioavailability in horse + cattle). Ampicillin undergoes biliary excretion + enterohepatic cycling. Often combined with a β-lactamase inhibitor (e.g. clavulanic acid)",
    lesions:
      "GI signs from microflora disruption; hypersensitivity",
    keyClue:
      "Amoxicillin = better oral bioavailability & broader than Peni G; combine with clavulanic acid",
    pearls: "Ampicillin's enterohepatic cycle prolongs gut exposure",
  },
  {
    id: 5,
    name: "Penicillinase-Resistant Penicillins (Cloxacillin)",
    suit: "betalactam",
    tier: 2,
    etiology: "Anti-staphylococcal penicillin",
    species: "Dry-cow mastitis; skin/soft-tissue infections (dogs)",
    mechanism:
      "Resist staphylococcal penicillinase. Poor oral absorption → given intramammary. Cloxacillin benzathine is used for dry cows and skin/soft-tissue infections",
    lesions: "Hypersensitivity",
    keyClue:
      "Anti-staphylococcal, penicillinase-resistant; intramammary (poor PO) — dry-cow therapy",
    pearls: "The drug class to reach for when staph β-lactamase is the problem",
  },
  {
    id: 6,
    name: "Extended-Spectrum Penicillins (Piperacillin)",
    suit: "betalactam",
    tier: 2,
    etiology: "Anti-pseudomonal penicillin",
    species: "Septicemia, gynecological/serious Gram −ve infections",
    mechanism:
      "Anti-pseudomonal. Given IV with a very short half-life → frequent dosing. Treats Gram −ve, usually combined with other drugs. Often paired with tazobactam (a β-lactamase inhibitor)",
    lesions:
      "Hypersensitivity; CNS disturbance at high dose; GI signs from microflora change (Clostridium difficile toxin → colitis)",
    keyClue: "Anti-Pseudomonas, IV, short T½ → frequent dosing",
    pearls: "Reserved for serious resistant Gram −ve infections, in combination",
  },
  {
    id: 7,
    name: "β-Lactamase Inhibitors (Clavulanic Acid)",
    suit: "betalactam",
    tier: 1,
    etiology: "β-lactamase inhibitor ('suicide inhibitor')",
    species: "Co-administered with penicillins",
    mechanism:
      "Clavulanic acid (and tazobactam) bind and IRREVERSIBLY inhibit the β-lactamase enzyme produced by Gram +ve/−ve bacteria — 'suicide inhibitors'. This prevents degradation of the co-administered penicillin",
    lesions: "—",
    keyClue:
      "'Suicide inhibitor' — irreversibly inactivates β-lactamase to protect the partner penicillin",
    pearls: "Clavulanic acid is unstable → must be protected from moisture",
  },
  {
    id: 8,
    name: "1st-Generation Cephalosporins",
    suit: "betalactam",
    tier: 2,
    etiology: "1st-gen cephalosporin",
    species: "Mostly Gram +ve (skin, soft tissue)",
    mechanism:
      "Less susceptible to β-lactamase than penicillins. Cover Gram +ve (except MRSA); some Gram −ve such as E. coli. Do NOT treat MRSA, Listeria, or Enterococcus (whole class)",
    lesions: "Hypersensitivity; GI signs on oral dosing",
    keyClue: "Mostly Gram +ve (not MRSA); the cephalosporin floor",
    pearls: "Whole class fails against MRSA, Listeria and Enterococcus",
  },
  {
    id: 9,
    name: "2nd-Generation Cephalosporins (Cefotetan)",
    suit: "betalactam",
    tier: 3,
    etiology: "2nd-gen cephalosporin",
    species: "Anaerobic coverage",
    mechanism:
      "Cefotetan is the most active of the generations against anaerobes. Improved Gram −ve coverage over 1st gen with retained β-lactamase stability",
    lesions: "Hypersensitivity; GI signs",
    keyClue: "Cefotetan = best anaerobic activity among cephalosporins",
    pearls: "Reach for 2nd gen when anaerobes are the target",
  },
  {
    id: 10,
    name: "3rd-Generation Cephalosporins (Ceftiofur)",
    suit: "betalactam",
    tier: 2,
    etiology: "3rd-gen cephalosporin",
    species: "UTI, respiratory, metritis/mastitis, anti-Pseudomonas (food animals)",
    mechanism:
      "Ceftiofur and ceftazidime have LESS activity against Gram +ve than other 3rd-gens but strong Gram −ve reach. Ceftiofur is the exception that DOES undergo hepatic metabolism — its desfuroyl-ceftiofur metabolite carries the antibacterial activity. Crystalline free-acid formulation is released slowly from SC depot; intramammary for drying cattle",
    lesions:
      "High dose in dogs → anemia & thrombocytopenia; false-positive urine glucosuria/proteinuria; GI signs",
    keyClue:
      "Ceftiofur: hepatic metabolism (desfuroyl-ceftiofur is the active metabolite); food-animal Gram −ve",
    pearls: "Most cephalosporins are renally excreted → treat UTIs; ceftiofur is the metabolic outlier",
  },
  {
    id: 11,
    name: "4th-Generation Cephalosporins",
    suit: "betalactam",
    tier: 2,
    etiology: "4th-gen cephalosporin",
    species: "Broad-spectrum; meningitis (penetrates CNS)",
    mechanism:
      "Broad spectrum across Gram +ve and Gram −ve. Widely distributed and penetrate the CNS sufficiently to treat meningitis. Given IM/SC, some oral",
    lesions: "Hypersensitivity; GI signs",
    keyClue: "Broadest cephalosporin spectrum + CNS penetration (meningitis)",
    pearls: "The cephalosporin you escalate to for CNS infections",
  },
  {
    id: 12,
    name: "Carbapenems (Imipenem, Meropenem)",
    suit: "betalactam",
    tier: 3,
    etiology: "Carbapenem β-lactam",
    species: "Serious / multidrug-resistant infections",
    mechanism:
      "Broad-spectrum, bactericidal, parenteral. Resistant to β-lactamases and able to enter porin channels that exclude other drugs. MRSA NOT susceptible. Imipenem has renal toxicity + poor oral absorption → combined with cilastatin (renal enzyme inhibitor). Meropenem is IV/IM/SC, more soluble, treats Pseudomonas, has no nephrotoxic metabolite and less CNS toxicity",
    lesions: "Imipenem → seizures; meropenem → slight hair loss at injection site",
    keyClue:
      "Last-resort β-lactam; imipenem + cilastatin (seizures); meropenem (Pseudomonas, safer)",
    pearls: "Cilastatin blocks renal dehydropeptidase that would otherwise destroy imipenem",
  },

  // ============ GLYCOPEPTIDES & POLYPEPTIDES (2) ============
  {
    id: 13,
    name: "Vancomycin",
    suit: "cellwall",
    tier: 3,
    etiology: "Glycopeptide cell-wall inhibitor",
    species: "Resistant Gram +ve (staph/MRSA), Clostridium, enterococcus",
    mechanism:
      "Time-dependent cell-wall synthesis inhibitor. Cidal on Gram +ve aerobes (staphylococci, MRSA) and anaerobes (Clostridium); bacteriostatic on enterococcus. ALL Gram −ve are resistant. Given IV only, by slow infusion",
    lesions:
      "Histamine-related reactions: pruritus, tachycardia, ± hypotension; nephrotoxicity + ototoxicity (newer formulations safer)",
    keyClue: "MRSA-active, IV-only, slow infusion; ALL Gram −ve resistant",
    pearls: "Not used in food-producing animals; reserve for resistant Gram +ve",
  },
  {
    id: 14,
    name: "Bacitracin & Colistin",
    suit: "cellwall",
    tier: 2,
    etiology: "Polypeptide antibiotic",
    species: "Gram +ve (topical); colistin for systemic Gram −ve",
    mechanism:
      "Bacitracin (natural or semi-synthetic polypeptide) inhibits cell-wall synthesis, covers all Gram +ve, rarely meets resistance. Very poor oral absorption; muscle & kidney affinity; excreted unchanged renally → nephrotoxic on systemic use. Only colistin is used systemically",
    lesions:
      "Nephrotoxic; neuromuscular blockade → respiratory paralysis; pain at injection site",
    keyClue:
      "Topical Gram +ve agent (nephrotoxic systemically); colistin is the only systemic member",
    pearls:
      "Well tolerated locally → mastitis, skin, eye, ear infections, enterocolitis",
  },

  // ============ 30S PROTEIN-SYNTHESIS INHIBITORS (7) ============
  {
    id: 15,
    name: "Tetracyclines — Mechanism & Spectrum",
    suit: "ribo30s",
    tier: 2,
    etiology: "30S protein-synthesis inhibitor",
    species: "Broad-spectrum incl. Mycoplasma, Rickettsia, anaerobes",
    mechanism:
      "Bind the 30S subunit → block aminoacyl-tRNA access to the A (acceptor) site on the mRNA-ribosome complex → bacteriostatic. Entry into bacteria needs an energy-dependent uptake process absent in mammals, so affinity for microbial ribosomes ≫ mammalian. Natural = oxytetracycline; semi-synthetic = doxycycline/tetracycline",
    lesions: "See dedicated toxicity card",
    keyClue:
      "30S → block aminoacyl-tRNA at the A site; energy-dependent uptake = selective for bacteria",
    pearls:
      "Broad spectrum + treats Mycoplasma; covers Rickettsia, Staph, Pseudomonas, Bacteroides, Clostridia",
  },
  {
    id: 16,
    name: "Doxycycline",
    suit: "ribo30s",
    tier: 1,
    etiology: "Semi-synthetic tetracycline (preferred)",
    species: "Broadest-use tetracycline",
    mechanism:
      "More lipophilic than the others → broader spectrum and the BEST tetracycline. Undergoes high kidney metabolism but is excreted mainly in bile → intestine (so safest in renal patients). Other tetracyclines (chlortetra-, tetra-, oxytetracycline) are minimally metabolized and excreted renally",
    lesions:
      "Fewer renal adverse effects than other tetracyclines; IV doxycycline is FATAL in horses (sudden cardiac arrhythmias)",
    keyClue: "Most lipophilic, biliary excretion → renal-safe; NEVER give IV in horses",
    pearls: "The 'best' tetracycline — but the equine IV danger is a classic exam trap",
  },
  {
    id: 17,
    name: "Tetracycline Resistance",
    suit: "ribo30s",
    tier: 2,
    etiology: "Acquired resistance — three routes",
    species: "Many bacteria",
    mechanism:
      "1) ↓ intracellular accumulation via efflux or ↓ influx (transport proteins). 2) Ribosomal protection — production of a protein that prevents tetracycline binding, or mutation at the target. 3) Enzymatic inactivation by bacterial enzymes",
    lesions: "—",
    keyClue: "Efflux/↓influx, ribosomal protection protein, or enzymatic inactivation",
    pearls: "Ribosomal-protection proteins are the hallmark tetracycline resistance mechanism",
  },
  {
    id: 18,
    name: "Tetracycline Toxicity",
    suit: "ribo30s",
    tier: 2,
    etiology: "Adverse-effect profile",
    species: "GI; cats; horses; growing animals",
    mechanism:
      "Oral absorption ↓ with food (chelation by divalent cations) — except doxycycline. PO higher in ruminants because rumen microflora is disrupted. Crosses CNS and placenta; found in milk",
    lesions:
      "GI most common (cats: esophageal stricture; AVOID in horses → colitis). Renal necrosis with high dose/temperature or outdated drug (dogs + ruminants). Rapid IV → hypotension & collapse. Chelates bone & teeth → stops long-bone growth. Superinfection; hypersensitivity (esp. cats)",
    keyClue:
      "Chelation (food ↓ absorption, binds bone/teeth); GI is #1; avoid in horses (colitis)",
    pearls: "Tooth/bone chelation = contraindicated in pregnancy & young animals",
  },
  {
    id: 19,
    name: "Aminoglycosides — Mechanism",
    suit: "ribo30s",
    tier: 2,
    etiology: "30S protein-synthesis inhibitor",
    species: "Drug of choice for aerobic Gram −ve",
    mechanism:
      "Bactericidal. Polycations → no oral absorption, limited distribution, excreted rapidly unchanged renally. Drug diffuses through porin channels of the Gram −ve outer membrane, then an O₂-dependent transport process carries it inside, where it irreversibly binds 30S proteins → corrupts mRNA translation. Extended-spectrum members (gentamicin, amikacin, tobramycin) act on Pseudomonas",
    lesions:
      "Class-wide nephrotoxicity & ototoxicity",
    keyClue:
      "Aerobic Gram −ve DOC; O₂-dependent uptake → irreversible 30S binding; nephro/oto-toxic",
    pearls:
      "Limited Gram +ve action → shouldn't be used as single agents against Gram +ve",
  },
  {
    id: 20,
    name: "Aminoglycoside PAE & Once-Daily Dosing",
    suit: "ribo30s",
    tier: 3,
    etiology: "Pharmacodynamic principle",
    species: "All",
    mechanism:
      "Killing is CONCENTRATION-dependent and there is a marked post-antibiotic effect (PAE) — bactericidal action persists even after serum levels fall below MIC. So one big dose given less frequently works as well or better than multiple small doses",
    lesions: "Once-daily dosing also reduces nephro/oto-toxicity risk",
    keyClue: "Concentration-dependent + long PAE → one big dose, less often",
    pearls: "Opposite dosing philosophy to the time-dependent β-lactams",
  },
  {
    id: 21,
    name: "Aminoglycoside Resistance & Amikacin",
    suit: "ribo30s",
    tier: 3,
    etiology: "Acquired resistance — four routes",
    species: "Amikacin = the resistance-beating member",
    mechanism:
      "1) Failure of drug to penetrate. 2) Strict/facultative anaerobes resist because uptake is O₂-dependent (transport blocked by divalent cations, hyperosmolarity, ↓ pH, anaerobic conditions). 3) Low ribosomal affinity. 4) Inactivation by modifying enzymes (MOST common). Amikacin is modified by only a few enzymes → active against gentamicin-resistant strains",
    lesions: "Class nephro/oto-toxicity",
    keyClue:
      "Modifying enzymes = #1 resistance; amikacin escapes most of them → beats gentamicin-resistant bugs",
    pearls: "Anaerobes are intrinsically resistant — uptake needs oxygen",
  },

  // ============ 50S PROTEIN-SYNTHESIS INHIBITORS (6) ============
  {
    id: 22,
    name: "Macrolides (Erythromycin)",
    suit: "ribo50s",
    tier: 2,
    etiology: "50S protein-synthesis inhibitor",
    species: "Gram +ve; intracellular organisms",
    mechanism:
      "Bind reversibly to the 50S subunit, near the chloramphenicol binding site → bacteriostatic (cidal at high concentration). Do not cross the intact membrane of Gram −ve well; erythromycin does NOT penetrate the BBB. Erythromycin is a CYP450 INHIBITOR",
    lesions:
      "Erythromycin → GI signs & vomiting (prokinetic motilin effect); diarrhea in horses",
    keyClue:
      "50S (near chloramphenicol site), bacteriostatic, Gram +ve; erythromycin = CYP450 INHIBITOR",
    pearls:
      "Phenobarbital induces erythromycin metabolism; macrolide + lincosamide share cross-resistance",
  },
  {
    id: 23,
    name: "Newer Macrolides (Clarithromycin, Tilmicosin)",
    suit: "ribo50s",
    tier: 3,
    etiology: "Newer-generation macrolides",
    species: "Rhodococcus equi (foals); cattle respiratory (tilmicosin)",
    mechanism:
      "Clarithromycin treats Rhodococcus equi pneumonia in foals (given PO with food). Tilmicosin has a long persistent effect and is immunomodulatory; treats Mycoplasma. Macrolides distribute well into tissues (low CNS)",
    lesions:
      "Tilmicosin is CARDIOTOXIC — fatal injection-site/cardiac reactions (notably in pigs and humans)",
    keyClue: "Clarithromycin → R. equi in foals; tilmicosin → cattle respiratory, cardiotoxic",
    pearls: "R. equi foal pneumonia is the classic clarithromycin (± rifampin) indication",
  },
  {
    id: 24,
    name: "Lincosamides (Clindamycin, Lincomycin)",
    suit: "ribo50s",
    tier: 2,
    etiology: "50S protein-synthesis inhibitor",
    species: "Anaerobes; Gram +ve; bone/soft tissue",
    mechanism:
      "Bacteriostatic; aerobes are NOT affected. Bind the 50S subunit at the same region as macrolides and chloramphenicol. Clindamycin has good anaerobic activity and is NOT a substrate for macrolide efflux pumps → macrolide-resistant strains may stay clindamycin-susceptible. Accumulates in tissues but flow into CNS is low. Liver metabolism (cats), fecal/GI excretion (dogs)",
    lesions: "GI disturbance; ribosomal methylation can confer cross-resistance with macrolides",
    keyClue:
      "Anaerobe-active, 50S; escapes macrolide efflux pumps but methylation gives cross-resistance",
    pearls: "Penetrates bone well — a go-to for osteomyelitis/dental infections",
  },
  {
    id: 25,
    name: "Chloramphenicol — Mechanism & Spectrum",
    suit: "ribo50s",
    tier: 2,
    etiology: "50S protein-synthesis inhibitor",
    species: "Broad-spectrum; lipophilic (CNS, eye, prostate)",
    mechanism:
      "Binds reversibly to the 50S subunit and interferes with peptidyl-transferase activity → blocks peptide-bond formation; bacteriostatic. Highly lipophilic → large volume of distribution (penetrates CNS, eye). Also inhibits mammalian mitochondrial ribosomes (basis of its toxicity) and is a CYP450 INHIBITOR",
    lesions: "See dedicated toxicity card",
    keyClue:
      "50S peptidyl-transferase block; very lipophilic (CNS); CYP450 inhibitor; hits mammalian mito ribosomes too",
    pearls:
      "Antagonistic with macrolides — they compete for the same/overlapping 50S site",
  },
  {
    id: 26,
    name: "Chloramphenicol Toxicity & Florfenicol",
    suit: "ribo50s",
    tier: 3,
    etiology: "Adverse-effect profile + the food-animal analog",
    species: "Cats most sensitive (↓ glucuronidation)",
    mechanism:
      "Two bone-marrow toxicities: (a) dose-related, reversible ↓ protein synthesis in erythroid precursors → anemia; (b) idiosyncratic, irreversible APLASTIC ANEMIA → fatal. Cats are most sensitive due to deficient glucuronidation. Florfenicol is the food-animal analog — it lacks the nitro group, so it does NOT cause aplastic anemia and resists acetylation-based inactivation",
    lesions:
      "Anemia, fatal aplastic anemia, GI signs (dogs); florfenicol → diarrhea, injection-site irritation",
    keyClue:
      "Dose-related (reversible) vs idiosyncratic APLASTIC anemia (fatal); florfenicol = food-animal, no aplastic anemia",
    pearls:
      "Chloramphenicol is banned in food animals → florfenicol fills that niche",
  },
  {
    id: 27,
    name: "Spectinomycin",
    suit: "ribo50s",
    tier: 2,
    etiology: "Aminocyclitol (aminoglycoside-like)",
    species: "Food-producing animals (pigs); E. coli",
    mechanism:
      "Has a non-glycosidic nucleus like the aminoglycosides → similar pharmacokinetics, but bacteriostatic with a different action → can be used safely with respect to the kidneys (avoids the AG nephro/oto-toxicity)",
    lesions: "Markedly less nephro/oto-toxic than true aminoglycosides",
    keyClue: "AG-like PK but bacteriostatic & kidney-safe; pigs, E. coli",
    pearls: "Use it where you'd want an AG profile without the renal/otic toxicity",
  },

  // ============ NUCLEIC-ACID INHIBITORS (4) ============
  {
    id: 28,
    name: "Fluoroquinolones — Mechanism",
    suit: "nucleic",
    tier: 2,
    etiology: "Nucleic-acid synthesis inhibitor",
    species: "Broad Gram −ve & Gram +ve; intracellular organisms",
    mechanism:
      "Rapidly bactericidal and CONCENTRATION-dependent. Inhibit bacterial DNA gyrase (topoisomerase II) and topoisomerase IV → block DNA replication and transcription. The drug-enzyme-DNA complex remains on the DNA strand",
    lesions: "See resistance/toxicity card",
    keyClue: "Inhibit DNA gyrase (topo II) + topo IV → concentration-dependent cidal",
    pearls:
      "Covers Salmonella, Pseudomonas, staph, MRSA and intracellular Mycoplasma/Mycobacterium",
  },
  {
    id: 29,
    name: "Enrofloxacin",
    suit: "nucleic",
    tier: 2,
    etiology: "Veterinary fluoroquinolone",
    species: "Dogs, cats, food animals, reptiles",
    mechanism:
      "The flagship veterinary fluoroquinolone. Metabolized to ciprofloxacin, its active metabolite. Oral absorption is delayed by food and reduced by divalent cations / ↓ pH (chelation, like tetracyclines). Distributes into most tissues; renal + diffusion excretion",
    lesions:
      "Retinal toxicity → blindness in CATS (dose-dependent) → reduce/avoid high doses in cats",
    keyClue:
      "Enrofloxacin → ciprofloxacin (active metabolite); high doses blind cats (retinal toxicity)",
    pearls: "Off-label uses span pyoderma (dogs), UTIs, and reptile Salmonella",
  },
  {
    id: 30,
    name: "Fluoroquinolone Resistance & Toxicity",
    suit: "nucleic",
    tier: 3,
    etiology: "Resistance + adverse effects",
    species: "Young/large-breed dogs; cats; pregnancy",
    mechanism:
      "Resistance develops through a GRADUAL multi-step process: mutations in the genes coding the target enzymes (gyrase/topo), plus active efflux. Generally do NOT disrupt the GI microflora",
    lesions:
      "Arthropathy — cartilage damage in young, large-breed dogs (CONTRAINDICATED in growth/pregnancy); retinal toxicity in cats; nephro/oto/ocular effects",
    keyClue:
      "Stepwise (gradual) resistance; cartilage damage in growing dogs → avoid in young/pregnant",
    pearls: "Cartilage/arthropathy risk is the defining safety limit of the class",
  },
  {
    id: 31,
    name: "Rifampin",
    suit: "nucleic",
    tier: 2,
    etiology: "Nucleic-acid (RNA polymerase) inhibitor",
    species: "Gram +ve & Gram −ve; foals (with macrolides)",
    mechanism:
      "Inhibits bacterial DNA-dependent RNA polymerase → blocks transcription. Static or cidal. Strong CYP450 INDUCER. Bacteriostatic, better in dogs than horses; turns body fluids orange-red",
    lesions: "CYP450 induction → many drug interactions; orange-red secretions",
    keyClue:
      "Blocks RNA polymerase; CYP450 INDUCER; orange-red fluids; never use alone (resistance)",
    pearls:
      "Used WITH a macrolide (e.g. for R. equi) because monotherapy rapidly selects resistance",
  },

  // ============ FOLATE ANTAGONISTS (5) ============
  {
    id: 32,
    name: "Sulfonamides — Mechanism",
    suit: "folate",
    tier: 2,
    etiology: "Folate-synthesis inhibitor",
    species: "Bacteria that synthesize their own folate",
    mechanism:
      "Structural analogs of PABA (para-aminobenzoic acid) that competitively inhibit dihydropteroate synthase → block dihydropteroic acid, the immediate precursor of folic acid. Bacteriostatic. Bacteria that use PREFORMED folate (and mammalian cells) are unaffected → selective toxicity. Weak acids, poorly water-soluble → crystallize in urine",
    lesions: "Crystalluria (see toxicity card)",
    keyClue:
      "PABA analog → inhibits dihydropteroate synthase; only hits bacteria that MAKE their own folate",
    pearls: "Therapeutic effect is delayed (takes several doses) because existing folate must deplete",
  },
  {
    id: 33,
    name: "Potentiated Sulfonamides (TMP-Sulfa)",
    suit: "folate",
    tier: 2,
    etiology: "Trimethoprim + sulfonamide combination",
    species: "Salmonella (susceptible); Staph & E. coli (moderate)",
    mechanism:
      "Trimethoprim selectively inhibits dihydrofolate reductase (DHFR), which converts dihydrofolic → tetrahydrofolic acid. Affinity for microbial DHFR ≫ mammalian. Sequential blockade of the SAME pathway (DHPS then DHFR) → synergistic, becomes BACTERICIDAL in combination (↓ MIC)",
    lesions: "See toxicity card",
    keyClue:
      "Sulfa blocks DHPS, TMP blocks DHFR → sequential blockade → bactericidal synergy",
    pearls:
      "Resistant: Pseudomonas, Clostridium, Bacteroides (anaerobes); the combo turns static drugs cidal",
  },
  {
    id: 34,
    name: "Sulfonamide Resistance",
    suit: "folate",
    tier: 3,
    etiology: "Acquired resistance",
    species: "Many bacteria after years of use",
    mechanism:
      "To the sulfa: 1) ↓ drug influx (↓ permeability or ↑ efflux). 2) ↓ affinity of dihydropteroate synthase for the drug. 3) ↑ PABA production (out-competes the analog). 4) Alternative metabolic pathway. To trimethoprim: overexpression of DHFR, or modification of DHFR with ↓ drug affinity",
    lesions: "—",
    keyClue:
      "Sulfa: ↑PABA / altered DHPS / efflux. TMP: overexpressed or modified DHFR",
    pearls: "Increased PABA production is the classic sulfonamide-specific escape",
  },
  {
    id: 35,
    name: "Sulfonamide Pharmacokinetics",
    suit: "folate",
    tier: 2,
    etiology: "Disposition",
    species: "Faster absorption in dogs, delayed in ruminants",
    mechanism:
      "Distribute to all tissues including CNS; appear in milk at therapeutic levels. Metabolized faster in herbivores by acetylation → metabolites are inactive AND nephrotoxic. Excreted in urine (parent or metabolite); ↓ urine pH → ↑ half-life. Enteric sulfas stay in feces",
    lesions: "Acetylated metabolites are nephrotoxic; topical use delays wound healing",
    keyClue:
      "Acetylation in herbivores → inactive but nephrotoxic metabolites; acidic urine prolongs T½",
    pearls: "Wide tissue + CNS distribution is why sulfas reach so many infection sites",
  },
  {
    id: 36,
    name: "Sulfonamide Toxicity",
    suit: "folate",
    tier: 3,
    etiology: "Adverse-effect profile",
    species: "Dogs (esp. Doberman); rats; food animals",
    mechanism:
      "Multiple organ toxicities driven by crystallization, hypersensitivity, and metabolite accumulation",
    lesions:
      "Crystalluria/hematuria/renal blockage (precipitation in tubules — minimize with hydration + alkalinized urine; sulfadiazine is least soluble → avoid). Keratoconjunctivitis sicca / dry eye (reversible). Hypersensitivity (Dobermans, from sulfadiazine). Hepatic necrosis (TMP-sulfa, dogs). Hypoprothrombinemia (sulfaquinoxaline → treat with vitamin K1 4–7 days). Folate-deficiency anemia. Carcinogenesis: sulfamethazine → thyroid cancer in rats. Hypothyroidism (sulfamethoxazole/diazine). Skin eruptions; GI flora disruption",
    keyClue:
      "Crystalluria (alkalinize/hydrate), KCS dry eye, Doberman hypersensitivity, hypoprothrombinemia → vit K1",
    pearls: "Sulfadiazine is the least soluble → the worst crystalluria offender; avoid it",
  },

  // ============ β-LACTAMS — individual drugs & concepts (16) ============
  {
    id: 37,
    name: "Procaine & Benzathine Penicillin G",
    suit: "betalactam",
    tier: 2,
    etiology: "Depot (repository) penicillin G salts",
    species: "Large animals — prolonged IM cover",
    mechanism:
      "Insoluble salts injected IM form a depot that releases penicillin G slowly → prolonged but LOW plasma levels. Procaine = shorter duration (~24 h); benzathine = longest but sub-therapeutic for many pathogens",
    lesions:
      "Procaine reactions (excitement/ataxia) if given IV accidentally; injection-site reactions; never give IV",
    keyClue: "Depot IM penicillin G — procaine (short) vs benzathine (long, low levels)",
    pearls: "Benzathine's low levels make it a poor choice for serious infections despite long duration",
  },
  {
    id: 38,
    name: "Amoxicillin",
    suit: "betalactam",
    tier: 1,
    etiology: "Aminopenicillin",
    species: "Small animals, oral — UTI, soft tissue, respiratory",
    mechanism:
      "Aminopenicillin with BETTER oral bioavailability than ampicillin and less food interference. Broader Gram −ve reach than penicillin G; still β-lactamase-susceptible",
    lesions: "GI upset; hypersensitivity",
    keyClue: "Best-absorbed oral aminopenicillin (food matters less than ampicillin)",
    pearls: "The everyday oral penicillin in small-animal practice",
  },
  {
    id: 39,
    name: "Amoxicillin–Clavulanate (Clavamox)",
    suit: "betalactam",
    tier: 1,
    etiology: "Aminopenicillin + β-lactamase inhibitor",
    species: "Small animals — skin, soft tissue, UTI, bite wounds",
    mechanism:
      "Clavulanic acid irreversibly inactivates β-lactamase → restores amoxicillin activity against penicillinase-producing staph, E. coli, Pasteurella, anaerobes",
    lesions: "GI upset (clavulanate component); hypersensitivity",
    keyClue: "Amoxicillin protected by clavulanate → covers β-lactamase producers",
    pearls: "First-line for many small-animal skin and soft-tissue infections",
  },
  {
    id: 40,
    name: "Ampicillin",
    suit: "betalactam",
    tier: 1,
    etiology: "Aminopenicillin",
    species: "Parenteral broad cover; food-animal & equine use",
    mechanism:
      "Aminopenicillin; oral absorption is poor and reduced by food → often given parenterally. Biliary excretion + enterohepatic cycling. β-lactamase-susceptible",
    lesions: "GI flora disruption; hypersensitivity",
    keyClue: "Ampicillin = poorer oral bioavailability than amoxicillin; food interferes",
    pearls: "Choose amoxicillin when oral dosing matters",
  },
  {
    id: 41,
    name: "Ticarcillin",
    suit: "betalactam",
    tier: 3,
    etiology: "Carboxypenicillin (antipseudomonal)",
    species: "Pseudomonas; equine intrauterine infusion",
    mechanism:
      "Antipseudomonal penicillin; often combined with clavulanate (Timentin). Short half-life → frequent dosing. Used as intrauterine infusion in mares for endometritis",
    lesions: "Hypersensitivity; high sodium load; platelet dysfunction at high dose",
    keyClue: "Antipseudomonal carboxypenicillin; mare intrauterine infusion",
    pearls: "Same anti-Pseudomonas niche as piperacillin",
  },
  {
    id: 42,
    name: "Cefazolin",
    suit: "betalactam",
    tier: 2,
    etiology: "1st-generation cephalosporin (parenteral)",
    species: "Surgical prophylaxis; Gram +ve skin/soft tissue",
    mechanism:
      "Parenteral 1st-gen cephalosporin; predictable Gram +ve cover (not MRSA), some E. coli/Proteus/Klebsiella. Renally excreted, short half-life",
    lesions: "Hypersensitivity; pain on IM injection",
    keyClue: "The go-to surgical-prophylaxis cephalosporin (IV, perioperative)",
    pearls: "Re-dose intra-operatively in long surgeries (short T½)",
  },
  {
    id: 43,
    name: "Cephalexin",
    suit: "betalactam",
    tier: 1,
    etiology: "1st-generation cephalosporin (oral)",
    species: "Canine pyoderma; Gram +ve skin/soft tissue",
    mechanism:
      "Oral 1st-gen cephalosporin; reliable Staphylococcus pseudintermedius cover → workhorse for canine pyoderma. Renally excreted",
    lesions: "GI upset; hypersensitivity",
    keyClue: "Oral 1st-gen → canine pyoderma first-line",
    pearls: "Cefadroxil is the close oral cousin",
  },
  {
    id: 44,
    name: "Cefovecin (Convenia)",
    suit: "betalactam",
    tier: 2,
    etiology: "Long-acting 3rd-generation cephalosporin",
    species: "Dogs & cats — skin/soft tissue, UTI",
    mechanism:
      "Single SC injection gives ~14 days of cover due to extremely high protein binding and slow elimination → bypasses owner compliance issues",
    lesions: "Hypersensitivity; prolonged exposure if adverse reaction (can't withdraw the depot)",
    keyClue: "One SC shot = ~2 weeks of antibiotic (compliance-proof)",
    pearls: "Convenience drug — the long tail is a downside if a reaction occurs",
  },
  {
    id: 45,
    name: "Cefpodoxime Proxetil (Simplicef)",
    suit: "betalactam",
    tier: 2,
    etiology: "Oral 3rd-generation cephalosporin (prodrug ester)",
    species: "Dogs — skin/soft tissue infections",
    mechanism:
      "Prodrug ester hydrolyzed to active cefpodoxime after absorption. Once-daily oral dosing; broader Gram −ve than 1st-gen",
    lesions: "GI upset; hypersensitivity",
    keyClue: "Once-daily oral 3rd-gen for canine pyoderma",
    pearls: "Convenient once-daily alternative to cephalexin",
  },
  {
    id: 46,
    name: "Ceftazidime",
    suit: "betalactam",
    tier: 3,
    etiology: "3rd-generation cephalosporin (antipseudomonal)",
    species: "Pseudomonas; serious Gram −ve",
    mechanism:
      "3rd-gen with strong anti-Pseudomonas activity but WEAKER Gram +ve than other 3rd-gens. Penetrates CSF",
    lesions: "Hypersensitivity; selects resistant organisms with overuse",
    keyClue: "The antipseudomonal 3rd-gen cephalosporin",
    pearls: "Reserve for documented Pseudomonas — preserve activity",
  },
  {
    id: 47,
    name: "Cefquinome",
    suit: "betalactam",
    tier: 3,
    etiology: "4th-generation cephalosporin (veterinary)",
    species: "Cattle/pigs/horses — respiratory, mastitis, foal septicemia",
    mechanism:
      "Veterinary 4th-gen: broad Gram +ve AND Gram −ve, resists many β-lactamases, penetrates well. Zwitterionic → rapid cell entry",
    lesions: "Hypersensitivity; critically-important-antimicrobial stewardship concerns",
    keyClue: "Veterinary 4th-gen — broadest cephalosporin cover",
    pearls: "Flagged as a highest-priority critically important antimicrobial → use sparingly",
  },
  {
    id: 48,
    name: "Aztreonam (Monobactam)",
    suit: "betalactam",
    tier: 3,
    etiology: "Monobactam β-lactam",
    species: "Aerobic Gram −ve only (incl. Pseudomonas)",
    mechanism:
      "Monocyclic β-lactam binding PBP3 of aerobic Gram −ve bacteria ONLY. No activity against Gram +ve or anaerobes. Little cross-reactivity → safe in penicillin allergy",
    lesions: "Generally well tolerated; minimal hypersensitivity cross-reaction",
    keyClue: "Gram −ve-only β-lactam; safe in penicillin-allergic patients",
    pearls: "Narrow by design — the β-lactam for penicillin-allergic cases",
  },
  {
    id: 49,
    name: "Imipenem–Cilastatin",
    suit: "betalactam",
    tier: 3,
    etiology: "Carbapenem + dehydropeptidase inhibitor",
    species: "Serious multidrug-resistant Gram −ve infections",
    mechanism:
      "Imipenem is degraded by renal dehydropeptidase-I → coadministered with CILASTATIN, which blocks that enzyme and prevents formation of a nephrotoxic metabolite",
    lesions: "Seizures (CNS, especially with renal impairment or high dose)",
    keyClue: "Cilastatin protects imipenem from renal dehydropeptidase; watch for seizures",
    pearls: "Meropenem needs no cilastatin and has less seizure risk",
  },
  {
    id: 50,
    name: "ESBL & AmpC β-Lactamases",
    suit: "betalactam",
    tier: 3,
    etiology: "Resistance enzyme classes",
    species: "Enterobacteriaceae (E. coli, Klebsiella)",
    mechanism:
      "Extended-spectrum β-lactamases (ESBL) hydrolyze most penicillins + cephalosporins (incl. 3rd-gen) but are inhibited by clavulanate. AmpC enzymes also hydrolyze cephamycins and are NOT inhibited by clavulanate. Carbapenems usually retain activity",
    lesions: "Treatment failure with cephalosporins; drives carbapenem use",
    keyClue: "ESBL = clavulanate-inhibited; AmpC = clavulanate-resistant; carbapenems still work",
    pearls: "Carbapenemase producers are the next escalation — true last-line resistance",
  },
  {
    id: 51,
    name: "MRSA / MRSP — Altered PBP2a",
    suit: "betalactam",
    tier: 3,
    etiology: "Target-based β-lactam resistance",
    species: "Methicillin-resistant Staphylococcus (aureus / pseudintermedius)",
    mechanism:
      "mecA gene encodes PBP2a, a penicillin-binding protein with LOW affinity for β-lactams → ALL β-lactams fail (including β-lactam/inhibitor combos and most cephalosporins)",
    lesions: "Multidrug resistance; requires culture-guided non-β-lactam therapy",
    keyClue: "mecA → PBP2a → every β-lactam fails (MRSA/MRSP)",
    pearls: "MRSP is the small-animal analog of MRSA — increasingly common in pyoderma",
  },
  {
    id: 52,
    name: "Time-Dependent Killing (T>MIC)",
    suit: "betalactam",
    tier: 2,
    etiology: "PK/PD principle for β-lactams",
    species: "All β-lactams (and most bacteriostatics)",
    mechanism:
      "Efficacy depends on the TIME plasma concentration stays above MIC (T>MIC), not peak height. Little post-antibiotic effect against Gram −ve → killing stops when levels drop",
    lesions: "Underdosing frequency → therapeutic failure",
    keyClue: "β-lactams = time-dependent → frequent dosing / longer infusions, not big peaks",
    pearls: "Opposite philosophy to aminoglycosides & fluoroquinolones (concentration-dependent)",
  },

  // ============ GLYCOPEPTIDES & POLYPEPTIDES — additional (6) ============
  {
    id: 53,
    name: "Teicoplanin",
    suit: "cellwall",
    tier: 3,
    etiology: "Glycopeptide",
    species: "Resistant Gram +ve (alternative to vancomycin)",
    mechanism:
      "Like vancomycin, binds the D-Ala-D-Ala terminus to block cell-wall cross-linking. Longer half-life → once-daily; can be given IM as well as IV; often better tolerated (less red-man reaction)",
    lesions: "Less histamine-release than vancomycin; nephro/oto-toxicity possible",
    keyClue: "Vancomycin-like but longer-acting and IM-capable",
    pearls: "Same D-Ala-D-Ala target → cross-resistance with vancomycin (VRE)",
  },
  {
    id: 54,
    name: "Polymyxins (Colistin & Polymyxin B)",
    suit: "cellwall",
    tier: 3,
    etiology: "Cationic polypeptide — membrane disruptor",
    species: "Aerobic Gram −ve (incl. Pseudomonas); topical/gut",
    mechanism:
      "Cationic detergent that binds LPS and disrupts the Gram −ve OUTER MEMBRANE → leakage and death. Bactericidal, concentration-dependent. Poorly absorbed orally (used for gut/topical); colistin reserved systemically",
    lesions: "Nephrotoxicity + neurotoxicity systemically; inactivated by purulent debris",
    keyClue: "Detergent action on Gram −ve outer membrane (LPS); colistin = last-resort",
    pearls: "Plasmid mcr-1 colistin resistance is a major public-health concern",
  },
  {
    id: 55,
    name: "Fosfomycin",
    suit: "cellwall",
    tier: 3,
    etiology: "Phosphonic-acid cell-wall inhibitor",
    species: "Gram +ve & Gram −ve; lower UTI",
    mechanism:
      "Inhibits MurA (enolpyruvyl transferase) → blocks the FIRST committed step of peptidoglycan synthesis (earlier than β-lactams). Concentrates in urine",
    lesions: "GI upset; use limited/cautioned in food animals",
    keyClue: "Blocks MurA — earliest step of cell-wall synthesis; urinary concentration",
    pearls: "Different target → no cross-resistance with β-lactams",
  },
  {
    id: 56,
    name: "Vancomycin Resistance (VRE)",
    suit: "cellwall",
    tier: 3,
    etiology: "Target-modification resistance",
    species: "Enterococci (VRE), some staphylococci",
    mechanism:
      "vanA/vanB genes change the peptidoglycan terminus from D-Ala-D-ALA to D-Ala-D-LACTATE → vancomycin can no longer bind → resistance",
    lesions: "Few therapeutic options remain (linezolid, daptomycin)",
    keyClue: "D-Ala-D-Ala → D-Ala-D-LACTATE = vancomycin can't bind (VRE)",
    pearls: "Drives reliance on linezolid / daptomycin / streptogramins",
  },
  {
    id: 57,
    name: "Bacitracin (Zinc Bacitracin)",
    suit: "cellwall",
    tier: 1,
    etiology: "Polypeptide cell-wall inhibitor",
    species: "Gram +ve — topical; historically feed additive",
    mechanism:
      "Blocks dephosphorylation of the lipid carrier (bactoprenol pyrophosphate) that ferries peptidoglycan precursors across the membrane → cell-wall synthesis stalls",
    lesions: "Markedly nephrotoxic systemically → restricted to topical/local use",
    keyClue: "Blocks lipid-carrier recycling; topical Gram +ve only (nephrotoxic IV)",
    pearls: "Common component of triple-antibiotic topical ointments",
  },
  {
    id: 58,
    name: "Daptomycin",
    suit: "cellwall",
    tier: 3,
    etiology: "Cyclic lipopeptide — membrane depolarizer",
    species: "Resistant Gram +ve (MRSA, VRE)",
    mechanism:
      "Calcium-dependent insertion into the Gram +ve membrane → rapid depolarization → bactericidal. INACTIVATED by pulmonary surfactant → NOT used for pneumonia",
    lesions: "Myopathy / ↑ creatine kinase → monitor CK",
    keyClue: "Membrane depolarization; useless in pneumonia (surfactant inactivates it)",
    pearls: "Reserve agent for resistant Gram +ve; not for lung infections",
  },

  // ============ 30S INHIBITORS — individual drugs (11) ============
  {
    id: 59,
    name: "Oxytetracycline",
    suit: "ribo30s",
    tier: 2,
    etiology: "Natural tetracycline",
    species: "Food animals — respiratory, foot rot, anaplasmosis",
    mechanism:
      "Classic broad-spectrum tetracycline; long-acting formulations allow infrequent dosing in cattle. Minimal metabolism, renal excretion. Chelated by divalent cations",
    lesions:
      "Tissue irritation/IV collapse; renal necrosis at high dose; tooth/bone staining",
    keyClue: "Workhorse food-animal tetracycline; long-acting depot formulations",
    pearls: "First-line for anaplasmosis and many cattle respiratory cases",
  },
  {
    id: 60,
    name: "Chlortetracycline",
    suit: "ribo30s",
    tier: 2,
    etiology: "Natural tetracycline",
    species: "Food animals — feed/water medication",
    mechanism:
      "Older tetracycline historically used as a feed/water additive for growth and disease control; broad-spectrum, poorly absorbed orally in monogastrics",
    lesions: "Microflora disruption; resistance selection from feed-grade use",
    keyClue: "The feed-additive tetracycline",
    pearls: "Feed-grade antimicrobial use is increasingly restricted",
  },
  {
    id: 61,
    name: "Minocycline",
    suit: "ribo30s",
    tier: 2,
    etiology: "Semi-synthetic tetracycline",
    species: "Small animals — alternative to doxycycline",
    mechanism:
      "Highly lipophilic like doxycycline → good tissue/CNS penetration, broad spectrum. Used as a doxycycline substitute during shortages",
    lesions: "Vestibular signs; GI upset; tooth discoloration",
    keyClue: "Lipophilic doxycycline-like tetracycline (shortage alternative)",
    pearls: "Shares doxycycline's food-independent absorption advantage",
  },
  {
    id: 62,
    name: "Tetracycline Duration Classes",
    suit: "ribo30s",
    tier: 1,
    etiology: "Classification by half-life",
    species: "All",
    mechanism:
      "Short-acting (tetracycline, oxytetracycline, chlortetracycline) vs long-acting/lipophilic (doxycycline, minocycline). Lipophilicity tracks with spectrum and tissue penetration",
    lesions: "—",
    keyClue: "Short-acting = oxytet/chlortet/tetra; long-acting/lipophilic = doxy/minocycline",
    pearls: "Lipophilic members are better drugs (penetration + biliary excretion)",
  },
  {
    id: 63,
    name: "Gentamicin",
    suit: "ribo30s",
    tier: 2,
    etiology: "Aminoglycoside",
    species: "Aerobic Gram −ve sepsis; topical/ophthalmic",
    mechanism:
      "Workhorse aminoglycoside; bactericidal, concentration-dependent, irreversible 30S binding. Once-daily dosing exploits PAE and limits toxicity",
    lesions: "Nephrotoxicity (proximal tubule) + ototoxicity; neuromuscular blockade",
    keyClue: "The default aminoglycoside; nephrotoxic → once-daily dosing",
    pearls: "Trough levels (not peaks) track with nephrotoxicity risk",
  },
  {
    id: 64,
    name: "Amikacin",
    suit: "ribo30s",
    tier: 2,
    etiology: "Aminoglycoside (semi-synthetic)",
    species: "Gentamicin-resistant Gram −ve; foals; equine joints",
    mechanism:
      "Resists most aminoglycoside-MODIFYING enzymes → active against many gentamicin-resistant strains. Same 30S mechanism and toxicity profile",
    lesions: "Nephro/oto-toxicity (somewhat less than gentamicin)",
    keyClue: "The resistance-beating aminoglycoside (few modifying enzymes touch it)",
    pearls: "Preferred AG in foals and for resistant isolates",
  },
  {
    id: 65,
    name: "Neomycin",
    suit: "ribo30s",
    tier: 2,
    etiology: "Aminoglycoside",
    species: "Topical, ophthalmic, oral gut (NOT systemic)",
    mechanism:
      "Too nephrotoxic/ototoxic for systemic use → restricted to topical preparations and oral dosing for gut decontamination (poorly absorbed)",
    lesions: "Severe nephro/oto-toxicity if absorbed; contact sensitization (topical)",
    keyClue: "Topical/oral-gut only — too toxic to inject",
    pearls: "Common in triple-antibiotic ointments and ear/eye drops",
  },
  {
    id: 66,
    name: "Streptomycin",
    suit: "ribo30s",
    tier: 2,
    etiology: "Aminoglycoside (the first one)",
    species: "Leptospira, Brucella, Francisella; historical TB",
    mechanism:
      "First aminoglycoside; binds 30S. Narrower than newer AGs and widespread resistance limits use. Classic for intracellular zoonotic Gram −ve",
    lesions: "Ototoxicity (esp. VESTIBULAR); nephrotoxicity",
    keyClue: "First AG; leptospirosis/brucellosis/tularemia; vestibular toxicity",
    pearls: "Dihydrostreptomycin is the closely related veterinary salt",
  },
  {
    id: 67,
    name: "Tobramycin",
    suit: "ribo30s",
    tier: 3,
    etiology: "Aminoglycoside",
    species: "Pseudomonas (better than gentamicin); ophthalmic",
    mechanism:
      "Aminoglycoside with enhanced anti-Pseudomonas potency relative to gentamicin; same 30S mechanism and toxicity class",
    lesions: "Nephro/oto-toxicity",
    keyClue: "The anti-Pseudomonas aminoglycoside (ophthalmic favorite)",
    pearls: "Often chosen for resistant Pseudomonas eye infections",
  },
  {
    id: 68,
    name: "Apramycin",
    suit: "ribo30s",
    tier: 3,
    etiology: "Aminoglycoside (aminocyclitol, veterinary-only)",
    species: "Neonatal pigs & calves — enteric E. coli / Salmonella",
    mechanism:
      "Veterinary-only aminoglycoside given orally/in-feed for neonatal Gram −ve enteritis; resists many modifying enzymes",
    lesions: "Nephro/oto-toxicity if absorbed (mostly gut-restricted)",
    keyClue: "Vet-only AG for neonatal pig/calf colibacillosis",
    pearls: "Niche enteric drug — not used in companion animals",
  },
  {
    id: 69,
    name: "Aminoglycoside Toxicity Triad",
    suit: "ribo30s",
    tier: 2,
    etiology: "Class adverse-effect profile",
    species: "All aminoglycosides",
    mechanism:
      "1) NEPHROTOXICITY — proximal tubular accumulation (reversible if caught; correlates with trough, not peak). 2) OTOTOXICITY — cochlear (hearing) + vestibular (balance), often irreversible. 3) NEUROMUSCULAR BLOCKADE — especially with anesthesia/myasthenia",
    lesions: "Renal failure, deafness/ataxia, respiratory paralysis",
    keyClue: "Nephro + oto + neuromuscular blockade; once-daily dosing reduces nephrotoxicity",
    pearls: "Avoid with other nephrotoxins (NSAIDs, furosemide, amphotericin B)",
  },

  // ============ 50S INHIBITORS — additional (14) ============
  {
    id: 70,
    name: "Azithromycin",
    suit: "ribo50s",
    tier: 2,
    etiology: "Azalide macrolide",
    species: "Intracellular pathogens; small animals, foals",
    mechanism:
      "Acid-stable azalide with HUGE tissue accumulation and a very long half-life → short courses, infrequent dosing. Concentrates inside phagocytes → intracellular organisms",
    lesions: "GI upset (less than erythromycin); minimal CYP450 effect vs erythromycin",
    keyClue: "Massive tissue accumulation + long T½ → short, infrequent courses",
    pearls: "Less of a CYP450 inhibitor than erythromycin or clarithromycin",
  },
  {
    id: 71,
    name: "Tylosin",
    suit: "ribo50s",
    tier: 2,
    etiology: "Veterinary macrolide",
    species: "Pigs/poultry (Mycoplasma, Lawsonia); dogs (colitis)",
    mechanism:
      "Veterinary-specific 16-membered macrolide. Treats Mycoplasma and Lawsonia intracellularis (proliferative enteropathy); used for tylosin-responsive diarrhea/colitis in dogs",
    lesions: "GI upset; pain on injection; historically a growth-promoter (now restricted)",
    keyClue: "Vet macrolide → Mycoplasma, Lawsonia, tylosin-responsive canine colitis",
    pearls: "Bitter taste limits oral acceptance in some species",
  },
  {
    id: 72,
    name: "Tilmicosin (Micotil)",
    suit: "ribo50s",
    tier: 3,
    etiology: "Veterinary macrolide",
    species: "Cattle/sheep respiratory (BRD); Mycoplasma",
    mechanism:
      "Long-acting macrolide concentrating in lung; single SC dose for respiratory disease; immunomodulatory",
    lesions:
      "⚠️ CARDIOTOXIC — fatal in PIGS, HORSES, PRIMATES (and humans); IV injection is fatal. Calcium-channel-mediated cardiac toxicity",
    keyClue: "Cattle BRD macrolide — FATAL if injected IV or given to pigs/horses/humans",
    pearls: "Accidental human self-injection is a recognized lethal hazard — never IV",
  },
  {
    id: 73,
    name: "Tulathromycin (Draxxin)",
    suit: "ribo50s",
    tier: 2,
    etiology: "Triamilide macrolide",
    species: "Cattle & swine respiratory disease (BRD/SRD)",
    mechanism:
      "Single SC injection with very long lung persistence → one-shot treatment/metaphylaxis of respiratory disease. Rapid distribution, slow elimination",
    lesions: "Injection-site swelling/pain",
    keyClue: "One-shot, long-acting macrolide for cattle/swine pneumonia",
    pearls: "Metaphylaxis staple in feedlots (single dose convenience)",
  },
  {
    id: 74,
    name: "Gamithromycin & Tildipirosin",
    suit: "ribo50s",
    tier: 3,
    etiology: "Long-acting veterinary macrolides",
    species: "Cattle respiratory disease (BRD)",
    mechanism:
      "Single-dose, lung-concentrating macrolides for treatment and control of BRD; similar profile to tulathromycin",
    lesions: "Injection-site reactions",
    keyClue: "More single-dose BRD macrolides (gamithromycin / tildipirosin)",
    pearls: "Part of the modern long-acting macrolide group for feedlot use",
  },
  {
    id: 75,
    name: "Macrolide Ring Sizes",
    suit: "ribo50s",
    tier: 1,
    etiology: "Structural classification",
    species: "All macrolides",
    mechanism:
      "Macrolides are macrocyclic lactone rings: 14-membered (erythromycin, clarithromycin), 15-membered azalide (azithromycin), 16-membered (tylosin, tilmicosin, tulathromycin). All bind 50S near the chloramphenicol/lincosamide site",
    lesions: "—",
    keyClue: "14-membered (erythro/clarithro), 15 (azithro), 16 (tylosin/tilmicosin)",
    pearls: "Ring size correlates loosely with spectrum and motility side-effects",
  },
  {
    id: 76,
    name: "Clindamycin",
    suit: "ribo50s",
    tier: 1,
    etiology: "Lincosamide",
    species: "Anaerobes, Gram +ve, Toxoplasma; bone/dental",
    mechanism:
      "Lincosamide binding 50S; excellent anaerobe and Staph cover; outstanding BONE penetration. Also treats Toxoplasma and Neospora. Not a substrate for macrolide efflux pumps",
    lesions: "GI upset; esophageal injury in cats if not chased with water",
    keyClue: "Anaerobes + bone + Toxoplasma; great osteomyelitis/dental drug",
    pearls: "Give cats a water/food chase to prevent esophageal stricture",
  },
  {
    id: 77,
    name: "Lincomycin",
    suit: "ribo50s",
    tier: 2,
    etiology: "Lincosamide",
    species: "Swine dysentery; poultry; + spectinomycin combo",
    mechanism:
      "Older lincosamide; Gram +ve and anaerobes. Combined with spectinomycin (Linco-Spectin) for swine/poultry enteric and respiratory disease",
    lesions: "⚠️ FATAL GI toxicity in horses, rabbits, ruminants, rodents (clostridial overgrowth)",
    keyClue: "Swine dysentery; Linco-Spectin combo — NEVER in horses/rabbits/ruminants",
    pearls: "Lincosamides cause fatal enterocolitis in hindgut fermenters",
  },
  {
    id: 78,
    name: "Pirlimycin",
    suit: "ribo50s",
    tier: 3,
    etiology: "Lincosamide (intramammary)",
    species: "Dairy cattle — mastitis",
    mechanism:
      "Lincosamide formulated for intramammary infusion targeting Gram +ve mastitis pathogens (staph, strep)",
    lesions: "Milk withholding; injection-site/udder reactions",
    keyClue: "Intramammary lincosamide for Gram +ve mastitis",
    pearls: "Class effect: good Staph aureus mastitis activity",
  },
  {
    id: 79,
    name: "Tiamulin (Pleuromutilin)",
    suit: "ribo50s",
    tier: 3,
    etiology: "Pleuromutilin (50S inhibitor)",
    species: "Swine dysentery; Mycoplasma (pigs/poultry)",
    mechanism:
      "Binds the 50S peptidyl-transferase center (distinct pleuromutilin pocket). Treats Brachyspira swine dysentery and Mycoplasma",
    lesions:
      "⚠️ FATAL interaction with IONOPHORES (monensin, salinomycin, narasin) — inhibits their metabolism → ionophore toxicosis",
    keyClue: "Swine dysentery/Mycoplasma — NEVER with ionophores (fatal)",
    pearls: "Valnemulin is the related pleuromutilin with the same ionophore danger",
  },
  {
    id: 80,
    name: "Florfenicol",
    suit: "ribo50s",
    tier: 2,
    etiology: "Phenicol (fluorinated chloramphenicol analog)",
    species: "Cattle/swine/fish respiratory disease (BRD)",
    mechanism:
      "Fluorinated chloramphenicol analog binding 50S. Lacks the nitro group → does NOT cause aplastic anemia, and resists acetyltransferase inactivation. Broad-spectrum, lung-penetrating",
    lesions:
      "REVERSIBLE (dose-related) bone-marrow suppression; injection-site lesions; not for lactating dairy; embryotoxic",
    keyClue: "Chloramphenicol analog for food animals — no aplastic anemia, resists acetylation",
    pearls: "Approved in food animals precisely because it avoids the aplastic-anemia risk",
  },
  {
    id: 81,
    name: "Linezolid (Oxazolidinone)",
    suit: "ribo50s",
    tier: 3,
    etiology: "Oxazolidinone",
    species: "Resistant Gram +ve (MRSA, VRE) — reserved",
    mechanism:
      "Binds the 23S rRNA of the 50S subunit and prevents formation of the initiation complex (blocks protein synthesis at the very start). Bacteriostatic vs most Gram +ve",
    lesions: "Myelosuppression (thrombocytopenia) with prolonged use; MAOI → serotonin syndrome risk",
    keyClue: "Blocks the INITIATION complex; reserved for MRSA/VRE",
    pearls: "Critically important human drug → veterinary use discouraged (stewardship)",
  },
  {
    id: 82,
    name: "Streptogramins (Virginiamycin)",
    suit: "ribo50s",
    tier: 3,
    etiology: "Streptogramin",
    species: "Gram +ve; historical growth promoter; equine colitis prevention",
    mechanism:
      "Two synergistic components bind the 50S → bactericidal against Gram +ve. Virginiamycin used in feed; quinupristin/dalfopristin (Synercid) is the human VRE/MRSA streptogramin",
    lesions: "Resistance selection concern (cross-resistance with human streptogramins)",
    keyClue: "Two-component synergistic 50S binders; virginiamycin (vet) / Synercid (human)",
    pearls: "Streptogramin feed use is restricted due to VRE cross-resistance fears",
  },
  {
    id: 83,
    name: "MLSB Cross-Resistance (erm)",
    suit: "ribo50s",
    tier: 3,
    etiology: "Target-modification resistance",
    species: "Gram +ve bacteria",
    mechanism:
      "erm genes methylate the 23S rRNA target shared by Macrolides, Lincosamides, and streptogramin B (MLSB) → simultaneous resistance to all three classes. Can be constitutive or inducible",
    lesions: "One mechanism knocks out three drug classes at once",
    keyClue: "erm methylation of 23S → MLSB cross-resistance (macrolide+lincosamide+strepto B)",
    pearls: "Why macrolide-resistant staph are often clindamycin-resistant too",
  },

  // ============ NUCLEIC-ACID INHIBITORS — additional (11) ============
  {
    id: 84,
    name: "Marbofloxacin",
    suit: "nucleic",
    tier: 2,
    etiology: "Fluoroquinolone (veterinary)",
    species: "Dogs, cats, cattle — soft tissue, UTI, respiratory",
    mechanism:
      "Veterinary FQ; concentration-dependent killing, long half-life → once-daily. Inhibits DNA gyrase/topoisomerase IV. Largely renal excretion",
    lesions: "Cartilage/arthropathy in young dogs; generally better feline retinal safety than enrofloxacin at label doses",
    keyClue: "Once-daily veterinary FQ; safer feline profile than enrofloxacin",
    pearls: "Popular small-animal fluoroquinolone for once-daily dosing",
  },
  {
    id: 85,
    name: "Ciprofloxacin",
    suit: "nucleic",
    tier: 2,
    etiology: "Fluoroquinolone (human; enrofloxacin metabolite)",
    species: "Gram −ve incl. Pseudomonas; ophthalmic",
    mechanism:
      "The active de-ethylated metabolite of enrofloxacin. Strong Gram −ve/Pseudomonas activity. Oral bioavailability is variable/poor in dogs → dosing caution",
    lesions: "Cartilage toxicity; chelation by cations; GI upset",
    keyClue: "Enrofloxacin's active metabolite; erratic oral absorption in dogs",
    pearls: "Cheap human generic, but variable canine bioavailability undercuts it",
  },
  {
    id: 86,
    name: "Pradofloxacin (Veraflox)",
    suit: "nucleic",
    tier: 3,
    etiology: "3rd-generation fluoroquinolone (veterinary)",
    species: "Cats & dogs — incl. ANAEROBE coverage",
    mechanism:
      "Newer FQ with DUAL targeting (gyrase + topo IV) → enhanced potency and added ANAEROBE coverage (unusual for the class). Reduced resistance selection",
    lesions: "Bone-marrow suppression in dogs (limits canine use in some regions); retinal-sparing in cats at label dose",
    keyClue: "Vet FQ with anaerobe coverage; licensed for cats (retinal-safe)",
    pearls: "Dual-target design raises the bar for resistance development",
  },
  {
    id: 87,
    name: "Danofloxacin",
    suit: "nucleic",
    tier: 3,
    etiology: "Fluoroquinolone (veterinary)",
    species: "Cattle respiratory disease (BRD)",
    mechanism:
      "Food-animal FQ concentrating in lung tissue; concentration-dependent killing of Gram −ve respiratory pathogens (Mannheimia, Pasteurella, Histophilus)",
    lesions: "Stewardship-restricted (FQs are highest-priority critically important antimicrobials)",
    keyClue: "Cattle BRD fluoroquinolone (lung-concentrating)",
    pearls: "Food-animal FQ use is tightly regulated/banned in some jurisdictions",
  },
  {
    id: 88,
    name: "Orbifloxacin & Difloxacin",
    suit: "nucleic",
    tier: 3,
    etiology: "Fluoroquinolones (veterinary)",
    species: "Dogs & cats — skin, UTI, soft tissue",
    mechanism:
      "Additional small-animal FQs; difloxacin is excreted largely in BILE/feces (not renal) so it is NOT a good urinary-tract drug, unlike most FQs",
    lesions: "Cartilage toxicity; cation chelation",
    keyClue: "Difloxacin = biliary excretion → poor for UTIs (the FQ exception)",
    pearls: "Most FQs treat UTIs — difloxacin's biliary route is the trap",
  },
  {
    id: 89,
    name: "Fluoroquinolone Generations",
    suit: "nucleic",
    tier: 2,
    etiology: "Spectrum classification",
    species: "All fluoroquinolones",
    mechanism:
      "Newer generations add Gram +ve and anaerobe coverage while keeping Gram −ve. Vet examples span enrofloxacin/marbofloxacin (Gram −ve focus) to pradofloxacin (added anaerobes). All chelated by cations",
    lesions: "Shared class toxicities: cartilage, feline retina, CNS",
    keyClue: "Later generations broaden toward Gram +ve & anaerobes",
    pearls: "Spectrum widens by generation, but cartilage/retinal risks stay class-wide",
  },
  {
    id: 90,
    name: "Metronidazole",
    suit: "nucleic",
    tier: 1,
    etiology: "Nitroimidazole",
    species: "Anaerobes + protozoa (Giardia); GI, hepatic encephalopathy",
    mechanism:
      "PRODRUG: reduced by anaerobic bacteria/protozoa (low redox, ferredoxin) into reactive intermediates that cause DNA strand breaks → bactericidal. Only active where oxygen is absent",
    lesions:
      "Dose-dependent NEUROTOXICITY (vestibular/cerebellar ataxia, nystagmus); GI upset; mutagenic → avoid in food animals",
    keyClue: "Anaerobe/protozoa prodrug → DNA breaks; high-dose → vestibular neurotoxicity",
    pearls: "Classic for Giardia, anaerobic sepsis, and hepatic encephalopathy",
  },
  {
    id: 91,
    name: "Ronidazole",
    suit: "nucleic",
    tier: 3,
    etiology: "Nitroimidazole",
    species: "Cats — Tritrichomonas foetus diarrhea",
    mechanism:
      "Nitroimidazole that is the treatment of choice for feline Tritrichomonas foetus colitis; same anaerobic-activation mechanism as metronidazole",
    lesions: "Neurotoxicity (can be severe in cats); narrow safety margin",
    keyClue: "The drug for feline Tritrichomonas foetus (off-label)",
    pearls: "Neurotoxic margin is tight — dose carefully in cats",
  },
  {
    id: 92,
    name: "Nitrofurantoin",
    suit: "nucleic",
    tier: 2,
    etiology: "Nitrofuran",
    species: "Lower UTI only (dogs/cats)",
    mechanism:
      "Reduced by bacterial enzymes to reactive intermediates that damage DNA/ribosomes/multiple targets → broad and resistance-resistant. Concentrates in URINE only → no systemic/tissue levels",
    lesions: "GI upset; pulmonary/hepatic toxicity (chronic, human); banned in food animals",
    keyClue: "Urinary-only antiseptic — lower UTI, no tissue levels",
    pearls: "Useless for pyelonephritis/systemic infection — it only works in urine",
  },
  {
    id: 93,
    name: "Furazolidone",
    suit: "nucleic",
    tier: 3,
    etiology: "Nitrofuran",
    species: "Enteric infections (Salmonella, E. coli, Giardia)",
    mechanism:
      "Orally administered nitrofuran for enteric Gram −ve and protozoa; multiple DNA-level targets. Also has weak MAO-inhibitor activity",
    lesions: "Mutagenic/carcinogenic → BANNED in food-producing animals",
    keyClue: "Enteric nitrofuran — banned in food animals (mutagenic)",
    pearls: "Nitrofurans share the food-animal ban for carcinogenicity",
  },
  {
    id: 94,
    name: "Novobiocin",
    suit: "nucleic",
    tier: 3,
    etiology: "Aminocoumarin (DNA gyrase B inhibitor)",
    species: "Gram +ve; intramammary (dry-cow) mastitis",
    mechanism:
      "Inhibits the ATPase (B subunit) of DNA gyrase — a different gyrase site than fluoroquinolones. Mainly Gram +ve; combined with penicillin in dry-cow intramammary products",
    lesions: "Rarely used systemically; hypersensitivity",
    keyClue: "Targets gyrase B subunit; dry-cow intramammary Gram +ve drug",
    pearls: "Different gyrase site than FQs → no cross-resistance",
  },

  // ============ FOLATE ANTAGONISTS — individual drugs (6) ============
  {
    id: 95,
    name: "Sulfadiazine",
    suit: "folate",
    tier: 2,
    etiology: "Sulfonamide",
    species: "Potentiated with trimethoprim (TMP-SDZ)",
    mechanism:
      "Common sulfonamide partnered with trimethoprim for sequential folate blockade. LEAST water-soluble → highest crystalluria risk",
    lesions:
      "Crystalluria (worst offender), KCS/dry eye, Doberman hypersensitivity, hepatic necrosis",
    keyClue: "The TMP partner sulfa; least soluble → most crystalluria",
    pearls: "Hydrate and alkalinize urine when using sulfadiazine",
  },
  {
    id: 96,
    name: "Sulfadimethoxine",
    suit: "folate",
    tier: 2,
    etiology: "Long-acting sulfonamide",
    species: "Coccidiosis; potentiated with ormetoprim (Primor)",
    mechanism:
      "Long-acting, more soluble sulfonamide → less crystalluria. Treats coccidiosis; combined with ormetoprim as Primor for broad small-animal infections",
    lesions: "KCS; hypersensitivity; (less crystalluria than sulfadiazine)",
    keyClue: "Long-acting sulfa for coccidiosis; ormetoprim combo = Primor",
    pearls: "More soluble → safer urinary profile than sulfadiazine",
  },
  {
    id: 97,
    name: "Sulfasalazine",
    suit: "folate",
    tier: 3,
    etiology: "Sulfonamide conjugate (sulfapyridine + 5-ASA)",
    species: "Dogs — chronic colitis / IBD",
    mechanism:
      "Colonic bacteria cleave it into sulfapyridine + 5-aminosalicylic acid (5-ASA); the 5-ASA acts as a LOCAL anti-inflammatory in the colon (not an antibacterial role)",
    lesions: "KERATOCONJUNCTIVITIS SICCA (dry eye) — monitor tear production; hypersensitivity",
    keyClue: "Cleaved in colon → 5-ASA anti-inflammatory for IBD; high KCS risk",
    pearls: "Used for its anti-inflammatory 5-ASA, not its antibacterial action",
  },
  {
    id: 98,
    name: "Trimethoprim",
    suit: "folate",
    tier: 1,
    etiology: "Diaminopyrimidine (DHFR inhibitor)",
    species: "Always paired with a sulfonamide",
    mechanism:
      "Selectively inhibits bacterial dihydrofolate reductase (DHFR) — affinity for microbial DHFR ≫ mammalian. Combined with a sulfa for sequential blockade → bactericidal synergy",
    lesions: "Contributes to hypersensitivity/folate-deficiency effects of the combination",
    keyClue: "DHFR inhibitor; the 'potentiating' half of potentiated sulfas",
    pearls: "Sulfa blocks DHPS upstream, TMP blocks DHFR downstream — one-two punch",
  },
  {
    id: 99,
    name: "Ormetoprim",
    suit: "folate",
    tier: 3,
    etiology: "Diaminopyrimidine (DHFR inhibitor)",
    species: "Combined with sulfadimethoxine (Primor)",
    mechanism:
      "Veterinary DHFR inhibitor analogous to trimethoprim; paired with sulfadimethoxine for sequential folate blockade with a longer dosing interval",
    lesions: "Same potentiated-sulfa adverse profile (KCS, hypersensitivity)",
    keyClue: "Trimethoprim's vet cousin; ormetoprim + sulfadimethoxine = Primor",
    pearls: "Longer-acting alternative to TMP-sulfa combinations",
  },
  {
    id: 100,
    name: "Sulfaquinoxaline",
    suit: "folate",
    tier: 3,
    etiology: "Sulfonamide (coccidiostat)",
    species: "Poultry/rabbits — coccidiosis (in water/feed)",
    mechanism:
      "Sulfonamide used as a coccidiostat; antagonizes folate in coccidia. Also antagonizes vitamin K → impairs clotting-factor synthesis",
    lesions:
      "HYPOPROTHROMBINEMIA / hemorrhagic syndrome (vitamin K antagonism) → treat with vitamin K1 for 4–7 days",
    keyClue: "Coccidiostat sulfa → vitamin-K antagonism → bleeding (give vit K1)",
    pearls: "The sulfonamide whose signature toxicity is a clotting defect",
  },
];

export const antimicrobialsDeck = {
  slug: "antimicrobials",
  title: "Veterinary Antimicrobial Pharmacology",
  routePrefix: "/antimicrobials",
  suits: ANTIMICROBIAL_SUITS,
  cards: antimicrobialCards,
  fieldLabels: {
    etiology: "Drug class",
    species: "Target / use",
    mechanism: "Mechanism",
    lesions: "Adverse effects",
    keyClue: "Key clue",
    pearls: "Pearl",
  },
  prompts: {
    identifyNoun: "drug",
    keyClueNoun: "KEY CLUE / distinguishing feature",
    affectsVerb: "is used in which target/context",
    caseFileTitle: "💉 Drug profile",
    diagnoseVerb: "Identify the drug",
  },
  infographics: [
    {
      id: 1,
      title: "Penicillins & β-Lactamase Inhibitors",
      file: "01-penicillins-beta-lactamase",
      suits: ["betalactam"],
    },
    {
      id: 2,
      title: "Cephalosporins & Carbapenems",
      file: "02-cephalosporins-carbapenems",
      suits: ["betalactam"],
    },
    {
      id: 3,
      title: "Glycopeptides & Polypeptides — Vancomycin & Bacitracin",
      file: "03-glycopeptides-polypeptides",
      suits: ["cellwall"],
    },
    {
      id: 4,
      title: "Tetracyclines",
      file: "04-tetracyclines",
      suits: ["ribo30s"],
    },
    {
      id: 5,
      title: "Aminoglycosides & Spectinomycin",
      file: "05-aminoglycosides-spectinomycin",
      suits: ["ribo30s", "ribo50s"],
    },
    {
      id: 6,
      title: "50S Inhibitors — Macrolides, Lincosamides & Chloramphenicol",
      file: "06-protein-synthesis-50s",
      suits: ["ribo50s"],
    },
    {
      id: 7,
      title: "Fluoroquinolones & Rifampin",
      file: "07-fluoroquinolones-rifampin",
      suits: ["nucleic"],
    },
    {
      id: 8,
      title: "Sulfonamides & Trimethoprim",
      file: "08-sulfonamides-trimethoprim",
      suits: ["folate"],
    },
  ],
};
