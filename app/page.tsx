import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedExercises from "@/components/home/FeaturedExercises";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "KlarFit — Your Personalized Training Plan",
  description:
    "Build your custom weekly workout plan in minutes and explore a library of 40+ exercises with step-by-step instructions.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedExercises />
      <section className="border-t border-border bg-surface py-20">
        <Container className="text-center">
          <h2 className="font-display text-4xl uppercase tracking-wide text-foreground sm:text-5xl">
            Ready to Train <span className="text-accent">Smarter?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Your personalized plan is five questions away. No account, no credit card — just a
            plan built for you.
          </p>
          <div className="mt-8">
            <LinkButton href="/my-plan">Take the Quiz</LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
