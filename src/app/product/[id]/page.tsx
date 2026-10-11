import ProductDetailContent from "@/components/ProductDetailContent";
import React, { Suspense } from "react";
interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  return (
    <main className="container mx-auto px-4 py-6">
      <Suspense
        fallback={
          <p className="text-center py-10">পণ্যের বিবরণ লোড হচ্ছে...</p>
        }
      >
        <ProductDetailContent params={params} />
      </Suspense>
    </main>
  );
};

export default ProductDetailPage;
