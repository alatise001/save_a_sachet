'use client';
import {
  BellRing,
  Building2,
  ChartColumn,
  Earth,
  Factory,
  Flame,
  GraduationCap,
  HardHat,
  MapPin,
  Milk,
  RadioTower,
  Recycle,
  Rocket,
  School,
  Smartphone,
  Sprout,
  Ticket,
  Trophy,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { SACHET_GOAL, SACHETS_SAVED, SAVERS_GOAL } from '@/config';
import { useSaverTotal } from '@/lib/savers';
import { Carousel } from './Carousel';
import { Container, Eyebrow, Heading, ProgressBar } from './ui';

type Goal = {
  icon: LucideIcon;
  text: string;
};

type Campaign = {
  badge: string;
  badgeStyle: 'active' | 'now' | 'upcoming';
  icon: LucideIcon;
  title: string;
  dates: string;
  desc: string;
  goals: Goal[];
  progress?: {
    value: number;
    label: string;
  };
  teaser?: Goal;
  featured?: boolean;
};

const BADGE = {
  active: 'bg-lime/15 text-lime ring-1 ring-lime/30',
  now: 'bg-lime text-forest',
  upcoming: 'text-mint/70 ring-1 ring-white/20',
};

export function Campaigns() {
  const savers = useSaverTotal();

  const campaigns: Campaign[] = [
    {
      badge: 'Phase 1 · Active',
      badgeStyle: 'active',
      icon: Recycle,
      title: '10,000 in 2 Months',
      dates: 'April 16 – June 16, 2026',
      desc: 'Our flagship launch campaign: mobilising Akungba Akoko to collect 10,000 used water sachets in just 60 days. Every sachet is counted, logged, and kept out of our streets and waterways.',
      goals: [
        { icon: MapPin, text: 'Community collection points' },
        { icon: ChartColumn, text: 'Live tracking dashboard' },
        { icon: School, text: 'School & market drives' },
      ],
      progress: {
        value: (SACHETS_SAVED / SACHET_GOAL) * 100,
        label: `${SACHETS_SAVED.toLocaleString('en-US')} / ${SACHET_GOAL.toLocaleString('en-US')} sachets`,
      },
    },
    {
      badge: 'Phase 2 · Active Now',
      badgeStyle: 'now',
      icon: Sprout,
      title: '100 Savers in 3 Months',
      dates: 'Current Phase · 3-Month Drive',
      desc: 'Onboarding 100 registered Savers who guarantee a constant, reliable supply of raw material. Each Saver gets a unique ID, a tier badge, and priority access to Phase 3 rewards. People, not just plastic — this is the human backbone of the movement.',
      goals: [
        { icon: Ticket, text: 'Unique Saver ID for each member' },
        { icon: Trophy, text: 'Pledger → Collector → Guardian tiers' },
        { icon: Zap, text: 'Phase 3 priority access guaranteed' },
      ],
      progress: {
        value: (savers / SAVERS_GOAL) * 100,
        label: `${savers} / ${SAVERS_GOAL} Savers registered`,
      },
      featured: true,
    },
    {
      badge: 'Phase 3 · Coming Soon',
      badgeStyle: 'upcoming',
      icon: RadioTower,
      title: 'Waste to Data',
      dates: 'Launching after Phase 1',
      desc: 'Students and community members bring plastic bottles and water nylons to collection centres and receive mobile data subscriptions in exchange — making recycling personally beneficial and building lasting habits.',
      goals: [
        { icon: GraduationCap, text: 'Student-focused rewards' },
        { icon: Smartphone, text: 'Data for plastic exchange' },
        { icon: Milk, text: 'Bottles & water nylons' },
      ],
      teaser: {
        icon: BellRing,
        text: 'Join the waitlist to be notified at launch',
      },
    },
    {
      badge: 'Phase 3 · Future',
      badgeStyle: 'upcoming',
      icon: Factory,
      title: 'Recycling Hub',
      dates: 'Long-term vision',
      desc: 'A permanent community-owned recycling facility that converts collected plastic waste into reusable materials, creates local employment, and models a sustainable circular economy for Akungba Akoko.',
      goals: [
        { icon: Building2, text: 'Permanent facility' },
        { icon: HardHat, text: 'Local jobs created' },
        { icon: Earth, text: 'Circular economy model' },
      ],
      teaser: { icon: Rocket, text: 'More details coming soon' },
    },
  ];

  return (
    <section
      id="campaigns"
      className="grain overflow-hidden bg-forest py-24 text-mint lg:py-32"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="dark">Our Campaigns</Eyebrow>
            <Heading className="mt-6">
              Projects driving
              <br />
              <span className="text-lime">real change.</span>
            </Heading>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-mint/65 lg:justify-self-end">
            Each campaign is a phase in our journey from awareness to
            sustainable infrastructure.
          </p>
        </div>

        <div className="mt-14">
          <Carousel
            label="Campaigns"
            breakpoints={[[700, 1]]}
            maxVisible={2}
            interval={4000}
          >
            {campaigns.map((c) => (
              <CampaignCard key={c.title} campaign={c} />
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}

function CampaignCard({ campaign: c }: { campaign: Campaign }) {
  const Icon = c.icon;
  return (
    <article
      className={`flex w-full flex-col rounded-[1.75rem] p-7 sm:p-9 ${
        c.featured
          ? 'bg-forest-700 ring-2 ring-lime'
          : 'bg-white/[0.04] ring-1 ring-white/10'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.1em] ${BADGE[c.badgeStyle]}`}
        >
          {c.badgeStyle === 'now' && (
            <Flame className="size-3.5" strokeWidth={2.5} />
          )}
          {c.badge}
        </span>
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-lime text-forest">
          <Icon className="size-6" strokeWidth={2} />
        </span>
      </div>

      <h3 className="mt-8 font-display text-3xl font-semibold leading-tight">
        {c.title}
      </h3>
      <p className="mt-1.5 font-display text-sm font-medium text-lime">
        {c.dates}
      </p>
      <p className="mt-5 leading-relaxed text-mint/70">{c.desc}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {c.goals.map(({ icon: GoalIcon, text }) => (
          <li
            key={text}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-2 text-sm text-mint/85"
          >
            <GoalIcon className="size-4 text-lime" strokeWidth={2} />
            {text}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        {c.progress && (
          <div>
            <ProgressBar
              value={c.progress.value}
              size="sm"
              label={`${c.title} progress`}
            />
            <p className="mt-3 font-display text-sm font-semibold text-mint/80">
              {c.progress.label}
              {c.progress.value >= 100 && (
                <span className="text-lime"> · Complete</span>
              )}
            </p>
          </div>
        )}
        {c.teaser && (
          <p className="flex items-center gap-2.5 rounded-2xl border border-dashed border-white/20 px-4 py-3.5 text-sm text-mint/75">
            <c.teaser.icon className="size-4 shrink-0 text-lime" />
            {c.teaser.text}
          </p>
        )}
      </div>
    </article>
  );
}
