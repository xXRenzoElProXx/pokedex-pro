import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavoritesStore } from '@/store/favorites.store'

interface FavoriteButtonProps {
  name: string
  className?: string
}

export function FavoriteButton({ name, className = '' }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((state) => state.favorites.includes(name))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(name)
      }}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite ? `Quitar ${name} de favoritos` : `Agregar ${name} a favoritos`
      }
      className={`flex cursor-pointer items-center justify-center rounded-full p-2 backdrop-blur-sm transition-colors duration-200
        dark:bg-ink-900/70 dark:hover:bg-ink-800
        light:bg-white/85 light:hover:bg-white ${className}`}
    >
      <motion.span
        key={isFavorite ? 'on' : 'off'}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 16 }}
        className="flex"
      >
        <Heart
          size={16}
          className={
            isFavorite
              ? 'fill-scarlet-500 text-scarlet-500'
              : 'dark:text-ink-300 light:text-ink-600'
          }
        />
      </motion.span>
    </button>
  )
}
