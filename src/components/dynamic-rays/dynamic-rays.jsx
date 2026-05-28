"use client";

import { useEffect, useState } from "react";

const FADE_IN_DURATION_MS = 1600;
const IDLE_TIMEOUT_MS = 1500;

export default function DynamicRays({ style, ...props }) {
  const [Rays, setRays] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let idleId;
    let timeoutId;

    const loadRays = async () => {
      const module = await import("../light-rays/light-rays");

      if (!isCancelled) {
        setRays(() => module.default);
      }
    };

    const mountWhenIdle = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => {
          void loadRays();
        }, { timeout: IDLE_TIMEOUT_MS });
        return;
      }

      timeoutId = window.setTimeout(() => {
        void loadRays();
      }, 0);
    };

    if (document.readyState === "complete") {
      mountWhenIdle();
    } else {
      window.addEventListener("load", mountWhenIdle, { once: true });
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("load", mountWhenIdle);

      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!Rays) {
    return null;
  }

  const targetOpacity = style?.opacity ?? 1;

  return (
    <Rays
      {...props}
      onReady={() => {
        window.requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }}
      style={{
        ...style,
        opacity: isVisible ? targetOpacity : 0,
        transition: style?.transition
          ? `${style.transition}, opacity ${FADE_IN_DURATION_MS}ms ease`
          : `opacity ${FADE_IN_DURATION_MS}ms ease`,
      }}
    />
  );
}
