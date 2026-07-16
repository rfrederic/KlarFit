import { ProgramSection } from "@/lib/types";

/** Dashed lime "tip card" surfacing the day's finisher section instead of
 * listing it as just another checkable section — it's a suggestion, not a
 * tracked part of the main workout flow. */
export default function FinisherTipCard({ section }: { section: ProgramSection }) {
  if (section.exercises.length === 0) return null;

  return (
    <div className="rounded-lg border border-dashed border-accent/50 bg-accent/5 p-4">
      <p className="font-display text-xs uppercase tracking-[0.2em] text-accent">Finisher</p>
      <ul className="mt-2 flex flex-col gap-1">
        {section.exercises.map((exercise) => (
          <li key={exercise.id} className="text-sm text-foreground">
            <span className="font-semibold">{exercise.label}</span>
            <span className="text-muted"> — {exercise.reps}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
