"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Play, Pause, RotateCcw, CheckCircle2, Navigation } from "lucide-react";
import { sound } from "@/lib/audio";

export interface LessonStep {
  step: number;
  title: string;
  focusTarget: string;
  telemetry: string;
  dissectionValue: number;
  instruction: string;
}

export const LESSON_STEPS: Record<string, LessonStep[]> = {
  heart: [
    {
      step: 1,
      title: "Cardiac Exterior & Coronary Perfusion",
      focusTarget: "Coronary Arteries",
      telemetry: "Surface perfusion pressure: 80 mmHg",
      dissectionValue: 0,
      instruction: "Observe the external epicardium and the branching coronary vessels supplying oxygenated blood to the cardiac muscle.",
    },
    {
      step: 2,
      title: "Myocardial Wall Cross-Section",
      focusTarget: "Left Ventricle",
      telemetry: "Myocardial thickness: 12 mm (Systemic)",
      dissectionValue: 0.35,
      instruction: "The dissection plane separates the thick left ventricular wall, revealing the muscular architecture required to sustain systemic arterial pressures.",
    },
    {
      step: 3,
      title: "Atrioventricular Valvular Flow",
      focusTarget: "Mitral & Tricuspid Valves",
      telemetry: "Differential pressure: 110 mmHg",
      dissectionValue: 0.7,
      instruction: "Internal inspection reveals the fibrous valve rings, leaflets, and chordae tendineae preventing systolic regurgitation into the atria.",
    },
    {
      step: 4,
      title: "Systolic Outflow & Arterial Ejection",
      focusTarget: "Aortic Semilunar Valve",
      telemetry: "Peak velocity: 1.3 m/s",
      dissectionValue: 1.0,
      instruction: "Follow the oxygen-rich blood stream under peak systolic contraction as it surges through the ascending aorta into systemic circulation.",
    },
  ],
  space: [
    {
      step: 1,
      title: "Keplerian Heliocentric Dynamics",
      focusTarget: "Planetary Orbits",
      telemetry: "Solar gravitational parameter: 1.327 × 10²⁰ m³/s²",
      dissectionValue: 0,
      instruction: "Examine the elliptical orbits of terrestrial planets and gas giants governed by Kepler's laws of planetary motion.",
    },
    {
      step: 2,
      title: "Terrestrial Lithosphere & Crust",
      focusTarget: "Crustal Plates",
      telemetry: "Depth: 0 - 70 km | Density: 2.7 g/cm³",
      dissectionValue: 0.3,
      instruction: "Earth's brittle silicate crust forms the rigid tectonic plates that drift over geological timescales.",
    },
    {
      step: 3,
      title: "Mantle Convection & Asthenosphere",
      focusTarget: "Lower Mantle",
      telemetry: "Temperature: 1,000 - 3,000 °C",
      dissectionValue: 0.65,
      instruction: "Convective heat transfer within ductile peridotite drives seafloor spreading and volcanic volcanism.",
    },
    {
      step: 4,
      title: "The Geomagnetic Dynamo Core",
      focusTarget: "Outer Liquid & Solid Core",
      telemetry: "Geomagnetic field: 25 - 65 μT",
      dissectionValue: 1.0,
      instruction: "Turbulent helical convection of molten iron-nickel generates Earth's magnetic dipole shield against cosmic radiation.",
    },
  ],
  quantum: [
    {
      step: 1,
      title: "Ground State Orbital (n=1)",
      focusTarget: "1s Hydrogen Electron",
      telemetry: "Energy: -13.6 eV | Radius: 0.529 Å",
      dissectionValue: 0,
      instruction: "The electron occupies the lowest energy Bohr orbital with quantized angular momentum L = ħ.",
    },
    {
      step: 2,
      title: "Photon Absorption & Quantum Jump",
      focusTarget: "Energy Transition",
      telemetry: "Photon energy: 10.2 eV (Lyman-α)",
      dissectionValue: 0.5,
      instruction: "An incident photon transfers quantized energy, promoting the electron instantaneously from ground state n=1 to excited state n=2.",
    },
    {
      step: 3,
      title: "Spectral Line Emission (Balmer series)",
      focusTarget: "Emitted Wavepacket",
      telemetry: "Wavelength λ: 656.3 nm (H-alpha Red)",
      dissectionValue: 1.0,
      instruction: "Spontaneous radiative decay back to lower states releases a photon of exact spectral wavelength visible in optical spectrometers.",
    },
  ],
  robotics: [
    {
      step: 1,
      title: "Zero Kinematic Pose",
      focusTarget: "Base & Shoulder",
      telemetry: "Joint angles: [0°, 0°, 0°]",
      dissectionValue: 0,
      instruction: "The robotic arm rests in its home reference coordinate frame with all harmonic drive servos calibrated.",
    },
    {
      step: 2,
      title: "Planetary Gearbox Exploded View",
      focusTarget: "Actuator Stator",
      telemetry: "Gear reduction ratio: 100:1",
      dissectionValue: 0.5,
      instruction: "Separation exposes the cycloidal gear disk and brushless DC stator coils providing high torque in compact volumes.",
    },
    {
      step: 3,
      title: "Finite Element Stress Concentration",
      focusTarget: "Elbow Pivot Joint",
      telemetry: "Von Mises Stress: 240 MPa (Peak)",
      dissectionValue: 1.0,
      instruction: "Thermal stress distribution reveals highest shear loads localized at the aluminum-titanium elbow bracket.",
    },
  ],
};

