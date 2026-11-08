"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { RotatingText } from "@/components/ui/rotating-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import { sound } from "@/lib/audio";

export function HeroSection({
  onCatalogClick,
}: {
  onCatalogClick?: () => void;
}) {
  return (
    <section className="min-h-[88vh] pt-24 pb-16 px-4 sm:px-6 relative bg-[#171717] overflow-hidden">
      {/* Subtle Technical Grid */}
      <div className="absolute inset-0 editorial-grid opacity-50 pointer-events-none" />

      {/* Atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#A31C1B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center pt-10 sm:pt-14">
        {/* Hero Title with Rotating Discipline Keywords */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#EDEDED] leading-[1.12] max-w-4xl text-balance"
        >
          Deconstruct the Physical World in{" "}
          <span className="block mt-2 sm:mt-3">
            Interactive{" "}
            <span className="text-[#A31C1B] underline decoration-[#A31C1B]/40 decoration-wavy underline-offset-8">
              <RotatingText
                texts={[
                  "Cardiovascular Anatomy",
                  "Planetary Mechanics",
                  "Quantum Probability",
                  "Robotic Kinematics",
                  "Anatomical Dissection",
                ]}
                rotationInterval={2800}
              />
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-2xl font-normal leading-relaxed text-pretty"
        >
          Step beyond static diagrams. Manipulate anatomical chambers, orbit calibrated Keplerian celestial systems, and inspect quantum orbitals with responsive physical equations in your browser.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
        >
          <Link href="/lab" onClick={() => sound.playClick()}>
            <button className="text-sm md:text-base py-3 px-7 rounded-lg bg-[#A31C1B] hover:bg-[#8B1817] text-white font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(163,28,27,0.4)] hover:shadow-[0_0_25px_rgba(163,28,27,0.6)] transition-all cursor-pointer active:scale-95">
              <span>Launch 3D Laboratory</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </Link>

          <Link
            href="/curriculum"
            onClick={() => {
              sound.playClick();
              onCatalogClick?.();
            }}
          >
            <button className="text-sm md:text-base py-3 px-6 rounded-lg bg-[#06110C] hover:bg-[#171717] border border-white/10 text-[#EDEDED] font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:border-[#A31C1B]/40 active:scale-95">
              <BookOpen className="h-4 w-4 text-[#A31C1B]" />
              <span>Browse Curriculum</span>
            </button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-14 sm:mt-16 w-full max-w-3xl pt-8 border-t border-white/10"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-[#EDEDED] font-mono flex items-center">
              <NumberTicker value={60} />
              <span className="text-[#A31C1B] ml-1">FPS</span>
            </span>
            <span className="text-xs font-mono text-[#9CA3AF] mt-1 uppercase tracking-wider">
              Native Framerate
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-[#EDEDED] font-mono flex items-center">
              <NumberTicker value={4} />
              <span className="text-[#A31C1B] ml-0.5">Core</span>
            </span>
            <span className="text-xs font-mono text-[#9CA3AF] mt-1 uppercase tracking-wider">
              STEM Disciplines
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-[#EDEDED] font-mono flex items-center">
              <NumberTicker value={8} />
              <span className="text-[#A31C1B] ml-0.5">Bodies</span>
            </span>
            <span className="text-xs font-mono text-[#9CA3AF] mt-1 uppercase tracking-wider">
              Orbital Mechanics
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-[#EDEDED] font-mono flex items-center">
              <NumberTicker value={100} />
              <span className="text-[#A31C1B] ml-0.5">%</span>
            </span>
            <span className="text-xs font-mono text-[#9CA3AF] mt-1 uppercase tracking-wider">
              Zero Plugin Install
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
