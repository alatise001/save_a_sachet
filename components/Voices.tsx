import { Quote } from "lucide-react"
import { Container, Eyebrow, Heading, Reveal } from "./ui"

const VOICES = [
  {
    quote:
      "Keeping the sachet in my room just gave me joy — the fact that I didn’t see them outside made my environment clean. Sachet water is at the top of the list of waste in Akungba, and reducing that was something I was truly happy about.",
    name: "Emmanuella",
    initials: "EM",
  },
  {
    quote:
      "At first I was intrigued by the idea of saving my sachet nylon, and then I started telling people about it. It was a new experience for me and I was happy I could help my community in a little way.",
    name: "Ayomi",
    initials: "AY",
  },
  {
    quote:
      "I actually enjoy doing it — especially when it contributes to the development of the community. Knowing it makes a real difference makes me enjoy it even more.",
    name: "Sammy",
    initials: "SA",
  },
]

export function Voices() {
  return (
    <section id="collectors" className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Voices from the community</Eyebrow>
            <Heading className="mt-6 text-forest">
              Voices from the
              <br />
              <span className="mark-lime">community.</span>
            </Heading>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink/65 lg:justify-self-end">
            Real words from the people making it happen — volunteer Savers from
            Akungba Akoko.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {VOICES.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.1} className="h-full">
              <figure
                className={`flex h-full flex-col rounded-[1.75rem] p-8 ring-1 sm:p-9 ${
                  i === 0
                    ? "bg-forest text-mint ring-forest"
                    : "bg-white text-ink ring-forest/10"
                }`}
              >
                <Quote
                  aria-hidden
                  className={`size-9 ${
                    i === 0 ? "fill-lime text-lime" : "fill-lime text-lime-600"
                  }`}
                  strokeWidth={1}
                />
                <blockquote
                  className={`mt-6 flex-1 font-serif text-[1.5rem] leading-[1.3] ${
                    i === 0 ? "text-mint" : "text-forest"
                  }`}
                >
                  “{v.quote}”
                </blockquote>
                <figcaption
                  className={`mt-8 flex items-center gap-4 border-t pt-6 ${
                    i === 0 ? "border-white/10" : "border-forest/10"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`grid size-12 place-items-center rounded-full font-display font-semibold ${
                      i === 0 ? "bg-lime text-forest" : "bg-forest text-lime"
                    }`}
                  >
                    {v.initials}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold">
                      {v.name}
                    </span>
                    <span
                      className={`block text-sm ${
                        i === 0 ? "text-mint/60" : "text-ink/55"
                      }`}
                    >
                      Volunteer Saver, Akungba Akoko
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
