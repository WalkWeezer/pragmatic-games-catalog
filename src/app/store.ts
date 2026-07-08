import { configureStore } from '@reduxjs/toolkit'
import { gamesApi } from '@/api/gamesApi'
import filtersReducer from '@/store/filtersSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
