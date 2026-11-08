# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary Audience (Hybrid)**:
  - **Self-Paced STEM Students** (Undergraduate and High School): Studying complex physical and biological phenomena where 2D textbook diagrams fail to convey spatial structure, volumetric flow, or temporal dynamics.
  - **Classroom Educators & Professors**: Presenting live, interactive 3D demonstrations during lectures and lab walkthroughs to anchor abstract theories into tangible visual mechanisms.

## Product Purpose

HoloLearn is an immersive 3D spatial educational platform designed to deconstruct complex STEM concepts through real-time WebGL models, multi-tier dissections, biophysical parameter tuning, and active recall. Success means students develop intuitive, visceral spatial comprehension of non-linear scientific systems that flat textbooks or passive video cannot convey.

## Positioning

Unlike conventional ed-tech video catalogs or static 3D sketch repositories, HoloLearn is an **exploratory tactile sandbox paired with synchronized scientific telemetry and active-recall verification**. All simulations operate under genuine mathematical and physiological formulas (Keplerian orbits, Balmer spectral transitions, real hemodynamic pressure curves, Von Mises FEA stress distribution) rather than pre-rendered video deception.

## Operating Context

- **Lecture Theaters & Classrooms**: Projected on large screens for real-time instructor dissection, orbit acceleration, and multi-tier cutaway demonstrations.
- **Independent Study & Lab Review**: Desktop and laptop browsers with mouse/trackpad orbit navigation, synchronized Lead II ECG monitoring, parameter tuning sliders, and keyboard shortcuts (<kbd>Space</kbd>, <kbd>R</kbd>, <kbd>G</kbd>, <kbd>M</kbd>).
- **Mobile & Tablet Review**: Fluid touch controls for reviewing curriculum cards, syllabus specifications, and active recall challenges on touch devices without gesture trapping.

## Capabilities and Constraints

- **Confirmed Functionality**:
  - Four fully realized interactive 3D STEM disciplines:
    1. *Cardiovascular Anatomy*: 4 muscular chambers, cardiac apex, dual oxygenated/venous blood particle streams, BPM pulse sync (45–160 BPM), coronal dissection slider, internal mitral valve & chordae tendineae, 6 hotspot pins, Lead II ECG monitor.
    2. *Planetary Mechanics*: Keplerian heliocentric orbits ($T^2 \propto a^3$), orbital time warp (0.2x–4x), procedural solar corona, 6 planets, Saturn ring particles, Earth 5-strata geosphere internal cutaway.
    3. *Quantum & Molecular Physics*: Quantized Bohr hydrogen model ($n=1, 2, 3$), photon wavepacket emissions ($656.3\text{ nm}$), Schrödinger electron probability cloud $|\psi|^2$, 36-rung rotating DNA double helix.
    4. *Kinematic Robotics*: 6-DOF industrial manipulator with base turntable yaw, shoulder pitch, elbow articulation, exploded planetary gear separation, and Von Mises finite element stress false-color heatmap.
  - Multi-route decoupled architecture:
    - Main Hero Portal (`/`): Aurora hero, platform statistics, Holodeck portal preview, Bento architecture, syllabus FAQ.
    - Dedicated 3D Holodeck Studio (`/lab`): Full-screen laboratory workspace with deep-link support (`?module=heart|space|quantum|robotics`).
    - Dedicated Curriculum Catalog (`/curriculum`): Track overview with 3D tilted preview cards.
  - In-scene GSAP guided lesson timeline with auto-play scrubber and dissection value synchronization.
  - In-scene active recall challenge with multi-tier scoring, streak tracking, scientific explanations, and celebratory confetti.
  - Synthetic Web Audio procedural sound design (zero MP3 asset dependencies) with BPM rate adaptation.
- **Technical Stack & Constraints**:
  - Next.js (App Router, React 19, TypeScript, Tailwind CSS v4, Turbopack).
  - Three.js r174, React Three Fiber (v9), React Three Drei (v10).
  - Framer Motion (v12) for UI springs, layout animations, and modals.
  - GSAP (v3) strictly for timed timeline scrubbing.
  - Dark futuristic design system (`#030712`, `#00f0ff`, `#8b5cf6`).

## Brand Commitments

- **Name**: HoloLearn ("Spatial 3D Canvas").
- **Voice**: Rigorous, scientific, visionary, clear, and tactile.
- **Identity & Aesthetics**: Dark futuristic navy backdrops, high-contrast electric cyan and neon violet accents, glassmorphic HUD telemetry, monospace data notation, and subtle ambient glows.
- **Purity Rule**: No decorative animations may obstruct or substitute for the functional 3D simulation engine.

## Evidence on Hand

- Verified, fully working codebase implementing all 20 curated 21st.dev UI components.
- Live local Next.js development server running on `http://localhost:3000`.
- Scientifically calibrated data: Cardiac pressures ($120/80\text{ mmHg}$), SaO2 saturation levels, Keplerian relative orbital velocities, Balmer series wavelengths ($656.3\text{ nm}$), and robotic yield stress ($240\text{ MPa}$).

## Product Principles

1. **Tactile Simulation Over Passive Observation**: Students learn by directly manipulating variables (frequency, slicing angles, time dilation, quantum levels), observing instant real-time physical consequences.
2. **Scientific & Anatomical Fidelity**: Never falsify physics or biological mechanisms for superficial visual effects. Visual shaders must reflect true scientific models.
3. **Low Latency & High Frame Rates**: 60 FPS hardware-accelerated WebGL performance is a foundational pedagogical requirement, not an optional optimization.
4. **Active Recall Integration**: Pair spatial observation immediately with diagnostic verification to solidify retention and eliminate passive illusions of mastery.
5. **Universal Multi-Modal Access**: Seamless operation across desktop mouse navigation, mobile touch browsing, screen readers, keyboard accessibility, and prefers-reduced-motion settings.

## Accessibility & Inclusion

- Keyboard navigation (<kbd>Space</kbd>, <kbd>R</kbd>, <kbd>G</kbd>, <kbd>M</kbd>, <kbd>Tab</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>).
- Respect for `prefers-reduced-motion` across animated glows, backgrounds, and camera transitions.
- Touch pan-y isolation to prevent 3D gestures from capturing vertical scroll on mobile screens.
- Screen reader ARIA roles (`role="tooltip"`, `role="button"`).

