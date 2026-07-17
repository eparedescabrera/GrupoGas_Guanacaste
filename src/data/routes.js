import rutaCobano from '../assets/ruta-cobano.jpg'
import rutaNicoya from '../assets/ruta-nicoya.jpg'
import rutaCilindros from '../assets/ruta-cilindros.png'

import cobanoGaleria01 from '../assets/gallery-cobano/cobano-01.png'
import cobanoGaleria02 from '../assets/gallery-cobano/cobano-02.png'
import cobanoGaleria03 from '../assets/gallery-cobano/cobano-03.png'
import cobanoGaleria04 from '../assets/gallery-cobano/cobano-04.png'
import cobanoGaleria05 from '../assets/gallery-cobano/cobano-05.png'
import cobanoGaleria06 from '../assets/gallery-cobano/cobano-06.png'
import cobanoGaleria07 from '../assets/gallery-cobano/cobano-07.png'
import cobanoGaleria08 from '../assets/gallery-cobano/cobano-08.png'
import cobanoGaleria09 from '../assets/gallery-cobano/cobano-09.png'
import cobanoGaleria10 from '../assets/gallery-cobano/cobano-10.png'
import cobanoGaleria11 from '../assets/gallery-cobano/cobano-11.png'
import cobanoGaleria12 from '../assets/gallery-cobano/cobano-12.png'
import cobanoGaleria13 from '../assets/gallery-cobano/cobano-13.png'
import cobanoGaleria14 from '../assets/gallery-cobano/cobano-14.png'
import cobanoGaleria15 from '../assets/gallery-cobano/cobano-15.png'

const COBANO_GALLERY = [
  { src: cobanoGaleria01, alt: 'Monos congo cruzando el camino de tierra en Cóbano' },
  { src: cobanoGaleria02, alt: 'Rótulo de bienvenida en carretera hacia Cóbano' },
  { src: cobanoGaleria03, alt: 'Mono congo en un árbol junto al cableado eléctrico' },
  { src: cobanoGaleria04, alt: 'Rótulo "Yo amo Paquera" en la zona de la península' },
  { src: cobanoGaleria05, alt: 'Calle con locales y restaurantes cerca de la playa' },
  { src: cobanoGaleria06, alt: 'Camión de reparto en la playa de la zona de Cóbano' },
  { src: cobanoGaleria07, alt: 'Vista de la carretera y el Golfo de Nicoya' },
  { src: cobanoGaleria08, alt: 'Supermercado y comercios en Santa Teresa' },
  { src: cobanoGaleria09, alt: 'Rótulo de la Catarata de Montezuma' },
  { src: cobanoGaleria10, alt: 'Piscina infinita con vista al mar en la zona costera' },
  { src: cobanoGaleria11, alt: 'Rótulo de Santa Teresa en el centro comercial' },
  { src: cobanoGaleria12, alt: 'Camión de reparto estacionado frente a la playa' },
  { src: cobanoGaleria13, alt: 'Turistas y bote de pescadores en la playa' },
  { src: cobanoGaleria14, alt: 'Cancha deportiva junto a la playa con palmeras' },
  { src: cobanoGaleria15, alt: 'Costa rocosa con vista al mar al atardecer' },
]

export const DELIVERY_ROUTES = [
  {
    id: 'cobano',
    name: 'Cóbano',
    label: 'Ruta Cóbano',
    region: 'Península de Nicoya · Puntarenas',
    description:
      'Cobertura en Cóbano y comunidades aledañas de la península. Entregas programadas con unidades equipadas para zona costera y rural.',
    schedule: 'Lunes a sábado · 7:00 AM – 7:00 PM',
    highlights: [
      'Entrega en Cóbano centro y zonas cercanas',
      'Atención a comercios y hogares de la península',
      'Coordinación por WhatsApp con horario estimado',
    ],
    mapsQuery: 'Cóbano, Puntarenas, Costa Rica',
    placeImage: rutaCobano,
    placeImageAlt: 'Playa y paisaje costero cerca de la zona de Cóbano, Guanacaste',
    deliveryImage: rutaCilindros,
    deliveryImageAlt: 'Cilindros de gas listos para despacho en ruta Cóbano',
    gallery: COBANO_GALLERY,
  },
  {
    id: 'nicoya',
    name: 'Nicoya',
    label: 'Ruta Nicoya',
    region: 'Cabecera cantonal · Guanacaste',
    description:
      'Servicio de distribución en Nicoya y alrededores. Respuesta ágil para hogares, pulperías, restaurantes y negocios locales.',
    schedule: 'Lunes a sábado · 7:00 AM – 7:00 PM',
    highlights: [
      'Cobertura en Nicoya y sectores urbanos',
      'Ruta frecuente para clientes con pedido recurrente',
      'Emergencias con atención prioritaria 24/7',
    ],
    mapsQuery: 'Nicoya, Guanacaste, Costa Rica',
    placeImage: rutaNicoya,
    placeImageAlt: 'Vista del Golfo de Nicoya desde la zona de Guanacaste',
    deliveryImage: rutaCilindros,
    deliveryImageAlt: 'Cilindros de gas listos para despacho en ruta Nicoya',
  },
]

export function getRouteById(id) {
  return DELIVERY_ROUTES.find((route) => route.id === id) ?? DELIVERY_ROUTES[0]
}
