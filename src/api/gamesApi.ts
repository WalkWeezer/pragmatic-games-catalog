import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, PARTNER_NAME } from '@/shared/config/constants'
import type { GamesListResponse } from '@/types/game'

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getGames: builder.query<GamesListResponse, void>({
      query: () => ({
        url: API_BASE_URL,
        params: { partner_name: PARTNER_NAME },
      }),
    }),
  }),
})

export const { useGetGamesQuery } = gamesApi
