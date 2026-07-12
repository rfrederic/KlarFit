import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MyPlanClient from "@/app/my-plan/MyPlanClient";

export const metadata: Metadata = {
  title: "My Plan",
  description:
    "Answer a few quick questions and get a personalized weekly workout plan built from our exercise library.",
};

export default function MyPlanPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="My Plan"
        title="Build Your Weekly Plan"
        description="Answer five quick questions and we'll generate a training split tailored to your goal, experience, and equipment."
        align="center"
      />
      <div className="mt-10">
        <MyPlanClient />
      </div>
    </Container>
  );
}
