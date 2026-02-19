import { usePortfolio } from './hooks/usePortfolio'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

export default function App() {
  const { data, loading } = usePortfolio()

  if (loading) return <Loader />

  const { personal, skills, projects, education, experience } = data ?? {}

  return (
    <div className="relative min-h-screen bg-dark noise-bg overflow-x-hidden">
      {/* Ambient orbs */}
      <div className="pointer-events-none select-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="relative z-10">
        <Navbar personal={personal} />
        <Hero personal={personal} />
        <About personal={personal} education={education} experience={experience} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Contact personal={personal} />
        <Footer personal={personal} />
      </div>
    </div>
  )
}
