"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getExerciseBySlug } from "@/data/exercises";
import { loadQuizAnswers } from "@/lib/storage";
import { loadChecks, loadProgram, ProgramChecks, saveChecks, saveProgram } from "@/lib/program";
import { GOAL_TO_TRAINING_GOAL, getRecommendation } from "@/lib/repsRecommendations";
import { getCurrentRotationVariant } from "@/lib/exerciseAlternates";
import { resolveProgramExercise } from "@/lib/exerciseRotation";
import { getTrackableSections } from "@/lib/scheduleDay";
import { getLoggedSets, getTodayDateKey, logSet } from "@/lib/workoutHistory";
import { ProgramDay, ProgramExercise, QuizAnswers, UserProgram } from "@/lib/types";
import WorkoutExerciseScreen from "@/components/workout/WorkoutExerciseScreen";
import WorkoutCompletionScreen from "@/components/workout/WorkoutCompletionScreen";
import FullscreenVideoPlayer from "@/components/ui/FullscreenVideoPlayer";
import SwapAlternateModal from "@/components/program/SwapAlternateModal";

interface FlatEntry {
  sectionId: string;
  exercise: ProgramExercise;
}

/** Stable per-exercise identity for logging history: the library slug when
 * there is one, otherwise the program exercise's own id (custom entries have
 * no slug, but still need a consistent key to log sets against). */
function logKeyFor(exercise: ProgramExercise): string {
  return exercise.exerciseSlug ?? `custom:${exercise.id}`;
}

export default function WorkoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dayId = searchParams.get("day");
  const startExerciseId = searchParams.get("exercise");

  const [program, setProgram] = useState<UserProgram | null>(null);
  const [checks, setChecks] = useState<ProgramChecks>({});
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [swapOpen, setSwapOpen] = useState(false);
  const [historyVersion, setHistoryVersion] = useState(0); // bump to re-read localStorage history
  const startIndexAppliedRef = useRef(false);

  useEffect(() => {
    setProgram(loadProgram());
    setChecks(loadChecks());
    setQuizAnswers(loadQuizAnswers());
  }, []);

  const day: ProgramDay | null = useMemo(
    () => program?.days.find((d) => d.id === dayId) ?? null,
    [program, dayId]
  );

  const flat: FlatEntry[] = useMemo(() => {
    if (!day) return [];
    return getTrackableSections(day).flatMap((section) =>
      section.exercises.map((exercise) => ({ sectionId: section.id, exercise }))
    );
  }, [day]);

  useEffect(() => {
    if (startIndexAppliedRef.current || !startExerciseId || flat.length === 0) return;
    const idx = flat.findIndex((entry) => entry.exercise.id === startExerciseId);
    if (idx >= 0) setCurrentIndex(idx);
    startIndexAppliedRef.current = true;
  }, [startExerciseId, flat]);

  const variant = getCurrentRotationVariant();
  const rotationOptions = useMemo(
    () => ({
      availableEquipment: quizAnswers?.equipment,
      goal: quizAnswers ? GOAL_TO_TRAINING_GOAL[quizAnswers.goal] : undefined,
      experience: quizAnswers?.experience,
    }),
    [quizAnswers]
  );

  const current = flat[currentIndex];
  const resolved = current ? resolveProgramExercise(current.exercise, variant, rotationOptions) : null;
  const libraryExercise = resolved?.exerciseSlug ? getExerciseBySlug(resolved.exerciseSlug) : undefined;
  const restSeconds = libraryExercise
    ? getRecommendation(libraryExercise, rotationOptions.goal ?? "muscleGrowth", rotationOptions.experience).restSeconds
    : 60;

  const todayKey = getTodayDateKey();
  const logKey = current ? logKeyFor(current.exercise) : "";
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally re-reads localStorage when historyVersion bumps
  const loggedSets = useMemo(() => (logKey ? getLoggedSets(todayKey, logKey) : []), [logKey, todayKey, historyVersion]);

  const next = flat[currentIndex + 1];
  const nextResolved = next ? resolveProgramExercise(next.exercise, variant, rotationOptions) : null;
  const nextLibraryExercise = nextResolved?.exerciseSlug ? getExerciseBySlug(nextResolved.exerciseSlug) : undefined;

  if (!program || !dayId) return null;

  if (!day || flat.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-muted">Nothing to work out here — head back to My Program.</p>
        <Link href="/my-program" className="font-semibold text-accent hover:underline">
          &larr; Back to My Program
        </Link>
      </div>
    );
  }

  const handleLogSet = (weight: string, reps: string) => {
    if (!current) return;
    const updated = logSet(todayKey, logKey, { weight, reps });
    setHistoryVersion((v) => v + 1);

    const plannedSets = current.exercise.sets ?? 3;
    if (updated.length >= plannedSets) {
      const dayChecks = checks[dayId] ?? {};
      const nextChecks = { ...checks, [dayId]: { ...dayChecks, [current.exercise.id]: true } };
      setChecks(nextChecks);
      saveChecks(nextChecks);
    }
  };

  const totalSetsLoggedToday = flat.reduce((sum, entry) => sum + getLoggedSets(todayKey, logKeyFor(entry.exercise)).length, 0);

  const handleAdvance = () => {
    if (currentIndex + 1 < flat.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handleSetOverride = (slug: string | undefined) => {
    if (!program || !current) return;
    const nextProgram: UserProgram = {
      days: program.days.map((d) =>
        d.id !== dayId
          ? d
          : {
              ...d,
              sections: d.sections.map((section) =>
                section.id !== current.sectionId
                  ? section
                  : {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
                        exercise.id === current.exercise.id ? { ...exercise, weekBOverrideSlug: slug } : exercise
                      ),
                    }
              ),
            }
      ),
    };
    setProgram(nextProgram);
    saveProgram(nextProgram);
  };

  if (finished) {
    return (
      <WorkoutCompletionScreen
        exerciseCount={flat.length}
        totalSets={totalSetsLoggedToday}
        onDone={() => router.push("/my-program")}
      />
    );
  }

  if (!current || !resolved) return null;

  return (
    <>
      <WorkoutExerciseScreen
        resolved={resolved}
        libraryExercise={libraryExercise}
        restSeconds={restSeconds}
        loggedSets={loggedSets}
        isLastExercise={currentIndex === flat.length - 1}
        nextLabel={next ? nextResolved?.label ?? null : null}
        nextLibraryExercise={nextLibraryExercise}
        onLogSet={handleLogSet}
        onBack={() => router.push("/my-program")}
        onAdvance={handleAdvance}
        onOpenAlternate={() => setSwapOpen(true)}
        onPlayVideo={() => libraryExercise?.video && setVideoUrl(libraryExercise.video)}
      />

      {videoUrl && <FullscreenVideoPlayer src={videoUrl} onClose={() => setVideoUrl(null)} />}

      {swapOpen && libraryExercise && (
        <SwapAlternateModal
          original={libraryExercise}
          currentOverrideSlug={current.exercise.weekBOverrideSlug}
          availableEquipment={rotationOptions.availableEquipment}
          onPick={handleSetOverride}
          onClose={() => setSwapOpen(false)}
        />
      )}
    </>
  );
}
