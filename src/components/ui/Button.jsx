import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue2 focus-visible:ring-offset-2 ring-offset-white disabled:opacity-60 disabled:pointer-events-none'

const variants = {
  primary:
    'bg-brand-blue text-white shadow-soft hover:bg-brand-blue2 hover:-translate-y-0.5 hover:shadow-card active:translate-y-[1px]',
  secondary:
    'bg-white text-slate-900 shadow-soft ring-1 ring-slate-200 hover:ring-slate-300 hover:bg-slate-50 hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-slate-900 hover:bg-slate-100 ring-1 ring-transparent hover:ring-slate-200',
  inverse:
    'bg-white text-brand-blue shadow-soft hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-card active:translate-y-[1px]',
  whatsapp:
    'bg-brand-green text-white shadow-soft hover:brightness-110 hover:-translate-y-0.5 hover:shadow-card active:translate-y-[1px]',
}

export default function Button({
  as = 'button',
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`

  if (as === 'link' && to)
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  if (as === 'a' && href)
    return (
      <a className={cls} href={href} {...props}>
        {children}
      </a>
    )

  return (
    <button className={cls} type="button" {...props}>
      {children}
    </button>
  )
}
