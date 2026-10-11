import CategorySortView from "@/components/CategorySortView";
import { notFound } from "next/navigation";

interface CategoryContentProps {
  params: Promise<{ categoryId: string }>;
}

async function getCategoryProducts(categoryId: string) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`API failed with status: ${res.status}`);
  }

  return await res.json();
}

export default async function CategoryContent({
  params,
}: CategoryContentProps) {
  const { categoryId } = await params;
  const products = await getCategoryProducts(categoryId);
  if (!products || products.length === 0) {
    notFound();
  }

  return <CategorySortView products={products} categoryId={categoryId} />;
}
