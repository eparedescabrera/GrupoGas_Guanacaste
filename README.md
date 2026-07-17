# GRUPO GAS GUANACASTE SRL - Sitio Web Corporativo

Sitio web profesional desarrollado con **React + Vite + Tailwind CSS**, orientado a ventas y atención rápida para una empresa de distribución y venta de gas.

## Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Lucide React
- SweetAlert2
- React Helmet Async (SEO básico)

## Instalación

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

```text
src/
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── pages/
├── assets/
├── hooks/
├── data/
├── routes/
├── styles/
├── App.jsx
└── main.jsx
```

## Configuración de FormSubmit

1. Abre `src/data/site.js`.
2. Reemplaza en `formSubmit.endpoint` el valor `TU_CORREO_AQUI` por tu correo:

```js
formSubmit: {
  endpoint: 'https://formsubmit.co/ajax/tu_correo@dominio.com',
}
```

3. Haz un envío de prueba desde el formulario para activar tu cuenta de FormSubmit.

## Personalización rápida

- **Teléfono / WhatsApp / correo / dirección**: `src/data/site.js`
- **Productos**: `src/data/products.js`
- **Servicios**: `src/data/services.js`
- **Testimonios**: `src/data/testimonials.js`

