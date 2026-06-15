import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./Timeline";

type Skill = { name: string; cluster: 0 | 1 | 2 | 3; conf: number; projects: string; x: number; y: number };

const SKILLS: Skill[] = [
  // Backend cluster
  { name: "Java", cluster: 0, conf: 92, projects: "TaskFlow Engine", x: 22, y: 30 },
  { name: "Spring Boot", cluster: 0, conf: 88, projects: "TaskFlow Engine", x: 30, y: 22 },
  { name: "REST APIs", cluster: 0, conf: 90, projects: "All projects", x: 18, y: 42 },
  { name: "JPA", cluster: 0, conf: 80, projects: "TaskFlow Engine", x: 28, y: 38 },
  // Frontend cluster
  { name: "React", cluster: 1, conf: 92, projects: "InterviewOS · VEYRA", x: 72, y: 28 },
  { name: "Next.js", cluster: 1, conf: 86, projects: "InterviewOS", x: 80, y: 38 },
  { name: "TypeScript", cluster: 1, conf: 88, projects: "VEYRA", x: 70, y: 42 },
  // Data cluster
  { name: "PostgreSQL", cluster: 2, conf: 86, projects: "TaskFlow Engine", x: 25, y: 70 },
  { name: "MySQL", cluster: 2, conf: 78, projects: "Coursework", x: 18, y: 62 },
  { name: "Prisma", cluster: 2, conf: 84, projects: "InterviewOS", x: 32, y: 78 },
  // DevOps cluster
  { name: "Docker", cluster: 3, conf: 76, projects: "TaskFlow Engine", x: 75, y: 70 },
  { name: "Git", cluster: 3, conf: 92, projects: "All projects", x: 82, y: 62 },
  { name: "GitHub", cluster: 3, conf: 92, projects: "All projects", x: 70, y: 78 },
];

const CLUSTER_COLOR = [
  "oklch(0.85 0.18 200)", // cyan
  "oklch(0.68 0.24 295)", // violet
  "oklch(0.75 0.2 160)",  // aurora
  "oklch(0.82 0.18 80)",  // amber
];

const CLUSTER_LABEL = ["Backend", "Frontend", "Data", "DevOps"];

export function SkillsConstellation() {
  const [hover, setHover] = useState<Skill | null>(null);

  return (
    <section className="relative px-6 py-32">
      <SectionHeader tag="/skills/constellation" title="Skills Galaxy" sub="Each star is a discipline. Clusters form the engineering operating system." />

      <div className="relative mx-auto mt-12 aspect-[16/10] max-w-6xl">
        <div className="glass-strong absolute inset-0 overflow-hidden rounded-3xl">
          {/* Cluster halos */}
          {CLUSTER_COLOR.map((c, i) => {
            const cx = i % 2 === 0 ? 25 : 75;
            const cy = i < 2 ? 30 : 72;
            return (
              <div
                key={i}
                className="pointer-events-none absolute size-[40%] rounded-full opacity-30 blur-3xl"
                style={{ background: c, left: `${cx}%`, top: `${cy}%`, transform: "translate(-50%, -50%)" }}
              />
            );
          })}

          {/* SVG connections */}
          <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {SKILLS.flatMap((a, i) =>
              SKILLS.slice(i + 1)
                .filter((b) => b.cluster === a.cluster)
                .map((b) => (
                  <line
                    key={`${a.name}-${b.name}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={CLUSTER_COLOR[a.cluster]}
                    strokeWidth="0.15"
                    opacity="0.4"
                  />
                ))
            )}
          </svg>

          {/* Cluster labels */}
          {CLUSTER_LABEL.map((l, i) => {
            const cx = i % 2 === 0 ? 6 : 94;
            const cy = i < 2 ? 8 : 92;
            return (
              <div
                key={l}
                className="absolute font-mono text-[10px] tracking-widest text-foreground/40"
                style={{ left: `${cx}%`, top: `${cy}%`, transform: `translate(-${i % 2 === 0 ? 0 : 100}%, -${i < 2 ? 0 : 100}%)` }}
              >
                /{l.toLowerCase()}
              </div>
            );
          })}

          {/* Stars */}
          {SKILLS.map((s) => (
            <motion.button
              key={s.name}
              onHoverStart={() => setHover(s)}
              onHoverEnd={() => setHover(null)}
              whileHover={{ scale: 1.4 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <div
                className="size-3 rounded-full"
                style={{
                  background: CLUSTER_COLOR[s.cluster],
                  boxShadow: `0 0 16px ${CLUSTER_COLOR[s.cluster]}, 0 0 32px ${CLUSTER_COLOR[s.cluster]}`,
                }}
              />
              <div className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-foreground/70">
                {s.name}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Hover panel */}
        <motion.div
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 10 }}
          className="glass-strong pointer-events-none absolute bottom-4 left-4 max-w-xs rounded-2xl p-4"
        >
          {hover && (
            <>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full" style={{ background: CLUSTER_COLOR[hover.cluster] }} />
                <div className="font-semibold">{hover.name}</div>
                <div className="ml-auto font-mono text-xs text-foreground/50">{CLUSTER_LABEL[hover.cluster]}</div>
              </div>
              <div className="mt-2 text-xs text-foreground/70">Used in: {hover.projects}</div>
              <div className="mt-3">
                <div className="flex justify-between font-mono text-[10px] text-foreground/50">
                  <span>CONFIDENCE</span>
                  <span>{hover.conf}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${hover.conf}%`,
                      background: `linear-gradient(90deg, ${CLUSTER_COLOR[hover.cluster]}, oklch(0.85 0.18 200))`,
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
