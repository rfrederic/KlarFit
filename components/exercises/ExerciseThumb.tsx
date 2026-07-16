import { Exercise } from "@/lib/types";
import ExerciseImagePlaceholder from "@/components/exercises/ExerciseImage";

/**
 * Small square thumbnail used in list rows and the workout screen. Always a
 * static placeholder image, never a `<video>` element — so nothing in My
 * Program fetches or renders real footage until the user actually opens that
 * exercise's workout screen and taps play. Matches the placeholder-then-play
 * pattern already used by the workout mode media area.
 */
export default function ExerciseThumb({
  exercise,
  size = 56,
  className = "",
}: {
  exercise?: Exercise;
  size?: number;
  className?: string;
}) {
  if (!exercise) {
    return (
      <div
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-md border border-border bg-surface-raised ${className}`}
      />
    );
  }

  return (
    <div style={{ width: size, height: size }} className={`shrink-0 overflow-hidden rounded-md ${className}`}>
      <ExerciseImagePlaceholder image={exercise.imageStart} label="Start" />
    </div>
  );
}
