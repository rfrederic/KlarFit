import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { exercises } from "@/data/exercises";
import { CATEGORIES, getCategoryBySlug, exercisesInCategory } from "@/lib/categories";
import Container from "@/components/ui/Container";
import CategoryDetailClient from "@/app/exercises/group/[slug]/CategoryDetailClient";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Category Not Found" };
  const count = exercisesInCategory(category, exercises).length;
  return {
    title: `${category.label} Exercises`,
    description: `${count} ${category.label.toLowerCase()} exercises with step-by-step instructions and common mistakes to avoid.`,
  };
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <CategoryDetailClient categorySlug={category.slug} />
    </Container>
  );
}
