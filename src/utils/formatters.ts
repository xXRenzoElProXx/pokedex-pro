export function formatDexNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`
}

export function capitalize(text: string): string {
  return text.length === 0 ? text : text.charAt(0).toUpperCase() + text.slice(1)
}

/** Las URLs de recursos de la PokéAPI terminan en `/{id}/`; de ahí sacamos el id
 *  sin tener que hacer una petición extra (por ejemplo, para armar el artwork). */
export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? Number(match[1]) : 0
}

/** PokéAPI reports height in decimeters and weight in hectograms. */
export function formatHeight(heightDm: number): string {
  return `${(heightDm / 10).toFixed(1)} m`
}

export function formatWeight(weightHg: number): string {
  return `${(weightHg / 10).toFixed(1)} kg`
}
