import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import createReportFormSlice from './reducers/createReportFormSlice'
import uiReducer from './reducers/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createReportForm: createReportFormSlice,
    ui: uiReducer,
  },
})
