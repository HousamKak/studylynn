import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ChevronRight, Star } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-ink-950/60">
      {/* Aurora strip behind the bar */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 0% 50%, rgba(139,92,246,0.18), transparent 70%), radial-gradient(ellipse 60% 100% at 100% 50%, rgba(217,70,239,0.14), transparent 70%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-5 h-16 flex items-center gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group focus-ring rounded-lg">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-70 animate-ping-slow" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
          </span>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight">
            <span className="brand-text">studylynn</span>
          </span>
        </Link>

        {/* Crumbs */}
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

        <div className="flex-1" />

        {/* HUD */}
        <div className="hidden md:flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1.5 chip bg-orange-500/10 border border-orange-500/30 text-orange-200">
            <Flame
              size={14}
              className={`text-orange-400 ${
                state.streak > 0 ? "animate-pulse-glow" : ""
              }`}
            />
            <span className="stat-num text-orange-100">{state.streak}</span>
            <span className="text-orange-200/70 text-[11px]">
              day{state.streak === 1 ? "" : "s"}
            </span>
          </div>

          <div className="hairline-v h-6" />

          {/* Level gem */}
          <div className="flex items-center gap-2.5">
            <div className="gem w-9 h-9 text-white text-sm font-bold flex flex-col items-center justify-center leading-none">
              <span className="relative z-10 stat-num text-[14px]">{level}</span>
              <Star
                size={8}
                className="absolute -top-0.5 -right-0.5 text-amber-200 fill-amber-300 drop-shadow"
              />
            </div>

            {/* XP bar */}
            <div className="flex flex-col gap-1 w-36">
              <div className="flex items-center justify-between text-[10px] leading-none">
                <span className="label-mono !text-[10px] text-ink-300">XP</span>
                <span className="stat-num text-white">
                  {xpInLevel}
                  <span className="text-ink-400 font-normal">/{xpToNext}</span>
                </span>
              </div>
              <div className="xp-track">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="xp-fill"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile mini HUD */}
        <div className="flex md:hidden items-center gap-2">
          <div className="gem w-8 h-8 text-white text-xs font-bold flex items-center justify-center">
            <span className="relative z-10 stat-num">{level}</span>
          </div>
          {state.streak > 0 && (
            <div className="chip bg-orange-500/10 border border-orange-500/30 text-orange-200 !px-2 !py-0.5">
              <Flame size={12} className="text-orange-400" />
              <span className="stat-num text-[11px]">{state.streak}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
