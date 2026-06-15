import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Timeline";
import { Brain, Server, Sparkles, Layers, Workflow } from "lucide-react";

type Mode = "backend" | "ai" | "product";

const MODES: Record<Mode, { label: string; color: string; icon: typeof Brain; flow: { node: string; detail: string }[] }> = {
  backend: {
    label: "Backend Thinking",
    color: "oklch(0.85 0.18 200)",
    icon: Server,
    flow: [
      { node: "Request",    detail: "Validate shape, auth, rate-limit." },
      { node: "Controller", detail: "Thin layer. Map DTOs. Delegate." },
      { node: "Service",    detail: "Business rules. Transactions. Retries." },
      { node: "Repository", detail: "JPA. Indexed queries. Zero N+1." },
      { node: "Database",   detail: "PostgreSQL. ACID. Auditable state." },
    ],
  },
  ai: {
    label: "AI Thinking",
    color: "oklch(0.68 0.24 295)",
    icon: Sparkles,
    flow: [
      { node: "Input",    detail: "User intent. Resume. Question. Context." },
      { node: "Prompt",   detail: "System role + few-shot + guardrails." },
      { node: "Gemini",   detail: "LLM call. Streamed tokens. Tool calls." },
      { node: "Validate", detail: "Schema-check JSON. Reject hallucinations." },
      { node: "Response", detail: "Render. Cache. Log for evals." },
    ],
  },
  product: {
    label: "Product Thinking",
    color: "oklch(0.75 0.2 160)",
    icon: Workflow,
    flow: [
      { node: "User Pain",  detail: "What hurts? Measure before building." },
      { node: "Hypothesis", detail: "Smallest experiment that proves value." },
      { node: "Ship",       detail: "End-to-end. Auth → UI → telemetry." },
      { node: "Measure",    detail: "Latency. Success rate. Drop-offs." },
      { node: "Iterate",    detail: "Cut what failed. Double down on signal." },
    ],
  },
};

export function InsideMyBrain() {
  const [mode, setMode] = useState<Mode>("backend");
  const m = MODES[mode];

  return (
    <section className="relative px-6 py-32">
      <SectionHeader
        tag="/agents/cognition"
        title="Inside My Brain"
        sub="Switch modes. Watch the neural pathway light up. This is how I think before I write code."
      />

      {/* Mode switcher */}
      <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2">
        {(Object.keys(MODES) as Mode[]).map((k) => {
          const M = MODES[k];
          const Icon = M.icon;
          const active = mode === k;
          return (
            <button
              key={k}
              onClick={() => setMode(k)}
              className={`glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${active ? "scale-105" : "opacity-60 hover:opacity-100"}`}
              style={active ? { boxShadow: `0 0 24px ${M.color}`, borderColor: M.color } : undefined}
            >
              <Icon className="size-4" style={{ color: M.color }} />
              {M.label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-5">
        {/* Neural network viz */}
        <div className="glass-strong relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-3">
          <NeuralViz color={m.color} key={mode} />
          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/60">
            <Brain className="size-3.5" style={{ color: m.color }} />
            NEURAL PATHWAY · {m.label.toUpperCase()}
          </div>
        </div>

        {/* Flow */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {m.flow.map((step, i) => (
                <motion.div
                  key={step.node}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="glass rounded-xl p-4"
                  style={{ borderLeft: `2px solid ${m.color}` }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex size-6 items-center justify-center rounded-full font-mono text-[10px]"
                      style={{ background: m.color, color: "oklch(0.13 0.03 265)" }}
                    >
                      {i + 1}
                    </div>
                    <div className="font-semibold">{step.node}</div>
                    {i < m.flow.length - 1 && (
                      <Layers className="ml-auto size-3 text-foreground/30" />
                    )}
                  </div>
                  <div className="mt-1.5 pl-8 text-xs text-foreground/65">{step.detail}</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function NeuralViz({ color }: { color: string }) {
  // 3 layers, 4-6-4 neurons
  const layers = [4, 6, 4];
  const W = 100, H = 100;
  const nodes = layers.flatMap((count, li) => {
    const x = ((li + 0.5) / layers.length) * W;
    return Array.from({ length: count }, (_, ni) => ({
      x,
      y: ((ni + 0.5) / count) * H,
      layer: li,
      id: `${li}-${ni}`,
    }));
  });
  const edges = nodes.flatMap((a) =>
    nodes
      .filter((b) => b.layer === a.layer + 1)
      .map((b) => ({ a, b, id: `${a.id}->${b.id}` }))
  );
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full">
      <defs>
        <radialGradient id="neuron-g">
          <stop offset="0" stopColor={color} stopOpacity="1" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      {edges.map((e, i) => (
        <line
          key={e.id}
          x1={e.a.x}
          y1={e.a.y}
          x2={e.b.x}
          y2={e.b.y}
          stroke={color}
          strokeWidth="0.15"
          opacity="0.35"
        >
          <animate
            attributeName="opacity"
            values="0.1;0.7;0.1"
            dur={`${1.6 + (i % 5) * 0.3}s`}
            repeatCount="indefinite"
            begin={`${(i % 9) * 0.15}s`}
          />
        </line>
      ))}
      {edges.slice(0, 14).map((e, i) => (
        <circle key={`p-${i}`} r="0.5" fill={color}>
          <animateMotion
            dur={`${1.6 + (i % 4) * 0.5}s`}
            repeatCount="indefinite"
            path={`M${e.a.x},${e.a.y} L${e.b.x},${e.b.y}`}
            begin={`${(i % 6) * 0.2}s`}
          />
        </circle>
      ))}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="2.6" fill="url(#neuron-g)" opacity="0.6" />
          <circle cx={n.x} cy={n.y} r="1.1" fill={color}>
            <animate attributeName="r" values="0.9;1.5;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}
