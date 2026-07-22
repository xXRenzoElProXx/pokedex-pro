import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppRoutes } from '@/routes/AppRoutes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/** Las Devtools de React Query solo se montan cuando el usuario las pide
 *  (Ctrl/Cmd + Shift + Q). Así no queda el botón flotante tapando la UI en
 *  modo desarrollo, pero siguen disponibles para depurar cuando hacen falta. */
function useDevtoolsToggle() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (!import.meta.env.DEV) return

    function handleKeyDown(event: KeyboardEvent) {
      const isToggleShortcut =
        (event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === 'q'
      if (isToggleShortcut) {
        event.preventDefault()
        setIsEnabled((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return isEnabled
}

function App() {
  const isDevtoolsEnabled = useDevtoolsToggle()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      {import.meta.env.DEV && isDevtoolsEnabled && <ReactQueryDevtools initialIsOpen />}
    </QueryClientProvider>
  )
}

export default App
