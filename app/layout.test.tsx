import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RootLayout from "./layout";

// next/font/google makes network requests and is a Next.js build-time feature.
// It must be mocked to prevent crashes in the jsdom test environment.
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans", className: "mock-geist-sans" }),
  Geist_Mono: () => ({
    variable: "--font-geist-mono",
    className: "mock-geist-mono",
  }),
}));

// Stub the Header so layout tests remain isolated to the shell structure.
// Header behaviour is covered by its own co-located test suite.
vi.mock("@/components/global/Header", () => ({
  default: () => null,
}));

describe("RootLayout", () => {
  it('sets lang="en" on the <html> element', () => {
    render(<RootLayout><div /></RootLayout>);

    expect(document.documentElement.lang).toBe("en");
  });

  it("renders children inside the <main> landmark", () => {
    render(
      <RootLayout>
        <p>portfolio content</p>
      </RootLayout>
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent("portfolio content");
  });
});
