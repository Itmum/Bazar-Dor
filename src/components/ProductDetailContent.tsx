import { toBengaliNumber } from "@/lib/utils";
import { ISingleProduct } from "@/types/bazardor";
import Link from "next/link";
import { notFound } from "next/navigation";
interface ProductDetailContentProps {
  params: Promise<{ id: string }>;
}
async function getSingleProduct(id: string): Promise<ISingleProduct | null> {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return null;
  }

  return await res.json();
}
const ProductDetailContent = async ({ params }: ProductDetailContentProps) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    notFound();
  }
  return (
    <div className="space-y-6">
      {/* Breadcrumb / Back */}
      <div className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          হোম
        </Link>{" "}
        &gt;{" "}
        <span className="hover:underline">
          {product.categoryNameBn || product.category}
        </span>{" "}
        &gt; <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      {/* Top Banner Card */}
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-4xl">
            <span>{product.categoryIcon || "🛒"}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              প্রতি কেজি · {product.categoryNameBn || product.category}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              গতকালের তুলনায় আজ দাম{" "}
              {product.change?.dir === "up" ? "বেড়েছে" : "কমেছে"} ·{" "}
              {product.change?.amt || 0} টাকা
            </p>
          </div>
        </div>

        {/* Today's Price Highlight Badge */}
        <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 text-right min-w-[140px]">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-bold text-gray-900">
            {product.today} টাকা
          </p>
          <p
            className={`text-xs mt-1 ${product.change?.dir === "up" ? "text-red-500" : "text-green-500"}`}
          >
            {product.change?.dir === "up" ? "▲" : "▼"}{" "}
            {toBengaliNumber(product.change?.pct || 0)}%
          </p>
        </div>
      </div>

      {/* Summary Cards Section (দামের সারাংশ) */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">দামের সারাংশ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Min Price */}
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-xl font-bold text-green-600 mt-1">
              {product.minPrice?.price || 0} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {product.minPrice?.market || "সবচেয়ে কম দামের বাজার"}
            </p>
          </div>

          {/* Max Price */}
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
            <p className="text-xl font-bold text-red-500 mt-1">
              {product.maxPrice?.price || 0} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {product.maxPrice?.market || "সবচেয়ে বেশি দামের বাজার"}
            </p>
          </div>

          {/* Average Price */}
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {product.avgPrice || product.today} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">প্রতি কেজি-এর হিসাবে</p>
          </div>
        </div>
      </div>

      {/* Market Breakdown Table (বাজারভিত্তিক আজকের দাম) */}
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-lg font-bold text-gray-800">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
                <th className="py-3 px-4 font-medium">বাজার</th>
                <th className="py-3 px-4 font-medium">বিভাগ</th>
                <th className="py-3 px-4 font-medium">সর্বনিম্ন</th>
                <th className="py-3 px-4 font-medium">সর্বাধিক</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {product.markets?.map((m, index) => (
                <tr key={index} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {m.market}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{m.division}</td>
                  <td className="py-3 px-4 text-gray-900">
                    {toBengaliNumber(m.min)} টাকা
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {toBengaliNumber(m.max)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;
