"use client";

import { Equipment, ExperienceLevel, ProgramExercise, ProgramSection } from "@/lib/types";
import { ProgramWeek } from "@/lib/exerciseAlternates";
import { resolveProgramExercise } from "@/lib/weekRotation";
import { TrainingGoal } from "@/lib/repsRecommendations";
import ExerciseRow from "@/components/program/ExerciseRow";

export interface RotationOptions {
  availableEquipment?: Equipment[];
  goal?: TrainingGoal;
  experience?: ExperienceLevel;
}

export default function ProgramSectionCard({
  section,
  workoutMode,
  checks,
  week,
  rotationOptions,
  onToggleCheck,
  onUpdateExercise,
  onRemoveExercise,
  onMoveExercise,
  onAddExercise,
  onRemoveSection,
  onToggleLock,
  onOpenSwap,
}: {
  section: ProgramSection;
  workoutMode: boolean;
  checks: Record<string, boolean>;
  week: ProgramWeek;
  rotationOptions: RotationOptions;
  onToggleCheck: (exerciseId: string) => void;
  onUpdateExercise: (exerciseId: string, updates: Partial<ProgramExercise>) => void;
  onRemoveExercise: (exerciseId: string) => void;
  onMoveExercise: (exerciseId: string, direction: "up" | "down") => void;
  onAddExercise: () => void;
  onRemoveSection: () => void;
  onToggleLock: (exerciseId: string) => void;
  onOpenSwap: (exerciseId: string) => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg uppercase tracking-wide text-accent">{section.title}</h3>
        <button
          type="button"
          onClick={onRemoveSection}
          className="rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted hover:text-red-400"
        >
          Remove section
        </button>
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {section.exercises.map((exercise, i) => (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            resolved={resolveProgramExercise(exercise, week, rotationOptions)}
            workoutMode={workoutMode}
            checked={Boolean(checks[exercise.id])}
            onToggleCheck={() => onToggleCheck(exercise.id)}
            onUpdate={(updates) => onUpdateExercise(exercise.id, updates)}
            onRemove={() => onRemoveExercise(exercise.id)}
            onMoveUp={() => onMoveExercise(exercise.id, "up")}
            onMoveDown={() => onMoveExercise(exercise.id, "down")}
            canMoveUp={i > 0}
            canMoveDown={i < section.exercises.length - 1}
            onToggleLock={() => onToggleLock(exercise.id)}
            onOpenSwap={() => onOpenSwap(exercise.id)}
          />
        ))}
        {section.exercises.length === 0 && (
          <li className="rounded-md border border-dashed border-border p-4 text-center text-sm text-muted">
            No exercises yet — add one below.
          </li>
        )}
      </ul>

      <button
        type="button"
        onClick={onAddExercise}
        className="mt-3 w-full rounded-md border border-dashed border-border py-3 text-sm font-semibold uppercase tracking-wide text-muted hover:border-accent hover:text-accent"
      >
        + Add Exercise
      </button>
    </div>
  );
}
