'use client';
import { CircleCheck, Hourglass } from 'lucide-react';
import { DEADLINE } from '@/config';
import { useCountdown } from '@/hooks/useCountdown';
import InfoTag from './InfoTag';

const pad = (n: number) => String(n).padStart(2, '0');

export function Countdown() {
  const { days, hours, minutes, seconds, expired } = useCountdown(DEADLINE);
  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <section aria-labelledby="countdown-title" className="bg-lime text-forest">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-11 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-12">
        <div className="max-w-lg">
          <h2
            id="countdown-title"
            className="flex items-start gap-2.5 font-display text-[0.95rem] font-semibold uppercase leading-snug tracking-[0.12em]"
          >
            <Hourglass
              className="mt-0.5 size-[1.1rem] shrink-0"
              strokeWidth={2.25}
            />
            Countdown to Milestone Day — June 16th, 2026
          </h2>
          <p className="mt-3 leading-relaxed text-forest/75">
            Our 2-month challenge runs April 16 → June 16, 2026. Let’s hit
            10,000 sachets!
          </p>
          {expired && (
            <div className="mt-4">
              <InfoTag
                description="Milestone Day reached · 10,000 sachets saved"
                icon={CircleCheck}
                textColor="text-lime"
                bgColor="bg-forest"
              />
              {/* <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 font-display text-sm font-semibold text-lime">
                <CircleCheck className="size-4" strokeWidth={2.5} />
                Milestone Day reached · 10,000 sachets saved
              </p> */}
            </div>
          )}
        </div>

        <div
          role="timer"
          aria-label="Time until Milestone Day"
          className="flex items-start gap-1.5 sm:gap-3"
        >
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-start gap-1.5 sm:gap-3">
              {i > 0 && (
                <span
                  aria-hidden
                  className="pt-2.5 font-display text-3xl font-semibold text-forest/35 sm:pt-4 sm:text-5xl"
                >
                  :
                </span>
              )}
              <div className="flex flex-col items-center gap-2">
                <span className="min-w-[3.6rem] rounded-2xl bg-forest px-2 py-3 text-center font-display text-[2.1rem] font-semibold leading-none tabular-nums text-lime sm:min-w-[5.75rem] sm:px-4 sm:py-4 sm:text-6xl">
                  {pad(unit.value)}
                </span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest/70 sm:text-xs">
                  {unit.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
