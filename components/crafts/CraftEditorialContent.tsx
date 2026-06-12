"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Globe,
  Hammer,
  History,
  MapPin,
  Quote as QuoteIcon,
  User,
  Zap,
  Instagram,
  Linkedin,
} from "lucide-react";
import Footer from "@/components/layout/footer";
import GalleryPreview from "../media/GalleryPreview";
import RelatedCreations from "../media/RelatedCreations";

export default function CraftEditorialContent({ craft }: { craft: any }) {
  // Split description into chapters for editorial flow
  const storyChapters = craft?.fullDescription?.split("\n\n").filter(Boolean) || [];
  const galleryImages = craft?.gallery || [];

  return (
    <div className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black relative">

      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={craft.image}
            alt={craft.name}
            fill
            className="object-cover"
            priority
          />
          {/* Standard App Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#020402] z-10"></div>
        </div>

        {/* Navigation & Title */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-20 z-20">
          <Link
            href="/crafts"
            className="w-fit flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Crafts</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-green-500 text-black px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider">
                <Hammer size={14} />
                <span>{craft.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-sm font-medium border border-white/10">
                <Zap size={14} className="text-yellow-400" />
                <span>{craft.status}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-rikafu font-black tracking-tighter leading-none text-white drop-shadow-xl">
              {craft.title}
            </h1>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Main Narrative */}
          <div className="lg:col-span-8 space-y-12">
            <div className="max-w-4xl">
              {storyChapters.map((chapter: string, index: number) => (
                <div key={index} className="mb-12">
                  <p className={`text-xl leading-[1.8] text-gray-300 ${index === 0 ? 'first-letter:text-7xl first-letter:font-rikafu first-letter:text-green-500 first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-none' : ''}`}>
                    {chapter}
                  </p>

                  {/* Sibling Image injection */}
                  {index % 2 === 1 && galleryImages[Math.floor(index / 2)] && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="my-16 relative aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/5 group shadow-2xl"
                    >
                      <Image
                        src={galleryImages[Math.floor(index / 2)]}
                        alt={`Visual context for ${craft.name}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Cultural Memory</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Story Highlights */}
              {craft.quote && (
                <div className="my-20 p-12 bg-white/5 border-l-4 border-green-500 rounded-r-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <QuoteIcon size={80} className="text-green-500" />
                  </div>
                  <blockquote className="text-2xl font-serif italic text-gray-100 leading-relaxed relative z-10">
                    &ldquo;{craft.quote}&rdquo;
                  </blockquote>
                </div>
              )}

              {/* Roots & Significance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24 pt-16 border-t border-white/5">
                {/* Roots Card */}
                <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                    <History size={20} className="text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6 pt-4">
                    Roots & Origins
                  </h3>
                  <p className="text-gray-400 leading-relaxed italic">
                    {craft.history}
                  </p>
                </div>

                {/* Significance Card */}
                <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                    <Globe size={20} className="text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6 pt-4">
                    Cultural Significance
                  </h3>
                  <p className="text-gray-400 leading-relaxed italic">
                    {craft.significance}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-20 space-y-8">
              {/* Quick Facts Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-sm">
                <h3 className="text-xl text-white font-bold">Quick Facts</h3>

                {/* Info Rows */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Region</p>
                      <p className="text-white font-bold text-lg">
                        {craft.region}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                      <Hammer size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Category</p>
                      <p className="text-white font-bold text-lg">
                        {craft.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Production Timeline</p>
                      <p className="text-white font-bold text-lg">
                        {craft.timeline}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 my-4"></div>

                {/* Tools Section */}
                {craft.tools && craft.tools.length > 0 && (
                  <div>
                    <p className="text-green-400 font-bold mb-3">
                      Traditional Tools
                    </p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      {craft.tools.map((tool: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-400" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Contributor Card */}
              {craft.contributor && (
                <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-[40px] pointer-events-none"></div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 shrink-0 shadow-lg overflow-hidden">
                      {craft.contributor.picture ? (
                        <Image
                          src={craft.contributor.picture}
                          alt={craft.contributor.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User size={28} />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-500 mb-1 block drop-shadow-md">
                        Story Documented By
                      </span>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {craft.contributor.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <MapPin size={12} className="text-green-500" /> {craft.contributor.region}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm italic mb-6">
                    &ldquo;{craft.contributor.story}&rdquo;
                  </p>

                  <div className="flex items-center justify-between border-t border-green-500/20 pt-4 mt-auto">
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(craft.submitted).toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-2 text-gray-400">
                      {craft.contributor.instagram && (
                        <a href={craft.contributor.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                          <Instagram size={18} />
                        </a>
                      )}
                      {craft.contributor.linkedin && (
                        <a href={craft.contributor.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- VISUAL ARCHIVE --- */}
      {galleryImages.length > 2 && (
        <section className="container mx-auto px-6 md:px-20 py-24 border-t border-white/5">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-green-500"></div>
            <h3 className="text-3xl font-rikafu font-bold text-white">Visual Legacy</h3>
          </div>
          <GalleryPreview images={galleryImages.slice(Math.floor(storyChapters.length / 2))} />
        </section>
      )}

      {/* Call-to-Action Section */}
      <section className="px-6 md:px-20 py-24 bg-zinc-900/50 border-t border-white/5 mt-24">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-green-500"></div>
            <span className="text-green-500 font-bold tracking-widest text-sm uppercase">
              Champion the Craft
            </span>
            <div className="h-[1px] w-8 bg-green-500"></div>
          </div>
          <h2 className="text-4xl font-rikafu font-bold mb-6">
            Know a forgotten craft?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Know a craft that&apos;s being forgotten? Share its story and help keep Arewa&apos;s living traditions alive.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/crafts/submit"
              className="px-8 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition"
            >
              Submit Your Story
            </Link>
            <Link
              href="/crafts"
              className="px-8 py-3 border border-white/20 text-white font-bold rounded-full hover:border-green-500 hover:text-green-400 transition"
            >
              View All Crafts
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-20 mb-24">
        <RelatedCreations searchTerm={craft.name} excludeId={craft.id} />
      </div>

      <Footer />
    </div>
  );
}
