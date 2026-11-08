"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";

export interface Question {
  id: string;
  module: "heart" | "space" | "quantum" | "robotics";
  prompt: string;
  hint: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: Record<string, Question[]> = {
  heart: [
    {
      id: "h1",
      module: "heart",
      prompt: "Which muscular chamber has the greatest myocardial wall thickness to overcome high systemic resistance?",
      hint: "It ejects oxygenated blood into the aorta.",
      options: ["Right Atrium", "Left Ventricle", "Right Ventricle", "Left Atrium"],
      correctIndex: 1,
      explanation: "The Left Ventricle has a myocardial wall thickness of 10-15 mm (3x thicker than the right ventricle) to generate systolic pressures around 120 mmHg against systemic vascular resistance.",
    },
    {
      id: "h2",
      module: "heart",
      prompt: "What is the primary function of the chordae tendineae connected to the mitral and tricuspid valves?",
      hint: "Think about what would happen during high-pressure ventricular systole.",
      options: [
        "To actively pump blood backward",
        "To prevent valve leaflet eversion/prolapse into the atria during systole",
        "To conduct cardiac electrical impulses from the SA node",
        "To produce oxygenated red blood cells"
      ],
      correctIndex: 1,
      explanation: "Chordae tendineae (heart strings) tether the atrioventricular valve leaflets to papillary muscles, preventing them from inverting into the atria under peak systolic pressure.",
    },
    {
      id: "h3",
      module: "heart",
      prompt: "Where does the electrical depolarization wave origin that sets the sinus rhythm of a healthy heart?",
      hint: "Located in the superior posterolateral wall of the right atrium.",
      options: ["Atrioventricular (AV) Node", "Bundle of His", "Sinoatrial (SA) Node", "Purkinje Fibers"],
      correctIndex: 2,
      explanation: "The Sinoatrial (SA) Node is the natural pacemaker of the heart, spontaneously generating action potentials at 60-100 beats per minute.",
    },
  ],
  space: [
    {
      id: "s1",
      module: "space",
      prompt: "Which geosphere layer of Earth is composed of turbulent liquid iron-nickel responsible for the geomagnetic dynamo?",
      hint: "It lies between 2,890 km and 5,150 km depth.",
      options: ["Crust", "Asthenosphere", "Outer Core", "Inner Core"],
      correctIndex: 2,
      explanation: "The Outer Liquid Core convects iron and nickel, which along with Earth's rotation generates the dipolar geomagnetic field protecting life from ionizing solar winds.",
    },
    {
      id: "s2",
      module: "space",
      prompt: "Why does the Inner Solid Core remain crystalline despite temperatures reaching 5,400 °C (as hot as the Sun's surface)?",
      hint: "Consider the overburden pressure at Earth's center.",
      options: [
        "Immense lithostatic pressure (3.6 million atmospheres) elevates its melting point above 5,400 °C",
        "It is shielded by an impermeable liquid barrier",
        "It is composed entirely of unheated carbon diamonds",
        "Endothermic nuclear reactions keep it cold"
      ],
      correctIndex: 0,
      explanation: "At 3.6 million atmospheres of pressure, the iron-nickel melting point rises higher than the actual core temperature, forcing iron into a solid hexagonal close-packed crystal lattice.",
    },
    {
      id: "s3",
      module: "space",
      prompt: "According to Kepler's Third Law (T² ∝ a³), how does an outer planet's orbital speed compare to that of Mercury?",
      hint: "As semi-major axis 'a' increases, orbital period 'T' grows much faster than circumference.",
      options: [
        "Outer planets travel substantially slower along their orbits",
        "All planets travel at the exact same orbital velocity",
        "Outer planets travel faster due to solar wind momentum",
        "Orbital velocity depends solely on planetary mass"
      ],
      correctIndex: 0,
      explanation: "Because gravitational attraction weakens with the square of distance (F = G·M·m/r²), Mercury orbits at 47.4 km/s while distant Neptune orbits at only 5.4 km/s.",
    },
  ],
  quantum: [
    {
      id: "q1",
      module: "quantum",
      prompt: "When an electron drops from energy level n=3 to n=2 in a hydrogen atom, what physical phenomenon occurs?",
      hint: "Energy must be conserved (Balmer series).",
      options: [
        "A proton is annihilated inside the nucleus",
        "A photon of discrete red light (656.3 nm wavelength) is emitted",
        "The atom becomes positively ionized into plasma",
        "The orbital angular momentum becomes zero"
      ],
      correctIndex: 1,
      explanation: "By Bohr's frequency condition ΔE = h·ν, the transition emits a photon with energy equal to 1.89 eV (656.3 nm, the classic H-alpha red line).",
    },
    {
      id: "q2",
      module: "quantum",
      prompt: "What does the probability density |ψ(r, θ, φ)|² represent in quantum mechanics?",
      hint: "Formulated by Max Born.",
      options: [
        "The exact circular velocity of the particle",
        "The probability per unit volume of finding the electron at that point in space",
        "The total electric charge of the nucleus",
        "The gravitational pull of nearby electrons"
      ],
      correctIndex: 1,
      explanation: "Born's statistical interpretation states that the square modulus of the wave function |ψ|² represents the probability density of observing the electron at coordinates (r, θ, φ).",
    },
    {
      id: "q3",
      module: "quantum",
      prompt: "In the DNA double helix, how are the complementary purine and pyrimidine base pairs stabilized across opposite strands?",
      hint: "Hydrogen bonding between A-T and G-C.",
      options: [
        "Covalent peptide bonds",
        "Specific hydrogen bonds (2 between A-T, 3 between G-C)",
        "Metallic electron sharing",
        "Nuclear strong force attraction"
      ],
      correctIndex: 1,
      explanation: "Watson-Crick base pairing relies on two hydrogen bonds between Adenine and Thymine, and three hydrogen bonds between Guanine and Cytosine, imparting thermodynamic stability to genetic encoding.",
    },
  ],
  robotics: [
    {
      id: "r1",
      module: "robotics",
      prompt: "In a 6-DOF industrial robotic arm, what do the 6 degrees of freedom correspond to?",
      hint: "Positioning in 3D plus orienting.",
      options: [
        "6 different speed gears",
        "3 translational axes (X, Y, Z) and 3 rotational orientations (Roll, Pitch, Yaw)",
        "6 backup lithium batteries",
        "6 optical laser rangefinders"
      ],
      correctIndex: 1,
      explanation: "6-DOF provides complete spatial dexterity: 3 positional degrees (X, Y, Z coordinates) and 3 rotational degrees (Roll, Pitch, Yaw angles) to position the end-effector arbitrarily in 3D space.",
    },
    {
      id: "r2",
      module: "robotics",
      prompt: "What is the mathematical problem of calculating the joint angles required to reach a designated target Cartesian coordinate called?",
      hint: "The opposite of Forward Kinematics.",
      options: [
        "Finite Element Interpolation",
        "Inverse Kinematics (IK)",
        "Pulse Width Modulation",
        "Electromagnetic Flux Damping"
      ],
      correctIndex: 1,
      explanation: "Inverse Kinematics solves for actuator joint configuration vectors θ given the desired end-effector pose matrix in operational Cartesian workspace space.",
    },
    {
      id: "r3",
      module: "robotics",
      prompt: "In finite element analysis (FEA), why is the Von Mises stress criterion applied to metallic robotic components?",
      hint: "Predicts yielding under multiaxial complex loading.",
      options: [
        "To calculate electrical resistance in servo coils",
        "To predict ductile material yielding under combined multiaxial shear and normal stresses",
        "To measure acoustic vibrations from planetary gearboxes",
        "To estimate battery thermal degradation"
      ],
      correctIndex: 1,
      explanation: "The Von Mises criterion posits that plastic yielding initiates when distortion energy density reaches the critical threshold observed under uniaxial tension, safeguarding robotic linkages from structural failure.",
    },
  ],
};

export function KnowledgeChallenge({
  moduleKey = "heart",
  onClose,
}: {
  moduleKey: string;
  onClose?: () => void;
}) {
  const questions = QUIZ_QUESTIONS[moduleKey] || QUIZ_QUESTIONS["heart"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sound.playSuccess();
      setScore((s) => s + 100);
      setStreak((s) => s + 1);
    } else {
      sound.playClick();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#A31C1B", "#38bdf8", "#a78bfa", "#f59e0b"],
      });
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsComplete(false);
  };

  return (
    <div className="w-full">
      {!isComplete ? (
        <div className="space-y-4">
          {/* Progress & Score Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-[#A31C1B] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#A31C1B]" />
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-3">
              {streak > 1 && (
                <span className="px-2 py-0.5 rounded-full bg-[#A31C1B]/20 text-white border border-[#A31C1B]/40 font-bold">
                  🔥 {streak} Streak
                </span>
              )}
              <span className="text-[#EDEDED] font-bold font-mono">{score} XP</span>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="py-2">
            <h4 className="text-base md:text-lg font-semibold text-[#EDEDED] leading-snug">
              {currentQ.prompt}
            </h4>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = "bg-[#171717] border-white/10 text-[#EDEDED] hover:border-[#A31C1B]/50 hover:bg-[#06110C]";
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-sm";
                } else if (isSelected) {
                  btnStyle = "bg-rose-950/60 border-[#A31C1B] text-rose-200 shadow-sm";
                } else {
                  btnStyle = "bg-[#171717]/40 border-white/5 text-[#9CA3AF] opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 text-sm font-medium cursor-pointer ${btnStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-lg bg-[#06110C] border border-white/10 flex items-center justify-center text-xs font-mono text-[#A31C1B] font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </span>
                  {isAnswered && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="h-5 w-5 text-[#ff6b6b] shrink-0" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3.5 rounded-xl bg-[#06110C] border border-white/10 text-xs text-[#EDEDED] space-y-1.5"
              >
                <div className="font-bold text-[#A31C1B] flex items-center gap-1.5 font-mono">
                  <HelpCircle className="h-4 w-4" />
                  Scientific Explanation:
                </div>
                <p className="leading-relaxed text-[#EDEDED]">{currentQ.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A31C1B] text-white font-bold text-sm hover:bg-[#8B1817] transition-all cursor-pointer shadow-[0_0_15px_rgba(163,28,27,0.35)] active:scale-95"
              >
                {currentIndex + 1 < questions.length ? "Next Question" : "Complete Challenge"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* CHALLENGE COMPLETE SCREEN */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6 space-y-4"
        >
          <div className="h-16 w-16 mx-auto rounded-2xl bg-[#A31C1B]/20 border border-[#A31C1B] flex items-center justify-center text-[#ff6b6b] shadow-lg">
            <Award className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-[#EDEDED]">Module Mastery Achieved!</h4>
            <p className="text-sm text-[#9CA3AF] mt-1">
              You scored <span className="text-[#A31C1B] font-bold font-mono">{score} XP</span> on the interactive assessment.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171717] text-[#EDEDED] border border-white/10 hover:bg-[#06110C] text-sm font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Challenge
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#A31C1B] text-white font-bold text-sm hover:bg-[#8B1817] transition-all cursor-pointer shadow-[0_0_15px_rgba(163,28,27,0.35)] active:scale-95"
              >
                Return to 3D Viewport
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
