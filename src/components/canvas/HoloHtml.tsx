"use client";

import React, {
  useRef,
  useEffect,
  forwardRef,
} from "react";
import ReactDOM from "react-dom/client";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface HoloHtmlProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  distanceFactor?: number;
  center?: boolean;
  zIndexRange?: [number, number];
  position?: [number, number, number];
  className?: string;
  style?: React.CSSProperties;
}

const v1 = new THREE.Vector3();
const v2 = new THREE.Vector3();

function isObjectBehindCamera(el: THREE.Object3D, camera: THREE.Camera): boolean {
  el.getWorldPosition(v1);
  camera.getWorldPosition(v2);
  const dir = v1.sub(v2).normalize();
  const camDir = new THREE.Vector3();
  camera.getWorldDirection(camDir);
  return dir.dot(camDir) < 0;
}

function defaultCalculatePosition(
  el: THREE.Object3D,
  camera: THREE.Camera,
  size: { width: number; height: number }
): [number, number] {
  el.getWorldPosition(v1);
  v1.project(camera);
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  return [
    v1.x * widthHalf + widthHalf,
    -(v1.y * heightHalf) + heightHalf,
  ];
}

function objectScale(el: THREE.Object3D, camera: THREE.Camera, distanceFactor?: number): number {
  if (distanceFactor === undefined) return 1;
  el.getWorldPosition(v1);
  camera.getWorldPosition(v2);
  const dist = v1.distanceTo(v2);
  return (distanceFactor / dist);
}

function objectZIndex(
  el: THREE.Object3D,
  camera: THREE.Camera,
  zIndexRange: [number, number] = [0, 1000]
): number {
  el.getWorldPosition(v1);
  camera.getWorldPosition(v2);
  const dist = v1.distanceTo(v2);
  const [min, max] = zIndexRange;
  return Math.round(max - ((dist - 1) / (100 - 1)) * (max - min));
}

/**
 * HoloHtml: React 19 / Turbopack resilient in-scene HTML annotation component.
 * Defers root unmounting to prevent synchronous unmount race conditions and uses
 * isolated per-mount container elements.
 */
export const HoloHtml = forwardRef<HTMLDivElement, HoloHtmlProps>(function HoloHtml(
  {
    children,
    distanceFactor = 10,
    center = false,
    zIndexRange = [10, 1000],
    position = [0, 0, 0],
    className = "",
    style = {},
  },
  ref
) {
  const { gl, camera, size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const elRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<ReactDOM.Root | null>(null);

  // Mount/unmount lifecycle with isolated per-mount container element
  useEffect(() => {
    if (typeof document === "undefined") return;
    const target = gl.domElement.parentElement || gl.domElement.parentNode;
    if (!target) return;

    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.top = "0";
    el.style.left = "0";
    el.style.transformOrigin = "0 0";
    el.style.pointerEvents = "auto";
    el.style.willChange = "transform";
    target.appendChild(el);

    const currentRoot = ReactDOM.createRoot(el);
    rootRef.current = currentRoot;
    elRef.current = el;

    return () => {
      rootRef.current = null;
      elRef.current = null;

      // Defer unmounting and DOM removal to avoid React 19 concurrent render race conditions
      setTimeout(() => {
        try {
          currentRoot.unmount();
        } catch {
          // root was already unmounted
        }
        try {
          if (el.parentNode && el.parentNode.contains(el)) {
            el.parentNode.removeChild(el);
          }
        } catch {
          // node was already detached
        }
      }, 0);
    };
  }, [gl.domElement]);

  // Render children into the imperative root
  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.render(
      <div
        ref={ref}
        className={className}
        style={{
          position: "absolute",
          transform: center ? "translate3d(-50%, -50%, 0)" : "none",
          pointerEvents: "auto",
          ...style,
        }}
      >
        {children}
      </div>
    );
  });

  // Track position and scale per frame
  useFrame(() => {
    const el = elRef.current;
    if (!groupRef.current || !el) return;

    const isBehind = isObjectBehindCamera(groupRef.current, camera);
    if (isBehind) {
      if (el.style.display !== "none") el.style.display = "none";
      return;
    }

    if (el.style.display !== "block") el.style.display = "block";

    const [x, y] = defaultCalculatePosition(groupRef.current, camera, size);
    const scale = objectScale(groupRef.current, camera, distanceFactor);
    const zIndex = objectZIndex(groupRef.current, camera, zIndexRange);

    el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    el.style.zIndex = `${zIndex}`;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Three.js anchor point */}
    </group>
  );
});
