import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Flame, Clock } from "lucide-react";
import { dishes } from "@/lib/data";

export const metadata = {
  title: "Culinary Heritage | Visit Arewa",
  description:
    "Explore the authentic flavors, traditional recipes, and rich culinary history of Northern Nigeria.",
};

// Group items by category (Main Dish, Snack, Drink, etc.)
const groupByCategory = (list: any[]) => {
  const grouped: { [key: string]: any[] } = {};

  list.forEach((item) => {
    const category = item.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(item);
  });

  return grouped;
};

export default function FoodIndexPage() {
  const groupedCuisine = groupByCategory(dishes);
  const categories = Object.keys(groupedCuisine).sort();

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Hero Section */}
      <div className="relative py-20 px-6 md:px-20 border-b border-white/10">
        <Link
          href="/#cuisine"
          className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back to Home</span>
        </Link>

        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl text-green-500 font-bold mb-6 font-rikafu">
            Taste of Arewa
          </h1>
          <p className="text-xl text-gray-300">
            From the spicy kick of Kilishi to the comforting warmth of Tuwo.
            Discover the recipes and stories behind the North's most beloved
            dishes.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-6 md:px-20 py-20 font-sans">
        {categories.map((category) => (
          <div key={category} className="mb-20">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[2px] w-12 bg-green-500"></div>
              <h2 className="text-3xl font-rikafu md:text-4xl font-bold">{category}</h2>
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedCuisine[category].map((item) => (
                <Link key={item.slug} href={`/food/${item.slug}`}>
                  <div className="group cursor-pointer">
                    {/* Image Card */}
                    <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4  group-hover:transition-all duration-300 border border-white/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                      {/* Overlay Info */}
                      <div className="absolute bottom-0 inset-x-0 p-6">
                        <h3 className="text-2xl font-bold text-green-400 mb-2 group-hover:transition-colors">
                          {item.name}
                        </h3>
                        {item.tagline && (
                          <p className="text-gray-300 text-sm italic">
                            "{item.tagline}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Details below card */}
                    <div className="space-y-2 px-2">
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                          <Flame size={16} className="text-orange-500" />
                          {item.calories}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-green-500" />
                          45 Mins
                        </div>
                      </div>

                      <p className="text-gray-300 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-4">
                        <button className="text-green-500 hover:text-green-400 font-bold text-sm uppercase group-hover:translate-x-1 transition-transform flex items-center gap-2">
                          View Recipe{" "}
                          <ArrowLeft className="rotate-180" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="h-[1px] bg-white/10 mt-20"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
