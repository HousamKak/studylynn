import { neuropathDeck } from "./neuropath";
import { pharmaDeck } from "./pharma";

export const decks = {
  neuropath: neuropathDeck,
  pharma: pharmaDeck,
};

export const getDeck = (slug) => decks[slug] || null;
export const allDeckSlugs = Object.keys(decks);
