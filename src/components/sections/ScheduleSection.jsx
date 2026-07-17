import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { fadeUp } from '../../lib/motion.js'
import Badge from '../ui/Badge.jsx'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const DOT_TONE = {
  success: 'bg-brand-green',
  danger: 'bg-rose-500',
  warning: 'bg-amber-500',
}

function getStatus(now, s) {
  const day = now.getDay() // 0=Sun
  const hour = now.getHours()
  const minute = now.getMinutes()
  const mins = hour * 60 + minute

  if (day === 0) {
    return { label: s.statusSunday, tone: 'warning', detail: s.statusSundayDetail }
  }

  const openMins = 7 * 60
  const closeMins = 19 * 60
  const isOpen = mins >= openMins && mins < closeMins

  return isOpen
    ? { label: s.statusOpen, tone: 'success', detail: s.statusOpenDetail }
    : { label: s.statusClosed, tone: 'danger', detail: s.statusClosedDetail }
}

export default function ScheduleSection() {
  const { ref, inView } = useInViewOnce()
  const { t } = useLanguage()
  const s = t('schedule')
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const status = useMemo(() => getStatus(now, s), [now, s])

  return (
    <section id="horario" className="section-shell section-muted">
      <Container>
        <SectionHeading
          eyebrow={s.eyebrow}
          title={s.title}
          subtitle={s.subtitle}
          align="center"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={fadeUp}
          className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch"
        >
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 h-full">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="icon-well icon-well-blue">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-600">
                      {s.currentStatus}
                    </div>
                    <div className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                      <span className="relative inline-flex h-2.5 w-2.5">
                        <span
                          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${DOT_TONE[status.tone] ?? 'bg-slate-400'} animate-ping`}
                        />
                        <span
                          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${DOT_TONE[status.tone] ?? 'bg-slate-400'}`}
                        />
                      </span>
                      {status.label}
                    </div>
                  </div>
                </div>
                <Badge tone={status.tone}>{status.label}</Badge>
              </div>

              <div className="mt-5 text-sm text-slate-600 leading-relaxed">
                {status.detail}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-surface-100 ring-1 ring-surface-200 p-4">
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                    {s.weekdaysLabel}
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-slate-900">
                    {s.weekdaysHours}
                  </div>
                </div>
                <div className="rounded-2xl bg-surface-100 ring-1 ring-surface-200 p-4">
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                    {s.sundayLabel}
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-slate-900">
                    {s.sundayHours}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6 sm:p-8 h-full bg-brand-gradient text-white">
              <div className="text-lg font-extrabold">
                {s.urgentTitle}
              </div>
              <p className="mt-2 text-sm text-white leading-relaxed">
                {s.urgentText}
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-slate-700">
                {s.urgentItems.map((line) => (
                  <li key={line} className="rounded-2xl bg-white ring-1 ring-slate-200 px-4 py-3 shadow-soft">
                    {line}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
