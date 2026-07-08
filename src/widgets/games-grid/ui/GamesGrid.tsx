import { useMemo } from 'react'
import { GameCard } from '@/entities/game/ui/GameCard'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import type { Game } from '@/types/game'
import styles from './GamesGrid.module.scss'

interface GamesGridProps {
  games: Game[]
  resetKey: string
}

export const GamesGrid = ({ games, resetKey }: GamesGridProps) => {
  const { visibleCount, sentinelRef, hasMore } = useInfiniteScroll({
    totalItems: games.length,
    resetKey,
  })

  const visibleGames = useMemo(
    () => games.slice(0, visibleCount),
    [games, visibleCount],
  )

  if (games.length === 0) {
    return <p className={styles.empty}>No games found</p>
  }

  return (
    <section className={styles.section} aria-label="Games list">
      <ul className={styles.grid}>
        {visibleGames.map((game) => (
          <li key={game.gameID} className={styles.item}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      )}
    </section>
  )
}
