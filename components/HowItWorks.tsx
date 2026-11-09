import {
  ClipboardList,
  Factory,
  MapPin,
  ShoppingBag,
  Smartphone,
  Sprout,
} from "lucide-react"
import { Container, Eyebrow, Heading, Reveal } from "./ui"

const STEPS = [
  {
    icon: ShoppingBag,
    title: "Collect your sachets",
    desc: "Rinse and keep your used water sachets instead of discarding them. Every single one counts toward a cleaner Akungba Akoko.",
  },
  {
    icon: Sprout,
    title: "Register as a Saver",
    desc: "Sign up to become an official Save a Sachet Saver. Get your unique Saver ID, unlock your tier badge — Pledger, Collector, or Guardian — and guarantee your place in Phase 3 rewards.",
  },
  {
    icon: MapPin,
    title: "Drop off at a point",
    desc: "Bring your sachets, plastic bottles, and water nylons to a collection point near you in Akungba Akoko. The drop-off network grows as our Saver community scales.",
  },
  {
    icon: ClipboardList,
    title: "We sort and log",
    desc: "Every batch is counted, logged, and tracked. Registered Savers build their contribution record — the foundation for tier upgrades and future rewards.",
  },
  {
    icon: Smartphone,
    title: "Earn via Waste to Data",
    desc: "Phase 3 launches the Waste to Data exchange — bring plastic waste to the Drop-off Hub and receive mobile data subscriptions in return. Recycling becomes personally rewarding.",
    note: "Phase 3",
  },
  {
    icon: Factory,
    title: "Waste-to-Value Centre",
    desc: "The long-term vision — a Material Recovery Facility that opens our value chain to all types of waste, creates local jobs, and models a circular economy built and owned by Akungba Akoko.",
    note: "Long term",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <Heading className="mt-6 text-forest">
              Simple steps,
              <br />
              <span className="mark-lime">big difference.</span>
            </Heading>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink/65 lg:justify-self-end">
            From collecting your first sachet to earning rewards and building a
            cleaner Akungba Akoko — here is how the journey works.
          </p>
        </div>

        <ol className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, desc, note }, i) => (
            <li key={title}>
              <Reveal
                delay={(i % 3) * 0.08}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-8 ring-1 ring-forest/10 transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgb(13_51_13/0.35)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-5 font-display text-[5.5rem] font-semibold leading-none tracking-tight text-forest/[0.07] transition-colors duration-300 group-hover:text-lime/60"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-3">
                  <span className="grid size-14 place-items-center rounded-2xl bg-forest text-lime transition-transform duration-300 group-hover:-rotate-6">
                    <Icon className="size-6" strokeWidth={2} />
                  </span>
                  {note && (
                    <span className="rounded-full bg-lime-100 px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-[0.1em] text-forest">
                      {note}
                    </span>
                  )}
                </div>
                <p className="mt-8 font-display text-sm font-semibold text-forest/50">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-forest">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/65">{desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
