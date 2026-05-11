import { cards } from "../data/cards";
import { shuffle, pick, pickN } from "./random";

// Question generators produce { id, prompt, options, answerIndex, cardId, type }

const QUESTION_TYPES = [
  "identifyFromClue",
  "identifyFromMechanism",
  "etiologyOf",
  "speciesOf",
  "keyClueOf",
];

const distractorsFor = (card, field, n = 3) => {
  // Prefer same-suit cards for plausible distractors
  const sameSuit = cards.filter(
    (c) => c.id !== card.id && c.suit === card.suit && c[field] && c[field] !== card[field]
  );
  let pool = sameSuit;
  if (pool.length < n) {
    const others = cards.filter(
      (c) => c.id !== card.id && c[field] && c[field] !== card[field] && !sameSuit.includes(c)
    );
    pool = [...pool, ...others];
  }
  return pickN(
    pool.map((c) => c[field]),
    n
  );
};

const distractorNames = (card, n = 3) => {
  const sameSuit = cards.filter((c) => c.id !== card.id && c.suit === card.suit);
  let pool = sameSuit;
  if (pool.length < n) {
    pool = [...pool, ...cards.filter((c) => c.id !== card.id && !sameSuit.includes(c))];
  }
  return pickN(pool.map((c) => c.name), n);
};

const buildMcq = (card, type) => {
  switch (type) {
    case "identifyFromClue": {
      const distractors = distractorNames(card, 3);
      const opts = shuffle([card.name, ...distractors]);
      return {
        prompt: `Which disease matches this clue?\n\n"${card.keyClue}"`,
        options: opts,
        answerIndex: opts.indexOf(card.name),
        cardId: card.id,
        type,
      };
    }
    case "identifyFromMechanism": {
      const distractors = distractorNames(card, 3);
      const opts = shuffle([card.name, ...distractors]);
      return {
        prompt: `Which disease has this mechanism?\n\n"${card.mechanism}"`,
        options: opts,
        answerIndex: opts.indexOf(card.name),
        cardId: card.id,
        type,
      };
    }
    case "etiologyOf": {
      const distractors = distractorsFor(card, "etiology", 3);
      const opts = shuffle([card.etiology, ...distractors]);
      return {
        prompt: `What is the etiology of ${card.name}?`,
        options: opts,
        answerIndex: opts.indexOf(card.etiology),
        cardId: card.id,
        type,
      };
    }
    case "speciesOf": {
      const distractors = distractorsFor(card, "species", 3);
      const opts = shuffle([card.species, ...distractors]);
      return {
        prompt: `${card.name} affects which species?`,
        options: opts,
        answerIndex: opts.indexOf(card.species),
        cardId: card.id,
        type,
      };
    }
    case "keyClueOf": {
      const distractors = distractorsFor(card, "keyClue", 3);
      const opts = shuffle([card.keyClue, ...distractors]);
      return {
        prompt: `Pick the KEY CLUE / pathognomonic feature of ${card.name}:`,
        options: opts,
        answerIndex: opts.indexOf(card.keyClue),
        cardId: card.id,
        type,
      };
    }
    default:
      return null;
  }
};

export const generateMcq = (card = null, type = null) => {
  const c = card || pick(cards);
  const t = type || pick(QUESTION_TYPES);
  return buildMcq(c, t);
};

export const generateQuestionSet = (n, opts = {}) => {
  const { suit = null, tier = null } = opts;
  const pool = cards.filter(
    (c) => (suit ? c.suit === suit : true) && (tier ? c.tier === tier : true)
  );
  const picks = shuffle(pool).slice(0, n);
  return picks.map((c) => generateMcq(c));
};
