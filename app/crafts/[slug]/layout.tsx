import React from "react";
import { crafts } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const craft = crafts.find((c) => c.slug === slug || String(c.id) === slug);
  
  const title = craft ? `${craft.name} — Living Heritage | Visit Arewa` : "Visit Arewa Crafts";
  const desc = craft ? craft.shortDescription : "Discover the traditional crafts, pottery, metalwork, and living heritage of Northern Nigeria.";
  const imgUrl = craft ? craft.image : "/images/hausa.jpg";
  const absoluteImg = imgUrl.startsWith("http") ? imgUrl : `https://visitarewa.com${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `https://visitarewa.com/crafts/${slug}`,
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

export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
