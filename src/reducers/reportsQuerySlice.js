import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchReports } from '@/services/reports'

const initialState = {
  filters: {
    folio: '',
    status: null,
    type: null,
    ot: '',
    vehicle: null,
    usuario: null,
    driver: null,
    from_time: null,
    to_time: null,
  },
  reports: [],
  loadingReports: false,
}

export const searchReports = createAsyncThunk(
  'fetchReportDetail',
  async (_, { getState, rejectWithValue }) => {
    const filters = getState().reportsQuery.filters
    try {
      const resp = await fetchReports({
        params: {
          id: filters.folio,
          status_id: filters.status?.id,
          type_id: filters.type?.id,
          ot_folio: filters.ot,
          vehicle: filters.vehicle?.id,
          user: filters.usuario,
          driver_id: filters.driver?.id,
          from_time: filters.from_time,
          to_time: filters.to_time,
        },
      })
      console.log(resp.data)
      return resp.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

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
  extraReducers: (builder) => {
    builder.addCase(searchReports.pending, (state) => {
      state.reports = []
      state.loadingReports = true
    })
    builder.addCase(searchReports.fulfilled, (state, action) => {
      state.reports = action.payload
      state.loadingReports = false
    })
    builder.addCase(searchReports.rejected, (state) => {
      state.reports = []
      state.loadingReports = false
    })
  },
})

export const { resetFilters, setFilters } = reportsQuerySlice.actions
export const selectReportsQuery = (state) => state.reportsQuery
