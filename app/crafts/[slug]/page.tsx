import React from "react";
import { notFound } from "next/navigation";
import { crafts } from "@/lib/data";
import CraftEditorialContent from "@/components/CraftEditorialContent";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const craft = crafts.find((c) => c.slug === slug);
  if (!craft) return { title: "Not Found" };

  return {
    title: `${craft.name} | Our Forgotten Crafts`,
    description: craft.shortDescription,
    openGraph: {
      title: `${craft.name} | Our Forgotten Crafts`,
      description: craft.shortDescription,
      url: `https://visitarewa.com/crafts/${craft.slug}`,
      images: [
        {
          url: craft.image,
          width: 1200,
          height: 630,
          alt: craft.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${craft.name} | Our Forgotten Crafts`,
      description: craft.shortDescription,
      images: [craft.image],
    },
  };
}

export default async function CraftDetailPage({ params }: any) {
  const { slug } = await params;
  const craft = crafts.find((c) => c.slug === slug);

  if (!craft) {
    notFound();
  }

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
