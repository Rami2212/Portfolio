"use client";


import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/adminClient";


type Review = {
  _id: string;
  name: string;
  text: string;
  approved: boolean;
  createdAt?: string;
};


export default function ReviewsModeration() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  async function load() {
    setLoading(true);
    setError(null);
    try {
      // admin token -> backend returns all reviews
      const res = await apiFetch<{ reviews: Review[] }>("/api/reviews", { auth: true });
      setItems(res.reviews);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    load();
  }, []);


  async function setApproved(id: string, approved: boolean) {
    setError(null);
    try {
      await apiFetch(`/api/reviews/${id}`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ approved }),
      });
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }


  async function remove(id: string) {
    if (!confirm("Delete this review?")) return;
    setError(null);
    try {
      await apiFetch(`/api/reviews/${id}`, { method: "DELETE", auth: true });
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }


  return (
    <section className="card-crt p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-3xl text-green-200">REVIEWS</h2>
        <button className="btn-crt" onClick={load}>REFRESH</button>
      </div>


      <hr className="hr-crt" />


      {error && (
        <div className="text-orange-200 border border-orange-300/30 bg-black/40 rounded p-3">
          ERROR: {error}
        </div>
      )}


      {loading ? (
        <div className="text-green-300/70">LOADING...</div>
      ) : items.length === 0 ? (
        <div className="text-green-300/70">NO REVIEWS</div>
      ) : (
        <div className="space-y-2">
          {items.map((r) => (
            <div key={r._id} className="rounded border border-green-400/20 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-green-200 text-2xl truncate">{r.name}</div>
                  <div className="text-green-300/60">
                    status: {r.approved ? "APPROVED" : "PENDING"}
                  </div>
                  <div className="text-green-200/90 mt-2 whitespace-pre-wrap">
                    {r.text}
                  </div>
                </div>


                <div className="flex gap-2 shrink-0 flex-wrap">
                  {r.approved ? (
                    <button className="btn-crt" onClick={() => setApproved(r._id, false)}>
                      UNAPPROVE
                    </button>
                  ) : (
                    <button className="btn-crt" onClick={() => setApproved(r._id, true)}>
                      APPROVE
                    </button>
                  )}
                  <button className="btn-crt btn-amber" onClick={() => remove(r._id)}>
                    DEL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
