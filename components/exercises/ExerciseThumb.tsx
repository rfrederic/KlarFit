import { Exercise } from "@/lib/types";
import Video from "@/components/ui/Video";
import ExerciseImagePlaceholder from "@/components/exercises/ExerciseImage";

/**
 * Small square thumbnail used in list rows and the workout screen: the
 * video's own first frame stands in for a poster image when one exists
 * (no `autoPlay`, so it just sits paused on frame one), otherwise the
 * existing start-image placeholder.
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
  if (!exercise) {
    return (
      <div
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-md border border-border bg-surface-raised ${className}`}
      />
    );
  }

  if (exercise.video) {
    return (
      <Video
        src={exercise.video}
        playsInline
        preload="metadata"
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-md border border-border object-cover ${className}`}
      />
    );
  }

  return (
    <div style={{ width: size, height: size }} className={`shrink-0 overflow-hidden rounded-md ${className}`}>
      <ExerciseImagePlaceholder image={exercise.imageStart} label="Start" />
    </div>
  );
}
