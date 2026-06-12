"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, ArrowUpRight } from "lucide-react";
import { useAuth, getCanonicalSubmissions } from "@/lib/AuthContext";
import Footer from "@/components/layout/footer";

export default function DestinationsIndexPage() {
  const { submissions } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const destSubmissions = getCanonicalSubmissions(
    submissions.filter(
      (sub) => sub.type === "destination" && sub.status === "published"
    )
  );
  // Helper for rendering rating stars
  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
          }
        />
      ))}
    </div>
  );

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Hero Header */}
      <div className="relative py-20 px-6 md:px-20 border-b border-white/10 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

        <Link
          href="/#destinations"
          className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back to Home</span>
        </Link>

        <div className="max-w-4xl relative z-10">
          <span className="text-green-500 font-bold tracking-widest text-sm uppercase mb-3 block">
            Natural Wonders & Ancient Sites
          </span>
          <h1 className="text-5xl md:text-8xl text-green-500 font-black mb-6 font-rikafu leading-none">
            Arewa Landmarks
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
            From the massive pre-historic rock monoliths to cascading jungle waterfalls and medieval castles. Discover the legendary sights and untamed beauty of Northern Nigeria.
          </p>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mounted && destSubmissions.map((destination) => (
            <Link key={destination.id} href={`/destinations/${destination.slug || destination.id}`}>
              <div className="group cursor-pointer">
                {/* Image Card */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4 group-hover:transition-all duration-300 border border-white/5">
                  <Image
                    src={destination.imageUrl || "/images/zuma.webp"}
                    alt={destination.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Overlay Info */}
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <h3 className="text-2xl font-bold mb-2 text-green-400 group-hover:transition-colors">
                      {destination.title}
                    </h3>
                    <p className="text-gray-300 text-sm flex items-center gap-2">
                      <MapPin size={16} className="text-green-500" />
                      {destination.location}
                    </p>
                  </div>
                </div>

                {/* Details below card */}
                <div className="space-y-2 px-2">
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      {renderStars(5)}
                    </div>
                  </div>

                  <p className="text-gray-300 line-clamp-2 leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="pt-4">
                    <button className="text-green-500 hover:text-green-400 font-bold text-sm uppercase group-hover:translate-x-1 transition-transform flex items-center gap-2">
                      Explore Destination{" "}
                      <ArrowLeft className="rotate-180" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {mounted && destSubmissions.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500 font-sans">
              No destinations have been published by the community yet.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
