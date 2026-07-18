import Seo from '../components/layout/Seo.jsx'
import WhyUsSection from '../components/sections/WhyUsSection.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function About() {
  const { t } = useLanguage()
  const p = t('pages.about')

  return (
    <>
      <Seo title={p.title} description={p.description} path="/nosotros" />
      <PageHero
        eyebrow={p.eyebrow}
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
      />
      <WhyUsSection />
    </>
  )
}
