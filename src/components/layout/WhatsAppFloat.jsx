import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { SITE } from '../../data/site.js'

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
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-3.5 text-sm font-extrabold text-white shadow-card ring-1 ring-white/20 hover:brightness-110 transition-[filter] focus-visible:ring-2 focus-visible:ring-brand-blue2 focus-visible:ring-offset-2 ring-offset-white"
      aria-label="Contactar por WhatsApp"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-brand-green/60 animate-ping" aria-hidden="true" />
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </motion.a>
  )
}
