import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ravikiran.OS — Software Engineer Portfolio" },
      {
        name: "description",
        content:
          "Ravikiran Palaparthi — Software Engineer, Java Backend & Full Stack Developer. AI-powered systems, scalable architectures, modern products.",
      },
      { property: "og:title", content: "Ravikiran.OS — Software Engineer Portfolio" },
      {
        property: "og:description",
        content:
          "An engineering operating system showcasing Ravikiran Palaparthi's projects, skills, and impact.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  const journeyRef = useRef<HTMLElement>(null);
  const simsRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="dark relative min-h-screen text-foreground">
      <BootSequence onDone={() => setBooted(true)} />
      <NeuralBackground />
      {booted && (
        <>
          <Hero
            onLaunchTimeline={() => scrollTo(journeyRef)}
            onExploreProjects={() => scrollTo(simsRef)}
          />
          <JourneyTrain ref={journeyRef} />
          <SolarSystem />
          <InsideMyBrain />
          <section ref={simsRef}><Simulations /></section>
          <MissionControl />
          <IfIJoin />
          <Terminal />
          <Snapshot />
          <RecruiterAI />
        </>
      )}
    </main>
  );
}
