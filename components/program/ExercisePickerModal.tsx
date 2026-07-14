"use client";

import { useMemo, useState } from "react";
import { exercises } from "@/data/exercises";
import { SubGroup } from "@/lib/types";
import { CATEGORIES, getCategoryBySlug, exercisesInCategory } from "@/lib/categories";
import { SUBGROUPS_BY_MUSCLE_GROUP } from "@/lib/subgroups";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import CategoryThumb from "@/components/exercises/CategoryThumb";
import { Button } from "@/components/ui/Button";

function PickerChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-background text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-muted">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExerciseResultRow({
  exercise,
  onPick,
}: {
  exercise: (typeof exercises)[number];
  onPick: (entry: { exerciseSlug?: string; label: string }) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPick({ exerciseSlug: exercise.slug, label: exercise.name })}
      className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-background/40 px-4 py-3 text-left transition-colors hover:border-accent"
    >
      <span className="flex items-center gap-2 font-semibold text-foreground">
        {exercise.name}
        {exercise.essential && <Badge active>Essential</Badge>}
      </span>
      <Badge>{exercise.difficulty}</Badge>
    </button>
  );
}

export default function ExercisePickerModal({
  onClose,
  onPick,
}: {
  onClose: () => void;
  onPick: (entry: { exerciseSlug?: string; label: string }) => void;
}) {
  const [search, setSearch] = useState("");
  const [customName, setCustomName] = useState("");
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [selectedSubGroups, setSelectedSubGroups] = useState<SubGroup[]>([]);

  const query = search.trim().toLowerCase();
  const activeCategory = activeCategorySlug ? getCategoryBySlug(activeCategorySlug) : undefined;
  const subFilterOptions = activeCategory?.subFilterGroup
    ? SUBGROUPS_BY_MUSCLE_GROUP[activeCategory.subFilterGroup]
    : undefined;

  const toggleSubGroup = (sg: SubGroup) => {
    setSelectedSubGroups((prev) => (prev.includes(sg) ? prev.filter((s) => s !== sg) : [...prev, sg]));
  };

  const openCategory = (slug: string) => {
    setSelectedSubGroups([]);
    setActiveCategorySlug(slug);
  };

  const goBackToCategories = () => {
    setActiveCategorySlug(null);
    setSelectedSubGroups([]);
  };

  // A non-empty search always shows flat, library-wide results — searching
  // is a shortcut around the category drill-down, not scoped to it.
  const searchResults = useMemo(() => {
    if (query.length === 0) return [];
    return [...exercises]
      .filter((exercise) => exercise.name.toLowerCase().includes(query))
      .sort((a, b) => Number(!!b.essential) - Number(!!a.essential) || a.name.localeCompare(b.name));
  }, [query]);

  const categoryResults = useMemo(() => {
    if (!activeCategory) return [];
    const inCategory = exercisesInCategory(activeCategory, exercises);
    const filtered = inCategory.filter(
      (exercise) => selectedSubGroups.length === 0 || selectedSubGroups.some((sg) => exercise.subGroup?.includes(sg))
    );
    return [...filtered].sort(
      (a, b) => Number(!!b.essential) - Number(!!a.essential) || a.name.localeCompare(b.name)
    );
  }, [activeCategory, selectedSubGroups]);

  const handleAddCustom = () => {
    const label = customName.trim();
    if (!label) return;
    onPick({ label });
  };

  return (
    <Modal title="Add Exercise" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <input
          type="search"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the exercise library..."
          className="w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted/60 focus-visible:border-accent"
        />

        {query.length > 0 ? (
          <ul className="flex max-h-72 flex-col gap-2 overflow-y-auto">
            {searchResults.map((exercise) => (
              <li key={exercise.id}>
                <ExerciseResultRow exercise={exercise} onPick={onPick} />
              </li>
            ))}
            {searchResults.length === 0 && (
              <li className="rounded-md border border-border bg-background/40 px-4 py-3 text-sm text-muted">
                No matches in the library add it as a custom exercise below.
              </li>
            )}
          </ul>
        ) : activeCategory ? (
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={goBackToCategories}
              className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              <BackChevron />
              All Categories
            </button>

            {subFilterOptions && (
              <div className="chip-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {subFilterOptions.map((opt) => (
                  <PickerChip
                    key={opt.value}
                    label={opt.label}
                    active={selectedSubGroups.includes(opt.value)}
                    onClick={() => toggleSubGroup(opt.value)}
                  />
                ))}
              </div>
            )}

            <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto">
              {categoryResults.map((exercise) => (
                <li key={exercise.id}>
                  <ExerciseResultRow exercise={exercise} onPick={onPick} />
                </li>
              ))}
              {categoryResults.length === 0 && (
                <li className="rounded-md border border-border bg-background/40 px-4 py-3 text-sm text-muted">
                  No matches in this category add it as a custom exercise below.
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div className="flex max-h-80 flex-col gap-2 overflow-y-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => openCategory(category.slug)}
                className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-2.5 text-left transition-colors hover:border-accent"
              >
                <CategoryThumb slug={category.slug} label={category.label} size={48} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base uppercase tracking-wide text-foreground">{category.label}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {exercisesInCategory(category, exercises).length} Exercises
                  </p>
                </div>
                <ChevronIcon />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <label htmlFor="custom-exercise-name" className="text-sm font-semibold text-muted">
            Not in the library? Add a custom exercise
          </label>
          <div className="flex gap-2">
            <input
              id="custom-exercise-name"
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCustom();
              }}
              placeholder="e.g. Cybex row machine"
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted/60 focus-visible:border-accent"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddCustom}
              disabled={customName.trim().length === 0}
              className="shrink-0 px-4"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
