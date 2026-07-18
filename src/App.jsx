import { Helmet } from 'react-helmet-async'
import SiteLayout from './components/layout/SiteLayout.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import ScrollToTop from './routes/ScrollToTop.jsx'
import { SITE } from './data/site.js'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'

const SITE_URL = SITE.url

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE.name,
  image: `${SITE_URL}/og-image.png`,
  logo: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  telephone: SITE.phoneTel,
  email: SITE.email,
  description:
    'Distribución y venta de gas en Guanacaste, Costa Rica. Servicio rápido, seguro y confiable para hogares, comercios y empresas, con atención 24/7 para emergencias.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.addressLines.join(', '),
    addressLocality: 'Nandayure',
    addressRegion: 'Guanacaste',
    addressCountry: 'CR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.9969457,
    longitude: -85.2496536,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '19:00',
    },
  ],
  areaServed: ['Nandayure', 'Cóbano', 'Nicoya', 'Guanacaste', 'Costa Rica'],
  sameAs: [SITE.social.facebook],
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Helmet>
          <title>{SITE.name}</title>
          <link rel="canonical" href={SITE_URL} />
          <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        </Helmet>
        <ScrollToTop />
        <SiteLayout>
          <AppRoutes />
        </SiteLayout>
      </LanguageProvider>
    </ThemeProvider>
  )
}

