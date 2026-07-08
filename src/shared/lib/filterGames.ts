import type { Game } from '@/types/game'

interface FilterGamesParams {
  games: Game[]
  searchQuery: string
  gameTypeId: string
}

export const filterGames = ({
  games,
  searchQuery,
  gameTypeId,
}: FilterGamesParams): Game[] => {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return games.filter((game) => {
    const matchesType = gameTypeId === 'all' || game.gameTypeID === gameTypeId
    const matchesSearch =
      normalizedQuery.length === 0 ||
      game.gameName.toLowerCase().includes(normalizedQuery) ||
      game.gameID.toLowerCase().includes(normalizedQuery)

    return matchesType && matchesSearch
  })
}
