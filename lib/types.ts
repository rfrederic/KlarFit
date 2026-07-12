export type MuscleGroup =
  | "chest"
  | "back"
  | "legs"
  | "shoulders"
  | "arms"
  | "abs"
  | "neck";

/** Lightweight secondary tag for exercises that target a specific area within
 * a broader muscle group (e.g. traps within "back", calves within "legs"). An
 * exercise can carry more than one — e.g. a Romanian deadlift is both
 * "hamstrings" (legs) and "lowerBack" (back). See `lib/subgroups.ts` for the
 * taxonomy shown in the UI. */
export type SubGroup =
  // arms
  | "biceps"
  | "triceps"
  | "forearms"
  // legs
  | "quads"
  | "hamstrings"
  | "glutes"
  | "calves"
  // back
  | "lats"
  | "upperBack"
  | "lowerBack"
  | "traps"
  // shoulders
  | "frontPress"
  | "side"
  | "rear"
  | "rotatorCuff";

export type Equipment =
  | "bodyweight"
  | "dumbbells"
  | "barbell"
  | "machine"
  | "bands";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Limitation = "knees" | "lowerBack" | "shoulders";

/** Which curated track an exercise belongs to. "all" appears in both the Male and Female library views. */
export type Audience = "all" | "male" | "female";

export interface ExerciseImage {
  src: string;
  alt: string;
}

export interface Exercise {
  id: string;
  slug: string;
  name: string;
  muscleGroups: MuscleGroup[];
  /** Optional secondary tags narrowing down which part of the muscle group(s) this targets. */
  subGroup?: SubGroup[];
  /** Classic, beginner-relevant exercise. Shown with a badge and sorted first by default. */
  essential?: boolean;
  equipment: Equipment[];
  difficulty: Difficulty;
  /** Curated track this exercise belongs to. Defaults to "all" for the original shared library. */
  audience: Audience;
  instructions: string[];
  commonMistakes: string[];
  /** Limitations this exercise is unsafe/inadvisable for; excluded by the plan generator. */
  contraindications: Limitation[];
  /** Starting position of the movement. Placeholder now, AI-generated image later. */
  imageStart: ExerciseImage;
  /** End/peak position of the movement. Placeholder now, AI-generated image later. */
  imageEnd: ExerciseImage;
  /** Optional demo clip, e.g. "/exercises/push-up.mp4". Shown in place of the start/end images when present. */
  video?: string;
}

export type Goal = "loseFat" | "buildMuscle" | "generalFitness";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export interface QuizAnswers {
  goal: Goal;
  experience: ExperienceLevel;
  daysPerWeek: number;
  equipment: Equipment[];
  limitations: Limitation[];
}

export interface PlanExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds: number;
}

export interface PlanDay {
  day: string;
  focus: string;
  exercises: PlanExercise[];
}

export interface WorkoutPlan {
  split: string;
  goal: Goal;
  experience: ExperienceLevel;
  daysPerWeek: number;
  days: PlanDay[];
  generatedAt: string;
}

/**
 * A single exercise entry inside a program section. `exerciseSlug` links it to
 * `data/exercises.ts` for a detail page + form cues; when absent the entry is
 * a free-text custom exercise and `label` is all there is to show.
 */
export interface ProgramExercise {
  id: string;
  exerciseSlug?: string;
  label: string;
  sets: number | null;
  reps: string;
  /** Pins this exercise so the weekly rotation never swaps it for an alternate. */
  locked?: boolean;
  /** Manually chosen Week B substitute, overriding the auto-picked best alternate. */
  weekBOverrideSlug?: string;
}

export interface ProgramSection {
  id: string;
  title: string;
  exercises: ProgramExercise[];
}

export interface ProgramDay {
  id: string;
  day: string;
  focus: string;
  sections: ProgramSection[];
}

export interface UserProgram {
  days: ProgramDay[];
}
