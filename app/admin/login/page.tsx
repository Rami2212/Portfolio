"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, setToken } from "@/lib/adminClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await apiFetch<{ token: string }>("/api/auth/login", {
        method: "POST",
        body: ({ email, password }),
      });
      setToken(res.token);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card-crt w-full max-w-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-green-200">ADMIN TERMINAL</h1>
          <span className="text-green-300/70">v1.2.0</span>
        </div>

        <hr className="hr-crt my-4" />

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-green-200/90 mb-1">EMAIL</label>
            <input
              className="input-crt"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-green-200/90 mb-1">PASSWORD</label>
            <input
              className="input-crt"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-orange-200 border border-orange-300/30 bg-black/40 rounded p-3">
              ERROR: {error}
            </div>
          )}

          <button className="btn-crt w-full" disabled={busy}>
            {busy ? "AUTHENTICATING..." : "LOGIN"}
          </button>

        </form>
      </div>
    </main>
  );
}
