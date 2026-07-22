import { useCallback, useState } from 'react'
import { SearchX } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SearchBar } from '@/components/common/SearchBar'
import { TypeFilter } from '@/components/common/TypeFilter'
import { GenerationFilter } from '@/components/common/GenerationFilter'
import { EmptyState } from '@/components/common/EmptyState'
import { PokemonCard } from '@/components/pokemon/PokemonCard'
import { PokemonCardSkeleton } from '@/components/pokemon/PokemonCardSkeleton'
import { useDebounce } from '@/hooks/useDebounce'
import { useInfiniteScrollTrigger } from '@/hooks/useInfiniteScrollTrigger'
import { usePokemonExplorer } from '@/hooks/usePokemonExplorer'

const CARD_GRID = 'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'

export function HomePage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState<string | null>(null)
  const [generation, setGeneration] = useState<string | null>(null)
  const debouncedSearch = useDebounce(search, 300)

  const { items, total, hasMore, loadMore, isLoading, isError } = usePokemonExplorer(
    debouncedSearch,
    type,
    generation,
  )

  const onIntersect = useCallback(() => {
    if (hasMore) loadMore()
  }, [hasMore, loadMore])

  const sentinelRef = useInfiniteScrollTrigger(onIntersect, hasMore && !isLoading)

  return (
    <Container className="py-10">
      <p className="font-mono text-xs uppercase tracking-widest dark:text-ink-500 light:text-ink-600">
        Pokédex Nacional
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight dark:text-ink-50 light:text-ink-900 sm:text-4xl">
        Explora la Pokédex
      </h1>
      <p className="mt-3 max-w-xl text-sm dark:text-ink-400 light:text-ink-600">
        {!isLoading && total > 0
          ? `${total} Pokémon encontrados.`
          : 'Busca por nombre o filtra por tipo y generación.'}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="sm:w-72">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="min-w-0 flex-1">
          <TypeFilter value={type} onChange={setType} />
        </div>
      </div>

      <div className="mt-3">
        <GenerationFilter value={generation} onChange={setGeneration} />
      </div>

      <div className="mt-8">
        {isError && (
          <EmptyState
            icon={<SearchX size={26} />}
            title="Algo salió mal"
            description="No pudimos cargar los Pokémon. Intenta de nuevo en unos segundos."
          />
        )}

        {!isError && isLoading && (
          <div className={CARD_GRID}>
            {Array.from({ length: 10 }).map((_, index) => (
              <PokemonCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isError && !isLoading && items.length === 0 && (
          <EmptyState
            icon={<SearchX size={26} />}
            title="Sin resultados"
            description="No encontramos ningún Pokémon que coincida con tu búsqueda o filtro."
          />
        )}

        {!isError && !isLoading && items.length > 0 && (
          <>
            <div className={CARD_GRID}>
              {items.map((item) => (
                <PokemonCard key={item.name} name={item.name} />
              ))}
            </div>

            {hasMore && (
              <div ref={sentinelRef} className="flex justify-center py-10">
                <div
                  className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent
                    dark:border-ink-700 dark:border-t-scarlet-500 light:border-ink-200 light:border-t-scarlet-500"
                  role="status"
                  aria-label="Cargando más Pokémon"
                />
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  )
}
