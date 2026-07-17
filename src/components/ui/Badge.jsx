const tones = {
  success: 'bg-brand-green/10 text-brand-green ring-brand-green/25',
  danger: 'bg-rose-50 text-rose-800 ring-rose-200',
  warning: 'bg-amber-50 text-amber-900 ring-amber-200',
  info: 'bg-brand-blue/10 text-brand-blue ring-brand-blue/20',
  neutral: 'bg-slate-50 text-slate-700 ring-slate-200',
}

export default function Badge({ tone = 'neutral', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide ring-1 ${tones[tone] ?? tones.neutral} ${className}`}
    >
      {children}
    </span>
  )
}
