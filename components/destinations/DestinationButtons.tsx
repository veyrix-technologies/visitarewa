"use client";

import React, { useState } from "react";
import { Share2, MapPin, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DestinationButtons({ destination, slug }: any) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleViewOnMap = () => {
    router.push(`/map?id=destination-${slug}`);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    const shareData = {
      title: destination.title,
      text: `Check out ${destination.title} in ${destination.location} on Visit Arewa!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.log("Share menu closed or failed, falling back to clipboard.");
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      alert("Browser blocked the copy action. Please copy the URL manually.");
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleViewOnMap}
        className="w-full bg-green-500 text-black font-bold py-4 cursor-pointer rounded-xl hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2"
      >
        <MapPin size={20} /> View on Map
      </button>

      <button
        onClick={handleShare}
        className={`w-full font-bold py-4 rounded-xl transition-all cursor-pointer duration-300 flex items-center justify-center gap-2 border ${
          isCopied
            ? "bg-white text-black border-white"
            : "bg-transparent border-white/20 text-white hover:bg-white/10"
        }`}
      >
        {isCopied ? (
          <>
            <Check size={20} className="text-green-600" /> Link Copied!
          </>
        ) : (
          <>
            <Share2 size={20} /> Share Location
          </>
        )}
      </button>
    </div>
  );
}
