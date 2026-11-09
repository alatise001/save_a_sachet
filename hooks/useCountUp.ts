'use client';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/** Animates from the last shown value to `target` once `start` is true. */
export function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const current = useRef(0);

  useEffect(() => {
    if (!start) return;
    const from = current.current;
    if (prefersReducedMotion() || from === target) {
      current.current = target;
      setValue(target);
      setDone(true);
      return;
    }
    setDone(false);
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(from + (target - from) * eased);
      current.current = next;
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(step);
      else setDone(true);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return { value, done };
}
