import { motion } from 'framer-motion'
import { SITE } from '../../data/site.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

export default function WhatsAppFloat() {
  const href = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    'Hola, necesito información sobre gas y servicios.',
  )}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }}
      whileHover={{ y: -3, scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card ring-1 ring-white/20 hover:brightness-110 transition-[filter] focus-visible:ring-2 focus-visible:ring-brand-blue2 focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/60 animate-ping" aria-hidden="true" />
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  )
}
