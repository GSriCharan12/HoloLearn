"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
  highlightColor?: string;
}

export const RotatingText = ({
  texts,
  rotationInterval = 2500,
  className,
  highlightColor = "#00f0ff",
}: RotatingTextProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(timer);
  }, [texts.length, rotationInterval]);

  return (
    <span className={cn("inline-flex relative overflow-hidden py-1", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block font-extrabold text-cyan-400"
          style={{ textShadow: `0 0 25px ${highlightColor}44` }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;

