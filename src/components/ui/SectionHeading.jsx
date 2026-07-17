export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}) {
  const isCenter = align === 'center'
  return (
    <div className={isCenter ? 'text-center' : 'text-left'}>
      {eyebrow ? (
        <div className="inline-flex items-center rounded-full bg-brand-green/10 px-3.5 py-1 text-xs font-extrabold tracking-[0.14em] text-brand-green uppercase ring-1 ring-brand-green/20 dark:bg-brand-green/15">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.15] dark:text-white">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-slate-600 leading-relaxed text-base sm:text-lg max-w-2xl dark:text-slate-400 ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
