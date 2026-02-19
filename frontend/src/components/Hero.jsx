import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown } from 'react-icons/fi'

export default function Hero({ personal }) {
  const name = personal?.name ?? 'Your Name'
  const title = personal?.title ?? 'Computer Programming Student'
  const tagline = personal?.tagline ?? 'Building elegant solutions to real-world problems.'

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20"
    >
      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/60 backdrop-blur-sm mb-8"
      >
        <span className="glow-dot" />
        <span className="text-sm text-slate-400 font-mono">
          {personal?.availability ?? 'Open to opportunities'}
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center leading-tight tracking-tight text-white mb-4"
      >
        Hi, I&apos;m{' '}
        <span className="gradient-text">{name.split(' ')[0]}</span>
        {name.split(' ').length > 1 && (
          <>
            {' '}
            <span className="gradient-text">{name.split(' ').slice(1).join(' ')}</span>
          </>
        )}
      </motion.h1>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
        <p className="text-lg md:text-xl text-accent font-mono font-medium tracking-wide">
          {title}
        </p>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="text-slate-400 text-lg md:text-xl text-center max-w-xl leading-relaxed mb-10"
      >
        {tagline}
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-12"
      >
        <button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-primary"
        >
          View Projects
        </button>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-outline"
        >
          Get in Touch
        </button>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-5"
      >
        {[
          { icon: FiGithub, href: personal?.github, label: 'GitHub' },
          { icon: FiLinkedin, href: personal?.linkedin, label: 'LinkedIn' },
          { icon: FiTwitter, href: personal?.twitter, label: 'Twitter' },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href ?? '#'}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-xl border border-border flex items-center justify-center
                       text-muted hover:text-accent hover:border-accent transition-all duration-200"
          >
            <Icon size={18} />
          </a>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
