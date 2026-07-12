import { exercises as exerciseLibrary } from "@/data/exercises";
import {
  Difficulty,
  Equipment,
  ExperienceLevel,
  Exercise,
  Goal,
  MuscleGroup,
  PlanDay,
  PlanExercise,
  QuizAnswers,
  WorkoutPlan,
} from "@/lib/types";

/**
 * Rule-based plan generator. No AI/network calls — every decision below is a
 * plain lookup table so it can be tuned by hand. Tweak the tables, not the
 * control flow, when adjusting how plans are built.
 */

// --- 1. Weekly split templates, keyed by days per week -------------------

interface DayTemplate {
  focus: string;
  muscleGroups: MuscleGroup[];
}

const FULL_BODY: DayTemplate = {
  focus: "Full Body",
  muscleGroups: ["chest", "back", "legs", "shoulders", "arms", "abs"],
};
const UPPER: DayTemplate = {
  focus: "Upper Body",
  muscleGroups: ["chest", "back", "shoulders", "arms"],
};
const LOWER: DayTemplate = {
  focus: "Lower Body & Abs",
  muscleGroups: ["legs", "abs"],
};
const PUSH: DayTemplate = {
  focus: "Push (Chest, Shoulders, Triceps)",
  muscleGroups: ["chest", "shoulders", "arms"],
};
const PULL: DayTemplate = {
  focus: "Pull (Back, Biceps)",
  muscleGroups: ["back", "arms", "abs"],
};
const LEGS: DayTemplate = {
  focus: "Legs & Abs",
  muscleGroups: ["legs", "abs"],
};

const SPLITS: Record<number, { name: string; days: DayTemplate[] }> = {
  2: { name: "Full Body", days: [FULL_BODY, FULL_BODY] },
  3: { name: "Full Body", days: [FULL_BODY, FULL_BODY, FULL_BODY] },
  4: { name: "Upper / Lower", days: [UPPER, LOWER, UPPER, LOWER] },
  5: {
    name: "Push / Pull / Legs + Upper / Lower",
    days: [PUSH, PULL, LEGS, UPPER, LOWER],
  },
  6: { name: "Push / Pull / Legs", days: [PUSH, PULL, LEGS, PUSH, PULL, LEGS] },
};

// --- 2. Volume rules -------------------------------------------------------

/** Exercises per targeted muscle group, per day. Full-body days stay at 1 per
 * group since a single day already covers all six groups. */
const EXERCISES_PER_GROUP: Record<ExperienceLevel, number> = {
  beginner: 1,
  intermediate: 1,
  advanced: 2,
};

const GOAL_SET_REP_TABLE: Record<Goal, { sets: number; reps: string; restSeconds: number }> = {
  loseFat: { sets: 3, reps: "12-15", restSeconds: 30 },
  buildMuscle: { sets: 4, reps: "8-10", restSeconds: 75 },
  generalFitness: { sets: 3, reps: "10-12", restSeconds: 45 },
};

/** Adjusts base set count from the goal table by experience level. */
function setsForExperience(baseSets: number, experience: ExperienceLevel) {
  if (experience === "beginner") return Math.max(2, baseSets - 1);
  if (experience === "advanced") return baseSets + 1;
  return baseSets;
}

/** Preferred difficulty order so beginners see easier movements first. */
const DIFFICULTY_PREFERENCE: Record<ExperienceLevel, Difficulty[]> = {
  beginner: ["beginner", "intermediate", "advanced"],
  intermediate: ["intermediate", "beginner", "advanced"],
  advanced: ["advanced", "intermediate", "beginner"],
};

// --- 3. Exercise selection --------------------------------------------------

function filterPool(answers: QuizAnswers): Exercise[] {
  const availableEquipment = new Set<Equipment>([...answers.equipment, "bodyweight"]);
  return exerciseLibrary.filter(
    (exercise) =>
      exercise.equipment.some((eq) => availableEquipment.has(eq)) &&
      !exercise.contraindications.some((limitation) => answers.limitations.includes(limitation))
  );
}

function pickExercisesForGroup(
  pool: Exercise[],
  muscleGroup: MuscleGroup,
  count: number,
  usedThisWeek: Set<string>,
  usedThisDay: Set<string>,
  experience: ExperienceLevel
): Exercise[] {
  const preference = DIFFICULTY_PREFERENCE[experience];
  const difficultyRank = (exercise: Exercise) => preference.indexOf(exercise.difficulty);
  // Exercises list their primary target first (e.g. a Romanian deadlift is
  // ["legs", "back"]) — prefer that muscle group's dedicated movements over
  // ones where it's only a secondary mover, before breaking ties on difficulty.
  const primaryRank = (exercise: Exercise) => (exercise.muscleGroups[0] === muscleGroup ? 0 : 1);
  // Beginners see classic, well-known movements first; this is a no-op for
  // intermediate/advanced lifters, who are ranked purely on the two rules above.
  const essentialRank = (exercise: Exercise) => (experience === "beginner" && exercise.essential ? 0 : 1);

  // Never repeat an exercise within the same day, even if it's the only
  // candidate left — an under-filled slot beats a duplicated entry.
  const candidates = pool
    .filter((exercise) => exercise.muscleGroups.includes(muscleGroup) && !usedThisDay.has(exercise.id))
    .sort(
      (a, b) =>
        primaryRank(a) - primaryRank(b) || essentialRank(a) - essentialRank(b) || difficultyRank(a) - difficultyRank(b)
    );

  const fresh = candidates.filter((exercise) => !usedThisWeek.has(exercise.id));
  const ordered = [...fresh, ...candidates.filter((exercise) => usedThisWeek.has(exercise.id))];

  const picked = ordered.slice(0, count);
  picked.forEach((exercise) => {
    usedThisWeek.add(exercise.id);
    usedThisDay.add(exercise.id);
  });
  return picked;
}

function buildDay(
  dayNumber: number,
  template: DayTemplate,
  pool: Exercise[],
  usedThisWeek: Set<string>,
  answers: QuizAnswers
): PlanDay {
  const { sets: baseSets, reps, restSeconds } = GOAL_SET_REP_TABLE[answers.goal];
  const sets = setsForExperience(baseSets, answers.experience);
  const perGroup = EXERCISES_PER_GROUP[answers.experience];
  const usedThisDay = new Set<string>();

  const planExercises: PlanExercise[] = template.muscleGroups.flatMap((muscleGroup) =>
    pickExercisesForGroup(pool, muscleGroup, perGroup, usedThisWeek, usedThisDay, answers.experience).map(
      (exercise): PlanExercise => ({
        exerciseId: exercise.id,
        sets,
        reps,
        restSeconds,
      })
    )
  );

  return {
    day: `Day ${dayNumber}`,
    focus: template.focus,
    exercises: planExercises,
  };
}

// --- 4. Public API ----------------------------------------------------------

export function generatePlan(answers: QuizAnswers): WorkoutPlan {
  const split = SPLITS[answers.daysPerWeek] ?? SPLITS[3];
  const pool = filterPool(answers);
  const usedIds = new Set<string>();

  const days = split.days.map((template, i) => buildDay(i + 1, template, pool, usedIds, answers));

  return {
    split: split.name,
    goal: answers.goal,
    experience: answers.experience,
    daysPerWeek: answers.daysPerWeek,
    days,
    generatedAt: new Date().toISOString(),
  };
}
