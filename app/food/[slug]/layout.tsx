import React from "react";
import { dishes } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = dishes.find((d) => d.slug === slug || String(d.id) === slug);
  
  const title = item ? `${item.name} | Arewa Cuisine` : "Visit Arewa Cuisine";
  const desc = item ? item.description : "Discover the delicious recipes and unique street food of Northern Nigeria.";
  const imgUrl = item ? item.image : "/images/fura.png";
  const absoluteImg = imgUrl.startsWith("http") ? imgUrl : `https://visitarewa.com${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `https://visitarewa.com/food/${slug}`,
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

export default function FoodLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
