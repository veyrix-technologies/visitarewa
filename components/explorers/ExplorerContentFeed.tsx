"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, BookOpen, Image as ImageIcon, MapPin, ExternalLink } from "lucide-react";
import { ExplorerContent, explorers } from "@/lib/data";
import MediaModal from "@/components/media/MediaModal";
import InstagramImage from "@/components/media/InstagramImage";

interface ExplorerContentFeedProps {
  createdContent: ExplorerContent[];
  explorerName: string;
}

export default function ExplorerContentFeed({ createdContent, explorerName }: ExplorerContentFeedProps) {
  const [activeCreation, setActiveCreation] = useState<any>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {createdContent.map((content) => {
          let Icon = ImageIcon;
          let actionText = "View Gallery";
          if (content.type === "video") {
            Icon = Play;
            actionText = "Watch Vlog";
          }
          if (content.type === "article") {
            Icon = BookOpen;
            actionText = "Read Article";
          }

          const isExternal = content.link && (content.link.startsWith("http://") || content.link.startsWith("https://"));
          const shouldShowModal = isExternal || content.type === "video" || content.type === "gallery";
          const handleContentClick = (e: React.MouseEvent) => {
            if (shouldShowModal) {
              e.preventDefault();
              const explorer = explorers.find(el => el.name === explorerName);
              setActiveCreation({
                link: content.link,
                title: content.title,
                creatorName: explorer ? `@${explorer.slug}` : explorerName,
                creatorImage: explorer?.image,
                description: content.description,
                location: content.locationFeatured,
                date: content.date,
                thumbnail: content.thumbnail,
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
              className="group flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-zinc-950 border border-white/5 hover:border-green-500/20 hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-300 cursor-pointer text-left"
            >
              {/* Content Thumbnail */}
              <div className="relative w-full md:w-60 h-44 md:h-36 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                <InstagramImage
                  src={content.thumbnail}
                  alt={content.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-green-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 font-sans">
                    <Icon size={10} />
                    {content.type}
                  </span>
                </div>
              </div>

              {/* Content Description */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    {content.date && <span className="font-sans">{content.date}</span>}
                    {content.locationFeatured && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                        <span className="flex items-center gap-1 font-sans">
                          <MapPin size={10} className="text-green-500" />
                          {content.locationFeatured}
                        </span>
                      </>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors leading-tight mb-2">
                    {content.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 font-sans line-clamp-2">
                    {content.description}
                  </p>
                </div>

                {/* Action Link Indicator */}
                <div
                  className="inline-flex items-center gap-2 text-xs font-bold text-green-500 group-hover:text-green-400 uppercase tracking-widest transition-colors font-sans w-fit"
                >
                  {isExternal && content.type !== "video" ? "View Creation" : actionText}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <MediaModal
        isOpen={!!activeCreation}
        onClose={() => setActiveCreation(null)}
        videoUrl={activeCreation?.link || ""}
        title={activeCreation?.title}
        creator={activeCreation?.creatorName}
        creatorImage={activeCreation?.creatorImage}
        description={activeCreation?.description}
        location={activeCreation?.location}
        date={activeCreation?.date}
        thumbnailUrl={activeCreation?.thumbnail}
        credits={activeCreation?.credits}
        contentType={activeCreation?.type}
        images={activeCreation?.images}
      />
    </>
  );
}