interface LessonTimelineProps {
  moduleKey: string;
  onStepChange?: (step: LessonStep) => void;
}

export function LessonTimeline({
  moduleKey = "heart",
  onStepChange,
}: LessonTimelineProps) {
  const steps = LESSON_STEPS[moduleKey] || LESSON_STEPS["heart"];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const activeStep = steps[currentStepIndex];

  // Initialize GSAP Timeline for the step progression
  useEffect(() => {
    if (!indicatorRef.current || !progressTrackRef.current) return;

    // Reset any previous timeline
    timelineRef.current?.kill();

    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        if (!timelineRef.current) return;
        const prog = timelineRef.current.progress();
        const stepIdx = Math.min(
          Math.floor(prog * steps.length),
          steps.length - 1
        );
        setCurrentStepIndex(stepIdx);
        onStepChange?.(steps[stepIdx]);
      },
      onComplete: () => {
        setIsPlaying(false);
        sound.playSuccess();
      },
    });

    // Animate progress indicator across track
    tl.to(indicatorRef.current, {
      width: "100%",
      duration: steps.length * 6, // 6 seconds per guided step
      ease: "none",
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [steps, moduleKey, onStepChange]);

  const togglePlay = () => {
    sound.playClick();
    if (!timelineRef.current) return;

    if (isPlaying) {
      timelineRef.current.pause();
      setIsPlaying(false);
    } else {
      if (timelineRef.current.progress() >= 1) {
        timelineRef.current.restart();
      } else {
        timelineRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  const jumpToStep = (index: number) => {
    sound.playClick();
    if (!timelineRef.current) return;

    setCurrentStepIndex(index);
    onStepChange?.(steps[index]);
    const targetProgress = index / (steps.length - 1);
    timelineRef.current.progress(targetProgress);
    if (!isPlaying) {
      timelineRef.current.pause();
    }
  };

  const handleReset = () => {
    sound.playClick();
    if (!timelineRef.current) return;
    timelineRef.current.restart();
    timelineRef.current.pause();
    setIsPlaying(false);
    setCurrentStepIndex(0);
    onStepChange?.(steps[0]);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#06110C]/90 p-5 shadow-xl">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-[#171717] border border-white/10 flex items-center justify-center text-[#A31C1B]">
            <Navigation className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#EDEDED] flex items-center gap-2">
              Guided Interactive Lesson (GSAP Engine)
            </h4>
            <span className="text-xs font-mono text-[#A31C1B]">
              Step {currentStepIndex + 1} of {steps.length}: {activeStep.title}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              isPlaying
                ? "bg-[#A31C1B]/20 border border-[#A31C1B] text-white"
                : "bg-[#A31C1B] text-white hover:bg-[#8B1817] shadow-[0_0_15px_rgba(163,28,27,0.35)]"
            }`}
            aria-label={isPlaying ? "Pause lesson" : "Play guided lesson"}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isPlaying ? "Pause" : "Auto-Play Tour"}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-[#171717] border border-white/10 text-[#9CA3AF] hover:text-[#EDEDED] transition-colors cursor-pointer"
            title="Reset Lesson Tour"
            aria-label="Reset Lesson"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* GSAP PROGRESS TIMELINE BAR */}
      <div
        ref={progressTrackRef}
        className="relative h-2 w-full bg-[#171717] rounded-full overflow-hidden border border-white/10 mb-4 cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const fraction = Math.max(0, Math.min(1, clickX / rect.width));
          const targetStep = Math.min(
            Math.floor(fraction * steps.length),
            steps.length - 1
          );
          jumpToStep(targetStep);
        }}
      >
        <div
          ref={indicatorRef}
          className="h-full w-0 bg-gradient-to-r from-[#A31C1B] to-[#7A1413]"
        />
      </div>

      {/* STEP PILLS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {steps.map((st, i) => {
          const isSelected = i === currentStepIndex;
          return (
            <button
              key={st.step}
              onClick={() => jumpToStep(i)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#06110C] border-2 border-[#A31C1B] text-[#EDEDED] shadow-[0_0_12px_rgba(163,28,27,0.35)]"
                  : "bg-[#171717] border border-white/10 text-[#9CA3AF] hover:border-[#A31C1B]/50 hover:text-[#EDEDED]"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className={isSelected ? "text-[#A31C1B] font-bold" : "text-[#9CA3AF]"}>
                  Stage 0{st.step}
                </span>
                {isSelected && <CheckCircle2 className="h-3 w-3 text-[#A31C1B]" />}
              </div>
              <p className="text-xs font-semibold text-[#EDEDED] truncate leading-tight">
                {st.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* ACTIVE STEP SCIENTIFIC EXPLANATION */}
      <div className="p-3.5 rounded-xl bg-[#171717] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <span className="text-xs font-mono text-[#A31C1B] uppercase tracking-wider block font-bold">
            Focus: {activeStep.focusTarget}
          </span>
          <p className="text-[#EDEDED] leading-relaxed max-w-2xl">
            {activeStep.instruction}
          </p>
        </div>
        <div className="px-3 py-2 rounded-lg bg-[#06110C] border border-white/10 text-right shrink-0">
          <span className="text-[10px] font-mono text-[#9CA3AF] block uppercase">Real-Time Reading</span>
          <span className="font-mono font-bold text-[#A31C1B] text-xs">{activeStep.telemetry}</span>
        </div>
      </div>
    </div>
  );
}
