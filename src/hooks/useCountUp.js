import { useEffect, useState } from 'react'

export function useCountUp(target, { start = false, duration = 1400 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return undefined

    let frame
    const startTime = performance.now()
    const from = 0

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target, duration])

  return value
}
