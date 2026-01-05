"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Flame, Leaf, Droplet } from "lucide-react";

const dishes = [
  {
    id: "suya",
    name: "Spicy Kilishi & Suya",
    tagline: "The Taste of Fire",
    description:
      "Thinly sliced beef, sun-dried and coated in a fiery blend of peppers, ginger, and ground peanuts (Kuli-kuli). It is not just a snack; it is a rite of passage.",
    image: "/images/suya.jpg",
    stats: ["Spicy", "Smoky", "Street Food"],
  },
  {
    id: "tuwo",
    name: "Tuwo Shinkafa & Miyan Taushe",
    tagline: "The Soul of the Home",
    description:
      "Soft, mashed rice served with a rich, dark green soup made from powdered baobab leaves. A comfort food that has nourished generations.",
    image: "/images/tuwo.jpg",
    stats: ["Traditional", "Hearty", "Dinner"],
  },
  {
    id: "fura",
    name: "Fura da Nono",
    tagline: "The Savannah's Nectar",
    description:
      "A refreshing blend of fermented milk (Nono) and millet dough balls (Fura), often spiced with ginger and cloves. The ultimate drink for the hot afternoon sun.",
    image: "/images/fura.png",
    stats: ["Refreshing", "Dairy", "Sweet"],
  },
  {
    id: "waina",
    name: "Masa (Waina)",
    tagline: "The Morning Delight",
    description:
      "Fermented rice cakes fried to golden perfection. Crisp on the outside, sour and soft on the inside, best served with Yaji or vegetable soup.",
    image: "/images/masa.jpg",
    stats: ["Breakfast", "Fermented", "Soft"],
  },
];

export default function ArewaCuisine() {
  const [activeDish, setActiveDish] = useState(dishes[0]);

  return (
    <section className="bg-zinc-950 text-white py-24 px-6 md:px-20 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
        {/* LEFT: The Image Display */}
        <div className="flex flex-col justify-center">
          <div className="mb-10">
            <span className="text-green-500 font-bold tracking-widest text-sm uppercase">
              Culinary Heritage
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mt-2">
              Tastes of the North
            </h2>
          </div>

          <div className="space-y-4">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setActiveDish(dish)}
                className={`group cursor-pointer p-6 rounded-xl transition-all duration-300 border ${
                  activeDish.id === dish.id
                    ? "bg-white/5 border-green-500"
                    : "bg-transparent border-transparent hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3
                    className={`text-xl font-bold ${
                      activeDish.id === dish.id
                        ? "text-green-400"
                        : "text-white group-hover:text-gray-200"
                    }`}
                  >
                    {dish.name}
                  </h3>
                </div>

                {/* Expand description only if active */}
                <AnimatePresence>
                  {activeDish.id === dish.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 text-sm leading-relaxed mt-2">
                        {dish.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: The Menu Selection */}
        <div className="relative h-[500px] w-full  rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDish.id}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 "
            >
              <Image
                src={activeDish.image}
                alt={activeDish.name}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full flex gap-4">
                {activeDish.stats.map((stat, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold uppercase tracking-wider text-green-400 border-r border-white/20 last:border-0 pr-4 last:pr-0"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
