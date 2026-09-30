'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * The 3D easter-egg version of the avatar photo: a sphere, squashed slightly
 * head-shaped, textured with the photo and leaning toward the cursor.
 *
 * Rendering is paused whenever `active` is false, so an off-screen or hidden
 * sphere costs nothing.
 *
 * @param {Object} props
 * @param {number} props.width - CSS pixels; also drives the camera's aspect.
 * @param {number} props.height
 * @param {boolean} [props.active=true] - Runs the animation loop.
 * @param {Function} [props.onReady] - Called once a real textured frame has
 *   been rendered, so the parent can reveal it without flashing black.
 */
export default function RotatingSphere({ width, height, active = true, onReady, className = '' }) {
  const containerRef = useRef(null);
  const loopRef = useRef({ start: () => {}, stop: () => {} });
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  });

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

    let disposed = false;

    const textureLoader = new THREE.TextureLoader();
    // Once the texture arrives, draw a frame even while paused so the sphere
    // is already textured when it becomes visible, then signal readiness so the
    // parent only reveals it after a real textured frame exists (never black).
    const texture = textureLoader.load('/images/texture.jpg', () => {
      if (disposed) return;
      if (!running) {
        renderer.render(scene, camera);
      }
      onReadyRef.current?.();
    });
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

    // Caps cursor tracking at 45 degrees, so the sphere leans rather than spins.
    const maxRotation = Math.PI / 4;

    const clampRotation = (value, limit) => Math.max(-limit, Math.min(limit, value));

    const handleMouseMove = (event) => {
      // While the sphere is hidden or paused there is nothing to aim, so skip
      // the per-move math rather than running it on every mouse move.
      if (!running) return;

      // Pointer position as -1..1 from the centre of the viewport.
      const offsetX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const offsetY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      // Vertical lean is halved; a full range up and down reads as a wobble.
      targetRotationY = initialRotationY + clampRotation(offsetX * maxRotation, maxRotation);
      targetRotationX = initialRotationX + clampRotation(offsetY * maxRotation / 2, maxRotation / 2);
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
      disposed = true;
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
