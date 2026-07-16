import { Button } from "@/components/ui/Button";

function BigCheckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WorkoutCompletionScreen({
  exerciseCount,
  totalSets,
  onDone,
}: {
  exerciseCount: number;
  totalSets: number;
  onDone: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-glow">
        <BigCheckIcon />
      </div>
      <h2 className="font-display text-3xl uppercase tracking-wide text-foreground">Workout Complete</h2>
      <p className="text-muted">
        {exerciseCount} {exerciseCount === 1 ? "exercise" : "exercises"} &middot; {totalSets} sets logged
      </p>
      <Button type="button" onClick={onDone} className="mt-2">
        Back to My Program
      </Button>
    </div>
  );
}
