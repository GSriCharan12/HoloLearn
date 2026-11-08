"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Static precomputed Schrodinger probability cloud coordinates (Deterministic & zero render-time allocations)
const CLOUD_PARTICLE_COUNT = 600;
const INITIAL_CLOUD_PARTICLES = (() => {
  const pos = new Float32Array(CLOUD_PARTICLE_COUNT * 3);
  const col = new Float32Array(CLOUD_PARTICLE_COUNT * 3);

  for (let i = 0; i < CLOUD_PARTICLE_COUNT; i++) {
    const u1 = 0.01 + ((i * 37) % 99) / 100;
    const u2 = ((i * 73) % 100) / 100;
    const radius = Math.sqrt(-2 * Math.log(u1)) * 1.5;
    const theta = 2 * Math.PI * u2;
    const phi = Math.acos(2 * (((i * 53) % 100) / 100) - 1);

    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);

    col[i * 3] = 0.0;
    col[i * 3 + 1] = 0.8 + ((i * 19) % 20) / 100;
    col[i * 3 + 2] = 1.0;
  }
  return { cloudPositions: pos, cloudColors: col };
})();

interface QuantumSceneProps {
  mode: "bohr_atom" | "quantum_cloud" | "dna_helix";
  quantumEnergyLevel: number; // 1, 2, or 3
  onTriggerQuantumJump?: () => void;
  wireframe?: boolean;
}

