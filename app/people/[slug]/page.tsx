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
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  Facebook,
} from "lucide-react";
import { people } from "@/lib/data";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) return { title: "Person Not Found" };

  return {
    title: `${person.name} | Visit Arewa Talent`,
    description: person.shortDescription,
    openGraph: {
      title: `${person.name} | Visit Arewa Talent`,
      description: person.shortDescription,
      url: `https://visitarewa.com/people/${person.slug}`,
      images: [
        {
          url: person.image,
          width: 1200,
          height: 630,
          alt: person.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${person.name} | Visit Arewa Talent`,
      description: person.shortDescription,
      images: [person.image],
    },
  };
}

export default async function PersonPage({ params }: any) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);

  if (!person) {
    notFound();
  }

  const socialIcons: any = {
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    website: Globe,
  };

  const paragraphs = person.fullDescription ? person.fullDescription.split("\n\n").filter(Boolean) : [];
  const galleryImages = person.gallery || [];

  return (
    <main className="bg-[#020402] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      {/* --- IMMERSIVE HERO --- */}
      <div className="relative h-[90vh] md:h-screen w-full overflow-hidden">
        <div className="absolute top-8 left-6 md:left-20 z-50">
          <Link
            href="/people"
            className="w-fit flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-green-500 hover:text-black transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Return</span>
          </Link>
        </div>

        <div className="relative w-full h-full">
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover object-top scale-105 animate-[slowZoom_20s_ease-out_forwards]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020402] via-[#020402]/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-black/10 z-10"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20 z-20 flex flex-col justify-end translate-y-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-green-500"></div>
              <span className="text-green-500 font-bold tracking-[0.2em] uppercase text-sm">
                Arewa Excellence
              </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-rikafu font-black tracking-tighter leading-[0.85] text-white drop-shadow-2xl mb-8">
              {person.name}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed border-l-2 border-green-500/50 pl-6 italic font-serif">
              {person.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* --- EDITORIAL METADATA BAR --- */}
      <div className="border-y border-white/10 bg-white/[0.02] backdrop-blur-sm mt-16 relative z-30">
        <div className="container mx-auto px-6 md:px-20 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            <div className="space-y-1">
              <p className="text-xs text-green-500 uppercase tracking-widest font-bold flex items-center gap-2 mb-2">
                 <Briefcase size={14}/> Primary Role
              </p>
              <p className="font-medium text-gray-200">{person.role}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-green-500 uppercase tracking-widest font-bold flex items-center gap-2 mb-2">
                 <MapPin size={14}/> Origin
              </p>
              <p className="font-medium text-gray-200">{person.origin}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-green-500 uppercase tracking-widest font-bold flex items-center gap-2 mb-2">
                 <Award size={14}/> Category
              </p>
              <p className="font-medium text-gray-200">{person.category}</p>
            </div>
            
            {/* Social Connect embedded in metadata */}
            {person.socials && (
              <div className="space-y-1">
                <p className="text-xs text-green-500 uppercase tracking-widest font-bold mb-2">Connect</p>
                <div className="flex gap-3">
                  {Object.entries(person.socials).map(([platform, url]: [string, any]) => {
                    const IconComponent = socialIcons[platform.toLowerCase()];
                    if (!IconComponent || !url) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-green-500 transition-colors"
                        title={platform}
                      >
                        <IconComponent size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- EDITORIAL ARTICLE FLOW --- */}
      <article className="container mx-auto px-6 md:px-20 py-20 max-w-4xl">
        
        {/* The Story */}
        <div className="prose prose-invert prose-lg md:prose-xl max-w-none space-y-8 font-serif leading-relaxed text-gray-300">
          {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p className={index === 0 ? "first-letter:text-7xl first-letter:font-rikafu first-letter:text-green-500 first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-none" : ""}>
                {paragraph}
              </p>

              {/* Inject an image from the gallery every 2 paragraphs */}
              {index % 2 === 1 && galleryImages[Math.floor(index / 2)] && (
                 <figure className="my-16 md:my-24 relative h-[50vh] md:h-[70vh] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                    <Image
                      src={galleryImages[Math.floor(index / 2)]}
                      alt={`Portrait of ${person.name}`}
                      fill
                      className="object-cover"
                    />
                 </figure>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Massive Pull Quote */}
        {person.quote && (
          <div className="my-24 md:my-32 text-center px-4 md:px-12">
            <span className="text-green-500/30 text-8xl font-rikafu leading-none block mb-[-40px]">"</span>
            <blockquote className="text-3xl md:text-5xl font-rikafu leading-tight text-white drop-shadow-lg">
              {person.quote}
            </blockquote>
          </div>
        )}

        {/* Achievements Grid */}
        {person.achievements && person.achievements.length > 0 && (
          <div className="mt-24">
             <div className="flex items-center justify-center gap-4 mb-12 text-center">
                <div className="h-[1px] w-12 bg-white/20"></div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-green-500">Milestones & Impact</h3>
                <div className="h-[1px] w-12 bg-white/20"></div>
             </div>
             
             <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
               {person.achievements.map((achievement: string, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                     <CheckCircle className="text-green-500 mt-1 shrink-0" size={20} />
                     <span className="text-lg text-gray-300 font-serif leading-relaxed">{achievement}</span>
                  </div>
               ))}
             </div>
          </div>
        )}

      </article>

      {/* --- CALL TO ACTION --- */}
      <section className="px-6 md:px-20 py-32 bg-green-500 text-black text-center mt-10">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-rikafu font-black mb-8">
            Discover More Talent
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-12 opacity-90 leading-relaxed">
            Arewa is home to visionaries, creators, and leaders shaping the future. Explore the stories of those making an impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/people"
              className="px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-zinc-800 transition text-lg flex items-center justify-center gap-3"
            >
              Back to Excellence Hub
            </Link>
          </div>
        </div>
      </section>

      {/* Add a global style for the slow zoom animation if it doesn't exist */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}} />
    </main>
  );
}
