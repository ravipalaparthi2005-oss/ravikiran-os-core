import { motion } from "framer-motion";
import { SectionHeader } from "./Timeline";
import { Calendar, Code2, Rocket, Target, Zap } from "lucide-react";

const PHASES = [
  {
    when: "Day 1",
    title: "Map the system",
    color: "oklch(0.85 0.18 200)",
    icon: Calendar,
    bullets: ["Read architecture docs end-to-end", "Pair with onboarding buddy", "Run app locally · trace one request"],
  },
  {
    when: "Week 1",
    title: "Ship the first PR",
    color: "oklch(0.68 0.24 295)",
    icon: Code2,
    bullets: ["Close 2-3 small bugs", "Open my first meaningful PR", "Set up dashboards I'll watch"],
  },
  {
    when: "Month 1",
    title: "Own a feature",
    color: "oklch(0.75 0.2 160)",
    icon: Zap,
    bullets: ["Lead an end-to-end feature", "Write the design doc", "Add tests + telemetry from day one"],
  },
  {
    when: "Month 3",
    title: "Own a module",
    color: "oklch(0.82 0.18 80)",
    icon: Target,
    bullets: ["Become point person for one service", "Improve latency or reliability by 20%+", "Mentor next new joiner"],
  },
  {
    when: "Month 6",
    title: "Drive impact",
    color: "oklch(0.78 0.2 25)",
    icon: Rocket,
    bullets: ["Propose new initiative", "Ship something I'm proud of", "Help shape the roadmap"],
  },
];

export function IfIJoin() {
  return (
    <section id="future" className="grain relative px-6 py-32">
      <SectionHeader
        tag="/forecast/onboarding"
        title="If I Join Your Team"
        sub="A projected operating cadence — Day 1 through Month 6. Calibrated, not promised."
        accent="oklch(0.78 0.2 25)"
        accent2="oklch(0.82 0.18 80)"
      />

      <div className="mx-auto mt-16 max-w-6xl">
        {/* Track */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-[oklch(0.85_0.18_200)] via-[oklch(0.68_0.24_295)] to-[oklch(0.78_0.2_25)] opacity-50 md:block" />
          <div className="grid gap-6 md:grid-cols-5">
            {PHASES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.when}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Beacon */}
                  <div className="mb-4 flex justify-center md:justify-start">
                    <div
                      className="relative flex size-10 items-center justify-center rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${p.color}, transparent 70%)`,
                        boxShadow: `0 0 24px ${p.color}`,
                      }}
                    >
                      <Icon className="size-4 text-background" style={{ color: "oklch(0.13 0.03 265)" }} />
                    </div>
                  </div>
                  <div className="glass-strong rounded-2xl p-4">
                    <div className="font-mono text-[10px] tracking-widest" style={{ color: p.color }}>
                      {p.when.toUpperCase()}
                    </div>
                    <div className="mt-1 font-display text-lg font-semibold">{p.title}</div>
                    <ul className="mt-3 space-y-1.5">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-1.5 text-xs text-foreground/75">
                          <span style={{ color: p.color }}>▸</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mx-auto mt-12 max-w-3xl rounded-2xl p-5 text-center font-mono text-xs text-foreground/60"
        >
          <span className="text-[oklch(0.85_0.18_200)]">›</span> Quiet ownership. Tight feedback loops.
          Bias for shipping. Long-term thinking from week one.
        </motion.div>
      </div>
    </section>
  );
}
