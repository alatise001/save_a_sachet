'use client';
import { useEffect, useState, type RefObject } from 'react';

type Options = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = true, rootMargin = '0px', threshold = 0 }: Options = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const timeout = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(timeout);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once, rootMargin, threshold]);

  return inView;
}
