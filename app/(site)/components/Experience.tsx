import Section from "./Section";
import Reveal from "./Reveal";

const EXPERIENCE = [
  {
    role: "Software Engineer Intern",
    company: "Sysco Labs Pvt Ltd",
    duration: "2025 — 2026",
    points: [
      "Maintained full-stack applications using java, node technologies",
      "Worked on AWS cloud services for deployment and monitoring",
      "Implemented CI/CD pipelines and automated deployment processes"
    ],
  },
];

const EDUCATION = [
  {
    degree: "BSc (Hons) Software Engineering",
    institution: "University of Kelaniya",
    duration: "2023 — 2027",
    points: [
      "Specialized in Software Engineering and Systems Development",
      "Relevant coursework: Data Structures, Algorithms, Database, Web Technologies",
      "Active participant in tech communities and hackathons"
    ],
  },
];


export default function ExperienceEducation() {
  return (
    <Section
      id="experience"
      title="Experience & Education"
      subtitle="My professional journey and academic background"
      variant="dark"
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Experience Column */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></span>
              Work Experience
            </h3>
           
            <div className="relative space-y-6 before:absolute before:left-[11px] before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500/50 before:to-blue-500/50">
              {EXPERIENCE.map((exp, index) => (
                <div key={exp.role + exp.company} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-4 border-black shadow-lg shadow-purple-500/30"></div>
                 
                  {/* Content card */}
                  <div className="rounded-xl border border-purple-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                        <p className="text-purple-300 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-white/60 whitespace-nowrap">{exp.duration}</span>
                    </div>


                    <ul className="space-y-2 text-sm text-white/70">
                      {exp.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              Education
            </h3>
           
            <div className="relative space-y-6 before:absolute before:left-[11px] before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500/50 before:to-purple-500/50">
              {EDUCATION.map((edu, index) => (
                <div key={edu.degree + edu.institution} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-black shadow-lg shadow-blue-500/30"></div>
                 
                  {/* Content card */}
                  <div className="rounded-xl border border-blue-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                        <p className="text-blue-300 font-medium">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-white/60 whitespace-nowrap">{edu.duration}</span>
                    </div>


                    <ul className="space-y-2 text-sm text-white/70">
                      {edu.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
