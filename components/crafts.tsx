"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import { crafts } from "@/lib/data";

const MAX_CARDS = 3;

export default function CraftsShowcase() {
  const displayCrafts = crafts.slice(0, MAX_CARDS);
  const emptySlots = MAX_CARDS - displayCrafts.length;

  return (
    <section id="crafts" className="bg-black text-white py-24 overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 md:px-20 mb-16 flex justify-between items-start md:items-center">
        <div>
          <span className="text-green-500 font-bold tracking-widest text-sm uppercase mb-2 block">
            Cultural Preservation
          </span>
          <h2 className="text-4xl md:text-6xl font-rikafu">Our Forgotten Crafts</h2>
        </div>
        <Link
          href="/crafts"
          className="flex items-center gap-2 border-b border-green-500 pb-1 hover:text-green-500 transition-colors mt-6 md:mt-0 whitespace-nowrap text-sm font-medium"
        >
          Explore All Crafts <ArrowUpRight size={18} />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Real craft cards */}
          {displayCrafts.map((craft, index) => (
            <motion.div
              key={craft.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/crafts/${craft.slug}`}>
                <div className="group relative h-[450px] w-full bg-zinc-900 font-sans rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-green-500/50 transition-all duration-300">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <Image
                      src={craft.image}
                      alt={craft.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-500" />
                  </div>

                  <div className="absolute inset-0 px-6 pt-6 pb-4 flex flex-col justify-end z-10">
                    <div
                      className={`absolute top-6 left-6 text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
                        craft.status === "Active"
                          ? "bg-green-500 text-black"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {craft.status}
                    </div>

                    <div className="mb-3">
                      <span className="text-sm font-medium tracking-wider uppercase text-green-400">
                        {craft.region}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-green-500 transition-colors drop-shadow-md">
                      {craft.name}
                    </h3>

                    <div className="flex items-end justify-between pt-4 border-t border-white/10">
                      <p className="text-gray-400 text-sm line-clamp-2 flex-1 mr-4 leading-relaxed">
                        {craft.shortDescription}
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

          {/* Submit invite cards to fill empty slots */}
          {Array.from({ length: emptySlots }).map((_, i) => (
            <motion.div
              key={`empty-${i}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (displayCrafts.length + i) * 0.1 }}
            >
              <Link href="/crafts/submit">
                <div className="group h-[450px] w-full rounded-2xl border border-dashed border-green-500/30 hover:border-green-500/70 bg-green-500/5 hover:bg-green-500/10 transition-all duration-300 flex flex-col items-center justify-center gap-6 cursor-pointer px-8 text-center">
                  <div className="w-16 h-16 rounded-full border border-green-500/30 group-hover:border-green-500 flex items-center justify-center transition-colors">
                    <PlusCircle size={28} className="text-green-500/50 group-hover:text-green-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white/70 group-hover:text-white transition-colors">
                      Know a Forgotten Craft?
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                      Share your story and help preserve Arewa&apos;s endangered traditions for generations to come.
                    </p>
                  </div>
                  <span className="text-green-500 text-sm font-bold border-b border-green-500/50 pb-0.5 group-hover:border-green-500 transition-colors">
                    Submit Your Craft →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      {/* <div className="container mx-auto px-6 md:px-20 mt-16">
        <div className="border border-green-500/20 bg-green-500/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Know a forgotten craft?</h3>
            <p className="text-gray-400 text-sm">
              Help preserve Arewa&apos;s endangered traditions by sharing your story with the world.
            </p>
          </div>
          <Link
            href="/crafts/submit"
            className="whitespace-nowrap px-8 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition shrink-0"
          >
            Share Your Craft Story
          </Link>
        </div>
      </div> */}
    </section>
  );
}
