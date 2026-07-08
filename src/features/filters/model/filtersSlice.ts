import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

interface FiltersState {
  searchQuery: string
  appliedSearchQuery: string
  gameTypeId: string
}

const initialState: FiltersState = {
  searchQuery: '',
  appliedSearchQuery: '',
  gameTypeId: 'all',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    applySearch: (state) => {
      state.appliedSearchQuery = state.searchQuery.trim()
    },
    setGameTypeId: (state, action: PayloadAction<string>) => {
      state.gameTypeId = action.payload
    },
  },
})

export const { setSearchQuery, applySearch, setGameTypeId } =
  filtersSlice.actions

export const selectSearchQuery = (state: RootState) => state.filters.searchQuery
export const selectAppliedSearchQuery = (state: RootState) =>
  state.filters.appliedSearchQuery
export const selectGameTypeId = (state: RootState) => state.filters.gameTypeId

export default filtersSlice.reducer
