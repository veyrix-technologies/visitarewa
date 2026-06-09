"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Mail, Lock, ArrowLeft, ShieldAlert, X } from "lucide-react";
import JoinExplorersForm from "@/components/JoinExplorersForm";

export default function PortalPage() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      router.push("/dashboard");
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#020402] min-h-screen text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <Compass className="animate-spin text-green-500 w-12 h-12" />
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Verifying Portal Access...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Top Header */}
      <header className="p-6 md:p-8 flex justify-between items-center z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-all border border-white/10 text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Visit Arewa Logo"
            width={60}
            height={60}
            className="w-14 h-auto"
          />
        </Link>
      </header>

      {/* Main card */}
      <div className="flex-1 flex items-center justify-center p-6 z-10 my-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg bg-zinc-950/60 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden"
        >
          {/* Subtle logo vector watermark */}
          <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none select-none">
            <Compass size={180} className="text-green-500" />
          </div>

          <div className="text-center mb-8">
            <span className="text-green-500 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-green-500/10 border border-green-500/25">
              Arewa Chronicles
            </span>
            <h1 className="text-3xl md:text-4xl font-rikafu mt-4 mb-2 text-white">
              Ambassadors Portal
            </h1>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Access your ambassador cockpit to document the sights, sounds, and traditions of Arewa.
            </p>
          </div>

          {/* Form Error */}
          <AnimatePresence>
            {formError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-start gap-2.5 overflow-hidden"
              >
                <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                <span>{formError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                <Mail size={12} className="text-green-500" /> Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="hello@example.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:bg-black/60 transition-all font-sans"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                <Lock size={12} className="text-green-500" /> Password
              </label>
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:bg-black/60 transition-all font-sans"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-green-500 hover:bg-green-400 text-black py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 text-xs uppercase tracking-widest mt-8 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>

          {/* Ambassador Application Callout */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                Want to document Arewa?
              </h4>
              <p className="text-[11px] text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed font-sans">
                Ambassador accounts are exclusive and vetted. Apply online to join our team of chronicles authors.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-green-500 bg-white/5 hover:bg-green-500/10 text-white hover:text-green-400 transition-all font-bold text-xs uppercase tracking-widest cursor-pointer font-sans"
            >
              Apply to be an Ambassador
            </button>
          </div>

          {/* Quick instructions for demo */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <p className="text-[9px] text-gray-500 leading-relaxed uppercase tracking-wider font-sans">
              ✨ Pro-Tip: Try 'ahmad@explore.com' with any password to login as an ambassador!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer credits */}
      <footer className="p-6 text-center text-[10px] text-gray-600 uppercase tracking-widest z-10 font-sans">
        © 2026 Visit Arewa • Documenting Northern Nigeria
      </footer>

      {/* Application Overlay Modal */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsApplyModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-white/10 rounded-[2.5rem] w-full max-w-4xl p-8 sm:p-10 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-colors cursor-pointer"
                title="Close Application Form"
              >
                <X size={18} />
              </button>

              <div className="mt-4">
                <JoinExplorersForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
