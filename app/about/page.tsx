import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "KlarFit helps you build a personalized weekly workout plan from a library of real exercises — no guesswork, no generic templates.",
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <SectionHeading eyebrow="About Us" title="Training Plans, Without the Guesswork" />
      <div className="mt-8 flex flex-col gap-6 text-lg text-muted">
        <p>
          KlarFit exists to solve one problem: most people who want to start training don&apos;t
          know where to begin, and most workout plans online are either too generic or too
          complicated to follow. We built a tool that asks a few honest questions about your goal,
          your experience, your schedule, and your body then builds a plan around the answers.
        </p>
        <p>
          Every exercise in our library includes step-by-step instructions, the muscles it
          targets, and the mistakes most people make while doing it. Our plan generator uses clear,
          transparent rules no black box to pick a weekly split and match it to real exercises
          you can actually do with the equipment you have.
        </p>
        <p>
          No accounts, no subscriptions, no ads disguised as advice. Just answer the quiz, get your
          plan, and start training.
        </p>
      </div>
    </Container>
  );
}
