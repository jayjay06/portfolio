# Spec: Experience Grid (`components/home/ExperienceGrid.tsx`)

## 0. Requirement Gathering (User Stories)
* **As a technical recruiter**, I want to easily scan through the candidate's core competencies and past projects so I can understand their technical depth without reading dense paragraphs.
* **As a user**, I want the experience cards to animate smoothly into view as I scroll, ensuring the page feels interactive but not visually overwhelming.

## 1. Technical Objective
Create a responsive CSS grid displaying key professional highlights and technical competencies. As the user scrolls down the page, each grid item will reveal itself sequentially using GSAP's `ScrollTrigger`.

## 2. Rendering Strategy
* **Client Component (`"use client"`):** Strictly required to access the DOM for scroll tracking and to utilize the `@gsap/react` plugin alongside the `ScrollTrigger` module.

## 3. Component Contract & Props
* Create an internal constant array of objects representing the experience data.
* **Data Structure:** `{ id: string, title: string, description: string, techStack: string[] }`
* **Content Guidelines:** Highlight leadership in frontend architecture, AI integration, and full-stack development. Focus on scalable applications and clear business impact. Strictly avoid using terms like "KPIs", "orchestrated", or "design artistry" in the descriptions. Frame the roles around being a senior developer and creator.

## 4. DOM Structure & Accessibility (a11y)
* Wrap the component in a `<section aria-labelledby="experience-heading">`.
* Include an `<h2>` heading with `id="experience-heading"` titled "Career Highlights".
* The grid itself should be a semantic `<ul>` list, with each card being an `<li>` element.
* Use Tailwind CSS Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) for responsive layout.

## 5. Animation Logic (Strict GSAP ScrollTrigger)
* Import `gsap`, `ScrollTrigger`, and `useGSAP`.
* Register the plugin: `gsap.registerPlugin(ScrollTrigger);`
* **The Animation:** Inside the `useGSAP` hook, target the grid items. 
    * Set initial state: `opacity: 0`, `y: 50`.
    * Create a scroll-triggered animation: As the grid container enters the viewport (`start: "top 80%"`), animate to `opacity: 1` and `y: 0`.
    * Use a `stagger: 0.15` property so the cards reveal one after another rather than all at once.

## 6. Testing Criteria (for `ExperienceGrid.test.tsx`)
* **CRITICAL:** Mock both `useGSAP` and the `ScrollTrigger` plugin to prevent Vitest from throwing errors related to missing browser APIs.
* Verify the `<h2>` heading renders correctly.
* Verify that the exact number of `<li>` items matches the length of the internal data array.
* Ensure the tech stack lists inside the cards are accessible.