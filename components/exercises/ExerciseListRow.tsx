"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Exercise } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import ExerciseImagePlaceholder from "@/components/exercises/ExerciseImage";

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-muted">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ExerciseListRow({ exercise }: { exercise: Exercise }) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!exercise.video) return;
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [exercise.video]);

  return (
    <Link
      ref={rowRef}
      href={`/exercises/${exercise.slug}`}
      className="flex items-center gap-4 rounded-lg border border-border bg-surface p-3 transition-colors hover:border-accent"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
        {exercise.video && isInView ? (
          <video src={exercise.video} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        ) : (
          <ExerciseImagePlaceholder image={exercise.imageStart} label="Start" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-display text-lg uppercase tracking-wide text-foreground">{exercise.name}</h3>
          {exercise.essential && (
            <Badge active className="shrink-0">
              Essential
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-xs uppercase tracking-wide text-muted">
          {exercise.difficulty} · {exercise.equipment.join(", ")}
        </p>
      </div>
      <ChevronIcon />
    </Link>
  );
}
