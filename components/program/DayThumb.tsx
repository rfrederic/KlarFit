/**
 * Styled placeholder for a program day's thumbnail. The real image slot is
 * `/day-thumbs/{dayId}.jpg` — once that exists, swap the div below for
 * `<Image src={`/day-thumbs/${dayId}.jpg`} alt={focus} fill />`.
 */
export default function DayThumb({
  dayId,
  focus,
  size = 56,
  dimmed = false,
}: {
  dayId: string;
  focus: string;
  size?: number;
  dimmed?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={focus}
      data-day-id={dayId}
      style={{ width: size, height: size }}
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border ${
        dimmed ? "border-border bg-surface" : "border-accent/30 bg-gradient-to-br from-surface-raised to-background"
      }`}
    >
      <span
        aria-hidden="true"
        className={`px-1 text-center font-display text-[10px] uppercase leading-tight tracking-wide ${
          dimmed ? "text-muted" : "text-accent/80"
        }`}
      >
        {focus}
      </span>
    </div>
  );
}
