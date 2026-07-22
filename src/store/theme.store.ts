import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

function applyThemeClass(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Dark-first por defecto (design-system.md), igual que el `class="dark"`
      // que traía index.html antes de existir este store.
      theme: 'dark',
      toggleTheme: () => {
        const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
        applyThemeClass(next)
        set({ theme: next })
      },
    }),
    {
      name: 'pokedex-pro-theme',
      onRehydrateStorage: () => (state) => {
        // Sincroniza la clase en <html> con lo persistido apenas Zustand
        // rehidrata (cubre el caso en que el script anti-flash de
        // index.html no haya podido leer el storage).
        if (state) applyThemeClass(state.theme)
      },
    },
  ),
)
