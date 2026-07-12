import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Offline",
};

export default function OfflinePage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">No Connection</p>
      <h1 className="mt-2 font-display text-4xl uppercase tracking-wide text-foreground sm:text-5xl">
        You&apos;re Offline
      </h1>
      <p className="mt-4 max-w-md text-muted">
        This page hasn&apos;t been saved for offline use yet. Reconnect to load it, or go back to a
        page you&apos;ve already visited those still work without a connection.
      </p>
      <div className="mt-8">
        <LinkButton href="/">Back to Home</LinkButton>
      </div>
    </Container>
  );
}
