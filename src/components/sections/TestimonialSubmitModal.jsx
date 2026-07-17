import { useEffect, useId, useState } from 'react'
import Swal from 'sweetalert2'
import { MessageSquarePlus, X } from 'lucide-react'
import { SITE } from '../../data/site.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { readTestimonialsFromStorage } from '../../utils/testimonialsStorage.js'
import Button from '../ui/Button.jsx'

const INITIAL = { name: '', role: 'Cliente residencial', quote: '' }

export default function TestimonialSubmitModal({ open, onClose, onSubmit }) {
  const titleId = useId()
  const { t } = useLanguage()
  const m = t('testimonialModal')
  const [form, setForm] = useState(INITIAL)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.name.trim() || !form.quote.trim()) {
      await Swal.fire({
        icon: 'warning',
        title: m.alerts.incompleteTitle,
        text: m.alerts.incompleteText,
        confirmButtonColor: '#202B8F',
      })
      return
    }

    if (form.quote.trim().length < 20) {
      await Swal.fire({
        icon: 'warning',
        title: m.alerts.shortTitle,
        text: m.alerts.shortText,
        confirmButtonColor: '#202B8F',
      })
      return
    }

    try {
      setSubmitting(true)
      const testimonial = onSubmit(form)

      if (!readTestimonialsFromStorage().some((item) => item.id === testimonial.id)) {
        throw new Error('No se guardó en localStorage')
      }

      await fetch(SITE.formSubmit.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'Nuevo testimonio - GNG GAS EXPRESS',
          _template: 'table',
          Nombre: testimonial.name,
          Perfil: testimonial.role,
          Testimonio: testimonial.quote,
        }),
      }).catch(() => null)

      setForm(INITIAL)
      onClose()
      await Swal.fire({
        icon: 'success',
        title: m.alerts.successTitle,
        text: m.alerts.successText,
        confirmButtonColor: '#0A7A3D',
      })
    } catch {
      await Swal.fire({
        icon: 'error',
        title: m.alerts.errorTitle,
        text: m.alerts.errorText,
        confirmButtonColor: '#202B8F',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-card ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-bold text-brand-green ring-1 ring-brand-green/20 dark:bg-brand-green/15">
              <MessageSquarePlus className="h-3.5 w-3.5" />
              {m.kicker}
            </div>
            <h3 id={titleId} className="mt-3 text-xl font-extrabold text-slate-900 dark:text-white">
              {m.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {m.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:ring-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label={m.close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="grid gap-4 px-6 py-5" onSubmit={handleSubmit} noValidate>
          <Field
            label={m.nameLabel}
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder={m.namePlaceholder}
          />

          <div>
            <label htmlFor="role" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {m.roleLabel}
            </label>
            <select
              id="role"
              name="role"
              value={m.roles.includes(form.role) ? form.role : m.roles[0]}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {m.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quote" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {m.quoteLabel}
            </label>
            <textarea
              id="quote"
              name="quote"
              rows={4}
              value={form.quote}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder={m.quotePlaceholder}
              required
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" onClick={onClose}>
              {m.cancel}
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? m.submitting : m.submit}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label htmlFor={props.name} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id={props.name}
        required
        {...props}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
  )
}
