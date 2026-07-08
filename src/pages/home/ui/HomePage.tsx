import { useMemo } from 'react'
import { useGetGamesQuery } from '@/api/gamesApi'
import { useAppSelector } from '@/app/hooks'
import {
  selectAppliedSearchQuery,
  selectGameTypeId,
} from '@/features/filters/model/filtersSlice'
import { filterGames } from '@/shared/lib/filterGames'
import { GamesGrid } from '@/widgets/games-grid'
import { GamesToolbar } from '@/widgets/games-toolbar'
import { ProviderHeader } from '@/widgets/provider-header'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  const { data, isLoading, isError } = useGetGamesQuery()
  const appliedSearchQuery = useAppSelector(selectAppliedSearchQuery)
  const gameTypeId = useAppSelector(selectGameTypeId)

  const games = data?.result

  const filteredGames = useMemo(() => {
    if (!games) {
      return []
    }

    return filterGames({
      games,
      searchQuery: appliedSearchQuery,
      gameTypeId,
    })
  }, [games, appliedSearchQuery, gameTypeId])

  const resetKey = `${appliedSearchQuery}:${gameTypeId}`

  if (isLoading) {
    return <div className={styles.state}>Loading games...</div>
  }

  if (isError) {
    return <div className={styles.state}>Failed to load games. Please try again.</div>
  }

  return (
    <main className={styles.page}>
      <GamesToolbar games={games ?? []} />
      <ProviderHeader />
      <GamesGrid games={filteredGames} resetKey={resetKey} />
    </main>
  )
}
