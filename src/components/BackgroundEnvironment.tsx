"use client";

import { useEffect, useRef } from "react";

// --- 3D Vector Math Utilities ---
type Vec3 = [number, number, number];

function normalize([x, y, z]: Vec3): Vec3 {
  const len = Math.hypot(x, y, z);
  return len > 0.00001 ? [x / len, y / len, z / len] : [0, 1, 0];
}

function dot([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): number {
  return x1 * x2 + y1 * y2 + z1 * z2;
}

function cross([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Vec3 {
  return [
    y1 * z2 - z1 * y2,
    z1 * x2 - x1 * z2,
    x1 * y2 - y1 * x2,
  ];
}

function rotateX([x, y, z]: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x, y * c - z * s, y * s + z * c];
}

function rotateY([x, y, z]: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c + z * s, y, -x * s + z * c];
}

function rotateZ([x, y, z]: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c - y * s, x * s + y * c, z];
}

function rotateEuler(v: Vec3, rx: number, ry: number, rz: number): Vec3 {
  return rotateZ(rotateY(rotateX(v, rx), ry), rz);
}

// --- 3D Mesh Geometries ---
interface Mesh3D {
  vertices: Vec3[];
  faces: [number, number, number][];
}

function createIcosahedron(radius: number): Mesh3D {
  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVertices: Vec3[] = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
  ];
  const vertices = rawVertices.map(v => {
    const n = normalize(v);
    return [n[0] * radius, n[1] * radius, n[2] * radius] as Vec3;
  });

  const faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
  ];

  return { vertices, faces };
}

function createOctahedron(radius: number): Mesh3D {
  const vertices: Vec3[] = [
    [radius, 0, 0], [-radius, 0, 0],
    [0, radius, 0], [0, -radius, 0],
    [0, 0, radius], [0, 0, -radius]
  ];
  const faces: [number, number, number][] = [
    [0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4],
    [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]
  ];
  return { vertices, faces };
}

function createCrystalPrism(radius: number): Mesh3D {
  const h = radius * 1.8;
  const vertices: Vec3[] = [
    [0, -h, 0],
    [0, h, 0],
    [radius * 0.9, -radius * 0.1, radius * 0.5],
    [-radius * 0.4, radius * 0.1, radius * 0.9],
    [-radius * 0.8, -radius * 0.1, -radius * 0.6],
    [radius * 0.5, radius * 0.2, -radius * 0.8]
  ];
  const faces: [number, number, number][] = [
    [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 2],
    [1, 3, 2], [1, 4, 3], [1, 5, 4], [1, 2, 5]
  ];
  return { vertices, faces };
}

function createCube(radius: number): Mesh3D {
  const r = radius * 0.75;
  const vertices: Vec3[] = [
    [-r, -r, -r], [r, -r, -r], [r, r, -r], [-r, r, -r],
    [-r, -r, r], [r, -r, r], [r, r, r], [-r, r, r]
  ];
  const faces: [number, number, number][] = [
    [0, 1, 2], [0, 2, 3],
    [5, 4, 7], [5, 7, 6],
    [4, 0, 3], [4, 3, 7],
    [1, 5, 6], [1, 6, 2],
    [3, 2, 6], [3, 6, 7],
    [4, 5, 1], [4, 1, 0]
  ];
  return { vertices, faces };
}

// --- World Scene Objects Types ---
interface WorldObject {
  type: "polyhedron";
  mesh: Mesh3D;
  basePos: Vec3;
  rotSpeed: Vec3;
  currentRot: Vec3;
  radius: number;
  material: "silver" | "graphite" | "iridescent";
  depthTier: "midground" | "background";
}

interface Particle {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  alpha: number;
  driftX: number;
  driftY: number;
  phase: number;
  colorType: "cyan" | "white" | "amber";
  tier: "foreground" | "midground" | "background";
}
// --- Render Helper Functions (Defined at Module Scope) ---

