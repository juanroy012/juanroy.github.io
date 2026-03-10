import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi'

export default function Hero({ personal }) {
  const name      = personal?.name      ?? 'Juan Roy'
  const tagline   = personal?.tagline   ?? 'Building elegant solutions to real-world problems.'
  const location  = personal?.location  ?? 'Sault Ste. Marie, ON'

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-6xl mx-auto"
    >
      {/* Top line decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="origin-left h-px w-24 bg-primary mb-10"
      />

      {/* Status */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="status-dot" />
        <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
          {personal?.availability ?? 'Open to opportunities'}
        </span>
        <span className="font-mono text-xs text-gray-600">— {location}</span>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-6"
      >
        {name.split(' ')[0]}<br />
        <span className="text-primary">{name.split(' ').slice(1).join(' ')}</span>
        <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-2 align-middle animate-blink" />
      </motion.h1>

      {/* Typing role */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="font-mono text-lg md:text-xl text-gray-400 mb-6 h-8"
      >
        <TypeAnimation
          sequence={[
            '$ Backend Developer',    2000,
            '$ Full-Stack Engineer',  2000,
            '$ Java + Spring',        1500,
            '$ Python + FastAPI',     1500,
            '$ React + Vite',         1500,
            '$ Docker + Fly.io',      1500,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed mb-10"
      >
        {tagline}
      </motion.p>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="flex flex-wrap items-center gap-4 mb-14"
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

        {/* Social links inline */}
        <div className="flex items-center gap-3 ml-2">
          {[
            { icon: FiGithub,   href: personal?.github,   label: 'GitHub' },
            { icon: FiLinkedin, href: personal?.linkedin,  label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href ?? '#'}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-9 h-9 border border-border flex items-center justify-center
                         text-gray-500 hover:text-primary hover:border-primary transition-all duration-200"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Bottom code snippet decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="font-mono text-xs text-gray-700 space-y-1 select-none"
      >
        <p><span className="text-primary">const</span> dev = &#123;</p>
        <p className="pl-4"><span className="text-gray-500">name:</span> <span className="text-accent">"{name}"</span>,</p>
        <p className="pl-4"><span className="text-gray-500">stack:</span> <span className="text-accent">["Java", "Python", "React", "SQL"]</span>,</p>
        <p className="pl-4"><span className="text-gray-500">available:</span> <span className="text-primary">true</span></p>
        <p>&#125;</p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 right-6 flex flex-col items-center gap-2 text-gray-600"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <FiArrowDown size={14} />
        </motion.div>
        <span
          className="font-mono text-[10px] tracking-widest uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          scroll
        </span>
      </motion.div>
    </section>
  )
}
