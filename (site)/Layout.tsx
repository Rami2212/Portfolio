import "../globals.css";
import GradientBackground from "./components/GradientBackground";
import StarfieldBackground from "./components/StarfieldBackground";


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Animated backgrounds for entire site */}
        <GradientBackground />
        <StarfieldBackground />
       
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
  );
}
