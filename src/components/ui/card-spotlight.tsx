"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#A31C1B",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  radius?: number;
  color?: string;
  children: React.ReactNode;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-2xl border border-white/10 bg-[#06110C]/80 backdrop-blur-xl p-8 overflow-hidden hover:border-[#A31C1B]/40 transition-colors",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${color}30, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
