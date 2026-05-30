import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Award,
  Compass,
  Briefcase,
  Quote,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  Youtube
} from "lucide-react";
import { explorers } from "@/lib/data";
import ExplorerContentFeed from "@/components/ExplorerContentFeed";

// 1. Generate Metadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const explorer = explorers.find((e) => e.slug === slug);
  if (!explorer) return { title: "Explorer Not Found" };

  return {
    title: `${explorer.name} | Visit Arewa Explorers`,
    description: explorer.shortDescription,
  };
}

// 2. Main Page Component
export default async function ExplorerPage({ params }: any) {
  const { slug } = await params;
  const explorer = explorers.find((e) => e.slug === slug);

  if (!explorer) {
    notFound();
  }

  const socialIcons: any = {
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    website: Globe,
  };

  // Define Person/Profile Schema JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": explorer.name,
      "jobTitle": explorer.role,
      "image": explorer.image,
      "description": explorer.shortDescription,
      "homeLocation": {
        "@type": "Place",
        "name": explorer.origin
      },
      "sameAs": Object.values(explorer.socials || {})
    }
  };

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={explorer.image}
            alt={explorer.name}
            fill
            className="object-cover object-center brightness-75"
            priority
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#020402] z-10"></div>
        </div>

        {/* Navigation & Title */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-20 z-20">
          <Link
            href="/explorers"
            className="w-fit flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Explorers</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-green-500 text-black px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider">
                <Compass size={14} />
                <span>Explorer</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-sm font-medium border border-white/10">
                <MapPin size={14} className="text-green-400" />
                <span>{explorer.origin}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-white font-rikafu drop-shadow-xl">
              {explorer.name}
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl">{explorer.role}</p>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Description & Created Content Feed */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Bio */}
            <div className="prose prose-lg prose-invert text-gray-300 leading-relaxed max-w-none">
              <h3 className="text-2xl text-white font-bold mb-4 font-rikafu tracking-wide">
                Who They Are
              </h3>
              {explorer.fullDescription.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-lg leading-8 text-gray-300 mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quote Section */}
            {explorer.quote && (
              <div className="bg-white/5 border border-green-500/30 rounded-2xl p-8 relative">
                <Quote
                  className="absolute top-4 right-4 text-green-500/20"
                  size={36}
                />
                <blockquote className="text-xl md:text-2xl font-serif italic text-gray-100 leading-relaxed">
                  "{explorer.quote}"
                </blockquote>
                <p className="text-green-400 font-bold mt-4 font-sans text-sm tracking-wider uppercase">— {explorer.name}</p>
              </div>
            )}

            {/* Created Content Feed */}
            <div className="space-y-6">
              <h3 className="text-2xl text-white font-bold font-rikafu tracking-wide">
                Arewa Creations & Logs
              </h3>
              <p className="text-gray-400 text-sm font-sans mb-6">
                Explore the travel documentaries, written guides, and photography collections produced by {explorer.name}.
              </p>

              <ExplorerContentFeed createdContent={explorer.createdContent} explorerName={explorer.name} />
            </div>
          </div>

          {/* Right Column: Profile Info Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-sm">
              <div className="space-y-4">
                {/* Role */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-sans">Role</p>
                    <p className="text-white font-bold text-base mt-0.5">
                      {explorer.role}
                    </p>
                  </div>
                </div>

                {/* Origin */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-sans">Origin</p>
                    <p className="text-white font-bold text-base mt-0.5">
                      {explorer.origin}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Award size={22} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-sans">Focus</p>
                    <p className="text-white font-bold text-base mt-0.5">
                      Arewa Storytelling
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 my-4"></div>

              {/* Social Connections */}
              {explorer.socials && (
                <div className="space-y-3">
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-bold font-sans">
                    Connect
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {Object.entries(explorer.socials).map(
                      ([platform, url]: [string, any]) => {
                        const IconComponent = socialIcons[platform.toLowerCase()];
                        if (!IconComponent || !url) return null;

                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 rounded-full hover:bg-green-500 hover:text-black transition-all border border-white/10"
                            title={platform}
                          >
                            <IconComponent size={18} />
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              <div className="h-[1px] bg-white/10 my-4"></div>

              {/* Call to Actions */}
              <div className="space-y-3 font-sans">
                <p className="text-gray-400 text-xs leading-relaxed">
                  Support our explorers by subscribing, reading their stories, and viewing their content about Arewa.
                </p>
                <Link
                  href="/explorers"
                  className="block w-full text-center bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  Explore Other Profiles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
