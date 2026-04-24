"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Certification = {
  _id: string;
  name: string;
  organization: string;
  organizationUrl: string;
  issuedDate: string;
  credentialUrl?: string;
  order: number;
};

function toMonthYear(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);

      const res = await fetch("/api/certifications", { cache: "no-store" });

      if (!res.ok) {
        console.error("Failed to load certifications");
        setCertifications([]);
        return;
      }

      const text = await res.text();
      if (!text) {
        setCertifications([]);
        return;
      }

      const json = JSON.parse(text);
      setCertifications(json.certifications || []);
    } catch (err) {
      console.error("Certifications fetch error:", err);
      setCertifications([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
      id="certifications"
      title="Certifications"
      subtitle="Industry-recognized credentials validating practical expertise and delivery quality."
      variant="light"
    >
      <Reveal>
        <div className="flex flex-wrap gap-3 mb-8 justify-end items-center">
          {certifications.length > 3 && !loading && (
            <div className="flex items-center gap-4">
              <button className="cert-prev group rounded-xl px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:scale-105 transition">
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="certifications-pagination flex gap-2"></div>

              <button className="cert-next group rounded-xl px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:scale-105 transition">
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-white/60 text-center py-12">Loading…</div>
        ) : certifications.length === 0 ? (
          <div className="text-white/60 text-center py-12">No certifications added yet.</div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            loop={certifications.length > 3}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{
              el: ".certifications-pagination",
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-blue-400",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-blue-600",
            }}
            navigation={{ prevEl: ".cert-prev", nextEl: ".cert-next" }}
            className="pb-8"
          >
            {certifications.map((item) => (
              <SwiperSlide key={item._id} className="h-auto">
                <article className="h-full rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm p-6 shadow-xl shadow-purple-500/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.organizationUrl}
                      alt={item.organization}
                      loading="lazy"
                      className="h-12 w-12 object-contain shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold text-white truncate">{item.name}</h3>
                      <p className="text-purple-200/90 truncate">{item.organization}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                    <span className="inline-flex items-center rounded-full border border-blue-300/30 bg-blue-500/10 px-3 py-1 text-blue-100">
                      Issued {toMonthYear(item.issuedDate)}
                    </span>

                    {item.credentialUrl ? (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-purple-300/40 bg-purple-500/10 px-3 py-1.5 text-purple-100 hover:bg-purple-500/20 transition"
                      >
                        View
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-white/60">
                        No Credential Link
                      </span>
                    )}
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Reveal>
    </Section>
  );
}
