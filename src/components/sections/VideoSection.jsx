import { motion } from 'framer-motion'
import { CheckCircle2, Play } from 'lucide-react'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { fadeUp } from '../../lib/motion.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import YoutubeIcon from '../ui/YoutubeIcon.jsx'

const YOUTUBE_VIDEO_ID = 'I49aAIh8KQE'
const YOUTUBE_WATCH_URL = `https://youtube.com/shorts/${YOUTUBE_VIDEO_ID}`
const YOUTUBE_THUMBNAIL_URL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`

export default function VideoSection() {
  const { ref, inView } = useInViewOnce()
  const { t } = useLanguage()
  const v = t('video')

  return (
    <section id="video" className="section-shell section-panel">
      <Container>
        <div ref={ref}>
          <SectionHeading eyebrow={v.eyebrow} title={v.title} subtitle={v.subtitle} align="center" />
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={fadeUp}
          className="mt-10 flex flex-col items-center"
        >
          <motion.a
            href={YOUTUBE_WATCH_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group relative mx-auto block w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-card ring-1 ring-slate-200"
            aria-label={v.watchOnYoutube}
          >
            <div className="aspect-[9/16] w-full">
              <img
                src={YOUTUBE_THUMBNAIL_URL}
                alt="Video del proceso de llenado de cilindros de gas GNG Gas Express"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-slate-950/25 transition-colors duration-300 group-hover:bg-slate-950/35" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-red-600 shadow-card ring-4 ring-white/25"
              >
                <Play className="h-7 w-7 fill-white text-white" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-slate-900 shadow-soft">
              {v.watchOnYoutube}
            </div>
          </motion.a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {v.bullets.map((line) => (
              <div
                key={line}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-green" />
                {line}
              </div>
            ))}
          </div>

          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="mt-6">
            <Button as="a" href={YOUTUBE_WATCH_URL} target="_blank" rel="noreferrer" variant="secondary">
              <YoutubeIcon className="h-4 w-4 text-red-600" />
              {v.watchOnYoutube}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
