import { FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi'
import SectionWrapper, { SectionLabel, SectionTitle, SectionDivider } from './SectionWrapper'

export default function Contact({ personal }) {
  const contacts = [
    { label: 'Email', value: personal?.email ?? 'you@example.com', href: `mailto:${personal?.email ?? ''}`, icon: FiMail },
    { label: 'GitHub', value: 'github.com/juanroy012', href: personal?.github ?? '#', icon: FiGithub },
    { label: 'LinkedIn', value: 'linkedin.com/in/juan-roy', href: personal?.linkedin ?? '#', icon: FiLinkedin },
    { label: 'Resume', value: 'Open resume.pdf', href: personal?.resume ?? '/resume.pdf', icon: FiFileText },
  ]

  return (
    <SectionWrapper id="contact" className="border-t border-border">
      <SectionLabel>Say hello</SectionLabel>
      <SectionTitle>Get in Touch</SectionTitle>
      <SectionDivider />

      <div className="card card-corner p-6 max-w-3xl">
        <p className="font-mono text-xs tracking-[0.12em] uppercase text-gray-500 leading-relaxed mb-4">
          Quick contact links.
        </p>

        <div className="space-y-3">
          {contacts.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={label === 'Email' ? undefined : '_blank'}
              rel={label === 'Email' ? undefined : 'noreferrer'}
              className="flex items-center justify-between gap-3 border border-border bg-surface px-4 py-3 hover:border-primary transition-colors"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-gray-500">
                <Icon size={13} />
                {label}
              </span>
              <span className="font-mono text-xs tracking-[0.06em] uppercase text-gray-300">{value}</span>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
