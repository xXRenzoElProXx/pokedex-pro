import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: string[]
  toggleFavorite: (name: string) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (name) =>
        set((state) => ({
          favorites: state.favorites.includes(name)
            ? state.favorites.filter((favorite) => favorite !== name)
            : [...state.favorites, name],
        })),
    }),
    { name: 'pokedex-pro-favorites' },
  ),
)
