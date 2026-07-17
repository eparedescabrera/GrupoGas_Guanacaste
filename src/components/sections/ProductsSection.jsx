import { motion } from 'framer-motion'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { PRODUCTS } from '../../data/products.js'
import { SITE } from '../../data/site.js'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { staggerContainer, staggerItem } from '../../lib/motion.js'
import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function ProductsSection({ showHeading = true, limit, viewAllHref }) {
  const { ref, inView } = useInViewOnce()
  const { t } = useLanguage()
  const items = t('products.items')
  const visibleProducts = limit ? PRODUCTS.slice(0, limit) : PRODUCTS

  return (
    <section id="productos" className="section-shell section-panel">
      <Container>
        {showHeading ? (
          <div ref={ref}>
            <SectionHeading
              eyebrow={t('products.eyebrow')}
              title={t('products.title')}
              subtitle={t('products.subtitle')}
              align="center"
            />
          </div>
        ) : (
          <div ref={ref} className="sr-only">
            {t('products.eyebrow')}
          </div>
        )}

        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={staggerContainer(0.1)}
          className={showHeading ? 'mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'}
        >
          {visibleProducts.map((p) => {
            const info = items[p.id] ?? { name: p.name, description: p.description, usage: p.usage }
            const href = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
              `Hola, quiero pedir el ${info.name} (${p.capacity}).`,
            )}`

            return (
              <motion.div key={p.id} variants={staggerItem} className="h-full">
                <Card className="group flex h-full flex-col overflow-hidden p-0">
                  <div className="relative flex h-56 w-full items-end justify-center overflow-hidden border-b border-slate-100 bg-[radial-gradient(ellipse_at_center,_#f8faff_0%,_#eef2fb_55%,_#e4eaf6_100%)] px-4 pb-3 pt-5 sm:h-60 dark:border-slate-800 dark:bg-[radial-gradient(ellipse_at_center,_#1e293b_0%,_#172033_55%,_#0f172a_100%)]">
                    <div
                      className="pointer-events-none absolute inset-x-8 bottom-3 h-3 rounded-[100%] bg-slate-900/10 blur-md dark:bg-black/40"
                      aria-hidden="true"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-brand-blue ring-1 ring-slate-200 shadow-soft dark:bg-slate-900/95 dark:text-blue-300 dark:ring-slate-700">
                      {p.capacity}
                    </span>
                    <span className="absolute right-3 top-3 rounded-full bg-brand-green/10 px-2.5 py-1 text-[10px] font-bold text-brand-green ring-1 ring-brand-green/20 dark:bg-brand-green/15">
                      {info.usage}
                    </span>
                    <div
                      className="relative z-10 origin-bottom transition-transform duration-300 group-hover:[transform:scale(calc(var(--product-scale)*1.05))]"
                      style={{
                        '--product-scale': p.scale ?? 1,
                        transform: 'scale(var(--product-scale))',
                      }}
                    >
                      <img
                        src={p.image}
                        alt={info.name}
                        className="max-h-[200px] w-auto max-w-full object-contain drop-shadow-[0_18px_28px_rgba(15,23,42,0.22)] sm:max-h-[210px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">
                      {info.name}
                    </div>
                    <p className="mt-2 min-h-[52px] text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                      {info.description}
                    </p>
                    <Button
                      as="a"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                      className="mt-4 w-full justify-center"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {t('products.orderNow')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {viewAllHref ? (
          <div className="mt-10 flex justify-center">
            <Button as="link" to={viewAllHref} variant="secondary">
              {t('products.viewAll')} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
