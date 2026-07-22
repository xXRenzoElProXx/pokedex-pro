import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { EvolutionChainLink } from '@/types/pokemon.types'
import { buildPokemonDetailPath } from '@/routes/paths'
import { extractIdFromUrl } from '@/utils/formatters'

interface EvolutionChainProps {
  chain: EvolutionChainLink
  currentName: string
}

function artworkFor(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

/** La cadena de la API es un árbol (algunos Pokémon, como Eevee, se ramifican
 *  en varias evoluciones). La aplanamos por niveles para poder pintarla como
 *  filas: nivel 0, flecha, nivel 1, flecha, nivel 2… */
function chainToLevels(chain: EvolutionChainLink): EvolutionChainLink[][] {
  const levels: EvolutionChainLink[][] = []
  let current = [chain]
  while (current.length > 0) {
    levels.push(current)
    current = current.flatMap((link) => link.evolves_to)
  }
  return levels
}

export function EvolutionChain({ chain, currentName }: EvolutionChainProps) {
  const levels = chainToLevels(chain)

  if (levels.length <= 1) {
    return <p className="text-sm dark:text-white/60 light:text-ink-600">Este Pokémon no evoluciona.</p>
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {levels.map((level, levelIndex) => (
        <div key={levelIndex} className="flex items-center gap-2">
          {levelIndex > 0 && (
            <ChevronRight size={18} className="shrink-0 dark:text-white/30 light:text-ink-400" aria-hidden />
          )}

          <div className="flex flex-wrap gap-2">
            {level.map((link) => {
              const id = extractIdFromUrl(link.species.url)
              const isCurrent = link.species.name === currentName

              return (
                <Link
                  key={link.species.name}
                  to={buildPokemonDetailPath(link.species.name)}
                  className={`glass-inset flex w-24 cursor-pointer flex-col items-center gap-1 rounded-2xl p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400/30 ${
                    isCurrent ? 'ring-1 ring-orange-400/60' : ''
                  }`}
                >
                  <img
                    src={artworkFor(id)}
                    alt={link.species.name}
                    loading="lazy"
                    className="h-16 w-16 object-contain"
                  />
                  <span className="text-center text-xs font-medium capitalize dark:text-white/80 light:text-ink-800">
                    {link.species.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
