"use client";

import React, { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-3 auto-rows-[20rem] md:auto-rows-[22rem] gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface BentoCardProps {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  children,
  onClick,
}: BentoCardProps) => {
  const content = (
    <>
      {/* Background layer */}
      {background && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-500 group-hover:scale-105 opacity-40">
          {background}
        </div>
      )}

      {/* Subtle tint overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06110C] via-[#06110C]/60 to-transparent transition-opacity duration-300" />

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div>
          {Icon && (
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#171717] border border-white/10 text-[#A31C1B] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#A31C1B]">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-bold text-[#EDEDED] tracking-tight group-hover:text-[#A31C1B] transition-colors">
            {name}
          </h3>
          <p className="mt-2 text-xs md:text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Custom children (e.g. status tags, parameter meters) */}
        {children && <div className="mt-4">{children}</div>}

        {/* CTA link / button */}
        {cta && (
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-semibold text-[#A31C1B] group-hover:text-[#ff6b6b]">
            <span>{cta}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </>
  );

  const containerClasses = cn(
    "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
    "bg-[#06110C]/85 border border-white/10 shadow-lg",
    "transition-all duration-300 hover:shadow-[0_4px_25px_rgba(163,28,27,0.25)] hover:border-[#A31C1B]",
    className
  );

  if (href) {
    return (
      <a href={href} className={containerClasses} onClick={onClick}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(containerClasses, "text-left cursor-pointer")}
      >
        {content}
      </button>
    );
  }

  return <div className={containerClasses}>{content}</div>;
};
