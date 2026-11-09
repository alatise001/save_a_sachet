'use client';
import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useVisibleCount } from '@/hooks/useVisibleCount';

const GAP = 20;

type Props = {
  children: ReactNode;
  label: string;
  /** [maxViewportWidth, slidesVisible] pairs, smallest first. */
  breakpoints: [number, number][];
  maxVisible: number;
  interval: number;
  tone?: 'dark' | 'light';
};

export function Carousel({
  children,
  label,
  breakpoints,
  maxVisible,
  interval,
  tone = 'dark',
}: Props) {
  const slides = Children.toArray(children);
  const visible = useVisibleCount(breakpoints, maxVisible);
  const maxIndex = Math.max(0, slides.length - visible);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const current = Math.min(index, maxIndex);

  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: false, threshold: 0.2 });
  const reducedMotion = useReducedMotion();
  const touchX = useRef<number | null>(null);

  // Wraps around: past the last goes to the first, before the first goes to the last.
  const goTo = (i: number) => {
    setIndex(i > maxIndex ? 0 : i < 0 ? maxIndex : i);
    setResetKey((k) => k + 1);
  };

  useEffect(() => {
    if (paused || !inView || reducedMotion || maxIndex === 0) return;
    const timer = setInterval(() => {
      setIndex((i) =>
        Math.min(i, maxIndex) >= maxIndex ? 0 : Math.min(i, maxIndex) + 1
      );
    }, interval);
    return () => clearInterval(timer);
  }, [paused, inView, reducedMotion, maxIndex, interval, resetKey]);

  const dark = tone === 'dark';
  const btn = `grid size-12 place-items-center rounded-full transition active:scale-95 ${
    dark
      ? 'bg-white/5 text-mint ring-1 ring-white/15 hover:bg-lime hover:text-forest'
      : 'bg-white text-forest ring-1 ring-forest/15 hover:bg-forest hover:text-lime'
  }`;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setPaused(false);
      }}
    >
      <div
        className="-my-4 overflow-hidden py-4"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
        }}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.75,.2,1)] motion-reduce:transition-none"
          style={{
            gap: GAP,
            transform: `translateX(calc(${-current} * (100% + ${GAP}px) / ${visible}))`,
          }}
        >
          {slides.map((slide, i) => {
            const shown = i >= current && i < current + visible;
            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                inert={!shown}
                className={`flex transition-opacity duration-500 ${
                  shown ? 'opacity-100' : 'opacity-40'
                }`}
                style={{
                  flex: `0 0 calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
                }}
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              className="group grid h-8 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? `w-8 ${dark ? 'bg-lime' : 'bg-forest'}`
                    : `w-2 ${
                        dark
                          ? 'bg-white/25 group-hover:bg-white/50'
                          : 'bg-forest/20 group-hover:bg-forest/40'
                      }`
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={btn}
            onClick={() => goTo(current - 1)}
            aria-label="Previous"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => goTo(current + 1)}
            aria-label="Next"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
