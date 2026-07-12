import { Exercise, ExperienceLevel, Goal } from "@/lib/types";

/**
 * Rule-based sets/reps/rest recommendations. Pure lookup tables — no AI, no
 * network calls — so behavior is deterministic and easy to tune by hand.
 *
 * Every exercise is classified into one of three training styles, then that
 * style is combined with the lifter's goal to produce a recommendation:
 *   - "compound":  big multi-joint lifts (squats, deadlifts, presses, rows,
 *                  pull-ups) — lower rep end, longer rest.
 *   - "isolation": single-joint moves (curls, raises, extensions, calf and
 *                  forearm work) — higher rep end, shorter rest.
 *   - "timeBased": holds/carries (planks, wall sit, dead hang) — a duration
 *                  range instead of a rep range.
 */

export type TrainingGoal = "strength" | "muscleGrowth" | "endurance";

export const TRAINING_GOAL_LABELS: Record<TrainingGoal, string> = {
  strength: "Strength",
  muscleGrowth: "Muscle Growth",
  endurance: "Endurance / Toning",
};

/** Maps the three-option quiz goal onto the three training-goal columns shown
 * in the recommendation card, so a user's saved quiz answer can highlight one. */
export const GOAL_TO_TRAINING_GOAL: Record<Goal, TrainingGoal> = {
  generalFitness: "strength",
  buildMuscle: "muscleGrowth",
  loseFat: "endurance",
};

export type ExerciseType = "compound" | "isolation" | "timeBased";

export interface RepRecommendation {
  sets: number;
  /** Rep range (e.g. "8-10") or, for time-based exercises, a duration range (e.g. "20-30s"). */
  reps: string;
  restSeconds: number;
  /** Human-readable rest, e.g. "60-90 sec" or "2-3 min". */
  restLabel: string;
  isTimeBased: boolean;
}

// --- Exercise classification -------------------------------------------

/** Exercises whose name/instructions describe a held position or a loaded
 * carry rather than reps — shown with a duration instead of a rep range. */
const TIME_BASED_SLUGS = new Set([
  "plank",
  "weighted-plank",
  "side-plank",
  "wall-sit",
  "dead-hang",
  "farmers-carry",
  "hollow-body-hold",
  "isometric-neck-exercise-front",
  "isometric-neck-exercise-back",
  "isometric-neck-exercise-side",
]);

/** Exercises whose name contains a "compound" keyword (e.g. "press") but that
 * are actually single-joint isolation moves — hand-classified exceptions
 * where the naming heuristic below would otherwise misfire. */
const ISOLATION_NAME_OVERRIDES = new Set(["dumbbell-tate-press", "body-triceps-press"]);

/** Word-boundary keywords that mark a big, multi-joint "compound" lift. */
const COMPOUND_KEYWORDS = [
  "squat",
  "deadlift",
  "press",
  "row",
  "dip",
  "swing",
  "lunge",
  "pull-up",
  "pulldown",
  "chin-up",
  "step-up",
  "pull-through",
  "hyperextension",
  "thrust",
];
const COMPOUND_PATTERN = new RegExp(`\\b(${COMPOUND_KEYWORDS.join("|")})\\b`, "i");

export function classifyExerciseType(exercise: Exercise): ExerciseType {
  if (TIME_BASED_SLUGS.has(exercise.slug)) return "timeBased";
  if (ISOLATION_NAME_OVERRIDES.has(exercise.slug)) return "isolation";

  // Calf and forearm work is explicitly isolation-style even when a machine
  // name happens to contain a compound keyword (e.g. "45-Degree Leg Press
  // Calf Raise" is a calf isolation move, not a leg-press compound lift).
  if (exercise.subGroup?.some((sg) => sg === "calves" || sg === "forearms")) return "isolation";

  // Abs and neck work stays in the isolation/higher-rep bucket regardless of
  // naming (e.g. "Lying Leg Raise with Hip Thrust" is core work, not a hinge).
  if (exercise.muscleGroups[0] === "abs" || exercise.muscleGroups[0] === "neck") return "isolation";

  return COMPOUND_PATTERN.test(exercise.name) ? "compound" : "isolation";
}

// --- Rep/rest tables -----------------------------------------------------

interface Scheme {
  sets: number;
  reps: string;
  restSeconds: number;
  restLabel: string;
}

const REP_TABLE: Record<TrainingGoal, Record<"compound" | "isolation", Scheme>> = {
  strength: {
    compound: { sets: 5, reps: "3-5", restSeconds: 180, restLabel: "2-3 min" },
    isolation: { sets: 4, reps: "5-6", restSeconds: 120, restLabel: "~2 min" },
  },
  muscleGrowth: {
    compound: { sets: 4, reps: "8-10", restSeconds: 90, restLabel: "60-90 sec" },
    isolation: { sets: 3, reps: "10-12", restSeconds: 60, restLabel: "60-90 sec" },
  },
  endurance: {
    compound: { sets: 3, reps: "12-15", restSeconds: 60, restLabel: "30-60 sec" },
    isolation: { sets: 2, reps: "15-20", restSeconds: 30, restLabel: "30-60 sec" },
  },
};

/** Duration ranges for held/carried exercises, per goal. */
const TIME_BASED_TABLE: Record<TrainingGoal, Scheme> = {
  strength: { sets: 4, reps: "20-30s", restSeconds: 120, restLabel: "~2 min" },
  muscleGrowth: { sets: 3, reps: "30-45s", restSeconds: 75, restLabel: "60-90 sec" },
  endurance: { sets: 3, reps: "45-60s", restSeconds: 45, restLabel: "30-60 sec" },
};

/** One fewer set for beginners (floor of 2), matching the plan generator's rule. */
function setsForExperience(baseSets: number, experience?: ExperienceLevel) {
  if (experience === "beginner") return Math.max(2, baseSets - 1);
  return baseSets;
}

export function getRecommendation(
  exercise: Exercise,
  goal: TrainingGoal,
  experience?: ExperienceLevel
): RepRecommendation {
  const type = classifyExerciseType(exercise);

  if (type === "timeBased") {
    const scheme = TIME_BASED_TABLE[goal];
    return {
      sets: setsForExperience(scheme.sets, experience),
      reps: scheme.reps,
      restSeconds: scheme.restSeconds,
      restLabel: scheme.restLabel,
      isTimeBased: true,
    };
  }

  const scheme = REP_TABLE[goal][type];
  return {
    sets: setsForExperience(scheme.sets, experience),
    reps: scheme.reps,
    restSeconds: scheme.restSeconds,
    restLabel: scheme.restLabel,
    isTimeBased: false,
  };
}

const ALL_TRAINING_GOALS: TrainingGoal[] = ["strength", "muscleGrowth", "endurance"];

export function getRecommendationsForAllGoals(
  exercise: Exercise,
  experience?: ExperienceLevel
): Record<TrainingGoal, RepRecommendation> {
  return ALL_TRAINING_GOALS.reduce(
    (acc, goal) => {
      acc[goal] = getRecommendation(exercise, goal, experience);
      return acc;
    },
    {} as Record<TrainingGoal, RepRecommendation>
  );
}
