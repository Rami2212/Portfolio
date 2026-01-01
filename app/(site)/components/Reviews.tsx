"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import ReviewPopup from "./ReviewPopup";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Review = {
  _id: string;
  name: string;
  position: string;
  company: string;
  text: string;
  approved: boolean;
};

export default function Reviews() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);

      const res = await fetch("/api/reviews", { cache: "no-store" });

      if (!res.ok) {
        console.error("Failed to load reviews");
        setItems([]);
        return;
      }

      const text = await res.text();
      if (!text) {
        setItems([]);
        return;
      }

      const json = JSON.parse(text);
      setItems(json.reviews || []);
    } catch (err) {
      console.error("Reviews fetch error:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
      id="reviews"
      title="Testimonials"
      subtitle="What people say about working with me and my projects."
    >
      <Reveal>
        {loading ? (
          <div className="text-white/60 text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500/30 border-t-purple-500"></div>
            <p className="mt-4">Loading reviews...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-12 text-center backdrop-blur-sm">
            <svg className="mx-auto h-16 w-16 text-purple-400/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-white/60 text-lg mb-2">No reviews yet</p>
            <p className="text-white/40 text-sm">Be the first to leave a review!</p>
          </div>
        ) : (
          <div className="relative">
            <Swiper
              slidesPerView={3}
              spaceBetween={24}
              loop
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-gradient-to-r !from-purple-500 !to-blue-500'
              }}
              modules={[Pagination, Autoplay]}
              className="pb-12"
            >
              {items.map((r) => (
                <SwiperSlide key={r._id}>
                  <div className="mx-auto max-w-4xl rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 md:p-12 backdrop-blur-sm">
                    {/* Quote Icon */}
                    <svg className="h-10 w-10 text-purple-400/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>


                    {/* Review Text */}
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 italic">
                      "{r.text}"
                    </p>


                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                        {r.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-lg">
                          {r.name}
                        </div>
                        <div className="text-white/60 text-sm">
                          {r.position} · {r.company}
                        </div>
                      </div>
                    </div>


                    {/* Star Rating Decoration */}
                    <div className="flex gap-1 mt-6 justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>


            {/* Navigation Hint */}
            <div className="text-center text-sm text-white/40 mt-4">
              Swipe or wait for auto-play
            </div>
          </div>
        )}


        {/* Button under slider */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="group relative rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 font-semibold text-white shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Leave a Review
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>


        {/* Popup */}
        {open && <ReviewPopup onClose={() => setOpen(false)} onSuccess={load} />}
      </Reveal>


      {/* Custom Swiper Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #a855f7, #3b82f6);
        }
      `}</style>
    </Section>
  );
}
