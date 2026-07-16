const HISTORY_KEY = "klarfit:workout-history";

export interface LoggedSet {
  weight: string;
  reps: string;
}

/**
 * One exercise's logged sets for one calendar day. This is the raw data a
 * future stats/history page would read — kept intentionally flat (no nested
 * per-program-day structure) since a stats page cares about "what did I lift
 * on this exercise over time," not which program day it came from.
 */
export interface WorkoutLogEntry {
  date: string; // YYYY-MM-DD, local calendar day
  exerciseSlug: string;
  sets: LoggedSet[];
}

function isBrowser() {
  return typeof window !== "undefined";
}

/** Local (not UTC) calendar day, so "today" matches the rotation variant's
 * own day boundary rather than flipping at UTC midnight. */
export function getTodayDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function loadWorkoutHistory(): WorkoutLogEntry[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as WorkoutLogEntry[];
  } catch {
    return [];
  }
}

function saveWorkoutHistory(entries: WorkoutLogEntry[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
}

export function getLoggedSets(date: string, exerciseSlug: string): LoggedSet[] {
  const entry = loadWorkoutHistory().find((e) => e.date === date && e.exerciseSlug === exerciseSlug);
  return entry?.sets ?? [];
}

/** Appends one logged set to today's entry for this exercise, creating the
 * entry if it doesn't exist yet. Returns the updated set list. */
export function logSet(date: string, exerciseSlug: string, set: LoggedSet): LoggedSet[] {
  const entries = loadWorkoutHistory();
  const existing = entries.find((e) => e.date === date && e.exerciseSlug === exerciseSlug);
  if (existing) {
    existing.sets.push(set);
  } else {
    entries.push({ date, exerciseSlug, sets: [set] });
  }
  saveWorkoutHistory(entries);
  return existing?.sets ?? [set];
}

/** Removes the most recently logged set (undo), returning the updated list. */
export function undoLastSet(date: string, exerciseSlug: string): LoggedSet[] {
  const entries = loadWorkoutHistory();
  const existing = entries.find((e) => e.date === date && e.exerciseSlug === exerciseSlug);
  if (!existing || existing.sets.length === 0) return [];
  existing.sets.pop();
  saveWorkoutHistory(entries);
  return existing.sets;
}
