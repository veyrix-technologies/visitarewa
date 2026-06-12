"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Images,
  Play,
  ExternalLink,
} from "lucide-react";
import InstagramImage from "./InstagramImage";

interface InstagramMediaViewerProps {
  loadingImages: boolean;
  contentType?: string;
  resolvedVideo: string | null;
  resolvedImages: string[];
  currentIdx: number;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
  playInline: boolean;
  setPlayInline: (play: boolean) => void;
  embedUrl: string;
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
  stripRef: React.RefObject<HTMLDivElement | null>;
}

export default function InstagramMediaViewer({
  loadingImages,
  contentType,
  resolvedVideo,
  resolvedImages,
  currentIdx,
  setCurrentIdx,
  playInline,
  setPlayInline,
  embedUrl,
  videoUrl,
  thumbnailUrl,
  title,
  stripRef,
}: InstagramMediaViewerProps) {
  if (loadingImages) {
    return (
      <div className="flex flex-col items-center gap-4 text-zinc-600">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        <span className="text-xs uppercase tracking-widest font-bold font-sans">
          Loading media…
        </span>
      </div>
    );
  }

  if (contentType === "video") {
    return (
      <>
        {/* Ambient blurred glow background */}
        <img
          src={thumbnailUrl || resolvedImages[0] || "/images/zuma.webp"}
          alt=""
          referrerPolicy="no-referrer"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
        />
        {resolvedVideo ? (
          <video
            src={resolvedVideo}
            controls
            autoPlay
            loop
            playsInline
            className="relative w-full h-full object-contain z-10"
          />
        ) : playInline ? (
          <iframe
            src={embedUrl}
            title="Instagram Video Player"
            className="relative w-full h-full border-0 z-10"
            allowFullScreen
          />
        ) : (
          /* Fallback: show cover image with play overlay if direct video stream is unavailable */
          <div className="relative w-full h-full flex items-center justify-center z-10 group">
            {thumbnailUrl ? (
              <InstagramImage
                src={thumbnailUrl}
                alt={title || "Instagram Video"}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600">
                <Play size={40} className="opacity-30" />
              </div>
            )}
            {/* Center Play Button Overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlayInline(true);
              }}
              className="absolute p-5 bg-green-500 hover:bg-green-400 text-black rounded-full hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl shadow-green-500/20 cursor-pointer flex items-center justify-center z-20 group/play"
              title="Watch Video"
            >
              <Play size={24} fill="black" className="ml-0.5 group-hover/play:scale-105 transition-transform" />
            </button>
          </div>
        )}
      </>
    );
  }

  if (resolvedImages.length > 0) {
    return (
      <>
        {/* Main image with blurred backdrop for letterboxed images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedImages[currentIdx]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            {/* Blurred background fill */}
            <img
              src={resolvedImages[currentIdx]}
              alt=""
              referrerPolicy="no-referrer"
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
            />
            {/* Crisp foreground image */}
            <img
              src={resolvedImages[currentIdx]}
              alt={title || "Instagram image"}
              referrerPolicy="no-referrer"
              className="relative w-full h-full object-contain z-10"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows — same ghost style as site buttons */}
        {resolvedImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx((p) => (p === 0 ? resolvedImages.length - 1 : p - 1));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx((p) => (p === resolvedImages.length - 1 ? 0 : p + 1));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image counter badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
              <Images size={10} className="text-green-500" />
              <span className="text-xs font-bold font-sans text-white">
                {currentIdx + 1} / {resolvedImages.length}
              </span>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-4">
              <div
                ref={stripRef as any}
                className="flex gap-2 overflow-x-auto justify-center"
                style={{ scrollbarWidth: "none" }}
              >
                {resolvedImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIdx(idx);
                    }}
                    className="shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
                    style={{
                      width: 40,
                      height: 40,
                      border: idx === currentIdx
                        ? "2px solid #22c55e"
                        : "2px solid rgba(255,255,255,0.15)",
                      opacity: idx === currentIdx ? 1 : 0.5,
                      transform: idx === currentIdx ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Photo ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    /* Fallback: show cover image if carousel images aren't scraped */
    <div className="relative w-full h-full flex items-center justify-center z-10 group">
      {/* Ambient blurred glow background */}
      <img
        src={thumbnailUrl || "/images/zuma.webp"}
        alt=""
        referrerPolicy="no-referrer"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
      />
      <InstagramImage
        src={thumbnailUrl || videoUrl}
        alt={title || "Instagram Image"}
        className="relative w-full h-full object-contain z-10"
      />
      {/* Center External Link Overlay */}
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute p-5 bg-green-500 hover:bg-green-400 text-black rounded-full hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl shadow-green-500/20 cursor-pointer flex items-center justify-center z-20 group/link"
        title="View Post on Instagram"
      >
        <ExternalLink size={24} className="group-hover/link:scale-105 transition-transform" />
      </a>
    </div>
  );
}
