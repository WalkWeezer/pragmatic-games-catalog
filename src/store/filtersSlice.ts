import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

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

export default filtersSlice.reducer
