import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MyProgramClient from "@/app/my-program/MyProgramClient";

export const metadata: Metadata = {
  title: "My Program",
  description: "Your fully editable weekly workout program, built for quick edits and check-offs at the gym.",
};

export default function MyProgramPage() {
  return (
    <Container className="py-8 sm:py-12">
      <SectionHeading
        eyebrow="My Program"
        title="Your Weekly Program"
        description="Edit sets, reps, and exercises, reorder your days, and check off sets as you train. Everything saves to this device automatically."
      />
      <div className="mt-8">
        <MyProgramClient />
      </div>
    </Container>
  );
}
