import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import { staggerContainer, staggerItem } from '../../lib/motion.js'

export default function PhotoGallery({ photos = [], title }) {
  const [openIndex, setOpenIndex] = useState(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (openIndex === null) return undefined
    function onKey(e) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIndex, close, prev, next])

  if (photos.length === 0) return null

  return (
    <div>
      {title ? (
        <div className="mb-4 flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-brand-blue">
          <Images className="h-4 w-4" />
          {title}
        </div>
      ) : null}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        variants={staggerContainer(0.05)}
        className="columns-2 gap-3 sm:columns-3 lg:columns-5"
      >
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            variants={staggerItem}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpenIndex(i)}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-soft"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/15" />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {openIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar galería"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/20 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    prev()
                  }}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/20 hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  aria-label="Foto siguiente"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/20 hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            ) : null}

            <AnimatePresence mode="wait">
              <motion.img
                key={photos[openIndex].src}
                src={photos[openIndex].src}
                alt={photos[openIndex].alt}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-card"
              />
            </AnimatePresence>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
              {openIndex + 1} / {photos.length}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
