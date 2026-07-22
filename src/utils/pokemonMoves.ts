import type { PokemonMoveSlot } from '@/types/pokemon.types'

/** Spanish labels for the PokéAPI move-learn methods. */
export const MOVE_METHOD_LABELS: Record<string, string> = {
  'level-up': 'Nivel',
  machine: 'MT/MO',
  egg: 'Cría',
  tutor: 'Tutor',
}

export interface DisplayMove {
  name: string
  method: string
  level: number | null
}

/** Cada movimiento trae un `version_group_details` por cada juego en el que
 *  puede aprenderse; sin filtrar, un Pokémon con muchas generaciones muestra
 *  el mismo movimiento repetido decenas de veces. Nos quedamos con el grupo
 *  de versión más reciente: como la PokeAPI lista los juegos en orden
 *  cronológico dentro de cada movimiento, el último `version_group` que
 *  aparece en todo el arreglo corresponde al juego más nuevo. */
function getLatestVersionGroup(moves: PokemonMoveSlot[]): string | null {
  let latest: string | null = null
  for (const moveSlot of moves) {
    for (const detail of moveSlot.version_group_details) {
      latest = detail.version_group.name
    }
  }
  return latest
}

/** Devuelve un movimiento por entrada (sin duplicados), del juego más
 *  reciente disponible, ordenado por nivel de aprendizaje y luego alfabético
 *  para los que se aprenden por MT/cría/tutor. */
export function getMovesForLatestVersion(moves: PokemonMoveSlot[]): DisplayMove[] {
  const latestGroup = getLatestVersionGroup(moves)
  if (!latestGroup) return []

  const result: DisplayMove[] = []

  for (const moveSlot of moves) {
    const detail = moveSlot.version_group_details.find(
      (versionDetail) => versionDetail.version_group.name === latestGroup,
    )
    if (!detail) continue

    const isLevelUp = detail.move_learn_method.name === 'level-up'
    result.push({
      name: moveSlot.move.name,
      method: MOVE_METHOD_LABELS[detail.move_learn_method.name] ?? detail.move_learn_method.name,
      level: isLevelUp ? detail.level_learned_at : null,
    })
  }

  return result.sort((a, b) => {
    if (a.level !== null && b.level !== null) return a.level - b.level
    if (a.level !== null) return -1
    if (b.level !== null) return 1
    return a.name.localeCompare(b.name)
  })
}
