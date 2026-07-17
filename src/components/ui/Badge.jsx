const tones = {
  success: 'bg-brand-green/10 text-brand-green ring-brand-green/25 dark:bg-brand-green/15',
  danger: 'bg-rose-50 text-rose-800 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30',
  warning: 'bg-amber-50 text-amber-900 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30',
  info: 'bg-brand-blue/10 text-brand-blue ring-brand-blue/20 dark:text-blue-300',
  neutral: 'bg-slate-50 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
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
