"use client";

import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { sound } from "@/lib/audio";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#06110C] py-12 px-4 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Vision */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="h-8 w-8 rounded-lg bg-[#171717] border border-white/10 flex items-center justify-center text-[#A31C1B] shadow-xs group-hover:border-[#A31C1B] transition-colors">
              <Compass className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#EDEDED] tracking-tight">
                HOLO<span className="text-[#A31C1B] ml-0.5">LEARN</span>
              </span>
              <span className="text-[10px] font-mono text-[#9CA3AF] tracking-wider uppercase">
                Scientific 3D Instrument
              </span>
            </div>
          </Link>
        </div>

        {/* Clean Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="text-[#9CA3AF] hover:text-[#A31C1B] transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/lab"
            onClick={() => sound.playClick()}
            className="text-[#9CA3AF] hover:text-[#A31C1B] transition-colors"
          >
            3D Holodeck
          </Link>
          <Link
            href="/curriculum"
            onClick={() => sound.playClick()}
            className="text-[#9CA3AF] hover:text-[#A31C1B] transition-colors"
          >
            Curriculum
          </Link>
          <Link
            href="/architecture"
            onClick={() => sound.playClick()}
            className="text-[#9CA3AF] hover:text-[#A31C1B] transition-colors"
          >
            Architecture
          </Link>
          <Link
            href="/faq"
            onClick={() => sound.playClick()}
            className="text-[#9CA3AF] hover:text-[#A31C1B] transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Copyright */}
        <div className="text-xs font-mono text-[#9CA3AF] text-center md:text-right">
          <p>© 2026 HoloLearn. Engineered for rigorous scientific education.</p>
        </div>
      </div>
    </footer>
  );
}
