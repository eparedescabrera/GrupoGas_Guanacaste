import { Helmet } from 'react-helmet-async'
import SiteLayout from './components/layout/SiteLayout.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import ScrollToTop from './routes/ScrollToTop.jsx'
import { SITE } from './data/site.js'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Helmet>
          <title>{SITE.name}</title>
        </Helmet>
        <ScrollToTop />
        <SiteLayout>
          <AppRoutes />
        </SiteLayout>
      </LanguageProvider>
    </ThemeProvider>
  )
}

