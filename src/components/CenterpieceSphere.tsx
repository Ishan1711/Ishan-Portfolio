"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

varying vec2 v_uv;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_radius;
uniform vec2 u_centerOffset;
uniform float u_reducedMotion;
uniform float u_opacity;
uniform float u_scrollProgress;

mat3 rotateY(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
}

mat3 rotateX(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, -s,
    0.0, s, c
  );
}

vec3 getIridescentColor(vec3 p_local, float time) {
  vec3 q = p_local * 2.2 + vec3(0.0, time * 0.12, 0.0);
  float n1 = sin(q.x * 2.4 + q.y * 1.8 + cos(q.z * 2.2 + time * 0.15));
  float n2 = cos(q.y * 2.6 - q.z * 1.6 + sin(q.x * 2.0 - time * 0.1));
  vec3 warped = q + vec3(n1, n2, n1 * 0.5) * 0.45;

  float flow = sin(warped.y * 3.2 + warped.x * 2.0 + warped.z * 1.8 + time * 0.18);
  float band = smoothstep(-0.55, 0.55, flow);

  float ripple = sin(warped.y * 7.5 - warped.z * 3.5 + time * 0.25) * 0.5 + 0.5;

  // Luminous Pearlescent Base (Ivory & Silver)
  vec3 basePearlescent = mix(vec3(0.92, 0.94, 0.96), vec3(0.82, 0.85, 0.90), ripple * 0.5);

  // Flowing Cyan & Turquoise Ribbons (Reference Image)
  vec3 cyanTurquoise = mix(vec3(0.12, 0.88, 0.92), vec3(0.06, 0.76, 0.84), ripple);

  // Soft Violet & Pink Transitions (Reference Image)
  vec3 violetPink = mix(vec3(0.68, 0.44, 0.88), vec3(0.88, 0.50, 0.72), ripple);

  vec3 ribbonColor = mix(cyanTurquoise, violetPink, smoothstep(0.2, 0.8, band));
  return mix(basePearlescent, ribbonColor, 0.65);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

  float scrollFactor = u_scrollProgress;
  float camDist = mix(3.2, 4.4, clamp(scrollFactor * 0.7, 0.0, 1.0));
  vec3 ro = vec3(0.0, 0.0, camDist);
  vec3 rd = normalize(vec3(uv, -1.8));

  float hover = sin(u_time * 0.75) * 0.025 * (1.0 - u_reducedMotion);
  vec3 sphereCenter = vec3(u_centerOffset.x, u_centerOffset.y + hover, 0.0);
  float sphereRadius = u_radius;

  vec3 lightDir = normalize(vec3(0.65 + u_mouse.x * 0.15, 0.75 + u_mouse.y * 0.15, 0.85));
  vec3 fillDir = normalize(vec3(-0.6, -0.4, 0.4));

  vec3 oc = ro - sphereCenter;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - sphereRadius * sphereRadius;
  float h = b * b - c;

  bool hitSphere = false;
  float tSphere = 0.0;

  if (h > 0.0) {
    hitSphere = true;
    tSphere = -b - sqrt(h);
  }

  float floorY = sphereCenter.y - sphereRadius * 1.35;
  bool hitFloor = false;
  float tFloor = 0.0;

  if (rd.y < 0.0) {
    tFloor = (floorY - ro.y) / rd.y;
    if (tFloor > 0.0) {
      hitFloor = true;
    }
  }

  vec4 finalColor = vec4(0.0);

  // 1. Dark Textured Ground Plane & Cool Specular Floor Reflection
  if (hitFloor && (!hitSphere || tFloor < tSphere)) {
    vec3 pFloor = ro + tFloor * rd;
    vec3 nFloor = vec3(0.0, 1.0, 0.0);

    float fineNoise = sin(pFloor.x * 16.0) * cos(pFloor.z * 16.0) * 0.01;
    vec3 floorCol = vec3(0.02, 0.025, 0.032) + fineNoise;

    float distToCenterFloor = length(pFloor.xz - sphereCenter.xz);
    float contactShadow = smoothstep(sphereRadius * 0.5, sphereRadius * 2.4, distToCenterFloor);
    floorCol *= (0.35 + 0.65 * contactShadow);

    vec3 reflDir = reflect(rd, nFloor);
    vec3 ocRefl = pFloor - sphereCenter;
    float bRefl = dot(ocRefl, reflDir);
    float cRefl = dot(ocRefl, ocRefl) - sphereRadius * sphereRadius;
    float hRefl = bRefl * bRefl - cRefl;

    float floorReflStrength = 0.0;
    if (hRefl > 0.0) {
      float tRefl = -bRefl - sqrt(hRefl);
      if (tRefl > 0.0) {
        vec3 pRefl = pFloor + tRefl * reflDir;
        vec3 nRefl = normalize(pRefl - sphereCenter);
        vec3 reflSurface = getIridescentColor(nRefl, u_time);
        float floorFresnel = pow(1.0 - max(0.0, dot(nFloor, -rd)), 3.0);
        floorCol += reflSurface * (0.28 * floorFresnel);
        floorReflStrength = floorFresnel;
      }
    }

    // Transparent floor mask: only opaque where the shadow & reflection exist
    float floorFade = smoothstep(10.0, 2.0, tFloor);
    float floorMask = clamp((1.0 - contactShadow) * 0.85 + floorReflStrength * 0.75, 0.0, 1.0);
    float floorAlpha = floorMask * floorFade * 0.85;

    finalColor = vec4(floorCol, floorAlpha);
  }

  // 2. 3D Iridescent Pearlescent Sphere
  if (hitSphere && (!hitFloor || tSphere < tFloor)) {
    vec3 p = ro + tSphere * rd;
    vec3 N = normalize(p - sphereCenter);
    vec3 V = -rd;

    float rotAngleY = u_time * 0.08 * (1.0 - u_reducedMotion) + u_mouse.x * 0.35 + scrollFactor * 0.4;
    float rotAngleX = u_time * 0.05 * (1.0 - u_reducedMotion) - u_mouse.y * 0.25 + scrollFactor * 0.2;
    vec3 pRot = rotateX(rotAngleX) * rotateY(rotAngleY) * N;

    vec3 albedo = getIridescentColor(pRot, u_time * (1.0 - u_reducedMotion) + scrollFactor * 0.3);

    float diffKey = max(0.0, dot(N, lightDir));
    float wrapDiff = pow(diffKey * 0.5 + 0.5, 2.2);

    vec3 halfKey = normalize(lightDir + V);
    float specSharp = pow(max(0.0, dot(N, halfKey)), 72.0);
    float specSoft = pow(max(0.0, dot(N, halfKey)), 18.0);

    vec3 halfFill = normalize(fillDir + V);
    float specFill = pow(max(0.0, dot(N, halfFill)), 32.0);

    float fresnel = pow(1.0 - max(0.0, dot(N, V)), 3.2);
    vec3 rimColor = mix(vec3(0.4, 0.92, 1.0), vec3(0.85, 0.55, 0.95), sin(u_time * 0.4 + pRot.y * 2.5) * 0.5 + 0.5);

    vec3 sphereCol = albedo * (wrapDiff * 0.85 + 0.15);
    sphereCol += vec3(1.0, 1.0, 1.0) * (specSharp * 0.92 + specSoft * 0.28);
    sphereCol += vec3(0.85, 0.65, 0.45) * (specFill * 0.22);
    sphereCol += rimColor * (fresnel * 0.68);

    finalColor = vec4(sphereCol, 1.0);
  }

  // 3. Soft Atmospheric Halo around the sphere
  if (!hitSphere) {
    float bgDist = length(uv - sphereCenter.xy);
    float halo = exp(-bgDist * 3.6) * 0.16;
    vec3 haloCol = mix(vec3(0.15, 0.65, 0.9), vec3(0.7, 0.45, 0.85), sin(u_time * 0.4) * 0.5 + 0.5);
    finalColor.rgb = mix(finalColor.rgb, haloCol, halo);
    finalColor.a = max(finalColor.a, halo * 0.9);
  }

  finalColor *= u_opacity;
  gl_FragColor = finalColor;
}
`;
export function CenterpieceSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = (canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false }) || 
                canvas.getContext("experimental-webgl", { alpha: true, premultipliedAlpha: false })) as WebGLRenderingContext | null;
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.warn("WebGL Shader error:", glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) {
      setHasWebGL(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setHasWebGL(false);
      return;
    }
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("WebGL Program link error:", gl.getProgramInfoLog(program));
      setHasWebGL(false);
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRadius = gl.getUniformLocation(program, "u_radius");
    const uCenterOffset = gl.getUniformLocation(program, "u_centerOffset");
    const uReducedMotion = gl.getUniformLocation(program, "u_reducedMotion");
    const uOpacity = gl.getUniformLocation(program, "u_opacity");
    const uScrollProgress = gl.getUniformLocation(program, "u_scrollProgress");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      if (!canvas || !container || !gl) return;
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      const isMobile = window.innerWidth < 768;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Scroll tracking for cinematic centerpiece journey
    let targetScrollY = 0;
    let currentScrollY = 0;
    let animationFrameId = 0;
    let startTime = performance.now();
    let isLoopRunning = false;
    let isTabVisible = !document.hidden;

    function startLoop() {
      if (isLoopRunning || prefersReducedMotion || !isTabVisible) return;
      isLoopRunning = true;
      animationFrameId = requestAnimationFrame(render);
    }

    function stopLoop() {
      if (!isLoopRunning) return;
      isLoopRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    }

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      const heroH = height || window.innerHeight || 800;
      if (targetScrollY < heroH * 1.35) {
        startLoop();
      }
      if (prefersReducedMotion) {
        currentScrollY = targetScrollY;
        render();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    function render() {
      if (!gl || !canvas) return;

      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        currentScrollY += (targetScrollY - currentScrollY) * 0.075;
      }

      const heroH = height || window.innerHeight || 800;
      const scrollProgress = prefersReducedMotion ? 0 : Math.max(0, currentScrollY / heroH);

      const isMobile = width < 768;
      const baseRadius = isMobile ? 0.19 : 0.24;

      // Natural 3D Parallax Scroll Choreography
      const scrollT = Math.min(1.0, scrollProgress * 1.2);
      const easedScroll = scrollT * scrollT * (3.0 - 2.0 * scrollT);

      const radius = baseRadius * (1.0 - easedScroll * 0.26);
      const centerOffsetX = isMobile ? 0.0 : easedScroll * 0.10;
      const centerOffsetY = -0.12 + easedScroll * 0.28;

      let opacity = 1.0;
      if (scrollProgress > 0.18) {
        opacity = Math.max(0.0, 1.0 - (scrollProgress - 0.18) / 0.62);
      }
      opacity = opacity * opacity * (3.0 - 2.0 * opacity);

      gl.useProgram(program);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Only perform fragment shader raymarching when visible to preserve GPU
      if (opacity > 0.005) {
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouseX, mouseY);
        gl.uniform1f(uTime, elapsed);
        gl.uniform1f(uRadius, radius);
        gl.uniform2f(uCenterOffset, centerOffsetX, centerOffsetY);
        gl.uniform1f(uReducedMotion, prefersReducedMotion ? 1.0 : 0.0);
        gl.uniform1f(uOpacity, opacity);
        gl.uniform1f(uScrollProgress, scrollProgress);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else if (scrollProgress > 0.8) {
        // Completely dissolved: sleep loop to conserve CPU/GPU
        stopLoop();
        return;
      }

      if (!prefersReducedMotion && isTabVisible && isLoopRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      const heroH = height || window.innerHeight || 800;
      if (isTabVisible && window.scrollY < heroH * 1.35) {
        startTime = performance.now();
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
      setHasWebGL(false);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    if (prefersReducedMotion) {
      render();
    } else {
      startLoop();
    }

    return () => {
      stopLoop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);

      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      {hasWebGL ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none"
        />
      ) : (
        <div className="relative w-80 h-80 rounded-full bg-gradient-to-tr from-[#0c1420] via-[#1a3848] to-[#147a96] shadow-[0_0_80px_rgba(40,180,220,0.3)]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85)_0%,transparent_60%)]" />
        </div>
      )}
    </div>
  );
}
