#!/usr/bin/env python3
"""Build a solved-MCQ PDF for 'patho-repro-MCQ 2.pdf', grounded in the 8 DS decks.

Each answer cites the exact source (DS file + slide/page). The script FIRST
verifies every citation by confirming the cited slide's extracted text contains
a supporting keyword, prints a PASS/FAIL report, then builds the PDF.

Run:  python scripts/build_repro_mcq_answers.py
Requires: reportlab (PDF) + the page-marked text dumps in .necropsy_work/
"""
import re, glob, sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

# ------------------------------------------------------------------ page text
PAGES = {}
for f in glob.glob(".necropsy_work/DS-*.txt"):
    txt = open(f, encoding="utf-8").read()
    for m in re.finditer(r"===== (DS-[\w-]+) p(\d+) =====\n(.*?)(?=\n===== |\Z)", txt, re.S):
        # normalize whitespace so OCR double-spaces don't break keyword matching
        PAGES[(m.group(1), int(m.group(2)))] = re.sub(r"\s+", " ", m.group(3).lower())

# entry: (num, stem, answer, rationale, cite, verify=[(deck,page,kw)...])
E = [
(1, "Pseudopregnancy in small ruminants is characterized by:",
 "b) main etiology = a corpus luteum persisting 2–5 months  AND  d) uterus with sterile fluid and absence of cotyledons",
 "Pseudo-gestation = gestation that stops abruptly with luteal persistence (2–5 months); abdomen is ENLARGED (not small) with a thin-walled uterus, no cotyledons, sterile fluid, persistent anestrus and high progesterone — so (a) persistent estrus/high estrogen is wrong, (c) small abdomen is wrong.",
 "DS-5, slides 37–38", [("DS-5",37,"2 to 5 months"),("DS-5",38,"cotyledons")]),
(2, "The differential diagnosis of pseudopregnancy is with:",
 "c) Pyometra  (and (a) pregnancy must be ruled out by ultrasound)",
 "The DDx slide for pseudo-gestation lists a distended abdomen, absence of gestation and PYOMETRA (hence the value of ultrasound at 35–40 days). Pyometra is the explicitly listed differential.",
 "DS-5, slide 39", [("DS-5",39,"pyomet")]),
(3, "Treatment of partial uterine/vaginal prolapse in small ruminants aims to:",
 "a) reduce (after antisepsis) and replace the uterus  (a retention vulvar suture/pessary, option b, is the adjunct)",
 "Prolapse management = clean/antisepsis → reduce swelling → replace the organ → U-suture / suture the vulvar lips + antibiotics. Cutting the uterus (c) is wrong; cesarean for non-dilated cervix (d) is unrelated.",
 "DS-7, slide 49 (uterine prolapse); DS-5, slide 30 (vaginal prolapse)", [("DS-7",49,"prolapse"),("DS-5",30,"vulvar lips")]),
(4, "If the amniotic sac has not ruptured:",
 "All four are supported — a) frequent in older mares; b) labour prolonged, fetus may suffocate; c) cervical dilation not occurring properly; d) puncture the sac and extract the fetus",
 "The slide on 'absence of rupture of the amniotic sac' states it is common in horses (esp. older), low amniotic fluid so dilation is poor, labour is prolonged and the fetus can suffocate, and treatment = puncture the sac then extract (oxytocin if uterine inertia).",
 "DS-6, slide 12", [("DS-6",12,"amniotic")]),
(5, "Dystocia due to fetal death is characterized by:",
 "a) the hair pulls out, occurring after 12 h;  c) fetal putrefaction begins 6–12 h post-mortem;  d) hyperthermia and lethargy in the mother  (b is false — risk of acute metritis is HIGH)",
 "Per the fetal-death slide: after 12 h the hair epilates easily (→ acute metritis risk), putrefaction has begun (6–12 h post-mortem), and the dam shows lethargy + hyperthermia.",
 "DS-6, slide 21", [("DS-6",21,"putrefaction")]),
(6, "Symptoms/labs in a bitch with pyometra:",
 "b) leukocytosis and anemia  AND  d) polyuria–polydipsia syndrome  (a and c are false — vulvar discharge is common, movement is difficult)",
 "Canine pyometra (metestrus, 6–8 yr, Enterobacteriaceae ~70%): apathy, anorexia, dehydration, difficulty moving, vomiting/diarrhoea, PU/PD; labs show leukocytosis and anemia.",
 "DS-4, slide 44", [("DS-4",44,"polyuria")]),
(7, "Abortion due to salmonellosis — investigation:",
 "a) search for the bacterium in forage, water and other animals;  b) search the source in genital discharge and feces;  c) search in milk  (a, b, c all listed)  — (d is false: calves DO show pathology, e.g. diarrhoea)",
 "The Salmonella slide lists investigation of the contamination source (fodder, water, other animals), Salmonella search in genital discharge and in feces, and research in milk; calves show hyperthermia + digestive pathology (diarrhoea).",
 "DS-9, slide 26", [("DS-9",26,"salmonella")]),
(8, "Abortive agents that are zoonoses:",
 "a) Brucellosis;  b) Listeriosis and Q fever (food-borne in humans);  d) Leptospirosis  (c BVD is NOT a zoonosis)",
 "The zoonoses slide lists Brucellosis, Q fever, Chlamydophilosis and Leptospirosis, plus food-borne human infections (Salmonellosis, Listeriosis, Q fever). BVD is not zoonotic.",
 "DS-9, slide 8", [("DS-9",8,"zoonoses")]),
(9, "Infectious Bovine Rhinotracheitis (IBR):",
 "c) three forms — genital, abortive and neonatal (scrawny/growth-retarded calf);  d) virus reactivated by glucocorticoids or exertion/stress  (a is inaccurate — entry is respiratory/genital mucosa, not mainly conjunctival)",
 "IBR forms = genital, abortive AND neonatal (scrawny calves); BoHV-1 persists in trigeminal ganglia and is reactivated by glucocorticoids or exertion/stress.",
 "DS-9, slides 34 and 36", [("DS-9",34,"neonatal"),("DS-9",36,"glucocorticoids")]),
(10, "Among non-infectious abortions:",
 "c) traumatic shocks (falls, jostling/stampedes, transrectal exam);  d) nitrates at a dose >100 ppm  (b oleander is NOT listed; a 'genetics' is real but rare)",
 "Non-infectious causes listed: traumatic shocks (falls, stampedes, transrectal exploration), mycotoxins, toxic plants (pine needles/isocupressic acid, gossypol, phytoestrogens), and nitrates >100 ppm. Oleander is not in the list.",
 "DS-9, slides 23–24", [("DS-9",24,"nitrates"),("DS-9",23,"traumatic")]),
(11, "Uterine involution ends:",
 "a) at ~40 days (AI must not precede it)  AND  c) incorrect involution predisposes to metritis  (b is false — no AI before ~day 40)",
 "Involution ends around day 40 and AI should not be performed before; delayed/poor involution predisposes to metritis.",
 "DS-4, slide 4 (and slides 3 & 5)", [("DS-4",4,"day 40")]),
(12, "In acute puerperal metritis:",
 "d) All of these answers are false",
 "Acute puerperal metritis occurs in the 1st–2nd week post-partum (not after 30 days → a false); main germs are Arcanobacterium pyogenes, E. coli and anaerobes (not Aspergillus/Mannheimia → c false); main cause is calving contamination / retained placenta, not bedding changes → b false.",
 "DS-4, slide 7", [("DS-4",7,"arcanobacterium")]),
(13, "Treatment and complications of acute metritis:",
 "a) depend on the general symptoms  AND  c) metroperitonitis is a sign of severe deterioration  (b is false — hysterectomy is for canine pyometra)",
 "Treatment is staged by the general symptoms (none / mild / severe deterioration); metro-peritonitis marks a severe deterioration of the general condition.",
 "DS-4, slides 15–17", [("DS-4",16,"peritonitis")]),
(14, "Abortion caused by Neospora caninum:",
 "c) no treatment available  AND  d) newborn calves show signs of encephalitis  (so they are euthanized)",
 "For Neospora caninum abortion there is NO treatment; calves born are euthanized because they show encephalitis (neuromuscular/CNS lesions).",
 "DS-5, slide 20 (and DS-9 Neospora slides 58–62)", [("DS-5",20,"neospora")]),
(15, "Clinical diagnosis of uterine torsion is based on:",
 "c) history and clinical examination  (the slide also notes degree, direction and location of the torsion)",
 "Diagnosis rests on the medical history and clinical examination, then characterising the torsion (degree, direction, location).",
 "DS-5, slide 21", [("DS-5",21,"clinical examination")]),
(16, "Consequences of dystocia:",
 "b) retained placenta followed by metritis  AND  d) delayed uterine involution  (a is false — milk quantity/quality DECREASE)",
 "Dystocia consequences: lengthened calving–AI interval, infertility/metritis/retained placenta, decreased milk quantity & quality, delayed uterine involution.",
 "DS-6, slide 37", [("DS-6",37,"involution")]),
(17, "Pelvic nerve injury:",
 "a) sciatic crush → hind limbs extended backward (frog/Pieralisi);  c) femoral crush → toe-tip weight-bearing;  d) prolonged recumbency → high mastitis risk  (b is false — the frog position is SCIATIC, not obturator)",
 "Sciatic compression → paraplegia with hind limbs extended backward, frog/Pieralisi position; femoral compression → toe-tip (toe-like) support; prolonged recumbency → pressure sores and mastitis. The obturator gives a sternal/limbs-forward picture, not the frog position.",
 "DS-7, slides 7, 8 and 13", [("DS-7",8,"frog"),("DS-7",13,"toe"),("DS-7",7,"mastitis")]),
(18, "A cesarean section is indicated when:",
 "c) there are irreducible uterine torsions",
 "Cesarean indications include a live valuable calf that cannot be delivered vaginally, IRREDUCIBLE uterine torsion, and irreducible 3rd/4th-degree dystocia. First/second-degree dystocia (d) is not an indication; cervical non-dilation is a contraindication.",
 "DS-7, slide 34", [("DS-7",34,"torsion")]),
(19, "Uterine suture in cesarean section:",
 "d) the buried/subcutaneous running stitch is U-shaped with hidden loops parallel to the edge",
 "1st running stitch = simple penetrating stitch to bring the wound edges together; 2nd = buried U-shaped stitch with hidden loops parallel to the edge to ensure a watertight seal (don't catch fetal membranes). So (a) and (b) swap the roles, (c) is wrong.",
 "DS-7, slide 44", [("DS-7",44,"watertight")]),
(20, "Therapeutic/lab diagnosis and treatment of (fungal) mastitis:",
 "b) rapid, inexpensive staining to detect fungi;  c) frequent oxytocin treatments;  d) intramammary Polymyxin B",
 "These map to fungal mastitis: a fast/cheap stain detects fungi (it does NOT respond to antibiotics), hygienic treatment includes stopping antibiotics + frequent oxytocin, and intramammary options include Polymyxin B, nystatin, etc.",
 "DS-8, slides 36–38", [("DS-8",38,"polymyxin"),("DS-8",36,"staining")]),
(21, "Onset of puberty in heifers is influenced by:",
 "a) under-/insufficient nutrition;  b) presence of diseases;  d) weight gain (body weight)  ('presence of a bull' is not on the puberty-factors slide)",
 "Factors listed: age, nutrition, body weight, diseases, breed. So nutrition, disease and body weight/weight-gain are correct; the bull effect is not in this list.",
 "DS-1-2, slide 11", [("DS-1-2",11,"body weight")]),
(22, "Failure to detect estrus:",
 "a) lack of heat EXPRESSION — individual factors (lameness, production level);  b) lack of heat DETECTION — timing and method (mucus, acceptance of mounting)  (c is false — a dark tie-stall barn IMPAIRS expression/detection)",
 "Heat-expression defects relate to individual factors (lameness, production); detection failures relate to timing/method (mucus, mounting acceptance), season, and tie-stall housing/soil (which hinder, not help).",
 "DS-3, slide 68 (and slide 26)", [("DS-3",68,"expression")]),
(23, "Reliable diagnosis of Early Embryonic Mortality (EDM):",
 "b) progesterone level at insemination and on the following days  (the slide also lists progesterone at 3 weeks and LH q4h; d is false — BCS change since calving IS related)",
 "EDM work-up: plasma progesterone at insemination and the following days (and at ~3 weeks), LH during estrus every 4 h, plus exams for metritis. Option b is the directly listed reliable progesterone strategy.",
 "DS-3, slide 70", [("DS-3",70,"insemination")]),
(24, "The three phases of the follicular wave (cow):",
 "c) (heat,) recruitment → selection → dominance  — i.e. recruitment, then selection, then dominance (option a gives the wrong order)",
 "NOTE: these decks do not lay the wave out as an explicit 3-step list; the standard sequence is recruitment → selection → dominance, and the slides do mention 'recruitment of follicles' and the 'emergence of a new dominant follicle'. Option c is the only choice with the correct order.",
 "Standard physiology; partial support DS-1-2 slide 27 ('emergence of a new dominant follicle') & DS-3 slide 43 ('recruitment of follicles')",
 [("DS-1-2",27,"dominant follicle")]),
(25, "Timing/type of ovulation:",
 "a) spontaneous in canines (dogs)  (cats are INDUCED ovulators, so b and d are wrong; goats are spontaneous, not induced → c wrong)",
 "Per the ovulation table, the cat is an induced ovulator while the dog (canine) ovulates spontaneously.",
 "DS-1-2, slide 36", [("DS-1-2",36,"induced ovulation")]),
(26, "Cervical catheterization is used for:",
 "a) uterine irrigation/lavage;  c) embryo transplantation;  d) intra-uterine antibiotic therapy  (b mastitis is intramammary, not via the cervix)",
 "Passing a catheter through the cervix gives access to the uterus → uterine lavage, embryo transfer and intra-uterine antibiotic therapy. Mastitis treatment is intramammary (teat canal), not cervical.",
 "DS-1-2, slides 57 & 64 (cervix propaedeutics/catheterization)", [("DS-1-2",64,"catheterization")]),
(27, "Diagnosis/treatment of the corpus luteum (persistent):",
 "a) a double examination at an 8–10 day interval is recommended  (c is false — the threshold for persistence is 25 days, not 60)",
 "Persistent CL is confirmed by a double exam 8–10 days apart; if shape/volume/consistency are unchanged for 25 days with anaphrodisia → persistent CL. Improving feeding/management (d) is part of care but the diagnostic criterion is the double exam.",
 "DS-3, slide 24", [("DS-3",24,"8-10 days")]),
(28, "Regarding cyclicity:",
 "d) All of these answers are false",
 "Cattle and pigs are polycyclic and NON-seasonal (so a and b wrong); small ruminants and the mare are seasonally polycyclic, not monocyclic/non-seasonal (so c wrong).",
 "DS-1-2, slides 32–33", [("DS-1-2",32,"polycyclic"),("DS-1-2",33,"polycyclic")]),
(29, "During artificial insemination:",
 "c) the gun is guided into the cervix by immobilizing/fixing it (recto-vaginal technique)  — best answer by standard practice",
 "NOTE: the exact AI-gun technique is NOT described in these 8 decks (the decks discuss AI timing/indications, not gun handling). By standard recto-vaginal practice the cervix is grasped per rectum and the gun threaded through it, with semen deposited in the uterine body just past the cervix. Flagged as not located in the source material.",
 "Not found in DS-1 to DS-9 (standard-practice answer)", []),
(30, "Progesterone maintaining pregnancy:",
 "c) in dogs and cats the corpus luteum is the main source throughout gestation  (a, b, d are false)",
 "Per the species table: cattle → CL first half then placenta; mare → CL first 3 months then placenta; ewe → CL first third; pigs, goats, DOGS and CATS → CL is the primary source throughout gestation.",
 "DS-1-2, slide 35", [("DS-1-2",35,"corpus luteum")]),
(31, "Case (cow, calved last night, T 40.5°C, recumbent, red udder, no milk in 2 front quarters) — hypothesis:",
 "b) Colibacillary (coliform) mastitis",
 "Peripartum onset with severe hyperthermia, marked congestion/redness of the quarter(s), milk retention and recumbency fits acute colibacillary (E. coli) mastitis; gangrenous mastitis would show cyanosis/gangrene and purplish-serous milk, which are not described.",
 "DS-8, slides 25–26", [("DS-8",25,"colibacillary")]),
(32, "Same case — epidemiology of the hypothesis:",
 "c) generally sporadic  (and b) sometimes endemic when there is a bedding/litter problem)",
 "Colibacillary mastitis is generally sporadic but can be endemic when linked to a litter/bedding problem (consistent with the irregular manure scraping in the scenario).",
 "DS-8, slide 26", [("DS-8",26,"sporadic")]),
(33, "Same case — appropriate treatment:",
 "b) treat the shock BEFORE giving antibiotics (to deal with the toxin)",
 "Coliform mastitis = treat shock first (NSAIDs/corticosteroids, fluids); give antibiotics after, avoiding rapidly bactericidal drugs that lyse bacteria and release more endotoxin. (Intramammary antibiotics after disinfection are also used, but shock treatment first is the key principle.)",
 "DS-8, slide 27", [("DS-8",27,"shock")]),
(34, "Same case — management and prevention:",
 "c) regular bedding changes  (litter/environmental hygiene; option b dry-off therapy + daily inspection is also valid)",
 "Environmental/coliform mastitis is a bedding problem → prevention centres on litter/bedding hygiene (regular changes), milking hygiene and machine adjustment.",
 "DS-8, slides 24 & 26", [("DS-8",24,"housing")]),
(35, "Ovarian cysts are favored by extrinsic factors which are:",
 "b) timing and technique of AI;  c) heat detection;  d) housing type and soil type  (a continuous GnRH is iatrogenic, not an 'extrinsic factor' on this list)",
 "The 'extrinsic factors' slide lists breeding time-frame, heat detection, timing/technique of AI, calving interventions, presence of the bull, housing/soil type and thermal stress. (Cyst-specific causes — dietary deficiencies, management, hereditary, endocrine, iatrogenic — are on slide 33.)",
 "DS-3, slide 26 (and slide 33)", [("DS-3",26,"extrinsic")]),
(36, "Diagnostic criteria for torsion — how is it done?",
 "c) a hand is inserted vaginally (after disinfection)",
 "Post-cervical torsion is diagnosed by VAGINAL examination — the hand follows the genital tract and rotates; the vulvar lips may retract (so b is wrong); it is not ultrasound-only (a wrong).",
 "DS-5, slide 24", [("DS-5",24,"cervix")]),
(37, "Checking the degree of torsion:",
 "c) one/two fingers in the neck but the calf cannot be reached → half-turn  AND  d) the hand passes the neck and touches the calf → torsion <90°  (a and b are false)",
 "If the hand passes the cervix and touches the fetus → <90°; if only one/two fingers pass and the fetus is unreachable → half a turn; if the cervix is inaccessible → a full turn.",
 "DS-5, slide 24", [("DS-5",24,"half a turn")]),
(38, "Persistent corpus luteum:",
 "c) to be differentiated from pyometra given that both present with absence of heat (anaphrodisia)",
 "A persistent CL is accompanied by anaphrodisia (absence of heat); pyometra (closed-cervix, with a persistent CL) also presents with anaphrodisia — hence the two must be differentiated. It is NOT a synonym for nymphomania (a). [Option b 'synonym for anaphrodisia' is imprecise — anaphrodisia is the sign, persistent CL is the cause.]",
 "DS-3, slide 14 (and DS-4 slides 37–38, pyometra)", [("DS-3",14,"anaphrodisia"),("DS-4",38,"anaphrodisia")]),
(39, "Subestrus:",
 "b) lack of expression of heat",
 "Subestrus = failure of heat EXPRESSION (or detection) despite genuine cyclic ovarian activity; it is not permanent heat (a, that's nymphomania) and estrus is not truly absent (c).",
 "DS-3, slide 25", [("DS-3",25,"suboestrus")]),
(40, "Transrectal palpation:",
 "b) an essential part of the general (gynecological) clinical examination",
 "Palpation of the genital organs per rectum is a daily, essential procedure in bovine/equine gynaecology — not merely a supplementary parasite test (a).",
 "DS-1-2, slide 88 (and propaedeutics slides 67–75)", [("DS-1-2",88,"daily")]),
(41, "Trophoblastin:",
 "a) the embryonic signal for maternal recognition of pregnancy  AND  c) produced from day 9 (after fertilization)  (b 'day 3' is wrong)",
 "From day 9 the embryo produces trophoblastin — the embryonic signal for maternal recognition of pregnancy.",
 "DS-3, slide 63", [("DS-3",63,"trophoblastine")]),
(42, "During proestrus:",
 "c) a drop in progesterone levels  AND  d) development/emergence of a new dominant follicle  (a is wrong; b estrogen rise is physiologic but the slide specifies the progesterone drop + new follicle)",
 "Proestrus (days 19–21) is characterised by the fall in progesterone (luteolysis) and the emergence of a new dominant follicle.",
 "DS-1-2, slide 27", [("DS-1-2",27,"proestrus")]),
(43, "The estrus phase:",
 "b) characterized by the cow's sexual receptivity  AND  d) duration ~12–18 hours  (a is wrong — estrus is day 0; c is wrong — it's the FOLLICLE that prepares to ovulate, not the CL)",
 "Estrus (day 0): sexual receptivity (accepts mounting); the follicle continues growing and prepares to ovulate; classic estrus duration ~12–18 h.",
 "DS-1-2, slides 26 & 28", [("DS-1-2",28,"12 to 18 hours")]),
(44, "During calving:",
 "c) the amniotic sac is externalized  (a and b are false — the vulva enlarges/becomes edematous and the sacro-sciatic ligaments RELAX)",
 "External signs of parturition: enlarged udder, edematous/supple vulva, relaxation of the sacro-sciatic ligaments, and expulsion (externalization) of the amniotic sac.",
 "DS-6, slides 4–5", [("DS-6",5,"amniotic")]),
(45, "During cesarean section (uterine incision):",
 "b) the straight incision is made on the GREATER curvature (locating/avoiding the cotyledons) to minimize bleeding",
 "Incise on the greater curvature (20–40 cm), feeling along it to locate the cotyledons and avoid cutting them, which minimizes haemorrhage.",
 "DS-7, slide 40", [("DS-7",40,"greater curvature")]),
(46, "During clinical mastitis:",
 "b) noticeable edema/inflammation of the affected quarter  (a and c are false — milk appearance changes and the general condition can be impaired)",
 "Clinical mastitis = changed milk + functional signs + local signs (swelling/edema, heat, redness, pain), and with general signs a febrile syndrome.",
 "DS-8, slides 12 & 21", [("DS-8",21,"inflammation")]),
(47, "Differentiating a corpus luteum from a follicular cyst:",
 "b) on ultrasound the corpus luteum is hyperechoic (more tissue) vs the (anechoic, fluid) follicular cyst  AND  d) the CL maintains pregnancy in some species  (a is reversed; c is wrong)",
 "Cysts are thin/thick-walled fluid (anechoic) formations; the CL is solid tissue (relatively hyperechoic) with a thicker wall criterion on ultrasound. The follicular cyst gives nymphomania (not >3-month anaphrodisia). The CL maintains pregnancy in several species.",
 "DS-3, slide 32 (cyst wall/ultrasound); DS-1-2, slide 35 (CL maintains pregnancy)", [("DS-3",32,"wall"),("DS-1-2",35,"corpus luteum")]),
(48, "Differential diagnosis of metritis:",
 "a) delayed uterine involution;  b) vaginitis or cervicitis;  c) uterine hypertrophy  (all three are listed; d is false)",
 "DDx of metritis includes delayed uterine involution, vaginitis/cervicitis, and uterine hypertrophy (gestation, mucometra/hydrometra), plus cystitis/pyelonephritis as a source of discharge.",
 "DS-4, slides 32–33", [("DS-4",33,"cervicitis")]),
(49, "Sacroiliac desmorrhexia:",
 "a) the female remains recumbent after fetal extraction  AND  b) infiltration and pain at the sacroiliac joint  (c is false — it is rupture of the sacroiliac LIGAMENT, not obturator-nerve damage)",
 "Sacroiliac desmorrhexia = rupture of the sacroiliac ligament from excessive traction/narrow pelvis; the dam stays recumbent after extraction, with infiltration/pain and a palpable gap + crepitus at the sacroiliac joint.",
 "DS-7, slide 11", [("DS-7",11,"sacroiliac")]),
(50, "Fetal-posture correction (figures 1–2–3):",
 "d) 1: correction of shoulder flexion, 2: correction of carpal flexion, 3: correction of head overhang (hooding)",
 "NOTE: image-based question matched to the course's 'correction of malpositions' figures, which show correction of shoulder flexion, carpal flexion and hooding (head overhang) together — matching option d.",
 "DS-6, slide 30 (correction of shoulder flexion / carpal flexion / hooding)", [("DS-6",30,"carpal")]),
]

