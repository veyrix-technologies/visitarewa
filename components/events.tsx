"use client";

import React, { useRef, useState, lazy, Suspense } from "react";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight, Play, X } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Grand Durbar Festival",
    date: "March 20, 2026 (Eid-al-Fitr)",
    location: "Kano Palace Grounds",
    video: "https://www.youtube.com/watch?v=FepSLXg1Eiw",
    category: "CULTURE",
  },
  {
    id: 2,
    title: "Argungu Fishing Fest",
    date: "Feb 25 - Mar 1, 2026",
    location: "Matan Fada River, Kebbi",
    video: "https://www.youtube.com/watch?v=oKsRcD0fJCU",
    category: "HERITAGE",
  },
  {
    id: 3,
    title: "Dambe Warriors League",
    date: "Every Sunday @ 4:00 PM",
    location: "Gombe Stadium / Kano Pillars",
    video: "https://www.youtube.com/watch?v=DPaTu8C3Xi8",
    category: "SPORT",
  },
  {
    id: 4,
    title: "Kaduna Arts (KABAFEST)",
    date: "Sept 16 - 19, 2026",
    location: "Kaduna City Hall",
    video: "https://www.youtube.com/watch?v=_R9pZ8oWRv0",
    category: "ART",
  },
];

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function ArewaEvents() {
  const targetRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // State for the active video link

  return (
    <section
      ref={targetRef}
      className="bg-black text-white py-24 overflow-hidden border-t border-white/10"
    >
      {/* Header */}
      <div className="container mx-auto px-6 md:px-20 mb-16 flex flex-col md:flex-row justify-between items-start">
        <div>
          <span className="text-green-500 font-bold tracking-widest text-sm uppercase mb-2 block">
            Mark Your Calendar
          </span>
          <h2 className="text-4xl md:text-6xl  font-serif">Upcoming Events</h2>
        </div>
        <button className="hidden md:flex items-center gap-2 border-b border-green-500 pb-1 hover:text-green-500 transition-colors mt-6 md:mt-0">
          View Full Calendar <ArrowUpRight size={18} />
        </button>
      </div>

      {/* Events Grid */}
      <div className="px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onWatch={() => setSelectedVideo(event.video)} // Pass function to open modal
            />
          ))}
        </div>
      </div>

      {/* --- VIDEO MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition text-white"
            >
              <X size={32} />
            </button>

            {/* Video Container with Lazy Loading */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense fallback={<div className="w-full h-full bg-black/50 flex items-center justify-center"><div className="animate-spin">Loading...</div></div>}>
                <iframe
                  loading="lazy"
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeId(
                    selectedVideo
                  )}?autoplay=1&rel=0`}
                  title="Event Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ------------------------------------------------------------------
// Sub-component: The Card
// ------------------------------------------------------------------
function EventCard({ event, index, onWatch }: any) {
  const videoId = getYouTubeId(event.video);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[450px] w-full bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-green-500/50 transition-all duration-300"
    >
      {/* BACKGROUND THUMBNAIL IMAGE (High Performance) */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
        <Image
          src={thumbnailUrl}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-black/30 transition-all duration-500" />
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
        <div className="absolute top-6 left-6 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {event.category}
        </div>

        <div className="mb-4 flex items-center gap-2 text-green-400">
          <Calendar size={18} />
          <span className="text-sm font-medium">{event.date}</span>
        </div>

        <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-green-500 transition-colors drop-shadow-md">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>

        {/* BUTTON: Triggers the Modal */}
        <div className="h-0 overflow-hidden group-hover:h-12 transition-all duration-300">
          <button
            onClick={onWatch} // Calls the parent function
            className="mt-2 w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-500 hover:border-green-500 hover:text-black transition-all"
          >
            Watch Video <Play size={16} fill="currentColor" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
