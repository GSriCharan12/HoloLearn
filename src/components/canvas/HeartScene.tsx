"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { sound } from "@/lib/audio";

export interface HeartHotspot {
  id: string;
  name: string;
  category: "chamber" | "valve" | "vessel" | "conduction";
  position: [number, number, number];
  description: string;
  pressure: string;
  oxygen: string;
  function: string;
  clinical: string;
}

export const HEART_HOTSPOTS: HeartHotspot[] = [
  {
    id: "aorta",
    name: "Aortic Arch & Systemic Branches",
    category: "vessel",
    position: [-0.08, 1.45, 0.04],
    description: "The primary high-pressure systemic arterial trunk emerging from the left ventricle. Gives off the brachiocephalic, left common carotid, and left subclavian arteries.",
    pressure: "120 mmHg (Peak Systolic)",
    oxygen: "98% SaO2 (Oxygenated)",
    function: "Distributes freshly oxygenated stroke volume to cerebrum, myocardium, and peripheral systemic capillary beds.",
    clinical: "Susceptible to aortic dissection, coarctation, and atheromatous plaque rupture.",
  },
  {
    id: "left_ventricle",
    name: "Left Ventricle (LV)",
    category: "chamber",
    position: [-0.48, -0.42, 0.36],
    description: "The thickest muscular chamber of the heart (myocardium 10–15 mm thick). Operates against high systemic vascular resistance.",
    pressure: "120 / 10 mmHg",
    oxygen: "98% SaO2 (Oxygenated)",
    function: "Pumps oxygen-rich blood through the aortic valve into systemic circulation during ventricular systole.",
    clinical: "Prone to hypertensive left ventricular hypertrophy (LVH) and ischemic myocardial infarction.",
  },
  {
    id: "apex",
    name: "Cardiac Apex",
    category: "chamber",
    position: [-0.35, -1.25, 0.26],
    description: "The inferior conical tip of the heart formed exclusively by the left ventricle at the 5th left intercostal space.",
    pressure: "Point of Maximal Impulse (PMI)",
    oxygen: "98% SaO2 (Oxygenated)",
    function: "Initiates mechanical torsional wringing of ventricular ejection from apex toward cardiac base.",
    clinical: "Displaced lateral and inferior in dilated cardiomyopathy and aortic regurgitation.",
  },
  {
    id: "right_ventricle",
    name: "Right Ventricle (RV)",
    category: "chamber",
    position: [0.42, -0.38, 0.38],
    description: "Crescent-shaped muscular chamber wrapping anteriorly around the interventricular septum, pumping into the low-resistance pulmonary circuit.",
    pressure: "25 / 4 mmHg",
    oxygen: "75% SaO2 (Deoxygenated)",
    function: "Propels systemic venous return into the pulmonary trunk for respiratory alveolar gas exchange.",
    clinical: "Right ventricular failure occurs secondary to pulmonary arterial hypertension (Cor Pulmonale).",
  },
  {
    id: "left_atrium",
    name: "Left Atrium (LA) & Auricle",
    category: "chamber",
    position: [-0.48, 0.65, -0.22],
    description: "Smooth-walled posterior cardiac chamber receiving 4 pulmonary veins. Possesses a finger-like left auricle with pectinate muscles.",
    pressure: "8–10 mmHg Mean",
    oxygen: "98% SaO2 (Oxygenated)",
    function: "Acts as a reservoir and conduit during ventricular diastole; active atrial kick adds 20% to LV end-diastolic volume.",
    clinical: "Left atrial enlargement predisposes to atrial fibrillation and mural thrombus formation.",
  },
  {
    id: "right_atrium",
    name: "Right Atrium (RA) & Auricle",
    category: "chamber",
    position: [0.72, 0.55, -0.08],
    description: "Receives systemic venous drainage from the superior and inferior venae cavae. Contains the fossa ovalis and right auricle.",
    pressure: "2–6 mmHg (Central Venous Pressure)",
    oxygen: "75% SaO2 (Deoxygenated)",
    function: "Directs systemic venous return across the tricuspid valve into the right ventricle.",
    clinical: "Elevated jugular venous distention (JVD) reflects right atrial hypertension in congestive heart failure.",
  },
  {
    id: "pulmonary_trunk",
    name: "Pulmonary Trunk & Arteries",
    category: "vessel",
    position: [0.10, 0.90, 0.32],
    description: "Arises from the infundibulum (conus arteriosus) of the RV, spiraling in front of the aorta before bifurcating into left and right pulmonary arteries.",
    pressure: "25 / 10 mmHg Mean",
    oxygen: "75% SaO2 (Deoxygenated)",
    function: "Transports mixed venous blood to pulmonary capillary beds for carbon dioxide excretion and oxygen uptake.",
    clinical: "Pulmonary Embolism (PE) occluding the bifurcation ('Saddle Embolus') causes acute right ventricular collapse.",
  },
  {
    id: "svc",
    name: "Superior Vena Cava (SVC)",
    category: "vessel",
    position: [0.72, 1.45, -0.15],
    description: "Large avalvular venous trunk formed by the confluence of right and left brachiocephalic veins, draining the upper body.",
    pressure: "4–8 mmHg",
    oxygen: "75% SaO2 (Deoxygenated)",
    function: "Drains venous return from cerebrum, upper extremities, and chest wall into the right atrium.",
    clinical: "SVC Syndrome occurs with mediastinal tumor compression, causing facial plethora and upper extremity edema.",
  },
  {
    id: "ivc",
    name: "Inferior Vena Cava (IVC)",
    category: "vessel",
    position: [0.68, -0.85, -0.20],
    description: "The largest venous trunk in the human body, piercing the central tendon of diaphragm to enter posteroinferior right atrium.",
    pressure: "2–6 mmHg",
    oxygen: "75% SaO2 (Deoxygenated)",
    function: "Returns deoxygenated blood from lower extremities, abdomen, and pelvis to the right atrium.",
    clinical: "IVC filters (Greenfield) are deployed in patients with recurrent deep venous thrombosis (DVT).",
  },
  {
    id: "pulmonary_veins",
    name: "Pulmonary Veins (4 Inflow Ports)",
    category: "vessel",
    position: [-0.78, 0.65, -0.32],
    description: "Four pulmonary veins (Left Superior/Inferior, Right Superior/Inferior) carrying oxygenated blood into the left atrium.",
    pressure: "8–12 mmHg",
    oxygen: "98% SaO2 (Oxygenated)",
    function: "Delivers freshly re-oxygenated blood from lungs to systemic heart without intervening venous valves.",
    clinical: "Anomalous pulmonary venous return (TAPVR) is a cyanotic congenital heart defect.",
  },
  {
    id: "mitral_valve",
    name: "Mitral (Bicuspid) Valve Complex",
    category: "valve",
    position: [-0.22, 0.05, 0.08],
    description: "Dual-leaflet atrioventricular valve (anterior and posterior cusps) tethered by fibrous chordae tendineae to LV papillary muscles.",
    pressure: "100–120 mmHg Closing Gradient",
    oxygen: "98% SaO2 (Oxygenated)",
    function: "Guarantees unidirectional stroke volume forward into aorta; closes during systole (producing S1 heart sound).",
    clinical: "Mitral valve prolapse (MVP) and rheumatic mitral stenosis (diastolic rumble with opening snap).",
  },
  {
    id: "tricuspid_valve",
    name: "Tricuspid Valve Complex",
    category: "valve",
    position: [0.32, -0.02, 0.12],
    description: "Tri-leaflet atrioventricular valve (anterior, posterior, and septal cusps) anchored by chordae to RV papillary muscles.",
    pressure: "20–25 mmHg Closing Gradient",
    oxygen: "75% SaO2 (Deoxygenated)",
    function: "Prevents venous backflow into right atrium during right ventricular systolic contraction.",
    clinical: "Tricuspid endocarditis is common in IV drug users; Carvallo's sign (murmur accentuates with inspiration).",
  },
  {
    id: "aortic_valve",
    name: "Aortic Semilunar Valve",
    category: "valve",
    position: [-0.06, 0.45, 0.16],
    description: "Tricuspid semilunar valve at the left ventricular outflow tract into the root of ascending aorta. Houses the coronary ostia.",
    pressure: "80 mmHg Diastolic Gradient",
    oxygen: "98% SaO2 (Oxygenated)",
    function: "Opens during ejection (systole) and closes during diastole to maintain coronary perfusion pressure.",
    clinical: "Aortic stenosis leads to exertional angina, syncope, and heart failure.",
  },
  {
    id: "pulmonary_valve",
    name: "Pulmonary Semilunar Valve",
    category: "valve",
    position: [0.12, 0.55, 0.36],
    description: "Tri-leaflet semilunar valve situated at the apex of the infundibulum at the entrance of the pulmonary trunk.",
    pressure: "15 mmHg Diastolic Gradient",
    oxygen: "75% SaO2 (Deoxygenated)",
    function: "Prevents regurgitation from pulmonary trunk into right ventricle during ventricular diastole.",
    clinical: "Congenital pulmonary valve stenosis is a key component of Tetralogy of Fallot.",
  },
  {
    id: "septum",
    name: "Interventricular Septum (IVS)",
    category: "chamber",
    position: [-0.02, -0.45, 0.15],
    description: "Stout muscular and membranous partition separating the right and left ventricular cavities.",
    pressure: "Pressure Barrier (120 vs 25 mmHg)",
    oxygen: "Conduction Substrate",
    function: "Houses the Bundle of His and bundle branches, synchronizing biventricular mechanical contraction.",
    clinical: "Ventricular Septal Defect (VSD) causes a harsh holosystolic murmur and left-to-right shunting.",
  },
  {
    id: "coronary_circulation",
    name: "Coronary Arteries (LAD & RCA)",
    category: "vessel",
    position: [-0.05, -0.22, 0.65],
    description: "Left Anterior Descending (LAD) and Right Coronary Artery (RCA) traversing the interventricular and atrioventricular sulci.",
    pressure: "80 mmHg Diastolic Perfusion",
    oxygen: "Myocardial Supply (75% Extraction)",
    function: "Delivers arterial oxygen directly to the working myocardium during ventricular diastole.",
    clinical: "LAD occlusion ('Widow-Maker') leads to massive anterior wall myocardial infarction and cardiogenic shock.",
  },
  {
    id: "sa_node",
    name: "Sinoatrial (SA) Pacemaker Node",
    category: "conduction",
    position: [0.82, 0.95, -0.10],
    description: "Cluster of specialized autorhythmic pacemaker myocytes located subepicardially at the cavoatrial junction.",
    pressure: "Electrical Action Potential (-60 to +20 mV)",
    oxygen: "Supplied by SA Nodal Artery",
    function: "Generates spontaneous phase 4 diastolic depolarization, pacing normal heart rate at 60–100 BPM.",
    clinical: "Sick Sinus Syndrome (SSS) causes symptomatic alternating bradycardia and tachycardia requiring artificial pacemakers.",
  },
];

