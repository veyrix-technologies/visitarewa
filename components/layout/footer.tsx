"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Twitter,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#020402] text-white pt-32 pb-0 overflow-hidden font-sans border-t border-white/5">
      {/* 1. TOP ACCENT (Neon Line) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent shadow-[0_0_10px_#22c55e]"></div>

      {/* 2. MASSIVE BACKGROUND TEXT */}
      <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/[0.03] pointer-events-none whitespace-nowrap select-none">
        VISIT AREWA
      </h1>

      <div className="container mx-auto px-6 md:px-20 relative z-20 pb-[35vh]">
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* BRAND */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/logo.png"
                  className="w-24 hover:opacity-80 transition-opacity cursor-pointer"
                  alt="Visit Arewa Logo"
                  width={96}
                  height={40}
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Showcasing the beauty, excellence, and heritage of Arewa to
              the world. Your platform for culture, events, and stories.
            </p>
          </div>

          {/* EXPLORE LINKS */}
          <div>
            <h4 className="font-bold text-green-500 mb-6 text-sm uppercase tracking-wider opacity-80">
              Explore
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li>
                <Link
                  href="/destinations"
                  className="hover:text-green-500 transition-colors block"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/food"
                  className="hover:text-green-500 transition-colors block"
                >
                  Cuisine
                </Link>
              </li>
              <li>
                <Link
                  href="/languages"
                  className="hover:text-green-500 transition-colors block"
                >
                  Languages
                </Link>
              </li>
              <li>
                <Link
                  href="/crafts"
                  className="hover:text-green-500 transition-colors block"
                >
                  Forgotten Crafts
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-green-500 transition-colors block"
                >
                  Events & Festivals
                </Link>
              </li>
              <li>
                <Link
                  href="/people"
                  className="hover:text-green-500 transition-colors block"
                >
                  People & Icons
                </Link>
              </li>
              <li>
                <Link
                  href="/explorers"
                  className="hover:text-green-500 transition-colors block"
                >
                  The Explorers
                </Link>
              </li>
              <li>
                <Link
                  href="/portal"
                  className="hover:text-green-500 transition-colors block"
                >
                  Ambassadors Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold text-green-500 mb-6 text-sm uppercase tracking-wider opacity-80">
              Contact
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="hover:text-green-500 transition-colors">
                hello@visitarewa.com
              </li>
              <li className="hover:text-green-500 transition-colors">
                +234 902 2505 500
              </li>
              <li className="hover:text-green-500 transition-colors">
                Abuja, Nigeria
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-bold text-green-500 mb-6 text-sm uppercase tracking-wider opacity-80">
              Join the Tribe
            </h4>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-lg focus:border-green-500 focus:bg-white/10 transition-all py-3 px-4 text-sm focus:outline-none"
              />
              <button className="bg-green-500 hover:bg-green-400 cursor-pointer text-black text-sm font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20">
                Subscribe <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 relative z-30">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <p>
              &copy; 2026 Visit Arewa. Made by{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://veyrixtech.com/"
                className="text-green-500 hover:text-green-400 font-bold transition-colors"
              >
                Veyrix Technologies
              </a>
              .
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/visit_arewa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-colors transform hover:scale-110"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="hover:text-green-500 transition-colors transform hover:scale-110"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="hover:text-green-500 transition-colors transform hover:scale-110"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* 3. VIBRANT LUMINOUS SKYLINE (The High-Voltage Pop) */}
      <div className="absolute bottom-0 left-0 w-full h-[35vh] pointer-events-none select-none overflow-hidden z-0">

        {/* Style block for soft twinkling and skyline glow pulsing */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes subtleTwinkle {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.75; }
          }
          @keyframes skylineGlowPulse {
            0%, 100% { filter: drop-shadow(0 0 12px rgba(74, 222, 128, 0.45)); }
            50% { filter: drop-shadow(0 0 22px rgba(74, 222, 128, 0.75)); }
          }
          .star-glow { animation: subtleTwinkle 4s infinite ease-in-out; }
          .skyline-glow-pulse { animation: skylineGlowPulse 5s infinite ease-in-out; }
        ` }} />

        {/* Ambient background sky glow dome behind Zuma Rock */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent_70%)] z-0" />

        {/* Subtle twinkling stars */}
        <svg className="absolute inset-0 w-full h-full opacity-35 z-0" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <circle cx="120" cy="60" r="1" className="fill-white star-glow" style={{ animationDelay: "0s" }} />
          <circle cx="340" cy="90" r="1.2" className="fill-green-300 star-glow" style={{ animationDelay: "1.2s" }} />
          <circle cx="610" cy="50" r="1" className="fill-white star-glow" style={{ animationDelay: "2.4s" }} />
          <circle cx="890" cy="110" r="1.5" className="fill-green-400 star-glow" style={{ animationDelay: "1.8s" }} />
          <circle cx="1080" cy="70" r="1" className="fill-white star-glow" style={{ animationDelay: "3.5s" }} />
        </svg>

        {/* Layer 1: Zuma Rock (With soft vertical gradient and glowing outline) */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full text-green-900/50"
          preserveAspectRatio="none"
          viewBox="0 0 1200 300"
        >
          <defs>
            <linearGradient id="zumaGlowGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.3)" />
              <stop offset="100%" stopColor="rgba(2, 4, 2, 0.95)" />
            </linearGradient>
          </defs>
          {/* Subtle outline path */}
          <path
            fill="none"
            stroke="rgba(74, 222, 128, 0.2)"
            strokeWidth="1.5"
            d="M0,300 L0,250 Q150,250 200,100 Q250,-50 350,250 T600,260 T900,230 T1200,280"
          />
          {/* Main path filled with gradient */}
          <path
            fill="url(#zumaGlowGrad)"
            d="M0,300 L0,250 Q150,250 200,100 Q250,-50 350,250 T600,260 T900,230 T1200,280 V300 Z"
          />
        </svg>

        {/* Layer 2: Background City (Shadow depth layer, slightly offset to create parallax effect) */}
        <div className="absolute bottom-0 w-full h-[90%] flex items-end opacity-20 left-[25px] z-10">
          <svg
            className="w-full h-40 md:h-64 text-green-900"
            preserveAspectRatio="none"
            viewBox="0 0 1200 150"
          >
            <path
              fill="currentColor"
              d="
                        M0,150 
                        L100,150 
                        L110,130 L130,130 L140,150  
                        L180,150
                        
                        L200,100 L210,90 L220,100   
                        L240,100 
                        L250,90 L260,100            
                        L260,150
                        
                        L300,150
                        
                        L450,150 L450,50 L460,40 L470,50 L470,120 
                        L480,120 
                        Q510,60 540,120 
                        L550,120 L550,50 L560,40 L570,50 L570,150 

                        L650,150
                        
                        L700,150 L700,90 L750,90 L750,150
                        L760,150 L760,70 L820,70 L820,150
                        
                        L900,150 Q1050,130 1200,150
                        V150 Z
                    "
            />
          </svg>
        </div>

        {/* Layer 3: Main Glowing City (Front layer with pulsing neon glow & custom gradient) */}
        <div className="absolute bottom-0 w-full h-full flex items-end z-20">
          <svg
            className="w-full h-40 md:h-64 text-green-500 skyline-glow-pulse"
            preserveAspectRatio="none"
            viewBox="0 0 1200 150"
          >
            <defs>
              <linearGradient id="neonCityGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="1" />
                <stop offset="50%" stopColor="#15803d" stopOpacity="1" />
                <stop offset="100%" stopColor="#020402" stopOpacity="1" />
              </linearGradient>
            </defs>

            <path
              fill="url(#neonCityGradient)"
              d="
                        M0,150 
                        L100,150 
                        L110,130 L130,130 L140,150  
                        L180,150
                        
                        L200,100 L210,90 L220,100   
                        L240,100 
                        L250,90 L260,100            
                        L260,150
                        
                        L300,150
                        
                        L450,150 L450,50 L460,40 L470,50 L470,120 
                        L480,120 
                        Q510,60 540,120 
                        L550,120 L550,50 L560,40 L570,50 L570,150 

                        L650,150
                        
                        L700,150 L700,90 L750,90 L750,150
                        L760,150 L760,70 L820,70 L820,150
                        
                        L900,150 Q1050,130 1200,150
                        V150 Z
                    "
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}
