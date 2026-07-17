import { motion } from 'framer-motion'
import {
  ArrowRight,
  FileBadge,
  Flame,
  Gauge,
  HardHat,
  MessagesSquare,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { SERVICES } from '../../data/services.js'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { staggerContainer, staggerItem } from '../../lib/motion.js'
import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const ICONS = {
  Wrench,
  Gauge,
  Flame,
  HardHat,
  ShieldCheck,
  FileBadge,
  MessagesSquare,
}

export default function ServicesSection({ showHeading = true, limit, viewAllHref }) {
  const { ref, inView } = useInViewOnce()
  const { t } = useLanguage()
  const items = t('services.items')
  const visibleServices = limit ? SERVICES.slice(0, limit) : SERVICES

  return (
    <section id="servicios" className="section-shell section-muted">
      <Container>
        {showHeading ? (
          <div ref={ref}>
            <SectionHeading
              eyebrow={t('services.eyebrow')}
              title={t('services.title')}
              subtitle={t('services.subtitle')}
              align="center"
            />
          </div>
        ) : (
          <div ref={ref} className="sr-only">
            {t('services.eyebrow')}
          </div>
        )}

        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={staggerContainer(0.1)}
          className={showHeading ? 'mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'}
        >
          {visibleServices.map((s) => {
            const Icon = ICONS[s.icon] ?? Wrench
            const info = items[s.id] ?? { title: s.title, description: s.description }
            return (
              <motion.div key={s.id} variants={staggerItem} className="h-full">
                <Card className="h-full p-6">
                  <div className="flex h-full items-start gap-4">
                    <div className="icon-well icon-well-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-base font-extrabold text-slate-900 dark:text-white">
                        {info.title}
                      </div>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed dark:text-slate-400">
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
              {t('services.viewAll')} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}

