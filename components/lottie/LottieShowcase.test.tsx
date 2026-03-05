import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LottieShowcase from "./LottieShowcase";

// CRITICAL (spec §6): Mock the dotLottie player so Vitest does not attempt
// to parse Lottie files or create canvas elements in the Node environment.
vi.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: ({
    src,
    className,
  }: {
    src: string;
    className?: string;
  }) => <canvas data-testid="dotlottie-player" data-src={src} className={className} />,
}));

// Mock window.matchMedia which is unavailable in jsdom.
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

describe("LottieShowcase", () => {
  it("renders the Micro-Animations heading", () => {
    render(<LottieShowcase />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: /micro-animations/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the correct number of animation containers", () => {
    render(<LottieShowcase />);

    const players = screen.getAllByTestId("dotlottie-player");
    expect(players).toHaveLength(3);
  });

  it("renders accessible aria-labels for each animation", () => {
    render(<LottieShowcase />);

    expect(
      screen.getByLabelText("Interactive Soccer Ball")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Steaming Espresso Cup")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Mountain Descent")
    ).toBeInTheDocument();
  });

  it("renders the correct number of list items", () => {
    render(<LottieShowcase />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });
});
