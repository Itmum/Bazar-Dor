"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { IAllCategory } from "@/types/bazardor";
import { toBengaliNumber } from "@/lib/utils";

interface CategorySortViewProps {
  products: IAllCategory[];
  categoryId: string;
}

export default function CategorySortView({ products }: CategorySortViewProps) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.today - b.today; // Low to High
    }
    if (sortBy === "price-desc") {
      return b.today - a.today; // High to Low
    }
    return 0; // Default order
  });

  const catName = products[0].categoryNameBn;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">
          ক্যাটাগরি: {catName}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          মোট {toBengaliNumber(products.length)}টি পণ্য রয়েছে
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm border border-gray-100">
        <span className="text-sm font-medium text-gray-600">সাজান</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-800 outline-none cursor-pointer"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="h-full block"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
