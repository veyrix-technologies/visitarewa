"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  Menu,
  MapPin,
  X,
  Share2,
  Check,
  ChevronDown,
} from "lucide-react";
import { destinations } from "@/lib/data";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function HeroSection() {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // -- NEW SEARCH STATE --
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle Search Logic
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();

    // Find index based on Title or Location
    const foundIndex = destinations.findIndex(
      (dest) =>
        dest.title.toLowerCase().includes(query) ||
        dest.location.toLowerCase().includes(query),
    );

    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex);
      setIsSearchOpen(false);
      setSearchQuery("");
    } else {
      alert("Destination will be added soon! Try 'Kajuru' or 'Yankari'");
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? destinations.length - 1 : prev - 1,
    );
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
    if (!isSearchOpen && !isMenuOpen) {
      const timer = setInterval(() => {
        handleNext();
      }, 10000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, isSearchOpen, isMenuOpen]);

  const activeDest = destinations[currentIndex];

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (isSearchOpen || isMenuOpen) return;

    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return;

    const distanceX = touchStartX - touchEndX;
    const distanceY = touchStartY - touchEndY;
    const minSwipeDistance = 50;

    if (
      Math.abs(distanceX) > Math.abs(distanceY) &&
      Math.abs(distanceX) > minSwipeDistance
    ) {
      if (distanceX > minSwipeDistance) handleNext();
      if (distanceX < -minSwipeDistance) handlePrev();
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black text-white font-sans"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
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
          <Image
            src={activeDest.image}
            alt={activeDest.title}
            className="w-full h-full object-cover brightness-75"
            fill
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-8">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            className="w-20"
            alt="Visit Arewa Logo"
            width={80}
            height={80}
          />
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-200">
          <a
            href="#destinations"
            className="text-white border-b-2 border-green-500 pb-1 font-bold"
          >
            Destinations
          </a>
          <a href="#cuisine" className="hover:text-green-400 transition">
            Cuisine
          </a>
          <a href="#languages" className="hover:text-green-400 transition">
            Languages
          </a>
          <a href="#crafts" className="hover:text-green-400 transition">
            Forgotten Crafts
          </a>
          <a href="#events" className="hover:text-green-400 transition">
            Events & Festivals
          </a>
          <a href="#people" className="hover:text-green-400 transition">
            People & Icons
          </a>
          <a href="#explorers" className="hover:text-green-400 transition">
            Explorers
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* SEARCH TRIGGER */}
          <button onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5 cursor-pointer hover:text-green-400 transition" />
          </button>

          <Menu
            className="w-6 h-6 md:hidden cursor-pointer hover:text-green-400 transition"
            onClick={() => setIsMenuOpen(true)}
          />

          {user && (
            <Link href="/dashboard" className="hidden md:flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 hover:border-green-500/30 transition-all">
              <div className="text-xs font-bold text-gray-200">Dashboard</div>
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-zinc-950 flex items-center justify-center shrink-0">
                <Image src={user.image} alt={user.name} fill className="object-cover" />
              </div>
            </Link>
          )}
        </div>
      </nav>

      {/* --- SEARCH OVERLAY --- */}
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

            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-2xl flex flex-col gap-4 text-center"
            >
              <label className="text-green-500 font-bold tracking-widest text-sm uppercase">
                Search Destinations
              </label>
              <input
                ref={inputRef}
                type="text"
                placeholder="Where do you want to go? (e.g. Mambilla)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-700 text-3xl md:text-5xl text-white py-4 focus:outline-none focus:border-green-500 text-center placeholder:text-gray-700 font-bold transition-colors"
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
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            >
              <X size={32} />
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center space-y-8 text-center">
              <a
                href="#destinations"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-white hover:text-green-500 transition-colors duration-300"
              >
                Destinations
              </a>
              <a
                href="#cuisine"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-white hover:text-green-500 transition-colors duration-300"
              >
                Cuisine
              </a>
              <a
                href="#languages"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-white hover:text-green-500 transition-colors duration-300"
              >
                Languages
              </a>
              <a
                href="#crafts"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-white hover:text-green-500 transition-colors duration-300"
              >
                Forgotten Crafts
              </a>
              <a
                href="#events"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-white hover:text-green-500 transition-colors duration-300"
              >
                Events & Festivals
              </a>
              <a
                href="#people"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-white hover:text-green-500 transition-colors duration-300"
              >
                People & Icons
              </a>
              <a
                href="#explorers"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-white hover:text-green-500 transition-colors duration-300"
              >
                Explorers
              </a>
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold text-green-400 hover:text-green-300 transition-colors duration-300 pt-4 border-t border-white/10 w-full"
                >
                  Dashboard
                </Link>
              )}
            </nav>
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
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 bg-green-500 font-sans shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                  <span className="relative z-10 text-green-400 font-sans text-[10px] md:text-xs font-black uppercase tracking-[0.25em] bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
                    Destinations Worth Visiting
                  </span>
                </div>

                {/* Location Tag */}
                <div className="flex items-center gap-2 text-gray-400 mb-4 pl-1">
                  <MapPin size={16} className="text-white" />
                  <span className="uppercase tracking-widest text-xs font-bold text-white ">
                    {activeDest.location}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-8xl font-bold lowercase first-letter:uppercase font-rikafu tracking-tighter leading-none mb-2">
                  {activeDest.title}
                </h1>

                {/* Description */}
                <p className="max-w-md text-gray-200 text-sm md:text-base leading-relaxed line-clamp-3 ">
                  {activeDest.shortDescription}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <Link href={`/destinations/${activeDest.slug}`}>
                    <button className="bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all group shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] cursor-pointer">
                      Explore
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </Link>

                  <Link href="/destinations">
                    <button className="bg-transparent border border-white/20 hover:border-green-500/50 hover:bg-white/5 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all cursor-pointer">
                      View All
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Slider */}
          <div className="hidden lg:flex lg:col-span-5 h-[400px] items-center gap-5 overflow-hidden relative">
            {getNextDestinations().map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative w-[210px] h-[300px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_-15px_rgba(34,197,94,0.35)] shadow-2xl"
                onClick={handleNext}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  fill
                  sizes="210px"
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors duration-300" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    const shareData = {
                      title: "Visit Arewa",
                      text: `Check this out: ${item.title}`,
                      url: window.location.href,
                    };

                    if (navigator.share) {
                      navigator
                        .share(shareData)
                        .catch((err) => console.log("Share dismissed", err));
                    }
                    else {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="absolute top-4 right-4 z-70 bg-black/60 backdrop-blur-md p-2.5 rounded-full hover:bg-green-500 hover:text-black hover:scale-110 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 border border-white/10 group/icon cursor-pointer"
                >
                  {copied ? (
                    <Check size={12} className="text-green-400" />
                  ) : (
                    <Share2
                      size={12}
                      className="text-white group-hover/icon:text-black"
                    />
                  )}
                </button>

                {/* Advanced Info Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
                  <span className="text-[10px] text-green-400 font-mono uppercase tracking-widest block mb-1">
                    {item.location.split(",")[0]}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-green-400 transition-colors leading-tight mb-2">
                    {item.name}
                  </h3>
                  <div className="flex gap-0.5 text-yellow-400 text-xs">
                    {"★".repeat(item.rating)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Swipe Down Indicator */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-center items-end pt-4">
          <div className="lg:hidden flex flex-col items-center gap-1 text-gray-400">
            <div className="animate-bounce">
              <ChevronDown size={20} className="opacity-80" />
            </div>
            <span className="text-[10px] tracking-widest uppercase opacity-60">
              Swipe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
