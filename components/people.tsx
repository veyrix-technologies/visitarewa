"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User, Video, Mic, Briefcase } from "lucide-react";
import { people as peopleData } from "@/lib/data";

// Add icons to people data
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
    default:
      icon = null;
  }
  return { ...person, icon };
});

export default function ArewaTalent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % people.length);
  };

  const getNextPeople = () => {
    let nextItems = [];
    for (let i = 1; i <= 3; i++) {
      const index = (currentIndex + i) % people.length;
      nextItems.push(people[index]);
    }
    return nextItems;
  };

  const activePerson = people[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-900 text-white font-sans">
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
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full h-full items-center">
          {/* LEFT: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePerson.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-12 bg-green-500"></div>
                  <span className="text-green-500 font-bold tracking-[0.2em] uppercase text-sm">
                    Arewa Excellence
                  </span>
                </div>

                {/* Role Title */}
                <div className="flex items-center gap-3 text-gray-400 mb-4 font-mono text-sm">
                  {activePerson.icon}
                  <span className="uppercase">{activePerson.role}</span>
                </div>

                {/* Name */}
                <h1 className="text-6xl md:text-8xl font-bold font-serif tracking-tight text-white mb-6">
                  {activePerson.name}
                </h1>

                {/* Description */}
                <p className="max-w-xl text-gray-300 text-lg leading-relaxed border-l-4 border-green-500/50 pl-6">
                  {activePerson.shortDescription}
                </p>

                {/* MOBILE BUTTONS (Visible only on small screens) */}
                <div className="mt-10 flex lg:hidden gap-4 flex-wrap">
                  <Link
                    href={`/people/${activePerson.slug}`}
                    className="  text-white font-bold mt-5"
                  >
                    View Full Profile
                  </Link>
                  <button
                    onClick={handleNext}
                    className="group flex items-center gap-4 text-white hover:text-green-400 transition-colors"
                  >
                    <div className="p-4 rounded-full border border-white/20 group-hover:border-green-500 transition-colors">
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="font-bold tracking-widest text-sm whitespace-nowrap">
                      NEXT TALENT
                    </span>
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
                  onClick={handleNext}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative w-[240px] h-[360px] flex-shrink-0 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-white/10 group"
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

            {/* DESKTOP BUTTONS (Visible only on large screens) */}
            <div className="flex  gap-10 items-center mt-6">
              <button
                onClick={handleNext}
                className="group flex items-center gap-4 text-white hover:text-green-400 transition-colors"
              >
                <div className="p-4 rounded-full border border-white/20 group-hover:border-green-500 transition-colors">
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="font-bold tracking-widest text-sm whitespace-nowrap">
                  NEXT TALENT
                </span>
              </button>

              <Link
                href="/people"
                className=" text-white hover:text-green-500 font-bold  transition-colors uppercase"
              >
                Explore More Talent
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Pagination */}
        <div className="absolute bottom-10 left-20 flex gap-2">
          {people.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 transition-all duration-300 ${
                idx === currentIndex ? "w-12 bg-green-500" : "w-4 bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
