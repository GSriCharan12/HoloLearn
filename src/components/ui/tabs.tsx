"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface AnimatedTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const AnimatedTabs = ({
  tabs,
  activeTab,
  onChange,
  className,
}: AnimatedTabsProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 p-1.5 rounded-xl bg-[#06110C]/90 border border-white/10 shadow-lg overflow-x-auto no-scrollbar",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer",
              isActive
                ? "text-white font-semibold"
                : "text-[#9CA3AF] hover:text-[#EDEDED] hover:bg-[#171717]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 rounded-lg bg-[#A31C1B]/25 border border-[#A31C1B]/50 shadow-[0_0_12px_rgba(163,28,27,0.35)]"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#A31C1B]/20 text-white border border-[#A31C1B]/40 font-bold">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
