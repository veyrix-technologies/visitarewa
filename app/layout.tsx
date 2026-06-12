import type { Metadata } from "next";
// 1. IMPORT THE SERIF FONT HERE 👇
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. CONFIGURE THE SERIF FONT
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

// ✅ Rikafu Local Font
const rikafu = localFont({
  src: "../public/fonts/rikafu.otf",
  variable: "--font-rikafu",
});

export const metadata: Metadata = {
  title: "Visit Arewa | Your Journey Into the Heart of Nigeria",
  description:
    "Discover the breathtaking landscapes, rich heritage, and vibrant culture of Arewa. From the ancient walls of Kano to the rolling hills of Mambilla, experience the true spirit of Arewa.",
  keywords: [
    // Locations
    "Arewa",
    "Northern Nigeria",
    "Nigeria Tourism",
    "Kano",
    "Kaduna",
    "Abuja",
    "Jos",
    "Gombe",
    "Bauchi",
    "Sokoto",
    "Katsina",

    // Landmarks & Nature
    "Yankari Game Reserve",
    "Mambilla Plateau",
    "Kajuru Castle",
    "Zuma Rock",
    "Matsirga Waterfalls",
    "Gurara Falls",

    // Culture & Festivals
    "Durbar Festival",
    "Argungu Fishing Festival",
    "Hausa Culture",
    "Fulani Heritage",
    "Kannywood",
    "Emir of Kano",

    // Food & Lifestyle
    "Arewa Food",
    "Tuwo Shinkafa",
    "Kilishi",
    "Masa",
    "Fura da Nono",
    "Arewa Fashion",

    // Tech & Modern
    "Arewa Tech",
    "Northern Nigeria Innovation",
    "Visit Nigeria",
    "Travel Guide Nigeria",
  ],
  authors: [{ name: "Veyrix Technologies Ltd", url: "https://veyrixtech.com" }],
  openGraph: {
    title: "Visit Arewa | Your Journey Into the Heart of Nigeria",
    description:
      "Your platform for Arewa's culture, events, and stories. Explore destinations, food, crafts, and live events from Northern Nigeria.",
    url: "https://visitarewa.com",
    siteName: "Visit Arewa",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Arewa",
    description:
      "The definitive guide to Arewa's heritage and beauty.",
  },
  verification: {
    google: "s2loh9IkY006mUI7jaDsApM_M1cwja0J3AgtBrUDaEA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${rikafu.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
