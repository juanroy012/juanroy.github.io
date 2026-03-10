import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

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
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-dark/95 border-b border-border' : ''
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-sm font-bold text-white hover:text-primary transition-colors"
          >
            <span className="text-primary">/</span>
            {personal?.name?.toLowerCase().replace(' ', '-') ?? 'portfolio'}
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className="font-mono text-xs text-gray-500 hover:text-primary transition-colors tracking-widest uppercase"
                >
                  <span className="text-primary opacity-60 mr-1">{String(i + 1).padStart(2,'0')}.</span>
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
              className="btn-primary text-xs py-2 px-4"
            >
              resume.pdf
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-primary transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
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
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-y-0 right-0 z-50 w-64 bg-surface border-l border-border flex flex-col p-8 gap-8"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-gray-500 hover:text-primary transition-colors"
            >
              <FiX size={20} />
            </button>
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="font-mono text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    <span className="text-primary mr-2">{String(i + 1).padStart(2,'0')}.</span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
            <a
              href={personal?.resume ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs justify-center"
            >
              resume.pdf
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
