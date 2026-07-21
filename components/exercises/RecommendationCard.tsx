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
  // `classifyExerciseType` is a pure function of `exercise`, but Next.js's
  // static prerender of this "use client" component doesn't reliably match
  // what the same code computes once it mounts in the browser (observed as
  // a hydration-mismatch warning on any compound-lift name). Gating the
  // whole table behind `mounted` guarantees the server-rendered HTML and the
  // client's first render pass are identical (both show the skeleton), so
  // there's nothing left to mismatch — the real numbers fill in right after.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAnswers(loadQuizAnswers());
    setMounted(true);
  }, []);

  const highlightedGoal = answers ? GOAL_TO_TRAINING_GOAL[answers.goal] : undefined;
  const recommendations = mounted ? getRecommendationsForAllGoals(exercise, answers?.experience) : null;
  const isTimeBased = recommendations?.strength.isTimeBased ?? false;

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
                  {recommendations ? `${recommendations[goal].sets} × ${recommendations[goal].reps}` : "—"}
                </td>
              ))}
            </tr>
            <tr>
              {GOAL_ORDER.map((goal) => (
                <td
                  key={goal}
                  className={`p-3 text-muted ${goal === highlightedGoal ? "bg-accent/10" : ""}`}
                >
                  {recommendations ? `Rest ${recommendations[goal].restLabel}` : "Rest —"}
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
