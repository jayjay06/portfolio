"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PinnedScrollLottie() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotLottieRef = useRef<DotLottie | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const setDotLottieRef = useCallback(
    (instance: DotLottie | null) => {
      dotLottieRef.current = instance;

      if (!instance) return;

      // Always start paused — scroll position drives the frame.
      instance.pause();
    },
    []
  );

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const instance = dotLottieRef.current;
          if (!instance || !instance.totalFrames) return;

          const frame = Math.round(self.progress * (instance.totalFrames - 1));
          instance.setFrame(frame);
        },
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <div className="relative">
      <div
        ref={containerRef}
        aria-label="Scroll-driven camper van journey animation"
        className="relative h-[100vh] w-full bg-zinc-950"
      >
      <DotLottieReact
        src="/lottie/camper-van-journey.lottie"
        autoplay={false}
        loop={false}
        dotLottieRefCallback={setDotLottieRef}
        className="h-full w-full"
      />

      {prefersReducedMotion && (
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-zinc-500">
          Animation paused — reduced motion is enabled.
        </p>
      )}
      </div>
    </div>
  );
}
