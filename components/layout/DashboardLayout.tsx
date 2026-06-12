"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Home,
  User,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  
  // State to toggle desktop sidebar width
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navLinks = [
    {
      name: "Dashboard",
      mobileName: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Submit Creation",
      mobileName: "Submit",
      href: "/dashboard/submit",
      icon: PlusCircle
    },
    {
      name: "Back to Home",
      mobileName: "Home",
      href: "/",
      icon: Home
    }
  ];

  return (
    <div className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black flex flex-col md:flex-row">
      
      {/* 1. MOBILE TOP HEADER (Logo only) */}
      <nav className="md:hidden flex justify-between items-center bg-zinc-950 border-b border-white/5 py-4 px-6 sticky top-0 z-40 backdrop-blur-md bg-black/80 w-full">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Visit Arewa Logo"
            width={40}
            height={40}
            className="w-10 h-auto"
          />
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <Link href="/dashboard/profile" className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center hover:border-green-500/40 transition-colors">
              <Image src={user.image} alt={user.name} fill className="object-cover" />
            </Link>
          )}
        </div>
      </nav>

      {/* 2. DESKTOP SIDEBAR */}
      <aside 
        className={`hidden md:flex flex-col fixed inset-y-0 z-30 bg-zinc-950 border-r border-white/5 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Floating Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-zinc-900 border border-white/10 text-gray-400 hover:text-white hover:bg-zinc-800 hover:border-white/20 transition-all w-6 h-6 rounded-full flex items-center justify-center shadow-xl z-50 cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={12} strokeWidth={3} /> : <ChevronLeft size={12} strokeWidth={3} />}
        </button>

        <div className="flex flex-col h-full p-4 select-none justify-between">
          {/* Top Section: Logo & Brand */}
          <div>
            <div className={`flex items-center pb-8 border-b border-white/5 ${isCollapsed ? "justify-center" : "gap-3 px-2"}`}>
              <Link href="/" className="hover:opacity-80 transition-opacity shrink-0">
                <Image
                  src="/logo.png"
                  alt="Visit Arewa Logo"
                  width={40}
                  height={40}
                  className="w-10 h-auto"
                />
              </Link>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <h2 className="text-white text-sm font-sans font-bold tracking-wider truncate">Arewa Portal</h2>
                  <p className="text-[9px] text-green-500 uppercase tracking-widest font-bold truncate">Live Platform</p>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="mt-8 space-y-2">
              {!isCollapsed && (
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-4 px-3">
                  Menu Navigation
                </span>
              )}
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    title={isCollapsed ? link.name : undefined}
                    className={`group flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-3 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "text-gray-400 hover:bg-white/[0.02] hover:text-white border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={isActive ? "text-green-400 shrink-0" : "text-gray-400 group-hover:text-white shrink-0"} />
                      {!isCollapsed && (
                        <span className="text-xs font-bold uppercase tracking-wider truncate">{link.name}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronRight size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ${isActive ? "opacity-100 text-green-400" : "text-gray-500"}`} />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Section: Profile & Logout */}
          <div>
            {user && (
              <div className="pt-4 border-t border-white/5 space-y-4">
                <Link 
                  href="/dashboard/profile" 
                  title={isCollapsed ? user.name : undefined}
                  className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3 px-1"} hover:opacity-85 transition-all duration-300 group/profile w-full`}
                >
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/10 group-hover/profile:border-green-500/30 bg-zinc-900 flex items-center justify-center shrink-0 transition-colors">
                    {user.image ? (
                      <Image src={user.image} alt={user.name} fill sizes="36px" className="object-cover" />
                    ) : (
                      <User size={16} className="text-gray-400" />
                    )}
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-xs font-bold truncate flex items-center gap-1 group-hover/profile:text-green-400 transition-colors">
                        {user.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider truncate mt-0.5">
                        {user.role}
                      </p>
                    </div>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  title={isCollapsed ? "Log Out" : undefined}
                  className={`w-full cursor-pointer py-3 bg-red-500/5 hover:bg-red-500/15 text-red-400 border border-red-500/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center ${isCollapsed ? "justify-center" : "justify-center gap-2 px-3"}`}
                >
                  <LogOut size={16} className="shrink-0" /> {!isCollapsed && "Log Out"}
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? "md:pl-20" : "md:pl-64"} pb-20 md:pb-0`}>
        {children}
      </main>

      {/* 4. MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-zinc-950/95 backdrop-blur-lg border-t border-white/10 px-4 py-2 flex items-center justify-around pb-6 pt-3">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all flex-1 ${
                isActive ? "text-green-400" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Icon size={20} className={isActive ? "scale-110 transition-transform" : ""} />
              <span className="text-[9px] font-bold uppercase tracking-wider">{link.mobileName}</span>
            </Link>
          );
        })}
        {user && (
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl text-gray-500 hover:text-red-400 transition-all flex-1"
          >
            <LogOut size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Logout</span>
          </button>
        )}
      </nav>

    </div>
  );
}
