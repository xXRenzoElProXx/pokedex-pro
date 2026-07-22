/** Slugs de generación tal como los devuelve PokéAPI (`generation-i` … `generation-ix`). */
const GENERATION_LABELS_ES: Record<string, string> = {
  'generation-i': 'Generación I',
  'generation-ii': 'Generación II',
  'generation-iii': 'Generación III',
  'generation-iv': 'Generación IV',
  'generation-v': 'Generación V',
  'generation-vi': 'Generación VI',
  'generation-vii': 'Generación VII',
  'generation-viii': 'Generación VIII',
  'generation-ix': 'Generación IX',
}

/** Si PokéAPI agrega una generación nueva antes de actualizar el mapa de
 *  arriba, se muestra igual (con el numeral romano tal cual viene del slug)
 *  en lugar de desaparecer del filtro. */
export function getGenerationLabel(generation: string): string {
  if (GENERATION_LABELS_ES[generation]) return GENERATION_LABELS_ES[generation]
  const roman = generation.replace('generation-', '').toUpperCase()
  return `Generación ${roman}`
}
