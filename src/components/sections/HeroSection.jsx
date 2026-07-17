import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, ShieldCheck, Clock3, MapPinned } from 'lucide-react'
import { SITE } from '../../data/site.js'
import { PRODUCTS } from '../../data/products.js'
import { DELIVERY_ROUTES } from '../../data/routes.js'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useCountUp } from '../../hooks/useCountUp.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import heroBg from '../../assets/hero-camion-gng.png'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import Logo from '../layout/Logo.jsx'

const CARD_ICONS = [Clock3, ShieldCheck, MapPinned]

export default function HeroSection() {
  const { t } = useLanguage()
  const { ref: statsRef, inView: statsInView } = useInViewOnce({ rootMargin: '0px' })
  const sizesCount = useCountUp(PRODUCTS.length, { start: statsInView, duration: 1100 })
  const routesCount = useCountUp(DELIVERY_ROUTES.length, { start: statsInView, duration: 1100 })
  const hoursCount = useCountUp(24, { start: statsInView, duration: 1400 })

  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero solicitar gas. ¿Me pueden ayudar?',
  )}`

  const cards = t('hero.cards')
  const bullets = t('hero.bullets')

  return (
    <section className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {/* Scrim only behind the text column so the photo stays clear on the right */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(100deg, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.68) 32%, rgba(15,23,42,0.32) 58%, rgba(15,23,42,0.05) 78%, rgba(15,23,42,0) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          backgroundImage: 'linear-gradient(to top, rgba(15,23,42,0.45), transparent)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-brand-gradient mix-blend-multiply opacity-35"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="mb-6">
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

            <h1 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl">
              {SITE.tagline}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)] sm:text-lg">
              {t('hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
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

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {cards.map((it, i) => {
                const Icon = CARD_ICONS[i] ?? Clock3
                return (
                  <motion.div
                    key={it.k}
                    className="rounded-2xl bg-white/12 backdrop-blur-[2px] ring-1 ring-white/25 px-4 py-3 text-white"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
                  >
                    <Icon className="h-4 w-4 mb-2 opacity-90" />
                    <div className="text-sm font-extrabold">{it.k}</div>
                    <div className="text-xs text-white/80">{it.v}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <div ref={statsRef} className="relative rounded-3xl bg-white p-6 sm:p-7 shadow-card ring-1 ring-white/60">
              <div className="text-slate-900 font-extrabold text-lg sm:text-xl">
                {t('hero.panelTitle')}
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {t('hero.panelText')}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-brand-gradient p-4 text-white shadow-soft">
                  <div className="text-2xl font-extrabold tabular-nums">{sizesCount}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/85">
                    {t('hero.stats.sizes')}
                  </div>
                </div>
                <div className="rounded-2xl bg-brand-gradient p-4 text-white shadow-soft">
                  <div className="text-2xl font-extrabold tabular-nums">{routesCount}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/85">
                    {t('hero.stats.routes')}
                  </div>
                </div>
                <div className="rounded-2xl bg-brand-gradient p-4 text-white shadow-soft">
                  <div className="text-2xl font-extrabold tabular-nums">{hoursCount}/7</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/85">
                    {t('hero.stats.emergency')}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {bullets.map((line) => (
                  <div
                    key={line}
                    className="rounded-2xl bg-surface-50 ring-1 ring-surface-200 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
