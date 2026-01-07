import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visit Arewa | The Heart of Nigeria",
  description:
    "Discover the breathtaking landscapes, rich heritage, and vibrant culture of Northern Nigeria. From the ancient walls of Kano to the rolling hills of Mambilla, experience the true spirit of Arewa.",
  keywords: [
    "Arewa",
    "Northern Nigeria",
    "Tourism",
    "Travel",
    "Culture",
    "History",
    "Kano",
    "Jos",
    "Abuja",
    "Gombe",
  ],
  authors: [{ name: "Veyrix Technologies Ltd", url: "https://veyrixtech.com" }],
  openGraph: {
    title: "Visit Arewa | The Heart of Nigeria",
    description:
      "A digital archive showcasing the beauty, talent, and heritage of Northern Nigeria.",
    url: "https://visitarewa.com", // Replace with your actual domain when deployed
    siteName: "Visit Arewa",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Arewa",
    description:
      "The definitive guide to Northern Nigeria's heritage and beauty.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-serif antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
