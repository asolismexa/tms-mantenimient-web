import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import createReportFormSlice from './reducers/createReportFormSlice'
import uiReducer from './reducers/uiSlice'
import reportDetailReducer from './reducers/reportDetail'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    createReportForm: createReportFormSlice,
    reportDetail: reportDetailReducer,
  },
})
