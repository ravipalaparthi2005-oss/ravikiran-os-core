import { motion } from "framer-motion";
import { SectionHeader } from "./Timeline";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

const REASONS = [
  "Strong Java Backend Foundation",
  "Full Stack Development Experience",
  "AI Product Development",
  "System Design Thinking",
  "Fast Learner · Azure AI-900 certified",
  "Production-Oriented Builder",
];

export function Snapshot() {
  return (
    <section className="relative px-6 py-32">
      <SectionHeader tag="/recruiter/snapshot" title="Why Hire Palaparthi Ravikiran" sub="The executive summary, compressed." />
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-strong glow-cyan rounded-3xl p-8 lg:col-span-3"
        >
          <div className="font-mono text-[10px] tracking-widest text-[oklch(0.85_0.18_200)]">EXEC.SUMMARY</div>
          <h3 className="font-display mt-3 text-2xl font-bold leading-tight md:text-3xl">
            A rare full-stack + backend + AI builder ready for day-one impact.
          </h3>
          <p className="mt-4 text-sm text-foreground/70">
            Three production systems shipped solo. Strong CS fundamentals (CGPA 8.41, 98% Intermediate, 98% SSC). Equally comfortable architecting a Spring Boot job queue, integrating Gemini for AI mock interviews, or building a real-time BI dashboard.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <div key={r} className="flex items-center gap-2.5 text-sm">
                <div className="font-mono text-[10px] text-foreground/40">0{i + 1}</div>
                <div className="size-1.5 rounded-full bg-[oklch(0.75_0.2_160)]" />
                {r}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-8 lg:col-span-2"
        >
          <div className="font-mono text-[10px] tracking-widest text-[oklch(0.68_0.24_295)]">/contact/hub</div>
          <h3 className="font-display mt-3 text-2xl font-bold">Open a channel</h3>
          <p className="mt-2 text-sm text-foreground/60">Communication endpoints are live.</p>

          <div className="mt-6 space-y-2.5">
            {[
              { icon: Mail, label: "ravikiran.pjvs@gmail.com", href: "mailto:ravikiran.pjvs@gmail.com" },
              { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/" },
              { icon: Github, label: "GitHub", href: "https://github.com/" },
              { icon: Phone, label: "+91 93472 43824", href: "tel:+919347243824" },
              { icon: MapPin, label: "Eluru · Andhra Pradesh · India" },
            ].map(({ icon: Icon, label, href }) => {
              const Comp = href ? "a" : "div";
              return (
                <Comp
                  key={label}
                  {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" } : {})}
                  className="glass group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white/10"
                >
                  <Icon className="size-4 text-[oklch(0.85_0.18_200)] transition group-hover:scale-110" />
                  <span>{label}</span>
                </Comp>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="mt-20 text-center font-mono text-[10px] tracking-widest text-foreground/30">
        PALAPARTHI RAVIKIRAN.OS · v3.0 · BUILT WITH PRECISION · © 2026
      </div>
    </section>
  );
}
