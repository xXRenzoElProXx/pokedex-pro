interface PokeballIconProps {
  className?: string
}

/** Brand mark used in the header and empty/error states. Pure SVG, themeable via currentColor. */
export function PokeballIcon({ className }: PokeballIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="21" fill="currentColor" className="text-ink-800" />
      <path d="M3 24a21 21 0 0 1 42 0" fill="currentColor" className="text-scarlet-500" />
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-ink-950"
      />
      <rect
        x="3"
        y="22.6"
        width="42"
        height="2.8"
        fill="currentColor"
        className="text-ink-950"
      />
      <circle
        cx="24"
        cy="24"
        r="7"
        fill="currentColor"
        className="text-ink-50"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle
        cx="24"
        cy="24"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-ink-950"
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" className="text-ink-950" />
    </svg>
  )
}
