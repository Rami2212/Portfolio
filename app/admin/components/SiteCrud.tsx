"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/adminClient";

type Site = {
  _id: string;
  item: string;
  value: boolean;
};

export default function SitesCrud() {
  const [items, setItems] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form
  const [item, setItem] = useState("");
  const [value, setValue] = useState(false);
  // edit
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res: any = await apiFetch("/api/sites", { method: "GET", auth: true });
      setItems(res?.sites || []);
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
    setItem("");
    setValue(false);
    setEditingId(null);
  }

  async function submit() {
    setError(null);
    try {
      if (!item.trim()) throw new Error("Item required");

      if (!editingId) {
        await apiFetch("/api/sites", {
          method: "POST",
          auth: true,
          body: { item, value },
        });
      } else {
        await apiFetch(`/api/sites/${editingId}`, {
          method: "PATCH",
          auth: true,
          body: { item, value },
        });
      }
      resetForm();
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  function startEdit(s: Site) {
    setEditingId(s._id);
    setItem(s.item);
    setValue(s.value);
  }

  async function remove(id: string) {
    if (!confirm("Delete this site?")) return;
    setError(null);
    try {
      await apiFetch(`/api/sites/${id}`, { method: "DELETE", auth: true });
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  function handleItemChange(value: string) {
    setItem(value);
  }

  return (
    <section className="card-crt p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-3xl text-green-200">SITES</h2>
        <button className="btn-crt" onClick={load}>REFRESH</button>
      </div>

      <hr className="hr-crt" />

      <div className="grid md:grid-cols-2 gap-4">
        {/* Form */}
        <div className="card-crt p-4 space-y-3">
          <div className="text-green-300/70">EDITOR</div>

          <div>
            <label className="block mb-1 text-green-200/90">ITEM</label>
            <input 
              className="input-crt" 
              value={item} 
              onChange={(e) => handleItemChange(e.target.value)}
              placeholder="e.g., typescript, react, python"
            />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">VALUE</label>
            <input
              className="input-crt"
              type="number"
              value={value ? 1 : 0}
              onChange={(e) => setValue(Boolean(Number(e.target.value)))}
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
            <div className="text-green-300/70">NO ITEMS</div>
          ) : (
            <div className="space-y-2">
              {items.map((s) => (
                <div key={s._id} className="rounded border border-green-400/20 bg-black/20 p-3 flex gap-3 items-center justify-between">
                  <div className="min-w-0">
                    <div className="text-green-200 text-2xl truncate">{s.item}</div>
                    <div className="text-green-300/70">{s.value ? "TRUE" : "FALSE"}</div>
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