import { useState } from 'react'
import axios from 'axios'
import { FiSend, FiCheckCircle, FiAlertTriangle, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import SectionWrapper, { SectionLabel, SectionTitle, SectionDivider } from './SectionWrapper'

const inputClass = `w-full bg-surface border border-border px-4 py-3 font-mono text-sm text-gray-200
  placeholder:text-gray-700 focus:outline-none focus:border-primary transition-colors`

export default function Contact({ personal }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper id="contact" className="border-t border-border">
      <SectionLabel>Say hello</SectionLabel>
      <SectionTitle>Get in Touch</SectionTitle>
      <SectionDivider />

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left */}
        <div className="space-y-8">
          <p className="text-gray-400 text-base leading-relaxed">
            Whether you have a role in mind, a project to collaborate on, or just want to say hi —
            I&apos;m always happy to talk.
          </p>

          <div className="space-y-4">
            {[
              { icon: FiMail,     label: personal?.email,   href: `mailto:${personal?.email}` },
              { icon: FiGithub,   label: 'github.com/juanroy012', href: personal?.github },
              { icon: FiLinkedin, label: 'linkedin.com/in/juan-roy', href: personal?.linkedin },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 border border-border flex items-center justify-center
                                text-gray-600 group-hover:border-primary group-hover:text-primary transition-all">
                  <Icon size={13} />
                </div>
                <span className="font-mono text-sm text-gray-500 group-hover:text-primary transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="card card-corner p-6 space-y-4">
          {[
            { field: 'name',    type: 'text',  placeholder: 'Your name' },
            { field: 'email',   type: 'email', placeholder: 'you@example.com' },
          ].map(({ field, type, placeholder }) => (
            <div key={field}>
              <label className="block font-mono text-xs text-gray-600 mb-1.5 tracking-widest uppercase">
                {field}
              </label>
              <input
                type={type}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className={inputClass}
              />
            </div>
          ))}

          <div>
            <label className="block font-mono text-xs text-gray-600 mb-1.5 tracking-widest uppercase">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell me what's on your mind..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span className="w-3.5 h-3.5 border border-dark/40 border-t-dark rounded-full animate-spin" />
            ) : (
              <FiSend size={13} />
            )}
            {status === 'loading' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <FiCheckCircle size={13} /> Message sent — I&apos;ll get back to you soon!
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center gap-2 font-mono text-xs text-red-400">
              <FiAlertTriangle size={13} /> Something went wrong. Email me directly.
            </p>
          )}
        </form>
      </div>
    </SectionWrapper>
  )
}
