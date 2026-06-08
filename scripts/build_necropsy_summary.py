#!/usr/bin/env python3
"""Build the COMPREHENSIVE study-summary PDF for the Veterinary Necropsy module.

Distills Dr. Ali Choukeir's 253-slide "Veterinary Necropsy" course + the
59-slide organ-system pathology deck into a near-lossless, structured study
document organized by the 7 studylynn phases. Output is a PDF at the repo root
(NOT committed). Regenerate with:  python scripts/build_necropsy_summary.py

Requires: reportlab  (pip install reportlab)
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                ListFlowable, ListItem, HRFlowable, PageBreak, CondPageBreak)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

OUT = "Veterinary Necropsy - Study Summary.pdf"

INK = colors.HexColor("#0f1115")
CRIMSON = colors.HexColor("#dc2626")
SLATE = colors.HexColor("#334155")
LIGHT = colors.HexColor("#f1f5f9")
ACCENT2 = colors.HexColor("#64748b")
GREENBG = colors.HexColor("#ecfdf5")
BLUEBG = colors.HexColor("#eff6ff")
REDBG = colors.HexColor("#fef2f2")
YELLOWBG = colors.HexColor("#fefce8")

styles = getSampleStyleSheet()
H1 = ParagraphStyle("H1", parent=styles["Heading1"], fontName="Helvetica-Bold",
                    fontSize=15, textColor=colors.white, spaceBefore=2, spaceAfter=2, leading=18)
PHASE = ParagraphStyle("PHASE", parent=styles["Heading2"], fontName="Helvetica-Bold",
                       fontSize=13, textColor=colors.white, leading=16)
SUB = ParagraphStyle("SUB", parent=styles["Heading3"], fontName="Helvetica-Bold",
                     fontSize=10.5, textColor=CRIMSON, spaceBefore=8, spaceAfter=2, leading=13)
SUB2 = ParagraphStyle("SUB2", parent=styles["Heading4"], fontName="Helvetica-Bold",
                      fontSize=9.3, textColor=SLATE, spaceBefore=5, spaceAfter=1, leading=12)
BODY = ParagraphStyle("BODY", parent=styles["BodyText"], fontName="Helvetica",
                      fontSize=8.7, leading=11.5, spaceAfter=2, alignment=TA_LEFT)
BULL = ParagraphStyle("BULL", parent=BODY, leftIndent=9, bulletIndent=0, spaceAfter=0.5)
SMALL = ParagraphStyle("SMALL", parent=BODY, fontSize=7.6, textColor=ACCENT2)
CALL = ParagraphStyle("CALL", parent=BODY, fontSize=8.6, leading=11.4)


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def P(text):
    return Paragraph(text, BODY)


def bullets(items, style=BULL):
    return ListFlowable(
        [ListItem(Paragraph(t, style), value="•", leftIndent=11) for t in items],
        bulletType="bullet", start="•", leftIndent=11, spaceBefore=1, spaceAfter=3)


def callout(text, bg, border):
    t = Table([[Paragraph(text, CALL)]], colWidths=[170 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), bg),
                           ("BOX", (0, 0), (-1, -1), 0.7, border),
                           ("LINEBEFORE", (0, 0), (0, -1), 2.2, border),
                           ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                           ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    return t


def key(text):
    return callout("<b>KEY &nbsp;</b>" + text, REDBG, CRIMSON)


def note(text):
    return callout(text, BLUEBG, colors.HexColor("#3b82f6"))


def defn(text):
    return callout(text, GREENBG, colors.HexColor("#10b981"))


def banner(text):
    t = Table([[Paragraph(text, PHASE)]], colWidths=[170 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), INK),
                           ("LINEBELOW", (0, 0), (-1, 0), 2, CRIMSON),
                           ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                           ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
    return [CondPageBreak(40 * mm), Spacer(1, 6), t, Spacer(1, 4)]


def tbl(rows, widths, header=True, fs=8):
    data = [[Paragraph(esc(c) if not c.startswith("<") else c,
                       ParagraphStyle("c", parent=BODY, fontSize=fs, leading=fs + 2.4,
                                      textColor=colors.white if (header and i == 0) else colors.black,
                                      fontName="Helvetica-Bold" if (header and i == 0) else "Helvetica"))
             for c in row] for i, row in enumerate(rows)]
    t = Table(data, colWidths=widths, hAlign="LEFT")
    st = [("VALIGN", (0, 0), (-1, -1), "TOP"),
          ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
          ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
          ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#cbd5e1")),
          ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT])]
    if header:
        st += [("BACKGROUND", (0, 0), (-1, 0), SLATE)]
    t.setStyle(TableStyle(st))
    return t


S = []  # story

# ---------- Title ----------
title = Table([[Paragraph("VETERINARY NECROPSY &amp; PATHOLOGY", H1)],
               [Paragraph("Comprehensive Study Summary", ParagraphStyle(
                   "st", parent=SMALL, textColor=colors.HexColor("#fca5a5"), fontSize=10))]],
              colWidths=[170 * mm])
title.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), INK),
                           ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                           ("TOPPADDING", (0, 0), (0, 0), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                           ("LINEBELOW", (0, 0), (-1, 0), 2.5, CRIMSON)]))
S += [title, Spacer(1, 4)]
S += [P("Source: Dr. Ali Choukeir — <i>Veterinary Necropsy</i> (253 slides) + organ-system "
        "pathology deck (59 slides), distilled into the 7 study phases used in studylynn. This is a "
        "near-complete reference — every slide topic is represented. <b>Red KEY boxes = high-yield "
        "exam points; green = definitions; blue = mechanism/technique.</b>")]
S += [Spacer(1, 2), HRFlowable(width="100%", color=CRIMSON, thickness=1)]

# =====================================================================
# PHASE 1 — FOUNDATIONS & NECROPSY TYPES
# =====================================================================
S += banner("1 · Foundations &amp; Necropsy Types")
S += [defn("<b>Necropsy</b> = a STRUCTURED diagnostic procedure performed after death to (1) establish "
           "cause + mechanism of death, (2) define morphologic diagnoses (gross ± microscopic), "
           "(3) determine etiology (infectious, toxic, metabolic, traumatic…), and (4) translate "
           "findings into clinical action (treatment, herd management, public health).")]
S += [Paragraph("Why we do necropsies", SUB)]
S += [bullets([
    "<b>Patient-level:</b> confirm/correct the clinical diagnosis (QC for the clinician), identify "
    "comorbidities & complications, explain unexpected signs, evaluate therapeutic failure.",
    "<b>Herd/flock & population:</b> determine production-loss drivers, detect management failures "
    "(nutrition, housing, toxins), passive surveillance ('finger on the pulse').",
    "<b>Public health & legal:</b> zoonosis indicator (TB, rabies-suspect logic), forensics (trauma, "
    "poisoning, neglect), documentation for disputes."])]
S += [key("<b>Cause vs Mechanism of death.</b> Clinical medicine asks 'what does the patient have?'; "
          "necropsy asks 'what failed first, and what killed them last?' — Cause = the disease; "
          "Mechanism = the terminal physiology (shock, hypoxia, hemorrhage, arrhythmia). Name BOTH.")]
S += [Paragraph("The necropsy mindset", SUB)]
S += [P("Before any incision the prosector must have a <b>differential list</b>, a <b>sampling plan</b>, "
        "and a <b>contamination plan</b>. 'Aimless cutting and hacking has no place.' Necropsy is a "
        "systematic survey, not a search for one expected lesion.")]
S += [Paragraph("The 4 governing principles", SUB)]
S += [bullets([
    "<b>1. Standard routine every time</b> — prevents diagnostic bias. Without a fixed order you focus "
    "only on suspected organs, stop after one lesion, and miss concurrent disease. Forces you to examine "
    "every system, compare severity, and separate primary vs secondary lesions.",
    "<b>2. Minimal disturbance / contamination</b> — anatomy & microbiology are fragile. Before "
    "manipulation organs show true position, torsions, volvulus, effusion distribution. Once you move "
    "organs: torsions reduce, fluid shifts, fibrin detaches, gas escapes. Open gut before sterile sampling "
    "→ liver/spleen/lung contaminated → cultures unreliable.",
    "<b>3. Reconstructability of organs</b> — many diagnoses depend on relationships (heart chambers "
    "vs valves, thrombus origin, vessel continuity, tumor invasion). Random fragmentation destroys anatomy "
    "and forensic credibility. Cut with intention, not curiosity.",
    "<b>4. Best possible specimens</b> — gross exam is rarely enough (histopath, culture, PCR, "
    "toxicology). Samples too thick → poor fixation; contaminated → false culture; delayed → "
    "degraded DNA/RNA; mixed → unusable. Bad samples create false negatives."])]
S += [Paragraph("The 7 types of necropsy", SUB)]
S += [tbl([
    ["Type", "Definition / focus", "Sampling & key point"],
    ["Diagnostic (clinical)", "Cause + mechanism in an individual; most common in small-animal practice.",
     "Moderate sterility; histopath + selective culture + effusion cytology ± tox. Answer 4 Qs: "
     "morphologic dx? etiology? mechanism? clinical implications? RISK = tunnel vision."],
    ["Herd / flock", "Population-level disease / production problems (cattle, swine, poultry, feedlots).",
     "Examine 3–5 animals minimum; same tissues across animals; pool for virology; feed + water "
     "samples. One necropsy is insufficient — look for the PATTERN."],
    ["Forensic", "Legal context; findings may go to court.",
     "Chain of custody, extreme documentation, no evidence destruction, photograph before incision, "
     "strict labeling; multiple tox samples + projectile fragments."],
    ["Research / experimental", "University / pharma / toxicology / vaccine trials.",
     "Strict protocol, blinded, defined locations, quantitative lesion scoring. Over-standardization "
     "misses incidental pathology."],
    ["Teaching", "Student training, normal anatomy, lesion recognition.",
     "Risk: students focus on cutting instead of observing."],
    ["Partial", "Limited question / decomposition / zoonotic risk / owner limitation.",
     "e.g. suspected rabies → head-only submission."],
    ["Emergency / rapid", "High degradation risk, urgent toxicology, active outbreak.",
     "Priority = rapid sampling, effusion collection, refrigeration."],
], [30 * mm, 62 * mm, 78 * mm])]
S += [Paragraph("The external examination — 'pure data'", SUB)]
S += [P("The external exam is the ONLY time you examine the body without destroying evidence. Once you "
        "incise: bruising spreads, blood leaks, gas escapes, contamination begins, orientation changes. "
        "The body surface tells you whether disease was systemic, whether trauma/coagulopathy/chronic "
        "disease/neglect/injection-reactions/parasitism contributed — and the whole-body lesion pattern.")]
S += [tbl([
    ["Step", "Assess", "Interpretation examples"],
    ["1. Overall impression (before touching)", "Body condition, posture, muscle mass, symmetry, struggle, distention",
     "Good BCS + sudden death → acute event; cachexia → chronic systemic disease; asymmetry → fracture/atrophy/neuro"],
    ["2. Body condition & hydration", "SC fat, muscle bulk, rib/pelvis/spine prominence; sunken eyes, skin tenting, dry mucosa",
     "Supports chronic diarrhea, renal disease, parasitism, starvation/neglect"],
    ["3. Integument", "Hair/feather coat, alopecia, dermatitis, ulcers, nodules",
     "Symmetrical alopecia → endocrine; multifocal crusting → ectoparasites; nodules → neoplasia; ulcerated mass → aggressive tumor"],
    ["4. Bruising & hemorrhage", "Distribution, symmetry, depth, healing stage", "Critical in forensic & systemic disease cases"],
    ["5. Orifices", "Eyes, nose, mouth, ears, anus, vulva/prepuce — discharge, blood, foam, ulcers, prolapse",
     "Foam at mouth → pulmonary edema; nasal hemorrhage → clotting disorder; rectal prolapse → chronic diarrhea"],
    ["6. Nails/claws/hooves", "Wear, breakage, overgrowth", "Broken → struggle/seizure; overgrown → neglect; asymmetric wear → neuro/ortho"],
    ["7. Injection sites", "Palpate neck, shoulder, thigh", "Swelling/mass → injection reaction, iatrogenic infection, vaccine-site sarcoma (cats)"],
], [34 * mm, 70 * mm, 66 * mm])]
S += [Paragraph("The 7-point pre-incision checklist", SUB)]
S += [bullets([
    "<b>1. Confirm identification</b> (species, breed, sex, age, microchip/tag) — misidentification = invalid report.",
    "<b>2. Record time of death + necropsy</b> — interpretation of autolysis/rigor/clotting/bacterial overgrowth depends on the interval.",
    "<b>3. Decide necropsy type</b> (diagnostic / herd / forensic / surveillance) — changes sampling, documentation, chain of custody, biosecurity.",
    "<b>4. Summarize history + list differentials</b> (3 lines max).",
    "<b>5. Decide what must be sampled first</b> (effusion, blood clot, liver for tox, stomach contents, lung for PCR) — before contamination.",
    "<b>6. Assess PPE / zoonotic risk</b> (rabies, TB, Salmonella, Brucella).",
    "<b>7. Prepare labeled containers</b> — mislabeling is one of the most common errors."])]
S += [key("Necropsy is IRREVERSIBLE: you cannot undo contamination, restore organ position, fix a missed "
          "tox sample, or re-collect sterile fluid. The checklist forces diagnostic intention, sampling "
          "foresight, legal awareness, infection control, and structured reasoning.")]

# =====================================================================
# PHASE 2 — POSTMORTEM CHANGES & ARTIFACTS
# =====================================================================
S += banner("2 · Postmortem Changes &amp; Artifacts")
S += [P("Most diagnostic errors come from misreading normal postmortem change: overcalling autolysis as "
        "pathology, mistaking hypostasis for hemorrhage, confusing aspiration-at-death with pneumonia. "
        "You must separate TRUE disease, TERMINAL change, and POSTMORTEM artifact.")]
S += [note("<b>The biology of dying</b> (not instantaneous): O₂ stops → ATP drops → ion "
           "pumps fail → cells swell → membranes break → enzymes digest tissue (autolysis) "
           "→ bacteria proliferate (putrefaction).")]
S += [tbl([
    ["Change", "What / driver", "Timeline / detail", "Interpretation"],
    ["Rigor mortis", "Muscle stiffening; ATP depletion → actin-myosin locked", "Onset 1–4 h, full 6–12 h, gone 24–36 h; depends on temp, fat, illness",
     "Absent early → sepsis/exhaustion/cachexia; advanced → death earlier than reported. Never over-interpret alone"],
    ["Livor mortis (hypostasis)", "Gravity-settled blood", "Dark red-purple, dependent side", "NOT hemorrhage"],
    ["Postmortem blood", "May clot or stay fluid", "—", "Fluid blood → consider septicemia/DIC/hypoxia, but can be normal"],
    ["Autolysis", "Self-digestion by cellular enzymes", "Fastest: pancreas, stomach, intestine, brain; slower: skin, heart, muscle",
     "Softening, mucosal sloughing, color change, gas, blurred layers — but NO inflammation/fibrin/vascular reaction"],
    ["Putrefaction", "Bacterial proliferation", "Gas, bloating, green discoloration, foul odor", "Obscures lesions, makes culture useless → record time of death"],
], [26 * mm, 44 * mm, 54 * mm, 46 * mm])]
S += [Paragraph("Aspiration & gas — the classic traps", SUB)]
S += [bullets([
    "<b>Aspiration:</b> material in airways may occur during life (TRUE aspiration: inflammation, hyperemia, "
    "fibrin, consolidation), at the moment of death, or after death (postmortem: material present but NO "
    "inflammation/tissue reaction). The difference is the inflammatory response.",
    "<b>Gas in the abdomen:</b> antemortem bloat vs obstruction vs perforation vs postmortem fermentation. "
    "Key question: was the tissue viable and reactive? Uniform moderate gas → postmortem; segmental "
    "severe distension + congestion → obstruction/torsion."])]
S += [key("Airway content ALONE never diagnoses pneumonia — correlate with lung tissue reaction.")]
S += [Paragraph("Iatrogenic postmortem artifacts", SUB)]
S += [bullets([
    "Esophageal tearing during removal, rib fractures during opening, knife marks mistaken for trauma, "
    "brain laceration during removal, intestinal rupture during manipulation.",
    "<b>Professional rule: if you caused it, document it.</b> Never report your own artifact as pathology."])]
S += [tbl([
    ["Artifact", "Mistaken for", "The tell"],
    ["Hypostasis", "Hemorrhage", "True hemorrhage INFILTRATES tissue + coagulates; hypostasis only stains the dependent surface"],
    ["Autolysis (gut)", "Enteritis", "Enteritis has hyperemia + fibrin + cellular reaction; autolysis has none"],
    ["Postmortem aspiration", "Aspiration pneumonia", "True aspiration shows inflammation/fibrin; postmortem has material but no reaction"],
    ["Postmortem gas", "Bloat / obstruction", "Reactive, inflamed, viable tissue = antemortem; none = postmortem"],
], [34 * mm, 38 * mm, 98 * mm])]

# =====================================================================
# PHASE 3 — SYSTEMATIC DISSECTION
# =====================================================================
S += banner("3 · Systematic Dissection")
S += [Paragraph("Opening the abdomen", SUB)]
S += [bullets([
    "<b>Positioning:</b> ruminants → LEFT lateral recumbency (keeps rumen down); monogastrics (dog, "
    "cat, pig) → RIGHT lateral.",
    "<b>Technique:</b> lift the abdominal wall away from viscera, incise the linea alba carefully, extend "
    "cranially/caudally, reflect the wall — then STOP. Do not touch organs."])]
S += [key("<b>The 30-second rule:</b> for 30 s you only OBSERVE — organ position, size, color, fluid, "
          "gas distribution, adhesions, fibrin, hemorrhage, mesenteric tension. This first view is "
          "anatomically authentic; once you manipulate, authenticity is gone.")]
S += [Paragraph("Systematic abdominal assessment", SUB2)]
S += [bullets([
    "<b>Fluid:</b> is there fluid? Estimate volume; describe color, clarity, odor.",
    "<b>Organ position:</b> stomach rotation, spleen displacement, intestinal torsion, herniation, liver "
    "displacement, rumen distention. (GDV → rotated stomach + displaced spleen; mesenteric volvulus "
    "→ twisted root + dark bowel; diaphragmatic hernia → abdominal organs in thorax.)",
    "<b>Color & congestion:</b> diffuse dark → shock/hypoxia; pale liver → anemia; patchy → infarcts/focal necrosis (interpret vs postmortem change).",
    "<b>Fibrin & adhesions:</b> fibrin = inflammation until proven otherwise. Acute peritonitis = fibrin + turbid fluid + hyperemia; chronic = dense adhesions + fibrous bands.",
    "<b>Gas distribution:</b> uniform moderate → postmortem fermentation; segmental severe + congestion → obstruction/torsion."])]
S += [Paragraph("Organ-by-organ examination (abdomen)", SUB2)]
S += [tbl([
    ["Organ", "Assess", "Interpretation"],
    ["Liver", "Size, capsule, color uniformity, consistency, cut surface", "'Pale liver' nonspecific → fat/necrosis/lymphoma/hepatitis/toxin (histology decides)"],
    ["Spleen", "Size, capsule tension, color, nodules", "Enlarged → congestion/hematologic/septicemia; collapsed may be postmortem"],
    ["GI tract", "Mesenteric nodes, serosa, segment thickness; open along antimesenteric border", "Mucosal integrity, ulcers, hemorrhage, parasites, foreign bodies"],
    ["Pancreas", "Fat necrosis, hemorrhage, nodules", "Acute pancreatitis → peripancreatic fat necrosis + hemorrhage"],
    ["Kidneys", "Capsule-removal ease, corticomedullary distinction, symmetry, pelvis; cut longitudinally", "Adherent capsule + lost detail → chronic disease; pelvic dilation → hydronephrosis"],
    ["Bladder", "Wall thickness, mucosa, stones, hemorrhage; collect urine sterilely", "Thick wall → chronic cystitis; uroliths"],
    ["Reproductive", "Uterus (pregnancy, pyometra), testes (torsion), prostate", "Often missed; pyometra can drive sepsis"],
    ["Lymph nodes", "Size, color, consistency", "Enlarged+pale → lymphoma; enlarged+hyperemic → infection; necrotic → severe disease"],
], [24 * mm, 78 * mm, 68 * mm])]
S += [note("<b>Correlate abdomen → thorax</b> before moving on: do findings suggest shock, septicemia, "
           "toxicosis, chronic disease, or mechanical obstruction? Ascites + hepatomegaly → suspect "
           "right-sided heart failure → confirm in thorax. 'Make the abdomen talk to the thorax.'")]
S += [Paragraph("Opening the thorax & cardiorespiratory exam", SUB)]
S += [bullets([
    "<b>Open the diaphragm first</b> and watch the lungs. Normal lungs collapse slightly (negative pressure "
    "lost). Failure to collapse → pleural adhesions / effusion / pneumothorax / severe consolidation.",
    "Cut ribs near the costochondral junctions, reflect/remove the sternum, avoid puncturing lungs — then stop and observe.",
    "<b>In-situ thoracic survey (5, in order):</b> pleural cavity → pericardium → lungs → mediastinum/great vessels → diaphragm integrity."])]
S += [tbl([
    ["Fluid", "Pleural interpretation", "Pericardial interpretation"],
    ["Clear / straw", "Transudate (CHF, hypoproteinemia)", "CHF / mild effusion"],
    ["Turbid / cloudy", "Exudate (infection/inflammation)", "—"],
    ["Fibrin strands/sheets", "Fibrinous pleuritis (often bacterial)", "Fibrinous pericarditis (infectious)"],
    ["Blood", "Hemothorax (trauma, coagulopathy, rupture, neoplasia)", "Hemopericardium (trauma, cardiac rupture, neoplasia, coagulopathy)"],
], [30 * mm, 70 * mm, 70 * mm])]
S += [Paragraph("Lungs, heart-lung block & airway", SUB2)]
S += [bullets([
    "<b>Lung patterns in situ:</b> cranioventral consolidation → bacterial bronchopneumonia; diffuse "
    "heavy wet + frothy → pulmonary edema (often heart failure); multifocal abscesses/nodules → "
    "septic emboli / chronic infection / neoplasia; diffuse 'meaty' non-collapsing → severe pneumonia.",
    "<b>Remove heart + lungs together</b> to preserve airway continuity, heart-lung relationship, thrombus attachment sites.",
    "<b>Airway first:</b> open larynx → trachea → primary bronchi; look for foam (edema), blood, exudate, foreign material.",
    "<b>Lung sectioning:</b> palpate (firm vs spongy), slice each lobe consistently; fluid drains = edema, pus = suppurative pneumonia; firm/dry/red-gray = consolidation; cavitated = abscess."])]
S += [key("<b>Heart — blood-flow method:</b> assess size/shape first (dilation? right vs left "
          "predominance?), then open FOLLOWING flow: RA → RV → pulmonary artery; LA → LV "
          "→ aorta. Examine valves (vegetations → endocarditis), myocardium (pallor → ischemia, "
          "scars, parasites), great vessels (thrombi, tears, aneurysm). Never slice randomly — it "
          "destroys valve evidence.")]
S += [note("<b>Thorax↔abdomen integration:</b> ascites + hepatomegaly + pleural effusion → "
           "right-sided CHF; pulmonary edema + left atrial dilation → left-sided CHF; fibrin in both "
           "cavities → septicemia/polyserositis; hemoperitoneum + hemothorax → coagulopathy or "
           "major trauma. Thorax sampling: histo (lesion edge + normal), culture (deep lung, sterile), "
           "PCR/virology (fresh lung, refrigerate).")]
S += [Paragraph("Gastrointestinal tract", SUB2)]
S += [bullets([
    "<b>Stomach (monogastric):</b> cut along the greater curvature, observe contents BEFORE removing "
    "(food, foreign body, blood, toxin); evaluate mucosa (ulcers, erosions, hemorrhage, thickening).",
    "<b>Ruminant forestomach (4):</b> rumen (content, pH, fermentation), reticulum (foreign body = "
    "'hardware disease' → traumatic reticuloperitonitis), omasum, abomasum (ulcers, parasites).",
    "<b>Intestines:</b> open along the ANTIMESENTERIC border with scissors, segment by segment. Mucosa "
    "(smooth/rough, hyperemia, necrosis, ulceration), wall thickness (thick = chronic, thin = necrosis), "
    "contents (diarrhea, blood, parasites). Check mesenteric nodes first.",
    "<b>Parasites/content:</b> worms, larvae, abnormal feed, toxic plants. Heavy load → cause/contributor; mild → incidental (correlate with BCS, anemia, diarrhea).",
    "<b>GI integration:</b> classify as mechanical (torsion/obstruction), inflammatory (enteritis/peritonitis), toxic/metabolic, parasitic, or secondary to systemic disease.",
    "<b>Common errors:</b> opening intestine too early (contamination), ignoring lymph nodes, confusing autolysis with disease, not checking stomach contents, missing parasites, not correlating with history."])]
S += [Paragraph("Central nervous system", SUB2)]
S += [bullets([
    "<b>Why special:</b> the brain is extremely soft, autolyzes rapidly, is easily lacerated, has limited "
    "regeneration, and often requires histopathology (many neurologic diseases = minimal gross, major microscopic). Tissue preservation is critical.",
    "<b>Indications to open the skull:</b> seizures, ataxia, paralysis, behavior change, suspected encephalitis, trauma, rabies surveillance, toxicity.",
    "<b>Biosafety:</b> if rabies/zoonotic suspected — avoid aerosol generation and power saws.",
    "<b>Technique:</b> reflect skin midline; open the cranial vault carefully (do NOT penetrate deeply → "
    "cortex laceration); gently elevate frontal lobes, cut cranial nerves, sever brainstem/cord, lift slowly. Never pull forcefully (tears cerebellum/brainstem).",
    "<b>Observe before sectioning:</b> meninges, hemorrhage, swelling, symmetry, cerebellar position. Make serial transverse sections → ventricles, white vs gray, hemorrhage, necrosis, cavities, masses."])]
S += [tbl([
    ["CNS pattern", "Gross", "Suggests / mechanism"],
    ["Meningitis", "Cloudy, thickened, fibrin-covered meninges, opacity", "Meningitis / encephalitis"],
    ["Cerebral edema", "Swollen brain, flattened gyri, narrowed sulci, herniation", "Trauma, hepatic encephalopathy, toxins, hypoxia (↑ ICP)"],
    ["Hemorrhage", "Intra-/peri-cerebral blood", "Trauma, coagulopathy, hypertension, septic vasculitis"],
    ["Hydrocephalus", "Enlarged ventricles, thin cortex", "CSF accumulation"],
], [30 * mm, 78 * mm, 62 * mm])]

# =====================================================================
# PHASE 4 — SAMPLING SCIENCE
# =====================================================================
S += banner("4 · Sampling Science")
S += [P("Many necropsies fail not because lesions were missed but because samples were poor, fixation was "
        "wrong, tissue autolyzed, or contamination occurred. A beautiful necropsy with bad sampling becomes useless.")]
S += [note("<b>Gross vs histology:</b> gross tells you WHERE the lesion is, its distribution and severity; "
           "histopathology tells you WHAT it actually is (inflammation type, necrosis type, tumor origin, "
           "viral inclusions, fibrosis, degeneration). A grossly 'pale liver' may be fatty change, necrosis, "
           "lymphoma, hepatitis, or toxic injury.")]
S += [key("<b>The golden rule of sampling:</b> the lesion EDGE is the most diagnostic area (active disease, "
          "tissue response, progression). Sample lesion edge + adjacent normal — NEVER only the necrotic "
          "center (it may be dead, autolyzed, or nonspecific).")]
S += [Paragraph("Histopathology & fixation", SUB)]
S += [bullets([
    "<b>Standard set</b> (even if grossly normal): liver, kidney, spleen, lung, heart, brain, "
    "stomach/intestine, lymph node, pancreas, any lesion — microscopic disease exists without gross change.",
    "<b>Thickness:</b> ~6–8 mm. Formalin penetrates ~3–4 mm per 24 h; too thick → outside fixes while inside autolyzes → unreadable.",
    "<b>Fixative:</b> 10% neutral buffered formalin — stabilizes proteins, stops autolysis, preserves detail.",
    "<b>Ratio:</b> ~10:1 formalin-to-tissue (lots of formalin, not crowded jars). Mistakes: too little formalin, large blocks, sealed thick organs unsliced, tissues packed tightly.",
    "<b>Organ-specific:</b> heart = LV + RV + septum + lesion/valve; lung = lesion edge + adjacent normal; "
    "brain = never squeeze/cram, large formalin volume; lymph nodes (enlarged/draining/mesenteric) = high-value (metastasis, infection, immune patterns); GI = mucosa + submucosa, short segments laid flat, keep orientation.",
    "<b>Labeling:</b> every sample needs animal ID, organ, date, case number. Mislabeling can invalidate research, legal cases, diagnostics."])]
S += [tbl([
    ["", "Fixed tissue", "Fresh tissue"],
    ["Used for", "Histopathology", "PCR, culture, toxicology, virology"],
    ["Rule", "10% NBF; never freeze (destroys architecture)", "If unsure, take BOTH fresh and fixed"],
    ["Storage", "Room temp after fixation", "Refrigerate (culture/PCR/short-term) • Freeze (toxicology/long-term/some virology)"],
], [22 * mm, 70 * mm, 78 * mm])]
S += [Paragraph("Microbiology, virology & toxicology", SUB)]
S += [bullets([
    "<b>Core principle:</b> histopathology studies structure, microbiology studies living organisms, "
    "toxicology studies chemicals — each needs completely different handling.",
    "<b>Microbiology:</b> culture when infection/abscess/fibrinous inflammation/septicemia/pneumonia/peritonitis "
    "is suspected. Use sterile instruments + containers + fresh tissue. ALWAYS sample before opening the "
    "intestine — once gut is open, bacteria spread everywhere and cultures become unreliable. Best sites: "
    "deep lung lesion (not surface), sterile brain section, early heart blood, internal abscess material. "
    "Refrigerate (do NOT freeze — freezing kills organisms).",
    "<b>Virology:</b> viruses need living cells or intact nucleic acids that degrade rapidly — SPEED is "
    "critical; heat and delay destroy RNA, viral proteins, PCR quality. Fresh tissue, sterile containers, "
    "refrigerate immediately. PCR: detects DNA/RNA, very sensitive, works on dead organisms — but "
    "contamination → false positives, degradation → false negatives.",
    "<b>Toxicology:</b> NEVER add preservatives (they alter chemical composition / toxin concentration / "
    "detection). Standard package: liver, kidney, fat, stomach contents, intestinal contents, urine, "
    "± brain. Note stomach-content quantity, odor, unusual material/plants. Contamination (insecticide "
    "spray, dirty/fuel containers, cross-contact) → false positives. Chain of custody for forensic cases."])]
S += [key("<b>Sample priority (what degrades fastest):</b> 1) Culture → 2) Virology/PCR → "
          "3) Toxicology → 4) Histopathology (tolerates delay best after fixation). False negatives "
          "come from wrong tissue / timing / storage / contamination / autolysis — NOT absent disease. "
          "Sampling quality matters more than microscope skill.")]

# =====================================================================
# PHASE 5 — FORENSIC PATHOLOGY
# =====================================================================
S += banner("5 · Forensic Pathology")
S += [defn("A <b>forensic necropsy</b> is performed when legal implications exist: suspected abuse, possible "
           "poisoning, trauma documentation, ownership/insurance disputes. It is medicine + pathology + law + "
           "evidence science. Findings may go to court; your report may affect criminal charges.")]
S += [Paragraph("Goals & the 4 forensic questions", SUB)]
S += [bullets([
    "Determine cause of death, mechanism of death, MANNER of death, and whether injuries occurred before, during, or after death.",
    "<b>Q1 — What caused death?</b> gunshot, toxicity, blunt trauma, starvation, strangulation, septicemia.",
    "<b>Q2 — How did death occur?</b> mechanism: hemorrhagic shock, respiratory failure, brain injury, cardiac failure.",
    "<b>Q3 — When did injuries occur?</b> antemortem vs perimortem vs postmortem.",
    "<b>Q4 — Accidental, natural, or intentional?</b> the manner of death — legally critical."])]
S += [key("<b>Vital reaction</b> = evidence that tissue was ALIVE when injury occurred (hemorrhage, "
          "inflammation, clot formation). No vital reaction → possibly postmortem injury. This resolves Q3.")]
S += [note("<b>The forensic mindset:</b> clinical necropsy searches for disease; forensic necropsy PRESERVES "
           "evidence. You are a medical scientist interpreting evidence — not police, judge, or prosecutor.")]
S += [Paragraph("Evidence handling", SUB2)]
S += [bullets([
    "<b>Chain of custody:</b> document who collected, handled, stored, and transferred evidence. Without it, evidence may be inadmissible and the case may collapse.",
    "<b>Document:</b> species, breed, sex, age, microchip/tag, date/time, location found, owner info, who handled the carcass.",
    "<b>Photography:</b> photograph BEFORE incision — entire body, multiple angles, close-ups of lesions, ID markers, scene. Include scale/ruler, good lighting, multiple distances, NO filters/editing. Photos = legal evidence.",
    "<b>External exam:</b> bruises, bite wounds, claw marks, burns, ligature marks, hemorrhage patterns, gunshot wounds, neglect indicators."])]
S += [Paragraph("Trauma & specific findings", SUB2)]
S += [bullets([
    "<b>Bruising analysis:</b> not all discoloration is trauma — distinguish hypostasis, true hemorrhage, "
    "and decomposition artifact. True antemortem bruising shows tissue infiltration, coagulation, and (if older) "
    "inflammation; postmortem discoloration does not.",
    "<b>Gunshot:</b> assess entry wound, exit wound, trajectory, tissue damage, projectile fragments.",
    "<b>Blunt force:</b> rib fractures, pulmonary hemorrhage, liver/splenic rupture, subcutaneous hemorrhage. "
    "Key question: before or after death (vital reaction)?",
    "<b>Toxicology in forensics:</b> common poisons — rodenticides, ethylene glycol, organophosphates, "
    "NSAIDs, heavy metals. Samples (fresh, no preservatives): liver, kidney, fat, stomach contents, urine, brain.",
    "<b>Neglect & starvation:</b> severe muscle wasting, lack of body fat, pressure sores, parasite overload, overgrown nails/hooves, dehydration.",
    "<b>Accident vs abuse</b> (one of the hardest tasks): assess lesion pattern, healing stages, distribution, consistency with history. Multiple healing stages + inconsistent history → suspect abuse. Never jump to conclusions."])]
S += [key("<b>Forensic reporting:</b> objective, descriptive, non-emotional. Avoid 'the owner abused the "
          "animal'; write 'findings are consistent with repeated blunt-force trauma occurring over multiple "
          "time periods.' Common errors: poor documentation, no photos, destroyed wound tracks, contaminated "
          "toxicology, speculation beyond evidence, emotional wording.")]

# =====================================================================
# PHASE 6 — REPORTING & GENERAL PATHOLOGY
# =====================================================================
S += banner("6 · Reporting &amp; General Pathology")
S += [P("A necropsy is finished not when you stop cutting but when findings are interpreted, documented "
        "clearly, and communicated professionally. A professional report must describe findings objectively, "
        "interpret them medically, correlate with history, give a likely diagnosis, guide clinicians/herd "
        "management, and serve as legal documentation if needed.")]
S += [key("<b>THE most important rule:</b> separate DESCRIPTION from INTERPRETATION. Bad: 'the liver was "
          "septic.' Good: 'the liver was enlarged with multifocal pale raised nodules 0.5–2 cm' → "
          "later: 'findings are consistent with multifocal bacterial abscessation.'")]
S += [Paragraph("Report structure", SUB)]
S += [bullets([
    "<b>1. Identification</b> — species, breed, sex, age, weight, ID/microchip/tag, owner/farm, date/time.",
    "<b>2. History</b> (2–5 lines) — clinical signs, duration, treatments, herd context.",
    "<b>3. External examination</b> — body condition, hydration, trauma, skin lesions, discharges, parasites, postmortem autolysis noted.",
    "<b>4. Internal examination</b> (largest section, organized by system: abdominal cavity, GI, liver, spleen, urinary, respiratory, cardiovascular, CNS, musculoskeletal).",
    "<b>Then:</b> morphologic diagnoses → interpretation → differentials → ancillary tests → final diagnosis / cause of death."])]
S += [bullets([
    "<b>Describe a lesion by 7 features:</b> location, size, shape, color, distribution, consistency, severity. "
    "('The lungs were bad' → 'cranioventral lobes were firm, dark red, and failed to collapse, affecting ~40% of parenchyma.')",
    "<b>Morphologic diagnosis formula:</b> Severity + Duration + Lesion type + Organ + Distribution → "
    "'severe acute diffuse fibrinosuppurative bronchopneumonia.'",
    "<b>Interpretation</b> integrates pathology + history + ancillary tests. <b>Differentials</b> acknowledge "
    "uncertainty honestly. <b>Final diagnosis</b> = primary disease + mechanism of death + contributing conditions.",
    "<b>Common errors:</b> vague language ('abnormal', 'bad'), mixing description with interpretation, overstating certainty, ignoring postmortem artifact."])]
S += [key("<b>Core principle of pathology: PATTERN &gt; single lesion.</b> One pale liver spot means little; "
          "pale liver + enlarged spleen + petechiae + dark unclotted blood TOGETHER suggest septicemia / "
          "systemic disease / shock. Reason every case in sequence: history → gross pattern → lesion "
          "distribution → pathophysiology → differentials → sampling needs → cause of death.")]
S += [Paragraph("The 5 major lesion categories", SUB)]
S += [tbl([
    ["Category", "Hallmarks & detail"],
    ["1. Inflammatory", "Response to infection/injury/toxins/necrosis (redness, swelling, heat, pain, exudate). "
     "Serous (thin watery — mild/early) → fibrinous (yellow-white fibrin — severe vascular injury/bacterial) "
     "→ suppurative (pus/neutrophils — pyogenic bacteria) → hemorrhagic (inflammation + blood)."],
    ["2. Circulatory", "Congestion (poor venous drainage → dark red, enlarged, heavy; from heart failure/shock/"
     "hypoxia/torsion). Hemorrhage (petechiae → ecchymoses → hematoma). Edema (wet, heavy, shiny; pulmonary "
     "edema → heavy lungs + frothy trachea)."],
    ["3. Degenerative", "From toxins/hypoxia/metabolic/nutritional. Fatty change (liver/kidney/myocardium → pale, "
     "enlarged, greasy). Necrosis (focal/multifocal/diffuse — pattern matters)."],
    ["4. Neoplastic", "Mass formation, invasion, metastasis. Benign = well-demarcated, localized, slow. Malignant = "
     "invasive, irregular, metastatic, destructive. Metastatic patterns: multiple liver nodules, pulmonary nodules, "
     "enlarged nodes, serosal implants."],
    ["5. Mechanical / obstructive", "Structural failures: GDV, torsion, hernia, obstruction, intussusception. "
     "Distension, congestion, ischemia, necrosis, SHARP transition zones."],
], [34 * mm, 136 * mm])]
S += [note("<b>Lesion chronicity:</b> acute = hyperemia, hemorrhage, edema, fibrin; chronic = fibrosis, "
           "adhesions, scarring, nodularity. (Central to dating injuries in forensics.)")]
S += [Paragraph("Integrated case reasoning (worked examples)", SUB)]
S += [tbl([
    ["Case", "Key findings", "Diagnosis / mechanism"],
    ["Great Dane, acute distension + sudden death", "Massively distended stomach rotated clockwise, displaced congested spleen, gastric wall necrosis, pulmonary congestion",
     "Severe acute GDV with splenic congestion → venous compression → ↓ return → shock + arrhythmias. Mechanical + circulatory collapse."],
    ["Holstein cow, sudden death, dark blood", "Blood from nose, rapid bloating, dark unclotted blood, enlarged spleen, diffuse hemorrhages",
     "Severe acute diffuse hemorrhagic septicemic syndrome. DDx anthrax / clostridial / Gram-neg sepsis. Do NOT open aggressively if anthrax suspected (spores)."],
    ["Cat, chronic weight loss", "Cachexia, thickened intestines, enlarged mesenteric nodes, multiple pale liver nodules",
     "Suspected alimentary lymphoma — gross suggests neoplasia but histopathology required. Don't overstate certainty."],
    ["Puppy, hemorrhagic diarrhea, unvaccinated", "Hemorrhagic enteritis, enlarged mesenteric nodes, dehydration, empty intestines",
     "Highly suggestive of canine parvoviral enteritis. Sample: fresh intestine (PCR), fixed intestine, mesenteric node."],
    ["Horse, colic + sudden deterioration", "Dark congested intestine, twisted mesentery, severe bowel distension",
     "Mechanical obstruction → vascular compromise → ischemia → necrosis → shock."],
], [42 * mm, 64 * mm, 64 * mm])]

# =====================================================================
# PHASE 7 — SYSTEMIC & ORGAN-SYSTEM PATHOLOGY
# =====================================================================
S += banner("7 · Systemic &amp; Organ-System Pathology")
S += [Paragraph("Septicemia & systemic inflammatory disease", SUB)]
S += [defn("<b>Septicemia</b> = presence and multiplication of pathogenic organisms or toxins in the "
           "bloodstream causing systemic disease — a whole-body vascular/inflammatory syndrome, NOT a "
           "localized infection. The bloodstream distributes bacteria, toxins, and mediators → diffuse "
           "endothelial injury, vascular leakage, coagulation abnormalities, hypoxia → lesions in many "
           "organs at once. Can produce shock, DIC, hemorrhage, organ failure, sudden death.")]
S += [key("<b>The classic septicemic pattern (memorize):</b> petechiae/ecchymoses + enlarged spleen + dark "
          "unclotted blood + congested organs + edema + fibrinous inflammation + swollen lymph nodes. When you "
          "see this, think SYSTEMIC inflammatory disease — not isolated organ pathology.")]
S += [bullets([
    "<b>Hemorrhage patterns:</b> petechiae (pinpoint — vascular injury, thrombocytopenia, DIC, septicemia); ecchymoses (larger — severe vascular damage, coagulopathy).",
    "<b>Spleen:</b> enlarged, dark, congested, soft/friable (filters blood, traps organisms, hyperactive).",
    "<b>Lymph nodes:</b> enlarged, wet, hyperemic (massive immune activation) — examine mesenteric, mediastinal, mandibular.",
    "<b>Fibrinous inflammation:</b> severe vessel damage → fibrin leakage → fibrinous peritonitis/pleuritis/pericarditis (polyserositis).",
    "<b>Endotoxemia</b> (horses, cattle, severe Gram-negative): bacterial endotoxins → cytokine storm → vascular collapse, coagulation abnormalities → congestion, edema, hemorrhage, shock organs.",
    "<b>DIC:</b> excessive coagulation → microthrombi → consumed clotting factors → secondary hemorrhage. Diffuse petechiae/ecchymoses, organ infarcts, unclotted blood.",
    "<b>Shock organs:</b> lungs (congestion, edema), liver (congestion, centrilobular necrosis), kidneys (acute tubular necrosis, pallor).",
    "<b>Septic emboli:</b> bacteria lodge in organs → multifocal abscesses/infarcts/random nodules (lung, liver, kidney, brain) = hematogenous, not airway.",
    "<b>Causes:</b> neonatal (umbilical infection, failure of passive transfer), GI (severe enteritis, intestinal rupture), respiratory (severe pneumonia), uterine (metritis, pyometra), wounds (bites, abscesses).",
    "<b>Septicemia vs toxemia:</b> septicemia = organisms in blood; toxemia = toxins circulating, organisms may stay localized (gross lesions overlap).",
    "<b>Species:</b> horses very prone to endotoxemia; cattle common fibrinous polyserositis; poultry severe septicemia with splenomegaly.",
    "<b>Sampling:</b> spleen, liver, lung, blood (early), lymph node — both fresh and fixed."])]
S += [Paragraph("Cardiovascular pathology", SUB)]
S += [note("<b>The heart is a pump.</b> Most cardiac lesions kill by impairing blood flow, oxygen delivery, "
           "or electrical stability — always ask 'how did this lesion alter circulation?' Four categories: "
           "congestive, valvular, myocardial, vascular. Heart disease is often underestimated or confused with primary respiratory disease.")]
S += [tbl([
    ["Lesion", "Species / setting", "Key gross findings"],
    ["Left-sided CHF", "All", "Backs into lungs → heavy wet lungs, frothy tracheal fluid, pulmonary edema, left atrial dilation"],
    ["Right-sided CHF", "All", "Systemic venous congestion → ascites, hepatomegaly, pleural effusion, jugular congestion, peripheral edema"],
    ["Chronic passive congestion (nutmeg liver)", "Usually right-sided CHF", "Enlarged liver, dark red centrilobular areas, 'nutmeg' pattern (venous blood can't leave liver)"],
    ["Myxomatous mitral valve degeneration", "Small older dogs (most common acquired)", "Thickened nodular mitral valve, enlarged left atrium, pulmonary edema"],
    ["Endocarditis", "All", "Friable valve vegetations, irregular surfaces, thrombi → septic emboli, valve insufficiency, heart failure"],
    ["Dilated cardiomyopathy (DCM)", "Large-breed dogs", "Enlarged flabby heart, thin ventricular walls, chamber dilation → arrhythmias, CHF, sudden death"],
    ["Hypertrophic cardiomyopathy (HCM)", "Cats", "Thick LV wall, small lumen, left atrial enlargement → pulmonary edema, aortic (saddle) thromboembolism"],
    ["Heartworm disease", "Dogs (cats)", "Worms in pulmonary artery/right heart, RV hypertrophy, pulmonary vascular lesions"],
    ["Cardiac hemangiosarcoma", "Dogs (right atrium)", "Dark hemorrhagic mass, blood-filled pericardium → hemopericardium, tamponade, sudden collapse"],
    ["Cardiac tamponade", "All", "Pericardial fluid/blood compresses heart → poor filling → shock; distended sac, collapsed chambers"],
    ["Vascular lesions", "All", "Atherosclerosis (rare); aneurysm (rupture/hemorrhage risk); vasculitis (infection/immune/toxins → hemorrhage, thrombosis, ischemia)"],
], [40 * mm, 44 * mm, 86 * mm])]
S += [key("<b>Thrombus vs postmortem clot:</b> true thrombus = formed during life, ATTACHED to vessel wall, "
          "firm, laminated. Postmortem clot = not attached, gelatinous, smooth/shiny. <b>Shock</b> (CV-central): "
          "congestion, pale mucosa, edema, petechiae, organ hypoxia. Cardiac sampling: LV + RV + septum + valves + any lesion.")]
S += [Paragraph("Respiratory pathology", SUB)]
S += [key("<b>Lung diagnosis depends on DISTRIBUTION, not just color.</b> A dark lung alone means little. "
          "Normal lung = pink, spongy, light, collapses when the thorax is opened. Abnormal = heavy, firm, wet, dark, nodular, non-collapsing.")]
S += [tbl([
    ["Pattern", "Distribution", "Disease / cause"],
    ["Bronchopneumonia", "Cranioventral", "Bacterial — infection spreads via airways, settles ventrally. Firm red/gray consolidation, fails to collapse, suppurative exudate"],
    ["Aspiration pneumonia", "Cranioventral", "Vomiting, tube-feeding errors, neurologic disease, anesthesia. Foreign material in airways, necrotizing inflammation"],
    ["Interstitial pneumonia", "Diffuse", "Targets alveolar walls/interstitium. Heavy rubbery non-collapsing lungs. Viral, toxic, ARDS, some systemic infection"],
    ["Embolic pneumonia", "Multifocal random nodules", "Hematogenous spread (not airway) → find the source (endocarditis, hepatic/umbilical abscess)"],
    ["Pulmonary edema", "Diffuse, wet", "Heavy wet lungs, fluid on cut surface, tracheal froth. Left-CHF, electrocution, neurogenic, toxins, shock"],
    ["Emphysema", "Overinflated", "Air in tissue → pale, dry, crepitant. Alveolar (trapped) or interstitial (dissecting; common in cattle)"],
], [38 * mm, 36 * mm, 96 * mm])]
S += [bullets([
    "<b>Pleural disease:</b> pleuritis (fibrin, adhesions, turbid fluid); pneumothorax (air in pleural cavity → lungs collapse, negative pressure lost; trauma/rupture/iatrogenic).",
    "<b>Lung hemorrhage</b> differentials: trauma, septicemia, coagulopathy, drowning, toxins.",
    "<b>Always open the trachea:</b> foam, blood, parasites, exudate, foreign material. Respiratory parasites (lungworms, heartworm-associated) → nodules, bronchitis, consolidation, vascular lesions.",
    "<b>Sampling:</b> histology = lesion edge + normal lung; culture = deep sterile sample; virology = fresh refrigerated tissue."])]
S += [Paragraph("Neoplasia at necropsy", SUB)]
S += [bullets([
    "<b>Neoplasia vs inflammation:</b> tumors usually distort anatomy, invade, form masses; inflammation usually "
    "preserves architecture more, has exudate/fibrin, follows inflammatory patterns — but overlap exists, histopathology confirms.",
    "<b>Gross rarely identifies the exact tumor type</b> — histopathology determines cell origin, malignancy grade, invasion, mitotic activity.",
    "<b>Tumor sampling:</b> always sample center, edge, adjacent normal tissue, lymph nodes, and metastatic lesions.",
    "<b>The pathologist's questions:</b> primary or metastatic? tissue of origin? invasive? which organs secondarily affected? "
    "what killed the animal — tumor burden, hemorrhage, organ failure, or cachexia?",
    "<b>Common errors:</b> assuming all nodules are metastases, all masses are malignant, sampling only the necrotic center, ignoring lymph nodes, forgetting systemic effects."])]

# ---------- Closing ----------
S += [Spacer(1, 8), HRFlowable(width="100%", color=ACCENT2, thickness=0.7)]
S += [key("<b>Professor's core message — think in sequence every case:</b> 1) clinical history "
          "→ 2) gross pattern → 3) lesion distribution → 4) pathophysiology → 5) "
          "differential diagnoses → 6) sampling needs → 7) cause of death. This is professional pathology reasoning.")]
S += [Paragraph("studylynn · Veterinary Necropsy &amp; Pathology — 161 cards across 7 phases · "
                "6 game modes · 14 study sheets. Comprehensive summary generated from the course slides.", SMALL)]


def deco(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(ACCENT2)
    canvas.drawString(20 * mm, 10 * mm, "Veterinary Necropsy & Pathology — Comprehensive Study Summary")
    canvas.drawRightString(190 * mm, 10 * mm, "p. %d" % doc.page)
    canvas.setStrokeColor(colors.HexColor("#e2e8f0"))
    canvas.line(20 * mm, 12 * mm, 190 * mm, 12 * mm)
    canvas.restoreState()


doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm,
                        topMargin=14 * mm, bottomMargin=16 * mm,
                        title="Veterinary Necropsy & Pathology — Comprehensive Study Summary",
                        author="studylynn")
doc.build(S, onFirstPage=deco, onLaterPages=deco)
print("built:", OUT)
