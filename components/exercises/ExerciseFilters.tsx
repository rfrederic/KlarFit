"use client";

import { Audience, Equipment, MuscleGroup, SubGroup } from "@/lib/types";
import { SUBGROUPS_BY_MUSCLE_GROUP } from "@/lib/subgroups";

const TRACKS: { value: Audience; label: string }[] = [
  { value: "all", label: "All" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const MUSCLE_GROUPS: MuscleGroup[] = [
  "chest",
  "back",
  "legs",
  "shoulders",
  "arms",
  "abs",
  "neck",
];

const EQUIPMENT: Equipment[] = [
  "bodyweight",
  "dumbbells",
  "barbell",
  "machine",
  "bands",
];

interface Props {
  track: Audience;
  onTrackChange: (track: Audience) => void;
  search: string;
  onSearchChange: (value: string) => void;
  selectedMuscleGroups: MuscleGroup[];
  onToggleMuscleGroup: (muscleGroup: MuscleGroup) => void;
  selectedSubGroups: SubGroup[];
  onToggleSubGroup: (subGroup: SubGroup) => void;
  selectedEquipment: Equipment[];
  onToggleEquipment: (equipment: Equipment) => void;
  onClear: () => void;
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold capitalize transition-colors ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-surface text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="chip-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {children}
    </div>
  );
}

export default function ExerciseFilters({
  track,
  onTrackChange,
  search,
  onSearchChange,
  selectedMuscleGroups,
  onToggleMuscleGroup,
  selectedSubGroups,
  onToggleSubGroup,
  selectedEquipment,
  onToggleEquipment,
  onClear,
}: Props) {
  const activeFilterCount =
    selectedMuscleGroups.length + selectedSubGroups.length + selectedEquipment.length + (search.length > 0 ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

  // Sub-chip rows only appear for currently-selected main groups that have a taxonomy
  // (Chest, Abs, and Neck stay flat — there's no natural sub-split for them).
  const activeSubTaxonomies = selectedMuscleGroups
    .map((mg) => ({ mg, options: SUBGROUPS_BY_MUSCLE_GROUP[mg] }))
    .filter((entry): entry is { mg: MuscleGroup; options: { value: SubGroup; label: string }[] } => !!entry.options);

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-muted">Track</legend>
        <div role="tablist" aria-label="Exercise track" className="grid grid-cols-3 gap-2">
          {TRACKS.map((t) => (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={track === t.value}
              onClick={() => onTrackChange(t.value)}
              className={`rounded-md py-2 text-sm font-semibold transition-colors ${
                track === t.value
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-background text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="exercise-search" className="mb-2 block text-sm font-semibold text-muted">
          Search exercises
        </label>
        <input
          id="exercise-search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="e.g. squat, row, curl..."
          className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted/60 focus-visible:border-accent"
        />
      </div>

      <fieldset>
        <div className="mb-2 flex items-center justify-between">
          <legend className="text-sm font-semibold text-muted">Muscle group</legend>
          {hasActiveFilters && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <ChipRow>
          {MUSCLE_GROUPS.map((mg) => (
            <FilterChip
              key={mg}
              label={mg}
              active={selectedMuscleGroups.includes(mg)}
              onClick={() => onToggleMuscleGroup(mg)}
            />
          ))}
        </ChipRow>

        {activeSubTaxonomies.length > 0 && (
          <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3">
            {activeSubTaxonomies.map(({ mg, options }) => (
              <div key={mg}>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">{mg} — narrow down</p>
                <ChipRow>
                  {options.map((opt) => (
                    <FilterChip
                      key={opt.value}
                      label={opt.label}
                      active={selectedSubGroups.includes(opt.value)}
                      onClick={() => onToggleSubGroup(opt.value)}
                    />
                  ))}
                </ChipRow>
              </div>
            ))}
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-muted">Equipment</legend>
        <ChipRow>
          {EQUIPMENT.map((eq) => (
            <FilterChip
              key={eq}
              label={eq}
              active={selectedEquipment.includes(eq)}
              onClick={() => onToggleEquipment(eq)}
            />
          ))}
        </ChipRow>
      </fieldset>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="self-start text-sm font-semibold text-accent hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
