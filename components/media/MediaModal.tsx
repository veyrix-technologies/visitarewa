"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";


import { useInstagramMedia } from "@/hooks/useInstagramMedia";
import { parseVideo } from "@/utils/parsers/video";
import InstagramMediaViewer from "./InstagramMediaViewer";
import InstagramSidebar from "./InstagramSidebar";
import StandalonePlayer from "./StandalonePlayer";

export interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  creator?: string;
  creatorImage?: string;
  isLocalCreatorImage?: boolean;
  thumbnailUrl?: string;
  description?: string;
  location?: string;
  date?: string;
  credits?: {
    role: string;
    name: string;
    instagram?: string;
    image?: string;
  }[];
  contentType?: "video" | "gallery" | "article";
}

export default function MediaModal({
  isOpen,
  onClose,
  videoUrl,
  title,
  creator,
  creatorImage,
  isLocalCreatorImage,
  thumbnailUrl,
  description,
  location,
  date,
  credits,
  contentType,
}: MediaModalProps) {
  const [mounted, setMounted] = useState(false);
  const [btnHover, setBtnHover] = useState<boolean>(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const {
    resolvedImages,
    resolvedVideo,
    playInline,
    setPlayInline,
    currentIdx,
    setCurrentIdx,
    loadingImages,
    apiFailed,
  } = useInstagramMedia(isOpen, videoUrl);

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

  // Scroll thumbnail strip to keep active item visible
  useEffect(() => {
    if (stripRef.current && resolvedImages.length > 1) {
      const strip = stripRef.current;
      const thumb = strip.children[currentIdx] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentIdx, resolvedImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && resolvedImages.length > 1) {
        setCurrentIdx((p) => (p === 0 ? resolvedImages.length - 1 : p - 1));
      } else if (e.key === "ArrowRight" && resolvedImages.length > 1) {
        setCurrentIdx((p) => (p === resolvedImages.length - 1 ? 0 : p + 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, resolvedImages, onClose, setCurrentIdx]);

  const { type, embedUrl, isPortrait } = parseVideo(videoUrl);
  const isInstagram = videoUrl.includes("instagram.com");
  const showInstagramCustom = isInstagram;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (videoUrl || resolvedImages.length > 0) && (
        <>
          <style>{`
            .modal-sidebar-scroll::-webkit-scrollbar { width: 4px; }
            .modal-sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
            .modal-sidebar-scroll::-webkit-scrollbar-thumb { background: #27272a; border-radius: 999px; }
            .modal-sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #22c55e; }
            @media (min-width: 768px) {
              .ig-modal-card { height: clamp(480px, 85vh, 720px) !important; max-height: clamp(480px, 85vh, 720px) !important; }
              .ig-modal-img  { height: auto !important; flex: 1 !important; flex-shrink: 1 !important; }
              .ig-modal-sidebar { height: auto !important; max-height: none !important; flex: none !important; }
            }
          `}</style>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-end md:items-center justify-center md:p-8"
            onClick={onClose}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-[200] flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 text-white cursor-pointer"
              title="Close (Esc)"
            >
              <X size={16} />
            </button>

            {/* ── INSTAGRAM CUSTOM CARD ── */}
            {showInstagramCustom ? (
              <motion.div
                initial={{ scale: 0.97, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.97, opacity: 0, y: 12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="ig-modal-card relative flex flex-col md:flex-row w-full md:max-w-5xl bg-zinc-950 border-0 md:border border-white/5 rounded-none md:rounded-3xl overflow-hidden shadow-2xl shadow-black/80"
                style={{ height: "100dvh", maxHeight: "100dvh" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* ── IMAGE ── */}
                <div
                  className="ig-modal-img relative bg-black flex items-center justify-center overflow-hidden"
                  style={{ height: "65dvh", flexShrink: 0 }}
                >
                  <InstagramMediaViewer
                    loadingImages={loadingImages}
                    contentType={contentType}
                    resolvedVideo={resolvedVideo}
                    resolvedImages={resolvedImages}
                    currentIdx={currentIdx}
                    setCurrentIdx={setCurrentIdx}
                    playInline={playInline}
                    setPlayInline={setPlayInline}
                    embedUrl={embedUrl}
                    videoUrl={videoUrl}
                    thumbnailUrl={thumbnailUrl}
                    title={title}
                    stripRef={stripRef}
                  />
                </div>

                {/* ── SIDEBAR ── */}
                <InstagramSidebar
                  videoUrl={videoUrl}
                  title={title}
                  description={description}
                  creator={creator}
                  creatorImage={creatorImage}
                  isLocalCreatorImage={isLocalCreatorImage}
                  location={location}
                  date={date}
                  credits={credits}
                  resolvedImages={resolvedImages}
                  btnHover={btnHover}
                  setBtnHover={setBtnHover}
                />
              </motion.div>
            ) : (
              /* ── EMBED PLAYER ── */
              <StandalonePlayer
                type={type}
                embedUrl={embedUrl}
                isPortrait={isPortrait}
                title={title}
                creator={creator}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
