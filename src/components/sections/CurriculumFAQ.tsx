"use client";

import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function CurriculumFAQ() {
  const faqItems = [
    {
      id: "rendering",
      title: "How does HoloLearn achieve 60 FPS 3D rendering in the browser?",
      badge: "WEBGL 2.0",
      content: (
        <p className="leading-relaxed">
          HoloLearn is built on React Three Fiber and Three.js r174, leveraging hardware-accelerated WebGL 2.0. Geometries use instanced meshes, optimized procedural shaders, and buffer attributes with level-of-detail (LOD) handling so animations remain smooth across desktop and mobile devices.
        </p>
      ),
    },
    {
      id: "dissection",
      title: "Can I perform custom anatomical dissections and cutaways?",
      badge: "INTERACTION",
      content: (
        <p className="leading-relaxed">
          Yes! Every model features progressive dissection planes. In the cardiovascular module, you can slice open the myocardium to reveal internal valves and chordae tendineae. In the planetary module, you can dissect Earth’s geosphere from crust down to the solid crystalline inner core.
        </p>
      ),
    },
    {
      id: "accessibility",
      title: "How does HoloLearn support accessibility and reduced motion?",
      badge: "A11Y",
      content: (
        <p className="leading-relaxed">
          HoloLearn respects the user&apos;s <code className="text-[#A31C1B]">prefers-reduced-motion</code> system setting by dampening continuous rotations and disabling decorative velocity transforms. In addition, all 3D canvas controls support full keyboard navigation (Space for orbit pause, R for reset camera, Tab for focusable hotspots) and ARIA attributes.
        </p>
      ),
    },
    {
      id: "curriculum_standards",
      title: "Are the educational simulations calibrated with real scientific data?",
      badge: "ACCURACY",
      content: (
        <p className="leading-relaxed">
          Yes. Cardiovascular pressures match standard physiological ranges (120/80 mmHg systemic vs 25/10 mmHg pulmonary), orbital periods and diameters reflect Keplerian astronomical ratios, and quantum jumps follow Bohr&apos;s frequency condition ($ΔE = h\cdot\nu$) with accurate Balmer series spectral lines.
        </p>
      ),
    },
  ];

  return (
    <section id="faq" className="relative w-full max-w-4xl mx-auto px-4 py-20 scroll-mt-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31C1B]/15 border border-[#A31C1B]/35 text-[#A31C1B] text-xs font-mono uppercase tracking-widest mb-3 font-semibold">
          <HelpCircle className="h-3.5 w-3.5" />
          Technical FAQ & Syllabus
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#EDEDED] tracking-tight">
          Frequently Answered <span className="text-[#A31C1B]">Questions</span>
        </h2>
      </div>

      <Accordion items={faqItems} />
    </section>
  );
}
