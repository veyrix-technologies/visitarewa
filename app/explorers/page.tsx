import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Compass, MapPin, Play, BookOpen, Image as ImageIcon } from "lucide-react";
import { explorers } from "@/lib/data";
import JoinExplorersForm from "@/components/JoinExplorersForm";

export const metadata = {
  title: "The Explorers | Visit Arewa",
  description:
    "Meet the documentary filmmakers, travel writers, and adventurers documenting the beauty and heritage of Arewa.",
};

export default function ExplorersPage() {
  const list = explorers || [];

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Hero Header */}
      <div className="relative py-20 px-6 md:px-20 border-b border-white/10">
        <Link
          href="/#explorers"
          className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back to Home</span>
        </Link>

        <div className="max-w-4xl">
          <span className="text-green-500 font-bold tracking-widest text-sm uppercase flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-green-500" />
            Arewa Chronicles
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-rikafu text-green-500">
            The Explorers
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Meet the visual storytellers, writers, and digital creators who are traversing Northern Nigeria, capturing its stunning landscapes, rich history, and living traditions to share with the world.
          </p>
        </div>
      </div>

      {/* Grid of Explorers */}
      <div className="container mx-auto px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((explorer) => (
            <Link key={explorer.slug} href={`/explorers/${explorer.slug}`}>
              <div className="group cursor-pointer bg-zinc-950/40 rounded-3xl border border-white/5 hover:border-green-500/30 overflow-hidden hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-300 flex flex-col h-full">
                {/* Profile Pic Card */}
                <div className="relative h-[340px] w-full overflow-hidden">
                  <Image
                    src={explorer.image}
                    alt={explorer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                  
                  {/* Origin Badge */}
                  <div className="absolute bottom-4 left-6 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <MapPin size={12} className="text-green-400" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">{explorer.origin}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-green-400 text-xs font-semibold uppercase tracking-wider block font-sans">
                      {explorer.role}
                    </span>
                    <h3 className="text-2xl font-bold font-rikafu tracking-wide text-white group-hover:text-green-400 transition-colors">
                      {explorer.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-sans">
                      {explorer.shortDescription}
                    </p>
                  </div>

                  {/* Creator Stats / Mini Icons representing content types */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-500">
                      {/* Check content types and display small indicator counts/icons */}
                      {Array.from(new Set(explorer.createdContent.map(c => c.type))).map((type, i) => {
                        let Icon = ImageIcon;
                        if (type === "video") Icon = Play;
                        if (type === "article") Icon = BookOpen;
                        return (
                          <span key={i} className="flex items-center gap-1 text-xs" title={`${type} creations`}>
                            <Icon size={12} className="text-green-500/70" />
                            <span className="capitalize text-[10px]">{type}s</span>
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-green-500 hover:text-green-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                      View Profile →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Join the Tribe Section */}
      <div className="container mx-auto px-6 md:px-20 pb-28 border-t border-white/5 pt-20">
        <JoinExplorersForm />
      </div>
    </main>
  );
}
