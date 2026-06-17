import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { SectionHeader } from "./Timeline";

type Line = { kind: "in" | "out" | "sys" | "ok" | "warn"; text: string };

const COMMANDS = [
  "help", "whoami", "projects", "skills", "education", "contact",
  "resume", "github", "linkedin", "backend", "ai", "frontend",
  "clear", "banner", "open",
];

const HELP = [
  "Available commands:",
  "  help          show this list",
  "  whoami        identity & summary",
  "  projects      shipped systems",
  "  skills        tech stack",
  "  backend       backend deep-dive",
  "  ai            AI engineering work",
  "  frontend      frontend stack",
  "  education     academic record",
  "  contact       communication endpoints",
  "  resume        download resume",
  "  github        open GitHub profile",
  "  linkedin      open LinkedIn profile",
  "  open <url>    open any url",
  "  banner        reprint banner",
  "  clear         wipe terminal",
  "",
  "Tip: ↑/↓ history · Tab to autocomplete",
];

const BANNER = [
  "  ____   ____  ____  ___    ___",
  " |  _ \\ /  _ \\|  _ \\/ _ \\  / _ \\",
  " | |_) | |_| ) | | ) | | || | | |",
  " |  __/|  _ <| |_| | |_| || |_| |",
  " |_|   |_| \\_\\____/ \\___/  \\___/",
  "",
  " PALAPARTHI RAVIKIRAN · OS v3.0",
  " kernel: java/21  shell: zsh  region: in-south",
];

const RESPONSES: Record<string, Line[]> = {
  whoami: [
    { kind: "out", text: "ravikiran@os ~ B.Tech CSE · VIT Vellore · CGPA 8.41" },
    { kind: "out", text: "role      : Software Engineer (Backend · Full Stack · AI)" },
    { kind: "ok",  text: "status    : open to opportunities" },
  ],
  projects: [
    { kind: "out", text: "01 · InterviewOS    — Next.js + Gemini + WebRTC · AI career platform" },
    { kind: "out", text: "02 · TaskFlow Engine — Spring Boot job queue · 99.7% completion · -35% p95" },
    { kind: "out", text: "03 · VEYRA           — React + TS + Supabase · AI e-commerce" },
  ],
  skills: [
    { kind: "out", text: "languages : Java · TypeScript · JavaScript · Python · C · C++" },
    { kind: "out", text: "backend   : Spring Boot · Node.js · REST · JPA · Kafka basics" },
    { kind: "out", text: "frontend  : React · Next.js · TanStack · Tailwind" },
    { kind: "out", text: "data      : PostgreSQL · MySQL · Prisma · Redis" },
    { kind: "out", text: "ai        : Gemini · OpenAI · LangChain · prompt eval" },
    { kind: "out", text: "tools     : Git · GitHub · Docker · Vercel · Supabase" },
  ],
  backend: [
    { kind: "out", text: "// Spring Boot · Hexagonal layering · JPA + Postgres" },
    { kind: "out", text: "TaskFlow Engine → 50k+ jobs/day · retries · DLQ · idempotency" },
    { kind: "out", text: "InterviewOS API → auth, rate-limit, streaming Gemini responses" },
    { kind: "ok",  text: "p95 latency reduced by 35% via query indexing + caching" },
  ],
  ai: [
    { kind: "out", text: "// Gemini · OpenAI · structured outputs · schema validation" },
    { kind: "out", text: "InterviewOS  — ATS scoring · JD match · learning roadmap" },
    { kind: "out", text: "VEYRA        — multimodal stylist · confidence-scored recs" },
    { kind: "ok",  text: "guardrails: JSON schema + retry · hallucination rejection" },
  ],
  frontend: [
    { kind: "out", text: "React 19 · TanStack Start · Framer Motion · Tailwind v4" },
    { kind: "out", text: "Design systems · accessibility · 90+ Lighthouse" },
  ],
  education: [
    { kind: "out", text: "VIT Vellore  · B.Tech CSE     · 2022–2026 · CGPA 8.41/10" },
    { kind: "out", text: "Sri Chaitanya · Intermediate  · 2020–2022 · 98%" },
    { kind: "out", text: "KKR Gowtham  · SSC            · 2020      · 98%" },
  ],
  contact: [
    { kind: "out", text: "email    : ravikiran.pjvs@gmail.com" },
    { kind: "out", text: "phone    : +91 93472 43824" },
    { kind: "out", text: "location : Eluru, Andhra Pradesh, India" },
    { kind: "out", text: "linkedin : /in/ravikiran-palaparthi" },
    { kind: "out", text: "github   : /ravikiran-palaparthi" },
  ],
  help: HELP.map((t) => ({ kind: "out" as const, text: t })),
};

