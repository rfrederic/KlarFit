import { Equipment } from "@/lib/types";

const OPTIONS: { value: Equipment; label: string }[] = [
  { value: "bodyweight", label: "Bodyweight only" },
  { value: "dumbbells", label: "Dumbbells" },
  { value: "barbell", label: "Barbell" },
  { value: "machine", label: "Machines" },
  { value: "bands", label: "Resistance Bands" },
];

export default function EquipmentStep({
  value,
  onChange,
}: {
  value: Equipment[];
  onChange: (value: Equipment[]) => void;
}) {
  const toggle = (equipment: Equipment) => {
    onChange(
      value.includes(equipment)
        ? value.filter((e) => e !== equipment)
        : [...value, equipment]
    );
  };

  return (
    <div>
      <h2 className="font-display text-3xl uppercase tracking-wide text-foreground">
        What equipment do you have access to?
      </h2>
      <p className="mt-2 text-sm text-muted">Select all that apply.</p>
      <fieldset className="mt-6 flex flex-col gap-3">
        <legend className="sr-only">Available equipment</legend>
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
