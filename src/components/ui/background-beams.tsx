"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cyber beam particles
    const beamCount = 28;
    const beams: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      hue: number;
    }> = [];

    for (let i = 0; i < beamCount; i++) {
      beams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 80 + Math.random() * 220,
        speed: 0.4 + Math.random() * 0.9,
        angle: (Math.PI / 4) * (Math.random() > 0.5 ? 1 : -1) + (Math.random() - 0.5) * 0.2,
        opacity: 0.15 + Math.random() * 0.35,
        hue: Math.random() > 0.5 ? 185 : 270, // electric cyan or neon violet
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial dark vignette
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      vignette.addColorStop(0, "rgba(7, 13, 36, 0.4)");
      vignette.addColorStop(1, "rgba(3, 7, 18, 0.95)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Render beams
      for (const beam of beams) {
        beam.y += beam.speed;
        beam.x += Math.sin(beam.angle) * beam.speed * 0.8;

        if (beam.y > height + 200) {
          beam.y = -200;
          beam.x = Math.random() * width;
        }

        const grad = ctx.createLinearGradient(
          beam.x,
          beam.y,
          beam.x - Math.sin(beam.angle) * beam.length,
          beam.y - beam.length
        );

        grad.addColorStop(0, `hsla(${beam.hue}, 100%, 65%, ${beam.opacity})`);
        grad.addColorStop(1, `hsla(${beam.hue}, 100%, 65%, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(beam.x - Math.sin(beam.angle) * beam.length, beam.y - beam.length);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60",
        className
      )}
    />
  );
};

