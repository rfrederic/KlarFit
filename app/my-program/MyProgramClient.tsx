"use client";

import { useEffect, useState } from "react";
import { ProgramDay, ProgramExercise, ProgramSection, QuizAnswers, UserProgram } from "@/lib/types";
import { loadChecks, loadProgram, makeId, ProgramChecks, resetProgram, saveChecks, saveProgram } from "@/lib/program";
import { loadQuizAnswers } from "@/lib/storage";
import { getExerciseBySlug } from "@/data/exercises";
import { GOAL_TO_TRAINING_GOAL, getRecommendation } from "@/lib/repsRecommendations";
import { getCurrentProgramWeek, ProgramWeek } from "@/lib/exerciseAlternates";
import { Button } from "@/components/ui/Button";
import DayTabs from "@/components/program/DayTabs";
import ProgramDayView from "@/components/program/ProgramDayView";
import ExercisePickerModal from "@/components/program/ExercisePickerModal";
import SwapAlternateModal from "@/components/program/SwapAlternateModal";
import WeekToggle from "@/components/program/WeekToggle";
import UndoToast from "@/components/program/UndoToast";

function updateDay(program: UserProgram, dayId: string, updater: (day: ProgramDay) => ProgramDay): UserProgram {
  return { days: program.days.map((day) => (day.id === dayId ? updater(day) : day)) };
}

function updateSection(day: ProgramDay, sectionId: string, updater: (section: ProgramSection) => ProgramSection): ProgramDay {
  return { ...day, sections: day.sections.map((section) => (section.id === sectionId ? updater(section) : section)) };
}

interface PendingRemoval {
  dayId: string;
  sectionId: string;
  exercise: ProgramExercise;
  index: number;
}

interface SwapTarget {
  sectionId: string;
  exerciseId: string;
}

