"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState } from "react";

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: string;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-3 inset-x-0 flex flex-col gap-2 items-center"
          >
            {items.map((item, idx) => (
              <motion.button
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className={cn(
                  "h-11 w-11 rounded-full flex items-center justify-center backdrop-blur-md transition-colors border",
                  item.active
                    ? "bg-[#A31C1B]/20 border-[#A31C1B] text-white shadow-[0_0_12px_rgba(163,28,27,0.4)]"
                    : "bg-[#06110C] border-white/10 text-[#9CA3AF] hover:text-[#EDEDED]"
                )}
                aria-label={item.title}
              >
                <div className="h-5 w-5">{item.icon}</div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-full bg-[#06110C] border border-white/10 flex items-center justify-center text-[#A31C1B] shadow-lg hover:border-[#A31C1B]/50 transition-colors"
        aria-label="Toggle Navigation Dock"
      >
        <LayoutGrid className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-3 items-end rounded-2xl bg-[#06110C]/90 border border-white/10 px-4 pb-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
        className
      )}
      role="toolbar"
      aria-label="HoloLearn Viewport Navigation"
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  onClick,
  active,
  badge,
}: FloatingDockItem & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [42, 60, 42]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [42, 60, 42]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 28, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 28, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={title}
      className={cn(
        "relative flex items-center justify-center rounded-xl transition-all border",
        active
          ? "bg-[#A31C1B]/20 border-[#A31C1B] text-white shadow-[0_0_15px_rgba(163,28,27,0.4)]"
          : "bg-[#171717] border-white/10 text-[#9CA3AF] hover:text-[#EDEDED] hover:border-[#A31C1B]/50"
      )}
      style={{ width, height }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2.5 py-1 whitespace-pre rounded-md bg-[#06110C] border border-[#A31C1B]/40 text-[#EDEDED] font-mono absolute left-1/2 -top-10 text-xs shadow-xl pointer-events-none z-50"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
      {badge && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A31C1B] shadow-[0_0_6px_rgba(163,28,27,0.8)]"></span>
        </span>
      )}
    </motion.button>
  );
}
