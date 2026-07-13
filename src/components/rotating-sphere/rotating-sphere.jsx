'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function RotatingSphere({ width, height, active = true, className = '' }) {
  const containerRef = useRef(null);
  const loopRef = useRef({ start: () => {}, stop: () => {} });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !width || !height) return;

    const scene = new THREE.Scene();
    const aspect = width / height;
    const verticalRadius = 1.1;
    const horizontalRadius = 1;
    const camera = new THREE.OrthographicCamera(
      -verticalRadius * aspect,
      verticalRadius * aspect,
      verticalRadius,
      -verticalRadius,
      0.1,
      10
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/images/texture.jpg');
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.SphereGeometry(horizontalRadius, 64, 64);
    const position = geometry.attributes.position;

    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index);
      const y = position.getY(index);
      const z = position.getZ(index);
      const normalizedY = y / horizontalRadius;
      const upperBlend = Math.max(normalizedY, 0);
      const lowerBlend = Math.max(-normalizedY, 0);
      const widthScale = 1 + upperBlend * 0.08 - lowerBlend * 0.06;

      position.setXYZ(index, x * widthScale, y * verticalRadius, z * widthScale);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 3;

    const initialRotationX = 0.3;
    const initialRotationY = -1.54;
    sphere.rotation.x = initialRotationX;
    sphere.rotation.y = initialRotationY;

    let targetRotationX = initialRotationX;
    let targetRotationY = initialRotationY;
    let mouseX = 0;
    let mouseY = 0;

    const maxRotation = Math.PI / 4; // Limit rotation to 45 degrees for subtler cursor tracking

    const handleMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;

      targetRotationY = initialRotationY + Math.max(-maxRotation, Math.min(maxRotation, mouseX * maxRotation));
      targetRotationX = initialRotationX + Math.max(-maxRotation / 2, Math.min(maxRotation / 2, mouseY * maxRotation / 2));
    };

    window.addEventListener('mousemove', handleMouseMove);

    let rafId = 0;
    let running = false;

    const animate = () => {
      if (!running) return;

      sphere.rotation.x += (targetRotationX - sphere.rotation.x) * 0.12;
      sphere.rotation.y += (targetRotationY - sphere.rotation.y) * 0.12;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(animate);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    loopRef.current = { start, stop };

    return () => {
      stop();
      loopRef.current = { start: () => {}, stop: () => {} };
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [width, height]);

  useEffect(() => {
    if (!width || !height) return undefined;

    if (active) {
      loopRef.current.start();
      return undefined;
    }

    // Keep rendering until the hide transition (500ms) finishes before pausing
    const stopTimeout = window.setTimeout(() => loopRef.current.stop(), 600);
    return () => window.clearTimeout(stopTimeout);
  }, [active, width, height]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ 
        width: `${width}px`,
        height: `${height}px`,
        padding: 0,
        margin: 0,
        display: 'block'
      }}
    />
  );
}
