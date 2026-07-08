import { useMemo } from 'react'
import { useGetGamesQuery } from '@/api/gamesApi'
import { useAppSelector } from '@/app/hooks'
import { GamesGrid } from '@/components/GamesGrid/GamesGrid'
import { GamesToolbar } from '@/components/GamesToolbar/GamesToolbar'
import { ProviderHeader } from '@/components/ProviderHeader/ProviderHeader'
import type { Game } from '@/types/game'
import styles from './HomePage.module.scss'

const filterGames = (
  games: Game[],
  searchQuery: string,
  gameTypeId: string,
) => {
  const query = searchQuery.trim().toLowerCase()

  return games.filter((game) => {
    const matchesType = gameTypeId === 'all' || game.gameTypeID === gameTypeId
    const matchesSearch =
      query.length === 0 ||
      game.gameName.toLowerCase().includes(query) ||
      game.gameID.toLowerCase().includes(query)

    return matchesType && matchesSearch
  })
}

export const HomePage = () => {
  const { data, isLoading, isError } = useGetGamesQuery()
  const appliedSearchQuery = useAppSelector(
    (state) => state.filters.appliedSearchQuery,
  )
  const gameTypeId = useAppSelector((state) => state.filters.gameTypeId)

  const games = data?.result

  const filteredGames = useMemo(() => {
    if (!games) {
      return []
    }

    return filterGames(games, appliedSearchQuery, gameTypeId)
  }, [games, appliedSearchQuery, gameTypeId])

  const resetKey = `${appliedSearchQuery}:${gameTypeId}`

  if (isLoading) {
    return <div className={styles.state}>Загрузка...</div>
  }

  if (isError) {
    return <div className={styles.state}>Не удалось загрузить игры</div>
  }

  return (
    <main className={styles.page}>
      <GamesToolbar games={games ?? []} />
      <ProviderHeader />
      <GamesGrid games={filteredGames} resetKey={resetKey} />
    </main>
  )
}
