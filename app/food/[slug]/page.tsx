"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Flame,
  Clock,
  Utensils,
  CheckCircle,
  ChefHat,
  Quote,
  Compass,
  Mail
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { dishes } from "@/lib/data";
import FoodActionButtons from "@/components/food/FoodActionButtons";
import RelatedCreations from "@/components/media/RelatedCreations";
import SafeRikafuText from "@/components/layout/SafeRikafuText";
import Footer from "@/components/layout/footer";

export default function FoodPage({ params }: any) {
  const resolvedParams = React.use(params as Promise<any>);
  const slug = resolvedParams.slug;

  const { submissions } = useAuth();

  let item = submissions.find((e) => (e.slug === slug || e.id === slug) && e.type === "cuisine");
  if (!item) {
    item = submissions.find(
      (e) => e.type === "cuisine" && e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );
  }

  // Fallback to static dishes on initial render / server render
  if (!item) {
    const staticDish = dishes.find((d) => d.slug === slug || String(d.id) === slug);
    if (staticDish) {
      item = {
        id: `legacy-dish-${staticDish.id}`,
        slug: staticDish.slug,
        type: "cuisine",
        title: staticDish.name,
        location: "Arewa",
        description: staticDish.description,
        fullText: staticDish.description,
        imageUrl: staticDish.image,
        gallery: [staticDish.image],
        status: "published",
        submittedAt: "2026-01-01T00:00:00Z",
        userEmail: "admin@explore.com",
        calories: staticDish.calories,
        stats: staticDish.stats,
        ingredients: staticDish.ingredients
      };
    }
  }

  // Define Recipe Schema JSON-LD
  const recipeImg = item?.imageUrl || "/images/fura.png";
  const jsonLd = item ? {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": item.title,
    "image": [recipeImg.startsWith("http") ? recipeImg : `https://visitarewa.com${recipeImg.startsWith("/") ? "" : "/"}${recipeImg}`],
    "author": {
      "@type": "Organization",
      "name": "Visit Arewa",
      "url": "https://visitarewa.com"
    },
    "datePublished": "2026-05-17",
    "description": item.description,
    "prepTime": "PT15M",
    "cookTime": "PT30M",
    "totalTime": "PT45M",
    "recipeCategory": item.category || "General",
    "recipeCuisine": "Arewa",
    "recipeIngredient": item.ingredients || []
  } : null;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (item) {
      document.title = `${item.title} | Visit Arewa Cuisine`;
    }
  }, [item]);

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
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Simmering the Spices...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    notFound();
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
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={item.imageUrl || "/images/fura.png"}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#020402] z-10"></div>
        </div>

        {/* Navigation & Title */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-20 z-20">
          <Link
            href="/food"
            className="w-fit flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Menu</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-green-500 text-black px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider">
                <Utensils size={14} />
                <span>{item.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-sm font-medium border border-white/10">
                <Flame size={14} className="text-orange-400" />
                <span>{item.calories}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-rikafu font-black tracking-tighter leading-none text-white drop-shadow-xl">
              <SafeRikafuText text={item.title} />
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl font-sans">
              {item.stats?.[0] || item.description}
            </p>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 md:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Description & Ingredients */}
          <div className="lg:col-span-8 space-y-10">
            <div className="prose prose-lg prose-invert text-gray-400 leading-relaxed">
              <h3 className="text-2xl text-white font-bold mb-4">
                About this Dish
              </h3>
              {item.fullText ? item.fullText.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-xl leading-8 text-gray-300 mb-6 last:mb-0">
                  {paragraph}
                </p>
              )) : (
                <p className="text-xl leading-8 text-gray-300 mb-6 last:mb-0">
                  {item.description}
                </p>
              )}
            </div>

            {/* Quote Section */}
            <div className="bg-white/5 border border-green-500/30 rounded-2xl p-8 relative">
              <Quote
                className="absolute top-4 right-4 text-green-500/30"
                size={32}
              />
              <blockquote className="text-2xl font-serif italic text-gray-100 leading-relaxed">
                "{item.stats?.[1] || "A true taste of our cultural heritage, passed down through generations."}"
              </blockquote>
              <p className="text-green-400 font-bold mt-4">
                — Cultural Heritage
              </p>
            </div>

            {/* Ingredients (Styled like Event Highlights) */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl text-white font-bold mb-6">
                Key Ingredients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.ingredients?.map((ing, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-green-500 mt-1 shrink-0"
                      size={18}
                    />
                    <span className="text-gray-300">{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Info Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-sm">
              {/* Info Rows */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <ChefHat size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white font-bold text-lg">
                      {item.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Flame size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Calories</p>
                    <p className="text-white font-bold text-lg">
                      {item.calories}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Prep Time</p>
                    <p className="text-white font-bold text-lg">45 Mins</p>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 my-4"></div>

              {/* INTERACTIVE ACTIONS */}
              <div className="space-y-3">
                {/* Primary: Watch Video */}
                <FoodActionButtons
                  videoUrl={(item as any).video || undefined}
                  title={item.title}
                  creator={(item as any).videoCreator}
                />

                {/* Secondary: View Menu */}
                <Link
                  href="/food"
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Utensils size={16} /> View Full Menu
                </Link>

                {/* --- NEW: Chef/Recipe Submission Section --- */}
                <div className="pt-6 mt-2 border-t border-white/10">
                  <p className="text-gray-400 text-sm mb-3">
                    Are you a chef or home cook? <br />
                    <span className="text-white font-bold">
                      Want to share a recipe?
                    </span>
                  </p>

                  <a
                    href="mailto:hello@visitarewa.com?subject=Recipe%20Submission"
                    className="block w-full text-center bg-transparent border border-white/20 hover:border-green-500 text-gray-300 hover:text-green-400 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Mail size={16} /> Contact Us Here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <RelatedCreations searchTerm={item.title} excludeId={item.id} />
      </div>
      <Footer />
    </main>
  );
}
