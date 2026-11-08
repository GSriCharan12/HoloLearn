# HoloLearn — Spatial 3D WebGL Education Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-holo--learn.netlify.app-00c7b7?style=for-the-badge&logo=netlify&logoColor=white)](https://holo-learn.netlify.app/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r174-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3.5-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00ad9f?style=for-the-badge&logo=netlify&logoColor=white)](https://holo-learn.netlify.app/)

> **Live Platform**: [https://holo-learn.netlify.app/](https://holo-learn.netlify.app/)

HoloLearn is a spatial WebGL 2.0 educational platform engineered to transcend flat textbooks through tactile 3D interactive learning. By combining mathematical models, physical solvers, progressive anatomical dissection, and live telemetry in the browser, HoloLearn bridges the cognitive gap between abstract theory and physical intuition.

---

## Flagship STEM Simulation Modules

### 1. Cardiovascular Anatomy & Hemodynamics (`/lab?module=heart`)
* **3D Anatomical Sculpting**: Ventricles, atria, muscular interventricular septum, aorta, pulmonary trunk, venae cavae, and coronary arteries (LAD & RCA).
* **Volumetric Blood Flow**: Continuous mathematical 3D splines with moving oxygenated (red) and deoxygenated (blue) corpuscles.
* **Interactive Dissection**: Click any anatomical structure to lock a 3D billboard reticle and stream real-time physiological diagnostics (pressures, saturation, and clinical pathology).
* **Cardiology Monitor**: Interactive ECG oscilloscope synced with BPM contraction rhythms.

### 2. Planetary Mechanics & Geosphere Strata (`/lab?module=space`)
* **8 Solar System Planets**: Mercury, Venus, Earth, Mars, Jupiter, Saturn (with rings), Uranus, and Neptune calibrated with relative Keplerian orbital velocities, axial tilts, and physical radii.
* **Geosphere Dissection**: Crust, mantle, outer core, and 5,400°C crystalline inner core cutaways.
* **Orbital Telemetry**: Live eccentricity, orbital periods, and perihelion/aphelion data.

### 3. Quantum Mechanics: Bohr Transitions & Cloud Orbitals (`/lab?module=quantum`)
* **Quantized Electron Jumps**: Photon absorption/emission with wave-particle duality simulation.
* **Schrödinger Probability**: Volumetric $1s$, $2p$, and $3d$ electron density clouds ($|\psi|^2$).
* **Molecular Watson-Crick DNA**: Hydrogen bond inspection with helical pitch dynamics.

### 4. 6-DOF Kinematic Robotics & Stress FEA (`/lab?module=robotics`)
* **Articulated Manipulator**: 6-axis inverse kinematics and forward joint angles.
* **Planetary Gearbox**: Multi-stage gear reduction with real-time torque multipliers.
* **Finite Element Heat Map**: Von Mises stress tensor color gradients and thermal strain analysis.

---

## Technical Architecture

* **Framework**: Next.js 16.4.5 (App Router with Turbopack)
* **Runtime**: React 19.3.0
* **3D Engine**: Three.js r174 + React Three Fiber 9 + `@react-three/drei`
* **Styling**: Tailwind CSS v4 with PostCSS (`@tailwindcss/postcss`) and custom design tokens (Charcoal Black `#171717`, Forest Green `#06110C`, Crimson Red `#A31C1B`)
* **Animation Physics**: Framer Motion 12 + GSAP 3.12
* **Audio Synthesis**: Pure Web Audio API procedural sound generators
* **Deployment & Hosting**: Netlify CDN & Edge Infrastructure

---

## Getting Started Locally

### Prerequisites
* **Node.js**: `20.9.0` or higher (Node `20.18.0` / `22.x` recommended)
* **npm**: `10.x` or higher

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/GSriCharan12/HoloLearn.git
   cd HoloLearn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## Deployment on Netlify

This project is configured for automated continuous deployment on Netlify via [`netlify.toml`](./netlify.toml):

* **Build command**: `npm run build`
* **Publish directory**: `.next`
* **Plugin**: `@netlify/plugin-nextjs`
* **Node Version**: `20.18.0`

Production URL: [https://holo-learn.netlify.app/](https://holo-learn.netlify.app/)

---

## License

MIT © 2026 HoloLearn. Engineered for rigorous scientific education.
