import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  {
    number: "01",
    title: "Answer 5 Questions",
    description: "Tell us your goal, experience level, schedule, equipment, and any limitations.",
  },
  {
    number: "02",
    title: "Get Your Plan",
    description: "We build a weekly training split with sets, reps, and rest — pulled from real exercises.",
  },
  {
    number: "03",
    title: "Train & Track",
    description: "Follow along with step-by-step instructions, then download or print your plan anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-b border-border bg-surface py-20">
      <Container>
        <SectionHeading eyebrow="Simple Process" title="How It Works" align="center" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="rounded-lg border border-border bg-background p-6">
              <span className="font-display text-5xl text-accent">{step.number}</span>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
