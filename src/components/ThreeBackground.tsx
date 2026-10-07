import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeBackground
 * Studio-grade, ultra-realistic 3D procedural food & beverage background for Mobile & Desktop.
 * Uses high-fidelity PBR (MeshPhysicalMaterial with optical transmission & refraction,
 * clearcoat gloss, procedural canvas textures for baked brioche, grill marks & citrus pulp),
 * ACESFilmicToneMapping, studio three-point lighting, and responsive camera frustum
 * positioning so items are perfectly visible on smartphones and desktop screens.
 */
export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // -------------------------------------------------------------------------
    // 1. SCENE, CAMERA, RENDERER WITH ACES FILMIC COLOR SCIENCE
    // -------------------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfff7ee, 0.015);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      130
    );
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------------------
    // 2. PROCEDURAL HIGH-RESOLUTION TEXTURES
    // -------------------------------------------------------------------------
    // A. Soft Bokeh Particle Texture (glowing circular dust motes)
    const createParticleTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 210, 100, 1)');
        gradient.addColorStop(0.35, 'rgba(255, 165, 45, 0.65)');
        gradient.addColorStop(0.7, 'rgba(255, 120, 20, 0.18)');
        gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    // B. Brioche Bun Gradient & Micro-Noise Bump Map
    const createBunTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(128, 128, 25, 128, 128, 128);
        grad.addColorStop(0, '#e8a34d');
        grad.addColorStop(0.55, '#c97722');
        grad.addColorStop(0.85, '#994a0a');
        grad.addColorStop(1, '#662f04');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);

        // Subtle baked flour speckle
        for (let i = 0; i < 500; i++) {
          const x = Math.random() * 256;
          const y = Math.random() * 256;
          const r = Math.random() * 1.6;
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)';
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    // C. Flame-Grilled Beef Patty Texture (charred sear marks & rustic meat pores)
    const createPattyTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#3c1c0f';
        ctx.fillRect(0, 0, 256, 256);

        for (let i = 0; i < 1400; i++) {
          const x = Math.random() * 256;
          const y = Math.random() * 256;
          const r = Math.random() * 2.2 + 0.4;
          ctx.fillStyle = Math.random() > 0.4 ? 'rgba(25, 9, 3, 0.45)' : 'rgba(95, 48, 26, 0.35)';
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Diamond grill marks
        ctx.strokeStyle = 'rgba(16, 5, 1, 0.7)';
        ctx.lineWidth = 14;
        ctx.beginPath();
        for (let x = -100; x < 356; x += 55) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x + 256, 256);
        }
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    // D. Pita / Shawarma Wrap Texture (toasted flatbread with griddle grill marks)
    const createPitaTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#fce7c8';
        ctx.fillRect(0, 0, 256, 256);

        // Toasted brown spots
        for (let i = 0; i < 40; i++) {
          const x = Math.random() * 256;
          const y = Math.random() * 256;
          const rx = Math.random() * 16 + 6;
          const ry = Math.random() * 8 + 3;
          ctx.fillStyle = 'rgba(168, 92, 28, 0.35)';
          ctx.beginPath();
          ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }

        // Griddle line stripes
        ctx.strokeStyle = 'rgba(120, 53, 15, 0.5)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        for (let y = 30; y < 256; y += 45) {
          ctx.moveTo(0, y);
          ctx.lineTo(256, y);
        }
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    const bunTexture = createBunTexture();
    const pattyTexture = createPattyTexture();
    const pitaTexture = createPitaTexture();
    const particleTexture = createParticleTexture();

    // -------------------------------------------------------------------------
    // 3. STUDIO LIGHTING RIG (WARM THREE-POINT + RIM REFLECTION)
    // -------------------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xfff7ee, 1.25);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaea, 3.0);
    keyLight.position.set(16, 24, 20);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf97316, 3.6);
    rimLight.position.set(-18, 16, -14);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x67e8f9, 1.1);
    fillLight.position.set(14, -14, -12);
    scene.add(fillLight);

    const interactiveLight = new THREE.PointLight(0xff7700, 2.2, 42);
    interactiveLight.position.set(0, 0, 8);
    scene.add(interactiveLight);

    // -------------------------------------------------------------------------
    // 4. FLOATING GOLDEN BOKEH MOTES
    // -------------------------------------------------------------------------
    const moteCount = 90;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    const moteBaseY = new Float32Array(moteCount);

    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * 60;
      motePos[i * 3 + 1] = (Math.random() - 0.5) * 55;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 35;
      moteBaseY[i] = motePos[i * 3 + 1];
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));

    const moteMat = new THREE.PointsMaterial({
      map: particleTexture,
      size: 0.65,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const moteSystem = new THREE.Points(moteGeo, moteMat);
    scene.add(moteSystem);

    // -------------------------------------------------------------------------
    // 5. HYPER-REALISTIC 3D FOOD BUILDERS
    // -------------------------------------------------------------------------

    // 🍔 1. GOURMET BRIOCHE BURGER
    const createBurger = (): THREE.Group => {
      const group = new THREE.Group();

      const bunMat = new THREE.MeshStandardMaterial({
        map: bunTexture,
        roughness: 0.36,
        metalness: 0.05,
      });

      const bottomBunMat = new THREE.MeshStandardMaterial({
        color: 0xc87d2b,
        roughness: 0.55,
      });

      const pattyMat = new THREE.MeshStandardMaterial({
        map: pattyTexture,
        roughness: 0.75,
        bumpScale: 0.08,
      });

      const cheeseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffa000,
        roughness: 0.16,
        metalness: 0.05,
        clearcoat: 0.95,
        clearcoatRoughness: 0.12,
      });

      const tomatoMat = new THREE.MeshPhysicalMaterial({
        color: 0xd62828,
        roughness: 0.12,
        transmission: 0.28,
        thickness: 0.4,
        clearcoat: 0.95,
      });

      const lettuceMat = new THREE.MeshStandardMaterial({
        color: 0x3ea76b,
        roughness: 0.4,
        side: THREE.DoubleSide,
      });

      const seedMat = new THREE.MeshStandardMaterial({
        color: 0xfffae0,
        roughness: 0.3,
      });

      // Bottom bun
      const bottom = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.0, 0.36, 32), bottomBunMat);
      bottom.position.y = -0.72;
      group.add(bottom);

      // Beef patty
      const patty = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.44, 32), pattyMat);
      patty.position.y = -0.32;
      group.add(patty);

      // Melted Cheddar
      const cheese = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.08, 1.98), cheeseMat);
      cheese.position.y = -0.07;
      cheese.rotation.y = Math.PI / 4;
      group.add(cheese);

      // Drooping corners
      const flapGeo = new THREE.ConeGeometry(0.34, 0.48, 4);
      for (let i = 0; i < 4; i++) {
        const flap = new THREE.Mesh(flapGeo, cheeseMat);
        const a = (i * Math.PI) / 2 + Math.PI / 4;
        flap.position.set(Math.cos(a) * 1.08, -0.24, Math.sin(a) * 1.08);
        flap.rotation.z = Math.PI;
        group.add(flap);
      }

      // Tomatoes
      const t1 = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.1, 24), tomatoMat);
      t1.position.set(-0.36, 0.09, 0.26);
      t1.rotation.set(0.08, 0.2, 0.05);
      group.add(t1);

      const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.1, 24), tomatoMat);
      t2.position.set(0.36, 0.09, -0.2);
      t2.rotation.set(-0.06, -0.3, -0.04);
      group.add(t2);

      // Ruffled crisp lettuce
      const lettuce = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.26, 12, 32), lettuceMat);
      lettuce.position.y = 0.25;
      lettuce.rotation.x = Math.PI / 2;
      lettuce.scale.set(1.16, 1.16, 0.28);
      group.add(lettuce);

      // Top Dome
      const topBun = new THREE.Mesh(
        new THREE.SphereGeometry(1.24, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.52),
        bunMat
      );
      topBun.position.y = 0.25;
      topBun.scale.set(1, 0.7, 1);
      group.add(topBun);

      // 40+ Sesame Seeds
      const seedGeo = new THREE.SphereGeometry(0.046, 8, 8);
      seedGeo.scale(1, 0.35, 2.1);

      for (let i = 0; i < 40; i++) {
        const seed = new THREE.Mesh(seedGeo, seedMat);
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * 0.72 + 0.12;
        const r = 1.06;
        seed.position.set(
          r * Math.sin(v) * Math.cos(u),
          0.25 + r * Math.cos(v) * 0.7,
          r * Math.sin(v) * Math.sin(u)
        );
        seed.rotation.set(Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.4);
        group.add(seed);
      }

      group.scale.set(1.35, 1.35, 1.35);
      return group;
    };

    // 🌭 2. GOURMET HOT DOG + MELTED CHEESE
    const createHotDog = (): THREE.Group => {
      const group = new THREE.Group();

      const bunMat = new THREE.MeshStandardMaterial({
        map: bunTexture,
        roughness: 0.42,
      });

      const sausageMat = new THREE.MeshStandardMaterial({
        color: 0x9f1239,
        roughness: 0.3,
        metalness: 0.08,
      });

      const cheeseSauceMat = new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        roughness: 0.15,
        clearcoat: 0.9,
      });

      const ketchupMat = new THREE.MeshPhysicalMaterial({
        color: 0xd90429,
        roughness: 0.12,
        clearcoat: 0.95,
      });

      // Split brioche bun
      const bunGeo = new THREE.CapsuleGeometry(0.68, 2.0, 16, 24);
      const bun = new THREE.Mesh(bunGeo, bunMat);
      bun.rotation.z = Math.PI / 2;
      bun.scale.set(1.2, 0.75, 1);
      group.add(bun);

      // Grilled sausage nestled in bun
      const sausageGeo = new THREE.CapsuleGeometry(0.42, 2.2, 16, 24);
      const sausage = new THREE.Mesh(sausageGeo, sausageMat);
      sausage.rotation.z = Math.PI / 2;
      sausage.position.y = 0.22;
      group.add(sausage);

      // Wavy zigzag cheese sauce
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.1, 0.45, 0.1),
        new THREE.Vector3(-0.6, 0.48, -0.15),
        new THREE.Vector3(0, 0.46, 0.18),
        new THREE.Vector3(0.6, 0.49, -0.15),
        new THREE.Vector3(1.1, 0.45, 0.12),
      ]);
      const cheeseLine = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.08, 8, false), cheeseSauceMat);
      group.add(cheeseLine);

      // Ketchup zigzag ribbon
      const curveKetchup = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.0, 0.46, -0.1),
        new THREE.Vector3(-0.5, 0.49, 0.15),
        new THREE.Vector3(0.1, 0.47, -0.16),
        new THREE.Vector3(0.7, 0.50, 0.14),
        new THREE.Vector3(1.0, 0.46, -0.1),
      ]);
      const ketchupLine = new THREE.Mesh(new THREE.TubeGeometry(curveKetchup, 32, 0.07, 8, false), ketchupMat);
      group.add(ketchupLine);

      group.scale.set(1.35, 1.35, 1.35);
      return group;
    };

    // 🌯 3. TOASTED CHICKEN SHAWARMA WRAP
    const createShawarma = (): THREE.Group => {
      const group = new THREE.Group();

      const pitaMat = new THREE.MeshStandardMaterial({
        map: pitaTexture,
        roughness: 0.58,
      });

      const fillingMat = new THREE.MeshStandardMaterial({
        color: 0x92400e,
        roughness: 0.6,
      });

      const garlicSauceMat = new THREE.MeshPhysicalMaterial({
        color: 0xfffbeb,
        roughness: 0.2,
        clearcoat: 0.85,
      });

      const greensMat = new THREE.MeshStandardMaterial({
        color: 0x16a34a,
        roughness: 0.4,
      });

      // Rolled cylinder body with griddle stripes
      const wrapGeo = new THREE.CylinderGeometry(0.7, 0.72, 2.4, 28);
      const wrap = new THREE.Mesh(wrapGeo, pitaMat);
      wrap.rotation.z = Math.PI / 2.2;
      group.add(wrap);

      // Angled filling face showing grilled meat cubes, garlic sauce & greens
      const cutEnd = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.08, 24), fillingMat);
      cutEnd.position.set(1.15, 0.2, 0);
      cutEnd.rotation.z = Math.PI / 2.2;
      group.add(cutEnd);

      const sauceDollop = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), garlicSauceMat);
      sauceDollop.position.set(1.18, 0.24, 0.05);
      sauceDollop.scale.set(1, 0.35, 1);
      group.add(sauceDollop);

      const parsley = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), greensMat);
      parsley.position.set(1.18, 0.16, -0.15);
      group.add(parsley);

      group.scale.set(1.3, 1.3, 1.3);
      return group;
    };

    // 🍹 4. GLASS DRINK (OPTICAL TRANSMISSION, ICE & CITRUS)
    const createDrink = (liquidColorHex: number, drinkName: string): THREE.Group => {
      const group = new THREE.Group();

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.96,
        opacity: 1,
        transparent: true,
        roughness: 0.03,
        ior: 1.48,
        thickness: 0.75,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
      });

      const liquidMat = new THREE.MeshPhysicalMaterial({
        color: liquidColorHex,
        roughness: 0.08,
        metalness: 0.02,
        transmission: 0.62,
        ior: 1.33,
        thickness: 0.95,
      });

      const iceMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.94,
        roughness: 0.1,
        transparent: true,
        opacity: 0.88,
        ior: 1.31,
      });

      const strawMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.25,
      });

      const citrusMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.28,
        side: THREE.DoubleSide,
      });

      // Clear Glass Tumbler
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.94, 0.7, 2.3, 32, 1, true), glassMat);
      group.add(glass);

      // Solid glass base
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.68, 0.2, 32), glassMat);
      base.position.y = -1.15;
      group.add(base);

      // Liquid Core
      const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.68, 1.95, 32), liquidMat);
      liquid.position.y = -0.15;
      group.add(liquid);

      // 3 Ice Cubes with rounded chamfer feeling
      const iceGeo = new THREE.BoxGeometry(0.36, 0.36, 0.36);
      for (let i = 0; i < 3; i++) {
        const ice = new THREE.Mesh(iceGeo, iceMat);
        ice.position.set(
          (Math.random() - 0.5) * 0.55,
          0.16 + i * 0.3,
          (Math.random() - 0.5) * 0.55
        );
        ice.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        group.add(ice);
      }

      // Angled Straw
      const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 2.7, 16), strawMat);
      straw.position.set(0.2, 0.45, 0);
      straw.rotation.z = -0.25;
      group.add(straw);

      // Citrus slice on rim
      const citrus = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.06, 24), citrusMat);
      citrus.position.set(-0.88, 1.15, 0);
      citrus.rotation.set(Math.PI / 4, 0, Math.PI / 3);
      group.add(citrus);

      group.name = drinkName;
      group.scale.set(1.3, 1.3, 1.3);
      return group;
    };

    // 🍟 5. GOLDEN RUSTIC FRENCH FRIES IN RED CONE
    const createFries = (): THREE.Group => {
      const group = new THREE.Group();

      const cupMat = new THREE.MeshStandardMaterial({
        color: 0xd90429,
        roughness: 0.32,
      });

      const goldEmblemMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        roughness: 0.25,
        metalness: 0.35,
      });

      const fryMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.55,
      });

      const fryCrispMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.65,
      });

      // Box cup
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.56, 1.75, 24, 1, false), cupMat);
      cup.position.y = -0.4;
      group.add(cup);

      // Gold badge stripe
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.89, 0.86, 0.2, 24), goldEmblemMat);
      ring.position.y = 0.05;
      group.add(ring);

      // 24 crispy fry sticks
      const fryGeo = new THREE.BoxGeometry(0.12, 1.65, 0.12);
      for (let i = 0; i < 24; i++) {
        const mat = i % 3 === 0 ? fryCrispMat : fryMat;
        const fry = new THREE.Mesh(fryGeo, mat);
        const radius = Math.random() * 0.58;
        const angle = Math.random() * Math.PI * 2;
        fry.position.set(
          Math.cos(angle) * radius,
          0.55 + Math.random() * 0.42,
          Math.sin(angle) * radius
        );
        fry.rotation.set(
          (Math.random() - 0.5) * 0.45,
          Math.random() * Math.PI,
          (Math.random() - 0.5) * 0.45
        );
        group.add(fry);
      }

      group.scale.set(1.3, 1.3, 1.3);
      return group;
    };

    // 🥟 6. ARTISANAL SENEGALESE FATAYA (GOLDEN PUFFED CRESCENT)
    const createFataya = (): THREE.Group => {
      const group = new THREE.Group();

      const pastryMat = new THREE.MeshStandardMaterial({
        color: 0xdf8a28,
        roughness: 0.4,
        metalness: 0.08,
      });

      const crimpMat = new THREE.MeshStandardMaterial({
        color: 0xc4731c,
        roughness: 0.5,
      });

      // Puffed pastry half-moon
      const body = new THREE.Mesh(new THREE.SphereGeometry(1.22, 24, 20, 0, Math.PI, 0, Math.PI), pastryMat);
      body.scale.set(1.12, 0.46, 0.72);
      body.rotation.x = Math.PI / 2;
      group.add(body);

      // Fork-braided crimped edge
      const crimpCount = 15;
      const crimpGeo = new THREE.SphereGeometry(0.1, 12, 12);
      crimpGeo.scale(1, 0.4, 1.8);

      for (let i = 0; i <= crimpCount; i++) {
        const crimp = new THREE.Mesh(crimpGeo, crimpMat);
        const t = (i / crimpCount) * Math.PI;
        crimp.position.set(Math.cos(t) * 1.32, 0, Math.sin(t) * 0.88);
        crimp.rotation.y = -t;
        group.add(crimp);
      }

      group.scale.set(1.35, 1.35, 1.35);
      return group;
    };

    // 🍾 7. CHILLED GLASS SODA BOTTLE WITH METALLIC CROWN CAP
    const createBottle = (glassColorHex: number): THREE.Group => {
      const group = new THREE.Group();

      const bottleMat = new THREE.MeshPhysicalMaterial({
        color: glassColorHex,
        transmission: 0.88,
        roughness: 0.04,
        ior: 1.52,
        thickness: 0.85,
        transparent: true,
        clearcoat: 1.0,
      });

      const capMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.9,
        roughness: 0.22,
      });

      // Body
      const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 1.55, 24), bottleMat);
      group.add(lower);

      // Shoulder
      const shoulder = new THREE.Mesh(
        new THREE.SphereGeometry(0.56, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.45),
        bottleMat
      );
      shoulder.position.y = 0.77;
      group.add(shoulder);

      // Neck
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.92, 24), bottleMat);
      neck.position.y = 1.38;
      group.add(neck);

      // Crown Cap
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.25, 0.1, 24), capMat);
      cap.position.y = 1.88;
      group.add(cap);

      group.scale.set(1.3, 1.3, 1.3);
      return group;
    };

    // 🥤 8. BRUSHED ALUMINIUM CHILLED SODA CAN
    const createCan = (colorHex: number): THREE.Group => {
      const group = new THREE.Group();

      const canMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.88,
        roughness: 0.18,
      });

      const metalMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.15,
      });

      // Cylindrical can body
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 1.9, 32), canMat);
      group.add(body);

      // Top beveled lid
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.68, 0.15, 32), metalMat);
      lid.position.y = 1.0;
      group.add(lid);

      // Pull tab ring
      const tab = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 8, 16), metalMat);
      tab.position.set(0.15, 1.08, 0);
      tab.rotation.x = Math.PI / 2;
      group.add(tab);

      group.scale.set(1.25, 1.25, 1.25);
      return group;
    };

    // ☕ 9. TRADITIONAL ATTAYA MINT TEA GLASS (THÉ SÉNÉGALAIS)
    const createAttayaTea = (): THREE.Group => {
      const group = new THREE.Group();

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.95,
        roughness: 0.05,
        ior: 1.48,
        thickness: 0.6,
        clearcoat: 1.0,
      });

      const teaMat = new THREE.MeshPhysicalMaterial({
        color: 0x92400e,
        roughness: 0.1,
        transmission: 0.65,
        thickness: 0.8,
      });

      const foamMat = new THREE.MeshStandardMaterial({
        color: 0xfffbeb,
        roughness: 0.35,
      });

      const mintMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });

      // Small faceted tea glass
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.55, 1.4, 24, 1, true), glassMat);
      group.add(glass);

      // Amber mint tea
      const tea = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.52, 0.95, 24), teaMat);
      tea.position.y = -0.15;
      group.add(tea);

      // Rich frothy foam collar (mousse du thé)
      const foam = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.65, 0.28, 24), foamMat);
      foam.position.y = 0.42;
      group.add(foam);

      // Fresh mint leaf sprig
      const mint = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), mintMat);
      mint.scale.set(0.3, 1, 0.8);
      mint.position.set(0.2, 0.62, 0);
      mint.rotation.z = 0.4;
      group.add(mint);

      group.scale.set(1.3, 1.3, 1.3);
      return group;
    };

    // 🍩 10. GLAZED DONUT WITH RAINBOW SPRINKLES
    const createDonut = (): THREE.Group => {
      const group = new THREE.Group();

      const doughMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.6,
      });

      const glazeMat = new THREE.MeshPhysicalMaterial({
        color: 0xf43f5e,
        roughness: 0.14,
        metalness: 0.05,
        clearcoat: 0.95,
      });

      const sprMat1 = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
      const sprMat2 = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });

      const donut = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.42, 20, 36), doughMat);
      group.add(donut);

      const glaze = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.41, 18, 36, Math.PI * 2), glazeMat);
      glaze.position.z = 0.06;
      glaze.scale.set(1.02, 1.02, 0.65);
      group.add(glaze);

      const sprGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.2, 8);
      const mats = [sprMat1, sprMat2];

      for (let i = 0; i < 22; i++) {
        const spr = new THREE.Mesh(sprGeo, mats[i % 2]);
        const angle = (i / 22) * Math.PI * 2;
        const radius = 0.82 + (Math.random() - 0.5) * 0.28;
        spr.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.34);
        spr.rotation.set(Math.random() * 0.6, Math.random() * 0.6, Math.random() * Math.PI);
        group.add(spr);
      }

      group.scale.set(1.3, 1.3, 1.3);
      return group;
    };

    // 🍊 11. FRESH CITRUS SLICE (TRANSLUCENT ORANGE WHEEL)
    const createCitrus = (fruitColorHex: number): THREE.Group => {
      const group = new THREE.Group();

      const pulpMat = new THREE.MeshPhysicalMaterial({
        color: fruitColorHex,
        transmission: 0.45,
        roughness: 0.2,
        clearcoat: 0.9,
      });

      const rindMat = new THREE.MeshStandardMaterial({
        color: 0xea580c,
        roughness: 0.45,
      });

      // Circular disc
      const pulp = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.12, 32), pulpMat);
      group.add(pulp);

      // Outer rind ring
      const rind = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.08, 12, 32), rindMat);
      rind.rotation.x = Math.PI / 2;
      group.add(rind);

      group.scale.set(1.3, 1.3, 1.3);
      return group;
    };

    // -------------------------------------------------------------------------
    // 6. DYNAMIC FRUSTUM POSITIONING: GUARANTEED VISIBILITY ON MOBILE & DESKTOP
    // -------------------------------------------------------------------------
    interface ShowcaseItem {
      mesh: THREE.Group;
      baseNormalizedX: number; // -1 to 1 across visible viewport
      baseY: number;
      baseZ: number;
      floatSpeed: number;
      floatOffset: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      scaleFactor: number;
    }

    const items: ShowcaseItem[] = [];

    // Helper: calculate visible half dimensions at a given Z depth
    const getVisibleBounds = (zDepth = 0) => {
      const vFOV = (camera.fov * Math.PI) / 180;
      const distance = camera.position.z - zDepth;
      const halfHeight = Math.tan(vFOV / 2) * distance;
      const halfWidth = halfHeight * camera.aspect;
      return { halfWidth, halfHeight };
    };

    // 16 rich curated items distributed across the vertical scroll span
    // baseNormalizedX: negative = left margin, positive = right margin
    const itemCatalog = [
      // TOP HEADER & HERO AREA (Y: +8 to +14)
      { factory: () => createBurger(), normX: -0.84, y: 13.5, z: -2, speed: 0.8, scale: 1.15 },
      { factory: () => createDrink(0x9d174d, 'Bissap Hibiscus'), normX: 0.84, y: 13.0, z: -1.5, speed: 0.85, scale: 1.12 },
      { factory: () => createHotDog(), normX: -0.78, y: 9.0, z: -2.5, speed: 0.75, scale: 1.08 },
      { factory: () => createFries(), normX: 0.82, y: 8.5, z: -2.0, speed: 0.82, scale: 1.1 },

      // MIDDLE MENU SELECTION AREA (Y: +4 to -4)
      { factory: () => createFataya(), normX: -0.86, y: 4.5, z: -3.0, speed: 0.7, scale: 1.1 },
      { factory: () => createBottle(0x059669), normX: 0.85, y: 4.0, z: -2.2, speed: 0.78, scale: 1.05 },
      { factory: () => createShawarma(), normX: -0.82, y: 0.0, z: -2.0, speed: 0.8, scale: 1.08 },
      { factory: () => createCan(0xd90429), normX: 0.84, y: -0.5, z: -2.5, speed: 0.75, scale: 1.05 },

      // LOWER CART & SUMMARY AREA (Y: -5 to -13)
      { factory: () => createDonut(), normX: -0.85, y: -5.0, z: -2.2, speed: 0.82, scale: 1.08 },
      { factory: () => createAttayaTea(), normX: 0.83, y: -5.5, z: -2.0, speed: 0.8, scale: 1.1 },
      { factory: () => createCitrus(0xf59e0b), normX: -0.82, y: -9.5, z: -3.0, speed: 0.72, scale: 1.05 },
      { factory: () => createDrink(0xfacc15, 'Mango Smoothie'), normX: 0.85, y: -10.0, z: -2.5, speed: 0.78, scale: 1.08 },

      // DEEP DEPTH AMBIENT SHOWCASE (Z: -9 to -14, soft atmospheric background)
      { factory: () => createDrink(0xfef08a, 'Bouye Baobab'), normX: -0.75, y: 16.0, z: -11, speed: 0.55, scale: 1.25 },
      { factory: () => createBottle(0x78350f), normX: 0.76, y: 15.5, z: -10, speed: 0.6, scale: 1.2 },
      { factory: () => createBurger(), normX: -0.76, y: -14.0, z: -12, speed: 0.6, scale: 1.25 },
      { factory: () => createHotDog(), normX: 0.75, y: -14.5, z: -11, speed: 0.58, scale: 1.2 },
    ];

    // Compute dynamic layout and mount to scene
    const isMobile = window.innerWidth < 768;

    itemCatalog.forEach((itemDef, idx) => {
      const mesh = itemDef.factory();
      const bounds = getVisibleBounds(itemDef.z);

      // On mobile, clamp within visible width margins so it NEVER clips offscreen!
      // Desktop uses standard margins.
      const marginFactor = isMobile ? 0.76 : 0.86;
      const posX = itemDef.normX * bounds.halfWidth * marginFactor;
      const posY = itemDef.y;
      const posZ = itemDef.z;

      mesh.position.set(posX, posY, posZ);

      // Adaptive scale: slightly compact on mobile, prominent on desktop
      const finalScale = itemDef.scale * (isMobile ? 0.78 : 1.05);
      mesh.scale.multiplyScalar(finalScale);

      // Organic initial orientation
      mesh.rotation.set(
        0.2 + idx * 0.35,
        0.45 + idx * 0.65,
        idx % 2 === 0 ? 0.18 : -0.18
      );

      scene.add(mesh);

      items.push({
        mesh,
        baseNormalizedX: itemDef.normX,
        baseY: posY,
        baseZ: posZ,
        floatSpeed: itemDef.speed,
        floatOffset: idx * 1.25,
        rotSpeedX: (Math.random() - 0.5) * 0.005,
        rotSpeedY: 0.004 + (idx % 2 === 0 ? 0.0025 : -0.0025),
        rotSpeedZ: (Math.random() - 0.5) * 0.004,
        scaleFactor: finalScale,
      });
    });

    // -------------------------------------------------------------------------
    // 7. SMOOTH INTERACTIVITY (MOUSE / TOUCH TILT & SCROLL PARALLAX)
    // -------------------------------------------------------------------------
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      targetMouseX = (clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // -------------------------------------------------------------------------
    // 8. 60FPS SMOOTH ANIMATION LOOP
    // -------------------------------------------------------------------------
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Smooth scroll lerp
      currentScrollY += (targetScrollY - currentScrollY) * 0.06;

      // Camera tilt for dimensional parallax
      camera.position.x = currentMouseX * (isMobile ? 0.8 : 1.8);
      camera.position.y = -currentMouseY * (isMobile ? 0.9 : 1.5);
      camera.lookAt(0, 0, 0);

      // Studio spotlight tracking
      interactiveLight.position.x = currentMouseX * 12;
      interactiveLight.position.y = -currentMouseY * 9 + 2;

      // Animate floating items
      const { halfWidth } = getVisibleBounds(0);
      const marginFactor = isMobile ? 0.76 : 0.86;

      items.forEach((item, i) => {
        const time = elapsedTime * item.floatSpeed + item.floatOffset;

        // Harmonic organic floating wave
        const floatY = Math.sin(time) * 0.42 + Math.cos(time * 0.65) * 0.14;
        const floatX = Math.cos(time * 0.75) * 0.22;

        // Parallax vertical displacement from scroll
        const scrollFactor = 0.0024 * (i % 2 === 0 ? 1 : 1.18);
        const scrollOffset = currentScrollY * scrollFactor;

        // Keep items at their responsive margin positions
        const dynamicBaseX = item.baseNormalizedX * halfWidth * marginFactor;

        item.mesh.position.y = item.baseY + floatY - (scrollOffset % 32);
        item.mesh.position.x = dynamicBaseX + floatX + currentMouseX * (isMobile ? 0.3 : 0.6);

        // Smooth studio rotation
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;
      });

      // Animate golden bokeh dust motes
      const positions = moteGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < moteCount; i++) {
        const idx = i * 3;
        positions[idx + 1] = moteBaseY[i] + Math.sin(elapsedTime * 0.45 + i) * 1.3;
        positions[idx] += Math.cos(elapsedTime * 0.35 + i) * 0.016;
      }
      moteGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------------------
    // 9. WINDOW RESIZE HANDLING & CLEANUP
    // -------------------------------------------------------------------------
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose textures & geometries to free GPU memory
      bunTexture.dispose();
      pattyTexture.dispose();
      pitaTexture.dispose();
      particleTexture.dispose();
      moteGeo.dispose();
      moteMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85 transition-opacity duration-1000 overflow-hidden"
      aria-hidden="true"
    />
  );
};
