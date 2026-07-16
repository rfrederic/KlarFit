"use client";

import { RotationVariant } from "@/lib/exerciseAlternates";

export default function RotationToggle({
  activeVariant,
  isPreview,
  dayLabel = "Today's",
  onTogglePreview,
}: {
  activeVariant: RotationVariant;
  isPreview: boolean;
  dayLabel?: string;
  onTogglePreview: () => void;
}) {
  const otherVariant: RotationVariant = activeVariant === "A" ? "B" : "A";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4">
      <div>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
          {dayLabel} Rotation: {activeVariant}
          {isPreview && <span className="ml-2 text-muted">(Preview)</span>}
        </p>
        <p className="mt-1 text-sm text-muted">
          Exercises rotate every 24 hours to keep training fresh and work muscles from different angles.
        </p>
      </div>
      <button
        type="button"
        onClick={onTogglePreview}
        className="shrink-0 rounded-md border border-border px-4 py-2 text-sm font-semibold uppercase tracking-wide text-muted hover:border-accent hover:text-accent"
      >
        {isPreview ? "Back to Today" : `Preview Variant ${otherVariant}`}
      </button>
    </div>
  );
}
