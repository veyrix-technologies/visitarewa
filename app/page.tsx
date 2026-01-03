"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, Menu, MapPin, Bookmark } from "lucide-react";

const destinations = [
  {
    id: 1,
    location: "Abuja, Nigeria",
    title: "ABUJA",
    description:
      "The capital city known for its stunning architecture and the monolithic Zuma Rock, the 'Gateway to Abuja' that rises majestically 725 meters above the surrounding countryside.",
    image: "/images/abj.png", // Zuma Rock / Abuja landscape vibe
    rating: 5,
  },
  {
    id: 2,
    location: "Bauchi, Nigeria",
    title: "YANKARI",
    description:
      "A premier wildlife retreat featuring the Wikki Warm Springs and roaming elephants. It is Nigeria's richest wildlife oasis and a haven for eco-tourism in the West African savanna.",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop", // Elephant/Savannah vibe for Yankari
    rating: 5,
  },
  {
    id: 3,
    location: "Kaduna, Nigeria",
    title: "KAJURU",
    description:
      "A stunning medieval-style castle perched on a hill in Kaduna. This architectural masterpiece offers a fairytale escape with breathtaking views of the surrounding savannah.",
    image: "/images/kajuru.png", // Castle vibe for Kajuru
    rating: 4,
  },
  {
    id: 4,
    location: "Taraba, Nigeria",
    title: "MAMBILLA",
    description:
      "The gem of Taraba, known for its cool climate, lush green rolling hills, and vast tea plantations. It offers some of the most scenic highland views in West Africa.",
    image: "/images/mambilla.png", // Green highland/Tea plantation vibe
    rating: 5,
  },
];

export default function TravelSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Logic to handle "Next" slide
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  // Logic to calculate which slides to show in the thumbnail list (Next 2 items)
  const getNextDestinations = () => {
    let nextItems = [];
    for (let i = 1; i <= 3; i++) {
      const index = (currentIndex + i) % destinations.length;
      nextItems.push(destinations[index]);
    }
    return nextItems;
  };

  const activeDest = destinations[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      {/* 2. Background Image with Transition */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeDest.id}
          initial={{ opacity: 0.8, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={activeDest.image}
            alt={activeDest.title}
            className="w-full h-full object-cover brightness-75"
          />
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* 3. Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-8">
        <div className="flex items-center gap-2">
          <img src={"/logo.svg"} className="w-25" alt="Visit Arewa Logo" />
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-200">
          <a href="#" className="hover:text-white transition">
            Blog
          </a>
          <a href="#" className="text-white border-b-2 border-white pb-1">
            Destinations
          </a>
          <a href="#" className="hover:text-white transition">
            Team
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer" />
          {/* <div className="text-sm font-medium">Hello, Anne!</div>
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden border-2 border-white">
            <img src="https://i.pravatar.cc/100?img=5" alt="User" />
          </div> */}
        </div>
      </nav>

      {/* 4. Main Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full h-full items-center">
          {/* LEFT COLUMN: Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Decorative location marker */}
                <div className="flex items-center gap-2 text-orange-400 mb-2">
                  <MapPin size={16} />
                  <span className="uppercase tracking-widest text-xs font-bold">
                    {activeDest.location}
                  </span>
                </div>

                {/* Big Title */}
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-4">
                  {activeDest.title}
                </h1>

                {/* Description */}
                <p className="max-w-md text-gray-200 text-sm md:text-base leading-relaxed line-clamp-3">
                  {activeDest.description}
                </p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center gap-3 w-fit transition-colors shadow-lg shadow-blue-900/50"
                >
                  Explore <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Thumbnail Slider */}
          <div className="hidden lg:flex lg:col-span-5 h-[400px] items-center gap-4 overflow-hidden relative">
            {/* We map the NEXT destinations here to create the carousel preview */}
            {getNextDestinations().map((item, index) => (
              <motion.div
                layout
                key={item.id} // Important for Framer Motion to track elements
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative w-[200px] h-[280px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                onClick={handleNext} // Clicking a card moves to next slide
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />

                {/* Card Content */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                  <Bookmark size={14} className="text-white" />
                </div>

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-bold">{item.location}</h3>
                  <div className="flex gap-1 text-orange-400 text-xs">
                    {"★".repeat(item.rating)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Progress/Controls Area */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-4">
          <div className="text-xs text-gray-400">
            0{currentIndex + 1} <span className="mx-2 text-gray-600">/</span> 0
            {destinations.length}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? destinations.length - 1 : prev - 1
                )
              }
              className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
            >
              <ArrowRight className="rotate-180" size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