export function QuantumScene({
  mode = "bohr_atom",
  quantumEnergyLevel = 1,
  wireframe = false,
}: QuantumSceneProps) {
  const nucleusGroupRef = useRef<THREE.Group>(null);
  const electronsGroupRef = useRef<THREE.Group>(null);
  const photonPacketRef = useRef<THREE.Mesh>(null);
  const dnaGroupRef = useRef<THREE.Group>(null);

  // Procedural Quantum Cloud Electron Probabilities (reused from precomputed buffer)
  const { cloudPositions, cloudColors } = INITIAL_CLOUD_PARTICLES;

  // DNA Double Helix Base Pairs
  const basePairCount = 36;
  const { dnaRungs, dnaLinePositions } = useMemo(() => {
    const rungs = [];
    const linePos = new Float32Array(basePairCount * 6);
    for (let i = 0; i < basePairCount; i++) {
      const angle = (i / basePairCount) * Math.PI * 4; // Two complete helical twists
      const y = (i - basePairCount / 2) * 0.28;
      const radius = 1.2;
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      // Nucleotide pair types: Adenine-Thymine (Blue-Cyan) or Guanine-Cytosine (Violet-Amber)
      const isAT = i % 2 === 0;
      rungs.push({
        id: i,
        y,
        angle,
        pos1: [x1, y, z1] as [number, number, number],
        pos2: [x2, y, z2] as [number, number, number],
        color1: isAT ? "#00f0ff" : "#8b5cf6",
        color2: isAT ? "#38bdf8" : "#f59e0b",
        label: isAT ? "A — T" : "G — C",
      });

      linePos[i * 6] = x1;
      linePos[i * 6 + 1] = y;
      linePos[i * 6 + 2] = z1;
      linePos[i * 6 + 3] = x2;
      linePos[i * 6 + 4] = y;
      linePos[i * 6 + 5] = z2;
    }
    return { dnaRungs: rungs, dnaLinePositions: linePos };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Nucleus thermal vibration
    if (nucleusGroupRef.current) {
      nucleusGroupRef.current.position.x = Math.sin(time * 12) * 0.02;
      nucleusGroupRef.current.position.y = Math.cos(time * 14) * 0.02;
      nucleusGroupRef.current.position.z = Math.sin(time * 10) * 0.02;
    }

    // Bohr Orbiting Electrons
    if (electronsGroupRef.current) {
      electronsGroupRef.current.rotation.y += delta * (1.8 / quantumEnergyLevel);
      electronsGroupRef.current.rotation.x += delta * 0.6;
    }

    // DNA Helix continuous helical rotation
    if (dnaGroupRef.current) {
      dnaGroupRef.current.rotation.y += delta * 0.6;
    }

    // Emitted photon wavepacket animation
    if (photonPacketRef.current) {
      const pTime = (time * 2) % 3;
      photonPacketRef.current.position.x = 0.5 + pTime * 2.5;
      photonPacketRef.current.position.y = Math.sin(pTime * 18) * 0.35;
    }
  });

  return (
    <group>
      {mode === "bohr_atom" && (
        <group>
          {/* NUCLEUS (Protons & Neutrons with strong force field) */}
          <group ref={nucleusGroupRef}>
            {/* Protons (+e, Neon Cyan) */}
            <mesh position={[0.15, 0.12, 0.1]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#00f0ff" emissive="#0088cc" emissiveIntensity={0.8} wireframe={wireframe} />
            </mesh>
            <mesh position={[-0.15, -0.1, 0.12]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#00f0ff" emissive="#0088cc" emissiveIntensity={0.8} wireframe={wireframe} />
            </mesh>
            {/* Neutrons (Neutral, Neon Violet) */}
            <mesh position={[0.1, -0.14, -0.15]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#8b5cf6" emissive="#5b21b6" emissiveIntensity={0.8} wireframe={wireframe} />
            </mesh>
            <mesh position={[-0.12, 0.15, -0.1]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#8b5cf6" emissive="#5b21b6" emissiveIntensity={0.8} wireframe={wireframe} />
            </mesh>
            {/* Nuclear force field glow */}
            <mesh>
              <sphereGeometry args={[0.55, 24, 24]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>

          {/* QUANTUM ENERGY LEVEL RINGS (n=1, n=2, n=3) */}
          {[1.4, 2.4, 3.6].map((orbitRadius, idx) => {
            const level = idx + 1;
            const isCurrentLevel = quantumEnergyLevel === level;
            return (
              <mesh key={level} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[orbitRadius - 0.02, orbitRadius + 0.02, 64]} />
                <meshBasicMaterial
                  color={isCurrentLevel ? "#00f0ff" : "#475569"}
                  transparent
                  opacity={isCurrentLevel ? 0.8 : 0.25}
                  side={THREE.DoubleSide}
                />
              </mesh>
            );
          })}

          {/* ORBITING ELECTRONS */}
          <group ref={electronsGroupRef}>
            {/* Electron on active orbital radius */}
            <mesh
              position={[
                quantumEnergyLevel === 1 ? 1.4 : quantumEnergyLevel === 2 ? 2.4 : 3.6,
                0,
                0,
              ]}
            >
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color="#00f0ff"
                emissive="#00f0ff"
                emissiveIntensity={2}
              />
              <pointLight color="#00f0ff" intensity={1} distance={4} />
            </mesh>
          </group>

          {/* EMITTED PHOTON WAVEPACKET */}
          <mesh ref={photonPacketRef} position={[1.5, 0, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={2.5}
            />
            <pointLight color="#f59e0b" intensity={1.5} distance={3} />
          </mesh>
        </group>
      )}

      {mode === "quantum_cloud" && (
        <group>
          {/* SCHRODINGER ELECTRON PROBABILITY CLOUD */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[cloudPositions, 3]} />
              <bufferAttribute attach="attributes-color" args={[cloudColors, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={0.065}
              vertexColors
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
            />
          </points>

          {/* Nucleus at origin */}
          <mesh>
            <sphereGeometry args={[0.35, 24, 24]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={1} wireframe={wireframe} />
          </mesh>
        </group>
      )}

      {mode === "dna_helix" && (
        <group ref={dnaGroupRef} scale={0.58}>
          {/* Batched Hydrogen Bond Connecting Bars (1 draw call instead of 36) */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[dnaLinePositions, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#94a3b8" transparent opacity={0.5} />
          </lineSegments>

          {/* DNA Sugar-Phosphate Backbone Strand Nodes */}
          {dnaRungs.map((rung) => (
            <group key={rung.id}>
              {/* Strand 1 Node */}
              <mesh position={rung.pos1}>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshStandardMaterial color={rung.color1} roughness={0.3} metalness={0.4} wireframe={wireframe} />
              </mesh>
              {/* Strand 2 Node */}
              <mesh position={rung.pos2}>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshStandardMaterial color={rung.color2} roughness={0.3} metalness={0.4} wireframe={wireframe} />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
}

