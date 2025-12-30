import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";


export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">


      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Reviews />
        <Contact />


        <footer className="py-10 text-center text-white/50">
          © {new Date().getFullYear()} • Built by Ramitha Iddamalgoda
        </footer>
      </div>
    </main>
  );
}
