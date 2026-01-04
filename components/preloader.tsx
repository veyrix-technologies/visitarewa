"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

export default function Preloader({ onComplete }: any) {
  const [progress, setProgress] = useState(0);
  const [isDrawComplete, setIsDrawComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsDrawComplete(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 800);
    }
  }, [progress, onComplete]);

  // Animation variants
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2.5,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* THE ACCURATE AREWA KNOT */}
        <div className="relative w-56 h-56 md:w-72 md:h-72">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* SHAPE 1: THE LOOPS (Background Layer)
                This mimics the rounded corners of the knot.
                It is essentially a square with heavily rounded corners.
             */}
            <motion.rect
              x="22"
              y="22"
              width="56"
              height="56"
              rx="12" // This radius creates the specific "Loop" look
              stroke="#16a34a" // Change to #16a34a for Green
              strokeWidth="3"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />

            {/* SHAPE 2: THE STAR (Foreground Layer)
                These are the 4 sharp points (N, S, E, W).
                I used cubic bezier curves (C) to get that deep, sharp concave shape
                that defines the Arewa star.
             */}
            <motion.path
              d="M50 2 C 54 28 72 46 98 50 C 72 54 54 72 50 98 C 46 72 28 54 2 50 C 28 46 46 28 50 2 Z"
              stroke="#16a34a" // Change to #16a34a for Green
              strokeWidth="3"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3, duration: 2.2 }} // Draws slightly after the box
            />
          </svg>
        </div>

        {/* LOADING TEXT */}
        <div className="h-8 overflow-hidden flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isDrawComplete && (
              <motion.div
                key="text"
                exit={{ y: 20, opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                {/* <span className="text-3xl font-bold font-mono text-green-500 tracking-widest">
                            {progress}%
                        </span> */}
                <span className="text-3xl font-bold text-green-500 tracking-widest">
                  The Heart of Nigeria
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-[0.3em]">
                  Loading Arewa
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* REVEAL TRANSITION */}
      <AnimatePresence>
        {isDrawComplete && (
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: "circIn" }}
            style={{ originY: 0 }}
            className="absolute inset-0 bg-black z-20"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
