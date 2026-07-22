import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HelpCircle, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ROUTES } from '@/routes/paths'

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full
          dark:bg-ink-800 light:bg-ink-100"
      >
        <HelpCircle
          size={56}
          strokeWidth={1.5}
          className="dark:text-scarlet-500 light:text-scarlet-500"
        />
      </motion.div>

      <p className="font-mono text-sm tracking-widest dark:text-ink-400 light:text-ink-600">
        ERROR 404
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight dark:text-ink-50 light:text-ink-900 sm:text-4xl">
        Ese Pokémon no existe
      </h1>
      <p className="mt-3 max-w-sm text-sm dark:text-ink-400 light:text-ink-600">
        La página que buscas no está en esta Pokédex. Puede que el nombre esté mal escrito
        o que la ruta ya no exista.
      </p>

      <Link
        to={ROUTES.home}
        className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full
          bg-gradient-to-r from-scarlet-600 to-scarlet-500 px-5 py-2.5 text-sm font-semibold
          text-white shadow-lg shadow-scarlet-600/25 transition-transform duration-200 hover:scale-105"
      >
        <ArrowLeft size={16} />
        Volver al inicio
      </Link>
    </Container>
  )
}
