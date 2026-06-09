"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { destinations, dishes, events, crafts } from "./data";

export interface UserProfile {
  uid: string;
  username: string;
  name: string;
  email: string;
  role: "photographer" | "vlogger" | "writer" | "adventurer" | "admin";
  origin: string;
  bio: string;
  image: string;
  socials?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
  };
}

export interface Submission {
  id: string;
  slug?: string;
  type: "destination" | "cuisine" | "event" | "craft";
  title: string;
  location: string;
  description: string;
  fullText: string;
  imageUrl: string;
  gallery: string[];
  status: "pending" | "published";
  submittedAt: string;
  userEmail: string;
  // Specific fields for different types
  coordinates?: string;
  category?: string;
  date?: string;
  calories?: string;
  ingredients?: string[];
  highlights?: string[];
  stats?: string[];
  registrationEnabled?: boolean;
  ticketType?: "free" | "paid";
  ticketPrice?: number;
  ticketCapacity?: number;
}

export interface Registration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  registeredAt: string;
  ticketType?: "free" | "paid";
  ticketPrice?: number;
  ticketCode?: string;
}

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

// Initial mock data if localStorage is empty
const MOCK_EXPLORERS: UserProfile[] = [
  {
    uid: "ahmad-bello",
    username: "ahmad-bello",
    name: "Ahmad Bello",
    email: "ahmad@explore.com",
    role: "photographer",
    origin: "Kano, Nigeria",
    image: "/images/ahmad_profile.png",
    bio: "A visual storyteller capturing the soul of Northern Nigeria, from the ancient city walls of Kano to the misty hills of Taraba.",
    socials: {
      instagram: "https://instagram.com/ahmad_bello_explores",
      youtube: "https://youtube.com/c/AhmadBelloExplores",
      twitter: "https://twitter.com/ahmad_explores"
    }
  },
  {
    uid: "fatima-yusuf",
    username: "fatima-yusuf",
    name: "Fatima Yusuf",
    email: "fatima@explore.com",
    role: "writer",
    origin: "Kaduna, Nigeria",
    image: "/images/fatima_profile.png",
    bio: "A writer documenting the oral histories, culinary arts, and endangered crafts of the diverse peoples of Arewa.",
    socials: {
      twitter: "https://twitter.com/fatima_y_writes",
      instagram: "https://instagram.com/fatima_y_culturalist",
      website: "https://fatimayusuf.com"
    }
  },
  {
    uid: "kabir-ibrahim",
    username: "kabir-ibrahim",
    name: "Kabir Ibrahim",
    email: "kabir@explore.com",
    role: "adventurer",
    origin: "Bauchi, Nigeria",
    image: "/images/kabir_profile.png",
    bio: "A nature enthusiast and wildlife blogger dedicated to showcasing the natural reserves, mountains, and parks of Northern Nigeria.",
    socials: {
      twitter: "https://twitter.com/kabir_safaris",
      instagram: "https://instagram.com/kabir_wildlife",
      website: "https://savannah-explorer.com"
    }
  }
];

const legacyDestinations: Submission[] = destinations.map(d => ({
  id: `legacy-dest-${d.id}`,
  slug: d.slug,
  type: "destination",
  title: d.name,
  location: d.location,
  description: d.shortDescription,
  fullText: d.fullDescription,
  imageUrl: d.image,
  gallery: d.gallery || [d.image],
  status: "published",
  submittedAt: "2026-01-01T00:00:00Z",
  userEmail: "admin@explore.com",
  coordinates: d.coordinates,
  highlights: d.highlights
}));

const legacyCuisines: Submission[] = dishes.map(d => ({
  id: `legacy-dish-${d.id}`,
  slug: d.slug,
  type: "cuisine",
  title: d.name,
  location: "Arewa",
  description: d.description,
  fullText: d.description,
  imageUrl: d.image,
  gallery: [d.image],
  status: "published",
  submittedAt: "2026-01-01T00:00:00Z",
  userEmail: "admin@explore.com",
  calories: d.calories,
  stats: d.stats,
  ingredients: d.ingredients
}));

const legacyEvents: Submission[] = events.map(e => ({
  id: `legacy-event-${e.id}`,
  slug: e.slug,
  type: "event",
  title: e.name,
  location: e.location,
  description: e.shortDescription,
  fullText: e.fullDescription,
  imageUrl: e.image,
  gallery: e.gallery || [e.image],
  status: "published",
  submittedAt: "2026-01-01T00:00:00Z",
  userEmail: "admin@explore.com",
  coordinates: e.coordinates,
  highlights: e.highlights,
  date: e.date,
  registrationEnabled: (e as any).registrationEnabled,
  ticketType: (e as any).ticketType,
  ticketPrice: (e as any).ticketPrice,
  ticketCapacity: (e as any).ticketCapacity,
  link: e.video || undefined
}));

