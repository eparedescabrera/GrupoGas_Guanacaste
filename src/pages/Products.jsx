import Seo from '../components/layout/Seo.jsx'
import ProductsSection from '../components/sections/ProductsSection.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Products() {
  const { t } = useLanguage()
  const p = t('pages.products')

  return (
    <>
      <Seo title={p.title} description={p.description} path="/productos" />
      <PageHero
        eyebrow={p.eyebrow}
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
      />
      <ProductsSection showHeading={false} />
    </>
  )
}
