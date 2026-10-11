"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email as string,
      password: user.password as string,
      name: user.name as string,
      image: (user.image as string) || undefined,
    });

    if (data) {
      toast.success("সাইন আপ সফল হয়েছে! মূলপাতায় নিয়ে যাওয়া হচ্ছে...");
      console.log(data);
      redirect("/");
    }

    if (error) {
      toast.error(
        error.message || "সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      );
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
    if (data) {
      toast.success("সাইন আপ সফল হয়েছে! মূলপাতায় নিয়ে যাওয়া হচ্ছে...");
      console.log(data);
      redirect("/");
    }

    if (!data) {
      toast.error("সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({ provider: "github" });
    if (data) {
      toast.success("সাইন আপ সফল হয়েছে! মূলপাতায় নিয়ে যাওয়া হচ্ছে...");
      console.log(data);
      redirect("/");
    }

    if (!data) {
      toast.error("সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[#f4f7f4]">
      {/* Page Title & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              নাম
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#008236] bg-gray-50/50"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#008236] bg-gray-50/50"
            />
          </div>

          {/* Image Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ছবি
            </label>
            <input
              name="image"
              type="url"
              //   required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#008236] bg-gray-50/50"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#008236] bg-gray-50/50"
            />
          </div>

          {/* Confirm Password Field */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder="আবার লিখুন"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#008236] bg-gray-50/50"
            />
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-[#008236] hover:bg-[#006e2e] text-white py-3 text-sm font-medium transition-colors shadow-sm cursor-pointer"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <span className="relative bg-white px-4 text-xs text-gray-400">
            অথবা
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span className="text-base">G</span> Google দিয়ে চালিয়ে যান
          </button>
          <button
            onClick={handleGithubSignIn}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span className="text-base">🐙</span> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* Switch Link */}
        <p className="text-center text-xs text-gray-500 mt-6">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-[#008236] font-medium hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Back to Home footer link */}
      <div className="mt-6">
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
