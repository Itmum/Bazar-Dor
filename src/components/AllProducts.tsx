import { IAllCategory } from "@/types/bazardor";
import ProductCard from "./ProductCard";
import { toBengaliNumber } from "@/lib/utils";
import Link from "next/link";

interface Props {
  products: IAllCategory[];
}

export default function AllProducts({ products }: Props) {
  return (
    <section className="py-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
        <p className="text-xs text-gray-500 mt-1">
          মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
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