const HOTSPOT_MAP: Record<string, HeartHotspot> = HEART_HOTSPOTS.reduce(
  (acc, h) => ({ ...acc, [h.id]: h }),
  {}
);

// Continuous 3D Blood Flow Splines
const OXYGENATED_FLOW_SPLINE = [
  new THREE.Vector3(-0.75, 0.65, -0.32), // Pulmonary Vein
  new THREE.Vector3(-0.48, 0.52, -0.20), // Left Atrium
  new THREE.Vector3(-0.24, 0.08, 0.08),  // Through Mitral Valve
  new THREE.Vector3(-0.42, -0.45, 0.25), // Left Ventricle cavity
  new THREE.Vector3(-0.35, -1.05, 0.26), // Apex swirl
  new THREE.Vector3(-0.20, -0.35, 0.22), // Along Septum
  new THREE.Vector3(-0.06, 0.45, 0.16),  // Through Aortic Valve
  new THREE.Vector3(-0.04, 0.95, 0.14),  // Ascending Aorta
  new THREE.Vector3(-0.08, 1.44, 0.04),  // Aortic Arch summit
  new THREE.Vector3(-0.35, 1.30, -0.14), // Arch curve
  new THREE.Vector3(-0.54, 0.75, -0.32), // Descending Aorta
];

