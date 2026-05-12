import { Link, useLocation } from "react-router-dom";
import { Flame, ChevronRight } from "lucide-react";
import { useProgress } from "../state/progress";
import { subjects } from "../data/subjects";

export default function TopBar() {
  const { state, level, xpInLevel, xpToNext, progressToNext } = useProgress();
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  // Build crumb labels
  const crumbs = segments.map((seg, i) => {
    if (i === 0) {
      const subj = subjects.find((s) => s.slug === seg);
      return subj ? subj.title : seg;
    }
    return seg.charAt(0).toUpperCase() + seg.slice(1);
  });

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-950/95 backdrop-blur supports-[backdrop-filter]:bg-ink-950/80">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 group focus-ring rounded-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60 animate-scan" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-clinical text-ink-50">
            studylynn
          </span>
          <span className="hidden sm:inline-block label-mono text-ink-400 ml-1">v1</span>
        </Link>

        {crumbs.length > 0 && (
          <nav className="hidden sm:flex items-center gap-1 text-xs text-ink-300 min-w-0">
            <ChevronRight size={12} className="text-ink-500" />
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1 min-w-0">
                <span className={i === crumbs.length - 1 ? "text-ink-50 truncate" : "text-ink-300 truncate"}>
                  {c}
                </span>
                {i < crumbs.length - 1 && <ChevronRight size={12} className="text-ink-500 shrink-0" />}
              </span>
            ))}
          </nav>
        )}

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-ink-300">
            <Flame size={14} className="text-orange-400" />
            <span className="stat-num text-ink-50">{state.streak}</span>
            <span className="text-ink-400 lowercase tracking-wide">
              day{state.streak === 1 ? "" : "s"}
            </span>
          </div>

          <div className="hairline-v h-4" />

          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="label-mono">Level</div>
              <div className="stat-num text-ink-50 text-sm leading-none">{level}</div>
            </div>
            <div className="w-28 h-1.5 bg-ink-800 border border-ink-700 rounded-sm overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-teal-300 transition-all"
                style={{ width: `${Math.min(100, progressToNext * 100)}%` }}
              />
            </div>
            <div className="stat-num text-ink-300 text-[11px]">
              {xpInLevel}/{xpToNext}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
