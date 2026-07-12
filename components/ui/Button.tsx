import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-dark shadow-glow",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent hover:text-accent",
  ghost: "text-foreground hover:text-accent",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-display text-base uppercase tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
