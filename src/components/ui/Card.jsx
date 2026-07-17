export default function Card({ className = '', hover = true, children }) {
  return (
    <div
      className={`group rounded-2xl border border-slate-200/90 bg-white shadow-soft ring-1 ring-slate-100/80 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:ring-slate-800/80 ${
        hover
          ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-slate-300/80 dark:hover:border-slate-700'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
