import { POKEMON_TYPES, getTypeColor, getTypeLabel } from '@/utils/pokemonTypes'

interface TypeFilterProps {
  value: string | null
  onChange: (type: string | null) => void
}

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
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
        Todos
      </button>

      {POKEMON_TYPES.map((type) => {
        const active = value === type
        const color = getTypeColor(type)
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(active ? null : type)}
            aria-pressed={active}
            className="cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200"
            style={
              active
                ? { backgroundColor: color, borderColor: color, color: '#fff' }
                : { borderColor: `${color}66`, color }
            }
          >
            {getTypeLabel(type)}
          </button>
        )
      })}
    </div>
  )
}