# ------------------------------------------------------------------ verify
print("=== CITATION VERIFICATION ===")
fails = 0
for num, stem, ans, rat, cite, ver in E:
    if not ver:
        print(f"Q{num:>2}: (no citation to verify — flagged in answer)")
        continue
    oks = []
    for deck, pg, kw in ver:
        txt = PAGES.get((deck, pg), "")
        hit = re.sub(r"\s+", " ", kw.lower()) in txt
        oks.append(hit)
        if not hit:
            fails += 1
            print(f"Q{num:>2}: FAIL  {deck} p{pg}  missing '{kw}'")
    if all(oks):
        print(f"Q{num:>2}: PASS  ({', '.join(f'{d} p{p}' for d,p,_ in ver)})")
print(f"=== {fails} failed checks ===")
if "--verify-only" in sys.argv:
    sys.exit(0)

# ------------------------------------------------------------------ PDF
st = getSampleStyleSheet()
INK = colors.HexColor("#0f1115"); BLUE = colors.HexColor("#1d4ed8"); GREEN = colors.HexColor("#15803d")
GREY = colors.HexColor("#64748b"); LIGHT = colors.HexColor("#eff6ff")
H1 = ParagraphStyle("H1", parent=st["Heading1"], fontName="Helvetica-Bold", fontSize=14, textColor=colors.white, leading=17)
Qn = ParagraphStyle("Qn", parent=st["BodyText"], fontName="Helvetica-Bold", fontSize=9.6, leading=12.4, spaceBefore=7, textColor=INK)
AnS = ParagraphStyle("AnS", parent=st["BodyText"], fontName="Helvetica-Bold", fontSize=9.2, leading=12, textColor=GREEN, leftIndent=6, spaceBefore=1)
Rat = ParagraphStyle("Rat", parent=st["BodyText"], fontName="Helvetica", fontSize=8.6, leading=11.2, leftIndent=6, spaceBefore=1)
Cit = ParagraphStyle("Cit", parent=st["BodyText"], fontName="Helvetica-Oblique", fontSize=8.3, leading=10.8, leftIndent=6, textColor=BLUE, spaceBefore=1, spaceAfter=2)
Small = ParagraphStyle("Small", parent=st["BodyText"], fontName="Helvetica", fontSize=7.7, textColor=GREY)


