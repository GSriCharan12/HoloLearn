"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  className?: string;
}

export const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  title = "Spatial 3D Holodeck",
  date = "Interactive Simulation Engine",
  scrollToExpand = "Scroll to expand viewport",
  children,
  className,
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Use natural, non-locking Framer Motion viewport scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth media expansion transforms based on scroll
  const mediaWidth = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    [isMobile ? "85vw" : "600px", "98vw"]
  );
  const mediaHeight = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    [isMobile ? "280px" : "420px", isMobile ? "520px" : "720px"]
  );
  const scale = useTransform(scrollYProgress, [0.1, 0.6], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.8]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full py-16 overflow-hidden", className)}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Title & Badge */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A31C1B] block mb-2 font-semibold">
            {date}
          </span>
          <h3 className="text-3xl md:text-5xl font-extrabold text-[#EDEDED] tracking-tight">
            {title}
          </h3>
          <p className="mt-2 text-xs md:text-sm text-[#9CA3AF] font-mono">
            {scrollToExpand}
          </p>
        </div>

        {/* Expanding Media Box */}
        <motion.div
          style={{
            width: mediaWidth,
            height: mediaHeight,
            scale,
            opacity,
          }}
          className="relative rounded-3xl border border-[#A31C1B]/35 overflow-hidden shadow-[0_0_50px_rgba(163,28,27,0.25)] bg-[#06110C]/90 transition-shadow duration-500 hover:shadow-[0_0_70px_rgba(163,28,27,0.4)]"
        >
          {mediaType === "video" ? (
            <video
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                fill
                unoptimized
                src={mediaSrc}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06110C] via-[#06110C]/60 to-transparent" />
            </div>
          )}

          {/* Overlay Content */}
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between pointer-events-auto">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
