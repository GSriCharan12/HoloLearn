"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Activity,
  CheckCircle2,
  XCircle,
  Radio,
} from "lucide-react";
import { sound } from "@/lib/audio";

export function OverviewSection() {
  const comparisonItems = [
    {
      label: "Model Interaction",
      traditional: "Static 2D textbook diagrams or passive non-interactive video loops",
      hololearn: "Full 360° orbit, zoom, pan, and real-time physical cross-section slicing",
    },
    {
      label: "Scientific Foundation",
      traditional: "Approximated illustrations without underlying mathematical rigor",
      hololearn: "Calibrated Keplerian orbital velocities, physiological pulses, Bohr transitions",
    },
    {
      label: "Cognitive Retention",
      traditional: "Passive reading with typical < 25% 30-day retention decay curve",
      hololearn: "Active tactile manipulation backed by integrated spatial recall challenges",
    },
    {
      label: "Runtime Environment",
      traditional: "Proprietary heavy VR headsets or clunky desktop software installers",
      hololearn: "Pure zero-install browser WebGL 2.0 delivering 60 FPS across devices",
    },
  ];

  const pillars = [
    {
      title: "Tactile Dissection",
      desc: "Progressive cutaway planes allow learners to separate organic myocardial chambers, planetary strata, and articulated robotic joints.",
      icon: Layers,
      color: "text-[#A31C1B]",
      bg: "bg-[#A31C1B]/15",
      border: "border-[#A31C1B]/30",
    },
    {
      title: "Physical Calibration",
      desc: "Simulations calculate relative gravitational velocities, hemodynamic gradients, and quantum orbital clouds dynamically.",
      icon: Activity,
      color: "text-[#38BDF8]",
      bg: "bg-[#38BDF8]/15",
      border: "border-[#38BDF8]/30",
    },
    {
      title: "Spatial Audio Synthesis",
      desc: "Zero-latency auditory biofeedback synthesized mathematically through the Web Audio API without asset delay.",
      icon: Radio,
      color: "text-[#A78BFA]",
      bg: "bg-[#A78BFA]/15",
      border: "border-[#A78BFA]/30",
    },
  ];

  return (
    <section id="overview" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-[#EDEDED] tracking-tight text-balance">
          Transcending Flat Textbooks with <span className="text-[#A31C1B]">Spatial Cognition</span>
        </h2>
        <p className="mt-4 text-[#9CA3AF] text-sm md:text-base leading-relaxed text-pretty">
          HoloLearn bridges the cognitive gap between abstract scientific theory and tangible physical intuition. By rendering living, mathematical 3D structures directly in the browser, students gain direct agency over the laws of nature.
        </p>
      </div>

      {/* 3 CORE PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div
              key={i}
              className="p-7 rounded-2xl bg-[#06110C]/80 border border-white/10 shadow-lg hover:border-[#A31C1B]/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className={`p-3 rounded-xl ${pillar.bg} ${pillar.border} border w-fit mb-5`}>
                  <Icon className={`h-6 w-6 ${pillar.color}`} />
                </div>
                <h3 className="text-lg font-bold text-[#EDEDED] mb-2">{pillar.title}</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMPARISON MATRIX: TRADITIONAL VS HOLOLEARN */}
      <div className="p-8 md:p-10 rounded-2xl bg-[#06110C]/80 border border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#A31C1B] font-semibold block mb-1">
              Pedagogical Paradigm Comparison
            </span>
            <h3 className="text-2xl font-bold text-[#EDEDED]">
              Why Spatial 3D Enhances Comprehension
            </h3>
          </div>
          <Link
            href="/lab"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A31C1B] hover:text-[#ff6b6b] font-semibold transition-colors"
          >
            <span>Experience it live in 3D</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {comparisonItems.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-xl bg-[#171717]/80 border border-white/10 items-center text-xs"
            >
              <div className="md:col-span-3 font-mono font-bold text-[#EDEDED] uppercase tracking-wide">
                {item.label}
              </div>
              <div className="md:col-span-4 flex items-start gap-2 text-[#9CA3AF]">
                <XCircle className="h-4 w-4 text-[#A31C1B] shrink-0 mt-0.5" />
                <span>{item.traditional}</span>
              </div>
              <div className="md:col-span-5 flex items-start gap-2 text-[#EDEDED] bg-[#06110C] p-2.5 rounded-lg border border-[#A31C1B]/40 font-medium shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-[#A31C1B] shrink-0 mt-0.5" />
                <span>{item.hololearn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
