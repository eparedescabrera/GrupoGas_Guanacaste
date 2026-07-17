import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FileBadge2, FolderCheck, ShieldCheck } from 'lucide-react'
import Container from '../components/ui/Container.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Card from '../components/ui/Card.jsx'
import { useInViewOnce } from '../hooks/useInViewOnce.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { staggerContainer, staggerItem } from '../lib/motion.js'

const ICON_ORDER = [
  { id: 'comerciales', icon: FileBadge2 },
  { id: 'permisos', icon: FolderCheck },
  { id: 'tecnica', icon: ShieldCheck },
]

export default function Certifications() {
  const { ref, inView } = useInViewOnce()
  const { t } = useLanguage()
  const p = t('pages.certifications')

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
      <section className="section-shell section-panel">
        <Container>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={staggerContainer(0.1)}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {ICON_ORDER.map(({ id, icon: Icon }) => {
              const item = p.items[id]
              return (
                <motion.div key={id} variants={staggerItem}>
                  <Card className="h-full p-6 sm:p-7">
                    <div className="icon-well icon-well-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-5 text-base font-extrabold text-slate-900">{item.title}</h2>
                    <p className="mt-2 text-sm font-medium text-slate-600 leading-relaxed">
                      {item.text}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>
    </>
  )
}
