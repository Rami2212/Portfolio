"use client";


import { useState } from "react";


type Props = {
  onClose: () => void;
  onSuccess?: () => void;
};


export default function ReviewPopup({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);


    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, position, company, text }),
    });


    const json = await res.json().catch(() => ({}));


    if (!res.ok) {
      setStatus(json?.error || "Failed to submit");
      setLoading(false);
      return;
    }


    setStatus("success");
    setName("");
    setPosition("");
    setCompany("");
    setText("");
    setLoading(false);
   
    // Call onSuccess callback to refresh reviews
    if (onSuccess) {
      onSuccess();
    }
   
    // Auto close after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  }


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-purple-400/20 bg-gradient-to-br from-black/90 to-black/70 p-8 shadow-2xl shadow-purple-500/20 backdrop-blur-xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
       
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Share Your Experience
            </h3>
            <p className="text-white/60 text-sm mt-1">
              Your feedback helps me improve and grow
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-white transition-all duration-200 group"
            aria-label="Close"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Your Name <span className="text-red-400">*</span>
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Position
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all"
                placeholder="Developer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Company
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all"
                placeholder="Company Inc"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Your Review <span className="text-red-400">*</span>
            </label>
            <textarea
              className="w-full min-h-[140px] rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all resize-none"
              placeholder="Share your experience working with me..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <div className="text-xs text-white/40 mt-1 text-right">
              {text.length} / 500 characters
            </div>
          </div>


          {status && (
            <div className={`rounded-xl border px-4 py-3 text-sm animate-slideDown ${
              status === "success"
                ? "border-green-400/20 bg-green-500/10 text-green-300"
                : "border-red-400/20 bg-red-500/10 text-red-300"
            }`}>
              {status === "success" ? (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you! Your review will appear after approval.
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {status}
                </div>
              )}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3.5 font-semibold text-white shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Submit Review
              </span>
            )}
          </button>


          <p className="text-center text-xs text-white/40 mt-4">
            <svg className="inline w-4 h-4 mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Reviews are moderated and will appear after admin approval
          </p>
        </form>
      </div>


      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
