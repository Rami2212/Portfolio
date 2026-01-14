"use client";

import { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);


  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);


    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });


    const json = await res.json().catch(() => ({}));


    if (!res.ok) {
      setStatus(json?.error || "Failed");
      setBusy(false);
      return;
    }


    setName("");
    setEmail("");
    setMessage("");
    setStatus("Message sent!");
    setBusy(false);
  }


  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Let's connect and build something great together."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-2">


          {/* LEFT — CONTACT DETAILS */}
          <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Let's Connect
            </h3>
            <p className="text-white/60 mb-8">
              Feel free to reach out for collaborations, opportunities, or just to say hi!
            </p>


            <div className="space-y-6">


              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 p-3.5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-white/50 mb-0.5">Phone</div>
                  <a href="tel:+94769010389" className="text-base font-medium text-white hover:text-purple-300 transition-colors">
                    +94 76 90 10 389
                  </a>
                </div>
              </div>


              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-3.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/50 mb-0.5">Email</div>
                  <a href="mailto:ramithapathmilarp@gmail.com" className="text-base font-medium text-white hover:text-blue-300 transition-colors break-all">
                    ramithapathmilarp@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 group">
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 p-3.5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-white/50 mb-0.5">Location</div>
                  <div className="text-base font-medium text-white">
                    Colombo, Sri Lanka
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="text-sm text-white/50 mb-4">Connect with me</div>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://www.linkedin.com/in/ramitha-iddamalgoda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-purple-400/20 bg-white/5 p-4 text-white/70 hover:bg-white/10 hover:border-purple-400/40 hover:text-white transition-all duration-300 group"
                >
                  <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-xs">LinkedIn</span>
                </a>


                <a
                  href="https://github.com/Rami2212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-white/5 p-4 text-white/70 hover:bg-white/10 hover:border-blue-400/40 hover:text-white transition-all duration-300 group"
                >
                  <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span className="text-xs">GitHub</span>
                </a>


                <a
                  href="https://wa.me/94769010389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-purple-400/20 bg-white/5 p-4 text-white/70 hover:bg-white/10 hover:border-purple-400/40 hover:text-white transition-all duration-300 group"
                >
                  <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.17 1.6 5.98L0 24l6.2-1.62A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.94 0-3.84-.52-5.5-1.51l-.39-.23-3.68.96.98-3.59-.25-.41A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.73c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.15-1.23-.45-2.34-1.43-.86-.77-1.43-1.72-1.6-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.48.07-.74.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 2 3.05 4.84 4.28.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34z" />
                  </svg>
                  <span className="text-xs">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>


          {/* RIGHT — FORM */}
          <div className="rounded-2xl border border-blue-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Send a Message
            </h3>
            <p className="text-white/60 mb-8">
              Have a project in mind? Let's discuss how we can work together.
            </p>


            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm text-white/70 mb-2">Your Name</label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>


              <div>
                <label className="block text-sm text-white/70 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>


              <div>
                <label className="block text-sm text-white/70 mb-2">Message</label>
                <textarea
                  className="min-h-[140px] w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>


              {status && (
                <div className={`rounded-xl border px-4 py-3 text-sm ${status.includes("sent")
                    ? "border-green-400/20 bg-green-500/10 text-green-300"
                    : "border-red-400/20 bg-red-500/10 text-red-300"
                  }`}>
                  {status}
                </div>
              )}


              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3.5 font-semibold text-white shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {busy ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
