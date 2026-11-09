import {
  ArrowRight,
  Factory,
  Handshake,
  Leaf,
  RadioTower,
  School,
  Store,
  type LucideIcon,
} from "lucide-react"
import { Carousel } from "./Carousel"
import { Accent, Container, Eyebrow, Heading } from "./ui"

type Partner = {
  icon: LucideIcon
  type: string
  desc: string
  badge: string
}

const PARTNERS: Partner[] = [
  {
    icon: Factory,
    type: "Industry",
    desc: "Manufacturing and production companies supporting our sachet collection and recycling infrastructure.",
    badge: "Infrastructure Support",
  },
  {
    icon: RadioTower,
    type: "Telecom",
    desc: "Network providers powering the Waste to Data campaign — enabling plastic-for-data exchange for students.",
    badge: "Data Rewards",
  },
  {
    icon: School,
    type: "Academic Institution",
    desc: "Schools and universities in Akungba Akoko integrating collection drives into student activities.",
    badge: "Community Reach",
  },
  {
    icon: Leaf,
    type: "NGO / Environment",
    desc: "Environmental organisations co-creating awareness drives and lending expertise to our recycling roadmap.",
    badge: "Awareness Drive",
  },
  {
    icon: Store,
    type: "Local Business",
    desc: "Community businesses hosting drop-off points and promoting sachet collection among their customers.",
    badge: "Drop-off Host",
  },
]

export function Partners() {
  return (
    <section
      id="partners"
      className="overflow-hidden bg-lime-100 py-24 lg:py-32"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Our Partners</Eyebrow>
            <Heading className="mt-6 text-forest">
              Backed by those who
              <br />
              believe in <Accent>greener futures.</Accent>
            </Heading>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink/65 lg:justify-self-end">
            We collaborate with companies, brands, and institutions who share
            our commitment to a cleaner Akungba Akoko.
          </p>
        </div>

        <div className="mt-14">
          <Carousel
            label="Partners"
            breakpoints={[
              [560, 1],
              [860, 2],
            ]}
            maxVisible={3}
            interval={3500}
            tone="light"
          >
            {PARTNERS.map(({ icon: Icon, type, desc, badge }) => (
              <article
                key={type}
                className="flex w-full flex-col rounded-[1.75rem] bg-white p-8 ring-1 ring-forest/10"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-lime-100 text-forest">
                  <Icon className="size-6" strokeWidth={2} />
                </span>
                <h3 className="mt-8 font-display text-2xl font-semibold text-forest">
                  Partner Name
                </h3>
                <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.14em] text-forest/55">
                  {type}
                </p>
                <p className="mt-4 leading-relaxed text-ink/65">{desc}</p>
                <div className="mt-auto pt-8">
                  <span className="inline-block rounded-full bg-forest/[0.06] px-3.5 py-1.5 font-display text-sm font-semibold text-forest">
                    {badge}
                  </span>
                </div>
              </article>
            ))}
            <article className="flex w-full flex-col rounded-[1.75rem] bg-forest p-8 text-mint">
              <span className="grid size-14 place-items-center rounded-2xl bg-lime text-forest">
                <Handshake className="size-6" strokeWidth={2} />
              </span>
              <h3 className="mt-8 font-display text-2xl font-semibold">
                Become a Partner
              </h3>
              <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.14em] text-lime">
                Open Partnership
              </p>
              <p className="mt-4 leading-relaxed text-mint/70">
                Interested in supporting a cleaner Akungba Akoko? Brands,
                businesses, and organisations are welcome.
              </p>
              <div className="mt-auto pt-8">
                <a
                  href="#join"
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 font-display font-semibold text-forest transition hover:bg-lime-300"
                >
                  Partner with us
                  <ArrowRight className="size-4" strokeWidth={2.5} />
                </a>
              </div>
            </article>
          </Carousel>
        </div>
      </Container>
    </section>
  )
}
