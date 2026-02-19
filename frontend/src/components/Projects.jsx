import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiGlobe, FiStar } from 'react-icons/fi'
import SectionWrapper, { SectionLabel, SectionTitle, SectionDivider } from './SectionWrapper'

const STATUS_COLORS = {
  Live:        'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Archived:    'bg-muted/10 text-muted    border-muted/30',
}

function ProjectCard({ project, index }) {
  const statusClass = STATUS_COLORS[project.status] ?? STATUS_COLORS['Archived']

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass-card p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {project.featured && (
            <FiStar className="text-amber-400 text-sm shrink-0" />
          )}
          <h3 className="font-bold text-white text-lg leading-snug">{project.name}</h3>
        </div>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${statusClass}`}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed flex-1">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech?.map((t) => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
      </div>

      {/* Subdomain + Links */}
      <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
        {/* Subdomain link */}
        <a
          href={`https://${project.subdomain}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-mono text-accent hover:underline truncate"
        >
          <FiGlobe size={12} />
          {project.subdomain}
        </a>

        <div className="flex items-center gap-3 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Source code"
              className="text-muted hover:text-white transition-colors"
            >
              <FiGithub size={16} />
            </a>
          )}
          {project.subdomain && (
            <a
              href={`https://${project.subdomain}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Live demo"
              className="text-muted hover:text-accent transition-colors"
            >
              <FiExternalLink size={16} />
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
  const filtered =
    filter === 'All' ? projects ?? [] : (projects ?? []).filter((p) => p.status === filter)

  return (
    <SectionWrapper id="projects">
      <SectionLabel>What I&apos;ve built</SectionLabel>
      <SectionTitle>Projects</SectionTitle>
      <SectionDivider />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
              ${filter === s
                ? 'bg-primary border-primary text-white'
                : 'border-border text-muted hover:border-primary/50 hover:text-slate-300'
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
