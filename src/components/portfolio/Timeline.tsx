import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, forwardRef } from "react";
import { GraduationCap, School, Building2 } from "lucide-react";

const STAGES = [
  { icon: School, year: "Apr 2020", title: "SSC · KKR Gowtham School", place: "Eluru", score: "98%", note: "Foundations laid." },
  { icon: GraduationCap, year: "Jun 2020 — May 2022", title: "Intermediate (MPC)", place: "Sri Chaitanya · Vijayawada", score: "98%", note: "Math · Physics · Chemistry." },
  { icon: Building2, year: "Sep 2022 — May 2026", title: "B.Tech CSE · VIT Vellore", place: "Vellore Institute of Technology", score: "CGPA 8.41 / 10", note: "Full-stack & systems engineering." },
];

export const Timeline = forwardRef<HTMLElement>((_, ref) => {
  const localRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: localRef, offset: ["start end", "end start"] });
  const pathH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} id="timeline" className="relative px-6 py-32">
      <SectionHeader tag="/career/timeline" title="Career Journey" sub="From Eluru classrooms to building production AI systems at VIT." />

      <div ref={localRef} className="relative mx-auto mt-16 max-w-4xl">
        {/* Spine */}
        <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={{ height: pathH }}
          className="absolute left-6 top-0 w-px bg-gradient-to-b from-[oklch(0.85_0.18_200)] via-[oklch(0.68_0.24_295)] to-[oklch(0.75_0.2_160)] shadow-[0_0_20px_oklch(0.85_0.18_200/60%)] md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-16">
          {STAGES.map((s, i) => {
            const Icon = s.icon;
            const left = i % 2 === 0;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative pl-16 md:flex md:items-center md:pl-0"
              >
                <div className={`md:w-1/2 ${left ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12"}`}>
                  <div className="glass rounded-2xl p-5">
                    <div className="font-mono text-[10px] tracking-widest text-[oklch(0.85_0.18_200)]">{s.year}</div>
                    <div className="mt-1 text-lg font-semibold">{s.title}</div>
                    <div className="text-sm text-foreground/60">{s.place}</div>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[oklch(0.75_0.2_160/30%)] bg-[oklch(0.75_0.2_160/10%)] px-3 py-1 font-mono text-xs text-[oklch(0.75_0.2_160)]">
                      {s.score}
                    </div>
                    <p className="mt-3 text-sm text-foreground/70">{s.note}</p>
                  </div>
                </div>
                {/* Node */}
                <div className="absolute left-6 top-6 -translate-x-1/2 md:left-1/2">
                  <div className="glow-cyan flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.85_0.18_200)] to-[oklch(0.68_0.24_295)]">
                    <Icon className="size-5 text-background" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
Timeline.displayName = "Timeline";

export function SectionHeader({
  tag,
  title,
  sub,
  accent = "oklch(0.85 0.18 200)",
  accent2,
}: {
  tag: string;
  title: string;
  sub?: string;
  accent?: string;
  accent2?: string;
}) {
  const a2 = accent2 ?? accent;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest" style={{ color: accent }}>
        <span className="size-1 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
        {tag}
      </div>
      <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
        <span
          style={{
            background: `linear-gradient(135deg, ${accent} 0%, ${a2} 60%, oklch(0.98 0.005 250) 120%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </span>
      </h2>
      {sub && <p className="mt-4 text-balance text-foreground/65">{sub}</p>}
      <div className="mx-auto mt-6 h-px w-24" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
    </motion.div>
  );
}
