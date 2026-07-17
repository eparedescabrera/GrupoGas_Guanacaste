import { motion } from 'framer-motion'

export default function AmbientBlobs({ className = '', variant = 'light' }) {
  const tone =
    variant === 'light'
      ? ['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)']
      : ['rgba(32,43,143,0.14)', 'rgba(10,122,61,0.12)']

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="absolute -left-16 -top-16 h-64 w-64 rounded-full blur-3xl"
        style={{ background: tone[0] }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-10 bottom-0 h-56 w-56 rounded-full blur-3xl"
        style={{ background: tone[1] }}
        animate={{ x: [0, -24, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  )
}
