import { useQuery } from '@tanstack/react-query'
import { fetchAllGenerations } from '@/api/pokemon.api'
import { getGenerationLabel } from '@/utils/pokemonGenerations'

interface GenerationFilterProps {
  value: string | null
  onChange: (generation: string | null) => void
}

export function GenerationFilter({ value, onChange }: GenerationFilterProps) {
  const { data: generations, isLoading, isError } = useQuery({
    queryKey: ['generations-all'],
    queryFn: fetchAllGenerations,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  if (isError) return null

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por generación">
      <button
        type="button"
        onClick={() => onChange(null)}
        aria-pressed={value === null}
        className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
          value === null
            ? 'border-red-400/40 bg-gradient-to-b from-red-500/20 to-orange-500/10 dark:text-white light:text-scarlet-700'
            : 'dark:border-ink-700 dark:text-ink-300 dark:hover:border-ink-600 dark:hover:text-ink-50 light:border-ink-200 light:text-ink-600 light:hover:border-ink-300 light:hover:text-ink-900'
        }`}
      >
        Todas
      </button>

      {isLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="h-[30px] w-20 animate-pulse rounded-full border dark:border-ink-700 dark:bg-ink-800 light:border-ink-200 light:bg-ink-100"
          />
        ))}

      {generations?.map((generation) => {
        const active = value === generation.name
        return (
          <button
            key={generation.name}
            type="button"
            onClick={() => onChange(active ? null : generation.name)}
            aria-pressed={active}
            className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
              active
                ? 'border-red-400/40 bg-gradient-to-b from-red-500/20 to-orange-500/10 dark:text-white light:text-scarlet-700'
                : 'dark:border-ink-700 dark:text-ink-300 dark:hover:border-ink-600 dark:hover:text-ink-50 light:border-ink-200 light:text-ink-600 light:hover:border-ink-300 light:hover:text-ink-900'
            }`}
          >
            {getGenerationLabel(generation.name)}
          </button>
        )
      })}
    </div>
  )
}
