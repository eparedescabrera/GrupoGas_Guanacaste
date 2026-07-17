import { Helmet } from 'react-helmet-async'
import CtaSection from '../components/sections/CtaSection.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Services() {
  const { t } = useLanguage()
  const p = t('pages.services')

  return (
    <>
      <Helmet>
        <title>{p.title}</title>
      </Helmet>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
      />
      <ServicesSection showHeading={false} />
      <CtaSection />
    </>
  )
}
