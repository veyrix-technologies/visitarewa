"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Layers, MapPin, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryPreview from "./GalleryPreview";
import { explorers } from "@/lib/data";
import MediaModal from "./MediaModal";
import InstagramImage from "./InstagramImage";
import SafeRikafuText from "../layout/SafeRikafuText";

export default function RelatedCreations({ searchTerm, excludeId }: { searchTerm: string; excludeId?: string }) {
  const { submissions, users } = useAuth();
  const [selectedCreation, setSelectedCreation] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [activeCreation, setActiveCreation] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !submissions) return null;

  // Flatten explorer content into submission-like objects
  const explorerContents = explorers.flatMap(explorer =>
    (explorer.createdContent || []).map(content => ({
      id: `exp-${content.id}`,
      type: content.type as any,
      title: content.title,
      location: content.locationFeatured || "Arewa",
      description: content.description,
      fullText: content.description,
      imageUrl: content.thumbnail,
      gallery: [],
      status: "published",
      submittedAt: content.date || "",
      userEmail: explorer.name,
      link: content.link,
      credits: content.credits,
      images: content.images,
      slug: undefined
    }))
  );

  const allSubmissions = [...submissions, ...explorerContents];

  const related = allSubmissions.filter((sub: any) => {
    if (sub.status !== "published") return false;
    if (excludeId && sub.id === excludeId) return false;

    // Filter out self-linking content pointing to the active page
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname.toLowerCase();
      if (sub.link && sub.link.toLowerCase() === pathname) return false;
      if (sub.slug && (pathname.endsWith(`/${sub.slug.toLowerCase()}`) || pathname === sub.slug.toLowerCase())) return false;
    }

    const term = searchTerm.toLowerCase();
    return (
      sub.title.toLowerCase().includes(term) ||
      sub.location.toLowerCase().includes(term) ||
      sub.description.toLowerCase().includes(term) ||
      sub.fullText.toLowerCase().includes(term)
    );
  });

  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-white/10 pt-16">
      <div className="mb-8">
        <h3 className="text-3xl text-white font-black font-rikafu tracking-wide">
          Community Stories
        </h3>
        <p className="text-gray-400 mt-2">
          Discover what creators are saying about {searchTerm}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {related.map((sub: any) => {
          const isExternal = sub.link && (sub.link.startsWith("http://") || sub.link.startsWith("https://"));
          return (
            <div
              key={sub.id}
              onClick={() => {
                if (isExternal) {
                  const creator = users.find(u => u.email.toLowerCase() === sub.userEmail.toLowerCase() || u.name.toLowerCase() === sub.userEmail.toLowerCase());
                  const explorer = explorers.find(el => el.name.toLowerCase() === sub.userEmail.toLowerCase());
                  setActiveCreation({
                    ...sub,
                    creatorName: creator ? `@${creator.username}` : (explorer ? `@${explorer.slug}` : (sub.userEmail || "Creator")),
                    creatorLink: creator?.socials?.instagram || explorer?.socials?.instagram || (sub.credits && sub.credits[0]?.instagram),
                  });
                } else if (sub.link) {
                  window.location.href = sub.link;
                } else {
                  setSelectedCreation(sub);
                }
              }}
              className="group flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-zinc-950 border border-white/5 hover:border-green-500/20 hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-300 cursor-pointer text-left"
            >
              {/* Content Thumbnail */}
              <div className="relative w-full md:w-60 h-44 md:h-36 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-zinc-900">
                {sub.imageUrl ? (
                  <InstagramImage
                    src={sub.imageUrl}
                    alt={sub.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <Layers size={32} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-green-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 font-sans">
                    {sub.type}
                  </span>
                </div>
              </div>

              {/* Content Description */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 font-mono flex-wrap">
                    {sub.submittedAt && (
                      <span className="font-sans">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </span>
                    )}
                    {sub.location && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                        <span className="flex items-center gap-1 font-sans">
                          <MapPin size={12} className="text-green-500" />
                          {sub.location}
                        </span>
                      </>
                    )}
                    {sub.userEmail && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                        <span className="flex items-center gap-1 font-sans">
                          By {(() => {
                            const creator = users.find(u => u.email.toLowerCase() === sub.userEmail.toLowerCase() || u.name.toLowerCase() === sub.userEmail.toLowerCase());
                            return creator ? `@${creator.username}` : sub.userEmail.split("@")[0];
                          })()}
                        </span>
                      </>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors leading-tight mb-2 font-sans">
                    {sub.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 font-sans line-clamp-2">
                    {sub.description}
                  </p>
                </div>

                {/* Action Indicator */}
                <div className="inline-flex items-center gap-2 text-xs font-bold text-green-500 hover:text-green-400 uppercase tracking-widest transition-colors font-sans w-fit">
                  {sub.type === "video" ? "Watch Vlog" : isExternal ? "View Creation" : "Read Full Story"}
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedCreation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedCreation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-white/10 rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto"
            >
              <button
                onClick={() => setSelectedCreation(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>

              {/* Modal Hero */}
              <div className="relative h-[40vh] w-full">
                <img
                  src={selectedCreation.imageUrl || "/images/zuma.webp"}
                  alt={selectedCreation.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 mb-3 inline-block">
                    {selectedCreation.type}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-white font-rikafu leading-tight">
                    <SafeRikafuText text={selectedCreation.title} />
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-green-500" />
                    <span>{selectedCreation.location}</span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                    <User size={16} className="text-green-500" />
                    <span>By {(() => {
                      const creator = users.find(u => u.email.toLowerCase() === selectedCreation.userEmail.toLowerCase() || u.name.toLowerCase() === selectedCreation.userEmail.toLowerCase());
                      return creator ? `@${creator.username}` : selectedCreation.userEmail;
                    })()}</span>
                  </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-sans mb-10">
                  {selectedCreation.fullText.split("\n\n").map((p: string, i: number) => (
                    <p key={i} className="mb-4">{p}</p>
                  ))}
                </div>

                {selectedCreation.gallery && selectedCreation.gallery.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-bold text-white mb-6">Gallery</h3>
                    <GalleryPreview images={selectedCreation.gallery} />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MediaModal
        isOpen={!!activeCreation}
        onClose={() => setActiveCreation(null)}
        videoUrl={activeCreation?.link || ""}
        creatorLink={activeCreation?.creatorLink}
        title={activeCreation?.title}
        creator={activeCreation?.creatorName}
        thumbnailUrl={activeCreation?.imageUrl}
        description={activeCreation?.description}
        location={activeCreation?.location}
        date={activeCreation?.submittedAt}
        credits={activeCreation?.credits}
        contentType={activeCreation?.type}
        images={activeCreation?.images}
      />
    </div>
  );
}
