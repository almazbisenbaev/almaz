'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export default function Sculpture({ finish, paused }) {
  const hostRef = useRef(null);
  const controls = useRef({ finish, paused });
  useEffect(() => { controls.current = { finish, paused }; }, [finish, paused]);

  useEffect(() => {
    const host = hostRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return; // The CSS sculpture remains visible without WebGL.
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
    camera.position.set(0, 0, 7.6);
    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(environment, 0.04);
    scene.environment = envMap.texture;
    environment.dispose();
    pmrem.dispose();

    const geometry = new THREE.TorusKnotGeometry(1.12, 0.36, 240, 40, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xb9b9b4, metalness: 1, roughness: 0.19,
      clearcoat: 1, clearcoatRoughness: 0.16, envMapIntensity: 1.9,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(0.5, -0.35, -0.4);
    scene.add(mesh);
    const fill = new THREE.DirectionalLight(0xe9ffbf, 3);
    fill.position.set(3, 2, 4);
    scene.add(fill);
    const color = new THREE.Color();
    const pointer = { x: 0, y: 0 };
    let active = true;
    let contextLost = false;
    let frame = 0;
    let phase = 0;
    let previous = 0;
    let previousFinish;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 1 ? 8.4 : 7.6;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      drawStill();
    };
    const render = () => {
      if (contextLost) return;
      const acid = controls.current.finish === 'acid';
      color.set(acid ? 0xd0ff53 : 0xb9b9b4);
      material.color.copy(color);
      material.metalness = acid ? 0.35 : 1;
      material.roughness = acid ? 0.24 : 0.19;
      renderer.render(scene, camera);
      host.dataset.ready = 'true';
      previousFinish = controls.current.finish;
    };
    function drawStill() { render(); }
    const tick = (time) => {
      const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      const moving = !reducedMotion.matches && !controls.current.paused;
      if (active && !document.hidden && !contextLost) {
        if (moving) {
          phase += delta;
          mesh.rotation.x += (0.5 + pointer.y * 0.3 - mesh.rotation.x) * 0.04;
          mesh.rotation.y = -0.35 + phase * 0.13 + pointer.x * 0.25;
          mesh.rotation.z = -0.4 + Math.sin(phase * 0.3) * 0.15;
          mesh.position.y = Math.sin(phase * 0.8) * 0.075;
          render();
        } else if (previousFinish !== controls.current.finish) render();
      }
      frame = requestAnimationFrame(tick);
    };
    const onPointer = (event) => {
      const bounds = host.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const onLeave = () => { pointer.x = 0; pointer.y = 0; };
    const onLost = (event) => {
      event.preventDefault();
      contextLost = true;
      host.dataset.ready = 'false';
    };
    const onRestored = () => { contextLost = false; render(); };
    const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(host);
    sizeObserver.observe(host);
    host.addEventListener('pointermove', onPointer);
    host.addEventListener('pointerleave', onLeave);
    renderer.domElement.addEventListener('webglcontextlost', onLost);
    renderer.domElement.addEventListener('webglcontextrestored', onRestored);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      host.removeEventListener('pointermove', onPointer);
      host.removeEventListener('pointerleave', onLeave);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onRestored);
      geometry.dispose();
      material.dispose();
      envMap.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="c2-sculpture" ref={hostRef} aria-hidden="true"><div className={`c2-sculpture-fallback ${finish === 'acid' ? 'is-acid' : ''}`}><i /><i /><i /></div></div>;
}
