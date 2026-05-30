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
  ArrowRight,
} from "lucide-react";
import { events } from "@/lib/data";
import VideoModal from "@/components/VideoModal";



export default function ArewaEvents() {
  const navigator = useRouter();
  const targetRef = useRef(null);
  const [activeEvent, setActiveEvent] = useState<any>(null);

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
          <h2 className="text-4xl md:text-6xl font-rikafu">Upcoming Events</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onClick={() => {
                navigator.push(`/events/${event.slug}`);
              }}
              onWatch={() => setActiveEvent(event)}
            />
          ))}
        </div>
      </div>

      <VideoModal
        isOpen={!!activeEvent}
        onClose={() => setActiveEvent(null)}
        videoUrl={activeEvent?.video || ""}
        title={activeEvent?.name}
        creator={activeEvent?.videoCreator}
      />
    </section>
  );
}

function EventCard({ event, index, onWatch, onClick }: any) {

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
          <button className="text-green-500  font-semibold text-sm hover:text-green-400 flex items-center gap-1 transition-colors">
            <ArrowUpRight size={16} />
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
              className="group mt-4 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 px-6 py-3 rounded-full transition-all w-full"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center pl-[2px] group-hover:scale-110 transition-transform shrink-0">
                <Play size={14} className="text-white fill-white" />
              </div>
              <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
                Watch Video
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
