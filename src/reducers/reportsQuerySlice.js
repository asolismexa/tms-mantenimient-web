import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    folio: '',
    date: {
      from: null,
      to: null,
    },
    status: null,
    type: null,
  },
}

export const reportsQuerySlice = createSlice({
  name: 'reportsQuery',
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },
  },
})

export const { resetFilters, setFilters } = reportsQuerySlice.actions
export const selectReportsQuery = (state) => state.reportsQuery
