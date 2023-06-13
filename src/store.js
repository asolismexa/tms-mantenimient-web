import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlicing'
import loadingDialogReducer from './reducers/loginDialogSlicing'

export const store = configureStore({
  reducer: {
    user: userReducer,
    loginDialog: loadingDialogReducer,
  },
})
