import Reveal from "./Reveal";


export default function Section({
  id,
  title,
  subtitle,
  children,
  variant = "light",
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-32 px-6 ${
        variant === "dark"
          ? "bg-black/20"
          : "bg-transparent"
      }`}
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-1/4 top-1/3 h-[700px] w-[700px] rounded-full bg-purple-500/20 blur-[150px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute left-1/4 bottom-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[150px] animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>


      {/* Content wrapper */}
      <div className="relative mx-auto max-w-7xl z-10">
        <Reveal>
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            {subtitle && (
              <p className="mt-3 text-lg text-white/70 leading-relaxed max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>


        {children}
      </div>
    </section>
  );
}
