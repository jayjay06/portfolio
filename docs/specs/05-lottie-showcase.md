# Spec: dotLottie Showcase & Scroll Interactions (`app/micro-animations/page.tsx`)

## 0. Requirement Gathering (User Stories)
* **As a technical recruiter**, I want to see advanced DOM control, specifically how the developer syncs third-party animation playheads to native browser scrolling without causing jank.
* **As a user**, I want to experience a smooth, cinematic scroll-linked animation, followed by subtle micro-animations that respect my device's reduced motion preferences.

## 1. Technical Objective
Create a dedicated subpage with two main sections:
1. A pinned, scroll-scrubbed Lottie animation at the top (acting as a hero section for this route).
2. A grid of interactive UI micro-animations below it.

## 2. Rendering Strategy
* **Page (`app/micro-animations/page.tsx`):** React Server Component (RSC).
* **Components (`components/lottie/PinnedScrollLottie.tsx` & `components/lottie/LottieGrid.tsx`):** Both must be Client Components (`"use client"`) due to GSAP and dotLottie requirements.

## 3. Pinned Scroll Component (`PinnedScrollLottie.tsx`)
* **Objective:** Render a full-height container that pins to the screen using GSAP `ScrollTrigger`.
* **Animation Logic:** * Initialize a `DotLottiePlayer` with a `.lottie` file (e.g., a camper van journey).
  * Inside a `useGSAP` hook, create a `ScrollTrigger` with `pin: true`, `scrub: true`, and `start: "top top"`.
  * Map the `ScrollTrigger`'s `onUpdate` callback to update the Lottie player's current frame based on the scroll progress.
* **Accessibility:** If `prefers-reduced-motion` is true, disable the pinning and scrubbing, and simply render a static frame of the animation.

## 4. Micro-Animation Grid Component (`LottieGrid.tsx`)
* **Objective:** Render a grid showcasing interactive UI elements powered by `@dotlottie/react-player`.
* **Data Structure:** `{ id: string, title: string, src: string, trigger: "hover" | "click" | "loop" }`
  * *Example Data:* Interactive Soccer Ball (`hover`), Steaming Espresso Cup (`loop`), Mountain Descent (`click`).
* **Accessibility:** Ensure every player is wrapped in a container with a descriptive `aria-label`. Pause animations if `prefers-reduced-motion` is active.

## 5. Testing Criteria (for `PinnedScrollLottie.test.tsx` & `LottieGrid.test.tsx`)
* **CRITICAL:** Mock the `@dotlottie/react-player`, `gsap`, and `ScrollTrigger` modules completely so Vitest does not attempt to parse Lottie JSON, canvas elements, or browser scroll APIs in the Node environment.
* Verify that fallback text or static images render correctly when reduced motion is simulated in the test.
* Ensure the grid structure renders the correct number of animation containers based on the provided prop array.