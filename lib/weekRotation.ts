import { exercises, getExerciseBySlug } from "@/data/exercises";
import { Equipment, ExperienceLevel, ProgramExercise } from "@/lib/types";
import { getBestAlternate, ProgramWeek } from "@/lib/exerciseAlternates";
import { classifyExerciseType, getRecommendation, TrainingGoal } from "@/lib/repsRecommendations";

/** What a program row should actually display for the currently-viewed week. */
export interface ResolvedExercise {
  /** Always the underlying ProgramExercise id — check-off state (and edits)
   * key off this, not the displayed slug, so checkbox mode keeps working
   * whichever week's substitute happens to be on screen. */
  id: string;
  label: string;
  exerciseSlug?: string;
  sets: number | null;
  reps: string;
  /** True when this row is showing a Week B substitute rather than the Week A original. */
  isRotated: boolean;
}

function unrotated(programExercise: ProgramExercise): ResolvedExercise {
  return {
    id: programExercise.id,
    label: programExercise.label,
    exerciseSlug: programExercise.exerciseSlug,
    sets: programExercise.sets,
    reps: programExercise.reps,
    isRotated: false,
  };
}

/** Carries sets/reps over to the alternate, re-deriving reps as a duration
 * (or vice versa) when the two exercises aren't the same rep-based/time-based type. */
function carryOverReps(
  originalReps: string,
  originalExerciseSlug: string,
  alternateExerciseSlug: string,
  goal: TrainingGoal,
  experience?: ExperienceLevel
): string {
  const original = getExerciseBySlug(originalExerciseSlug);
  const alternate = getExerciseBySlug(alternateExerciseSlug);
  if (!original || !alternate) return originalReps;

  const wasTimeBased = classifyExerciseType(original) === "timeBased";
  const isTimeBased = classifyExerciseType(alternate) === "timeBased";
  if (wasTimeBased === isTimeBased) return originalReps;
  return getRecommendation(alternate, goal, experience).reps;
}

/**
 * Resolves what a program row should show for `week`. Week A always shows
 * the user's base exercise untouched. Week B swaps in the best alternate
 * (or the user's manual override) unless the exercise is locked, has no
 * library link, or has no qualifying alternate — in which case it just stays
 * the same, per the "no good alternate" fallback rule.
 */
export function resolveProgramExercise(
  programExercise: ProgramExercise,
  week: ProgramWeek,
  options: { availableEquipment?: Equipment[]; goal?: TrainingGoal; experience?: ExperienceLevel } = {}
): ResolvedExercise {
  if (week === "A") return unrotated(programExercise);
  if (programExercise.locked || !programExercise.exerciseSlug) return unrotated(programExercise);

  const original = getExerciseBySlug(programExercise.exerciseSlug);
  if (!original) return unrotated(programExercise);

  const manualOverride = programExercise.weekBOverrideSlug
    ? getExerciseBySlug(programExercise.weekBOverrideSlug)
    : undefined;
  const alternate = manualOverride ?? getBestAlternate(original, exercises, options.availableEquipment);
  if (!alternate) return unrotated(programExercise);

  return {
    id: programExercise.id,
    label: alternate.name,
    exerciseSlug: alternate.slug,
    sets: programExercise.sets,
    reps: carryOverReps(programExercise.reps, original.slug, alternate.slug, options.goal ?? "muscleGrowth", options.experience),
    isRotated: true,
  };
}
