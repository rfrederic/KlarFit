const DAY_OPTIONS = [2, 3, 4, 5, 6];

export default function DaysStep({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl uppercase tracking-wide text-foreground">
        How many days a week can you train?
      </h2>
      <div
        role="radiogroup"
        aria-label="Days per week"
        className="mt-6 grid grid-cols-5 gap-3"
      >
        {DAY_OPTIONS.map((day) => (
          <button
            key={day}
            type="button"
            role="radio"
            aria-checked={value === day}
            onClick={() => onChange(day)}
            className={`flex flex-col items-center justify-center rounded-lg border py-6 font-display text-3xl transition-colors ${
              value === day
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-surface text-foreground hover:border-accent/60"
            }`}
          >
            {day}
            <span className="mt-1 text-xs uppercase tracking-wide text-muted">days</span>
          </button>
        ))}
      </div>
    </div>
  );
}
