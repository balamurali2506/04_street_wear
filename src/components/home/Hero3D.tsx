'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useStore } from '@/store/useStore';

export const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Group for the 3D '04' Emblem
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Chrome Metallic Material
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: false,
    });

    const orangeAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4d00,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xff3300,
      emissiveIntensity: 0.35,
    });

    // Outer Industrial Ring / Medallion
    const ringGeo = new THREE.TorusGeometry(2.05, 0.10, 16, 64);
    const ringMesh = new THREE.Mesh(ringGeo, chromeMaterial);
    emblemGroup.add(ringMesh);

    // Segmented Outer Teeth / Brutalist Notch Ring
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const toothGeo = new THREE.BoxGeometry(0.12, 0.32, 0.18);
      const tooth = new THREE.Mesh(toothGeo, i % 4 === 0 ? orangeAccentMaterial : chromeMaterial);
      tooth.position.x = Math.cos(angle) * 2.2;
      tooth.position.y = Math.sin(angle) * 2.2;
      tooth.rotation.z = angle;
      emblemGroup.add(tooth);
    }

    // Unified Electric Signal Orange Material for both '0' and '4'
    const numberMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4d00,
      metalness: 0.65,
      roughness: 0.22,
      emissive: 0xff3800,
      emissiveIntensity: 0.45,
    });

    // Extrusion settings for crisp, architectural 3D numerals
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    // --- EXACT NUMERAL '0' SHAPE ---
    const zeroShape = new THREE.Shape();
    const zW = 0.38;
    const zH = 0.70;
    const zR = 0.16; // Chamfered corners
    zeroShape.moveTo(-zW + zR, zH);
    zeroShape.lineTo(zW - zR, zH);
    zeroShape.lineTo(zW, zH - zR);
    zeroShape.lineTo(zW, -zH + zR);
    zeroShape.lineTo(zW - zR, -zH);
    zeroShape.lineTo(-zW + zR, -zH);
    zeroShape.lineTo(-zW, -zH + zR);
    zeroShape.lineTo(-zW, zH - zR);
    zeroShape.closePath();

    // Inner hole for '0'
    const zeroHole = new THREE.Path();
    const zhW = 0.14;
    const zhH = 0.46;
    const zhR = 0.08;
    zeroHole.moveTo(-zhW + zhR, zhH);
    zeroHole.lineTo(zhW - zhR, zhH);
    zeroHole.lineTo(zhW, zhH - zhR);
    zeroHole.lineTo(zhW, -zhH + zhR);
    zeroHole.lineTo(zhW - zhR, -zhH);
    zeroHole.lineTo(-zhW + zhR, -zhH);
    zeroHole.lineTo(-zhW, -zhH + zhR);
    zeroHole.lineTo(-zhW, zhH - zhR);
    zeroHole.closePath();
    zeroShape.holes.push(zeroHole);

    const zeroGeo = new THREE.ExtrudeGeometry(zeroShape, extrudeSettings);
    zeroGeo.center();
    const zeroMesh = new THREE.Mesh(zeroGeo, numberMaterial);
    zeroMesh.position.set(-0.55, 0, 0);
    emblemGroup.add(zeroMesh);

    // --- EXACT NUMERAL '4' SHAPE ---
    const fourShape = new THREE.Shape();
    fourShape.moveTo(0.12, 0.70);   // Top left of vertical stem
    fourShape.lineTo(0.38, 0.70);   // Top right of vertical stem
    fourShape.lineTo(0.38, 0.06);   // Down to crossbar top
    fourShape.lineTo(0.48, 0.06);   // Crossbar right overhang
    fourShape.lineTo(0.48, -0.18);  // Crossbar right bottom
    fourShape.lineTo(0.38, -0.18);  // Back to stem right edge
    fourShape.lineTo(0.38, -0.70);  // Bottom right of stem
    fourShape.lineTo(0.12, -0.70);  // Bottom left of stem
    fourShape.lineTo(0.12, -0.18);  // Up to bottom of crossbar
    fourShape.lineTo(-0.46, -0.18); // Left bottom tip of crossbar
    fourShape.lineTo(-0.46, 0.06);  // Left top tip of crossbar
    fourShape.lineTo(0.12, 0.70);   // Diagonal to top of stem
    fourShape.closePath();

    // Inner triangular hole for '4'
    const fourHole = new THREE.Path();
    fourHole.moveTo(0.12, 0.06);
    fourHole.lineTo(-0.16, 0.06);
    fourHole.lineTo(0.12, 0.40);
    fourHole.closePath();
    fourShape.holes.push(fourHole);

    const fourGeo = new THREE.ExtrudeGeometry(fourShape, extrudeSettings);
    fourGeo.center();
    const fourMesh = new THREE.Mesh(fourGeo, numberMaterial);
    fourMesh.position.set(0.55, 0, 0);
    emblemGroup.add(fourMesh);

    // Background Floating Dust / Street Spores Particle System
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 15;
      particlePositions[i + 1] = (Math.random() - 0.5) * 15;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Signal Orange Hazard Rim Light
    const orangeRimLight = new THREE.PointLight(0xff4d00, 8.0, 20);
    orangeRimLight.position.set(-4, -3, 3);
    scene.add(orangeRimLight);

    // Cold Blue/Cyan Contrast Light
    const fillLight = new THREE.PointLight(0xaaccff, 4.0, 20);
    fillLight.position.set(3, -4, -2);
    scene.add(fillLight);

    // Mouse Tracking for dynamic 3D inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -(((e.clientY - rect.top) / container.clientHeight) * 2 - 1);
      targetX = x * 0.7;
      targetY = y * 0.7;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth lerp mouse tracking
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Luxury forward-facing tilt (always faces the user, never spins backwards)
        emblemGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.22 + mouseX * 0.55;
        emblemGroup.rotation.x = Math.cos(elapsedTime * 0.6) * 0.12 - mouseY * 0.40;
        emblemGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.04;

        // Subtle floating bob
        emblemGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

        // Dust drift
        particleField.rotation.y = elapsedTime * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const headlineChars = "DROP 04: MONOLITH".split("");

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-12 px-4 sm:px-8 bg-[#0A0A0A]">
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setCursor('DRAG 3D')}
        onMouseLeave={resetCursor}
      />

      {/* Hero Top Overhead Sub-Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          <span>AUTUMN / WINTER 2026</span>
          <span className="hidden sm:inline text-neutral-600">//</span>
          <span className="hidden sm:inline text-neutral-500">LIMITED TO 50 UNITS PER SILHOUETTE</span>
        </div>
        <div className="flex items-center gap-2 text-[#FF4D00] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>GLOBAL DROPSHIP</span>
        </div>
      </div>

      {/* Hero Center Giant Brutalist Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto pointer-events-none select-none">
        <div className="flex items-center gap-3 font-mono text-xs md:text-sm text-[#FF4D00] uppercase tracking-widest font-black mb-2">
          <span>[ 04 ARCHIVE SPECIFICATION ]</span>
          <div className="h-[1px] w-12 bg-[#FF4D00]" />
          <span>TOKYO • MUMBAI UNDERGROUND</span>
        </div>

        {/* Staggered Character Mask Reveal Headline */}
        <div className="overflow-hidden">
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-[0.85] tracking-tighter text-white uppercase flex flex-wrap">
            {headlineChars.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.75,
                  delay: 0.15 + index * 0.03,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className={`inline-block glitch-hover ${char === ' ' ? 'mr-4 sm:mr-8' : ''} ${
                  index >= 8 ? 'text-[#FF4D00]' : ''
                }`}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 font-mono text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed uppercase"
        >
          Architectural silhouettes cut from custom 500 GSM loopback cotton and ballistic cordura.
          Engineered for subterranean concrete landscapes.
        </motion.p>
      </div>

      {/* Hero Bottom Bar with Magnetic Action Button */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-8 border-t border-neutral-800/80 font-mono text-xs">
        <div className="flex flex-col gap-1 text-neutral-500 uppercase">
          <span>COORDINATES: 35.6580° N, 139.7016° E</span>
          <span className="text-neutral-400">INSTAGRAM: <strong className="text-white">@04_street_wear</strong></span>
        </div>

        {/* Magnetic Button */}
        <div className="pointer-events-auto">
          <Link href="/shop">
            <MagneticButton
              onMouseEnter={() => setCursor('EXPLORE')}
              onMouseLeave={resetCursor}
              className="px-8 py-4 bg-[#FF4D00] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-3 shadow-[0_0_30px_rgba(255,77,0,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              <span>SHOP THE DROP</span>
              <ArrowDownRight className="w-4 h-4" />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
