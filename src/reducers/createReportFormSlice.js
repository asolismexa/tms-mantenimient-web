import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/api/api'
import dayjs from 'dayjs'

const initialState = {
  type: null,
  vehicle: null,
  driver: null,
  error: null,
  observation: '',
  loading: false,
}

export const createReport = createAsyncThunk(
  'createReportForm/createReport',
  async ({ form, evidences, token, location }, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('report_type_id', form.type.id)
    formData.append('vehicle_id', form.vehicle.id)
    formData.append('driver_id', form.driver.id)
    formData.append('observation', form.observation?.trim() || '')
    formData.append('number', 1)
    formData.append('lat', location.lat)
    formData.append('lon', location.lon)
    formData.append('time', dayjs.utc().format('YYYY-MM-DD HH:mm:ss.SSS'))
    for (const evidence of evidences) {
      formData.append(evidence.name, evidence)
    }

    try {
      const resp = await api.post('/api/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      return resp.data
    } catch (err) {
      if (err.response) {
        if (err.response.status == 500) {
          rejectWithValue(
            'Ah ocurrido un error por favor contacte al administrador.',
          )
        }
      }
      return rejectWithValue(err.message)
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
  },
  extraReducers: (builder) => {
    builder.addCase(createReport.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createReport.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      console.log(payload)
    })
    builder.addCase(createReport.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      console.log(payload)
    })
  },
})

export const { setForm, setError, resetForm } = createReportFormSlice.actions
export const selectCreateReportForm = (state) => state.createReportForm
export default createReportFormSlice.reducer
