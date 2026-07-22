import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full dark:bg-ink-800 light:bg-ink-100">
        <span className="dark:text-ink-400 light:text-ink-600">{icon}</span>
      </div>
      <h3 className="font-display text-lg font-semibold dark:text-ink-50 light:text-ink-900">
        {title}
      </h3>
      <p className="max-w-xs text-sm dark:text-ink-400 light:text-ink-600">
        {description}
      </p>
    </div>
  )
}
