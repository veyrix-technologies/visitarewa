"use client";

import React, { useRef } from "react";
import { Volume2 } from "lucide-react";

export default function LanguageAudioButton({ audioSrc, greeting }: { audioSrc: string, greeting: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playGreeting = () => {
    if (!audioSrc) return;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    
    audio.play().catch((err) => {
      console.log("Audio playback failed or file missing:", err);
      alert(`The audio file for this greeting will be added soon!`);
    });
  };

  return (
    <button 
      onClick={playGreeting}
      className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase border border-green-500/20 hover:bg-green-500/20 hover:scale-105 active:scale-95 transition-all outline-none"
    >
      <Volume2 size={16} />
      {greeting}
    </button>
  );
}