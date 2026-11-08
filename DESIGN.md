---
name: HoloLearn
description: Spatial 3D WebGL educational platform for complex STEM disciplines
aesthetic: Charcoal, Forest & Crimson High-Tech Research Laboratory
colors:
  charcoal-black: "#171717"
  forest-green: "#06110C"
  crimson-red: "#A31C1B"
  crimson-glow: "rgba(163, 28, 27, 0.45)"
  forest-glass: "rgba(6, 17, 12, 0.85)"
  charcoal-glass: "rgba(23, 23, 23, 0.85)"
  border-subtle: "rgba(255, 255, 255, 0.1)"
  border-crimson: "rgba(163, 28, 27, 0.35)"
  text-primary: "#EDEDED"
  text-muted: "#9CA3AF"
  stem-heart: "#A31C1B"
  stem-space: "#38BDF8"
  stem-quantum: "#A78BFA"
  stem-robotics: "#F59E0B"
  viewport-dark: "#06110C"
typography:
  display:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.04em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "20px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.crimson-red}"
    textColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: "10px 22px"
    shadow: "0 0 20px {colors.crimson-glow}"
  button-secondary:
    backgroundColor: "{colors.forest-green}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  card-surface:
    backgroundColor: "{colors.forest-glass}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.xl}"
    padding: "28px"
    shadow: "0 4px 20px rgba(0, 0, 0, 0.4)"
  viewport-chamber:
    backgroundColor: "{colors.forest-green}"
    rounded: "{rounded.2xl}"
    borderColor: "{colors.border-subtle}"
---

# Design System: HoloLearn (Charcoal Black, Forest Green & Crimson Red)

## 1. Visual Direction & Hierarchy

HoloLearn combines deep atmospheric scientific surfaces with vibrant, tactile precision controls:
* **Charcoal Black (`#171717`)**: Forms the primary deep dark canvas substrate for all page routes, ensuring immersive depth and fatigue-free viewing.
* **Forest Green (`#06110C`)**: Delivers subtle organic richness for elevated panels, card surfaces, dock backdrops, and the 3D WebGL viewport chamber.
* **Crimson Red (`#A31C1B`)**: Serves as the primary brand signature, interactive action trigger, active state highlighter, and glow accent.

## 2. Global Palette Tokens

* **Charcoal Black (`#171717`)**: Primary background substrate across the main document and subpages.
* **Forest Green (`#06110C`)**: Deep surface tone for cards, hero containers, floating dock, and modal backgrounds with backdrop blur.
* **Crimson Red (`#A31C1B`)**: High-energy primary interaction color for CTA buttons, active pills, badges, selection glows, and keyframe accents.
* **Subtle Borders (`rgba(255, 255, 255, 0.1)`)**: Clean 1px structural framing.
* **Active Crimson Borders (`rgba(163, 28, 27, 0.4)`)**: Dynamic interactive borders and focus rings.
* **Primary Text (`#EDEDED`)**: Clean, high-legibility heading and prose color.
* **Muted Text (`#9CA3AF`)**: Secondary descriptions, captions, and technical telemetry.

## 3. Strict Preservation of Styling & Animations

All existing transitions, Framer Motion animations, GSAP timelines, hover effects, 3D tilt effects, spring physics, tactile `active:scale-95` interactions, scroll expansions, aurora backgrounds, moving borders, shimmer buttons, and sound effects remain intact with their exact physics and timings.
