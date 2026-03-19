"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Volume2 } from "lucide-react";
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
    
    // Play the audio and catch errors (e.g., file not found yet)
    audio.play().catch((err) => {
      console.log("Audio playback failed or file missing:", err);
      alert(`The audio file for this greeting will be added soon!`);
    });
  };

  return (
    <section className="bg-zinc-950 text-white py-24 border-t border-white/10" id="languages">
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
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Linguistic Heritage</h2>
          <p className="text-gray-400 text-lg font-sans">
            Arewa is home to hundreds of distinct languages and dialects, each carrying centuries of history, philosophy, and identity. Here are a few prominent voices of the North.
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
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{lang.name}</h3>
                    <button 
                      onClick={() => playGreeting(lang.audio)}
                      className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer hover:bg-green-500/20 hover:scale-105 active:scale-95 transition-all outline-none"
                    >
                      <Volume2 size={14} />
                      {lang.greeting}
                    </button>
                  </div>
                  <Link href={`/languages/${lang.slug}`} className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-500/10 transition-colors">
                    <ArrowRight size={24} />
                  </Link>
                </div>

                <div className="mb-4">
                  <span className="text-gray-500 text-sm uppercase tracking-wider font-bold block mb-1">Meaning</span>
                  <span className="text-gray-200 font-medium">{lang.meaning}</span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {lang.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}