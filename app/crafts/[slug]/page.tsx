import React from "react";
import { notFound } from "next/navigation";
import { crafts } from "@/lib/data";
import CraftEditorialContent from "@/components/CraftEditorialContent";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const craft = crafts.find((c) => c.slug === slug);
  if (!craft) return { title: "Not Found" };

  return {
    title: `${craft.title} | Our Forgotten Crafts`,
    description: craft.shortDescription,
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
