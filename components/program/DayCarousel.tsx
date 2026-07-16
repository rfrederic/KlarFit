"use client";

import { ProgramChecks } from "@/lib/program";
import { getTrackableSections, WeekSlot } from "@/lib/scheduleDay";
import DayThumb from "@/components/program/DayThumb";

function isDayComplete(slot: WeekSlot, checks: ProgramChecks): boolean {
  if (!slot.day) return false;
  const ids = getTrackableSections(slot.day).flatMap((section) => section.exercises.map((exercise) => exercise.id));
  const dayChecks = checks[slot.day.id] ?? {};
  return ids.length > 0 && ids.every((id) => dayChecks[id]);
}

export default function DayCarousel({
  slots,
  activeDayId,
  todayWeekday,
  checks,
  onSelect,
}: {
  slots: WeekSlot[];
  activeDayId: string;
  todayWeekday: string;
  checks: ProgramChecks;
  onSelect: (dayId: string) => void;
}) {
  return (
    <div className="chip-scroll -mx-4 flex gap-3 overflow-x-auto px-4 pb-1" role="tablist" aria-label="Day of week">
      {slots.map((slot) => {
        const isActive = slot.day?.id === activeDayId;
        const isToday = slot.weekday === todayWeekday;
        const complete = isDayComplete(slot, checks);
        const abbreviation = slot.weekday.slice(0, 3).toUpperCase();

        return (
          <button
            key={slot.weekday}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={!slot.day}
            onClick={() => slot.day && onSelect(slot.day.id)}
            className={`flex w-[4.5rem] shrink-0 flex-col items-center gap-1.5 rounded-xl p-1.5 transition-colors ${
              isToday ? "border-2 border-accent" : "border-2 border-transparent"
            } ${slot.day ? "hover:bg-surface" : "cursor-default opacity-60"}`}
          >
            <DayThumb dayId={slot.day?.id ?? slot.weekday} focus={slot.day?.focus ?? "Rest"} dimmed={!slot.day} />
            <span
              className={`font-display text-xs uppercase tracking-wide ${
                isActive ? "text-accent" : "text-foreground"
              }`}
            >
              {abbreviation}
            </span>
            {slot.day ? (
              <span
                aria-label={complete ? "Completed" : "Not completed"}
                className={`h-1.5 w-1.5 rounded-full ${complete ? "bg-accent shadow-glow" : "bg-border"}`}
              />
            ) : (
              <span className="text-center text-[8px] font-semibold uppercase leading-tight tracking-wide text-muted">
                Active Rest Day
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
