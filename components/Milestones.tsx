import { CircleCheck, Flame } from "lucide-react"
import { Accent, Container, Eyebrow, Heading, Reveal } from "./ui"

type Status = "done" | "active" | "upcoming"

const PHASES: {
  status: Status
  badge: string
  num: string
  label: string
  desc: string
}[] = [
  {
    status: "done",
    badge: "Phase 1 · Achieved",
    num: "10,000",
    label: "Sachets Collected",
    desc: "Our first 2-month collection drive proved the model — 10,000 used water sachets kept off the streets of Akungba Akoko. The community showed up.",
  },
  {
    status: "active",
    badge: "Phase 2 · Active Now",
    num: "100",
    label: "Registered Savers",
    desc: "Onboarding 100 committed Savers who guarantee a constant, reliable supply of raw material — the human infrastructure behind the movement. Each saver gets a unique ID, tier badge, and first access to Phase 3 rewards.",
  },
  {
    status: "upcoming",
    badge: "Phase 3 · Next",
    num: "Drop-off Hub",
    label: "Physical Infrastructure",
    desc: "A permanent, accessible collection and sorting point embedded in the community. Savers bring plastic waste here and begin earning rewards through the Waste to Data exchange programme.",
  },
  {
    status: "upcoming",
    badge: "Phase 4 · Long Term",
    num: "WVC",
    label: "Waste-to-Value Centre",
    desc: "A Material Recovery Facility that opens our value chain beyond sachets — bottles, nylons, paper, and more. Turning community waste into reusable materials, creating local jobs, and modelling a circular economy for Akungba Akoko.",
  },
]

const CARD: Record<Status, string> = {
  done: "bg-lime text-forest",
  active: "bg-forest-700 text-mint ring-2 ring-lime",
  upcoming: "bg-white/[0.03] text-mint ring-1 ring-white/12",
}

const BADGE: Record<Status, string> = {
  done: "bg-forest text-lime",
  active: "bg-lime text-forest",
  upcoming: "ring-1 ring-white/20 text-mint/75",
}

function Node({ status }: { status: Status }) {
  if (status === "done")
    return (
      <span className="grid size-7 place-items-center rounded-full bg-lime text-forest">
        <CircleCheck className="size-4" strokeWidth={2.75} />
      </span>
    )
  if (status === "active")
    return (
      <span className="grid size-7 place-items-center rounded-full bg-forest-950 ring-2 ring-lime">
        <span className="size-2.5 animate-pulse-dot rounded-full bg-lime motion-reduce:animate-none" />
      </span>
    )
  return (
    <span className="grid size-7 place-items-center rounded-full bg-forest-950 ring-1 ring-white/25" />
  )
}

export function Milestones() {
  return (
    <section
      id="milestones"
      className="grain bg-forest-950 py-24 text-mint lg:py-32"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="dark">Our roadmap</Eyebrow>
            <Heading className="mt-6">
              From sachets to
              <br />a{" "}
              <Accent className="text-lime">Waste-to-Value Centre.</Accent>
            </Heading>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-mint/65 lg:justify-self-end">
            Four clear phases — from community collection to a full material
            recovery future for Akungba Akoko.
          </p>
        </div>

        <ol className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PHASES.map((phase, i) => (
            <li key={phase.badge} className="flex flex-col">
              {/* Timeline rail (desktop) */}
              <div
                aria-hidden
                className="relative mb-6 hidden h-7 items-center lg:flex"
              >
                {i < PHASES.length - 1 && (
                  <span
                    className={`absolute left-7 right-[-1.5rem] top-1/2 h-0.5 -translate-y-1/2 ${
                      phase.status === "done"
                        ? "bg-lime"
                        : phase.status === "active"
                          ? "bg-linear-to-r from-lime to-white/15"
                          : "bg-white/15"
                    }`}
                  />
                )}
                <Node status={phase.status} />
              </div>

              <Reveal
                delay={i * 0.1}
                className={`flex h-full flex-col rounded-[1.75rem] p-7 ${CARD[phase.status]}`}
              >
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.1em] ${BADGE[phase.status]}`}
                >
                  {phase.status === "done" && (
                    <CircleCheck className="size-3.5" strokeWidth={2.5} />
                  )}
                  {phase.status === "active" && (
                    <Flame className="size-3.5" strokeWidth={2.5} />
                  )}
                  {phase.badge}
                </span>
                <p className="mt-8 font-display text-[2.75rem] font-semibold leading-[0.95] tracking-tight">
                  {phase.num}
                </p>
                <p
                  className={`mt-3 font-display text-sm font-semibold uppercase tracking-[0.12em] ${
                    phase.status === "done" ? "text-forest/70" : "text-lime"
                  }`}
                >
                  {phase.label}
                </p>
                <p
                  className={`mt-5 text-[0.95rem] leading-relaxed ${
                    phase.status === "done" ? "text-forest/80" : "text-mint/65"
                  }`}
                >
                  {phase.desc}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
