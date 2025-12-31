"use client";

import { useEffect, useMemo, useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { skillsData, type Skill } from "../data/skillsData";

const LABELS: Record<Skill["category"], string> = {
  se: "Software Engineering",
  devops: "DevOps",
  aiml: "AI / ML",
  other: "Other Tools",
};


export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Using local data for now
    setLoading(true);
    setSkills(skillsData);
    setLoading(false);


    // API call commented out - uncomment when ready
    /*
    (async () => {
      setLoading(true);
      const res = await fetch("/api/skills", { cache: "no-store" });
      const json = await res.json();
      setSkills(json.skills || []);
      setLoading(false);
    })();
    */
  }, []);


  const grouped = useMemo(() => {
    const g: Record<Skill["category"], Skill[]> = {
      se: [],
      devops: [],
      aiml: [],
      other: []
    };
    for (const s of skills) g[s.category]?.push(s);
    for (const k of Object.keys(g) as Skill["category"][]) {
      g[k].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    return g;
  }, [skills]);


  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Technologies and tools I work with to build exceptional solutions."
      variant="dark"
    >
      <Reveal>
        {loading ? (
          <div className="text-white/60">Loading…</div>
        ) : (
          <div className="space-y-8">
            {(["se", "devops", "aiml", "other"] as const).map((cat) => (
              <div key={cat}>
                {/* Category Title */}
                <h3 className="text-2xl font-semibold text-white mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                  {LABELS[cat]}
                </h3>


                {/* Skills */}
                <div className="flex flex-wrap gap-4">
                  {grouped[cat].length > 0 ? (
                    grouped[cat].map((s) => (
                      <div
                        key={s._id}
                        className={`flex items-center gap-3 rounded-xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] px-6 py-3 backdrop-blur-sm hover:border-purple-400/40 hover:bg-white/10 transition-all duration-300}`}
                        style={{
                          maxWidth: '300px',
                        }}
                      >
                        <img
                          src={s.iconUrl}
                          alt={s.name}
                          className="h-10 w-10 rounded object-contain"
                          loading="lazy"
                        />
                        <div className="text-white/90 font-medium">{s.name}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-white/50">No skills added yet.</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </Section>
  );
}
