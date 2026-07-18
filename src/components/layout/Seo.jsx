import { Helmet } from 'react-helmet-async'
import { SITE } from '../../data/site.js'

export default function Seo({ title, description, path = '/', image = '/og-image.png' }) {
  const url = `${SITE.url}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE.url}${image}`

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}
