"use client";

import { useEffect, useState } from "react";
import { QuizAnswers, WorkoutPlan } from "@/lib/types";
import { generatePlan } from "@/lib/planGenerator";
import { clearPlan, loadPlan, savePlan, saveQuizAnswers } from "@/lib/storage";
import QuizContainer from "@/components/quiz/QuizContainer";
import WeeklyPlanView from "@/components/plan/WeeklyPlanView";

export default function MyPlanClient() {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPlan(loadPlan());
    setLoaded(true);
  }, []);

  const handleComplete = (answers: QuizAnswers) => {
    const generated = generatePlan(answers);
    saveQuizAnswers(answers);
    savePlan(generated);
    setPlan(generated);
  };

  const handleRetake = () => {
    clearPlan();
    setPlan(null);
  };

  if (!loaded) return null;

  return plan ? (
    <WeeklyPlanView plan={plan} onRetake={handleRetake} />
  ) : (
    <QuizContainer onComplete={handleComplete} />
  );
}
