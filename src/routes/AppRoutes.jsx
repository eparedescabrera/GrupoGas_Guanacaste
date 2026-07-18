import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const Home = lazy(() => import('../pages/Home.jsx'))
const About = lazy(() => import('../pages/About.jsx'))
const Products = lazy(() => import('../pages/Products.jsx'))
const Services = lazy(() => import('../pages/Services.jsx'))
const RoutesPage = lazy(() => import('../pages/RoutesPage.jsx'))
const Certifications = lazy(() => import('../pages/Certifications.jsx'))
const Contact = lazy(() => import('../pages/Contact.jsx'))
const Weather = lazy(() => import('../pages/Weather.jsx'))

function PageFallback() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <div className="text-slate-600">Cargando…</div>
    </div>
  )
}

export default function AppRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<PageFallback />}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/rutas" element={<RoutesPage />} />
            <Route path="/certificaciones" element={<Certifications />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/clima" element={<Weather />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  )
}
