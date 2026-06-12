"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ArrowLeft,
  CheckCircle,
  FileText,
  MapPin,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Calendar,
  Send,
  Plus,
  X,
  ChefHat,
  Ticket
} from "lucide-react";

type FormState = {
  type: "destination" | "cuisine" | "event" | "craft";
  title: string;
  location: string;
  description: string;
  fullText: string;
  imageUrls: string[];
  coordinates: string;
  category: string;
  date: string;
  calories: string;
  ingredientsInput: string;
  highlightsInput: string;
  statsInput: string;
  registrationEnabled: boolean;
  ticketType: "free" | "paid";
  ticketPrice: string;
  ticketCapacity: string;
};

const defaultForm: FormState = {
  type: "destination",
  title: "",
  location: "",
  description: "",
  fullText: "",
  imageUrls: [""],
  coordinates: "",
  category: "Culture",
  date: "",
  calories: "",
  ingredientsInput: "",
  highlightsInput: "",
  statsInput: "Culture, Traditional",
  registrationEnabled: true,
  ticketType: "free",
  ticketPrice: "",
  ticketCapacity: ""
};

const labelClass = "block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2.5";
const inputClass =
  "w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-green-500/50 focus:bg-zinc-950/80 transition-all duration-300 hover:border-white/10 font-sans";

