export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-muted ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
