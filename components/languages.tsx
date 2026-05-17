"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { languages } from "@/lib/data";

export default function ArewaLanguages() {
  return (
    <section className="bg-zinc-950 text-white py-24" id="languages">
      <div className="container mx-auto px-6 md:px-20">
        {/* Header — matches events/crafts pattern */}
        <div className="mb-16 flex justify-between items-start md:items-center">
          <div>
            <span className="text-green-500 font-bold tracking-widest text-sm uppercase mb-2 block">
              Languages of Arewa
            </span>
            <h2 className="text-4xl md:text-6xl font-rikafu">Linguistic Heritage</h2>
          </div>
          <Link
            href="/languages"
            className="flex items-center gap-2 border-b border-green-500 pb-1 hover:text-green-500 transition-colors mt-6 md:mt-0 whitespace-nowrap text-sm font-medium"
          >
            View All Languages <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Cards Grid — tall overlay cards matching crafts/events style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.slice(0, 3).map((lang, index) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/languages/${lang.slug}`}>
                <div className="group relative h-[450px] w-full bg-zinc-900 font-sans rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-green-500/50 transition-all duration-300">
                  {/* Background Image */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <Image
                      src={lang.image}
                      alt={lang.name}
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
                      <span>&quot;{lang.greeting}&quot;</span>
                    </div>

                    {/* Speakers */}
                    <div className="mb-3">
                      <span className="text-sm font-medium tracking-wider uppercase text-green-400">
                        {lang.speakers}
                      </span>
                    </div>

                    {/* Language Name */}
                    <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-green-500 transition-colors drop-shadow-md">
                      {lang.name}
                    </h3>

                    {/* Description + Arrow */}
                    <div className="flex items-end justify-between pt-4 border-t border-white/10">
                      <p className="text-gray-400 text-sm line-clamp-2 flex-1 mr-4 leading-relaxed">
                        {lang.description}
                      </p>
                      <ArrowUpRight
                        size={20}
                        className="text-green-500 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
