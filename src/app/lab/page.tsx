"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Box,
  Volume2,
  VolumeX,
  HelpCircle,
} from "lucide-react";
import { LearningStudio, SubjectModule } from "@/components/lab/LearningStudio";
import { LabDock } from "@/components/navigation/LabDock";
import { Dialog } from "@/components/ui/dialog";
import { KnowledgeChallenge } from "@/components/lab/KnowledgeChallenge";
import { sound } from "@/lib/audio";

function LabContent() {
  const searchParams = useSearchParams();
  const requestedModule = searchParams.get("module") as SubjectModule | null;
  const initialModule: SubjectModule =
    requestedModule === "space" ||
    requestedModule === "quantum" ||
    requestedModule === "robotics" ||
    requestedModule === "heart"
      ? requestedModule
      : "heart";

  const [activeModule, setActiveModule] = useState<SubjectModule>(initialModule);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) sound.playClick();
  };

  return (
    <main className="relative min-h-screen bg-[#171717] text-[#EDEDED] overflow-x-hidden pt-20 pb-32">
      {/* DEDICATED STUDIO TOP HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#06110C]/90 backdrop-blur-xl border-b border-white/10 py-3.5 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Back Navigation to Main Hero Page */}
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#171717] border border-white/10 hover:border-[#A31C1B] text-xs font-mono text-[#EDEDED] transition-all group shadow-sm cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#A31C1B] group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Return to Main Portal</span>
            <span className="sm:hidden">Exit Lab</span>
          </Link>

          {/* Central Lab Branding */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#171717] border border-white/10 flex items-center justify-center text-[#A31C1B]">
              <Box className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-tight text-[#EDEDED] flex items-center">
                HOLO<span className="text-[#A31C1B]">LEARN</span>
                <span className="ml-1.5 text-xs font-mono uppercase bg-[#A31C1B]/20 text-white px-1.5 py-0.5 rounded border border-[#A31C1B]/40 tracking-wider font-bold">
                  HOLODECK
                </span>
              </span>
            </div>
          </div>

          {/* Right Lab Controls */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-xl backdrop-blur-xl border transition-colors cursor-pointer ${
                isMuted
                  ? "bg-[#171717] border-white/10 text-[#9CA3AF]"
                  : "bg-[#A31C1B]/15 border-[#A31C1B]/40 text-[#A31C1B]"
              }`}
              title={isMuted ? "Unmute Audio (M)" : "Mute Audio (M)"}
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            {/* Quick Challenge Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsQuizModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#A31C1B] text-white hover:bg-[#8B1817] text-xs font-mono font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(163,28,27,0.35)] active:scale-95"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Active Recall Challenge</span>
              <span className="sm:hidden">Quiz</span>
            </button>
          </div>
        </div>
      </header>

      {/* CORE 3D INTERACTIVE LEARNING CANVAS & STUDIO */}
      <div className="max-w-7xl mx-auto px-4">
        <LearningStudio key={activeModule} initialModule={activeModule} />
      </div>

      {/* FLOATING NAVIGATION DOCK */}
      <LabDock
        activeModule={activeModule}
        onSelectModule={(mod) => {
          setActiveModule(mod);
          sound.playHologramMode();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* FLOATING QUICK QUIZ DIALOG */}
      <Dialog
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title="Knowledge Challenge"
        description="Verify your comprehension through active-recall challenges."
      >
        <KnowledgeChallenge
          moduleKey={activeModule}
          onClose={() => setIsQuizModalOpen(false)}
        />
      </Dialog>
    </main>
  );
}

export default function LabPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#171717] flex items-center justify-center text-[#A31C1B] font-mono text-sm">
          <div className="flex flex-col items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#A31C1B] animate-ping" />
            <span>Initializing 3D Holodeck Environment...</span>
          </div>
        </div>
      }
    >
      <LabContent />
    </Suspense>
  );
}
