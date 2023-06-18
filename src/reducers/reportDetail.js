import { getReportById } from '@/services/reports'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  dialog: {
    open: false,
  },
  form: {},
  selectedReport: null,
  loading: false,
  error: null,
}

const fetchReportDetail = createAsyncThunk(
  'fetchReportDetail',
  async ({ reportId }, { rejectWithValue }) => {
    try {
      const resp = await getReportById(reportId, null)
      return resp.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const reportDetailSlice = createSlice({
  name: 'reportDetail',
  initialState,
  reducers: {
    openDialog: ({ dialog }) => {
      dialog.open = true
    },
    closeDialog: () => {
      return initialState
    },
    toggleDialog: ({ dialog }) => {
      dialog.open = !dialog.open
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReportDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchReportDetail.fulfilled, (state, { payload }) => {
      state.loading = false
      state.selectedReport = payload
    })
    builder.addCase(fetchReportDetail.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      console.log('Ocurrio un error', payload)
    })
  },
})

export { fetchReportDetail }
export const { toggleDialog, openDialog, closeDialog } =
  reportDetailSlice.actions
export const selectReportDetail = (state) => state.reportDetail
export default reportDetailSlice.reducer
