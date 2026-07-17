import product20 from '../assets/producto-20lb-pro.png'
import product25 from '../assets/producto-25lb-pro.png'
import product30 from '../assets/producto-30lb-pro.png'
import product35 from '../assets/producto-35lb-pro.png'
import product100 from '../assets/producto-100lb-pro.png'

export const PRODUCTS = [
  {
    id: '20lb',
    name: 'Cilindro de 20 libras',
    capacity: '20 lb',
    description: 'El más popular para hogares. Fácil de transportar y recargar.',
    image: product20,
    scale: 0.8,
    usage: 'Hogar',
  },
  {
    id: '25lb',
    name: 'Cilindro de 25 libras',
    capacity: '25 lb',
    description: 'Mayor autonomía para familias y comercios pequeños.',
    image: product25,
    scale: 0.88,
    usage: 'Hogar / Comercio',
  },
  {
    id: '30lb',
    name: 'Cilindro de 30 libras',
    capacity: '30 lb',
    description: 'Ideal para negocios con consumo frecuente de gas.',
    image: product30,
    scale: 0.94,
    usage: 'Comercio',
  },
  {
    id: '35lb',
    name: 'Cilindro de 35 libras',
    capacity: '35 lb',
    description: 'Capacidad intermedia para restaurantes y talleres.',
    image: product35,
    scale: 1,
    usage: 'Comercio',
  },
  {
    id: '100lb',
    name: 'Cilindro de 100 libras',
    capacity: '100 lb',
    description: 'Solución industrial para hoteles, restaurantes y empresas.',
    image: product100,
    scale: 1.14,
    usage: 'Industrial',
  },
]