def esc(s): return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


S = []
title = Table([[Paragraph("PATHOLOGY OF REPRODUCTION — MCQ ANSWER KEY", H1)],
               [Paragraph("Solved &amp; source-referenced from the 8 DS decks (Dr. Majd Abi Haidar)",
                          ParagraphStyle("s", parent=Small, textColor=colors.HexColor("#93c5fd"), fontSize=9.2))]],
              colWidths=[174 * mm])
title.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), INK), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (0, 0), 8),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 8), ("LINEBELOW", (0, 0), (-1, 0), 2, BLUE)]))
S += [title, Spacer(1, 4),
      Paragraph("Each answer states the correct option(s), a short rationale, and the exact source slide. "
                "Several questions are multiple-answer (all correct options are given). Two items (Q24, Q29) "
                "are not explicitly covered by these decks and are flagged.", Small),
      Spacer(1, 2), HRFlowable(width="100%", color=BLUE, thickness=1)]

for num, stem, ans, rat, cite, ver in E:
    block = [Paragraph(f"Q{num}. {esc(stem)}", Qn),
             Paragraph("✓ Answer: " + esc(ans), AnS),
             Paragraph("Why: " + esc(rat), Rat),
             Paragraph("Source: " + esc(cite), Cit)]
    S.append(Table([[block]], colWidths=[176 * mm],
                   style=TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                                     ("TOPPADDING", (0, 0), (-1, -1), 1), ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                                     ("LINEBELOW", (0, 0), (-1, -1), 0.4, colors.HexColor("#dbeafe"))])))

S += [Spacer(1, 6), HRFlowable(width="100%", color=GREY, thickness=0.6),
      Paragraph(f"{len(E)} questions answered · every citation auto-verified against the DS slide text "
                f"({fails} failed checks at build time).", Small)]


def deco(c, d):
    c.saveState(); c.setFont("Helvetica", 7); c.setFillColor(GREY)
    c.drawString(18 * mm, 10 * mm, "Pathology of Reproduction — MCQ Answer Key (sourced from DS-1…DS-9)")
    c.drawRightString(192 * mm, 10 * mm, "p. %d" % d.page)
    c.restoreState()


doc = SimpleDocTemplate("patho-repro-MCQ 2 - SOLVED.pdf", pagesize=A4, leftMargin=17 * mm, rightMargin=17 * mm,
                        topMargin=14 * mm, bottomMargin=14 * mm, title="Pathology of Reproduction MCQ — Answer Key")
doc.build(S, onFirstPage=deco, onLaterPages=deco)
print("built: patho-repro-MCQ 2 - SOLVED.pdf")
