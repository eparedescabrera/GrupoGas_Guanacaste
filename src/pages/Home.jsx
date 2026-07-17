import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/sections/HeroSection.jsx'
import MapSection from '../components/sections/MapSection.jsx'
import ProductsSection from '../components/sections/ProductsSection.jsx'
import ScheduleSection from '../components/sections/ScheduleSection.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx'
import VideoSection from '../components/sections/VideoSection.jsx'
import WhyUsSection from '../components/sections/WhyUsSection.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Home() {
  const { t } = useLanguage()
  const p = t('pages.home')

  return (
    <>
      <Helmet>
        <title>{p.title}</title>
        <meta name="description" content={p.description} />
      </Helmet>
      <HeroSection />
      <ProductsSection limit={3} viewAllHref="/productos" />
      <ServicesSection limit={3} viewAllHref="/servicios" />
      <WhyUsSection limit={3} viewAllHref="/nosotros" />
      <ScheduleSection />
      <VideoSection />
      <TestimonialsSection />
      <MapSection />
    </>
  )
}

