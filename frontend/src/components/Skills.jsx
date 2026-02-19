import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionLabel, SectionTitle, SectionDivider } from './SectionWrapper'

const CATEGORY_COLORS = {
  Languages:  'from-violet-600 to-purple-600',
  Frontend:   'from-blue-500 to-cyan-500',
  Backend:    'from-emerald-500 to-teal-500',
  'Data & ML': 'from-orange-500 to-amber-500',
  DevOps:     'from-rose-500 to-pink-500',
}

function SkillBadge({ name, delay }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.35 }}
      className="tech-badge hover:border-primary/50 hover:text-slate-200 transition-colors cursor-default"
    >
      {name}
    </motion.span>
  )
}

export default function Skills({ skills }) {
  if (!skills) return null

  return (
    <SectionWrapper id="skills" className="bg-surface/30">
      <SectionLabel>What I work with</SectionLabel>
      <SectionTitle>Skills & Technologies</SectionTitle>
      <SectionDivider />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-2 h-6 rounded-full bg-gradient-to-b ${CATEGORY_COLORS[category] ?? 'from-primary to-accent'}`}
              />
              <h3 className="font-semibold text-white">{category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill, idx) => (
                <SkillBadge key={skill} name={skill} delay={idx * 0.05} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
