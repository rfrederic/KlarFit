"use client";

import { useState } from "react";
import Link from "next/link";
import { ProgramExercise } from "@/lib/types";
import { ResolvedExercise } from "@/lib/exerciseRotation";
import Badge from "@/components/ui/Badge";

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

export default function ExerciseRow({
  exercise,
  resolved,
  workoutMode,
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
}: {
  exercise: ProgramExercise;
  resolved: ResolvedExercise;
  workoutMode: boolean;
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

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-border bg-background/40 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        {workoutMode && (
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={onToggleCheck}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
              checked ? "border-accent bg-accent text-accent-foreground" : "border-border text-transparent"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            {resolved.exerciseSlug ? (
              <Link
                href={`/exercises/${resolved.exerciseSlug}`}
                className={`font-semibold text-foreground hover:text-accent hover:underline ${
                  checked ? "text-muted line-through" : ""
                }`}
              >
                {resolved.label}
              </Link>
            ) : (
              <span className={`font-semibold text-foreground ${checked ? "text-muted line-through" : ""}`}>
                {resolved.label}
              </span>
            )}
            {resolved.isRotated && <Badge active>Rotated</Badge>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1 sm:justify-end">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={setsDraft}
              onChange={(e) => setSetsDraft(e.target.value)}
              placeholder="Sets"
              aria-label="Sets"
              className="w-16 rounded-md border border-border bg-background px-2 py-2 text-center text-foreground focus-visible:border-accent"
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
              className="w-24 rounded-md border border-border bg-background px-2 py-2 text-center text-foreground focus-visible:border-accent"
            />
            <button
              type="button"
              onClick={commitEdit}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground"
              aria-label="Save"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={startEditing}
            className="min-w-[88px] rounded-md border border-border px-3 py-2 text-sm font-semibold text-muted hover:border-accent hover:text-accent"
          >
            {resolved.sets !== null ? `${resolved.sets} × ${resolved.reps}` : resolved.reps}
          </button>
        )}

        <div className="flex shrink-0 items-center gap-1">
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
      </div>
    </li>
  );
}
