import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMapPin, FiMail, FiBook } from 'react-icons/fi'
import SectionWrapper, { SectionLabel, SectionTitle, SectionDivider } from './SectionWrapper'

function TimelineCard({ icon: Icon, title, subtitle, period, meta, delay }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="card card-corner p-5 flex items-start gap-4"
    >
      <div className="mt-0.5 w-8 h-8 border border-border flex items-center justify-center shrink-0 text-primary">
        <Icon size={14} />
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm">{title}</h3>
        <p className="text-gray-500 text-xs mt-0.5 font-mono">{subtitle}</p>
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <span className="font-mono text-xs text-primary">{period}</span>
          {meta && <span className="font-mono text-xs text-gray-600">{meta}</span>}
        </div>
      </div>
    </motion.div>
  )
}

export default function About({ personal, education }) {
  return (
    <SectionWrapper id="about" className="border-t border-border">
      <SectionLabel>Get to know me</SectionLabel>
      <SectionTitle>About Me</SectionTitle>
      <SectionDivider />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <div className="space-y-6">
          <p className="text-gray-400 text-base leading-relaxed">{personal?.bio}</p>

          <div className="flex flex-col gap-3">
            {personal?.location && (
              <span className="flex items-center gap-2 text-gray-600 text-sm font-mono">
                <FiMapPin className="text-primary" size={12} /> {personal.location}
              </span>
            )}
            {personal?.email && (
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-gray-600 text-sm font-mono hover:text-primary transition-colors"
              >
                <FiMail className="text-primary" size={12} /> {personal.email}
              </a>
            )}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/5">
            <span className="status-dot" />
            <span className="text-primary text-xs font-mono">{personal?.availability}</span>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            {[
              { value: '4.0', label: 'GPA' },
              { value: '3+',  label: 'Projects' },
              { value: '2026', label: 'Graduating' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-primary font-mono">{value}</p>
                <p className="text-xs text-gray-600 font-mono tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {education?.map((edu, i) => (
            <TimelineCard
              key={i}
              icon={FiBook}
              title={edu.degree}
              subtitle={edu.school}
              period={edu.period}
              meta={edu.gpa ? `GPA ${edu.gpa}` : undefined}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
