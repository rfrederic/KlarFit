import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ExercisesPageClient from "@/app/exercises/ExercisesPageClient";

export const metadata: Metadata = {
  title: "Exercise Library",
  description:
    "Browse 228 exercises by category, each with step-by-step instructions and common mistakes to avoid.",
};

export default function ExercisesPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Exercise Library"
        title="Every Move, Done Right"
        description="Browse by muscle group, or search across the whole library."
      />
      <div className="mt-10">
        <ExercisesPageClient />
      </div>
    </Container>
  );
}
