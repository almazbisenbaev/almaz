'use client';

import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';

function subscribe(callback) {
  const preference = window.matchMedia(query);
  preference.addEventListener('change', callback);
  return () => preference.removeEventListener('change', callback);
}

export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
}
