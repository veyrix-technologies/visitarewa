import React from "react";
import { destinations } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug || String(d.id) === slug);
  
  const title = dest ? `${dest.name} | Visit Arewa Destinations` : "Visit Arewa Destinations";
  const desc = dest ? dest.shortDescription : "Explore the beautiful landscapes, ancient heritage, and tourist landmarks of Northern Nigeria.";
  const imgUrl = dest ? dest.image : "/images/zuma.webp";
  const absoluteImg = imgUrl.startsWith("http") ? imgUrl : `https://visitarewa.com${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `https://visitarewa.com/destinations/${slug}`,
      images: [
        {
          url: absoluteImg,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [absoluteImg],
    },
  };
}

export default function DestinationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
