import React from "react";
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
import { events } from "@/lib/data";

export const metadata = {
  title: "Events Calendar | Visit Arewa",
  description: "Explore the cultural festival schedule and upcoming events.",
};

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
  // Safety check for empty data
  if (!events || events.length === 0) {
    return (
      <main className="bg-[#020402] min-h-screen flex flex-col items-center justify-center text-white text-center p-6">
        <AlertCircle size={48} className="text-gray-500 mb-4" />
        <h1 className="text-2xl font-bold">No Events Found</h1>
        <Link href="/" className="text-green-500 hover:underline mt-4">
          Return Home
        </Link>
      </main>
    );
  }

  // Group the events
  const groupedEvents = groupByDateLabel(events);
  const dateLabels = Object.keys(groupedEvents);

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
            <div className="sticky top-0 z-10 py-6 bg-[#020402]/90 backdrop-blur-md border border-white/10 mb-12 flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider font-serif">
                {label}
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedEvents[label].map((event) => (
                <Link key={event.slug} href={`/events/${event.slug}`}>
                  <div className="group cursor-pointer">
                    {/* Image Card */}
                    <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:transition-all duration-300">
                      <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                      {/* Overlay Info */}
                      <div className="absolute bottom-0 inset-x-0 p-6">
                        <h3 className="text-2xl font-bold mb-2 text-green-400 group-hover:transition-colors">
                          {event.name}
                        </h3>
                        <p className="text-gray-300 text-sm flex items-center gap-2">
                          <span>{event.category}</span>
                          {event.time && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-white/20"></span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {event.time}
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
                        {event.shortDescription}
                      </p>
                      <div className="pt-4">
                        <button className="text-green-500 hover:text-green-400 font-bold text-sm uppercase group-hover:translate-x-1 transition-transform">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
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
    </main>
  );
}
