"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ArewaEvents from "@/components/events";
import ArewaCuisine from "@/components/food";
import Footer from "@/components/footer";
import Manifesto from "@/components/manifestor";
import ArewaTalent from "@/components/people";
import Preloader from "@/components/preloader";
import HeroSection from "@/components/hero";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-black w-full min-h-screen cursor-default">
      {/* 1. Show Preloader if loading is true */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <Preloader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Show Site Content only after loading is false */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <section id="destinations" className="relative z-10">
            <HeroSection />
          </section>

          <Manifesto />

          <section id="people" className="relative z-10">
            <ArewaTalent />
          </section>

          <section id="cuisine" className="relative z-10">
            <ArewaCuisine />
          </section>

          <section id="events" className="relative z-10">
            <ArewaEvents />
          </section>

          <Footer />
        </motion.div>
      )}
    </main>
  );
}
