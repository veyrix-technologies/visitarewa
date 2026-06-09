"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Send, Ticket, CreditCard, Users, TrendingUp, Sparkles } from "lucide-react";
import ArewaEvents from "@/components/events";
import ArewaCuisine from "@/components/food";
import Footer from "@/components/footer";
import Manifesto from "@/components/manifestor";
import ArewaExcellence from "@/components/people";
import Preloader from "@/components/preloader";
import HeroSection from "@/components/hero";
import ArewaLanguages from "@/components/languages";
import CraftsShowcase from "@/components/crafts";
import CustomCursor from "@/components/CustomCursor";
import MapSection from "@/components/map-section";
import ArewaExplorers from "@/components/explorers";

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
      {/* Custom cursor */}
      <CustomCursor />

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

          <section id="cuisine">
            <ArewaCuisine />
          </section>

          <section id="languages">
            <ArewaLanguages />
          </section>

          <section id="crafts">
            <CraftsShowcase />
          </section>

          {/* Ticketing & Registration Feature Promo Showcase Banner */}
          <div className="container mx-auto px-6 md:px-20 py-12">
            <div className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-8 md:p-12 shadow-[0_0_50px_rgba(34,197,94,0.05)]">
              {/* Blurred Decorative Circles */}
              <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-green-500/10 blur-3xl"></div>
              <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-green-500/5 blur-3xl"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
                {/* Text Side */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-green-400 w-fit">
                    <Sparkles size={12} className="animate-pulse" />
                    <span>Introducing Live Event Ticketing</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-rikafu font-bold leading-tight tracking-wide text-white">
                    Host, Register & Sell Tickets
                  </h3>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
                    Our biggest feature yet: Visit Arewa now lets cultural hosts and storytellers launch live events, collect booking registrations, and manage ticket sales with an immersive, secure simulation.
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/dashboard/submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 text-black px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.25)] hover:shadow-[0_0_40px_rgba(34,197,94,0.45)] hover:-translate-y-0.5 cursor-pointer font-sans"
                    >
                      <span>Host & Sell Tickets Now</span>
                      <Send size={14} />
                    </Link>
                  </div>
                </div>

                {/* Features Highlights Side */}
                <div className="lg:col-span-5 grid grid-cols-1 gap-4 font-sans">
                  {/* Feature 1 */}
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-500/20 transition-all group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400 group-hover:scale-105 transition-transform">
                      <Ticket size={20} />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Custom Ticket Configuration</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">Toggle registration, define free or paid access, set prices, and configure capacity limits.</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-500/20 transition-all group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400 group-hover:scale-105 transition-transform">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Mock Paystack Checkout Gateway</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">Immersive 4-digit PIN banking simulation interface. Generate unique reference codes instantly.</p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-500/20 transition-all group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400 group-hover:scale-105 transition-transform">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Live Host Sales Analytics</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">Monitor real-time revenue cards, ticket sales capacity progress bars, and attendee registries.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAKE SURE THIS ID MATCHES THE LINK (#events) */}
          <section id="events">
            <ArewaEvents />
          </section>

          <section id="people">
            <ArewaExcellence />
          </section>

          <section id="explorers">
            <ArewaExplorers />
          </section>

          <section id="map">
            <MapSection />
          </section>

          <Footer />
        </motion.div>
      )}
    </main>
  );
}