import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionWrapper({ id, children, className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id={id} className={`py-24 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export function SectionLabel({ children }) {
  return (
    <p className="text-accent font-mono text-sm font-medium tracking-widest uppercase mb-2">
      {children}
    </p>
  )
}

export function SectionTitle({ children }) {
  return (
    <h2 className="section-heading">
      {children}
    </h2>
  )
}

export function SectionDivider() {
  return (
    <div className="flex items-center gap-3 mt-3 mb-12">
      <div className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
    </div>
  )
}
