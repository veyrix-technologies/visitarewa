"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Menu, MapPin, Bookmark, X } from 'lucide-react';

// 1. Data Configuration (Arewa Theme)
const destinations = [
  {
    id: 1,
    location: "Abuja, Nigeria",
    title: "ABUJA",
    description:
      "The capital city known for its stunning architecture and the monolithic Zuma Rock, the 'Gateway to Abuja' that rises majestically 725 meters above the surrounding countryside.",
    image: "/images/abj.jpg", // Zuma Rock / Abuja landscape vibe
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
    image: "/images/kajuru.jpg", // Castle vibe for Kajuru
    rating: 4,
  },
  {
    id: 4,
    location: "Taraba, Nigeria",
    title: "MAMBILLA",
    description:
      "The gem of Taraba, known for its cool climate, lush green rolling hills, and vast tea plantations. It offers some of the most scenic highland views in West Africa.",
    image: "/images/mambilla.jpg", // Green highland/Tea plantation vibe
    rating: 5,
  },
];

export default function TravelSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // -- NEW SEARCH STATE --
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle Search Logic
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    
    // Find index based on Title or Location
    const foundIndex = destinations.findIndex(dest => 
      dest.title.toLowerCase().includes(query) || 
      dest.location.toLowerCase().includes(query)
    );

    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex); // Jump to slide
      setIsSearchOpen(false); // Close modal
      setSearchQuery(""); // Reset text
    } else {
      alert("Destination not found! Try 'Abuja' or 'Yankari'");
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  const getNextDestinations = () => {
    let nextItems = [];
    for (let i = 1; i <= 3; i++) {
      const index = (currentIndex + i) % destinations.length;
      nextItems.push(destinations[index]);
    }
    return nextItems;
  };

  useEffect(() => {
    // Only auto-play if search/menu is CLOSED
    if(!isSearchOpen && !isMenuOpen) {
      const timer = setInterval(() => {
        handleNext();
      }, 10000); // 10 secs
      return () => clearInterval(timer);
    }
  }, [currentIndex, isSearchOpen, isMenuOpen]);

  const activeDest = destinations[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      
      {/* Background Image */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-8">
        <div className="flex items-center gap-2">
          <img src={"/logo.svg"} className="w-25" alt="Visit Arewa Logo" />
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-200">
          <a href="#" className="hover:text-white transition">News</a>
          <a href="#" className="text-white border-b-2 border-white pb-1">Destinations</a>
          <a href="#" className="hover:text-white transition">Blog</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          {/* SEARCH TRIGGER */}
          <button onClick={() => setIsSearchOpen(true)}>
             <Search className="w-5 h-5 cursor-pointer hover:text-orange-400 transition" />
          </button>

          <Menu 
            className="w-6 h-6 md:hidden cursor-pointer hover:text-orange-400 transition" 
            onClick={() => setIsMenuOpen(true)}
          />
          
          {/* <div className="hidden md:flex items-center gap-4">
            <div className="text-sm font-medium">Hello, Anne!</div>
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden border-2 border-white">
                <img src="https://i.pravatar.cc/100?img=5" alt="User" />
            </div>
          </div> */}
        </div>
      </nav>

      {/* --- NEW: SEARCH OVERLAY --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8"
          >
            <button 
              onClick={() => setIsSearchOpen(false)} 
              className="absolute top-8 right-8 p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <X className="text-white" />
            </button>
            
            <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl flex flex-col gap-4 text-center">
              <label className="text-orange-500 font-bold tracking-widest text-sm uppercase">Search Destinations</label>
              <input 
                ref={inputRef}
                type="text"
                placeholder="Where do you want to go? (e.g. Mambilla)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-700 text-3xl md:text-5xl text-white py-4 focus:outline-none focus:border-orange-500 text-center placeholder:text-gray-700 font-bold transition-colors"
              />
              <p className="text-gray-500 text-sm">Press Enter to search</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/10"
            >
              <X size={32} />
            </button>

            <a href="#" className="text-3xl font-bold hover:text-orange-500 transition">News</a>
            <a href="#" className="text-3xl font-bold text-orange-500">Destinations</a>
            <a href="#" className="text-3xl font-bold hover:text-orange-500 transition">Blog</a>
            <a href="#" className="text-3xl font-bold hover:text-orange-500 transition">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full h-full items-center">
          
          {/* LEFT: Text */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-orange-400 mb-2">
                   <MapPin size={16} />
                   <span className="uppercase tracking-widest text-xs font-bold">{activeDest.location}</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-4">
                  {activeDest.title}
                </h1>

                <p className="max-w-md text-gray-200 text-sm md:text-base leading-relaxed line-clamp-3">
                  {activeDest.description}
                </p>

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

          {/* RIGHT: Slider */}
          <div className="hidden lg:flex lg:col-span-5 h-[400px] items-center gap-4 overflow-hidden relative">
            {getNextDestinations().map((item, index) => (
              <motion.div
                layout
                key={item.id} 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative w-[200px] h-[280px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                onClick={handleNext}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
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
        
        {/* Controls */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-4">
            <div className="text-xs text-gray-400">
                0{currentIndex + 1} <span className="mx-2 text-gray-600">/</span> 0{destinations.length}
            </div>
            <div className="flex gap-4">
                <button onClick={handlePrev} className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition">
                    <ArrowRight className="rotate-180" size={16} />
                </button>
                <button onClick={handleNext} className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition">
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}