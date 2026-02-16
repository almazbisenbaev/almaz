'use client';

import { memo, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useVelocity, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { scrollSkewConfig } from '@/config/scrollSkew';

function ScrollSkewWrapper({ children }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if the device supports touch
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
    
    setIsTouchDevice(checkTouchDevice());
  }, []);

  // If disabled, or if touchDevicesOnly is true and not a touch device, render without effect
  if (!scrollSkewConfig.enabled || (scrollSkewConfig.touchDevicesOnly && !isTouchDevice)) {
    return <>{children}</>;
  }

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewY = useMotionValue(0);
  const rafId = useRef(null);
  const lastUpdate = useRef(0);

  // Use config values
  const velocityThreshold = scrollSkewConfig.velocityThreshold;
  const maxVelocity = scrollSkewConfig.maxVelocity;
  const maxSkew = scrollSkewConfig.maxSkew;
  
  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    // Throttle updates to max 60fps (16ms between updates)
    const now = Date.now();
    if (now - lastUpdate.current < 16) return;
    lastUpdate.current = now;
    
    // Cancel any pending animation frame
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      const absVelocity = Math.abs(latest);
      
      // Only apply skew if velocity exceeds threshold
      if (absVelocity < velocityThreshold) {
        skewY.set(0);
        return;
      }
      
      // Calculate skew based on velocity
      const normalizedVelocity = Math.min(absVelocity, maxVelocity);
      const skewValue = ((normalizedVelocity - velocityThreshold) / (maxVelocity - velocityThreshold)) * maxSkew;
      
      skewY.set(latest > 0 ? skewValue : -skewValue);
    });
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <motion.div 
      style={{ 
        skewY,
        backfaceVisibility: "hidden",
        perspective: 1000,
        WebkitFontSmoothing: "antialiased"
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default memo(ScrollSkewWrapper);
