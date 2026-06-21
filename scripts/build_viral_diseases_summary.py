#!/usr/bin/env python3
"""Comprehensive study summary of two veterinary virology sources:
   A) "Viral diseases of small ruminants - part 2 (16-40).pdf"  -> Bluetongue
   B) "maladies virales 3 - extract.pdf" -> bovine viral skin/mucosal diseases
Outputs one combined PDF at the repo root (not committed).
    python scripts/build_viral_diseases_summary.py
Requires: reportlab
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                ListFlowable, ListItem, HRFlowable, CondPageBreak)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

OUT = "Viral Diseases - Bluetongue & Bovine Skin Viruses Summary.pdf"
INK = colors.HexColor("#0f1115"); TEAL = colors.HexColor("#0d9488"); SLATE = colors.HexColor("#334155")
LIGHT = colors.HexColor("#f1f5f9"); ACCENT2 = colors.HexColor("#64748b")
GREENBG = colors.HexColor("#ecfdf5"); BLUEBG = colors.HexColor("#eff6ff"); REDBG = colors.HexColor("#fef2f2")

st = getSampleStyleSheet()
H1 = ParagraphStyle("H1", parent=st["Heading1"], fontName="Helvetica-Bold", fontSize=15,
                    textColor=colors.white, spaceAfter=2, leading=18)
PH = ParagraphStyle("PH", parent=st["Heading2"], fontName="Helvetica-Bold", fontSize=13,
                    textColor=colors.white, leading=16)
SUB = ParagraphStyle("SUB", parent=st["Heading3"], fontName="Helvetica-Bold", fontSize=10.5,
                     textColor=TEAL, spaceBefore=8, spaceAfter=2, leading=13)
SUB2 = ParagraphStyle("SUB2", parent=st["Heading4"], fontName="Helvetica-Bold", fontSize=9.3,
                      textColor=SLATE, spaceBefore=5, spaceAfter=1, leading=12)
BODY = ParagraphStyle("BODY", parent=st["BodyText"], fontName="Helvetica", fontSize=8.7,
                      leading=11.5, spaceAfter=2, alignment=TA_LEFT)
BULL = ParagraphStyle("BULL", parent=BODY, leftIndent=9, bulletIndent=0, spaceAfter=0.5)
SMALL = ParagraphStyle("SMALL", parent=BODY, fontSize=7.6, textColor=ACCENT2)
CALL = ParagraphStyle("CALL", parent=BODY, fontSize=8.6, leading=11.4)


def esc(s): return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
def P(t): return Paragraph(t, BODY)
def bullets(items): return ListFlowable([ListItem(Paragraph(t, BULL), value="•", leftIndent=11) for t in items],
                                        bulletType="bullet", start="•", leftIndent=11, spaceBefore=1, spaceAfter=3)
def _c(text, bg, border):
    t = Table([[Paragraph(text, CALL)]], colWidths=[170*mm])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),bg),("BOX",(0,0),(-1,-1),0.7,border),
                           ("LINEBEFORE",(0,0),(0,-1),2.2,border),("LEFTPADDING",(0,0),(-1,-1),7),
                           ("RIGHTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4)]))
    return t
def key(t): return _c("<b>KEY &nbsp;</b>"+t, REDBG, colors.HexColor("#dc2626"))
def note(t): return _c(t, BLUEBG, colors.HexColor("#3b82f6"))
def defn(t): return _c(t, GREENBG, colors.HexColor("#10b981"))
def banner(text):
    t = Table([[Paragraph(text, PH)]], colWidths=[170*mm])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),INK),("LINEBELOW",(0,0),(-1,0),2,TEAL),
                           ("LEFTPADDING",(0,0),(-1,-1),9),("RIGHTPADDING",(0,0),(-1,-1),9),
                           ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6)]))
    return [CondPageBreak(42*mm), Spacer(1,6), t, Spacer(1,4)]
def tbl(rows, widths, fs=7.8):
    data=[[Paragraph(c if c.startswith("<") else esc(c),
            ParagraphStyle("c",parent=BODY,fontSize=fs,leading=fs+2.3,
              textColor=colors.white if i==0 else colors.black,
              fontName="Helvetica-Bold" if i==0 else "Helvetica")) for c in row] for i,row in enumerate(rows)]
    t=Table(data,colWidths=widths,hAlign="LEFT",repeatRows=1)
    t.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),4),
        ("RIGHTPADDING",(0,0),(-1,-1),4),("TOPPADDING",(0,0),(-1,-1),3),("BOTTOMPADDING",(0,0),(-1,-1),3),
        ("GRID",(0,0),(-1,-1),0.4,colors.HexColor("#cbd5e1")),("BACKGROUND",(0,0),(-1,0),SLATE),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white,LIGHT])]))
    return t

S=[]
title=Table([[Paragraph("VIRAL DISEASES — STUDY SUMMARY", H1)],
             [Paragraph("Bluetongue (small ruminants) &amp; Bovine Viral Skin / Mucosal Diseases",
                        ParagraphStyle("s",parent=SMALL,textColor=colors.HexColor("#5eead4"),fontSize=10))]],
            colWidths=[170*mm])
title.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),INK),("LEFTPADDING",(0,0),(-1,-1),10),
    ("RIGHTPADDING",(0,0),(-1,-1),10),("TOPPADDING",(0,0),(0,0),9),("BOTTOMPADDING",(0,0),(-1,-1),9),
    ("LINEBELOW",(0,0),(-1,0),2.5,TEAL)]))
S+=[title, Spacer(1,4),
    P("Compiled from two lecture sources: <i>Viral Diseases of Small Ruminants – Part 2</i> (Bluetongue) "
      "and <i>Maladies virales 3</i> (bovine viral skin &amp; mucous-membrane diseases). "
      "<b>Red KEY = high-yield; green = definitions; blue = mechanism/epidemiology.</b>"),
    Spacer(1,2), HRFlowable(width="100%", color=TEAL, thickness=1)]

# ===================== PART 1 — BLUETONGUE =====================
S+=banner("Part 1 · Bluetongue / Catarrhal Fever (Small Ruminants &amp; Cattle)")
S+=[defn("<b>Bluetongue (catarrhal fever)</b> — a NOTIFIABLE, insect-borne viral disease of ruminants. "
         "Sheep show severe clinical disease; cattle are usually subclinical and act as the main reservoir.")]
S+=[Paragraph("Etiology", SUB)]
S+=[bullets([
    "<b>Family Reoviridae, genus Orbivirus</b> (same genus group as African horse sickness virus).",
    "<b>Segmented double-stranded RNA — 10 segments;</b> outer capsid, inner capsid, and core. Non-enveloped.",
    "<b>High variability</b> through mutation/reassortment of the segmented genome → many serotypes."])]
S+=[Paragraph("Epidemiology & transmission", SUB)]
S+=[bullets([
    "<b>Vector-borne (main route):</b> bite of <i>Culicoides</i> midges (blood-sucking) — a single infected blood meal on a viremic animal is enough.",
    "<b>Vertical / transplacental:</b> infection of the fetus → abortions, congenital anomalies, birth of chronically infected calves/lambs.",
    "<b>Venereal:</b> infected semen during viremia. <b>Oral route</b> in the fetus is suspected (field evidence).",
    "<b>Prolonged viremia</b> (lambs and calves remain viremic for several months) + survival of midges in barns over winter → <b>overwintering</b> (persistence of infection through winter)."])]
S+=[Paragraph("Clinical signs — SHEEP (acute form)", SUB)]
S+=[bullets([
    "<b>Incubation 6–8 days</b> (range 2–18). General onset: severe <b>hyperthermia up to 42°C</b>, anorexia, dullness, drop in lactation, progression to wasting/cachexia (fever lasts 4–8 days).",
    "<b>24–48 h after fever — head/face (congestive, edematous, hemorrhagic):</b> ulcerative-necrotic stomatitis, facial edema, nasal &amp; ocular discharge, conjunctivitis, congestion of the tongue, hypersalivation.",
    "<b>From day 6 — limbs &amp; udder:</b> coronary band swelling, pronounced lameness, limb edema, myositis, skin congestion/erythema, ulcerative-necrotic lesions on the teats.",
    "<b>Other:</b> skin congestion, wool loss, bloody diarrhea; complications — pneumonia, scabies, ecthyma, foot rot, oestrosis/myiasis; abortions &amp; congenital anomalies."])]
S+=[key("<b>Outcome (sheep):</b> morbidity 80–100%, mortality 5–10% (can reach 20–50%). Death within 10–12 days "
        "in fatal cases; survivors recover slowly (~2 weeks). Sequelae: growth retardation, sterility, reduced "
        "sperm quality (reversible) and altered meat quality.")]
S+=[note("<b>Subacute form (sheep):</b> rare — milder, with transient/often-unnoticed fever.")]
S+=[Paragraph("Clinical signs — CATTLE", SUB)]
S+=[bullets([
    "Usually <b>subclinical / low incidence;</b> preferentially affects adults. Often only transient, unnoticed hyperthermia + a drop in milk production. Cattle are the main <b>reservoir</b>.",
    "<b>When signs occur — face:</b> muzzle ulcero-necrotic crusted lesions, ulcerative lesions in the nostrils, mucous→mucopurulent discharge, oral/tongue ulcers + hypersalivation, periocular edema &amp; erythema with tearing.",
    "<b>Locomotor:</b> limb edema, interdigital lesions, muscle stiffness, necrotic lesions on the back with detachment of skin flaps.",
    "<b>Udder (late):</b> erythema and edema of the udder, ulcerative-necrotic lesions on the teats."])]

# ===================== PART 2 — BOVINE VIRAL SKIN DISEASES =====================
S+=banner("Part 2 · Bovine Viral Skin &amp; Mucous-Membrane Diseases")
S+=[P("Six viral conditions of cattle skin/mucosae. Many target the <b>teat &amp; udder</b> and require a "
      "<b>prior skin lesion</b> to establish (healthy skin resists). The differential table below is the high-yield core; details follow.")]
S+=[tbl([
    ["Disease","Agent (family / genus)","Hallmark lesions","Notes / zoonosis"],
    ["Infectious thelitis / Allerton","Bovine Herpesvirus 2 (BHV-2); Herpesviridae, enveloped dsDNA","Teat induration → vesicles → painful superficial ulcers; skin turns bluish-black; centripetal healing","Optimal replication 32°C; needs prior lesion; Allerton = generalized 'pseudo-lumpy skin disease'"],
    ["Papular stomatitis","Parapoxvirus bovis-1; Poxviridae / Parapoxvirus","Papules→crusts around mouth/muzzle/tongue of young cattle (<1 yr)","Benign; ZOONOSIS ('milker's nodule'); intracytoplasmic inclusions; giant cells"],
    ["Papillomatosis (warts)","Bovine papillomavirus BPV 1–6; Papovaviridae, dsDNA","Cauliflower-like hyperkeratotic warts; regress in 1–12 months","Young <2 yr; subgroup A (BPV1,2,5)=fibropapillomas, B (BPV4,6)=true papillomas"],
    ["Cowpox (bovine smallpox)","Cowpox virus; Poxviridae / Orthopoxvirus","Painful papulovesicular pox lesions on teats, udder, scrotum","Needs prior teat damage; spread by milking"],
    ["Vesicular stomatitis","Vesiculovirus; Rhabdoviridae, enveloped RNA","Vesicles→ulcers on teats, muzzle, lips, tongue, coronary band, interdigital","Indistinguishable from FMD; Americas only; OIE category A; ZOONOSIS (flu-like)"],
    ["Pseudocowpox (pseudovariola)","Bovine Parapoxvirus; Poxviridae / Parapoxvirus","Erythema→umbilicated papule→pustule→scab; HORSESHOE/RING scab = pathognomonic","MOST COMMON teat disease of lactating cows; ZOONOSIS ('milker's nodule')"],
], [30*mm, 40*mm, 52*mm, 48*mm])]

S+=[Paragraph("1 · Bovine Infectious Thelitis &amp; Allerton Disease (BHV-2)", SUB)]
S+=[bullets([
    "<b>Agent:</b> Bovine Herpesvirus 2 — enveloped, icosahedral, 100–160 nm dsDNA; sensitive to ether/chloroform and to pH &lt; 3.",
    "<b>Epidemiology:</b> all breeds/ages; seasonal (autumn, late June→early January); insects act as mechanical vectors; the milking machine &amp; milker's hands are proven transmitters. Sources: lesion blood/serum, milk, saliva, feces. Morbidity 83–96% in a naïve herd; mortality very low. Calves infected while suckling develop small oral/muzzle ulcers (~0.5 mm).",
    "<b>Pathogenesis:</b> CANNOT penetrate healthy skin — needs a prior lesion (e.g. from plants). Cold autumn/winter lowers udder-skin temperature → cracking → replication; <b>optimal replication temperature 32°C</b>. Reactivates after recovery following stress.",
    "<b>Clinical (udder/teat):</b> after 3–7 d incubation, teat-skin induration (first lesion) → rare 0.5–2 cm vesicles at the udder-teat junction → rupture within a day releasing amber, virus-laden exudate; skin hardens to a bluish-black color in 24 h → superficial bright-red painful ulcer → scab. New epithelium from week 3; scabs fall ~day 28; centripetal healing. Milking is painful.",
    "<b>Generalized / Allerton (pseudo-lumpy skin disease):</b> lesions over the whole body limited to superficial epidermis — raised plaques with a central depression + superficial necrosis; scabs fall in 10–14 d leaving scar tissue; healing 5–6 weeks; no mortality. No general symptoms."])]

S+=[Paragraph("2 · Bovine Papular Stomatitis (Parapoxvirus bovis-1)", SUB)]
S+=[bullets([
    "<b>Agent:</b> cocoon-shaped Parapoxvirus (Poxviridae), closely related to the cowpox/smallpox virus; cultivable on kidney cells → eosinophilic &amp; basophilic intracytoplasmic inclusions. <b>CPE: cell fusion → giant cells → lysis.</b>",
    "<b>Epidemiology:</b> worldwide, no breed/sex predilection; mainly animals &lt; 1 year (adults are reservoirs); sources = lesions, nasal secretions, saliva; direct contact ± indirect (food/water); morbidity ~10%, mortality rare. <b>Benign zoonosis</b> (milker's-nodule-like in humans).",
    "<b>Clinical:</b> proliferation of lesions around the mouth (lips, tongue, muzzle) of young cattle; on the teat — painful edema + erythema with shiny exudate (2–5 d incubation) → flattened papules/plaques → either proliferative (papulo-verrucous) or central necrosis → crust; healing 3–6 weeks, no scar. Chronic form in calves: hyperthermia, ptyalism, lethargy, ↓ appetite, generalized hyperkeratosis."])]

S+=[Paragraph("3 · Bovine Papillomatosis — Warts (BPV 1–6)", SUB)]
S+=[bullets([
    "<b>Agent:</b> 6 bovine papillomaviruses (BPV 1–6), Papovaviridae / Papillomavirus; cattle-specific, dsDNA in a protein (non-lipid) capsid → very high environmental resistance.",
    "<b>Two subgroups:</b> A = BPV1, 2, 5 (fibropapillomas); B = BPV4, 6 (true papillomas). BPV1/5/6 are the main teat-wart types; <b>BPV2 → neck/head</b> lesions.",
    "<b>Epidemiology:</b> young animals &lt; 2 yr; no sex/breed predilection; spontaneous regression in 1–12 (–14) months. Mortality 0%, morbidity 10–50% (up to 100% in a herd). Spread by direct contact or indirect (insects, bushes); usually needs a pre-existing lesion (bite, trauma, UV). Incubation 2–6 months.",
    "<b>Clinical:</b> multiple gray, hyperkeratotic, cauliflower-shaped lesions (pedunculated or sessile), mm to several cm, on teats/udder/white line. Generalized form only in immunocompromised animals. Afebrile, no general symptoms."])]

S+=[Paragraph("4 · Cowpox / Bovine Smallpox (Orthopoxvirus)", SUB)]
S+=[bullets([
    "<b>Agent:</b> cowpox virus — Poxviridae, subfamily Chordopoxvirinae, genus <b>Orthopoxvirus</b> (DNA virus).",
    "<b>Clinical:</b> painful <b>papulovesicular</b> rash on teats, udder of lactating cows, and scrotum of males.",
    "<b>Transmission:</b> mainly during milking (machine liners, milker's hand); requires prior teat damage (erosion/microtrauma) — healthy skin resists."])]

S+=[Paragraph("5 · Vesicular Stomatitis (Rhabdoviridae, Vesiculovirus)", SUB)]
S+=[bullets([
    "<b>Agent:</b> RNA virus, Rhabdoviridae, genus Vesiculovirus; fragile — destroyed by lipid solvents, phenolics, quaternary ammonium. Two main serotypes: <b>New Jersey</b> and <b>Indiana</b>.",
    "<b>Importance:</b> clinically INDISTINGUISHABLE from foot-and-mouth disease; found only in the Americas; <b>OIE category A</b> (major economic losses); benign <b>zoonosis</b> (flu-like ± mucocutaneous erosions).",
    "<b>Hosts/epidemiology:</b> cattle, horses, pigs, llamas; no age/breed/sex preference; transmitted by insects (Simulidae, Culicoides, Lutzomyia) and by contact through epithelial breaks. Morbidity 90–100%, mortality ~1%.",
    "<b>Pathogenesis/clinical:</b> virus destroys cells just below the epithelial basement membrane → large vesicles that burst into quickly-healing ulcers. After 24–48 h incubation: vesicles/blisters on teats → ulcers; same lesions in interdigital space, coronary band, muzzle, lips, prepuce, tongue. General: fever 40–41°C, lethargy, ptyalism, nasal discharge, mucosal exfoliation."])]

S+=[Paragraph("6 · Pseudocowpox / Pseudovariola / Paravaccine (Bovine Parapoxvirus)", SUB)]
S+=[bullets([
    "<b>Agent:</b> Bovine Parapoxvirus (Poxviridae, enveloped DNA); extremely resistant to heat/desiccation, survives in scabs for months–years; lipid envelope → susceptible to ether/chloroform.",
    "<b>Importance:</b> the MOST COMMON teat disease of lactating cows; present on all continents, enzootic; contagious but benign; <b>zoonosis</b> → 'milkman's nodule' in humans.",
    "<b>Epidemiology:</b> affects only lactating cows (heifers most), any season (↑ wet autumn/spring &amp; around calving); morbidity up to 100% (usually 5–10% at once); direct contact or suckling, indirect via milking sleeves/insects. <b>Weak, unstable immunity → reinfection;</b> persistent infection + stress-reactivation; carriers are reservoirs.",
    "<b>Clinical:</b> erythema + edema (painful) → red umbilicated papule (5–8 mm, ~2 d) → vesicle → pustule → ruptures → ulcer spreading centrifugally → scab. The scab's center desquamates while the periphery stays attached, forming a reddish budding <b>horseshoe / ring lesion — PATHOGNOMONIC</b>. Heals in 6 weeks, no scar; relapses possible. Perineum/ventrum and bull scrotum may be affected; calves that suckle get papular-stomatitis-like lesions. Milking pain → retention mastitis."])]

S+=[Spacer(1,8), HRFlowable(width="100%", color=ACCENT2, thickness=0.7)]
S+=[key("<b>Teat-lesion differential pearls:</b> horseshoe/ring scab → <b>pseudocowpox</b>; cannot-infect-healthy-skin "
        "+ 32°C + bluish-black hardening → <b>BHV-2 thelitis</b>; cauliflower warts → <b>papillomatosis</b>; "
        "FMD-like vesicles in the Americas → <b>vesicular stomatitis</b>; true painful pox (Orthopoxvirus) → "
        "<b>cowpox</b>; oral papules in calves &lt; 1 yr → <b>papular stomatitis</b>. Milker's-nodule zoonoses: "
        "pseudocowpox, papular stomatitis (parapoxviruses).")]
S+=[Paragraph("Sources: Viral Diseases of Small Ruminants – Part 2 (pp.16–40) + Maladies virales 3 (extract). "
              "Summary for study use.", SMALL)]


def deco(c, d):
    c.saveState(); c.setFont("Helvetica",7); c.setFillColor(ACCENT2)
    c.drawString(20*mm,10*mm,"Viral Diseases — Study Summary")
    c.drawRightString(190*mm,10*mm,"p. %d"%d.page)
    c.setStrokeColor(colors.HexColor("#e2e8f0")); c.line(20*mm,12*mm,190*mm,12*mm); c.restoreState()

doc=SimpleDocTemplate(OUT,pagesize=A4,leftMargin=20*mm,rightMargin=20*mm,topMargin=14*mm,bottomMargin=16*mm,
                      title="Viral Diseases — Study Summary", author="study summary")
doc.build(S,onFirstPage=deco,onLaterPages=deco)
print("built:", OUT)
