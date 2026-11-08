"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sound } from "@/lib/audio";

export interface PlanetData {
  id: string;
  name: string;
  distance: number;
  radius: number;
  speed: number;
  color: string;
  tilt: number; // axial tilt in radians
  rotationSpeed: number; // diurnal spin rate
  description: string;
  mass: string;
  gravity: string;
  orbitalPeriod: string;
  temperature: string;
  moons: string;
  atmosphere: string;
  type: string;
}

export const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    distance: 3.4,
    radius: 0.22,
    speed: 1.62,
    color: "#a8a29e",
    tilt: 0.034,
    rotationSpeed: 0.2,
    description: "The closest planet to the Sun, featuring a heavily cratered basaltic crust, extreme thermal variance (-180°C to +430°C), and an oversized iron core occupying 85% of its planetary radius.",
    mass: "3.30 × 10²³ kg (0.055 M⊕)",
    gravity: "3.70 m/s² (0.38 g)",
    orbitalPeriod: "87.97 Earth days",
    temperature: "-180°C to +430°C",
    moons: "0",
    atmosphere: "Trace exosphere (Na, Mg, O, H)",
    type: "Terrestrial rocky planet",
  },
  {
    id: "venus",
    name: "Venus",
    distance: 5.2,
    radius: 0.38,
    speed: 1.18,
    color: "#fbbf24",
    tilt: 3.09, // 177.3° retrograde
    rotationSpeed: -0.15,
    description: "Earth's toxic twin shrouded in perpetual sulfuric acid clouds and a crushing 92-bar carbon dioxide atmosphere generating an extreme runaway greenhouse effect hotter than molten lead.",
    mass: "4.87 × 10²⁴ kg (0.815 M⊕)",
    gravity: "8.87 m/s² (0.90 g)",
    orbitalPeriod: "224.7 Earth days",
    temperature: "464°C Mean (Runaway Greenhouse)",
    moons: "0",
    atmosphere: "96.5% CO₂, 3.5% N₂, clouds of H₂SO₄",
    type: "Terrestrial greenhouse planet",
  },
  {
    id: "earth",
    name: "Earth",
    distance: 7.2,
    radius: 0.42,
    speed: 1.00,
    color: "#38bdf8",
    tilt: 0.41, // 23.44°
    rotationSpeed: 1.0,
    description: "Our living home planet: dynamic plate tectonics, abundant liquid water oceans, an active oxygen-nitrogen biosphere, and a protective magnetosphere shielding complex life.",
    mass: "5.972 × 10²⁴ kg (1.00 M⊕)",
    gravity: "9.807 m/s² (1.00 g)",
    orbitalPeriod: "365.25 Earth days",
    temperature: "15°C Mean (-89°C to +57°C)",
    moons: "1 (Luna)",
    atmosphere: "78.1% N₂, 20.9% O₂, 0.9% Ar",
    type: "Habitable terrestrial water world",
  },
  {
    id: "mars",
    name: "Mars",
    distance: 9.6,
    radius: 0.28,
    speed: 0.81,
    color: "#ef4444",
    tilt: 0.44, // 25.19°
    rotationSpeed: 0.97,
    description: "The Red Planet: oxidized iron-rich regolith, solar system's tallest shield volcano (Olympus Mons 21.9 km), the colossal Valles Marineris canyon, and frozen H₂O/CO₂ polar ice caps.",
    mass: "6.417 × 10²³ kg (0.107 M⊕)",
    gravity: "3.721 m/s² (0.38 g)",
    orbitalPeriod: "686.98 Earth days (1.88 yr)",
    temperature: "-63°C Mean (-140°C to +20°C)",
    moons: "2 (Phobos & Deimos)",
    atmosphere: "95.3% CO₂, 2.6% N₂, 1.9% Ar",
    type: "Terrestrial desert planet",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    distance: 13.5,
    radius: 1.10,
    speed: 0.44,
    color: "#f59e0b",
    tilt: 0.05, // 3.13°
    rotationSpeed: 2.4, // Rapid 10-hour day
    description: "The titan of the solar system: over 317 times Earth's mass, dozens of moons, counter-rotating equatorial atmospheric belts, and the multi-century anticyclonic Great Red Spot storm.",
    mass: "1.898 × 10²⁷ kg (317.8 M⊕)",
    gravity: "24.79 m/s² (2.53 g)",
    orbitalPeriod: "4,332.6 days (11.86 yr)",
    temperature: "-110°C (Cloud tops)",
    moons: "95 confirmed (Galilean: Io, Europa, Ganymede, Callisto)",
    atmosphere: "89.8% H₂, 10.2% He, trace CH₄/NH₃",
    type: "Gas Giant",
  },
  {
    id: "saturn",
    name: "Saturn",
    distance: 17.8,
    radius: 0.92,
    speed: 0.32,
    color: "#fde68a",
    tilt: 0.47, // 26.73°
    rotationSpeed: 2.2,
    description: "Adorned with the solar system's most magnificent ring system spanning 282,000 km across but only tens of meters thick, composed of billions of water-ice particles and silicates.",
    mass: "5.683 × 10²⁶ kg (95.2 M⊕)",
    gravity: "10.44 m/s² (1.06 g)",
    orbitalPeriod: "10,759 days (29.46 yr)",
    temperature: "-140°C",
    moons: "146 confirmed (Titan, Enceladus, Mimas)",
    atmosphere: "96.3% H₂, 3.25% He, trace methane ice",
    type: "Ringed Gas Giant",
  },
  {
    id: "uranus",
    name: "Uranus",
    distance: 22.0,
    radius: 0.65,
    speed: 0.23,
    color: "#67e8f9",
    tilt: 1.71, // 97.77° - extreme lateral roll
    rotationSpeed: -1.4,
    description: "An aquamarine ice giant with an extreme 98° axial tilt caused by an ancient protoplanetary impact, resulting in 42 years of continuous polar daylight followed by 42 years of night.",
    mass: "8.681 × 10²⁵ kg (14.5 M⊕)",
    gravity: "8.69 m/s² (0.89 g)",
    orbitalPeriod: "30,685 days (84.01 yr)",
    temperature: "-195°C (Coldest atmosphere: -224°C)",
    moons: "28 confirmed (Titania, Oberon, Miranda, Ariel)",
    atmosphere: "82.5% H₂, 15.2% He, 2.3% CH₄ (Methane)",
    type: "Ice Giant",
  },
  {
    id: "neptune",
    name: "Neptune",
    distance: 26.2,
    radius: 0.62,
    speed: 0.18,
    color: "#2563eb",
    tilt: 0.49, // 28.32°
    rotationSpeed: 1.5,
    description: "The outermost major planet: a vivid cobalt-blue ice giant swept by supersonic jet streams exceeding 2,100 km/h, high-altitude white methane cirrus, and dark cyclonic storms.",
    mass: "1.024 × 10²⁶ kg (17.1 M⊕)",
    gravity: "11.15 m/s² (1.14 g)",
    orbitalPeriod: "60,190 days (164.8 yr)",
    temperature: "-201°C",
    moons: "16 confirmed (Triton - active nitrogen cryovolcanoes)",
    atmosphere: "80% H₂, 19% He, 1.5% CH₄",
    type: "Ice Giant",
  },
];

