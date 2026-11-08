"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-[#171717] text-[#EDEDED] transition-colors overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            `
          [--dark-gradient:repeating-linear-gradient(100deg,#171717_0%,#171717_7%,transparent_10%,transparent_12%,#171717_16%)]
          [--aurora:repeating-linear-gradient(100deg,#A31C1B_10%,#06110C_15%,#7A1413_20%,#06110C_25%,#A31C1B_30%)]
          [background-image:var(--dark-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[24px]
          after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)]
          after:[background-size:200%,_100%]
          after:animate-aurora after:mix-blend-screen
          pointer-events-none
          absolute -inset-[10px] opacity-40 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_50%_0%,black_20%,transparent_75%)]`
          )}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#A31C1B 1px, transparent 1px), linear-gradient(to right, #A31C1B 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      {children}
    </div>
  );
};
