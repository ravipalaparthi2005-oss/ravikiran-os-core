import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./Timeline";

const METRICS = [
  { value: 99.7, suffix: "%", label: "Job Success Rate", sub: "TaskFlow Engine" },
  { value: 35, suffix: "%", label: "Latency Reduction", sub: "Optimized polling" },
  { value: 4, suffix: "+", label: "Programming Languages", sub: "Java · TS · Python · C++" },
  { value: 3, suffix: "", label: "Production Projects", sub: "Solo-shipped systems" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  const display = to % 1 === 0 ? Math.round(n).toString() : n.toFixed(1);
  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <section className="relative px-6 py-32">
      <SectionHeader tag="/engineering/impact" title="Engineering Impact" sub="Live system telemetry from shipped projects." />
      <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-strong relative overflow-hidden rounded-2xl p-6"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-[oklch(0.85_0.18_200/20%)] blur-2xl" />
            <div className="font-mono text-[10px] tracking-widest text-foreground/40">METRIC.0{i + 1}</div>
            <div className="font-display mt-3 text-5xl font-bold text-aurora md:text-6xl">
              <Counter to={m.value} suffix={m.suffix} />
            </div>
            <div className="mt-2 text-sm font-semibold">{m.label}</div>
            <div className="text-xs text-foreground/50">{m.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
