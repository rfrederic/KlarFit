"use client";

import { useMemo, useState } from "react";
import { exercises } from "@/data/exercises";
import { CATEGORIES, exercisesInCategory } from "@/lib/categories";
import CategoryRow from "@/components/exercises/CategoryRow";
import ExerciseListRow from "@/components/exercises/ExerciseListRow";

export default function ExercisesPageClient() {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (query.length === 0) return [];
    return exercises
      .filter((exercise) => exercise.name.toLowerCase().includes(query))
      .sort((a, b) => Number(!!b.essential) - Number(!!a.essential) || a.name.localeCompare(b.name));
  }, [query]);

  return (
    <div className="flex flex-col gap-6">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search all exercises..."
        aria-label="Search all exercises"
        className="w-full rounded-md border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted/60 focus-visible:border-accent"
      />

      {query.length > 0 ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted">
            {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for &ldquo;{search.trim()}&rdquo;
          </p>
          {searchResults.length === 0 ? (
            <p className="rounded-lg border border-border bg-surface p-8 text-center text-muted">
              No exercises match &ldquo;{search.trim()}&rdquo;.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {searchResults.map((exercise) => (
                <ExerciseListRow key={exercise.id} exercise={exercise} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {CATEGORIES.map((category) => (
            <CategoryRow
              key={category.slug}
              slug={category.slug}
              label={category.label}
              count={exercisesInCategory(category, exercises).length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
