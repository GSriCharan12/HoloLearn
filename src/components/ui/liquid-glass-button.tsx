"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tint?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const LiquidGlassButton = ({
  tint = "#A31C1B",
  size = "md",
  className,
  children,
  ...props
}: LiquidGlassButtonProps) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2.5",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-xl overflow-hidden transition-all duration-300",
        "bg-[#06110C]/80 backdrop-blur-xl border border-white/10 hover:border-[#A31C1B]/50",
        "text-[#EDEDED] hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.4)]",
        "hover:shadow-[0_0_25px_rgba(163,28,27,0.35)] active:scale-95 group",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Liquid refraction highlight overlay */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${tint}33 0%, transparent 70%)`,
        }}
      />
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A31C1B]/60 to-transparent" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
