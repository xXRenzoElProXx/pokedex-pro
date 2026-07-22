export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

export type PokemonTypeName = (typeof POKEMON_TYPES)[number]

/** Spanish display labels — the API itself always speaks English type slugs. */
export const TYPE_LABELS_ES: Record<PokemonTypeName, string> = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
}

/** Universal per-type colors, independent of the app's red/orange brand accent —
 *  same rationale as a semantic status color: recognizability beats brand consistency here. */
export const TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: '#9A9C7F',
  fire: '#F0801E',
  water: '#4A90D9',
  electric: '#E8C620',
  grass: '#5AA347',
  ice: '#6FCEC0',
  fighting: '#C3405A',
  poison: '#A25FC0',
  ground: '#D2792F',
  flying: '#8FA7E8',
  psychic: '#EC6E88',
  bug: '#8FA82A',
  rock: '#B4A24A',
  ghost: '#5A5FA8',
  dragon: '#5B60E0',
  dark: '#5C5568',
  steel: '#6E9199',
  fairy: '#E794D8',
}

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type as PokemonTypeName] ?? '#7d8195'
}

export function getTypeLabel(type: string): string {
  return TYPE_LABELS_ES[type as PokemonTypeName] ?? type
}
