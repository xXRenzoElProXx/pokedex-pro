export interface NamedApiResource {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: NamedApiResource[]
}

export interface PokemonTypeSlot {
  slot: number
  type: NamedApiResource
}

export interface PokemonAbilitySlot {
  ability: NamedApiResource
  is_hidden: boolean
  slot: number
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: NamedApiResource
}

export interface PokemonSprites {
  front_default: string | null
  front_shiny: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
      front_shiny?: string | null
    }
    home?: {
      front_default: string | null
    }
  }
}

export interface PokemonMoveVersionDetail {
  level_learned_at: number
  move_learn_method: NamedApiResource
  version_group: NamedApiResource
}

export interface PokemonMoveSlot {
  move: NamedApiResource
  version_group_details: PokemonMoveVersionDetail[]
}

export interface PokemonCries {
  latest: string | null
  legacy: string | null
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number | null
  sprites: PokemonSprites
  types: PokemonTypeSlot[]
  abilities: PokemonAbilitySlot[]
  stats: PokemonStat[]
  moves: PokemonMoveSlot[]
  cries: PokemonCries
  species: NamedApiResource
}

export interface PokemonTypeEntry {
  pokemon: NamedApiResource
  slot: number
}

export interface PokemonTypeResponse {
  name: string
  pokemon: PokemonTypeEntry[]
}

export interface PokemonSpecies {
  id: number
  name: string
  evolution_chain: { url: string }
}

export interface GenerationListResponse {
  count: number
  results: NamedApiResource[]
}

export interface GenerationResponse {
  name: string
  pokemon_species: NamedApiResource[]
}

export interface EvolutionChainLink {
  species: NamedApiResource
  evolves_to: EvolutionChainLink[]
}

export interface EvolutionChainResponse {
  id: number
  chain: EvolutionChainLink
}
