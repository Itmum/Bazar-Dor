import { Catagory } from "@/types/bazardor";
import Link from "next/link";
import React from "react";

async function getCachedCategories(): Promise<Catagory[]> {
  "use cache";

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
    );
    if (!res.ok) return [];

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

const Navlinks = async () => {
  const navs = await getCachedCategories();

  return (
    <nav className="border-t border-gray-200 mt-2">
      <div className="container mx-auto px-4">
        {/* Scrollable container on mobile, left/center aligned on larger screens */}
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-3 text-sm font-medium text-gray-800">
          {navs.map((n) => (
            <Link
              key={n.id}
              href={`/category/${n.slug}`}
              className="flex items-center gap-1.5 hover:text-[#008236] transition-colors shrink-0"
            >
              {n.icon && <span className="text-base">{n.icon}</span>}
              <span>{n.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
