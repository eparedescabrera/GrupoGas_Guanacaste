import { useCallback, useEffect, useState } from 'react'
import {
  addStoredTestimonial,
  getAllTestimonials,
} from '../utils/testimonialsStorage.js'

export function useTestimonials() {
  const [items, setItems] = useState(() => getAllTestimonials())

  useEffect(() => {
    setItems(getAllTestimonials())
  }, [])

  useEffect(() => {
    function sync() {
      setItems(getAllTestimonials())
    }

    window.addEventListener('storage', sync)
    window.addEventListener('gng:testimonials-updated', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('gng:testimonials-updated', sync)
    }
  }, [])

  const addTestimonial = useCallback((payload) => {
    const testimonial = {
      id: `user-${Date.now()}`,
      name: payload.name.trim(),
      role: payload.role.trim(),
      quote: payload.quote.trim(),
      createdAt: new Date().toISOString(),
    }

    const next = addStoredTestimonial(testimonial)
    setItems([...next])
    window.dispatchEvent(new Event('gng:testimonials-updated'))
    return testimonial
  }, [])

  return { testimonials: items, addTestimonial }
}
