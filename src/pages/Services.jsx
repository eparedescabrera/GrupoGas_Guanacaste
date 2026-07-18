import Seo from '../components/layout/Seo.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Services() {
  const { t } = useLanguage()
  const p = t('pages.services')

  return (
    <>
      <Seo title={p.title} description={p.description} path="/servicios" />
      <PageHero
        eyebrow={p.eyebrow}
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
      />
      <ServicesSection showHeading={false} />
    </>
  )
}
