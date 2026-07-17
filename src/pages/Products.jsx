import { Helmet } from 'react-helmet-async'
import CtaSection from '../components/sections/CtaSection.jsx'
import ProductsSection from '../components/sections/ProductsSection.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Products() {
  const { t } = useLanguage()
  const p = t('pages.products')

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
      <ProductsSection showHeading={false} />
      <CtaSection />
    </>
  )
}
