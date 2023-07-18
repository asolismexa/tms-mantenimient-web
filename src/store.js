import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import createReportFormSlice from './reducers/createReportFormSlice'
import uiReducer from './reducers/uiSlice'
import reportMonitorSlice from './reducers/reportMonitorSlice'
import { reportsQuerySlice } from './reducers/reportsQuerySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    createReportForm: createReportFormSlice,
    reportMonitor: reportMonitorSlice.reducer,
    reportsQuery: reportsQuerySlice.reducer,
  },
})
