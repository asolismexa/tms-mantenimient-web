import { getReportById, postReportObservation } from '@/services/reports'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  dialog: {
    open: false,
  },
  form: {
    status: null,
    observation: '',
  },
  selectedReport: null,
  loading: false,
  loadingObservations: false,
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

const createReportObservation = createAsyncThunk(
  'createReportObservation',
  async (data, { rejectWithValue }) => {
    console.log('data', data)
    try {
      const resp = await postReportObservation(data)
      console.log(resp)
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
    setForm: (state, { payload }) => {
      state.form = { ...state.form, ...payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReportDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchReportDetail.fulfilled, (state, { payload }) => {
      state.loading = false
      state.selectedReport = payload
      console.log(payload)
      state.form.status = {
        id: payload.status_id,
        name: payload.status,
      }
    })
    builder.addCase(fetchReportDetail.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      console.log('Ocurrio un error', payload)
    })

    builder.addCase(createReportObservation.pending, (state) => {
      state.loadingObservations = true
    })
    builder.addCase(createReportObservation.fulfilled, (state, { payload }) => {
      state.loadingObservations = false
      state.selectedReport.observations.push(payload)
      state.form.observation = ''
    })
    builder.addCase(createReportObservation.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      console.log('Ocurrio un error', payload)
    })
  },
})

export { fetchReportDetail, createReportObservation }
export const { toggleDialog, openDialog, closeDialog, setForm } =
  reportDetailSlice.actions
export const selectReportDetail = (state) => state.reportDetail
export default reportDetailSlice.reducer
