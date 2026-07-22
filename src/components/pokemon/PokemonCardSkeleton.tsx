import { Skeleton } from '@/components/ui/Skeleton'

export function PokemonCardSkeleton() {
  return (
    <div className="glass flex flex-col rounded-2xl p-4">
      <Skeleton className="h-3 w-10" />
      <Skeleton className="mx-auto mt-2 aspect-square w-full max-w-28 rounded-full" />
      <Skeleton className="mx-auto mt-3 h-4 w-20" />
      <div className="mt-2.5 flex justify-center gap-1.5">
        <Skeleton className="h-4 w-12 rounded-full" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
    </div>
  )
}
