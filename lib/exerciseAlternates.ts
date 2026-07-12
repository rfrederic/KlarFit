import { Difficulty, Equipment, Exercise } from "@/lib/types";

/**
 * Finds "equivalent" exercises for the daily rotation feature (see
 * lib/exerciseRotation.ts). Pure rule tables, same philosophy as
 * lib/repsRecommendations.ts: no AI/network calls, every decision is a plain
 * lookup or keyword match so it stays deterministic and easy to tune.
 *
 * A good alternate must share:
 *   1. Movement pattern — e.g. a horizontal chest press never swaps for a
 *      vertical shoulder press, and a squat never swaps for a hinge, even
 *      though both might superficially share a muscle group or sub-tag.
 *   2. Muscle sub-tag — e.g. "lats" (pull-up/pulldown) vs "upperBack" (rows)
 *      are both "back", but not interchangeable.
 *   3. Same or easier difficulty — never rotate a beginner into something
 *      harder than what they picked.
 * Equipment is treated as a soft preference (rotating onto different
 * equipment is often the point — it's what varies the stimulus) rather than
 * a hard filter, except when the user's available equipment (from their quiz
 * answers) is known, in which case we prefer alternates they can actually do.
 */

export type MovementPattern =
  | "carry"
  | "neckIsometric"
  | "coreStability"
  | "verticalPull"
  | "horizontalPull"
  | "verticalPush"
  | "horizontalPush"
  | "chestFly"
  | "rearDeltFly"
  | "calfRaise"
  | "squatLegPress"
  | "lunge"
  | "hinge"
  | "legCurl"
  | "legExtension"
  | "hipIsolation"
  | "wristFlexion"
  | "elbowFlexion"
  | "elbowExtension"
  | "shoulderRaise"
  | "shrug"
  | "backExtension"
  | "coreRotation"
  | "coreFlexion"
  | "other";

const CORE_STABILITY_SLUGS = new Set(["plank", "weighted-plank", "side-plank", "hollow-body-hold", "dead-bug"]);

export function classifyMovementPattern(exercise: Exercise): MovementPattern {
  const name = exercise.name.toLowerCase();
  const slug = exercise.slug;
  const primary = exercise.muscleGroups[0];
  const sub = exercise.subGroup ?? [];

  if (slug === "farmers-carry") return "carry";
  if (primary === "neck") return "neckIsometric";
  if (CORE_STABILITY_SLUGS.has(slug) || name.includes("pallof")) return "coreStability";

  // Upright rows raise the arms like a lateral raise, not a back row — check
  // before the generic row match below.
  if (name.includes("upright row")) return "shoulderRaise";
  if (/pull-up|pulldown|chin-up/.test(name) || slug === "dead-hang") return "verticalPull";
  if (/\brow\b/.test(name) || name.includes("face pull")) return "horizontalPull";

  if (/\bdip\b/.test(name)) return "verticalPush";
  if (primary === "chest" && /press|push-up/.test(name)) return "horizontalPush";
  if (primary === "shoulders" && /press/.test(name)) return "verticalPush";
  if (name.includes("fly")) return primary === "chest" ? "chestFly" : "rearDeltFly";

  // Calf work is checked before "leg press", since machine names like
  // "45-Degree Leg Press Calf Raise" contain "leg press" as a sub-string.
  if (sub.includes("calves")) return "calfRaise";
  if (/squat|leg press/.test(name)) return "squatLegPress";
  if (/lunge|step-up/.test(name)) return "lunge";
  if (/deadlift|hip thrust|glute bridge|pull-through|hyperextension|swing/.test(name)) return "hinge";
  if (/leg curl|hamstring curl/.test(name)) return "legCurl";
  if (name.includes("leg extension")) return "legExtension";
  if (sub.includes("glutes") && /abduction|adduction|kickback|lateral walk/.test(name)) return "hipIsolation";

  if (sub.includes("forearms") && name.includes("wrist curl")) return "wristFlexion";
  if (sub.includes("biceps") || name.includes("curl")) return "elbowFlexion";
  if (sub.includes("triceps") || /extension|pushdown|skullcrusher|skull crusher|kickback/.test(name)) return "elbowExtension";

  if (/lateral raise|front raise/.test(name)) return "shoulderRaise";
  if (name.includes("shrug")) return "shrug";
  if (slug === "superman") return "backExtension";
  if (/twist|woodchopper/.test(name)) return "coreRotation";
  if (primary === "abs") return "coreFlexion";

  return "other";
}

const DIFFICULTY_RANK: Record<Difficulty, number> = { beginner: 0, intermediate: 1, advanced: 2 };

function isEasierOrEqual(candidate: Exercise, original: Exercise) {
  return DIFFICULTY_RANK[candidate.difficulty] <= DIFFICULTY_RANK[original.difficulty];
}

function sharesSubTag(candidate: Exercise, original: Exercise) {
  if (original.subGroup && original.subGroup.length > 0) {
    return (candidate.subGroup ?? []).some((sg) => original.subGroup!.includes(sg));
  }
  // Exercises with no sub-tag (e.g. Push-Up, Cable Fly) fall back to matching
  // on the primary muscle group instead.
  return candidate.muscleGroups[0] === original.muscleGroups[0];
}

function equipmentScore(candidate: Exercise, availableEquipment?: Equipment[]) {
  if (!availableEquipment || availableEquipment.length === 0) return 0;
  const available = new Set<Equipment>([...availableEquipment, "bodyweight"]);
  return candidate.equipment.some((eq) => available.has(eq)) ? 0 : 1;
}

/**
 * Ranked list of valid swaps for `exercise` (excluding itself), best first.
 * Deterministic: ties are broken alphabetically by id, never randomly, so the
 * same exercise always sorts to the same position on repeated calls.
 */
export function getAlternateSuggestions(
  exercise: Exercise,
  library: Exercise[],
  availableEquipment?: Equipment[]
): Exercise[] {
  const pattern = classifyMovementPattern(exercise);

  return library
    .filter(
      (candidate) =>
        candidate.id !== exercise.id &&
        classifyMovementPattern(candidate) === pattern &&
        sharesSubTag(candidate, exercise) &&
        isEasierOrEqual(candidate, exercise)
    )
    .sort((a, b) => {
      const equipmentDiff = equipmentScore(a, availableEquipment) - equipmentScore(b, availableEquipment);
      if (equipmentDiff !== 0) return equipmentDiff;
      const difficultyDiff = DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty];
      if (difficultyDiff !== 0) return difficultyDiff;
      return a.id.localeCompare(b.id);
    });
}

/** The single best swap for `exercise`, or `undefined` if nothing qualifies —
 * in that case the exercise simply stays the same in both weeks. */
export function getBestAlternate(
  exercise: Exercise,
  library: Exercise[],
  availableEquipment?: Equipment[]
): Exercise | undefined {
  return getAlternateSuggestions(exercise, library, availableEquipment)[0];
}

// --- Daily rotation (Variant A / Variant B) --------------------------------

export type RotationVariant = "A" | "B";

/** Days since the Unix epoch, counted on the local calendar (midnight to
 * midnight) so the variant flips once every 24 hours at local midnight
 * rather than on a UTC boundary. */
function getLocalDayNumber(date: Date): number {
  const localMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(localMidnight.getTime() / (24 * 60 * 60 * 1000));
}

/** Even day number = Variant A, odd = Variant B — flips every 24 hours,
 * shared across devices without storing any state since it's purely a
 * function of today's date. */
export function getCurrentRotationVariant(date: Date = new Date()): RotationVariant {
  return getLocalDayNumber(date) % 2 === 0 ? "A" : "B";
}
