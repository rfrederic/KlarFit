import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="hidden border-t border-border bg-surface md:block">
      <Container className="flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} KlarFit. Train smart, stay
          consistent.
        </p>
        <nav aria-label="Footer" className="flex gap-6">
          <Link href="/exercises" className="hover:text-accent">
            Exercises
          </Link>
          <Link href="/my-plan" className="hover:text-accent">
            My Plan
          </Link>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
