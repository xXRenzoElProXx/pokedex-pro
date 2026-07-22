interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg dark:bg-ink-800 light:bg-ink-200 ${className}`}
    />
  )
}
