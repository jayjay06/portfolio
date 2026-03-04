# Spec: dotLottie Micro-Animations (`app/micro-animations/page.tsx` & `components/lottie/LottieShowcase.tsx`)

## 0. Requirement Gathering (User Stories)
* **As a UI/UX reviewer**, I want to see how the developer uses subtle micro-animations to enhance user feedback (like success states or loading spinners) without bloating the application size.
* **As a user**, I want these animations to play smoothly and respect my device's reduced motion preferences if enabled.

## 1. Technical Objective
Create a dedicated subpage showcasing interactive UI elements powered by `@dotlottie/react-player`. The implementation must prioritize performance, lazy-loading the animations only when they enter the viewport.

## 2. Rendering Strategy
* **Page (`app/micro-animations/page.tsx`):** React Server Component (RSC) to handle the layout and SEO metadata.
* **Component (`components/lottie/LottieShowcase.tsx`):** Client Component (`"use client"`) to initialize the dotLottie player and handle hover/click interactions.

## 3. Component Contract & Props
* The showcase component should accept an array of animation configuration objects.
* **Data Structure:** `{ id: string, title: string, src: string (path to .lottie file), trigger: "hover" | "click" | "loop" }`

## 4. DOM Structure & Accessibility (a11y)
* Wrap the page content in a `<main aria-labelledby="lottie-heading">`.
* Ensure every dotLottie player is wrapped in a container with a descriptive `aria-label` (e.g., `aria-label="Animated success checkmark"`).
* **CRITICAL:** Implement a `prefers-reduced-motion` CSS media query check. If the user prefers reduced motion, the component should render a static fallback image or pause the Lottie player on the first frame.

## 5. Animation & Player Logic
* Import the `DotLottiePlayer` from `@dotlottie/react-player`.
* Configure the players to be visually lightweight. Do not auto-play all of them at once; use the `hover` or `click` triggers defined in the data structure to demonstrate interactive state management.

## 6. Testing Criteria (for `LottieShowcase.test.tsx`)
* **CRITICAL:** Mock the `@dotlottie/react-player` module completely so Vitest does not attempt to parse Lottie JSON or canvas elements in the Node environment.
* Verify that the fallback text or `aria-label` renders correctly for accessibility.
* Ensure the grid structure renders the correct number of animation containers based on the provided prop array.