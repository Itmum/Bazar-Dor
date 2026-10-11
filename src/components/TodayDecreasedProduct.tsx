import { IAllCategory } from "@/types/bazardor";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Props {
  products: IAllCategory[];
}

export default function TodayDecreasedProduct({ products }: Props) {
  // Filter for items that decreased in price and take top 6
  const decreasedItems = products
    .filter((item) => item.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  if (decreasedItems.length === 0) return null;

  return (
    <section className="py-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-emerald-600 text-sm">▼</span>
        <h2 className="text-xl font-bold text-gray-900">আজ দাম কমেছে</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decreasedItems.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="h-full block"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}
