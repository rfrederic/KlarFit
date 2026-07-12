import Link from "next/link";
import { PlanDay } from "@/lib/types";
import { getExerciseById } from "@/data/exercises";

export default function DayCard({ day }: { day: PlanDay }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">{day.day}</p>
      <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-foreground">
        {day.focus}
      </h3>

      <ul className="mt-4 flex flex-col gap-3">
        {day.exercises.map((planExercise, i) => {
          const exercise = getExerciseById(planExercise.exerciseId);
          if (!exercise) return null;
          return (
            <li
              key={`${planExercise.exerciseId}-${i}`}
              className="flex flex-col gap-1 rounded-md border border-border bg-background/40 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link
                href={`/exercises/${exercise.slug}`}
                className="font-semibold text-foreground hover:text-accent hover:underline"
              >
                {exercise.name}
              </Link>
              <span className="text-sm text-muted">
                {planExercise.sets} sets &times; {planExercise.reps} reps &middot; {planExercise.restSeconds}s rest
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
