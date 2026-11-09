import { Campaigns } from '@/components/Campaigns';
import { Countdown } from '@/components/CountDown';
import { HowItWorks } from '@/components/HowItWorks';
import { Impact } from '@/components/Impact';
import InfoTag from '@/components/InfoTag';
import { Join } from '@/components/Join';
import { Milestones } from '@/components/Milestones';
import { Overview } from '@/components/Overview';
import { Partners } from '@/components/Partners';
import { Button } from '@/components/ui/button';
import { Voices } from '@/components/Voices';
import { WallOfSavers } from '@/components/WallOfSavers';
import { ArrowRight, CircleCheck, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="">
      <section className="relative flex items-end isolate min-h-svh overflow-hidden">
        <Image
          width={1920}
          height={1080}
          priority
          quality={75}
          src="/heroBg.avif"
          alt="A heap of discarded plastic waste"
          className="absolute inset-0 -z-30 size-full object-cover grayscale contrast-[1.15] brightness-[0.7]"
          fetchPriority="high"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-forest-800 mix-blend-multiply"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950 via-forest-950/70 to-forest-950/50"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/80 via-forest-950/40 to-forest-950/20"
        />
        <div className="mx-auto w-full max-w-7xl px-5 pb-28 pt-36 sm:px-8 lg:pb-32">
          <div className="grid items-end gap-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <InfoTag
                description="Akungba Akoko · Ondo State"
                icon={MapPin}
                blur={true}
              />

              <h1 className="mt-7 text-sugar-cane-grey-98 font-display text-[clamp(3.4rem,10.5vw,8.25rem)] font-semibold leading-[0.88] tracking-[-0.02em]">
                Don’t throw
                <br />
                it away,
                <span className="block text-lime">Save it.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-mint/75 sm:text-xl">
                A community movement to collect 10,000 sachets in 2 months —
                fighting plastic pollution one sachet at a time and building a
                recycling future for Akungba Akoko.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button variant={'light'}>
                  Pledge your sachets
                  <ArrowRight className="size-5" strokeWidth={2.5} />
                </Button>
                {/* <a
                  href="#join"
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 font-display text-lg font-semibold text-forest shadow-[0_10px_40px_-10px_rgb(179_237_127/0.6)] transition hover:bg-lime-300 active:scale-[0.97]"
                ></a> */}

                <Button variant={'outline'}>How it works</Button>

                {/* <a
                  href="#how"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 font-display text-lg font-medium text-mint transition hover:border-white/50 hover:bg-white/5"
                >
                  How it works
                </a> */}
              </div>
            </div>

            <aside className="hidden sm:block lg:col-span-4 lg:justify-self-end">
              <div className="w-[290px] -rotate-3 rounded-[2rem] bg-lime p-7 text-forest shadow-2xl shadow-black/40 transition-transform duration-500 hover:rotate-0">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.12em] text-lime">
                    <CircleCheck className="size-3.5" strokeWidth={2.5} />
                    Phase 1 · Achieved
                  </span>
                </div>
                <p className="mt-5 font-display text-7xl font-semibold leading-none tracking-tight tabular-nums">
                  {/* {SACHETS_SAVED.toLocaleString('en-US')} */}
                </p>
                <p className="mt-2 text-[0.95rem] leading-snug text-forest/75">
                  used water sachets kept off the streets of Akungba Akoko.
                </p>
                <div className="my-5 border-t-2 border-dashed border-forest/20" />
                <a
                  href="#campaigns"
                  className="group flex items-center justify-between font-display font-semibold"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-[0.12em] text-forest/60">
                      Now active
                    </span>
                    100 Savers in 3 Months
                  </span>
                  <span className="grid size-10 place-items-center rounded-full bg-forest text-lime transition group-hover:rotate-[-45deg]">
                    <ArrowRight className="size-4" strokeWidth={2.5} />
                  </span>
                </a>
              </div>
            </aside>
          </div>
        </div>

        <a
          href="#overview"
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-mint/50 transition hover:text-mint"
        >
          <span className="sr-only">Scroll to content</span>
          <span aria-hidden>scroll</span>
          <span
            aria-hidden
            className="relative h-10 w-px overflow-hidden bg-white/15"
          >
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-lime motion-reduce:animate-none" />
          </span>
        </a>
      </section>
      <Countdown />
      <Overview />
      <Impact />
      <HowItWorks />
      <Milestones />
      <Voices />
      <Campaigns />
      <Partners />
      <Join />
      <WallOfSavers />
    </div>
  );
}

// <Image
//   className="dark:invert h-5 w-[100px]"
//   src="/next.svg"
//   alt="Next.js logo"
//   width={100}
//   height={20}
//   priority
// />
//  <Image
//    className="dark:invert h-[14px] w-4"
//    src="/vercel.svg"
//    alt="Vercel logomark"
//    width={16}
//    height={14}
//  />;
