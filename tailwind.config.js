/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#202B8F',
          blue2: '#3F4FC2',
          green: '#0A7A3D',
        },
        surface: {
          50: '#f7f8fc',
          100: '#eef1f8',
          200: '#d8dff0',
        },
      },
      boxShadow: {
        soft: '0 10px 28px rgba(18, 34, 92, 0.08)',
        card: '0 18px 46px rgba(17, 28, 82, 0.14)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #202B8F 0%, #3F4FC2 55%, #0A7A3D 125%)',
      },
    },
  },
  plugins: [],
}
