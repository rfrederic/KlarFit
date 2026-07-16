"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Exercise } from "@/lib/types";
import { ResolvedExercise } from "@/lib/exerciseRotation";
import { LoggedSet } from "@/lib/workoutHistory";
import SetLoggerCard from "@/components/workout/SetLoggerCard";
import RestTimer from "@/components/workout/RestTimer";
import ExerciseMedia from "@/components/workout/ExerciseMedia";
import NextExercisePreview from "@/components/workout/NextExercisePreview";

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v5.5M12 8v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

export default function WorkoutExerciseScreen({
  resolved,
  libraryExercise,
  restSeconds,
  loggedSets,
  isLastExercise,
  nextLabel,
  nextLibraryExercise,
  onLogSet,
  onBack,
  onAdvance,
  onOpenAlternate,
  onPlayVideo,
}: {
  resolved: ResolvedExercise;
  libraryExercise?: Exercise;
  restSeconds: number;
  loggedSets: LoggedSet[];
  isLastExercise: boolean;
  nextLabel: string | null;
  nextLibraryExercise?: Exercise;
  onLogSet: (weight: string, reps: string) => void;
  onBack: () => void;
  onAdvance: () => void;
  onOpenAlternate: () => void;
  onPlayVideo: () => void;
}) {
  const plannedSets = resolved.sets ?? 3;
  const allSetsDone = loggedSets.length >= plannedSets;
  const [restActive, setRestActive] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleLogSet = (weight: string, reps: string) => {
    onLogSet(weight, reps);
    if (loggedSets.length + 1 < plannedSets) setRestActive(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (dx < -60) onAdvance();
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col gap-5" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to My Program"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted hover:text-accent"
        >
          <ChevronLeftIcon />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xl uppercase tracking-wide text-foreground">{resolved.label}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {plannedSets} SETS &middot; {resolved.reps} &middot; {restSeconds}s rest
          </p>
        </div>
        {resolved.exerciseSlug && (
          <Link
            href={`/exercises/${resolved.exerciseSlug}`}
            aria-label="Exercise info"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted hover:text-accent"
          >
            <InfoIcon />
          </Link>
        )}
      </div>

      {resolved.exerciseSlug && (
        <button
          type="button"
          onClick={onOpenAlternate}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
        >
          <SwapIcon />
          Find Alternative
        </button>
      )}

      <ExerciseMedia exercise={libraryExercise} onPlayVideo={onPlayVideo} />

      <SetLoggerCard plannedReps={resolved.reps} loggedSets={loggedSets} totalSets={plannedSets} onLogSet={handleLogSet} />

      {restActive && !allSetsDone && (
        <RestTimer key={loggedSets.length} seconds={restSeconds} onComplete={() => setRestActive(false)} />
      )}

      {nextLabel && !isLastExercise && (
        <NextExercisePreview label={nextLabel} exercise={nextLibraryExercise} onAdvance={onAdvance} />
      )}

      {isLastExercise && (
        <button
          type="button"
          onClick={onAdvance}
          className="w-full rounded-md bg-accent py-3 text-center font-display text-base uppercase tracking-wide text-accent-foreground shadow-glow"
        >
          Finish Workout
        </button>
      )}
    </div>
  );
}
