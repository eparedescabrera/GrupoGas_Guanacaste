import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../theme/ThemeContext.jsx'

const KNOB_TRAVEL = 32

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo oscuro activo' : 'Modo claro activo'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative inline-flex h-10 w-[72px] shrink-0 items-center rounded-full p-1 ring-1 shadow-soft transition-colors duration-500 hover:shadow-card ${
        isDark
          ? 'bg-gradient-to-r from-slate-800 to-indigo-950 ring-indigo-700/60'
          : 'bg-gradient-to-r from-amber-50 to-sky-50 ring-amber-300/70'
      } ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark
            ? ['0 0 0 0 rgba(99,102,241,0.35)', '0 0 0 7px rgba(99,102,241,0)']
            : ['0 0 0 0 rgba(245,158,11,0.35)', '0 0 0 7px rgba(245,158,11,0)'],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />

      <motion.span
        aria-hidden="true"
        className="absolute top-1 left-1 grid h-8 w-8 place-items-center rounded-full"
        animate={{
          x: isDark ? KNOB_TRAVEL : 0,
          background: isDark ? 'linear-gradient(135deg,#312e81,#1e293b)' : 'linear-gradient(135deg,#fbbf24,#38bdf8)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        style={{ boxShadow: '0 3px 10px rgba(15,23,42,0.25)' }}
      />

      <span className="relative z-10 flex h-full w-full items-center justify-between px-1.5">
        <motion.span
          animate={{ scale: isDark ? 0.8 : 1.15, opacity: isDark ? 0.55 : 1, rotate: isDark ? 0 : [0, -10, 0] }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          className="grid h-6 w-6 place-items-center text-amber-500"
        >
          <Sun className="h-4 w-4" strokeWidth={2.5} />
        </motion.span>

        <motion.span
          animate={{ scale: isDark ? 1.15 : 0.8, opacity: isDark ? 1 : 0.55, rotate: isDark ? [0, 10, 0] : 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          className="grid h-6 w-6 place-items-center text-slate-100"
        >
          <Moon className="h-4 w-4" strokeWidth={2.5} />
        </motion.span>
      </span>
    </motion.button>
  )
}
