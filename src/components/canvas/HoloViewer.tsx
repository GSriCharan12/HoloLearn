"use client";

import React, { useRef, useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  GizmoHelper,
  GizmoViewport,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Maximize,
  Minimize,
  RotateCcw,
  Play,
  Pause,
  Grid,
  Volume2,
  VolumeX,
  Compass,
  Lock,
} from "lucide-react";
import { sound } from "@/lib/audio";

interface HoloViewerProps {
  children: React.ReactNode;
  title: string;
  category: string;
  onResetCamera?: () => void;
  isAutoRotating?: boolean;
  onToggleAutoRotate?: () => void;
  lightingPreset?: "lab" | "space" | "medical";
  onLightingChange?: (preset: "lab" | "space" | "medical") => void;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
}

type OrbitControlsRef = React.ComponentRef<typeof OrbitControls>;

function CameraController({
  position = [0, 1.2, 5.2],
  target = [0, 0, 0],
  controlsRef,
  isUserInteractingRef,
}: {
  position?: [number, number, number];
  target?: [number, number, number];
  controlsRef: React.RefObject<OrbitControlsRef | null>;
  isUserInteractingRef: React.MutableRefObject<boolean>;
}) {
  const { camera } = useThree();
  const desiredPos = useRef(new THREE.Vector3(...position));
  const desiredTarget = useRef(new THREE.Vector3(...target));
  const isTransitioning = useRef(true);

  useEffect(() => {
    desiredPos.current.set(position[0], position[1], position[2]);
    desiredTarget.current.set(target[0], target[1], target[2]);
    isTransitioning.current = true;
  }, [position, target]);

  useFrame((_, delta) => {
    if (isTransitioning.current && !isUserInteractingRef.current) {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        camera.position.copy(desiredPos.current);
        if (controlsRef.current) {
          controlsRef.current.target.copy(desiredTarget.current);
          controlsRef.current.update();
        }
        isTransitioning.current = false;
        return;
      }

      camera.position.lerp(desiredPos.current, Math.min(1, delta * 3.5));
      if (controlsRef.current) {
        controlsRef.current.target.lerp(desiredTarget.current, Math.min(1, delta * 3.5));
        controlsRef.current.update();
      }
      if (
        camera.position.distanceTo(desiredPos.current) < 0.05 &&
        (!controlsRef.current || controlsRef.current.target.distanceTo(desiredTarget.current) < 0.05)
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return null;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function HoloViewer({
  children,
  title,
  category,
  onResetCamera,
  lightingPreset = "lab",
  cameraPosition = [0, 1.2, 5.2],
  cameraTarget = [0, 0, 0],
}: HoloViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsRef | null>(null);
  const isUserInteractingRef = useRef(false);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touchActive, setTouchActive] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  // Background tab visibility listener: suspends R3F rendering when browser tab is inactive
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibilityChange = () => {
      setIsDocumentVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Viewport visibility observer: suspends R3F rendering when canvas is offscreen
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarseMql = window.matchMedia("(pointer: coarse)");
    const hoverMql = window.matchMedia("(hover: hover)");

    const evaluateTouchCapability = () => {
      const isCoarse = coarseMql.matches;
      const canHover = hoverMql.matches;
      const hasTouchPoints =
        "ontouchstart" in window ||
        Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

      // Touch-primary interface: coarse pointer (phones & tablets), or touch capability without fine hover
      const isTouchDriven = isCoarse || (hasTouchPoints && !canHover);
      setIsTouchDevice(Boolean(isTouchDriven));
    };

    evaluateTouchCapability();

    coarseMql.addEventListener("change", evaluateTouchCapability);
    hoverMql.addEventListener("change", evaluateTouchCapability);
    window.addEventListener("resize", evaluateTouchCapability);

    return () => {
      coarseMql.removeEventListener("change", evaluateTouchCapability);
      hoverMql.removeEventListener("change", evaluateTouchCapability);
      window.removeEventListener("resize", evaluateTouchCapability);
    };
  }, []);

  const handleReset = useCallback(() => {
    sound.playClick();
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
      controlsRef.current.object.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
      controlsRef.current.update();
    }
    isUserInteractingRef.current = false;
    onResetCamera?.();
  }, [cameraPosition, cameraTarget, onResetCamera]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        setAutoRotate((prev) => !prev);
        sound.playClick();
      } else if (e.key === "r" || e.key === "R") {
        handleReset();
      } else if (e.key === "g" || e.key === "G") {
        setShowGrid((prev) => !prev);
      } else if (e.key === "m" || e.key === "M") {
        const nextMute = !isMuted;
        setIsMuted(nextMute);
        sound.setMuted(nextMute);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMuted, handleReset]);

  const toggleFullscreen = () => {
    sound.playClick();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sound.setMuted(nextMute);
    if (!nextMute) sound.playClick();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl border border-white/10 bg-[#06110C] overflow-hidden shadow-2xl transition-all ${
        isFullscreen
          ? "h-screen w-screen rounded-none border-none fixed inset-0 z-50"
          : "h-[440px] sm:h-[520px] md:h-[620px]"
      } ${isTouchDevice && !touchActive ? "touch-pan-y" : "touch-none"}`}
    >
      {/* 3D CANVAS */}
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.75]}
        performance={{ min: 0.5 }}
        frameloop={isInView && isDocumentVisible ? "always" : "never"}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: isTouchDevice && !touchActive ? "pan-y" : "none" }}
      >
        <CameraController
          position={cameraPosition}
          target={cameraTarget}
          controlsRef={controlsRef}
          isUserInteractingRef={isUserInteractingRef}
        />

        {/* LIGHTING PRESETS */}
        <ambientLight intensity={lightingPreset === "space" ? 0.2 : 0.65} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color={lightingPreset === "medical" ? "#ffffff" : "#cffafe"}
        />
        <directionalLight
          position={[-5, -4, -4]}
          intensity={0.6}
          color="#8b5cf6" // Violet rim accent light
        />
        <pointLight position={[0, -2, 2]} intensity={0.4} color="#00f0ff" />

        {/* BACKGROUND STARS */}
        <Stars
          radius={50}
          depth={50}
          count={lightingPreset === "space" ? 3000 : 800}
          factor={4}
          saturation={1}
          fade
          speed={0.8}
        />

        {/* 3D SCENE CONTENT */}
        <Float
          speed={prefersReducedMotion ? 0 : 1.2}
          rotationIntensity={prefersReducedMotion ? 0 : 0.08}
          floatIntensity={prefersReducedMotion ? 0 : 0.06}
        >
          {children}
        </Float>

        {/* HOLOGRAPHIC GRID FLOOR */}
        {showGrid && (
          <gridHelper
            args={[18, 24, "#A31C1B", "#171717"]}
            position={[0, -2.2, 0]}
          />
        )}

        {/* ORBIT CONTROLS */}
        <OrbitControls
          ref={controlsRef}
          enabled={!isTouchDevice || touchActive}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate && !prefersReducedMotion}
          autoRotateSpeed={0.8}
          minDistance={1.2}
          maxDistance={75}
          dampingFactor={0.06}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN,
          }}
          onStart={() => {
            isUserInteractingRef.current = true;
          }}
          onEnd={() => {
            isUserInteractingRef.current = false;
          }}
        />

        {/* 3D ORIENTATION GIZMO */}
        <GizmoHelper alignment="bottom-right" margin={[70, 70]}>
          <GizmoViewport
            axisColors={["#ef4444", "#22c55e", "#00f0ff"]}
            labelColor="#ffffff"
          />
        </GizmoHelper>
      </Canvas>

      {/* TOP HUD BAR */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-20">
        {/* Telemetry Header */}
        <div className="flex items-center gap-3 bg-[#06110C]/95 border border-[#A31C1B]/40 px-3.5 py-1.5 rounded-xl backdrop-blur-xl pointer-events-auto shadow-lg">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A31C1B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A31C1B]"></span>
          </span>
          <div>
            <span className="text-xs font-mono uppercase text-[#9CA3AF] tracking-wider block leading-none">
              {category}
            </span>
            <span className="text-sm font-bold text-[#EDEDED] tracking-wide leading-tight">
              {title}
            </span>
          </div>
        </div>

        {/* Top Right Quick Toggles */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Audio toggle */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-xl backdrop-blur-xl border transition-colors ${
              isMuted
                ? "bg-[#06110C]/90 border-white/10 text-[#9CA3AF]"
                : "bg-[#A31C1B]/20 border-[#A31C1B] text-white shadow-[0_0_10px_rgba(163,28,27,0.35)]"
            }`}
            title={isMuted ? "Unmute Sound (M)" : "Mute Sound (M)"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Grid toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setShowGrid((prev) => !prev);
            }}
            className={`p-2 rounded-xl backdrop-blur-xl border transition-colors ${
              showGrid
                ? "bg-[#A31C1B]/20 border-[#A31C1B] text-white shadow-[0_0_10px_rgba(163,28,27,0.35)]"
                : "bg-[#06110C]/90 border-white/10 text-[#9CA3AF]"
            }`}
            title="Toggle Hologram Grid (G)"
            aria-label="Toggle Grid"
          >
            <Grid className="h-4 w-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#06110C]/90 border border-white/10 hover:border-[#A31C1B]/50 text-[#9CA3AF] hover:text-[#EDEDED] backdrop-blur-xl transition-colors cursor-pointer"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* TOUCHSCREEN INTERACTION TOGGLE (PHONES & TABLETS) */}
      {isTouchDevice && (
        <div className="absolute top-18 inset-x-4 flex justify-center pointer-events-auto z-20">
          {!touchActive ? (
            <button
              onClick={() => {
                sound.playClick();
                setTouchActive(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-[#06110C]/95 border border-[#A31C1B]/50 text-[#EDEDED] text-xs font-mono shadow-md backdrop-blur-xl active:scale-95 transition-all cursor-pointer"
              aria-label="Enable 3D canvas interaction"
            >
              <Compass className="h-4 w-4 text-[#A31C1B]" />
              <span>Tap to Rotate 3D Model</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                setTouchActive(false);
              }}
              className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-[#A31C1B] border border-[#A31C1B] text-white text-xs font-mono shadow-md backdrop-blur-xl active:scale-95 transition-all cursor-pointer"
              aria-label="Lock 3D canvas and resume vertical page scrolling"
            >
              <Lock className="h-4 w-4 text-white" />
              <span>3D Active • Tap to Lock & Scroll</span>
            </button>
          )}
        </div>
      )}

      {/* BOTTOM HUD INTERACTION BAR */}
      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none z-20">
        {/* Left: Auto Rotate & Reset */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              sound.playClick();
              setAutoRotate((prev) => !prev);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-xl border transition-colors cursor-pointer ${
              autoRotate
                ? "bg-[#A31C1B]/20 border-[#A31C1B] text-white shadow-[0_0_10px_rgba(163,28,27,0.35)]"
                : "bg-[#06110C]/90 border-white/10 text-[#9CA3AF]"
            }`}
            aria-label="Toggle Auto Rotation"
          >
            {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {autoRotate ? "Pause Orbit" : "Auto Orbit"}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-[#06110C]/90 border border-white/10 hover:border-[#A31C1B]/50 text-[#9CA3AF] hover:text-[#EDEDED] backdrop-blur-xl transition-colors cursor-pointer"
            aria-label="Reset Camera View"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Camera
          </button>
        </div>

        {/* Right: Keyboard Shortcuts Pill */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#06110C]/90 border border-white/10 text-xs font-mono text-[#9CA3AF] backdrop-blur-xl">
          <span><kbd className="px-1 py-0.5 rounded bg-[#171717] text-[#EDEDED] border border-white/10">Space</kbd> Orbit</span>
          <span><kbd className="px-1 py-0.5 rounded bg-[#171717] text-[#EDEDED] border border-white/10">R</kbd> Reset</span>
          <span><kbd className="px-1 py-0.5 rounded bg-[#171717] text-[#EDEDED] border border-white/10">Drag</kbd> Rotate</span>
          <span><kbd className="px-1 py-0.5 rounded bg-[#171717] text-[#EDEDED] border border-white/10">Scroll</kbd> Zoom</span>
        </div>
      </div>
    </div>
  );
}
