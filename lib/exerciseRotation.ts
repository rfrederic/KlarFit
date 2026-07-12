import { exercises, getExerciseBySlug } from "@/data/exercises";
import { Equipment, ExperienceLevel, Exercise, PlanExercise, ProgramExercise } from "@/lib/types";
import { getBestAlternate, RotationVariant } from "@/lib/exerciseAlternates";
import { classifyExerciseType, getRecommendation, TrainingGoal } from "@/lib/repsRecommendations";

/** Carries sets/reps over to the alternate, re-deriving reps as a duration
 * (or vice versa) when the two exercises aren't the same rep-based/time-based type. */
function carryOverReps(
  originalReps: string,
  original: Exercise,
  alternate: Exercise,
  goal: TrainingGoal,
  experience?: ExperienceLevel
): string {
  const wasTimeBased = classifyExerciseType(original) === "timeBased";
  const isTimeBased = classifyExerciseType(alternate) === "timeBased";
  if (wasTimeBased === isTimeBased) return originalReps;
  return getRecommendation(alternate, goal, experience).reps;
}

/** Picks which exercise a variant should show for a given base slug, honoring
 * a lock and/or a manual override. Returns `undefined` if the base slug
 * doesn't resolve to a real library exercise. */
function pickVariantExercise(
  baseSlug: string,
  variant: RotationVariant,
  options: { locked?: boolean; manualOverrideSlug?: string; availableEquipment?: Equipment[] } = {}
): { exercise: Exercise; isRotated: boolean } | undefined {
  const base = getExerciseBySlug(baseSlug);
  if (!base) return undefined;
  if (variant === "A" || options.locked) return { exercise: base, isRotated: false };

  const manual = options.manualOverrideSlug ? getExerciseBySlug(options.manualOverrideSlug) : undefined;
  const alternate = manual ?? getBestAlternate(base, exercises, options.availableEquipment);
  if (!alternate) return { exercise: base, isRotated: false };
  return { exercise: alternate, isRotated: true };
}

// --- My Program --------------------------------------------------------

/** What a program row should actually display for the currently-viewed rotation variant. */
export interface ResolvedExercise {
  /** Always the underlying ProgramExercise id — check-off state (and edits)
   * key off this, not the displayed slug, so checkbox mode keeps working
   * whichever variant's substitute happens to be on screen. */
  id: string;
  label: string;
  exerciseSlug?: string;
  sets: number | null;
  reps: string;
  /** True when this row is showing a rotated substitute rather than the base exercise. */
  isRotated: boolean;
}

function unrotatedProgramExercise(programExercise: ProgramExercise): ResolvedExercise {
  return {
    id: programExercise.id,
    label: programExercise.label,
    exerciseSlug: programExercise.exerciseSlug,
    sets: programExercise.sets,
    reps: programExercise.reps,
    isRotated: false,
  };
}

/**
 * Resolves what a program row should show for `variant`. Variant A always
 * shows the user's base exercise untouched. Variant B (which becomes active
 * every other calendar day — see `getCurrentRotationVariant`) swaps in the
 * best alternate (or the user's manual override) unless the exercise is
 * locked, has no library link, or has no qualifying alternate — in which
 * case it just stays the same, per the "no good alternate" fallback rule.
 */
export function resolveProgramExercise(
  programExercise: ProgramExercise,
  variant: RotationVariant,
  options: { availableEquipment?: Equipment[]; goal?: TrainingGoal; experience?: ExperienceLevel } = {}
): ResolvedExercise {
  if (!programExercise.exerciseSlug) return unrotatedProgramExercise(programExercise);

  const picked = pickVariantExercise(programExercise.exerciseSlug, variant, {
    locked: programExercise.locked,
    manualOverrideSlug: programExercise.weekBOverrideSlug,
    availableEquipment: options.availableEquipment,
  });
  if (!picked || !picked.isRotated) return unrotatedProgramExercise(programExercise);

  const base = getExerciseBySlug(programExercise.exerciseSlug)!;
  return {
    id: programExercise.id,
    label: picked.exercise.name,
    exerciseSlug: picked.exercise.slug,
    sets: programExercise.sets,
    reps: carryOverReps(programExercise.reps, base, picked.exercise, options.goal ?? "muscleGrowth", options.experience),
    isRotated: true,
  };
}

// --- My Plan -------------------------------------------------------------

export interface ResolvedPlanExercise {
  exerciseId: string;
  name: string;
  slug: string;
  sets: number;
  reps: string;
  restSeconds: number;
  isRotated: boolean;
  /** True when `reps` is a duration (e.g. "30-45s") rather than a rep count. */
  isTimeBased: boolean;
}

/**
 * Same rotation rules as `resolveProgramExercise`, applied to a generated
 * plan's exercises instead. The saved plan itself is never mutated — this
 * only changes what's rendered for the active variant, so retaking the quiz
 * (which regenerates and re-saves the plan) doesn't interact with rotation at
 * all. Plan exercises have no lock/manual-override concept, so Variant B
 * always shows the auto-picked best alternate.
 */
export function resolvePlanExercise(
  planExercise: PlanExercise,
  variant: RotationVariant,
  goal: TrainingGoal,
  experience?: ExperienceLevel,
  availableEquipment?: Equipment[]
): ResolvedPlanExercise | undefined {
  const base = getExerciseBySlug(planExercise.exerciseId);
  if (!base) return undefined;

  const picked = pickVariantExercise(planExercise.exerciseId, variant, { availableEquipment });
  const finalExercise = picked?.exercise ?? base;
  const isRotated = picked?.isRotated ?? false;

  return {
    exerciseId: planExercise.exerciseId,
    name: finalExercise.name,
    slug: finalExercise.slug,
    sets: planExercise.sets,
    reps: isRotated ? carryOverReps(planExercise.reps, base, finalExercise, goal, experience) : planExercise.reps,
    restSeconds: planExercise.restSeconds,
    isRotated,
    isTimeBased: classifyExerciseType(finalExercise) === "timeBased",
  };
}
