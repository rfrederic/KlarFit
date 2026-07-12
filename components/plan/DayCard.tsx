import Link from "next/link";
import { Equipment, ExperienceLevel, PlanDay } from "@/lib/types";
import { RotationVariant } from "@/lib/exerciseAlternates";
import { resolvePlanExercise } from "@/lib/exerciseRotation";
import { TrainingGoal } from "@/lib/repsRecommendations";
import Badge from "@/components/ui/Badge";

export default function DayCard({
  day,
  variant,
  goal,
  experience,
  availableEquipment,
}: {
  day: PlanDay;
  variant: RotationVariant;
  goal: TrainingGoal;
  experience?: ExperienceLevel;
  availableEquipment?: Equipment[];
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">{day.day}</p>
      <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-foreground">
        {day.focus}
      </h3>

      <ul className="mt-4 flex flex-col gap-3">
        {day.exercises.map((planExercise, i) => {
          const resolved = resolvePlanExercise(planExercise, variant, goal, experience, availableEquipment);
          if (!resolved) return null;
          return (
            <li
              key={`${planExercise.exerciseId}-${i}`}
              className="flex flex-col gap-1 rounded-md border border-border bg-background/40 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/exercises/${resolved.slug}`}
                  className="font-semibold text-foreground hover:text-accent hover:underline"
                >
                  {resolved.name}
                </Link>
                {resolved.isRotated && (
                  <Badge active className="no-print">
                    Rotated
                  </Badge>
                )}
              </span>
              <span className="text-sm text-muted">
                {resolved.sets} sets &times; {resolved.reps} {resolved.isTimeBased ? "hold" : "reps"} &middot;{" "}
                {resolved.restSeconds}s rest
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
