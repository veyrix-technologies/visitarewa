"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Compass, User, Mail, Link as LinkIcon, MessageSquare } from "lucide-react";

export default function JoinExplorersForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "photographer",
    link: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        role: "photographer",
        link: "",
        message: ""
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-zinc-950 border border-white/5 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none select-none">
        <Compass size={180} className="text-green-500 animate-spin-slow" />
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center md:text-left mb-10">
              <span className="text-green-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                Join the Chronicles
              </span>
              <h3 className="text-3xl font-rikafu font-bold mt-4 mb-2 text-white">
                Become a Visit Arewa Ambassador
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                If you are a photographer, writer, or filmmaker documenting the cultural, historical, or natural heritage of Northern Nigeria, we want to feature your work. Apply below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <User size={12} className="text-green-500" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g. Ahmad Ibrahim"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl focus:border-green-500 focus:bg-white/[0.07] transition-all py-3.5 px-4 text-sm focus:outline-none text-white placeholder:text-gray-600"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Mail size={12} className="text-green-500" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E.g. ahmad@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl focus:border-green-500 focus:bg-white/[0.07] transition-all py-3.5 px-4 text-sm focus:outline-none text-white placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Focus Role */}
                <div className="space-y-2">
                  <label htmlFor="role" className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Compass size={12} className="text-green-500" /> Ambassador Focus
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl focus:border-green-500 focus:bg-white/[0.07] transition-all py-3.5 px-4 text-sm focus:outline-none text-white"
                  >
                    <option value="photographer">Travel Photographer</option>
                    <option value="vlogger">Filmmaker / Vlogger</option>
                    <option value="writer">Writer & Anthropologist</option>
                    <option value="adventurer">Wildlife & Nature Blogger</option>
                  </select>
                </div>

                {/* Content Link */}
                <div className="space-y-2">
                  <label htmlFor="link" className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <LinkIcon size={12} className="text-green-500" /> Channel / Website Link
                  </label>
                  <input
                    required
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="E.g. https://youtube.com/c/yourchannel"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl focus:border-green-500 focus:bg-white/[0.07] transition-all py-3.5 px-4 text-sm focus:outline-none text-white placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={12} className="text-green-500" /> Tell us about your travels in Arewa
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a short bio or describe the locations/content you have created about Arewa..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl focus:border-green-500 focus:bg-white/[0.07] transition-all py-3.5 px-4 text-sm focus:outline-none text-white placeholder:text-gray-600 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-green-500 hover:bg-green-400 disabled:bg-green-500/50 disabled:cursor-not-allowed text-black py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-950/20 active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Send Application <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-10 text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
              <CheckCircle size={40} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-3xl font-rikafu font-bold text-white mb-2">Application Received!</h3>
              <p className="text-gray-400 max-w-md mx-auto leading-relaxed text-sm md:text-base">
                Thank you for applying to join our ambassador community. Our editorial team will review your travel content logs and get in touch with you shortly.
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 rounded-full border border-white/20 hover:border-green-500 hover:text-green-400 text-xs font-bold uppercase tracking-widest transition-all"
            >
              Submit Another Application
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
