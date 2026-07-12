import { Exercise, MuscleGroup } from "@/lib/types";

/**
 * Top-level browsing categories shown on /exercises. This is deliberately a
 * different (flatter) list than `MuscleGroup` — Biceps/Triceps/Forearms are
 * split out of "arms" (there is no standalone Arms category anymore), and
 * Calves/Traps are split out of Legs/Back in addition to those groups still
 * appearing on their own. An exercise can and does show up under more than
 * one category when it's tagged for it.
 */
export interface Category {
  slug: string;
  label: string;
  matches: (exercise: Exercise) => boolean;
  /** If set, the category detail page shows this group's sub-filter chips
   * (from `SUBGROUPS_BY_MUSCLE_GROUP` in `lib/subgroups.ts`). Leaf categories
   * (Biceps, Calves, Traps, etc.) have nothing further to drill into. */
  subFilterGroup?: MuscleGroup;
}

export const CATEGORIES: Category[] = [
  { slug: "abs", label: "Abs", matches: (e) => e.muscleGroups.includes("abs") },
  { slug: "back", label: "Back", matches: (e) => e.muscleGroups.includes("back"), subFilterGroup: "back" },
  { slug: "biceps", label: "Biceps", matches: (e) => e.subGroup?.includes("biceps") ?? false },
  { slug: "calves", label: "Calves", matches: (e) => e.subGroup?.includes("calves") ?? false },
  { slug: "chest", label: "Chest", matches: (e) => e.muscleGroups.includes("chest") },
  { slug: "forearms", label: "Forearms", matches: (e) => e.subGroup?.includes("forearms") ?? false },
  { slug: "legs", label: "Legs", matches: (e) => e.muscleGroups.includes("legs"), subFilterGroup: "legs" },
  { slug: "neck", label: "Neck", matches: (e) => e.muscleGroups.includes("neck") },
  {
    slug: "shoulders",
    label: "Shoulders",
    matches: (e) => e.muscleGroups.includes("shoulders"),
    subFilterGroup: "shoulders",
  },
  { slug: "traps", label: "Traps", matches: (e) => e.subGroup?.includes("traps") ?? false },
  { slug: "triceps", label: "Triceps", matches: (e) => e.subGroup?.includes("triceps") ?? false },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function exercisesInCategory(category: Category, exercises: Exercise[]): Exercise[] {
  return exercises.filter(category.matches);
}
