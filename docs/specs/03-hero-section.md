# Spec: Hero Section (`components/home/HeroSection.tsx`)

## 0. Requirement Gathering (User Stories)
* **As a technical recruiter**, I want to see a clean, high-impact summary of the candidate's seniority right away so I know I am looking at an experienced professional.
* **As a user**, I want the page to feel premium and polished the moment it loads, demonstrating an understanding of modern web performance and animation.

## 1. Technical Objective
Create the primary landing section of the homepage. It must feature large typography, an executive summary, and a Call to Action (CTA) button, all animated sequentially on initial load using GSAP.

## 2. Rendering Strategy
* **Client Component (`"use client"`):** Strictly required because this component utilizes the `@gsap/react` plugin and the `useGSAP()` hook for DOM manipulation.

## 3. Component Contract & Props
* This is a static layout component; no external props required.

## 4. DOM Structure & Accessibility (a11y)
* Wrap the component in a `<section aria-labelledby="hero-heading">`.
* The primary text must be an `<h1>` tag with an `id="hero-heading"`.
* The text should emphasize being an experienced frontend professional with over 20 years of experience. (Do not use the exact phrase "specialist in gsap and react", instead use "experienced with GSAP and React").
* The CTA button should be a Next.js `<Link>` pointing to `#experience` or `#contact`.

## 5. Animation Logic (Strict GSAP Implementation)
* Import `gsap` and `useGSAP` from `@gsap/react`.
* Set a `useGSAP` hook to execute on component mount.
* **The Animation:** Create a GSAP timeline (`gsap.timeline()`). 
    * Step 1: The `<h1>` text should slide up (translate Y) and fade in (opacity 0 to 1).
    * Step 2: The sub-headline text should follow with a slight stagger (`stagger: 0.2`).
    * Step 3: The CTA button fades in last.
* Ensure ease curves are smooth (e.g., `power3.out`).

## 6. Testing Criteria (for `HeroSection.test.tsx`)
* **CRITICAL:** Mock the `useGSAP` hook at the top of the test file so the Vitest environment does not crash when attempting to access the DOM.
* Verify the `<h1>` heading renders the correct text.
* Verify the CTA button renders and has a valid `href` attribute.