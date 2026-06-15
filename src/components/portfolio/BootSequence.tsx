import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { text: "> INITIALIZING RAVIKIRAN.OS v3.0", c: "text-[oklch(0.85_0.18_200)]" },
  { text: "> [ OK ] Mounting /engineering/profile", c: "text-foreground/80" },
  { text: "> [ OK ] Loading AI Systems...", c: "text-foreground/80" },
  { text: "> [ OK ] Loading Backend Architecture...", c: "text-foreground/80" },
  { text: "> [ OK ] Loading Full Stack Projects...", c: "text-foreground/80" },
  { text: "> [ OK ] Neural mesh online — 8,412 nodes synced", c: "text-foreground/80" },
  { text: "> SYSTEM READY.", c: "text-[oklch(0.75_0.2_160)] font-bold" },
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (i >= LINES.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 700);
      }, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI(i + 1), 280 + Math.random() * 220);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.13_0.03_265)_80%)]" />
          <div className="relative z-10 w-full max-w-2xl px-6 font-mono text-sm md:text-base">
            <div className="mb-4 flex items-center gap-2 text-xs text-foreground/50">
              <span className="size-2 animate-pulse-glow rounded-full bg-[oklch(0.75_0.2_160)]" />
              ravikiran@os ~ %
            </div>
            <div className="space-y-1.5">
              {LINES.slice(0, i).map((l, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={l.c}
                >
                  {l.text}
                </motion.div>
              ))}
              {i < LINES.length && (
                <span className="inline-block h-4 w-2 animate-blink bg-[oklch(0.85_0.18_200)]" />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