const DEOXYGENATED_FLOW_SPLINE = [
  new THREE.Vector3(0.72, 1.45, -0.15),  // SVC Inflow
  new THREE.Vector3(0.70, 0.65, -0.08),  // Right Atrium
  new THREE.Vector3(0.32, -0.02, 0.12),  // Through Tricuspid Valve
  new THREE.Vector3(0.40, -0.45, 0.30),  // Right Ventricle floor
  new THREE.Vector3(0.22, -0.05, 0.32),  // Conus arteriosus outflow
  new THREE.Vector3(0.12, 0.55, 0.36),   // Through Pulmonary Valve
  new THREE.Vector3(0.10, 0.90, 0.32),   // Pulmonary Trunk
  new THREE.Vector3(0.55, 1.02, -0.06),  // Right Pulmonary Artery
];

const FLOW_PARTICLE_COUNT = 90;
const INITIAL_CORPUSCLES = (() => {
  const oxyProgress = new Float32Array(FLOW_PARTICLE_COUNT);
  const deoxProgress = new Float32Array(FLOW_PARTICLE_COUNT);
  const speeds = new Float32Array(FLOW_PARTICLE_COUNT);

  for (let i = 0; i < FLOW_PARTICLE_COUNT; i++) {
    oxyProgress[i] = i / FLOW_PARTICLE_COUNT;
    deoxProgress[i] = (i + 0.5) / FLOW_PARTICLE_COUNT;
    speeds[i] = 0.08 + (i % 5) * 0.015;
  }

  return { oxyProgress, deoxProgress, speeds };
})();

/**
 * Procedural Organic Myocardial Ventricular Geometry Generator
 * Constructs an authentic, asymmetrical pear/conical muscular heart body
 * with sculpted anterior and posterior interventricular sulci, apex offset,
 * conus arteriosus, and lateral left ventricular bulge.
 */
function createMyocardiumGeometry(half: "anterior" | "posterior" | "full"): THREE.BufferGeometry {
  const lats = 36;
  const lons = 48;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= lats; i++) {
    const v = i / lats; // 0 (base) to 1 (apex)
    const y = 0.38 - 1.68 * v;

    // Conical apex shift infero-anteriorly to the left (5th intercostal space)
    const cx = -0.35 * Math.pow(v, 1.35);
    const cz = 0.22 * Math.pow(v, 1.25);

    // Anatomical taper: base ~ 0.95, mid ~ 1.22, apex ~ 0.12
    let rBase = 0.96 * (1 - 0.92 * Math.pow(v, 1.5)) + 0.34 * Math.sin(v * Math.PI);
    if (v < 0.12) rBase *= 0.88 + 0.12 * (v / 0.12);

    for (let j = 0; j <= lons; j++) {
      const u = j / lons;
      const phi = u * Math.PI * 2;

      let r = rBase;

      // Left Ventricle lateral muscular bulge (thick walled)
      const lvFactor = Math.max(0, -Math.cos(phi));
      r += 0.24 * lvFactor * Math.sin(v * Math.PI * 0.85);

      // Right Ventricle anterior crescent
      const rvFactor = Math.max(0, Math.sin(phi - 0.15));
      r += 0.18 * rvFactor * Math.sin(v * Math.PI * 0.75);

      // Anterior Interventricular Sulcus (depression carrying LAD)
      const antGrooveDist = Math.abs(phi - 0.95);
      if (antGrooveDist < 0.65) {
        const grooveDepth = (1 - antGrooveDist / 0.65) * 0.14 * Math.sin(v * Math.PI);
        r -= grooveDepth;
      }

      // Posterior Interventricular Sulcus
      const postGrooveDist = Math.abs(phi - 3.95);
      if (postGrooveDist < 0.65) {
        const grooveDepth = (1 - postGrooveDist / 0.65) * 0.12 * Math.sin(v * Math.PI);
        r -= grooveDepth;
      }

      // Pulmonary Conus Arteriosus anterior superior neck
      if (v < 0.32 && Math.abs(phi - 0.52) < 0.6) {
        r += 0.18 * (1 - Math.abs(phi - 0.52) / 0.6) * (1 - v / 0.32);
      }

      const x = cx + r * Math.sin(phi);
      let z = cz + r * Math.cos(phi);

      // In half mode, clip or flatten opposite side to create a clean anatomical dissection cut
      if (half === "anterior" && z < 0.05) {
        z = 0.05;
      } else if (half === "posterior" && z > 0.05) {
        z = 0.05;
      }

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < lats; i++) {
    for (let j = 0; j < lons; j++) {
      const a = i * (lons + 1) + j;
      const b = (i + 1) * (lons + 1) + j;
      const c = (i + 1) * (lons + 1) + (j + 1);
      const d = i * (lons + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * 100% Native WebGL 3D Billboard Sprite Badge
 * Renders dynamically on an offscreen high-DPI canvas texture.
 * Eliminates all DOM operations, React roots, and unmount race conditions.
 */
function SelectedPartBeacon({ hotspot }: { hotspot: HeartHotspot }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const beaconRef = useRef<THREE.Group>(null);

  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 140;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, 512, 140);

    // Pill Glass Substrate
    const x = 12, y = 12, w = 488, h = 116, r = 24;
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

    ctx.fillStyle = "rgba(6, 17, 12, 0.95)";
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#A31C1B";
    ctx.shadowColor = "#A31C1B";
    ctx.shadowBlur = 16;
    ctx.stroke();

    // Crimson Beacon Pulse Indicator
    ctx.beginPath();
    ctx.arc(46, 70, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#A31C1B";
    ctx.shadowBlur = 14;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "#F87171";
    ctx.fillText(`${hotspot.category.toUpperCase()} • ${hotspot.pressure}`, 74, 52);

    ctx.font = "bold 30px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#ffffff";
    const displayName = hotspot.name.length > 27 ? hotspot.name.slice(0, 25) + "..." : hotspot.name;
    ctx.fillText(displayName, 74, 96);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [hotspot]);

  useEffect(() => {
    return () => {
      if (texture) texture.dispose();
    };
  }, [texture]);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 5) * 0.18;
      ringRef.current.scale.set(scale, scale, 1);
    }
    if (beaconRef.current) {
      beaconRef.current.position.y = hotspot.position[1] + 0.45 + Math.sin(clock.getElapsedTime() * 3) * 0.03;
    }
  });

  return (
    <group position={[hotspot.position[0], 0, hotspot.position[2]]}>
      {/* Target surface reticle */}
      <mesh
        ref={ringRef}
        position={[0, hotspot.position[1], 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.07, 0.12, 32]} />
        <meshBasicMaterial color="#A31C1B" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Target indicator beam */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                0, hotspot.position[1], 0,
                0, hotspot.position[1] + 0.35, 0,
              ]),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#A31C1B" linewidth={2} transparent opacity={0.8} />
      </line>

      {/* 3D Billboard Sprite Badge */}
      {texture && (
        <group ref={beaconRef} position={[0, hotspot.position[1] + 0.45, 0]}>
          <sprite scale={[1.7, 0.46, 1]}>
            <spriteMaterial map={texture} transparent depthTest={false} />
          </sprite>
        </group>
      )}
    </group>
  );
}

