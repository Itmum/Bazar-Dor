import { IAllCategory } from "@/types/bazardor";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Props {
  products: IAllCategory[];
}

export default function TodayIncreasedProducts({ products }: Props) {
  // Filter for items that increased in price and take top 6
  const increasedItems = products
    .filter((item) => item.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  if (increasedItems.length === 0) return null;

  return (
    <section className="py-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-red-600 text-sm">▲</span>
        <h2 className="text-xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {increasedItems.map((product) => (
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
