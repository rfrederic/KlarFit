import { QuizAnswers, WorkoutPlan } from "@/lib/types";

const PLAN_KEY = "klarfit:plan";
const ANSWERS_KEY = "klarfit:quiz-answers";

function isBrowser() {
  return typeof window !== "undefined";
}

export function savePlan(plan: WorkoutPlan) {
  if (!isBrowser()) return;
  window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export function loadPlan(): WorkoutPlan | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(PLAN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as WorkoutPlan;
  } catch {
    return null;
  }
}

export function clearPlan() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(PLAN_KEY);
  window.localStorage.removeItem(ANSWERS_KEY);
}

export function saveQuizAnswers(answers: QuizAnswers) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function loadQuizAnswers(): QuizAnswers | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(ANSWERS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as QuizAnswers;
  } catch {
    return null;
  }
}
