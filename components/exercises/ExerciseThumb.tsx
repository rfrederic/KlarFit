"use client";

import { useEffect, useRef, useState } from "react";
import { Exercise } from "@/lib/types";
import Video from "@/components/ui/Video";
import ExerciseImagePlaceholder from "@/components/exercises/ExerciseImage";

/**
 * Small square thumbnail used in list rows and the workout screen. Autoplays
 * a muted, looping preview of the exercise's video when one exists — only
 * while the thumbnail is actually on screen (IntersectionObserver), the same
 * lazy-mount pattern as ExerciseCard, so off-screen rows don't keep decoding
 * video in the background.
 */
export default function ExerciseThumb({
  exercise,
  size = 56,
  className = "",
}: {
  exercise?: Exercise;
  size?: number;
  className?: string;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!exercise?.video) return;
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [exercise?.video]);

  if (!exercise) {
    return (
      <div
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-md border border-border bg-surface-raised ${className}`}
      />
    );
  }

  return (
    <div
      ref={elRef}
      style={{ width: size, height: size }}
      className={`shrink-0 overflow-hidden rounded-md ${className}`}
    >
      {exercise.video && isInView ? (
        <Video src={exercise.video} autoPlay loop playsInline className="h-full w-full object-cover" />
      ) : (
        <ExerciseImagePlaceholder image={exercise.imageStart} label="Start" />
      )}
    </div>
  );
}
