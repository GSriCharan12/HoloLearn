"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight, Clock, Star, Layers } from "lucide-react";
import { sound } from "@/lib/audio";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function HomeCurriculumPreview() {
  const previewModules = [
    {
      id: "heart",
      title: "Cardiovascular Anatomy & Valvular Hemodynamics",
      category: "Biological Sciences",
      duration: "45 Mins",
      rating: 4.9,
      slices: 6,
      image: "/images/card-heart.jpg",
      highlight: "Systolic rhythm, blood particle flow, cutaway chambers",
      accent: "from-rose-500/20 to-transparent",
    },
    {
      id: "space",
      title: "Planetary Mechanics & Geosphere Strata",
      category: "Astrophysics",
      duration: "60 Mins",
      rating: 4.8,
      slices: 8,
      image: "/images/card-space.jpg",
      highlight: "8 Keplerian orbital speeds, 5-layer Earth core dissection",
      accent: "from-sky-500/20 to-transparent",
    },
    {
      id: "quantum",
      title: "Quantum Mechanics: Bohr Transitions & Cloud Orbitals",
      category: "Quantum Physics",
      duration: "50 Mins",
      rating: 5.0,
      slices: 4,
      image: "/images/card-quantum.jpg",
      highlight: "Quantized jumps, Schrödinger |ψ|² electron cloud density",
      accent: "from-violet-500/20 to-transparent",
    },
    {
      id: "robotics",
      title: "6-DOF Kinematic Robotics & Stress FEA Analysis",
      category: "Mechatronics Engineering",
      duration: "55 Mins",
      rating: 4.9,
      slices: 7,
      image: "/images/card-robotics.jpg",
      highlight: "Articulated 6-axis kinematics, finite element heat stress map",
      accent: "from-amber-500/20 to-transparent",
    },
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-20">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono uppercase tracking-widest mb-3 font-semibold">
            <BookOpen className="h-3.5 w-3.5" />
            Curriculum Highlights
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#EDEDED] tracking-tight">
            Flagship <span className="text-[#A31C1B]">STEM Learning Tracks</span>
          </h2>
          <p className="mt-3 text-[#9CA3AF] text-sm md:text-base leading-relaxed">
            Every module combines Three.js models, physical interactions, progressive dissection, and real-time scientific telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/curriculum" onClick={() => sound.playClick()}>
            <ShimmerButton className="py-2.5 px-5 text-xs md:text-sm font-bold flex items-center gap-2">
              <span>View Full Curriculum & Syllabus</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </ShimmerButton>
          </Link>
        </div>
      </div>

      {/* 4 CARDS PREVIEW GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {previewModules.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-[#06110C]/80 border border-white/10 hover:border-[#A31C1B] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_4px_25px_rgba(163,28,27,0.25)] hover:-translate-y-1.5"
          >
            {/* Top Image Preview */}
            <div className="relative w-full h-44 overflow-hidden bg-[#06110C]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06110C]/90 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#06110C]/90 border border-white/10 text-[#EDEDED] backdrop-blur-md">
                {item.category}
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#06110C]/90 border border-white/10 text-[#F59E0B] backdrop-blur-md font-bold">
                <Star className="h-3 w-3 fill-[#F59E0B]" />
                <span>{item.rating}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-base font-bold text-[#EDEDED] group-hover:text-[#A31C1B] transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed mb-4">
                  {item.highlight}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#A31C1B]" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="h-3 w-3 text-[#A31C1B]" />
                    {item.slices} Slices
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/lab?module=${item.id}`}
                    onClick={() => sound.playClick()}
                    className="w-full py-2 rounded-xl bg-[#A31C1B]/15 border border-[#A31C1B]/35 hover:bg-[#A31C1B] hover:text-white text-[#EDEDED] text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Launch in 3D</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
