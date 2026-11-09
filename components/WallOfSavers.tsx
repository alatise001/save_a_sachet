'use client';
import { ArrowRight, Earth, Recycle, Sprout } from 'lucide-react';
import { SAVERS_GOAL } from '@/config';
import { formatSaverId, getTier, useSavers, useSaverTotal } from '@/lib/savers';
import { Accent, Container, Eyebrow, Heading, Reveal } from './ui';

const TIER_ICON = { pledger: Sprout, collector: Recycle, guardian: Earth };

export function WallOfSavers() {
  const savers = useSavers();
  const total = useSaverTotal();

  return (
    <section id="wall-of-savers" className="bg-paper py-24 lg:py-28">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Wall of Savers</Eyebrow>
          <Heading as="h3" className="mt-6 text-forest">
            Meet the first <Accent>100.</Accent>
          </Heading>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/65">
            Every card below is a real person choosing a cleaner Akungba Akoko.
          </p>
          <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-forest/55">
            {Math.max(0, SAVERS_GOAL - total)} of {SAVERS_GOAL} spots open
          </p>
        </div>

        {savers.length === 0 ? (
          <Reveal className="mx-auto mt-12 flex max-w-lg flex-col items-center rounded-[1.75rem] border-2 border-dashed border-forest/20 px-8 py-14 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-lime-100 text-forest">
              <Sprout className="size-7" />
            </span>
            <p className="mt-5 font-display text-xl font-semibold text-forest">
              No savers yet — be the first!
            </p>
            <a
              href="#reg-form"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 font-display font-semibold text-lime transition hover:bg-forest-700"
            >
              Register now
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </a>
          </Reveal>
        ) : (
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {savers.map((s, i) => {
              const tier = getTier(s.sachets);
              const Icon = TIER_ICON[tier.key];
              return (
                <li
                  key={s.id}
                  className="flex animate-pop-in flex-col items-center rounded-[1.5rem] bg-white px-4 pb-6 pt-5 text-center ring-1 ring-forest/10"
                  style={{ animationDelay: `${Math.min(i, 20) * 0.05}s` }}
                >
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-forest/50">
                    Saver {formatSaverId(s.id)}
                  </span>
                  <span className="mt-4 grid size-14 place-items-center rounded-full bg-forest text-lime">
                    <Icon className="size-6" />
                  </span>
                  <span className="mt-3 max-w-full truncate font-display text-xl font-semibold text-forest">
                    {s.firstName}
                  </span>
                  <span className="mt-1.5 rounded-full bg-lime-100 px-2.5 py-0.5 font-display text-xs font-semibold text-forest">
                    {tier.name}
                  </span>
                </li>
              );
            })}
            {total < SAVERS_GOAL && (
              <li>
                <a
                  href="#reg-form"
                  className="flex h-full min-h-48 flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-forest/20 p-4 text-center font-display font-semibold text-forest/70 transition hover:border-forest/40 hover:text-forest"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-lime-100 text-forest">
                    <ArrowRight className="size-5" />
                  </span>
                  <span className="mt-3">Claim the next spot</span>
                </a>
              </li>
            )}
          </ul>
        )}
      </Container>
    </section>
  );
}