function renderLightShafts(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  panX: number,
  panY: number,
  scrollRatio: number
) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  const originX = width * 0.74 + panX * 0.35;
  const originY = -50 + panY * 0.2;
  const beamLength = Math.max(width, height) * 1.55;

  const srcGlow = ctx.createRadialGradient(originX, originY, 20, originX, originY, 320);
  srcGlow.addColorStop(0, "rgba(225, 175, 105, 0.09)");
  srcGlow.addColorStop(0.4, "rgba(130, 205, 255, 0.04)");
  srcGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = srcGlow;
  ctx.beginPath();
  ctx.arc(originX, originY, 320, 0, Math.PI * 2);
  ctx.fill();

  // Beam 1: Warm amber core (Reference A)
  const angle1 = 0.58 + scrollRatio * 0.08;
  const endX1 = originX - Math.sin(angle1) * beamLength;
  const endY1 = originY + Math.cos(angle1) * beamLength;

  const grad1 = ctx.createLinearGradient(originX, originY, endX1, endY1);
  grad1.addColorStop(0, "rgba(235, 175, 100, 0.09)");
  grad1.addColorStop(0.28, "rgba(205, 150, 80, 0.052)");
  grad1.addColorStop(0.68, "rgba(150, 105, 50, 0.02)");
  grad1.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.beginPath();
  ctx.moveTo(originX - 70, originY);
  ctx.lineTo(originX + 190, originY);
  ctx.lineTo(endX1 + 270, endY1);
  ctx.lineTo(endX1 - 110, endY1);
  ctx.closePath();
  ctx.fillStyle = grad1;
  ctx.fill();

  // Beam 2: Icy cyan ray (Reference B contrast)
  const angle2 = 0.64 + scrollRatio * 0.06;
  const endX2 = originX - Math.sin(angle2) * beamLength;
  const endY2 = originY + Math.cos(angle2) * beamLength;

  const grad2 = ctx.createLinearGradient(originX - 90, originY, endX2, endY2);
  grad2.addColorStop(0, "rgba(125, 220, 255, 0.08)");
  grad2.addColorStop(0.32, "rgba(90, 185, 245, 0.042)");
  grad2.addColorStop(0.78, "rgba(45, 125, 185, 0.015)");
  grad2.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.beginPath();
  ctx.moveTo(originX - 130, originY);
  ctx.lineTo(originX + 50, originY);
  ctx.lineTo(endX2 + 110, endY2);
  ctx.lineTo(endX2 - 130, endY2);
  ctx.closePath();
  ctx.fillStyle = grad2;
  ctx.fill();

  // Beam 3: Specular accent ray
  const angle3 = 0.52 + scrollRatio * 0.07;
  const endX3 = originX - Math.sin(angle3) * beamLength;
  const endY3 = originY + Math.cos(angle3) * beamLength;

  const grad3 = ctx.createLinearGradient(originX, originY, endX3, endY3);
  grad3.addColorStop(0, "rgba(240, 248, 255, 0.07)");
  grad3.addColorStop(0.38, "rgba(185, 225, 255, 0.026)");
  grad3.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.beginPath();
  ctx.moveTo(originX + 85, originY);
  ctx.lineTo(originX + 135, originY);
  ctx.lineTo(endX3 + 190, endY3);
  ctx.lineTo(endX3 + 125, endY3);
  ctx.closePath();
  ctx.fillStyle = grad3;
  ctx.fill();

  ctx.restore();
}

