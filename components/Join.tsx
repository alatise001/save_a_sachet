'use client';
import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Earth,
  Mail,
  Megaphone,
  MessageCircle,
  Recycle,
  Sprout,
  Ticket,
  Trophy,
  UserPlus,
  Zap,
} from 'lucide-react';
import { CONTACT_EMAIL, SAVERS_GOAL, WHATSAPP_URL } from '@/config';
import {
  formatSaverId,
  isPhoneRegistered,
  normalizePhone,
  useSaverTotal,
} from '@/lib/savers';
import { useSession } from '@/lib/session';
import { Field, SelectInput, TextInput, buttonClass } from './forms';
import { Container, Eyebrow, Heading, ProgressBar } from './ui';

const TIERS = [
  { icon: Sprout, name: 'Pledger', desc: 'Registered & committed' },
  { icon: Recycle, name: 'Collector', desc: 'Made a drop-off' },
  { icon: Earth, name: 'Guardian', desc: '50+ sachets contributed' },
];

const BENEFITS = [
  { icon: Ticket, text: 'Unique Saver ID' },
  { icon: Zap, text: 'Phase 2 priority access' },
  { icon: Trophy, text: 'Wall of Savers feature' },
  { icon: Megaphone, text: 'Community recognition' },
];

const SOURCES = [
  'Friend or family',
  'Social media',
  'Campus notice',
  'Market / Community',
  'Other',
];

