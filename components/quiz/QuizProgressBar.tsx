export default function QuizProgressBar({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) {
  const percent = Math.round((step / totalSteps) * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-muted">
        <span>
          Step {step} of {totalSteps}
        </span>
        <span>{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-raised"
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
