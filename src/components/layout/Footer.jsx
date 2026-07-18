import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SITE } from '../../data/site.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import Container from '../ui/Container.jsx'
import FacebookIcon from './FacebookIcon.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  const { t } = useLanguage()
  const waHref = `https://wa.me/${SITE.whatsappNumber}`

  const links = [
    ['/', t('footer.links.home')],
    ['/productos', t('footer.links.products')],
    ['/servicios', t('footer.links.services')],
    ['/rutas', t('footer.links.routes')],
    ['/clima', t('footer.links.weather')],
    ['/contacto', t('footer.links.contact')],
  ]

  return (
    <footer className="mt-0 border-t border-slate-200 bg-slate-950 text-slate-200">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-flex rounded-2xl bg-white p-2">
              <Logo />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-400 max-w-md">
              {t('footer.description')}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <motion.a
                href={SITE.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Síguenos en Facebook"
                title="Síguenos en Facebook"
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white ring-1 ring-white/15 shadow-soft transition-shadow hover:shadow-card"
              >
                <FacebookIcon className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-10 sm:grid-cols-2">
            <div>
              <div className="text-sm font-extrabold text-white tracking-wide">
                {t('footer.contactTitle')}
              </div>
              <ul className="mt-4 grid gap-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-brand-blue2 shrink-0" />
                  <span>{SITE.addressLines.join(' · ')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-blue2 shrink-0" />
                  <a className="hover:text-white transition-colors" href={`tel:${SITE.phoneTel}`}>
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-blue2 shrink-0" />
                  <a className="hover:text-white transition-colors" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </li>
                <li className="text-xs text-slate-500 pt-1">
                  {SITE.hours.weekdays}
                  <br />
                  {SITE.hours.sunday}
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-extrabold text-white tracking-wide">
                {t('footer.linksTitle')}
              </div>
              <ul className="mt-4 grid gap-3 text-sm">
                {links.map(([to, label]) => (
                  <li key={to}>
                    <Link className="text-slate-400 hover:text-white transition-colors" to={to}>
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold text-white bg-brand-green hover:brightness-110 transition"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-t border-white/10 pt-6 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {SITE.name}. {t('footer.rights')}
          </div>
          <div>{t('footer.tagline')}</div>
        </div>
      </Container>
    </footer>
  )
}
