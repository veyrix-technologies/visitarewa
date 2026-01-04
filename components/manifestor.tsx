'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <section className="bg-black text-white py-32 px-6 md:px-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Animated Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-[1px] w-12 bg-green-500"></div>
          <span className="text-green-500 font-bold tracking-[0.3em] text-sm uppercase">The Narrative</span>
          <div className="h-[1px] w-12 bg-green-500"></div>
        </motion.div>

        {/* Main Text */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl font-serif leading-tight text-gray-200"
        >
          "The North is not just a place on the map. It is a tapestry woven with 
          <span className="text-white font-bold"> ancient history</span>, 
          <span className="text-white font-bold"> breathtaking landscapes</span>, and 
          <span className="text-green-500 italic"> resilient souls</span>."
        </motion.h2>

        {/* Small Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-gray-500 text-lg max-w-2xl mx-auto"
        >
          From the Zuma Rock to the Mambilla Plateau, we are defined by our land. 
          But our true strength lies in our people—the creators, the leaders, and the voices 
          that echo across the savannah.
        </motion.p>
      </div>
    </section>
  );
}