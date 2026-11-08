"use client";

import React from "react";
import {
  Heart,
  Globe,
  Atom,
  Cpu,
  HelpCircle,
  Volume2,
  VolumeX,
} from "lucide-react";
import { FloatingDock, FloatingDockItem } from "@/components/ui/floating-dock";
import { sound } from "@/lib/audio";
import { SubjectModule } from "@/components/lab/LearningStudio";

interface LabDockProps {
  activeModule: SubjectModule;
  onSelectModule: (mod: SubjectModule) => void;
  onOpenQuiz: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export function LabDock({
  activeModule,
  onSelectModule,
  onOpenQuiz,
  isMuted = false,
  onToggleMute,
}: LabDockProps) {
  const items: FloatingDockItem[] = [
    {
      title: "Cardiology: Heart",
      icon: <Heart className="h-full w-full text-[#A31C1B]" />,
      active: activeModule === "heart",
      onClick: () => {
        sound.playHologramMode();
        onSelectModule("heart");
        const el = document.getElementById("interactive-lab");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "Space: Solar System",
      icon: <Globe className="h-full w-full text-[#38BDF8]" />,
      active: activeModule === "space",
      onClick: () => {
        sound.playHologramMode();
        onSelectModule("space");
        const el = document.getElementById("interactive-lab");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "Quantum: Atom & DNA",
      icon: <Atom className="h-full w-full text-[#A78BFA]" />,
      active: activeModule === "quantum",
      onClick: () => {
        sound.playHologramMode();
        onSelectModule("quantum");
        const el = document.getElementById("interactive-lab");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "Robotics: 6-DOF Arm",
      icon: <Cpu className="h-full w-full text-[#F59E0B]" />,
      active: activeModule === "robotics",
      onClick: () => {
        sound.playHologramMode();
        onSelectModule("robotics");
        const el = document.getElementById("interactive-lab");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "Knowledge Challenge",
      icon: <HelpCircle className="h-full w-full text-[#A31C1B]" />,
      badge: "XP",
      onClick: () => {
        sound.playClick();
        onOpenQuiz();
      },
    },
    {
      title: isMuted ? "Unmute Sound" : "Mute Sound",
      icon: isMuted ? (
        <VolumeX className="h-full w-full text-[#9CA3AF]" />
      ) : (
        <Volume2 className="h-full w-full text-[#A31C1B]" />
      ),
      onClick: () => {
        onToggleMute?.();
      },
    },
  ];

  return (
    <div className="fixed bottom-5 inset-x-0 z-30 flex justify-center pointer-events-auto">
      <FloatingDock items={items} />
    </div>
  );
}
