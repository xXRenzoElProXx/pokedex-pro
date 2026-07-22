import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { BackgroundBlobs } from '@/components/common/BackgroundBlobs'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'

export function MainLayout() {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  // Simple, reliable fade-in on route change (no AnimatePresence).
  // AnimatePresence's exit lifecycle combined with React 18 StrictMode's
  // double-invoked effects was causing the first navigation click to leave
  // the page mid-transition — a second click was needed to "unstick" it.
  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    el.style.animation = 'none'
    // Force reflow so the animation restarts on every route change.
    void el.offsetHeight
    el.style.animation = ''
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundBlobs />
      <Header />
      <main ref={mainRef} className="flex-1 animate-page-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
