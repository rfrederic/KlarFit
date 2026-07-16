"use client";

import { useState } from "react";
import { Exercise, ProgramExercise } from "@/lib/types";
import { ResolvedExercise } from "@/lib/exerciseRotation";
import Badge from "@/components/ui/Badge";
import ExerciseThumb from "@/components/exercises/ExerciseThumb";

function LockIcon({ locked }: { locked: boolean }) {
  return locked ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V7a4 4 0 0 1 7.5-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 8h13l-3-3M20 16H7l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-muted">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ExerciseRow({
  exercise,
  resolved,
  libraryExercise,
  restSeconds,
  workoutMode,
  editMode,
  checked,
  onToggleCheck,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  onToggleLock,
  onOpenSwap,
  onOpenWorkout,
}: {
  exercise: ProgramExercise;
  resolved: ResolvedExercise;
  libraryExercise?: Exercise;
  restSeconds?: number;
  workoutMode: boolean;
  editMode: boolean;
  checked: boolean;
  onToggleCheck: () => void;
  onUpdate: (updates: Partial<ProgramExercise>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onToggleLock: () => void;
  onOpenSwap: () => void;
  onOpenWorkout: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [setsDraft, setSetsDraft] = useState(exercise.sets === null ? "" : String(exercise.sets));
  const [repsDraft, setRepsDraft] = useState(exercise.reps);

  const canRotate = Boolean(exercise.exerciseSlug);

  const startEditing = () => {
    setSetsDraft(exercise.sets === null ? "" : String(exercise.sets));
    setRepsDraft(exercise.reps);
    setEditing(true);
  };

  const commitEdit = () => {
    const parsedSets = setsDraft.trim() === "" ? null : Math.max(0, parseInt(setsDraft, 10) || 0);
    onUpdate({ sets: parsedSets, reps: repsDraft.trim() || exercise.reps });
    setEditing(false);
  };

  const statsLine = [
    resolved.sets !== null ? `${resolved.sets} SETS` : null,
    `${resolved.reps} REPS`,
    restSeconds ? `${restSeconds} SEC REST` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="rounded-lg border border-border bg-background/40 transition-colors">
      <div
        role="button"
        tabIndex={0}
        onClick={() => !editing && onOpenWorkout()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !editing) onOpenWorkout();
        }}
        className="flex items-center gap-3 p-3 active:bg-surface"
      >
        {workoutMode && (
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={(e) => {
              e.stopPropagation();
              onToggleCheck();
            }}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
              checked ? "border-accent bg-accent text-accent-foreground" : "border-border text-transparent"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <ExerciseThumb exercise={libraryExercise} size={56} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={`truncate font-display text-base uppercase tracking-wide text-foreground ${
                checked ? "text-muted line-through" : ""
              }`}
            >
              {resolved.label}
            </p>
            {resolved.isRotated && <Badge active>Rotated</Badge>}
          </div>

          {editing ? (
            <div className="mt-1.5 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={setsDraft}
                onChange={(e) => setSetsDraft(e.target.value)}
                placeholder="Sets"
                aria-label="Sets"
                className="w-14 rounded-md border border-border bg-background px-2 py-1.5 text-center text-sm text-foreground focus-visible:border-accent"
              />
              <span className="text-muted">&times;</span>
              <input
                type="text"
                value={repsDraft}
                onChange={(e) => setRepsDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitEdit();
                }}
                placeholder="Reps"
                aria-label="Reps"
                className="w-20 rounded-md border border-border bg-background px-2 py-1.5 text-center text-sm text-foreground focus-visible:border-accent"
              />
              <button
                type="button"
                onClick={commitEdit}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground"
                aria-label="Save"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startEditing();
              }}
              className="mt-0.5 text-left text-xs font-semibold uppercase tracking-wide text-muted hover:text-accent"
            >
              {statsLine}
            </button>
          )}
        </div>

        {!editing && <ChevronIcon />}
      </div>

      {editMode && (
        <div
          className="flex items-center justify-end gap-1 border-t border-border px-3 py-2"
          onClick={(e) => e.stopPropagation()}
        >
          {canRotate && (
            <>
              <button
                type="button"
                onClick={onToggleLock}
                aria-pressed={Boolean(exercise.locked)}
                aria-label={exercise.locked ? "Unlock rotation" : "Lock — never rotate this exercise"}
                title={exercise.locked ? "Unlock rotation" : "Lock — never rotate this exercise"}
                className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                  exercise.locked ? "text-accent" : "text-muted hover:text-accent"
                }`}
              >
                <LockIcon locked={Boolean(exercise.locked)} />
              </button>
              <button
                type="button"
                onClick={onOpenSwap}
                aria-label="Choose a different Week B alternate"
                title="Choose a different Week B alternate"
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-accent"
              >
                <SwapIcon />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            aria-label="Move up"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-accent disabled:opacity-30 disabled:hover:text-muted"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            aria-label="Move down"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-accent disabled:opacity-30 disabled:hover:text-muted"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${exercise.label}`}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-red-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}
