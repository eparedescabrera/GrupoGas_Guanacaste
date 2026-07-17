import { Helmet } from 'react-helmet-async'
import WhyUsSection from '../components/sections/WhyUsSection.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function About() {
  const { t } = useLanguage()
  const p = t('pages.about')

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
      <WhyUsSection />
    </>
  )
}
