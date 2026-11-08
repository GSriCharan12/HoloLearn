"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Globe,
  Atom,
  Cpu,
  Layers,
  Sparkles,
  Activity,
  Sliders,
  HelpCircle,
  Eye,
  ChevronRight,
  Flame,
  Navigation,
} from "lucide-react";
import { HoloViewer } from "@/components/canvas/HoloViewer";
import { HeartScene, HEART_HOTSPOTS, HeartHotspot } from "@/components/canvas/HeartScene";
import { SpaceScene, PLANETS, PlanetData } from "@/components/canvas/SpaceScene";
import { QuantumScene } from "@/components/canvas/QuantumScene";
import { RoboticsScene } from "@/components/canvas/RoboticsScene";
import { AnimatedTabs } from "@/components/ui/tabs";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Dialog } from "@/components/ui/dialog";
import { KnowledgeChallenge } from "@/components/lab/KnowledgeChallenge";
import { Tooltip } from "@/components/ui/tooltip";
import { ECGMonitor } from "@/components/lab/ECGMonitor";
import { LessonTimeline, LessonStep } from "@/components/lab/LessonTimeline";
import { sound } from "@/lib/audio";

export type SubjectModule = "heart" | "space" | "quantum" | "robotics";

const MODULES = [
  {
    id: "heart" as SubjectModule,
    title: "Cardiovascular Anatomy",
    subtitle: "The Beating Human Heart & Valves",
    icon: <Heart className="h-4 w-4 text-[#A31C1B]" />,
    color: "#A31C1B",
    tag: "BIOLOGY / MEDICINE",
  },
  {
    id: "space" as SubjectModule,
    title: "Planetary Mechanics",
    subtitle: "Solar System & Earth's Deep Geosphere",
    icon: <Globe className="h-4 w-4 text-[#38BDF8]" />,
    color: "#38BDF8",
    tag: "ASTROPHYSICS",
  },
  {
    id: "quantum" as SubjectModule,
    title: "Atomic & Molecular Physics",
    subtitle: "Bohr Transitions & Electron Orbitals",
    icon: <Atom className="h-4 w-4 text-[#A78BFA]" />,
    color: "#A78BFA",
    tag: "QUANTUM CHEMISTRY",
  },
  {
    id: "robotics" as SubjectModule,
    title: "Kinematic Robotics",
    subtitle: "6-DOF Actuation & Stress FEA Analysis",
    icon: <Cpu className="h-4 w-4 text-[#F59E0B]" />,
    color: "#F59E0B",
    tag: "MECHATRONICS",
  },
];

