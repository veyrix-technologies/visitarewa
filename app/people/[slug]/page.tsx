import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Award,
  Briefcase,
  CheckCircle,
  Quote,
} from "lucide-react";
import { people } from "@/lib/data";
import GalleryPreview from "@/components/GalleryPreview";

// 1. Generate Metadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) return { title: "Person Not Found" };

  return {
    title: `${person.name} | Visit Arewa Talent`,
    description: person.shortDescription,
  };
}

// 2. Main Page Component
export default async function PersonPage({ params }: any) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);

  if (!person) {
    notFound();
  }

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={person.image}
            alt={person.name}
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
            href="/people"
            className="w-fit flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Talent</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-green-500 text-black px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider">
                <Award size={14} />
                <span>{person.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-sm font-medium border border-white/10">
                <MapPin size={14} className="text-green-400" />
                <span>{person.origin}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-white drop-shadow-xl">
              {person.name}
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl">
              {person.role}
            </p>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 md:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Description & Gallery */}
          <div className="lg:col-span-8 space-y-10">
            <div className="prose prose-lg prose-invert text-gray-400 leading-relaxed">
              <h3 className="text-2xl text-white font-bold mb-4">
                Who They Are
              </h3>
              <p className="text-xl leading-8 text-gray-300">
                {person.fullDescription}
              </p>
            </div>

            {/* Quote Section */}
            {person.quote && (
              <div className="bg-white/5 border border-green-500/30 rounded-2xl p-8 relative">
                <Quote className="absolute top-4 right-4 text-green-500/30" size={32} />
                <blockquote className="text-2xl font-serif italic text-gray-100 leading-relaxed">
                  "{person.quote}"
                </blockquote>
                <p className="text-green-400 font-bold mt-4">— {person.name}</p>
              </div>
            )}

            {/* Achievements */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl text-white font-bold mb-6">
                Major Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {person.achievements?.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-green-500 mt-1 shrink-0"
                      size={18}
                    />
                    <span className="text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {person.gallery && (
              <div>
                <h3 className="text-2xl text-white font-bold mb-6">Gallery</h3>
                <GalleryPreview images={person.gallery} />
              </div>
            )}
          </div>

          {/* Right Column: Info Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-sm">
              {/* Info Rows */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white font-bold text-lg">
                      {person.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Origin</p>
                    <p className="text-white font-bold text-lg">
                      {person.origin}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Role</p>
                    <p className="text-white font-bold text-lg">
                      {person.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 my-4"></div>

              {/* Call to Action */}
              <div className="space-y-3">
                <p className="text-gray-400 text-sm">
                  Discover the stories and achievements of Arewa's finest talent.
                </p>
                <Link
                  href="/people"
                  className="block w-full text-center bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-colors"
                >
                  Explore More Talent
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
