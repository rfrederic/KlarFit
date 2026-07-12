"use client";

import { useState } from "react";
import { QuizAnswers } from "@/lib/types";
import QuizProgressBar from "@/components/quiz/QuizProgressBar";
import GoalStep from "@/components/quiz/steps/GoalStep";
import ExperienceStep from "@/components/quiz/steps/ExperienceStep";
import DaysStep from "@/components/quiz/steps/DaysStep";
import EquipmentStep from "@/components/quiz/steps/EquipmentStep";
import InjuriesStep from "@/components/quiz/steps/InjuriesStep";
import { Button } from "@/components/ui/Button";

const TOTAL_STEPS = 5;

const DEFAULT_ANSWERS: QuizAnswers = {
  goal: "generalFitness",
  experience: "beginner",
  daysPerWeek: 3,
  equipment: ["bodyweight"],
  limitations: [],
};

export default function QuizContainer({
  onComplete,
}: {
  onComplete: (answers: QuizAnswers) => void;
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(DEFAULT_ANSWERS);

  const canContinue = step !== 4 || answers.equipment.length > 0;

  const goNext = () => {
    if (!canContinue) return;
    if (step === TOTAL_STEPS) {
      onComplete(answers);
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="mx-auto max-w-2xl">
      <QuizProgressBar step={step} totalSteps={TOTAL_STEPS} />

      <div key={step} className="animate-fade-slide-in rounded-xl border border-border bg-surface p-6 sm:p-8">
        {step === 1 && (
          <GoalStep value={answers.goal} onChange={(goal) => setAnswers((a) => ({ ...a, goal }))} />
        )}
        {step === 2 && (
          <ExperienceStep
            value={answers.experience}
            onChange={(experience) => setAnswers((a) => ({ ...a, experience }))}
          />
        )}
        {step === 3 && (
          <DaysStep
            value={answers.daysPerWeek}
            onChange={(daysPerWeek) => setAnswers((a) => ({ ...a, daysPerWeek }))}
          />
        )}
        {step === 4 && (
          <EquipmentStep
            value={answers.equipment}
            onChange={(equipment) => setAnswers((a) => ({ ...a, equipment }))}
          />
        )}
        {step === 5 && (
          <InjuriesStep
            value={answers.limitations}
            onChange={(limitations) => setAnswers((a) => ({ ...a, limitations }))}
          />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={goBack} disabled={step === 1}>
          Back
        </Button>
        <Button onClick={goNext} disabled={!canContinue}>
          {step === TOTAL_STEPS ? "Build My Plan" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
