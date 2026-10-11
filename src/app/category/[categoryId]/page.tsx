import CategoryContent from "@/components/CategoryContent";
import { Suspense } from "react";

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <main className="container mx-auto px-4 py-6">
      <Suspense fallback={<p className="text-center py-10">লোড হচ্ছে...</p>}>
        <CategoryContent params={params} />
      </Suspense>
    </main>
  );
}
