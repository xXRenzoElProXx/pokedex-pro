import { useEffect, useRef } from 'react'

/** Returns a ref to attach to a sentinel element. Calls `onIntersect` whenever
 *  that element scrolls into view, while `enabled` is true (e.g. there's more to load). */
export function useInfiniteScrollTrigger(onIntersect: () => void, enabled: boolean) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onIntersect()
      },
      { rootMargin: '480px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [onIntersect, enabled])

  return sentinelRef
}
