"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import { useAuth, getCanonicalSubmissions } from "@/lib/AuthContext";
import Footer from "@/components/layout/footer";
import { determineEventStatus, parseEventDate } from "@/lib/data";

// --- LOGIC: Group by the text label directly ---
const groupByDateLabel = (eventsList: any[]) => {
  const grouped: { [key: string]: any[] } = {};

  eventsList.forEach((event) => {
    // We use the date string itself as the group title
    // e.g. "February / March" or "Eid al-Fitr"
    const key = event.date || "Upcoming";

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(event);
  });

  return grouped;
};

export default function EventsCalendarPage() {
  const { submissions } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const eventSubmissions = getCanonicalSubmissions(
    submissions.filter(
      (sub) => sub.type === "event" && sub.status === "published"
    )
  );

  // Group the events
  const groupedEvents = groupByDateLabel(eventSubmissions);
  const dateLabels = Object.keys(groupedEvents).sort((a, b) => {
    return parseEventDate(a).getTime() - parseEventDate(b).getTime();
  });

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Hero Section */}
      <div className="relative py-20 px-6 md:px-20 border-b border-white/10">
        <Link
          href="/#events"
          className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back to Home</span>
        </Link>
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-green-500 font-rikafu">
            Events Calendar
          </h1>
          <p className="text-xl text-gray-300">
            Don't miss a beat of Arewa's vibrant cultural pulse.
          </p>
        </div>
      </div>

      {/* Calendar Listing */}
      <div className="container mx-auto px-6 md:px-20 py-20 font-sans">
        {dateLabels.map((label) => (
          <div key={label} className="mb-24 relative">
            {/* Group Header (The Date Text) */}
            <div className="sticky top-0 z-100 py-6 bg-[#020402]/90 backdrop-blur-md border border-white/10 mb-12 flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider font-serif">
                {label}
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mounted && groupedEvents[label].map((event) => {
                const status = determineEventStatus(event.date);
                return (
                  <Link key={event.id} href={`/events/${event.slug || event.id}`}>
                    <div className="group cursor-pointer">
                      {/* Image Card */}
                      <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:transition-all duration-300">
                        <Image
                          src={event.imageUrl || "/images/argungu.webp"}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {/* Dynamic Status Badge */}
                        <div className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border ${status === "Ongoing"
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : status === "Finished"
                              ? "bg-red-500/10 border-red-500/30 text-red-400"
                              : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                          }`}>
                          {status}
                        </div>
                        {/* Floating Ticket Price Badge */}
                        {event.registrationEnabled ? (
                          event.ticketType === "paid" ? (
                            <div className="absolute top-4 right-4 z-10 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                              ₦{event.ticketPrice?.toLocaleString()}
                            </div>
                          ) : (
                            <div className="absolute top-4 right-4 z-10 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                              Free Admission
                            </div>
                          )
                        ) : (
                          <div className="absolute top-4 right-4 z-10 bg-zinc-900/60 border border-white/5 text-gray-400 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                            Showcase
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                        {/* Overlay Info */}
                        <div className="absolute bottom-0 inset-x-0 p-6">
                          <h3 className="text-2xl font-bold mb-2 text-green-400 group-hover:transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-300 text-sm flex items-center gap-2">
                            <span>{event.category || "Event"}</span>
                            {event.date && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                <span className="flex items-center gap-1">
                                  <Clock size={12} /> {event.date}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Details below card */}
                      <div className="space-y-2 px-2">
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                          <MapPin size={16} className="text-green-500" />
                          {event.location}
                        </p>
                        <p className="text-gray-300 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="pt-4">
                          <button className="text-green-500 hover:text-green-400 font-bold text-sm uppercase group-hover:translate-x-1 transition-transform">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Empty State / Call to Action */}
        <div className="bg-green-900/10 border border-green-500/20 rounded-3xl p-12 text-center mt-20">
          <h3 className="text-2xl font-bold mb-4">Have an event?</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Do you organize cultural, tech, or business events in Arewa? Get listed on our official calendar.
          </p>
          <a
            href="mailto:hello@visitarewa.com"
            className="inline-block bg-green-500 text-black font-bold px-8 py-3 rounded-full hover:bg-white transition-colors"
          >
            Submit an Event
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
