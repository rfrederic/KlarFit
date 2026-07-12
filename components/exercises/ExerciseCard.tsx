"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Exercise } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import ExerciseImagePlaceholder from "@/components/exercises/ExerciseImage";
import { SUBGROUP_LABELS } from "@/lib/subgroups";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!exercise.video) return;
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [exercise.video]);

  return (
    <Link
      ref={cardRef}
      href={`/exercises/${exercise.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-glow"
    >
      {exercise.video && isInView ? (
        // Only mounted while the card is in view — unmounting on scroll-out
        // pauses playback and releases the video's decode/memory resources.
        <video
          src={exercise.video}
          autoPlay
          muted
          loop
          playsInline
          className="aspect-square w-full object-cover"
        />
      ) : (
        <ExerciseImagePlaceholder image={exercise.imageStart} label="Start" />
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl uppercase tracking-wide text-foreground group-hover:text-accent">
            {exercise.name}
          </h3>
          {exercise.essential && (
            <Badge active className="shrink-0">
              Essential
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {exercise.audience !== "all" && <Badge active>{exercise.audience}</Badge>}
          {exercise.muscleGroups.map((mg) => (
            <Badge key={mg}>{mg}</Badge>
          ))}
          {exercise.subGroup?.map((sg) => (
            <Badge key={sg}>{SUBGROUP_LABELS[sg]}</Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs uppercase tracking-wide text-muted">
          <span>{exercise.equipment.join(", ")}</span>
          <span>{exercise.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}
