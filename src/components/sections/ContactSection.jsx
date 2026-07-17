import { useState } from 'react'
import Swal from 'sweetalert2'
import { Clock3, Mail, MessageCircle, Phone } from 'lucide-react'
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

  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero solicitar información.',
  )}`

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
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
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700">
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
              <div className="text-base font-extrabold text-slate-900">{c.directTitle}</div>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-blue2" />
                  <a href={`tel:${SITE.phoneTel}`} className="hover:text-slate-900">
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-blue2" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-slate-900">
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

            <Card className="p-6 sm:p-8 bg-surface-50" hover={false}>
              <div className="flex items-center gap-3">
                <div className="icon-well icon-well-green">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{c.hoursTitle}</div>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    {SITE.hours.weekdays}
                    <br />
                    {SITE.hours.sunday}
                  </p>
                </div>
              </div>
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
      <label htmlFor={props.name} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input id={props.name} required {...props} className="field-input" />
    </div>
  )
}
