"use client"

import { useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { TextureLoader } from "three"

function EarthSphere({ imageUrl }) {
  const meshRef = useRef(null)

  // Load the texture image from the provided URL
  const texture = useLoader(TextureLoader, imageUrl)

  // Animation loop - runs every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the sphere around Y-axis (horizontal rotation)
      // delta = time since last frame, 0.2 = rotation speed (higher = faster)
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      {/* 
        Sphere Geometry Parameters:
        - First arg (2.3): Radius of the sphere (larger = bigger sphere)
        - Second arg (64): Width segments (higher = smoother sphere, but more performance cost)
        - Third arg (64): Height segments (higher = smoother sphere, but more performance cost)
      */}
      <sphereGeometry args={[2.3, 64, 64]} />

      {/* Material that responds to lighting and uses the texture image */}
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default function FaceBall({
  width = 400, // Width of the container in pixels
  height = 400, // Height of the container in pixels
  className = "", // Additional CSS classes to apply
  imageUrl = "/face.jpg", // URL/path to the texture image
}) {
  // Combine default CSS classes with any custom ones passed in
  const defaultClasses = "transition-transform duration-600 ease-in-out hover:scale-110"
  const combinedClasses = className ? `${defaultClasses} ${className}` : defaultClasses

  return (
    <div className={combinedClasses} style={{ width: `${width}px`, height: `${height}px` }}>
      <Canvas
        camera={{
          position: [0, 0, 5], // Camera position [x, y, z] - higher z = further away
          fov: 60, // Field of view in degrees (lower = more zoomed in, higher = more zoomed out)
        }}
      >
        {/* 
          Ambient Light: Provides overall illumination to prevent completely dark areas
          intensity: 0.4 = 40% brightness (0 = no light, 1 = full brightness)
        */}
        <ambientLight intensity={0.4} />

        {/* 
          Directional Light: Simulates sunlight coming from a specific direction
          position: [5, 5, 5] = light comes from top-right-front
          intensity: 1 = 100% brightness
          castShadow: enables shadow casting (though shadows need additional setup)
        */}
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        {/* The rotating Earth sphere component */}
        <EarthSphere imageUrl={imageUrl} />

        {/* 
          Orbit Controls: Handles mouse/touch interactions
          enableZoom: false = disable scroll wheel zooming
          enablePan: true = allow dragging to move the view around
          enableRotate: true = allow dragging to rotate the camera around the sphere
          autoRotate: false = don't automatically rotate the camera (sphere rotates instead)
        */}
        <OrbitControls enableZoom={false} enablePan={true} enableRotate={true} autoRotate={false} />
      </Canvas>
    </div>
  )
}
