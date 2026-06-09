"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Compass,
  ArrowLeft,
  MapPin,
  Clock,
  CheckCircle,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Flame,
  ChefHat,
  Users,
  Copy,
  Check,
  ExternalLink,
  Mail,
  Phone,
  Trash2,
  Edit3,
  X,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TicketStub from "@/components/TicketStub";
import GalleryPreview from "@/components/GalleryPreview";
export default function CreationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading, submissions, registrations, deleteSubmission, users } = useAuth();
  const router = useRouter();

  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const creation = submissions.find((sub) => sub.id === id);

  let pathType = "destinations";
  if (creation) {
    if (creation.type === "cuisine") pathType = "food";
    else if (creation.type === "event") pathType = "events";
    else if (creation.type === "craft") pathType = "crafts";
  }
  const publicPath = creation ? `/${pathType}/${creation.slug || creation.id}` : "";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSubmission(id);
      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to delete creation", err);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Route protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/portal");
    }
  }, [user, loading, router]);

  // Setup share URL on client mount
  useEffect(() => {
    if (creation) {
      setShareUrl(`${window.location.origin}${publicPath}`);
    }
  }, [creation, publicPath]);

  if (loading) {
    return (
      <div className="bg-[#020402] min-h-screen text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <Compass className="animate-spin text-green-500 w-12 h-12" />
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Loading Creation Details...</p>
        </div>
      </div>
    );
  }

  if (!creation) {
    return (
      <DashboardLayout>
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-6">
          <Info className="text-red-400 w-16 h-16 mb-4 animate-bounce" />
          <h2 className="text-3xl font-sans font-bold text-white mb-2">Creation Not Found</h2>
          <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
            The submission ID you are trying to access does not exist or has been removed.
          </p>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
          >
            Return to Dashboard
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter registrations for this specific event
  const eventRegistrations = registrations.filter((r) => r.eventId === id);

  // Apply search filter
  const filteredRegistrations = eventRegistrations.filter((reg) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      reg.name.toLowerCase().includes(query) ||
      reg.email.toLowerCase().includes(query) ||
      (reg.phone && reg.phone.includes(query)) ||
      (reg.ticketCode && reg.ticketCode.toLowerCase().includes(query))
    );
  });

  return (
    <DashboardLayout>
        {/* --- HERO BANNER --- */}
        <div className="relative h-[55vh] w-full bg-zinc-950">
          <div className="relative w-full h-full">
            <img
              src={creation.imageUrl || "/images/zuma.webp"}
              alt={creation.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#020402]"></div>
          </div>

          {/* Back Link & Title */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-10">
            <Link
              href="/dashboard"
              className="w-fit flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </Link>

            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center flex-wrap gap-3">
                {/* Type Badge */}
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-gray-200">
                  {creation.type}
                </span>

                {/* Status Badge */}
                {creation.status === "published" ? (
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-1.5 backdrop-blur-md">
                    <CheckCircle size={10} /> Published
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center gap-1.5 backdrop-blur-md">
                    <Clock size={10} /> Pending Review
                  </span>
                )}

                <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                  <MapPin size={12} className="text-green-500" />
                  <span>{creation.location}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-7xl font-rikafu font-black tracking-tight leading-none text-white drop-shadow-2xl">
                {creation.title}
              </h1>
            </div>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left: About & Full Story & Registrations (8 Cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Live Booking Event Status Card */}
              {creation.type === "event" && creation.registrationEnabled && (
                <div className="bg-gradient-to-r from-green-950/30 to-black/30 border border-green-500/20 rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm shadow-xl font-sans">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sparkles size={60} className="text-green-500" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-500/10 border border-green-500/20 text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                        <span>Live Booking Active</span>
                      </span>
                      <h3 className="text-xl font-bold font-sans tracking-wide text-white mt-1">
                        Event Registry Cockpit
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                        Public registration and ticket sales are online. Monitor real-time sales progress, manage guest credentials, and track financials below.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href={publicPath}
                        target="_blank"
                        className="bg-green-500 hover:bg-green-400 text-black px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,197,94,0.15)] cursor-pointer"
                      >
                        <span>View Live Page</span>
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Attendee Registry Section for Events */}
              {creation.type === "event" && creation.registrationEnabled && (
                <div className="bg-zinc-950/40 border border-white/5 p-8 rounded-3xl relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                    <div>
                      <h3 className="text-2xl text-white font-bold font-sans tracking-wide flex items-center gap-2">
                        Attendee Registry
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Track and manage visitors registered for this event.
                      </p>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl text-center shrink-0">
                      <span className="text-xs text-green-400 font-bold block leading-none font-sans">Total Registered</span>
                      <span className="text-2xl text-white font-black font-sans mt-1 block leading-none">
                        {eventRegistrations.length}
                      </span>
                    </div>
                  </div>

                  {/* Financial Statistics & Capacity Panel (Rendered above table if registrations exist) */}
                  {eventRegistrations.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Total Revenue Card */}
                      {creation.ticketType === "paid" && (
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl">
                          <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Sparkles size={40} className="text-green-500" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-green-500 block mb-1 font-sans">
                            Sales Revenue
                          </span>
                          <p className="text-3xl font-black  text-white tracking-wide leading-none mt-1">
                            ₦{(
                              eventRegistrations.reduce(
                                (acc, reg) => acc + (reg.ticketPrice || 0),
                                0
                              )
                            ).toLocaleString()}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-2 leading-relaxed font-sans">
                            Total revenue accumulated from paid ticket sales.
                          </p>
                        </div>
                      )}

                      {/* Ticket Capacity Card */}
                      <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-green-500 block mb-1 font-sans">
                            Ticket Sales Progress
                          </span>
                          <div className="flex justify-between items-baseline mt-1 leading-none">
                            <span className="text-3xl font-black  text-white tracking-wide">
                              {eventRegistrations.length}
                            </span>
                            <span className="text-xs text-gray-500 font-sans">
                              / {creation.ticketCapacity ? `${creation.ticketCapacity} Max` : "Unlimited Capacity"}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar (if capacity is defined) */}
                        {creation.ticketCapacity && (
                          <div className="mt-4">
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-green-500 h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (eventRegistrations.length / creation.ticketCapacity) * 100
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-[9px] text-gray-500 mt-1.5 font-mono">
                              <span>
                                {Math.round(
                                  (eventRegistrations.length / creation.ticketCapacity) * 100
                                )}% filled
                              </span>
                              <span>
                                {creation.ticketCapacity - eventRegistrations.length} tickets left
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Search Bar */}
                  {eventRegistrations.length > 0 && (
                    <div className="mb-6 relative flex items-center font-sans">
                      <Search className="absolute left-4 text-gray-500" size={16} />
                      <input
                        type="text"
                        placeholder="Search attendees by name, email, phone, or ticket code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus:border-green-500 rounded-xl py-3.5 pl-11 pr-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
                          title="Clear Search"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  )}

                  {eventRegistrations.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
                      <Users className="mx-auto text-gray-600 mb-3 animate-pulse" size={40} />
                      <h4 className="text-base text-gray-300 font-semibold mb-1 font-sans">No Registrations Yet</h4>
                      <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-sans">
                        Use the link in the sidebar to invite people to register for this event. Once they sign up, they will appear here.
                      </p>
                    </div>
                  ) : filteredRegistrations.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed border-white/5 rounded-2xl bg-white/[0.01] font-sans">
                      <Search className="mx-auto text-gray-600 mb-3 animate-pulse" size={40} />
                      <h4 className="text-base text-gray-300 font-semibold mb-1">No Matches Found</h4>
                      <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed mb-4">
                        No registrations match the search term &ldquo;{searchQuery}&rdquo;. Try typing another name, email, or code.
                      </p>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Reset Search
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500">
                            <th className="pb-3 font-bold">Attendee Info</th>
                            <th className="pb-3 font-bold">Phone</th>
                            <th className="pb-3 font-bold">Ticket Code</th>
                            <th className="pb-3 font-bold">Type</th>
                            <th className="pb-3 font-bold">Paid</th>
                            <th className="pb-3 font-bold text-right">Registration Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                          {filteredRegistrations.map((reg) => (
                            <tr key={reg.id} onClick={() => setSelectedRegistration(reg)} className="group hover:bg-white/[0.02] transition-colors cursor-pointer" title="Click to view ticket pass">
                              <td className="py-4 pr-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center font-bold font-sans text-sm">
                                    {reg.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-white font-bold">{reg.name}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 font-sans">
                                      <Mail size={12} className="text-gray-500" /> {reg.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 pr-4 text-gray-400 font-sans">
                                {reg.phone ? (
                                  <span className="flex items-center gap-1 text-xs">
                                    <Phone size={12} className="text-gray-500" /> {reg.phone}
                                  </span>
                                ) : (
                                  <span className="text-xs text-gray-600 italic">Not provided</span>
                                )}
                              </td>
                              <td className="py-4 pr-4 text-xs font-mono text-gray-400">
                                {reg.ticketCode || (
                                  <span className="text-gray-600 italic">None</span>
                                )}
                              </td>
                              <td className="py-4 pr-4 text-xs">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${reg.ticketType === "paid"
                                  ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                                  : "bg-white/5 border border-white/10 text-gray-400"
                                  }`}>
                                  {reg.ticketType || "free"}
                                </span>
                              </td>
                              <td className="py-4 pr-4 text-xs font-bold text-gray-300 font-sans">
                                {reg.ticketPrice && reg.ticketPrice > 0 ? (
                                  <span className="text-emerald-400 font-mono">
                                    ₦{reg.ticketPrice.toLocaleString()}
                                  </span>
                                ) : (
                                  <span className="text-gray-600 font-mono">—</span>
                                )}
                              </td>
                              <td className="py-4 text-gray-400 text-xs font-sans text-right">
                                {new Date(reg.registeredAt).toLocaleString(undefined, {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-zinc-950/40 border border-white/5 p-8 rounded-3xl relative">
                <h3 className="text-2xl text-white font-bold font-sans mb-6 tracking-wide">
                  Story & Documentation
                </h3>

                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-base md:text-lg">
                  {creation.fullText.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-6 font-serif italic last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Dynamic details inside submission */}
              {creation.highlights && creation.highlights.length > 0 && (
                <div className="bg-zinc-950/40 border border-white/5 p-8 rounded-3xl">
                  <h3 className="text-xl text-white font-bold font-sans mb-6 tracking-wide flex items-center gap-2">
                    <Sparkles size={16} className="text-green-500" /> Highlights & Insides
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {creation.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:border-green-500/20 transition-all font-sans">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-gray-300 text-sm font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Section */}
              {creation.gallery && creation.gallery.length > 1 && (
                <div className="bg-zinc-950/40 border border-white/5 p-8 rounded-3xl relative">
                  <h3 className="text-xl text-white font-bold font-sans mb-6 tracking-wide flex items-center gap-2">
                    Gallery
                  </h3>
                  <GalleryPreview images={creation.gallery} />
                </div>
              )}
            </div>

            {/* Right: Specs & metadata (4 Cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 lg:h-fit pb-12">
              {/* Manage Chronicle Panel */}
              <div className="bg-zinc-950/80 border border-white/5 rounded-3xl p-6 space-y-4 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Compass size={60} className="text-green-500" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-500 block mb-1">
                    Chronicle Controls
                  </span>
                  <h4 className="text-base font-bold font-sans text-white tracking-wide">
                    Manage Entry
                  </h4>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    href={`/dashboard/submit?edit=${creation.id}`}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    <Edit3 size={14} className="text-green-400" /> Edit Chronicle
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full bg-red-950/20 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500/40 text-red-400 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    <Trash2 size={14} /> Delete Chronicle
                  </button>
                </div>
              </div>

              {/* Share & Preview Link Widget */}
              {creation && (
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur-md shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>

                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-500 block mb-1 font-sans">
                      Share & Invite
                    </span>
                    <h4 className="text-base font-bold font-sans text-white tracking-wide">
                      {creation.type === "event" && creation.registrationEnabled
                        ? "Public Registration Link"
                        : "Public Chronicle Link"}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none font-mono"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="bg-green-500 hover:bg-green-400 text-black p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
                      title="Copy Link"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <Link
                      href={publicPath}
                      target="_blank"
                      className="bg-white/5 border border-white/10 hover:bg-white/10 text-white p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0"
                      title="Preview Public Page"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                    {creation.type === "event" && creation.registrationEnabled
                      ? "Copy this link and share it with attendees. Anyone with this link can register for this event."
                      : "Share this link with others so they can read and explore your chronicle on Visit Arewa."}
                  </p>
                </div>
              )}

              {/* Technical Specifications */}
              <div className="bg-zinc-950/80 border border-white/5 rounded-3xl p-8 space-y-8 backdrop-blur-md shadow-2xl">
                {/* Common info */}
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 font-sans">Location State</p>
                  <p className="text-white text-base font-bold font-sans flex items-center gap-1.5">
                    <MapPin size={16} className="text-green-500" /> {creation.location}
                  </p>
                </div>

                {/* Coordinates / Category specific */}
                {creation.coordinates && (
                  <div>
                    <div className="h-[1px] bg-white/5 my-4" />
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 font-sans">Map Coordinates</p>
                    <p className="font-mono text-green-400 text-sm">{creation.coordinates}</p>
                  </div>
                )}

                {/* Event Dates */}
                {creation.date && (
                  <div>
                    <div className="h-[1px] bg-white/5 my-4" />
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 font-sans">Event Date</p>
                    <p className="text-white text-sm font-bold flex items-center gap-1.5 font-sans">
                      <Calendar size={14} className="text-green-500" /> {creation.date}
                    </p>
                  </div>
                )}

                {/* Registration Status (For events only) */}
                {creation.type === "event" && (
                  <div>
                    <div className="h-[1px] bg-white/5 my-4" />
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 font-sans">Public Registration</p>
                    <p className={`text-xs font-bold uppercase px-3 py-1 rounded w-fit ${creation.registrationEnabled
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-white/5 border border-white/10 text-gray-400"
                      }`}>
                      {creation.registrationEnabled ? "Enabled" : "Disabled (Showcase Only)"}
                    </p>
                  </div>
                )}

                {/* Cuisine Specs */}
                {creation.type === "cuisine" && (
                  <>
                    {creation.calories && (
                      <div>
                        <div className="h-[1px] bg-white/5 my-4" />
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 font-sans">Energy Level</p>
                        <p className="text-white text-sm font-bold flex items-center gap-1.5 font-sans">
                          <Flame size={14} className="text-orange-500" /> {creation.calories}
                        </p>
                      </div>
                    )}

                    {creation.ingredients && creation.ingredients.length > 0 && (
                      <div>
                        <div className="h-[1px] bg-white/5 my-4" />
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-3 flex items-center gap-1.5 font-sans">
                          <ChefHat size={12} className="text-green-500" /> Ingredients
                        </p>
                        <ul className="space-y-1.5 text-xs text-gray-400 font-sans list-disc list-inside">
                          {creation.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                {/* Generic Categories */}
                {creation.category && (
                  <div>
                    <div className="h-[1px] bg-white/5 my-4" />
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 font-sans">Category Tag</p>
                    <p className="text-xs font-bold uppercase bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded w-fit font-sans">
                      {creation.category}
                    </p>
                  </div>
                )}

                {/* Key Characteristics / Stats */}
                {creation.stats && creation.stats.length > 0 && (
                  <div>
                    <div className="h-[1px] bg-white/5 my-4" />
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 font-sans">Key Characteristics</p>
                    <div className="flex flex-wrap gap-2">
                      {creation.stats.map((stat, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-1 rounded font-sans">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="h-[1px] bg-white/5 my-6"></div>

                {/* Admin note details */}
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 block mb-1 font-sans">Submitted By</span>
                  <span className="text-xs text-white font-bold block font-sans">
                    {(() => {
                      const creator = users.find(u => u.email.toLowerCase() === creation.userEmail.toLowerCase());
                      return creator ? `@${creator.username}` : creation.userEmail;
                    })()}
                  </span>
                  <span className="text-[10px] text-gray-600 block mt-1 font-sans">
                    On {new Date(creation.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* --- DELETION DIALOG --- */}
      <AnimatePresence>
        {showDeleteModal && (
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
              className="bg-zinc-950/80 border border-green-500/20 rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden"
            >
              {/* Premium Green Glow */}
              <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="text-center space-y-6 relative z-10">
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Trash2 size={36} className="text-red-400 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-sans text-white tracking-wide">Delete Chronicle?</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans px-2">
                    You are about to permanently remove <span className="text-green-400 font-semibold font-mono">"{creation.title}"</span> from the platform. This cannot be undone.
                  </p>
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isDeleting}
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 font-sans"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 bg-red-500 hover:bg-red-400 text-black py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 font-sans"
                  >
                    {isDeleting ? (
                      <>
                        <Compass className="animate-spin w-4 h-4 text-black" />
                        Purging...
                      </>
                    ) : (
                      <>Delete</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ATTENDEE TICKET PASS MODAL --- */}
      <AnimatePresence>
        {selectedRegistration && (
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
                onClick={() => setSelectedRegistration(null)}
                className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors bg-white/5 border border-white/10 p-2 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Ticket Card Stub */}
              <TicketStub
                eventImage={creation.imageUrl || "/images/zuma.webp"}
                eventName={creation.title}
                eventLocation={creation.location}
                eventDate={creation.date || new Date(creation.submittedAt).toLocaleDateString()}
                attendeeName={selectedRegistration.name}
                ticketType={selectedRegistration.ticketType || "free"}
                ticketPrice={selectedRegistration.ticketPrice}
                ticketCode={selectedRegistration.ticketCode}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}


