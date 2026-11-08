"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Layers,
  Activity,
  Sliders,
  CheckCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { sound } from "@/lib/audio";

export function BentoFeatures() {
  const router = useRouter();

  const handleNavigate = () => {
    sound.playClick();
    router.push("/lab");
  };

  return (
    <section id="features" className="relative w-full max-w-7xl mx-auto px-4 py-20 scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono uppercase tracking-widest mb-3 font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          Platform Architecture
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#EDEDED] tracking-tight text-balance">
          Engineered for <span className="text-[#A31C1B]">Deep Comprehension</span>
        </h2>
        <p className="mt-3 text-[#9CA3AF] text-sm md:text-base text-pretty">
          Every component combines Three.js shaders with responsive scientific telemetry to deliver tactile spatial learning.
        </p>
      </div>

      {/* REUSABLE BENTO GRID PRIMITIVE */}
      <BentoGrid>
        {/* CARD 1 (SPAN 2 COLUMNS) */}
        <BentoCard
          name="Multi-Tier Cutaway Dissection Engine"
          description="Slice through biological tissue, planetary lithospheres, or robotic chassis in real time using interactive clipping planes and procedural separation matrices."
          Icon={Layers}
          className="md:col-span-2"
          cta="Inspect Dissection System"
          onClick={handleNavigate}
        >
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
            <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10">
              <span className="text-xs font-mono text-[#A31C1B] block font-bold">CARDIOLOGY</span>
              <span className="text-xs text-[#EDEDED]">Myocardium & valves</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10">
              <span className="text-xs font-mono text-[#38BDF8] block font-bold">GEOLOGY</span>
              <span className="text-xs text-[#EDEDED]">5-Strata Core slice</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10">
              <span className="text-xs font-mono text-[#F59E0B] block font-bold">ROBOTICS</span>
              <span className="text-xs text-[#EDEDED]">Exploded actuator gears</span>
            </div>
          </div>
        </BentoCard>

        {/* CARD 2 (SPAN 1 COLUMN) */}
        <BentoCard
          name="Live Hemodynamic Telemetry"
          description="Direct readouts of chamber systolic pressures, orbital velocity vectors, and finite element stress concentrations."
          Icon={Activity}
          className="md:col-span-1"
          cta="View Diagnostic Readouts"
          onClick={handleNavigate}
        >
          <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10 font-mono text-xs text-[#EDEDED] space-y-1">
            <div className="flex justify-between">
              <span>Left Ventricle:</span>
              <span className="text-[#A31C1B] font-bold">120 mmHg</span>
            </div>
            <div className="flex justify-between">
              <span>Earth Orbit:</span>
              <span className="text-[#38BDF8] font-bold">29.78 km/s</span>
            </div>
            <div className="flex justify-between">
              <span>Actuator Peak:</span>
              <span className="text-[#F59E0B] font-bold">240 MPa</span>
            </div>
          </div>
        </BentoCard>

        {/* CARD 3 (SPAN 1 COLUMN) */}
        <BentoCard
          name="Biophysical Parameter Tuning"
          description="Control heart rate from resting to tachycardia, bend orbital time scales, and trigger discrete Bohr electron jumps."
          Icon={Sliders}
          className="md:col-span-1"
          cta="Tune Physics Parameters"
          onClick={handleNavigate}
        >
          <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10 text-xs font-mono text-[#EDEDED] flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#A31C1B]" />
            <span>Interactive 60 FPS slider controls</span>
          </div>
        </BentoCard>

        {/* CARD 4 (SPAN 2 COLUMNS) */}
        <BentoCard
          name="In-Scene Spatial Knowledge Challenges"
          description="Test cognitive retention with targeted active-recall challenges. Identify structures directly in 3D coordinate space with real-time feedback and XP rewards."
          Icon={CheckCircle}
          className="md:col-span-2"
          cta="Start Active Challenge"
          onClick={handleNavigate}
        >
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#EDEDED]">
              <CheckCircle className="h-3.5 w-3.5 text-[#A31C1B]" />
              Target Pinpoint
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#EDEDED]">
              <CheckCircle className="h-3.5 w-3.5 text-[#A31C1B]" />
              Instant Telemetry
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#EDEDED]">
              <CheckCircle className="h-3.5 w-3.5 text-[#A31C1B]" />
              Active Recall Assessment
            </span>
          </div>
        </BentoCard>
      </BentoGrid>
    </section>
  );
}
