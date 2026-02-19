import { FiMapPin, FiMail, FiBriefcase, FiBook } from 'react-icons/fi'
import SectionWrapper, { SectionLabel, SectionTitle, SectionDivider } from './SectionWrapper'

export default function About({ personal, education, experience }) {
  return (
    <SectionWrapper id="about">
      <SectionLabel>Get to know me</SectionLabel>
      <SectionTitle>About Me</SectionTitle>
      <SectionDivider />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">{personal?.bio}</p>

          <div className="flex flex-wrap gap-4">
            {personal?.location && (
              <span className="flex items-center gap-2 text-muted text-sm">
                <FiMapPin className="text-accent" /> {personal.location}
              </span>
            )}
            {personal?.email && (
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-muted text-sm hover:text-accent transition-colors"
              >
                <FiMail className="text-accent" /> {personal.email}
              </a>
            )}
          </div>

          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
            <span className="glow-dot" />
            <span className="text-accent text-sm font-medium">{personal?.availability}</span>
          </div>
        </div>

        {/* Education & Experience cards */}
        <div className="space-y-4">
          {education?.map((edu, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <FiBook className="text-primary text-sm" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{edu.degree}</h3>
                  <p className="text-muted text-sm mt-0.5">{edu.school}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs font-mono text-accent">{edu.period}</span>
                    {edu.gpa && (
                      <span className="text-xs text-muted">GPA: {edu.gpa}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {experience?.map((exp, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <FiBriefcase className="text-accent text-sm" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{exp.role}</h3>
                  <p className="text-muted text-sm mt-0.5">{exp.company}</p>
                  <span className="text-xs font-mono text-accent">{exp.period}</span>
                  {exp.description && (
                    <p className="text-slate-400 text-sm mt-2">{exp.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
