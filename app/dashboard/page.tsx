"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Compass,
  MapPin,
  Clock,
  CheckCircle,
  Plus,
  Edit3,
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Layers,
  Sparkles,
  Camera
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading, submissions, updateProfile, logout } = useAuth();
  const router = useRouter();

  // Protect route
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
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Accessing Dashboard...</p>
        </div>
      </div>
    );
  }

  // Filter submissions by current user
  const userSubmissions = submissions.filter((sub) => sub.userEmail === user.email);
  const totalSubmissions = userSubmissions.length;
  const publishedSubmissions = userSubmissions.filter((sub) => sub.status === "published").length;
  const pendingSubmissions = userSubmissions.filter((sub) => sub.status === "pending").length;

  return (
    <DashboardLayout>
        <div className="container mx-auto px-6 md:px-12 py-12">
          <div className="space-y-6 max-w-5xl mx-auto">

              {/* Welcome Banner with Hausa Greeting */}
              <div className="bg-zinc-950/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden shadow-2xl bg-gradient-to-r from-zinc-950 via-zinc-900/10 to-zinc-950">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                  <div>
                    <span className="text-green-400 text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
                      {new Date().getHours() < 12 ? "Ina kwana" : "Sannu da zuwa"} • Welcome Back
                    </span>
                    <h2 className="text-3xl md:text-4xl font-sans font-bold mt-2 text-white">
                      Sannu, {user.name.split(" ")[0]}!
                    </h2>
                    <p className="text-gray-400 text-xs mt-2 font-sans leading-relaxed max-w-md">
                      Share destinations, cuisines, crafts, and live events with the Visit Arewa community. Ready to publish something new?
                    </p>
                  </div>
                  <Link
                    href="/dashboard/submit"
                    className="px-5 py-3 bg-green-500 hover:bg-green-400 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-green-500/10 shrink-0 flex items-center gap-1.5"
                  >
                    <Plus size={14} /> New Chronicle
                  </Link>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-950 border border-white/5 p-6 rounded-2xl text-center shadow-lg relative overflow-hidden">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Creations</span>
                  <span className="text-3xl font-bold font-sans text-white">{totalSubmissions}</span>
                </div>
                <div className="bg-zinc-950 border border-white/5 p-6 rounded-2xl text-center shadow-lg relative overflow-hidden">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Published</span>
                  <span className="text-3xl font-bold font-sans text-green-400">{publishedSubmissions}</span>
                </div>
                <div className="bg-zinc-950 border border-white/5 p-6 rounded-2xl text-center shadow-lg relative overflow-hidden">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Pending</span>
                  <span className="text-3xl font-bold font-sans text-yellow-500">{pendingSubmissions}</span>
                </div>
              </div>

              {/* Submissions Section */}
              <div className="bg-zinc-950 border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold font-sans tracking-wide text-white">My Submissions</h3>
                    <p className="text-xs text-gray-400 mt-1">Manage and track everything you've published on Visit Arewa.</p>
                  </div>
                  <Link
                    href="/dashboard/submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-400 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                  >
                    <Plus size={14} /> Add New
                  </Link>
                </div>

                {/* List Feed */}
                {userSubmissions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/10 rounded-2xl">
                    <Compass className="text-gray-600 animate-pulse w-10 h-10 mb-4" />
                    <h4 className="text-white font-bold text-sm">No creations found</h4>
                    <p className="text-gray-500 text-xs mt-1 max-w-xs">
                       You haven't published anything yet. Share a destination, cuisine, craft, or event today!
                    </p>
                    <Link
                      href="/dashboard/submit"
                      className="mt-6 px-5 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                    >
                      Publish Your First
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userSubmissions.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/dashboard/creations/${sub.id}`}
                        className="group flex gap-4 p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-green-500/25 transition-all duration-300 items-start cursor-pointer block"
                      >
                        {/* Image Thumbnail */}
                        <div className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-zinc-900">
                          {sub.imageUrl ? (
                            <img
                              src={sub.imageUrl}
                              alt={sub.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600 bg-zinc-950">
                              <Layers size={18} />
                            </div>
                          )}
                        </div>

                        {/* Info details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2 mb-1.5">
                            {/* Type badge */}
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                              {sub.type}
                            </span>

                            {/* Status badge */}
                            {sub.status === "published" ? (
                              <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-1">
                                <CheckCircle size={8} /> Published
                              </span>
                            ) : (
                              <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center gap-1">
                                <Clock size={8} /> Pending Review
                              </span>
                            )}
                          </div>

                          <h4 className="text-white font-bold text-base truncate group-hover:text-green-400 transition-colors">
                            {sub.title}
                          </h4>

                          <p className="text-gray-400 text-xs truncate mt-0.5 flex items-center gap-1 font-mono">
                            <MapPin size={10} className="text-green-500" />
                            {sub.location}
                          </p>

                          <p className="text-gray-500 text-xs mt-2 line-clamp-1">
                            {sub.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
        </div>
    </DashboardLayout>
  );
}
