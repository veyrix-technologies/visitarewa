import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Share2,
  Calendar,
  CheckCircle,
  Star,
} from "lucide-react";
import { destinations } from "@/lib/data";

// 1. Generate Metadata (Fixed for Next.js 15)
export async function generateMetadata({ params }: any) {
  // Await the params promise
  const { slug } = await params;

  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) return { title: "Not Found" };

  return {
    title: `${destination.title} | Visit Arewa`,
    description: destination.shortDescription,
  };
}

// 2. Main Page Component (Async Component)
export default async function DestinationPage({ params }: any) {
  // Await the params promise before using it
  const { slug } = await params;

  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  // Helper for stars
  const renderStars = (rating: any) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
          }
        />
      ))}
    </div>
  );

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[70vh] w-full">
        <div className="relative w-full h-full">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#020402]"></div>
        </div>

        {/* Navigation & Title */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-20 z-10">
          <Link
            href="/"
            className="w-fit flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Home</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-400 font-mono text-sm uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-md border border-green-900/50">
                <MapPin size={14} />
                <span>{destination.location}</span>
              </div>
              <div className="hidden md:block">
                {renderStars(destination.rating)}
              </div>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-xl">
              {destination.name}
            </h1>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 md:px-20 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Description & Highlights */}
          <div className="lg:col-span-8 space-y-12">
            <div className="prose prose-lg prose-invert text-gray-400 leading-relaxed">
              <h3 className="text-2xl text-white font-bold mb-4">
                About this Destination
              </h3>
              <p className="text-xl leading-8 text-gray-300">
                {destination.fullDescription}
              </p>
            </div>

            {/* Highlights Grid */}
            <div>
              <h3 className="text-2xl text-white font-bold mb-6">
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights?.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-green-500/50 transition-colors group"
                  >
                    <CheckCircle
                      className="text-green-500 group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <span className="text-gray-300 font-medium">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Preview */}
            {destination.gallery && (
              <div>
                <h3 className="text-2xl text-white font-bold mb-6">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-64 md:h-80">
                  {destination.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-full h-full rounded-2xl overflow-hidden first:col-span-2 first:row-span-2 hover:opacity-80 transition-opacity cursor-pointer border border-white/10"
                    >
                      <Image
                        src={img}
                        alt="Gallery"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8 backdrop-blur-sm shadow-2xl">
              <div>
                <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">
                  Coordinates
                </p>
                <p className="font-mono text-green-400 text-lg">
                  {destination.coordinates}
                </p>
              </div>

              <div className="h-[1px] bg-white/10"></div>

              <div className="space-y-4">
                <button className="w-full bg-green-500 text-black font-bold py-4 rounded-xl hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  Plan a Visit
                </button>
                {/* NOTE: We removed the client-side onClick handler for simplicity in this server component. 
                       You can convert this button into a separate client component if you need the share functionality here. */}
                <button className="w-full bg-transparent border border-white/20 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <Share2 size={18} /> Share Location
                </button>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-900/20 rounded-xl border border-green-900/50">
                <Calendar className="text-green-500 shrink-0" size={20} />
                <p className="text-sm text-green-200 leading-relaxed">
                  <strong>Best time to visit:</strong> November to February for
                  the best weather and festivals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
