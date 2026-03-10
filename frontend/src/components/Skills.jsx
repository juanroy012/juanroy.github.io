import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionLabel, SectionTitle, SectionDivider } from './SectionWrapper'

const CATEGORY_COLORS = {
  Languages:   'text-emerald-400',
  Frontend:    'text-sky-400',
  Backend:     'text-violet-400',
  'Data & ML': 'text-amber-400',
  DevOps:      'text-rose-400',
  Databases:   'text-orange-400',
  Tools:       'text-teal-400',
  Cloud:       'text-blue-400',
}

function SkillRow({ name, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className="tech-badge cursor-default"
    >
      {name}
    </motion.span>
  )
}

export default function Skills({ skills }) {
  if (!skills) return null

  return (
    <SectionWrapper id="skills" className="border-t border-border">
      <SectionLabel>What I work with</SectionLabel>
      <SectionTitle>Skills & Technologies</SectionTitle>
      <SectionDivider />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {Object.entries(skills).map(([category, items]) => {
          const colorClass = CATEGORY_COLORS[category] ?? 'text-primary'
          return (
            <div key={category} className="bg-card p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs tracking-widest uppercase ${colorClass}`}>
                  {category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, idx) => (
                  <SkillRow key={skill} name={skill} index={idx} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
