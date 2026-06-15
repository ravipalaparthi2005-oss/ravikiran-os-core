import { motion, useScroll, useTransform } from "framer-motion";
import { forwardRef, useRef } from "react";
import { SectionHeader } from "./Timeline";
import { Train, MapPin } from "lucide-react";

const STATIONS = [
  {
    code: "ELU",
    name: "Eluru",
    sub: "Where it began",
    year: "2008 — 2020",
    metric: "98%",
    metricLabel: "SSC Score",
    detail: "KKR Gowtham School. Foundations in mathematics, logic, and curiosity.",
    color: "oklch(0.85 0.18 200)",
  },
  {
    code: "VJA",
    name: "Vijayawada",
    sub: "Sharpening the edge",
    year: "2020 — 2022",
    metric: "98%",
    metricLabel: "Intermediate (MPC)",
    detail: "Sri Chaitanya. Physics · Chemistry · Math. The first taste of systems thinking.",
    color: "oklch(0.68 0.24 295)",
  },
  {
    code: "VIT",
    name: "VIT Vellore",
    sub: "Engineering ignition",
    year: "2022 — 2026",
    metric: "8.41",
    metricLabel: "CGPA / 10",
    detail: "B.Tech CSE. Java, Spring Boot, React, AI. Three production systems shipped.",
    color: "oklch(0.75 0.2 160)",
  },
  {
    code: "SDE",
    name: "Software Engineer",
    sub: "Loading next station…",
    year: "2026 →",
    metric: "∞",
    metricLabel: "Building the future",
    detail: "AI-powered systems. Backend at scale. Products that ship.",
    color: "oklch(0.82 0.18 80)",
  },
];

export const JourneyTrain = forwardRef<HTMLElement>((_, ref) => {
  const localRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: localRef, offset: ["start end", "end start"] });
  const trainY = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);
  const lineH = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} id="timeline" className="relative px-6 py-32">
      <SectionHeader
        tag="/career/journey"
        title="The Journey"
        sub="Four stations. One trajectory. Scroll to ride through Ravikiran's engineering origin."
      />

      <div ref={localRef} className="relative mx-auto mt-20 max-w-5xl">
        {/* Rail */}
        <div className="absolute left-8 top-0 h-full w-px bg-white/8 md:left-1/2 md:-translate-x-1/2" />
        {/* Glowing live rail */}
        <motion.div
          style={{ height: lineH }}
          className="absolute left-8 top-0 w-px bg-gradient-to-b from-[oklch(0.85_0.18_200)] via-[oklch(0.68_0.24_295)] to-[oklch(0.82_0.18_80)] shadow-[0_0_24px_oklch(0.85_0.18_200/80%)] md:left-1/2 md:-translate-x-1/2"
        />
        {/* Train carriage */}
        <motion.div
          style={{ top: trainY }}
          className="pointer-events-none absolute left-8 -translate-x-1/2 md:left-1/2"
        >
          <div className="glass-strong glow-cyan flex size-12 items-center justify-center rounded-full">
            <Train className="size-5 text-[oklch(0.85_0.18_200)]" />
          </div>
          <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-[oklch(0.85_0.18_200/40%)] blur-xl" />
        </motion.div>

        <div className="space-y-28">
          {STATIONS.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative pl-20 md:flex md:items-center md:pl-0"
              >
                <div className={`md:w-1/2 ${left ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"}`}>
                  {/* Station building */}
                  <motion.div
                    whileHover={{ y: -6, rotateX: 4, rotateY: left ? -4 : 4 }}
                    style={{ transformPerspective: 900 }}
                    className="glass-strong relative overflow-hidden rounded-2xl p-6"
                  >
                    {/* Lit windows */}
                    <div className="pointer-events-none absolute inset-0 opacity-30">
                      <div className="absolute right-4 top-4 grid grid-cols-3 gap-1">
                        {Array.from({ length: 9 }).map((_, k) => (
                          <span
                            key={k}
                            className="size-1.5 rounded-sm"
                            style={{
                              background: s.color,
                              animation: `pulse-glow ${1.6 + (k % 3) * 0.4}s ease-in-out ${k * 0.12}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest" style={{ color: s.color }}>
                      <MapPin className="size-3" />
                      STATION · {s.code}
                    </div>
                    <div className="font-display mt-2 text-3xl font-bold">{s.name}</div>
                    <div className="text-sm text-foreground/60">{s.sub}</div>
                    <div className="mt-1 font-mono text-[11px] text-foreground/40">{s.year}</div>

                    {/* Hologram metric */}
                    <div className={`mt-5 flex items-end gap-3 ${left ? "md:justify-end" : ""}`}>
                      <div
                        className="font-display text-5xl font-bold leading-none"
                        style={{
                          background: `linear-gradient(180deg, ${s.color}, transparent 140%)`,
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                          textShadow: `0 0 28px ${s.color}`,
                        }}
                      >
                        {s.metric}
                      </div>
                      <div className="pb-1 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                        {s.metricLabel}
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-foreground/75">{s.detail}</p>
                  </motion.div>
                </div>

                {/* Station beacon on rail */}
                <div className="absolute left-8 top-6 -translate-x-1/2 md:left-1/2">
                  <div
                    className="size-5 rounded-full ring-4"
                    style={{ background: s.color, boxShadow: `0 0 24px ${s.color}, 0 0 48px ${s.color}`, ["--tw-ring-color" as string]: "oklch(0.13 0.03 265)" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
JourneyTrain.displayName = "JourneyTrain";
