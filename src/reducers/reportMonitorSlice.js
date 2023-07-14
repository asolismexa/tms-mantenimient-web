import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    folio: '',
    status: 0,
  },
}

const reportMonitorSlice = createSlice({
  name: 'reportMonitor',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload
      console.log(state.filters)
    },
  },
})

export const { setFilters } = reportMonitorSlice.actions
export default reportMonitorSlice
