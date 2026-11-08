"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Check,
  Star,
  Clock,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { TiltedCard } from "@/components/ui/tilted-card";
import { sound } from "@/lib/audio";

interface CurriculumModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  description: string;
  layersCount: number;
  image: string;
  features: string[];
}

const CATALOG_MODULES: CurriculumModule[] = [
  {
    id: "heart",
    title: "Cardiovascular Anatomy & Valvular Hemodynamics",
    category: "Biological Sciences",
    duration: "45 Mins",
    difficulty: "Intermediate",
    rating: 4.9,
    description: "Inspect the 4 muscular chambers of the human heart, real-time arterial blood flow, and bicuspid/tricuspid valve mechanics.",
    layersCount: 6,
    image: "/images/card-heart.jpg",
    features: [
      "Systolic / Diastolic Cardiac Pulse",
      "Cutaway chamber dissection plane",
      "Oxygenated vs Venous blood particle vectors",
      "SA Node pacemaker electric rhythm",
    ],
  },
  {
    id: "space",
    title: "Planetary Mechanics & Geosphere Strata",
    category: "Astrophysics",
    duration: "60 Mins",
    difficulty: "Beginner",
    rating: 4.8,
    description: "Orbit the solar system with real relative orbital velocities and peel back Earth's crust down to the 5,400°C crystalline core.",
    layersCount: 8,
    image: "/images/card-space.jpg",
    features: [
      "Procedural corona & solar flares",
      "8-Planet Keplerian orbital speeds",
      "Earth geosphere 5-layer dissection",
      "Geomagnetic dynamo visualization",
    ],
  },
  {
    id: "quantum",
    title: "Quantum Mechanics: Bohr Transitions & Cloud Orbitals",
    category: "Quantum Physics",
    duration: "50 Mins",
    difficulty: "Advanced",
    rating: 5.0,
    description: "Simulate photon absorption and quantized electron jumps, Schrodinger probability density clouds, and Watson-Crick DNA bonds.",
    layersCount: 4,
    image: "/images/card-quantum.jpg",
    features: [
      "Quantized electron level jumps (n=1 to 3)",
      "Photon wavepacket spectral emissions",
      "Gaussian electron cloud |ψ|² distribution",
      "DNA antiparallel double-helix lattice",
    ],
  },
  {
    id: "robotics",
    title: "6-DOF Kinematic Robotics & Stress FEA Analysis",
    category: "Mechatronics Engineering",
    duration: "55 Mins",
    difficulty: "Intermediate",
    rating: 4.9,
    description: "Explore multi-joint articulated manipulators, planetary gears, inverse kinematics, and real-time finite element heat stress maps.",
    layersCount: 7,
    image: "/images/card-robotics.jpg",
    features: [
      "Articulated 6-axis joint kinematics",
      "Smooth exploded view separation slider",
      "Finite Element Stress false-color heatmap",
      "Brushless servo actuator telemetry",
    ],
  },
];

const DISCIPLINE_THEMES: Record<string, { color: string; bg: string; border: string }> = {
  heart: { color: "#A31C1B", bg: "rgba(163, 28, 27, 0.15)", border: "rgba(163, 28, 27, 0.35)" },
  space: { color: "#38BDF8", bg: "rgba(56, 189, 248, 0.15)", border: "rgba(56, 189, 248, 0.35)" },
  quantum: { color: "#A78BFA", bg: "rgba(167, 139, 250, 0.15)", border: "rgba(167, 139, 250, 0.35)" },
  robotics: { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.35)" },
};

