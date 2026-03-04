# Spec: Global Navigation (`components/global/Header.tsx`)

## 0. Requirement Gathering (User Stories)
* **As a hiring manager**, I want to quickly find the contact information and work history so I can evaluate the candidate without hunting through the page.
* **As a mobile user**, I need a responsive menu that is easy to tap and understand.
* **As an accessibility user**, I need to navigate the links purely using my keyboard (Tab/Enter).

## 1. Technical Objective
Create a responsive, sticky `<header>` component containing the main navigation. It should have a minimalist aesthetic with a subtle blur effect (`backdrop-blur`) so content scrolls smoothly underneath it.

## 2. Rendering Strategy
* **Client Component (`"use client"`):** Required because we will track scroll state to add/remove a drop-shadow, and manage local state for the mobile hamburger menu.

## 3. Component Contract & Props
* No external props required for the base implementation, but links should be defined in a constant array for easy updating.
* **Link Structure:** `[{ label: 'Experience', href: '#experience' }, { label: 'Contact', href: '#contact' }]`

## 4. DOM Structure & Accessibility (a11y)
* Wrap the entire component in a semantic `<header>` tag.
* The navigational links must be wrapped in a `<nav aria-label="Main navigation">` tag.
* The mobile menu trigger MUST be a `<button>` with an `aria-expanded` attribute mapped to its open/closed state.
* Provide an active state visual indicator for the current route.

## 5. Animation Logic (Tailwind / Optional GSAP)
* **Initial Load:** A subtle slide-down effect when the component mounts. 
* **Interaction:** Hover states on desktop links should feature a smooth color transition using standard Tailwind utility classes (`transition-colors duration-200`).

## 6. Testing Criteria (for `Header.test.tsx`)
* Verify the `<nav>` element renders with the correct ARIA label.
* Verify all links from the constant array are present in the document.
* Ensure clicking the mobile menu button toggles the `aria-expanded` attribute from `false` to `true`.