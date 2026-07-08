import { useMemo } from 'react'
import { GameCard } from '@/components/GameCard/GameCard'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Game } from '@/types/game'
import styles from './GamesGrid.module.scss'

interface GamesGridProps {
  games: Game[]
  resetKey: string
}

export const GamesGrid = ({ games, resetKey }: GamesGridProps) => {
  const { visibleCount, sentinelRef, hasMore } = useInfiniteScroll(
    games.length,
    resetKey,
  )

  const visibleGames = useMemo(
    () => games.slice(0, visibleCount),
    [games, visibleCount],
  )

  if (games.length === 0) {
    return <p className={styles.empty}>Ничего не найдено</p>
  }

  return (
    <section className={styles.section}>
      <ul className={styles.grid}>
        {visibleGames.map((game) => (
          <li key={game.gameID} className={styles.item}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>

      {hasMore && <div ref={sentinelRef} className={styles.sentinel} />}
    </section>
  )
}
