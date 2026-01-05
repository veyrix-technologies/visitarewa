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
    <main className="bg-black w-full min-h-screen text-white selection:bg-green-500 selection:text-black">
      {/* 1. THE PRELOADER (Runs once on refresh) */}
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

      {/* 2. THE MAIN SITE (Revealed after loading) */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* SECTION 1: HERO & DESTINATIONS */}
          <section id="destinations">
            <HeroSection />
          </section>

          {/* Manifesto */}
          <Manifesto />

          {/* SECTION 2: PEOPLE & TALENT */}
          <section id="people">
            <ArewaTalent />
          </section>

          {/* SECTION 3: FOOD & CUISINE */}
          <section id="cuisine">
            <ArewaCuisine />
          </section>

          {/* SECTION 4: EVENTS & VIDEOS */}
          <section id="events">
            <ArewaEvents />
          </section>

          {/* FOOTER */}
          <Footer />
        </motion.div>
      )}
    </main>
  );
}
