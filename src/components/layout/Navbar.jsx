import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown, Menu, X, PhoneCall } from 'lucide-react'
import { SITE } from '../../data/site.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const navItemBase =
  'relative z-10 inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-semibold text-slate-600 transition-colors duration-150 select-none touch-manipulation hover:text-brand-blue active:text-brand-blue dark:text-slate-300 dark:hover:text-white dark:active:text-white'

function TopNavLink({ to, children, onClick }) {
  const [pressed, setPressed] = useState(false)

  const release = () => setPressed(false)

  return (
    <NavLink
      to={to}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
      className={({ isActive }) =>
        `${navItemBase} ${isActive || pressed ? 'text-brand-blue dark:text-white' : ''}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <motion.span
              layoutId="navActivePill"
              className="absolute inset-0 -z-10 rounded-full bg-brand-blue/10 ring-1 ring-brand-blue/15"
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            />
          ) : pressed ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="absolute inset-0 -z-10 rounded-full bg-brand-blue/10 ring-1 ring-brand-blue/15 dark:bg-white/10 dark:ring-white/15"
            />
          ) : null}
          {children}
        </>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 })

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const services = t('nav.servicesMenu')

  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero solicitar gas. ¿Me pueden ayudar?',
  )}`

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-slate-200/90 bg-white/95 shadow-soft backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-950/95'
          : 'border-transparent bg-white/80 backdrop-blur-sm dark:bg-slate-950/80'
      }`}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2.5px] origin-left bg-brand-gradient"
        style={{ scaleX: progress }}
      />

      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="shrink-0" aria-label="Ir al inicio">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <Logo />
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-white px-2 py-2 ring-1 ring-slate-200/90 shadow-soft dark:bg-slate-900 dark:ring-slate-800">
            <TopNavLink to="/">{t('nav.home')}</TopNavLink>
            <TopNavLink to="/nosotros">{t('nav.about')}</TopNavLink>
            <TopNavLink to="/productos">{t('nav.products')}</TopNavLink>
            <TopNavLink to="/rutas">{t('nav.routes')}</TopNavLink>

            <div className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className={`${navItemBase} gap-1.5 ${servicesOpen ? 'text-brand-blue dark:text-white' : ''}`}
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
              >
                {servicesOpen ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="absolute inset-0 -z-10 rounded-full bg-brand-blue/10 ring-1 ring-brand-blue/15 dark:bg-white/10 dark:ring-white/15"
                  />
                ) : null}
                {t('nav.services')}
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {servicesOpen ? (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute left-0 mt-3 w-64 rounded-2xl bg-white shadow-card ring-1 ring-slate-200 p-2 origin-top dark:bg-slate-900 dark:ring-slate-800"
                  >
                    {services.map((s) => (
                      <NavLink
                        key={s.label}
                        to={s.to}
                        className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-150 select-none touch-manipulation hover:bg-surface-50 hover:text-brand-blue active:bg-surface-50 active:text-brand-blue dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:active:bg-slate-800 dark:active:text-white"
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                      >
                        {s.label}
                      </NavLink>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <TopNavLink to="/certificaciones">{t('nav.certifications')}</TopNavLink>
            <TopNavLink to="/contacto">{t('nav.contact')}</TopNavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <ThemeToggle />
            <LanguageSwitcher />
            <motion.a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft hover:brightness-110 hover:shadow-card transition-all"
            >
              {t('nav.whatsapp')}
            </motion.a>
            <Button as="a" href={`tel:${SITE.phoneTel}`} variant="secondary" className="px-4">
              <PhoneCall className="h-4 w-4" />
              {t('nav.call')}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              className="inline-flex items-center justify-center rounded-xl p-2.5 ring-1 ring-slate-200 bg-white shadow-soft hover:bg-slate-50 dark:bg-slate-900 dark:ring-slate-800 dark:text-white dark:hover:bg-slate-800"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="mt-4 rounded-2xl bg-white shadow-card ring-1 ring-slate-200 p-4 dark:bg-slate-900 dark:ring-slate-800">
                <div className="grid gap-3">
                  <TopNavLink to="/" onClick={() => setMobileOpen(false)}>
                    {t('nav.home')}
                  </TopNavLink>
                  <TopNavLink to="/nosotros" onClick={() => setMobileOpen(false)}>
                    {t('nav.about')}
                  </TopNavLink>
                  <TopNavLink to="/productos" onClick={() => setMobileOpen(false)}>
                    {t('nav.products')}
                  </TopNavLink>
                  <TopNavLink to="/servicios" onClick={() => setMobileOpen(false)}>
                    {t('nav.services')}
                  </TopNavLink>
                  <TopNavLink to="/rutas" onClick={() => setMobileOpen(false)}>
                    {t('nav.routes')}
                  </TopNavLink>
                  <TopNavLink to="/certificaciones" onClick={() => setMobileOpen(false)}>
                    {t('nav.certifications')}
                  </TopNavLink>
                  <TopNavLink to="/contacto" onClick={() => setMobileOpen(false)}>
                    {t('nav.contact')}
                  </TopNavLink>
                </div>

                <div className="mt-5 grid gap-3">
                  <Button as="a" href={waHref} target="_blank" rel="noreferrer" variant="whatsapp">
                    {t('nav.whatsapp')}
                  </Button>
                  <Button as="a" href={`tel:${SITE.phoneTel}`} variant="secondary">
                    <PhoneCall className="h-4 w-4" />
                    {t('nav.call')}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  )
}
