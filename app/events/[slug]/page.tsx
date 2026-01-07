import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Tag,
  CheckCircle,
} from "lucide-react";
import { events } from "@/lib/data";
import EventActionButtons from "@/components/EventActionButtons";
import GalleryPreview from "@/components/GalleryPreview";

// 1. Generate Metadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.name} | Visit Arewa Events`,
    description: event.shortDescription,
  };
}

// 2. Main Page Component
export default async function EventPage({ params }: any) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="bg-[#020402] min-h-screen text-white font-serif selection:bg-green-500 selection:text-black">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          {/* VIDEO BACKGROUND (Local MP4 Loop) */}
         
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#020402] z-10"></div>
        </div>

        {/* Navigation & Title */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-20 z-20">
          <Link
            href="/#events"
            className="w-fit flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Events</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-green-500 text-black px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider">
                <Tag size={14} />
                <span>{event.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-sm font-medium border border-white/10">
                <Calendar size={14} className="text-green-400" />
                <span>{event.date}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-white drop-shadow-xl">
              {event.name}
            </h1>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 md:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Description & Gallery */}
          <div className="lg:col-span-8 space-y-10">
            <div className="prose prose-lg prose-invert text-gray-400 leading-relaxed">
              <h3 className="text-2xl text-white font-bold mb-4">
                Event Overview
              </h3>
              <p className="text-xl leading-8 text-gray-300">
                {event.fullDescription}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl text-white font-bold mb-6">
                What to Expect
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-green-500 mt-1 shrink-0"
                      size={18}
                    />
                    <span className="text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {event.gallery && (
              <div>
                <h3 className="text-2xl text-white font-bold mb-6">Gallery</h3>
                <GalleryPreview images={event.gallery} />
              </div>
            )}
          </div>

          {/* Right Column: Info Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-sm">
              {/* Info Rows */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white font-bold text-lg">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-bold text-lg">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className="text-green-400 font-bold text-lg">Upcoming</p>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 my-4"></div>

              {/* INTERACTIVE ACTIONS (New Component) */}
              <EventActionButtons videoUrl={event.video} />
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}