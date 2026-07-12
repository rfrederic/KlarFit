import { ExperienceLevel } from "@/lib/types";
import OptionButton from "@/components/quiz/OptionButton";

const OPTIONS: { value: ExperienceLevel; label: string; description: string }[] = [
  { value: "beginner", label: "Beginner", description: "New to structured training or returning after a long break." },
  { value: "intermediate", label: "Intermediate", description: "Training consistently for 6+ months with solid form." },
  { value: "advanced", label: "Advanced", description: "Multiple years of consistent training and progressive overload." },
];

export default function ExperienceStep({
  value,
  onChange,
}: {
  value: ExperienceLevel;
  onChange: (value: ExperienceLevel) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl uppercase tracking-wide text-foreground">
        What&apos;s your experience level?
      </h2>
      <div role="radiogroup" aria-label="Experience level" className="mt-6 flex flex-col gap-3">
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
