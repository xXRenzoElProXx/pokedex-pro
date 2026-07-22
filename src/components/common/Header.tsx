import { NavLink } from 'react-router-dom'
import { Heart, Moon, Sun } from 'lucide-react'
import { PokeballIcon } from '@/components/ui/PokeballIcon'
import { Container } from '@/components/ui/Container'
import { useFavoritesStore } from '@/store/favorites.store'
import { useThemeStore } from '@/store/theme.store'
import { ROUTES } from '@/routes/paths'

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors duration-200 sm:px-3',
    isActive
      ? 'dark:bg-scarlet-500/15 dark:text-scarlet-400 light:bg-scarlet-50 light:text-scarlet-600'
      : 'dark:text-ink-300 dark:hover:text-ink-50 light:text-ink-600 light:hover:text-ink-900',
  ].join(' ')

export function Header() {
  const favoritesCount = useFavoritesStore((state) => state.favorites.length)
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <header
      className="sticky top-0 z-20 border-b backdrop-blur-lg
        dark:border-ink-800 dark:bg-ink-950/80 light:border-ink-200 light:bg-parchment-100/80"
    >
      <Container className="flex h-16 items-center justify-between">
        <NavLink to={ROUTES.home} className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <PokeballIcon className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
          <span className="truncate font-display text-base font-bold tracking-tight dark:text-ink-50 light:text-ink-900 sm:text-lg">
            Pokédex{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Pro
            </span>
          </span>
        </NavLink>

        <nav className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <NavLink to={ROUTES.home} end className={navLinkClasses}>
            Inicio
          </NavLink>
          <NavLink to={ROUTES.favorites} className={navLinkClasses}>
            <Heart size={14} />
            <span className="hidden sm:inline">Favoritos</span>
            {favoritesCount > 0 && (
              <span className="rounded-full bg-scarlet-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                {favoritesCount}
              </span>
            )}
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === 'light'}
            aria-label={
              theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
            }
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200
              dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50
              light:text-ink-600 light:hover:bg-ink-100 light:hover:text-ink-900"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </Container>
    </header>
  )
}
