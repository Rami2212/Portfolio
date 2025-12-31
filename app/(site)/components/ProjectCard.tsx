"use client";

import Link from "next/link";

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

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col h-full min-h-[500px] rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Image */}
      {project.coverImage ? (
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {project.isFeatured && (
            <span className="absolute top-4 right-4 text-xs rounded-full border border-purple-400/30 bg-purple-500/20 backdrop-blur-md px-3 py-1.5 text-purple-200 font-medium">
              ⭐ Featured
            </span>
          )}
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative">
          {project.isFeatured && (
            <span className="absolute top-4 right-4 text-xs rounded-full border border-purple-400/30 bg-purple-500/20 backdrop-blur-md px-3 py-1.5 text-purple-200 font-medium">
              ⭐ Featured
            </span>
          )}
        </div>
      )}


      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-purple-200 font-medium whitespace-nowrap">
            {LABELS[project.category]}
          </span>
        </div>


        <p className="text-white/70 leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>


        {project.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-xs rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-white/60"
              >
                {t}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-xs rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-white/60">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>
        )}


        {/* Button pinned to bottom */}
        <div className="mt-auto pt-6">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/30 text-white px-6 py-2.5 font-medium hover:from-purple-500/20 hover:to-blue-500/20 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm group-hover:shadow-lg"
          >
            View Details
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
