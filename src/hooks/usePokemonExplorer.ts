import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  fetchAllPokemonNames,
  fetchPokemonByGeneration,
  fetchPokemonByType,
} from '@/api/pokemon.api'
import type { NamedApiResource } from '@/types/pokemon.types'

const PAGE_SIZE = 24

/**
 * Drives the Home listing: resolves a source list (the full national index,
 * a /type/{type} lookup, a /generation/{gen} lookup, or the intersection of
 * type + generation when both are active), applies the name search on top,
 * and exposes a growing "visible window" for infinite scroll.
 *
 * Filtering client-side (instead of paginating search results server-side)
 * is a deliberate tradeoff: the PokéAPI has no name-search endpoint, and the
 * full name index is small enough (~1300 entries, name + url only) to cache
 * once and slice locally — for any search/type/generation combination, instantly.
 */
export function usePokemonExplorer(
  search: string,
  type: string | null,
  generation: string | null = null,
) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Reset the visible window when the filters change. Adjusting state during
  // render (rather than in a useEffect) avoids an extra cascading render —
  // see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevFilters, setPrevFilters] = useState({ search, type, generation })
  if (
    prevFilters.search !== search ||
    prevFilters.type !== type ||
    prevFilters.generation !== generation
  ) {
    setPrevFilters({ search, type, generation })
    setVisibleCount(PAGE_SIZE)
  }

  // gcTime a Infinity en estas tres: con staleTime también Infinity, la
  // intención es cachear estos índices una sola vez por sesión. Sin gcTime,
  // el default de 5 min los saca de caché en cuanto no tienen observadores
  // (p. ej. navegando varias fichas de detalle), forzando releer los ~1300
  // nombres completos al volver al listado.
  const allNamesQuery = useQuery({
    queryKey: ['pokemon-names-all'],
    queryFn: fetchAllPokemonNames,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !type && !generation,
  })

  const typeQuery = useQuery({
    queryKey: ['pokemon-by-type', type],
    queryFn: () => fetchPokemonByType(type as string),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: Boolean(type),
  })

  const generationQuery = useQuery({
    queryKey: ['pokemon-by-generation', generation],
    queryFn: () => fetchPokemonByGeneration(generation as string),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: Boolean(generation),
  })

  // Cuando tipo y generación están activos a la vez, se cruzan por nombre:
  // el resultado son los Pokémon que aparecen en ambas listas.
  const sourceList = useMemo((): NamedApiResource[] | undefined => {
    if (type && generation) {
      if (!typeQuery.data || !generationQuery.data) return undefined
      const generationNames = new Set(generationQuery.data.map((item) => item.name))
      return typeQuery.data.filter((item) => generationNames.has(item.name))
    }
    if (type) return typeQuery.data
    if (generation) return generationQuery.data
    return allNamesQuery.data
  }, [type, generation, typeQuery.data, generationQuery.data, allNamesQuery.data])

  const filtered = useMemo(() => {
    if (!sourceList) return []
    const term = search.trim().toLowerCase()
    if (!term) return sourceList
    return sourceList.filter((item) => item.name.includes(term))
  }, [sourceList, search])

  const items = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const isLoading = type
    ? generation
      ? typeQuery.isLoading || generationQuery.isLoading
      : typeQuery.isLoading
    : generation
      ? generationQuery.isLoading
      : allNamesQuery.isLoading

  const isError = type
    ? generation
      ? typeQuery.isError || generationQuery.isError
      : typeQuery.isError
    : generation
      ? generationQuery.isError
      : allNamesQuery.isError

  return {
    items,
    total: filtered.length,
    hasMore,
    loadMore: () =>
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length)),
    isLoading,
    isError,
  }
}
