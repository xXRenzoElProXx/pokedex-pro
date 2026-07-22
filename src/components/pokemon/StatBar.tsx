interface StatBarProps {
  label: string
  value: number
  max?: number
  delayMs?: number
}

/** Base-stat row styled per `design-system.md`: glass-inset track, gradiente
 *  rojo→naranja como thumb/fill, y el valor en font-mono con glow. */
export function StatBar({ label, value, max = 180, delayMs = 0 }: StatBarProps) {
  const pct = Math.max(4, Math.min(100, Math.round((value / max) * 100)))

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-sm font-medium uppercase tracking-wider dark:text-white/55 light:text-ink-600 sm:w-28">
        {label}
      </span>
      <div className="glass-inset relative h-2.5 flex-1 overflow-hidden rounded-full">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-600 transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className="animate-char-reveal w-9 shrink-0 text-right font-mono font-bold dark:text-orange-100 light:text-scarlet-700"
        style={{
          animationDelay: `${Math.min(delayMs, 260)}ms`,
          textShadow: '0 0 18px rgba(251,146,60,0.55), 0 0 4px rgba(0,0,0,0.6)',
        }}
      >
        {value}
      </span>
    </div>
  )
}
