import { MapPin, Navigation } from 'lucide-react'
import { SITE } from '../../data/site.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function MapSection() {
  const { t } = useLanguage()

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
                  <div className="text-base font-extrabold text-slate-900">
                    {t('map.addressTitle')}
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
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
      </Container>
    </section>
  )
}

