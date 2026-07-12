import { WorkoutPlan } from "@/lib/types";
import DayCard from "@/components/plan/DayCard";
import DownloadPlanButton from "@/components/plan/DownloadPlanButton";
import { Button } from "@/components/ui/Button";

const GOAL_LABELS: Record<WorkoutPlan["goal"], string> = {
  loseFat: "Lose Fat",
  buildMuscle: "Build Muscle",
  generalFitness: "General Fitness",
};

const EXPERIENCE_LABELS: Record<WorkoutPlan["experience"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function WeeklyPlanView({
  plan,
  onRetake,
}: {
  plan: WorkoutPlan;
  onRetake: () => void;
}) {
  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
            {plan.split}
          </p>
          <h2 className="mt-1 font-display text-3xl uppercase tracking-wide text-foreground">
            Your Weekly Plan
          </h2>
          <p className="mt-2 text-sm text-muted">
            {GOAL_LABELS[plan.goal]} &middot; {EXPERIENCE_LABELS[plan.experience]} &middot;{" "}
            {plan.daysPerWeek} days / week
          </p>
        </div>
        <div className="flex gap-3 no-print">
          <Button variant="ghost" onClick={onRetake}>
            Retake Quiz
          </Button>
          <DownloadPlanButton />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {plan.days.map((day, i) => (
          <DayCard key={`${day.day}-${i}`} day={day} />
        ))}
      </div>
    </div>
  );
}
