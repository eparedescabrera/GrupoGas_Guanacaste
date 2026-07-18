import { motion } from 'framer-motion'
import { Loader2, MapPin, Wind } from 'lucide-react'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'
import { useWeather } from '../../hooks/useWeather.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { getWeatherInfo } from '../../lib/weatherCodes.js'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion.js'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const WEEKDAYS = {
  es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

function dayLabel(dateStr, lang, isToday) {
  if (isToday) return lang === 'en' ? 'Today' : 'Hoy'
  const date = new Date(`${dateStr}T00:00:00`)
  return WEEKDAYS[lang]?.[date.getDay()] ?? WEEKDAYS.es[date.getDay()]
}

export default function WeatherSection({ showHeading = true }) {
  const { ref, inView } = useInViewOnce()
  const { t, lang } = useLanguage()
  const w = t('weather')
  const { loading, error, current, daily } = useWeather()

  return (
    <section id="clima" className="section-shell section-panel">
      <Container>
        {showHeading ? (
          <SectionHeading eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} align="center" />
        ) : null}

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={fadeUp}
          className={`${showHeading ? 'mt-10' : ''} grid gap-6 lg:grid-cols-12 lg:items-stretch`}
        >
          <div className="lg:col-span-5">
            <Card className="flex h-full flex-col p-6 sm:p-8 bg-brand-gradient text-white" hover={false}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/75">
                <MapPin className="h-3.5 w-3.5" />
                {w.location}
              </div>

              {loading ? (
                <div className="mt-6 flex flex-1 items-center gap-2 text-white/80">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {w.loading}
                </div>
              ) : error || !current ? (
                <p className="mt-6 flex-1 text-sm text-white/85">{w.error}</p>
              ) : (
                <div className="mt-4 flex flex-1 items-center gap-5">
                  {(() => {
                    const { Icon, label } = getWeatherInfo(current.code, lang)
                    return (
                      <>
                        <Icon className="h-16 w-16 shrink-0 drop-shadow-lg" strokeWidth={1.75} />
                        <div>
                          <div className="text-5xl font-extrabold leading-none">{current.temperature}°C</div>
                          <div className="mt-2 text-sm font-semibold text-white/90">{label}</div>
                          <div className="mt-1 flex items-center gap-1.5 text-xs text-white/75">
                            <Wind className="h-3.5 w-3.5" />
                            {w.wind} {current.windspeed} km/h
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-7">
            <Card className="h-full p-6 sm:p-8" hover={false}>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">{w.forecastTitle}</div>

              {loading ? (
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {w.loading}
                </div>
              ) : error || !daily?.length ? (
                <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">{w.error}</p>
              ) : (
                <motion.div
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  variants={staggerContainer(0.08, 0.1)}
                  className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5"
                >
                  {daily.map((day, i) => {
                    const { Icon, label } = getWeatherInfo(day.code, lang)
                    return (
                      <motion.div
                        key={day.date}
                        variants={staggerItem}
                        className="flex flex-col items-center gap-2 rounded-2xl bg-surface-100 px-2 py-4 text-center ring-1 ring-surface-200 dark:bg-slate-800 dark:ring-slate-700"
                      >
                        <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          {dayLabel(day.date, lang, i === 0)}
                        </div>
                        <Icon className="h-7 w-7 text-brand-blue2 dark:text-blue-300" strokeWidth={1.75} />
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white">{day.max}°</div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{day.min}°</div>
                        <div className="hidden text-[10px] leading-tight text-slate-500 dark:text-slate-400 sm:block">
                          {label}
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">{w.source}</p>
            </Card>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
