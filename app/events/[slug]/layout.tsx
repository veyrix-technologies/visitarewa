import React from "react";
import { events } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug || String(e.id) === slug);
  
  const title = event ? `${event.name} | Visit Arewa Events` : "Visit Arewa Events";
  const desc = event ? event.shortDescription : "Register and attend the premium cultural festivals, arts exhibitions, and lifestyle events in Northern Nigeria.";
  const imgUrl = event ? event.image : "/images/argungu.webp";
  const absoluteImg = imgUrl.startsWith("http") ? imgUrl : `https://visitarewa.com${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `https://visitarewa.com/events/${slug}`,
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

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
