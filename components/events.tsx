"use client";

import React, { useRef, useState, lazy, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  Play,
  X,
  ArrowRight,
} from "lucide-react";
import { events } from "@/lib/data";

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function ArewaEvents() {
  const navigator = useRouter();
  const targetRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section
      ref={targetRef}
      id="events"
      className="bg-black text-white py-24 overflow-hidden border-t border-white/10"
    >
      {/* Header */}
      <div className="container mx-auto px-6  md:px-20 mb-16 flex  justify-between items-start md:items-center">
        <div>
          <span className="text-green-500 font-bold tracking-widest text-sm uppercase mb-2 block">
            Mark Your Calendar
          </span>
          <h2 className="text-4xl md:text-6xl font-serif">Upcoming Events</h2>
        </div>

        <Link
          href="/events"
          className="flex items-center gap-2 border-b border-green-500 pb-1 hover:text-green-500 transition-colors mt-6 md:mt-0"
        >
          View Full Calendar <ArrowUpRight size={18} />
        </Link>
      </div>

      {/* Events Grid */}
      <div className="px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            index <= 3 && (<EventCard
              key={event.id}
              event={event}
              index={index}
              onClick={() => {
                navigator.push(`/events/${event.slug}`);
              }}
              onWatch={() => setSelectedVideo(event.video)}
            />)
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
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition text-white z-50"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full bg-black/50 flex items-center justify-center">
                    <div className="animate-spin text-green-500">
                      Loading...
                    </div>
                  </div>
                }
              >
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

// Sub-component
function EventCard({ event, index, onWatch, onClick }: any) {
  const videoId = getYouTubeId(event.video);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[450px] w-full bg-zinc-900 font-sans rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-green-500/50 transition-all duration-300"
    >
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
        <Image
          src={event.image}
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          quality={75}
        />
        {/* CHANGED: Gradient from pure black to black/90 to reduce solid block feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-500" />
      </div>

      {/* CHANGED: Reduced padding bottom (pb-6 -> pb-4) to remove the gap at the bottom */}
      <div
        className="absolute inset-0 px-6 pt-6 pb-4 flex flex-col justify-end z-10"
        onClick={onClick}
      >
        <div className="absolute top-6 left-6 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {event.category}
        </div>

        <div className="mb-4 flex items-center gap-2 text-green-400">
          <Calendar size={18} />
          <span className="text-sm font-medium">{event.date}</span>
        </div>

        <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-green-500 transition-colors drop-shadow-md">
          {event.name}
        </h3>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <button className="text-white font-semibold text-sm hover:text-green-400 flex items-center gap-1 transition-colors">
            Details <ArrowRight size={16} />
          </button>
        </div>

        {/* Collapsible Button */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
          <div className="overflow-hidden">
            {/* Added margin top (mt-3) to separate from details row */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWatch();
              }}
              className="mt-3 w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-500 hover:border-green-500 hover:text-black transition-all"
            >
              Watch Video <Play size={16} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
