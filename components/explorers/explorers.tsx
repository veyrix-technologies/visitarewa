"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, BookOpen, Image as ImageIcon, ArrowRight, MapPin, Compass, ArrowUpRight } from "lucide-react";
import { explorers } from "@/lib/data";
import MediaModal from "@/components/media/MediaModal";
import InstagramImage from "@/components/media/InstagramImage";
import SafeRikafuText from "@/components/layout/SafeRikafuText";

export default function ArewaExplorers() {
  const data = explorers || [];
  const [activeExplorer, setActiveExplorer] = useState(data[0]);
  const [activeCreation, setActiveCreation] = useState<any>(null);

  if (data.length === 0) return null;

  return (
    <section className="bg-black text-white py-24 px-6 md:px-20 border-t border-white/5" id="explorers">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-green-500 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
              <Compass className="animate-spin-slow w-4 h-4 text-green-500" />
              Arewa Chronicles
            </span>
            <h2 className="text-4xl md:text-6xl font-rikafu mt-2">
              The Explorers
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl font-sans text-sm md:text-base leading-relaxed">
              Meet the modern storytellers, filmmakers, and writers traveling across the Savannah to document the sights, sounds, and traditions of Arewa.
            </p>
          </div>
          <Link
            href="/explorers"
            className="flex items-center gap-2 border-b border-green-500 pb-1 hover:text-green-500 transition-colors mt-6 md:mt-0"
          >
            View All Explorers <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Main Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Explorer Selectors (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            {data.map((explorer) => (
              <div
                key={explorer.id}
                onClick={() => setActiveExplorer(explorer)}
                className={`group cursor-pointer p-6 rounded-2xl transition-all font-sans duration-300 border flex gap-4 items-center ${activeExplorer.id === explorer.id
                  ? "bg-white/5 border-green-500/50 shadow-2xl shadow-green-500/5"
                  : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10"
                  }`}
              >
                {/* Profile Pic */}
                {explorer.collaborator ? (
                  <div className="relative w-16 h-16 shrink-0">
                    <div className="absolute top-0 left-0 w-11 h-11 rounded-xl overflow-hidden border border-zinc-950 z-10">
                      <InstagramImage
                        src={explorer.image}
                        alt={explorer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-11 h-11 rounded-xl overflow-hidden border border-zinc-950 z-20 shadow-md">
                      <InstagramImage
                        src={explorer.collaborator.image || "/images/explorers/shewandersfar/dabelle_profile.jpg"}
                        alt={explorer.collaborator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <InstagramImage
                      src={explorer.image}
                      alt={explorer.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-lg font-bold truncate transition-colors ${activeExplorer.id === explorer.id ? "text-green-400" : "text-white group-hover:text-green-400"
                        }`}
                    >
                      {explorer.collaborator ? `${explorer.name} & ${explorer.collaborator.name}` : explorer.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-xs truncate mt-0.5">
                    {explorer.collaborator ? `${explorer.role.split(" & ")[0]} & ${explorer.collaborator.role} Duo` : explorer.role}
                  </p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-1 flex items-center gap-1">
                    <MapPin size={10} className="text-green-500" />
                    {explorer.origin}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Active Explorer Showcase (7 columns) */}
          <div className="lg:col-span-7 bg-zinc-950 border border-white/5 rounded-3xl p-8 lg:p-10 relative overflow-hidden min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExplorer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Explorer Top Profile Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    {activeExplorer.collaborator ? (
                      <div className="relative w-20 h-20 shrink-0">
                        <div className="absolute top-0 left-0 w-14 h-14 rounded-2xl overflow-hidden border border-zinc-950 z-10">
                          <InstagramImage
                            src={activeExplorer.image}
                            alt={activeExplorer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute bottom-0 right-0 w-14 h-14 rounded-2xl overflow-hidden border border-zinc-950 z-20 shadow-lg">
                          <InstagramImage
                            src={activeExplorer.collaborator.image || "/images/explorers/shewandersfar/dabelle_profile.jpg"}
                            alt={activeExplorer.collaborator.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                        <InstagramImage
                          src={activeExplorer.image}
                          alt={activeExplorer.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold tracking-wide text-white">
                        {activeExplorer.collaborator ? `${activeExplorer.name} & ${activeExplorer.collaborator.name}` : activeExplorer.name}
                      </h3>
                      <p className="text-green-400 text-sm font-sans font-medium">
                        {activeExplorer.collaborator ? `${activeExplorer.role.split(" & ")[0]} & ${activeExplorer.collaborator.role} Duo` : activeExplorer.role}
                      </p>
                      <p className="text-gray-400 text-xs font-sans mt-1 flex items-center gap-1">
                        <MapPin size={12} className="text-green-500" />
                        {activeExplorer.origin}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/explorers/${activeExplorer.slug}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-green-500 text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-green-400 active:scale-95 transition-all text-center"
                  >
                    View Profile
                  </Link>
                </div>

                {/* Brief Quote or Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed pl-4 border-l-2 border-green-500 font-sans">
                  {activeExplorer.shortDescription}
                </p>

                {/* Created Content Section */}
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-sans">
                    Featured Creations
                  </h4>
                  <div className="space-y-4">
                    {activeExplorer.createdContent.slice(0, 2).map((content) => {
                      // Get Content Icon
                      let Icon = ImageIcon;
                      if (content.type === "video") Icon = Play;
                      if (content.type === "article") Icon = BookOpen;

                      const isExternal = content.link && (content.link.startsWith("http://") || content.link.startsWith("https://"));
                      const handleContentClick = (e: React.MouseEvent) => {
                        if (isExternal) {
                          e.preventDefault();
                          setActiveCreation({
                            link: content.link,
                            title: content.title,
                            creatorName: activeExplorer.name,
                            creatorImage: activeExplorer.image,
                            thumbnail: content.thumbnail,
                            description: content.description,
                            location: content.locationFeatured,
                            date: content.date,
                            credits: content.credits,
                            type: content.type,
                            images: content.images,
                          });
                        }
                      };

                      return (
                        <Link
                          key={content.id}
                          href={content.link}
                          onClick={handleContentClick}
                          className="group/item flex gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-green-500/20 transition-all duration-300"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                            <InstagramImage
                              src={content.thumbnail}
                              alt={content.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                            />
                            {/* Type overlay badge on hover */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <Icon className="w-5 h-5 text-green-400" />
                            </div>
                          </div>

                          {/* Content Text Info */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-green-500/10 text-green-400 flex items-center gap-1 font-sans">
                                  <Icon size={8} />
                                  {content.type}
                                </span>
                                {content.locationFeatured && (
                                  <span className="text-[10px] text-gray-500 font-sans truncate">
                                    {content.locationFeatured}
                                  </span>
                                )}
                              </div>
                              <h5 className="text-white font-bold text-sm sm:text-base truncate mt-1 group-hover/item:text-green-400 transition-colors">
                                {content.title}
                              </h5>
                            </div>
                            <p className="text-gray-400 text-xs line-clamp-1 mt-1 font-sans">
                              {content.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                    {activeExplorer.createdContent.length > 2 && (
                      <div className="pt-2 flex justify-end">
                        <Link
                          href={`/explorers/${activeExplorer.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-green-500 hover:text-green-400 uppercase tracking-widest transition-colors font-sans"
                        >
                          See All Creations ({activeExplorer.createdContent.length}) <ArrowRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <MediaModal
        isOpen={!!activeCreation}
        onClose={() => setActiveCreation(null)}
        videoUrl={activeCreation?.link || ""}
        title={activeCreation?.title}
        creator={activeCreation?.creatorName}
        creatorImage={activeCreation?.creatorImage}
        thumbnailUrl={activeCreation?.thumbnail}
        description={activeCreation?.description}
        location={activeCreation?.location}
        date={activeCreation?.date}
        credits={activeCreation?.credits}
        contentType={activeCreation?.type}
        images={activeCreation?.images}
      />
    </section>
  );
}
