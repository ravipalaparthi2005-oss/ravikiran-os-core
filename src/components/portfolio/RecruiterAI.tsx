import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageSquare } from "lucide-react";

const QA: { q: string; a: string[] }[] = [
  {
    q: "Why should I hire Ravikiran?",
    a: [
      "Ravikiran ships production-grade systems as a student.",
      "TaskFlow Engine reached 99.7% job completion with a self-healing retry layer.",
      "He pairs strong Java/Spring Boot fundamentals with shipped AI features (Gemini, WebRTC, sandboxed code execution).",
      "Verdict: rare full-stack + backend + AI triple-threat. Hire signal: HIGH.",
    ],
  },
  {
    q: "What are his strongest technical skills?",
    a: [
      "Backend: Java, Spring Boot, REST APIs, JPA, PostgreSQL indexing.",
      "Full Stack: React 19, Next.js 15, TypeScript, Node.js, Prisma ORM.",
      "AI Engineering: Google Gemini API, real-time WebRTC + Socket.IO orchestration.",
      "Foundations: DSA, OOP, DBMS, Computer Networks. CGPA 8.41 / 98% Intermediate / 98% SSC.",
    ],
  },
  {
    q: "Show backend experience.",
    a: [
      "TaskFlow Engine — priority-based async job queue, Spring Boot + PostgreSQL.",
      "Reduced task processing latency by 35% via optimized polling queries.",
      "Composite indexing + JPA patterns eliminated table scans on high-volume workloads.",
      "Self-healing retry mechanism, granular state-transition auditing, 99.7% completion rate.",
    ],
  },
  {
    q: "Show AI projects.",
    a: [
      "InterviewOS — AI mock interviews powered by Google Gemini.",
      "ATS resume scanner that scores JD-match % and generates personalized learning roadmaps.",
      "Sandboxed multi-language code execution engine (JS / Python / Java / C++).",
      "VEYRA — AI fashion recommendation engine with natural language preference modeling.",
    ],
  },
  {
    q: "Show leadership potential.",
    a: [
      "Architected three end-to-end production systems solo, from schema to deploy.",
      "Owns full delivery loop: auth (JWT + RBAC), data layer, AI integration, real-time, UI.",
      "Fast learner — Microsoft Azure AI-900 certified (Apr 2026).",
      "Builds with a product mindset, not just code.",
    ],
  },
];

export function RecruiterAI() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [typing, setTyping] = useState(false);
  const [shown, setShown] = useState<string[]>([]);

  const ask = async (i: number) => {
    setActive(i);
    setShown([]);
    setTyping(true);
    const lines = QA[i].a;
    for (let k = 0; k < lines.length; k++) {
      await new Promise((r) => setTimeout(r, 380));
      setShown((s) => [...s, lines[k]]);
    }
    setTyping(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass-strong glow-violet fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition hover:scale-105"
        aria-label="Open Recruiter AI"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.75_0.2_160)] opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-[oklch(0.75_0.2_160)]" />
        </span>
        <Bot className="size-4 text-[oklch(0.85_0.18_200)]" />
        Ask Recruiter AI
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] flex items-end justify-end bg-background/40 p-4 backdrop-blur-sm md:items-center md:justify-center"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-2xl overflow-hidden rounded-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="glow-cyan rounded-full bg-gradient-to-br from-[oklch(0.85_0.18_200)] to-[oklch(0.68_0.24_295)] p-1.5">
                    <Bot className="size-4 text-background" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Recruiter AI</div>
                    <div className="font-mono text-[10px] text-foreground/50">RAVIKIRAN.OS · /agents/recruiter</div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-full p-1.5 transition hover:bg-white/10">
                  <X className="size-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-5">
                {active === null ? (
                  <div className="space-y-2">
                    <div className="mb-3 flex items-start gap-2 text-sm text-foreground/80">
                      <MessageSquare className="mt-0.5 size-4 text-[oklch(0.85_0.18_200)]" />
                      Pick a question to query Ravikiran's profile.
                    </div>
                    {QA.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => ask(i)}
                        className="glass group block w-full rounded-xl px-4 py-3 text-left text-sm transition hover:bg-white/10"
                      >
                        <span className="text-[oklch(0.85_0.18_200)]">›</span>{" "}
                        <span className="group-hover:text-foreground">{q.q}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="glass rounded-xl px-4 py-2.5 text-sm text-foreground/80">
                      <span className="font-mono text-xs text-[oklch(0.85_0.18_200)]">YOU › </span>
                      {QA[active].q}
                    </div>
                    <div className="space-y-2">
                      {shown.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-2 text-sm leading-relaxed text-foreground/90"
                        >
                          <span className="text-[oklch(0.75_0.2_160)]">▸</span> {line}
                        </motion.div>
                      ))}
                      {typing && (
                        <div className="flex gap-1 pl-4">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="size-1.5 animate-pulse rounded-full bg-[oklch(0.85_0.18_200)]"
                              style={{ animationDelay: `${i * 150}ms` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setActive(null)}
                      className="font-mono text-xs text-foreground/60 transition hover:text-foreground"
                    >
                      ← Ask another question
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
