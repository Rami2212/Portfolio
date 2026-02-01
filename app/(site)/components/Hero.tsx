import AvatarWrapper from "./models/AvatarWrapper";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative px-6 pt-32 pb-24 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/3 h-[800px] w-[800px] rounded-full bg-purple-500/20 blur-[150px] animate-pulse"
          style={{ animationDuration: '8s' }} />
        <div className="absolute left-1/4 bottom-1/3 h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[150px] animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>


      <div className="relative mx-auto max-w-7xl w-full">
        <Reveal>
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-5 py-2.5 text-sm text-white/90 backdrop-blur-xl shadow-lg shadow-purple-500/10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Available for projects
              </div>


              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    Ramitha
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-white bg-clip-text text-transparent">
                    Iddamalgoda
                  </span>
                </h1>
              </div>


              <div className="space-y-4 w-full max-w-xl">
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-purple-500/10 border border-purple-400/20 text-purple-200 text-sm font-medium backdrop-blur-xl">
                    Software Engineer
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-500/10 border border-blue-400/20 text-blue-200 text-sm font-medium backdrop-blur-xl">
                    DevOps
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/10 border border-purple-400/20 text-white text-sm font-medium backdrop-blur-xl">
                    AI/ML
                  </span>
                </div>

                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                  Building fast, reliable systems with clean and modern user experiences that push the boundaries of what's possible.
                </p>
              </div>


              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 lg:pt-4 w-full sm:w-auto justify-center lg:justify-start">
                <a
                  className="group relative rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-white font-semibold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden text-center"
                  href="/cv/se.pdf"
                  download
                >
                  <span className="relative z-10">Download SE CV</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>


                <a
                  className="rounded-xl border border-purple-400/30 bg-white/5 px-8 py-4 font-semibold text-white hover:bg-white/10 hover:border-purple-400/50 hover:scale-[1.02] transition-all duration-300 backdrop-blur-xl shadow-lg text-center"
                  href="/cv/devops.pdf"
                  download
                >
                  DevOps CV
                </a>

                {/* 
                <a
                  className="rounded-xl border border-blue-400/30 bg-white/5 px-8 py-4 font-semibold text-white hover:bg-white/10 hover:border-blue-400/50 hover:scale-[1.02] transition-all duration-300 backdrop-blur-xl shadow-lg text-center"
                  href="/cv/aiml.pdf"
                  download
                >
                  AI/ML CV
                </a> */}
              </div>


              <div className="flex items-center gap-3 pt-4 lg:pt-6 text-sm text-white/50">
                <span>Scroll to explore</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>


            {/* Avatar */}
            <div className="relative flex justify-center h-[450px] sm:h-[550px] lg:h-[700px] xl:h-[800px] lg:justify-end -mx-6 sm:mx-0">
              <AvatarWrapper />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