export default function SubmitContentPage() {
  const { user, loading, submitContent, submissions, updateSubmission } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [formData, setFormData] = useState<FormState>(defaultForm);
  const [step, setStep] = useState<"select" | "chapter1" | "chapter2" | "chapter3">("select");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Route protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/portal");
    }
  }, [user, loading, router]);

  // Prefill form data if editing
  useEffect(() => {
    if (editId && submissions.length > 0) {
      const subToEdit = submissions.find((s) => s.id === editId);
      if (subToEdit) {
        setFormData({
          type: subToEdit.type,
          title: subToEdit.title,
          location: subToEdit.location,
          description: subToEdit.description,
          fullText: subToEdit.fullText,
          imageUrls: subToEdit.gallery?.length ? subToEdit.gallery : [subToEdit.imageUrl || ""],
          coordinates: subToEdit.coordinates || "",
          category: subToEdit.category || "",
          date: subToEdit.date || "",
          calories: subToEdit.calories || "",
          ingredientsInput: subToEdit.ingredients?.join("\n") || "",
          highlightsInput: subToEdit.highlights?.join(", ") || "",
          statsInput: subToEdit.stats?.join(", ") || "",
          registrationEnabled: subToEdit.registrationEnabled ?? false,
          ticketType: subToEdit.ticketType || "free",
          ticketPrice: subToEdit.ticketPrice?.toString() || "",
          ticketCapacity: subToEdit.ticketCapacity?.toString() || ""
        });
        setStep("chapter1");
      }
    }
  }, [editId, submissions]);

  if (loading || !user) {
    return (
      <div className="bg-[#020402] min-h-screen text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <Compass className="animate-spin text-green-500 w-12 h-12" />
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Loading Submission Form...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validate common fields
      if (!formData.title || !formData.location || !formData.description || !formData.fullText) {
        throw new Error("Please fill in all required storytelling fields.");
      }



      // Convert comma-separated string inputs to arrays
      const ingredients = formData.ingredientsInput
        ? formData.ingredientsInput.split("\n").map((i) => i.trim()).filter(Boolean)
        : [];
      const highlights = formData.highlightsInput
        ? formData.highlightsInput.split(",").map((h) => h.trim()).filter(Boolean)
        : [];
      const stats = formData.statsInput
        ? formData.statsInput.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      // Build image list — filter empty entries, fallback to placeholder
      const imageList = formData.imageUrls.filter(Boolean);
      const coverImage = imageList[0] || "/images/zuma.webp";

      // Structure the data to save
      const payload = {
        type: formData.type,
        title: formData.title,
        location: formData.location,
        description: formData.description,
        fullText: formData.fullText,
        imageUrl: coverImage,
        gallery: imageList.length > 0 ? imageList : [coverImage],
        coordinates: formData.coordinates || undefined,
        category: formData.category || undefined,
        date: formData.date || undefined,
        calories: formData.calories || undefined,
        ingredients: ingredients.length > 0 ? ingredients : undefined,
        highlights: highlights.length > 0 ? highlights : undefined,
        stats: stats.length > 0 ? stats : undefined,
        registrationEnabled: formData.type === "event" ? formData.registrationEnabled : undefined,
        ticketType: formData.type === "event" && formData.registrationEnabled ? formData.ticketType : undefined,
        ticketPrice: formData.type === "event" && formData.registrationEnabled && formData.ticketType === "paid" ? (Number(formData.ticketPrice) || 0) : undefined,
        ticketCapacity: formData.type === "event" && formData.registrationEnabled ? (Number(formData.ticketCapacity) || undefined) : undefined
      };

      if (editId) {
        await updateSubmission(editId, payload);
      } else {
        await submitContent(payload);
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong while transmitting your story.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(defaultForm);
    setIsSubmitted(false);
    setStep("select");
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-screen overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl z-10 relative">
          {/* Back/Navigation Links */}
          {editId ? (
            <Link
              href={`/dashboard/creations/${editId}`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors uppercase tracking-widest text-[10px] font-bold mb-8 cursor-pointer"
            >
              <ArrowLeft size={12} /> Cancel Edit
            </Link>
          ) : step === "select" ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors uppercase tracking-widest text-[10px] font-bold mb-8 cursor-pointer"
            >
              <ArrowLeft size={12} /> Back to Dashboard
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setStep("select")}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors uppercase tracking-widest text-[10px] font-bold mb-8 cursor-pointer bg-transparent border-none focus:outline-none"
            >
              <ArrowLeft size={12} /> Change Category
            </button>
          )}

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              step === "select" ? (
                <motion.div
                  key="category-select"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-zinc-950/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative"
                >
                  <div className="text-center mb-12">
                    <span className="text-green-500 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                      New Publication
                    </span>
                    <h1 className="text-4xl md:text-5xl font-rikafu font-bold mt-6 mb-3 text-white">
                      What would you like to publish?
                    </h1>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                      Select a category to share a piece of Arewa's culture, heritage, or events with the world.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {[
                      { type: "destination", label: "Destination", icon: MapPin, desc: "Publish landmarks, natural wonders, tourist sites, and geographic regions for the world to explore." },
                      { type: "cuisine", label: "Cuisine", icon: ChefHat, desc: "Share traditional recipes, regional delicacies, and popular local food spots." },
                      { type: "event", label: "Event/Festival", icon: Calendar, desc: "Promote upcoming cultural festivals, durbars, exhibitions, and community events." },
                      { type: "craft", label: "Art/Craft", icon: Sparkles, desc: "Showcase local artisans, traditional weaving, pottery, and cultural artifacts." }
                    ].map(({ type, label, icon: Icon, desc }) => (
                      <button
                        key={type}
                        onClick={() => {
                          setFormData({ ...defaultForm, type: type as FormState["type"] });
                          setStep("chapter1");
                        }}
                        className="group flex flex-col items-start gap-4 p-6 bg-white/[0.02] border border-white/5 hover:border-green-500/30 rounded-3xl transition-all duration-300 hover:bg-white/[0.04] text-left hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 group-hover:border-green-500/50 flex items-center justify-center text-gray-400 group-hover:text-green-400 group-hover:scale-110 transition-all">
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-sans tracking-wide text-white group-hover:text-green-400 transition-colors">
                            {label}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed font-sans">
                            {desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="submit-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="bg-zinc-950/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative"
                >
                  {/* Form Title */}
                  <div className="mb-8 font-sans">
                    <span className="text-green-500 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                      {editId ? `Editing ${formData.type}` : `Publishing a ${formData.type}`}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-sans font-bold mt-4 mb-2 text-white capitalize">
                      {editId ? (
                        `Edit: ${formData.title}`
                      ) : (
                        <>
                          {formData.type === "destination" && "Publish a Destination"}
                          {formData.type === "cuisine" && "Publish a Cuisine"}
                          {formData.type === "event" && "Launch an Event & Tickets"}
                          {formData.type === "craft" && "Publish a Handcraft"}
                        </>
                      )}
                    </h1>
                    <p className="text-gray-400 text-xs mt-1">
                      {formData.type === "destination" && "Share a landmark, natural wonder, or travel destination with the Visit Arewa community."}
                      {formData.type === "cuisine" && "Share a traditional recipe, ingredients, and the story behind this regional dish."}
                      {formData.type === "event" && "Launch a live event, set up ticketing, and start accepting bookings from the public."}
                      {formData.type === "craft" && "Showcase a traditional craft, the tools behind it, and why it matters to Arewa's heritage."}
                    </p>
                  </div>

                  {error && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2 font-sans">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-ping mr-2 shrink-0"></span>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">

                  {/* Chapter 01: Core Information */}
                  {step === "chapter1" && (
                  <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-2 pb-4 border-b border-white/5 font-sans">
                      <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                        <FileText size={16} />
                      </div>
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.25em] text-green-400">Chapter 01</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Storytelling & Narrative</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Title */}
                      <div className="space-y-2">
                        <label className={labelClass}>Title / Name *</label>
                        <input
                          required
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder={
                            formData.type === "destination"
                              ? "e.g. Zuma Rock"
                              : formData.type === "cuisine"
                                ? "e.g. Fura da Nono"
                                : formData.type === "event"
                                  ? "e.g. Argungu Fishing Festival"
                                  : "e.g. Indigo Dyeing Pit"
                          }
                          className={inputClass}
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <label className={labelClass}>Location / State *</label>
                        <input
                          required
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g. Kano, Nigeria"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Description (Short) */}
                    <div className="space-y-2 font-sans">
                      <label className={labelClass}>Short Description *</label>
                      <textarea
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Write a brief, catchy 2-3 sentence introduction to display in cards..."
                        rows={2}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Full Story Telling */}
                    <div className="space-y-2 font-sans">
                      <label className={labelClass}>Full Narrative / Historical Context *</label>
                      <textarea
                        required
                        name="fullText"
                        value={formData.fullText}
                        onChange={handleInputChange}
                        placeholder="Write the deep history, folklore, significance, and travel advice. Be descriptive and respectful..."
                        rows={6}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                  )}

                  {/* Chapter 02: Dynamic Categorized Meta Fields */}
                  {step === "chapter2" && (
                  <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-2 pb-4 border-b border-white/5 font-sans">
                      <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.25em] text-green-400">Chapter 02</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Metadata & Specifications</p>
                      </div>
                    </div>

                    {/* Dynamic Fields for Destination */}
                    {formData.type === "destination" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-2">
                          <label className={labelClass}>Coordinates</label>
                          <input
                            type="text"
                            name="coordinates"
                            value={formData.coordinates}
                            onChange={handleInputChange}
                            placeholder="e.g. 9.1200° N, 7.2500° E"
                            className={inputClass}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Highlights (comma-separated)</label>
                          <input
                            type="text"
                            name="highlightsInput"
                            value={formData.highlightsInput}
                            onChange={handleInputChange}
                            placeholder="e.g. Face Rock, Gbagyi deity, Hiking paths"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    )}

                    {/* Dynamic Fields for Cuisine */}
                    {formData.type === "cuisine" && (
                      <div className="space-y-6 pt-2 font-sans">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className={labelClass}>Calories Est.</label>
                            <input
                              type="text"
                              name="calories"
                              value={formData.calories}
                              onChange={handleInputChange}
                              placeholder="e.g. 350 kcal"
                              className={inputClass}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Dish Characteristics (comma-separated)</label>
                            <input
                              type="text"
                              name="statsInput"
                              value={formData.statsInput}
                              onChange={handleInputChange}
                              placeholder="e.g. Spicy, Traditional, Fermented, Dinner"
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Ingredients List (one per line)</label>
                          <textarea
                            name="ingredientsInput"
                            value={formData.ingredientsInput}
                            onChange={handleInputChange}
                            placeholder="e.g. Millet Flour&#10;Fermented Cow Milk (Nono)&#10;Ginger Ginger"
                            rows={3}
                            className={`${inputClass} resize-none`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Dynamic Fields for Event */}
                    {formData.type === "event" && (
                      <div className="space-y-6 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className={labelClass}>Event Date / Period</label>
                            <input
                              type="text"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              placeholder="e.g. Eid al-Fitr, or Oct 10 - 15"
                              className={inputClass}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Event Category</label>
                            <input
                              type="text"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              placeholder="e.g. Cultural parade, Martial arts"
                              className={inputClass}
                            />
                          </div>
                        </div>

                        {/* Registration Toggle Switch */}
                        <div className="border border-white/5 rounded-2xl bg-zinc-950/40 overflow-hidden font-sans">
                          <div className="flex items-center justify-between p-5 bg-white/[0.01]">
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                <Sparkles size={16} className="text-green-500" />
                                Enable Public Registration
                              </h4>
                              <p className="text-[10px] text-gray-500">
                                Allow visitors to book tickets online and track attendees.
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer select-none">
                              <input
                                type="checkbox"
                                name="registrationEnabled"
                                checked={formData.registrationEnabled}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    registrationEnabled: e.target.checked,
                                  }))
                                }
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 peer-checked:after:bg-black peer-checked:after:border-black"></div>
                            </label>
                          </div>

                          {/* Ticketing Options (Render if registration is enabled) */}
                          {formData.registrationEnabled && (
                            <div className="p-5 border-t border-white/5 bg-zinc-950/20 space-y-5">
                              <div className="space-y-2.5">
                                <label className={labelClass}>Ticket Admission Tier</label>
                                <div className="flex gap-4">
                                  {(["free", "paid"] as const).map((tType) => {
                                    const isSelected = formData.ticketType === tType;
                                    return (
                                      <button
                                        key={tType}
                                        type="button"
                                        onClick={() => setFormData((prev) => ({ ...prev, ticketType: tType }))}
                                        className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                          isSelected
                                            ? "bg-green-500 text-black border-green-500 shadow-md shadow-green-500/10"
                                            : "bg-black/30 text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                                        }`}
                                      >
                                        {tType} Admission
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Price (Paid only) */}
                                <div className="space-y-2">
                                  <label className={labelClass}>
                                    Ticket Price (₦) {formData.ticketType === "paid" && "*"}
                                  </label>
                                  <input
                                    type="number"
                                    name="ticketPrice"
                                    disabled={formData.ticketType === "free"}
                                    value={formData.ticketType === "free" ? "" : formData.ticketPrice}
                                    onChange={handleInputChange}
                                    required={formData.ticketType === "paid"}
                                    placeholder={formData.ticketType === "free" ? "Free Entrance" : "e.g. 5000"}
                                    className={`${inputClass} disabled:opacity-30 disabled:cursor-not-allowed`}
                                    min="0"
                                  />
                                </div>

                                {/* Capacity */}
                                <div className="space-y-2">
                                  <label className={labelClass}>Total Attendee Capacity (Optional)</label>
                                  <input
                                    type="number"
                                    name="ticketCapacity"
                                    value={formData.ticketCapacity}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 100 (Leave empty for unlimited)"
                                    className={inputClass}
                                    min="1"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Dynamic Fields for Craft */}
                    {formData.type === "craft" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-sans">
                        <div className="space-y-2">
                          <label className={labelClass}>Craft Classification</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-green-500 transition-all font-sans"
                          >
                            <option value="Textile Craft">Textile Craft</option>
                            <option value="Wood & Gourd Craft">Wood & Gourd</option>
                            <option value="Leather Craft">Leather Craft</option>
                            <option value="Metal Craft">Metal Craft</option>
                            <option value="Pottery">Pottery</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Tools Used (comma-separated)</label>
                          <input
                            type="text"
                            name="highlightsInput"
                            value={formData.highlightsInput}
                            onChange={handleInputChange}
                            placeholder="e.g. Tanning pits, Natural Dyes, Awls"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  )}

                  {/* Chapter 03: Media */}
                  {step === "chapter3" && (
                    <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                      <div className="flex items-center gap-3 mb-2 pb-4 border-b border-white/5 font-sans">
                        <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                          <ImageIcon size={16} />
                        </div>
                        <div>
                          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-green-400">Chapter 03</h3>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Media & Visuals</p>
                        </div>
                      </div>

                      {/* Images Section */}
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between">
                          <label className={labelClass}>Images</label>
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ""] }))}
                            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors cursor-pointer"
                          >
                            <Plus size={12} /> Add Image
                          </button>
                        </div>

                        <div className="space-y-3">
                          {formData.imageUrls.map((url, index) => (
                            <div key={index} className="flex gap-3 items-center">
                              <div className="flex flex-col items-center gap-1 shrink-0">
                                <div className={`p-2.5 rounded-xl border flex items-center justify-center ${
                                  index === 0
                                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                                    : "bg-white/5 border-white/10 text-gray-500"
                                }`}>
                                  <ImageIcon size={16} />
                                </div>
                                {index === 0 && (
                                  <span className="text-[8px] font-black uppercase tracking-widest text-green-500">Cover</span>
                                )}
                              </div>
                              <input
                                type="url"
                                value={url}
                                onChange={(e) => {
                                  const updated = [...formData.imageUrls];
                                  updated[index] = e.target.value;
                                  setFormData((prev) => ({ ...prev, imageUrls: updated }));
                                }}
                                placeholder={index === 0 ? "Cover image URL (e.g. https://...)" : `Image ${index + 1} URL`}
                                className={inputClass}
                              />
                              {formData.imageUrls.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = formData.imageUrls.filter((_, i) => i !== index);
                                    setFormData((prev) => ({ ...prev, imageUrls: updated }));
                                  }}
                                  className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all shrink-0 cursor-pointer"
                                  title="Remove image"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <span className="text-[9px] text-gray-600 uppercase tracking-wider block">
                          First image is the cover. Add more for the gallery. Leave blank to use a placeholder.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Wizard Navigation */}
                  <div className="pt-8 flex justify-between items-center border-t border-white/5 font-sans">
                    {step === "chapter1" && (
                      <>
                        <div />
                        <button
                          type="button"
                          onClick={() => {
                            if (!formData.title || !formData.location || !formData.description || !formData.fullText) {
                              setError("Please fill out all required fields (*).");
                            } else {
                              setError("");
                              setStep("chapter2");
                            }
                          }}
                          className="w-full md:w-auto cursor-pointer bg-green-500 hover:bg-green-400 text-black py-4 px-10 rounded-xl font-bold transition-all"
                        >
                          Next: Metadata
                        </button>
                      </>
                    )}

                    {step === "chapter2" && (
                      <>
                        <button
                          type="button"
                          onClick={() => setStep("chapter1")}
                          className="cursor-pointer bg-white/5 hover:bg-white/10 text-white py-4 px-8 rounded-xl font-bold transition-all text-xs uppercase tracking-widest"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep("chapter3")}
                          className="w-full md:w-auto cursor-pointer bg-green-500 hover:bg-green-400 text-black py-4 px-10 rounded-xl font-bold transition-all"
                        >
                          Next: Media
                        </button>
                      </>
                    )}

                    {step === "chapter3" && (
                      <>
                        <button
                          type="button"
                          onClick={() => setStep("chapter2")}
                          className="cursor-pointer bg-white/5 hover:bg-white/10 text-white py-4 px-8 rounded-xl font-bold transition-all text-xs uppercase tracking-widest"
                        >
                          Previous
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto cursor-pointer bg-green-500 hover:bg-green-400 text-black py-4 px-10 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Transmitting...
                            </>
                          ) : (
                            <>
                              {editId ? "Save Changes" : "Submit for Review"} <Send size={14} />
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                  {step === "chapter3" && (
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-4 text-center">
                      * All submissions are reviewed by our team before going live on the platform.
                    </p>
                  )}
                </form>
              </motion.div>
            )
          ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-950/60 backdrop-blur-xl border border-white/5 p-12 md:p-20 text-center rounded-[2.5rem] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <CheckCircle size={48} className="text-green-500 animate-pulse" />
                  </div>
                </div>

                 <h2 className="text-4xl md:text-5xl font-rikafu font-bold text-white mb-6">
                  {editId ? "Changes Saved" : "Successfully Submitted"}
                </h2>
                <p className="text-gray-400 mb-10 max-w-lg mx-auto text-base md:text-lg font-serif italic leading-relaxed">
                  {editId
                    ? "Your updates have been saved. The changes are now live and visible on the platform."
                    : "Your submission has been received. Our team will review it and publish it once verified. Thank you for contributing to Visit Arewa!"}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {editId ? (
                    <Link
                      href={`/dashboard/creations/${editId}`}
                      className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black text-xs font-bold uppercase tracking-widest rounded-full transition text-center font-sans font-bold flex items-center justify-center cursor-pointer"
                    >
                      View Chronicle
                    </Link>
                  ) : (
                    <button
                      onClick={resetForm}
                      className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black text-xs font-bold uppercase tracking-widest rounded-full transition cursor-pointer"
                    >
                      Publish Another
                    </button>
                  )}
                  <Link
                    href="/dashboard"
                    className="px-8 py-4 border border-white/20 hover:border-green-500 hover:text-green-400 text-white text-xs font-bold uppercase tracking-widest rounded-full transition text-center flex items-center justify-center"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