export function CurriculumCatalog({
  onSelectModule,
}: {
  onSelectModule?: (moduleId: string) => void;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");

  const handleLaunch = (moduleId: string) => {
    sound.playHologramMode();
    onSelectModule?.(moduleId);
    router.push(`/lab?module=${moduleId}`);
  };

  const categories = [
    { id: "all", name: "All Disciplines" },
    { id: "Biological Sciences", name: "Biology & Medicine" },
    { id: "Astrophysics", name: "Space & Astrophysics" },
    { id: "Quantum Physics", name: "Quantum Physics" },
    { id: "Mechatronics Engineering", name: "Robotics & Engineering" },
  ];

  const filteredModules = filter === "all"
    ? CATALOG_MODULES
    : CATALOG_MODULES.filter((m) => m.category === filter);

  return (
    <section id="curriculum" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06110C] border border-white/10 text-[#9CA3AF] text-xs font-mono uppercase tracking-wider mb-3 shadow-sm">
          <BookOpen className="h-3.5 w-3.5 text-[#A31C1B]" />
          Academic STEM Curriculum
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-[#EDEDED] tracking-tight text-balance">
          Explore Science with <span className="text-[#A31C1B]">Tactile 3D Depth</span>
        </h2>
        <p className="mt-3 text-[#9CA3AF] text-sm md:text-base text-pretty">
          Every curriculum track contains fully articulated WebGL simulations, calibrated physical formulas, cutaway dissection controls, and live scientific telemetry.
        </p>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setFilter(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-150 cursor-pointer ${
                filter === cat.id
                  ? "bg-[#A31C1B] text-white font-semibold shadow-[0_0_12px_rgba(163,28,27,0.35)]"
                  : "bg-[#06110C] text-[#9CA3AF] border border-white/10 hover:border-[#A31C1B]/50 hover:text-[#EDEDED]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3D CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredModules.map((item) => {
          const theme = DISCIPLINE_THEMES[item.id] || DISCIPLINE_THEMES.heart;

          return (
            <div key={item.id} className="relative group">
              <TiltedCard
                containerHeight="490px"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.02}
                captionText="Click to inspect model in 3D"
                onClick={() => {
                  handleLaunch(item.id);
                }}
                backContent={
                  <div className="h-full flex flex-col justify-between text-left">
                    <div>
                      <span
                        className="text-xs font-mono font-bold uppercase tracking-wider block mb-1.5"
                        style={{ color: theme.color }}
                      >
                        {item.category}
                      </span>
                      <h4 className="text-xl font-bold text-[#EDEDED] mb-2">{item.title}</h4>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="space-y-2 p-3.5 rounded-xl bg-[#171717] border border-white/10">
                        <span className="text-xs font-mono text-[#EDEDED] font-bold block">
                          Included Interactive Tools:
                        </span>
                        {item.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                            <Check className="h-3.5 w-3.5 text-[#A31C1B] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunch(item.id);
                      }}
                      className="w-full py-2.5 rounded-lg bg-[#A31C1B] hover:bg-[#8B1817] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(163,28,27,0.35)] active:scale-95"
                    >
                      Launch in 3D Holodeck
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                }
              >
                <div className="h-full flex flex-col justify-between text-left">
                  {/* Top Tags */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold border"
                        style={{
                          color: theme.color,
                          backgroundColor: theme.bg,
                          borderColor: theme.border,
                        }}
                      >
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] font-mono">
                        <Clock className="h-3.5 w-3.5 text-[#A31C1B]" />
                        {item.duration}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#EDEDED] group-hover:text-[#A31C1B] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Center 3D Simulation Preview Image */}
                  <div className="relative my-3 w-full h-44 rounded-xl overflow-hidden border border-white/10 bg-[#06110C] shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-[#06110C]/90 border border-white/10 text-[10px] font-mono text-[#EDEDED] backdrop-blur-xs">
                      Interactive 3D Engine
                    </span>
                  </div>

                  {/* Bottom Meta Bar */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[#F59E0B] text-xs font-mono font-semibold">
                        <Star className="h-3.5 w-3.5 fill-[#F59E0B]" />
                        {item.rating}
                      </div>
                      <span className="text-xs font-mono text-[#9CA3AF]">
                        {item.layersCount} 3D Slices
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-xs font-mono font-semibold text-[#A31C1B] group-hover:translate-x-0.5 transition-transform">
                      Inspect 3D <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </TiltedCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
