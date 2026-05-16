"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

type FormData = {
  craftName: string;
  craftCategory: string;
  craftDescription: string;
  history: string;
  significance: string;
  contributorName: string;
  contributorEmail: string;
  contributorRegion: string;
  contributorStory: string;
  imageUrl: string;
  gallery: string[];
};

const defaultForm: FormData = {
  craftName: "",
  craftCategory: "Textile Craft",
  craftDescription: "",
  history: "",
  significance: "",
  contributorName: "",
  contributorEmail: "",
  contributorRegion: "",
  contributorStory: "",
  imageUrl: "",
  gallery: [""],
};

const inputClass =
  "w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:bg-black/60 hover:border-white/20 transition-all duration-300 shadow-inner shadow-black/50";

const labelClass = "block text-xs font-bold uppercase tracking-widest mb-3 text-gray-400";

function SectionHeader({ label, title, description }: { label: string; title: string, description?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-3">
        <div className="h-[1px] w-12 bg-green-500" />
        <span className="text-green-500 font-bold tracking-[0.2em] text-xs uppercase">{label}</span>
      </div>
      <h4 className="text-4xl font-black text-white font-rikafu mb-2">{title}</h4>
      {description && <p className="text-gray-400 font-serif italic text-lg">{description}</p>}
    </div>
  );
}

export default function CraftSubmissionForm() {
  const [formData, setFormData] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = value;
    setFormData((prev) => ({ ...prev, gallery: newGallery }));
  };

  const addGalleryField = () =>
    setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ""] }));

  const removeGalleryField = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (!formData.craftName || !formData.contributorName || !formData.contributorEmail) {
        setError("Please fill in all required fields.");
        setIsLoading(false);
        return;
      }
      console.log("Form submitted:", formData);
      setTimeout(() => {
        setSubmitted(true);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900/80 border border-white/5 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-500" />
          </div>
        </div>
        <h3 className="text-5xl font-rikafu font-bold text-white mb-6">Story Received</h3>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg font-serif italic leading-relaxed">
          Your craft story has been securely transmitted. Our editorial team will review your submission 
          and reach out within 7 business days. Thank you for preserving Arewa's legacy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => { setSubmitted(false); setFormData(defaultForm); }}
            className="px-8 py-4 bg-green-500 text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-green-400 transition"
          >
            Submit Another
          </button>
          <Link
            href="/crafts"
            className="px-8 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:border-green-500 hover:text-green-400 transition text-center"
          >
            Explore Crafts
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-12"
    >
      {error && (
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-medium flex items-center gap-3">
           <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          {error}
        </div>
      )}

      {/* Craft Information Section */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <SectionHeader 
           label="Chapter 01" 
           title="The Craft" 
           description="Tell us about the tradition, its origins, and why it matters." 
        />

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className={labelClass}>Craft Name *</label>
            <input
              type="text"
              name="craftName"
              value={formData.craftName}
              onChange={handleInputChange}
              placeholder="e.g., Indigo Dyeing, Calabash Carving"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <div className="relative">
              <select
                name="craftCategory"
                value={formData.craftCategory}
                onChange={handleInputChange}
                className={`${inputClass} appearance-none`}
              >
                <option>Textile Craft</option>
                <option>Wood &amp; Gourd Craft</option>
                <option>Leather Craft</option>
                <option>Metal Craft</option>
                <option>Pottery</option>
                <option>Weaving</option>
                <option>Woodcarving</option>
                <option>Other</option>
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className={labelClass}>Short Description</label>
          <textarea
            name="craftDescription"
            value={formData.craftDescription}
            onChange={handleInputChange}
            placeholder="Write a captivating 2–3 sentence description..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="mb-8">
          <label className={labelClass}>History &amp; Origins</label>
          <textarea
            name="history"
            value={formData.history}
            onChange={handleInputChange}
            placeholder="Trace the roots. Where did it begin? Who practiced it first?"
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="mb-8">
          <label className={labelClass}>Cultural Significance</label>
          <textarea
            name="significance"
            value={formData.significance}
            onChange={handleInputChange}
            placeholder="Why is this important to Arewa's cultural fabric?"
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="mb-8">
          <label className={labelClass}>Featured Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="https://your-image-link.com/photo.jpg"
            className={inputClass}
          />
        </div>

        <div className="pt-4 border-t border-white/5">
          <label className={labelClass}>Gallery Images (Optional)</label>
          <div className="space-y-4">
            {formData.gallery.map((url, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleGalleryChange(index, e.target.value)}
                  placeholder={`Gallery image ${index + 1} URL`}
                  className={inputClass}
                />
                {formData.gallery.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGalleryField(index)}
                    className="p-4 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shrink-0"
                    title="Remove"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addGalleryField}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-gray-300 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/10 hover:text-white transition-all border border-white/10"
          >
            + Add Another Image
          </button>
        </div>
      </div>

      {/* Contributor Information Section */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <SectionHeader 
           label="Chapter 02" 
           title="The Storyteller" 
           description="Who are you, and what connects you to this craft?"
        />

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              type="text"
              name="contributorName"
              value={formData.contributorName}
              onChange={handleInputChange}
              placeholder="Your given name"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              type="email"
              name="contributorEmail"
              value={formData.contributorEmail}
              onChange={handleInputChange}
              placeholder="hello@example.com"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="mb-8">
          <label className={labelClass}>Region or City</label>
          <input
            type="text"
            name="contributorRegion"
            value={formData.contributorRegion}
            onChange={handleInputChange}
            placeholder="e.g., The ancient city of Kano"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Your Personal Connection</label>
          <textarea
            name="contributorStory"
            value={formData.contributorStory}
            onChange={handleInputChange}
            placeholder="Share your personal tie to this craft. Why do you want to see it preserved?"
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-8 flex flex-col items-center">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex items-center justify-center gap-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 px-12 py-5 rounded-full transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-green-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 relative z-10">
             {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
             ) : (
                <svg className="w-5 h-5 text-black ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             )}
          </div>
          <span className="text-sm font-bold text-green-400 uppercase tracking-[0.2em] relative z-10">
            {isLoading ? "Transmitting..." : "Submit Craft Story"}
          </span>
        </button>
        <p className="text-xs text-gray-500 font-medium mt-6 text-center max-w-sm uppercase tracking-widest leading-relaxed">
          * Required fields. All submissions are subject to editorial review.
        </p>
      </div>
    </motion.form>
  );
}
