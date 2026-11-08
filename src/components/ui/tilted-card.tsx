"use client";

import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import Image from "next/image";

type Axis = "both" | "horizontal" | "vertical";

export interface TiltedCardLayerProps {
  depth?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: number | string;
  containerWidth?: number | string;
  imageHeight?: number | string;
  imageWidth?: number | string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  overlayDepth?: number;
  children?: ReactNode;
  backContent?: ReactNode;
  flipOnClick?: boolean;
  flipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  radius?: number | string;
  perspective?: number | string;
  smoothness?: number;
  glare?: number;
  glareColor?: string;
  shadow?: number;
  parallax?: number;
  axis?: Axis;
  reverse?: boolean;
  trackWindow?: boolean;
  floating?: boolean;
  gyroscope?: boolean;
  intro?: boolean;
  introDelay?: number;
  onClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
}

const toLength = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

const LAYER_TRANSFORM =
  "translate3d(calc(var(--tc-px, 0) * var(--tc-depth, 0) * 1px), calc(var(--tc-py, 0) * var(--tc-depth, 0) * 1px), 0)";

export const TiltedCardLayer = ({
  depth = 20,
  className = "",
  style,
  children,
}: TiltedCardLayerProps) => (
  <div
    className={`absolute inset-0 ${className}`.trim()}
    style={
      {
        "--tc-depth": depth,
        transform: LAYER_TRANSFORM,
        ...style,
      } as CSSProperties
    }
  >
    {children}
  </div>
);

export const TiltedCard = ({
  imageSrc,
  altText = "3D Interactive Model",
  captionText = "",
  containerHeight = "360px",
  containerWidth = "100%",
  scaleOnHover = 1.04,
  rotateAmplitude = 14,
  showTooltip = true,
  children,
  backContent = null,
  flipOnClick = true,
  flipped,
  onFlip,
  radius = 16,
  perspective = 900,
  reverse = false,
  onClick,
  className = "",
  style,
}: TiltedCardProps) => {
  const figureRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLElement>(null);
  const [innerFlipped, setInnerFlipped] = useState(false);
  const controlled = typeof flipped === "boolean";
  const isFlipped = Boolean(backContent) && (controlled ? flipped : innerFlipped);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkTouch();
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (figureRef.current) {
      rectRef.current = figureRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice || !figureRef.current) return;
    if (!rectRef.current) {
      rectRef.current = figureRef.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y, active: true });
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rectRef.current = null;
    setMousePos({ x: 0, y: 0, active: false });
  };

  const handleToggle = () => {
    if (backContent && flipOnClick) {
      const next = !isFlipped;
      if (!controlled) setInnerFlipped(next);
      onFlip?.(next);
    }
  };

  const rx = mousePos.active && !isTouchDevice ? -mousePos.y * rotateAmplitude * (reverse ? -1 : 1) : 0;
  const ry = mousePos.active && !isTouchDevice ? mousePos.x * rotateAmplitude * (reverse ? -1 : 1) : 0;
  const scale = mousePos.active && !isTouchDevice ? scaleOnHover : 1;

  const corner = toLength(radius);

  return (
    <figure
      ref={figureRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        handleToggle();
        onClick?.(e);
      }}
      className={`relative flex select-none items-center justify-center cursor-pointer transition-transform duration-300 ease-out touch-pan-y ${className}`}
      style={{
        width: toLength(containerWidth),
        height: toLength(containerHeight),
        perspective: toLength(perspective),
        ...style,
      }}
      tabIndex={0}
      role="button"
      aria-label={captionText || altText}
    >
      <div
        ref={bodyRef}
        className="relative w-full h-full rounded-2xl border border-white/10 bg-[#06110C]/85 overflow-hidden transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#A31C1B]/60 hover:shadow-[0_8px_30px_rgba(163,28,27,0.3)]"
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry + (isFlipped ? 180 : 0)}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 [backface-visibility:hidden] flex flex-col"
          style={{ borderRadius: corner }}
        >
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={altText}
              width={600}
              height={200}
              unoptimized
              className="w-full h-44 object-cover border-b border-white/10"
            />
          )}
          <div className="relative flex-1 p-5 text-[#EDEDED]">{children}</div>
        </div>

        {backContent && (
          <div
            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 bg-[#06110C] border border-white/10 flex flex-col justify-between text-[#EDEDED]"
            style={{ borderRadius: corner }}
          >
            {backContent}
          </div>
        )}
      </div>

      {showTooltip && captionText && mousePos.active && !isTouchDevice && (
        <figcaption
          ref={captionRef}
          className="pointer-events-none absolute bottom-3 z-30 rounded-md bg-[#06110C] text-[#EDEDED] border border-[#A31C1B]/40 px-3 py-1 text-xs font-mono shadow-xl"
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  );
};

export default TiltedCard;
