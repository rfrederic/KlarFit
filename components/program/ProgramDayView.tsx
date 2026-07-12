"use client";

import { useState } from "react";
import { ProgramDay, ProgramExercise } from "@/lib/types";
import { ProgramWeek } from "@/lib/exerciseAlternates";
import ProgramSectionCard, { RotationOptions } from "@/components/program/ProgramSectionCard";
import { Button } from "@/components/ui/Button";

export default function ProgramDayView({
  day,
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
  onAddSection,
  onToggleLock,
  onOpenSwap,
}: {
  day: ProgramDay;
  workoutMode: boolean;
  checks: Record<string, boolean>;
  week: ProgramWeek;
  rotationOptions: RotationOptions;
  onToggleCheck: (sectionId: string, exerciseId: string) => void;
  onUpdateExercise: (sectionId: string, exerciseId: string, updates: Partial<ProgramExercise>) => void;
  onRemoveExercise: (sectionId: string, exerciseId: string) => void;
  onMoveExercise: (sectionId: string, exerciseId: string, direction: "up" | "down") => void;
  onAddExercise: (sectionId: string) => void;
  onRemoveSection: (sectionId: string) => void;
  onAddSection: (title: string) => void;
  onToggleLock: (sectionId: string, exerciseId: string) => void;
  onOpenSwap: (sectionId: string, exerciseId: string) => void;
}) {
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const submitNewSection = () => {
    const title = newSectionTitle.trim();
    if (!title) return;
    onAddSection(title);
    setNewSectionTitle("");
    setAddingSection(false);
  };

  return (
    <div>
      <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">{day.day}</p>
      <h2 className="mt-1 font-display text-2xl uppercase tracking-wide text-foreground sm:text-3xl">{day.focus}</h2>

      <div className="mt-5 flex flex-col gap-4">
        {day.sections.map((section) => (
          <ProgramSectionCard
            key={section.id}
            section={section}
            workoutMode={workoutMode}
            checks={checks}
            week={week}
            rotationOptions={rotationOptions}
            onToggleCheck={(exerciseId) => onToggleCheck(section.id, exerciseId)}
            onUpdateExercise={(exerciseId, updates) => onUpdateExercise(section.id, exerciseId, updates)}
            onRemoveExercise={(exerciseId) => onRemoveExercise(section.id, exerciseId)}
            onMoveExercise={(exerciseId, direction) => onMoveExercise(section.id, exerciseId, direction)}
            onAddExercise={() => onAddExercise(section.id)}
            onRemoveSection={() => onRemoveSection(section.id)}
            onToggleLock={(exerciseId) => onToggleLock(section.id, exerciseId)}
            onOpenSwap={(exerciseId) => onOpenSwap(section.id, exerciseId)}
          />
        ))}
      </div>

      <div className="mt-4">
        {addingSection ? (
          <div className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitNewSection();
                if (e.key === "Escape") setAddingSection(false);
              }}
              placeholder="e.g. Cardio"
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted/60 focus-visible:border-accent"
            />
            <Button type="button" onClick={submitNewSection} disabled={newSectionTitle.trim().length === 0}>
              Add
            </Button>
            <Button type="button" variant="ghost" onClick={() => setAddingSection(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAddingSection(true)}
            className="w-full rounded-md border border-dashed border-border py-3 text-sm font-semibold uppercase tracking-wide text-muted hover:border-accent hover:text-accent"
          >
            + Add Section
          </button>
        )}
      </div>
    </div>
  );
}
