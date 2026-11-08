"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Accordion } from "@/components/ui/accordion";
import { Footer } from "@/components/navigation/Footer";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { sound } from "@/lib/audio";
import {
  ArrowLeft,
  HelpCircle,
  ArrowRight,
  Search,
} from "lucide-react";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allFaqItems = [
    {
      id: "rendering",
      category: "tech",
      title: "How does HoloLearn achieve 60 FPS 3D rendering directly in the browser?",
      badge: "WEBGL 2.0",
      content: (
        <p className="leading-relaxed">
          HoloLearn is built on React Three Fiber and Three.js r174, leveraging hardware-accelerated WebGL 2.0. Geometries use instanced meshes, optimized procedural shaders, and buffer attributes with level-of-detail (LOD) handling so animations remain smooth across desktop and mobile devices without taxing the GPU.
        </p>
      ),
    },
    {
      id: "equations",
      category: "accuracy",
      title: "Are the educational simulations driven by real physical equations or pre-rendered videos?",
      badge: "CALIBRATION",
      content: (
        <p className="leading-relaxed">
          Every simulation is computed dynamically in code. The cardiovascular module computes systemic vs pulmonary pressure gradients (120/80 mmHg vs 25/10 mmHg), planetary orbits follow Keplerian laws with accurate angular velocities, quantum simulations plot the spatial radial probability cloud |ψ(r)|², and the robotic arm solves 6-DOF forward and inverse kinematics using Denavit-Hartenberg matrices.
        </p>
      ),
    },
    {
      id: "dissection",
      category: "curriculum",
      title: "Can students perform progressive anatomical dissections and cutaways?",
      badge: "DISSECTION",
      content: (
        <p className="leading-relaxed">
          Yes! Every model features progressive dissection planes. In the cardiovascular module, you can slice open the myocardium to reveal internal valves and chordae tendineae. In the planetary module, you can dissect Earth’s geosphere from crust down to the solid crystalline inner core.
        </p>
      ),
    },
    {
      id: "hardware",
      category: "tech",
      title: "What hardware, browser, or GPU is required to run the 3D Holodeck?",
      badge: "HARDWARE",
      content: (
        <p className="leading-relaxed">
          HoloLearn runs on standard modern browsers (Chrome, Firefox, Safari, Edge) that support WebGL 2.0. No discrete desktop GPU or external app installation is required; integrated Intel Iris, Apple Silicon (M1–M4), and standard mobile chipsets (Snapdragon, iOS A-series) easily maintain 60 FPS.
        </p>
      ),
    },
    {
      id: "battery",
      category: "tech",
      title: "How does HoloLearn conserve laptop battery and prevent thermal throttling?",
      badge: "OPTIMIZATION",
      content: (
        <p className="leading-relaxed">
          HoloLearn utilizes the Page Visibility API and IntersectionObserver. If you switch to another browser tab or scroll away from the active 3D canvas, the WebGL render loop immediately suspends. Background GPU utilization drops to 0.0%, preserving battery life and eliminating heat accumulation.
        </p>
      ),
    },
    {
      id: "accessibility",
      category: "pedagogy",
      title: "How does HoloLearn support accessibility, screen readers, and reduced motion?",
      badge: "A11Y",
      content: (
        <p className="leading-relaxed">
          HoloLearn respects the system <code className="text-[#A31C1B]">prefers-reduced-motion</code> media query by automatically dampening continuous rotations and disabling decorative velocity transforms. In addition, all 3D canvas controls support full keyboard navigation (Space for orbit pause, R for reset camera, Tab for focusable hotspots) and comprehensive ARIA labeling.
        </p>
      ),
    },
    {
      id: "audio",
      category: "tech",
      title: "Does the sound synthesizer require audio downloads or consume bandwidth?",
      badge: "WEB AUDIO",
      content: (
        <p className="leading-relaxed">
          No external MP3 or WAV audio assets are downloaded. All sound effects (cardiac beats, laser clicks, synthesizer sweeps) are synthesized mathematically in real-time via the browser&apos;s Web Audio API using oscillator nodes and biquad resonant filters with zero network footprint.
        </p>
      ),
    },
    {
      id: "classroom",
      category: "pedagogy",
      title: "Can teachers and universities integrate HoloLearn into STEM course syllabi?",
      badge: "ACADEMIA",
      content: (
        <p className="leading-relaxed">
          Yes. HoloLearn modules align with university undergraduate and advanced high school STEM standards (AP Biology, AP Physics C, Engineering Statics & Dynamics). Each module includes active-recall knowledge challenges with real-time feedback and diagnostic telemetry.
        </p>
      ),
    },
  ];

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "tech", name: "WebGL & Performance" },
    { id: "accuracy", name: "Scientific Rigor" },
    { id: "curriculum", name: "Interactive Dissection" },
    { id: "pedagogy", name: "Classroom & Accessibility" },
  ];

  const filteredItems = allFaqItems.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesQuery =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <main className="relative min-h-screen bg-[#171717] text-[#EDEDED] overflow-x-hidden pt-24 pb-16">
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* PAGE HEADER */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
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
          <span className="text-xs font-mono text-[#A31C1B] font-bold">Frequently Asked Questions</span>
        </div>

        {/* HERO BANNER */}
        <div className="relative p-8 md:p-10 rounded-3xl bg-[#06110C]/90 border border-white/10 shadow-xl overflow-hidden mb-8">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono mb-3 font-bold">
              <HelpCircle className="h-3.5 w-3.5" />
              Comprehensive Technical & Academic Knowledge Base
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#EDEDED] tracking-tight">
              Frequently Answered <span className="text-[#A31C1B]">Questions</span>
            </h1>
            <p className="mt-3 text-[#9CA3AF] text-sm md:text-base leading-relaxed max-w-2xl">
              Everything you need to know about our WebGL 2.0 graphics pipeline, physiological accuracy, classroom adoption, and device requirements.
            </p>
          </div>
        </div>

        {/* SEARCH & CATEGORY FILTER */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by topic (e.g. WebGL, battery, accuracy)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#06110C] border border-white/10 focus:border-[#A31C1B] focus:outline-none text-sm text-[#EDEDED] placeholder:text-[#9CA3AF] transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#A31C1B] text-white font-bold shadow-[0_0_12px_rgba(163,28,27,0.35)]"
                    : "bg-[#06110C] text-[#9CA3AF] border border-white/10 hover:border-[#A31C1B]/50 hover:text-[#EDEDED]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ACCORDION ITEMS */}
        {filteredItems.length > 0 ? (
          <Accordion items={filteredItems} />
        ) : (
          <div className="text-center py-12 p-8 rounded-2xl bg-[#06110C] border border-white/10 text-[#9CA3AF] shadow-sm">
            <HelpCircle className="h-8 w-8 mx-auto mb-2 text-[#9CA3AF]" />
            <p className="text-sm">No matching questions found for &ldquo;{searchQuery}&rdquo;.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 text-xs font-mono text-[#A31C1B] hover:underline cursor-pointer"
            >
              Reset Search Filters
            </button>
          </div>
        )}

        {/* BOTTOM QUICK ACTIONS BANNER */}
        <div className="mt-14 p-8 rounded-3xl bg-[#06110C]/90 border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#EDEDED]">Ready to test the 3D Holodeck in action?</h3>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Jump directly into the interactive 3D laboratory and explore all four STEM modules.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/lab" onClick={() => sound.playClick()}>
              <ShimmerButton className="py-2.5 px-5 text-xs font-bold flex items-center gap-1.5">
                <span>Enter 3D Lab</span>
                <ArrowRight className="h-3.5 w-3.5 text-white" />
              </ShimmerButton>
            </Link>
            <Link
              href="/architecture"
              onClick={() => sound.playClick()}
              className="px-4 py-2.5 rounded-xl text-xs font-mono text-[#EDEDED] bg-[#06110C] border border-white/10 hover:border-[#A31C1B] transition-all shadow-sm cursor-pointer"
            >
              Platform Architecture
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
