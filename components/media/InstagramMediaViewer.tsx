"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, ChevronLeft, ChevronRight, Images } from "lucide-react";
import InstagramImage from "./InstagramImage";
import { parseVideo } from "@/utils/parsers/video";

interface InstagramMediaViewerProps {
  contentType?: string;
  embedUrl: string;
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
  images?: string[];
}

export default function InstagramMediaViewer({
  contentType,
  embedUrl,
  videoUrl,
  thumbnailUrl,
  title,
  images,
}: InstagramMediaViewerProps) {
  const [playInline, setPlayInline] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { type } = parseVideo(videoUrl);

  // Reset playInline and slide index when videoUrl changes (i.e. user switches content)
  useEffect(() => {
    setPlayInline(false);
    setCurrentIndex(0);
  }, [videoUrl]);

  const fallbackSrc = "/images/zuma.webp";
  const slides = images && images.length > 0 ? images : [thumbnailUrl || fallbackSrc];
  const displayImage = slides[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Keyboard nav for switching slides
  useEffect(() => {
    if (slides.length <= 1) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  if (contentType === "video") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Ambient blurred glow background */}
        <img
          src={displayImage}
          alt=""
          referrerPolicy="no-referrer"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
        />

        {playInline ? (
          type === "direct" ? (
            <video
              src={embedUrl}
              controls
              autoPlay
              className="relative w-full h-full object-contain z-10"
            />
          ) : (
            <iframe
              src={embedUrl}
              title={title || "Instagram Video Player"}
              className="relative w-full h-full border-0 z-10"
              allowFullScreen
            />
          )
        ) : (
          /* Show cover image with play overlay if direct video stream is unavailable */
          <div className="relative w-full h-full flex items-center justify-center z-10 group">
            <InstagramImage
              src={displayImage}
              alt={title || "Instagram Video"}
              className="w-full h-full object-contain"
            />
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
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 bg-black select-none z-10">
      {/* Viewer Main Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden w-full">
        {/* Ambient blurred glow background */}
        <img
          src={displayImage}
          alt=""
          referrerPolicy="no-referrer"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30 transition-all duration-500"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <InstagramImage
              src={displayImage}
              alt={title || "Gallery Image"}
              className="max-w-full max-h-full object-contain z-10"
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter Badge */}
        {slides.length > 1 && (
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
            <Images size={10} className="text-green-500" />
            <span className="text-xs font-bold font-sans text-white">
              {currentIndex + 1} / {slides.length}
            </span>
          </div>
        )}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all cursor-pointer z-20"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all cursor-pointer z-20"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {slides.length > 1 && (
        <div className="w-full shrink-0 pt-4 border-t border-white/5 bg-zinc-950/20 backdrop-blur-sm z-20">
          <div
            className="flex gap-2 overflow-x-auto py-1 max-w-full justify-center"
            style={{ scrollbarWidth: "none" }}
          >
            {slides.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className="shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
                style={{
                  width: 40,
                  height: 40,
                  border: idx === currentIndex
                    ? "2px solid #22c55e"
                    : "2px solid rgba(255,255,255,0.15)",
                  opacity: idx === currentIndex ? 1 : 0.5,
                  transform: idx === currentIndex ? "scale(1.1)" : "scale(1)",
                }}
              >
                <img
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
