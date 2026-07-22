import { Heart } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/common/EmptyState'
import { PokemonCard } from '@/components/pokemon/PokemonCard'
import { useFavoritesStore } from '@/store/favorites.store'

export function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites)

  return (
    <Container className="py-10">
      <p className="font-mono text-xs uppercase tracking-widest dark:text-ink-500 light:text-ink-600">
        Tu colección
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight dark:text-ink-50 light:text-ink-900 sm:text-4xl">
        Favoritos
      </h1>
      <p className="mt-3 max-w-xl text-sm dark:text-ink-400 light:text-ink-600">
        {favorites.length > 0
          ? `${favorites.length} Pokémon guardados.`
          : 'Aún no guardaste ningún Pokémon.'}
      </p>

      <div className="mt-8">
        {favorites.length === 0 ? (
          <EmptyState
            icon={<Heart size={26} />}
            title="Sin favoritos todavía"
            description="Toca el corazón en cualquier tarjeta de la Pokédex para guardarla aquí."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {favorites.map((name) => (
              <PokemonCard key={name} name={name} />
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}
