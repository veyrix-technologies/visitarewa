"use client";

import React from "react";
import { motion } from "framer-motion";

interface StandalonePlayerProps {
  type: string;
  embedUrl: string;
  isPortrait: boolean;
  title?: string;
  creator?: string;
}

export default function StandalonePlayer({
  type,
  embedUrl,
  isPortrait,
  title,
  creator,
}: StandalonePlayerProps) {
  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.97, opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4 w-full"
      style={{ maxWidth: isPortrait ? "min(90vw, 420px)" : "min(92vw, 1024px)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 shadow-2xl shadow-black/80"
        style={{
          aspectRatio: isPortrait ? (type === "instagram" ? "2/3" : "9/16") : "16/9",
        }}
      >
        {type === "direct" ? (
          <video src={embedUrl} controls autoPlay className="w-full h-full object-contain" />
        ) : (
          <iframe
            src={embedUrl}
            title="Arewa Video Player"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* Credit bar */}
      {(title || creator) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1"
        >
          {title && <span className="font-bold text-white text-sm truncate">{title}</span>}
          {creator && (
            <span className="flex items-center gap-1.5 text-[10px] font-bold font-sans shrink-0 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-green-400 w-fit uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
              {creator}
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
