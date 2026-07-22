import { getTypeColor, getTypeLabel } from '@/utils/pokemonTypes'

interface TypeBadgeProps {
  type: string
  size?: 'sm' | 'md'
}

export function TypeBadge({ type, size = 'sm' }: TypeBadgeProps) {
  const color = getTypeColor(type)

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold tracking-wide text-white ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
      }`}
      style={{ backgroundColor: color, textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}
    >
      {getTypeLabel(type)}
    </span>
  )
}
