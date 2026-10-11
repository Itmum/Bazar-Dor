import Image from "next/image";
import Link from "next/link";
import Navlinks from "./Navlinks";
import Marquee from "./Marquee";

async function getCachedDate() {
  "use cache";
  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });
}

export default async function Header() {
  const date = await getCachedDate();

  return (
    <header className="border-b border-gray-200 bg-white py-3 shadow-sm">
      <div className="container mx-auto flex flex-row items-center justify-between px-4">
        {/* Left Side: Logo and Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008236] text-white shadow-md">
            <Image
              className="h-7 w-7 object-contain filter brightness-0 invert"
              height={28}
              width={28}
              src="/logo-icon.png"
              alt="বাজার দর Logo"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              বাজার দর
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-500">{date}</p>
          </div>
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[#008236] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#006d2d] transition-colors"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <Navlinks></Navlinks>
      <Marquee></Marquee>
    </header>
  );
}
