"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import VideoModal from "@/components/VideoModal";

export default function FoodActionButtons({
  videoUrl,
  title,
  creator,
}: {
  videoUrl: string;
  title?: string;
  creator?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/20 group cursor-pointer"
      >
        <span className="bg-black/10 p-2 rounded-full group-hover:bg-black/20 transition-colors">
          <Play size={20} fill="currentColor" />
        </span>
        Watch Video Tutorial
      </button>

      {/* Unified Video Modal */}
      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoUrl={videoUrl}
        title={title}
        creator={creator}
      />
    </>
  );
}