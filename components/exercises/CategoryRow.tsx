import Link from "next/link";
import CategoryThumb from "@/components/exercises/CategoryThumb";

function ChevronIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-muted">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CategoryRow({
  slug,
  label,
  count,
}: {
  slug: string;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={`/exercises/group/${slug}`}
      className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent hover:shadow-glow sm:p-5"
    >
      <CategoryThumb slug={slug} label={label} size={90} />
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-2xl uppercase tracking-wide text-foreground">{label}</h2>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-muted">
          {count} {count === 1 ? "Exercise" : "Exercises"}
        </p>
      </div>
      <ChevronIcon />
    </Link>
  );
}
