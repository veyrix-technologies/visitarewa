import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { languages } from "@/lib/data";

export const metadata = {
  title: "Languages of Arewa | Visit Arewa",
  description:
    "Discover the rich linguistic heritage of Northern Nigeria — from Hausa and Fulfulde to Kanuri, Tiv, Nupe, and Gbagyi.",
};

export default function LanguagesPage() {
  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Hero Section */}
      <div className="relative py-20 px-6 md:px-20 border-b border-white/10">
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

      {/* Grid Section */}
      <div className="container mx-auto px-6 md:px-20 py-20 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {languages.map((language) => (
            <Link key={language.id} href={`/languages/${language.slug}`}>
              <div className="group relative h-[450px] w-full bg-zinc-900 font-sans rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-green-500/50 transition-all duration-300">
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <Image
                    src={language.image}
                    alt={language.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/50 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 px-6 pt-6 pb-4 flex flex-col justify-end z-10">
                  {/* Greeting badge top-left */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-green-400 text-sm font-medium">
                    <MessageCircle size={14} />
                    <span>&quot;{language.greeting}&quot;</span>
                  </div>

                  {/* Speakers */}
                  <div className="mb-3">
                    <span className="text-sm font-medium tracking-wider uppercase text-green-400">
                      {language.speakers}
                    </span>
                  </div>

                  {/* Language Name */}
                  <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-green-500 transition-colors drop-shadow-md">
                    {language.name}
                  </h3>

                  {/* Description + Arrow */}
                  <div className="flex items-end justify-between pt-4 border-t border-white/10">
                    <p className="text-gray-400 text-sm line-clamp-2 flex-1 mr-4 leading-relaxed">
                      {language.description}
                    </p>
                    <ArrowUpRight
                      size={20}
                      className="text-green-500 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

