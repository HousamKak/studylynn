import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, FileText, Image as ImageIcon, X } from "lucide-react";
import { SuitIcon } from "./icons";

export default function InfographicGallery({ deck }) {
  const [active, setActive] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [promptLoading, setPromptLoading] = useState(false);

  const items = deck.infographics || [];
  const baseUrl = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/infographics/${deck.slug}`;
  const imageUrl = (file) => `${baseUrl}/${file}.jpg`;
  const promptUrl = (file) => `${baseUrl}/${file}.md`;

  const openImage = (idx) => setActive({ idx, mode: "image" });
  const openPrompt = async (idx) => {
    setActive({ idx, mode: "prompt" });
    setPromptLoading(true);
    setPromptText("");
    try {
      const res = await fetch(promptUrl(items[idx].file));
      const text = await res.text();
      setPromptText(text);
    } catch {
      setPromptText("Failed to load prompt.");
    } finally {
      setPromptLoading(false);
    }
  };

  const close = () => setActive(null);
  const prev = () =>
    setActive((a) => ({ ...a, idx: (a.idx - 1 + items.length) % items.length }));
  const next = () =>
    setActive((a) => ({ ...a, idx: (a.idx + 1) % items.length }));

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="label-mono">Study sheets · {items.length}</h2>
        <div className="text-[11px] text-ink-400">High-density reference posters</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {items.map((g, idx) => {
          const primarySuit = deck.suits[g.suits[0]];
          return (
            <button
              key={g.id}
              onClick={() => openImage(idx)}
              className="group panel panel-hover overflow-hidden text-left focus-ring"
            >
              <div className="aspect-square overflow-hidden bg-ink-900 relative">
                <img
                  src={imageUrl(g.file)}
                  alt={g.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                />
                <div
                  className="absolute top-1.5 left-1.5 w-6 h-6 rounded-sm flex items-center justify-center text-[10px] font-semibold stat-num border"
                  style={{
                    background: primarySuit.color + "30",
                    color: primarySuit.color,
                    borderColor: primarySuit.color + "60",
                  }}
                >
                  {String(g.id).padStart(2, "0")}
                </div>
                <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-sm bg-ink-950/70 backdrop-blur-sm flex items-center justify-center text-ink-300 opacity-0 group-hover:opacity-100 transition">
                  <ImageIcon size={11} />
                </div>
              </div>
              <div className="p-2.5">
                <div className="text-ink-50 text-[12px] font-medium leading-snug line-clamp-2 tracking-clinical">
                  {g.title}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px]" style={{ color: primarySuit.color }}>
                  <SuitIcon deck={deck.slug} suit={g.suits[0]} size={10} strokeWidth={2} />
                  <span className="truncate uppercase tracking-wider">{primarySuit.label}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-50 bg-ink-950/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.98, y: 4 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 4 }}
              transition={{ duration: 0.14 }}
              className="relative w-full max-w-6xl max-h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="label-mono">
                    {active.idx + 1}/{items.length} · {deck.title}
                  </div>
                  <div className="font-display text-base sm:text-lg font-semibold text-ink-0 tracking-clinical truncate mt-0.5">
                    {items[active.idx].title}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() =>
                      active.mode === "image" ? openPrompt(active.idx) : openImage(active.idx)
                    }
                    className="btn-ghost text-[11px] px-2.5 py-1.5"
                  >
                    {active.mode === "image" ? (
                      <>
                        <FileText size={11} />
                        Prompt
                      </>
                    ) : (
                      <>
                        <ImageIcon size={11} />
                        Image
                      </>
                    )}
                  </button>
                  <a
                    href={imageUrl(items[active.idx].file)}
                    download
                    className="btn-ghost text-[11px] px-2.5 py-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download size={11} />
                    Save
                  </a>
                  <button onClick={close} className="btn-ghost text-[11px] px-2.5 py-1.5">
                    <X size={11} />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 overflow-auto panel-elev">
                {active.mode === "image" ? (
                  <img
                    src={imageUrl(items[active.idx].file)}
                    alt={items[active.idx].title}
                    className="block mx-auto max-w-full max-h-[78vh] object-contain"
                  />
                ) : (
                  <div className="p-5">
                    {promptLoading ? (
                      <div className="text-ink-400 text-[12px]">Loading prompt…</div>
                    ) : (
                      <pre className="text-ink-100 text-[12px] whitespace-pre-wrap leading-relaxed font-mono">
                        {promptText}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-3 text-[11px]">
                <button
                  onClick={prev}
                  className="btn-ghost px-2.5 py-1.5 text-[11px]"
                  aria-label="Previous"
                >
                  <ChevronLeft size={12} />
                  Prev
                </button>
                <div className="hidden sm:flex items-center gap-2 text-ink-400">
                  <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-ink-800 border border-ink-700 rounded-sm">
                    ← →
                  </kbd>
                  to navigate
                  <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-ink-800 border border-ink-700 rounded-sm">
                    Esc
                  </kbd>
                  to close
                </div>
                <button onClick={next} className="btn-ghost px-2.5 py-1.5 text-[11px]" aria-label="Next">
                  Next
                  <ChevronRight size={12} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
