"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/adminClient";

type Certification = {
  _id: string;
  name: string;
  organization: string;
  organizationUrl: string;
  issuedDate: string;
  credentialUrl?: string;
  order: number;
};

type CertificationsResponse = {
  certifications?: Certification[];
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

function generateOrganizationLogoUrl(organization: string): string {
  if (!organization.trim()) return "";
  const encodedDomain = `${organization.toLowerCase().trim().replace(/\s+/g, "")}.com`;
  return `https://img.logo.dev/${encodedDomain}?token=pk_X4zAdAXtQVGczC7dYQmUeQ`;
}

function toMonthYear(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const parts = value.split("-");
    if (parts.length >= 2) return `${parts[0]}-${parts[1]}`;
    return value;
  }
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function normalizeToMonthValue(value: string) {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length >= 2) return `${parts[0]}-${parts[1]}`;
  return value;
}

export default function CertificationsCrud() {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [organizationUrl, setOrganizationUrl] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [manualOrganizationUrlEdit, setManualOrganizationUrlEdit] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!manualOrganizationUrlEdit && organization && !editingId) {
      setOrganizationUrl(generateOrganizationLogoUrl(organization));
    }
  }, [organization, manualOrganizationUrlEdit, editingId]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<CertificationsResponse>("/api/certifications");
      setItems(res?.certifications || []);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setName("");
    setOrganization("");
    setOrganizationUrl("");
    setIssuedDate("");
    setCredentialUrl("");
    setOrder(0);
    setEditingId(null);
    setManualOrganizationUrlEdit(false);
  }

  async function submit() {
    setError(null);
    try {
      if (!name.trim()) throw new Error("Name required");
      if (!organization.trim()) throw new Error("Organization required");
      if (!organizationUrl.trim()) throw new Error("Organization URL required");
      if (!issuedDate.trim()) throw new Error("Issued date required");

      const payload = {
        name,
        organization,
        organizationUrl,
        issuedDate,
        credentialUrl: credentialUrl.trim(),
        order,
      };

      if (!editingId) {
        await apiFetch("/api/certifications", {
          method: "POST",
          auth: true,
          body: payload,
        });
      } else {
        await apiFetch(`/api/certifications/${editingId}`, {
          method: "PATCH",
          auth: true,
          body: payload,
        });
      }

      resetForm();
      await load();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  }

  function startEdit(item: Certification) {
    setEditingId(item._id);
    setName(item.name);
    setOrganization(item.organization);
    setOrganizationUrl(item.organizationUrl);
    setIssuedDate(normalizeToMonthValue(item.issuedDate));
    setCredentialUrl(item.credentialUrl || "");
    setOrder(item.order || 0);
    setManualOrganizationUrlEdit(true);
  }

  async function remove(id: string) {
    if (!confirm("Delete this certification?")) return;
    setError(null);
    try {
      await apiFetch(`/api/certifications/${id}`, { method: "DELETE", auth: true });
      await load();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  }

  function handleOrganizationChange(value: string) {
    setOrganization(value);
    if (!editingId) {
      setManualOrganizationUrlEdit(false);
    }
  }

  function handleOrganizationUrlChange(value: string) {
    setOrganizationUrl(value);
    setManualOrganizationUrlEdit(true);
  }

  function regenerateOrganizationUrl() {
    setOrganizationUrl(generateOrganizationLogoUrl(organization));
    setManualOrganizationUrlEdit(false);
  }

  return (
    <section className="card-crt p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-3xl text-green-200">CERTIFICATIONS</h2>
        <button className="btn-crt" onClick={load}>REFRESH</button>
      </div>

      <hr className="hr-crt" />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-crt p-4 space-y-3">
          <div className="text-green-300/70">EDITOR</div>

          <div>
            <label className="block mb-1 text-green-200/90">NAME</label>
            <input
              className="input-crt"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., AWS Certified Cloud Practitioner"
            />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">ORGANIZATION</label>
            <input
              className="input-crt"
              value={organization}
              onChange={(e) => handleOrganizationChange(e.target.value)}
              placeholder="e.g., Amazon Web Services"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-green-200/90">ORGANIZATION URL (logo)</label>
              {organization && (
                <button
                  type="button"
                  onClick={regenerateOrganizationUrl}
                  className="text-xs px-2 py-1 bg-blue-500/20 border border-blue-400/50 text-blue-300 rounded hover:bg-blue-500/30 transition-colors"
                >
                  ↻ REGENERATE
                </button>
              )}
            </div>
            <input
              className="input-crt text-sm"
              value={organizationUrl}
              onChange={(e) => handleOrganizationUrlChange(e.target.value)}
              placeholder="Auto-fills from organization..."
            />
            {organizationUrl && (
              <div className="mt-2 flex items-center gap-2 p-2 bg-black/40 rounded border border-green-400/20">
                <img
                  src={organizationUrl}
                  alt="Organization logo preview"
                  className="w-8 h-8 rounded bg-white/90 p-1 object-contain"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <span className="text-green-300/60 text-xs truncate">{organizationUrl}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">ISSUED DATE</label>
            <input
              type="month"
              className="input-crt"
              value={issuedDate}
              onChange={(e) => setIssuedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-green-200/90">CREDENTIAL URL (OPTIONAL)</label>
            <input
              className="input-crt"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
              placeholder="https://www.credly.com/badges/..."
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

        <div className="card-crt p-4">
          <div className="text-green-300/70 mb-3">LIST</div>

          {loading ? (
            <div className="text-green-300/70">LOADING...</div>
          ) : items.length === 0 ? (
            <div className="text-green-300/70">NO CERTIFICATIONS</div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="rounded border border-green-400/20 bg-black/20 p-3 flex gap-3 items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="text-green-200 text-xl truncate">{item.name}</div>
                    <div className="text-green-300/60 truncate">
                      {item.organization} • issued {toMonthYear(item.issuedDate)} • order {item.order ?? 0}
                    </div>
                    {item.credentialUrl ? (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-300/80 hover:text-green-200 truncate block"
                      >
                        {item.credentialUrl}
                      </a>
                    ) : (
                      <div className="text-green-300/50 truncate">No credential URL</div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="btn-crt" onClick={() => startEdit(item)}>EDIT</button>
                    <button className="btn-crt btn-amber" onClick={() => remove(item._id)}>DEL</button>
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
