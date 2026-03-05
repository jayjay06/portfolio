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
      tl.fromTo(
        "#hero-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        // Step 2 — Sub-headline paragraphs follow with a stagger between them.
        .fromTo(
          ".hero-sub",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.2 },
          "-=0.4"
        )
        // Step 3 — CTA fades in last.
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.2 },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-24 text-center"
    >
      <h1
        id="hero-heading"
        className="max-w-5xl text-6xl font-black tracking-tighter text-white opacity-0 sm:text-8xl lg:text-9xl"
      >
        Frontend Developer
      </h1>

      <p className="hero-sub mt-8 max-w-2xl text-lg font-light leading-relaxed tracking-wide text-zinc-300 opacity-0 sm:text-xl">
        Over 20 years of experience building scalable, high-performance web
        applications — from complex SPAs to animation-rich interfaces.
      </p>

      <p className="hero-sub mt-4 max-w-xl text-base font-light leading-relaxed tracking-wide text-zinc-500 opacity-0 sm:text-lg">
        Experienced with GSAP and React, and confident across the full modern
        frontend stack.
      </p>

      <Link
        href="#experience"
        className="hero-cta mt-12 inline-block border border-zinc-500 px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white opacity-0 transition-all duration-300 hover:border-white hover:bg-white hover:text-zinc-950"
      >
        View My Work
      </Link>
    </section>
  );
}
