'use client';
import { useRef, type CSSProperties, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

type Tone = 'dark' | 'light';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = 'light',
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const styles =
    tone === 'dark'
      ? 'border-lime/35 text-lime'
      : 'border-forest/20 bg-white/60 text-forest';
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-display text-[0.78rem] font-semibold uppercase tracking-[0.16em] ${styles}`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${
          tone === 'dark' ? 'bg-lime' : 'bg-forest'
        }`}
      />
      {children}
    </p>
  );
}

export function Heading({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <Tag
      className={`font-display text-[clamp(2.4rem,5.4vw,4.1rem)] font-semibold leading-[1] tracking-[-0.015em] text-balance ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Editorial serif italic accent, used for the roadmap/partners/wall headings. */
export function Accent({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-serif font-normal italic tracking-normal ${className}`}
    >
      {children}
    </span>
  );
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.05,
  });
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

export function ProgressBar({
  value,
  tone = 'dark',
  size = 'md',
  label,
}: {
  value: number;
  tone?: Tone;
  size?: 'sm' | 'md';
  label: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className={`overflow-hidden rounded-full ${
        size === 'sm' ? 'h-2' : 'h-3'
      } ${tone === 'dark' ? 'bg-white/10' : 'bg-forest/10'}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-[1600ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
          tone === 'dark' ? 'bg-lime' : 'bg-forest'
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
