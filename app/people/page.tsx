import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { people } from "@/lib/data";

export const metadata = {
  title: "Arewa Talent | Visit Arewa",
  description:
    "Discover the talented individuals shaping Arewa's future across business, entertainment, arts, and more.",
};

// Group people by category
const groupByCategory = (peopleList: any[]) => {
  const grouped: { [key: string]: any[] } = {};

  peopleList.forEach((person) => {
    const category = person.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(person);
  });

  return grouped;
};

export default function PeoplePage() {
  const groupedPeople = groupByCategory(people);
  const categories = Object.keys(groupedPeople).sort();

  return (
    <main className="bg-[#020402] min-h-screen text-white font-serif selection:bg-green-500 selection:text-black">
      {/* Hero Section */}
      <div className="relative py-20 px-6 md:px-20 border-b border-white/10">
        <Link
          href="/#people"
          className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10 mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back to Home</span>
        </Link>

        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
            Arewa Talent
          </h1>
          <p className="text-xl text-gray-300">
            Meet the visionary leaders, artists, and innovators who are shaping
            the future of Northern Nigeria across all sectors.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-6 md:px-20 py-20 font-serif">
        {categories.map((category) => (
          <div key={category} className="mb-20">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[2px] w-12 bg-green-500"></div>
              <h2 className="text-3xl md:text-4xl font-bold">{category}</h2>
            </div>

            {/* People Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedPeople[category].map((person) => (
                <Link key={person.slug} href={`/people/${person.slug}`}>
                  <div className="group cursor-pointer">
                    <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 inset-x-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                          {person.name}
                        </h3>
                        <p className="text-gray-300 text-sm">{person.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        <Award size={16} className="text-green-500" />
                        {person.origin}
                      </p>
                      <p className="text-gray-300 line-clamp-2">
                        {person.shortDescription}
                      </p>
                      <div className="pt-4">
                        <button className="text-green-500 hover:text-green-400 font-bold text-sm uppercase group-hover:translate-x-1 transition-transform">
                          View Profile →
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
