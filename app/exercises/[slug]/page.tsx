import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { exercises, getExerciseBySlug } from "@/data/exercises";
import { Exercise } from "@/lib/types";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Video from "@/components/ui/Video";
import ExerciseImagePlaceholder from "@/components/exercises/ExerciseImage";
import RecommendationCard from "@/components/exercises/RecommendationCard";
import { SUBGROUP_LABELS } from "@/lib/subgroups";

export function generateStaticParams() {
  return exercises.map((exercise) => ({ slug: exercise.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const exercise = getExerciseBySlug(params.slug);
  if (!exercise) return { title: "Exercise Not Found" };
  return {
    title: exercise.name,
    description: `How to perform the ${exercise.name}: target muscles, difficulty, step-by-step instructions, and common mistakes to avoid.`,
  };
}

export default function ExerciseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const exercise = getExerciseBySlug(params.slug);
  if (!exercise) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <Link href="/exercises" className="mb-8 inline-block text-sm font-semibold text-accent hover:underline">
        &larr; Back to Exercise Library
      </Link>

      {exercise.video ? (
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="font-display text-4xl uppercase tracking-wide text-foreground sm:text-5xl">
              {exercise.name}
            </h1>
            {exercise.essential && <Badge active>Essential</Badge>}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {exercise.muscleGroups.map((mg) => (
              <Badge key={mg} active>
                {mg}
              </Badge>
            ))}
            {exercise.subGroup?.map((sg) => (
              <Badge key={sg}>{SUBGROUP_LABELS[sg]}</Badge>
            ))}
            {exercise.equipment.map((eq) => (
              <Badge key={eq}>{eq}</Badge>
            ))}
            <Badge>{exercise.difficulty}</Badge>
            {exercise.audience !== "all" && <Badge active>{exercise.audience}</Badge>}
          </div>

          <Video
            src={exercise.video}
            controls
            playsInline
            className="mt-8 aspect-video w-full rounded-lg border border-border bg-surface object-cover"
          >
            Your browser doesn&apos;t support embedded video.
          </Video>

          <div className="mt-10 flex flex-col gap-10">
            <ExerciseDescription exercise={exercise} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="font-display text-4xl uppercase tracking-wide text-foreground sm:text-5xl">
                {exercise.name}
              </h1>
              {exercise.essential && <Badge active>Essential</Badge>}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {exercise.muscleGroups.map((mg) => (
                <Badge key={mg} active>
                  {mg}
                </Badge>
              ))}
              {exercise.subGroup?.map((sg) => (
                <Badge key={sg}>{SUBGROUP_LABELS[sg]}</Badge>
              ))}
              {exercise.equipment.map((eq) => (
                <Badge key={eq}>{eq}</Badge>
              ))}
              <Badge>{exercise.difficulty}</Badge>
              {exercise.audience !== "all" && <Badge active>{exercise.audience}</Badge>}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <ExerciseImagePlaceholder image={exercise.imageStart} label="Start" />
              <ExerciseImagePlaceholder image={exercise.imageEnd} label="End" />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <ExerciseDescription exercise={exercise} />
          </div>
        </div>
      )}
    </Container>
  );
}

function ExerciseDescription({ exercise }: { exercise: Exercise }) {
  return (
    <>
      <RecommendationCard exercise={exercise} />

      <section aria-labelledby="instructions-heading">
        <h2 id="instructions-heading" className="font-display text-2xl uppercase tracking-wide text-accent">
          Instructions
        </h2>
        <ol className="mt-4 flex flex-col gap-3">
          {exercise.instructions.map((step, i) => (
            <li key={i} className="flex gap-3 rounded-md border border-border bg-surface p-4">
              <span className="font-display text-xl text-accent">{i + 1}</span>
              <span className="text-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="mistakes-heading">
        <h2 id="mistakes-heading" className="font-display text-2xl uppercase tracking-wide text-accent">
          Common Mistakes
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {exercise.commonMistakes.map((mistake, i) => (
            <li key={i} className="rounded-md border border-border bg-surface p-4 text-foreground">
              {mistake}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
