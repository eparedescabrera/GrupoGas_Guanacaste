import { motion } from 'framer-motion'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { SITE } from '../../data/site.js'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { fadeUp } from '../../lib/motion.js'
import AmbientBlobs from '../ui/AmbientBlobs.jsx'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'

export default function CtaSection() {
  const { ref, inView } = useInViewOnce()
  const { t } = useLanguage()
  const c = t('cta')
  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero coordinar un pedido de gas.',
  )}`

  return (
    <section className="section-shell section-clear">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-brand-gradient text-white shadow-card"
        >
          <AmbientBlobs variant="light" />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18), transparent 40%)',
            }}
            aria-hidden="true"
          />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="text-xs font-extrabold tracking-[0.14em] text-white/85 uppercase">
                {c.eyebrow}
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
                {c.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Button as="a" href={waHref} target="_blank" rel="noreferrer" variant="inverse" className="w-full justify-center">
                  {c.whatsapp} <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Button
                  as="a"
                  href={`tel:${SITE.phoneTel}`}
                  variant="secondary"
                  className="w-full justify-center bg-white/95"
                >
                  <PhoneCall className="h-4 w-4" />
                  {c.call}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
