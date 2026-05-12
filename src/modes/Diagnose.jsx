import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Search, X } from "lucide-react";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { useDeck } from "../state/deckContextHook";
import { useProgress } from "../state/progress";
import { shuffle } from "../utils/random";
import { SuitIcon } from "../components/icons";

const TOTAL = 8;

export default function Diagnose() {
  const navigate = useNavigate();
  const deck = useDeck();
  const goHome = () => navigate(deck.routePrefix);

  const { recordAnswer, addXp, submitHighScore, updateStreak } = useProgress();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState(null);

  const queue = useMemo(() => shuffle([...deck.cards]).slice(0, TOTAL), [deck]);
  const c = queue[round];

  useEffect(() => updateStreak(), [updateStreak]);

  const filtered = useMemo(() => {
    if (!query.trim()) return deck.cards.slice(0, 8);
    const q = query.toLowerCase();
    return deck.cards
      .filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.species.toLowerCase().includes(q) ||
          x.etiology.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, deck]);

  const submit = (id) => {
    if (revealed) return;
    setPicked(id);
    const correct = id === c.id;
    recordAnswer(`${deck.slug}:${c.id}`, correct);
    if (correct) {
      const points = 25;
      setScore((s) => s + points);
      addXp(points);
      confetti({ particleCount: 50, spread: 60 });
    }
    setRevealed(true);
  };

  const next = () => {
    if (round + 1 >= TOTAL) {
      submitHighScore(`${deck.slug}:diagnose`, score);
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
      <ModeShell title={`${deck.prompts.diagnoseVerb} · Complete`}>
        <div className="panel-elev p-8 text-center">
          <div className="label-mono mb-2">Cases resolved</div>
          <div className="stat-num font-display text-5xl font-semibold text-ink-0 mb-1">
            {score / 25}
          </div>
          <div className="text-ink-300 text-sm mb-6">of {TOTAL} cases · {score} XP</div>
          <div className="flex gap-2 justify-center">
            <button className="btn-primary text-sm" onClick={() => window.location.reload()}>
              New shift
            </button>
            <button className="btn-ghost text-sm" onClick={goHome}>
              Back to subject
            </button>
          </div>
        </div>
      </ModeShell>
    );
  }

  const suit = deck.suits[c.suit];

  return (
    <ModeShell
      title={deck.prompts.diagnoseVerb}
      subtitle={`Case ${round + 1} of ${TOTAL}`}
      hud={
        <div className="text-[12px] flex items-center gap-2">
          <span className="label-mono">Score</span>
          <span className="stat-num text-ink-0">{score}</span>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          <article className="panel-elev p-5 mb-4">
            <header className="flex items-center justify-between mb-3">
              <div className="label-mono">{deck.prompts.caseFileTitle}</div>
              <div className="label-mono text-ink-400">
                Anon-{(round + 1).toString().padStart(2, "0")}
              </div>
            </header>
            <dl className="space-y-2.5 text-[13px]">
              <CaseRow label={deck.fieldLabels.species} value={c.species} />
              <CaseRow label={deck.fieldLabels.keyClue} value={c.keyClue} />
              <CaseRow label={deck.fieldLabels.lesions} value={c.lesions} />
              <CaseRow label={deck.fieldLabels.mechanism} value={c.mechanism} />
            </dl>
          </article>

          {!revealed ? (
            <>
              <div className="relative mb-2">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${deck.prompts.identifyNoun} by name, species, or class…`}
                  className="w-full pl-9 pr-3 py-2.5 rounded-sm bg-ink-800 border border-ink-700 text-ink-50 placeholder:text-ink-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500/40 text-[13px]"
                />
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {filtered.map((d) => {
                  const sc = deck.suits[d.suit].color;
                  return (
                    <button
                      key={d.id}
                      onClick={() => submit(d.id)}
                      className="panel panel-hover w-full p-2.5 text-left focus-ring"
                    >
                      <div className="flex items-center gap-2.5">
                        <SuitIcon deck={deck.slug} suit={d.suit} size={13} strokeWidth={2} style={{ color: sc }} className="shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-ink-50 text-[13px] font-medium leading-tight">
                            {d.name}
                          </div>
                          <div className="text-ink-400 text-[11px] truncate">{d.species}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="text-ink-400 text-center py-4 text-[12px]">No matches.</div>
                )}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`panel-elev p-5 border ${
                picked === c.id ? "!border-green-500/50" : "!border-red-500/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                {picked === c.id ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <X size={18} className="text-red-400" />
                )}
                <div className="font-display text-base font-semibold text-ink-0">
                  {picked === c.id ? "Correct diagnosis" : `It was ${c.name}`}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3 text-[11px]">
                <span className="label-mono inline-flex items-center gap-1.5" style={{ color: suit.color }}>
                  <SuitIcon deck={deck.slug} suit={c.suit} size={11} strokeWidth={2} />
                  {c.name}
                </span>
              </div>
              <dl className="space-y-2 text-[13px]">
                <CaseRow label={deck.fieldLabels.etiology} value={c.etiology} />
                {c.pearls && <CaseRow label={deck.fieldLabels.pearls} value={c.pearls} />}
              </dl>
              <button className="btn-primary text-sm mt-4 w-full" onClick={next}>
                {round + 1 >= TOTAL ? "Finish shift →" : "Next case →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </ModeShell>
  );
}

function CaseRow({ label, value }) {
  return (
    <div className="flex gap-3">
      <dt className="label-mono w-20 shrink-0 pt-0.5">{label}</dt>
      <dd className="text-ink-100 flex-1 leading-snug">{value}</dd>
    </div>
  );
}
