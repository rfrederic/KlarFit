export default function OptionButton({
  label,
  description,
  selected,
  onSelect,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`w-full rounded-lg border p-5 text-left transition-colors ${
        selected
          ? "border-accent bg-accent/10"
          : "border-border bg-surface hover:border-accent/60"
      }`}
    >
      <span className="block font-display text-xl uppercase tracking-wide text-foreground">
        {label}
      </span>
      {description && <span className="mt-1 block text-sm text-muted">{description}</span>}
    </button>
  );
}
