import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfff8f0, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup for rich food aesthetics
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    const mainSunLight = new THREE.DirectionalLight(0xffa500, 2.4);
    mainSunLight.position.set(15, 25, 20);
    scene.add(mainSunLight);

    const fillBlueLight = new THREE.DirectionalLight(0x38bdf8, 1.3);
    fillBlueLight.position.set(-15, -10, -10);
    scene.add(fillBlueLight);

    const warmPointLight = new THREE.PointLight(0xff6b00, 2.0, 35);
    warmPointLight.position.set(0, 2, 8);
    scene.add(warmPointLight);

    // 3. Floating Golden Dust Particle System
    const particleCount = 130;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      particleScales[i] = Math.random() * 0.15 + 0.05;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffb703,
      size: 0.28,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // -------------------------------------------------------------
    // PROCEDURAL 3D FOOD BUILDERS (ENLARGED & DETAILED)
    // -------------------------------------------------------------

    // --- 1. ENHANCED HAMBURGER BUILDER ---
    function createBurgerMesh(): THREE.Group {
      const burgerGroup = new THREE.Group();

      const bunMaterial = new THREE.MeshStandardMaterial({ color: 0xdf9538, roughness: 0.4, metalness: 0.1 });
      const bottomBunMaterial = new THREE.MeshStandardMaterial({ color: 0xc47e23, roughness: 0.6 });
      const pattyMaterial = new THREE.MeshStandardMaterial({ color: 0x421c0c, roughness: 0.85 });
      const cheeseMaterial = new THREE.MeshStandardMaterial({ color: 0xffb700, roughness: 0.25, metalness: 0.1 });
      const lettuceMaterial = new THREE.MeshStandardMaterial({ color: 0x38a127, roughness: 0.5 });
      const tomatoMaterial = new THREE.MeshStandardMaterial({ color: 0xe62e1b, roughness: 0.2 });
      const pickleMaterial = new THREE.MeshStandardMaterial({ color: 0x2d6a1b, roughness: 0.4 });
      const seedMaterial = new THREE.MeshStandardMaterial({ color: 0xfff6dd, roughness: 0.3 });

      // Bottom Bun
      const bottomBunGeo = new THREE.CylinderGeometry(1.0, 0.92, 0.3, 24);
      const bottomBun = new THREE.Mesh(bottomBunGeo, bottomBunMaterial);
      bottomBun.position.y = -0.65;
      burgerGroup.add(bottomBun);

      // Patty
      const pattyGeo = new THREE.CylinderGeometry(1.08, 1.08, 0.38, 24);
      const patty = new THREE.Mesh(pattyGeo, pattyMaterial);
      patty.position.y = -0.3;
      burgerGroup.add(patty);

      // Cheese Layer
      const cheeseGeo = new THREE.BoxGeometry(1.85, 0.06, 1.85);
      const cheese = new THREE.Mesh(cheeseGeo, cheeseMaterial);
      cheese.position.y = -0.07;
      cheese.rotation.y = Math.PI / 4;
      burgerGroup.add(cheese);

      // Pickles
      const pickleGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.06, 16);
      const p1 = new THREE.Mesh(pickleGeo, pickleMaterial);
      p1.position.set(-0.35, 0.0, -0.2);
      burgerGroup.add(p1);

      // Tomato Slices
      const tomatoGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 20);
      const tomato1 = new THREE.Mesh(tomatoGeo, tomatoMaterial);
      tomato1.position.set(-0.32, 0.08, 0.25);
      tomato1.rotation.z = 0.06;
      burgerGroup.add(tomato1);

      const tomato2 = new THREE.Mesh(tomatoGeo, tomatoMaterial);
      tomato2.position.set(0.32, 0.08, -0.15);
      tomato2.rotation.z = -0.06;
      burgerGroup.add(tomato2);

      // Lettuce
      const lettuceGeo = new THREE.TorusGeometry(0.85, 0.2, 8, 24);
      const lettuce = new THREE.Mesh(lettuceGeo, lettuceMaterial);
      lettuce.position.y = 0.22;
      lettuce.rotation.x = Math.PI / 2;
      lettuce.scale.set(1.1, 1.1, 0.25);
      burgerGroup.add(lettuce);

      // Top Bun Dome
      const topBunGeo = new THREE.SphereGeometry(1.12, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.55);
      const topBun = new THREE.Mesh(topBunGeo, bunMaterial);
      topBun.position.y = 0.22;
      topBun.scale.set(1, 0.65, 1);
      burgerGroup.add(topBun);

      // Sesame Seeds
      const seedGeo = new THREE.SphereGeometry(0.045, 8, 8);
      seedGeo.scale(1, 0.35, 1.9);

      for (let i = 0; i < 22; i++) {
        const seed = new THREE.Mesh(seedGeo, seedMaterial);
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * 0.75 + 0.12;
        const r = 0.98;
        seed.position.set(
          r * Math.sin(v) * Math.cos(u),
          0.22 + r * Math.cos(v) * 0.62,
          r * Math.sin(v) * Math.sin(u)
        );
        seed.rotation.set(Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.5);
        burgerGroup.add(seed);
      }

      burgerGroup.scale.set(1.35, 1.35, 1.35);
      return burgerGroup;
    }

    // --- 2. JUICE & SODA CUP ---
    function createJuiceMesh(juiceColorHex: number): THREE.Group {
      const drinkGroup = new THREE.Group();

      const cupMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.88,
        opacity: 1,
        transparent: true,
        roughness: 0.08,
        ior: 1.35,
        thickness: 0.6,
      });

      const juiceMaterial = new THREE.MeshStandardMaterial({
        color: juiceColorHex,
        roughness: 0.15,
        metalness: 0.05,
      });

      const lidMaterial = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
      const strawMaterial = new THREE.MeshStandardMaterial({ color: 0xff3b30, roughness: 0.3 });
      const iceMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.92,
        roughness: 0.1,
        transparent: true,
        opacity: 0.8,
      });

      // Clear Cup Outer Shell
      const cupGeo = new THREE.CylinderGeometry(0.88, 0.62, 2.1, 24, 1, true);
      const cup = new THREE.Mesh(cupGeo, cupMaterial);
      drinkGroup.add(cup);

      // Liquid
      const liquidGeo = new THREE.CylinderGeometry(0.83, 0.6, 1.7, 24);
      const liquid = new THREE.Mesh(liquidGeo, juiceMaterial);
      liquid.position.y = -0.15;
      drinkGroup.add(liquid);

      // Ice Cubes
      const iceGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
      for (let i = 0; i < 4; i++) {
        const ice = new THREE.Mesh(iceGeo, iceMaterial);
        ice.position.set(
          (Math.random() - 0.5) * 0.6,
          0.1 + Math.random() * 0.5,
          (Math.random() - 0.5) * 0.6
        );
        ice.rotation.set(Math.random(), Math.random(), Math.random());
        drinkGroup.add(ice);
      }

      // Lid & Straw
      const lidGeo = new THREE.CylinderGeometry(0.92, 0.9, 0.12, 24);
      const lid = new THREE.Mesh(lidGeo, lidMaterial);
      lid.position.y = 1.06;
      drinkGroup.add(lid);

      const strawGeo = new THREE.CylinderGeometry(0.065, 0.065, 2.3, 16);
      const straw = new THREE.Mesh(strawGeo, strawMaterial);
      straw.position.set(0.12, 1.15, 0);
      straw.rotation.z = -0.22;
      drinkGroup.add(straw);

      drinkGroup.scale.set(1.3, 1.3, 1.3);
      return drinkGroup;
    }

    // --- 3. FRENCH FRIES ---
    function createFriesMesh(): THREE.Group {
      const friesGroup = new THREE.Group();

      const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.35 });
      const boxStripeMaterial = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
      const fryMaterial = new THREE.MeshStandardMaterial({ color: 0xfbcb24, roughness: 0.5 });
      const sauceMaterial = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.2 });

      // Box Container
      const boxGeo = new THREE.BoxGeometry(1.25, 1.45, 0.72);
      const box = new THREE.Mesh(boxGeo, boxMaterial);
      box.position.y = -0.3;
      friesGroup.add(box);

      // Stripe
      const stripeGeo = new THREE.BoxGeometry(1.27, 0.25, 0.74);
      const stripe = new THREE.Mesh(stripeGeo, boxStripeMaterial);
      stripe.position.y = -0.3;
      friesGroup.add(stripe);

      // Fry Sticks
      const fryGeo = new THREE.BoxGeometry(0.12, 1.35, 0.12);
      for (let i = 0; i < 18; i++) {
        const fry = new THREE.Mesh(fryGeo, fryMaterial);
        const offsetX = (Math.random() - 0.5) * 0.95;
        const offsetZ = (Math.random() - 0.5) * 0.45;
        const rotZ = (Math.random() - 0.5) * 0.45;
        const rotX = (Math.random() - 0.5) * 0.35;

        fry.position.set(offsetX, 0.45 + Math.random() * 0.25, offsetZ);
        fry.rotation.set(rotX, 0, rotZ);
        friesGroup.add(fry);
      }

      // Ketchup Dip Tub
      const tubGeo = new THREE.CylinderGeometry(0.35, 0.28, 0.3, 16);
      const tub = new THREE.Mesh(tubGeo, boxStripeMaterial);
      tub.position.set(0.75, -0.75, 0.2);
      friesGroup.add(tub);

      const ketchupGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 16);
      const ketchup = new THREE.Mesh(ketchupGeo, sauceMaterial);
      ketchup.position.set(0.75, -0.62, 0.2);
      friesGroup.add(ketchup);

      friesGroup.scale.set(1.3, 1.3, 1.3);
      return friesGroup;
    }

    // --- 4. PIZZA SLICE ---
    function createPizzaMesh(): THREE.Group {
      const pizzaGroup = new THREE.Group();

      const doughMaterial = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.65 });
      const cheeseMaterial = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
      const pepperoniMaterial = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.4 });
      const oliveMaterial = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3 });

      const baseGeo = new THREE.CylinderGeometry(1.45, 1.45, 0.16, 3);
      const base = new THREE.Mesh(baseGeo, cheeseMaterial);
      base.rotation.y = Math.PI / 6;
      pizzaGroup.add(base);

      const crustGeo = new THREE.TorusGeometry(1.3, 0.18, 12, 16, Math.PI / 2.2);
      const crust = new THREE.Mesh(crustGeo, doughMaterial);
      crust.position.set(0, 0.08, -0.38);
      crust.rotation.x = Math.PI / 2;
      crust.rotation.z = -Math.PI / 1.35;
      pizzaGroup.add(crust);

      const pepGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 16);
      const p1 = new THREE.Mesh(pepGeo, pepperoniMaterial);
      p1.position.set(0, 0.1, 0.15);
      pizzaGroup.add(p1);

      const p2 = new THREE.Mesh(pepGeo, pepperoniMaterial);
      p2.position.set(-0.38, 0.1, 0.68);
      pizzaGroup.add(p2);

      const p3 = new THREE.Mesh(pepGeo, pepperoniMaterial);
      p3.position.set(0.38, 0.1, 0.68);
      pizzaGroup.add(p3);

      const oliveGeo = new THREE.TorusGeometry(0.1, 0.04, 8, 12);
      const o1 = new THREE.Mesh(oliveGeo, oliveMaterial);
      o1.position.set(0.2, 0.12, 0.35);
      o1.rotation.x = Math.PI / 2;
      pizzaGroup.add(o1);

      pizzaGroup.scale.set(1.35, 1.35, 1.35);
      return pizzaGroup;
    }

    // --- 5. ICE CREAM CONE ---
    function createIceCreamMesh(): THREE.Group {
      const iceCreamGroup = new THREE.Group();

      const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
      const scoop1Material = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.4 });
      const scoop2Material = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
      const cherryMaterial = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.15 });

      const coneGeo = new THREE.ConeGeometry(0.68, 1.7, 20);
      const cone = new THREE.Mesh(coneGeo, coneMaterial);
      cone.rotation.x = Math.PI;
      cone.position.y = -0.55;
      iceCreamGroup.add(cone);

      const scoop1Geo = new THREE.SphereGeometry(0.64, 20, 20);
      const scoop1 = new THREE.Mesh(scoop1Geo, scoop2Material);
      scoop1.position.y = 0.45;
      iceCreamGroup.add(scoop1);

      const scoop2Geo = new THREE.SphereGeometry(0.55, 20, 20);
      const scoop2 = new THREE.Mesh(scoop2Geo, scoop1Material);
      scoop2.position.y = 1.05;
      iceCreamGroup.add(scoop2);

      const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), cherryMaterial);
      cherry.position.y = 1.62;
      iceCreamGroup.add(cherry);

      iceCreamGroup.scale.set(1.3, 1.3, 1.3);
      return iceCreamGroup;
    }

    // --- 6. DONUT GLACÉ ---
    function createDonutMesh(): THREE.Group {
      const donutGroup = new THREE.Group();

      const pastryMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 });
      const icingMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.2, metalness: 0.1 });
      const sprinkleMat1 = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
      const sprinkleMat2 = new THREE.MeshStandardMaterial({ color: 0xfacc15 });

      const donutGeo = new THREE.TorusGeometry(0.8, 0.4, 16, 28);
      const donut = new THREE.Mesh(donutGeo, pastryMat);
      donutGroup.add(donut);

      const icingGeo = new THREE.TorusGeometry(0.81, 0.38, 16, 28, Math.PI * 2);
      const icing = new THREE.Mesh(icingGeo, icingMat);
      icing.position.z = 0.05;
      icing.scale.set(1.02, 1.02, 0.6);
      donutGroup.add(icing);

      const sprinkleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.18, 8);
      const mats = [sprinkleMat1, sprinkleMat2];

      for (let i = 0; i < 18; i++) {
        const spr = new THREE.Mesh(sprinkleGeo, mats[i % 2]);
        const angle = (i / 18) * Math.PI * 2;
        const radius = 0.78 + (Math.random() - 0.5) * 0.25;
        spr.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.28);
        spr.rotation.set(Math.random() * 0.5, Math.random() * 0.5, Math.random() * Math.PI);
        donutGroup.add(spr);
      }

      donutGroup.scale.set(1.3, 1.3, 1.3);
      return donutGroup;
    }

    // --- 7. MEAT SKEWER ---
    function createSkewerMesh(): THREE.Group {
      const skewerGroup = new THREE.Group();

      const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8 });
      const meatMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 });
      const pepperRedMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 });

      const stickGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.8, 12);
      const stick = new THREE.Mesh(stickGeo, woodMat);
      stick.rotation.z = Math.PI / 4;
      skewerGroup.add(stick);

      const itemsList = [
        { mat: meatMat, geo: new THREE.BoxGeometry(0.48, 0.48, 0.48) },
        { mat: pepperRedMat, geo: new THREE.BoxGeometry(0.45, 0.12, 0.45) },
        { mat: meatMat, geo: new THREE.BoxGeometry(0.5, 0.5, 0.5) },
      ];

      itemsList.forEach((item, idx) => {
        const mesh = new THREE.Mesh(item.geo, item.mat);
        const dist = (idx - 1) * 0.5;
        mesh.position.set(dist * Math.cos(Math.PI / 4), dist * Math.sin(Math.PI / 4), 0);
        skewerGroup.add(mesh);
      });

      skewerGroup.scale.set(1.35, 1.35, 1.35);
      return skewerGroup;
    }

    // --- 8. COFFEE / ATTAYA MUG ---
    function createCoffeeMugMesh(): THREE.Group {
      const mugGroup = new THREE.Group();

      const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 });
      const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x311304, roughness: 0.15 });

      const mugGeo = new THREE.CylinderGeometry(0.72, 0.68, 1.5, 24);
      const mug = new THREE.Mesh(mugGeo, ceramicMat);
      mugGroup.add(mug);

      const handleGeo = new THREE.TorusGeometry(0.42, 0.1, 12, 20, Math.PI * 1.2);
      const handle = new THREE.Mesh(handleGeo, ceramicMat);
      handle.position.set(0.72, 0, 0);
      handle.rotation.z = -Math.PI / 2.2;
      mugGroup.add(handle);

      const coffee = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.05, 24), coffeeMat);
      coffee.position.y = 0.68;
      mugGroup.add(coffee);

      mugGroup.scale.set(1.3, 1.3, 1.3);
      return mugGroup;
    }

    // --- 9. FRENCH TACOS WRAP ---
    function createTacosWrapMesh(): THREE.Group {
      const wrapGroup = new THREE.Group();

      const tortillaMat = new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.65 });
      const grillLineMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8 });

      const wrapGeo = new THREE.CylinderGeometry(0.65, 0.65, 1.8, 20);
      const wrap = new THREE.Mesh(wrapGeo, tortillaMat);
      wrap.rotation.z = Math.PI / 2;
      wrap.scale.set(1, 0.65, 1);
      wrapGroup.add(wrap);

      for (let i = -2; i <= 2; i++) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 1.1), grillLineMat);
        stripe.position.set(i * 0.32, 0.44, 0);
        wrapGroup.add(stripe);
      }

      wrapGroup.scale.set(1.3, 1.3, 1.3);
      return wrapGroup;
    }

    // --- 10. CUPCAKE ---
    function createCupcakeMesh(): THREE.Group {
      const cupcakeGroup = new THREE.Group();

      const paperMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.4 });
      const cakeMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
      const creamMat = new THREE.MeshStandardMaterial({ color: 0xfff7ed, roughness: 0.25 });

      const paper = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.52, 0.85, 20), paperMat);
      paper.position.y = -0.3;
      cupcakeGroup.add(paper);

      const cake = new THREE.Mesh(new THREE.SphereGeometry(0.74, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), cakeMat);
      cake.position.y = 0.12;
      cupcakeGroup.add(cake);

      const creamTop = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), creamMat);
      creamTop.position.y = 0.65;
      cupcakeGroup.add(creamTop);

      cupcakeGroup.scale.set(1.3, 1.3, 1.3);
      return cupcakeGroup;
    }

    // -------------------------------------------------------------
    // POPULATE SCENE WITH DIVERSE 3D FLOATING FOOD ITEMS
    // -------------------------------------------------------------
    const JUICE_COLORS = [
      0xff5500, // Orange
      0xff0066, // Strawberry
      0xfacc15, // Mango
      0x0284c7, // Blue Curacao
      0x9333ea, // Berry
      0x16a34a, // Kiwi
    ];

    interface FloatingItem {
      mesh: THREE.Group;
      baseX: number;
      baseY: number;
      baseZ: number;
      baseScale: number;
      vx: number;
      vy: number;
      vz: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      floatOffset: number;
      floatSpeed: number;
    }

    const items: FloatingItem[] = [];
    const isMobile = window.innerWidth < 768;
    const TOTAL_ITEMS = isMobile ? 36 : 56;

    for (let i = 0; i < TOTAL_ITEMS; i++) {
      let mesh: THREE.Group;
      const type = i % 10;

      switch (type) {
        case 0:
          mesh = createBurgerMesh();
          break;
        case 1:
          mesh = createJuiceMesh(JUICE_COLORS[i % JUICE_COLORS.length]);
          break;
        case 2:
          mesh = createFriesMesh();
          break;
        case 3:
          mesh = createPizzaMesh();
          break;
        case 4:
          mesh = createIceCreamMesh();
          break;
        case 5:
          mesh = createDonutMesh();
          break;
        case 6:
          mesh = createSkewerMesh();
          break;
        case 7:
          mesh = createCoffeeMugMesh();
          break;
        case 8:
          mesh = createTacosWrapMesh();
          break;
        default:
          mesh = createCupcakeMesh();
          break;
      }

      // Spread items evenly in 3D space with safe depth
      const x = (Math.random() - 0.5) * (isMobile ? 32 : 46);
      const y = (Math.random() - 0.5) * (isMobile ? 36 : 40);
      const z = (Math.random() - 0.5) * 24 - 1;

      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // ENLARGED scale multiplier for prominent 3D presence!
      const scaleMultiplier = (isMobile ? 0.9 : 1.0) * (0.95 + Math.random() * 0.7);
      mesh.scale.multiplyScalar(scaleMultiplier);

      scene.add(mesh);

      items.push({
        mesh,
        baseX: x,
        baseY: y,
        baseZ: z,
        baseScale: scaleMultiplier,
        vx: (Math.random() - 0.5) * 0.022,
        vy: (Math.random() - 0.5) * 0.022,
        vz: (Math.random() - 0.5) * 0.015,
        rotX: (Math.random() - 0.5) * 0.020,
        rotY: (Math.random() - 0.5) * 0.024,
        rotZ: (Math.random() - 0.5) * 0.018,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.7 + Math.random() * 0.7,
      });
    }

    // -------------------------------------------------------------
    // INTERACTIVE TOUCH, MOUSE & TAP SHOCKWAVE REACTION
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let tapShockwave = 0;

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
      mouseX = (clientX / window.innerWidth - 0.5) * 2;
      mouseY = (clientY / window.innerHeight - 0.5) * 2;
    };

    const handlePointerDown = () => {
      tapShockwave = 1.0;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // -------------------------------------------------------------
    // ENHANCED ANIMATION LOOP WITH LISSAJOUS & SHOCKWAVE DYNAMICS
    // -------------------------------------------------------------
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll interpolation
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      const scrollDelta = targetScrollY - currentScrollY;

      // Dampen tap shockwave impulse
      tapShockwave *= 0.94;

      // Smooth camera parallax with tilt
      camera.position.x += (mouseX * 4.2 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 3.8 - camera.position.y) * 0.04;

      // Move scene overall according to scroll
      scene.rotation.y = currentScrollY * 0.0010;
      scene.rotation.x = currentScrollY * 0.0003;

      // Dynamic warm kitchen point light animation
      warmPointLight.position.x = Math.sin(elapsedTime * 0.7) * 12;
      warmPointLight.position.y = Math.cos(elapsedTime * 0.5) * 7 + 2;
      warmPointLight.intensity = 1.8 + Math.sin(elapsedTime * 2.2) * 0.4 + tapShockwave * 1.2;

      // Swirling golden dust particle vortex
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const px = positions[idx];
        const pz = positions[idx + 2];
        const angle = 0.002 * (i % 2 === 0 ? 1 : -1);
        positions[idx] = px * Math.cos(angle) - pz * Math.sin(angle);
        positions[idx + 2] = px * Math.sin(angle) + pz * Math.cos(angle);
        positions[idx + 1] += Math.sin(elapsedTime * 1.4 + i) * 0.022;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Animate all 3D food items with Lissajous floating & breathing
      items.forEach((item, index) => {
        const time = elapsedTime * item.floatSpeed + item.floatOffset;

        // Harmonic Lissajous undulating float
        const lissajousY = Math.sin(time) * 0.85 + Math.cos(time * 0.6) * 0.25;
        const lissajousX = Math.cos(time * 0.7) * 0.5;

        // Dynamic 3D rotation with scroll spin & shockwave flip
        const shockSpin = tapShockwave * ((index % 2 === 0 ? 1 : -1) * 0.06);
        item.mesh.rotation.x += item.rotX + scrollDelta * 0.0012 + shockSpin;
        item.mesh.rotation.y += item.rotY + scrollDelta * 0.0022 + shockSpin * 1.5;
        item.mesh.rotation.z += item.rotZ + (index % 2 === 0 ? 1 : -1) * scrollDelta * 0.0008;

        // Organic pulsating breath scale
        const breath = 1 + (0.045 + tapShockwave * 0.12) * Math.sin(time * 2.0);
        item.mesh.scale.set(
          item.baseScale * breath,
          item.baseScale * breath,
          item.baseScale * breath
        );

        // Position updates
        item.mesh.position.x += item.vx;
        item.mesh.position.y += item.vy;
        item.mesh.position.z += item.vz;

        // Parallax vertical displacement on scroll + floating wave
        const scrollFactor = (index % 3 + 1) * 0.0035;
        item.mesh.position.y = (item.baseY + lissajousY) - (currentScrollY * scrollFactor) % 36;
        item.mesh.position.x = item.baseX + lissajousX;

        // Infinite screen boundary wrapping
        const boundX = isMobile ? 18 : 25;
        const boundY = 22;
        if (item.mesh.position.x > boundX) item.mesh.position.x = -boundX;
        if (item.mesh.position.x < -boundX) item.mesh.position.x = boundX;

        if (item.mesh.position.y > boundY) item.mesh.position.y = -boundY;
        if (item.mesh.position.y < -boundY) item.mesh.position.y = boundY;

        if (item.mesh.position.z > 14) item.mesh.position.z = -18;
        if (item.mesh.position.z < -18) item.mesh.position.z = 14;
      });

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------
    // RESIZE HANDLER
    // -------------------------------------------------------------
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
