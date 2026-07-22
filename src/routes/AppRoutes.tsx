import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { PokemonDetailPage } from '@/pages/PokemonDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
