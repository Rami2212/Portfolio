import Section from "./Section";
import Reveal from "./Reveal";
import Badge from "./Badge";

export default function About() {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Impact-focused engineering with a love for clean systems and measurable outcomes."
      variant="light"
    >
      <Reveal>
        <div className="space-y-4 mx-auto max-w-7xl w-full">
          {/* Photo + Bio */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile photo */}
            <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm overflow-hidden">
              <div className="aspect-square relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <img
                  src="YOUR_IMAGE_URL_HERE"
                  alt="Ramitha Iddamalgoda"
                  className="w-full h-full object-cover"
                />
              </div>
             
              <div className="mt-4 text-center">
                <h4 className="text-xl font-semibold text-white">Ramitha Iddamalgoda</h4>
                <p className="text-sm text-white/60 mt-1">Full-Stack Engineer</p>
              </div>
            </div>


            {/* Main bio */}
            <div className="lg:col-span-2 rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Building Tomorrow's Solutions Today
              </h3>
             
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  I'm a passionate <span className="text-purple-300 font-medium">Software Engineer</span>, <span className="text-blue-300 font-medium">DevOps practitioner</span>, and <span className="text-purple-200 font-medium">AI/ML enthusiast</span> who loves building products end-to-end—from intuitive UIs and robust APIs to seamless deployments and comprehensive monitoring.
                </p>
               
                <p>
                  I thrive on creating systems that are not only performant and reliable but also feel simple and elegant to use. Whether it's architecting scalable cloud infrastructure, optimizing CI/CD pipelines, or implementing machine learning solutions, I focus on delivering measurable impact.
                </p>


                <p>
                  My approach combines clean architecture principles with pragmatic delivery, always keeping the end user and business goals in mind.
                </p>
              </div>
            </div>
          </div>


          {/* Core Expertise + Current Focus */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Core Expertise */}
            <div className="lg:col-span-2 rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-4">Core Expertise</h4>
             
              <div className="space-y-4">
                {/* Primary skills */}
                <div>
                  <div className="text-sm text-white/50 mb-2">Primary Skills</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Java</Badge>
                    <Badge variant="primary">Spring Boot</Badge>
                    <Badge variant="primary">Node.js</Badge>
                    <Badge variant="primary">React</Badge>
                    <Badge variant="primary">TypeScript</Badge>
                  </div>
                </div>


                {/* Cloud & DevOps */}
                <div>
                  <div className="text-sm text-white/50 mb-2">Cloud & DevOps</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">AWS</Badge>
                    <Badge variant="secondary">Docker</Badge>
                    <Badge variant="secondary">Kubernetes</Badge>
                    <Badge variant="secondary">CI/CD</Badge>
                    <Badge variant="secondary">Terraform</Badge>
                    <Badge variant="secondary">Jenkins</Badge>
                  </div>
                </div>


                {/* AI/ML & Data */}
                <div>
                  <div className="text-sm text-white/50 mb-2">AI/ML & Data</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="tertiary">Python</Badge>
                    <Badge variant="tertiary">TensorFlow</Badge>
                    <Badge variant="tertiary">PyTorch</Badge>
                    <Badge variant="tertiary">scikit-learn</Badge>
                    <Badge variant="tertiary">PostgreSQL</Badge>
                    <Badge variant="tertiary">MongoDB</Badge>
                  </div>
                </div>
              </div>
            </div>


            {/* Current Focus & Strengths */}
            <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm">
              <div className="text-white/60 text-sm mb-3">Current Focus</div>
              <div className="text-white/90 text-base leading-relaxed">
                Shipping reliable full-stack applications with automation and AI integration.
              </div>


              <div className="mt-6 text-white/60 text-sm mb-3">Core Strengths</div>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">✦</span>
                  <span>Clear system architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">✦</span>
                  <span>Pragmatic delivery focused</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">✦</span>
                  <span>High-quality UI/UX</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">✦</span>
                  <span>Observability mindset</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}