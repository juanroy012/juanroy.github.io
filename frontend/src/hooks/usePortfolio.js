import { useState, useEffect } from 'react'
import axios from 'axios'

const FALLBACK = {
  personal: {
    name: 'Juan Roy',
    title: 'Backend & Full-Stack Developer',
    tagline: 'I build REST APIs and database-driven web apps. Clean code, real deployments.',
    bio: 'Computer Programming student at Sault College (GPA 4.0, graduating Apr 2026). I enjoy building backends that are reliable and frontends that are fast. Currently looking for Junior Backend or Full-Stack roles.',
    email: 'juanroy012@gmail.com',
    github: 'https://github.com/juanroy012',
    linkedin: 'https://linkedin.com/in/juan-roy',
    resume: '/resume.pdf',
    location: 'Sault Ste. Marie, ON',
    availability: 'Open to opportunities — remote or relocation',
  },
  skills: {
    Languages: ['Java', 'Python', 'JavaScript', 'SQL'],
    Backend:   ['Spring', 'Hibernate', 'Servlets', 'FastAPI', 'REST APIs'],
    Frontend:  ['React', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3'],
    Databases: ['MySQL', 'PostgreSQL', 'SQLite'],
    Tools:     ['Git', 'GitHub Actions', 'Docker', 'Linux'],
    Cloud:     ['AWS EC2', 'AWS S3', 'AWS RDS', 'Fly.io'],
  },
  projects: [
    {
      id: 1,
      name: 'Financial Tracker',
      description: 'Full-stack finance app with JWT auth, per-user data isolation, transactions/accounts/categories, search, pagination, and dashboard views.',
      subdomain: 'finance.juan-roy.com',
      github: 'https://github.com/juanroy012/FinancialTracker',
      tech: ['FastAPI', 'React', 'SQLite', 'Docker', 'Fly.io'],
      featured: true,
      status: 'Live',
    },
    {
      id: 2,
      name: 'OHS Remote',
      description: 'Capstone safety compliance platform. REST APIs for OHS manual workflows, document generation, secure token-based downloads, and Swagger docs.',
      subdomain: '',
      github: '',
      tech: ['FastAPI', 'React', 'MySQL', 'SQLAlchemy', 'Alembic', 'Docker'],
      featured: true,
      status: 'Capstone',
    },
  ],
  education: [
    { school: 'Sault College',         degree: 'Diploma in Computer Programming',         period: '2024 – 2026', gpa: '4.0 / 4.0' },
    { school: 'Wales Young Institute',  degree: 'Business Entrepreneurship and Technology', period: '2023 – 2024', gpa: '3.86' },
  ],
  experience: [],
}

export function usePortfolio() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    axios
      .get('/api/portfolio')
      .then((res) => setData(res.data))
      .catch((err) => {
        console.warn('[usePortfolio] API unreachable — using static fallback.', err.message)
        setData(FALLBACK)
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
