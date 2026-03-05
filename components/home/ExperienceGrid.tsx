"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

// Register plugins so GSAP can use ScrollTrigger and useGSAP integrates
// correctly with React's lifecycle.
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: "1",
    title: "Frontend Architecture",
    description:
      "Architecting scalable, server-first web applications using Next.js and modern Node.js integrations.",
    techStack: ["Next.js", "React", "Node.js"],
  },
  {
    id: "2",
    title: "AI-Augmented Development",
    description:
      "Leveraging AI coding assistants and Spec-Driven Development (SDD) to accelerate delivery and modernize component workflows.",
    techStack: ["AI Integration", "Copilot", "SDD"],
  },
  {
    id: "3",
    title: "Engineering Leadership",
    description:
      "Over two decades of frontend experience, built on a foundational Engineering degree from San Jose State University, driving complex UI/UX architectures.",
    techStack: ["System Design", "Performance", "GSAP"],
  },
];

export default function ExperienceGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".experience-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-zinc-950 px-6 py-24"
    >
      <h2
        id="experience-heading"
        className="mb-16 text-center text-4xl font-black tracking-tighter text-white sm:text-5xl"
      >
        Career Highlights
      </h2>

      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {experienceData.map((item) => (
          <li
            key={item.id}
            className="experience-card rounded-lg border border-zinc-800 bg-zinc-900 p-8 opacity-0"
          >
            <h3 className="mb-3 text-xl font-bold tracking-tight text-white">
              {item.title}
            </h3>

            <p className="mb-6 text-sm font-light leading-relaxed text-zinc-400">
              {item.description}
            </p>

            <ul className="flex flex-wrap gap-2" aria-label={`Tech stack for ${item.title}`}>
              {item.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
