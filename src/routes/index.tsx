import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { NeuralBackground } from "@/components/portfolio/NeuralBackground";
import { BootSequence } from "@/components/portfolio/BootSequence";
import { Hero } from "@/components/portfolio/Hero";
import { RecruiterAI } from "@/components/portfolio/RecruiterAI";
import { Timeline } from "@/components/portfolio/Timeline";
import { SkillsConstellation } from "@/components/portfolio/SkillsConstellation";
import { Projects } from "@/components/portfolio/Projects";
import { Metrics } from "@/components/portfolio/Metrics";
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
  const timelineRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="dark relative min-h-screen text-foreground">
      <BootSequence onDone={() => setBooted(true)} />
      <NeuralBackground />
      {booted && (
        <>
          <Hero
            onLaunchTimeline={() => scrollTo(timelineRef)}
            onExploreProjects={() => scrollTo(projectsRef)}
          />
          <Timeline ref={timelineRef} />
          <SkillsConstellation />
          <Projects ref={projectsRef} />
          <Metrics />
          <Terminal />
          <Snapshot />
          <RecruiterAI />
        </>
      )}
    </main>
  );
}
