import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[#f4f7f4]">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center space-y-6">
        {/* Error Code / Icon */}
        <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-3xl bg-red-50 text-red-500 text-3xl font-extrabold border border-red-100">
          404
        </div>

        {/* Text Messages */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            পৃষ্ঠাটি পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-500">
            আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা এটি অস্তিত্বহীন।
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link
            href="/"
            className="inline-block w-full rounded-xl bg-[#008236] hover:bg-[#006e2e] text-white py-3 text-sm font-medium transition-colors shadow-sm text-center"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>

      {/* Footer subtle text */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          বাজার দর অ্যাপ্লিকেশান · সকল অধিকার সংরক্ষিত
        </p>
      </div>
    </main>
  );
};

export default NotFound;
