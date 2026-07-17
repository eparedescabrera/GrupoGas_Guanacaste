import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquarePlus, Quote } from 'lucide-react'
import { useTestimonials } from '../../hooks/useTestimonials.js'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import TestimonialSubmitModal from './TestimonialSubmitModal.jsx'

const AUTO_INTERVAL_MS = 5000

export default function TestimonialsSection() {
  const { ref, inView } = useInViewOnce()
  const { testimonials, addTestimonial } = useTestimonials()
  const [modalOpen, setModalOpen] = useState(false)
  const { t } = useLanguage()
  const s = t('testimonials')

  return (
    <section id="testimonios" className="section-shell section-panel">
      <Container>
        <div ref={ref}>
          <SectionHeading
            eyebrow={s.eyebrow}
            title={s.title}
            subtitle={s.subtitle}
            align="center"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="primary"
            onClick={() => setModalOpen(true)}
          >
            <MessageSquarePlus className="h-4 w-4" />
            {s.addButton}
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-10"
        >
          <TestimonialsCarousel testimonials={testimonials} labels={s} />
        </motion.div>
      </Container>

      <TestimonialSubmitModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addTestimonial}
      />
    </section>
  )
}

function TestimonialsCarousel({ testimonials, labels }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (index >= testimonials.length) setIndex(0)
  }, [testimonials.length, index])

  useEffect(() => {
    if (paused || testimonials.length <= 1) return undefined

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length)
    }, AUTO_INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [paused, testimonials.length])

  if (testimonials.length === 0) {
    return (
      <Card className="mx-auto max-w-2xl p-8 text-center text-sm text-slate-600">
        {labels.empty}
      </Card>
    )
  }

  const current = testimonials[index]

  function goTo(nextIndex) {
    const total = testimonials.length
    setIndex(((nextIndex % total) + total) % total)
  }

  return (
    <div
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <div className="relative">
        {testimonials.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="absolute left-0 top-1/2 z-10 -translate-x-2 -translate-y-1/2 rounded-full bg-white p-2.5 text-slate-700 shadow-soft ring-1 ring-slate-200 hover:bg-slate-50 sm:-translate-x-4"
              aria-label={labels.prev}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="absolute right-0 top-1/2 z-10 translate-x-2 -translate-y-1/2 rounded-full bg-white p-2.5 text-slate-700 shadow-soft ring-1 ring-slate-200 hover:bg-slate-50 sm:translate-x-4"
              aria-label={labels.next}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div className="overflow-hidden px-8 sm:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Card className="p-8 sm:p-10 text-center">
                <Quote className="mx-auto h-7 w-7 text-brand-blue2" />
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-700">
                  “{current.quote}”
                </p>
                <div className="mt-8">
                  <div className="text-base font-extrabold text-slate-900">
                    {current.name}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-500">
                    {current.role}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-8 bg-brand-blue'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Ver testimonio de ${t.name}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
