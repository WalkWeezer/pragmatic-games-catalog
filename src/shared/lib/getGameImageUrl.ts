import { GAME_IMAGE_BASE_URL } from '@/shared/config/constants'

export const getGameImageUrl = (gameId: string): string =>
  `${GAME_IMAGE_BASE_URL}/${gameId}.png`
