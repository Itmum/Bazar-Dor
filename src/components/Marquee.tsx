import { IAllCategory } from "@/types/bazardor";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

// Helper to convert numbers to Bengali digits
function toBengaliNumber(num: number | string): string {
  const bnDigits: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
    ".": ".",
  };
  return num
    .toString()
    .split("")
    .map((char) => bnDigits[char] || char)
    .join("");
}

async function getcachedMarquee(): Promise<IAllCategory[]> {
  "use cache";
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Failed to fetch marquee products:", error);
    return [];
  }
}

const Marquee = async () => {
  const marquee: IAllCategory[] = await getcachedMarquee();

  return (
    <div className="border-y border-gray-200 bg-[#f8f9fa] text-gray-800 text-sm overflow-hidden py-2">
      <MarqueeText direction="left" duration={35} className="flex items-center">
        {marquee.map((item) => {
          const isUp = item.change?.dir === "up";
          const changePct = item.change?.pct ? Math.abs(item.change.pct) : 0;

          return (
            <div
              key={item.id}
              className="flex items-center gap-2 px-4 border-r border-gray-200 shrink-0 whitespace-nowrap"
            >
              {item.categoryIcon && (
                <span className="text-base">{item.categoryIcon}</span>
              )}

              <span className="font-semibold text-gray-900">{item.nameBn}</span>

              <span className="text-gray-600">
                {toBengaliNumber(item.today)} টাকা/{item.unit}
              </span>

              {item.change && (
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    isUp ? "text-red-600" : "text-emerald-600"
                  }`}
                >
                  <span>{isUp ? "▲" : "▼"}</span>
                  <span>{toBengaliNumber(changePct)}%</span>
                </span>
              )}
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
