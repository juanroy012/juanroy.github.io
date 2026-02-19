import { FiGithub, FiLinkedin, FiTwitter, FiCode } from 'react-icons/fi'

export default function Footer({ personal }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/20 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <FiCode className="text-white text-xs" />
          </div>
          <span className="font-bold text-white font-mono text-sm">
            {personal?.name ?? 'Portfolio'}
            <span className="text-accent">.</span>
          </span>
        </div>

        {/* Copy */}
        <p className="text-muted text-sm text-center">
          © {year} {personal?.name ?? 'Your Name'}. Built with React & FastAPI.
        </p>

        {/* Socials */}
        <div className="flex items-center gap-4">
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
              className="text-muted hover:text-accent transition-colors"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
