"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { ScrollExpandMedia } from "@/components/ui/scroll-expansion-hero";
import { sound } from "@/lib/audio";

export function HolodeckPortal({
  onEnterLab,
}: {
  onEnterLab?: () => void;
}) {
  const [isFullscreenPortal, setIsFullscreenPortal] = useState(false);

  const toggleFullscreen = () => {
    sound.playClick();
    setIsFullscreenPortal(!isFullscreenPortal);
  };

  return (
    <section className="relative w-full py-6">
      {/* Scroll-Responsive Holodeck Media Expansion */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/holodeck-portal.jpg"
        bgImageSrc="/images/holodeck-portal.jpg"
        title="Scientific Simulation Chamber"
        date="Next-Gen 3D WebGL Learning"
        scrollToExpand="Scroll to expand laboratory gateway"
      >
        {/* TOP TELEMETRY HUD BAR */}
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#06110C]/90 border border-white/10 text-xs font-mono text-[#EDEDED] shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A31C1B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A31C1B]" />
            </span>
            <span className="font-semibold uppercase tracking-wider text-[#A31C1B]">Laboratory Gateway Active</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#06110C]/90 border border-white/10 text-xs font-mono text-[#9CA3AF] shadow-sm">
            <span className="text-[#A31C1B] font-semibold">4 STEM MODULES</span>
            <span className="text-white/20">•</span>
            <span>60 FPS HARDWARE RUNTIME</span>
          </div>
        </div>

        {/* CENTER FLOATING STEM SIMULATION CARDS */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3 my-auto w-full max-w-5xl mx-auto py-6">
          <Link
            href="/lab?module=heart"
            onClick={() => {
              sound.playClick();
              onEnterLab?.();
            }}
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center justify-between p-3 rounded-xl bg-[#06110C]/85 border border-white/10 hover:border-[#A31C1B] transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#A31C1B]/40 shrink-0 bg-[#06110C]">
                <Image
                  src="/images/card-heart.jpg"
                  alt="Cardiovascular Anatomy"
                  fill
                  sizes="44px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#EDEDED] group-hover:text-[#A31C1B] transition-colors block">
                  Cardiovascular
                </span>
                <span className="text-[11px] font-mono text-[#9CA3AF] block">
                  72 BPM Pulse
                </span>
              </div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-[#9CA3AF] group-hover:text-[#A31C1B] transition-colors mr-1" />
          </Link>

          <Link
            href="/lab?module=space"
            onClick={() => {
              sound.playClick();
              onEnterLab?.();
            }}
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center justify-between p-3 rounded-xl bg-[#06110C]/85 border border-white/10 hover:border-[#38BDF8] transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#38BDF8]/40 shrink-0 bg-[#06110C]">
                <Image
                  src="/images/card-space.jpg"
                  alt="Planetary Mechanics"
                  fill
                  sizes="44px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#EDEDED] group-hover:text-[#38BDF8] transition-colors block">
                  Astrophysics
                </span>
                <span className="text-[11px] font-mono text-[#9CA3AF] block">
                  8 Keplerian Orbits
                </span>
              </div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-[#9CA3AF] group-hover:text-[#38BDF8] transition-colors mr-1" />
          </Link>

          <Link
            href="/lab?module=quantum"
            onClick={() => {
              sound.playClick();
              onEnterLab?.();
            }}
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center justify-between p-3 rounded-xl bg-[#06110C]/85 border border-white/10 hover:border-[#A78BFA] transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#A78BFA]/40 shrink-0 bg-[#06110C]">
                <Image
                  src="/images/card-quantum.jpg"
                  alt="Quantum Mechanics"
                  fill
                  sizes="44px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#EDEDED] group-hover:text-[#A78BFA] transition-colors block">
                  Quantum Physics
                </span>
                <span className="text-[11px] font-mono text-[#9CA3AF] block">
                  Bohr Jump & DNA
                </span>
              </div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-[#9CA3AF] group-hover:text-[#A78BFA] transition-colors mr-1" />
          </Link>

          <Link
            href="/lab?module=robotics"
            onClick={() => {
              sound.playClick();
              onEnterLab?.();
            }}
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center justify-between p-3 rounded-xl bg-[#06110C]/85 border border-white/10 hover:border-[#F59E0B] transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#F59E0B]/40 shrink-0 bg-[#06110C]">
                <Image
                  src="/images/card-robotics.jpg"
                  alt="Bionic Robotics"
                  fill
                  sizes="44px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#EDEDED] group-hover:text-[#F59E0B] transition-colors block">
                  Mechatronics
                </span>
                <span className="text-[11px] font-mono text-[#9CA3AF] block">
                  6-DOF Kinematics
                </span>
              </div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-[#9CA3AF] group-hover:text-[#F59E0B] transition-colors mr-1" />
          </Link>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full pt-4">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#06110C] border border-white/10 text-[#A31C1B] text-xs font-mono mb-2.5 shadow-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#A31C1B]" />
              Physical Simulation Chamber Calibrated
            </span>
            <h4 className="text-2xl md:text-3xl font-bold text-[#EDEDED] tracking-tight">
              Tactile Agency over Real Scientific Systems
            </h4>
            <p className="mt-1.5 text-xs md:text-sm text-[#9CA3AF] leading-relaxed">
              Step into the active 3D chamber to manipulate cardiac pulses, celestial Keplerian mechanics, and quantum orbital shells.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/lab"
              onClick={() => {
                sound.playClick();
                onEnterLab?.();
              }}
            >
              <button className="text-xs md:text-sm py-2.5 px-5 rounded-lg bg-[#A31C1B] hover:bg-[#8B1817] text-white font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(163,28,27,0.35)] transition-all cursor-pointer active:scale-95">
                <span>Enter 3D Laboratory</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </button>
            </Link>

            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#06110C] border border-white/10 hover:border-[#A31C1B]/50 text-[#EDEDED] text-xs font-mono font-medium shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label="Toggle Fullscreen Portal Modal"
            >
              <Maximize2 className="h-3.5 w-3.5 text-[#9CA3AF]" />
              <span>Cinematic View</span>
            </button>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* FULLSCREEN POPUP MODAL */}
      <AnimatePresence>
        {isFullscreenPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#06110C]/95 backdrop-blur-md flex flex-col p-6 sm:p-10"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-[#EDEDED] font-bold">
                  HoloLearn Scientific Viewport Preview
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#A31C1B]/20 text-white border border-[#A31C1B]/40">
                  Full Dimension
                </span>
              </div>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-[#171717] border border-white/10 text-[#EDEDED] hover:bg-[#171717]/80 cursor-pointer"
                aria-label="Exit Fullscreen Portal"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex-1 my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#06110C] shadow-2xl">
              <Image
                src="/images/holodeck-portal.jpg"
                alt="Holodeck Chamber"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-[#9CA3AF]">
                WebGL 2.0 • Hardware-Accelerated Simulation Subsystem
              </span>
              <Link
                href="/lab"
                onClick={() => {
                  sound.playClick();
                  setIsFullscreenPortal(false);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#A31C1B] hover:bg-[#8B1817] text-white font-semibold text-xs transition-colors shadow-[0_0_15px_rgba(163,28,27,0.35)]"
              >
                Launch Active 3D Session &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
