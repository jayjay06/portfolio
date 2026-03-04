# Spec: Global Layout (`app/layout.tsx`)

## 0. Requirement Gathering (User Stories)
* **As a hiring manager**, I want the website to load almost instantly and have clear metadata, so I can immediately verify Jason's professional background before I even click a link.
* **As a user relying on assistive technology**, I need the root document to have proper language tags and semantic structure so my screen reader can navigate the site accurately.

## 1. Technical Objective
Create the Next.js root layout component that acts as the global shell for the entire portfolio. It must inject global Tailwind CSS, set up the HTML document structure, and define the SEO metadata.

## 2. Rendering Strategy
* **Strictly React Server Component (RSC).** Do NOT use `"use client"` in this file.

## 3. Component Contract & Props
* The component must accept standard React `children`.
* **TypeScript Interface:**
  ```typescript
  interface RootLayoutProps {
    children: React.ReactNode;
  }
  ```

## 4. DOM Structure & Accessibility (a11y)
* The root `<html>` element MUST include `lang="en"`.
* The `<body>` element should include default Tailwind classes for background and text colors (e.g., a dark mode default like `bg-slate-950 text-slate-50`).
* Wrap the `children` prop inside a semantic `<main>` tag.
* Include placeholders for `<Header />` and `<Footer />` components (you can comment these out or use simple `<div>` placeholders for now until they are generated).

## 5. Metadata Configuration
* Export a Next.js `Metadata` object.
* **Title:** "Jason Jellin | Experienced Frontend Developer"
* **Description:** "Portfolio of a Frontend Developer with over 20 years of experience building scalable web applications. Experienced with GSAP, React, and modern frontend architecture."

## 6. Testing Criteria (for `layout.test.tsx` later)
* Verify the `<html>` tag has the correct `lang` attribute.
* Verify that children passed to the layout are successfully rendered within the `<main>` tag.