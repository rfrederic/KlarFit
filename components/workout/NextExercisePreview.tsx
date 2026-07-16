import { Exercise } from "@/lib/types";
import ExerciseThumb from "@/components/exercises/ExerciseThumb";

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-muted">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NextExercisePreview({
  label,
  exercise,
  onAdvance,
}: {
  label: string;
  exercise?: Exercise;
  onAdvance: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onAdvance}
      className="flex w-full items-center gap-3 rounded-lg border border-border bg-surface p-3 text-left transition-colors hover:border-accent"
    >
      <ExerciseThumb exercise={exercise} size={44} />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Up Next</p>
        <p className="truncate font-display text-base uppercase tracking-wide text-foreground">{label}</p>
      </div>
      <ChevronIcon />
    </button>
  );
}
