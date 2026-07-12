"use client";

import { useEffect, useState } from "react";
import { QuizAnswers, WorkoutPlan } from "@/lib/types";
import { loadQuizAnswers } from "@/lib/storage";
import { getCurrentRotationVariant, RotationVariant } from "@/lib/exerciseAlternates";
import { GOAL_TO_TRAINING_GOAL } from "@/lib/repsRecommendations";
import DayCard from "@/components/plan/DayCard";
import DownloadPlanButton from "@/components/plan/DownloadPlanButton";
import RotationToggle from "@/components/ui/RotationToggle";
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
  const [previewVariant, setPreviewVariant] = useState<RotationVariant | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);

  useEffect(() => {
    setQuizAnswers(loadQuizAnswers());
  }, []);

  // Even local-day number = Variant A, odd = Variant B, flipping every 24
  // hours — same rotation engine and cadence as My Program.
  const autoVariant = getCurrentRotationVariant();
  const activeVariant = previewVariant ?? autoVariant;

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

      <div className="mt-6 no-print">
        <RotationToggle
          activeVariant={activeVariant}
          isPreview={previewVariant !== null}
          onTogglePreview={() => setPreviewVariant(previewVariant === null ? (autoVariant === "A" ? "B" : "A") : null)}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {plan.days.map((day, i) => (
          <DayCard
            key={`${day.day}-${i}`}
            day={day}
            variant={activeVariant}
            goal={GOAL_TO_TRAINING_GOAL[plan.goal]}
            experience={plan.experience}
            availableEquipment={quizAnswers?.equipment}
          />
        ))}
      </div>
    </div>
  );
}
