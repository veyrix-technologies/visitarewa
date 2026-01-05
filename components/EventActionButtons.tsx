"use client";

import React, { useState } from "react";
import { Share2, Play, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventActionButtons({ videoUrl }: { videoUrl?: string }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;

  return (
    <>
      <div className="space-y-3">
        {/* 1. Watch Button (Only shows if there is a YouTube link in data) */}
        {videoId && (
            <button
            onClick={() => setIsVideoOpen(true)}
            className="w-full bg-green-500 text-black font-bold py-4 rounded-xl hover:bg-green-400 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
            <Play size={20} fill="black" /> Watch Highlights
            </button>
        )}

        {/* 2. Reminder Button */}
        <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <Bell size={20} /> Set Reminder
        </button>

        {/* 3. Share Button */}
        <button className="w-full bg-transparent border border-white/20 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
          <Share2 size={20} /> Share Event
        </button>
      </div>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {isVideoOpen && videoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsVideoOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition text-white"
            >
              <X size={32} />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black relative"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="Event Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}