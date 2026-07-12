"use client";

import { ProgramDay } from "@/lib/types";

export default function DayTabs({
  days,
  activeDayId,
  onSelect,
}: {
  days: ProgramDay[];
  activeDayId: string;
  onSelect: (dayId: string) => void;
}) {
  return (
    <div role="tablist" aria-label="Day of week" className="grid grid-cols-5 gap-1.5 sm:gap-2">
      {days.map((day) => {
        const isActive = day.id === activeDayId;
        return (
          <button
            key={day.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(day.id)}
            className={`rounded-md py-3 font-display text-sm uppercase tracking-wide transition-colors sm:text-base ${
              isActive
                ? "bg-accent text-accent-foreground shadow-glow"
                : "border border-border bg-surface text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {day.day.slice(0, 3)}
          </button>
        );
      })}
    </div>
  );
}
