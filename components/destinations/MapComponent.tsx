"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

// Custom green SVG marker
const customMarkerIcon = L.divIcon({
  className: "bg-transparent",
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#22c55e" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 36px; height: 36px; filter: drop-shadow(0px 0px 8px rgba(34, 197, 94, 0.6)); transform: translate(-50%, -100%);"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 15.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" fill="black"/></svg>`,
  iconSize: [0, 0], // The SVG has a transform translate to handle positioning correctly
  popupAnchor: [0, -36],
});

interface MapItem {
  id: string;
  type: "destination" | "event" | "craft";
  title: string;
  image: string;
  slug: string;
  coordinates: [number, number];
  shortDesc: string;
}

interface MapComponentProps {
  items: MapItem[];
  centerOnId?: string | null;
}

function MapController({ items, centerOnId }: { items: MapItem[], centerOnId?: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (centerOnId) {
      const target = items.find((i) => i.id === centerOnId);
      if (target) {
        map.flyTo(target.coordinates, 10, { animate: true, duration: 1.5 });
      }
    }
  }, [centerOnId, items, map]);

  return null;
}

export default function MapComponent({ items, centerOnId }: MapComponentProps) {
  const defaultCenter: [number, number] = [10.5105, 7.4165]; // Center of Northern Nigeria approx
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ background: "#020402" }} // Match dark theme
      >
        {/* CartoDB Dark Matter for a sleek, premium dark aesthetic */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapController items={items} centerOnId={centerOnId} />

        {items.map((item) => (
          <Marker key={item.id} position={item.coordinates} icon={customMarkerIcon}>
            <Popup className="custom-popup">
              <div className="w-64 bg-[#0a0f0a] border border-green-500/20 rounded-2xl overflow-hidden p-0 shadow-2xl">
                <div className="w-full h-32 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-green-400 font-bold uppercase tracking-widest border border-white/10">
                    {item.type}
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                  <p className="text-gray-400 text-xs line-clamp-2">{item.shortDesc}</p>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <Link 
                      href={`/${item.type}s/${item.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 !text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-green-400 transition-colors w-max"
                    >
                      Explore <ArrowUpRight size={14} />
                    </Link>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${item.coordinates[0]},${item.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 !text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white/20 transition-colors w-max border border-white/20"
                      title="Open in Google Maps"
                    >
                      <MapPin size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
