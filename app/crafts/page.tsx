"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { crafts } from "@/lib/data";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

export default function CraftsPage() {

  return (
    <main className="bg-[#020402] w-full min-h-screen text-white font-sans">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 md:px-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/#crafts"
              className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 mb-8"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-green-500"></div>
              <span className="text-green-500 font-bold tracking-widest text-sm uppercase">
                Cultural Preservation
              </span>
            </div>
            <h1 className="font-rikafu text-5xl md:text-7xl font-bold mb-8">
              Our Forgotten Crafts
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
              These are the stories of Arewa's most endangered traditions. They
              are fading, but they must not die. Through these pages, we
              celebrate the craftspeople keeping these arts alive and invite you
              to help preserve them for generations to come.
            </p>
          </motion.div>

          {/* Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/crafts/submit"
              className="px-8 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition"
            >
              Share Your Craft Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Crafts Grid */}
      <section id="crafts" className="px-6 md:px-20 py-12 mb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crafts.map((craft, index) => (
              <motion.div
                key={craft.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/crafts/${craft.slug}`}>
                  <div className="group relative h-[450px] w-full bg-zinc-900 font-sans rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-green-500/50 transition-all duration-300">
                    {/* Background Image */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <Image
                        src={craft.image}
                        alt={craft.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        quality={75}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-500" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 px-6 pt-6 pb-4 flex flex-col justify-end z-10">
                      {/* Status + Featured badges */}
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
                            craft.status === "Active"
                              ? "bg-green-500 text-black"
                              : "bg-yellow-400 text-black"
                          }`}
                        >
                          {craft.status}
                        </span>
                        {craft.featured && (
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Region */}
                      <div className="mb-3">
                        <span className="text-sm font-medium tracking-wider uppercase text-green-400">
                          {craft.region}
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-green-500 transition-colors drop-shadow-md">
                        {craft.name}
                      </h3>

                      {/* Description + Arrow */}
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
          </div>
        </div>
      </section>

    </main>
  );
}
