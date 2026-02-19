import { useState } from 'react'
import axios from 'axios'
import { FiSend, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'
import SectionWrapper, { SectionLabel, SectionTitle, SectionDivider } from './SectionWrapper'

export default function Contact({ personal }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

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
    <SectionWrapper id="contact" className="bg-surface/30">
      <SectionLabel>Say hello</SectionLabel>
      <SectionTitle>Get in Touch</SectionTitle>
      <SectionDivider />

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left — copy */}
        <div className="space-y-5">
          <p className="text-slate-300 text-lg leading-relaxed">
            Whether you have a project idea, want to collaborate, or just want to say hi — my inbox
            is always open.
          </p>
          <a
            href={`mailto:${personal?.email ?? ''}`}
            className="inline-block gradient-text font-semibold text-xl hover:opacity-80 transition-opacity"
          >
            {personal?.email ?? 'your@email.com'}
          </a>

          <div className="flex flex-col gap-3 pt-4">
            {[
              { label: 'GitHub', href: personal?.github },
              { label: 'LinkedIn', href: personal?.linkedin },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-accent transition-colors text-sm"
              >
                → {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="glass-card p-7 space-y-5">
          {['name', 'email'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-400 mb-1.5 capitalize">
                {field}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                placeholder={field === 'email' ? 'you@example.com' : 'Your name'}
                className="w-full bg-dark/60 border border-border rounded-xl px-4 py-3 text-slate-200
                           placeholder:text-muted text-sm focus:outline-none focus:border-primary
                           transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell me what's on your mind..."
              className="w-full bg-dark/60 border border-border rounded-xl px-4 py-3 text-slate-200
                         placeholder:text-muted text-sm focus:outline-none focus:border-primary
                         transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FiSend size={15} />
            )}
            {status === 'loading' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-2 text-emerald-400 text-sm">
              <FiCheckCircle /> Message sent — I&apos;ll get back to you soon!
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center gap-2 text-rose-400 text-sm">
              <FiAlertTriangle /> Something went wrong. Try emailing me directly.
            </p>
          )}
        </form>
      </div>
    </SectionWrapper>
  )
}
