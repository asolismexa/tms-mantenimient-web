import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    folio: '',
    status: '',
    date: '',
    vehicle: '',
    vehicleType: '',
    odometer: '',
    driver: '',
    shipment: '',
    ot: '',
    reportType: '',
    user: '',
    userAssign: '',
    userProcess: '',
    cell: '',
  },
}

const reportMonitorSlice = createSlice({
  name: 'reportMonitor',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload
    },
  },
})

export const { setFilters } = reportMonitorSlice.actions
export const selectFilters = (state) => state.reportMonitor.filters
export default reportMonitorSlice
