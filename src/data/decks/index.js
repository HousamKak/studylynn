import { neuropathDeck } from "./neuropath";
import { pharmaDeck } from "./pharma";
import { oralDeck } from "./oral";
import { giDeck } from "./gi";

export const decks = {
  neuropath: neuropathDeck,
  pharma: pharmaDeck,
  oral: oralDeck,
  gi: giDeck,
};

export const getDeck = (slug) => decks[slug] || null;
export const allDeckSlugs = Object.keys(decks);
