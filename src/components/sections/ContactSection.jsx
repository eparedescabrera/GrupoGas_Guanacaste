import { useState } from 'react'
import Swal from 'sweetalert2'
import { Check, Clock3, Copy, Mail, MessageCircle, Phone, Smartphone } from 'lucide-react'
import { SITE } from '../../data/site.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const INITIAL = { name: '', phone: '', email: '', message: '' }

export default function ContactSection({ showHeading = true }) {
  const { t } = useLanguage()
  const c = t('contact')
  const [form, setForm] = useState(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)

  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero solicitar información.',
  )}`
  const sinpeWaHref = `https://wa.me/${SITE.sinpe.whatsappNumber}?text=${encodeURIComponent(
    'Hola, les envío el comprobante de mi pago por SINPE Móvil.',
  )}`

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function copySinpeNumber() {
    try {
      await navigator.clipboard.writeText(SITE.sinpe.number)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable, ignore silently
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.message.trim()) {
      await Swal.fire({
        icon: 'warning',
        title: c.alerts.incompleteTitle,
        text: c.alerts.incompleteText,
        confirmButtonColor: '#202B8F',
      })
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch(SITE.formSubmit.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Nombre: form.name,
          Telefono: form.phone,
          Correo: form.email,
          Mensaje: form.message,
        }),
      })

      if (!res.ok) throw new Error('No se pudo enviar')
      setForm(INITIAL)
      await Swal.fire({
        icon: 'success',
        title: c.alerts.successTitle,
        text: c.alerts.successText,
        confirmButtonColor: '#0A7A3D',
      })
    } catch {
      await Swal.fire({
        icon: 'error',
        title: c.alerts.errorTitle,
        text: c.alerts.errorText,
        confirmButtonColor: '#202B8F',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="section-shell section-panel">
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow={c.eyebrow}
            title={c.title}
            subtitle={c.subtitle}
            align="center"
          />
        ) : null}

        <div className={`${showHeading ? 'mt-10' : ''} grid gap-6 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8" hover={false}>
              <form className="grid gap-4" onSubmit={onSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label={c.nameLabel}
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder={c.namePlaceholder}
                  />
                  <Field
                    label={c.phoneLabel}
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder={c.phonePlaceholder}
                    inputMode="tel"
                  />
                </div>
                <Field
                  label={c.emailLabel}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder={c.emailPlaceholder}
                />
                <div>
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {c.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    className="field-input"
                    placeholder={c.messagePlaceholder}
                    required
                  />
                </div>
                <Button type="submit" disabled={submitting} className="justify-center">
                  {submitting ? c.sending : c.send}
                </Button>
              </form>
            </Card>
          </div>

          <div className="lg:col-span-5 grid gap-6">
            <Card className="p-6 sm:p-8" hover={false}>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">{c.directTitle}</div>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-blue2" />
                  <a href={`tel:${SITE.phoneTel}`} className="hover:text-slate-900 dark:hover:text-white">
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-blue2" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-slate-900 dark:hover:text-white">
                    {SITE.email}
                  </a>
                </li>
              </ul>
              <Button
                as="a"
                href={waHref}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
                className="mt-5 w-full justify-center"
              >
                <MessageCircle className="h-4 w-4" />
                {c.whatsappCta}
              </Button>
            </Card>

            <Card className="p-6 sm:p-8 bg-surface-50 dark:bg-slate-800/60" hover={false}>
              <div className="flex items-center gap-3">
                <div className="icon-well icon-well-green">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">{c.hoursTitle}</div>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed dark:text-slate-400">
                    {SITE.hours.weekdays}
                    <br />
                    {SITE.hours.sunday}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 bg-brand-gradient text-white" hover={false}>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/30">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold">{c.sinpeTitle}</div>
                  <p className="mt-0.5 text-xs text-white/85 leading-relaxed">{c.sinpeSubtitle}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                      {c.sinpeNumberLabel}
                    </div>
                    <div className="mt-1 text-xl font-extrabold tracking-wide">{SITE.sinpe.number}</div>
                  </div>
                  <button
                    type="button"
                    onClick={copySinpeNumber}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-brand-blue shadow-soft transition hover:brightness-95 active:scale-95"
                    aria-label={c.copy}
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? c.copied : c.copy}
                  </button>
                </div>
                <div className="mt-3 border-t border-white/15 pt-3">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                    {c.sinpeNameLabel}
                  </div>
                  <div className="mt-1 text-sm font-bold">{SITE.sinpe.name}</div>
                </div>
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/90">
                <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {c.sinpeReceiptNote}
              </p>

              <Button
                as="a"
                href={sinpeWaHref}
                target="_blank"
                rel="noreferrer"
                variant="inverse"
                className="mt-4 w-full justify-center"
              >
                <MessageCircle className="h-4 w-4" />
                {c.sinpeSendReceipt}
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label htmlFor={props.name} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input id={props.name} required {...props} className="field-input" />
    </div>
  )
}
