'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import logo from '@/assets/save-a-sachet-logo.png';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { initials, useSession } from '@/lib/session';
import Image from 'next/image';

const LINKS = [
  { id: 'overview', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'how', label: 'How it works' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'collectors', label: 'Community' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'partners', label: 'Partners' },
  { id: 'join', label: 'Join' },
];

const DRAWER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'overview', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'how', label: 'How it Works' },
  { id: 'milestones', label: 'Our Roadmap' },
  { id: 'collectors', label: 'Community Voices' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'partners', label: 'Partners' },
  { id: 'join', label: 'Become a Saver' },
];

const SPY_IDS = ['home', ...LINKS.map((l) => l.id)];

interface NavProps {
  /** Always show the solid bar (for pages without a dark hero). */
  solid?: boolean;
}

export default function Header({ solid = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);
  const session = useSession();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      menuBtn.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const showBar = solid || scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          showBar
            ? 'border-b border-white/10 bg-forest-950/90 backdrop-blur-lg'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-4 px-5 sm:px-8"
        >
          <Link href="/" aria-label="Save a Sachet — home" className="shrink-0">
            <Image
              src={'/sas-logo.png'}
              alt=""
              className="h-11 w-auto"
              width={692}
              height={210}
            />
          </Link>

          <ul className="ml-auto hidden items-center xl:flex">
            {LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`rounded-full px-3 py-2 font-display text-[0.95rem] font-medium transition-colors ${
                      isActive
                        ? 'bg-white/10 text-lime'
                        : 'text-mint/75 hover:text-mint'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 xl:ml-3">
            {session ? (
              <Link
                href="/account"
                className="hidden items-center gap-2.5 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 font-display text-[0.95rem] font-semibold text-mint transition hover:bg-white/15 sm:inline-flex"
              >
                <span className="grid size-8 place-items-center rounded-full bg-lime text-xs text-forest">
                  {initials(session.fullName)}
                </span>
                My account
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-full px-4 py-2.5 font-display text-[0.95rem] font-semibold text-mint transition hover:bg-white/10 sm:inline-flex"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="hidden items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-display text-[0.95rem] font-semibold text-forest transition hover:bg-lime-300 active:scale-[0.97] sm:inline-flex"
                >
                  Get involved
                  <ArrowRight className="size-4" strokeWidth={2.5} />
                </Link>
              </>
            )}
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="nav-drawer"
              className="grid size-11 place-items-center rounded-full border border-white/15 text-mint transition hover:bg-white/10 xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-forest-900 px-7 pb-8 pt-6 text-mint shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] xl:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-mint/45">
            Navigate
          </p>
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:bg-white/10"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-6 flex flex-col">
          {DRAWER_LINKS.map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              onClick={() => setOpen(false)}
              className={`group flex items-center justify-between border-b border-white/10 py-3 font-display text-[1.35rem] font-medium transition-colors hover:text-lime ${
                active === link.id ? 'text-lime' : ''
              }`}
            >
              {link.label}
              <ArrowRight className="size-5 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>
        <div className="mt-auto grid gap-2.5 pt-8">
          {session ? (
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-lg font-semibold text-forest"
            >
              My account
              <ArrowRight className="size-5" strokeWidth={2.5} />
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-lg font-semibold text-forest"
              >
                Create a Saver account
                <ArrowRight className="size-5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-display text-lg font-semibold text-mint ring-1 ring-white/20"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
