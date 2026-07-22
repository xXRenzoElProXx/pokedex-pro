import { Container } from '@/components/ui/Container'

export function Footer() {
  return (
    <footer className="border-t py-6 dark:border-ink-800 light:border-ink-200">
      <Container className="flex flex-col items-center gap-1 text-center text-xs dark:text-ink-500 light:text-ink-600 sm:flex-row sm:justify-between sm:text-left">
        <p>Pokédex Pro.</p>
        <p>
          Datos provistos por{' '}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors dark:hover:text-scarlet-400 light:hover:text-scarlet-600"
          >
            PokéAPI
          </a>
          .
        </p>
      </Container>
    </footer>
  )
}
