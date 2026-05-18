"use client";

import dynamic from 'next/dynamic';

const Rays = dynamic(() => import("../LightRays/LightRays"), { ssr: false });

export default function DynamicRays(props) {
  return <Rays {...props} />;
}
