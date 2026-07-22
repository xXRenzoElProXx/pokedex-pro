import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Heart, Ruler, Sparkles, Volume2, VolumeX, Weight } from 'lucide-react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import {
  fetchEvolutionChain,
  fetchPokemonByName,
  fetchPokemonSpecies,
} from '@/api/pokemon.api'
import { StatBar } from '@/components/pokemon/StatBar'
import { EvolutionChain } from '@/components/pokemon/EvolutionChain'
import { ROUTES } from '@/routes/paths'
import { useFavoritesStore } from '@/store/favorites.store'
import { useThemeStore } from '@/store/theme.store'
import type { Pokemon } from '@/types/pokemon.types'
import {
  capitalize,
  formatDexNumber,
  formatHeight,
  formatWeight,
} from '@/utils/formatters'
import { getTypeColor, getTypeLabel } from '@/utils/pokemonTypes'
import { getMovesForLatestVersion } from '@/utils/pokemonMoves'

/** Mismo tope que usa `StatBar` (max=180) para que la escala del radar
 *  coincida con la de las barras individuales. */
const STAT_CHART_MAX = 180

const STAT_LABELS: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Atq. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
}

function getArtwork(pokemon: Pokemon, shiny: boolean): string | null {
  const officialArtwork = pokemon.sprites.other?.['official-artwork']
  if (shiny) {
    return officialArtwork?.front_shiny ?? pokemon.sprites.front_shiny ?? null
  }
  return officialArtwork?.front_default ?? pokemon.sprites.front_default
}

function TypeChip({ type }: { type: string }) {
  const color = getTypeColor(type)
  return (
    <span
      className="animate-char-reveal rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
      style={{
        borderColor: `${color}66`,
        background: `${color}22`,
        color,
        textShadow: '0 1px 2px rgba(0,0,0,0.4)',
      }}
    >
      {getTypeLabel(type)}
    </span>
  )
}

function DetailSkeleton() {
  return (
    <div className="glass animate-fade-in-up mt-8 space-y-5 rounded-3xl p-6">
      <div className="h-3 w-16 animate-pulse rounded-full bg-white/10" />
      <div className="h-9 w-48 animate-pulse rounded-lg bg-white/10" />
      <div className="h-52 w-full animate-pulse rounded-2xl bg-white/10" />
      <div className="h-28 w-full animate-pulse rounded-2xl bg-white/10" />
      <div className="h-40 w-full animate-pulse rounded-2xl bg-white/10" />
    </div>
  )
}

