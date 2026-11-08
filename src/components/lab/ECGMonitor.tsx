"use client";

import React, { useEffect, useRef } from "react";
import { Activity } from "lucide-react";

interface ECGMonitorProps {
  bpm: number;
  className?: string;
}

export function ECGMonitor({ bpm = 72, className = "" }: ECGMonitorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bpmRef = useRef(bpm);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const width = (canvas.width = 340);
    const height = (canvas.height = 70);
    const midY = height / 2;

    // Buffer to hold historic points
    const points: number[] = new Array(width).fill(midY);

    // Waveform generator based on cardiac cycle (0 to 1)
    const getCardiacY = (cycleProgress: number): number => {
      // cycleProgress goes from 0 to 1
      if (cycleProgress < 0.1) return midY; // Baseline
      if (cycleProgress < 0.2) {
        // P Wave
        const p = (cycleProgress - 0.1) / 0.1;
        return midY - Math.sin(p * Math.PI) * 7;
      }
      if (cycleProgress < 0.3) return midY; // PR segment
      if (cycleProgress < 0.34) {
        // Q Dip
        const q = (cycleProgress - 0.3) / 0.04;
        return midY + Math.sin(q * Math.PI) * 5;
      }
      if (cycleProgress < 0.4) {
        // R Spike (Sharp tall peak)
        const r = (cycleProgress - 0.34) / 0.06;
        return midY - Math.sin(r * Math.PI) * 26;
      }
      if (cycleProgress < 0.44) {
        // S Dip
        const s = (cycleProgress - 0.4) / 0.04;
        return midY + Math.sin(s * Math.PI) * 9;
      }
      if (cycleProgress < 0.55) return midY; // ST segment
      if (cycleProgress < 0.72) {
        // T Wave (Broad repolarization)
        const t = (cycleProgress - 0.55) / 0.17;
        return midY - Math.sin(t * Math.PI) * 11;
      }
      return midY; // Isoelectric baseline
    };

    let phase = 0;

    const render = () => {
      // Speed of trace smoothly tracks live BPM ref without tearing down context
      const currentBpm = bpmRef.current;
      const stepSpeed = (currentBpm / 60) * 1.8;
      phase = (phase + stepSpeed * 0.015) % 1;

      // New point
      const newY = getCardiacY(phase);
      points.shift();
      points.push(newY);

      // Clear
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#06110C";
      ctx.fillRect(0, 0, width, height);

      // Batched ECG grid lines in a single stroke call
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = 0; gx < width; gx += 20) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
      }
      for (let gy = 0; gy < height; gy += 20) {
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
      }
      ctx.stroke();

      // Draw Crimson Red cardiac trace with glow
      ctx.strokeStyle = "#A31C1B";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#A31C1B";
      ctx.shadowBlur = 6;
      ctx.beginPath();

      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx.moveTo(i, points[i]);
        else ctx.lineTo(i, points[i]);
      }
      ctx.stroke();

      // Leading indicator dot at current x position
      const leadX = points.length - 1;
      const leadY = points[leadX];
      ctx.shadowBlur = 4;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(leadX, leadY, 3, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className={`rounded-xl border border-white/10 bg-[#06110C]/90 p-3 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between text-xs font-mono text-[#EDEDED] mb-2">
        <span className="flex items-center gap-1.5 font-bold">
          <Activity className="h-3.5 w-3.5 text-[#A31C1B] animate-pulse" />
          Lead II ECG Waveform
        </span>
        <span className="text-[#A31C1B] font-bold">
          {bpm} BPM {bpm > 100 ? "(Tachycardia)" : bpm < 60 ? "(Bradycardia)" : "(Normal Sinus)"}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-16 rounded-lg border border-white/10"
      />
      <div className="flex justify-between text-[11px] font-mono text-[#9CA3AF] mt-1.5">
        <span>P Wave (Atrial Depol)</span>
        <span>QRS (Ventricular Depol)</span>
        <span>T Wave (Repol)</span>
      </div>
    </div>
  );
}
