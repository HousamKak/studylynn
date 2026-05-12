import { neuropathDeck } from "./neuropath";
import { pharmaDeck } from "./pharma";
import { oralDeck } from "./oral";

export const decks = {
  neuropath: neuropathDeck,
  pharma: pharmaDeck,
  oral: oralDeck,
};

export const getDeck = (slug) => decks[slug] || null;
export const allDeckSlugs = Object.keys(decks);