export const EARTH_LAYERS = [
  {
    name: "Lithosphere / Crust",
    depth: "0 - 70 km",
    temp: "Up to 500 °C",
    composition: "Solid silicates, basaltic oceanic crust & granitic continental crust.",
    color: "#15803d",
    scale: 1.0,
  },
  {
    name: "Upper Mantle & Asthenosphere",
    depth: "70 - 660 km",
    temp: "500 - 900 °C",
    composition: "Ductile peridotite rock driving mantle convection and tectonic plates.",
    color: "#b45309",
    scale: 0.82,
  },
  {
    name: "Lower Mantle (Mesosphere)",
    depth: "660 - 2,890 km",
    temp: "1,000 - 3,000 °C",
    composition: "High-pressure bridgmanite and magnesium silicate perovskite.",
    color: "#ea580c",
    scale: 0.65,
  },
  {
    name: "Outer Liquid Core",
    depth: "2,890 - 5,150 km",
    temp: "4,000 - 5,000 °C",
    composition: "Turbulent liquid iron-nickel creating Earth's geomagnetic dynamo field.",
    color: "#f97316",
    scale: 0.48,
  },
  {
    name: "Inner Solid Core",
    depth: "5,150 - 6,378 km",
    temp: "5,400 °C (Hot as Sun's surface)",
    composition: "Solid crystallized iron-nickel held solid by 3.6 million atmospheres pressure.",
    color: "#fef08a",
    scale: 0.28,
  },
];

