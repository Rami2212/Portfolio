"use client";


import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { clearToken, getToken } from "@/lib/adminClient";
import SkillsCrud from "./components/SkillsCrud";
import ProjectsCrud from "./components/ProjectsCrud";
import ReviewsModeration from "./components/ReviewsModeration";
import ContactsCrud from "./components/ContactsCrud";
import SitesCrud from "./components/SiteCrud";

type TabKey = "skills" | "projects" | "reviews" | "contacts" | "sites";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("skills");

  useEffect(() => {
    const token = getToken();
    if (!token) router.replace("/admin/login");
  }, [router]);

  const tabs = useMemo(
    () => [
      { key: "skills" as const, label: "SKILLS" },
      { key: "projects" as const, label: "PROJECTS" },
      { key: "reviews" as const, label: "REVIEWS" },
      { key: "contacts" as const, label: "CONTACTS" },
      { key: "sites" as const, label: "SITE SETTINGS" },
    ],
    []
  );

  function logout() {
    clearToken();
    router.replace("/admin/login");
  }

  return (
    <main className="p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        <header className="card-crt p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <a href="/" className="text-green-300/70 hover:text-green-300 transition-colors">
              &larr; Back to Portfolio
            </a>
            <h1 className="text-4xl text-green-200">PORTFOLIO ADMIN</h1>
            <div className="text-green-300/60">
              VERSION 1.2.0
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn-crt btn-amber" onClick={logout}>
              LOGOUT
            </button>
          </div>
        </header>

        <nav className="card-crt p-3 flex gap-2 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`btn-crt ${
                tab === t.key ? "bg-black/70 border-green-300/60" : ""
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tab === "skills" && <SkillsCrud />}
        {tab === "projects" && <ProjectsCrud />}
        {tab === "reviews" && <ReviewsModeration />}
        {tab === "contacts" && <ContactsCrud />}
        {tab === "sites" && <SitesCrud />}
      </div>
    </main>
  );
}


