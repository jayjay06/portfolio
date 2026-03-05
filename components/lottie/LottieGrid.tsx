"use client";

import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef, useState, useCallback } from "react";

interface AnimationConfig {
  id: string;
  title: string;
  src: string;
  trigger: "hover" | "click" | "loop";
}

const animations: AnimationConfig[] = [
  {
    id: "1",
    title: "Interactive Soccer Ball",
    src: "/lottie/soccer.lottie",
    trigger: "hover",
  },
  {
    id: "2",
    title: "Steaming Espresso Cup",
    src: "/lottie/espresso.lottie",
    trigger: "loop",
  },
  {
    id: "3",
    title: "Mountain Descent",
    src: "/lottie/snowboard.lottie",
    trigger: "click",
  },
];

export default function LottieGrid() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section
      aria-labelledby="lottie-grid-heading"
      className="bg-zinc-950 px-6 py-24"
    >
      <h2
        id="lottie-grid-heading"
        className="mb-16 text-center text-4xl font-black tracking-tighter text-white sm:text-5xl"
      >
        Micro-Animations
      </h2>

      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {animations.map((anim) => (
          <AnimationCard
            key={anim.id}
            config={anim}
            reducedMotion={prefersReducedMotion}
          />
        ))}
      </ul>
    </section>
  );
}

function AnimationCard({
  config,
  reducedMotion,
}: {
  config: AnimationConfig;
  reducedMotion: boolean;
}) {
  const dotLottieRef = useRef<DotLottie | null>(null);

  const setDotLottieRef = useCallback(
    (instance: DotLottie | null) => {
      dotLottieRef.current = instance;

      if (!instance) return;

      if (reducedMotion) {
        instance.pause();
        return;
      }

      if (config.trigger !== "loop") {
        instance.pause();
      }
    },
    [reducedMotion, config.trigger]
  );

  const handleMouseEnter = () => {
    if (reducedMotion || config.trigger !== "hover") return;
    dotLottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (reducedMotion || config.trigger !== "hover") return;
    dotLottieRef.current?.pause();
  };

  const handleClick = () => {
    if (reducedMotion || config.trigger !== "click") return;
    const instance = dotLottieRef.current;
    if (!instance) return;

    if (instance.isPlaying) {
      instance.pause();
    } else {
      instance.play();
    }
  };

  const isAutoplay = !reducedMotion && config.trigger === "loop";
  const isLoop = config.trigger === "loop" || config.trigger === "hover";

  const isInteractive =
    config.trigger === "click" || config.trigger === "hover";
  const Wrapper = isInteractive ? "button" : "div";

  return (
    <li className="flex flex-col items-center rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      <Wrapper
        aria-label={config.title}
        className={`relative mb-4 h-48 w-48 bg-transparent p-0 ${isInteractive ? "cursor-pointer" : "cursor-default"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isInteractive ? handleClick : undefined}
        type={isInteractive ? "button" : undefined}
      >
        <DotLottieReact
          src={config.src}
          autoplay={isAutoplay}
          loop={isLoop}
          dotLottieRefCallback={setDotLottieRef}
          className="h-full w-full"
        />
      </Wrapper>

      <h3 className="text-sm font-semibold tracking-wide text-white">
        {config.title}
      </h3>

      <p className="mt-1 text-xs text-zinc-500">
        {config.trigger === "hover" && "Hover to play"}
        {config.trigger === "click" && "Click to play"}
        {config.trigger === "loop" && "Loops automatically"}
      </p>
    </li>
  );
}
