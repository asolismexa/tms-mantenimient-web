import { createSlice } from '@reduxjs/toolkit'

export const loginDialogSlice = createSlice({
  name: 'loginDialog',
  initialState: {
    open: true,
    loading: true,
    error: false,
    errorMessage: '',
  },
  reducers: {
    openLoginDialog: (state) => {
      state.open = true
    },
    closeLoginDialog: (state) => {
      state.open = false
    },
  },
})

export const { openLoginDialog, closeLoginDialog } = loginDialogSlice.actions
export default loginDialogSlice.reducer
