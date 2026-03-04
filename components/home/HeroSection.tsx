"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";

// Register the @gsap/react plugin so useGSAP integrates with React's
// lifecycle and correctly cleans up animations on unmount.
gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step 1 — h1 slides up and fades in.
      tl.from("#hero-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
      })
        // Step 2 — Sub-headline paragraphs follow with a stagger between them.
        .from(
          ".hero-sub",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.2,
          },
          "-=0.4"
        )
        // Step 3 — CTA fades in last.
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center"
    >
      <h1
        id="hero-heading"
        className="text-5xl font-bold tracking-tight text-slate-50 sm:text-7xl lg:text-8xl"
      >
        Frontend Developer
      </h1>

      <p className="hero-sub mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
        Over 20 years of experience building scalable, high-performance web
        applications — from complex SPAs to animation-rich interfaces.
      </p>

      <p className="hero-sub mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
        Experienced with GSAP and React, and confident across the full modern
        frontend stack.
      </p>

      <Link
        href="#experience"
        className="hero-cta mt-10 inline-block rounded-lg border border-slate-600 px-8 py-3 text-sm font-semibold text-slate-50 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-800"
      >
        View My Work
      </Link>
    </section>
  );
}
