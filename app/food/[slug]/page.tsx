import React from "react";
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
} from "lucide-react";
import { dishes } from "@/lib/data";
import FoodActionButtons from "@/components/FoodActionButtons"; // ✅ Import the new component

// 1. Generate Metadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const item = dishes.find((e) => e.slug === slug);
  if (!item) return { title: "Dish Not Found" };

  return {
    title: `${item.name} | Taste of Arewa`,
    description: item.description,
  };
}

// 2. Main Page Component
export default async function FoodPage({ params }: any) {
  const { slug } = await params;
  const item = dishes.find((e) => e.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={item.image}
            alt={item.name}
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
              {item.name}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl font-sans">
              {item.tagline}
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
              <p className="text-xl leading-8 text-gray-300">
                {item.description}
              </p>
            </div>

            {/* Quote Section */}
            <div className="bg-white/5 border border-green-500/30 rounded-2xl p-8 relative">
              <Quote
                className="absolute top-4 right-4 text-green-500/30"
                size={32}
              />
              <blockquote className="text-2xl font-rikafu italic text-gray-100 leading-relaxed">
                "{item.quote}"
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
                <FoodActionButtons videoUrl={item.video} />

                {/* Secondary: View Menu */}
                <Link
                  href="/food"
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Utensils size={16} /> View Full Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
