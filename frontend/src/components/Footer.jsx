import { FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer({ personal }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <span className="font-mono text-sm text-gray-600">
          <span className="text-primary">/</span>
          {personal?.name?.toLowerCase().replace(' ', '-') ?? 'portfolio'}
        </span>

        {/* Copy */}
        <p className="font-mono text-xs text-gray-700">
          © {year} {personal?.name ?? 'Juan Roy'} — built with React + FastAPI
        </p>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {[
            { icon: FiGithub, href: personal?.github, label: 'GitHub' },
            { icon: FiLinkedin, href: personal?.linkedin, label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href ?? '#'}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-8 h-8 border border-border flex items-center justify-center
                         text-gray-600 hover:border-primary hover:text-primary transition-all"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
