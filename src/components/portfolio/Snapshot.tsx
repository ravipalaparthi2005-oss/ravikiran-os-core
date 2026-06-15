import { motion } from "framer-motion";
import { SectionHeader } from "./Timeline";
import { Mail, Linkedin, Github, MapPin, Phone, ShieldCheck, FileText } from "lucide-react";

const FINDINGS = [
  { tag: "STRENGTH", text: "Strong Java Backend Foundation — Spring Boot, JPA, Postgres" },
  { tag: "STRENGTH", text: "Full Stack Production Experience — React, Next.js, TanStack" },
  { tag: "STRENGTH", text: "AI Product Development — Gemini, structured outputs, evals" },
  { tag: "STRENGTH", text: "System Design Thinking — queues, retries, idempotency" },
  { tag: "ASSET",    text: "Fast Learner · Azure AI-900 certified" },
  { tag: "ASSET",    text: "Production-Oriented Builder · 3 systems shipped solo" },
];

export function Snapshot() {
  return (
    <section className="relative px-6 py-32">
      <SectionHeader tag="/recruiter/briefing" title="Recruiter Briefing" sub="Classified hiring dossier · executive summary, compressed." />

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-5">
        {/* Dossier */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-strong relative overflow-hidden rounded-3xl p-8 lg:col-span-3"
        >
          {/* Header strip */}
          <div className="classified-stamp absolute inset-x-0 top-0 flex items-center justify-between px-6 py-2 font-mono text-[10px] tracking-[0.35em] text-[oklch(0.82_0.18_80)]">
            <span>◉ CLASSIFIED · LEVEL-A</span>
            <span>DOSSIER · RKP-2026-001</span>
          </div>

          <div className="mt-10 flex items-center gap-3 font-mono text-[10px] tracking-widest">
            <ShieldCheck className="size-3.5 text-[oklch(0.82_0.18_80)]" />
            <span className="text-[oklch(0.82_0.18_80)]">EXECUTIVE SUMMARY</span>
            <span className="text-foreground/30">·</span>
            <span className="text-foreground/50">PRIORITY HIRE</span>
          </div>

          <h3 className="font-display mt-3 text-2xl font-bold leading-tight md:text-3xl">
            Full Stack + Backend + AI engineer with strong CS fundamentals and
            production-focused project experience.
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70">
            Three production systems shipped solo. CGPA <b className="text-foreground">8.41</b>,
            Intermediate <b className="text-foreground">98%</b>, SSC <b className="text-foreground">98%</b>.
            Equally comfortable architecting a Spring Boot job queue, integrating Gemini for
            AI mock interviews, or building a real-time recommendation UI.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {FINDINGS.map((f, i) => (
              <div key={f.text} className="glass flex items-start gap-3 rounded-lg px-3 py-2.5 text-xs">
                <div className="font-mono text-[9px] text-foreground/40">{String(i + 1).padStart(2, "0")}</div>
                <div className={`rounded px-1.5 py-0.5 font-mono text-[9px] tracking-widest ${f.tag === "STRENGTH" ? "bg-[oklch(0.75_0.2_160/15%)] text-[oklch(0.82_0.18_140)]" : "bg-[oklch(0.82_0.18_80/15%)] text-[oklch(0.82_0.18_80)]"}`}>{f.tag}</div>
                <div className="text-foreground/85">{f.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-[10px] tracking-widest text-foreground/40">
            <FileText className="size-3" />
            RECOMMENDATION : <span className="text-[oklch(0.82_0.18_140)]">PROCEED TO INTERVIEW LOOP</span>
          </div>
        </motion.div>

        {/* Contact */}
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
                  className="glass group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:translate-x-1 hover:bg-white/10"
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
