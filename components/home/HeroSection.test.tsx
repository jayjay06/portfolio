import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import HeroSection from "./HeroSection";

// CRITICAL (spec §6): Mock useGSAP so Vitest does not attempt DOM animation
// inside the jsdom environment. The hook becomes a no-op and its callback is
// never executed, preventing any gsap.timeline() calls from running.
vi.mock("@gsap/react", () => ({
  useGSAP: vi.fn(),
}));

// gsap.registerPlugin() is called at module scope in HeroSection.tsx.
// Mock the entire gsap default export so the import doesn't crash.
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    timeline: vi.fn(() => ({
      from: vi.fn().mockReturnThis(),
    })),
  },
}));

// next/link requires Next.js router context unavailable in jsdom.
vi.mock("next/link", () => ({
  default: ({ href, children, className }: ComponentProps<"a">) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("HeroSection", () => {
  it("renders the section with the correct aria-labelledby attribute", () => {
    render(<HeroSection />);

    const section = screen.getByRole("region", { name: /frontend developer/i });
    expect(section).toBeInTheDocument();
  });

  it("renders the <h1> heading with the correct text", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", { level: 1, name: /frontend developer/i })
    ).toBeInTheDocument();
  });

  it("renders the CTA link with a valid href attribute", () => {
    render(<HeroSection />);

    const cta = screen.getByRole("link", { name: /view my work/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "#experience");
  });
});
