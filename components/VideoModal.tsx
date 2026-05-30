"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  creator?: string;
}

interface ParsedVideo {
  type: "youtube" | "instagram" | "tiktok" | "direct" | "unknown";
  embedUrl: string;
  isPortrait: boolean;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title, creator }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Parse any video URL to resolve correct embed target & orientation
  const parseVideo = (url: string): ParsedVideo => {
    if (!url) return { type: "unknown", embedUrl: "", isPortrait: false };

    // 1. Direct Video files (mp4, webm, ogg)
    if (/\.(mp4|webm|ogg)($|\?)/i.test(url)) {
      return { type: "direct", embedUrl: url, isPortrait: false };
    }

    // 2. YouTube
    const ytReg = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const ytMatch = url.match(ytReg);
    if (ytMatch && ytMatch[2].length === 11) {
      return {
        type: "youtube",
        embedUrl: `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1&rel=0`,
        isPortrait: false,
      };
    }

    // 3. Instagram Reels & Posts
    const igReg = /instagram\.com\/(p|reel)\/([^/?#&]+)/i;
    const igMatch = url.match(igReg);
    if (igMatch) {
      const type = igMatch[1]; // 'p' or 'reel'
      const id = igMatch[2];
      return {
        type: "instagram",
        embedUrl: `https://www.instagram.com/${type}/${id}/embed/`,
        isPortrait: true,
      };
    }

    // 4. TikTok
    const ttReg = /tiktok\.com\/(@[^/]+)\/video\/(\d+)/i;
    const ttMatch = url.match(ttReg);
    if (ttMatch) {
      const id = ttMatch[2];
      return {
        type: "tiktok",
        embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
        isPortrait: true,
      };
    }

    // Fallback/Unknown: try showing it in iframe
    return { type: "unknown", embedUrl: url, isPortrait: false };
  };

  const { type, embedUrl, isPortrait } = parseVideo(videoUrl);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && embedUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[99999] p-3 bg-white/10 rounded-full hover:bg-green-500 hover:text-black transition-all border border-white/10 text-white cursor-pointer"
            title="Close video"
          >
            <X size={20} />
          </button>

          {/* Modal Container + Credit Wrapper */}
          <div className="flex flex-col items-center w-full max-w-5xl">
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                isPortrait
                  ? "relative w-[90vw] aspect-[9/16] bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-green-500/10 flex items-center justify-center"
                  : "relative w-[90vw] aspect-video bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-green-500/5"
              }
              style={
                isPortrait
                  ? { maxWidth: "min(90vw, 34vh, 360px)" }
                  : { maxWidth: "min(90vw, 106vh, 1024px)" }
              }
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              {type === "direct" ? (
                <video
                  src={embedUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={embedUrl}
                  title="Arewa Video Player"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </motion.div>

            {/* Credit Bar */}
            {(title || creator) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-2 text-xs text-gray-400 font-sans"
                style={
                  isPortrait
                    ? { maxWidth: "min(90vw, 34vh, 360px)" }
                    : { maxWidth: "min(90vw, 106vh, 1024px)" }
                }
              >
                {title && <span className="font-bold text-white truncate max-w-sm sm:max-w-md">{title}</span>}
                {creator && (
                  <span className="flex items-center gap-1.5 shrink-0 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-green-400 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Video by {creator}
                  </span>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
