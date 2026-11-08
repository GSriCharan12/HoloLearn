"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Layers,
  Volume2,
  Eye,
  Award,
  ArrowRight,
  Cpu,
  Sparkles,
} from "lucide-react";
import { sound } from "@/lib/audio";

export function ProjectHighlights() {
  const highlights = [
    {
      id: "fps",
      title: "60 FPS WebGL 2.0 Engine",
      category: "Performance",
      description:
        "Engineered with Three.js r174, React Three Fiber, and custom vertex shaders. Geometries use instanced mesh rendering and buffer attributes for buttery-smooth 60 FPS across desktop and mobile devices.",
      icon: Cpu,
      stat: "60 FPS",
      statLabel: "Locked framerate",
    },
    {
      id: "dissection",
      title: "Dynamic Cross-Section Dissection",
      category: "Interaction",
      description:
        "Manipulate interactive clipping planes in real-time. Peel away human myocardium tissue, segment Earth's core down to the 5,400°C crystalline boundary, or explode robotic joint actuators.",
      icon: Layers,
      stat: "24+ Slices",
      statLabel: "Interactive layers",
    },
    {
      id: "audio",
      title: "Procedural Web Audio API Synthesizer",
      category: "Acoustics",
      description:
        "Zero external audio MP3 files or network lag. Every systolic heartbeat, hologram activation, and mechanical click is synthesized mathematically on the CPU via browser AudioContext oscillators.",
      icon: Volume2,
      stat: "< 7 ms",
      statLabel: "Audio latency",
    },
    {
      id: "battery",
      title: "Intelligent GPU Hibernation",
      category: "Battery & Thermal",
      description:
        "Leverages the Page Visibility API and IntersectionObserver to automatically pause requestAnimationFrame loops when tabs minimize or scroll away, eliminating background GPU consumption.",
      icon: Eye,
      stat: "0.0%",
      statLabel: "Idle GPU drain",
    },
    {
      id: "recall",
      title: "Active-Recall In-Scene Quizzes",
      category: "Pedagogy",
      description:
        "Embedded knowledge evaluation system evaluates spatial comprehension. Students inspect 3D markers and answer active-recall questions with immediate clinical and physical feedback.",
      icon: Award,
      stat: "100%",
      statLabel: "Interactive testing",
    },
    {
      id: "design",
      title: "High-Tech Laboratory Design System",
      category: "Aesthetics",
      description:
        "Crafted for intense scientific focus and clarity. Charcoal black and deep forest green substrates accented by crisp crimson red active controls and subtle atmospheric glow.",
      icon: Sparkles,
      stat: "3 Prime Tokens",
      statLabel: "Color hierarchy",
    },
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-20">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono uppercase tracking-widest mb-3 font-semibold">
          <Zap className="h-3.5 w-3.5" />
          Key Features & Highlights
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#EDEDED] tracking-tight text-balance">
          Groundbreaking Capabilities Built for <span className="text-[#A31C1B]">Serious Science</span>
        </h2>
        <p className="mt-3 text-[#9CA3AF] text-sm md:text-base leading-relaxed">
          From procedural audio synthesis to hardware-accelerated clipping shaders, every subsystem is engineered for maximum performance and educational clarity.
        </p>
      </div>

      {/* HIGHLIGHTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-6 md:p-7 rounded-2xl bg-[#06110C]/80 border border-white/10 shadow-lg hover:shadow-[0_4px_25px_rgba(163,28,27,0.25)] hover:border-[#A31C1B] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF] bg-[#171717] px-2.5 py-0.5 rounded-full border border-white/10">
                    {item.category}
                  </span>
                  <div className="p-2 rounded-xl bg-[#171717] border border-white/10 text-[#A31C1B] group-hover:scale-105 group-hover:border-[#A31C1B] transition-all">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#EDEDED] mb-2.5 group-hover:text-[#A31C1B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xl font-mono font-black text-[#A31C1B] block">
                    {item.stat}
                  </span>
                  <span className="text-[10px] font-mono text-[#9CA3AF] uppercase">
                    {item.statLabel}
                  </span>
                </div>
                <Link
                  href="/architecture"
                  onClick={() => sound.playClick()}
                  className="text-xs font-mono text-[#9CA3AF] group-hover:text-[#A31C1B] flex items-center gap-1 transition-colors"
                >
                  <span>Specs</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
