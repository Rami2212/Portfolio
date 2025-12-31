"use client";

import { useEffect, useMemo, useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Project = {
  _id: string;
  title: string;
  slug: string;
  category: "se" | "devops" | "aiml";
  shortDescription: string;
  longDescription?: string;
  tags: string[];
  coverImage?: string;
  galleryImages: string[];
  techStack: string[];
  liveUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
  order: number;
};

const LABELS: Record<Project["category"], string> = {
  se: "SE",
  devops: "DevOps",
  aiml: "AI/ML",
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Project["category"] | "all">("all");


  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);

      const res = await fetch("/api/projects", { cache: "no-store" });

      if (!res.ok) {
        console.error("Failed to load projects");
        setProjects([]);
        return;
      }

      const text = await res.text();
      if (!text) {
        setProjects([]);
        return;
      }

      const json = JSON.parse(text);
      setProjects(json.reviews || []);
    } catch (err) {
      console.error("Projects fetch error:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const list = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return filter === "all" ? list : list.filter((p) => p.category === filter);
  }, [projects, filter]);


  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Selected work across Software Engineering, DevOps, and AI/ML domains."
      variant="light"
    >
      <Reveal>
        {/* Filter buttons + controls row */}
        <div className="flex flex-wrap gap-3 mb-8 justify-between items-center">
          {/* Filter buttons left */}
          <div className="flex flex-wrap gap-3">
            {(["all", "se", "devops", "aiml"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-xl px-6 py-3 border transition-all duration-300 font-medium ${filter === k
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-white/5 text-white/80 border-purple-400/20 hover:bg-white/10 hover:border-purple-400/40 backdrop-blur-sm"
                  }`}
              >
                {k === "all" ? "All Projects" : LABELS[k]}
              </button>
            ))}
          </div>


          {/* Controls right (arrows + dots) */}
          <div className="flex items-center gap-4">
            <button className="custom-prev group rounded-xl px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:scale-105 transition">
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>


            <div className="custom-pagination flex gap-2"></div>


            <button className="custom-next group rounded-xl px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:scale-105 transition">
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>


        {loading ? (
          <div className="text-white/60 text-center py-12">Loading…</div>
        ) : (
          <Swiper
            slidesPerView={2}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}


            modules={[Navigation, Pagination, Autoplay]}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-blue-400",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-blue-600",
            }}
            navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
            className="pb-8 items-stretch"
          >
            {filtered.map((p) => (
              <SwiperSlide key={p._id} className="h-auto flex">
                <ProjectCard project={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Reveal>
    </Section>
  );
}
