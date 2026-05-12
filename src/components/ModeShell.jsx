import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ModeShell({
  title,
  subtitle,
  onExit,
  children,
  hud = null,
  exitTo = "/neuropath",
}) {
  const navigate = useNavigate();
  const exit = onExit || (() => navigate(exitTo));

  return (
    <div className="max-w-3xl mx-auto px-5 py-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <div className="label-mono mb-1">{title}</div>
          {subtitle && (
            <p className="text-ink-300 text-[13px] tracking-clinical">{subtitle}</p>
          )}
        </div>
        <button
          onClick={exit}
          className="btn-ghost text-xs px-3 py-1.5 focus-ring"
        >
          <ArrowLeft size={12} />
          Exit
        </button>
      </div>
      {hud && <div className="mb-4">{hud}</div>}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        key={title}
      >
        {children}
      </motion.div>
    </div>
  );
}
