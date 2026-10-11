import CategorySortView from "@/components/CategorySortView";

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

  return <CategorySortView products={products} categoryId={categoryId} />;
}
