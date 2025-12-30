"use client";


import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/adminClient";


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


const CATEGORIES: Project["category"][] = ["se", "devops", "aiml"];


function csvToArray(v: string) {
  return v.split(",").map(s => s.trim()).filter(Boolean);
}
function arrayToCsv(v: string[]) {
  return (v || []).join(", ");
}


export default function ProjectsCrud() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [editingId, setEditingId] = useState<string | null>(null);


  // form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<Project["category"]>("se");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");


  const [tagsCsv, setTagsCsv] = useState("");
  const [techCsv, setTechCsv] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryCsv, setGalleryCsv] = useState("");


  const [liveUrl, setLiveUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [order, setOrder] = useState<number>(0);


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


  function reset() {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setCategory("se");
    setShortDescription("");
    setLongDescription("");
    setTagsCsv("");
    setTechCsv("");
    setCoverImage("");
    setGalleryCsv("");
    setLiveUrl("");
    setDemoUrl("");
    setIsFeatured(false);
    setOrder(0);
  }


  function startEdit(p: Project) {
    setEditingId(p._id);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setShortDescription(p.shortDescription);
    setLongDescription(p.longDescription || "");
    setTagsCsv(arrayToCsv(p.tags || []));
    setTechCsv(arrayToCsv(p.techStack || []));
    setCoverImage(p.coverImage || "");
    setGalleryCsv(arrayToCsv(p.galleryImages || []));
    setLiveUrl(p.liveUrl || "");
    setDemoUrl(p.demoUrl || "");
    setIsFeatured(Boolean(p.isFeatured));
    setOrder(p.order || 0);
  }


  async function submit() {
    setError(null);
    try {
      if (!title.trim()) throw new Error("Title required");
      if (!shortDescription.trim()) throw new Error("Short description required");


      const payload = {
        title,
        slug: slug || undefined,
        category,
        shortDescription,
        longDescription,
        tags: csvToArray(tagsCsv),
        techStack: csvToArray(techCsv),
        coverImage,
        galleryImages: csvToArray(galleryCsv),
        liveUrl,
        demoUrl,
        isFeatured,
        order,
      };


      if (!editingId) {
        await apiFetch("/api/projects", {
          method: "POST",
          auth: true,
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch(`/api/projects/${editingId}`, {
          method: "PATCH",
          auth: true,
          body: JSON.stringify(payload),
        });
      }


      reset();
      await load();
    } catch (e: any) {
      setError(e.message);
    }
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


      <div className="grid lg:grid-cols-2 gap-4">
        {/* Form */}
        <div className="card-crt p-4 space-y-3">
          <div className="text-green-300/70">EDITOR</div>


          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-green-200/90">TITLE</label>
              <input className="input-crt" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 text-green-200/90">SLUG (optional)</label>
              <input className="input-crt" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto from title if empty" />
            </div>
          </div>


          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-green-200/90">CATEGORY</label>
              <select className="select-crt" value={category} onChange={(e) => setCategory(e.target.value as any)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-green-200/90">ORDER</label>
              <input className="input-crt" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>


          <div>
            <label className="block mb-1 text-green-200/90">SHORT DESCRIPTION</label>
            <textarea className="input-crt min-h-[80px]" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
          </div>


          <div>
            <label className="block mb-1 text-green-200/90">LONG DESCRIPTION</label>
            <textarea className="input-crt min-h-[120px]" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} />
          </div>


          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-green-200/90">TAGS (csv)</label>
              <input className="input-crt" value={tagsCsv} onChange={(e) => setTagsCsv(e.target.value)} placeholder="nextjs, mongodb" />
            </div>
            <div>
              <label className="block mb-1 text-green-200/90">TECH STACK (csv)</label>
              <input className="input-crt" value={techCsv} onChange={(e) => setTechCsv(e.target.value)} placeholder="Next.js, Tailwind" />
            </div>
          </div>


          <div>
            <label className="block mb-1 text-green-200/90">COVER IMAGE URL</label>
            <input className="input-crt" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
          </div>


          <div>
            <label className="block mb-1 text-green-200/90">GALLERY IMAGES (csv urls)</label>
            <input className="input-crt" value={galleryCsv} onChange={(e) => setGalleryCsv(e.target.value)} placeholder="https://..., https://..." />
          </div>


          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-green-200/90">LIVE URL</label>
              <input className="input-crt" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 text-green-200/90">DEMO URL</label>
              <input className="input-crt" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} />
            </div>
          </div>


          <div className="flex items-center gap-3">
            <input
              id="featured"
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <label htmlFor="featured" className="text-green-200/90">FEATURED</label>
          </div>


          {error && (
            <div className="text-orange-200 border border-orange-300/30 bg-black/40 rounded p-3">
              ERROR: {error}
            </div>
          )}


          <div className="flex gap-2 flex-wrap">
            <button className="btn-crt" onClick={submit}>
              {editingId ? "UPDATE" : "CREATE"}
            </button>
            <button className="btn-crt btn-amber" onClick={reset}>
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
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-green-200 text-2xl truncate">{p.title}</div>
                      <div className="text-green-300/60">
                        {p.category.toUpperCase()} • slug: {p.slug} • order {p.order ?? 0} • {p.isFeatured ? "FEATURED" : "NORMAL"}
                      </div>
                      <div className="text-green-300/60 line-clamp-2">{p.shortDescription}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button className="btn-crt" onClick={() => startEdit(p)}>EDIT</button>
                      <button className="btn-crt btn-amber" onClick={() => remove(p._id)}>DEL</button>
                    </div>
                  </div>


                  {p.tags?.length > 0 && (
                    <div className="mt-2 text-green-300/70">
                      tags: {p.tags.join(", ")}
                    </div>
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
