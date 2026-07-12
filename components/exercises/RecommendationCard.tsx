"use client";

import { useEffect, useState } from "react";
import { Exercise, QuizAnswers } from "@/lib/types";
import { loadQuizAnswers } from "@/lib/storage";
import {
  GOAL_TO_TRAINING_GOAL,
  TRAINING_GOAL_LABELS,
  TrainingGoal,
  getRecommendationsForAllGoals,
} from "@/lib/repsRecommendations";

const GOAL_ORDER: TrainingGoal[] = ["strength", "muscleGrowth", "endurance"];

export default function RecommendationCard({ exercise }: { exercise: Exercise }) {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  useEffect(() => {
    setAnswers(loadQuizAnswers());
  }, []);

  const highlightedGoal = answers ? GOAL_TO_TRAINING_GOAL[answers.goal] : undefined;
  const recommendations = getRecommendationsForAllGoals(exercise, answers?.experience);
  const isTimeBased = recommendations.strength.isTimeBased;

  return (
    <section aria-labelledby="recommendation-heading">
      <h2 id="recommendation-heading" className="font-display text-2xl uppercase tracking-wide text-accent">
        Recommended Sets &amp; {isTimeBased ? "Duration" : "Reps"}
      </h2>
      <div className="mt-4 overflow-hidden rounded-md border border-border">
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr>
              {GOAL_ORDER.map((goal) => (
                <th
                  key={goal}
                  scope="col"
                  className={`border-b border-border p-3 font-display text-xs uppercase tracking-wide ${
                    goal === highlightedGoal ? "bg-accent text-accent-foreground" : "bg-surface text-muted"
                  }`}
                >
                  {TRAINING_GOAL_LABELS[goal]}
                  {goal === highlightedGoal && <span className="ml-1 normal-case">(your goal)</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {GOAL_ORDER.map((goal) => (
                <td
                  key={goal}
                  className={`border-b border-border p-3 font-semibold text-foreground ${
                    goal === highlightedGoal ? "bg-accent/10" : ""
                  }`}
                >
                  {recommendations[goal].sets} &times; {recommendations[goal].reps}
                </td>
              ))}
            </tr>
            <tr>
              {GOAL_ORDER.map((goal) => (
                <td
                  key={goal}
                  className={`p-3 text-muted ${goal === highlightedGoal ? "bg-accent/10" : ""}`}
                >
                  Rest {recommendations[goal].restLabel}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted">
        {answers
          ? "Highlighted column matches the goal from your last quiz answers."
          : "Take the quiz on the home page to have your own goal highlighted here."}
      </p>
    </section>
  );
}
