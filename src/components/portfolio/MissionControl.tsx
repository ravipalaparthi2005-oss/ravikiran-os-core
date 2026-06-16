import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./Timeline";
import { Activity, Code2, Database, GraduationCap, Rocket, Sparkles } from "lucide-react";

const TELEMETRY = [
  { label: "Projects Shipped",     value: 3,       suffix: "",   icon: Rocket,        color: "oklch(0.85 0.18 200)" },
  { label: "Lines of Code",        value: 100000,  suffix: "+",  icon: Code2,         color: "oklch(0.68 0.24 295)" },
  { label: "Tech Stack",           value: 15,      suffix: "+",  icon: Database,      color: "oklch(0.75 0.2 160)" },
  { label: "CGPA",                 value: 8.41,    suffix: "/10",icon: GraduationCap, color: "oklch(0.82 0.18 80)" },
  { label: "AI Models Integrated", value: 1,       suffix: "",   icon: Sparkles,      color: "oklch(0.68 0.24 295)", note: "Google Gemini" },
  { label: "Job Success Rate",     value: 99.7,    suffix: "%",  icon: Activity,      color: "oklch(0.75 0.2 160)" },
];

const RADAR = [
  { axis: "Backend",   v: 0.92 },
  { axis: "Frontend",  v: 0.86 },
  { axis: "AI",        v: 0.78 },
  { axis: "DevOps",    v: 0.7 },
  { axis: "DSA",       v: 0.85 },
  { axis: "Product",   v: 0.82 },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
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
  const display =
    to >= 1000 ? Math.round(n).toLocaleString() : to % 1 === 0 ? Math.round(n).toString() : n.toFixed(2);
  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function RadarChart() {
  const N = RADAR.length;
  const cx = 50, cy = 50, r = 38;
  const point = (i: number, scale: number) => {
    const a = (Math.PI * 2 * i) / N - Math.PI / 2;
    return [cx + Math.cos(a) * r * scale, cy + Math.sin(a) * r * scale] as const;
  };
  const polygon = RADAR.map((s, i) => point(i, s.v).join(",")).join(" ");
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon
          key={s}
          points={RADAR.map((_, i) => point(i, s).join(",")).join(" ")}
          fill="none"
          stroke="oklch(1 0 0 / 8%)"
          strokeWidth="0.2"
        />
      ))}
      {RADAR.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="oklch(1 0 0 / 6%)" strokeWidth="0.2" />;
      })}
      <motion.polygon
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "50px 50px" }}
        points={polygon}
        fill="oklch(0.85 0.18 200 / 25%)"
        stroke="oklch(0.85 0.18 200)"
        strokeWidth="0.4"
      />
      {RADAR.map((s, i) => {
        const [x, y] = point(i, s.v);
        const [lx, ly] = point(i, 1.18);
        return (
          <g key={s.axis}>
            <circle cx={x} cy={y} r="0.9" fill="oklch(0.85 0.18 200)" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="font-mono" fontSize="3" fill="oklch(0.98 0.005 250 / 70%)">
              {s.axis}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function MissionControl() {
  return (
    <section id="mission" className="grain relative px-6 py-32">
      <SectionHeader
        tag="/mission/control"
        title="Mission Control"
        sub="Real-time telemetry from a student-engineer running live production systems."
        accent="oklch(0.75 0.2 160)"
        accent2="oklch(0.85 0.18 200)"
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-3">
        {/* Telemetry tiles */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {TELEMETRY.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-strong relative overflow-hidden rounded-2xl p-5"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full opacity-40 blur-2xl"
                  style={{ background: m.color }}
                />
                <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-foreground/40">
                  <span>CHANNEL.0{i + 1}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 animate-pulse rounded-full" style={{ background: m.color }} />
                    LIVE
                  </span>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div className="font-display text-4xl font-bold" style={{ color: m.color }}>
                    <Counter to={m.value} suffix={m.suffix} />
                  </div>
                  <Icon className="size-5 opacity-50" style={{ color: m.color }} />
                </div>
                <div className="mt-2 text-sm font-semibold">{m.label}</div>
                {m.note && <div className="text-xs text-foreground/50">{m.note}</div>}
                {/* sparkline */}
                <svg viewBox="0 0 100 16" className="mt-3 h-4 w-full">
                  <polyline
                    fill="none"
                    stroke={m.color}
                    strokeWidth="0.6"
                    points={Array.from({ length: 20 })
                      .map((_, k) => `${k * 5},${8 + Math.sin(k * 0.6 + i) * 4 + (Math.random() - 0.5) * 1.5}`)
                      .join(" ")}
                  />
                </svg>
              </motion.div>
            );
          })}
        </div>

        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-strong flex flex-col rounded-2xl p-5"
        >
          <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-foreground/40">
            <span>SKILL.RADAR</span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-[oklch(0.85_0.18_200)]" />
              CALIBRATED
            </span>
          </div>
          <div className="mt-2 aspect-square w-full">
            <RadarChart />
          </div>
          <div className="mt-2 text-center font-mono text-[10px] text-foreground/50">
            6-axis engineering coverage
          </div>
        </motion.div>
      </div>
    </section>
  );
}
