import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Timeline";
import { FileText, Database, Cpu, ShoppingBag, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

/* ============================================================
   InterviewOS — fake ATS scanner
   ============================================================ */
function ATSScanner() {
  const [text, setText] = useState("");
  const [scan, setScan] = useState<null | { score: number; matched: string[]; missing: string[] }>(null);
  const [running, setRunning] = useState(false);

  const SKILLS = ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker", "AWS", "Kafka", "Spring Security", "REST", "JPA", "Microservices"];

  const run = () => {
    if (!text.trim()) return;
    setRunning(true);
    setScan(null);
    setTimeout(() => {
      const lower = text.toLowerCase();
      const matched = SKILLS.filter((s) => lower.includes(s.toLowerCase()));
      const missing = SKILLS.filter((s) => !matched.includes(s)).slice(0, 4);
      const score = Math.min(98, 35 + matched.length * 6 + Math.floor(text.length / 80));
      setScan({ score, matched, missing });
      setRunning(false);
    }, 1400);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/50">
          <FileText className="size-3.5" /> PASTE RESUME / EXPERIENCE
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          placeholder="e.g. 3 years Java + Spring Boot, built REST APIs on PostgreSQL, React frontend..."
          className="glass w-full resize-none rounded-xl bg-transparent p-4 text-sm outline-none placeholder:text-foreground/30 focus:border-[oklch(0.85_0.18_200)]"
        />
        <button
          onClick={run}
          disabled={running || !text.trim()}
          className="glass-strong glow-cyan inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:scale-[1.02] disabled:opacity-50"
        >
          <Sparkles className="size-4 text-[oklch(0.85_0.18_200)]" />
          {running ? "Analyzing…" : "Run ATS Scanner"}
        </button>
      </div>

      <div className="glass-strong relative min-h-[260px] overflow-hidden rounded-2xl p-5">
        {!scan && !running && (
          <div className="grid h-full place-items-center text-center text-sm text-foreground/40">
            <div>
              <div className="font-mono text-[10px] tracking-widest">INTERVIEWOS · /ats/engine</div>
              <div className="mt-2">Awaiting input…</div>
            </div>
          </div>
        )}
        {running && (
          <div className="grid h-full place-items-center">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 animate-pulse rounded-full bg-[oklch(0.85_0.18_200)]" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
        {scan && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] tracking-widest text-foreground/40">JD MATCH</div>
                <div className="font-display text-5xl font-bold text-aurora">{scan.score}%</div>
              </div>
              <div className="text-right text-xs text-foreground/50">
                {scan.score >= 75 ? "Strong fit" : scan.score >= 55 ? "Moderate fit" : "Needs upskilling"}
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${scan.score}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[oklch(0.85_0.18_200)] to-[oklch(0.75_0.2_160)]"
              />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[oklch(0.75_0.2_160)]">
                  <CheckCircle2 className="size-3" /> MATCHED
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {scan.matched.length === 0 && <span className="text-xs text-foreground/40">None detected.</span>}
                  {scan.matched.map((s) => (
                    <span key={s} className="rounded-full border border-[oklch(0.75_0.2_160/30%)] bg-[oklch(0.75_0.2_160/10%)] px-2 py-0.5 font-mono text-[10px] text-[oklch(0.75_0.2_160)]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[oklch(0.82_0.18_80)]">
                  <AlertCircle className="size-3" /> MISSING
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {scan.missing.map((s) => (
                    <span key={s} className="rounded-full border border-[oklch(0.82_0.18_80/30%)] bg-[oklch(0.82_0.18_80/10%)] px-2 py-0.5 font-mono text-[10px] text-[oklch(0.82_0.18_80)]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   TaskFlow — live job queue simulation
   ============================================================ */
type Job = { id: number; state: "queued" | "processing" | "success" | "failed"; priority: "high" | "med" | "low" };

function TaskFlowSim() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const idRef = useRef(1);

  useEffect(() => {
    const spawn = setInterval(() => {
      idRef.current += 1;
      const pr = (["high", "med", "low"] as const)[Math.floor(Math.random() * 3)];
      setJobs((j) => [...j.slice(-14), { id: idRef.current, state: "queued", priority: pr }]);
    }, 900);
    const tick = setInterval(() => {
      setJobs((j) =>
        j.map((job) => {
          if (job.state === "queued" && Math.random() > 0.4) return { ...job, state: "processing" };
          if (job.state === "processing" && Math.random() > 0.5)
            return { ...job, state: Math.random() > 0.05 ? "success" : "failed" };
          return job;
        })
      );
    }, 700);
    return () => {
      clearInterval(spawn);
      clearInterval(tick);
    };
  }, []);

  const cols: { key: Job["state"]; label: string; color: string; icon: typeof Database }[] = [
    { key: "queued",     label: "Queued",     color: "oklch(0.85 0.18 200)", icon: Send },
    { key: "processing", label: "Processing", color: "oklch(0.68 0.24 295)", icon: Cpu },
    { key: "success",    label: "Success",    color: "oklch(0.75 0.2 160)",  icon: CheckCircle2 },
    { key: "failed",     label: "Failed",     color: "oklch(0.82 0.18 80)",  icon: AlertCircle },
  ];
  const counts = Object.fromEntries(cols.map((c) => [c.key, jobs.filter((j) => j.state === c.key).length]));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-widest text-foreground/60">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-[oklch(0.75_0.2_160)]" /> WORKERS · 4
        </span>
        <span>THROUGHPUT · LIVE</span>
        <span className="text-[oklch(0.75_0.2_160)]">99.7% SUCCESS RATE</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {cols.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.key} className="glass-strong rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest" style={{ color: c.color }}>
                  <Icon className="size-3" /> {c.label.toUpperCase()}
                </div>
                <div className="font-mono text-xs" style={{ color: c.color }}>{counts[c.key] ?? 0}</div>
              </div>
              <div className="mt-3 space-y-1.5">
                <AnimatePresence>
                  {jobs.filter((j) => j.state === c.key).slice(-6).map((j) => (
                    <motion.div
                      key={j.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10, scale: 0.9 }}
                      className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 font-mono text-[10px]"
                      style={{ borderColor: `${c.color}40` }}
                    >
                      <span className="text-foreground/70">job_{String(j.id).padStart(4, "0")}</span>
                      <span
                        className="rounded px-1.5 py-px text-[9px] uppercase"
                        style={{
                          color: j.priority === "high" ? "oklch(0.82 0.18 80)" : j.priority === "med" ? "oklch(0.85 0.18 200)" : "oklch(0.7 0.05 250)",
                        }}
                      >
                        {j.priority}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   VEYRA — AI stylist
   ============================================================ */
type Look = { title: string; items: string[]; vibe: string; color: string };
const LOOKBOOK: { match: string[]; look: Look }[] = [
  {
    match: ["interview", "tech", "office", "formal", "job"],
    look: {
      title: "The Tech Interview Edit",
      vibe: "Sharp · Confident · Quietly Premium",
      color: "oklch(0.6 0.05 250)",
      items: ["Slim navy blazer — wool blend", "Crisp white oxford shirt", "Charcoal tapered trousers", "Minimal leather derby shoes", "Slate knit tie (optional)"],
    },
  },
  {
    match: ["wedding", "indian", "ethnic", "festive", "traditional"],
    look: {
      title: "Festive Wedding Drop",
      vibe: "Regal · Tonal · Modern Indian",
      color: "oklch(0.62 0.18 30)",
      items: ["Bandhgala in raw silk", "Ivory kurta pajama set", "Embroidered nehru jacket", "Tan jutti loafers", "Pocket square in saffron"],
    },
  },
  {
    match: ["casual", "weekend", "coffee", "date", "chill"],
    look: {
      title: "Weekend Off-Duty",
      vibe: "Soft · Layered · Effortless",
      color: "oklch(0.7 0.1 80)",
      items: ["Oversized cream tee", "Olive cargo pants", "White low-top sneakers", "Linen overshirt", "Brushed steel watch"],
    },
  },
];

function VeyraSim() {
  const [q, setQ] = useState("");
  const [look, setLook] = useState<Look | null>(null);
  const [thinking, setThinking] = useState(false);

  const ask = () => {
    if (!q.trim()) return;
    setThinking(true);
    setLook(null);
    setTimeout(() => {
      const lower = q.toLowerCase();
      const hit = LOOKBOOK.find((l) => l.match.some((w) => lower.includes(w))) ?? LOOKBOOK[2];
      setLook(hit.look);
      setThinking(false);
    }, 1100);
  };

  return (
    <div className="space-y-4">
      <div className="glass flex items-center gap-2 rounded-full p-1.5 pl-4">
        <ShoppingBag className="size-4 text-[oklch(0.68_0.24_295)]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="I need clothes for a tech interview…"
          className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-foreground/40"
        />
        <button
          onClick={ask}
          className="glow-violet rounded-full bg-gradient-to-br from-[oklch(0.68_0.24_295)] to-[oklch(0.85_0.18_200)] px-4 py-2 text-xs font-semibold text-background"
        >
          Ask Stylist
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {["I need clothes for a tech interview", "Outfit for an Indian wedding", "Weekend coffee date look"].map((s) => (
          <button
            key={s}
            onClick={() => { setQ(s); setTimeout(ask, 50); }}
            className="glass rounded-xl px-3 py-2 text-left text-xs text-foreground/70 transition hover:text-foreground"
          >
            <span className="text-[oklch(0.68_0.24_295)]">›</span> {s}
          </button>
        ))}
      </div>

      <div className="glass-strong relative min-h-[200px] overflow-hidden rounded-2xl p-5">
        {!look && !thinking && (
          <div className="grid h-full place-items-center text-sm text-foreground/40">
            VEYRA · /ai/stylist awaiting query
          </div>
        )}
        {thinking && (
          <div className="grid h-full place-items-center">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 animate-pulse rounded-full bg-[oklch(0.68_0.24_295)]" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
        {look && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3">
              <div className="size-3 rounded-full" style={{ background: look.color, boxShadow: `0 0 18px ${look.color}` }} />
              <div className="font-display text-xl font-bold">{look.title}</div>
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground/50">{look.vibe}</div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {look.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-2 text-sm text-foreground/85"
                >
                  <span style={{ color: look.color }}>▸</span> {it}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Wrapper
   ============================================================ */
const TABS = [
  { id: "interviewos", name: "InterviewOS", tag: "AI ATS Scanner", color: "oklch(0.85 0.18 200)" },
  { id: "taskflow",    name: "TaskFlow Engine", tag: "Live Job Queue", color: "oklch(0.75 0.2 160)" },
  { id: "veyra",       name: "VEYRA", tag: "AI Stylist", color: "oklch(0.68 0.24 295)" },
] as const;

export function Simulations() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("interviewos");
  return (
    <section className="relative px-6 py-32">
      <SectionHeader
        tag="/projects/simulations"
        title="Live Project Simulations"
        sub="Don't just read about them — touch them. Three demos, fully interactive."
      />

      <div className="mx-auto mt-12 max-w-6xl">
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm transition"
                style={active ? { boxShadow: `0 0 22px ${t.color}`, borderColor: t.color, transform: "scale(1.04)" } : { opacity: 0.6 }}
              >
                <span className="size-1.5 rounded-full" style={{ background: t.color }} />
                {t.name}
                <span className="font-mono text-[10px] text-foreground/40">/ {t.tag}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-strong rounded-3xl p-6 md:p-8"
        >
          {tab === "interviewos" && <ATSScanner />}
          {tab === "taskflow" && <TaskFlowSim />}
          {tab === "veyra" && <VeyraSim />}
        </motion.div>
      </div>
    </section>
  );
}
