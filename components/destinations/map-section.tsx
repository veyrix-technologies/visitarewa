"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useAuth, getCanonicalSubmissions } from "@/lib/AuthContext";
import { ArrowUpRight, Map as MapIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Dynamically import the map component with SSR disabled
const InteractiveMap = dynamic(() => import("@/components/destinations/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#020402]">
      <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

// Robust utility to parse coordinate strings like "10.3160° N, 7.6750° E" or decimal "10.3160, 7.6750" to [number, number]
function parseCoordinates(coordString: string): [number, number] | null {
  if (!coordString) return null;
  
  // 1. Try clean decimal, e.g., "10.5105, 7.4165" or "10.5105 -7.4165"
  const cleanDecimalRegex = /^\s*(-?[\d.]+)\s*[,;\s]\s*(-?[\d.]+)\s*$/;
  const decimalMatch = coordString.match(cleanDecimalRegex);
  if (decimalMatch) {
    const lat = parseFloat(decimalMatch[1]);
    const lng = parseFloat(decimalMatch[2]);
    if (!isNaN(lat) && !isNaN(lng)) {
      return [lat, lng];
    }
  }

  // 2. Fallback to degrees format with N/S and E/W letters, e.g., "10.3160° N, 7.6750° E"
  const cardinalRegex = /^\s*([\d.]+)\s*°?\s*([NS])\s*[,;\s]\s*([\d.]+)\s*°?\s*([EW])/i;
  const cardinalMatch = coordString.match(cardinalRegex);
  if (cardinalMatch) {
    let lat = parseFloat(cardinalMatch[1]);
    let lng = parseFloat(cardinalMatch[3]);
    if (cardinalMatch[2].toUpperCase() === "S") lat = -lat;
    if (cardinalMatch[4].toUpperCase() === "W") lng = -lng;
    return [lat, lng];
  }

  // 3. Broad search regex as final fallback
  const broadRegex = /([\d.]+).*?([NS]).*?([\d.]+).*?([EW])/i;
  const broadMatch = coordString.match(broadRegex);
  if (broadMatch) {
    let lat = parseFloat(broadMatch[1]);
    let lng = parseFloat(broadMatch[3]);
    if (broadMatch[2].toUpperCase() === "S") lat = -lat;
    if (broadMatch[4].toUpperCase() === "W") lng = -lng;
    return [lat, lng];
  }

  return null;
}

export default function MapSection() {
  const { submissions } = useAuth();

  const publishedSubmissions = useMemo(() => {
    return getCanonicalSubmissions(
      submissions.filter((s) => s.status === "published")
    );
  }, [submissions]);

  const allItems = useMemo(() => {
    const items: any[] = [];

    publishedSubmissions.forEach((sub) => {
      // Cuisine type has no coordinates on the map
      if (sub.type === "cuisine") return;
      if (!sub.coordinates) return;

      const coords = parseCoordinates(sub.coordinates);
      if (coords) {
        items.push({
          id: `${sub.type}-${sub.slug || sub.id}`,
          type: sub.type,
          title: sub.title,
          image: sub.imageUrl,
          slug: sub.slug || sub.id,
          coordinates: coords,
          shortDesc: sub.description,
        });
      }
    });

    return items;
  }, [publishedSubmissions]);

  return (
    <section className="bg-[#020402] text-white py-24 border-t border-white/5" id="map-section">
      <div className="container mx-auto px-6 md:px-20">

        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-green-500"></div>
              <span className="text-green-500 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
                <MapIcon size={16} /> Spatial Exploration
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-rikafu leading-tight">
              Map of Arewa
            </h2>
            <p className="text-gray-400 max-w-2xl mt-4 text-lg">
              Explore the rich cultural tapestry of Arewa geographically. From ancient crafts to bustling events, discover what makes each region unique.
            </p>
          </div>

          <Link
            href="/map"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-green-500 hover:text-black border border-white/10 hover:border-green-500 rounded-full transition-all text-sm font-bold tracking-widest uppercase shrink-0 group"
          >
            Open Full Map
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group"
        >
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <InteractiveMap items={allItems} />
          </div>

          {/* Map Overlay Vignette for seamless integration */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020402]/40 via-transparent to-[#020402]/80 pointer-events-none z-10" />
          <div className="absolute inset-0 border border-white/5 rounded-[2rem] pointer-events-none z-10" />

        </motion.div>
      </div>
    </section>
  );
}
