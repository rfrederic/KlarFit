import { LinkButton } from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
      />
      <Container className="relative">
        <p className="font-display text-sm uppercase tracking-[0.4em] text-accent">
          Train With Purpose
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-wide text-foreground sm:text-7xl">
          Stop Guessing.
          <br />
          Start <span className="text-accent">Training Smart.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Answer five quick questions and get a personalized weekly workout plan built from a
          library of real, proven exercises — matched to your goal, your schedule, and your body.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <LinkButton href="/my-plan">Take the Quiz</LinkButton>
          <LinkButton href="/exercises" variant="secondary">
            Browse Exercises
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
