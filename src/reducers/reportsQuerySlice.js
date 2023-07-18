import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchReports, fetchReportById } from '@/services/reports'

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
  detail: {
    open: false,
    report: null,
    loading: false,
    tab: 0,
  },
}

export const searchReports = createAsyncThunk(
  'searchReports',
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

export const fetchReportDetail = createAsyncThunk(
  'fetchReportDetail',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await fetchReportById(id)
      return resp
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
    setDetailTab: (state, action) => {
      state.detail.tab = action.payload
    },
    resetDetail: (state) => {
      state.detail = initialState.detail
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
    builder.addCase(fetchReportDetail.pending, (state) => {
      state.detail.open = false
      state.detail.report = null
      state.detail.loading = true
    })
    builder.addCase(fetchReportDetail.fulfilled, (state, action) => {
      state.detail.open = true
      state.detail.report = action.payload
      state.detail.loading = false
    })
    builder.addCase(fetchReportDetail.rejected, (state) => {
      state.detail.open = false
      state.detail.report = null
      state.detail.loading = false
    })
  },
})

export const { resetFilters, setFilters, setDetailTab, resetDetail } =
  reportsQuerySlice.actions
export const selectReportsQuery = (state) => state.reportsQuery
