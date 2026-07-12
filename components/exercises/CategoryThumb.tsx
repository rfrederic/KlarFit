/**
 * Styled placeholder for a category thumbnail. The real image slot is
 * `/category-thumbs/{slug}.jpg` (see CATEGORY_THUMB_PROMPTS.md) — once those
 * exist, swap the div below for `<Image src={`/category-thumbs/${slug}.jpg`} alt={label} fill />`.
 */
export default function CategoryThumb({
  slug,
  label,
  size = 90,
}: {
  slug: string;
  label: string;
  size?: number;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} category`}
      data-category-slug={slug}
      style={{ width: size, height: size }}
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-surface-raised to-background"
    >
      <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(215,255,30,0.15)]" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="font-display text-2xl uppercase tracking-wide text-accent/80 [text-shadow:0_0_12px_rgba(215,255,30,0.35)]"
      >
        {label.slice(0, 2)}
      </span>
    </div>
  );
}
