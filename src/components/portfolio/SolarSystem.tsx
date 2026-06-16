import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Timeline";

type Planet = {
  name: string;
  orbit: number;
  size: number;
  speed: number;
  color: string;
  offset: number;
  projects: string;
  exp: string;
  impact: string;
};

const PLANETS: Planet[] = [
  { name: "Spring Boot", orbit: 110, size: 22, speed: 22, color: "oklch(0.78 0.18 145)", offset: 0,   projects: "TaskFlow Engine", exp: "2 yrs · Production", impact: "99.7% job success · -35% latency" },
  { name: "PostgreSQL",  orbit: 160, size: 26, speed: 32, color: "oklch(0.72 0.16 240)", offset: 80,  projects: "TaskFlow · VEYRA · InterviewOS", exp: "2 yrs", impact: "Composite indexing eliminated table scans" },
  { name: "React",       orbit: 215, size: 28, speed: 42, color: "oklch(0.78 0.15 220)", offset: 150, projects: "InterviewOS · VEYRA", exp: "3 yrs", impact: "Built 3 full-stack product UIs" },
  { name: "Next.js",     orbit: 265, size: 22, speed: 54, color: "oklch(0.98 0.005 250)", offset: 220, projects: "InterviewOS", exp: "1.5 yrs", impact: "SSR + App Router · type-safe full-stack" },
  { name: "Docker",      orbit: 315, size: 24, speed: 66, color: "oklch(0.78 0.14 200)", offset: 290, projects: "TaskFlow Engine", exp: "1 yr", impact: "Containerized backend deploys" },
  { name: "Gemini AI",   orbit: 365, size: 26, speed: 80, color: "oklch(0.78 0.18 295)", offset: 0,   projects: "InterviewOS · VEYRA", exp: "1 yr", impact: "Mock interviews · AI stylist · roadmaps" },
];

const SUN_NAME = "Java";

export function SolarSystem() {
  const [active, setActive] = useState<Planet | null>(null);
  const [sun, setSun] = useState(false);

  return (
    <section id="skills" className="grain relative px-6 py-32">
      <SectionHeader
        tag="/skills/solar-system"
        title="The Skill System"
        sub="Java is the sun. Every planet is a tool in orbit. Click to dock with one."
        accent="oklch(0.82 0.18 80)"
        accent2="oklch(0.78 0.2 25)"
      />

      <div className="relative mx-auto mt-16 flex aspect-square w-full max-w-3xl items-center justify-center">
        {/* Starfield */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="absolute size-px rounded-full bg-white"
              style={{
                left: `${(i * 47) % 100}%`,
                top: `${(i * 83) % 100}%`,
                opacity: 0.2 + ((i * 7) % 60) / 100,
                animation: `pulse-glow ${2 + (i % 5)}s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Orbit rings */}
        {PLANETS.map((p) => (
          <div
            key={`ring-${p.name}`}
            className="pointer-events-none absolute rounded-full border border-white/8"
            style={{ width: p.orbit * 2, height: p.orbit * 2 }}
          />
        ))}

        {/* Sun (Java) */}
        <button
          onMouseEnter={() => setSun(true)}
          onMouseLeave={() => setSun(false)}
          onClick={() => setActive({ name: "Java", orbit: 0, size: 80, speed: 0, color: "oklch(0.82 0.18 80)", offset: 0, projects: "TaskFlow Engine · Coursework · DSA", exp: "3+ yrs · Core language", impact: "OOP · concurrency · Spring backbone" })}
          className="absolute z-10"
        >
          <div className="relative">
            <div
              className="size-24 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, oklch(0.95 0.18 80), oklch(0.7 0.22 60) 60%, oklch(0.45 0.2 40))",
                boxShadow: `0 0 60px oklch(0.82 0.18 80 / 80%), 0 0 140px oklch(0.82 0.18 80 / 50%)${sun ? ", 0 0 220px oklch(0.82 0.18 80 / 60%)" : ""}`,
                animation: "pulse-glow 4s ease-in-out infinite",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-background">
              {SUN_NAME}
            </div>
          </div>
        </button>

        {/* Planets */}
        {PLANETS.map((p) => (
          <div
            key={p.name}
            className="absolute"
            style={{
              ["--orbit-r" as string]: `${p.orbit}px`,
              animation: `orbit ${p.speed}s linear infinite`,
              animationDelay: `-${p.offset}s`,
            }}
          >
            <button
              onClick={() => setActive(p)}
              className="group block -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className="rounded-full transition-transform group-hover:scale-150"
                style={{
                  width: p.size,
                  height: p.size,
                  background: `radial-gradient(circle at 30% 30%, white, ${p.color} 55%, oklch(0.2 0.05 270))`,
                  boxShadow: `0 0 16px ${p.color}, 0 0 32px ${p.color}80`,
                }}
              />
              <div className="mt-1.5 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-foreground/70 group-hover:text-foreground">
                {p.name}
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-xl overflow-hidden rounded-3xl p-8"
            >
              <div className="flex items-center gap-4">
                <div
                  className="size-20 shrink-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, white, ${active.color} 55%, oklch(0.2 0.05 270))`,
                    boxShadow: `0 0 40px ${active.color}, 0 0 80px ${active.color}80`,
                  }}
                />
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-foreground/50">DOCKED · /planet</div>
                  <div className="font-display text-3xl font-bold">{active.name}</div>
                </div>
              </div>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Projects</dt>
                  <dd className="mt-1 text-foreground/90">{active.projects}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Experience</dt>
                  <dd className="mt-1 text-foreground/90">{active.exp}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Impact</dt>
                  <dd className="mt-1 text-foreground/90">{active.impact}</dd>
                </div>
              </dl>
              <button
                onClick={() => setActive(null)}
                className="mt-6 font-mono text-xs text-foreground/60 hover:text-foreground"
              >
                ← Return to orbit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
