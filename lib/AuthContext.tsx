"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "./data";
import type { UserProfile, Submission, Registration } from "./data";

export type { UserProfile, Submission, Registration };

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  users: UserProfile[];
  submissions: Submission[];
  registrations: Registration[];
  signUp: (
    email: string,
    passwordHash: string,
    name: string,
    role: UserProfile["role"],
    origin: string,
    username: string
  ) => Promise<UserProfile>;
  login: (email: string, passwordHash: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<UserProfile>;
  submitContent: (submission: Omit<Submission, "id" | "submittedAt" | "userEmail" | "status">) => Promise<Submission>;
  updateSubmission: (id: string, updates: Partial<Submission>) => Promise<Submission>;
  deleteSubmission: (id: string) => Promise<void>;
  registerForEvent: (
    eventId: string,
    name: string,
    email: string,
    phone?: string,
    ticketType?: "free" | "paid",
    ticketPrice?: number,
    ticketCode?: string
  ) => Promise<Registration>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Load from database simulation on mount
  useEffect(() => {
    try {
      const dbUsers = db.getUsers();
      setUsers(dbUsers);

      const dbSubs = db.getSubmissions();
      setSubmissions(dbSubs);

      const dbRegs = db.getRegistrations();
      setRegistrations(dbRegs);

      const activeUser = localStorage.getItem("arewa_active_user");
      if (activeUser) {
        setUser(JSON.parse(activeUser));
      }
    } catch (e) {
      console.error("Error loading mock database state", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = async (
    email: string,
    passwordHash: string,
    name: string,
    role: UserProfile["role"],
    origin: string,
    username: string
  ): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersList = db.getUsers();
        const emailExists = usersList.some((u) => u.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
          reject(new Error("Email address already registered."));
          return;
        }

        const formattedUsername = username.toLowerCase().trim().replace(/[^a-z0-9-_]+/g, "-");
        if (!formattedUsername) {
          reject(new Error("Invalid username."));
          return;
        }

        const usernameExists = usersList.some((u) => u.username?.toLowerCase() === formattedUsername);
        if (usernameExists) {
          reject(new Error("Username is already taken."));
          return;
        }

        const newUser: UserProfile = {
          uid: `user-${Date.now()}`,
          username: formattedUsername,
          name,
          email,
          role,
          origin,
          bio: `A proud explorer documenting the heritage of ${origin.split(",")[0]}.`,
          image: "/images/ahmad_profile.png", // Default avatar
          socials: { twitter: "", instagram: "", linkedin: "" }
        };

        db.createUser(newUser);
        localStorage.setItem("arewa_active_user", JSON.stringify(newUser));
        setUser(newUser);
        setUsers(db.getUsers());
        resolve(newUser);
      }, 800);
    });
  };

  const login = async (email: string, passwordHash: string): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersList = db.getUsers();
        const foundUser = usersList.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!foundUser) {
          reject(new Error("Invalid email or password."));
          return;
        }

        localStorage.setItem("arewa_active_user", JSON.stringify(foundUser));
        setUser(foundUser);
        resolve(foundUser);
      }, 800);
    });
  };

  const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("arewa_active_user");
        setUser(null);
        resolve();
      }, 500);
    });
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject(new Error("No authenticated user found."));
        return;
      }

      try {
        const updatedUser = db.updateUser(user.uid, updates);
        localStorage.setItem("arewa_active_user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setUsers(db.getUsers());
        resolve(updatedUser);
      } catch (e: any) {
        reject(e);
      }
    });
  };

  const submitContent = async (
    submissionData: Omit<Submission, "id" | "submittedAt" | "userEmail" | "status">
  ): Promise<Submission> => {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject(new Error("You must be logged in to submit content."));
        return;
      }

      setTimeout(() => {
        const subsList = db.getSubmissions();

        const exactMatchExists = subsList.some(
          (s) => s.type === submissionData.type && s.title.toLowerCase().trim() === submissionData.title.toLowerCase().trim()
        );

        const baseSlug = submissionData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        let uniqueSlug = baseSlug;

        if (exactMatchExists) {
          const rand = Math.floor(1000 + Math.random() * 9000);
          uniqueSlug = `${baseSlug}-${rand}`;
          while (subsList.some(s => s.slug === uniqueSlug)) {
            const nextRand = Math.floor(1000 + Math.random() * 9000);
            uniqueSlug = `${baseSlug}-${nextRand}`;
          }
        } else {
          while (subsList.some(s => s.slug === uniqueSlug)) {
            const rand = Math.floor(1000 + Math.random() * 9000);
            uniqueSlug = `${baseSlug}-${rand}`;
          }
        }

        const newSubmission: Submission = {
          ...submissionData,
          id: `sub-${Date.now()}`,
          slug: uniqueSlug,
          submittedAt: new Date().toISOString(),
          userEmail: user.email,
          status: "published"
        };

        db.createSubmission(newSubmission);
        setSubmissions(db.getSubmissions());
        resolve(newSubmission);
      }, 1000);
    });
  };

  const updateSubmission = async (
    id: string,
    updates: Partial<Submission>
  ): Promise<Submission> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedSub = db.updateSubmission(id, updates);
          setSubmissions(db.getSubmissions());
          resolve(updatedSub);
        } catch (e: any) {
          reject(e);
        }
      }, 800);
    });
  };

  const deleteSubmission = async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          db.deleteSubmission(id);
          setSubmissions(db.getSubmissions());
          resolve();
        } catch (e: any) {
          reject(e);
        }
      }, 500);
    });
  };

  const registerForEvent = async (
    eventId: string,
    name: string,
    email: string,
    phone?: string,
    ticketType?: "free" | "paid",
    ticketPrice?: number,
    ticketCode?: string
  ): Promise<Registration> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReg: Registration = {
          id: `reg-${Date.now()}`,
          eventId,
          name,
          email,
          phone,
          registeredAt: new Date().toISOString(),
          ticketType,
          ticketPrice,
          ticketCode
        };

        db.createRegistration(newReg);
        setRegistrations(db.getRegistrations());
        resolve(newReg);
      }, 800);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        loading,
        submissions,
        registrations,
        signUp,
        login,
        logout,
        updateProfile,
        submitContent,
        updateSubmission,
        deleteSubmission,
        registerForEvent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function getCanonicalSubmissions(subs: Submission[]): Submission[] {
  const map = new Map<string, Submission>();

  // Sort chronologically (oldest first) so that the first submission is stored
  const sorted = [...subs].sort(
    (a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  );

  for (const sub of sorted) {
    const key = `${sub.type}-${sub.title.toLowerCase().trim()}`;
    if (!map.has(key)) {
      map.set(key, sub);
    }
  }

  // Preserve original list ordering, but filter only canonical ones
  const canonicalIds = new Set(map.values().map(s => s.id));
  return subs.filter(sub => canonicalIds.has(sub.id));
}
