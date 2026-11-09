import { useSyncExternalStore } from "react"
import { SAVERS_COUNT } from "@/config"

/*
  SAVERS STORE
  Registrations are kept in this browser's localStorage, matching the original site.
  To share registrations across visitors, replace `read`/`write` with calls to a
  backend (e.g. POST /api/register-saver) and keep the same public API.
*/

export type Saver = {
  id: number
  firstName: string
  fullName: string
  phone: string
  area: string
  source: string
  registeredAt: string
  sachets?: number
}

export type Tier = {
  key: "pledger" | "collector" | "guardian"
  name: string
}

const KEY = "sas_savers"
const EMPTY: Saver[] = []
const listeners = new Set<() => void>()
let cache: Saver[] | null = null

function read(): Saver[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]")
    return Array.isArray(parsed) ? parsed : EMPTY
  } catch {
    return EMPTY
  }
}

function write(savers: Saver[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(savers))
  } catch {
    /* storage unavailable (private mode) — keep in memory only */
  }
  cache = savers
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = read()
      listener()
    }
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

function getSnapshot() {
  if (cache === null) cache = read()
  return cache
}

export function useSavers() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)
}

/** Total registered Savers, including those counted offline in config. */
export function useSaverTotal() {
  return SAVERS_COUNT + useSavers().length
}

export function getTier(sachets = 0): Tier {
  if (sachets >= 50) return { key: "guardian", name: "Guardian" }
  if (sachets >= 1) return { key: "collector", name: "Collector" }
  return { key: "pledger", name: "Pledger" }
}

export function formatSaverId(id: number) {
  return `#${String(id).padStart(4, "0")}`
}

/** Normalises Nigerian numbers so 0803…, +234803… and 234 803… match. */
export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "")
  return digits.startsWith("234") ? `0${digits.slice(3)}` : digits
}

export function isPhoneRegistered(phone: string) {
  return findSaverByPhone(phone) !== undefined
}

export function findSaverByPhone(phone: string) {
  const target = normalizePhone(phone)
  return getSnapshot().find((s) => normalizePhone(s.phone) === target)
}

export type RegisterInput = {
  name: string
  phone: string
  area: string
  source: string
}

export type RegisterResult = {
  ok: true
  saver: Saver
} | {
  ok: false
  reason: "duplicate"
}

export function registerSaver(input: RegisterInput): RegisterResult {
  const savers = getSnapshot()
  const phone = normalizePhone(input.phone)
  if (savers.some((s) => normalizePhone(s.phone) === phone)) {
    return { ok: false, reason: "duplicate" }
  }
  const fullName = input.name.trim().replace(/\s+/g, " ")
  const saver: Saver = {
    id: SAVERS_COUNT + savers.length + 1,
    firstName: fullName.split(" ")[0],
    fullName,
    phone: input.phone.trim(),
    area: input.area.trim(),
    source: input.source,
    registeredAt: new Date().toISOString(),
    sachets: 0,
  }
  write([...savers, saver])
  return { ok: true, saver }
}
