import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ExperienceGrid from "./ExperienceGrid";

// CRITICAL (spec §6): Mock useGSAP so Vitest does not attempt DOM animation
// inside the jsdom environment.
vi.mock("@gsap/react", () => ({
  useGSAP: vi.fn(),
}));

// Mock gsap and ScrollTrigger to prevent environment crashes in Node.js.
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

describe("ExperienceGrid", () => {
  it("renders the Career Highlights heading", () => {
    render(<ExperienceGrid />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: /career highlights/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the correct number of experience cards", () => {
    render(<ExperienceGrid />);

    const items = screen.getAllByRole("listitem");
    // 3 cards + tech stack chips inside each card
    // Filter to only the top-level <li> cards by checking for a heading inside
    const cards = items.filter((item) =>
      item.querySelector("h3")
    );
    expect(cards).toHaveLength(3);
  });

  it("renders all tech stack tags accessibly", () => {
    render(<ExperienceGrid />);

    const techLists = screen.getAllByRole("list", {
      name: /tech stack for/i,
    });
    expect(techLists).toHaveLength(3);
  });

  it("renders the section with the correct aria-labelledby attribute", () => {
    render(<ExperienceGrid />);

    const section = screen.getByRole("region", {
      name: /career highlights/i,
    });
    expect(section).toBeInTheDocument();
  });
});
