import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header";

// next/link requires Next.js router context unavailable in jsdom.
// Mock it as a plain <a> so RTL can render and interact with links normally.
vi.mock("next/link", () => ({
  default: ({ href, children, onClick, className }: ComponentProps<"a">) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

describe("Header", () => {
  it("renders the <nav> with the correct ARIA label", () => {
    render(<Header />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" })
    ).toBeInTheDocument();
  });

  it("renders all links from the NAV_LINKS constant", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("toggles aria-expanded from false to true when the mobile menu button is clicked", () => {
    render(<Header />);

    const button = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    // Initial state: menu is closed
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);

    // After click: menu is open
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses the mobile menu (aria-expanded false) when clicked a second time", () => {
    render(<Header />);

    const button = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu when a nav link inside it is clicked", () => {
    render(<Header />);

    const button = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    // Open the mobile panel
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    // getAllByRole since both desktop and mobile links now exist
    const mobileLinks = screen.getAllByRole("link", { name: "Experience" });
    // The mobile link is the second occurrence (desktop first, then mobile panel)
    fireEvent.click(mobileLinks[1]);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
