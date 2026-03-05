import type { Metadata } from "next";
import PinnedScrollLottie from "@/components/lottie/PinnedScrollLottie";
import LottieGrid from "@/components/lottie/LottieGrid";

export const metadata: Metadata = {
  title: "Micro-Animations | Jason Jellin",
  description:
    "Interactive micro-animation showcase featuring scroll-scrubbed Lottie playback, hover, click, and loop triggers powered by dotLottie and GSAP ScrollTrigger.",
};

export default function MicroAnimationsPage() {
  return (
    <>
      <h1
        id="micro-animations-heading"
        className="bg-zinc-950 pt-28 pb-8 text-center text-4xl font-black tracking-tighter text-white sm:text-5xl"
      >
        Micro-Animations
      </h1>
      <PinnedScrollLottie />
      <LottieGrid />
    </>
  );
}
