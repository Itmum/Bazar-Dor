import Hero from "@/components/Hero";
import TodayIncreasedProducts from "@/components/TodayIncreasedProducts";
import TodayDecreasedProduct from "@/components/TodayDecreasedProduct";
import AllProducts from "@/components/AllProducts";
import { IAllCategory } from "@/types/bazardor";

async function getProducts(): Promise<IAllCategory[]> {
  "use cache";
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
export default async function Home() {
  const products = await getProducts();
  return (
    <main className=" bg-[#f4f7f4]/50 min-h-screen">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <Hero></Hero>
        <TodayIncreasedProducts products={products} />
        <TodayDecreasedProduct products={products} />
        <AllProducts products={products} />
      </div>
    </main>
  );
}
