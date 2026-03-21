"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Volume2 } from "lucide-react";
import Link from "next/link";
import { languages } from "@/lib/data";

export default function ArewaLanguages() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playGreeting = (audioSrc: string) => {
    if (!audioSrc) return;

    // Stop currently playing audio before starting a new one
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    audio.play().catch((err) => {
      console.log("Audio playback failed or file missing:", err);
      alert(`The audio file for this greeting will be added soon!`);
    });
  };

  return (
    <section className="bg-zinc-950 text-white py-24" id="languages">
      <div className="container mx-auto px-6 md:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-green-500"></div>
            <span className="text-green-500 font-bold tracking-widest text-sm uppercase">
              Languages of the North
            </span>
            <div className="h-[1px] w-8 bg-green-500"></div>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif mb-6">
            Linguistic Heritage
          </h2>

          <p className="text-gray-400 text-lg font-sans">
            Arewa is home to hundreds of distinct languages and dialects, each
            carrying centuries of history, philosophy, and identity. Here are a
            few prominent voices of the North.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-green-500/50 transition-colors duration-300 overflow-hidden font-sans"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <Link
                key={lang.id}
                href={`/languages/${lang.slug}`}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {lang.name}
                      </h2>
                      <div className="flex items-center gap-2 text-green-400 font-medium">
                        <MessageCircle size={16} />
                        <span>&quot;{lang.greeting}&quot;</span>
                        <span className="text-gray-500 text-sm line-clamp-1">
                          ({lang.meaning})
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/languages/${lang.slug}`}
                    className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-500/10 transition-colors"
                  >
                    <ArrowRight size={24} />
                  </Link>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {lang.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <div className="flex justify-end">
            <Link
              href="/languages"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-500 text-black font-bold uppercase tracking-wider text-sm hover:bg-transparent hover:text-green-500 border border-green-500 transition-all duration-300"
            >
              View All Languages
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
