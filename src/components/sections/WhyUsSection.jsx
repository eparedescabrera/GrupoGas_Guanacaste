import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPinned,
  Shield,
  Siren,
  Users,
} from 'lucide-react'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { staggerContainer, staggerItem } from '../../lib/motion.js'
import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const ICON_ORDER = [
  { id: 'fast', icon: Clock },
  { id: 'safety', icon: Shield },
  { id: 'trained', icon: Users },
  { id: 'emergency', icon: Siren },
  { id: 'coverage', icon: MapPinned },
  { id: 'certs', icon: BadgeCheck },
]

export default function WhyUsSection({ limit, viewAllHref }) {
  const { ref, inView } = useInViewOnce()
  const { t } = useLanguage()
  const items = t('whyUs.items')
  const visibleIcons = limit ? ICON_ORDER.slice(0, limit) : ICON_ORDER

  return (
    <section id="por-que" className="section-shell section-panel">
      <Container>
        <div ref={ref}>
          <SectionHeading
            eyebrow={t('whyUs.eyebrow')}
            title={t('whyUs.title')}
            subtitle={t('whyUs.subtitle')}
            align="center"
          />
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={staggerContainer(0.1)}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleIcons.map(({ id, icon: Icon }) => {
            const info = items[id]
            return (
              <motion.div key={id} variants={staggerItem} className="h-full">
                <Card className="h-full p-6">
                  <div className="flex h-full items-start gap-4">
                    <div className="icon-well icon-well-green">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-slate-900">
                        {info.title}
                      </div>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {viewAllHref ? (
          <div className="mt-10 flex justify-center">
            <Button as="link" to={viewAllHref} variant="secondary">
              {t('whyUs.viewAll')} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
