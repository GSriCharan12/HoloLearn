"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RoboticsSceneProps {
  baseYaw?: number; // degrees
  shoulderPitch?: number;
  elbowPitch?: number;
  explodedProgress?: number; // 0 to 1
  stressHeatmap?: boolean;
  wireframe?: boolean;
}

export function RoboticsScene({
  baseYaw = 25,
  shoulderPitch = -30,
  elbowPitch = 45,
  explodedProgress = 0,
  stressHeatmap = false,
  wireframe = false,
}: RoboticsSceneProps) {
  const armGroupRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);
  const wristRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // Smooth kinematics interpolation
    if (baseRef.current) {
      baseRef.current.rotation.y = (baseYaw * Math.PI) / 180;
    }
    if (shoulderRef.current) {
      shoulderRef.current.rotation.z = (shoulderPitch * Math.PI) / 180;
    }
    if (elbowRef.current) {
      elbowRef.current.rotation.z = (elbowPitch * Math.PI) / 180;
    }
  });

  // Materials based on Stress Analysis Mode
  const chassisMaterial = {
    color: stressHeatmap ? "#0284c7" : "#334155",
    roughness: 0.3,
    metalness: 0.8,
    wireframe,
  };

  const jointStressMaterial = {
    color: stressHeatmap ? "#ef4444" : "#00f0ff", // Red in high stress FEA, cyan normally
    emissive: stressHeatmap ? "#dc2626" : "#0284c7",
    emissiveIntensity: stressHeatmap ? 0.8 : 0.4,
    roughness: 0.2,
    metalness: 0.6,
    wireframe,
  };

  const carbonFiberMaterial = {
    color: stressHeatmap ? "#eab308" : "#0f172a", // Amber in medium stress FEA, carbon black normally
    roughness: 0.5,
    metalness: 0.4,
    wireframe,
  };

  return (
    <group ref={armGroupRef} position={[0, -1.8, 0]} scale={1.2}>
      {/* ROBOTIC BASE TURNTABLE */}
      <group position={[0, 0, 0]}>
        {/* Base Pedestal Mount */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.4, 32]} />
          <meshStandardMaterial {...chassisMaterial} />
        </mesh>

        {/* Exploded Actuator Stator Plate */}
        <mesh position={[0, 0.45 - explodedProgress * 0.6, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.15, 32]} />
          <meshStandardMaterial {...jointStressMaterial} />
        </mesh>
      </group>

      {/* YAW ROTATING CARRIAGE */}
      <group ref={baseRef} position={[0, 0.45, 0]}>
        {/* Swivel Turret */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.8, 0.85, 0.6, 32]} />
          <meshStandardMaterial {...chassisMaterial} />
        </mesh>

        {/* SHOULDER PITCH JOINT */}
        <group
          ref={shoulderRef}
          position={[0, 0.6 + explodedProgress * 0.5, 0]}
        >
          {/* Shoulder Motor Housing */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.42, 0.42, 1.1, 24]} />
            <meshStandardMaterial {...jointStressMaterial} />
          </mesh>

          {/* Upper Arm Bicep Link */}
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[0.35, 1.9, 0.45]} />
            <meshStandardMaterial {...carbonFiberMaterial} />
          </mesh>

          {/* Exploded Planetary Gear Ring */}
          {explodedProgress > 0.05 && (
            <mesh position={[0.8 * explodedProgress, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.4, 0.06, 16, 24]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
            </mesh>
          )}

          {/* ELBOW PITCH JOINT */}
          <group
            ref={elbowRef}
            position={[0, 2.3 + explodedProgress * 0.8, 0]}
          >
            {/* Elbow Servo Motor */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.9, 24]} />
              <meshStandardMaterial {...jointStressMaterial} />
            </mesh>

            {/* Forearm Link */}
            <mesh position={[0, 1.0, 0]}>
              <boxGeometry args={[0.28, 1.6, 0.35]} />
              <meshStandardMaterial {...carbonFiberMaterial} />
            </mesh>

            {/* WRIST 3-AXIS GIMBAL */}
            <group
              ref={wristRef}
              position={[0, 1.9 + explodedProgress * 0.6, 0]}
            >
              {/* Wrist Roll Ring */}
              <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial {...jointStressMaterial} />
              </mesh>

              {/* End-Effector Gripper Base */}
              <mesh position={[0, 0.35, 0]}>
                <boxGeometry args={[0.5, 0.15, 0.25]} />
                <meshStandardMaterial {...chassisMaterial} />
              </mesh>

              {/* Left Gripper Finger */}
              <mesh position={[-0.18 - explodedProgress * 0.3, 0.65, 0]}>
                <boxGeometry args={[0.08, 0.5, 0.15]} />
                <meshStandardMaterial {...jointStressMaterial} />
              </mesh>

              {/* Right Gripper Finger */}
              <mesh position={[0.18 + explodedProgress * 0.3, 0.65, 0]}>
                <boxGeometry args={[0.08, 0.5, 0.15]} />
                <meshStandardMaterial {...jointStressMaterial} />
              </mesh>

              {/* LiDAR / Vision Sensor Dome */}
              <mesh position={[0, 0.45, 0.18]}>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* TELEMETRY BILLBOARD SPRITE (Native WebGL 60FPS) */}
      <RoboticsTelemetrySprite stressHeatmap={stressHeatmap} />
    </group>
  );
}

function RoboticsTelemetrySprite({ stressHeatmap }: { stressHeatmap: boolean }) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 120;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, 512, 120);
    const x = 10, y = 10, w = 492, h = 100, r = 20;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    ctx.fillStyle = "rgba(4, 10, 24, 0.94)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = stressHeatmap ? "#f43f5e" : "#00f0ff";
    ctx.stroke();

    ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("6-DOF Bionic Manipulator", 30, 48);

    ctx.font = "bold 20px monospace";
    ctx.fillStyle = stressHeatmap ? "#f43f5e" : "#38bdf8";
    ctx.fillText(stressHeatmap ? "FEA STRESS: 240 MPa (ELBOW PIVOT)" : "ACTUATORS: SYNCHRONIZED NOMINAL", 30, 84);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [stressHeatmap]);

  useEffect(() => {
    return () => {
      if (texture) texture.dispose();
    };
  }, [texture]);

  if (!texture) return null;
  return (
    <sprite position={[0, 2.75, 0]} scale={[1.8, 0.42, 1]}>
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  );
}

