import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSun, Sun } from 'lucide-react'

const LABELS = {
  es: {
    clear: 'Despejado',
    mostlyClear: 'Mayormente despejado',
    partlyCloudy: 'Parcialmente nublado',
    overcast: 'Nublado',
    fog: 'Neblina',
    drizzle: 'Llovizna',
    rain: 'Lluvia',
    showers: 'Aguaceros',
    thunderstorm: 'Tormenta eléctrica',
  },
  en: {
    clear: 'Clear sky',
    mostlyClear: 'Mostly clear',
    partlyCloudy: 'Partly cloudy',
    overcast: 'Overcast',
    fog: 'Fog',
    drizzle: 'Drizzle',
    rain: 'Rain',
    showers: 'Showers',
    thunderstorm: 'Thunderstorm',
  },
}

function pick(code) {
  if (code === 0) return { icon: Sun, key: 'clear' }
  if (code === 1) return { icon: Sun, key: 'mostlyClear' }
  if (code === 2) return { icon: CloudSun, key: 'partlyCloudy' }
  if (code === 3) return { icon: Cloud, key: 'overcast' }
  if (code === 45 || code === 48) return { icon: CloudFog, key: 'fog' }
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: CloudDrizzle, key: 'drizzle' }
  if ([61, 63, 65, 66, 67].includes(code)) return { icon: CloudRain, key: 'rain' }
  if ([80, 81, 82].includes(code)) return { icon: CloudRain, key: 'showers' }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: CloudRain, key: 'showers' }
  if ([95, 96, 99].includes(code)) return { icon: CloudLightning, key: 'thunderstorm' }
  return { icon: Cloud, key: 'overcast' }
}

export function getWeatherInfo(code, lang = 'es') {
  const { icon, key } = pick(code)
  const labels = LABELS[lang] ?? LABELS.es
  return { Icon: icon, label: labels[key] ?? labels.overcast }
}
