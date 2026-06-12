"use client";

import React from "react";
import { MapPin, Calendar, Images, Instagram } from "lucide-react";
import InstagramImage from "./InstagramImage";

// Helper to extract username from Instagram URL
const getIgUsername = (url?: string) => {
  if (!url) return "";
  const cleaned = url.replace(/\/$/, "");
  const parts = cleaned.split("/");
  return parts[parts.length - 1];
};

interface InstagramSidebarProps {
  videoUrl: string;
  title?: string;
  description?: string;
  creator?: string;
  creatorImage?: string;
  isLocalCreatorImage?: boolean;
  location?: string;
  date?: string;
  credits?: {
    role: string;
    name: string;
    instagram?: string;
    image?: string;
  }[];
  resolvedImages: string[];
  btnHover: boolean;
  setBtnHover: (hover: boolean) => void;
}

export default function InstagramSidebar({
  videoUrl,
  title,
  description,
  creator,
  creatorImage,
  isLocalCreatorImage,
  location,
  date,
  credits,
  resolvedImages,
  btnHover,
  setBtnHover,
}: InstagramSidebarProps) {
  return (
    <div className="ig-modal-sidebar flex-1 w-full md:w-[320px] flex flex-col bg-zinc-950 border-t md:border-t-0 md:border-l border-white/5 overflow-y-auto md:overflow-visible">
      {/* Creator header */}
      <div className="p-4 md:p-8 border-b border-white/5 flex items-center gap-3">
        {credits && credits.length > 1 && credits[0].image && credits[1].image ? (
          <>
            {/* Overlapping Dual Avatars (Instagram Collab Style) */}
            <div className="relative w-14 h-14 shrink-0">
              {/* First Avatar (Mary) - top-left */}
              <div
                className="absolute top-0 left-0 w-9 h-9 rounded-full z-10"
                style={{
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  padding: "1.5px",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border border-zinc-950">
                  <InstagramImage
                    src={credits[0].image!}
                    alt={credits[0].name}
                    isLocal={credits[0].image!.startsWith("/images/")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Second Avatar (Dabelle) - bottom-right */}
              <div
                className="absolute bottom-0 right-0 w-9 h-9 rounded-full z-20 border-2 border-zinc-950"
                style={{
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  padding: "1.5px",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border border-zinc-950">
                  <InstagramImage
                    src={credits[1].image!}
                    alt={credits[1].name}
                    isLocal={credits[1].image!.startsWith("/images/")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 leading-none">
                <a
                  href={credits[0].instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-400 font-bold text-xs transition-colors"
                >
                  {getIgUsername(credits[0].instagram)}
                </a>
                <span className="text-zinc-500 text-xs">•</span>
                <a
                  href={credits[1].instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-400 font-bold text-xs transition-colors"
                >
                  {getIgUsername(credits[1].instagram)}
                </a>
              </div>
              <span className="text-green-500 font-bold tracking-widest text-[9px] uppercase block mt-1.5">
                Explorers - Visit Arewa
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Instagram gradient ring with explorer profile image */}
            <div
              className="w-12 h-12 rounded-full shrink-0 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                padding: "2px",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950">
                {creatorImage ? (
                  <InstagramImage
                    src={creatorImage}
                    alt={creator || "Explorer"}
                    isLocal={isLocalCreatorImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Instagram size={15} className="text-white" />
                  </div>
                )}
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate">{creator || "Instagram Creator"}</p>
              <span className="text-green-500 font-bold tracking-widest text-[10px] uppercase">
                Explorers - Visit Arewa
              </span>
            </div>
          </>
        )}
      </div>

      {/* Scrollable body */}
      <div
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 modal-sidebar-scroll"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#27272a transparent" }}
      >
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold font-serif tracking-wide text-white leading-tight mb-3">
            {title || "Untitled Creation"}
          </h3>
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              {description}
            </p>
          )}
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2">
          {location && (
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full font-sans">
              <MapPin size={10} className="text-green-500" />
              {location}
            </span>
          )}
          {date && (
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full font-sans">
              <Calendar size={10} className="text-zinc-500" />
              {date}
            </span>
          )}
          {resolvedImages.length > 1 && (
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full font-sans">
              <Images size={10} className="text-zinc-500" />
              {resolvedImages.length} photos
            </span>
          )}
        </div>

        {/* Credit Text */}
        {credits && credits.length > 0 ? (
          <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
            <span className="text-zinc-500 text-[10px] font-sans tracking-widest uppercase block mb-1">
              Co-creators:
            </span>
            {credits.map((credit, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-sans">
                <span className="text-zinc-400 font-medium">{credit.role}</span>
                {credit.instagram ? (
                  <a
                    href={credit.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-green-400 font-extrabold transition-colors flex items-center gap-1"
                  >
                    {credit.name}
                  </a>
                ) : (
                  <span className="text-white font-extrabold">{credit.name}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          creator && (
            <div className="text-zinc-500 text-[10px] font-sans tracking-widest uppercase mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              <span>Credit:</span>
              <span className="text-white font-extrabold">{creator}</span>
            </div>
          )
        )}
      </div>

      {/* Footer CTA */}
      <div className="p-6 md:p-8 border-t border-white/5 shrink-0">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="w-full flex items-center justify-center gap-2.5 bg-white/5 hover:bg-green-500 text-white hover:text-black border border-white/10 hover:border-green-500 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer"
        >
          <Instagram
            size={14}
            className={`transition-all duration-300 ${btnHover ? "scale-120 rotate-12 text-black" : "text-zinc-400"
              }`}
          />
          <span className="transition-all duration-200">
            {btnHover
              ? credits && credits.length > 1
                ? "Follow the Explorers ❤️"
                : "Follow the Explorer ❤️"
              : credits && credits.length > 1
                ? "Follow the Explorers"
                : "Follow the Explorer"}
          </span>
        </a>
      </div>
    </div>
  );
}
