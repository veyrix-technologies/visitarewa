"use client";

import { Instagram, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-20 border-t border-white/10 relative overflow-hidden">
      {/* Big Background Text */}
      <h1 className="absolute top-0 left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/5 pointer-events-none whitespace-nowrap">
        VISIT AREWA
      </h1>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <img src={"/logo.svg"} className="w-25" alt="Visit Arewa Logo" />
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Showcasing the beauty, talent, and heritage of Northern Nigeria to
            the world. A digital archive of our stories.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-white">Explore</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>
              <a
                href="#destinations"
                className="hover:text-green-500 transition-colors duration-300 block"
              >
                Destinations
              </a>
            </li>
            <li>
              <a
                href="#people"
                className="hover:text-green-500 transition-colors duration-300 block"
              >
                People & Heritage
              </a>
            </li>
            <li>
              <a
                href="#cuisine"
                className="hover:text-green-500 transition-colors duration-300 block"
              >
                Culinary Delights
              </a>
            </li>
            <li>
              <a
                href="#events"
                className="hover:text-green-500 transition-colors duration-300 block"
              >
                Events & Festivals
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-lg mb-6">Contact</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>hello@visitarewa.com</li>
            <li>+234 902 2505 500</li>
            <li>Abuja, Nigeria</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-lg mb-6">Join the Tribe</h4>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg focus:outline-none focus:border-green-500 transition text-sm"
            />
            <button className="bg-white text-black font-bold py-3 rounded-lg hover:bg-green-500 hover:text-white transition flex justify-center items-center gap-2">
              Subscribe <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>
          &copy; 2026 Arewa Showcase. Designed by{" "}
          <a href="https://veyrixtech.com/" className="text-green-500">
            Veyrix Technologies
          </a>
          .
        </p>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/visit_arewa/">
            <Instagram
              size={18}
              className="hover:text-white cursor-pointer transition"
            />
          </a>
          <Twitter
            size={18}
            className="hover:text-white cursor-pointer transition"
          />
          <Linkedin
            size={18}
            className="hover:text-white cursor-pointer transition"
          />
        </div>
      </div>
    </footer>
  );
}