export default function MyProgramClient() {
  const [program, setProgram] = useState<UserProgram | null>(null);
  const [checks, setChecks] = useState<ProgramChecks>({});
  const [activeDayId, setActiveDayId] = useState<string>("");
  const [workoutMode, setWorkoutMode] = useState(false);
  const [pickerSectionId, setPickerSectionId] = useState<string | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [previewWeek, setPreviewWeek] = useState<ProgramWeek | null>(null);
  const [swapTarget, setSwapTarget] = useState<SwapTarget | null>(null);

  useEffect(() => {
    const loadedProgram = loadProgram();
    setProgram(loadedProgram);
    setChecks(loadChecks());
    setActiveDayId(loadedProgram.days[0]?.id ?? "");
    setQuizAnswers(loadQuizAnswers());
  }, []);

  useEffect(() => {
    if (!pendingRemoval) return;
    const timeout = window.setTimeout(() => setPendingRemoval(null), 6000);
    return () => window.clearTimeout(timeout);
  }, [pendingRemoval]);

  if (!program || !activeDayId) return null;

  const activeDay = program.days.find((day) => day.id === activeDayId) ?? program.days[0];

  const persist = (next: UserProgram) => {
    setProgram(next);
    saveProgram(next);
  };

  const persistChecks = (next: ProgramChecks) => {
    setChecks(next);
    saveChecks(next);
  };

  const handleToggleCheck = (sectionId: string, exerciseId: string) => {
    const dayChecks = checks[activeDay.id] ?? {};
    persistChecks({
      ...checks,
      [activeDay.id]: { ...dayChecks, [exerciseId]: !dayChecks[exerciseId] },
    });
  };

  const handleClearToday = () => {
    persistChecks({ ...checks, [activeDay.id]: {} });
  };

  const handleUpdateExercise = (sectionId: string, exerciseId: string, updates: Partial<ProgramExercise>) => {
    persist(
      updateDay(program, activeDay.id, (day) =>
        updateSection(day, sectionId, (section) => ({
          ...section,
          exercises: section.exercises.map((exercise) =>
            exercise.id === exerciseId ? { ...exercise, ...updates } : exercise
          ),
        }))
      )
    );
  };

  const handleRemoveExercise = (sectionId: string, exerciseId: string) => {
    const section = activeDay.sections.find((s) => s.id === sectionId);
    const index = section?.exercises.findIndex((e) => e.id === exerciseId) ?? -1;
    const exercise = section?.exercises[index];
    if (!section || !exercise || index === -1) return;

    persist(
      updateDay(program, activeDay.id, (day) =>
        updateSection(day, sectionId, (s) => ({
          ...s,
          exercises: s.exercises.filter((e) => e.id !== exerciseId),
        }))
      )
    );
    setPendingRemoval({ dayId: activeDay.id, sectionId, exercise, index });
  };

  const handleUndoRemove = () => {
    if (!pendingRemoval) return;
    const { dayId, sectionId, exercise, index } = pendingRemoval;
    persist(
      updateDay(program, dayId, (day) =>
        updateSection(day, sectionId, (section) => {
          const exercises = [...section.exercises];
          exercises.splice(Math.min(index, exercises.length), 0, exercise);
          return { ...section, exercises };
        })
      )
    );
    setPendingRemoval(null);
  };

  const handleMoveExercise = (sectionId: string, exerciseId: string, direction: "up" | "down") => {
    persist(
      updateDay(program, activeDay.id, (day) =>
        updateSection(day, sectionId, (section) => {
          const index = section.exercises.findIndex((e) => e.id === exerciseId);
          const targetIndex = direction === "up" ? index - 1 : index + 1;
          if (index === -1 || targetIndex < 0 || targetIndex >= section.exercises.length) return section;
          const exercises = [...section.exercises];
          [exercises[index], exercises[targetIndex]] = [exercises[targetIndex], exercises[index]];
          return { ...section, exercises };
        })
      )
    );
  };

  const handleAddExercise = (entry: { exerciseSlug?: string; label: string }) => {
    if (!pickerSectionId) return;

    // Pre-fill sets/reps from the rep-recommendation rules for the user's own
    // goal (from their saved quiz answers) instead of a generic default.
    let sets = 3;
    let reps = "10";
    const libraryExercise = entry.exerciseSlug ? getExerciseBySlug(entry.exerciseSlug) : undefined;
    if (libraryExercise) {
      const answers = loadQuizAnswers();
      const goal = answers ? GOAL_TO_TRAINING_GOAL[answers.goal] : "muscleGrowth";
      const recommendation = getRecommendation(libraryExercise, goal, answers?.experience);
      sets = recommendation.sets;
      reps = recommendation.reps;
    }

    const newExercise: ProgramExercise = {
      id: makeId(),
      exerciseSlug: entry.exerciseSlug,
      label: entry.label,
      sets,
      reps,
    };
    persist(
      updateDay(program, activeDay.id, (day) =>
        updateSection(day, pickerSectionId, (section) => ({
          ...section,
          exercises: [...section.exercises, newExercise],
        }))
      )
    );
    setPickerSectionId(null);
  };

  const handleRemoveSection = (sectionId: string) => {
    const section = activeDay.sections.find((s) => s.id === sectionId);
    if (!section) return;
    if (!window.confirm(`Remove the "${section.title}" section and all its exercises?`)) return;
    persist(
      updateDay(program, activeDay.id, (day) => ({
        ...day,
        sections: day.sections.filter((s) => s.id !== sectionId),
      }))
    );
  };

  const handleAddSection = (title: string) => {
    const newSection: ProgramSection = { id: makeId(), title, exercises: [] };
    persist(updateDay(program, activeDay.id, (day) => ({ ...day, sections: [...day.sections, newSection] })));
  };

  const handleReset = () => {
    if (!window.confirm("Reset My Program to the default program? Your edits will be lost.")) return;
    const defaults = resetProgram();
    persist(defaults);
    persistChecks({});
    setActiveDayId(defaults.days[0]?.id ?? "");
  };

  const handleToggleLock = (sectionId: string, exerciseId: string) => {
    const section = activeDay.sections.find((s) => s.id === sectionId);
    const exercise = section?.exercises.find((e) => e.id === exerciseId);
    if (!exercise) return;
    handleUpdateExercise(sectionId, exerciseId, { locked: !exercise.locked });
  };

  const handleSetOverride = (slug: string | undefined) => {
    if (!swapTarget) return;
    handleUpdateExercise(swapTarget.sectionId, swapTarget.exerciseId, { weekBOverrideSlug: slug });
  };

  const activeDayChecks = checks[activeDay.id] ?? {};

  // Even ISO week = Week A, odd = Week B; `previewWeek` lets the user peek at
  // the other week without changing what's actually "current".
  const autoWeek = getCurrentProgramWeek();
  const activeWeek = previewWeek ?? autoWeek;
  const rotationOptions = {
    availableEquipment: quizAnswers?.equipment,
    goal: quizAnswers ? GOAL_TO_TRAINING_GOAL[quizAnswers.goal] : undefined,
    experience: quizAnswers?.experience,
  };

  const swapTargetSection = swapTarget ? activeDay.sections.find((s) => s.id === swapTarget.sectionId) : undefined;
  const swapTargetExercise = swapTargetSection?.exercises.find((e) => e.id === swapTarget?.exerciseId);
  const swapTargetLibraryExercise = swapTargetExercise?.exerciseSlug
    ? getExerciseBySlug(swapTargetExercise.exerciseSlug)
    : undefined;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
        <button
          type="button"
          role="switch"
          aria-checked={workoutMode}
          onClick={() => setWorkoutMode((v) => !v)}
          className="flex items-center gap-3"
        >
          <span
            className={`flex h-7 w-12 shrink-0 items-center rounded-full border border-border p-1 transition-colors ${
              workoutMode ? "bg-accent" : "bg-surface"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-background transition-transform ${
                workoutMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </span>
          <span className="font-display text-sm uppercase tracking-wide text-foreground">Checkbox Mode</span>
        </button>

        <div className="flex gap-2">
          {workoutMode && (
            <Button type="button" variant="ghost" onClick={handleClearToday}>
              Clear Today
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset to Default
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <DayTabs days={program.days} activeDayId={activeDay.id} onSelect={setActiveDayId} />
      </div>

      <div className="mt-5">
        <WeekToggle
          activeWeek={activeWeek}
          isPreview={previewWeek !== null}
          onTogglePreview={() => setPreviewWeek(previewWeek === null ? (autoWeek === "A" ? "B" : "A") : null)}
        />
      </div>

      <div className="mt-6">
        <ProgramDayView
          day={activeDay}
          workoutMode={workoutMode}
          checks={activeDayChecks}
          week={activeWeek}
          rotationOptions={rotationOptions}
          onToggleCheck={handleToggleCheck}
          onUpdateExercise={handleUpdateExercise}
          onRemoveExercise={handleRemoveExercise}
          onMoveExercise={handleMoveExercise}
          onAddExercise={setPickerSectionId}
          onRemoveSection={handleRemoveSection}
          onAddSection={handleAddSection}
          onToggleLock={handleToggleLock}
          onOpenSwap={(sectionId, exerciseId) => setSwapTarget({ sectionId, exerciseId })}
        />
      </div>

      {pickerSectionId && (
        <ExercisePickerModal onClose={() => setPickerSectionId(null)} onPick={handleAddExercise} />
      )}

      {swapTarget && swapTargetExercise && swapTargetLibraryExercise && (
        <SwapAlternateModal
          original={swapTargetLibraryExercise}
          currentOverrideSlug={swapTargetExercise.weekBOverrideSlug}
          availableEquipment={rotationOptions.availableEquipment}
          onPick={handleSetOverride}
          onClose={() => setSwapTarget(null)}
        />
      )}

      {pendingRemoval && (
        <UndoToast
          message={`Removed "${pendingRemoval.exercise.label}"`}
          onUndo={handleUndoRemove}
        />
      )}
    </div>
  );
}
