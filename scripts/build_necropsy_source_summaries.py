#!/usr/bin/env python3
"""Build TWO separate comprehensive study-summary PDFs — one per source document.

Treats the two course sources independently (overlap is fine):
  A) "Veterinary Necropsy.pdf" (253 slides) -> procedure + general pathology
  B) the organ-system pathology .pptx (59 slides) -> neoplasia / septicemia /
     cardiovascular / respiratory

Outputs two PDFs at the repo root (NOT committed). Regenerate with:
    python scripts/build_necropsy_source_summaries.py

Requires: reportlab  (pip install reportlab)
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                ListFlowable, ListItem, HRFlowable, CondPageBreak)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

INK = colors.HexColor("#0f1115")
CRIMSON = colors.HexColor("#dc2626")
SLATE = colors.HexColor("#334155")
LIGHT = colors.HexColor("#f1f5f9")
ACCENT2 = colors.HexColor("#64748b")
GREENBG = colors.HexColor("#ecfdf5")
BLUEBG = colors.HexColor("#eff6ff")
REDBG = colors.HexColor("#fef2f2")

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


def P(t):
    return Paragraph(t, BODY)


def bullets(items):
    return ListFlowable([ListItem(Paragraph(t, BULL), value="•", leftIndent=11) for t in items],
                        bulletType="bullet", start="•", leftIndent=11, spaceBefore=1, spaceAfter=3)


def _callout(text, bg, border):
    t = Table([[Paragraph(text, CALL)]], colWidths=[170 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), bg), ("BOX", (0, 0), (-1, -1), 0.7, border),
                           ("LINEBEFORE", (0, 0), (0, -1), 2.2, border),
                           ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                           ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    return t


def key(t):
    return _callout("<b>KEY &nbsp;</b>" + t, REDBG, CRIMSON)


def note(t):
    return _callout(t, BLUEBG, colors.HexColor("#3b82f6"))


def defn(t):
    return _callout(t, GREENBG, colors.HexColor("#10b981"))


def banner(text):
    t = Table([[Paragraph(text, PHASE)]], colWidths=[170 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), INK), ("LINEBELOW", (0, 0), (-1, 0), 2, CRIMSON),
                           ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                           ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
    return [CondPageBreak(40 * mm), Spacer(1, 6), t, Spacer(1, 4)]


def tbl(rows, widths, fs=8):
    data = [[Paragraph(c if c.startswith("<") else esc(c),
                       ParagraphStyle("c", parent=BODY, fontSize=fs, leading=fs + 2.4,
                                      textColor=colors.white if i == 0 else colors.black,
                                      fontName="Helvetica-Bold" if i == 0 else "Helvetica"))
             for c in row] for i, row in enumerate(rows)]
    t = Table(data, colWidths=widths, hAlign="LEFT")
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                           ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                           ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                           ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#cbd5e1")),
                           ("BACKGROUND", (0, 0), (-1, 0), SLATE),
                           ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT])]))
    return t


def make_title(title_html, subtitle, source_line):
    block = Table([[Paragraph(title_html, H1)],
                   [Paragraph(subtitle, ParagraphStyle("st", parent=SMALL,
                              textColor=colors.HexColor("#fca5a5"), fontSize=10))]], colWidths=[170 * mm])
    block.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), INK),
                               ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                               ("TOPPADDING", (0, 0), (0, 0), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                               ("LINEBELOW", (0, 0), (-1, 0), 2.5, CRIMSON)]))
    return [block, Spacer(1, 4), P(source_line), Spacer(1, 2),
            HRFlowable(width="100%", color=CRIMSON, thickness=1)]


def build(out, running_header, story):
    def deco(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(ACCENT2)
        canvas.drawString(20 * mm, 10 * mm, running_header)
        canvas.drawRightString(190 * mm, 10 * mm, "p. %d" % doc.page)
        canvas.setStrokeColor(colors.HexColor("#e2e8f0"))
        canvas.line(20 * mm, 12 * mm, 190 * mm, 12 * mm)
        canvas.restoreState()
    doc = SimpleDocTemplate(out, pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm,
                            topMargin=14 * mm, bottomMargin=16 * mm, title=running_header, author="studylynn")
    doc.build(list(story), onFirstPage=deco, onLaterPages=deco)
    print("built:", out)


# =====================================================================
# SUMMARY A — "Veterinary Necropsy.pdf" (253 slides): procedure + general pathology
# =====================================================================
A = make_title("VETERINARY NECROPSY", "Comprehensive Study Summary — Procedure &amp; General Pathology",
               "Source: Dr. Ali Choukeir — <i>Veterinary Necropsy</i> (253-slide deck). The 'how to do a "
               "necropsy + interpret it' course. <b>Red KEY = high-yield; green = definitions; blue = "
               "mechanism/technique.</b>")

A += banner("1 · Foundations &amp; Necropsy Types")
A += [defn("<b>Necropsy</b> = a STRUCTURED diagnostic procedure after death to (1) establish cause + "
           "mechanism of death, (2) define morphologic diagnoses (gross ± microscopic), (3) determine "
           "etiology, (4) translate findings into clinical action (treatment, herd management, public health).")]
A += [Paragraph("Why we do necropsies", SUB)]
A += [bullets([
    "<b>Patient-level:</b> confirm/correct diagnosis (QC for clinician), identify comorbidities/complications, explain unexpected signs, evaluate therapeutic failure.",
    "<b>Herd/flock & population:</b> production-loss drivers, management failures (nutrition/housing/toxins), passive surveillance.",
    "<b>Public health & legal:</b> zoonosis indicator (TB, rabies), forensics (trauma, poisoning, neglect), documentation for disputes."])]
A += [key("<b>Cause vs Mechanism of death.</b> Clinical medicine asks 'what does the patient have?'; "
          "necropsy asks 'what failed first, and what killed them last?' Cause = the disease; Mechanism = the "
          "terminal physiology (shock, hypoxia, hemorrhage, arrhythmia). Name BOTH.")]
A += [Paragraph("The necropsy mindset", SUB)]
A += [P("Before any incision: a <b>differential list</b>, a <b>sampling plan</b>, and a <b>contamination "
        "plan</b>. 'Aimless cutting and hacking has no place.' A systematic survey, not a search for one lesion.")]
A += [Paragraph("The 4 governing principles", SUB)]
A += [bullets([
    "<b>1. Standard routine every time</b> — prevents diagnostic bias; forces examination of every system, severity comparison, primary vs secondary lesions.",
    "<b>2. Minimal disturbance / contamination</b> — once organs move, torsions reduce, fluid shifts, fibrin detaches, gas escapes; open gut before sterile sampling → contamination → unreliable cultures.",
    "<b>3. Reconstructability of organs</b> — diagnoses depend on relationships (chambers vs valves, thrombus origin, tumor invasion). Cut with intention, not curiosity.",
    "<b>4. Best possible specimens</b> — too thick → poor fixation; contaminated → false culture; delayed → degraded DNA/RNA; mixed → unusable. Bad samples = false negatives."])]
A += [Paragraph("The 7 types of necropsy", SUB)]
A += [tbl([
    ["Type", "Definition / focus", "Sampling & key point"],
    ["Diagnostic (clinical)", "Cause + mechanism in an individual; most common in small-animal practice.", "Moderate sterility; histopath + selective culture + effusion cytology ± tox. Answer 4 Qs. RISK = tunnel vision."],
    ["Herd / flock", "Population disease / production problems (cattle, swine, poultry, feedlots).", "3–5 animals min; same tissues across animals; pool for virology; feed+water. One necropsy is insufficient — find the PATTERN."],
    ["Forensic", "Legal context; may go to court.", "Chain of custody, extreme documentation, no evidence destruction, photograph before incision, strict labeling."],
    ["Research / experimental", "University / pharma / toxicology / vaccine trials.", "Strict protocol, blinded, defined locations, quantitative scoring. Over-standardization misses incidentals."],
    ["Teaching", "Student training, normal anatomy, lesion recognition.", "Risk: cutting instead of observing."],
    ["Partial", "Limited question / decomposition / zoonotic risk / owner limitation.", "e.g. suspected rabies → head-only submission."],
    ["Emergency / rapid", "High degradation risk, urgent toxicology, active outbreak.", "Rapid sampling, effusion collection, refrigeration."],
], [30 * mm, 62 * mm, 78 * mm])]
A += [Paragraph("The external examination — 'pure data'", SUB)]
A += [P("The ONLY time you examine the body without destroying evidence. Once you incise: bruising spreads, "
        "blood leaks, gas escapes, contamination begins, orientation changes. The surface reveals whether disease "
        "was systemic and whether trauma/coagulopathy/chronic disease/neglect/injection-reactions/parasitism contributed.")]
A += [tbl([
    ["Step", "Assess", "Interpretation examples"],
    ["1. Overall impression (before touching)", "Body condition, posture, muscle mass, symmetry, struggle, distention", "Good BCS + sudden death → acute; cachexia → chronic systemic; asymmetry → fracture/atrophy/neuro"],
    ["2. Body condition & hydration", "SC fat, muscle bulk, bony prominence; sunken eyes, skin tenting, dry mucosa", "Chronic diarrhea, renal disease, parasitism, starvation/neglect"],
    ["3. Integument", "Coat, alopecia, dermatitis, ulcers, nodules", "Symmetrical alopecia → endocrine; multifocal crusting → ectoparasites; nodules → neoplasia"],
    ["4. Bruising & hemorrhage", "Distribution, symmetry, depth, healing stage", "Critical in forensic & systemic disease"],
    ["5. Orifices", "Eyes/nose/mouth/ears/anus/vulva — discharge, blood, foam, ulcers, prolapse", "Foam → pulmonary edema; nasal hemorrhage → clotting disorder; rectal prolapse → chronic diarrhea"],
    ["6. Nails/claws/hooves", "Wear, breakage, overgrowth", "Broken → struggle/seizure; overgrown → neglect"],
    ["7. Injection sites", "Palpate neck/shoulder/thigh", "Swelling/mass → reaction, iatrogenic infection, vaccine-site sarcoma (cats)"],
], [34 * mm, 70 * mm, 66 * mm])]
A += [Paragraph("The 7-point pre-incision checklist", SUB)]
A += [bullets([
    "<b>1.</b> Confirm identification (species/breed/sex/age/microchip) — misidentification = invalid report.",
    "<b>2.</b> Record time of death + necropsy — needed to interpret autolysis/rigor/clotting.",
    "<b>3.</b> Decide necropsy type — changes sampling, documentation, chain of custody, biosecurity.",
    "<b>4.</b> Summarize history + list differentials (3 lines max).",
    "<b>5.</b> Decide what must be sampled FIRST (effusion, blood clot, liver for tox, stomach contents, lung for PCR).",
    "<b>6.</b> Assess PPE / zoonotic risk (rabies, TB, Salmonella, Brucella).",
    "<b>7.</b> Prepare labeled containers (mislabeling is among the most common errors)."])]
A += [key("Necropsy is IRREVERSIBLE — you cannot undo contamination, restore organ position, fix a missed "
          "tox sample, or re-collect sterile fluid. The checklist forces diagnostic intention, sampling foresight, legal awareness, infection control.")]

A += banner("2 · Postmortem Changes &amp; Artifacts")
A += [P("Most diagnostic errors come from misreading normal postmortem change: overcalling autolysis as "
        "pathology, mistaking hypostasis for hemorrhage, confusing aspiration-at-death with pneumonia. Separate "
        "TRUE disease, TERMINAL change, and POSTMORTEM artifact.")]
A += [note("<b>Biology of dying:</b> O₂ stops → ATP drops → ion pumps fail → cells swell → membranes break "
           "→ enzymes digest tissue (autolysis) → bacteria proliferate (putrefaction).")]
A += [tbl([
    ["Change", "What / driver", "Timeline / detail", "Interpretation"],
    ["Rigor mortis", "Stiffening; ATP depletion locks actin-myosin", "Onset 1–4 h, full 6–12 h, gone 24–36 h (temp, fat, illness)", "Absent early → sepsis/cachexia; advanced → death earlier than reported"],
    ["Livor mortis", "Gravity-settled blood", "Dark red-purple, dependent side", "NOT hemorrhage"],
    ["Postmortem blood", "May clot or stay fluid", "—", "Fluid → consider septicemia/DIC/hypoxia, but can be normal"],
    ["Autolysis", "Self-digestion by cellular enzymes", "Fastest: pancreas/stomach/gut/brain; slow: skin/heart/muscle", "Softening + sloughing but NO inflammation/fibrin/vascular reaction"],
    ["Putrefaction", "Bacterial proliferation", "Gas, bloating, green, foul", "Obscures lesions, ruins culture → record time of death"],
], [26 * mm, 42 * mm, 56 * mm, 46 * mm])]
A += [bullets([
    "<b>Aspiration:</b> true aspiration (during life) = inflammation/hyperemia/fibrin/consolidation; postmortem = material present, NO reaction. The difference is the inflammatory response.",
    "<b>Gas:</b> antemortem bloat vs obstruction vs perforation vs postmortem fermentation. Uniform moderate → postmortem; segmental severe + congestion → obstruction/torsion. Ask: was tissue viable & reactive?",
    "<b>Iatrogenic artifacts:</b> esophageal tearing, rib fractures, knife marks, brain laceration, intestinal rupture. <b>If you caused it, document it.</b>"])]
A += [key("Airway content ALONE never diagnoses pneumonia — correlate with lung tissue reaction. The traps: "
          "hypostasis≠hemorrhage (infiltration), autolysis≠enteritis (no reaction), postmortem aspiration≠pneumonia (no reaction).")]

A += banner("3 · Systematic Dissection")
A += [bullets([
    "<b>Positioning:</b> ruminants → LEFT lateral; monogastrics → RIGHT lateral recumbency.",
    "<b>Technique:</b> lift wall away from viscera, incise linea alba, reflect — then STOP."])]
A += [key("<b>The 30-second rule:</b> observe only — organ position, size, color, fluid, gas, adhesions, "
          "fibrin, hemorrhage, mesenteric tension. The first view is anatomically authentic; manipulation destroys it.")]
A += [Paragraph("Systematic abdominal assessment", SUB2)]
A += [bullets([
    "<b>Fluid:</b> volume, color, clarity, odor.",
    "<b>Organ position:</b> GDV → rotated stomach + displaced spleen; volvulus → twisted root + dark bowel; diaphragmatic hernia → organs in thorax.",
    "<b>Color/congestion:</b> diffuse dark → shock/hypoxia; pale → anemia; patchy → infarcts.",
    "<b>Fibrin = inflammation until proven otherwise</b> (acute = fibrin+turbid fluid; chronic = dense adhesions).",
    "<b>Gas:</b> uniform → postmortem; segmental + congestion → obstruction/torsion."])]
A += [Paragraph("Organ-by-organ (abdomen)", SUB2)]
A += [tbl([
    ["Organ", "Assess", "Interpretation"],
    ["Liver", "Size, capsule, color, consistency, cut surface", "'Pale liver' nonspecific → fat/necrosis/lymphoma/hepatitis/toxin"],
    ["Spleen", "Size, capsule tension, color, nodules", "Enlarged → congestion/hematologic/septicemia; collapsed may be postmortem"],
    ["GI", "Nodes, serosa, thickness; open antimesenteric border", "Mucosal integrity, ulcers, hemorrhage, parasites, foreign bodies"],
    ["Pancreas", "Fat necrosis, hemorrhage, nodules", "Acute pancreatitis → peripancreatic fat necrosis + hemorrhage"],
    ["Kidneys", "Capsule strip, corticomedullary distinction, pelvis; cut longitudinally", "Adherent capsule + lost detail → chronic; pelvic dilation → hydronephrosis"],
    ["Bladder", "Wall, mucosa, stones; collect urine sterilely", "Thick wall → chronic cystitis; uroliths"],
    ["Reproductive", "Uterus (pyometra/pregnancy), testes (torsion), prostate", "Often missed; pyometra can drive sepsis"],
    ["Lymph nodes", "Size, color, consistency", "Enlarged+pale → lymphoma; enlarged+hyperemic → infection"],
], [22 * mm, 80 * mm, 68 * mm])]
A += [note("<b>Correlate abdomen → thorax:</b> shock? septicemia? toxicosis? chronic? obstruction? "
           "Ascites + hepatomegaly → suspect right-sided heart failure → confirm in thorax.")]
A += [Paragraph("Thorax & cardiorespiratory", SUB2)]
A += [bullets([
    "<b>Open the diaphragm first</b> and watch the lungs — normal lungs collapse (negative pressure lost). Failure to collapse → adhesions/effusion/pneumothorax/consolidation.",
    "<b>In-situ survey (5):</b> pleural cavity → pericardium → lungs → mediastinum/vessels → diaphragm.",
    "<b>Fluid:</b> clear/straw → transudate (CHF); turbid → exudate (infection); fibrin → fibrinous serositis (bacterial); blood → hemothorax/hemopericardium.",
    "<b>Lung patterns:</b> cranioventral consolidation → bronchopneumonia; diffuse wet/frothy → edema; multifocal random nodules → septic emboli; diffuse 'meaty' → severe pneumonia.",
    "<b>Remove heart + lungs together</b> (preserve airway continuity, thrombus attachment). Open airway first (foam/blood/exudate/foreign material)."])]
A += [key("<b>Heart — blood-flow method:</b> assess size/shape, then open along flow (RA→RV→PA, LA→LV→aorta). "
          "Valves (vegetations → endocarditis), myocardium (pallor → ischemia, scars), great vessels (thrombi, tears, aneurysm). Never slice randomly — destroys valve evidence.")]
A += [Paragraph("GI tract & CNS", SUB2)]
A += [bullets([
    "<b>Stomach (monogastric):</b> cut greater curvature, observe contents BEFORE removing; mucosa for ulcers/erosions/hemorrhage.",
    "<b>Ruminant forestomach (4):</b> rumen (content/pH/fermentation), reticulum (hardware disease), omasum, abomasum (ulcers/parasites).",
    "<b>Intestines:</b> open ANTIMESENTERIC border, segment by segment; thick wall → chronic, thin → necrosis; check mesenteric nodes first. Classify: mechanical / inflammatory / toxic / parasitic / secondary-to-systemic.",
    "<b>CNS:</b> soft, autolyzes fast, often needs histology. Rabies suspected → no aerosols/power saws. Open vault carefully, lift brain slowly, never pull. Serial transverse sections.",
    "<b>CNS patterns:</b> cloudy/fibrin meninges → meningitis; flattened gyri + herniation → cerebral edema (trauma/hepatic enceph./toxins/hypoxia); enlarged ventricles + thin cortex → hydrocephalus."])]

A += banner("4 · Sampling Science")
A += [note("<b>Gross vs histology:</b> gross = WHERE the lesion is + distribution + severity; histology = WHAT it "
           "is (inflammation/necrosis type, tumor origin, inclusions, fibrosis). A 'pale liver' may be fat, necrosis, lymphoma, hepatitis, or toxin.")]
A += [key("<b>Golden rule:</b> sample the lesion EDGE + adjacent normal — NEVER only the necrotic center "
          "(dead/autolyzed/nonspecific).")]
A += [bullets([
    "<b>Standard set</b> (even if grossly normal): liver, kidney, spleen, lung, heart, brain, stomach/intestine, lymph node, pancreas, any lesion.",
    "<b>Thickness:</b> 6–8 mm (formalin penetrates ~3–4 mm/24 h; too thick → outside fixes, inside autolyzes).",
    "<b>Fixative:</b> 10% neutral buffered formalin; <b>10:1</b> formalin-to-tissue ratio. Never freeze histology samples.",
    "<b>Organ-specific:</b> heart = LV+RV+septum+valves; lung = edge+normal; brain = large formalin volume, never cram; GI = mucosa+submucosa, short flat segments; lymph nodes = high-value.",
    "<b>Labeling:</b> animal ID + organ + date + case number."])]
A += [tbl([
    ["Test", "Tissue handling"],
    ["Histopathology", "Fixed; 6–8 mm; 10% NBF 10:1; never freeze"],
    ["Microbiology", "Fresh, sterile, DEEP lesion; refrigerate (don't freeze); sample BEFORE opening gut. Best: deep lung, sterile brain, early heart blood, internal abscess material"],
    ["Virology / PCR", "Fresh, refrigerate immediately; SPEED critical (RNA degrades). PCR: works on dead organisms; contamination→false+, degradation→false−"],
    ["Toxicology", "Fresh/frozen; NO preservatives. Liver, kidney, fat, stomach+gut contents, urine, ±brain. Contamination (insecticide/fuel/dirty containers) → false+"],
], [28 * mm, 142 * mm])]
A += [key("<b>Sample priority (what degrades fastest):</b> 1) culture → 2) virology/PCR → 3) toxicology → "
          "4) histopathology. False negatives = wrong tissue/timing/storage/contamination/autolysis — NOT absent disease.")]

A += banner("5 · Forensic Pathology")
A += [defn("A <b>forensic necropsy</b> is performed when legal implications exist (abuse, poisoning, trauma, "
           "ownership/insurance disputes). Medicine + pathology + law + evidence science. Findings may go to court.")]
A += [bullets([
    "<b>Goals:</b> cause, mechanism, MANNER of death, and timing (before/during/after death).",
    "<b>The 4 questions:</b> (1) what caused death? (2) how — mechanism? (3) when — antemortem/perimortem/postmortem? (4) accidental, natural, or intentional (manner)?"])]
A += [key("<b>Vital reaction</b> = evidence tissue was ALIVE at injury (hemorrhage, inflammation, clot). No vital "
          "reaction → possibly postmortem. This resolves the timing question.")]
A += [note("<b>Forensic mindset:</b> clinical necropsy searches for disease; forensic necropsy PRESERVES "
           "evidence. You are a medical scientist — not police, judge, or prosecutor.")]
A += [bullets([
    "<b>Chain of custody:</b> who collected/handled/stored/transferred — without it, evidence is inadmissible.",
    "<b>Photograph BEFORE incision:</b> whole body, multiple angles, lesion close-ups, ID markers, scene; include scale, good lighting, NO filters.",
    "<b>Bruising:</b> true antemortem bruise INFILTRATES tissue + coagulates; hypostasis only stains the surface.",
    "<b>Trauma:</b> gunshot (entry/exit/trajectory/fragments); blunt force (rib fractures, organ rupture, SC hemorrhage); neglect (cachexia, pressure sores, overgrown nails/hooves, parasitism).",
    "<b>Toxicology in forensics:</b> rodenticides, ethylene glycol, organophosphates, NSAIDs, heavy metals; samples fresh, no preservatives.",
    "<b>Accident vs abuse:</b> lesion pattern, healing stages, distribution, consistency with history. Multiple healing stages + inconsistent history → suspect abuse."])]
A += [key("<b>Reporting:</b> objective, non-emotional — 'findings are consistent with repeated blunt-force "
          "trauma over multiple time periods,' never 'the owner abused the animal.' Errors: no photos, destroyed wound tracks, contaminated tox, speculation, emotional wording.")]

A += banner("6 · Reporting &amp; General Pathology")
A += [key("<b>THE rule:</b> separate DESCRIPTION from INTERPRETATION. Bad: 'the liver was septic.' Good: 'enlarged "
          "with multifocal pale raised nodules 0.5–2 cm' → later: 'consistent with multifocal bacterial abscessation.'")]
A += [Paragraph("Report structure & lesion language", SUB)]
A += [bullets([
    "<b>Structure:</b> (1) identification, (2) history (2–5 lines), (3) external exam, (4) internal exam (largest, by system), then morphologic diagnoses → interpretation → differentials → ancillary tests → final diagnosis/cause of death.",
    "<b>Describe a lesion by 7 features:</b> location, size, shape, color, distribution, consistency, severity.",
    "<b>Morphologic diagnosis formula:</b> Severity + Duration + Lesion type + Organ + Distribution → 'severe acute diffuse fibrinosuppurative bronchopneumonia.'",
    "<b>Final diagnosis</b> = primary disease + mechanism of death + contributing conditions. Acknowledge differentials honestly.",
    "<b>Errors:</b> vague language, mixing description/interpretation, overstating certainty, ignoring postmortem artifact."])]
A += [key("<b>PATTERN &gt; single lesion.</b> Pale liver + enlarged spleen + petechiae + dark unclotted blood "
          "→ septicemia. Reason every case: history → gross → distribution → pathophysiology → differentials → sampling → cause of death.")]
A += [Paragraph("The 5 major lesion categories", SUB)]
A += [tbl([
    ["Category", "Hallmarks & detail"],
    ["1. Inflammatory", "Response to infection/injury/toxins/necrosis. Serous (watery, mild/early) → fibrinous (yellow-white fibrin; severe vascular injury/bacterial) → suppurative (pus/neutrophils; pyogenic) → hemorrhagic (inflammation + blood)."],
    ["2. Circulatory", "Congestion (dark red/heavy; heart failure/shock/hypoxia/torsion); hemorrhage (petechiae→ecchymoses→hematoma); edema (wet/heavy; pulmonary → heavy lungs + frothy trachea)."],
    ["3. Degenerative", "Toxins/hypoxia/metabolic/nutritional. Fatty change (pale, enlarged, greasy); necrosis (focal→diffuse)."],
    ["4. Neoplastic", "Mass formation, invasion, metastasis. Benign = demarcated/localized/slow; malignant = invasive/irregular/metastatic/destructive. Mets: multiple liver/lung nodules, enlarged nodes, serosal implants."],
    ["5. Mechanical", "GDV, torsion, hernia, obstruction, intussusception. Distension, congestion, ischemia, necrosis, SHARP transition zones."],
], [32 * mm, 138 * mm])]
A += [note("<b>Lesion chronicity:</b> acute = hyperemia/hemorrhage/edema/fibrin; chronic = fibrosis/adhesions/scarring/nodularity.")]
A += [Paragraph("Integrated case reasoning", SUB)]
A += [tbl([
    ["Case", "Key findings", "Diagnosis / mechanism"],
    ["Great Dane, acute distension + sudden death", "Distended stomach rotated clockwise, displaced congested spleen, gastric wall necrosis, pulmonary congestion", "Severe acute GDV → venous compression → ↓ return → shock + arrhythmias (mechanical + circulatory)"],
    ["Holstein cow, sudden death, dark blood", "Blood from nose, rapid bloating, dark unclotted blood, big spleen, diffuse hemorrhages", "Hemorrhagic septicemic syndrome; DDx anthrax/clostridial/Gram-neg. Don't open aggressively if anthrax suspected"],
    ["Cat, chronic weight loss", "Cachexia, thickened intestines, big mesenteric nodes, pale liver nodules", "Suspected alimentary lymphoma — histopathology required, don't overstate"],
    ["Puppy, hemorrhagic diarrhea, unvaccinated", "Hemorrhagic enteritis, enlarged nodes, dehydration, empty intestines", "Canine parvoviral enteritis (fresh intestine for PCR + fixed + node)"],
    ["Horse, colic + deterioration", "Dark congested intestine, twisted mesentery, severe distension", "Mechanical obstruction → vascular compromise → ischemia → necrosis → shock"],
], [42 * mm, 64 * mm, 64 * mm])]
A += [Spacer(1, 8), HRFlowable(width="100%", color=ACCENT2, thickness=0.7)]
A += [key("<b>Professor's core message:</b> think in sequence every case — history → gross pattern → lesion "
          "distribution → pathophysiology → differentials → sampling → cause of death.")]
A += [Paragraph("Source: Veterinary Necropsy (253-slide deck) · summary for studylynn.", SMALL)]

build("Veterinary Necropsy - Procedure Summary.pdf",
      "Veterinary Necropsy — Procedure & General Pathology Summary", A)


# =====================================================================
# SUMMARY B — the .pptx (59 slides): organ-system pathology
# =====================================================================
B = make_title("NECROPSY: ORGAN-SYSTEM PATHOLOGY", "Comprehensive Study Summary — Neoplasia · Septicemia · "
               "Cardiovascular · Respiratory",
               "Source: Dr. Ali Choukeir — organ-system pathology deck (59 slides). The 'what the lesions "
               "mean, organ by organ' companion. <b>Red KEY = high-yield; green = definitions; blue = mechanism.</b>")

B += banner("1 · Neoplasia at Necropsy")
B += [defn("Gross necropsy rarely identifies the exact tumor type with certainty — histopathology determines "
           "cell origin, malignancy grade, invasion, and mitotic activity.")]
B += [bullets([
    "<b>Neoplasia vs inflammation:</b> tumors usually distort anatomy, invade tissue, form masses; inflammation usually preserves architecture more, has exudate/fibrin, follows inflammatory patterns — but overlap exists, histopathology confirms.",
    "<b>Tumor sampling:</b> always sample center, edge, adjacent normal tissue, lymph nodes, and metastatic lesions.",
    "<b>The pathologist's questions:</b> primary or metastatic? tissue of origin? invasive? which organs secondarily affected? what killed the animal — tumor burden, hemorrhage, organ failure, or cachexia?",
    "<b>Common errors:</b> assuming all nodules are metastases, all masses are malignant, sampling only the necrotic center, ignoring lymph nodes, forgetting systemic effects."])]
B += [note("<b>Benign vs malignant:</b> benign = well-demarcated, localized, slow-growing; malignant = invasive, "
           "irregular, metastatic, destructive. Common metastatic patterns: multiple liver nodules, pulmonary nodules, enlarged lymph nodes, serosal implants.")]

B += banner("2 · Septicemia &amp; Systemic Inflammatory Disease")
B += [defn("<b>Septicemia</b> = presence and multiplication of pathogenic organisms or toxins in the BLOODSTREAM "
           "causing systemic disease — a whole-body vascular/inflammatory syndrome, NOT a localized infection. The "
           "bloodstream distributes bacteria, toxins, and mediators → diffuse endothelial injury, vascular leakage, "
           "coagulation abnormalities, hypoxia → lesions in MANY organs at once. Can produce shock, DIC, hemorrhage, organ failure, sudden death.")]
B += [key("<b>The classic septicemic pattern (memorize):</b> petechiae/ecchymoses + enlarged spleen + dark "
          "unclotted blood + congested organs + edema + fibrinous inflammation + swollen lymph nodes. Think SYSTEMIC, not one organ.")]
B += [Paragraph("Component findings", SUB)]
B += [bullets([
    "<b>Hemorrhage patterns:</b> petechiae (pinpoint — vascular injury, thrombocytopenia, DIC, septicemia); ecchymoses (larger — severe vascular damage, coagulopathy).",
    "<b>Spleen:</b> enlarged, dark, congested, soft/friable (filters blood, traps organisms, hyperactive).",
    "<b>Lymph nodes:</b> enlarged, wet, hyperemic (massive immune activation) — examine mesenteric, mediastinal, mandibular.",
    "<b>Fibrinous inflammation:</b> severe vessel damage → fibrin leakage → fibrinous peritonitis/pleuritis/pericarditis (polyserositis)."])]
B += [Paragraph("Mechanisms & complications", SUB)]
B += [tbl([
    ["Entity", "Mechanism / setting", "Gross findings"],
    ["Endotoxemia", "Bacterial endotoxins (LPS) → cytokine storm → vascular collapse, coagulation abnormalities (horses, cattle, severe Gram-neg)", "Congestion, edema, hemorrhage, shock organs"],
    ["DIC", "Excessive coagulation → microthrombi → consumed clotting factors → secondary hemorrhage", "Diffuse petechiae/ecchymoses, organ infarcts, unclotted blood"],
    ["Shock organs", "Hypoperfusion damages target organs", "Lungs (congestion/edema), liver (centrilobular necrosis), kidneys (acute tubular necrosis, pallor)"],
    ["Septic emboli", "Bacteria lodge in organs via bloodstream", "Multifocal RANDOM abscesses/infarcts/nodules — lung, liver, kidney, brain"],
], [28 * mm, 84 * mm, 58 * mm])]
B += [bullets([
    "<b>Causes:</b> neonatal (umbilical infection, failure of passive transfer), GI (severe enteritis, intestinal rupture), respiratory (severe pneumonia), uterine (metritis, pyometra), wounds (bites, abscesses).",
    "<b>Septicemia vs toxemia:</b> septicemia = organisms in blood; toxemia = toxins circulating, organisms may stay localized (gross overlaps).",
    "<b>Species differences:</b> horses very prone to endotoxemia; cattle common fibrinous polyserositis; poultry severe septicemia with splenomegaly.",
    "<b>Sampling:</b> spleen, liver, lung, blood (early cases), lymph node — both fresh and fixed.",
    "<b>The pathologist's thinking:</b> petechiae + big spleen + dark blood + fibrin + edema → SYSTEMIC inflammatory disease, not isolated organ pathology."])]

B += banner("3 · Cardiovascular Pathology")
B += [note("<b>The heart is a pump.</b> Most cardiac lesions kill by impairing blood flow, oxygen delivery, or "
           "electrical stability — always ask 'how did this lesion alter circulation?' Four categories: congestive, "
           "valvular, myocardial, vascular. Heart disease is often underestimated or confused with primary respiratory disease.")]
B += [tbl([
    ["Lesion", "Species / setting", "Key gross findings"],
    ["Left-sided CHF", "All", "Blood backs into lungs → heavy wet lungs, frothy tracheal fluid, pulmonary edema, left atrial dilation"],
    ["Right-sided CHF", "All", "Systemic venous congestion → ascites, hepatomegaly, pleural effusion, jugular congestion, peripheral edema"],
    ["Chronic passive congestion (nutmeg liver)", "Usually right-sided CHF", "Enlarged liver, dark red centrilobular areas, 'nutmeg' pattern — venous blood can't leave the liver"],
    ["Myxomatous mitral valve degeneration", "Small older dogs (most common acquired canine heart disease)", "Thickened nodular mitral valve, enlarged left atrium, pulmonary edema"],
    ["Endocarditis", "All", "Friable valve vegetations, irregular surfaces, thrombi → septic emboli, valve insufficiency, heart failure"],
    ["Dilated cardiomyopathy (DCM)", "Large-breed dogs", "Enlarged flabby heart, thin ventricular walls, chamber dilation → arrhythmias, CHF, sudden death"],
    ["Hypertrophic cardiomyopathy (HCM)", "Cats", "Thick LV wall, small lumen, left atrial enlargement → pulmonary edema, aortic (saddle) thromboembolism"],
    ["Heartworm disease", "Dogs (cats)", "Worms in pulmonary artery/right heart, RV hypertrophy, pulmonary vascular lesions"],
    ["Cardiac hemangiosarcoma", "Dogs (right atrium)", "Dark hemorrhagic mass, blood-filled pericardium → hemopericardium, tamponade, sudden collapse"],
    ["Cardiac tamponade", "All", "Pericardial fluid/blood compresses heart → poor filling → shock; distended sac, collapsed chambers"],
    ["Vascular lesions", "All", "Atherosclerosis (rare); aneurysm (rupture/hemorrhage risk); vasculitis (infection/immune/toxins → hemorrhage, thrombosis, ischemia)"],
], [38 * mm, 46 * mm, 86 * mm])]
B += [key("<b>Thrombus vs postmortem clot:</b> true thrombus formed during life = ATTACHED to wall, firm, "
          "laminated. Postmortem clot = not attached, gelatinous, smooth/shiny. <b>Shock</b> (CV-central): congestion, "
          "pale mucosa, edema, petechiae, organ hypoxia. Cardiac sampling: LV + RV + septum + valves + any lesion.")]

B += banner("4 · Respiratory Pathology")
B += [key("<b>Lung diagnosis depends on DISTRIBUTION, not just color.</b> A dark lung alone means little. Normal "
          "lung = pink, spongy, light, collapses when the thorax is opened. Abnormal = heavy, firm, wet, dark, nodular, non-collapsing.")]
B += [tbl([
    ["Pattern", "Distribution", "Disease / cause"],
    ["Bronchopneumonia", "Cranioventral", "Bacterial — spreads via airways, settles ventrally. Firm red/gray consolidation, fails to collapse, suppurative exudate"],
    ["Aspiration pneumonia", "Cranioventral", "Vomiting, tube-feeding errors, neurologic disease, anesthesia. Foreign material in airways, necrotizing inflammation"],
    ["Interstitial pneumonia", "Diffuse", "Targets alveolar walls/interstitium. Heavy rubbery non-collapsing lungs. Viral, toxic, ARDS, some systemic infection"],
    ["Embolic pneumonia", "Multifocal random nodules", "Hematogenous spread (not airway) → find the source (endocarditis, hepatic/umbilical abscess)"],
    ["Pulmonary edema", "Diffuse, wet", "Heavy wet lungs, fluid on cut surface, tracheal froth. Left-CHF, electrocution, neurogenic, toxins, shock"],
    ["Emphysema", "Overinflated", "Air in tissue → pale, dry, crepitant. Alveolar (trapped in alveoli) or interstitial (dissecting; common in cattle)"],
], [38 * mm, 36 * mm, 96 * mm])]
B += [bullets([
    "<b>Pleural disease:</b> pleuritis (fibrin, adhesions, turbid fluid); pneumothorax (air in pleural cavity → lungs collapse, negative pressure lost; trauma/rupture/iatrogenic).",
    "<b>Lung hemorrhage</b> differentials: trauma, septicemia, coagulopathy, drowning, toxins.",
    "<b>Lung color interpretation:</b> color alone is unreliable — interpret with consistency, distribution, collapse, exudate, pattern.",
    "<b>Always open the trachea:</b> foam (edema), blood, parasites, exudate, foreign material.",
    "<b>Respiratory parasites:</b> lungworms, heartworm-associated lesions → nodules, bronchitis, consolidation, vascular lesions.",
    "<b>Sampling:</b> histology = lesion edge + normal lung; culture = deep sterile sample; virology = fresh refrigerated tissue."])]
B += [Spacer(1, 8), HRFlowable(width="100%", color=ACCENT2, thickness=0.7)]
B += [Paragraph("Source: organ-system pathology deck (59 slides) · companion summary for studylynn.", SMALL)]

build("Veterinary Necropsy - Organ-System Pathology Summary.pdf",
      "Necropsy — Organ-System Pathology Summary", B)
