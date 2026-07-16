"use client";

import { useState } from "react";
import { LoggedSet } from "@/lib/workoutHistory";

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SetLoggerCard({
  plannedReps,
  loggedSets,
  totalSets,
  onLogSet,
}: {
  plannedReps: string;
  loggedSets: LoggedSet[];
  totalSets: number;
  onLogSet: (weight: string, reps: string) => void;
}) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState(plannedReps);
  const done = loggedSets.length >= totalSets;

  const handleLog = () => {
    if (done) return;
    onLogSet(weight.trim(), reps.trim() || plannedReps);
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-end gap-3">
        <label className="flex-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Weight</span>
          <input
            type="text"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="lbs / kg"
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2.5 text-foreground placeholder:text-muted/60 focus-visible:border-accent"
          />
        </label>
        <label className="flex-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Reps</span>
          <input
            type="text"
            inputMode="numeric"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLog();
            }}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2.5 text-foreground focus-visible:border-accent"
          />
        </label>
        <button
          type="button"
          onClick={handleLog}
          disabled={done}
          aria-label="Log set"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-500 text-black transition-transform active:scale-95 disabled:opacity-40"
        >
          <CheckIcon />
        </button>
      </div>

      <div className="mt-3 flex gap-1.5" aria-label={`${loggedSets.length} of ${totalSets} sets logged`}>
        {Array.from({ length: totalSets }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`h-2.5 flex-1 rounded-full ${i < loggedSets.length ? "bg-accent shadow-glow" : "bg-background"}`}
          />
        ))}
      </div>
    </div>
  );
}
