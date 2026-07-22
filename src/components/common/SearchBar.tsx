import { useRef } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClear() {
    onChange('')
    // El botón "Limpiar búsqueda" desaparece del DOM al limpiar (se renderiza
    // condicionalmente), lo que dejaría el foco perdido en <body> para
    // usuarios de teclado/lector de pantalla. Lo devolvemos al input.
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <Search
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 dark:text-ink-400 light:text-ink-600"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por nombre..."
        aria-label="Buscar Pokémon por nombre"
        className="glass-inset w-full rounded-full py-2.5 pl-10 pr-9 text-sm outline-none transition-colors duration-200 focus:border-red-400/50
          dark:text-ink-50 dark:placeholder:text-ink-500 light:text-ink-900 light:placeholder:text-ink-500"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200
            dark:text-ink-400 dark:hover:text-ink-50 light:text-ink-600 light:hover:text-ink-900"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
