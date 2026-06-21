#!/usr/bin/env python3
"""Reproduce the True/False Viral Diseases question bank, adding a 'Correct:' line
under every FALSE statement (True statements left untouched). Corrections are
grounded in: the Bluetongue / bovine-skin-virus summary + the two source decks.
Output PDF at repo root (not committed).
    python scripts/build_tf_with_corrections.py
Requires: reportlab
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT = "True_False_Viral_Diseases 2 - with corrections.pdf"
INK = colors.HexColor("#0f1115"); GREEN = colors.HexColor("#15803d")
RED = colors.HexColor("#dc2626"); TEAL = colors.HexColor("#0d9488"); GREY = colors.HexColor("#64748b")

st = getSampleStyleSheet()
TITLE = ParagraphStyle("TITLE", parent=st["Heading1"], fontName="Helvetica-Bold", fontSize=13.5,
                       textColor=INK, spaceAfter=2, leading=16)
INTRO = ParagraphStyle("INTRO", parent=st["BodyText"], fontName="Helvetica-Oblique", fontSize=9,
                       textColor=GREY, spaceAfter=4, leading=12)
Q = ParagraphStyle("Q", parent=st["BodyText"], fontName="Helvetica", fontSize=9.4, leading=12.6,
                   spaceBefore=4, spaceAfter=0)
COR = ParagraphStyle("COR", parent=st["BodyText"], fontName="Helvetica", fontSize=9.0, leading=12.2,
                     leftIndent=14, spaceBefore=1, spaceAfter=1, textColor=GREEN)


def ans(b):
    c = GREEN if b else RED
    return f'<font color="#{c.hexval()[2:]}"><b>Answer: {"True" if b else "False"}</b></font>'


# (number, statement, answer_bool, correction-or-None)  -- corrections only for False
items = [
 (1,"Strict hygiene and quarantine completely prevent bovine infectious thelitis from occurring in a herd.",False,
    "Hygiene and quarantine do NOT prevent it — insects transmit the virus mechanically, so the disease still occurs despite strict measures."),
 (2,"Insects are believed to transmit BHV-2 mechanically rather than by multiplying the virus inside their bodies.",True,None),
 (3,"Bovine infectious thelitis is most commonly encountered during spring and early summer only.",False,
    "It is seasonal mainly in AUTUMN (broadly late June to early January), not spring/early summer."),
 (4,"Milk, saliva, blood, feces and serous fluid from lesions may all serve as sources of BHV-2 transmission.",True,None),
 (5,"Healthy intact teat skin is usually sufficient for BHV-2 penetration and infection.",False,
    "BHV-2 CANNOT penetrate healthy skin; a pre-existing lesion (cracks, plant trauma) is required."),
 (6,"Mammary edema and teat skin cracks favor transmission of bovine infectious thelitis.",True,None),
 (7,"Mortality in bovine infectious thelitis is generally high despite moderate morbidity.",False,
    "The reverse: morbidity is HIGH (83–96% in a naïve herd) while mortality is VERY LOW."),
 (8,"When BHV-2 enters a naïve herd, contamination may spread through the herd within approximately three weeks.",True,None),
 (9,"The disease commonly affects only old multiparous cows and rarely first-calf heifers.",False,
    "Age and pregnancy don't influence onset; where the disease is already present in a herd it appears mainly in FIRST-CALF HEIFERS."),
 (10,"BHV-2 is an enveloped herpesvirus with an icosahedral capsid.",True,None),
 (11,"A pH below 3 can destroy BHV-2.",True,None),
 (12,"The optimal replication temperature of BHV-2 is close to normal body temperature (39°C).",False,
    "The optimal replication temperature is 32°C — cooling of the udder skin in autumn/winter promotes cracking and replication."),
 (13,"Stress may contribute to reactivation of bovine infectious thelitis after apparent recovery.",True,None),
 (14,"The first visible teat lesion in bovine infectious thelitis is usually induration of the skin.",True,None),
 (15,"The vesicular stage is often missed because vesicles commonly rupture during milking.",True,None),
 (16,"Superficial ulcers produced by BHV-2 are typically painless and deep.",False,
    "The ulcers are bright red, PAINFUL, and SUPERFICIAL (only ~1–2 mm deep)."),
 (17,"Scabs generally begin to fall around day 28 after lesion development.",True,None),
 (18,"Lesions extending from the teat to the udder occur in every affected animal.",False,
    "The udder is involved in only about 10% of cases; one or more teats are affected, not every animal."),
 (19,"Generalized BHV-2 lesions may occur on the neck and posterior flanks.",True,None),
 (20,"The generalized form of BHV-2 infection is associated with high mortality.",False,
    "The generalized form is benign — there is NO mortality."),
 (21,"Allerton disease lesions remain confined mainly to superficial epidermal layers.",True,None),
 (22,"Healing of Allerton disease lesions usually leaves scars after scabs fall.",True,None),
 (23,"Bovine infectious thelitis is usually accompanied by marked fever and depression.",False,
    "There are NO general symptoms — the disease is essentially afebrile/local."),
 (24,"Papular stomatitis is caused by a member of the Parapoxvirus genus.",True,None),
 (25,"Papular stomatitis mainly affects cattle older than five years.",False,
    "It mainly affects animals UNDER 1 year old; adults are affected less often and act as reservoirs."),
 (26,"Adult cattle may act as reservoirs for papular stomatitis infection.",True,None),
 (27,"Direct contact and contaminated feed or water can both participate in transmission.",True,None),
 (28,"Mortality from bovine papular stomatitis is commonly very high.",False,
    "Morbidity is about 10% and mortality is RARE."),
 (29,"The virus responsible for papular stomatitis is cocoon-shaped.",True,None),
 (30,"Replication of the virus may produce both eosinophilic and basophilic intracytoplasmic inclusions.",True,None),
 (31,"Cell fusion and syncytium formation are characteristic cytopathic effects of papular stomatitis.",True,None),
 (32,"Transmission generally requires contamination of small skin abrasions.",True,None),
 (33,"Papules in papular stomatitis never develop into crusts.",False,
    "Papules DO progress to crusts (papules → crusts; mature lesions are red, brown, or yellow-orange)."),
 (34,"The proliferative papuloverrucous form is commonly observed on the mammary gland.",True,None),
 (35,"Healing of papular stomatitis lesions always leaves extensive scars.",False,
    "Healing (in 3–6 weeks) leaves NO scar in the absence of bacterial superinfection."),
 (36,"The muzzle is frequently the most severely affected site in calves.",True,None),
 (37,"Hyperkeratosis in the chronic form may be seen around the mouth, anus and ventral tail.",True,None),
 (38,"Acute papular stomatitis is typically associated with severe systemic disease.",False,
    "The acute form generally has NO general signs; only the chronic form in calves shows fever, lethargy and reduced appetite."),
 (39,"Young calves with the chronic form may show fever, lethargy and reduced appetite.",True,None),
 (40,"Bovine papillomatosis is characterized by the formation of malignant skin tumors.",False,
    "Papillomas are BENIGN tumors (warts) that regress spontaneously."),
 (41,"Papillomatosis mainly affects animals younger than two years of age.",True,None),
 (42,"Morbidity in bovine papillomatosis can occasionally approach 100% within a herd.",True,None),
 (43,"A pre-existing skin lesion often facilitates papillomavirus infection.",True,None),
 (44,"The incubation period of bovine papillomatosis is usually only a few days.",False,
    "Incubation is 2–6 MONTHS (varies with virus type, viral dose, and host immune status)."),
 (45,"Bovine papillomaviruses possess a double-stranded DNA genome and lack a lipid envelope.",True,None),
 (46,"These viruses are highly resistant in the external environment.",True,None),
 (47,"Subgroup A papillomaviruses are associated with fibropapillomas.",True,None),
 (48,"BPV-4 and BPV-6 belong to the subgroup producing true papillomas.",True,None),
 (49,"BPV-1, BPV-5 and BPV-6 are important causes of teat warts.",True,None),
 (50,"Fibropapillomas caused by BPV-1 often have a cauliflower-like appearance.",True,None),
 (51,"BPV-5 lesions are typically heavily pigmented.",False,
    "BPV-5 causes rice-grain-shaped fibropapillomas that LACK pigmentation."),
 (52,"Fibroblasts actively participate in the formation of BPV-5 tumors.",False,
    "Fibroblasts are NOT involved in the formation of BPV-5 tumors."),
 (53,"Pedunculated BPV-5 lesions may rupture and predispose the teat to infection.",True,None),
 (54,"Generalized papillomatosis is mainly observed in immunocompromised animals.",True,None),
 (55,"Bovine papillomatosis is usually accompanied by fever.",False,
    "It is afebrile and presents no general symptoms."),
 (56,"Cowpox lesions primarily affect the teats and udder of lactating cows and the scrotum of males.",True,None),
 (57,"Cowpox commonly develops on perfectly healthy undamaged teat skin.",False,
    "It requires prior teat damage (erosion/microtrauma); healthy skin is resistant."),
 (58,"Milking machine liners and the milker's hands can contribute to cowpox transmission.",True,None),
 (59,"Cowpox virus belongs to the family Poxviridae.",True,None),
 (60,"Vesicular stomatitis is widely distributed throughout Europe, Asia and Africa.",False,
    "It is found ONLY in the Americas and is not widespread elsewhere."),
 (61,"Clinically, vesicular stomatitis can be difficult to distinguish from foot-and-mouth disease.",True,None),
 (62,"Humans infected with vesicular stomatitis may develop influenza-like signs.",True,None),
 (63,"Cattle are the only species affected by vesicular stomatitis.",False,
    "It also affects horses, pigs (sows), and llamas."),
 (64,"Insect vectors such as black flies and biting midges play a role in transmission.",True,None),
 (65,"Mortality from vesicular stomatitis is generally around 1%.",True,None),
 (66,"The causative virus is an RNA virus belonging to the genus Vesiculovirus.",True,None),
 (67,"Two major serotypes of vesicular stomatitis are New Jersey and Indiana.",True,None),
 (68,"The virus produces vesicles that rupture and heal rapidly.",True,None),
 (69,"Oral lesions in vesicular stomatitis may lead to excessive salivation.",True,None),
 (70,"Affected animals with vesicular stomatitis are always afebrile.",False,
    "They develop fever (40–41°C) with lethargy, marked nasal discharge and mucosal exfoliation."),
 (71,"Pseudocowpox is considered one of the most common teat diseases of lactating cows.",True,None),
 (72,"Protective immunity against pseudocowpox is usually strong and lifelong.",False,
    "Immunity is WEAK and unstable/short-lived, so reinfection occurs."),
 (73,"Reinfection with pseudocowpox may occur because immunity is weak and short-lived.",True,None),
 (74,"Carrier animals may serve as reservoirs of pseudocowpox infection.",True,None),
 (75,"The pseudocowpox virus is highly sensitive to environmental conditions and survives poorly.",False,
    "It is extremely RESISTANT (to heat and desiccation) and can survive within scabs for months to years."),
 (76,"The virus may persist within scabs for months or even years.",True,None),
 (77,"Prior injury is generally required before pseudocowpox lesions develop on teats.",True,None),
 (78,"A horseshoe-shaped lesion is considered pathognomonic for pseudocowpox.",True,None),
 (79,"Pseudocowpox lesions usually disappear within six weeks without scarring.",True,None),
 (80,"Systemic signs are a major feature of pseudocowpox.",False,
    "There are no associated systemic signs (though pain on milking can lead to retention mastitis)."),
 (81,"Bluetongue virus belongs to the genus Orbivirus within the family Reoviridae.",True,None),
 (82,"Bluetongue virus possesses a segmented double-stranded RNA genome.",True,None),
 (83,"A single bite from an infected Culicoides midge may be sufficient to transmit bluetongue.",True,None),
 (84,"Vertical transmission of bluetongue can occur through the placenta.",True,None),
 (85,"Overwintering of bluetongue may involve chronically infected animals and surviving vectors.",True,None),
 (86,"The acute form of bluetongue in sheep is characterized by high fever, anorexia and weakness.",True,None),
 (87,"Facial edema, ulcerative-necrotic stomatitis and nasal discharge may occur in affected sheep.",True,None),
 (88,"Lameness and coronary band congestion may develop several days after fever onset.",True,None),
 (89,"Mortality in severe bluetongue outbreaks can reach 20–50%.",True,None),
 (90,"Bluetongue in cattle is usually associated with a very high incidence within herds.",False,
    "Cattle usually show LOW incidence and are often subclinical — they act as the reservoir host."),
 (91,"Adult cattle are most commonly affected by clinical bluetongue.",True,None),
 (92,"Cutaneous necrotic lesions on the back tend to appear early in bovine bluetongue.",False,
    "In cattle these skin/udder signs (including necrotic back lesions with skin-flap detachment) appear LATE / belatedly."),
]

story = [
    Paragraph("True / False Question Bank – Viral Skin, Mucous Membrane and Bluetongue Diseases", TITLE),
    Paragraph("Each statement is followed by the correct answer. For every FALSE statement, the corrected fact is added below.", INTRO),
    HRFlowable(width="100%", color=TEAL, thickness=1), Spacer(1, 3),
]
for n, text, b, cor in items:
    story.append(Paragraph(f"<b>{n}.</b> {text}  —  {ans(b)}", Q))
    if not b and cor:
        story.append(Paragraph(f"✓ <b>Correct:</b> {cor}", COR))

n_false = sum(1 for _,_,b,_ in items if not b)
story += [Spacer(1, 6), HRFlowable(width="100%", color=GREY, thickness=0.6),
          Paragraph(f"{len(items)} statements · {n_false} false (each corrected) · corrections grounded in the "
                    "Bluetongue / bovine-skin-virus course material.", INTRO)]


def deco(c, d):
    c.saveState(); c.setFont("Helvetica", 7); c.setFillColor(GREY)
    c.drawRightString(195*mm, 10*mm, "p. %d" % d.page)
    c.restoreState()


doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=18*mm, rightMargin=16*mm,
                        topMargin=15*mm, bottomMargin=14*mm,
                        title="True/False Viral Diseases — with corrections", author="study")
doc.build(story, onFirstPage=deco, onLaterPages=deco)
print("built:", OUT, "|", len(items), "items,", n_false, "false")
