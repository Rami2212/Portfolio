"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  _id: string;
  title: string;
  slug: string;
  category: "se" | "devops" | "aiml" | "other";
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

type Site = {
  _id: string;
  item: string;
  value: boolean;
};

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [site, setSite] = useState<Site[]>([]);
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [githubLinkVisible, setGithubLinkVisible] = useState(false);

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (slug) load();
    loadSite();
  }, [slug]);

  useEffect(() => {
  const githubSetting = site.find(s => s.item === "github");
  setGithubLinkVisible(githubSetting?.value ?? false);
}, [site]);

  async function load() {
    if (!slug) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/projects/slug/${slug}`, { cache: "no-store" });

      if (!res.ok) {
        console.error("Failed to load project");
        setProject(null);
        return;
      }

      const text = await res.text();
      if (!text) {
        setProject(null);
        return;
      }

      const json = JSON.parse(text);
      setProject(json.project || null);
    } catch (err) {
      console.error("Project fetch error:", err);
      setProject(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadSite() {
  try {
    const res = await fetch("/api/site", { cache: "no-store" });

    if (!res.ok) return;

    const json = await res.json();
    setSite(json.sites || []);
  } catch (err) {
    console.error("Site fetch error:", err);
  }
}

  if (loading) {
    return (
      <main className="min-h-screen relative px-6 py-16 flex items-center justify-center">
        <div className="text-white/60 text-lg">Loading project...</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen relative px-6 py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-white/60 mb-8">The project you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const categoryLabels: Record<Project["category"], string> = {
    se: "Software Engineering",
    devops: "DevOps",
    aiml: "AI / ML",
    other: "Other",
  };

  return (
    <main className="min-h-screen relative px-6 py-16">
      <div className="mx-auto max-w-5xl">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-purple-200 font-medium">
              {categoryLabels[project.category]}
            </span>
            {project.isFeatured && (
              <span className="text-sm px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400/30 text-purple-200 font-medium">
                ⭐ Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            {project.title}
          </h1>

          <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>
        </div>

        {/* Cover Image */}
        {project.coverImage && (
          <div className="mt-8 rounded-2xl border border-purple-400/20 overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-[600px] object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              onClick={() => {
                if (project.coverImage) {
                  setOpenImage(project.coverImage);
                }
              }}
            />
          </div>
        )}

        {/* Action Buttons */}
        {(project.liveUrl || project.demoUrl || project.githubUrl) && (
          <div className="mt-8 flex gap-4 flex-wrap">
            {project.liveUrl && (
              <a
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-white font-semibold shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live Site
              </a>
            )}
            {project.demoUrl && (
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Demo
              </a>
            )}
            {project.githubUrl && githubLinkVisible && (
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            )}  
          </div>
        )}

        {/* Content Grid */}
        <div className="mt-8 grid gap-6">
          {/* Long Description */}
          {project.longDescription && (
            <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white mb-4">Project Overview</h2>
              <div className="whitespace-pre-wrap text-white/75 leading-relaxed">
                {project.longDescription}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/10 border border-purple-400/30 text-white/90 text-sm font-medium backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.galleryImages?.length > 0 && (
            <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white mb-6">Project Gallery</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {project.galleryImages.map((img, index) => (
                  <div key={index} className="rounded-xl border border-purple-400/20 overflow-hidden bg-black/20 hover:border-purple-400/40 transition-colors">
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23444" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
                      }}
                      onClick={() => setOpenImage(img)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-purple-400/20">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Projects
          </Link>
        </div>
      </div>

      {
        openImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setOpenImage(null)}
          >
            <div
              className="relative max-w-6xl max-h-[90vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpenImage(null)}
                className="absolute top-2 right-2 text-white/80 hover:text-white text-3xl"
              >
                ✕
              </button>

              {/* Image */}
              <img
                src={openImage}
                alt="Preview"
                className="max-h-[85vh] w-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        )
      }
    </main>
  );
}