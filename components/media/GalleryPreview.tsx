"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryPreviewProps {
  images: string[];
}

export default function GalleryPreview({ images }: GalleryPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  // Keyboard nav
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSelectedIndex((i) => i !== null ? (i + 1) % images.length : null);
      if (e.key === "ArrowLeft") setSelectedIndex((i) => i !== null ? (i - 1 + images.length) % images.length : null);
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  const handleNext = () => setSelectedIndex((i) => i !== null ? (i + 1) % images.length : null);
  const handlePrev = () => setSelectedIndex((i) => i !== null ? (i - 1 + images.length) % images.length : null);

  return (
    <>
      {/* ── Gallery Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group border border-white/5 hover:border-green-500/20 bg-zinc-950 transition-all duration-300"
            onClick={() => setSelectedIndex(i)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={img}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Images size={20} className="text-green-400 mb-1" />
              <span className="text-white text-[10px] font-bold uppercase tracking-widest font-sans">View</span>
            </div>
            {/* Index badge */}
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-bold font-sans bg-black/60 backdrop-blur-md border border-white/10 text-white px-2 py-0.5 rounded-full">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedIndex !== null && (
            <>
              <style>{`
                .gallery-strip::-webkit-scrollbar { width: 0; height: 0; }
              `}</style>
              <motion.div
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedIndex(null)}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-6 right-6 z-[300] flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 text-white cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>

                {/* Image container */}
                <motion.div
                  className="relative w-full max-w-4xl flex flex-col items-center gap-4"
                  initial={{ scale: 0.97, opacity: 0, y: 12 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.97, opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Main image */}
                  <div className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 shadow-2xl shadow-black/80" style={{ maxHeight: "75vh" }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        {/* Blurred backdrop */}
                        <img
                          src={images[selectedIndex]}
                          alt=""
                          aria-hidden
                          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
                        />
                        <img
                          src={images[selectedIndex]}
                          alt={`Gallery ${selectedIndex + 1}`}
                          className="relative w-full object-contain z-10"
                          style={{ maxHeight: "75vh" }}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Counter badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                      <Images size={10} className="text-green-500" />
                      <span className="text-xs font-bold font-sans text-white">
                        {selectedIndex + 1} / {images.length}
                      </span>
                    </div>

                    {/* Nav arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all cursor-pointer"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all cursor-pointer"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail strip */}
                  {images.length > 1 && (
                    <div className="gallery-strip flex gap-2 overflow-x-auto py-1 max-w-full justify-center" style={{ scrollbarWidth: "none" }}>
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedIndex(idx)}
                          className="shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
                          style={{
                            width: 44,
                            height: 44,
                            border: idx === selectedIndex
                              ? "2px solid #22c55e"
                              : "2px solid rgba(255,255,255,0.15)",
                            opacity: idx === selectedIndex ? 1 : 0.5,
                            transform: idx === selectedIndex ? "scale(1.1)" : "scale(1)",
                          }}
                        >
                          <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
