"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User, Video, Mic, Briefcase } from "lucide-react";
import { people as peopleData } from "@/lib/data";

const people = peopleData.map((person) => {
  let icon;
  switch (person.slug) {
    case "aliko-dangote":
      icon = <Briefcase size={16} />;
      break;
    case "ali-nuhu":
      icon = <Video size={16} />;
      break;
    case "dj-abba":
      icon = <Mic size={16} />;
      break;
    case "maryam-bukar":
      icon = <Mic size={16} />;
      break;
    case "rahama-sadau":
      icon = <User size={16} />;
      break;
    case "sabiqah-bello":
      icon = <Mic size={16} />;
      break;
    case "usman-click":
      icon = <Video size={16} />;
      break;
    default:
      icon = null;
  }
  return { ...person, icon };
});

export default function ArewaExcellence() {
  if (!people || people.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % people.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + people.length) % people.length);
  };

  const getNextPeople = () => {
    let nextItems = [];
    for (let i = 1; i <= 3; i++) {
      const index = (currentIndex + i) % people.length;
      nextItems.push({ ...people[index], originalIndex: index });
    }
    return nextItems;
  };

  const activePerson = people[currentIndex];

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
    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return;

    const distanceX = touchStartX - touchEndX;
    const distanceY = touchStartY - touchEndY;
    const minSwipeDistance = 50;

    if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > minSwipeDistance) handleNext();
      if (distanceX < -minSwipeDistance) handlePrev();
    }
  };

  return (
    <div
      id="people"
      className="relative w-full h-screen overflow-hidden bg-zinc-900 text-white font-sans"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Image Layer */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activePerson.id}
          initial={{ opacity: 0.5, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activePerson.image}
            alt={activePerson.name}
            className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/30 lg:bg-gradient-to-r lg:from-black lg:via-black/80 lg:to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-20 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto items-center">
          {/* LEFT: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4 md:space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePerson.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="h-[2px] w-8 md:w-12 bg-green-500"></div>
                  <span className="text-green-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                    Arewa Excellence
                  </span>
                </div>

                {/* Role Title */}
                <div className="flex items-center gap-2 text-gray-400 mb-3 md:mb-4 font-mono text-xs md:text-sm">
                  {activePerson.icon}
                  <span className="uppercase tracking-wider">{activePerson.role}</span>
                </div>

                {/* Name */}
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold font-rikafu tracking-tight text-white mb-4 md:mb-6 leading-tight">
                  {activePerson.name}
                </h1>

                {/* Description */}
                <p className="max-w-xl text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed border-l-4 border-green-500/50 pl-4 md:pl-6">
                  {activePerson.shortDescription}
                </p>

                {/* MOBILE BUTTONS */}
                <div className="mt-8 flex lg:hidden items-center gap-3 flex-wrap">
                  <Link
                    href={`/people/${activePerson.slug}`}
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center px-5 py-3.5 bg-green-500 text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-green-400 active:scale-95 transition-all whitespace-nowrap text-center"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleNext}
                    className="flex-1 min-w-[120px] group flex items-center justify-center gap-2 px-5 py-3.5 border border-white/20 bg-white/5 backdrop-blur-md text-white hover:border-green-500 hover:text-green-400 active:scale-95 transition-all text-xs font-black uppercase tracking-widest rounded-full whitespace-nowrap"
                  >
                    Next <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Portrait Slider + DESKTOP BUTTON */}
          <div className="hidden lg:flex lg:col-span-6 flex-col items-end pl-10 pb-10">
            {/* The Slider */}
            <div className="flex h-[500px] items-center gap-6 overflow-hidden w-full">
              {getNextPeople().map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  onClick={() => setCurrentIndex(item.originalIndex)}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative w-[240px] h-[360px] flex-shrink-0 rounded-lg overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-500 border border-white/10 group"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    fill
                    sizes="240px"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <p className="text-xs text-green-400 font-bold mb-2">
                      {item.role}
                    </p>
                    <h3 className="text-lg font-bold text-white leading-tight mb-4 group-hover:text-green-400 transition-colors">
                      {item.name}
                    </h3>
                    <Link
                      href={`/people/${item.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs font-bold uppercase text-white/50 hover:text-white rounded transition-colors"
                    >
                      View Profile{" "}
                      <span>
                        {" "}
                        <ArrowRight
                          size={15}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* DESKTOP BUTTONS */}
            <div className="flex gap-4 items-center mt-6">
              <Link
                href={`/people/${activePerson.slug}`}
                className="flex items-center justify-center px-6 py-3 bg-green-500 text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-green-400 transition-colors whitespace-nowrap"
              >
                View Profile
              </Link>

              <Link
                href="/people"
                className="flex items-center justify-center px-6 py-3 border border-white/20 bg-black/40 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full hover:border-green-500 hover:text-green-400 transition-colors whitespace-nowrap"
              >
                All Excellence
              </Link>

              <button
                onClick={handleNext}
                className="group p-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white hover:border-green-500 hover:text-green-400 transition-colors"
                title="Next Excellence"
              >
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Pagination */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 flex gap-2 bg-black/60 backdrop-blur-md px-4 py-3 rounded-full border border-white/10">
          {people.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-green-500" : "w-2 bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
