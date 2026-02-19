import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiCode } from 'react-icons/fi'

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar({ personal }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-dark/80 backdrop-blur-xl border-b border-border' : ''
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FiCode className="text-white text-sm" />
            </div>
            <span className="font-bold text-white font-mono text-sm tracking-tight group-hover:text-accent transition-colors">
              {personal?.name?.split(' ')[0] ?? 'Portfolio'}
              <span className="text-accent">.</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className="text-sm text-muted hover:text-white transition-colors duration-200 font-medium tracking-wide"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={personal?.resume ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-sm py-2 px-5"
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-72 bg-surface/95 backdrop-blur-xl border-l border-border flex flex-col p-8 gap-8"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-muted hover:text-white"
            >
              <FiX size={24} />
            </button>
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-xl font-semibold text-slate-300 hover:text-accent transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
            <a
              href={personal?.resume ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-sm justify-center"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
