import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type Module = { id: string; label: string; color: string };

export const MODULES: Module[] = [
  { id: "hero",       label: "Hero",              color: "oklch(0.85 0.18 200)" },
  { id: "journey",    label: "Journey",           color: "oklch(0.85 0.18 200)" },
  { id: "skills",     label: "Skill System",      color: "oklch(0.82 0.18 80)"  },
  { id: "brain",      label: "Inside My Brain",   color: "oklch(0.72 0.18 240)" },
  { id: "sims",       label: "Simulations",       color: "oklch(0.68 0.24 295)" },
  { id: "mission",    label: "Mission Control",   color: "oklch(0.75 0.2 160)"  },
  { id: "future",     label: "If I Join",         color: "oklch(0.78 0.2 25)"   },
  { id: "terminal",   label: "Command Center",    color: "oklch(0.85 0.18 145)" },
  { id: "briefing",   label: "Recruiter Briefing",color: "oklch(0.92 0.06 90)"  },
];

export function ModuleNav() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const els = MODULES.map((m) => document.getElementById(m.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const current = MODULES.find((m) => m.id === active) ?? MODULES[0];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pointer-events-none fixed left-1/2 top-4 z-40 -translate-x-1/2"
      >
        <div
          className="glass-strong inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.3em]"
          style={{ boxShadow: `0 0 24px ${current.color}40`, borderColor: `${current.color}60` }}
        >
          <span
            className="size-1.5 animate-pulse-glow rounded-full"
            style={{ background: current.color, boxShadow: `0 0 10px ${current.color}` }}
          />
          <span style={{ color: current.color }}>MODULE</span>
          <span className="text-foreground/40">·</span>
          <span className="text-foreground/85">{current.label.toUpperCase()}</span>
        </div>
      </motion.div>

      <nav className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
        <ul className="flex flex-col gap-3">
          {MODULES.map((m) => {
            const isActive = m.id === active;
            return (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(m.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="group relative flex items-center"
                  aria-label={m.label}
                >
                  <span
                    className="absolute right-6 whitespace-nowrap rounded-md bg-background/80 px-2 py-0.5 font-mono text-[10px] tracking-widest opacity-0 backdrop-blur transition group-hover:opacity-100"
                    style={{ color: m.color }}
                  >
                    {m.label}
                  </span>
                  <span
                    className="block rounded-full transition-all"
                    style={{
                      width: isActive ? 12 : 6,
                      height: isActive ? 12 : 6,
                      background: m.color,
                      boxShadow: isActive ? `0 0 14px ${m.color}` : `0 0 4px ${m.color}80`,
                      opacity: isActive ? 1 : 0.45,
                    }}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
