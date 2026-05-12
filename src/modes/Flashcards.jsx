import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import ModeShell from "../components/ModeShell";
import { useDeck } from "../state/deckContextHook";
import { useProgress } from "../state/progress";
import { shuffle } from "../utils/random";
import { SuitIcon } from "../components/icons";

export default function Flashcards() {
  const deck = useDeck();
  const { state, recordAnswer, addXp, updateStreak } = useProgress();

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
      subtitle={`Card ${i + 1} of ${orderedDeck.length} · weakest first`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i + (flipped ? "-back" : "-front")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="min-h-[420px]"
        >
          <article className="panel-elev p-6 sm:p-8 min-h-[420px] flex flex-col">
            <header className="flex items-center justify-between mb-5">
              {suit && (
                <div className="flex items-center gap-2">
                  <span className="label-mono inline-flex items-center gap-1.5" style={{ color: suit.color }}>
                    <SuitIcon deck={deck.slug} suit={c.suit} size={11} strokeWidth={2} />
                    {suit.label}
                  </span>
                </div>
              )}
              <div className="label-mono">Tier {"★".repeat(c.tier)}</div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {!flipped ? (
                <>
                  <div className="font-display text-3xl sm:text-4xl font-semibold text-ink-0 tracking-tightest leading-tight mb-4 max-w-2xl">
                    {c.name}
                  </div>
                  <div className="text-ink-400 text-[12px] flex items-center gap-2">
                    <Eye size={12} />
                    Recall etiology, mechanism, key clue
                  </div>
                </>
              ) : (
                <dl className="text-left w-full max-w-2xl space-y-3">
                  <Field label={deck.fieldLabels.etiology} value={c.etiology} />
                  <Field label={deck.fieldLabels.species} value={c.species} />
                  <Field label={deck.fieldLabels.mechanism} value={c.mechanism} />
                  <Field label={deck.fieldLabels.lesions} value={c.lesions} />
                  <Field label={deck.fieldLabels.keyClue} value={c.keyClue} accent />
                  {c.pearls && <Field label={deck.fieldLabels.pearls} value={c.pearls} />}
                </dl>
              )}
            </div>

            {m && m.reps > 0 && (
              <footer className="text-center text-[11px] text-ink-400 mt-4 stat-num">
                Seen {m.reps}× · {m.correct}/{m.reps} correct
              </footer>
            )}
          </article>
        </motion.div>
      </AnimatePresence>

      {!flipped ? (
        <button className="btn-primary w-full mt-3 text-sm" onClick={() => setFlipped(true)}>
          Reveal answer
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2 mt-3">
          <button
            className="btn bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/40"
            onClick={() => grade("again")}
          >
            Again
          </button>
          <button
            className="btn bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40"
            onClick={() => grade("good")}
          >
            Good
          </button>
          <button
            className="btn bg-green-500/15 hover:bg-green-500/25 text-green-300 border border-green-500/40"
            onClick={() => grade("easy")}
          >
            Easy
          </button>
        </div>
      )}
    </ModeShell>
  );
}

function Field({ label, value, accent = false }) {
  return (
    <div className="flex gap-3">
      <dt className="label-mono w-24 shrink-0 pt-0.5">{label}</dt>
      <dd className={accent ? "text-teal-200 flex-1 text-[14px]" : "text-ink-100 flex-1 text-[14px]"}>
        {value}
      </dd>
    </div>
  );
}
