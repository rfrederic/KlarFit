"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgramDay, ProgramExercise, ProgramSection, QuizAnswers, UserProgram } from "@/lib/types";
import { loadChecks, loadProgram, makeId, ProgramChecks, resetProgram, saveChecks, saveProgram } from "@/lib/program";
import { loadQuizAnswers } from "@/lib/storage";
import { getExerciseBySlug } from "@/data/exercises";
import { GOAL_TO_TRAINING_GOAL, getRecommendation } from "@/lib/repsRecommendations";
import { getCurrentRotationVariant, RotationVariant } from "@/lib/exerciseAlternates";
import { buildWeekSlots, getTodayWeekdayName } from "@/lib/scheduleDay";
import { Button } from "@/components/ui/Button";
import DayCarousel from "@/components/program/DayCarousel";
import ProgramDayView from "@/components/program/ProgramDayView";
import ExercisePickerModal from "@/components/program/ExercisePickerModal";
import SwapAlternateModal from "@/components/program/SwapAlternateModal";
import RotationToggle from "@/components/ui/RotationToggle";
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
  const router = useRouter();
  const [program, setProgram] = useState<UserProgram | null>(null);
  const [checks, setChecks] = useState<ProgramChecks>({});
  const [activeDayId, setActiveDayId] = useState<string>("");
  const [workoutMode, setWorkoutMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [pickerSectionId, setPickerSectionId] = useState<string | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [previewVariant, setPreviewVariant] = useState<RotationVariant | null>(null);
  const [swapTarget, setSwapTarget] = useState<SwapTarget | null>(null);

  const todayWeekday = getTodayWeekdayName();

  useEffect(() => {
    const loadedProgram = loadProgram();
    setProgram(loadedProgram);
    setChecks(loadChecks());
    const todayDay = loadedProgram.days.find((day) => day.day === todayWeekday);
    setActiveDayId(todayDay?.id ?? loadedProgram.days[0]?.id ?? "");
    setQuizAnswers(loadQuizAnswers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pendingRemoval) return;
    const timeout = window.setTimeout(() => setPendingRemoval(null), 6000);
    return () => window.clearTimeout(timeout);
  }, [pendingRemoval]);

  if (!program || !activeDayId) return null;

  const activeDay = program.days.find((day) => day.id === activeDayId) ?? program.days[0];
  const weekSlots = buildWeekSlots(program.days);

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

  const handleOpenWorkout = (exerciseId?: string) => {
    const params = new URLSearchParams({ day: activeDay.id });
    if (exerciseId) params.set("exercise", exerciseId);
    router.push(`/my-program/workout?${params.toString()}`);
  };

  const activeDayChecks = checks[activeDay.id] ?? {};

  // Even local-day number = Variant A, odd = Variant B, flipping every 24
  // hours; `previewVariant` lets the user peek at the other one without
  // changing what's actually "today".
  const autoVariant = getCurrentRotationVariant();
  const activeVariant = previewVariant ?? autoVariant;
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

  // Completion percentage for the active day's checklist, based on the
  // exercises actually in the day right now (so it stays correct after
  // adding/removing exercises or resetting checks).
  const activeDayExerciseIds = activeDay.sections.flatMap((section) => section.exercises.map((exercise) => exercise.id));
  const completedCount = activeDayExerciseIds.filter((id) => activeDayChecks[id]).length;
  const completionPercent =
    activeDayExerciseIds.length === 0 ? 0 : Math.round((completedCount / activeDayExerciseIds.length) * 100);

  const isViewingToday = activeDay.day === todayWeekday;

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
            {isViewingToday ? "Today" : activeDay.focus || " "}
          </p>
          <h1 className="font-display text-4xl uppercase tracking-wide text-foreground sm:text-5xl">
            {isViewingToday ? todayWeekday : activeDay.day}
          </h1>
        </div>
        <div className="mt-1 flex shrink-0 gap-2">
          <button
            type="button"
            aria-pressed={editMode}
            onClick={() => setEditMode((v) => !v)}
            title="Edit program (add/remove/reorder/lock/swap exercises)"
            className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${
              editMode ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 20l4.5-1 10-10-3.5-3.5-10 10L4 20Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={workoutMode}
            aria-label="Checkbox Mode"
            title="Checkbox Mode (manually tick off sets)"
            onClick={() => setWorkoutMode((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${
              workoutMode ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {(workoutMode || editMode) && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {workoutMode && (
            <div className="flex items-center gap-2">
              <span className="font-display text-sm text-accent">{completionPercent}%</span>
              <span className="h-2 w-24 overflow-hidden rounded-full bg-background">
                <span
                  className="block h-full rounded-full bg-accent transition-all"
                  style={{ width: `${completionPercent}%` }}
                />
              </span>
              <span className="text-xs text-muted">
                {completedCount}/{activeDayExerciseIds.length}
              </span>
            </div>
          )}
          {workoutMode && (
            <Button type="button" variant="ghost" onClick={handleClearToday}>
              {isViewingToday ? "Clear Today" : `Clear ${activeDay.day}`}
            </Button>
          )}
          {editMode && (
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset to Default
            </Button>
          )}
        </div>
      )}

      <div className="mt-5">
        <DayCarousel
          slots={weekSlots}
          activeDayId={activeDay.id}
          todayWeekday={todayWeekday}
          checks={checks}
          onSelect={setActiveDayId}
        />
      </div>

      <div className="mt-5">
        <RotationToggle
          activeVariant={activeVariant}
          isPreview={previewVariant !== null}
          dayLabel={isViewingToday ? "Today's" : `${activeDay.day}'s`}
          onTogglePreview={() => setPreviewVariant(previewVariant === null ? (autoVariant === "A" ? "B" : "A") : null)}
        />
      </div>

      <div className="mt-6 pb-28 md:pb-6">
        <ProgramDayView
          day={activeDay}
          workoutMode={workoutMode}
          editMode={editMode}
          checks={activeDayChecks}
          variant={activeVariant}
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
          onOpenWorkout={(_sectionId, exerciseId) => handleOpenWorkout(exerciseId)}
        />
      </div>

      <div
        className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-background/95 p-4 backdrop-blur md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <Button type="button" className="w-full" onClick={() => handleOpenWorkout()}>
          Start Workout
        </Button>
      </div>
      <div className="mt-6 hidden md:block">
        <Button type="button" onClick={() => handleOpenWorkout()}>
          Start Workout
        </Button>
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
