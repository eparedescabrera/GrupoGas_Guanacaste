import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { SITE } from '../../data/site.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import cobanoLandscape01 from '../../assets/gallery-cobano/cobano-07.png'
import cobanoLandscape02 from '../../assets/gallery-cobano/cobano-10.png'
import cobanoLandscape03 from '../../assets/gallery-cobano/cobano-15.png'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import Logo from '../layout/Logo.jsx'

const HERO_BG_IMAGES = [
  { src: cobanoLandscape01, alt: 'Vista de la carretera y el Golfo de Nicoya, ruta Cóbano' },
  { src: cobanoLandscape02, alt: 'Piscina infinita con vista al mar en la zona costera de Cóbano' },
  { src: cobanoLandscape03, alt: 'Costa rocosa con vista al mar al atardecer, ruta Cóbano' },
]

const HERO_BG_INTERVAL_MS = 6000

export default function HeroSection() {
  const { t } = useLanguage()
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setBgIndex((current) => (current + 1) % HERO_BG_IMAGES.length)
    }, HERO_BG_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero solicitar gas. ¿Me pueden ayudar?',
  )}`

  const currentBg = HERO_BG_IMAGES[bgIndex]

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentBg.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentBg.src})` }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: (HERO_BG_INTERVAL_MS / 1000) + 1.5, ease: 'easeInOut' }}
            role="img"
            aria-label={currentBg.alt}
          />
        </motion.div>
      </AnimatePresence>
      {/* Light scrim, only enough to keep the text readable without hiding the photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.18) 40%, rgba(15,23,42,0.32) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-brand-gradient mix-blend-multiply opacity-[0.12]"
        aria-hidden="true"
      />

      <Container className="relative py-24 sm:py-28 lg:py-36">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-6 flex justify-center">
            <div className="inline-flex rounded-2xl bg-white/95 p-2 shadow-soft ring-1 ring-white/70">
              <Logo />
            </div>
          </div>

          <motion.div
            className="inline-flex items-center rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold tracking-widest text-brand-blue ring-1 ring-white/80 shadow-soft"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {t('hero.badge')}
          </motion.div>

          <h1 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.4)] sm:text-4xl lg:text-5xl">
            {SITE.tagline}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] sm:text-lg">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Button as="link" to="/contacto" variant="inverse">
                {t('hero.ctaRequest')} <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Button as="a" href={waHref} target="_blank" rel="noreferrer" variant="whatsapp">
                <MessageCircle className="h-4 w-4" />
                {t('hero.ctaWhatsapp')}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-1.5">
        {HERO_BG_IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setBgIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === bgIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ver imagen ${i + 1}`}
            aria-current={i === bgIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  )
}
