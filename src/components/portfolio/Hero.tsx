import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import portrait from "@/assets/hero-portrait.jpg";
import { ArrowRight, Sparkles, Download, Github } from "lucide-react";

const ORBIT_SKILLS = [
  { name: "Java", r: 200, dur: 28, delay: 0 },
  { name: "Spring Boot", r: 200, dur: 28, delay: -7 },
  { name: "React", r: 200, dur: 28, delay: -14 },
  { name: "PostgreSQL", r: 200, dur: 28, delay: -21 },
  { name: "Docker", r: 280, dur: 38, delay: 0 },
  { name: "AI", r: 280, dur: 38, delay: -12 },
  { name: "Node.js", r: 280, dur: 38, delay: -25 },
  { name: "TypeScript", r: 280, dur: 38, delay: -32 },
];

export function Hero({ onLaunchTimeline, onExploreProjects }: { onLaunchTimeline: () => void; onExploreProjects: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-200, 200], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-200, 200], [-10, 10]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(e.clientX - cx);
      my.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />

      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass mb-10 flex items-center gap-3 rounded-full px-4 py-2 font-mono text-xs text-foreground/70"
      >
        <span className="size-1.5 animate-pulse-glow rounded-full bg-[oklch(0.75_0.2_160)]" />
        SYSTEM ONLINE
        <span className="text-foreground/30">·</span>
        <span>v3.0 / BUILD 2026.06</span>
        <span className="text-foreground/30">·</span>
        <span>VIT VELLORE</span>
      </motion.div>

      {/* Holographic portrait with orbits */}
      <div className="relative mb-10 flex h-[420px] w-[420px] items-center justify-center md:h-[520px] md:w-[520px]">
        {/* Orbit rings */}
        <div className="absolute inset-0 rounded-full border border-[oklch(0.78_0.18_200/15%)]" />
        <div className="absolute inset-12 rounded-full border border-[oklch(0.68_0.24_295/15%)]" />
        <div className="absolute inset-24 rounded-full border border-[oklch(0.75_0.2_160/12%)]" />

        {/* Orbiting skills */}
        {ORBIT_SKILLS.map((s) => (
          <div
            key={s.name}
            className="absolute"
            style={{
              ["--orbit-r" as string]: `${s.r}px`,
              animation: `orbit ${s.dur}s linear infinite`,
              animationDelay: `${s.delay}s`,
            }}
          >
            <div className="glass rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wide text-foreground/90 whitespace-nowrap">
              {s.name}
            </div>
          </div>
        ))}

        {/* Portrait */}
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
          className="relative size-56 md:size-72"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[oklch(0.78_0.18_200/40%)] via-[oklch(0.68_0.24_295/30%)] to-[oklch(0.75_0.2_160/20%)] blur-2xl" />
          <div className="glass-strong relative size-full overflow-hidden rounded-full">
            <img
              src={portrait}
              alt="Ravikiran Palaparthi"
              className="size-full object-cover"
              width={512}
              height={512}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,oklch(0.85_0.18_200/40%),transparent_60%)]" />
          </div>
          {/* Scan line */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_200)] to-transparent" style={{ animation: "scanline 4s linear infinite" }} />
          </div>
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center"
      >
        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tighter">
          <span className="block text-aurora">RAVIKIRAN</span>
          <span className="block text-foreground/90">SOFTWARE ENGINEER</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-foreground/70 md:text-lg">
          Building <span className="text-foreground">AI-Powered Systems</span>,{" "}
          <span className="text-foreground">Scalable Backend Architectures</span>, and{" "}
          <span className="text-foreground">Modern Full Stack Products</span>.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          onClick={onLaunchTimeline}
          className="group glass-strong glow-cyan inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.03]"
        >
          <Sparkles className="size-4 text-[oklch(0.85_0.18_200)]" />
          Launch Career Timeline
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </button>
        <button
          onClick={onExploreProjects}
          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.03]"
        >
          Explore Projects
          <ArrowRight className="size-4" />
        </button>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.03]"
        >
          <Github className="size-4" />
          GitHub
        </a>
        <a
          href="mailto:ravikiran.pjvs@gmail.com"
          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.03]"
        >
          <Download className="size-4" />
          Resume
        </a>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-foreground/40">
        SCROLL TO BOOT INTERFACE ↓
      </div>
    </section>
  );
}
