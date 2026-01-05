"use client";

import React from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#020402] text-white pt-32 pb-0 overflow-hidden font-sans border-t border-white/5">
      {/* 1. TOP ACCENT (Neon Line) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent shadow-[0_0_10px_#22c55e]"></div>

      {/* 2. MASSIVE BACKGROUND TEXT (Your Request) */}
      <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/[0.03] pointer-events-none whitespace-nowrap select-none">
        VISIT AREWA
      </h1>

      <div className="container mx-auto px-6 md:px-20 relative z-20 pb-[35vh]">
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* BRAND */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/logo-g.svg" className="w-24" alt="Visit Arewa Logo" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Showcasing the beauty, talent, and heritage of Northern Nigeria to
              the world. A digital archive of our stories.
            </p>
            <div className="flex items-center gap-2 text-xs text-green-500 font-mono uppercase tracking-widest mt-4 font-bold">
              <MapPin size={12} />
              <span>Made in Gombe</span>
            </div>
          </div>

          {/* EXPLORE LINKS */}
          <div>
            <h4 className="font-bold text-green-500 mb-6 text-sm uppercase tracking-wider opacity-80">
              Explore
            </h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li>
                <a
                  href="#destinations"
                  className="hover:text-green-500 transition-colors block"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#people"
                  className="hover:text-green-500 transition-colors block"
                >
                  People & Heritage
                </a>
              </li>
              <li>
                <a
                  href="#cuisine"
                  className="hover:text-green-500 transition-colors block"
                >
                  Culinary Delights
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="hover:text-green-500 transition-colors block"
                >
                  Events & Festivals
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold text-green-500 mb-6 text-sm uppercase tracking-wider opacity-80">
              Contact
            </h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
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
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider opacity-80">
              Join the Tribe
            </h4>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-lg focus:border-green-500 focus:bg-white/10 transition-all py-3 px-4 text-sm focus:outline-none"
              />
              <button className="bg-green-500 hover:bg-green-500 text-black text-sm font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20">
                Subscribe <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 relative z-30">
          <p>
            &copy; 2026 Arewa Showcase. Built by{" "}
            <a
              href="https://veyrixtech.com/"
              className="text-green-500 hover:text-green-500 font-bold transition-colors"
            >
              Veyrix Technologies
            </a>
            .
          </p>

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
        {/* Layer 1: The Horizon (Zuma Rock) - Deep Green Base */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full text-green-900/50"
          preserveAspectRatio="none"
          viewBox="0 0 1200 300"
        >
          <path
            fill="currentColor"
            fillOpacity="0.8"
            d="M0,300 L0,250 Q150,250 200,100 Q250,-50 350,250 T600,260 T900,230 T1200,280 V300 Z"
          />
        </svg>

        {/* Layer 3: THE GLOWING CITY (Neon Green Foreground) */}
        <div className="absolute bottom-0 w-full h-full flex items-end">
          <svg
            className="w-full h-40 md:h-64 text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]"
            preserveAspectRatio="none"
            viewBox="0 0 1200 150"
          >
            <defs>
              <linearGradient id="neonCityGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="1" />{" "}
                {/* Bright green-500 */}
                <stop offset="100%" stopColor="#14532d" stopOpacity="1" />{" "}
                {/* Dark Green-900 */}
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

        {/* Final Fog Gradient to blend into footer background */}
        {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#020402] via-[#020402]/80 to-transparent"></div> */}
      </div>
    </footer>
  );
}
