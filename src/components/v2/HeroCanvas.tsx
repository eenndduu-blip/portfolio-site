"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A slow-breathing particle terrain behind the hero type.
 * Points ripple like water / topography; camera drifts toward the cursor.
 */
export function HeroCanvas({ reduced }: { reduced: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 2.2, 9);
    camera.lookAt(0, 0, 0);

    // particle grid
    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 70 : 130;
    const rows = isMobile ? 40 : 70;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        positions[i * 3] = (x / (cols - 1) - 0.5) * 26;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z / (rows - 1) - 0.5) * 14;
        seeds[i] = Math.random() * Math.PI * 2;
        i++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color("#f2efe9"),
      size: 0.028,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    points.position.y = -1.6;
    scene.add(points);

    // gold accents — sparse second cloud
    const goldCount = isMobile ? 60 : 140;
    const goldPos = new Float32Array(goldCount * 3);
    for (let g = 0; g < goldCount; g++) {
      goldPos[g * 3] = (Math.random() - 0.5) * 24;
      goldPos[g * 3 + 1] = Math.random() * 4 - 1.5;
      goldPos[g * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const goldGeo = new THREE.BufferGeometry();
    goldGeo.setAttribute("position", new THREE.BufferAttribute(goldPos, 3));
    const goldMat = new THREE.PointsMaterial({
      color: new THREE.Color("#edc231"),
      size: 0.055,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const gold = new THREE.Points(goldGeo, goldMat);
    scene.add(gold);

    const mouse = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // pause rendering when hero is off screen
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(mount);

    let raf = 0;
    const clock = new THREE.Clock();
    const pos = geo.attributes.position as THREE.BufferAttribute;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const t = reduced ? 0 : clock.getElapsedTime() * 0.6;

      if (!reduced) {
        for (let p = 0; p < count; p++) {
          const px = pos.getX(p);
          const pz = pos.getZ(p);
          pos.setY(
            p,
            Math.sin(px * 0.45 + t) * 0.45 +
              Math.cos(pz * 0.6 + t * 0.8 + seeds[p] * 0.15) * 0.35,
          );
        }
        pos.needsUpdate = true;
        gold.rotation.y = t * 0.02;
      }

      camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.03;
      camera.position.y += (2.2 - mouse.y * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      goldGeo.dispose();
      goldMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
