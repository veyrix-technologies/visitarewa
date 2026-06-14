"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Tag,
  CheckCircle,
  User,
  Mail,
  Phone,
  Loader2,
  Sparkles,
  Lock,
  CreditCard,
  X,
  Quote,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import EventActionButtons from "@/components/events/EventActionButtons";
import GalleryPreview from "@/components/media/GalleryPreview";
import TicketStub from "@/components/events/TicketStub";
import RelatedCreations from "@/components/media/RelatedCreations";
import SafeRikafuText from "@/components/layout/SafeRikafuText";
import Footer from "@/components/layout/footer";
import { events, determineEventStatus } from "@/lib/data";

// Main Page Component
export default function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { submissions, registrations, registerForEvent, loading, user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Paystack Mock Checkout states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"input" | "pin" | "processing" | "success">("input");
  const [processingMessage, setProcessingMessage] = useState("");
  const [generatedTicketCode, setGeneratedTicketCode] = useState("");
  const [showTicketModal, setShowTicketModal] = useState(false);

  // Find event in static data first, then fall back to submissions context
  let event: any = undefined;
  let isCustom = false;

  const staticEvent = events.find((e) => e.slug === slug || String(e.id) === slug);
  if (staticEvent) {
    event = { ...staticEvent, id: `legacy-event-${staticEvent.id}` };
  } else {
    // Prioritize exact slug or id match first
    let sub = submissions.find(
      (s) => s.type === "event" && (s.id === slug || s.slug === slug)
    );

    // Fallback to slugified title matching only if no match was found
    if (!sub) {
      sub = submissions.find(
        (s) => s.type === "event" && s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
      );
    }
    if (sub) {
      isCustom = true;
      const eventDateStr = sub.date || new Date(sub.submittedAt).toLocaleDateString();
      event = {
        id: sub.id as any,
        status: determineEventStatus(eventDateStr),
        slug: sub.slug || sub.id,
        name: sub.title,
        title: sub.title,
        date: eventDateStr,
        location: sub.location,
        category: sub.category || "Cultural",
        shortDescription: sub.description,
        fullDescription: sub.fullText,
        image: sub.imageUrl || "/images/argungu.webp",
        video: sub.link || undefined,
        gallery: sub.gallery || [],
        highlights: sub.highlights || [],
        videoCreator: undefined,
        registrationEnabled: sub.registrationEnabled ?? false,
        ticketType: sub.ticketType || "free",
        ticketPrice: sub.ticketPrice || 0,
        ticketCapacity: sub.ticketCapacity || undefined,
        theme: sub.theme,
      };
    }
  }

  // Define Event Schema JSON-LD
  const jsonLd = event ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.shortDescription,
    "image": [event.image.startsWith("http") ? event.image : `https://visitarewa.com${event.image.startsWith("/") ? "" : "/"}${event.image}`],
    "startDate": "2026-11-20T09:00:00+01:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.location,
        "addressRegion": "Arewa",
        "addressCountry": "NG"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Visit Arewa",
      "url": "https://visitarewa.com"
    }
  } : null;

  // Auto-fill logged-in user details
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Synchronize browser tab title
  useEffect(() => {
    if (event) {
      document.title = `${event.title} | Visit Arewa Events`;
    }
  }, [event]);

  if (loading && !event) {
    return (
      <div className="bg-[#020402] min-h-screen text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-green-500 w-12 h-12" />
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Verifying Event Details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    notFound();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg("Please enter your name and email address.");
      return;
    }
    setErrorMsg("");

    if (event.ticketType === "paid") {
      // Reset card form and open paystack modal
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setCardPin("");
      setCheckoutStep("input");
      setIsCheckoutOpen(true);
    } else {
      // Free ticket direct registration
      setIsSubmitting(true);
      try {
        const ticketCode = `TKT-FREE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        setGeneratedTicketCode(ticketCode);
        await registerForEvent(
          String(event.id),
          name,
          email,
          phone,
          "free",
          0,
          ticketCode
        );
        setIsRegistered(true);
        setShowTicketModal(true);
      } catch (err: any) {
        setErrorMsg(err.message || "An error occurred during registration. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const triggerMockPayment = (pin: string) => {
    setCheckoutStep("processing");
    setProcessingMessage("Connecting to gateway...");

    setTimeout(() => {
      setProcessingMessage("Verifying mock card details...");

      setTimeout(() => {
        setProcessingMessage("Authorizing transaction...");

        setTimeout(() => {
          setCheckoutStep("success");

          setTimeout(async () => {
            const ticketCode = `TKT-AREWA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            setGeneratedTicketCode(ticketCode);
            try {
              await registerForEvent(
                String(event.id),
                name,
                email,
                phone,
                "paid",
                event.ticketPrice,
                ticketCode
              );
              setIsRegistered(true);
              setShowTicketModal(true);
            } catch (err: any) {
              setErrorMsg(err.message || "Failed to log registration.");
            } finally {
              setIsCheckoutOpen(false);
            }
          }, 1000);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const handleRegisterAnother = () => {
    setIsRegistered(false);
    setShowTicketModal(false);
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone("");
    setGeneratedTicketCode("");
  };

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black relative">
      {/* Schema.org Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#020402] z-10"></div>
        </div>

        {/* Navigation & Title */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-20 z-20">
          <Link
            href="/events"
            className="w-fit flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Events</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-green-500 text-black px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider">
                <Tag size={14} />
                <span>{event.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-sm font-medium border border-white/10">
                <Calendar size={14} className="text-green-400" />
                <span>{event.date}</span>
              </div>
            </div>

            <h1 className="text-4xl font-rikafu md:text-7xl font-black tracking-tighter leading-none text-white drop-shadow-xl">
              <SafeRikafuText text={event.name} />
            </h1>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 md:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Description & Gallery */}
          <div className="lg:col-span-8 space-y-10">
            {/* Prominent Booking & Ticketing CTA Banner */}
            {event.registrationEnabled && (
              <div className="bg-gradient-to-r from-green-950/40 to-black/40 border border-green-500/30 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-sm relative overflow-hidden group shadow-[0_0_30px_rgba(34,197,94,0.02)]">
                {/* Visual glow element */}
                <div className="absolute -left-8 -top-8 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-xl shrink-0 mt-0.5 animate-pulse">
                    <Sparkles size={20} />
                  </div>
                  <div className="font-sans">
                    <h4 className="text-white text-base font-bold font-sans tracking-wide">
                      Booking is Live & Actively Open
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 max-w-xl leading-relaxed">
                      Register online today to reserve your access spot. Admission is set to{" "}
                      <span className="text-green-400 font-bold">
                        {event.ticketType === "paid" ? `₦${event.ticketPrice.toLocaleString()}` : "Free Admission"}
                      </span>
                      . Real-time ticket reference codes generated immediately.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById("registration-section");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                      // Flash highlight effect (brief border glow on target)
                      el.classList.add("ring-2", "ring-green-500/50");
                      setTimeout(() => el.classList.remove("ring-2", "ring-green-500/50"), 2000);
                    }
                  }}
                  className="relative z-10 bg-green-500 hover:bg-green-400 text-black text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] whitespace-nowrap cursor-pointer shrink-0 font-sans"
                >
                  Secure Your Ticket
                </button>
              </div>
            )}

            <div className="prose prose-lg prose-invert text-gray-400 leading-relaxed mb-8">
              <h3 className="text-2xl text-white font-bold mb-4 font-rikafu">
                Event Overview
              </h3>
              {event.fullDescription.split("\n\n").map((paragraph: any, index: any) => (
                <p key={index} className="text-xl leading-8 text-gray-300 mb-6 last:mb-0 font-sans">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Theme Quote Section */}
            {event.theme && (
              <div className="bg-white/5 border border-green-500/30 rounded-2xl p-8 relative mb-8">
                <Quote
                  className="absolute top-4 right-4 text-green-500/30"
                  size={32}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-500 mb-3 block font-sans">
                  Event Theme
                </span>
                <blockquote className="text-2xl font-serif italic text-gray-100 leading-relaxed">
                  "{event.theme}"
                </blockquote>
              </div>
            )}

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div>
                <h3 className="text-2xl text-white font-bold mb-6 font-rikafu">
                  What to Expect
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.highlights.map((highlight: any, index: any) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-green-500/50 transition-colors group"
                    >
                      <CheckCircle
                        className="text-green-500 group-hover:scale-110 transition-transform shrink-0"
                        size={20}
                      />
                      <span className="text-gray-300 font-sans font-medium">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {event.gallery && event.gallery.length > 0 && (
              <div>
                <h3 className="text-2xl text-white font-bold mb-6 font-rikafu">Gallery</h3>
                <GalleryPreview images={event.gallery} />
              </div>
            )}

            {!event.registrationEnabled && (
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-center text-xs text-gray-500 font-sans leading-relaxed mt-10">
                {event.name === "SIP, PAINT & POETRY"
                  ? "Registration is required. This is a free event open to all visitors."
                  : "No registration required. This is a public showcase event open to all visitors."}
              </div>
            )}
          </div>

          {/* Right Column: Info Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Info Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-sm">
              {/* Info Rows */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white font-bold text-lg">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-bold text-lg">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className="text-green-400 font-bold text-lg capitalize">{event.status}</p>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 my-4"></div>

              {/* INTERACTIVE ACTIONS */}
              <EventActionButtons
                videoUrl={event.video}
                title={event.name}
                creator={(event as any).videoCreator}
              />
            </div>
          </div>
        </div>

        {/* --- PREMIUM REGISTRATION / BOOKING DESK --- */}
        {event.registrationEnabled && (
          <div
            id="registration-section"
            className="max-w-4xl mx-auto w-full mt-12 md:mt-20 bg-gradient-to-br from-[#050f07] via-zinc-950 to-black border border-green-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.08)] transition-all duration-500 scroll-mt-24 animate-fade-in"
          >
            {/* Visual background accents */}
            <div className="absolute -right-32 -top-32 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-green-950/25 rounded-full blur-3xl pointer-events-none"></div>

            {/* Glowing lines or accent border glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

            <AnimatePresence mode="wait">
              {!isRegistered ? (
                <motion.div
                  key="registration-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Top layout: Badge & Header + Live Urgency Bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 text-green-400 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                          Live Booking Desk
                        </span>
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest font-sans">
                          {event.ticketType === "paid" ? `Paid Admission • ₦${event.ticketPrice.toLocaleString()}` : "Free Admission"}
                        </span>
                      </div>
                      <h4 className="text-3xl md:text-5xl font-bold font-rikafu text-white tracking-wide leading-tight">
                        {event.ticketType === "paid" ? "Secure Your Passes" : "Secure Your Spot"}
                      </h4>
                      <p className="text-sm text-gray-400 max-w-xl font-sans leading-relaxed">
                        {event.ticketType === "paid"
                          ? "Purchase your ticket online using our secure simulated checkout gateway."
                          : "Join us for this cultural showcase. Fill in your details below to register."}
                      </p>
                    </div>

                    {/* Ticket availability widget */}
                    <div className="bg-black/40 border border-white/10 p-5 rounded-2xl md:w-80 space-y-3 shrink-0 font-sans backdrop-blur-sm">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-medium">Ticket Availability</span>
                        <span className="text-green-400 font-bold">94% Claimed</span>
                      </div>
                      {/* Custom progress bar */}
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="w-[94%] h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                      </div>
                      <div className="text-[10px] text-gray-500 flex justify-between">
                        <span>Popular demand</span>
                        <span>Only a few spots left</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMsg && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 font-sans">
                        {errorMsg}
                      </div>
                    )}

                    {/* Inputs organized in a 2x2 grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block font-sans">
                          Full Name <span className="text-green-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <User className="absolute left-4 text-gray-500 transition-colors focus-within:text-green-500" size={18} />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Abubakar Sani"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                            className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-green-500 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block font-sans">
                          Email Address <span className="text-green-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-4 text-gray-500" size={18} />
                          <input
                            type="email"
                            required
                            placeholder="e.g. abubakar@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                            className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-green-500 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block font-sans">
                          Phone Number (Optional)
                        </label>
                        <div className="relative flex items-center">
                          <Phone className="absolute left-4 text-gray-500" size={18} />
                          <input
                            type="tel"
                            placeholder="e.g. +234 803 123 4567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={isSubmitting}
                            className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-green-500 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex flex-col justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-green-500 text-black font-black py-4 rounded-xl hover:bg-green-400 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:shadow-[0_0_40px_rgba(34,197,94,0.35)] text-xs uppercase tracking-widest font-sans"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin text-black" size={16} />
                              Processing...
                            </>
                          ) : event.ticketType === "paid" ? (
                            `Pay & Register • ₦${event.ticketPrice.toLocaleString()}`
                          ) : (
                            "Register Now"
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Micro copy footer inside card */}
                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between text-xs text-gray-500 font-sans">
                      <div className="flex items-center gap-1">
                        <CheckCircle size={14} className="text-green-500" />
                        <span>Simulated secure gateway authorization</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sparkles size={14} className="text-green-500" />
                        <span>Pass includes printable custom layout QR Code</span>
                      </div>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="registration-success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="space-y-8"
                >
                  {/* Ticket Success Header Message */}
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                      <CheckCircle size={24} />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold font-rikafu text-green-400 tracking-wide">
                      Registration Confirmed!
                    </h4>
                    <p className="text-sm text-gray-400 font-sans max-w-md mx-auto">
                      Your digital ticket pass has been generated. Show this at the gates to scan and gain access.
                    </p>
                  </div>

                  {/* Ticket Stub Card */}
                  <TicketStub
                    eventImage={event.image}
                    eventName={event.name}
                    eventLocation={event.location}
                    eventDate={event.date}
                    attendeeName={name}
                    ticketType={event.ticketType}
                    ticketPrice={event.ticketPrice}
                    ticketCode={generatedTicketCode}
                    className="max-w-md mx-auto shadow-2xl"
                  />

                  {/* Controls (Print / Register Another) */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
                    <button
                      onClick={() => setShowTicketModal(true)}
                      className="w-full sm:flex-1 bg-green-500 hover:bg-green-400 text-black py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                    >
                      View Full Size & Print
                    </button>
                    <button
                      onClick={handleRegisterAnother}
                      className="w-full sm:w-auto text-xs text-green-400 hover:text-green-300 underline font-semibold transition-colors font-sans py-2 text-center"
                    >
                      Register another person
                    </button>
                  </div>

                  {/* Platform Promo Callout */}
                  <div className="pt-4 border-t border-white/5 w-full max-w-md mx-auto text-center font-sans">
                    <p className="text-[10px] text-gray-500">
                      Want to host your own showcase?{" "}
                      <Link href="/portal" className="text-green-400 hover:underline font-bold">
                        Apply to be an Ambassador
                      </Link>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <RelatedCreations searchTerm={event.name} excludeId={event.id} />
      </div>


      {/* --- MOCK PAYSTACK PAYMENT PORTAL OVERLAY --- */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-black"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-[#161a16] border border-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl relative font-sans text-gray-200"
            >
              {/* Header bar */}
              <div className="bg-[#1b221b] border-b border-white/5 p-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black font-rikafu text-xs">
                    WA
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 leading-none">Paying to</p>
                    <p className="text-sm font-bold text-white mt-1">Visit Arewa Chronicles</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 leading-none">Amount</p>
                  <p className="text-lg font-black text-emerald-400 mt-1">₦{event.ticketPrice.toLocaleString()}</p>
                </div>
              </div>

              {/* Checkout container */}
              <div className="p-6 min-h-[280px] flex flex-col justify-between">
                {checkoutStep === "input" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                        Secure Card Checkout
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">{email}</span>
                    </div>

                    {/* Card Number */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="4000 1234 5678 9010"
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
                          setCardNumber(val);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500 transition-all font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Card Expiry */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Expiry Date</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            if (val.length > 2) {
                              val = val.substring(0, 2) + "/" + val.substring(2);
                            }
                            setCardExpiry(val);
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500 transition-all font-mono text-center"
                        />
                      </div>

                      {/* Card CVV */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500 transition-all font-mono text-center tracking-widest"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsCheckoutOpen(false)}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer border border-white/5 font-sans"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (cardNumber.length < 15 || cardExpiry.length < 5 || cardCvv.length < 3) {
                            setErrorMsg("Please fill out complete mock card details.");
                            return;
                          }
                          setErrorMsg("");
                          setCheckoutStep("pin");
                        }}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.2)] font-sans"
                      >
                        Pay ₦{event.ticketPrice.toLocaleString()}
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === "pin" && (
                  <div className="space-y-6 flex flex-col justify-between flex-1 py-4">
                    <div className="text-center space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
                        Verification Required
                      </span>
                      <p className="text-xs text-gray-400">Enter your 4-digit card PIN to authorize payment</p>
                    </div>

                    <div className="flex justify-center">
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        value={cardPin}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setCardPin(val);
                          if (val.length === 4) {
                            triggerMockPayment(val);
                          }
                        }}
                        className="bg-black/60 border border-white/10 rounded-2xl p-4 text-2xl text-center w-36 tracking-[0.5em] focus:outline-none focus:border-emerald-500 transition-all font-mono text-white"
                      />
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep("input")}
                        className="text-xs text-gray-500 hover:text-emerald-400 underline transition-all cursor-pointer font-sans"
                      >
                        Back to Card Details
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === "processing" && (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-8">
                    <Loader2 className="animate-spin text-emerald-400 w-12 h-12" />
                    <div className="text-center">
                      <p className="text-sm font-bold text-white animate-pulse">{processingMessage}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Secured by Paystack Mock</p>
                    </div>
                  </div>
                )}

                {checkoutStep === "success" && (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-8 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <CheckCircle size={36} />
                    </div>
                    <div>
                      <p className="text-base font-bold text-emerald-400 font-sans">Transaction Successful!</p>
                      <p className="text-xs text-gray-400 mt-1">Your ticket is being generated.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --- DIGITAL TICKET PASS OVERLAY --- */}
      <AnimatePresence>
        {showTicketModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-sm relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowTicketModal(false)}
                className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors bg-white/5 border border-white/10 p-2 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Ticket Card Stub */}
              <TicketStub
                eventImage={event.image}
                eventName={event.name}
                eventLocation={event.location}
                eventDate={event.date}
                attendeeName={name}
                ticketType={event.ticketType}
                ticketPrice={event.ticketPrice}
                ticketCode={generatedTicketCode}
              />

              {/* Print Action for Modal */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer font-sans"
                >
                  Print / Save Ticket
                </button>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer border border-white/10 font-sans"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  );
}