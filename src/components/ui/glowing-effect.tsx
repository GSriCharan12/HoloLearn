"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface GlowingEffectProps {
  blur?: number;
  borderWidth?: number;
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  className?: string;
}

export const GlowingEffect = ({
  spread = 60,
  disabled = false,
  className,
}: GlowingEffectProps) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100, active: false });

  if (disabled) return null;

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        });
      }}
      onMouseLeave={() => setMousePos((prev) => ({ ...prev, active: false }))}
      className={cn(
        "pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300",
        mousePos.active ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        background: `radial-gradient(${spread * 2}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(163, 28, 27, 0.45), rgba(6, 17, 12, 0.3), transparent 70%)`,
        maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
      }}
    />
  );
};
