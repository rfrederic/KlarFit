import { ProgramDay, ProgramSection } from "@/lib/types";

export const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function getTodayWeekdayName(date: Date = new Date()): string {
  return WEEKDAY_NAMES[date.getDay()];
}

/** One slot per real calendar weekday (always 7, Sun-Sat) — either the
 * matching `ProgramDay` if the user's program has a day with that name, or
 * `null` for a rest day. */
export interface WeekSlot {
  weekday: string;
  day: ProgramDay | null;
}

export function buildWeekSlots(days: ProgramDay[]): WeekSlot[] {
  return WEEKDAY_NAMES.map((weekday) => ({
    weekday,
    day: days.find((d) => d.day === weekday) ?? null,
  }));
}

/** A section counts as the day's "finisher" by title (e.g. "Finisher (5 min)"),
 * matched case-insensitively so it works regardless of the "(N min)" suffix. */
export function isFinisherSection(title: string): boolean {
  return /finisher/i.test(title);
}

/** Warm-ups are typically a single custom "5 min stretch"-style entry with no
 * real sets/reps to log — not part of the trackable workout-mode flow. */
export function isWarmupSection(title: string): boolean {
  return /warm[\s-]?up/i.test(title);
}

/** Sections that actually belong to the trackable workout flow — used both
 * for the Start Workout exercise list and for the carousel's completion dot,
 * so the two always agree on what "done" means. Warm-up and finisher
 * sections are shown elsewhere (or not tracked) and excluded from both. */
export function getTrackableSections(day: ProgramDay): ProgramSection[] {
  return day.sections.filter((section) => !isFinisherSection(section.title) && !isWarmupSection(section.title));
}