export function HeartScene({
  wireframe = false,
  xray = false,
  bpm = 72,
  showOxygenation = true,
  showParticles = true,
  dissectionProgress = 0,
  selectedHotspot = null,
  onSelectHotspot,
}: {
  wireframe?: boolean;
  xray?: boolean;
  bpm?: number;
  showOxygenation?: boolean;
  showParticles?: boolean;
  dissectionProgress?: number;
  selectedHotspot?: HeartHotspot | null;
  onSelectHotspot?: (hotspot: HeartHotspot) => void;
}) {
  const heartGroupRef = useRef<THREE.Group>(null);
  const anteriorWallRef = useRef<THREE.Group>(null);
  const posteriorWallRef = useRef<THREE.Group>(null);
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);

  // Instanced 3D Moving Blood Corpuscles
  const oxySpheresRef = useRef<THREE.InstancedMesh>(null);
  const deoxSpheresRef = useRef<THREE.InstancedMesh>(null);
  const corpusclesData = useRef(INITIAL_CORPUSCLES);

  // Procedural Sculpted Myocardial Geometries
  const fullMyocardiumGeo = useMemo(() => createMyocardiumGeometry("full"), []);
  const anteriorMyocardiumGeo = useMemo(() => createMyocardiumGeometry("anterior"), []);
  const posteriorMyocardiumGeo = useMemo(() => createMyocardiumGeometry("posterior"), []);

  // Continuous Vascular 3D Curves & Tubes
  const aortaCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.06, 0.45, 0.12),
        new THREE.Vector3(-0.04, 0.85, 0.14),
        new THREE.Vector3(-0.03, 1.18, 0.10),
        new THREE.Vector3(-0.08, 1.44, 0.04),
        new THREE.Vector3(-0.35, 1.30, -0.14),
        new THREE.Vector3(-0.54, 0.85, -0.32),
        new THREE.Vector3(-0.54, 0.0, -0.32),
        new THREE.Vector3(-0.54, -0.95, -0.32),
      ]),
    []
  );
  const aortaTubeGeo = useMemo(() => new THREE.TubeGeometry(aortaCurve, 64, 0.23, 24, false), [aortaCurve]);

  const brachiocephalicCurve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(-0.22, 1.40, 0.06), new THREE.Vector3(-0.34, 1.84, 0.10)]),
    []
  );
  const brachioTubeGeo = useMemo(() => new THREE.TubeGeometry(brachiocephalicCurve, 16, 0.085, 16, false), [brachiocephalicCurve]);

  const carotidCurve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(-0.06, 1.45, 0.04), new THREE.Vector3(-0.06, 1.90, 0.06)]),
    []
  );
  const carotidTubeGeo = useMemo(() => new THREE.TubeGeometry(carotidCurve, 16, 0.075, 16, false), [carotidCurve]);

  const subclavianCurve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(0.12, 1.40, 0.02), new THREE.Vector3(0.24, 1.82, -0.02)]),
    []
  );
  const subclavianTubeGeo = useMemo(() => new THREE.TubeGeometry(subclavianCurve, 16, 0.075, 16, false), [subclavianCurve]);

  const pulmonaryTrunkCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.12, 0.52, 0.35),
        new THREE.Vector3(0.10, 0.85, 0.32),
        new THREE.Vector3(0.08, 1.08, 0.12),
      ]),
    []
  );
  const pulmonaryTrunkTubeGeo = useMemo(() => new THREE.TubeGeometry(pulmonaryTrunkCurve, 32, 0.22, 24, false), [pulmonaryTrunkCurve]);

  const leftPulmonaryArteryCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.08, 1.08, 0.12),
        new THREE.Vector3(-0.18, 1.05, 0.02),
        new THREE.Vector3(-0.45, 1.02, -0.16),
      ]),
    []
  );
  const leftPulmonaryArteryTubeGeo = useMemo(() => new THREE.TubeGeometry(leftPulmonaryArteryCurve, 24, 0.14, 16, false), [leftPulmonaryArteryCurve]);

  const rightPulmonaryArteryCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.08, 1.08, 0.12),
        new THREE.Vector3(0.35, 1.05, 0.05),
        new THREE.Vector3(0.65, 1.04, -0.06),
      ]),
    []
  );
  const rightPulmonaryArteryTubeGeo = useMemo(() => new THREE.TubeGeometry(rightPulmonaryArteryCurve, 24, 0.14, 16, false), [rightPulmonaryArteryCurve]);

  const svcCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.72, 1.85, -0.16),
        new THREE.Vector3(0.72, 1.30, -0.14),
        new THREE.Vector3(0.70, 0.75, -0.10),
      ]),
    []
  );
  const svcTubeGeo = useMemo(() => new THREE.TubeGeometry(svcCurve, 32, 0.22, 20, false), [svcCurve]);

  const ivcCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.68, -1.25, -0.22),
        new THREE.Vector3(0.68, -0.55, -0.18),
        new THREE.Vector3(0.68, 0.15, -0.16),
      ]),
    []
  );
  const ivcTubeGeo = useMemo(() => new THREE.TubeGeometry(ivcCurve, 32, 0.20, 20, false), [ivcCurve]);

  // Coronary LAD & RCA Sulcal Arteries
  const ladCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, 0.42, 0.52),
        new THREE.Vector3(-0.05, 0.05, 0.62),
        new THREE.Vector3(-0.14, -0.38, 0.55),
        new THREE.Vector3(-0.24, -0.78, 0.42),
        new THREE.Vector3(-0.32, -1.20, 0.26),
      ]),
    []
  );
  const ladTubeGeo = useMemo(() => new THREE.TubeGeometry(ladCurve, 32, 0.034, 12, false), [ladCurve]);

  const rcaCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.18, 0.35, 0.48),
        new THREE.Vector3(0.48, 0.22, 0.42),
        new THREE.Vector3(0.65, 0.05, 0.20),
        new THREE.Vector3(0.58, -0.35, -0.10),
      ]),
    []
  );
  const rcaTubeGeo = useMemo(() => new THREE.TubeGeometry(rcaCurve, 32, 0.032, 12, false), [rcaCurve]);

  // 3D Volumetric Blood Flow Curves
  const oxySpline = useMemo(() => new THREE.CatmullRomCurve3(OXYGENATED_FLOW_SPLINE), []);
  const deoxSpline = useMemo(() => new THREE.CatmullRomCurve3(DEOXYGENATED_FLOW_SPLINE), []);
  const oxyTubeGeo = useMemo(() => new THREE.TubeGeometry(oxySpline, 96, 0.055, 12, false), [oxySpline]);
  const deoxTubeGeo = useMemo(() => new THREE.TubeGeometry(deoxSpline, 96, 0.055, 12, false), [deoxSpline]);

  const dummyMatrix = useMemo(() => new THREE.Matrix4(), []);

  // Physiological 72 BPM Wringing / Systolic Contraction
  useFrame((_, delta) => {
    const cycleTime = 60 / bpm;
    const time = (Date.now() / 1000) * (Math.PI * 2 / cycleTime);

    const systolePhase = Math.sin(time);
    const ventricularWring = Math.max(0, systolePhase);
    const atrialKick = Math.max(0, -Math.sin(time + 0.45));

    if (heartGroupRef.current) {
      // Physiological torsional wringing and radial systolic contraction
      const scaleBase = 1 - ventricularWring * 0.065;
      heartGroupRef.current.scale.set(
        scaleBase + atrialKick * 0.02,
        1 - ventricularWring * 0.05,
        scaleBase + atrialKick * 0.02
      );
      // Apical torsion
      heartGroupRef.current.rotation.y = ventricularWring * 0.04;
      heartGroupRef.current.rotation.z = ventricularWring * 0.025;
    }

    // Anatomical Dissection: peel anterior wall forward
    if (anteriorWallRef.current) {
      anteriorWallRef.current.position.z = THREE.MathUtils.lerp(
        anteriorWallRef.current.position.z,
        dissectionProgress * 1.45,
        delta * 6
      );
    }

    // Volumetric 3D Blood Corpuscle Simulation
    if (showOxygenation && showParticles && oxySpheresRef.current && deoxSpheresRef.current) {
      const data = corpusclesData.current;
      const speedMultiplier = 1 + ventricularWring * 2.2;

      for (let i = 0; i < FLOW_PARTICLE_COUNT; i++) {
        // Oxygenated stream
        data.oxyProgress[i] = (data.oxyProgress[i] + delta * data.speeds[i] * speedMultiplier) % 1;
        const ptOxy = oxySpline.getPoint(data.oxyProgress[i]);
        dummyMatrix.makeTranslation(ptOxy.x, ptOxy.y, ptOxy.z);
        const corpuscleScale = 0.026 + Math.sin(data.oxyProgress[i] * Math.PI) * 0.012;
        dummyMatrix.scale(new THREE.Vector3(corpuscleScale, corpuscleScale, corpuscleScale));
        oxySpheresRef.current.setMatrixAt(i, dummyMatrix);

        // Deoxygenated stream
        data.deoxProgress[i] = (data.deoxProgress[i] + delta * data.speeds[i] * speedMultiplier) % 1;
        const ptDeox = deoxSpline.getPoint(data.deoxProgress[i]);
        dummyMatrix.makeTranslation(ptDeox.x, ptDeox.y, ptDeox.z);
        dummyMatrix.scale(new THREE.Vector3(corpuscleScale, corpuscleScale, corpuscleScale));
        deoxSpheresRef.current.setMatrixAt(i, dummyMatrix);
      }

      oxySpheresRef.current.instanceMatrix.needsUpdate = true;
      deoxSpheresRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Materials with Deep Anatomical Fidelity
  const muscleMaterial = useMemo(() => {
    if (wireframe) {
      return {
        wireframe: true,
        color: "#00f0ff",
        emissive: "#004466",
      };
    }
    if (xray) {
      return {
        color: "#38bdf8",
        transparent: true,
        opacity: 0.35,
        wireframe: false,
        roughness: 0.2,
        metalness: 0.3,
      };
    }
    return {
      color: "#9f1239", // Deep anatomical cardiac muscle tone
      roughness: 0.42,
      metalness: 0.1,
    };
  }, [wireframe, xray]);

  const muscleMaterialLV = useMemo(() => {
    if (wireframe || xray) return muscleMaterial;
    return {
      color: "#881337", // Dense left ventricular myocardium
      roughness: 0.45,
      metalness: 0.12,
    };
  }, [wireframe, xray, muscleMaterial]);

  const vesselRed = useMemo(() => ({
    color: xray ? "#f43f5e" : "#dc2626",
    roughness: 0.28,
    wireframe,
    transparent: xray,
    opacity: xray ? 0.5 : 1,
  }), [xray, wireframe]);

  const vesselBlue = useMemo(() => ({
    color: xray ? "#0284c7" : "#1d4ed8",
    roughness: 0.28,
    wireframe,
    transparent: xray,
    opacity: xray ? 0.5 : 1,
  }), [xray, wireframe]);

  const valveMaterial = useMemo(() => ({
    color: "#fef08a",
    roughness: 0.25,
    metalness: 0.15,
    transparent: true,
    opacity: 0.92,
    wireframe,
  }), [wireframe]);

  // Is a particular part selected or hovered?
  const isPartActive = (id: string) => selectedHotspot?.id === id || hoveredPartId === id;

  const handlePartClick = (partId: string, e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    sound.playClick();
    const hp = HOTSPOT_MAP[partId];
    if (hp && onSelectHotspot) {
      onSelectHotspot(hp);
    }
  };

  const handlePointerOver = (partId: string, e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredPartId(partId);
    if (typeof document !== "undefined") {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredPartId(null);
    if (typeof document !== "undefined") {
      document.body.style.cursor = "auto";
    }
  };

  return (
    <group ref={heartGroupRef} position={[0, -0.05, 0]}>
      {/* ======================================================== */}
      {/* 1. SCULPTED MYOCARDIAL BODY & INTERNAL CAVITIES          */}
      {/* ======================================================== */}
      {dissectionProgress < 0.05 ? (
        /* Sealed Continuous Anatomical Heart Body */
        <mesh
          geometry={fullMyocardiumGeo}
          onClick={(e) => handlePartClick("left_ventricle", e)}
          onPointerOver={(e) => handlePointerOver("left_ventricle", e)}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial
            {...muscleMaterialLV}
            emissive={isPartActive("left_ventricle") || isPartActive("right_ventricle") || isPartActive("apex") ? "#00f0ff" : "#000000"}
            emissiveIntensity={isPartActive("left_ventricle") || isPartActive("right_ventricle") || isPartActive("apex") ? 0.45 : 0}
          />
        </mesh>
      ) : (
        /* Dissected Split: Posterior Anchored Myocardium + Internal Valves */
        <group ref={posteriorWallRef}>
          <mesh
            geometry={posteriorMyocardiumGeo}
            onClick={(e) => handlePartClick("left_ventricle", e)}
            onPointerOver={(e) => handlePointerOver("left_ventricle", e)}
            onPointerOut={handlePointerOut}
          >
            <meshStandardMaterial {...muscleMaterialLV} />
          </mesh>

          {/* Interventricular Septum (IVS) */}
          <mesh
            position={[-0.02, -0.45, 0.08]}
            onClick={(e) => handlePartClick("septum", e)}
            onPointerOver={(e) => handlePointerOver("septum", e)}
            onPointerOut={handlePointerOut}
          >
            <boxGeometry args={[0.26, 1.55, 0.62]} />
            <meshStandardMaterial
              color={wireframe ? "#00f0ff" : "#701a35"}
              roughness={0.4}
              emissive={isPartActive("septum") ? "#00f0ff" : "#000000"}
              emissiveIntensity={isPartActive("septum") ? 0.45 : 0}
            />
          </mesh>

          {/* MITRAL VALVE COMPLEX */}
          <group
            position={[-0.22, 0.05, 0.08]}
            onClick={(e) => handlePartClick("mitral_valve", e)}
            onPointerOver={(e) => handlePointerOver("mitral_valve", e)}
            onPointerOut={handlePointerOut}
          >
            <mesh rotation={[Math.PI / 2.2, 0, 0]}>
              <torusGeometry args={[0.38, 0.05, 16, 32]} />
              <meshStandardMaterial
                {...valveMaterial}
                emissive={isPartActive("mitral_valve") ? "#00f0ff" : "#000000"}
                emissiveIntensity={isPartActive("mitral_valve") ? 0.8 : 0}
              />
            </mesh>
            <mesh position={[0, -0.05, 0.05]} rotation={[0.4, 0, 0]}>
              <boxGeometry args={[0.35, 0.03, 0.2]} />
              <meshStandardMaterial {...valveMaterial} />
            </mesh>
            {/* Papillary Muscles & Chordae Tendineae */}
            <mesh position={[-0.15, -0.65, 0.05]}>
              <cylinderGeometry args={[0.1, 0.16, 0.55, 16]} />
              <meshStandardMaterial color="#881337" roughness={0.5} />
            </mesh>
            <mesh position={[0.15, -0.65, 0.05]}>
              <cylinderGeometry args={[0.09, 0.15, 0.5, 16]} />
              <meshStandardMaterial color="#881337" roughness={0.5} />
            </mesh>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[
                    new Float32Array([
                      -0.15, -0.4, 0.05,  -0.1, -0.05, 0.05,
                      0.15, -0.4, 0.05,   0.1, -0.05, 0.05,
                      -0.12, -0.4, 0.05,   0.0, -0.05, 0.08,
                    ]),
                    3,
                  ]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ffffff" linewidth={2} />
            </line>
          </group>

          {/* TRICUSPID VALVE COMPLEX */}
          <group
            position={[0.32, -0.02, 0.12]}
            onClick={(e) => handlePartClick("tricuspid_valve", e)}
            onPointerOver={(e) => handlePointerOver("tricuspid_valve", e)}
            onPointerOut={handlePointerOut}
          >
            <mesh rotation={[Math.PI / 2.3, 0, -0.2]}>
              <torusGeometry args={[0.36, 0.045, 16, 32]} />
              <meshStandardMaterial
                {...valveMaterial}
                emissive={isPartActive("tricuspid_valve") ? "#00f0ff" : "#000000"}
                emissiveIntensity={isPartActive("tricuspid_valve") ? 0.8 : 0}
              />
            </mesh>
            <mesh position={[0.1, -0.55, 0.05]}>
              <cylinderGeometry args={[0.08, 0.14, 0.45, 16]} />
              <meshStandardMaterial color="#881337" roughness={0.5} />
            </mesh>
          </group>

          {/* AORTIC SEMILUNAR VALVE */}
          <group
            position={[-0.06, 0.45, 0.16]}
            onClick={(e) => handlePartClick("aortic_valve", e)}
            onPointerOver={(e) => handlePointerOver("aortic_valve", e)}
            onPointerOut={handlePointerOut}
          >
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.24, 0.04, 16, 24]} />
              <meshStandardMaterial
                {...valveMaterial}
                emissive={isPartActive("aortic_valve") ? "#00f0ff" : "#000000"}
                emissiveIntensity={isPartActive("aortic_valve") ? 0.8 : 0}
              />
            </mesh>
          </group>

          {/* PULMONARY SEMILUNAR VALVE */}
          <group
            position={[0.12, 0.55, 0.36]}
            rotation={[0.4, 0.2, -0.25]}
            onClick={(e) => handlePartClick("pulmonary_valve", e)}
            onPointerOver={(e) => handlePointerOver("pulmonary_valve", e)}
            onPointerOut={handlePointerOut}
          >
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.22, 0.04, 16, 24]} />
              <meshStandardMaterial
                {...valveMaterial}
                emissive={isPartActive("pulmonary_valve") ? "#00f0ff" : "#000000"}
                emissiveIntensity={isPartActive("pulmonary_valve") ? 0.8 : 0}
              />
            </mesh>
          </group>
        </group>
      )}

      {/* Dissectable Anterior Muscular Wall (Peels forward when slider active) */}
      {dissectionProgress > 0.02 && (
        <group ref={anteriorWallRef}>
          <mesh
            geometry={anteriorMyocardiumGeo}
            onClick={(e) => handlePartClick("right_ventricle", e)}
            onPointerOver={(e) => handlePointerOver("right_ventricle", e)}
            onPointerOut={handlePointerOut}
          >
            <meshStandardMaterial
              {...muscleMaterial}
              color={wireframe ? "#00f0ff" : "#9f1239"}
              emissive={isPartActive("right_ventricle") ? "#00f0ff" : "#000000"}
              emissiveIntensity={isPartActive("right_ventricle") ? 0.45 : 0}
            />
          </mesh>
        </group>
      )}

      {/* ======================================================== */}
      {/* 2. ATRIA & AURICULAR APPENDAGES                          */}
      {/* ======================================================== */}
      {/* Left Atrium & Auricle */}
      <group
        position={[-0.48, 0.65, -0.22]}
        onClick={(e) => handlePartClick("left_atrium", e)}
        onPointerOver={(e) => handlePointerOver("left_atrium", e)}
        onPointerOut={handlePointerOut}
      >
        <mesh>
          <sphereGeometry args={[0.66, 32, 24]} />
          <meshStandardMaterial
            {...muscleMaterial}
            emissive={isPartActive("left_atrium") ? "#00f0ff" : "#000000"}
            emissiveIntensity={isPartActive("left_atrium") ? 0.45 : 0}
          />
        </mesh>
        {/* Left Auricle curled anteriorly */}
        <mesh position={[-0.24, -0.05, 0.32]} rotation={[-0.2, -0.3, 0.38]}>
          <coneGeometry args={[0.28, 0.55, 20]} />
          <meshStandardMaterial {...muscleMaterial} color={wireframe ? "#00f0ff" : "#881337"} />
        </mesh>
      </group>

      {/* Right Atrium & Auricle */}
      <group
        position={[0.72, 0.55, -0.08]}
        onClick={(e) => handlePartClick("right_atrium", e)}
        onPointerOver={(e) => handlePointerOver("right_atrium", e)}
        onPointerOut={handlePointerOut}
      >
        <mesh>
          <sphereGeometry args={[0.70, 32, 24]} />
          <meshStandardMaterial
            {...muscleMaterial}
            color={wireframe ? "#00f0ff" : "#7f1d1d"}
            emissive={isPartActive("right_atrium") ? "#00f0ff" : "#000000"}
            emissiveIntensity={isPartActive("right_atrium") ? 0.45 : 0}
          />
        </mesh>
        {/* Right Auricle wrapping over aortic root */}
        <mesh position={[-0.26, 0.15, 0.32]} rotation={[0.3, 0.4, -0.3]}>
          <coneGeometry args={[0.34, 0.60, 20]} />
          <meshStandardMaterial {...muscleMaterial} />
        </mesh>
      </group>

      {/* Sinoatrial (SA) Pacemaker Node with Rhythmic Electric Pulse */}
      <group
        position={[0.82, 0.95, -0.10]}
        onClick={(e) => handlePartClick("sa_node", e)}
        onPointerOver={(e) => handlePointerOver("sa_node", e)}
        onPointerOut={handlePointerOut}
      >
        <mesh>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive={isPartActive("sa_node") ? "#00f0ff" : "#f59e0b"}
            emissiveIntensity={isPartActive("sa_node") ? 2.0 : 1.2}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.09, 0.13, 24]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. GREAT VESSELS & VOLUMETRIC ARTERIES                   */}
      {/* ======================================================== */}
      {/* AORTA & 3 SYSTEMIC ARTERIAL BRANCHES */}
      <group
        onClick={(e) => handlePartClick("aorta", e)}
        onPointerOver={(e) => handlePointerOver("aorta", e)}
        onPointerOut={handlePointerOut}
      >
        <mesh geometry={aortaTubeGeo}>
          <meshStandardMaterial
            {...vesselRed}
            emissive={isPartActive("aorta") ? "#00f0ff" : "#000000"}
            emissiveIntensity={isPartActive("aorta") ? 0.55 : 0}
          />
        </mesh>
        <mesh geometry={brachioTubeGeo}>
          <meshStandardMaterial {...vesselRed} />
        </mesh>
        <mesh geometry={carotidTubeGeo}>
          <meshStandardMaterial {...vesselRed} />
        </mesh>
        <mesh geometry={subclavianTubeGeo}>
          <meshStandardMaterial {...vesselRed} />
        </mesh>
      </group>

      {/* PULMONARY TRUNK & BIFURCATION */}
      <group
        onClick={(e) => handlePartClick("pulmonary_trunk", e)}
        onPointerOver={(e) => handlePointerOver("pulmonary_trunk", e)}
        onPointerOut={handlePointerOut}
      >
        <mesh geometry={pulmonaryTrunkTubeGeo}>
          <meshStandardMaterial
            {...vesselBlue}
            emissive={isPartActive("pulmonary_trunk") ? "#00f0ff" : "#000000"}
            emissiveIntensity={isPartActive("pulmonary_trunk") ? 0.55 : 0}
          />
        </mesh>
        <mesh geometry={leftPulmonaryArteryTubeGeo}>
          <meshStandardMaterial {...vesselBlue} />
        </mesh>
        <mesh geometry={rightPulmonaryArteryTubeGeo}>
          <meshStandardMaterial {...vesselBlue} />
        </mesh>
      </group>

      {/* SUPERIOR VENA CAVA (SVC) */}
      <mesh
        geometry={svcTubeGeo}
        onClick={(e) => handlePartClick("svc", e)}
        onPointerOver={(e) => handlePointerOver("svc", e)}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          {...vesselBlue}
          emissive={isPartActive("svc") ? "#00f0ff" : "#000000"}
          emissiveIntensity={isPartActive("svc") ? 0.55 : 0}
        />
      </mesh>

      {/* INFERIOR VENA CAVA (IVC) */}
      <mesh
        geometry={ivcTubeGeo}
        onClick={(e) => handlePartClick("ivc", e)}
        onPointerOver={(e) => handlePointerOver("ivc", e)}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          {...vesselBlue}
          emissive={isPartActive("ivc") ? "#00f0ff" : "#000000"}
          emissiveIntensity={isPartActive("ivc") ? 0.55 : 0}
        />
      </mesh>

      {/* 4 PULMONARY VEINS */}
      <group
        onClick={(e) => handlePartClick("pulmonary_veins", e)}
        onPointerOver={(e) => handlePointerOver("pulmonary_veins", e)}
        onPointerOut={handlePointerOut}
      >
        <mesh position={[-0.82, 0.78, -0.32]} rotation={[0.3, 0.8, 0]}>
          <cylinderGeometry args={[0.085, 0.095, 0.45, 16]} />
          <meshStandardMaterial
            {...vesselRed}
            emissive={isPartActive("pulmonary_veins") ? "#00f0ff" : "#000000"}
            emissiveIntensity={isPartActive("pulmonary_veins") ? 0.6 : 0}
          />
        </mesh>
        <mesh position={[-0.80, 0.48, -0.36]} rotation={[-0.2, 0.7, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.42, 16]} />
          <meshStandardMaterial {...vesselRed} />
        </mesh>
        <mesh position={[0.35, 0.76, -0.42]} rotation={[0.2, -0.8, 0]}>
          <cylinderGeometry args={[0.085, 0.095, 0.45, 16]} />
          <meshStandardMaterial {...vesselRed} />
        </mesh>
        <mesh position={[0.32, 0.48, -0.45]} rotation={[-0.1, -0.8, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.42, 16]} />
          <meshStandardMaterial {...vesselRed} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 4. CORONARY CIRCULATION (LAD, RCA & CARDIAC VEINS)       */}
      {/* ======================================================== */}
      <group
        onClick={(e) => handlePartClick("coronary_circulation", e)}
        onPointerOver={(e) => handlePointerOver("coronary_circulation", e)}
        onPointerOut={handlePointerOut}
      >
        <mesh geometry={ladTubeGeo}>
          <meshStandardMaterial
            color="#ef4444"
            emissive={isPartActive("coronary_circulation") ? "#00f0ff" : "#991b1b"}
            emissiveIntensity={isPartActive("coronary_circulation") ? 1.5 : 0.8}
          />
        </mesh>
        <mesh geometry={rcaTubeGeo}>
          <meshStandardMaterial
            color="#ef4444"
            emissive={isPartActive("coronary_circulation") ? "#00f0ff" : "#991b1b"}
            emissiveIntensity={isPartActive("coronary_circulation") ? 1.5 : 0.8}
          />
        </mesh>
        {/* Great Cardiac Vein alongside LAD */}
        <mesh position={[0.04, -0.32, 0.64]} rotation={[0, 0, 0.48]}>
          <cylinderGeometry args={[0.030, 0.016, 1.38, 16]} />
          <meshStandardMaterial color="#3b82f6" emissive="#1e40af" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 5. VOLUMETRIC 3D BLOOD FLOW STREAMS & CORPUSCLES         */}
      {/* ======================================================== */}
      {showOxygenation && showParticles && (
        <group>
          {/* Translucent Glowing 3D Blood Stream Volumes */}
          <mesh geometry={oxyTubeGeo}>
            <meshBasicMaterial
              color="#ff1744"
              transparent
              opacity={xray ? 0.65 : 0.35}
              wireframe={wireframe}
            />
          </mesh>
          <mesh geometry={deoxTubeGeo}>
            <meshBasicMaterial
              color="#00b0ff"
              transparent
              opacity={xray ? 0.65 : 0.35}
              wireframe={wireframe}
            />
          </mesh>

          {/* 3D Moving Blood Corpuscles Flowing Along Curves */}
          <instancedMesh
            ref={oxySpheresRef}
            args={[undefined, undefined, FLOW_PARTICLE_COUNT]}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color="#ff1744"
              emissive="#ff1744"
              emissiveIntensity={1.8}
              roughness={0.2}
            />
          </instancedMesh>

          <instancedMesh
            ref={deoxSpheresRef}
            args={[undefined, undefined, FLOW_PARTICLE_COUNT]}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00b0ff"
              emissiveIntensity={1.8}
              roughness={0.2}
            />
          </instancedMesh>
        </group>
      )}

      {/* ======================================================== */}
      {/* 6. ONLY THE SELECTED PART'S 3D BILLBOARD BEACON         */}
      {/* ======================================================== */}
      {selectedHotspot && <SelectedPartBeacon hotspot={selectedHotspot} />}
    </group>
  );
}
