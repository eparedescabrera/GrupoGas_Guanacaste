import { motion } from 'framer-motion'
import Container from './Container.jsx'
import heroPagesBg from '../../assets/hero-pages-bg.png'

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  tone = 'gradient',
}) {
  const isGradient = tone === 'gradient'

  return (
    <section
      className={`relative overflow-hidden border-b ${
        isGradient
          ? 'border-transparent bg-brand-gradient'
          : 'border-slate-200/80 bg-white'
      }`}
    >
      {isGradient ? (
        <>
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
        </>
      ) : null}

      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <div
              className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase ring-1 shadow-soft ${
                isGradient
                  ? 'bg-white text-brand-blue ring-white/80'
                  : 'bg-surface-100 text-brand-green ring-surface-200'
              }`}
            >
              {eyebrow}
            </div>
          ) : null}
          <h1
            className={`mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
              isGradient ? 'text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]' : 'text-slate-900'
            }`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`mt-4 text-base sm:text-lg leading-relaxed ${
                isGradient ? 'text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)]' : 'text-slate-600'
              }`}
            >
              {subtitle}
            </p>
          ) : null}
          {children ? <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div> : null}
        </div>
      </Container>
    </section>
  )
}
