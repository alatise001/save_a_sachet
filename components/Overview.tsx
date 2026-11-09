// 'use client';
import { Megaphone, Recycle, ShoppingBag, Sprout } from 'lucide-react';
import { Container, Eyebrow, Heading, Reveal } from './ui';
import Image from 'next/image';

const PILLARS = [
  {
    icon: ShoppingBag,
    title: 'Sachet collection',
    text: 'Gathering used sachets from homes, schools, and businesses across the community.',
  },
  {
    icon: Megaphone,
    title: 'Awareness drives',
    text: 'Teaching proper waste disposal habits and the value of recycling.',
  },
  {
    icon: Recycle,
    title: 'Recycling hub',
    text: 'Our long-term goal — a community-owned facility that turns plastic waste into value.',
  },
  {
    icon: Sprout,
    title: 'Youth engagement',
    text: 'Getting young people in Akungba Akoko involved in environmental stewardship.',
  },
];

export function Overview() {
  return (
    <section id="overview" className="overflow-hidden bg-paper py-24 lg:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-forest">
            <Image
              src={'/pick-up.avif'}
              alt="A gloved hand picking up a discarded plastic bottle"
              loading="lazy"
              className="size-full object-cover"
              width={'1000'}
              height={'1200'}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-forest via-forest/25 to-transparent"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-[1.6rem] bg-forest/90 px-6 py-5 ring-1 ring-white/10 backdrop-blur-md sm:inset-x-7 sm:bottom-7">
              <Image
                src={'/sas-logo.png'}
                alt="Save a Sachet"
                className="mx-auto w-full max-w-[260px]"
                width={692}
                height={210}
              />
            </div>
          </div>
          <div className="absolute -right-3 -top-5 flex rotate-6 items-center gap-2 rounded-full bg-lime px-5 py-3 font-display font-semibold text-forest shadow-xl shadow-forest/20 sm:-right-6">
            <Recycle className="size-5" strokeWidth={2.25} />
            One sachet at a time
          </div>
        </Reveal>

        <div>
          <Eyebrow>What we do</Eyebrow>
          <Heading className="mt-6 text-forest">
            Every sachet collected is a{' '}
            <span className="mark-lime">step forward.</span>
          </Heading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            Save a Sachet is a grassroots environmental initiative based in
            Akungba Akoko. We mobilise community members to collect used water
            sachets — keeping them out of drains, streets, and waterways — and
            channel them toward our future recycling hub.
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-forest/10 ring-1 ring-forest/10 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="bg-paper p-6">
                <Reveal delay={i * 0.06}>
                  <span className="grid size-11 place-items-center rounded-2xl bg-forest text-lime">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <p className="mt-4 font-display text-lg font-semibold text-forest">
                    {title}
                  </p>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/65">
                    {text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
