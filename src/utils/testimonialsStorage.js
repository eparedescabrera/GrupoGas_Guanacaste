import { TESTIMONIALS as SEED_TESTIMONIALS } from '../data/testimonials.js'

const STORAGE_KEY = 'gng-testimonials-v1'

function isValidTestimonial(item) {
  return (
    item &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.role === 'string' &&
    typeof item.quote === 'string'
  )
}

export function loadStoredTestimonials() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isValidTestimonial)
  } catch {
    return []
  }
}

export function saveStoredTestimonials(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function initTestimonialsStorage(seedItems = SEED_TESTIMONIALS) {
  const stored = loadStoredTestimonials()

  if (stored.length === 0) {
    saveStoredTestimonials(seedItems)
    return seedItems
  }

  const storedIds = new Set(stored.map((t) => t.id))
  const missingSeed = seedItems.filter((t) => !storedIds.has(t.id))

  if (missingSeed.length > 0) {
    const merged = [...stored, ...missingSeed]
    saveStoredTestimonials(merged)
    return merged
  }

  return stored
}

export function addStoredTestimonial(testimonial) {
  const items = loadStoredTestimonials()
  const next = [testimonial, ...items.filter((t) => t.id !== testimonial.id)]
  saveStoredTestimonials(next)
  return next
}

export function getAllTestimonials() {
  return initTestimonialsStorage()
}

export function readTestimonialsFromStorage() {
  return loadStoredTestimonials()
}
