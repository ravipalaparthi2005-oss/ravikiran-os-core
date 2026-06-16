import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/hero-portrait.jpg";
import { ArrowRight, Sparkles, Download, Github } from "lucide-react";
import { MagneticButton } from "./primitives";

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

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number };

function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, prev: { x: 0, y: 0 } });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const m = mouse.current;
      m.prev.x = m.x === -9999 ? e.clientX : m.x;
      m.prev.y = m.y === -9999 ? e.clientY : m.y;
      m.x = e.clientX;
      m.y = e.clientY;
      const dx = m.x - m.prev.x;
      const dy = m.y - m.prev.y;
      const speed = Math.min(20, Math.hypot(dx, dy));
      const n = Math.min(6, 1 + Math.floor(speed / 3));
      for (let i = 0; i < n; i++) {
        particles.current.push({
          x: m.x + (Math.random() - 0.5) * 8,
          y: m.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2 + dx * 0.05,
          vy: (Math.random() - 0.5) * 1.2 + dy * 0.05,
          life: 0,
          max: 50 + Math.random() * 30,
          hue: Math.random() < 0.5 ? 200 : 295,
        });
      }
      if (particles.current.length > 180) particles.current.splice(0, particles.current.length - 180);
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particles.current;
      // Connect particles near cursor
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        const a = 1 - p.life / p.max;
        if (a <= 0) continue;
        const hueStr = p.hue === 200 ? "133, 220, 255" : "180, 140, 255";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * a + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hueStr}, ${a * 0.9})`;
        ctx.shadowColor = `rgba(${hueStr}, ${a})`;
        ctx.shadowBlur = 12;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      // Neural links between close particles
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i], b = ps[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 60) {
            const op = (1 - d / 60) * 0.18 * (1 - a.life / a.max);
            if (op <= 0) continue;
            ctx.strokeStyle = `rgba(133, 220, 255, ${op})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      particles.current = ps.filter((p) => p.life < p.max);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[5]" />;
}

export function Hero({ onLaunchTimeline, onExploreProjects }: { onLaunchTimeline: () => void; onExploreProjects: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-200, 200], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-200, 200], [-10, 10]), { stiffness: 120, damping: 18 });
  const [exploded, setExploded] = useState(false);

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
      <CursorTrail />
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
              animationPlayState: exploded ? "paused" : "running",
            }}
          >
            <motion.div
              animate={exploded ? { scale: 1.4, opacity: 0.4 } : { scale: 1, opacity: 1 }}
              className="glass rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wide text-foreground/90 whitespace-nowrap"
            >
              {s.name}
            </motion.div>
          </div>
        ))}

        {/* Portrait */}
        <motion.div
          onClick={() => setExploded((v) => !v)}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
          whileTap={{ scale: 0.97 }}
          className="relative size-56 cursor-pointer md:size-72"
        >
          {/* Shockwave on activate */}
          {exploded && (
            <>
              <span className="pointer-events-none absolute inset-0 -z-10 animate-shockwave rounded-full border-2 border-[oklch(0.85_0.18_200)]" />
              <span className="pointer-events-none absolute inset-0 -z-10 animate-shockwave rounded-full border border-[oklch(0.68_0.24_295)]" style={{ animationDelay: "0.15s" }} />
              <span className="pointer-events-none absolute inset-0 -z-10 animate-shockwave rounded-full border border-[oklch(0.75_0.2_160)]" style={{ animationDelay: "0.3s" }} />
            </>
          )}
          {/* Aura */}
          <motion.div
            animate={exploded ? { scale: 1.6, opacity: 0.9 } : { scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.8 }}
            className="absolute -inset-4 rounded-full bg-gradient-to-br from-[oklch(0.78_0.18_200/40%)] via-[oklch(0.68_0.24_295/30%)] to-[oklch(0.75_0.2_160/20%)] blur-2xl"
          />
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
            <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0, transparent 2px, oklch(0.85 0.18 200 / 8%) 2px, oklch(0.85 0.18 200 / 8%) 3px)",
              }} />
          </div>
          {/* Scan line */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_200)] to-transparent" style={{ animation: "scanline 4s linear infinite" }} />
          </div>
          {/* Tap hint */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest text-foreground/40">
            CLICK TO {exploded ? "STABILIZE" : "ACTIVATE ENGINEER MODE"}
          </div>
        </motion.div>
      </div>

      {/* ENGINEER MODE banner */}
      {exploded && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed left-1/2 top-24 z-40 -translate-x-1/2"
        >
          <div className="glass-strong glow-cyan rounded-full px-5 py-2 font-mono text-[11px] tracking-[0.35em] text-[oklch(0.85_0.18_200)]">
            ◉ ENGINEER MODE · ACTIVATED
          </div>
        </motion.div>
      )}
      {exploded && (
        <div className="pointer-events-none fixed inset-0 z-30 animate-engineer-flash bg-[radial-gradient(circle_at_center,oklch(0.85_0.18_200/22%),transparent_60%)]" />
      )}


      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center"
      >
        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tighter">
          <span className="block text-foreground/90">PALAPARTHI</span>
          <span className="block text-aurora">RAVIKIRAN</span>
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
        <MagneticButton
          onClick={onLaunchTimeline}
          className="group glass-strong glow-cyan inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.03]"
        >
          <Sparkles className="size-4 text-[oklch(0.85_0.18_200)]" />
          Board the Journey
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </MagneticButton>
        <MagneticButton
          onClick={onExploreProjects}
          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.03]"
        >
          Run Simulations
          <ArrowRight className="size-4" />
        </MagneticButton>
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
