import {
  getReportById,
  postReportObservation,
  updateReport,
} from '@/services/reports'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  dialog: {
    open: false,
  },
  confirmDialog: {
    open: false,
    title: '',
    message: ''
  },
  form: {
    status: null,
    observation: '',
    folio: '',
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

const updateReportStatus = createAsyncThunk(
  'updateReportStatus',
  async ({ status }, { rejectWithValue, getState }) => {
    const state = getState().reportDetail
    try {
      const resp = await updateReport({
        reportId: state.selectedReport.id,
        status_id: status,
        number: state.form.folio,
      })

      return resp.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue(error.response.message)
    }
  },
)

const createReportObservation = createAsyncThunk(
  'createReportObservation',
  async (data, { rejectWithValue }) => {
    console.log('data', data)
    try {
      const resp = await postReportObservation(data)
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
    selectReport: (state, { payload }) => {
      state.selectedReport = payload
    },
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
    openConfirmDialog: ({ confirmDialog }, { payload }) => {
      confirmDialog.open = true
      confirmDialog.message = payload.message
      confirmDialog.title = payload.title
    },
    closeConfirmDialog: ({ confirmDialog }) => {
      confirmDialog.open = false
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

    builder.addCase(updateReportStatus.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateReportStatus.fulfilled, (state, { payload }) => {
      return {
        ...initialState,
        selectedReport: payload,
        dialog: { open: true },
      }
    })
    builder.addCase(updateReportStatus.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      console.log('Ocurrio un error', payload)
    })
  },
})

export { fetchReportDetail, updateReportStatus, createReportObservation }
export const {
  toggleDialog,
  openDialog,
  closeDialog,
  openConfirmDialog,
  closeConfirmDialog,
  setForm,
  selectReport,
} = reportDetailSlice.actions
export const selectReportDetail = (state) => state.reportDetail
export default reportDetailSlice.reducer
