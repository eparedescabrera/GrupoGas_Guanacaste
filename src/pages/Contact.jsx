import Seo from '../components/layout/Seo.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import MapSection from '../components/sections/MapSection.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import { SITE } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Contact() {
  const { t } = useLanguage()
  const p = t('pages.contact')
  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero solicitar gas.',
  )}`

  return (
    <>
      <Seo title={p.title} description={p.description} path="/contacto" />
      <PageHero
        eyebrow={p.eyebrow}
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
      >
        <Button as="a" href={waHref} target="_blank" rel="noreferrer" variant="inverse">
          WhatsApp
        </Button>
        <Button as="a" href={`tel:${SITE.phoneTel}`} variant="secondary">
          {t('cta.call')}
        </Button>
      </PageHero>
      <ContactSection showHeading={false} />
      <MapSection />
    </>
  )
}
