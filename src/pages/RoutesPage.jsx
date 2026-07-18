import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, MapPin, Route, ShieldCheck, Truck } from 'lucide-react'
import Seo from '../components/layout/Seo.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import PhotoGallery from '../components/ui/PhotoGallery.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import logoGng from '../assets/logo-gng.png'
import heroPagesBg from '../assets/hero-pages-bg.png'
import { DELIVERY_ROUTES, getRouteById } from '../data/routes.js'
import { SITE } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { staggerContainer, staggerItem } from '../lib/motion.js'

export default function RoutesPage() {
  const { t } = useLanguage()
  const rp = t('routesPage')
  const [selectedId, setSelectedId] = useState(
    DELIVERY_ROUTES.find((r) => r.active !== false)?.id ?? DELIVERY_ROUTES[0].id,
  )
  const route = getRouteById(selectedId)
  const info = rp.routes[route.id]
  const isRouteActive = route.active !== false

  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    `Hola, quiero consultar la ruta de ${info.name} y horarios de entrega.`,
  )}`

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(route.mapsQuery)}`

  return (
    <>
      <Seo
        title={`${rp.title} · ${info.name}`}
        description={`Consulta nuestra ruta de entrega de gas en ${info.name}, Guanacaste. Servicio rápido y seguro.`}
        path="/rutas"
      />

      <section className="relative overflow-hidden border-b border-transparent bg-brand-gradient">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPagesBg})` }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-gradient opacity-45 mix-blend-multiply" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(15,23,42,0.38) 0%, rgba(15,23,42,0.08) 45%, rgba(15,23,42,0.42) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 85% 10%, rgba(255,255,255,0.12), transparent 35%)',
          }}
          aria-hidden="true"
        />
        <Container className="relative py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold tracking-wider text-brand-blue ring-1 ring-slate-200 shadow-soft">
                <Route className="h-3.5 w-3.5" />
                {rp.badge}
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.35)] sm:text-5xl">
                {rp.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)] sm:text-lg">
                {rp.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {DELIVERY_ROUTES.map((item) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative rounded-full px-5 py-2.5 text-sm font-extrabold transition-colors duration-200 ring-1 ${
                      selectedId === item.id
                        ? 'text-brand-blue ring-white'
                        : 'text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.45)] ring-white/50 hover:bg-slate-900/55'
                    }`}
                  >
                    {selectedId === item.id ? (
                      <motion.span
                        layoutId="routePillTop"
                        className="absolute inset-0 -z-10 rounded-full bg-white shadow-card"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    ) : (
                      <span
                        className="absolute inset-0 -z-10 rounded-full bg-slate-900/40 backdrop-blur-sm"
                        aria-hidden="true"
                      />
                    )}
                    {rp.routes[item.id].label}
                    {item.active === false ? (
                      <span className="ml-2 inline-flex items-center rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-950">
                        {rp.inactiveBadge}
                      </span>
                    ) : null}
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {isRouteActive ? (
                  <Button as="a" href={waHref} target="_blank" rel="noreferrer" variant="whatsapp">
                    {rp.requestRoute} {info.name}
                  </Button>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30">
                    <AlertTriangle className="h-4 w-4" />
                    {rp.routeUnavailable}
                  </div>
                )}
                <Button as="link" to="/contacto" variant="inverse">
                  {rp.viewContact}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <img
                  src={logoGng}
                  alt="Logo oficial de GNG Gas Express"
                  className="mx-auto h-28 w-auto rounded-xl bg-white p-3"
                />
                <div className="mt-4 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div
                    className={`rounded-2xl px-4 py-3 ring-1 shadow-soft ${
                      isRouteActive
                        ? 'bg-slate-50 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700'
                        : 'bg-amber-50 text-amber-900 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30'
                    }`}
                  >
                    {isRouteActive ? rp.activeRoute : rp.inactiveRoute}: <strong>{info.name}</strong>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 shadow-soft dark:bg-slate-800 dark:ring-slate-700">
                    {info.schedule}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell section-panel">
        <Container>
          <SectionHeading
            eyebrow={rp.sectionEyebrow}
            title={`${rp.sectionTitle} ${info.name}`}
            subtitle={info.description}
          />

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {DELIVERY_ROUTES.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`relative inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-colors duration-200 ring-1 ${
                  selectedId === item.id
                    ? 'text-white ring-brand-blue'
                    : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800 dark:hover:bg-slate-800'
                }`}
              >
                {selectedId === item.id ? (
                  <motion.span
                    layoutId="routePillBottom"
                    className="absolute inset-0 -z-10 rounded-2xl bg-brand-blue shadow-soft"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                ) : null}
                <MapPin className="h-4 w-4" />
                {rp.routes[item.id].name}
                {item.active === false ? (
                  <span
                    className={`ml-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                      selectedId === item.id ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {rp.inactiveBadge}
                  </span>
                ) : null}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {!isRouteActive ? (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-900 shadow-soft dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <span>{rp.inactiveNotice}</span>
                </div>
              ) : null}

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
                  <img
                    src={route.placeImage}
                    alt={route.placeImageAlt}
                    className="h-64 w-full object-cover sm:h-80"
                  />
                  <figcaption className="border-t border-slate-100 px-5 py-4 dark:border-slate-800">
                    <div className="text-xs font-bold tracking-widest uppercase text-brand-green">
                      {rp.coverageZone}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {info.region}
                    </p>
                  </figcaption>
                </figure>

                <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
                  <img
                    src={route.deliveryImage}
                    alt={route.deliveryImageAlt}
                    className="h-64 w-full object-cover sm:h-80"
                  />
                  <figcaption className="border-t border-slate-100 px-5 py-4 dark:border-slate-800">
                    <div className="text-xs font-bold tracking-widest uppercase text-brand-blue">
                      {rp.deliveryUnit}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {rp.deliveryCaption} {info.name}
                    </p>
                  </figcaption>
                </figure>
              </div>

              {route.gallery?.length ? (
                <div className="mt-10">
                  <PhotoGallery photos={route.gallery} title={`${rp.galleryTitle} · ${info.name}`} />
                </div>
              ) : null}

              <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={staggerContainer(0.1, 0.15)}
                  className="lg:col-span-7 grid gap-4"
                >
                  {info.highlights.map((line) => (
                    <motion.div
                      key={line}
                      variants={staggerItem}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {line}
                    </motion.div>
                  ))}

                  <Button
                    as="a"
                    href={mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                    className="w-full justify-center sm:w-auto"
                  >
                    <MapPin className="h-4 w-4" />
                    {rp.viewOnMap} {info.name}
                  </Button>
                </motion.div>

                <div className="lg:col-span-5 grid gap-4">
                  <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2 text-brand-blue">
                      <Truck className="h-5 w-5" />
                      <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {rp.logisticsTitle} {info.name}
                      </h2>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {rp.logisticsText} {info.name} {rp.logisticsTextEnd}
                    </p>
                  </article>

                  <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2 text-brand-green">
                      <ShieldCheck className="h-5 w-5" />
                      <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {rp.safetyTitle}
                      </h2>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {rp.safetyText}
                    </p>
                  </article>

                  <div
                    className={`rounded-2xl p-[1px] shadow-soft ${
                      isRouteActive ? 'bg-brand-gradient' : 'bg-amber-300'
                    }`}
                  >
                    <div className="rounded-2xl bg-white p-5 dark:bg-slate-900">
                      <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {rp.consultTitle} {info.name}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        {isRouteActive ? `${rp.consultText} ${info.name}.` : rp.inactiveNotice}
                      </p>
                      {isRouteActive ? (
                        <Button
                          as="a"
                          href={waHref}
                          target="_blank"
                          rel="noreferrer"
                          variant="primary"
                          className="mt-4 w-full"
                        >
                          {rp.consultButton}
                        </Button>
                      ) : (
                        <Button as="link" to="/contacto" variant="secondary" className="mt-4 w-full">
                          {rp.viewContact}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>
    </>
  )
}
