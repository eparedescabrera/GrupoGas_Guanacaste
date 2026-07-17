import logoGng from '../../assets/logo-gng.png'

export default function Logo({ className = '', imgClassName = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoGng}
        alt="Logo GNG Gas Express"
        className={`h-12 w-auto rounded-lg object-contain sm:h-14 ${imgClassName}`}
      />
    </div>
  )
}
