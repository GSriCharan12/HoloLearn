"use client";

import React from "react";
import Link from "next/link";
import { Cpu, ArrowRight, Activity, Volume2, Eye, Layers } from "lucide-react";
import { sound } from "@/lib/audio";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function HomeArchitecturePreview() {
  const subsystems = [
    {
      title: "WebGL 2.0 & Three.js r174",
      desc: "Hardware-accelerated pipeline with instanced meshes and GLSL clipping shaders.",
      metric: "60 FPS",
      icon: Cpu,
    },
    {
      title: "Real-Time Physical Solvers",
      desc: "Dynamically calculates cardiac fluid dynamics, Keplerian orbits, and Bohr energy levels.",
      metric: "Pure Math",
      icon: Activity,
    },
    {
      title: "Procedural Audio Synthesizer",
      desc: "Native Web Audio API oscillators synthesize sounds directly on the CPU without downloads.",
      metric: "< 7 ms",
      icon: Volume2,
    },
    {
      title: "GPU Battery Preservation",
      desc: "Page Visibility API hibernates render loops when tabs minimize, dropping idle load to 0%.",
      metric: "0.0% Idle",
      icon: Eye,
    },
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-20">
      <div className="p-8 md:p-12 rounded-3xl bg-[#06110C]/90 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono uppercase tracking-widest mb-3 font-semibold">
              <Layers className="h-3.5 w-3.5" />
              Platform Architecture Preview
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#EDEDED] tracking-tight">
              Engineered with <span className="text-[#A31C1B]">Zero-Compromise Precision</span>
            </h2>
            <p className="mt-3 text-[#9CA3AF] text-sm md:text-base leading-relaxed">
              Discover the 4-layer runtime powering our browser simulations: custom shaders, concurrent React 19 tree, procedural acoustics, and intelligent GPU lifecycle controls.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/architecture" onClick={() => sound.playClick()}>
              <ShimmerButton className="py-3 px-6 text-xs md:text-sm font-bold flex items-center gap-2">
                <span>Explore Full Architecture Breakdown</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </ShimmerButton>
            </Link>
          </div>
        </div>

        {/* 4 SUBSYSTEMS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subsystems.map((sub, i) => {
            const Icon = sub.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#171717] border border-white/10 hover:border-[#A31C1B] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-[#06110C] border border-white/10 text-[#A31C1B]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#A31C1B] bg-[#06110C] px-2 py-0.5 rounded border border-white/10">
                      {sub.metric}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#EDEDED] mb-1.5">{sub.title}</h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{sub.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
