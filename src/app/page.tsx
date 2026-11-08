"use client";

import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { HolodeckPortal } from "@/components/sections/HolodeckPortal";
import { ProjectHighlights } from "@/components/sections/ProjectHighlights";
import { HomeCurriculumPreview } from "@/components/sections/HomeCurriculumPreview";
import { HomeArchitecturePreview } from "@/components/sections/HomeArchitecturePreview";
import { Footer } from "@/components/navigation/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#171717] text-[#EDEDED] overflow-x-hidden">
      {/* GLOBAL TOP NAVIGATION */}
      <Navbar />

      {/* HERO SECTION WITH AURORA BACKGROUND, SPOTLIGHT & STATS */}
      <HeroSection />

      {/* PROJECT OVERVIEW: PEDAGOGY, MISSION & COMPARISON MATRIX */}
      <OverviewSection />

      {/* HOLODECK GATEWAY: SCROLL MEDIA EXPANSION HERO */}
      <HolodeckPortal />

      {/* PROJECT HIGHLIGHTS & CORE PLATFORM CAPABILITIES */}
      <ProjectHighlights />

      {/* CURRICULUM HIGHLIGHTS: 4 FLAGSHIP STEM MODULES PREVIEW */}
      <HomeCurriculumPreview />

      {/* PLATFORM ARCHITECTURE TEASER & SUBSYSTEM BENCHMARKS */}
      <HomeArchitecturePreview />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
