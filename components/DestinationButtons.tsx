"use client"; // ✅ This marks ONLY this part as Client-side

import React from "react";
import { Share2, MapPin } from "lucide-react";

export default function DestinationButtons({ destination, slug }: any) {
  const handleViewOnMap = () => {
    // Open Google Maps
    const query = encodeURIComponent(
      `${destination.title} ${destination.location}`
    );
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  const handleShare = async () => {
    // Construct the URL
    const shareUrl = `${window.location.origin}/destinations/${slug}`;

    const shareData = {
      title: destination.title,
      text: `Check out ${destination.title} in ${destination.location} on Visit Arewa!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleViewOnMap}
        className="w-full bg-green-500 text-black font-bold py-4 rounded-xl hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.4)]"
      >
        View on Map
      </button>

      <button
        onClick={handleShare}
        className="w-full bg-transparent border border-white/20 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
      >
        <Share2 size={18} /> Share Location
      </button>
    </div>
  );
}