/**
 * Procedural High-Fidelity Planetary Surface Texture Generator
 * Produces crisp, scientifically faithful textures for all 8 planets without external assets.
 */
function createPlanetTexture(planetId: string): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;

  switch (planetId) {
    case "mercury": {
      // Cratered gray-basalt terrain
      ctx.fillStyle = "#8c857b";
      ctx.fillRect(0, 0, w, h);
      // Rayed craters and ejecta blankets
      for (let i = 0; i < 90; i++) {
        const cx = (i * 73) % w;
        const cy = (i * 47) % h;
        const rad = 4 + (i % 8) * 3;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "#5a554e" : "#b8b2a8";
        ctx.fill();
        ctx.strokeStyle = "#383531";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      break;
    }

    case "venus": {
      // Swirling golden-cream sulfuric acid cloud deck
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#d99726");
      grad.addColorStop(0.3, "#fcd34d");
      grad.addColorStop(0.5, "#f59e0b");
      grad.addColorStop(0.7, "#fef08a");
      grad.addColorStop(1, "#b45309");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Atmospheric shears & wavy vortex bands
      ctx.fillStyle = "rgba(254, 240, 138, 0.25)";
      for (let y = 10; y < h; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= w; x += 32) {
          ctx.lineTo(x, y + Math.sin((x / w) * Math.PI * 4 + y) * 8);
        }
        ctx.lineTo(w, y + 12);
        ctx.lineTo(0, y + 12);
        ctx.fill();
      }
      break;
    }

    case "earth": {
      // Deep blue oceanic base
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
      oceanGrad.addColorStop(0, "#0369a1");
      oceanGrad.addColorStop(0.5, "#0284c7");
      oceanGrad.addColorStop(1, "#075985");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, w, h);

      // Continental Landmasses (Green/Ochre)
      ctx.fillStyle = "#15803d";
      // Eurasia & Africa cluster
      ctx.beginPath();
      ctx.ellipse(w * 0.55, h * 0.42, w * 0.18, h * 0.22, 0.2, 0, Math.PI * 2);
      ctx.fill();
      // Americas cluster
      ctx.beginPath();
      ctx.ellipse(w * 0.25, h * 0.48, w * 0.12, h * 0.35, -0.2, 0, Math.PI * 2);
      ctx.fill();
      // Australia
      ctx.beginPath();
      ctx.ellipse(w * 0.78, h * 0.68, w * 0.06, h * 0.08, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Arid Deserts (Sahara, Australian outback)
      ctx.fillStyle = "#b45309";
      ctx.beginPath();
      ctx.ellipse(w * 0.52, h * 0.42, w * 0.08, h * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();

      // Brilliant White Polar Ice Caps
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, 22);
      ctx.fillRect(0, h - 22, w, 22);

      // Swirling White Cloud Covers
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      for (let c = 0; c < 6; c++) {
        const cy = 40 + c * 32;
        ctx.beginPath();
        ctx.moveTo(0, cy);
        for (let cx = 0; cx <= w; cx += 25) {
          ctx.lineTo(cx, cy + Math.sin((cx / w) * Math.PI * 6 + c) * 12);
        }
        ctx.lineTo(w, cy + 10);
        ctx.lineTo(0, cy + 10);
        ctx.fill();
      }
      break;
    }

    case "mars": {
      // Rusty terracotta regolith
      const marsGrad = ctx.createLinearGradient(0, 0, 0, h);
      marsGrad.addColorStop(0, "#b91c1c");
      marsGrad.addColorStop(0.5, "#dc2626");
      marsGrad.addColorStop(1, "#991b1b");
      ctx.fillStyle = marsGrad;
      ctx.fillRect(0, 0, w, h);

      // Dark Volcanic Basalt Plains (Syrtis Major & Acidalia)
      ctx.fillStyle = "#450a0a";
      ctx.beginPath();
      ctx.ellipse(w * 0.45, h * 0.52, w * 0.15, h * 0.16, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w * 0.72, h * 0.45, w * 0.12, h * 0.12, -0.4, 0, Math.PI * 2);
      ctx.fill();

      // Valles Marineris canyon rift
      ctx.strokeStyle = "#2b0707";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(w * 0.2, h * 0.54);
      ctx.lineTo(w * 0.42, h * 0.56);
      ctx.stroke();

      // Crisp White Polar Caps
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, 18);
      ctx.fillRect(0, h - 18, w, 18);
      break;
    }

    case "jupiter": {
      // Alternating parallel atmospheric belts and zones
      const bands = [
        "#7c2d12", "#fef3c7", "#9a3412", "#fffbeb",
        "#7c2d12", "#fde68a", "#991b1b", "#fed7aa",
        "#7c2d12", "#fef3c7", "#9a3412",
      ];
      const bandHeight = h / bands.length;
      bands.forEach((color, idx) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, idx * bandHeight, w, bandHeight);

        // Turbulent vortex boundaries
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.beginPath();
        ctx.moveTo(0, idx * bandHeight);
        for (let x = 0; x <= w; x += 20) {
          ctx.lineTo(x, idx * bandHeight + Math.sin((x / 20) + idx) * 4);
        }
        ctx.lineTo(w, idx * bandHeight + 4);
        ctx.lineTo(0, idx * bandHeight + 4);
        ctx.fill();
      });

      // Swirling Great Red Spot Anticyclone
      const grsX = w * 0.62;
      const grsY = h * 0.66;
      ctx.beginPath();
      ctx.ellipse(grsX, grsY, 32, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#b91c1c";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#fca5a5";
      ctx.stroke();
      break;
    }

    case "saturn": {
      // Pale golden cream gas giant bands
      const saturnBands = [
        "#c29d59", "#e2c992", "#ecd8ab", "#d5b472",
        "#ebd6a4", "#cbb075", "#dfc58b", "#c29d59",
      ];
      const saturnHeight = h / saturnBands.length;
      saturnBands.forEach((color, idx) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, idx * saturnHeight, w, saturnHeight);
      });
      break;
    }

    case "uranus": {
      // Soft cyan-aquamarine methane atmosphere
      const uranusGrad = ctx.createLinearGradient(0, 0, 0, h);
      uranusGrad.addColorStop(0, "#38bdf8");
      uranusGrad.addColorStop(0.5, "#67e8f9");
      uranusGrad.addColorStop(1, "#22d3ee");
      ctx.fillStyle = uranusGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle atmospheric haze banding
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.fillRect(0, h * 0.42, w, h * 0.16);
      break;
    }

    case "neptune": {
      // Deep cobalt azure with white methane streaks
      const neptuneGrad = ctx.createLinearGradient(0, 0, 0, h);
      neptuneGrad.addColorStop(0, "#1e3a8a");
      neptuneGrad.addColorStop(0.5, "#2563eb");
      neptuneGrad.addColorStop(1, "#1d4ed8");
      ctx.fillStyle = neptuneGrad;
      ctx.fillRect(0, 0, w, h);

      // Great Dark Spot
      ctx.beginPath();
      ctx.ellipse(w * 0.4, h * 0.45, 24, 14, -0.2, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a";
      ctx.fill();

      // High-Altitude Supersonic White Methane Cirrus Wisps
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      for (let i = 0; i < 4; i++) {
        const wy = 60 + i * 45;
        ctx.fillRect((i * 120) % w, wy, 80, 4);
      }
      break;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural Realistic Saturn Multi-Ring Texture
 * Includes C Ring, dense B Ring, Cassini Division gap, and outer A Ring.
 */
function createSaturnRingTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  // Transparent inner edge
  grad.addColorStop(0.0, "rgba(0, 0, 0, 0)");
  // C Ring (Dusky, semi-transparent)
  grad.addColorStop(0.12, "rgba(180, 160, 120, 0.28)");
  // B Ring (Brightest, densest)
  grad.addColorStop(0.32, "rgba(245, 230, 185, 0.95)");
  grad.addColorStop(0.62, "rgba(235, 215, 170, 0.90)");
  // Cassini Division (Crisp dark orbital resonance gap)
  grad.addColorStop(0.65, "rgba(0, 0, 0, 0.02)");
  grad.addColorStop(0.70, "rgba(0, 0, 0, 0.02)");
  // A Ring (Outer ring)
  grad.addColorStop(0.73, "rgba(215, 195, 155, 0.75)");
  grad.addColorStop(0.95, "rgba(195, 175, 135, 0.60)");
  // Encke division & outer edge fade
  grad.addColorStop(1.0, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 32);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * 100% Native WebGL 3D Billboard Sprite Badge for Targeted Planet
 * Clean, high-DPI, faces camera at all orbital angles with zero DOM unmount issues.
 */
function PlanetBillboardSprite({ planet }: { planet: PlanetData }) {
  const spriteRef = useRef<THREE.Sprite>(null);

  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 140;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, 512, 140);

    // Pill Glass Substrate
    const x = 12, y = 12, w = 488, h = 116, r = 24;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    ctx.fillStyle = "rgba(6, 17, 12, 0.95)";
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#38bdf8";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 16;
    ctx.stroke();

    // Indicator beacon dot
    ctx.beginPath();
    ctx.arc(46, 70, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#A31C1B";
    ctx.shadowColor = "#A31C1B";
    ctx.shadowBlur = 14;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(`${planet.type.toUpperCase()} • ORBIT: ${planet.orbitalPeriod}`, 74, 52);

    ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(planet.name, 74, 96);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [planet]);

  useEffect(() => {
    return () => {
      if (texture) texture.dispose();
    };
  }, [texture]);

  if (!texture) return null;

  return (
    <sprite
      ref={spriteRef}
      position={[0, planet.radius + 0.65, 0]}
      scale={[2.0, 0.55, 1]}
    >
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  );
}

interface SpaceSceneProps {
  timeScale?: number;
  focusMode: "solar_system" | "earth_cross_section";
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData) => void;
  crossSectionSlider?: number; // 0 to 1
  wireframe?: boolean;
}

