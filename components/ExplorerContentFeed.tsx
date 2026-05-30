"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, BookOpen, Image as ImageIcon, MapPin, ExternalLink } from "lucide-react";
import { ExplorerContent } from "@/lib/data";
import VideoModal from "@/components/VideoModal";

interface ExplorerContentFeedProps {
  createdContent: ExplorerContent[];
  explorerName: string;
}

export default function ExplorerContentFeed({ createdContent, explorerName }: ExplorerContentFeedProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const [activeVideoTitle, setActiveVideoTitle] = useState("");
  const [activeVideoCreator, setActiveVideoCreator] = useState("");

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

          const isVideo = content.type === "video";
          const handleContentClick = (e: React.MouseEvent) => {
            if (isVideo) {
              e.preventDefault();
              setActiveVideoUrl(content.link);
              setActiveVideoTitle(content.title);
              setActiveVideoCreator(explorerName);
              setIsVideoOpen(true);
            }
          };

          return (
            <div
              key={content.id}
              className="group flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-zinc-950 border border-white/5 hover:border-green-500/20 hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-300"
            >
              {/* Content Thumbnail */}
              <div className="relative w-full md:w-60 h-44 md:h-36 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                <Image
                  src={content.thumbnail}
                  alt={content.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 240px"
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

                {/* Action Link */}
                <Link
                  href={content.link}
                  onClick={handleContentClick}
                  target={content.link.startsWith("http") && !isVideo ? "_blank" : undefined}
                  rel={content.link.startsWith("http") && !isVideo ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 text-xs font-bold text-green-500 hover:text-green-400 uppercase tracking-widest transition-colors font-sans w-fit"
                >
                  {actionText}
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={activeVideoUrl}
        title={activeVideoTitle}
        creator={activeVideoCreator}
      />
    </>
  );
}
