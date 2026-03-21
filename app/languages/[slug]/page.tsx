import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Users, MapPin, BookOpen, MessageSquare, ArrowUpRight } from "lucide-react";
import { languages } from "@/lib/data";
import LanguageAudioButton from "@/components/LanguageAudioButton";

// Generate static paths
export function generateStaticParams() {
  return languages.map((lang) => ({ slug: lang.slug }));
}

export default async function LanguageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const language = languages.find((l) => l.slug === slug);

  if (!language) notFound();

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">

      {/* --- HERO SECTION (MATCHED TO EVENTS) --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={language.image}
            alt={language.name}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#020402] z-10"></div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-20 z-20">
          <Link
            href="/languages"
            className="w-fit flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Languages</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-black font-serif tracking-tighter leading-none">
              {language.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <LanguageAudioButton
                audioSrc={language.audio}
                greeting={language.greeting}
              />
              <span className="text-xl text-gray-300">
                ({language.meaning})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID (MATCHED TO EVENTS) --- */}
      <div className="container mx-auto px-6 md:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-10">

            {/* Overview */}
            <div className="prose prose-lg prose-invert text-gray-400">
              <h3 className="text-2xl text-white font-bold mb-4">About the Language</h3>
              <p className="text-xl leading-8 text-gray-300">
                {language.fullDescription}
              </p>
            </div>

            {/* History */}
            {language.history && (
              <div className="prose prose-lg prose-invert text-gray-400">
                <h3 className="text-2xl text-white font-bold mb-4">History & Origins</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {language.history}
                </p>
              </div>
            )}

            {/* Culture */}
            {language.culturalSignificance && (
              <div className="prose prose-lg prose-invert text-gray-400">
                <h3 className="text-2xl text-white font-bold mb-4">Cultural Significance</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {language.culturalSignificance}
                </p>
              </div>
            )}

            {/* Phrases (like Highlights) */}
            {language.commonPhrases && language.commonPhrases.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl text-white font-bold mb-6">Common Phrases</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {language.commonPhrases.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl">
                      <p className="text-green-400 font-bold text-lg mb-1">
                        {item.phrase}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {item.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR (NOW MATCHES EVENTS) */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-sm">

              {/* Speakers */}
              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Speakers</p>
                  <p className="text-white font-bold text-lg">{language.speakers}</p>
                </div>
              </div>

              {/* Regions */}
              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Regions</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {language.regions.map((region, idx) => (
                      <span key={idx} className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-md border border-white/10">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Writing System */}
              {language.writingSystem && (
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Writing System</p>
                    <p className="text-white font-bold text-lg">
                      {language.writingSystem}
                    </p>
                  </div>
                </div>
              )}

              {/* Dialects */}
              {language.dialects && language.dialects.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">Dialects</p>
                  <div className="flex flex-col gap-2">
                    {language.dialects.map((dialect, idx) => (
                      <span key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
                        {dialect}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="h-[1px] bg-white/10 my-4"></div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-3">
                {language.pdf && (
                  <a
                    href={language.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-4 rounded-xl bg-green-500 text-black border border-green-500 hover:bg-transparent hover:text-green-500 transition-all text-sm font-bold uppercase flex items-center justify-center gap-2"
                  >
                    View Book <BookOpen size={16} />
                  </a>
                )}

                <Link
                  href="/languages"
                  className="w-full px-6 py-4 rounded-xl border border-white/2 bg-white text-black hover:bg-white/90 transition-all text-sm font-bold uppercase flex items-center justify-center gap-2"
                >
                  View All Languages <ArrowUpRight size={16} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
