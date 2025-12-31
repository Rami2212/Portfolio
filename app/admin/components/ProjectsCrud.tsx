"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/adminClient";
import { uploadProjectImage } from "@/lib/upload";

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
  isFeatured: boolean;
  order: number;
};

const CATEGORIES: Project["category"][] = ["se", "devops", "aiml", "other"];

export default function ProjectsCrud() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Image files
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);

  // form
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<Project["category"]>("se");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState("");
  const [techStack, setTechStack] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [order, setOrder] = useState<number>(0);

  // edit
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<{ projects: Project[] }>("/api/projects");
      setItems(res.projects);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setTitle("");
    setSlug("");
    setCategory("se");
    setShortDescription("");
    setLongDescription("");
    setTags("");
    setCoverImage("");
    setGalleryImages("");
    setTechStack("");
    setLiveUrl("");
    setDemoUrl("");
    setIsFeatured(false);
    setOrder(0);
    setEditingId(null);
    setCoverImageFile(null);
    setGalleryFiles(null);
  }

  async function submit() {
    setError(null);

    try {
      if (!title.trim()) throw new Error("Title required");
      if (!shortDescription.trim()) throw new Error("Short description required");

      let finalCoverImage = coverImage;
      let finalGalleryImages = galleryImages.split(",").map(s => s.trim()).filter(Boolean);

      // Upload cover image if file selected
      if (coverImageFile) {
        finalCoverImage = await uploadProjectImage(coverImageFile, "projects");
      }

      // Upload gallery images if files selected
      if (galleryFiles && galleryFiles.length > 0) {
        const uploadedGallery: string[] = [];
        for (let i = 0; i < galleryFiles.length; i++) {
          const url = await uploadProjectImage(galleryFiles[i], "projects");
          uploadedGallery.push(url);
        }
        finalGalleryImages = [...finalGalleryImages, ...uploadedGallery];
      }

      const payload = {
        title,
        slug: slug.trim() || undefined,
        category,
        shortDescription,
        longDescription,
        tags: tags.split(",").map(s => s.trim()).filter(Boolean),
        coverImage: finalCoverImage,
        galleryImages: finalGalleryImages,
        techStack: techStack.split(",").map(s => s.trim()).filter(Boolean),
        liveUrl,
        demoUrl,
        isFeatured,
        order,
      };

      if (!editingId) {
        await apiFetch("/api/projects", {
          method: "POST",
          auth: true,
          body: payload,
        });
      } else {
        await apiFetch(`/api/projects/${editingId}`, {
          method: "PATCH",
          auth: true,
          body: payload,
        });
      }

      resetForm();
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  function startEdit(p: Project) {
    setEditingId(p._id);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setShortDescription(p.shortDescription);
    setLongDescription(p.longDescription || "");
    setTags(p.tags.join(", "));
    setCoverImage(p.coverImage || "");
    setGalleryImages(p.galleryImages.join(", "));
    setTechStack(p.techStack.join(", "));
    setLiveUrl(p.liveUrl || "");
    setDemoUrl(p.demoUrl || "");
    setIsFeatured(p.isFeatured);
    setOrder(p.order || 0);
    setCoverImageFile(null);
    setGalleryFiles(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    setError(null);
    try {
      await apiFetch(`/api/projects/${id}`, { method: "DELETE", auth: true });
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <section className="card-crt p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-3xl text-green-200">PROJECTS</h2>
        <button className="btn-crt" onClick={load}>REFRESH</button>
      </div>

      <hr className="hr-crt" />

      <div className="grid md:grid-cols-2 gap-4">
        {/* Form */}
        <div className="card-crt p-4 space-y-3 flex flex-col">
          <div className="text-green-300/70">EDITOR</div>

          <div>
            <label className="block mb-1 text-green-200/90">TITLE *</label>
            <input className="input-crt" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">SLUG (auto if empty)</label>
            <input className="input-crt" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">CATEGORY *</label>
            <select className="select-crt" value={category} onChange={(e) => setCategory(e.target.value as any)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">SHORT DESCRIPTION *</label>
            <textarea 
              className="input-crt min-h-[80px]" 
              value={shortDescription} 
              onChange={(e) => setShortDescription(e.target.value)} 
            />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">LONG DESCRIPTION</label>
            <textarea 
              className="input-crt min-h-[120px]" 
              value={longDescription} 
              onChange={(e) => setLongDescription(e.target.value)} 
            />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">COVER IMAGE FILE</label>
            <input
              type="file"
              accept="image/*"
              className="input-crt"
              onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
            />
            {coverImage && (
              <div className="mt-2 text-green-300/60 text-sm truncate">Current: {coverImage}</div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">GALLERY IMAGES FILES (multiple)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="input-crt"
              onChange={(e) => setGalleryFiles(e.target.files)}
            />
            {galleryImages && (
              <div className="mt-2 text-green-300/60 text-sm">Current: {galleryImages.split(",").length} images</div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">TAGS (comma-separated)</label>
            <input 
              className="input-crt" 
              value={tags} 
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">TECH STACK (comma-separated)</label>
            <input 
              className="input-crt" 
              value={techStack} 
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="Next.js, MongoDB, AWS"
            />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">LIVE URL</label>
            <input 
              className="input-crt" 
              value={liveUrl} 
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">DEMO URL</label>
            <input 
              className="input-crt" 
              value={demoUrl} 
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://demo.example.com"
            />
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="featured"
              checked={isFeatured} 
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="featured" className="text-green-200/90">FEATURED</label>
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">ORDER</label>
            <input
              className="input-crt"
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>

          {error && (
            <div className="text-orange-200 border border-orange-300/30 bg-black/40 rounded p-3">
              ERROR: {error}
            </div>
          )}

          <div className="flex gap-2">
            <button className="btn-crt" onClick={submit}>
              {editingId ? "UPDATE" : "CREATE"}
            </button>
            <button className="btn-crt btn-amber" onClick={resetForm}>
              CLEAR
            </button>
          </div>
        </div>

        {/* List */}
        <div className="card-crt p-4">
          <div className="text-green-300/70 mb-3">LIST</div>

          {loading ? (
            <div className="text-green-300/70">LOADING...</div>
          ) : items.length === 0 ? (
            <div className="text-green-300/70">NO PROJECTS</div>
          ) : (
            <div className="space-y-2">
              {items.map((p) => (
                <div key={p._id} className="rounded border border-green-400/20 bg-black/20 p-3">
                  <div className="flex gap-3 items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <div className="text-green-200 text-xl truncate">{p.title}</div>
                      <div className="text-green-300/60 text-sm">
                        {p.category.toUpperCase()} • order {p.order ?? 0}
                        {p.isFeatured && " • ⭐ FEATURED"}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button className="btn-crt text-sm py-1 px-3" onClick={() => startEdit(p)}>EDIT</button>
                      <button className="btn-crt btn-amber text-sm py-1 px-3" onClick={() => remove(p._id)}>DEL</button>
                    </div>
                  </div>
                  <div className="text-green-300/60 text-sm line-clamp-2">{p.shortDescription}</div>
                  {p.coverImage && (
                    <img src={p.coverImage} alt={p.title} className="mt-2 w-full h-32 object-cover rounded" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
