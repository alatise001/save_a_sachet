// import { Link } from "react-router"
import logo from '@/assets/save-a-sachet-logo.png';
import { ContactLinks } from './Join';
import Link from 'next/link';
import Image from 'next/image';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { to: '/#overview', label: 'About' },
      { to: '/#impact', label: 'Impact' },
      { to: '/#how', label: 'How it works' },
      { to: '/#campaigns', label: 'Campaigns' },
      { to: '/#partners', label: 'Partners' },
    ],
  },
  {
    title: 'Savers',
    links: [
      { to: '/signup', label: 'Become a Saver' },
      { to: '/login', label: 'Log in' },
      { to: '/account', label: 'My dashboard' },
      { to: '/account/points', label: 'Drop-off points' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/terms', label: 'Terms of use' },
      { to: '/privacy', label: 'Privacy policy' },
      { to: '/#join', label: 'Contact' },
      { to: '/admin/login', label: 'Staff login' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-mint">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link
              href="/"
              aria-label="Save a Sachet — home"
              className="inline-block"
            >
              <Image
                src={'/sas-logo.png'}
                alt=""
                className="h-16 w-auto"
                width={692}
                height={210}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mint/55">
              © 2026 · Fighting plastic pollution in Akungba Akoko, one sachet
              at a time.
            </p>
            <div className="mt-6">
              <ContactLinks />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-mint/40">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5 font-display font-medium">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.to}
                        className="text-mint/75 transition hover:text-lime"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none mt-10 select-none whitespace-nowrap text-center font-display text-[22vw] font-semibold leading-[0.78] tracking-[-0.04em] text-forest-700/70"
      >
        Save it.
      </p>
    </footer>
  );
}