export function PokemonDetailPage() {
  const { name = '' } = useParams<{ name: string }>()
  const [isShiny, setIsShiny] = useState(false)

  useEffect(() => {
    setIsShiny(false)
  }, [name])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name),
    staleTime: 10 * 60 * 1000,
    enabled: Boolean(name),
  })

  const isFavorite = useFavoritesStore((state) =>
    state.favorites.includes(data?.name ?? name),
  )
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  const artwork = data ? getArtwork(data, isShiny) : null

  const {
    data: species,
    isLoading: isSpeciesLoading,
    isError: isSpeciesError,
  } = useQuery({
    queryKey: ['pokemon-species', data?.species.name],
    queryFn: () => fetchPokemonSpecies(data!.species.name),
    staleTime: 10 * 60 * 1000,
    enabled: Boolean(data),
  })

  const {
    data: evolutionChain,
    isLoading: isEvolutionChainLoading,
    isError: isEvolutionChainError,
  } = useQuery({
    queryKey: ['evolution-chain', species?.evolution_chain.url],
    queryFn: () => fetchEvolutionChain(species!.evolution_chain.url),
    staleTime: 10 * 60 * 1000,
    enabled: Boolean(species),
  })

  const isEvolutionLoading = isSpeciesLoading || isEvolutionChainLoading
  const isEvolutionError = isSpeciesError || isEvolutionChainError

  // getMovesForLatestVersion recorre moves x version_group_details y ordena
  // el resultado (costoso para Pokémon con muchos juegos, p. ej. Pikachu).
  // Sin memoizar, se recalculaba en cada render de la página, incluyendo
  // toggles ajenos a los movimientos como isShiny o isCryPlaying.
  const moves = useMemo(() => (data ? getMovesForLatestVersion(data.moves) : []), [data])

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isCryPlaying, setIsCryPlaying] = useState(false)
  const cryUrl = data ? (data.cries.latest ?? data.cries.legacy) : null

  useEffect(() => {
    setIsCryPlaying(false)
  }, [name])

  function handlePlayCry() {
    const audio = audioRef.current
    if (!audio || !cryUrl) return
    audio.currentTime = 0
    // `play()` puede rechazar si el navegador interrumpe una reproducción
    // anterior (doble clic rápido) o bloquea el audio; lo ignoramos para no
    // dejar una promesa sin manejar ni romper la UI.
    audio.play().catch(() => {})
  }

  const statChartData = data
    ? data.stats.map((stat) => ({
        stat: STAT_LABELS[stat.stat.name] ?? capitalize(stat.stat.name),
        value: stat.base_stat,
      }))
    : []

  // Recharts no soporta clases de Tailwind, así que el color del radar se
  // condiciona a mano según el tema activo.
  const theme = useThemeStore((state) => state.theme)
  const gridColor = theme === 'light' ? 'rgba(28,30,39,0.15)' : 'rgba(255,255,255,0.12)'
  const tickColor = theme === 'light' ? 'rgba(28,30,39,0.55)' : 'rgba(255,255,255,0.55)'

  return (
    <div className="py-10">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <Link
          to={ROUTES.home}
          className="animate-fade-in-up inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium dark:text-white/60 dark:hover:text-white light:text-ink-600 light:hover:text-ink-900 transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Volver a la Pokédex
        </Link>

        {isLoading && <DetailSkeleton />}

        {isError && !isLoading && (
          <div className="glass animate-fade-in-up mt-8 rounded-3xl p-8 text-center">
            <p className="text-lg font-bold dark:text-white light:text-ink-900">No encontramos a «{name}»</p>
            <p className="mt-2 text-sm dark:text-white/60 light:text-ink-600">
              Revisa el nombre e inténtalo de nuevo.
            </p>
          </div>
        )}

        {data && (
          <div className="animate-fade-in-up mt-6">
            {/* Encabezado */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-sm font-medium uppercase tracking-wider dark:text-white/55 light:text-ink-600">
                  {formatDexNumber(data.id)}
                </p>
                <h1 className="mt-1 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-3xl font-bold capitalize tracking-tight text-transparent sm:text-4xl">
                  {data.name}
                </h1>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(data.name)}
                aria-pressed={isFavorite}
                aria-label={
                  isFavorite
                    ? `Quitar ${data.name} de favoritos`
                    : `Agregar ${data.name} a favoritos`
                }
                className="glass flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl transition-all duration-200 hover:scale-110"
              >
                <Heart
                  size={18}
                  className={isFavorite ? 'fill-red-500 text-red-500' : 'dark:text-white/55 light:text-ink-500'}
                />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {data.types.map((slot) => (
                <TypeChip key={slot.type.name} type={slot.type.name} />
              ))}
            </div>

            {/* Artwork */}
            <div className="glass relative mt-6 flex items-center justify-center rounded-3xl p-6">
              <button
                type="button"
                onClick={handlePlayCry}
                disabled={!cryUrl}
                aria-label={cryUrl ? `Reproducir grito de ${data.name}` : 'Grito no disponible'}
                title={cryUrl ? 'Reproducir grito' : 'Grito no disponible'}
                className={`glass absolute left-4 top-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-200 ${
                  cryUrl
                    ? 'cursor-pointer hover:scale-110 dark:text-white/55 dark:hover:text-white light:text-ink-500 light:hover:text-ink-900'
                    : 'cursor-not-allowed dark:text-white/25 light:text-ink-300'
                } ${isCryPlaying ? 'text-orange-400' : ''}`}
              >
                {cryUrl ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              {cryUrl && (
                <audio
                  ref={audioRef}
                  src={cryUrl}
                  preload="none"
                  className="hidden"
                  onPlay={() => setIsCryPlaying(true)}
                  onEnded={() => setIsCryPlaying(false)}
                  onPause={() => setIsCryPlaying(false)}
                />
              )}
              <button
                type="button"
                onClick={() => setIsShiny((prev) => !prev)}
                aria-pressed={isShiny}
                aria-label={
                  isShiny ? 'Ver artwork normal' : 'Ver artwork shiny'
                }
                title={isShiny ? 'Ver artwork normal' : 'Ver artwork shiny'}
                className={`glass absolute right-4 top-4 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl transition-all duration-200 hover:scale-110 ${
                  isShiny ? 'text-amber-400' : 'dark:text-white/55 light:text-ink-500'
                }`}
              >
                <Sparkles size={18} className={isShiny ? 'fill-amber-400' : ''} />
              </button>
              {artwork ? (
                <img
                  src={artwork}
                  alt={isShiny ? `${data.name} shiny` : data.name}
                  className="animate-float-slow h-48 w-48 object-contain drop-shadow-[0_0_30px_rgba(234,88,12,0.35)] sm:h-56 sm:w-56"
                />
              ) : (
                <div className="h-48 w-48 rounded-full bg-white/5 sm:h-56 sm:w-56" />
              )}
            </div>

            {/* Altura / peso */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="glass-inset rounded-2xl p-4">
                <div className="flex items-center gap-2 dark:text-white/55 light:text-ink-600">
                  <Ruler size={14} />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Altura
                  </span>
                </div>
                <p className="mt-1 font-mono text-lg font-bold dark:text-orange-100 light:text-scarlet-700">
                  {formatHeight(data.height)}
                </p>
              </div>
              <div className="glass-inset rounded-2xl p-4">
                <div className="flex items-center gap-2 dark:text-white/55 light:text-ink-600">
                  <Weight size={14} />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Peso
                  </span>
                </div>
                <p className="mt-1 font-mono text-lg font-bold dark:text-orange-100 light:text-scarlet-700">
                  {formatWeight(data.weight)}
                </p>
              </div>
            </div>

            {/* Habilidades */}
            <div className="mt-6">
              <p className="text-sm font-medium uppercase tracking-wider dark:text-white/55 light:text-ink-600">
                Habilidades
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.abilities.map((slot) => (
                  <span
                    key={slot.ability.name}
                    className="glass rounded-full px-3 py-1 text-sm capitalize dark:text-white/80 light:text-ink-800"
                  >
                    {slot.ability.name.replace(/-/g, ' ')}
                    {slot.is_hidden && (
                      <span className="ml-1 dark:text-white/45 light:text-ink-500">(oculta)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Estadísticas base */}
            <div className="glass mt-6 rounded-2xl p-5">
              <p className="text-sm font-medium uppercase tracking-wider dark:text-white/55 light:text-ink-600">
                Estadísticas base
              </p>
              <div className="mt-2 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={statChartData} outerRadius="70%">
                    <PolarGrid stroke={gridColor} />
                    <PolarAngleAxis
                      dataKey="stat"
                      tick={{ fill: tickColor, fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      domain={[0, STAT_CHART_MAX]}
                      tick={false}
                      axisLine={false}
                    />
                    <Radar
                      dataKey="value"
                      stroke="#ea580c"
                      fill="#ea580c"
                      fillOpacity={0.35}
                      isAnimationActive={false}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {data.stats.map((stat, index) => (
                  <StatBar
                    key={stat.stat.name}
                    label={STAT_LABELS[stat.stat.name] ?? capitalize(stat.stat.name)}
                    value={stat.base_stat}
                    delayMs={index * 90}
                  />
                ))}
              </div>
            </div>

            {/* Movimientos */}
            <div className="glass mt-6 rounded-2xl p-5">
              <p className="text-sm font-medium uppercase tracking-wider dark:text-white/55 light:text-ink-600">
                Movimientos
              </p>
              {moves.length > 0 ? (
                <div className="mt-4 max-h-72 overflow-y-auto pr-1">
                  <ul className="flex flex-col divide-y divide-white/5">
                    {moves.map((move) => (
                      <li
                        key={move.name}
                        className="flex items-center justify-between gap-3 py-2 text-sm"
                      >
                        <span className="capitalize dark:text-white/80 light:text-ink-800">
                          {move.name.replace(/-/g, ' ')}
                        </span>
                        <span className="flex shrink-0 items-center gap-2 font-mono text-xs dark:text-white/55 light:text-ink-600">
                          {move.level !== null && <span>Nv. {move.level}</span>}
                          <span className="glass-inset rounded-full px-2 py-0.5 uppercase tracking-wider">
                            {move.method}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-sm dark:text-white/60 light:text-ink-600">
                  No hay movimientos disponibles para este Pokémon.
                </p>
              )}
            </div>

            {/* Cadena evolutiva */}
            <div className="glass mt-6 rounded-2xl p-5">
              <p className="text-sm font-medium uppercase tracking-wider dark:text-white/55 light:text-ink-600">
                Cadena evolutiva
              </p>
              <div className="mt-4">
                {isEvolutionLoading && (
                  <div className="flex flex-wrap gap-2">
                    <div className="h-24 w-24 animate-pulse rounded-2xl bg-white/10" />
                    <div className="h-24 w-24 animate-pulse rounded-2xl bg-white/10" />
                    <div className="h-24 w-24 animate-pulse rounded-2xl bg-white/10" />
                  </div>
                )}
                {isEvolutionError && !isEvolutionLoading && (
                  <p className="text-sm dark:text-white/60 light:text-ink-600">
                    No pudimos cargar la cadena evolutiva.
                  </p>
                )}
                {evolutionChain && (
                  <EvolutionChain chain={evolutionChain.chain} currentName={data.name} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
