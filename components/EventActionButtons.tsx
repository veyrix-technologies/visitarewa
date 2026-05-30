"use client";

import React, { useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import VideoModal from "@/components/VideoModal";

export default function EventActionButtons({
  videoUrl,
  title,
  creator,
}: {
  videoUrl?: string;
  title?: string;
  creator?: string;
}) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="space-y-3">
        {/* 1. Watch Button */}
        {videoUrl && (
          <button
            onClick={() => setIsVideoOpen(true)}
            className="w-full bg-green-500 text-black font-bold py-4 rounded-xl hover:bg-green-400 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)] cursor-pointer"
          >
            <Play size={20} fill="black" /> Watch Highlights
          </button>
        )}

        {/* 2. View All Events */}
        <Link
          href={"/events"}
          className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-center"
        >
          View All Events <ArrowRight size={20} />
        </Link>
      </div>

      {/* Unified Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl || ""}
        title={title}
        creator={creator}
      />
    </>
  );
}