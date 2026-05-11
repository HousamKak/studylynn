import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { cards, SUITS } from "../data/cards";
import { useProgress } from "../state/progress";
import { shuffle } from "../utils/random";

const TOTAL = 8;

export default function Diagnose({ onExit }) {
  const { recordAnswer, addXp, submitHighScore, updateStreak } = useProgress();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState(null);

  const queue = useMemo(() => shuffle([...cards]).slice(0, TOTAL), []);
  const c = queue[round];

  useEffect(() => updateStreak(), [updateStreak]);

  const filtered = useMemo(() => {
    if (!query.trim()) return cards.slice(0, 8);
    const q = query.toLowerCase();
    return cards
      .filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.species.toLowerCase().includes(q) ||
          x.etiology.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  const submit = (id) => {
    if (revealed) return;
    setPicked(id);
    const correct = id === c.id;
    recordAnswer(c.id, correct);
    if (correct) {
      const points = 25;
      setScore((s) => s + points);
      addXp(points);
      confetti({ particleCount: 60, spread: 70 });
    }
    setRevealed(true);
  };

  const next = () => {
    if (round + 1 >= TOTAL) {
      submitHighScore("diagnose", score);
      setFinished(true);
    } else {
      setRound((r) => r + 1);
      setRevealed(false);
      setPicked(null);
      setQuery("");
    }
  };

  if (finished) {
    return (
      <ModeShell title="Diagnose" onExit={onExit}>
        <div className="text-center py-10">
          <div className="text-6xl mb-4">🩺</div>
          <div className="font-display text-4xl font-bold text-white">{score}</div>
          <div className="text-white/60 mt-2">
            {score / 25} of {TOTAL} cases diagnosed
          </div>
          <div className="mt-8 flex gap-3 justify-center">
            <button className="btn-primary" onClick={() => window.location.reload()}>
              New shift
            </button>
            <button className="btn-ghost" onClick={onExit}>
              Home
            </button>
          </div>
        </div>
      </ModeShell>
    );
  }

  const suit = SUITS[c.suit];

  return (
    <ModeShell
      title="Diagnose"
      subtitle={`Case ${round + 1} of ${TOTAL}`}
      onExit={onExit}
      hud={
        <div className="text-sm text-white">
          Score: <span className="font-bold tabular-nums">{score}</span>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {/* Case file */}
          <div className="card p-6 mb-5">
            <div className="text-xs uppercase tracking-wider text-white/40 mb-3">
              📋 Case file
            </div>
            <div className="space-y-3 text-white/90">
              <CaseLine label="Species" value={c.species} />
              <CaseLine label="Clinical finding" value={c.keyClue} />
              <CaseLine label="Lesions" value={c.lesions} />
              <CaseLine label="Mechanism" value={c.mechanism} />
            </div>
          </div>

          {!revealed ? (
            <>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search disease by name, species, or etiology…"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-violet-500 focus:outline-none"
              />
              <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                {filtered.map((d) => {
                  const s = SUITS[d.suit];
                  return (
                    <button
                      key={d.id}
                      onClick={() => submit(d.id)}
                      className="card w-full p-3 text-left hover:border-white/30 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span style={{ color: s.color }}>{s.emoji}</span>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{d.name}</div>
                          <div className="text-white/40 text-xs">{d.species}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="text-white/40 text-center py-4 text-sm">
                    No matches.
                  </div>
                )}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`card p-5 border-2 ${
                picked === c.id ? "!border-green-500" : "!border-red-500"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{picked === c.id ? "✅" : "❌"}</span>
                <div className="font-display text-xl font-bold text-white">
                  {picked === c.id ? "Correct diagnosis" : `It was ${c.name}`}
                </div>
              </div>
              <div className="pill mb-3" style={{ background: suit.color + "22", color: suit.color }}>
                <span>{suit.emoji}</span>
                <span>{c.name}</span>
              </div>
              <div className="text-sm text-white/80 space-y-1.5">
                <div><span className="text-white/40">Etiology:</span> {c.etiology}</div>
                {c.pearls && <div><span className="text-white/40">Pearl:</span> {c.pearls}</div>}
              </div>
              <button className="btn-primary mt-4 w-full" onClick={next}>
                {round + 1 >= TOTAL ? "Finish shift" : "Next case →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </ModeShell>
  );
}

function CaseLine({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
      <div className="text-white text-sm mt-0.5">{value}</div>
    </div>
  );
}
