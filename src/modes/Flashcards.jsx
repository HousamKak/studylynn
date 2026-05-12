import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModeShell from "../components/ModeShell";
import { useDeck } from "../state/deckContextHook";
import { useProgress } from "../state/progress";
import { shuffle } from "../utils/random";

export default function Flashcards() {
  const deck = useDeck();
  const { state, recordAnswer, addXp, updateStreak } = useProgress();

  // Order weakest first.
  const orderedDeck = useMemo(() => {
    const score = (c) => {
      const m = state.mastery[`${deck.slug}:${c.id}`];
      if (!m || m.reps === 0) return 0;
      const ratio = m.correct / m.reps;
      if (ratio < 0.6) return 1;
      if (ratio < 0.85) return 2;
      return 3;
    };
    return shuffle([...deck.cards]).sort((a, b) => score(a) - score(b));
  }, [state.mastery, deck]);

  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => updateStreak(), [updateStreak]);

  const c = orderedDeck[i];
  const suit = c ? deck.suits[c.suit] : null;
  const m = state.mastery[`${deck.slug}:${c?.id}`];

  const grade = (g) => {
    const correct = g !== "again";
    recordAnswer(`${deck.slug}:${c.id}`, correct);
    if (g === "easy") addXp(8);
    else if (g === "good") addXp(4);
    setI((x) => (x + 1) % orderedDeck.length);
    setFlipped(false);
  };

  return (
    <ModeShell
      title="Flashcards"
      subtitle={`Card ${i + 1} of ${orderedDeck.length} — weakest first`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i + (flipped ? "-back" : "-front")}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          <div className="card p-8 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              {suit && (
                <div className="pill" style={{ background: suit.color + "22", color: suit.color }}>
                  <span>{suit.emoji}</span>
                  <span>{suit.label}</span>
                </div>
              )}
              <div className="text-xs text-white/40">Tier {"★".repeat(c.tier)}</div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {!flipped ? (
                <>
                  <div className="font-display text-4xl font-bold text-white mb-3">{c.name}</div>
                  <div className="text-white/50">Recall {deck.fieldLabels.etiology.toLowerCase()}, mechanism, key clue.</div>
                </>
              ) : (
                <div className="text-left w-full space-y-3 text-white/90">
                  <Field label={deck.fieldLabels.etiology} value={c.etiology} />
                  <Field label={deck.fieldLabels.species} value={c.species} />
                  <Field label={deck.fieldLabels.mechanism} value={c.mechanism} />
                  <Field label={deck.fieldLabels.lesions} value={c.lesions} />
                  <Field label={deck.fieldLabels.keyClue} value={c.keyClue} accent="text-yellow-300" />
                  {c.pearls && <Field label={deck.fieldLabels.pearls} value={c.pearls} />}
                </div>
              )}
            </div>

            {m && (
              <div className="text-center text-xs text-white/40 mt-4">
                Seen {m.reps}× · {m.correct}/{m.reps} correct
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {!flipped ? (
        <button className="btn-primary w-full mt-4" onClick={() => setFlipped(true)}>
          Reveal
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            className="btn bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-white"
            onClick={() => grade("again")}
          >
            Again
          </button>
          <button
            className="btn bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-white"
            onClick={() => grade("good")}
          >
            Good
          </button>
          <button
            className="btn bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-white"
            onClick={() => grade("easy")}
          >
            Easy
          </button>
        </div>
      )}
    </ModeShell>
  );
}

function Field({ label, value, accent = "text-white" }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
      <div className={`mt-0.5 ${accent}`}>{value}</div>
    </div>
  );
}
