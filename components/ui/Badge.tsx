export default function Badge({
  children,
  active = false,
  className = "",
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-surface text-muted"
      } ${className}`}
    >
      {children}
    </span>
  );
}
