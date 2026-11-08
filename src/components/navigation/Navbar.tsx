"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  Compass,
  ArrowRight,
} from "lucide-react";
import { sound } from "@/lib/audio";

export function Navbar({
  onNavigateCurriculum,
  onNavigateFAQ,
}: {
  onNavigateLab?: () => void;
  onNavigateCurriculum?: () => void;
  onNavigateFAQ?: () => void;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) sound.playClick();
  };

  const navLinks = [
    { name: "3D Holodeck", href: "/lab" },
    { name: "Curriculum", href: "/curriculum", action: onNavigateCurriculum },
    { name: "Architecture", href: "/architecture" },
    { name: "FAQ", href: "/faq", action: onNavigateFAQ },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#06110C]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-[#171717]/85 backdrop-blur-sm border-b border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="HoloLearn Home"
        >
          <div className="h-9 w-9 rounded-lg bg-[#06110C] border border-white/10 flex items-center justify-center text-[#A31C1B] shadow-sm group-hover:border-[#A31C1B] group-hover:shadow-[0_0_12px_rgba(163,28,27,0.35)] transition-all">
            <Compass className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[#EDEDED] flex items-center leading-none">
              HOLO<span className="text-[#A31C1B] ml-0.5">LEARN</span>
            </span>
            <span className="text-[10px] font-mono text-[#9CA3AF] tracking-wider uppercase mt-1">
              Scientific 3D Instrument
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-[#06110C] border border-white/10 px-2 py-1 rounded-full shadow-sm">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  link.action?.();
                }}
                className={`px-3.5 py-1 rounded-full text-xs transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#A31C1B] text-white font-semibold shadow-[0_0_12px_rgba(163,28,27,0.35)]"
                    : "text-[#9CA3AF] hover:text-[#EDEDED] hover:bg-[#171717]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isMuted
                ? "bg-[#06110C] border-white/10 text-[#9CA3AF] hover:text-[#EDEDED]"
                : "bg-[#06110C] border-[#A31C1B]/40 text-[#A31C1B] hover:bg-[#A31C1B]/15 hover:shadow-[0_0_10px_rgba(163,28,27,0.3)]"
            }`}
            title={isMuted ? "Unmute Audio (M)" : "Mute Audio (M)"}
            aria-label="Toggle Audio"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Launch CTA */}
          <Link href="/lab" onClick={() => sound.playClick()}>
            <button className="text-xs py-2 px-4 rounded-lg bg-[#A31C1B] hover:bg-[#8B1817] text-white font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(163,28,27,0.35)] hover:shadow-[0_0_20px_rgba(163,28,27,0.5)] cursor-pointer active:scale-95">
              <span>Enter 3D Lab</span>
              <ArrowRight className="h-3.5 w-3.5 text-white" />
            </button>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#06110C] border border-white/10 text-[#EDEDED] cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#06110C] border-b border-white/10 px-4 py-4 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  link.action?.();
                }}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#A31C1B] text-white font-medium"
                    : "text-[#9CA3AF] hover:text-[#EDEDED] hover:bg-[#171717]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10">
            <Link
              href="/lab"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#A31C1B] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(163,28,27,0.4)]"
            >
              Enter 3D Laboratory &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
