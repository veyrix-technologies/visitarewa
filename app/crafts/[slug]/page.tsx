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

  return <CraftEditorialContent craft={craft} />;
}
