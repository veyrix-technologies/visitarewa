"use client";

import React, { useState, useEffect } from "react";
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

  // 1. Check Session Storage (Existing logic)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visitArewa_intro_shown");
    if (hasVisited) {
      setLoading(false);
    }
  }, []);

  // 2. NEW: Handle Scroll AFTER loading finishes
  useEffect(() => {
    if (!loading && window.location.hash) {
      // Find the element by the hash (e.g., "events")
      const id = window.location.hash.substring(1); 
      const element = document.getElementById(id);

      if (element) {
        // Wait a tiny bit for the Fade In animation to start rendering layout
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); 
      }
    }
  }, [loading]); // <--- Runs whenever 'loading' changes

  const handlePreloaderComplete = () => {
    setLoading(false);
    sessionStorage.setItem("visitArewa_intro_shown", "true");
  };

  return (
    <main className="bg-black w-full min-h-screen text-white selection:bg-green-500 selection:text-black">
      {/* ... (Rest of your JSX remains exactly the same) ... */}
      
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <Preloader onComplete={handlePreloaderComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <section id="destinations">
            <HeroSection />
          </section>

          <Manifesto />

          <section id="people">
            <ArewaTalent />
          </section>

          <section id="cuisine">
            <ArewaCuisine />
          </section>

          {/* MAKE SURE THIS ID MATCHES THE LINK (#events) */}
          <section id="events">
            <ArewaEvents />
          </section>

          <Footer />
        </motion.div>
      )}
    </main>
  );
}