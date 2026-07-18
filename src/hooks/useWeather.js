import { useEffect, useState } from 'react'

const LAT = 9.9969457
const LON = -85.2496536
const ENDPOINT = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=5`

export function useWeather() {
  const [state, setState] = useState({ loading: true, error: null, current: null, daily: null })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(ENDPOINT)
        if (!res.ok) throw new Error('weather request failed')
        const data = await res.json()
        if (cancelled) return

        const daily = data.daily?.time?.map((date, i) => ({
          date,
          max: Math.round(data.daily.temperature_2m_max[i]),
          min: Math.round(data.daily.temperature_2m_min[i]),
          code: data.daily.weathercode[i],
        }))

        setState({
          loading: false,
          error: null,
          current: data.current_weather
            ? {
                temperature: Math.round(data.current_weather.temperature),
                windspeed: Math.round(data.current_weather.windspeed),
                code: data.current_weather.weathercode,
              }
            : null,
          daily,
        })
      } catch (err) {
        if (!cancelled) setState({ loading: false, error: err, current: null, daily: null })
      }
    }

    load()
    const id = window.setInterval(load, 15 * 60 * 1000)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [])

  return state
}
