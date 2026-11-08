"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  return (
    <div className={cn("relative p-[1px] group", containerClassName)}>
      {/* Outer subtle glow */}
      <div
        className={cn(
          "absolute inset-0 rounded-[22px] z-[1] opacity-30 group-hover:opacity-60 blur-md transition-opacity duration-500 will-change-[opacity] pointer-events-none",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#A31C1B,transparent),radial-gradient(circle_farthest-side_at_100%_0,#06110C,transparent)]"
        )}
      />

      {/* Inner border tone */}
      <div
        className={cn(
          "absolute inset-0 rounded-[22px] z-[1] opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,rgba(163,28,27,0.4),transparent),radial-gradient(circle_farthest-side_at_100%_0,#A31C1B,transparent)]"
        )}
      />

      <div className={cn("relative z-10 rounded-[20px] bg-[#06110C]/85 border border-white/10 shadow-lg text-[#EDEDED]", className)}>
        {children}
      </div>
    </div>
  );
};
