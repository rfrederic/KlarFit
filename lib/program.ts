import { defaultProgram } from "@/data/defaultProgram";
import { UserProgram } from "@/lib/types";

const PROGRAM_KEY = "userProgram";
const CHECKS_KEY = "userProgram:checks";

/** Checked-off exercise ids, keyed by day id (e.g. checks["monday"] = { "monday-legs-1": true }). */
export type ProgramChecks = Record<string, Record<string, boolean>>;

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadProgram(): UserProgram {
  if (!isBrowser()) return defaultProgram;
  const raw = window.localStorage.getItem(PROGRAM_KEY);
  if (!raw) return defaultProgram;
  try {
    return JSON.parse(raw) as UserProgram;
  } catch {
    return defaultProgram;
  }
}

export function saveProgram(program: UserProgram) {
  if (!isBrowser()) return;
  window.localStorage.setItem(PROGRAM_KEY, JSON.stringify(program));
}

export function resetProgram(): UserProgram {
  if (isBrowser()) window.localStorage.removeItem(PROGRAM_KEY);
  return defaultProgram;
}

export function loadChecks(): ProgramChecks {
  if (!isBrowser()) return {};
  const raw = window.localStorage.getItem(CHECKS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as ProgramChecks;
  } catch {
    return {};
  }
}

export function saveChecks(checks: ProgramChecks) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CHECKS_KEY, JSON.stringify(checks));
}

export function makeId() {
  if (isBrowser() && "randomUUID" in window.crypto) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
