import React from "react";
import { explorers } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const explorer = explorers.find((e) => e.slug === slug);
  if (!explorer) return { title: "Explorer Not Found" };

  const imgUrl = explorer.image;
  const absoluteImg = imgUrl.startsWith("http") ? imgUrl : `https://visitarewa.com${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;

  return {
    title: `${explorer.name} | Visit Arewa Explorers`,
    description: explorer.shortDescription,
    openGraph: {
      title: `${explorer.name} | Visit Arewa Explorers`,
      description: explorer.shortDescription,
      url: `https://visitarewa.com/explorers/${explorer.slug}`,
      images: [
        {
          url: absoluteImg,
          width: 1200,
          height: 630,
          alt: explorer.name,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: explorer.name,
      description: explorer.shortDescription,
      images: [absoluteImg],
    },
  };
}

export default function ExplorerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
