import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { languages } from "@/lib/data";

export default function LanguagesPage() {
  return (
    <main className="bg-black min-h-screen text-white font-sans pt-32 pb-20 px-6 md:px-20 border-t border-white/10">
      <div className="container mx-auto max-w-7xl">
        <div className="relative pb-20 border-b border-white/10">
          <Link
            href="/#languages"
            className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Home</span>
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-green-500 font-rikafu">
              Languages of Arewa
            </h1>
            <p className="text-xl text-gray-300">
              Discover the rich linguistic heritage of Northern Nigeria. From
              the widely spoken Hausa to the distinct sounds of Tiv and Kanuri,
              explore the voices that shape our culture.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {languages.map((language) => (
            <Link
              key={language.id}
              href={`/languages/${language.slug}`}
              className="group bg-zinc-900 border border-white/10 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {language.name}
                  </h2>
                  <div className="flex items-center gap-2 text-green-400 font-medium">
                    <MessageCircle size={16} />
                    <span>&quot;{language.greeting}&quot;</span>
                    <span className="text-gray-500 text-sm">
                      ({language.meaning})
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 mb-8 flex-grow line-clamp-4">
                {language.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {language.regions.slice(0, 3).map((region, idx) => (
                  <span
                    key={idx}
                    className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-md border border-white/10"
                  >
                    {region}
                  </span>
                ))}
                {language.regions.length > 3 && (
                  <span className="bg-white/5 text-gray-500 text-xs px-3 py-1 rounded-md border border-white/10">
                    +{language.regions.length - 3} more
                  </span>
                )}
              </div>

              <div className="mt-auto flex items-center gap-2 text-green-500 font-bold text-sm tracking-wider uppercase group-hover:translate-x-2 transition-transform">
                Explore Language <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
