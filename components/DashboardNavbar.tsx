"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Home,
  User,
  Menu,
  X,
  Compass,
  ChevronRight
} from "lucide-react";

export default function DashboardNavbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Submit Creation",
      href: "/dashboard/submit",
      icon: PlusCircle
    },
    {
      name: "Back to Home",
      href: "/",
      icon: Home
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-white/5 p-6 select-none justify-between font-sans">
      {/* Top Section: Logo & Brand */}
      <div>
        <div className="flex items-center gap-3 pb-8 border-b border-white/5">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Visit Arewa Logo"
              width={50}
              height={50}
              className="w-11 h-auto"
            />
          </Link>
          <div>
            <h2 className="text-white text-sm font-sans font-bold tracking-wider">Arewa Portal</h2>
            <p className="text-[9px] text-green-500 uppercase tracking-widest font-bold">Live Platform</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 space-y-2">
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-4 px-3">
            Menu Navigation
          </span>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "text-gray-400 hover:bg-white/[0.02] hover:text-white border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? "text-green-400" : "text-gray-400 group-hover:text-white"} />
                  <span className="text-xs font-bold uppercase tracking-wider">{link.name}</span>
                </div>
                <ChevronRight size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "opacity-100 text-green-400" : "text-gray-500"}`} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Profile & Logout */}
      {user && (
        <div className="pt-6 border-t border-white/5 space-y-4">
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-1 hover:opacity-85 transition-all duration-300 group/profile w-full">
            {/* Avatar */}
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/10 group-hover/profile:border-green-500/30 bg-zinc-900 flex items-center justify-center shrink-0 transition-colors">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <User size={16} className="text-gray-400" />
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-xs font-bold truncate flex items-center gap-1 group-hover/profile:text-green-400 transition-colors">
                {user.name}
              </h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider truncate mt-0.5">
                {user.role}
              </p>
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer py-3 px-3 bg-red-500/5 hover:bg-red-500/15 text-red-400 border border-red-500/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        {sidebarContent}
      </aside>

      {/* 2. MOBILE HEADER */}
      <nav className="md:hidden flex justify-between items-center bg-zinc-950 border-b border-white/5 py-4 px-6 sticky top-0 z-40 backdrop-blur-md bg-black/80 w-full">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Visit Arewa Logo"
            width={50}
            height={50}
            className="w-11 h-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <Link href="/dashboard/profile" className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center hover:border-green-500/40 transition-colors">
              <Image src={user.image} alt={user.name} fill className="object-cover" />
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* 3. MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-72 h-full z-50 flex-col flex"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
