import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { cards, SUITS } from "../data/cards";
import { useProgress } from "../state/progress";
import { shuffle, sample } from "../utils/random";

const PAIR_FIELDS = [
  { key: "etiology", label: "Etiology" },
  { key: "keyClue", label: "Key clue" },
  { key: "species", label: "Species" },
];

export default function Match({ onExit }) {
  const { addXp, recordAnswer, submitHighScore, updateStreak } = useProgress();
  const [round, setRound] = useState(0);
  const [matched, setMatched] = useState({}); // cardId -> true
  const [wrong, setWrong] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [field, setField] = useState(PAIR_FIELDS[0]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [finished, setFinished] = useState(false);

  const set = useMemo(() => sample(cards, 6), [round]);
  const leftLabels = useMemo(() => set.map((c) => ({ id: c.id, label: c.name })), [set]);
  const rightLabels = useMemo(
    () => shuffle(set.map((c) => ({ id: c.id, label: c[field.key] }))),
    [set, field]
  );

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      submitHighScore("match", score);
      return;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, finished, score, submitHighScore]);

  useEffect(() => {
    if (Object.keys(matched).length === set.length) {
      addXp(20);
      confetti({ particleCount: 80, spread: 70 });
      setTimeout(() => {
        setRound((r) => r + 1);
        setMatched({});
        setWrong({});
        setSelectedCard(null);
        setField(PAIR_FIELDS[Math.floor(Math.random() * PAIR_FIELDS.length)]);
      }, 700);
    }
  }, [matched, set.length, addXp]);

  const handleLeft = (id) => {
    if (matched[id]) return;
    setSelectedCard(id);
  };

  const handleRight = (id) => {
    if (matched[id] || !selectedCard) return;
    const correct = selectedCard === id;
    recordAnswer(selectedCard, correct);
    if (correct) {
      setMatched((m) => ({ ...m, [id]: true }));
      setScore((s) => s + 10);
      addXp(5);
    } else {
      setScore((s) => Math.max(0, s - 3));
      setWrong((w) => ({ ...w, [id]: true }));
      setTimeout(() => setWrong((w) => ({ ...w, [id]: false })), 400);
    }
    setSelectedCard(null);
  };

  if (finished) {
    return (
      <ModeShell title="Match" onExit={onExit}>
        <div className="text-center py-10">
          <div className="text-6xl mb-4">⏱</div>
          <div className="font-display text-4xl font-bold text-white">{score}</div>
          <div className="text-white/60 mt-2">Final score</div>
          <div className="mt-8 flex gap-3 justify-center">
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Play again
            </button>
            <button className="btn-ghost" onClick={onExit}>
              Home
            </button>
          </div>
        </div>
      </ModeShell>
    );
  }

  return (
    <ModeShell
      title="Match"
      subtitle={`Match disease with ${field.label.toLowerCase()}`}
      onExit={onExit}
      hud={
        <div className="flex items-center justify-between text-sm">
          <div className="text-white">
            Score: <span className="font-bold tabular-nums">{score}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50">Time</span>
            <span
              className={`font-bold tabular-nums ${
                timeLeft <= 10 ? "text-red-400" : "text-white"
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
            Disease
          </div>
          {leftLabels.map((l) => {
            const c = cards.find((x) => x.id === l.id);
            const suit = SUITS[c.suit];
            const isMatched = matched[l.id];
            const isSelected = selectedCard === l.id;
            return (
              <button
                key={l.id}
                onClick={() => handleLeft(l.id)}
                disabled={isMatched}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  isMatched
                    ? "bg-green-500/10 border-green-500/40 opacity-50"
                    : isSelected
                    ? "bg-violet-500/20 border-violet-500"
                    : "card hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span style={{ color: suit.color }}>{suit.emoji}</span>
                  <span className="text-white text-sm font-medium">{l.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
            {field.label}
          </div>
          {rightLabels.map((l) => {
            const isMatched = matched[l.id];
            const isWrong = wrong[l.id];
            return (
              <button
                key={l.id}
                onClick={() => handleRight(l.id)}
                disabled={isMatched}
                className={`w-full text-left p-3 rounded-xl border transition-all text-sm text-white/90 ${
                  isMatched
                    ? "bg-green-500/10 border-green-500/40 opacity-50"
                    : isWrong
                    ? "bg-red-500/20 border-red-500 animate-shake"
                    : "card hover:border-white/30"
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>
    </ModeShell>
  );
}
