"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User, Video, Mic, Briefcase } from "lucide-react";

// 1. Data: Real Arewa Talent
const people = [
  {
    id: 1,
    name: "Aliko Dangote",
    role: "TITAN OF INDUSTRY",
    description:
      "The wealthiest Black person in the world and a proud son of Kano. He transformed a small trading firm into a pan-African conglomerate, proving that Arewa enterprise can build global empires.",
    image: "/images/dangote.jpg",
    icon: <Briefcase size={16} />,
  },
  {
    id: 2,
    name: "Ali Nuhu",
    role: "THE KING OF KANNYWOOD",
    description:
      "Known as 'Sarki,' he is the most decorated actor in Northern Nigeria. With over 500 films, he bridged the gap between Kannywood and Nollywood, bringing Hausa storytelling to the global stage.",
    image: "/images/ali.jpg",
    icon: <Video size={16} />,
  },
  {
    id: 3,
    name: "DJ Abba",
    role: "AREWA POP PIONEER",
    description:
      "A multi-talented rapper, producer, and performer. He is the face of the modern Northern sound, blending fierce Hausa lyricism with high-energy beats that resonate from Kaduna to Lagos.",
    image: "/images/ab.jpg",
    icon: <Mic size={16} />,
  },
  {
    id: 4,
    name: "Maryam Bukar",
    role: "POET & STORYTELLER",
    description:
      "Professionally known as 'Alhanislam,' she is a world-renowned spoken word artist. Her powerful verses weave together heritage, faith, and the African experience, delivering the Northern narrative to global stages with emotional depth.",
    image: "/images/maryam.jpeg",
    icon: <Mic size={16} />,
  },
  {
    id: 5,
    name: "Rahama Sadau",
    role: "GLOBAL ICON",
    description:
      "Actress, producer, and entrepreneur. From the North to Bollywood and beyond, she has defied boundaries to become a household name, showcasing the elegance, grit, and versatility of the Northern woman.",
    image: "/images/rahama.jpg",
    icon: <User size={16} />,
  },
];

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
    <div className="relative w-full h-screen overflow-hidden bg-zinc-900 text-white font-sans border-t border-white/10">
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
          <img
            src={activePerson.image}
            alt={activePerson.name}
            className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Text */}
      <div className="absolute top-12 right-12 z-20 hidden md:block">
        <h2 className="text-8xl font-black text-white/5 tracking-widest rotate-90 origin-top-right">
          TALENT
        </h2>
      </div>

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
                <div className="flex items-center gap-3 text-gray-400 mb-2 font-mono text-sm">
                  {activePerson.icon}
                  <span className="uppercase">{activePerson.role}</span>
                </div>

                {/* Name */}
                <h1 className="text-6xl md:text-8xl font-bold font-serif tracking-tight text-white mb-6">
                  {activePerson.name}
                </h1>

                {/* Description */}
                <p className="max-w-xl text-gray-300 text-lg leading-relaxed border-l-4 border-green-500/50 pl-6">
                  {activePerson.description}
                </p>

                {/* MOBILE BUTTON (Visible only on small screens) */}
                <button
                  onClick={handleNext}
                  className="mt-10 group flex lg:hidden items-center gap-4 text-white hover:text-green-400 transition-colors"
                >
                  <div className="p-4 rounded-full border border-white/20 group-hover:border-green-500 transition-colors">
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="font-bold tracking-widest text-sm">
                    NEXT TALENT
                  </span>
                </button>
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative w-[240px] h-[360px] flex-shrink-0 rounded-lg overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-500 border border-white/10"
                  onClick={handleNext}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-xs text-green-400 font-bold mb-1">
                      {item.role}
                    </p>
                    <h3 className="text-xl font-bold text-white leading-none">
                      {item.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* DESKTOP BUTTON (Visible only on large screens) */}
            <button
              onClick={handleNext}
              className="group flex items-center gap-4 text-white hover:text-green-400 transition-colors"
            >
              <div className="p-4 rounded-full border border-white/20 group-hover:border-green-500 transition-colors">
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-bold tracking-widest text-sm">
                NEXT TALENT
              </span>
            </button>
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
