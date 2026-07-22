import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByName } from '@/api/pokemon.api'
import { buildPokemonDetailPath } from '@/routes/paths'
import { formatDexNumber } from '@/utils/formatters'
import { TypeBadge } from './TypeBadge'
import { FavoriteButton } from './FavoriteButton'
import { PokemonCardSkeleton } from './PokemonCardSkeleton'

interface PokemonCardProps {
  name: string
}

/** Memoizado: en HomePage, cada `loadMore()` del scroll infinito crea un
 *  nuevo array `items` y re-renderiza el listado completo aunque solo se
 *  hayan agregado tarjetas nuevas. Como `name` es la única prop y es un
 *  primitivo, la comparación superficial de React.memo evita re-renderizar
 *  las tarjetas ya montadas cuyo nombre no cambió. */
function PokemonCardComponent({ name }: PokemonCardProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name),
    staleTime: 10 * 60 * 1000,
  })

  if (isLoading || !data) return <PokemonCardSkeleton />
  if (isError) return null

  const artwork =
    data.sprites.other?.['official-artwork']?.front_default ?? data.sprites.front_default

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <FavoriteButton name={data.name} className="absolute right-3 top-3 z-10" />

      <Link
        to={buildPokemonDetailPath(data.name)}
        className="glass group relative flex cursor-pointer flex-col rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:border-red-400/30"
      >
        <span className="font-mono text-xs dark:text-ink-500 light:text-ink-600">
          {formatDexNumber(data.id)}
        </span>

        <div className="mx-auto flex aspect-square w-full max-w-28 items-center justify-center">
          {artwork ? (
            <img
              src={artwork}
              alt={data.name}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full rounded-full dark:bg-ink-800 light:bg-ink-100" />
          )}
        </div>

        <h3 className="mt-1 text-center font-display text-base font-semibold capitalize dark:text-ink-50 light:text-ink-900">
          {data.name}
        </h3>

        <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
          {data.types.map((slot) => (
            <TypeBadge key={slot.type.name} type={slot.type.name} />
          ))}
        </div>
      </Link>
    </motion.div>
  )
}

export const PokemonCard = memo(PokemonCardComponent)
