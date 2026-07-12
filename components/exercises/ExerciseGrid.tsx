import { Exercise } from "@/lib/types";
import ExerciseCard from "@/components/exercises/ExerciseCard";

export default function ExerciseGrid({ exercises }: { exercises: Exercise[] }) {
  if (exercises.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-surface p-8 text-center text-muted">
        No exercises match your filters. Try clearing a filter or search term.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
