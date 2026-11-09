import { useSyncExternalStore } from 'react';

/*
  DEMO SESSION — design prototype only.
  There is no real authentication: logging in or signing up stores a sample
  account in localStorage so every page in the flow can be previewed.
*/

export interface Account {
  saverId: number;
  fullName: string;
  firstName: string;
  phone: string;
  email: string;
  area: string;
  role: string;
  joinedAt: string;
  showOnWall: boolean;
  notifyWhatsApp: boolean;
  notifyReceipts: boolean;
  notifyEmail: boolean;
  /** Sample account with pre-filled drop-off history. */
  demo: boolean;
}

export const DEMO_ACCOUNT: Account = {
  saverId: 12,
  fullName: 'Tolu Adeyemi',
  firstName: 'Tolu',
  phone: '0803 123 4567',
  email: 'tolu.adeyemi@example.com',
  area: 'Near the University Main Gate',
  role: 'Student',
  joinedAt: '2026-08-20T10:00:00.000Z',
  showOnWall: true,
  notifyWhatsApp: true,
  notifyReceipts: true,
  notifyEmail: false,
  demo: true,
};

const KEY = 'sas_session';
const listeners = new Set<() => void>();
let cache: Account | null | undefined;

function read(): Account | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Account) : null;
  } catch {
    return null;
  }
}

function write(account: Account | null) {
  try {
    if (account) localStorage.setItem(KEY, JSON.stringify(account));
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable — keep in memory */
  }
  cache = account;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = read();
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot() {
  if (cache === undefined) cache = read();
  return cache;
}

export function useSession() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

/** The signed-in account, or the sample account when previewing pages directly. */
export function useAccount() {
  return useSession() ?? DEMO_ACCOUNT;
}

export function signIn(account: Account) {
  write(account);
}

export function signOut() {
  write(null);
}

export function updateAccount(patch: Partial<Account>) {
  const current = getSnapshot() ?? DEMO_ACCOUNT;
  const next = { ...current, ...patch };
  next.firstName = next.fullName.trim().split(/\s+/)[0] || next.firstName;
  write(next);
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (
    (parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')
  ).toUpperCase();
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) return phone;
  return `${digits.slice(0, 4)} ••• ${digits.slice(-4)}`;
}
