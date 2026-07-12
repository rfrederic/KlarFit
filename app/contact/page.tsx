import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/app/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the KlarFit team with questions, feedback, or ideas.",
};

export default function ContactPage() {
  return (
    <Container className="max-w-xl py-12 sm:py-16">
      <SectionHeading eyebrow="Get In Touch" title="Contact Us" />
      <p className="mt-4 text-muted">
        Have a question, found a bug, or want to suggest an exercise? Send us a message.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </Container>
  );
}
