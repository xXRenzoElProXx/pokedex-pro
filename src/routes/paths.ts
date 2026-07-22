export const ROUTES = {
  home: '/',
  favorites: '/favoritos',
  pokemonDetail: '/pokemon/:name',
} as const

export function buildPokemonDetailPath(name: string) {
  return `/pokemon/${name}`
}
