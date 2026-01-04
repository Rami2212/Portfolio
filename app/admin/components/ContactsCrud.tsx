"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/adminClient";

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function ContactCrud() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<{ contacts: Contact[] }>("/api/contact");
      setItems(res?.contacts || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this contact message?")) return;
    setError(null);
    try {
      await apiFetch(`/api/contact/${id}`, { method: "DELETE", auth: true });
      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <section className="card-crt p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-3xl text-green-200">CONTACT MESSAGES</h2>
        <button className="btn-crt" onClick={load}>
          REFRESH
        </button>
      </div>

      <hr className="hr-crt" />

      {error && (
        <div className="text-orange-200 border border-orange-300/30 bg-black/40 rounded p-3">
          ERROR: {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* List */}
        <div className="card-crt p-4 max-h-[600px] overflow-y-auto">
          <div className="text-green-300/70 mb-3">
            MESSAGES ({items.length})
          </div>

          {loading ? (
            <div className="text-green-300/70">LOADING...</div>
          ) : items.length === 0 ? (
            <div className="text-green-300/70">NO MESSAGES</div>
          ) : (
            <div className="space-y-2">
              {items.map((contact) => (
                <div
                  key={contact._id}
                  className={`rounded border p-3 cursor-pointer transition-colors ${
                    selectedContact?._id === contact._id
                      ? "border-green-400 bg-green-500/10"
                      : "border-green-400/20 bg-black/20 hover:border-green-400/40"
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                      <div className="text-green-200 text-lg truncate">
                        {contact.name}
                      </div>
                      <div className="text-green-300/60 text-sm truncate">
                        {contact.email}
                      </div>
                    </div>
                    <button
                      className="btn-crt btn-amber text-xs shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(contact._id);
                      }}
                    >
                      DEL
                    </button>
                  </div>
                  <div className="text-green-300/60 text-xs">
                    {formatDate(contact.createdAt)}
                  </div>
                  <div className="text-green-300/70 text-sm mt-2 line-clamp-2">
                    {contact.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail View */}
        <div className="card-crt p-4 max-h-[600px] overflow-y-auto">
          <div className="text-green-300/70 mb-3">MESSAGE DETAILS</div>

          {!selectedContact ? (
            <div className="text-green-300/70">
              SELECT A MESSAGE TO VIEW DETAILS
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-green-200/90 text-sm">
                  FROM
                </label>
                <div className="text-green-200 text-xl">{selectedContact.name}</div>
              </div>

              <div>
                <label className="block mb-1 text-green-200/90 text-sm">
                  EMAIL
                </label>
                <div className="text-green-200">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="hover:text-green-300 transition-colors"
                  >
                    {selectedContact.email}
                  </a>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-green-200/90 text-sm">
                  DATE
                </label>
                <div className="text-green-200">
                  {formatDate(selectedContact.createdAt)}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-green-200/90 text-sm">
                  MESSAGE
                </label>
                <div className="text-green-200 whitespace-pre-wrap bg-black/40 border border-green-400/20 rounded p-3">
                  {selectedContact.message}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: Your message&body=Hi ${selectedContact.name},%0D%0A%0D%0A`}
                  className="btn-crt flex-1 text-center"
                >
                  REPLY
                </a>
                <button
                  className="btn-crt btn-amber"
                  onClick={() => remove(selectedContact._id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}