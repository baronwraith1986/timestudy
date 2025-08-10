"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-red-50 to-white py-20 px-6 sm:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to the (Unofficial) Necco Time Studies
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          And yes, we&apos;re bringing courageous mutant back.{" "}
          <span className="font-semibold">Super mutants even.</span>
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/sign-up"
            className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-red-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/sign-in"
            className="px-6 py-3 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
