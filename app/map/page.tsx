"use client";

import React, { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useAuth, getCanonicalSubmissions } from "@/lib/AuthContext";
import { ArrowLeft, Map as MapIcon, Calendar, Compass, Hammer } from "lucide-react";
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

export default function MapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020402]" />}>
      <MapPageContent />
    </Suspense>
  );
}

function MapPageContent() {
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get("id");
  const { submissions } = useAuth();

  const [activeFilters, setActiveFilters] = useState<string[]>([
    "destination",
    "event",
    "craft",
  ]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const publishedSubmissions = useMemo(() => {
    return getCanonicalSubmissions(
      submissions.filter((s) => s.status === "published")
    );
  }, [submissions]);

  const allItems = useMemo(() => {
    const items: any[] = [];
    
    publishedSubmissions.forEach((sub) => {
      if (!activeFilters.includes(sub.type)) return;
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
  }, [activeFilters, publishedSubmissions]);

  // If we have an ID from the query, try to find it to center on it
  let centerOnId = null;
  if (idFromQuery) {
    const item = allItems.find(i => i.id.includes(idFromQuery));
    if (item) centerOnId = item.id;
  }

  return (
    <main className="w-full h-screen relative bg-[#020402] overflow-hidden font-sans">
      {/* Top Navigation Overlay */}
      <div className="absolute top-0 left-0 w-full z-10 p-6 md:p-10 flex justify-between items-center pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 hover:scale-105 transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="pointer-events-auto px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-3">
          <MapIcon size={18} className="text-green-500" />
          <span className="text-white font-bold text-sm tracking-widest uppercase">
            Visit Arewa Map
          </span>
        </div>
      </div>

      {/* The Interactive Map */}
      <InteractiveMap items={allItems} centerOnId={centerOnId} />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center justify-between">
          <FilterButton
            active={activeFilters.includes("destination")}
            onClick={() => toggleFilter("destination")}
            icon={<Compass size={16} />}
            label="Destinations"
          />
          <FilterButton
            active={activeFilters.includes("event")}
            onClick={() => toggleFilter("event")}
            icon={<Calendar size={16} />}
            label="Events"
          />
          <FilterButton
            active={activeFilters.includes("craft")}
            onClick={() => toggleFilter("craft")}
            icon={<Hammer size={16} />}
            label="Crafts"
          />
        </div>
      </div>
    </main>
  );
}

function FilterButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
        active ? "text-black" : "text-gray-400 hover:text-white"
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeFilterBg"
          className="absolute inset-0 bg-green-500 rounded-full -z-10"
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        <span className="hidden md:inline">{label}</span>
      </span>
    </button>
  );
}
