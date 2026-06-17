import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { NeuralBackground } from "@/components/portfolio/NeuralBackground";
import { BootSequence } from "@/components/portfolio/BootSequence";
import { Hero } from "@/components/portfolio/Hero";
import { RecruiterAI } from "@/components/portfolio/RecruiterAI";
import { JourneyTrain } from "@/components/portfolio/JourneyTrain";
import { SolarSystem } from "@/components/portfolio/SolarSystem";
import { InsideMyBrain } from "@/components/portfolio/InsideMyBrain";
import { Simulations } from "@/components/portfolio/Simulations";
import { MissionControl } from "@/components/portfolio/MissionControl";
import { IfIJoin } from "@/components/portfolio/IfIJoin";
import { Terminal } from "@/components/portfolio/Terminal";
import { Snapshot } from "@/components/portfolio/Snapshot";
import { ModuleNav } from "@/components/portfolio/ModuleNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palaparthi Ravikiran.OS — Software Engineer Portfolio" },
      {
        name: "description",
        content:
          "Palaparthi Ravikiran — Software Engineer, Java Backend & Full Stack Developer. AI-powered systems, scalable architectures, modern products.",
      },
      { property: "og:title", content: "Palaparthi Ravikiran.OS — Software Engineer Portfolio" },
      {
        property: "og:description",
        content:
          "An engineering operating system showcasing Palaparthi Ravikiran's projects, skills, and impact.",
      },
    ],
  }),
  component: Index,
});

function Divider() {
  return <div className="mx-auto my-4 max-w-6xl module-divider" aria-hidden />;
}

function Index() {
  const [booted, setBooted] = useState(false);
  const journeyRef = useRef<HTMLElement>(null);
  const simsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // If URL has a hash on first load, ignore it so the page opens at the top.
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (booted) window.scrollTo(0, 0);
  }, [booted]);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="dark relative min-h-screen text-foreground">
      <BootSequence onDone={() => setBooted(true)} />
      <NeuralBackground />
      {booted && (
        <>
          <ModuleNav />
          <section id="hero">
            <Hero
              onLaunchTimeline={() => scrollTo(journeyRef)}
              onExploreProjects={() => scrollTo(simsRef)}
            />
          </section>
          <Divider />
          <JourneyTrain ref={journeyRef} />
          <Divider />
          <SolarSystem />
          <Divider />
          <InsideMyBrain />
          <Divider />
          <section ref={simsRef}><Simulations /></section>
          <Divider />
          <MissionControl />
          <Divider />
          <IfIJoin />
          <Divider />
          <Terminal />
          <Divider />
          <Snapshot />
          <RecruiterAI />
        </>
      )}
    </main>
  );
}
