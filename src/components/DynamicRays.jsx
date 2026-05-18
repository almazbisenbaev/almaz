"use client";

import dynamic from 'next/dynamic';

const Rays = dynamic(() => import("./light-rays"), { ssr: false });

export default function DynamicRays(props) {
  return <Rays {...props} />;
}
