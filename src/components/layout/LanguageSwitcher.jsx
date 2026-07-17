import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { SpainFlagIcon, UsaFlagIcon } from './FlagIcons.jsx'

const KNOB_TRAVEL = 32

export default function LanguageSwitcher({ className = '' }) {
  const { lang, toggleLang, languages } = useLanguage()
  const [es, en] = languages
  const isEn = lang === en.code

  return (
    <motion.button
      type="button"
      onClick={toggleLang}
      role="switch"
      aria-checked={isEn}
      aria-label={`${es.label} / ${en.label}`}
      title={`${es.label} / ${en.label}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative inline-flex h-10 w-[72px] shrink-0 items-center rounded-full p-1 ring-1 shadow-soft transition-colors duration-500 hover:shadow-card ${
        isEn ? 'bg-gradient-to-r from-slate-100 to-blue-50 ring-blue-200/70' : 'bg-gradient-to-r from-red-50 to-amber-50 ring-amber-300/70'
      } ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isEn
            ? ['0 0 0 0 rgba(37,99,235,0.35)', '0 0 0 7px rgba(37,99,235,0)']
            : ['0 0 0 0 rgba(220,38,38,0.35)', '0 0 0 7px rgba(220,38,38,0)'],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />

      <motion.span
        aria-hidden="true"
        className="absolute top-1 left-1 h-8 w-8 rounded-full"
        animate={{
          x: isEn ? KNOB_TRAVEL : 0,
          background: isEn
            ? 'linear-gradient(135deg,#1d4ed8,#dc2626)'
            : 'linear-gradient(135deg,#dc2626,#f1bf00)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        style={{ boxShadow: '0 3px 10px rgba(15,23,42,0.25)' }}
      />

      <span className="relative z-10 flex h-full w-full items-center justify-between px-1.5">
        <motion.span
          animate={{ scale: isEn ? 0.8 : 1.15, opacity: isEn ? 0.55 : 1, rotate: isEn ? 0 : [0, -6, 0] }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          className="grid h-6 w-6 place-items-center overflow-hidden rounded-full ring-2 ring-white shadow-sm"
        >
          <SpainFlagIcon className="h-full w-full scale-125" />
        </motion.span>

        <motion.span
          animate={{ scale: isEn ? 1.15 : 0.8, opacity: isEn ? 1 : 0.55, rotate: isEn ? [0, 6, 0] : 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          className="grid h-6 w-6 place-items-center overflow-hidden rounded-full ring-2 ring-white shadow-sm"
        >
          <UsaFlagIcon className="h-full w-full scale-125" />
        </motion.span>
      </span>
    </motion.button>
  )
}
