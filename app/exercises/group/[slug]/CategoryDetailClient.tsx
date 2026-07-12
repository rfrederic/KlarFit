"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { exercises } from "@/data/exercises";
import { SubGroup } from "@/lib/types";
import { getCategoryBySlug, exercisesInCategory } from "@/lib/categories";
import { SUBGROUPS_BY_MUSCLE_GROUP } from "@/lib/subgroups";
import ExerciseListRow from "@/components/exercises/ExerciseListRow";

function BackChevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CategoryDetailClient({ categorySlug }: { categorySlug: string }) {
  const category = getCategoryBySlug(categorySlug);
  const [search, setSearch] = useState("");
  const [selectedSubGroups, setSelectedSubGroups] = useState<SubGroup[]>([]);

  const subFilterOptions = category?.subFilterGroup ? SUBGROUPS_BY_MUSCLE_GROUP[category.subFilterGroup] : undefined;

  const toggleSubGroup = (sg: SubGroup) => {
    setSelectedSubGroups((prev) => (prev.includes(sg) ? prev.filter((s) => s !== sg) : [...prev, sg]));
  };

  const results = useMemo(() => {
    if (!category) return [];
    const query = search.trim().toLowerCase();
    const inCategory = exercisesInCategory(category, exercises);
    const filtered = inCategory.filter((exercise) => {
      const matchesSearch = query.length === 0 || exercise.name.toLowerCase().includes(query);
      const matchesSubGroups =
        selectedSubGroups.length === 0 || selectedSubGroups.some((sg) => exercise.subGroup?.includes(sg));
      return matchesSearch && matchesSubGroups;
    });
    return [...filtered].sort(
      (a, b) => Number(!!b.essential) - Number(!!a.essential) || a.name.localeCompare(b.name)
    );
  }, [category, search, selectedSubGroups]);

  if (!category) {
    return <p className="text-muted">Category not found.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Link href="/exercises" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
        <BackChevron />
        All Categories
      </Link>

      <div>
        <h1 className="font-display text-4xl uppercase tracking-wide text-foreground sm:text-5xl">
          {category.label}
        </h1>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-muted">
          {exercisesInCategory(category, exercises).length}{" "}
          {exercisesInCategory(category, exercises).length === 1 ? "Exercise" : "Exercises"}
        </p>
      </div>

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${category.label.toLowerCase()} exercises...`}
        aria-label={`Search ${category.label} exercises`}
        className="w-full rounded-md border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted/60 focus-visible:border-accent"
      />

      {subFilterOptions && (
        <div className="chip-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {subFilterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={selectedSubGroups.includes(opt.value)}
              onClick={() => toggleSubGroup(opt.value)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                selectedSubGroups.includes(opt.value)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-surface text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-8 text-center text-muted">
          No exercises match your filters.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {results.map((exercise) => (
            <ExerciseListRow key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  );
}
