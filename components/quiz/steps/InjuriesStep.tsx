import { Limitation } from "@/lib/types";

const OPTIONS: { value: Limitation; label: string }[] = [
  { value: "knees", label: "Knees" },
  { value: "lowerBack", label: "Lower Back" },
  { value: "shoulders", label: "Shoulders" },
];

export default function InjuriesStep({
  value,
  onChange,
}: {
  value: Limitation[];
  onChange: (value: Limitation[]) => void;
}) {
  const toggle = (limitation: Limitation) => {
    onChange(
      value.includes(limitation)
        ? value.filter((l) => l !== limitation)
        : [...value, limitation]
    );
  };

  return (
    <div>
      <h2 className="font-display text-3xl uppercase tracking-wide text-foreground">
        Any injuries or limitations?
      </h2>
      <p className="mt-2 text-sm text-muted">
        We&apos;ll exclude exercises that put extra strain on these areas. Leave blank if none apply.
      </p>
      <fieldset className="mt-6 flex flex-col gap-3">
        <legend className="sr-only">Injuries or limitations</legend>
        {OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
              value.includes(option.value)
                ? "border-accent bg-accent/10"
                : "border-border bg-surface hover:border-accent/60"
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => toggle(option.value)}
              className="h-5 w-5 accent-accent"
            />
            <span className="font-display text-lg uppercase tracking-wide text-foreground">
              {option.label}
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
