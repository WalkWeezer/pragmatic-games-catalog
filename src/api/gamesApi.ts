import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GamesListResponse } from '@/types/game'

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getGames: builder.query<GamesListResponse, void>({
      query: () => ({
        url: '/api/pragmatic/game/list',
        params: { partner_name: 'belparyaj' },
      }),
    }),
  }),
})

export const { useGetGamesQuery } = gamesApi
