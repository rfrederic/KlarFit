import { MuscleGroup, SubGroup } from "@/lib/types";

/**
 * Second-level filter taxonomy shown under a main muscle group on /exercises
 * and in the My Program exercise picker. Groups without an entry here (Chest,
 * Abs, Neck) stay flat — there's no natural sub-split in the data for them.
 */
export const SUBGROUPS_BY_MUSCLE_GROUP: Partial<Record<MuscleGroup, { value: SubGroup; label: string }[]>> = {
  arms: [
    { value: "biceps", label: "Biceps" },
    { value: "triceps", label: "Triceps" },
    { value: "forearms", label: "Forearms" },
  ],
  legs: [
    { value: "quads", label: "Quads" },
    { value: "hamstrings", label: "Hamstrings" },
    { value: "glutes", label: "Glutes" },
    { value: "calves", label: "Calves" },
  ],
  back: [
    { value: "lats", label: "Lats" },
    { value: "upperBack", label: "Upper Back" },
    { value: "lowerBack", label: "Lower Back" },
    { value: "traps", label: "Traps" },
  ],
  shoulders: [
    { value: "frontPress", label: "Front & Press" },
    { value: "side", label: "Side" },
    { value: "rear", label: "Rear" },
    { value: "rotatorCuff", label: "Rotator Cuff" },
  ],
};

/** Flat value -> label lookup across every taxonomy, for rendering a badge on a card/detail page. */
export const SUBGROUP_LABELS: Record<SubGroup, string> = Object.values(SUBGROUPS_BY_MUSCLE_GROUP)
  .flat()
  .reduce((acc, entry) => {
    if (entry) acc[entry.value] = entry.label;
    return acc;
  }, {} as Record<SubGroup, string>);
