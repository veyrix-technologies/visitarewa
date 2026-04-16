"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

const phrases = [
  "Ancient Emirates...",
  "Vibrant Culture...",
  "Untold Stories...",
  "Welcome to Arewa."
];

export default function Preloader({ onComplete }: any) {
  const [progress, setProgress] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDrawComplete, setIsDrawComplete] = useState(false);

  useEffect(() => {
    // Progress Timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Slower duration to allow reading (approx 3 seconds total)
    
    return () => clearInterval(timer);
  }, []);

  // Sync Phrases with Progress
  useEffect(() => {
    if (progress < 25) setCurrentPhraseIndex(0);
    else if (progress < 50) setCurrentPhraseIndex(1);
    else if (progress < 75) setCurrentPhraseIndex(2);
    else setCurrentPhraseIndex(3);
  }, [progress]);

  // Completion Logic
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsDrawComplete(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 1000); // Hold the final welcome message for a second
    }
  }, [progress, onComplete]);

  // Animation variants
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2.8,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden font-serif">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* THE ACCURATE AREWA KNOT */}
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]" // Green glow
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* SHAPE 1: THE LOOPS */}
            <motion.rect
              x="22"
              y="22"
              width="56"
              height="56"
              rx="12"
              stroke="#16a34a"
              strokeWidth="3"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />

            {/* SHAPE 2: THE STAR */}
            <motion.path
              d="M50 2 C 54 28 72 46 98 50 C 72 54 54 72 50 98 C 46 72 28 54 2 50 C 28 46 46 28 50 2 Z"
              stroke="#16a34a"
              strokeWidth="3"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3, duration: 2.2 }}
            />
          </svg>
        </div>

        {/* STORYTELLING TEXT */}
        <div className="h-12 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isDrawComplete && (
              <motion.div
                key={currentPhraseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className={`text-xl md:text-2xl tracking-widest ${currentPhraseIndex === 3 ? "text-green-500 font-bold" : "text-gray-300"}`}>
                  {phrases[currentPhraseIndex]}
                </p>
                {/* Progress bar line under text */}
                {currentPhraseIndex !== 3 && (
                    <div className="w-12 h-[2px] bg-green-500/30 mt-2 mx-auto rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-green-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.7 }}
                        />
                    </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* REVEAL TRANSITION */}
      <AnimatePresence>
        {isDrawComplete && (
          <motion.div
            initial={{ height: "100%" }}
            animate={{ height: "0%" }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }} // Custom easing for premium feel
            className="absolute top-0 left-0 w-full bg-black z-20"
          />
        )}
      </AnimatePresence>
    </div>
  );
}