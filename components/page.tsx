import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, MapPin } from "lucide-react";
import { languages } from "@/lib/data";
import LanguageAudioButton from "@/components/LanguageAudioButton";

export function generateStaticParams() {
  return languages.map((lang) => ({
    slug: lang.slug,
  }));
}

export default function LanguageDetail({ params }: { params: { slug: string } }) {
  const language = languages.find((l) => l.slug === params.slug);

  if (!language) {
    notFound();
  }

  return (
    <main className="bg-black min-h-screen text-white font-sans pt-32 pb-20 px-6 md:px-20 border-t border-white/10">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/#languages"
          className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-10 transition-colors font-bold tracking-wider text-sm uppercase"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            {language.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <LanguageAudioButton audioSrc={language.audio} greeting={language.greeting} />
            <span className="text-gray-400 font-medium tracking-wide">({language.meaning})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-4">About the Language</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{language.fullDescription}</p>
          </div>

          <div className="space-y-8 bg-zinc-900 border border-white/10 p-8 rounded-2xl h-fit">
            <div>
              <h3 className="flex items-center gap-2 text-green-500 font-bold uppercase tracking-wider text-sm mb-3"><Users size={16} /> Speakers</h3>
              <p className="text-gray-200 font-medium">{language.speakers}</p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-green-500 font-bold uppercase tracking-wider text-sm mb-3"><MapPin size={16} /> Predominant Regions</h3>
              <div className="flex flex-wrap gap-2">
                {language.regions.map((region, idx) => (
                  <span key={idx} className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-md border border-white/10">{region}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}