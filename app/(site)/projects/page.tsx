"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProjectCard from "./../components/ProjectCard";

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
  githubUrl?: string;
  isFeatured: boolean;
  order: number;
};

const LABELS: Record<Project["category"], string> = {
  se: "Software Engineering",
  devops: "DevOps",
  aiml: "AI / ML",
};

export default function AllProjectsPage() {
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
      setProjects(json.projects || []);
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
    <main className="min-h-screen relative px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group mb-8"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            All Projects
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore my complete portfolio across Software Engineering, DevOps, and AI/ML domains.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {(["all", "se", "devops", "aiml"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-xl px-6 py-3 border transition-all duration-300 font-medium ${
                filter === k
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-white/80 border-purple-400/20 hover:bg-white/10 hover:border-purple-400/40 backdrop-blur-sm"
              }`}
            >
              {k === "all" ? "All Projects" : LABELS[k]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-white/60 text-center py-12">Loading projects...</div>
        ) : filtered.length === 0 ? (
          <div className="text-white/60 text-center py-12">No projects found.</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>

            {/* Count */}
            <div className="text-center mt-12 text-white/60">
              Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}
              {filter !== "all" && ` in ${LABELS[filter]}`}
            </div>
          </>
        )}
      </div>
    </main>
  );
}