const legacyCrafts: Submission[] = crafts.map(c => ({
  id: `legacy-craft-${c.id}`,
  slug: c.slug,
  type: "craft",
  title: c.name,
  location: c.region,
  description: c.shortDescription,
  fullText: c.fullDescription,
  imageUrl: c.image,
  gallery: c.gallery || [c.image],
  status: "published",
  submittedAt: "2026-01-01T00:00:00Z",
  userEmail: "admin@explore.com"
}));

const MOCK_SUBMISSIONS: Submission[] = [
  ...legacyDestinations,
  ...legacyCuisines,
  ...legacyEvents,
  ...legacyCrafts,
  {
    id: "sub-1",
    type: "destination",
    title: "Gashaka-Gumti National Park",
    location: "Taraba, Nigeria",
    description: "Nigeria's largest national park, featuring majestic mountains, deep valleys, and rare wildlife populations.",
    fullText: "Gashaka-Gumti National Park is the largest national park in Nigeria. Located in the eastern provinces of Taraba and Adamawa, bordering Cameroon, it covers an area of about 6,731 sq km. The park is renowned for its rich biodiversity, holding unique ecosystems that range from dry savannahs to montane forests. It is home to chimpanzees, rare birds, and some of the highest peaks in West Africa.",
    imageUrl: "/images/mambilla.jpg",
    gallery: ["/images/mambilla.jpg"],
    status: "published",
    submittedAt: "2026-05-10T14:30:00Z",
    userEmail: "ahmad@explore.com",
    coordinates: "7.3000° N, 11.5000° E",
    highlights: ["Chimpanzee Sanctuary", "Montane Forests", "Highest Peaks"]
  },
  {
    id: "sub-2",
    type: "cuisine",
    title: "Miyan Yakuwa",
    location: "Sokoto, Nigeria",
    description: "A traditional Hausa sour soup made from sorrel leaves, groundnuts, and rich local meat assortments.",
    fullText: "Miyan Yakuwa is a popular sour soup in Northern Nigeria. The main ingredient is Yakuwa (sorrel leaves), which gives the soup its characteristic tangy, slightly sour flavor. It is prepared with ground peanuts or melon seeds as a thickener, locust beans (dawadawa) for depth, and various meats or smoked fish. It pairs perfectly with Tuwo Shinkafa.",
    imageUrl: "/images/tuwo.jpg",
    gallery: ["/images/tuwo.jpg"],
    status: "pending",
    submittedAt: "2026-05-28T09:15:00Z",
    userEmail: "ahmad@explore.com",
    calories: "280 kcal",
    ingredients: ["Yakuwa Leaves", "Groundnuts", "Locust Beans", "Beef", "Palm Oil"]
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("arewa_users");
      if (!storedUsers) {
        localStorage.setItem("arewa_users", JSON.stringify(MOCK_EXPLORERS));
        setUsers(MOCK_EXPLORERS);
      } else {
        let parsedUsers = JSON.parse(storedUsers) as UserProfile[];
        let migrated = false;

        // Migrate uids and ensure username exists for all users
        parsedUsers = parsedUsers.map(u => {
          let updated = { ...u };
          
          if (updated.uid === "mock-1") {
            updated.uid = "ahmad-bello";
            migrated = true;
          }
          
          // Map default usernames for mock explorers
          if (updated.uid === "ahmad-bello" && updated.username !== "ahmad-bello") {
            updated.username = "ahmad-bello";
            migrated = true;
          }
          if (updated.uid === "fatima-yusuf" && updated.username !== "fatima-yusuf") {
            updated.username = "fatima-yusuf";
            migrated = true;
          }
          if (updated.uid === "kabir-ibrahim" && updated.username !== "kabir-ibrahim") {
            updated.username = "kabir-ibrahim";
            migrated = true;
          }

          // If any other user lacks a username, generate one
          if (!updated.username) {
            const baseUsername = updated.name.toLowerCase().trim().replace(/[^a-z0-9-_]+/g, "-");
            let uniqueUser = baseUsername;
            let counter = 1;
            while (parsedUsers.some(existing => existing.uid !== updated.uid && existing.username === uniqueUser)) {
              uniqueUser = `${baseUsername}-${counter}`;
              counter++;
            }
            updated.username = uniqueUser;
            migrated = true;
          }

          return updated;
        });

        // Check if any mock explorers are missing entirely and add them
        const missingExplorers = MOCK_EXPLORERS.filter(me => !parsedUsers.some(pu => pu.uid === me.uid));
        if (missingExplorers.length > 0) {
          parsedUsers = [...parsedUsers, ...missingExplorers];
          migrated = true;
        }

        if (migrated) {
          localStorage.setItem("arewa_users", JSON.stringify(parsedUsers));
        }
        setUsers(parsedUsers);
      }

      const storedSubs = localStorage.getItem("arewa_submissions");
      if (!storedSubs) {
        localStorage.setItem("arewa_submissions", JSON.stringify(MOCK_SUBMISSIONS));
        setSubmissions(MOCK_SUBMISSIONS);
      } else {
        const parsedSubs = JSON.parse(storedSubs);
        // Migration to inject legacy data into existing state
        if (!parsedSubs.some((s: any) => s.id === 'legacy-dest-1')) {
          const missingMocks = MOCK_SUBMISSIONS.filter(ms => !parsedSubs.some((ps: any) => ps.id === ms.id));
          const merged = [...parsedSubs, ...missingMocks];
          localStorage.setItem("arewa_submissions", JSON.stringify(merged));
          setSubmissions(merged);
        } else {
          setSubmissions(parsedSubs);
        }
      }

      const storedRegs = localStorage.getItem("arewa_registrations");
      if (storedRegs) {
        setRegistrations(JSON.parse(storedRegs));
      } else {
        localStorage.setItem("arewa_registrations", JSON.stringify([]));
      }

      const activeUser = localStorage.getItem("arewa_active_user");
      if (activeUser) {
        let parsedActive = JSON.parse(activeUser) as UserProfile;
        let activeMigrated = false;

        if (parsedActive.uid === "mock-1") {
          parsedActive.uid = "ahmad-bello";
          activeMigrated = true;
        }

        if (parsedActive.uid === "ahmad-bello" && parsedActive.username !== "ahmad-bello") {
          parsedActive.username = "ahmad-bello";
          activeMigrated = true;
        }
        if (parsedActive.uid === "fatima-yusuf" && parsedActive.username !== "fatima-yusuf") {
          parsedActive.username = "fatima-yusuf";
          activeMigrated = true;
        }
        if (parsedActive.uid === "kabir-ibrahim" && parsedActive.username !== "kabir-ibrahim") {
          parsedActive.username = "kabir-ibrahim";
          activeMigrated = true;
        }

        if (!parsedActive.username) {
          parsedActive.username = parsedActive.name.toLowerCase().trim().replace(/[^a-z0-9-_]+/g, "-");
          activeMigrated = true;
        }

        if (activeMigrated) {
          localStorage.setItem("arewa_active_user", JSON.stringify(parsedActive));
        }
        setUser(parsedActive);
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
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
        const storedUsersStr = localStorage.getItem("arewa_users") || "[]";
        const usersList: UserProfile[] = JSON.parse(storedUsersStr);

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

        const updatedUsersList = [...usersList, newUser];
        localStorage.setItem("arewa_users", JSON.stringify(updatedUsersList));
        localStorage.setItem("arewa_active_user", JSON.stringify(newUser));
        setUser(newUser);
        resolve(newUser);
      }, 800);
    });
  };

  const login = async (email: string, passwordHash: string): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUsersStr = localStorage.getItem("arewa_users") || "[]";
        const usersList: UserProfile[] = JSON.parse(storedUsersStr);

        const foundUser = usersList.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!foundUser) {
          reject(new Error("Invalid email or password."));
          return;
        }

        // Simulating password check (in mock, any password is fine if email matches)
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

      const updatedUser = { ...user, ...updates };

      const storedUsersStr = localStorage.getItem("arewa_users") || "[]";
      const usersList: UserProfile[] = JSON.parse(storedUsersStr);
      const updatedUsersList = usersList.map((u) => (u.uid === user.uid ? updatedUser : u));

      localStorage.setItem("arewa_users", JSON.stringify(updatedUsersList));
      localStorage.setItem("arewa_active_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      resolve(updatedUser);
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
        const storedSubs = localStorage.getItem("arewa_submissions") || "[]";
        const subsList: Submission[] = JSON.parse(storedSubs);

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

        const updatedSubs = [newSubmission, ...subsList];
        localStorage.setItem("arewa_submissions", JSON.stringify(updatedSubs));
        setSubmissions(updatedSubs);
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
        const storedSubs = localStorage.getItem("arewa_submissions") || "[]";
        const subsList: Submission[] = JSON.parse(storedSubs);
        const subIndex = subsList.findIndex((s) => s.id === id);
        
        if (subIndex === -1) {
          reject(new Error("Submission not found."));
          return;
        }

        const updatedSub = { ...subsList[subIndex], ...updates };
        const updatedSubs = [...subsList];
        updatedSubs[subIndex] = updatedSub;

        localStorage.setItem("arewa_submissions", JSON.stringify(updatedSubs));
        setSubmissions(updatedSubs);
        resolve(updatedSub);
      }, 800);
    });
  };

  const deleteSubmission = async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedSubs = localStorage.getItem("arewa_submissions") || "[]";
        const subsList: Submission[] = JSON.parse(storedSubs);
        const exists = subsList.some((s) => s.id === id);

        if (!exists) {
          reject(new Error("Submission not found."));
          return;
        }

        const updatedSubs = subsList.filter((s) => s.id !== id);
        localStorage.setItem("arewa_submissions", JSON.stringify(updatedSubs));
        setSubmissions(updatedSubs);
        resolve();
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

        const currentRegsStr = localStorage.getItem("arewa_registrations") || "[]";
        const currentRegs: Registration[] = JSON.parse(currentRegsStr);
        const updatedRegs = [...currentRegs, newReg];

        localStorage.setItem("arewa_registrations", JSON.stringify(updatedRegs));
        setRegistrations(updatedRegs);
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
