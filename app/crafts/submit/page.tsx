import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CraftSubmissionForm from "@/components/CraftSubmissionForm";

export const metadata = {
  title: "Share Your Craft | Visit Arewa",
  description:
    "Know a forgotten craft? Submit your story and help keep Arewa's living traditions alive for generations to come.",
};

export default function CraftSubmitPage() {
  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Hero Section */}
      <div className="relative py-20 px-6 md:px-20 border-b border-white/10">
        <Link
          href="/crafts"
          className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back to Crafts</span>
        </Link>

        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-green-500" />
            <span className="text-green-500 font-bold tracking-widest text-sm uppercase">
              Contribute Now
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-rikafu text-green-500">
            Share Your Craft Story
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Know a forgotten craft? Have a story to share about a traditional
            art? Submit your knowledge and help keep Arewa&apos;s living
            traditions alive.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-6 md:px-20 py-20 max-w-4xl">
        <CraftSubmissionForm />
      </div>
    </main>
  );
}
