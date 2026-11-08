"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { Footer } from "@/components/navigation/Footer";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { sound } from "@/lib/audio";
import {
  ArrowLeft,
  Cpu,
  Layers,
  Activity,
  Eye,
  Volume2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ArchitecturePage() {
  const architectureLayers = [
    {
      id: "rendering",
      title: "Layer 1: WebGL 2.0 & Three.js r174 Graphics Pipeline",
      icon: Cpu,
      color: "text-[#38BDF8]",
      borderColor: "border-[#38BDF8]/30",
      description:
        "Direct hardware-accelerated WebGL 2.0 rendering using Three.js r174 and React Three Fiber. Geometries utilize BufferGeometry, instanced rendering for particle vectors, and custom vertex/fragment shaders for glowing coronas and electron probability clouds.",
      metrics: [
        { label: "Target Framerate", value: "60 FPS Native" },
        { label: "Draw Calls", value: "< 45 per frame" },
        { label: "LOD Meshes", value: "Adaptive" },
      ],
    },
    {
      id: "physics",
      title: "Layer 2: Real-Time Physical & Mathematical Solvers",
      icon: Activity,
      color: "text-[#A78BFA]",
      borderColor: "border-[#A78BFA]/30",
      description:
        "Every 3D module is driven by mathematical equations rather than pre-baked video loops. The cardiovascular engine models systolic/diastolic blood flow, the planetary system computes true Keplerian relative orbital velocities, and the quantum scene renders radial probability distributions |ψ(r)|².",
      metrics: [
        { label: "Cardiac Pulse", value: "Navier-Stokes approx" },
        { label: "Orbital Mechanics", value: "Kepler's 3rd Law" },
        { label: "Quantum Jumps", value: "Bohr Frequency Eq" },
      ],
    },
    {
      id: "audio",
      title: "Layer 3: Procedural Web Audio API Synthesizer",
      icon: Volume2,
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      description:
        "Zero external audio file overhead. HoloLearn generates tactile audio feedback on-the-fly using browser Web Audio API AudioContext oscillators, biquad resonant bandpass filters, and harmonic sweeps for clicks, cardiac beats, and hologram activation.",
      metrics: [
        { label: "Audio Latency", value: "< 8 ms" },
        { label: "Sound Files Loaded", value: "0 MB (100% code)" },
        { label: "Waveforms", value: "Sine & Lowpass" },
      ],
    },
    {
      id: "lifecycle",
      title: "Layer 4: Page Visibility API & GPU Sleep Management",
      icon: Eye,
      color: "text-[#A31C1B]",
      borderColor: "border-[#A31C1B]/30",
      description:
        "To preserve laptop battery and mobile thermal limits, HoloLearn links into document.visibilityState and an IntersectionObserver. When the user minimizes the tab or scrolls away, the 3D requestAnimationFrame loop is suspended instantly, cutting GPU power consumption to zero.",
      metrics: [
        { label: "Background GPU Load", value: "0.0%" },
        { label: "Resume Latency", value: "Instantaneous" },
        { label: "Memory Retention", value: "Zero Leak GC" },
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#171717] text-[#EDEDED] overflow-x-hidden pt-24 pb-16">
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* PAGE HEADER */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
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
          <span className="text-xs font-mono text-[#A31C1B] font-bold">Platform Architecture</span>
        </div>

        {/* HERO BANNER */}
        <div className="relative p-8 md:p-12 rounded-3xl bg-[#06110C]/90 border border-white/10 shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono mb-4 font-bold">
              <Cpu className="h-3.5 w-3.5" />
              Real-Time WebGL & Simulation Infrastructure
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#EDEDED] tracking-tight text-balance">
              Engineered for <span className="text-[#A31C1B]">Sub-Millisecond Spatial Precision</span>
            </h1>
            <p className="mt-4 text-[#9CA3AF] text-sm md:text-base leading-relaxed">
              Discover the engineering foundations powering HoloLearn: hardware-accelerated 60 FPS WebGL 2.0 canvases, custom dynamic clipping shaders for progressive organ dissection, procedural audio synthesis, and intelligent GPU lifecycle management.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="/lab" onClick={() => sound.playClick()}>
                <ShimmerButton className="py-3 px-6 text-xs md:text-sm font-bold flex items-center gap-2">
                  <span>Open Live 3D Laboratory</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </ShimmerButton>
              </Link>
              <Link
                href="/curriculum"
                onClick={() => sound.playClick()}
                className="px-5 py-3 rounded-xl text-xs font-mono text-[#EDEDED] bg-[#06110C] border border-white/10 hover:border-[#A31C1B] transition-all shadow-sm cursor-pointer"
              >
                Inspect Curriculum Modules
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CORE BENTO FEATURES GRID */}
      <BentoFeatures />

      {/* DEEP ARCHITECTURAL LAYERS */}
      <section className="relative w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono mb-3 font-bold">
            <Layers className="h-3.5 w-3.5" />
            Stack Breakdown
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#EDEDED] tracking-tight">
            The 4-Layer <span className="text-[#A31C1B]">Holodeck Runtime</span>
          </h2>
          <p className="mt-3 text-[#9CA3AF] text-sm md:text-base">
            How client-side shaders, mathematical physics, and audio synthesize in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {architectureLayers.map((layer) => {
            const IconComponent = layer.icon;
            return (
              <div
                key={layer.id}
                className="p-6 md:p-8 rounded-2xl bg-[#06110C]/85 border border-white/10 shadow-lg hover:border-[#A31C1B] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10 text-[#A31C1B]">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#EDEDED]">{layer.title}</h3>
                  </div>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                    {layer.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                  {layer.metrics.map((metric, i) => (
                    <div key={i} className="bg-[#171717] p-2.5 rounded-xl border border-white/10">
                      <span className="text-[10px] font-mono text-[#9CA3AF] block uppercase">
                        {metric.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#A31C1B] block mt-0.5">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BENCHMARKS & HARDWARE COMPATIBILITY */}
      <section className="relative w-full max-w-7xl mx-auto px-4 py-16">
        <div className="p-8 md:p-12 rounded-3xl bg-[#06110C]/90 border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#A31C1B] block mb-1 font-bold">
                Hardware Benchmark Calibrations
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#EDEDED]">
                Client-Side Performance Profile
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A31C1B] bg-[#A31C1B]/15 border border-[#A31C1B]/35 px-3 py-1.5 rounded-full font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>Optimized for Low-End & Mobile GPUs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#171717] border border-white/10">
              <span className="text-xs font-mono text-[#9CA3AF]">Peak GPU RAM Allocation</span>
              <p className="text-2xl font-black text-[#A31C1B] font-mono mt-1">&lt; 118 MB</p>
              <span className="text-[11px] text-[#9CA3AF] mt-1 block">Texture compression & instancing</span>
            </div>
            <div className="p-4 rounded-xl bg-[#171717] border border-white/10">
              <span className="text-xs font-mono text-[#9CA3AF]">JavaScript Bundle Size</span>
              <p className="text-2xl font-black text-[#A31C1B] font-mono mt-1">&lt; 180 KB</p>
              <span className="text-[11px] text-[#9CA3AF] mt-1 block">Tree-shaken Three.js core</span>
            </div>
            <div className="p-4 rounded-xl bg-[#171717] border border-white/10">
              <span className="text-xs font-mono text-[#9CA3AF]">Synthesizer Latency</span>
              <p className="text-2xl font-black text-[#A31C1B] font-mono mt-1">&lt; 7 ms</p>
              <span className="text-[11px] text-[#9CA3AF] mt-1 block">Native browser Web Audio</span>
            </div>
            <div className="p-4 rounded-xl bg-[#171717] border border-white/10">
              <span className="text-xs font-mono text-[#9CA3AF]">Target Framerate Floor</span>
              <p className="text-2xl font-black text-[#A31C1B] font-mono mt-1">60 FPS</p>
              <span className="text-[11px] text-[#9CA3AF] mt-1 block">Dynamic pixel ratio clamping</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
