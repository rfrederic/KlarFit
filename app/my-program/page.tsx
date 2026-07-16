import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import MyProgramClient from "@/app/my-program/MyProgramClient";

export const metadata: Metadata = {
  title: "My Program",
  description: "Your fully editable weekly workout program, built for quick edits and check-offs at the gym.",
};

export default function MyProgramPage() {
  return (
    <Container className="py-6 sm:py-12">
      <MyProgramClient />
    </Container>
  );
}
