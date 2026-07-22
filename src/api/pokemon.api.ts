import { apiClient } from './client'
import type {
  EvolutionChainResponse,
  GenerationListResponse,
  GenerationResponse,
  NamedApiResource,
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  PokemonTypeResponse,
} from '@/types/pokemon.types'

/** PokeAPI currently lists ~1300 Pokémon; a single request with a high limit
 *  fetches the full name/url index once so search can filter client-side
 *  without hitting the network on every keystroke. */
const FULL_LIST_LIMIT = 2000

export async function fetchAllPokemonNames(): Promise<NamedApiResource[]> {
  const { data } = await apiClient.get<PokemonListResponse>('/pokemon', {
    params: { limit: FULL_LIST_LIMIT, offset: 0 },
  })
  return data.results
}

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const { data } = await apiClient.get<Pokemon>(`/pokemon/${name}`)
  return data
}

export async function fetchPokemonByType(type: string): Promise<NamedApiResource[]> {
  const { data } = await apiClient.get<PokemonTypeResponse>(`/type/${type}`)
  return data.pokemon.map((entry) => entry.pokemon)
}

/** Lista completa de generaciones (actualmente 9), consultada a la API en vez
 *  de codificarse a mano: si PokeAPI agrega una nueva generación, aparece sola. */
export async function fetchAllGenerations(): Promise<NamedApiResource[]> {
  const { data } = await apiClient.get<GenerationListResponse>('/generation')
  return data.results
}

export async function fetchPokemonByGeneration(generation: string): Promise<NamedApiResource[]> {
  const { data } = await apiClient.get<GenerationResponse>(`/generation/${generation}`)
  return data.pokemon_species
}

export async function fetchPokemonSpecies(name: string): Promise<PokemonSpecies> {
  const { data } = await apiClient.get<PokemonSpecies>(`/pokemon-species/${name}`)
  return data
}

/** `url` llega completa desde `species.evolution_chain.url`; Axios respeta una
 *  URL absoluta y omite el `baseURL`, así que se puede pasar tal cual. */
export async function fetchEvolutionChain(url: string): Promise<EvolutionChainResponse> {
  const { data } = await apiClient.get<EvolutionChainResponse>(url)
  return data
}
