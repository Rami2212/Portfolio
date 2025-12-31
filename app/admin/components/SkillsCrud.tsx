"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/adminClient";
import { uploadSkillImage } from "@/lib/upload";

type Skill = {
  _id: string;
  name: string;
  category: "se" | "devops" | "aiml" | "other";
  iconUrl: string;
  order: number;
};

const CATEGORIES: Skill["category"][] = ["se", "devops", "aiml", "other"];

export default function SkillsCrud() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);

  // form
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Skill["category"]>("se");
  const [iconUrl, setIconUrl] = useState("");
  const [order, setOrder] = useState<number>(0);

  // edit
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<{ skills: Skill[] }>("/api/skills");
      setItems(res.skills);
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
    setName("");
    setCategory("se");
    setIconUrl("");
    setOrder(0);
    setEditingId(null);
  }

  async function submit() {
  setError(null);

  try {
    if (!name.trim()) throw new Error("Name required");

    let finalIconUrl = iconUrl;

    if (iconFile) {
      finalIconUrl = await uploadSkillImage(iconFile, "skills");
    }

    const payload = {
      name,
      category,
      iconUrl: finalIconUrl,
      order,
    };

    if (!editingId) {
      await apiFetch("/api/skills", {
        method: "POST",
        auth: true,
        body: payload, // plain object, no JSON.stringify
      });
    } else {
      await apiFetch(`/api/skills/${editingId}`, {
        method: "PATCH",
        auth: true,
        body: payload, // plain object, no JSON.stringify
      });
    }

    resetForm();
    await load();
  } catch (e: any) {
    setError(e.message);
  }
}


  function startEdit(s: Skill) {
    setEditingId(s._id);
    setName(s.name);
    setCategory(s.category);
    setIconUrl(s.iconUrl);
    setOrder(s.order || 0);
    setIconFile(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this skill?")) return;
    setError(null);
    try {
      await apiFetch(`/api/skills/${id}`, { method: "DELETE", auth: true });
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }


  return (
    <section className="card-crt p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-3xl text-green-200">SKILLS</h2>
        <button className="btn-crt" onClick={load}>REFRESH</button>
      </div>


      <hr className="hr-crt" />


      <div className="grid md:grid-cols-2 gap-4">
        {/* Form */}
        <div className="card-crt p-4 space-y-3">
          <div className="text-green-300/70">EDITOR</div>


          <div>
            <label className="block mb-1 text-green-200/90">NAME</label>
            <input className="input-crt" value={name} onChange={(e) => setName(e.target.value)} />
          </div>


          <div>
            <label className="block mb-1 text-green-200/90">CATEGORY</label>
            <select className="select-crt" value={category} onChange={(e) => setCategory(e.target.value as any)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.toUpperCase()}</option>
              ))}
            </select>
          </div>


          <div>
            <label className="block mb-1 text-green-200/90">ICON IMAGE</label>
            <input
              type="file"
              accept="image/*"
              className="input-crt"
              onChange={(e) => setIconFile(e.target.files?.[0] || null)}
            />
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
            <div className="text-green-300/70">NO SKILLS</div>
          ) : (
            <div className="space-y-2">
              {items.map((s) => (
                <div key={s._id} className="rounded border border-green-400/20 bg-black/20 p-3 flex gap-3 items-center justify-between">
                  <div className="min-w-0">
                    <div className="text-green-200 text-2xl truncate">{s.name}</div>
                    <div className="text-green-300/60">
                      {s.category.toUpperCase()} • order {s.order ?? 0}
                    </div>
                    <div className="text-green-300/60 truncate">{s.iconUrl}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="btn-crt" onClick={() => startEdit(s)}>EDIT</button>
                    <button className="btn-crt btn-amber" onClick={() => remove(s._id)}>DEL</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
