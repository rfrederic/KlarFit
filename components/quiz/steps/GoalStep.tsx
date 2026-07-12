import { Goal } from "@/lib/types";
import OptionButton from "@/components/quiz/OptionButton";

const OPTIONS: { value: Goal; label: string; description: string }[] = [
  { value: "loseFat", label: "Lose Fat", description: "Higher reps, shorter rest, more calorie burn per session." },
  { value: "buildMuscle", label: "Build Muscle", description: "Moderate reps, longer rest, focused on progressive overload." },
  { value: "generalFitness", label: "General Fitness", description: "Balanced training for overall strength and health." },
];

export default function GoalStep({
  value,
  onChange,
}: {
  value: Goal;
  onChange: (value: Goal) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl uppercase tracking-wide text-foreground">
        What&apos;s your main goal?
      </h2>
      <div role="radiogroup" aria-label="Main goal" className="mt-6 flex flex-col gap-3">
        {OPTIONS.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            description={option.description}
            selected={value === option.value}
            onSelect={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
