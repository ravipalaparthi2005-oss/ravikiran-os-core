import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./Timeline";

type Line = { kind: "in" | "out" | "sys"; text: string };

const HELP = [
  "Available commands:",
  "  help          — show this list",
  "  whoami        — identity",
  "  projects      — list shipped systems",
  "  skills        — tech stack overview",
  "  education     — academic record",
  "  contact       — communication endpoints",
  "  resume        — open resume",
  "  clear         — wipe terminal",
];

const RESPONSES: Record<string, string[]> = {
  whoami: ["ravikiran@os ~ B.Tech CSE · VIT Vellore · CGPA 8.41 · Software Engineer."],
  projects: [
    "01 · InterviewOS    — AI career platform · Next.js + Gemini + WebRTC",
    "02 · TaskFlow Engine — Spring Boot job queue · 99.7% completion · -35% latency",
    "03 · VEYRA           — AI e-commerce · React + TS + Supabase",
  ],
  skills: [
    "languages : Java · JavaScript · TypeScript · Python · C · C++",
    "backend   : Spring Boot · Node.js · REST · JPA",
    "frontend  : React · Next.js · TypeScript",
    "data      : PostgreSQL · MySQL · Prisma",
    "tools     : Git · GitHub · Docker",
  ],
  education: [
    "VIT Vellore  · B.Tech CSE     · 2022–2026 · CGPA 8.41/10",
    "Sri Chaitanya · Intermediate  · 2020–2022 · 98%",
    "KKR Gowtham  · SSC            · 2020      · 98%",
  ],
  contact: [
    "email    : ravikiran.pjvs@gmail.com",
    "phone    : 9347243824",
    "location : Eluru, Andhra Pradesh, India",
    "linkedin : /in/ravikiran-palaparthi",
    "github   : /ravikiran-palaparthi",
  ],
  resume: ["Opening resume.pdf in /downloads ... (link your hosted PDF here)"],
  help: HELP,
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "sys", text: "RAVIKIRAN.OS terminal — type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const next: Line[] = [...lines, { kind: "in", text: raw }];
    if (cmd === "clear") {
      setLines([{ kind: "sys", text: "— cleared —" }]);
      return;
    }
    const out = RESPONSES[cmd];
    if (out) {
      out.forEach((t) => next.push({ kind: "out", text: t }));
    } else {
      next.push({ kind: "out", text: `command not found: ${cmd}. try 'help'.` });
    }
    setLines(next);
  };

  return (
    <section className="relative px-6 py-32">
      <SectionHeader tag="/system/terminal" title="Command Center" sub="Query the OS directly. Try: help · projects · skills · contact." />
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="glass-strong overflow-hidden rounded-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-yellow-400/70" />
            <span className="size-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 font-mono text-[10px] tracking-widest text-foreground/50">
              ravikiran@os — zsh
            </span>
          </div>
          <div
            className="h-[360px] cursor-text overflow-y-auto p-4 font-mono text-sm leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((l, i) => (
              <div
                key={i}
                className={
                  l.kind === "in"
                    ? "text-foreground"
                    : l.kind === "sys"
                    ? "text-[oklch(0.75_0.2_160)]"
                    : "text-foreground/70"
                }
              >
                {l.kind === "in" && <span className="text-[oklch(0.85_0.18_200)]">➜ </span>}
                {l.text}
              </div>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
              className="mt-1 flex items-center gap-2"
            >
              <span className="text-[oklch(0.85_0.18_200)]">➜</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
