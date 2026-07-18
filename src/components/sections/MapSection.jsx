import { Building2, CheckCircle2, Clock, MapPin, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'
import { SITE } from '../../data/site.js'
import { DELIVERY_ROUTES } from '../../data/routes.js'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { staggerContainer, staggerItem } from '../../lib/motion.js'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function MapSection() {
  const { t } = useLanguage()
  const rp = t('routesPage')
  const { ref, inView } = useInViewOnce()

  const coverageZones = [
    {
      id: 'hq',
      isHq: true,
      name: t('map.hqLabel'),
      region: SITE.addressLines[0],
      active: true,
      schedule: SITE.hours.weekdays,
      mapsHref: SITE.maps.directionsUrl,
    },
    ...DELIVERY_ROUTES.map((route) => ({
      id: route.id,
      isHq: false,
      name: rp.routes[route.id]?.name ?? route.name,
      region: route.region,
      active: route.active !== false,
      schedule: route.schedule,
      mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(route.mapsQuery)}`,
    })),
  ]

  return (
    <section id="ubicacion" className="section-shell section-muted">
      <Container>
        <SectionHeading
          eyebrow={t('map.eyebrow')}
          title={t('map.title')}
          subtitle={t('map.subtitle')}
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card className="overflow-hidden">
              <div className="aspect-[16/11] sm:aspect-[16/9]">
                <iframe
                  title="Mapa de ubicación"
                  src={SITE.maps.embedUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6 sm:p-8 h-full">
              <div className="flex items-start gap-4">
                <div className="icon-well icon-well-blue">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white">
                    {t('map.addressTitle')}
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed dark:text-slate-400">
                    {SITE.addressLines.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  as="a"
                  href={SITE.maps.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="w-full justify-center"
                >
                  <Navigation className="h-4 w-4" />
                  {t('map.directions')}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading
            eyebrow={t('map.coverageEyebrow')}
            title={t('map.coverageTitle')}
            subtitle={t('map.coverageSubtitle')}
            align="center"
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={staggerContainer(0.1, 0.1)}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {coverageZones.map((zone) => (
              <motion.div key={zone.id} variants={staggerItem}>
                <Card className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`icon-well ${zone.isHq ? 'icon-well-blue' : 'icon-well-green'}`}>
                      {zone.isHq ? <Building2 className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
                    </div>
                    <Badge tone={zone.active ? 'success' : 'warning'}>
                      {zone.active ? (
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> {t('map.statusActive')}
                        </span>
                      ) : (
                        t('map.statusInactive')
                      )}
                    </Badge>
                  </div>

                  <h3 className="mt-4 text-base font-extrabold text-slate-900 dark:text-white">
                    {zone.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {zone.region}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    {zone.schedule}
                  </div>

                  <div className="mt-5 pt-1">
                    <Button
                      as="a"
                      href={zone.mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                      className="w-full justify-center text-xs sm:text-sm"
                    >
                      <Navigation className="h-4 w-4" />
                      {t('map.viewOnMap')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

