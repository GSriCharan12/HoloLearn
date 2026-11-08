"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { CurriculumCatalog } from "@/components/sections/CurriculumCatalog";
import { Footer } from "@/components/navigation/Footer";
import { ArrowLeft, Sparkles, ArrowRight, Layers, Award } from "lucide-react";
import { sound } from "@/lib/audio";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function CurriculumPage() {
  const learningPillars = [
    {
      title: "Interactive Dissection",
      desc: "Multi-tier cross-section sliders peel back biological layers, planetary crusts, and mechanical assemblies.",
      icon: Layers,
    },
    {
      title: "Physical Calibration",
      desc: "Simulations compute real Navier-Stokes hemodynamics, Keplerian orbits, and Bohr energy levels.",
      icon: Sparkles,
    },
    {
      title: "Active-Recall Challenges",
      desc: "In-scene knowledge checks evaluate spatial comprehension with immediate diagnostic feedback.",
      icon: Award,
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#171717] text-[#EDEDED] overflow-x-hidden pt-24 pb-16">
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* PAGE HEADER */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#06110C] border border-white/10 hover:border-[#A31C1B] text-xs font-mono text-[#EDEDED] transition-all group cursor-pointer shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 text-[#A31C1B] group-hover:-translate-x-1 transition-transform" />
            <span>Return to Overview</span>
          </Link>
          <span className="text-xs font-mono text-[#9CA3AF]">/</span>
          <span className="text-xs font-mono text-[#A31C1B] font-bold">Interactive Curriculum Catalog</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-8 md:p-12 rounded-3xl bg-[#06110C]/90 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono mb-3 font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              Accredited STEM Learning Tracks
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#EDEDED] tracking-tight text-balance">
              Tactile 3D <span className="text-[#A31C1B]">Curriculum Syllabus</span>
            </h1>
            <p className="mt-3 text-[#9CA3AF] text-sm md:text-base leading-relaxed">
              Explore our core STEM modules calibrated with real physical equations, anatomical data, and active-recall quizzes. Every module connects to the 3D Holodeck for live manipulation.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <Link href="/lab" onClick={() => sound.playClick()}>
              <ShimmerButton className="py-3 px-6 text-xs md:text-sm font-bold flex items-center gap-2">
                <span>Enter All-In-One Lab</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </ShimmerButton>
            </Link>
          </div>
        </div>

        {/* 3 LEARNING PILLARS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {learningPillars.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#06110C]/85 border border-white/10 shadow-sm flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10 text-[#A31C1B] shrink-0">
                  <IconComponent className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#EDEDED] uppercase tracking-wider font-mono">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CURRICULUM CATALOG */}
      <CurriculumCatalog />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
