import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PinnedScrollLottie from "./PinnedScrollLottie";

// CRITICAL: Mock dotLottie player completely for Node environment.
vi.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: ({
    src,
    className,
  }: {
    src: string;
    className?: string;
  }) => (
    <canvas
      data-testid="dotlottie-player"
      data-src={src}
      className={className}
    />
  ),
}));

// Mock GSAP and ScrollTrigger to prevent browser API access.
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(),
  },
}));

vi.mock("@gsap/react", () => ({
  useGSAP: vi.fn(),
}));

// Mock window.matchMedia.
beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("PinnedScrollLottie", () => {
  it("renders the scroll animation container with an aria-label", () => {
    render(<PinnedScrollLottie />);

    expect(
      screen.getByLabelText("Scroll-driven camper van journey animation")
    ).toBeInTheDocument();
  });

  it("renders the dotLottie player", () => {
    render(<PinnedScrollLottie />);

    const player = screen.getByTestId("dotlottie-player");
    expect(player).toBeInTheDocument();
    expect(player).toHaveAttribute(
      "data-src",
      "/lottie/camper-van-journey.lottie"
    );
  });

  it("shows reduced motion fallback text when motion is reduced", () => {
    // Override matchMedia to return matches: true
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<PinnedScrollLottie />);

    expect(
      screen.getByText(/animation paused — reduced motion is enabled/i)
    ).toBeInTheDocument();
  });
});
