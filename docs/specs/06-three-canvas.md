# Spec: Three.js WebGL Canvas (`app/3d-experience/page.tsx` & `components/three/Scene.tsx`)

## 0. Requirement Gathering (User Stories)
* **As a technical recruiter**, I want to verify that the developer understands the boundary between the Node.js server and the browser window by correctly implementing a WebGL canvas without hydration errors.
* **As a user**, I want the 3D scene to be interactive (draggable/rotatable) to prove it is a true 3D environment, not just a video.

## 1. Technical Objective
Render an interactive 3D scene using `@react-three/fiber` and `@react-three/drei`. The architecture must strictly enforce a dynamic import to completely bypass server-side rendering for the canvas element.

## 2. Rendering Strategy (Strict Enforcement)
* **Scene Component (`components/three/Scene.tsx`):** Client Component (`"use client"`). This file will contain the `<Canvas>`, lights, and 3D meshes.
* **Page (`app/3d-experience/page.tsx`):** React Server Component. 
    * **CRITICAL:** This page MUST import the `Scene` component using Next.js `next/dynamic` with the `{ ssr: false }` configuration. 
    * *Example:* `const DynamicScene = dynamic(() => import('@/components/three/Scene'), { ssr: false, loading: () => <p>Loading 3D Experience...</p> })`

## 3. Component Contract & Props
* The `Scene` component requires no external props for this proof-of-concept.

## 4. DOM Structure & Accessibility (a11y)
* The canvas wrapper must have a definitive height and width (e.g., `h-[500px] w-full`).
* Provide an `aria-label` on the wrapper `<div>` explaining the 3D content (e.g., "Interactive 3D geometric scene"). 
* Ensure the Next.js `loading` fallback component is styled cleanly and is accessible to screen readers while the Three.js bundle loads.

## 5. 3D Scene Logic
* Use `<Canvas>` from `@react-three/fiber`.
* Add basic lighting (`<ambientLight>`, `<directionalLight>`).
* Include a simple mesh (like a `<boxGeometry>` or `<torusKnotGeometry>`) with a standard material.
* Add `<OrbitControls>` from `@react-three/drei` so the user can click and drag to rotate the object.

## 6. Testing Criteria (for `Scene.test.tsx`)
* **CRITICAL:** Mock `@react-three/fiber` and `@react-three/drei` completely. The test should only verify that the wrapper `<div>` and the accessibility labels render properly. Do not attempt to mount the actual WebGL context in Vitest.
* Verify the Next.js dynamic loading state renders when the component is initially called.