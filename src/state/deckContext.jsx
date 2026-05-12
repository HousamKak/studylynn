import { useMemo } from "react";
import { DeckContext } from "./deckContextHook";
import { getDeck } from "../data/decks";

export function DeckProvider({ slug, children }) {
  const deck = useMemo(() => getDeck(slug), [slug]);
  if (!deck) throw new Error(`Unknown deck slug: ${slug}`);
  return <DeckContext.Provider value={deck}>{children}</DeckContext.Provider>;
}
