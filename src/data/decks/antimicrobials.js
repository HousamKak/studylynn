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
};
