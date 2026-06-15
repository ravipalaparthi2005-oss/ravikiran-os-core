import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "./Timeline";
import { Cpu, Database, Globe, Layers, Shield, Sparkles, Workflow, Zap } from "lucide-react";

type ProjectNode = { id: string; label: string; icon: LucideIcon; x: number; y: number };
type Project = {
  id: string;
  name: string;
  tagline: string;
  role: string;
  stack: string[];
  highlights: string[];
  nodes: ProjectNode[];
  edges: [string, string][];
  accent: string;
};

const PROJECTS: Project[] = [
  {
    id: "interviewos",
    name: "InterviewOS",
    tagline: "AI Career Preparation Platform",
    role: "Full Stack Developer",
    stack: ["Next.js 15", "React 19", "Node.js", "Prisma", "SQLite", "Gemini", "WebRTC", "Socket.IO"],
    highlights: [
      "ATS resume scanner computes JD-match %, identifies skill gaps, generates personalized roadmaps.",
      "AI mock interviews powered by Google Gemini API with real-time feedback.",
      "Sandboxed code execution engine for JS / Python / Java / C++ with runtime metrics.",
      "JWT auth + RBAC for secure session management.",
    ],
    accent: "oklch(0.85 0.18 200)",
    nodes: [
      { id: "client", label: "Next.js Client", icon: Globe, x: 12, y: 50 },
      { id: "api", label: "Node API", icon: Layers, x: 40, y: 25 },
      { id: "auth", label: "JWT · RBAC", icon: Shield, x: 40, y: 75 },
      { id: "gemini", label: "Gemini AI", icon: Sparkles, x: 70, y: 18 },
      { id: "sandbox", label: "Code Sandbox", icon: Cpu, x: 70, y: 50 },
      { id: "db", label: "Prisma · SQLite", icon: Database, x: 70, y: 82 },
    ],
    edges: [
      ["client", "api"],
      ["client", "auth"],
      ["api", "gemini"],
      ["api", "sandbox"],
      ["api", "db"],
      ["auth", "db"],
    ],
  },
  {
    id: "taskflow",
    name: "TaskFlow Engine",
    tagline: "Intelligent Background Job Processing",
    role: "Backend Engineer",
    stack: ["Java", "Spring Boot", "PostgreSQL", "JPA", "REST"],
    highlights: [
      "Priority-based asynchronous job queue with -35% latency vs baseline.",
      "Self-healing retry mechanism (up to 3 attempts) hits 99.7% completion rate.",
      "Composite indexing + JPA patterns eliminate table scans on high-volume workloads.",
      "Granular state-transition auditing per job.",
    ],
    accent: "oklch(0.75 0.2 160)",
    nodes: [
      { id: "producer", label: "Producers", icon: Zap, x: 12, y: 50 },
      { id: "queue", label: "Priority Queue", icon: Workflow, x: 40, y: 50 },
      { id: "worker", label: "Worker Pool", icon: Cpu, x: 65, y: 30 },
      { id: "retry", label: "Retry Engine", icon: Shield, x: 65, y: 70 },
      { id: "db", label: "PostgreSQL", icon: Database, x: 88, y: 50 },
    ],
    edges: [
      ["producer", "queue"],
      ["queue", "worker"],
      ["queue", "retry"],
      ["worker", "db"],
      ["retry", "queue"],
      ["retry", "db"],
    ],
  },
  {
    id: "veyra",
    name: "VEYRA",
    tagline: "AI-Powered E-Commerce Platform",
    role: "Full Stack Developer",
    stack: ["React", "TypeScript", "Supabase", "Tailwind"],
    highlights: [
      "Full-stack e-commerce: catalog, cart, wishlist, orders, secure auth.",
      "AI fashion recommendation engine driven by natural language preferences.",
      "Real-time BI dashboard for sales, inventory, and customer activity.",
      "Interactive analytics for data-driven merchandising.",
    ],
    accent: "oklch(0.68 0.24 295)",
    nodes: [
      { id: "shop", label: "Storefront", icon: Globe, x: 14, y: 30 },
      { id: "ai", label: "AI Stylist", icon: Sparkles, x: 14, y: 70 },
      { id: "api", label: "Supabase Edge", icon: Layers, x: 45, y: 50 },
      { id: "auth", label: "Auth · RLS", icon: Shield, x: 72, y: 25 },
      { id: "db", label: "Postgres", icon: Database, x: 72, y: 55 },
      { id: "bi", label: "BI Dashboard", icon: Workflow, x: 72, y: 85 },
    ],
    edges: [
      ["shop", "api"],
      ["ai", "api"],
      ["api", "auth"],
      ["api", "db"],
      ["api", "bi"],
      ["db", "bi"],
    ],
  },
];

function ArchitectureMap({ project }: { project: Project }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const nodeById = (id: string) => project.nodes.find((n) => n.id === id)!;
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g-${project.id}`} x1="0" x2="1">
            <stop offset="0" stopColor={project.accent} stopOpacity="0.8" />
            <stop offset="1" stopColor="oklch(0.85 0.18 200)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {project.edges.map(([a, b], i) => {
          const A = nodeById(a), B = nodeById(b);
          return (
            <g key={i}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={`url(#g-${project.id})`} strokeWidth="0.25" opacity="0.6" />
              <circle r="0.8" fill={project.accent}>
                <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite" path={`M${A.x},${A.y} L${B.x},${B.y}`} />
              </circle>
            </g>
          );
        })}
      </svg>
      {project.nodes.map((n) => {
        const Icon = n.icon;
        const isHover = hovered === n.id;
        return (
          <button
            key={n.id}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div
              className="glass-strong flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition"
              style={{
                boxShadow: isHover ? `0 0 24px ${project.accent}, 0 0 60px ${project.accent}80` : "none",
                borderColor: isHover ? project.accent : undefined,
              }}
            >
              <Icon className="size-4" style={{ color: project.accent }} />
              <div className="font-mono text-[10px] whitespace-nowrap">{n.label}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export const Projects = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="projects" className="relative px-6 py-32">
      <SectionHeader tag="/projects/control-room" title="Project Control Rooms" sub="Three production systems. Three interactive architectures. Hover nodes to inspect." />

      <div className="mx-auto mt-16 max-w-6xl space-y-24">
        {PROJECTS.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 lg:grid-cols-5"
          >
            <div className={`lg:col-span-2 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="font-mono text-[11px] tracking-widest" style={{ color: p.accent }}>
                /project/0{idx + 1}
              </div>
              <h3 className="font-display mt-2 text-3xl font-bold md:text-4xl">{p.name}</h3>
              <div className="mt-1 text-foreground/60">{p.tagline}</div>
              <div className="mt-1 font-mono text-xs text-foreground/40">{p.role}</div>

              <ul className="mt-5 space-y-2.5 text-sm text-foreground/80">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span style={{ color: p.accent }}>▸</span> {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="glass rounded-full px-2.5 py-0.5 font-mono text-[10px] text-foreground/70">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className={`lg:col-span-3 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
              <ArchitectureMap project={p} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});
Projects.displayName = "Projects";
