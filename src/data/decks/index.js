import { neuropathDeck } from "./neuropath";
import { pharmaDeck } from "./pharma";
import { oralDeck } from "./oral";
import { giDeck } from "./gi";
import { toxicoDeck } from "./toxico";
import { antimicrobialsDeck } from "./antimicrobials";
import { necropsyDeck } from "./necropsy";
import { surgpathDeck } from "./surgpath";
import { anapath2Deck } from "./anapath2";

export const decks = {
  neuropath: neuropathDeck,
  pharma: pharmaDeck,
  oral: oralDeck,
  gi: giDeck,
  toxico: toxicoDeck,
  antimicrobials: antimicrobialsDeck,
  necropsy: necropsyDeck,
  surgpath: surgpathDeck,
  anapath2: anapath2Deck,
};

export const getDeck = (slug) => decks[slug] || null;
export const allDeckSlugs = Object.keys(decks);
