'use client';
import { useRef } from 'react';
import { CircleCheck } from 'lucide-react';
import { DEADLINE, SACHET_GOAL, SACHETS_SAVED } from '@/config';
import { useCountdown } from '@/hooks/useCountdown';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import { useSaverTotal } from '@/lib/savers';
import { Container, Eyebrow, Heading, ProgressBar } from './ui';
import InfoTag from './InfoTag';

export function Impact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.15 });
  const sachets = useCountUp(SACHETS_SAVED, inView, 1800);
  const savers = useCountUp(useSaverTotal(), inView, 900);
  const { days } = useCountdown(DEADLINE);
  const pct = Math.min(100, Math.round((SACHETS_SAVED / SACHET_GOAL) * 100));
  const achieved = SACHETS_SAVED >= SACHET_GOAL;

  const stats = [
    { value: savers.value.toLocaleString('en-US'), label: 'Registered Savers' },
    { value: String(days), label: 'Days remaining' },
    { value: '1', label: 'Community, one mission' },
  ];

  return (
    <section
      id="impact"
      ref={ref}
      className="grain bg-forest py-24 text-mint lg:py-32"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="dark">By the numbers</Eyebrow>
            <Heading className="mt-6">
              This is what we’ve
              <br />
              <span className="text-lime">saved together.</span>
            </Heading>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-mint/65 lg:justify-self-end">
            Real numbers. Real impact. Updated as the community collects.
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 lg:grid-cols-4">
          <div className="col-span-2 border-t border-white/15 pb-10 pt-7 sm:col-span-1">
            <dt className="sr-only">Sachets saved</dt>
            <dd className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-display text-6xl font-semibold leading-none tracking-tight tabular-nums text-lime lg:text-7xl">
                {sachets.value.toLocaleString('en-US')}
              </span>
              {achieved && sachets.done && (
                <>
                  <InfoTag
                    description="Achieved!"
                    icon={CircleCheck}
                    bgColor="bg-lime"
                    textColor="text-forest"
                  />
                  {/* <span className="inline-flex animate-pop-in items-center gap-1.5 rounded-full bg-lime px-3 py-1 font-display text-sm font-semibold text-forest">
                    <CircleCheck className="size-4" strokeWidth={2.5} />
                    Achieved!
                  </span> */}
                </>
              )}
            </dd>
            <dd className="mt-4 flex items-center gap-1.5 text-mint/65">
              {SACHETS_SAVED.toLocaleString('en-US')}
              <CircleCheck
                aria-label="achieved"
                className="size-4 text-lime"
              />{' '}
              — Phase 1 Complete
            </dd>
          </div>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-t border-white/15 pb-10 pt-7"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-6xl font-semibold leading-none tracking-tight tabular-nums lg:text-7xl">
                {stat.value}
              </dd>
              <dd className="mt-4 text-mint/65" aria-hidden>
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 rounded-[1.75rem] bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-display text-lg font-medium">
              Milestone 1 — 10,000 sachets by June 16, 2026
            </p>
            <p className="font-display text-3xl font-semibold tabular-nums text-lime">
              {inView ? pct : 0}%
            </p>
          </div>
          <div className="mt-5">
            <ProgressBar
              value={inView ? pct : 0}
              label="Milestone 1 progress"
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-mint/55">
            <span>
              {SACHETS_SAVED.toLocaleString('en-US')} sachets collected
            </span>
            <span>Goal: {SACHET_GOAL.toLocaleString('en-US')}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
