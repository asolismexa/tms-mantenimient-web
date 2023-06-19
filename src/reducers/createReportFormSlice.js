import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postReports } from '@/services/reports'

const initialState = {
  type: null,
  vehicle: null,
  driver: null,
  error: null,
  observation: '',
  loading: false,
  showForm: false,
}

export const createReport = createAsyncThunk(
  'createReportForm/createReport',
  async ({ form, evidences, location }, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('report_type_id', form.type.id)
    formData.append('vehicle_id', form.vehicle.id)
    formData.append('driver_id', form.driver.id)
    formData.append('observation', form.observation?.trim() || '')
    formData.append('lat', location.lat)
    formData.append('lon', location.lon)
    for (const evidence of evidences) {
      formData.append(evidence.name, evidence)
    }

    try {
      const { data } = await postReports({
        data: formData,
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  },
)

const createReportFormSlice = createSlice({
  name: 'createReportForm',
  initialState,
  reducers: {
    setForm: (state, { payload }) => {
      return { ...state, ...payload }
    },
    setError(state, { payload }) {
      state.error = payload
    },
    resetForm: () => {
      return initialState
    },
    showForm: (state) => {
      state.showForm = true
    },
    hideForm: (state) => {
      state.showForm = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createReport.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createReport.fulfilled, () => {
      return initialState
    })
    builder.addCase(createReport.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      console.log(payload)
    })
  },
})

export const { setForm, setError, resetForm, showForm, hideForm } =
  createReportFormSlice.actions
export const selectCreateReportForm = (state) => state.createReportForm
export default createReportFormSlice.reducer