function renderGroundPlane(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  panX: number,
  panY: number,
  scrollRatio: number,
  objects: WorldObject[],
  cameraY: number
) {
  // Smooth, gradual progression into lower sections without abrupt cuts
  if (scrollRatio < 0.15) return;

  const smoothFade = Math.max(0, Math.min(1, (scrollRatio - 0.15) / 0.4));
  const opacity = Math.pow(smoothFade, 2.0) * 0.55;
  const horizonY = height * 0.76 + panY * 0.1;
  const vanishingX = width * 0.5 + panX * 0.15;

  ctx.save();

  // 1. Subtle, ethereal horizon ambient glow (soft radial falloff, no hard horizontal line)
  const horizGlow = ctx.createRadialGradient(
    vanishingX, horizonY, 20,
    vanishingX, horizonY, width * 0.65
  );
  horizGlow.addColorStop(0, `rgba(160, 215, 255, ${0.045 * opacity})`);
  horizGlow.addColorStop(0.4, `rgba(120, 180, 230, ${0.02 * opacity})`);
  horizGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = horizGlow;
  ctx.beginPath();
  ctx.ellipse(vanishingX, horizonY, width * 0.7, 90, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Perspective depth rays that fade in softly from the vanishing point
  ctx.lineWidth = 0.75;
  const floorLineCount = 12;
  for (let i = -floorLineCount / 2; i <= floorLineCount / 2; i++) {
    const bottomX = vanishingX + i * (width / floorLineCount) * 1.6;
    const grad = ctx.createLinearGradient(vanishingX, horizonY, bottomX, height);
    grad.addColorStop(0, "rgba(255, 255, 255, 0)");
    grad.addColorStop(0.25, `rgba(180, 215, 245, ${0.018 * opacity})`);
    grad.addColorStop(0.85, `rgba(130, 185, 230, ${0.038 * opacity})`);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(vanishingX, horizonY);
    ctx.lineTo(bottomX, height);
    ctx.stroke();
  }

  // 3. Subtle, soft object specular reflections on the floor
  for (const obj of objects) {
    const depthParallax = obj.depthTier === "background" ? 0.52 : 0.85;
    const effCamY = cameraY * depthParallax;
    const fov = 750;
    const camY = obj.basePos[1] - effCamY;
    const scale = fov / (fov + obj.basePos[2]);
    const objScreenX = obj.basePos[0] * scale + width / 2 + panX;
    const objScreenY = camY * scale + height / 2 + panY;

    if (objScreenY > horizonY - 200 && objScreenY < horizonY + 120) {
      const reflY = horizonY + Math.max(15, (horizonY - objScreenY) * 0.4);
      if (reflY > horizonY && reflY < height) {
        const reflR = obj.radius * scale * 1.1;
        const reflGrad = ctx.createRadialGradient(objScreenX, reflY, reflR * 0.1, objScreenX, reflY, reflR);
        reflGrad.addColorStop(0, `rgba(150, 210, 255, ${0.045 * opacity})`);
        reflGrad.addColorStop(0.5, `rgba(100, 170, 230, ${0.02 * opacity})`);
        reflGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.ellipse(objScreenX, reflY, reflR * 1.25, reflR * 0.35, 0, 0, Math.PI * 2);
        ctx.fillStyle = reflGrad;
        ctx.fill();
      }
    }
  }

  ctx.restore();
}

function renderPolyhedron(
  ctx: CanvasRenderingContext2D,
  mesh: Mesh3D,
  basePos: Vec3,
  rot: Vec3,
  effectiveCamY: number,
  panX: number,
  panY: number,
  width: number,
  height: number,
  keyLight: Vec3,
  fillLight: Vec3,
  material: "silver" | "graphite" | "iridescent"
) {
  const fov = 750;
  const rotatedVerts: Vec3[] = mesh.vertices.map((v) => {
    return rotateEuler(v, rot[0], rot[1], rot[2]);
  });

  const worldVerts: Vec3[] = rotatedVerts.map(([vx, vy, vz]) => {
    return [vx + basePos[0], vy + basePos[1], vz + basePos[2]];
  });

  const projVerts: { x: number; y: number; z: number }[] = worldVerts.map(([wx, wy, wz]) => {
    const camY = wy - effectiveCamY;
    const scale = fov / (fov + wz);
    return {
      x: wx * scale + width / 2 + panX,
      y: camY * scale + height / 2 + panY,
      z: wz,
    };
  });

  const centerCamY = basePos[1] - effectiveCamY;
  const centerScale = fov / (fov + basePos[2]);
  const centerScreenY = centerCamY * centerScale + height / 2 + panY;
  if (centerScreenY < -320 || centerScreenY > height + 320) return;

  interface FaceRenderData {
    indices: [number, number, number];
    normal: Vec3;
    avgZ: number;
  }

  const visibleFaces: FaceRenderData[] = [];

  for (const [i0, i1, i2] of mesh.faces) {
    const v0 = worldVerts[i0];
    const v1 = worldVerts[i1];
    const v2 = worldVerts[i2];

    const u: Vec3 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
    const v: Vec3 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
    const n = normalize(cross(u, v));

    if (n[2] > -0.05) {
      const avgZ = (projVerts[i0].z + projVerts[i1].z + projVerts[i2].z) / 3;
      visibleFaces.push({ indices: [i0, i1, i2], normal: n, avgZ });
    }
  }

  visibleFaces.sort((a, b) => b.avgZ - a.avgZ);

  for (const { indices: [i0, i1, i2], normal: n, avgZ } of visibleFaces) {
    const p0 = projVerts[i0];
    const p1 = projVerts[i1];
    const p2 = projVerts[i2];

    const d1 = Math.max(0, dot(n, keyLight));
    const d2 = Math.max(0, dot(n, fillLight));

    const rz = 2 * d1 * n[2] - keyLight[2];
    const spec = Math.pow(Math.max(0, rz), 16);
    const rim = Math.pow(1 - Math.abs(n[2]), 2.5);

    const fog = Math.min(0.65, Math.max(0, (avgZ - 200) / 900));
    const fogDamp = 1 - fog * 0.6;

    const cx = (p0.x + p1.x + p2.x) / 3;
    const cy = (p0.y + p1.y + p2.y) / 3;

    const lLen = Math.hypot(keyLight[0], keyLight[1]) || 1;
    const ndx = keyLight[0] / lLen;
    const ndy = keyLight[1] / lLen;
    const rFace = Math.max(
      Math.hypot(p0.x - cx, p0.y - cy),
      Math.hypot(p1.x - cx, p1.y - cy),
      Math.hypot(p2.x - cx, p2.y - cy)
    );

    const gx0 = cx - ndx * rFace * 0.8;
    const gy0 = cy - ndy * rFace * 0.8;
    const gx1 = cx + ndx * rFace * 0.8;
    const gy1 = cy + ndy * rFace * 0.8;

    const grad = ctx.createLinearGradient(gx0, gy0, gx1, gy1);

    let baseR = 14, baseG = 18, baseB = 24;
    let highR = 190, highG = 215, highB = 240;

    if (material === "silver") {
      baseR = Math.floor((14 + d1 * 80 + d2 * 50) * fogDamp);
      baseG = Math.floor((18 + d1 * 95 + d2 * 40) * fogDamp);
      baseB = Math.floor((24 + d1 * 115 + d2 * 25) * fogDamp);

      highR = Math.min(255, Math.floor((30 + d1 * 175 + d2 * 70 + spec * 255 + rim * 30) * fogDamp));
      highG = Math.min(255, Math.floor((36 + d1 * 195 + d2 * 50 + spec * 255 + rim * 120) * fogDamp));
      highB = Math.min(255, Math.floor((48 + d1 * 225 + d2 * 30 + spec * 255 + rim * 200) * fogDamp));
    } else if (material === "graphite") {
      baseR = Math.floor((10 + d1 * 50 + d2 * 35) * fogDamp);
      baseG = Math.floor((12 + d1 * 60 + d2 * 25) * fogDamp);
      baseB = Math.floor((16 + d1 * 75 + d2 * 18) * fogDamp);

      highR = Math.min(255, Math.floor((20 + d1 * 110 + d2 * 45 + spec * 200 + rim * 20) * fogDamp));
      highG = Math.min(255, Math.floor((24 + d1 * 125 + d2 * 35 + spec * 200 + rim * 80) * fogDamp));
      highB = Math.min(255, Math.floor((32 + d1 * 150 + d2 * 20 + spec * 200 + rim * 140) * fogDamp));
    } else {
      baseR = Math.floor((16 + d1 * 70 + d2 * 60) * fogDamp);
      baseG = Math.floor((18 + d1 * 85 + d2 * 35) * fogDamp);
      baseB = Math.floor((28 + d1 * 120 + d2 * 45) * fogDamp);

      highR = Math.min(255, Math.floor((26 + d1 * 155 + d2 * 80 + spec * 255 + rim * 80) * fogDamp));
      highG = Math.min(255, Math.floor((30 + d1 * 185 + d2 * 40 + spec * 255 + rim * 160) * fogDamp));
      highB = Math.min(255, Math.floor((44 + d1 * 230 + d2 * 50 + spec * 255 + rim * 235) * fogDamp));
    }

    grad.addColorStop(0, `rgba(${baseR}, ${baseG}, ${baseB}, 0.94)`);
    grad.addColorStop(1, `rgba(${highR}, ${highG}, ${highB}, 0.94)`);

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    const edgeAlpha = Math.min(0.42, Math.max(0.06, (0.09 + d1 * 0.32) * fogDamp));
    ctx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha})`;
    ctx.lineWidth = 0.75;
    ctx.stroke();
  }
}

function renderParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  cameraY: number,
  panX: number,
  panY: number,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean
) {
  const fov = 750;

  for (const p of particles) {
    if (!reducedMotion) {
      p.x += Math.sin(time * 0.4 + p.phase) * p.driftX;
      p.y -= p.driftY;
      if (p.y < -400) p.y = 2700;
      if (p.y > 2700) p.y = -400;
    }

    const depthParallax = p.tier === "background" ? 0.48 : p.tier === "foreground" ? 1.2 : 0.85;
    const effCamY = cameraY * depthParallax;

    const camY = p.y - effCamY;
    const scale = fov / (fov + p.z);
    const px = p.x * scale + width / 2 + panX;
    const py = camY * scale + height / 2 + panY;

    if (px < -15 || px > width + 15 || py < -15 || py > height + 15) continue;

    const shaftX = width * 0.74 - py * 0.6;
    const distToShaft = Math.abs(px - shaftX);
    const shaftBoost = distToShaft < 180 ? 1.75 : 1.0;

    const currentRadius = p.baseRadius * scale;
    const currentAlpha = Math.min(1, p.alpha * scale * shaftBoost);

    ctx.beginPath();
    ctx.arc(px, py, currentRadius, 0, Math.PI * 2);

    if (p.colorType === "cyan") {
      ctx.fillStyle = `rgba(115, 220, 255, ${currentAlpha})`;
    } else if (p.colorType === "amber") {
      ctx.fillStyle = `rgba(235, 175, 100, ${currentAlpha})`;
    } else {
      ctx.fillStyle = `rgba(240, 245, 255, ${currentAlpha})`;
    }

    ctx.fill();
  }
}
// --- Main BackgroundEnvironment Component ---

export function BackgroundEnvironment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    function resizeCanvas() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();

    const xMultiplier = isMobile ? 0.45 : 1;
    const sizeMultiplier = isMobile ? 0.68 : 1;

    // Curated 3D Objects: Framing the Hero Centerpiece & Guiding Through Lower Sections
    const objects: WorldObject[] = [
      // 1. Hero Upper-Right: Grand Faceted Icosahedron (Reference A, Midground framing)
      {
        type: "polyhedron",
        mesh: createIcosahedron(105 * sizeMultiplier),
        basePos: [420 * xMultiplier, -180, 350],
        rotSpeed: [0.002, 0.0035, 0.0015],
        currentRot: [0.3, 0.4, 0.1],
        radius: 105 * sizeMultiplier,
        material: "silver",
        depthTier: "midground",
      },
      // 2. Hero Upper-Left Distance: Colossal Monolith Shard (Reference A, Deep Background)
      {
        type: "polyhedron",
        mesh: createCrystalPrism(95 * sizeMultiplier),
        basePos: [-430 * xMultiplier, -220, 880],
        rotSpeed: [0.0012, -0.0018, 0.001],
        currentRot: [0.2, 0.7, 0.3],
        radius: 95 * sizeMultiplier,
        material: "graphite",
        depthTier: "background",
      },
      // 3. Middle Section (Capabilities): Architectural Crystal Prism (Midground)
      {
        type: "polyhedron",
        mesh: createCrystalPrism(95 * sizeMultiplier),
        basePos: [410 * xMultiplier, 820, 360],
        rotSpeed: [0.0028, -0.0025, 0.0015],
        currentRot: [0.5, 0.8, 0.2],
        radius: 95 * sizeMultiplier,
        material: "graphite",
        depthTier: "midground",
      },
      // 4. Middle Section Distance: Distant Geometric Anchor (Deep Background)
      {
        type: "polyhedron",
        mesh: createCube(72 * sizeMultiplier),
        basePos: [-430 * xMultiplier, 900, 920],
        rotSpeed: [0.0014, 0.0018, -0.0012],
        currentRot: [0.6, 0.2, 0.4],
        radius: 72 * sizeMultiplier,
        material: "graphite",
        depthTier: "background",
      },
      // 5. Projects Section: Tumbling Beveled Cube (Midground)
      {
        type: "polyhedron",
        mesh: createCube(82 * sizeMultiplier),
        basePos: [-380 * xMultiplier, 1520, 280],
        rotSpeed: [0.0025, 0.003, -0.002],
        currentRot: [0.4, 0.6, 0.5],
        radius: 82 * sizeMultiplier,
        material: "silver",
        depthTier: "midground",
      },
      // 6. Finale Section (Education & Contact): Floating Satellite Octahedron over Reflective Floor
      {
        type: "polyhedron",
        mesh: createOctahedron(74 * sizeMultiplier),
        basePos: [340 * xMultiplier, 2180, 220],
        rotSpeed: [-0.0025, 0.004, 0.002],
        currentRot: [0.2, 0.5, 0.4],
        radius: 74 * sizeMultiplier,
        material: "iridescent",
        depthTier: "midground",
      },
    ];

    // Atmospheric Particles across 3 Depth Planes
    const particles: Particle[] = [];
    const bgCount = isMobile ? 18 : 40;
    const midCount = isMobile ? 12 : 35;
    const fgCount = isMobile ? 0 : 8;

    for (let i = 0; i < bgCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * (isMobile ? 800 : 1600),
        y: Math.random() * 3000 - 400,
        z: 600 + Math.random() * 500,
        baseRadius: 0.5 + Math.random() * 0.5,
        alpha: 0.12 + Math.random() * 0.25,
        driftX: 0.05 + Math.random() * 0.1,
        driftY: 0.1 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
        colorType: Math.random() > 0.6 ? "cyan" : "white",
        tier: "background",
      });
    }

    for (let i = 0; i < midCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * (isMobile ? 700 : 1300),
        y: Math.random() * 3000 - 400,
        z: 200 + Math.random() * 400,
        baseRadius: 1.0 + Math.random() * 0.8,
        alpha: 0.22 + Math.random() * 0.45,
        driftX: 0.1 + Math.random() * 0.2,
        driftY: 0.2 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        colorType: Math.random() > 0.65 ? "cyan" : Math.random() > 0.4 ? "amber" : "white",
        tier: "midground",
      });
    }

    for (let i = 0; i < fgCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1100,
        y: Math.random() * 3000 - 400,
        z: 60 + Math.random() * 120,
        baseRadius: 2.2 + Math.random() * 1.2,
        alpha: 0.18 + Math.random() * 0.22,
        driftX: 0.15 + Math.random() * 0.25,
        driftY: 0.35 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        colorType: Math.random() > 0.5 ? "cyan" : "white",
        tier: "foreground",
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetPanX = 0;
    let targetPanY = 0;
    let panX = 0;
    let panY = 0;

    let targetScrollRatio = 0;
    let currentScrollRatio = 0;
    let cameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetPanX = (mouseX / width - 0.5) * 55;
      targetPanY = (mouseY / height - 0.5) * 35;
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollRatio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      if (prefersReducedMotion) {
        currentScrollRatio = targetScrollRatio;
        cameraY = currentScrollRatio * 2250;
        renderFrame(performance.now());
      }
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let isTabVisible = true;
    let lastTime = performance.now();
    let time = 0;

    function renderFrame(now: number) {
      if (!ctx || !canvas) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += delta;

      panX += (targetPanX - panX) * 0.045;
      panY += (targetPanY - panY) * 0.045;
      currentScrollRatio += (targetScrollRatio - currentScrollRatio) * 0.06;
      cameraY += (currentScrollRatio * 2250 - cameraY) * 0.06;

      ctx.fillStyle = "#040404";
      ctx.fillRect(0, 0, width, height);

      const ambGrad = ctx.createRadialGradient(
        width * 0.65 + panX * 0.45,
        height * 0.22 + panY * 0.45,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      ambGrad.addColorStop(0, "rgba(16, 22, 34, 0.7)");
      ambGrad.addColorStop(0.45, "rgba(7, 10, 15, 0.45)");
      ambGrad.addColorStop(1, "rgba(4, 4, 4, 0)");
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, width, height);

      renderLightShafts(ctx, width, height, panX, panY, currentScrollRatio);
      renderGroundPlane(ctx, width, height, panX, panY, currentScrollRatio, objects, cameraY);

      const keyLight: Vec3 = normalize([0.55 + panX * 0.003, -0.75 + panY * 0.003, 0.6]);
      const fillLight: Vec3 = normalize([-0.45, 0.6, 0.35]);

      for (const obj of objects) {
        if (!prefersReducedMotion) {
          obj.currentRot[0] += obj.rotSpeed[0];
          obj.currentRot[1] += obj.rotSpeed[1];
          obj.currentRot[2] += obj.rotSpeed[2];
        }

        const depthParallax = obj.depthTier === "background" ? 0.52 : 0.85;
        const effectiveCamY = cameraY * depthParallax;

        renderPolyhedron(
          ctx,
          obj.mesh,
          obj.basePos,
          obj.currentRot,
          effectiveCamY,
          panX,
          panY,
          width,
          height,
          keyLight,
          fillLight,
          obj.material
        );
      }

      renderParticles(
        ctx,
        particles,
        cameraY,
        panX,
        panY,
        width,
        height,
        time,
        prefersReducedMotion
      );

      if (!prefersReducedMotion && isTabVisible) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    }

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !prefersReducedMotion) {
        lastTime = performance.now();
        renderFrame(lastTime);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (prefersReducedMotion) {
      renderFrame(performance.now());
    } else {
      animationFrameId = requestAnimationFrame(renderFrame);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#040404]">
      {/* 3D Cinematic Canvas World */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Atmospheric Film Grain Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cinematic Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 45%, rgba(4, 4, 4, 0.72) 100%)"
        }}
      />
    </div>
  );
}