export function LearningStudio({
  initialModule = "heart",
}: {
  initialModule?: SubjectModule;
}) {
  const [activeModule, setActiveModule] = useState<SubjectModule>(initialModule);
  const [prevInitialModule, setPrevInitialModule] = useState(initialModule);
  if (initialModule !== prevInitialModule) {
    setPrevInitialModule(initialModule);
    setActiveModule(initialModule);
  }
  const [activeTab, setActiveTab] = useState<string>("hologram"); // hologram, xray, dissection, telemetry, quiz

  // Heart state
  const [bpm, setBpm] = useState<number>(72);
  const [heartDissection, setHeartDissection] = useState<number>(0);
  const [selectedHeartHotspot, setSelectedHeartHotspot] = useState<HeartHotspot | null>(null);

  // Space state
  const [spaceFocusMode, setSpaceFocusMode] = useState<"solar_system" | "earth_cross_section">("solar_system");
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(PLANETS[2]);
  const [timeScale, setTimeScale] = useState<number>(1);
  const [earthCrossSection, setEarthCrossSection] = useState<number>(0.5);

  // Quantum state
  const [quantumMode, setQuantumMode] = useState<"bohr_atom" | "quantum_cloud" | "dna_helix">("bohr_atom");
  const [quantumEnergyLevel, setQuantumEnergyLevel] = useState<number>(1);

  // Robotics state
  const [baseYaw, setBaseYaw] = useState<number>(20);
  const [shoulderPitch, setShoulderPitch] = useState<number>(-25);
  const [elbowPitch, setElbowPitch] = useState<number>(40);
  const [explodedArm, setExplodedArm] = useState<number>(0);
  const [stressHeatmap, setStressHeatmap] = useState<boolean>(false);

  // Quiz Modal State
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Guided Lesson Timeline toggle
  const [showGuidedTour, setShowGuidedTour] = useState(false);

  const modules = MODULES;
  const currentModule = modules.find((m) => m.id === activeModule)!;

  const handleModuleChange = (mod: SubjectModule) => {
    sound.playHologramMode();
    setActiveModule(mod);
    setActiveTab("hologram");
    if (mod === "heart") setSelectedHeartHotspot(null);
    if (mod === "space") setSelectedPlanet(PLANETS[2]);
  };

  // Adaptive Camera Framing with smooth transitions
  const cameraConfig = useMemo(() => {
    if (activeModule === "heart") {
      // Ensure the WHOLE heart organ (from inferior apex to superior aortic branches) is fully visible
      if (selectedHeartHotspot) {
        const [hx, hy] = selectedHeartHotspot.position;
        return {
          position: [hx * 0.15, 0.2 + hy * 0.1, 5.4] as [number, number, number],
          target: [hx * 0.25, 0.05 + hy * 0.15, 0] as [number, number, number],
        };
      }
      return {
        position: [0, 0.2, 5.2] as [number, number, number],
        target: [0, 0.05, 0] as [number, number, number],
      };
    }
    if (activeModule === "space") {
      if (spaceFocusMode === "solar_system") {
        if (selectedPlanet) {
          return {
            position: [selectedPlanet.distance * 0.55, 6.0, selectedPlanet.distance * 0.55 + 9.5] as [number, number, number],
            target: [selectedPlanet.distance * 0.3, 0, selectedPlanet.distance * 0.3] as [number, number, number],
          };
        }
        return {
          position: [0, 18, 30] as [number, number, number],
          target: [0, 0, 0] as [number, number, number],
        };
      } else {
        return {
          position: [0, 1.2, 6.2] as [number, number, number],
          target: [0, 0, 0] as [number, number, number],
        };
      }
    }
    if (activeModule === "quantum") {
      return {
        position: [0, 1.0, 6.0] as [number, number, number],
        target: [0, 0, 0] as [number, number, number],
      };
    }
    // robotics
    return {
      position: [0, 1.4, 5.8] as [number, number, number],
      target: [0, 0.5, 0] as [number, number, number],
    };
  }, [activeModule, selectedHeartHotspot, spaceFocusMode, selectedPlanet]);

  const tabs = [
    { id: "hologram", label: "3D Hologram", icon: <Eye className="h-3.5 w-3.5" /> },
    { id: "xray", label: "X-Ray View", icon: <Sparkles className="h-3.5 w-3.5" /> },
    { id: "dissection", label: "Dissection / Slices", icon: <Layers className="h-3.5 w-3.5" /> },
    { id: "telemetry", label: "Telemetry Diagnostics", icon: <Activity className="h-3.5 w-3.5" /> },
    { id: "quiz", label: "Knowledge Quiz", icon: <HelpCircle className="h-3.5 w-3.5" />, badge: "XP" },
  ];

  const handleTimelineStepChange = (step: LessonStep) => {
    if (activeModule === "heart") {
      setHeartDissection(step.dissectionValue);
    } else if (activeModule === "space") {
      setEarthCrossSection(step.dissectionValue);
      if (step.dissectionValue > 0.1) setSpaceFocusMode("earth_cross_section");
    } else if (activeModule === "robotics") {
      setExplodedArm(step.dissectionValue);
    }
  };

  return (
    <section id="interactive-lab" className="relative w-full max-w-7xl mx-auto px-4 py-16 scroll-mt-20">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono uppercase tracking-widest mb-3 font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#A31C1B] animate-pulse" />
            Interactive 3D Laboratory
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#EDEDED] tracking-tight text-balance">
            Immersive Learning <span className="text-[#A31C1B]">Holodeck</span>
          </h2>
          <p className="mt-2 text-[#9CA3AF] max-w-2xl text-sm md:text-base text-pretty">
            Inspect real-time procedural 3D simulations. Rotate, zoom, slice cross-sections, adjust biophysical parameters, and challenge your comprehension.
          </p>
        </div>

        {/* Guided Tour & Quiz Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              setShowGuidedTour(!showGuidedTour);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
              showGuidedTour
                ? "bg-[#A31C1B]/20 border-[#A31C1B] text-white shadow-[0_0_12px_rgba(163,28,27,0.35)] font-bold"
                : "bg-[#06110C] border-white/10 text-[#EDEDED] hover:border-[#A31C1B]"
            }`}
          >
            <Navigation className="h-4 w-4 text-[#A31C1B]" />
            {showGuidedTour ? "Hide Guided Tour" : "GSAP Guided Tour"}
          </button>

          <ShimmerButton
            onClick={() => {
              sound.playClick();
              setIsQuizOpen(true);
            }}
            className="text-xs md:text-sm py-2.5 px-5 font-semibold"
          >
            <HelpCircle className="h-4 w-4 mr-2 text-white" />
            Launch Module Challenge
          </ShimmerButton>
        </div>
      </div>

      {/* MODULE SELECTOR DOCK / PILL TABS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {modules.map((mod) => {
          const isSelected = activeModule === mod.id;
          const activeBorder =
            mod.id === "heart"
              ? "border-[#A31C1B]"
              : mod.id === "space"
              ? "border-[#38BDF8]"
              : mod.id === "quantum"
              ? "border-[#A78BFA]"
              : "border-[#F59E0B]";

          return (
            <button
              key={mod.id}
              onClick={() => handleModuleChange(mod.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? `bg-[#06110C] ${activeBorder} border-2 shadow-[0_0_15px_rgba(163,28,27,0.3)] scale-[1.01]`
                  : "bg-[#06110C]/85 border-white/10 hover:border-[#A31C1B]/50 hover:bg-[#171717]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="p-2 rounded-xl bg-[#171717] border border-white/10">
                  {mod.icon}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#9CA3AF]">
                  {mod.tag}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#EDEDED] leading-tight">{mod.title}</h4>
                <p className="text-xs text-[#9CA3AF] truncate mt-0.5">{mod.subtitle}</p>
              </div>
              {isSelected && (
                <div
                  className={`absolute bottom-0 inset-x-0 h-0.5 ${
                    mod.id === "heart"
                      ? "bg-[#A31C1B]"
                      : mod.id === "space"
                      ? "bg-[#38BDF8]"
                      : mod.id === "quantum"
                      ? "bg-[#A78BFA]"
                      : "bg-[#F59E0B]"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* GUIDED LESSON TIMELINE (GSAP-DRIVEN) */}
      <AnimatePresence>
        {showGuidedTour && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <LessonTimeline
              moduleKey={activeModule}
              onStepChange={handleTimelineStepChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WORKSPACE: VIEWPORT + CONTROLS HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D VIEWPORT (8 COLS) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* View Modes Tabs */}
          <div className="flex items-center justify-between">
            <AnimatedTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={(tabId) => {
                sound.playClick();
                if (tabId === "quiz") {
                  setIsQuizOpen(true);
                } else {
                  setActiveTab(tabId);
                }
              }}
            />
          </div>

          {/* Canvas Container */}
          <HoloViewer
            title={currentModule.title}
            category={currentModule.tag}
            lightingPreset={activeModule === "space" ? "space" : activeModule === "heart" ? "medical" : "lab"}
            cameraPosition={cameraConfig.position}
            cameraTarget={cameraConfig.target}
          >
            {activeModule === "heart" && (
              <HeartScene
                bpm={bpm}
                dissectionProgress={activeTab === "dissection" ? heartDissection : 0}
                wireframe={activeTab === "xray"}
                xray={activeTab === "xray"}
                selectedHotspot={selectedHeartHotspot}
                onSelectHotspot={(hotspot) => {
                  sound.playClick();
                  setSelectedHeartHotspot(hotspot);
                }}
                showParticles={true}
              />
            )}

            {activeModule === "space" && (
              <SpaceScene
                timeScale={timeScale}
                focusMode={spaceFocusMode}
                selectedPlanet={selectedPlanet}
                onSelectPlanet={(planet) => {
                  sound.playClick();
                  setSelectedPlanet(planet);
                }}
                crossSectionSlider={earthCrossSection}
                wireframe={activeTab === "xray"}
              />
            )}

            {activeModule === "quantum" && (
              <QuantumScene
                mode={quantumMode}
                quantumEnergyLevel={quantumEnergyLevel}
                wireframe={activeTab === "xray"}
              />
            )}

            {activeModule === "robotics" && (
              <RoboticsScene
                baseYaw={baseYaw}
                shoulderPitch={shoulderPitch}
                elbowPitch={elbowPitch}
                explodedProgress={activeTab === "dissection" ? explodedArm : 0}
                stressHeatmap={stressHeatmap || activeTab === "telemetry"}
                wireframe={activeTab === "xray"}
              />
            )}
          </HoloViewer>
        </div>

        {/* SIDEBAR PARAMETERS & TELEMETRY (4 COLS) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* DYNAMIC PARAMETERS CONTROLS */}
          <div className="rounded-2xl border border-white/10 bg-[#06110C]/90 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-sm font-bold text-[#EDEDED] flex items-center gap-2">
                <Sliders className="h-4 w-4 text-[#A31C1B]" />
                Biophysical / Kinematic Parameters
              </h3>
              <span className="text-xs font-mono text-[#A31C1B] bg-[#A31C1B]/15 px-2 py-0.5 rounded border border-[#A31C1B]/35 font-bold">
                LIVE TUNING
              </span>
            </div>

            {/* HEART CONTROLS */}
            {activeModule === "heart" && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <Tooltip content="Cardiac Output CO = HR × Stroke Volume SV. Resting normal: 60-100 BPM">
                      <span className="text-[#EDEDED] cursor-help underline decoration-dotted decoration-[#A31C1B]/50">
                        Cardiac Frequency (BPM):
                      </span>
                    </Tooltip>
                    <span className="text-[#A31C1B] font-bold">{bpm} BPM</span>
                  </div>
                  <input
                    id="cardiac-bpm-slider"
                    type="range"
                    min="45"
                    max="160"
                    value={bpm}
                    aria-label="Cardiac Frequency in Beats Per Minute"
                    aria-valuemin={45}
                    aria-valuemax={160}
                    aria-valuenow={bpm}
                    aria-valuetext={`${bpm} beats per minute`}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBpm(val);
                      sound.playHeartbeat(val);
                    }}
                    className="w-full accent-[#A31C1B] cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-[#9CA3AF] font-mono mt-1">
                    <span>Bradycardia (45)</span>
                    <span>Resting (72)</span>
                    <span>Tachycardia (160)</span>
                  </div>
                </div>

                {/* Real-Time Synchronized ECG Lead II Monitor */}
                <ECGMonitor bpm={bpm} />

                {activeTab === "dissection" && (
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <Tooltip content="Coronal dissection separating the anterior myocardium to expose mitral, tricuspid, and semilunar valves">
                        <span className="text-[#EDEDED] cursor-help underline decoration-dotted decoration-[#A31C1B]/50">
                          Dissection Plane Slice:
                        </span>
                      </Tooltip>
                      <span className="text-[#A31C1B] font-bold">{Math.round(heartDissection * 100)}%</span>
                    </div>
                    <input
                      id="heart-dissection-slider"
                      type="range"
                      min="0"
                      max="1"
                      step="0.02"
                      value={heartDissection}
                      aria-label="Coronal Dissection Plane Separation Percentage"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(heartDissection * 100)}
                      aria-valuetext={`${Math.round(heartDissection * 100)} percent separated`}
                      onChange={(e) => setHeartDissection(Number(e.target.value))}
                      className="w-full accent-[#A31C1B] cursor-pointer"
                    />
                    <p className="text-xs text-[#9CA3AF] mt-1">
                      Separates myocardium to reveal internal valve complexes and interventricular septum.
                    </p>
                  </div>
                )}

                {/* ANATOMICAL TAGS & STRUCTURES SELECTOR */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#EDEDED] font-bold flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-[#A31C1B]" />
                      Anatomical Heart Tags:
                    </span>
                    <span className="text-[11px] font-mono text-[#A31C1B] bg-[#A31C1B]/15 px-2 py-0.5 rounded border border-[#A31C1B]/35 font-bold">
                      {HEART_HOTSPOTS.length} structures
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {HEART_HOTSPOTS.map((hotspot) => {
                      const isSelected = selectedHeartHotspot?.id === hotspot.id;
                      return (
                        <button
                          key={hotspot.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedHeartHotspot(hotspot);
                          }}
                          className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-mono transition-all truncate border cursor-pointer ${
                            isSelected
                              ? "bg-[#A31C1B] text-white border-[#A31C1B] font-bold shadow-[0_0_12px_rgba(163,28,27,0.4)]"
                              : "bg-[#171717] text-[#EDEDED] border-white/10 hover:border-[#A31C1B]/50"
                          }`}
                          title={hotspot.name}
                        >
                          {hotspot.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SPACE CONTROLS */}
            {activeModule === "space" && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSpaceFocusMode("solar_system");
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                      spaceFocusMode === "solar_system"
                        ? "bg-[#38BDF8] border-[#38BDF8] text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                        : "bg-[#171717] border-white/10 text-[#9CA3AF]"
                    }`}
                  >
                    Orbits View
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSpaceFocusMode("earth_cross_section");
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                      spaceFocusMode === "earth_cross_section"
                        ? "bg-[#38BDF8] border-[#38BDF8] text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                        : "bg-[#171717] border-white/10 text-[#9CA3AF]"
                    }`}
                  >
                    Earth Geosphere
                  </button>
                </div>

                {spaceFocusMode === "solar_system" ? (
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <Tooltip content="Kepler's 3rd Law T² ∝ a³ simulated with accelerated time stepping">
                        <span className="text-[#EDEDED] cursor-help underline decoration-dotted decoration-[#38BDF8]/50">
                          Orbital Time Warp:
                        </span>
                      </Tooltip>
                      <span className="text-[#38BDF8] font-bold">{timeScale}x</span>
                    </div>
                    <input
                      id="orbital-timewarp-slider"
                      type="range"
                      min="0.2"
                      max="4"
                      step="0.2"
                      value={timeScale}
                      aria-label="Orbital Time Warp Simulation Speed Multiplier"
                      aria-valuemin={0.2}
                      aria-valuemax={4}
                      aria-valuenow={timeScale}
                      aria-valuetext={`${timeScale} times normal speed`}
                      onChange={(e) => setTimeScale(Number(e.target.value))}
                      className="w-full accent-[#38BDF8] cursor-pointer"
                    />

                    {/* 8 PLANET TARGET SELECTION BUTTONS */}
                    <div className="pt-3 mt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-[#EDEDED] font-bold flex items-center gap-1.5">
                          <Sparkles className="h-3 w-3 text-[#38BDF8]" />
                          Target Planet:
                        </span>
                        <span className="text-[11px] font-mono text-[#38BDF8] bg-[#38BDF8]/15 px-2 py-0.5 rounded border border-[#38BDF8]/35 font-bold">
                          {PLANETS.length} Major Planets
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                        {PLANETS.map((planet) => {
                          const isSelected = selectedPlanet?.id === planet.id;
                          return (
                            <button
                              key={planet.id}
                              onClick={() => {
                                sound.playClick();
                                setSelectedPlanet(planet);
                              }}
                              className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-mono transition-all truncate border cursor-pointer ${
                                isSelected
                                  ? "bg-[#38BDF8] text-slate-950 border-[#38BDF8] font-bold shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                                  : "bg-[#171717] text-[#EDEDED] border-white/10 hover:border-[#38BDF8]/50"
                              }`}
                            >
                              {planet.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <Tooltip content="Dissection reveals the 5 concentric strata of Earth's interior down to 6,378 km">
                        <span className="text-[#EDEDED] cursor-help underline decoration-dotted decoration-[#38BDF8]/50">
                          Cutaway Angle:
                        </span>
                      </Tooltip>
                      <span className="text-[#38BDF8] font-bold">{Math.round(earthCrossSection * 90)}°</span>
                    </div>
                    <input
                      id="earth-cutaway-slider"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={earthCrossSection}
                      aria-label="Earth Geosphere Internal Cutaway Angle"
                      aria-valuemin={0}
                      aria-valuemax={90}
                      aria-valuenow={Math.round(earthCrossSection * 90)}
                      aria-valuetext={`${Math.round(earthCrossSection * 90)} degrees`}
                      onChange={(e) => setEarthCrossSection(Number(e.target.value))}
                      className="w-full accent-[#38BDF8] cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {/* QUANTUM CONTROLS */}
            {activeModule === "quantum" && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setQuantumMode("bohr_atom");
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                      quantumMode === "bohr_atom"
                        ? "bg-[#A78BFA] border-[#A78BFA] text-slate-950 font-bold shadow-[0_0_12px_rgba(167,139,250,0.35)]"
                        : "bg-[#171717] border-white/10 text-[#9CA3AF]"
                    }`}
                  >
                    Bohr Atom
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setQuantumMode("quantum_cloud");
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                      quantumMode === "quantum_cloud"
                        ? "bg-[#A78BFA] border-[#A78BFA] text-slate-950 font-bold shadow-[0_0_12px_rgba(167,139,250,0.35)]"
                        : "bg-[#171717] border-white/10 text-[#9CA3AF]"
                    }`}
                  >
                    Orbitals Cloud
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setQuantumMode("dna_helix");
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                      quantumMode === "dna_helix"
                        ? "bg-[#A78BFA] border-[#A78BFA] text-slate-950 font-bold shadow-[0_0_12px_rgba(167,139,250,0.35)]"
                        : "bg-[#171717] border-white/10 text-[#9CA3AF]"
                    }`}
                  >
                    DNA Helix
                  </button>
                </div>

                {quantumMode === "bohr_atom" && (
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <Tooltip content="Quantized Bohr radii rn = n²·a₀ where a₀ = 0.529 Ångström">
                        <span className="text-[#EDEDED] cursor-help underline decoration-dotted decoration-[#A78BFA]/50">
                          Principal Quantum Level (n):
                        </span>
                      </Tooltip>
                      <span className="text-[#A78BFA] font-bold">n = {quantumEnergyLevel}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => {
                            sound.playClick();
                            setQuantumEnergyLevel(lvl);
                          }}
                          className={`py-2 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                            quantumEnergyLevel === lvl
                              ? "bg-[#A78BFA] text-slate-950 border-[#A78BFA] shadow-[0_0_12px_rgba(167,139,250,0.35)]"
                              : "bg-[#171717] border-white/10 text-[#EDEDED] hover:border-[#A78BFA]/50"
                          }`}
                        >
                          Level n={lvl}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-[#9CA3AF] mt-2">
                      Jump releases/absorbs discrete photon quanta ($ΔE = h·ν$).
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ROBOTICS CONTROLS */}
            {activeModule === "robotics" && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <Tooltip content="Azimuthal rotational angle of base turntable (-90° to +90°)">
                      <span className="text-[#EDEDED] cursor-help underline decoration-dotted decoration-[#F59E0B]/50">
                        Base Turntable Yaw:
                      </span>
                    </Tooltip>
                    <span className="text-[#F59E0B] font-bold">{baseYaw}°</span>
                  </div>
                  <input
                    id="robotics-yaw-slider"
                    type="range"
                    min="-90"
                    max="90"
                    value={baseYaw}
                    aria-label="Robotic Arm Base Turntable Yaw Angle"
                    aria-valuemin={-90}
                    aria-valuemax={90}
                    aria-valuenow={baseYaw}
                    aria-valuetext={`${baseYaw} degrees`}
                    onChange={(e) => setBaseYaw(Number(e.target.value))}
                    className="w-full accent-[#F59E0B] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <Tooltip content="Shoulder elevation pitch angle powering bicep link reach">
                      <span className="text-[#EDEDED] cursor-help underline decoration-dotted decoration-[#F59E0B]/50">
                        Shoulder Pitch:
                      </span>
                    </Tooltip>
                    <span className="text-[#F59E0B] font-bold">{shoulderPitch}°</span>
                  </div>
                  <input
                    id="robotics-shoulder-slider"
                    type="range"
                    min="-60"
                    max="45"
                    value={shoulderPitch}
                    aria-label="Robotic Arm Shoulder Pitch Elevation Angle"
                    aria-valuemin={-60}
                    aria-valuemax={45}
                    aria-valuenow={shoulderPitch}
                    aria-valuetext={`${shoulderPitch} degrees`}
                    onChange={(e) => setShoulderPitch(Number(e.target.value))}
                    className="w-full accent-[#F59E0B] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <Tooltip content="Elbow flexure pitch angle controlling forearm articulation">
                      <span className="text-[#EDEDED] cursor-help underline decoration-dotted decoration-[#F59E0B]/50">
                        Elbow Pivot:
                      </span>
                    </Tooltip>
                    <span className="text-[#F59E0B] font-bold">{elbowPitch}°</span>
                  </div>
                  <input
                    id="robotics-elbow-slider"
                    type="range"
                    min="0"
                    max="90"
                    value={elbowPitch}
                    aria-label="Robotic Arm Elbow Flexure Pitch Angle"
                    aria-valuemin={0}
                    aria-valuemax={90}
                    aria-valuenow={elbowPitch}
                    aria-valuetext={`${elbowPitch} degrees`}
                    onChange={(e) => setElbowPitch(Number(e.target.value))}
                    className="w-full accent-[#F59E0B] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <Tooltip content="Translates planetary gears and servo stator coils along kinematic normal vectors">
                      <span className="text-[#EDEDED] cursor-help underline decoration-dotted decoration-[#F59E0B]/50">
                        Exploded View Separation:
                      </span>
                    </Tooltip>
                    <span className="text-[#F59E0B] font-bold">{Math.round(explodedArm * 100)}%</span>
                  </div>
                  <input
                    id="robotics-exploded-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={explodedArm}
                    aria-label="Robotic Arm Planetary Gear Exploded View Separation"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(explodedArm * 100)}
                    aria-valuetext={`${Math.round(explodedArm * 100)} percent separated`}
                    onChange={(e) => setExplodedArm(Number(e.target.value))}
                    className="w-full accent-[#F59E0B] cursor-pointer"
                  />
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setStressHeatmap(!stressHeatmap);
                    }}
                    className={`w-full py-2 px-3 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      stressHeatmap
                        ? "bg-[#A31C1B]/20 border-[#A31C1B] text-[#ff6b6b] font-bold shadow-[0_0_12px_rgba(163,28,27,0.35)]"
                        : "bg-[#171717] border-white/10 text-[#EDEDED] hover:border-[#F59E0B]"
                    }`}
                  >
                    <Flame className="h-4 w-4" />
                    {stressHeatmap ? "Stress FEA Heatmap Active" : "Enable Stress FEA Analysis"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TELEMETRY READOUT CARD */}
          <div className="rounded-2xl border border-white/10 bg-[#06110C]/90 p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <h3 className="text-sm font-bold text-[#EDEDED] flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#A31C1B]" />
                  Target Diagnostics
                </h3>
                <span className="text-xs font-mono text-[#A31C1B] font-bold">STATUS: NOMINAL</span>
              </div>

              {activeModule === "heart" && (
                selectedHeartHotspot ? (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-wider bg-[#171717] px-2 py-0.5 rounded border border-white/10">
                          {selectedHeartHotspot.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#A31C1B] bg-[#A31C1B]/15 px-2 py-0.5 rounded border border-[#A31C1B]/35 font-bold">
                          {selectedHeartHotspot.oxygen}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#EDEDED]">{selectedHeartHotspot.name}</h4>
                      <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                        {selectedHeartHotspot.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                      <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10">
                        <span className="text-[11px] font-mono text-[#9CA3AF] block">Hemodynamic Pressure</span>
                        <span className="text-xs font-mono font-bold text-[#A31C1B]">{selectedHeartHotspot.pressure}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10">
                        <span className="text-[11px] font-mono text-[#9CA3AF] block">Blood Oxygenation</span>
                        <span className="text-xs font-mono font-bold text-[#A31C1B]">{selectedHeartHotspot.oxygen}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#06110C] border border-[#A31C1B]/35">
                      <span className="text-xs font-mono text-[#A31C1B] font-bold block mb-0.5">HEMODYNAMIC FUNCTION</span>
                      <p className="text-xs text-[#EDEDED] leading-snug">{selectedHeartHotspot.function}</p>
                    </div>

                    {selectedHeartHotspot.clinical && (
                      <div className="p-2.5 rounded-xl bg-[#171717] border border-[#F59E0B]/35">
                        <span className="text-xs font-mono text-[#F59E0B] font-bold block mb-0.5">CLINICAL CORRELATION</span>
                        <p className="text-xs text-[#EDEDED] leading-snug">{selectedHeartHotspot.clinical}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#171717] border border-dashed border-white/10 text-center space-y-2">
                    <div className="h-9 w-9 mx-auto rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 flex items-center justify-center text-[#A31C1B]">
                      <Activity className="h-4 w-4 animate-pulse" />
                    </div>
                    <h4 className="text-sm font-bold text-[#EDEDED] font-mono">Select Any Cardiac Structure</h4>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      Click directly on any myocardial chamber, coronary vessel, or heart valve in the 3D scene to inspect real-time hemodynamics, pressures, and clinical pathology.
                    </p>
                  </div>
                )
              )}

              {activeModule === "space" && (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-wider bg-[#171717] px-2 py-0.5 rounded border border-white/10">
                        {selectedPlanet?.type || "Celestial Body"}
                      </span>
                      <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/15 px-2 py-0.5 rounded border border-[#38BDF8]/35 font-bold">
                        {selectedPlanet?.moons ? `${selectedPlanet.moons} Moons` : "No Moons"}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#EDEDED]">{selectedPlanet?.name || "Solar System"}</h4>
                    <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                      {selectedPlanet?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10">
                      <span className="text-[11px] font-mono text-[#9CA3AF] block">Mass Ratio</span>
                      <span className="text-xs font-mono font-bold text-[#38BDF8]">{selectedPlanet?.mass}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10">
                      <span className="text-[11px] font-mono text-[#9CA3AF] block">Surface Gravity</span>
                      <span className="text-xs font-mono font-bold text-[#38BDF8]">{selectedPlanet?.gravity}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10">
                      <span className="text-[11px] font-mono text-[#9CA3AF] block">Orbital Period</span>
                      <span className="text-xs font-mono font-bold text-[#38BDF8]">{selectedPlanet?.orbitalPeriod}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10">
                      <span className="text-[11px] font-mono text-[#9CA3AF] block">Mean Temperature</span>
                      <span className="text-xs font-mono font-bold text-[#F59E0B]">{selectedPlanet?.temperature}</span>
                    </div>
                  </div>

                  {selectedPlanet?.atmosphere && (
                    <div className="p-2.5 rounded-xl bg-[#171717] border border-[#38BDF8]/35">
                      <span className="text-xs font-mono text-[#38BDF8] font-bold block mb-0.5">ATMOSPHERIC COMPOSITION</span>
                      <p className="text-xs text-[#EDEDED] leading-snug">{selectedPlanet.atmosphere}</p>
                    </div>
                  )}
                </div>
              )}

              {activeModule === "quantum" && (
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-[#A78BFA] font-mono block font-bold">Quantum State:</span>
                    <h4 className="text-base font-bold text-[#EDEDED]">
                      {quantumMode === "bohr_atom" ? "Hydrogen Atom (1H)" : quantumMode === "quantum_cloud" ? "Probability Density |ψ|²" : "Double Helix Deoxyribonucleic Acid"}
                    </h4>
                    <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                      {quantumMode === "bohr_atom"
                        ? "Bohr model illustrating quantized angular momentum L = n·ħ and discrete emission photons."
                        : quantumMode === "quantum_cloud"
                        ? "Wave-particle duality cloud mapping probability distribution in 3D coordinate space."
                        : "Watson-Crick antiparallel double helix stabilized by complementary purine-pyrimidine hydrogen bonds."}
                    </p>
                  </div>
                </div>
              )}

              {activeModule === "robotics" && (
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-[#F59E0B] font-mono block font-bold">Kinematic Actuator Telemetry:</span>
                    <h4 className="text-base font-bold text-[#EDEDED]">Industrial Manipulator Arm</h4>
                    <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                      Articulated joints powered by brushless DC servos with harmonic drive reduction gears delivering precision under 0.05 mm repeatability.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#171717] border border-white/10 text-xs font-mono text-[#EDEDED] space-y-1">
                    <div className="flex justify-between">
                      <span>Base Yaw:</span>
                      <span className="text-[#F59E0B] font-bold">{baseYaw}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shoulder Pitch:</span>
                      <span className="text-[#F59E0B] font-bold">{shoulderPitch}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Elbow Pivot:</span>
                      <span className="text-[#F59E0B] font-bold">{elbowPitch}°</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button */}
            <div className="pt-4 border-t border-white/10 mt-4">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsQuizOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#A31C1B] text-white hover:bg-[#8B1817] text-xs font-bold font-mono transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(163,28,27,0.35)] active:scale-95"
              >
                Test Knowledge on this Module
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ CHALLENGE DIALOG MODAL */}
      <Dialog
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        title={`${currentModule.title} — Knowledge Check`}
        description="Verify your comprehension through interactive multi-tier questions."
      >
        <KnowledgeChallenge
          moduleKey={activeModule}
          onClose={() => setIsQuizOpen(false)}
        />
      </Dialog>
    </section>
  );
}
