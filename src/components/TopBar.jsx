import { Link } from "react-router-dom";
import { useProgress } from "../state/progress";

export default function TopBar() {
  const { state, level, xpInLevel, xpToNext, progressToNext } = useProgress();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center gap-4">
        <Link
          to="/"
          className="text-left flex items-center gap-2 hover:opacity-80 transition"
        >
          <span className="text-2xl">📚</span>
          <span className="font-display text-xl font-bold text-white">
            study<span className="text-violet-400">lynn</span>
          </span>
        </Link>

        <div className="flex-1" />

        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-orange-400 text-lg">🔥</span>
            <span className="text-white font-semibold">{state.streak}</span>
            <span className="text-white/50 text-sm">
              day{state.streak === 1 ? "" : "s"}
            </span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-white/50 leading-none">Level</div>
              <div className="font-bold text-white leading-none mt-1">{level}</div>
            </div>
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all"
                style={{ width: `${Math.min(100, progressToNext * 100)}%` }}
              />
            </div>
            <div className="text-xs text-white/60 tabular-nums">
              {xpInLevel}/{xpToNext}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
