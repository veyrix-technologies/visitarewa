"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import CraftEditorialContent from "@/components/CraftEditorialContent";
import { Compass } from "lucide-react";

export default function CraftDetailPage({ params }: any) {
  const resolvedParams = React.use(params as Promise<any>);
  const slug = resolvedParams.slug;

  const { submissions } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-[#020402] min-h-screen text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <Compass className="animate-spin text-green-500 w-12 h-12" />
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Loading Data...</p>
        </div>
      </div>
    );
  }

  let sub = submissions.find((c) => (c.slug === slug || c.id === slug) && c.type === "craft");
  if (!sub) {
    sub = submissions.find(
      (c) => c.type === "craft" && c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );
  }

  if (!sub) {
    notFound();
  }

  const craft = {
    ...sub,
    name: sub.title,
    image: sub.imageUrl || "/images/dye_pits.webp",
    shortDescription: sub.description,
    fullDescription: sub.fullText,
    history: sub.description,
    quote: sub.stats?.[1] || "A fading tradition we must protect.",
    significance: sub.stats?.[0] || "Cultural preservation",
    artisanName: sub.stats?.[2] || "Master Artisan",
    artisanLocation: sub.location || "Arewa",
    status: sub.status === "published" ? "Active" : "Pending",
  };

  // Define Craft/Heritage Article Schema JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${craft.name} — Living Heritage of Arewa`,
    "description": craft.shortDescription,
    "image": [craft.image],
    "author": {
      "@type": "Organization",
      "name": "Visit Arewa",
      "url": "https://visitarewa.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Visit Arewa",
      "logo": {
        "@type": "ImageObject",
        "url": "https://visitarewa.com/logo.png"
      }
    },
    "datePublished": "2026-05-17"
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CraftEditorialContent craft={craft} />
    </>
  );
}
