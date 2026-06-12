"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowLeft,
  User,
  MapPin,
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Save,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function EditProfilePage() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();

  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    origin: "",
    role: "photographer" as any,
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    website: ""
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  // Sync state with user profile details
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        bio: user.bio || "",
        origin: user.origin || "",
        role: user.role || "photographer",
        twitter: user.socials?.twitter || "",
        instagram: user.socials?.instagram || "",
        linkedin: user.socials?.linkedin || "",
        youtube: user.socials?.youtube || "",
        website: user.socials?.website || ""
      });
    }
  }, [user]);

  // Route protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/portal");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="bg-[#020402] min-h-screen text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <Compass className="animate-spin text-green-500 w-12 h-12" />
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Loading Profile Settings...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setIsSaved(false);
    setError("");

    try {
      if (!editForm.name.trim()) {
        throw new Error("Full name is required.");
      }
      if (!editForm.origin.trim()) {
        throw new Error("Origin state is required.");
      }

      await updateProfile({
        name: editForm.name,
        bio: editForm.bio,
        origin: editForm.origin,
        role: editForm.role,
        socials: {
          twitter: editForm.twitter,
          instagram: editForm.instagram,
          linkedin: editForm.linkedin,
          youtube: editForm.youtube,
          website: editForm.website
        }
      });
      
      setIsSaved(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Failed to update profile details.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Decorative glows */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-6xl z-10 relative">
          
          {/* Back link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors uppercase tracking-widest text-[10px] font-bold mb-8"
          >
            <ArrowLeft size={12} /> Back to Dashboard
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Profile Card Preview (Dynamic live feedback) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-zinc-950 border border-white/5 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                {/* Background gradient decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-[50px] rounded-full pointer-events-none" />

                <div className="flex flex-col items-center text-center">
                  {/* Profile Pic Card */}
                  <div className="relative w-28 h-28 rounded-3xl overflow-hidden border border-white/10 mb-6 shrink-0 bg-zinc-900 flex items-center justify-center group shadow-xl">
                    <img
                      src={user.image || "/images/ahmad_profile.png"}
                      alt={editForm.name || "Ambassador Avatar"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Role */}
                  <div className="flex items-center gap-1.5 justify-center">
                    <h2 className="text-2xl font-bold font-sans tracking-wide text-white truncate max-w-[200px]">
                      {editForm.name || "Storyteller Name"}
                    </h2>
                    <span className="text-green-400 shrink-0" title="Verified Ambassador">
                      <Sparkles size={16} />
                    </span>
                  </div>

                  <p className="text-green-500 text-xs font-bold uppercase tracking-widest mt-1 bg-green-500/5 border border-green-500/10 px-3 py-1 rounded-full capitalize">
                    {editForm.role.replace("vlogger", "filmmaker/vlogger")}
                  </p>

                  {/* State Origin */}
                  <p className="text-gray-400 text-xs mt-3 flex items-center justify-center gap-1 uppercase tracking-wider">
                    <MapPin size={12} className="text-green-500" />
                    {editForm.origin || "Arewa, Nigeria"}
                  </p>

                  {/* Bio */}
                  <p className="text-gray-300 text-sm leading-relaxed mt-6 font-serif italic border-t border-b border-white/5 py-4 w-full min-h-[80px] line-clamp-4">
                    "{editForm.bio || "Share a bio describing your journey and connection to Northern Nigeria..."}"
                  </p>

                  {/* Socials preview */}
                  <div className="flex items-center justify-center gap-3 mt-6">
                    {editForm.website && (
                      <a href={editForm.website} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 hover:text-green-400 transition-all">
                        <Globe size={14} />
                      </a>
                    )}
                    {editForm.twitter && (
                      <a href={editForm.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 hover:text-green-400 transition-all">
                        <Twitter size={14} />
                      </a>
                    )}
                    {editForm.instagram && (
                      <a href={editForm.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 hover:text-green-400 transition-all">
                        <Instagram size={14} />
                      </a>
                    )}
                    {editForm.linkedin && (
                      <a href={editForm.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 hover:text-green-400 transition-all">
                        <Linkedin size={14} />
                      </a>
                    )}
                    {editForm.youtube && (
                      <a href={editForm.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 hover:text-green-400 transition-all">
                        <Youtube size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Settings Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-950/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative"
              >
            {/* Header info */}
            <div className="mb-10">
              <span className="text-green-500 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                Ambassador Configuration
              </span>
              <h1 className="text-3xl md:text-5xl font-rikafu font-bold mt-4 mb-2 text-white">
                Edit Profile Settings
              </h1>
              <p className="text-gray-400 text-sm">
                Update your public storyteller card, bio information, and channel links.
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping mr-2 shrink-0"></span>
                {error}
              </div>
            )}

            {isSaved && (
              <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle size={14} className="text-green-500 animate-pulse mr-2" />
                Profile details successfully updated! Redirecting to cockpit...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Profile Details Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-6 bg-green-500"></span>
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-green-500">Ambassador Identity</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                    <User size={12} className="text-green-500" /> Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 focus:bg-black/60 transition-all"
                  />
                </div>

                {/* Origin State */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                    <MapPin size={12} className="text-green-500" /> Origin State *
                  </label>
                  <input
                    required
                    type="text"
                    value={editForm.origin}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, origin: e.target.value }))}
                    placeholder="e.g. Kano, Nigeria"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 focus:bg-black/60 transition-all"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                  <Compass size={12} className="text-green-500" /> Storytelling Focus
                </label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, role: e.target.value as any }))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-green-500 transition-all"
                >
                  <option value="photographer">Travel Photographer</option>
                  <option value="vlogger">Filmmaker / Vlogger</option>
                  <option value="writer">Writer & Anthropologist</option>
                  <option value="adventurer">Wildlife & Nature Blogger</option>
                </select>
              </div>

              {/* Biography */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Biography / Short Summary</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  placeholder="Share a short bio detailing your travels, connection to Arewa, or documentary goals..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 focus:bg-black/60 transition-all resize-none"
                />
              </div>

              {/* Social Channels Header */}
              <div className="pt-6 border-t border-white/5 space-y-4 mt-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-[1px] w-6 bg-green-500"></span>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-green-500">Channels & Links</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-2.5 items-center">
                    <Globe size={16} className="text-gray-500 shrink-0" />
                    <input
                      type="url"
                      value={editForm.website}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, website: e.target.value }))}
                      placeholder="Website URL"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-green-500 transition-all"
                    />
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Twitter size={16} className="text-gray-500 shrink-0" />
                    <input
                      type="url"
                      value={editForm.twitter}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, twitter: e.target.value }))}
                      placeholder="Twitter URL"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-green-500 transition-all"
                    />
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Instagram size={16} className="text-gray-500 shrink-0" />
                    <input
                      type="url"
                      value={editForm.instagram}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, instagram: e.target.value }))}
                      placeholder="Instagram URL"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-green-500 transition-all"
                    />
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Linkedin size={16} className="text-gray-500 shrink-0" />
                    <input
                      type="url"
                      value={editForm.linkedin}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="LinkedIn URL"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-green-500 transition-all"
                    />
                  </div>
                  <div className="flex gap-2.5 items-center md:col-span-2">
                    <Youtube size={16} className="text-gray-500 shrink-0" />
                    <input
                      type="url"
                      value={editForm.youtube}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, youtube: e.target.value }))}
                      placeholder="YouTube Channel URL"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-green-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-4 justify-end pt-8 border-t border-white/5 mt-8">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Save size={12} /> {isUpdating ? "Saving..." : "Save Configuration"}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
