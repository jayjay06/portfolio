# Portfolio Architecture & Blueprint

## Overview
This document defines the architectural standards, technology stack, and testing methodologies for a high-performance, animation-rich personal portfolio. Development follows a Spec-Driven Development (SDD) approach using AI coding assistants.

## 1. Core Technology Stack
* **Framework:** Next.js 14+ (App Router, `/app` directory)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS
* **Animation Engine:** GSAP (using `@gsap/react` and `useGSAP`)
* **Micro-Animations:** dotLottie (`@dotlottie/react-player`)
* **3D Graphics:** Three.js (using `@react-three/fiber` and `@react-three/drei`)
* **State Management:** React Context (for global UI state) / Zustand (if complex state is required later)

## 2. Testing Stack
* **End-to-End (E2E):** Playwright
* **Unit/Component:** Vitest + React Testing Library (RTL)

## 3. Architectural Rules & Constraints

### Rendering & Performance
* **Server-First:** Default all components to React Server Components (RSC) to minimize client-side JavaScript.
* **Client Boundaries:** Use the `"use client"` directive strictly at the lowest possible level in the component tree. This is required only for files that utilize React state, hooks, browser APIs, GSAP, dotLottie, or Three.js canvas elements.
* **3D Optimization:** Any component rendering a `<Canvas>` from React Three Fiber MUST be dynamically imported using `next/dynamic` with `{ ssr: false }`. This prevents server hydration mismatches and reduces initial bundle load.
* **Metadata:** The root layout must export a robust Next.js `Metadata` object detailing a senior frontend professional with over 20 years of experience building scalable web applications, explicitly noting being experienced with GSAP and React.

### Testing Requirements
* **Test-Driven Generation:** Every UI component must be accompanied by a corresponding `.test.tsx` file using Vitest and RTL.
* **Mocking:** Visual and canvas-heavy libraries (`useGSAP`, `@dotlottie/react-player`, `@react-three/fiber`) must be mocked in unit tests to prevent environment crashes in Node.js.
* **Focus:** Component tests must verify user behavior, ARIA roles, and prop rendering, not internal state. E2E tests (Playwright) will cover critical user flows such as navigation.

## 4. File & Directory Structure

```text
my-portfolio/
├── .github/
│   └── copilot-instructions.md   # Global AI context rules
├── docs/
│   ├── architecture.md           # This file
│   └── specs/                    # SDD prompts for Copilot
│       ├── 01-global-layout.md   
│       ├── 02-navigation.md
│       └── 03-hero-section.md
├── e2e/                          # Playwright tests
│   └── navigation.spec.ts
├── app/                          # Next.js App Router root
│   ├── layout.tsx                # Global layout wrapper
│   └── page.tsx                  # Home page
├── components/                   # Reusable UI pieces
│   ├── global/                   # Layout components (Header, Footer)
│   │   ├── Header.tsx
│   │   └── Header.test.tsx       # Co-located component tests
│   └── home/                     # Page-specific components
├── hooks/                        # Custom React/GSAP hooks
├── utils/                        # Helper functions & formatting
├── public/                       # Static assets, Lottie JSONs, 3D models
├── vitest.config.ts              # Vitest configuration
├── playwright.config.ts          # Playwright configuration
├── tailwind.config.ts            # Tailwind setup
└── package.json