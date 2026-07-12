import { exercises } from "@/data/exercises";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ExerciseGrid from "@/components/exercises/ExerciseGrid";
import { LinkButton } from "@/components/ui/Button";

const FEATURED_SLUGS = [
  "barbell-back-squat",
  "pull-up",
  "dumbbell-bench-press",
  "dumbbell-shoulder-press",
  "romanian-deadlift",
  "plank",
];

export default function FeaturedExercises() {
  const featured = FEATURED_SLUGS.map((slug) => exercises.find((e) => e.slug === slug)).filter(
    (e): e is (typeof exercises)[number] => Boolean(e)
  );

  return (
    <section className="bg-background py-20">
      <Container>
        <SectionHeading
          eyebrow="Exercise Library"
          title="Featured Exercises"
          description="A taste of the 40+ exercises in the library, each with full instructions and common mistakes to avoid."
        />
        <div className="mt-10">
          <ExerciseGrid exercises={featured} />
        </div>
        <div className="mt-10 text-center">
          <LinkButton href="/exercises" variant="secondary">
            View Full Library
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
