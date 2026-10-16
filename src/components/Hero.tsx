import Image from "next/image";
import Link from "next/link";

async function getFormattedDate() {
  "use cache";
  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });
}

export default async function Hero() {
  const date = await getFormattedDate();

  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-[#f4f7f4]/90 p-6 sm:p-10 md:p-12">
          <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
            {/* Left Content Area */}
            <div className="flex-1 text-left">
              {/* Date Badge */}
              <div className="inline-block rounded-full bg-[#e2f0e6] px-3.5 py-1 text-xs sm:text-sm font-medium text-[#008236]">
                {date}
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                আজকের বাজারের দাম এক নজরে
              </h1>

              <p className="mt-3 max-w-2xl text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
              </p>

              <div className="mt-6">
                <Link
                  href="#all-products"
                  className="inline-block rounded-lg bg-[#008236] px-6 py-2.5 text-sm font-medium text-white shadow-md hover:bg-[#006d2d] transition-all"
                >
                  সব পণ্য দেখুন
                </Link>
              </div>
            </div>

            {/* Right Hero Image Area */}
            <div className="relative flex justify-center items-center shrink-0 w-full md:w-auto">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর ইলাস্ট্রেশন"
                width={280}
                height={220}
                className="object-contain h-auto max-w-[220px] sm:max-w-[280px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
