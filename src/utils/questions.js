import { shuffle, pick, pickN } from "./random";

const QUESTION_TYPES = [
  "identifyFromClue",
  "identifyFromMechanism",
  "etiologyOf",
  "speciesOf",
  "keyClueOf",
];

const distractorsFor = (cards, card, field, n = 3) => {
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
  return pickN(pool.map((c) => c[field]), n);
};

const distractorNames = (cards, card, n = 3) => {
  const sameSuit = cards.filter((c) => c.id !== card.id && c.suit === card.suit);
  let pool = sameSuit;
  if (pool.length < n) {
    pool = [...pool, ...cards.filter((c) => c.id !== card.id && !sameSuit.includes(c))];
  }
  return pickN(pool.map((c) => c.name), n);
};

const buildMcq = (deck, card, type) => {
  const { cards, fieldLabels, prompts } = deck;
  switch (type) {
    case "identifyFromClue": {
      const distractors = distractorNames(cards, card, 3);
      const opts = shuffle([card.name, ...distractors]);
      return {
        prompt: `Which ${prompts.identifyNoun} matches this clue?\n\n"${card.keyClue}"`,
        options: opts,
        answerIndex: opts.indexOf(card.name),
        cardId: card.id,
        type,
      };
    }
    case "identifyFromMechanism": {
      const distractors = distractorNames(cards, card, 3);
      const opts = shuffle([card.name, ...distractors]);
      return {
        prompt: `Which ${prompts.identifyNoun} has this mechanism?\n\n"${card.mechanism}"`,
        options: opts,
        answerIndex: opts.indexOf(card.name),
        cardId: card.id,
        type,
      };
    }
    case "etiologyOf": {
      const distractors = distractorsFor(cards, card, "etiology", 3);
      const opts = shuffle([card.etiology, ...distractors]);
      return {
        prompt: `What is the ${fieldLabels.etiology.toLowerCase()} of ${card.name}?`,
        options: opts,
        answerIndex: opts.indexOf(card.etiology),
        cardId: card.id,
        type,
      };
    }
    case "speciesOf": {
      const distractors = distractorsFor(cards, card, "species", 3);
      const opts = shuffle([card.species, ...distractors]);
      return {
        prompt: `${card.name} ${prompts.affectsVerb}?`,
        options: opts,
        answerIndex: opts.indexOf(card.species),
        cardId: card.id,
        type,
      };
    }
    case "keyClueOf": {
      const distractors = distractorsFor(cards, card, "keyClue", 3);
      const opts = shuffle([card.keyClue, ...distractors]);
      return {
        prompt: `Pick the ${prompts.keyClueNoun} of ${card.name}:`,
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

export const generateMcq = (deck, card = null, type = null) => {
  const c = card || pick(deck.cards);
  const t = type || pick(QUESTION_TYPES);
  return buildMcq(deck, c, t);
};

export const generateQuestionSet = (deck, n, opts = {}) => {
  const { suit = null, tier = null } = opts;
  const pool = deck.cards.filter(
    (c) => (suit ? c.suit === suit : true) && (tier ? c.tier === tier : true)
  );
  const picks = shuffle(pool).slice(0, n);
  return picks.map((c) => generateMcq(deck, c));
};

export const cardLookupFn = (deck) => (id) => deck.cards.find((c) => c.id === id);
