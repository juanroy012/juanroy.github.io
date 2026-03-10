import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiGlobe, FiStar } from 'react-icons/fi'
import SectionWrapper, { SectionLabel, SectionTitle, SectionDivider } from './SectionWrapper'

const STATUS_STYLES = {
  Live:          'text-emerald-400 border-emerald-500/40',
  'In Progress': 'text-amber-400  border-amber-500/40',
  Archived:      'text-gray-600   border-gray-700',
}

function ProjectCard({ project, index }) {
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES['Archived']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className="card card-corner p-6 flex flex-col gap-4 group"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {project.featured && (
            <FiStar className="text-amber-400 shrink-0" size={13} />
          )}
          <h3 className="font-semibold text-white text-sm leading-snug">{project.name}</h3>
        </div>
        <span className={`shrink-0 font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5 ${statusStyle}`}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{project.description}</p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech?.map((t) => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
        {project.subdomain ? (
          <a
            href={`https://${project.subdomain}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-gray-600 hover:text-primary transition-colors truncate"
          >
            <FiGlobe size={11} />
            {project.subdomain}
          </a>
        ) : <span />}

        <div className="flex items-center gap-3 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Source code"
              className="text-gray-600 hover:text-white transition-colors"
            >
              <FiGithub size={14} />
            </a>
          )}
          {project.subdomain && (
            <a
              href={`https://${project.subdomain}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Live demo"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <FiExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('All')

  const statuses = ['All', ...new Set(projects?.map((p) => p.status) ?? [])]
  const filtered = filter === 'All' ? projects ?? [] : (projects ?? []).filter((p) => p.status === filter)

  return (
    <SectionWrapper id="projects" className="border-t border-border">
      <SectionLabel>What I&apos;ve built</SectionLabel>
      <SectionTitle>Projects</SectionTitle>
      <SectionDivider />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`font-mono text-xs px-4 py-1.5 border tracking-widest uppercase transition-all duration-150
              ${filter === s
                ? 'border-primary text-primary bg-primary/5'
                : 'border-border text-gray-600 hover:border-gray-500 hover:text-gray-400'
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
