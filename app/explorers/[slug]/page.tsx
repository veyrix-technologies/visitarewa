"use client";

import React, { useEffect, useState } from "react";
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
import ExplorerContentFeed from "@/components/explorers/ExplorerContentFeed";
import RelatedCreations from "@/components/media/RelatedCreations";
import { explorers } from "@/lib/data";
import InstagramImage from "@/components/media/InstagramImage";

import SafeRikafuText from "@/components/layout/SafeRikafuText";
import Footer from "@/components/layout/footer";

export default function ExplorerPage({ params }: any) {
  const resolvedParams = React.use(params as Promise<any>);
  const slug = resolvedParams.slug;

  // Find the static explorer data
  const explorerData = explorers.find((e) => e.slug === slug);

  if (!explorerData) {
    notFound();
  }

  const staticContent = explorerData.createdContent || [];

  const combinedContent = staticContent.map((sc) => ({
    id: sc.id,
    type: sc.type,
    thumbnail: sc.thumbnail,
    title: sc.title,
    description: sc.description,
    date: sc.date,
    locationFeatured: sc.locationFeatured || "Arewa",
    link: sc.link,
    credits: sc.credits
  }));

  const explorer = {
    name: explorerData.name,
    role: explorerData.role,
    image: explorerData.image,
    origin: explorerData.origin,
    isLocalImage: explorerData.isLocalImage || false,
    shortDescription: explorerData.shortDescription,
    fullDescription: explorerData.fullDescription,
    quote: explorerData.quote || "Arewa is a tapestry of stories waiting to be told.",
    createdContent: combinedContent,
    socials: explorerData.socials || {},
    collaborator: explorerData.collaborator || null
  };

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
      "image": explorer.image.startsWith("http") ? explorer.image : `https://visitarewa.com${explorer.image.startsWith("/") ? "" : "/"}${explorer.image}`,
      "description": explorer.shortDescription,
      "homeLocation": {
        "@type": "Place",
        "name": explorer.origin
      },
      "sameAs": Object.values(explorer.socials || {})
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (explorerData) {
      let username = explorerData.slug;
      if (explorerData.socials?.instagram) {
        const parts = explorerData.socials.instagram.split("/");
        const handle = parts.filter(Boolean).pop();
        if (handle) username = handle;
      }
      document.title = `${username} | Visit Arewa Explorers`;
    }
  }, [explorerData]);

  if (!mounted) {
    return (
      <div className="bg-[#020402] min-h-screen text-white flex items-center justify-center font-sans">
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <div className="flex flex-col items-center gap-4">
          <Compass className="animate-spin text-green-500 w-12 h-12" />
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Loading Data...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Schema.org Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* --- HERO SECTION --- */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          <InstagramImage
            src={explorer.image}
            alt={explorer.name}
            isLocal={explorer.isLocalImage}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-75"
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
              <SafeRikafuText text={explorer.collaborator ? `${explorer.name} & ${explorer.collaborator.name}` : explorer.name} />
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl">
              {explorer.collaborator ? `${explorer.role.split(" & ")[0]} & ${explorer.collaborator.role} Duo` : explorer.role}
            </p>
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
                <SafeRikafuText text="Arewa Creations & Stories" />
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
                      Travel Content
                    </p>
                  </div>
                </div>
              </div>

              {/* Collaborator / Partner */}
              {explorer.collaborator && (
                <>
                  <div className="h-[1px] bg-white/10 my-4"></div>
                  <div className="space-y-3">
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-bold font-sans">
                      Creative Partner
                    </p>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/20 transition-all duration-300">
                      {explorer.collaborator.slug ? (
                        <Link href={`/explorers/${explorer.collaborator.slug}`} className="hover:opacity-80 transition-opacity">
                          <p className="text-white font-bold text-sm leading-tight hover:text-green-400 transition-colors">{explorer.collaborator.name}</p>
                          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mt-0.5">{explorer.collaborator.role}</p>
                        </Link>
                      ) : (
                        <div>
                          <p className="text-white font-bold text-sm leading-tight">{explorer.collaborator.name}</p>
                          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mt-0.5">{explorer.collaborator.role}</p>
                        </div>
                      )}
                      <a
                        href={explorer.collaborator.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 hover:text-black uppercase tracking-widest transition-all duration-200 border border-green-500/20 hover:border-green-500 hover:bg-green-500 bg-green-500/10 px-3 py-2 rounded-full cursor-pointer"
                      >
                        <Instagram size={10} />
                        <span>Follow</span>
                      </a>
                    </div>
                  </div>
                </>
              )}

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

        <RelatedCreations searchTerm={explorer.name} />
      </div>
      <Footer />
    </main>
  );
}
