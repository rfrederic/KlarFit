"use client";

import { useState } from "react";
import { Exercise } from "@/lib/types";
import ExerciseImagePlaceholder from "@/components/exercises/ExerciseImage";

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

type MediaSlot = "start" | "end" | "video";

export default function ExerciseMedia({
  exercise,
  onPlayVideo,
}: {
  exercise?: Exercise;
  onPlayVideo: () => void;
}) {
  const [activeSlot, setActiveSlot] = useState<MediaSlot>("start");

  if (!exercise) return null;

  const slots: MediaSlot[] = exercise.video ? ["start", "end", "video"] : ["start", "end"];
  const shownImage = activeSlot === "end" ? exercise.imageEnd : exercise.imageStart;
  const shownLabel = activeSlot === "end" ? "End" : "Start";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl">
        <ExerciseImagePlaceholder image={shownImage} label={shownLabel} />
        {exercise.video && (
          <button
            type="button"
            onClick={onPlayVideo}
            aria-label="Play exercise video"
            className="absolute inset-0 flex items-center justify-center bg-background/10"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-glow">
              <PlayIcon />
            </span>
          </button>
        )}
      </div>

      {slots.length > 1 && (
        <div className="flex gap-1.5" role="tablist" aria-label="Exercise media">
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              role="tab"
              aria-selected={activeSlot === slot}
              aria-label={slot === "video" ? "Play video" : `Show ${slot} position`}
              onClick={() => (slot === "video" ? onPlayVideo() : setActiveSlot(slot))}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                activeSlot === slot ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
