"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-accent bg-accent/10 p-6 text-foreground">
        Thanks for reaching out! This is a demo form with no backend yet your message wasn&apos;t
        sent anywhere, but this is where a real submission handler would go.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground focus-visible:border-accent"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground focus-visible:border-accent"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground focus-visible:border-accent"
        />
      </div>
      <Button type="submit" className="self-start">
        Send Message
      </Button>
    </form>
  );
}
