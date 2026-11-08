"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  badge?: string;
}

export const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
  className,
  badge,
}: AccordionItemProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-[#06110C]/85 shadow-lg overflow-hidden transition-colors",
        isOpen && "border-[#A31C1B] shadow-[0_0_15px_rgba(163,28,27,0.2)]",
        className
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-[#EDEDED] hover:text-[#A31C1B] cursor-pointer transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2.5">
          {badge && (
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#A31C1B]/15 text-[#EDEDED] border border-[#A31C1B]/35 font-bold">
              {badge}
            </span>
          )}
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#A31C1B]"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-sm text-[#9CA3AF] border-t border-white/10 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Accordion = ({
  items,
  className,
}: {
  items: Array<{ id: string; title: string; content: React.ReactNode; badge?: string }>;
  className?: string;
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          badge={item.badge}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