export function SpaceScene({
  timeScale = 1,
  focusMode = "solar_system",
  selectedPlanet,
  onSelectPlanet,
  crossSectionSlider = 0.5,
  wireframe = false,
}: SpaceSceneProps) {
  const planetMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const sunRef = useRef<THREE.Mesh>(null);
  const orbitsGroupRef = useRef<THREE.Group>(null);
  const earthCoreGroupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  // Precomputed High-Fidelity Textures
  const texturesMap = useMemo(() => {
    const map = new Map<string, THREE.CanvasTexture | null>();
    PLANETS.forEach((p) => {
      map.set(p.id, createPlanetTexture(p.id));
    });
    return map;
  }, []);

  const saturnRingTexture = useMemo(() => createSaturnRingTexture(), []);

  // Cleanup textures on unmount
  useEffect(() => {
    return () => {
      texturesMap.forEach((tex) => tex?.dispose());
      saturnRingTexture?.dispose();
    };
  }, [texturesMap, saturnRingTexture]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() * timeScale * 0.4;

    // Sun Corona Flare Rotation
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.15;
    }

    // Keplerian Orbital Revolution & Diurnal Axial Spin for all 8 Planets
    if (focusMode === "solar_system") {
      PLANETS.forEach((planet) => {
        const group = planetMeshesRef.current.get(planet.id);
        if (group) {
          // Keplerian orbital revolution: angle advances proportionally to planet.speed
          const currentAngle = time * planet.speed;
          group.position.x = Math.cos(currentAngle) * planet.distance;
          group.position.z = Math.sin(currentAngle) * planet.distance;

          // Diurnal rotation around its tilted polar axis
          const bodyMesh = group.children[0] as THREE.Mesh;
          if (bodyMesh) {
            bodyMesh.rotation.y += delta * planet.rotationSpeed * 0.8;
          }
        }
      });

      // Animate Earth's Moon orbiting Earth
      if (moonRef.current) {
        const moonAngle = time * 3.5;
        moonRef.current.position.x = Math.cos(moonAngle) * 0.85;
        moonRef.current.position.z = Math.sin(moonAngle) * 0.85;
        moonRef.current.position.y = Math.sin(moonAngle * 0.5) * 0.1;
      }
    }

    // Geosphere Cross-Section Mode Rotation
    if (earthCoreGroupRef.current) {
      earthCoreGroupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group>
      {focusMode === "solar_system" ? (
        <group ref={orbitsGroupRef}>
          {/* THE SUN - Central Stellar Illuminator */}
          <mesh ref={sunRef} position={[0, 0, 0]}>
            <sphereGeometry args={[1.5, 48, 48]} />
            <meshBasicMaterial color="#fffbeb" />
            <pointLight color="#ffffff" intensity={4.5} distance={90} decay={1.2} />
          </mesh>

          {/* Sun Radiant Corona Haze Shell */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.75, 48, 48]} />
            <meshBasicMaterial
              color="#f97316"
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              side={THREE.BackSide}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[2.05, 36, 36]} />
            <meshBasicMaterial
              color="#fbbf24"
              transparent
              opacity={0.18}
              blending={THREE.AdditiveBlending}
              side={THREE.BackSide}
            />
          </mesh>

          {/* ALL 8 MAJOR PLANETS & KEPLERIAN ORBITS */}
          {PLANETS.map((planet) => {
            const isSelected = selectedPlanet?.id === planet.id;
            const tex = texturesMap.get(planet.id);

            return (
              <React.Fragment key={planet.id}>
                {/* Orbital Path Trace Ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[planet.distance - 0.025, planet.distance + 0.025, 96]} />
                  <meshBasicMaterial
                    color={isSelected ? "#00f0ff" : "#38bdf8"}
                    transparent
                    opacity={isSelected ? 0.65 : 0.16}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                {/* Planet Transform Group (Positioned along orbit) */}
                <group
                  ref={(el) => {
                    if (el) planetMeshesRef.current.set(planet.id, el);
                  }}
                  position={[planet.distance, 0, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    onSelectPlanet(planet);
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    if (typeof document !== "undefined") document.body.style.cursor = "pointer";
                  }}
                  onPointerOut={(e) => {
                    e.stopPropagation();
                    if (typeof document !== "undefined") document.body.style.cursor = "auto";
                  }}
                >
                  {/* Planet Spherical Body with Axial Tilt & Realistic Surface Texture */}
                  <mesh rotation={[0, 0, planet.tilt]}>
                    <sphereGeometry args={[planet.radius, 40, 40]} />
                    {tex ? (
                      <meshStandardMaterial
                        map={tex}
                        roughness={0.65}
                        metalness={0.08}
                        wireframe={wireframe}
                      />
                    ) : (
                      <meshStandardMaterial
                        color={planet.color}
                        roughness={0.65}
                        metalness={0.08}
                        wireframe={wireframe}
                      />
                    )}

                    {/* Earth Atmospheric Glow & Orbiting Moon */}
                    {planet.id === "earth" && (
                      <>
                        <mesh scale={1.035}>
                          <sphereGeometry args={[planet.radius, 32, 32]} />
                          <meshBasicMaterial
                            color="#38bdf8"
                            transparent
                            opacity={0.22}
                            blending={THREE.AdditiveBlending}
                            side={THREE.BackSide}
                          />
                        </mesh>
                        {/* Moon (Luna) */}
                        <mesh ref={moonRef} position={[0.85, 0, 0]}>
                          <sphereGeometry args={[0.09, 20, 20]} />
                          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
                        </mesh>
                      </>
                    )}

                    {/* Saturn Photorealistic Rings */}
                    {planet.id === "saturn" && saturnRingTexture && (
                      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
                        <ringGeometry args={[planet.radius * 1.35, planet.radius * 2.7, 64]} />
                        <meshStandardMaterial
                          map={saturnRingTexture}
                          side={THREE.DoubleSide}
                          transparent
                          opacity={0.92}
                          roughness={0.4}
                        />
                      </mesh>
                    )}

                    {/* Uranus Subtle Tilted Rings */}
                    {planet.id === "uranus" && (
                      <mesh rotation={[0.1, Math.PI / 2, 0]}>
                        <ringGeometry args={[planet.radius * 1.4, planet.radius * 1.7, 48]} />
                        <meshBasicMaterial
                          color="#67e8f9"
                          transparent
                          opacity={0.45}
                          side={THREE.DoubleSide}
                        />
                      </mesh>
                    )}
                  </mesh>

                  {/* Pulsing Selection Target Reticle */}
                  {isSelected && (
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                      <ringGeometry args={[planet.radius + 0.12, planet.radius + 0.18, 36]} />
                      <meshBasicMaterial color="#00f0ff" transparent opacity={0.85} side={THREE.DoubleSide} />
                    </mesh>
                  )}

                  {/* Native 3D Billboard Sprite Badge when Selected */}
                  {isSelected && <PlanetBillboardSprite planet={planet} />}
                </group>
              </React.Fragment>
            );
          })}
        </group>
      ) : (
        /* EARTH INTERNAL GEOSPHERE CROSS-SECTION MODE */
        <group ref={earthCoreGroupRef} scale={2.2}>
          {EARTH_LAYERS.map((layer, idx) => {
            const thetaLength = Math.PI * 2 * (1 - crossSectionSlider * 0.25);
            return (
              <group key={layer.name}>
                <mesh rotation={[0, -Math.PI / 4, 0]}>
                  <sphereGeometry
                    args={[
                      layer.scale,
                      36,
                      36,
                      0,
                      thetaLength,
                      0,
                      Math.PI,
                    ]}
                  />
                  <meshStandardMaterial
                    color={layer.color}
                    roughness={0.6}
                    metalness={idx === 4 ? 0.8 : 0.2}
                    wireframe={wireframe}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                {/* Native 3D Marker Pin for Core Stratum */}
                <mesh position={[layer.scale * 0.85, 0, layer.scale * 0.3]}>
                  <sphereGeometry args={[0.04, 16, 16]} />
                  <meshBasicMaterial color="#00f0ff" />
                </mesh>
              </group>
            );
          })}
        </group>
      )}
    </group>
  );
}
