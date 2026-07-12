import { ExerciseImage as ExerciseImageData } from "@/lib/types";

/**
 * Renders a styled placeholder in place of a real photo.
 * `image.src` is kept in the data model so real AI-generated photos can be
 * dropped into /public/exercises later without touching any component code —
 * swap this div for a plain <Image src={image.src} alt={image.alt} /> at that point.
 */
export default function ExerciseImagePlaceholder({
  image,
  label,
}: {
  image: ExerciseImageData;
  label: "Start" | "End";
}) {
  return (
    <div
      role="img"
      aria-label={image.alt}
      className="relative flex aspect-square w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-border bg-gradient-to-br from-surface to-surface-raised"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent/60"
      >
        <path
          d="M4 8v8M2 10v4M20 8v8M22 10v4M6 12h12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span
        aria-hidden="true"
        className="absolute left-2 top-2 rounded bg-background/70 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted"
      >
        {label}
      </span>
    </div>
  );
}
