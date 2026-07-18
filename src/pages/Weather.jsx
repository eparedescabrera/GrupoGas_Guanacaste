import Seo from '../components/layout/Seo.jsx'
import WeatherSection from '../components/sections/WeatherSection.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Weather() {
  const { t } = useLanguage()
  const p = t('pages.weather')

  return (
    <>
      <Seo title={p.title} description={p.description} path="/clima" />
      <PageHero eyebrow={p.eyebrow} title={p.heroTitle} subtitle={p.heroSubtitle} />
      <WeatherSection showHeading={false} />
    </>
  )
}