export function ContactLinks({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const outline =
    tone === 'dark'
      ? 'text-lime ring-1 ring-lime/60 hover:bg-lime/10'
      : 'text-forest ring-1 ring-forest/30 hover:bg-forest/5';
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display font-semibold transition ${outline}`}
      >
        <Mail className="size-4" />
        {CONTACT_EMAIL}
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2.5 font-display font-semibold text-forest transition hover:bg-lime"
      >
        <MessageCircle className="size-4" />
        Chat on WhatsApp
      </a>
    </div>
  );
}

export function Join() {
  const total = useSaverTotal();

  return (
    <section id="join" className="grain bg-forest-900 py-24 text-mint lg:py-32">
      <Container className="grid gap-16 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-20">
        <div>
          <Eyebrow tone="dark">Become a Saver</Eyebrow>
          <Heading className="mt-6">
            Join the <span className="text-lime">movement.</span>
            <br />
            Get your Saver ID.
          </Heading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mint/65">
            Register as an official Save a Sachet Saver — get your unique ID,
            unlock your tier badge, and be first in line for Phase 2 rewards.
            Every saver guarantees a constant supply of raw material for a
            cleaner Akungba Akoko.
          </p>

          <div className="mt-10 max-w-xl rounded-[1.75rem] bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-7">
            <div className="flex items-end justify-between gap-4">
              <p className="font-display font-semibold leading-none">
                <span className="text-6xl tabular-nums text-lime">{total}</span>
                <span className="mx-1.5 text-3xl text-mint/30">/</span>
                <span className="text-3xl text-mint/60">{SAVERS_GOAL}</span>
              </p>
              <p className="pb-1 text-sm font-medium uppercase tracking-[0.14em] text-mint/55">
                Registered Savers
              </p>
            </div>
            <div className="mt-5">
              <ProgressBar
                value={(total / SAVERS_GOAL) * 100}
                label="Registered Savers progress"
              />
            </div>
          </div>

          <ol className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch">
            {TIERS.map(({ icon: Icon, name, desc }, i) => (
              <li
                key={name}
                className="flex flex-1 items-center gap-3 sm:flex-col sm:items-stretch"
              >
                <div
                  className={`flex flex-1 items-center gap-3 rounded-2xl p-4 sm:flex-col sm:items-start ${
                    i === TIERS.length - 1
                      ? 'bg-lime text-forest'
                      : 'bg-white/[0.05] ring-1 ring-white/10'
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                      i === TIERS.length - 1
                        ? 'bg-forest text-lime'
                        : 'bg-lime/15 text-lime'
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight">
                      {name}
                    </span>
                    <span
                      className={`block text-sm ${
                        i === TIERS.length - 1
                          ? 'text-forest/70'
                          : 'text-mint/55'
                      }`}
                    >
                      {desc}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <ul className="mt-6 flex max-w-xl flex-wrap gap-2">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-2 text-sm text-mint/85"
              >
                <Icon className="size-4 text-lime" />
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <p className="text-mint/50">Or reach us directly:</p>
            <div className="mt-3">
              <ContactLinks />
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <RegistrationCard />
        </div>
      </Container>
    </section>
  );
}

export type SignupPrefill = {
  name: string;
  phone: string;
  area: string;
  source: string;
};
type Errors = Partial<Record<keyof SignupPrefill, string>>;
const EMPTY_FIELDS: SignupPrefill = {
  name: '',
  phone: '',
  area: '',
  source: '',
};

export const HEARD_FROM = [
  'Friend or family',
  'Social media',
  'Campus notice',
  'Market / Community',
  'Other',
];

function validate(f: SignupPrefill): Errors {
  const errors: Errors = {};
  if (!f.name.trim()) errors.name = 'Please enter your full name.';
  if (!f.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (normalizePhone(f.phone).length < 10)
    errors.phone = 'Please enter a valid phone number.';
  if (!f.area.trim()) errors.area = 'Please enter your area.';
  return errors;
}

function RegistrationCard() {
  const session = useSession();
  const [fields, setFields] = useState<SignupPrefill>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<Errors>({});

  const update = (key: keyof SignupPrefill) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    if (!found.phone && isPhoneRegistered(fields.phone))
      found.phone = 'This number is already registered — log in instead.';
    if (Object.keys(found).length) {
      setErrors(found);
      document.getElementById(`reg-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    window.sessionStorage.setItem('signup-prefill', JSON.stringify(fields));
    window.location.assign('/signup');
  };

  if (session) {
    return (
      <div
        id="reg-form"
        data-anchor
        className="rounded-[2rem] bg-mint p-7 text-center text-ink shadow-2xl shadow-black/30 sm:p-9"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime text-forest">
          <BadgeCheck className="size-8" strokeWidth={2} />
        </span>
        <p className="mt-6 font-display text-xl font-semibold text-forest">
          You’re already a Saver, {session.firstName}!
        </p>
        <p className="mt-1 font-display text-5xl font-semibold tracking-tight text-forest">
          Saver {formatSaverId(session.saverId)}
        </p>
        <p className="mx-auto mt-4 max-w-xs text-ink/60">
          Track your drop-offs, tier progress and rewards from your dashboard.
        </p>
        <a
          href="/account"
          className={buttonClass('primary', 'lg', 'mt-7 w-full')}
        >
          Go to my dashboard
          <ArrowRight className="size-5" strokeWidth={2.5} />
        </a>
      </div>
    );
  }

  return (
    <div
      id="reg-form"
      data-anchor
      className="rounded-[2rem] bg-mint p-7 text-ink shadow-2xl shadow-black/30 sm:p-9"
    >
      <form noValidate onSubmit={onSubmit}>
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-forest text-lime">
            <UserPlus className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold leading-tight text-forest">
              Register as a Saver
            </h3>
            <p className="text-sm text-ink/50">
              Step 1 of 3 · Takes about 2 minutes
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-4">
          <Field id="reg-name" label="Full name" error={errors.name}>
            <TextInput
              id="reg-name"
              autoComplete="name"
              placeholder="e.g. Tolu Adeyemi"
              value={fields.name}
              onChange={(e) => update('name')(e.target.value)}
              invalid={!!errors.name}
            />
          </Field>
          <Field
            id="reg-phone"
            label="Phone number (WhatsApp)"
            error={errors.phone}
          >
            <TextInput
              id="reg-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0803 000 0000"
              value={fields.phone}
              onChange={(e) => update('phone')(e.target.value)}
              invalid={!!errors.phone}
            />
          </Field>
          <Field
            id="reg-area"
            label="Your area in Akungba Akoko"
            error={errors.area}
          >
            <TextInput
              id="reg-area"
              autoComplete="address-level3"
              placeholder="Your street or neighbourhood"
              value={fields.area}
              onChange={(e) => update('area')(e.target.value)}
              invalid={!!errors.area}
            />
          </Field>
          <Field id="reg-source" label="How did you hear about us?" optional>
            <SelectInput
              id="reg-source"
              placeholder="Choose one"
              options={HEARD_FROM}
              value={fields.source}
              onChange={(e) => update('source')(e.target.value)}
            />
          </Field>
        </div>

        <button
          type="submit"
          className={buttonClass('primary', 'lg', 'mt-7 w-full')}
        >
          Become a Saver
          <ArrowRight className="size-5" strokeWidth={2.5} />
        </button>
        <p className="mt-5 text-center text-sm text-ink/55">
          Already a Saver?{' '}
          <a
            href="/login"
            className="font-display font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
