import { IAllCategory } from "@/types/bazardor";
import { toBengaliNumber, formatUnitBn } from "@/lib/utils";

interface ProductCardProps {
  product: IAllCategory;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isNeutral = !product.change || product.change.pct === 0;
  const changePct = product.change?.pct ? Math.abs(product.change.pct) : 0;

  const iconEmoji = product.image || product.categoryIcon || "🛒";

  return (
    <div className="flex h-full items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3.5">
        {/* Emoji Icon Container */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-2xl">
          <span>{iconEmoji}</span>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 text-base leading-tight">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            প্রতি {formatUnitBn(product.unit)}
          </p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-[11px] text-gray-400">আজকের দাম</p>
        <div className="flex items-center justify-end gap-2 mt-0.5">
          <span className="text-lg font-bold text-gray-900">
            {toBengaliNumber(product.today)} টাকা
          </span>

          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
              isNeutral
                ? "bg-gray-100 text-gray-600"
                : isUp
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-600"
            }`}
          >
            <span>{isNeutral ? "—" : isUp ? "▲" : "▼"}</span>
            <span>{toBengaliNumber(changePct)}%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
