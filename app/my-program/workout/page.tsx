import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import WorkoutClient from "@/app/my-program/workout/WorkoutClient";

export const metadata: Metadata = {
  title: "Workout",
  description: "Log sets, rest, and move through today's exercises one at a time.",
};

export default function WorkoutPage() {
  return (
    <Container className="max-w-lg py-6 sm:py-10">
      <Suspense fallback={null}>
        <WorkoutClient />
      </Suspense>
    </Container>
  );
}
