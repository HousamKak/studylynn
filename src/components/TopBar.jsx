import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ChevronRight } from "lucide-react";
import { useProgress } from "../state/progress";
import { subjects } from "../data/subjects";

export default function TopBar() {
  const { state, level, xpInLevel, xpToNext, progressToNext } = useProgress();
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => {
    if (i === 0) {
      const subj = subjects.find((s) => s.slug === seg);
      return subj ? subj.title : seg;
    }
    return seg.charAt(0).toUpperCase() + seg.slice(1);
  });

  const pct = Math.min(100, progressToNext * 100);
  const lastCrumb = crumbs[crumbs.length - 1];

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/85 backdrop-blur-md supports-[backdrop-filter]:bg-ink-950/65">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 focus-ring rounded-md shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.7)]" />
          <span className="font-display text-base sm:text-lg font-bold tracking-tight">
            <span className="brand-text">studylynn</span>
          </span>
        </Link>

        {/* Mobile: show last crumb only */}
        {lastCrumb && (
          <nav className="flex sm:hidden items-center gap-1 text-xs min-w-0 flex-1">
            <ChevronRight size={12} className="text-white/30 shrink-0" />
            <span className="text-white truncate font-medium">{lastCrumb}</span>
          </nav>
        )}

        {/* Desktop: full crumbs */}
        {crumbs.length > 0 && (
          <nav className="hidden sm:flex items-center gap-1.5 text-xs min-w-0">
            <ChevronRight size={12} className="text-white/30" />
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5 min-w-0">
                <span
                  className={
                    i === crumbs.length - 1
                      ? "text-white truncate font-medium"
                      : "text-ink-300 truncate"
                  }
                >
                  {c}
                </span>
                {i < crumbs.length - 1 && (
                  <ChevronRight size={12} className="text-white/30 shrink-0" />
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="flex-1 hidden sm:block" />

        {/* HUD — compact, mobile and desktop */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Streak */}
          {state.streak > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-200">
              <Flame size={12} className="text-orange-400" />
              <span className="stat-num text-[11px]">{state.streak}</span>
            </div>
          )}

          {/* Level + XP — XP bar hidden on small screens */}
          <div className="flex items-center gap-2">
            <div className="gem w-8 h-8 text-[13px] leading-none">{level}</div>
            <div className="hidden md:flex flex-col gap-1 w-28">
              <div className="flex items-center justify-between text-[10px] leading-none">
                <span className="text-ink-300 font-mono uppercase tracking-wider">XP</span>
                <span className="stat-num text-white">
                  {xpInLevel}
                  <span className="text-ink-400 font-normal">/{xpToNext}</span>
                </span>
              </div>
              <div className="xp-track">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="xp-fill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