const URLS: Record<string, string> = {
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  resume: "mailto:ravikiran.pjvs@gmail.com?subject=Resume%20Request",
};

export function Terminal() {
  const initial: Line[] = [
    ...BANNER.map((t) => ({ kind: "sys" as const, text: t })),
    { kind: "sys", text: "" },
    { kind: "sys", text: "type 'help' to begin · ↑/↓ history · Tab autocomplete" },
  ];
  const [lines, setLines] = useState<Line[]>(initial);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const didMount = useRef(false);

  useEffect(() => {
    // Skip the first render so the terminal does not yank the whole page
    // down to its bottom on initial load.
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const end = endRef.current;
    const scroller = end?.closest<HTMLElement>("[data-terminal-scroll]");
    if (scroller) {
      scroller.scrollTop = scroller.scrollHeight;
    }
  }, [lines]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const [cmd, ...rest] = trimmed.toLowerCase().split(/\s+/);
    const next: Line[] = [...lines, { kind: "in", text: raw }];

    if (cmd === "clear") {
      setLines([{ kind: "sys", text: "— cleared —" }]);
    } else if (cmd === "banner") {
      setLines([...next, ...BANNER.map((t) => ({ kind: "sys" as const, text: t }))]);
    } else if (cmd === "open" && rest[0]) {
      window.open(rest[0].startsWith("http") ? rest[0] : `https://${rest[0]}`, "_blank");
      setLines([...next, { kind: "ok", text: `↗ opening ${rest[0]}` }]);
    } else if (URLS[cmd]) {
      window.open(URLS[cmd], "_blank");
      setLines([...next, { kind: "ok", text: `↗ opening ${cmd} …` }]);
    } else if (RESPONSES[cmd]) {
      setLines([...next, ...RESPONSES[cmd]]);
    } else {
      setLines([...next, { kind: "warn", text: `command not found: ${cmd}. try 'help'.` }]);
    }
    setHistory((h) => [...h, raw]);
    setHistIdx(-1);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const i = histIdx + 1;
      if (i >= history.length) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(i); setInput(history[i]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cur = input.trim().toLowerCase();
      if (!cur) return;
      const matches = COMMANDS.filter((c) => c.startsWith(cur));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) {
        setLines((l) => [...l, { kind: "out", text: matches.join("  ") }]);
      }
    }
  };

  const colorOf = (k: Line["kind"]) =>
    k === "in" ? "text-foreground"
    : k === "sys" ? "text-[oklch(0.75_0.2_160)]"
    : k === "ok" ? "text-[oklch(0.82_0.18_140)]"
    : k === "warn" ? "text-[oklch(0.78_0.2_30)]"
    : "text-foreground/75";

  return (
    <section id="terminal" className="grain relative px-6 py-32">
      <SectionHeader tag="/system/terminal" title="Command Center" sub="Query the OS directly. ↑/↓ history · Tab to autocomplete · try: projects · backend · ai · open github" accent="oklch(0.85 0.18 145)" accent2="oklch(0.75 0.2 160)" />
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="glass-strong overflow-hidden rounded-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-yellow-400/70" />
            <span className="size-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 font-mono text-[10px] tracking-widest text-foreground/50">
              ravikiran@os — zsh — 132×38
            </span>
            <span className="ml-auto font-mono text-[10px] text-foreground/40">●REC</span>
          </div>
          <div
            className="h-[420px] cursor-text overflow-y-auto p-4 font-mono text-sm leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((l, i) => (
              <div key={i} className={`${colorOf(l.kind)} whitespace-pre`}>
                {l.kind === "in" && <span className="text-[oklch(0.85_0.18_200)]">➜ </span>}
                {l.text}
              </div>
            ))}
            <form
              onSubmit={(e) => { e.preventDefault(); run(input); setInput(""); }}
              className="mt-1 flex items-center gap-2"
            >
              <span className="text-[oklch(0.85_0.18_200)]">➜</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                className="flex-1 bg-transparent text-foreground outline-none"
                autoComplete="off"
                spellCheck={false}
                aria-label="terminal input"
              />
              <span className="inline-block h-4 w-2 animate-blink bg-[oklch(0.85_0.18_200)]" />
            </form>
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
