import { createSlice } from '@reduxjs/toolkit'

export const loginDialogSlice = createSlice({
  name: 'loginDialog',
  initialState: {
    open: false,
    loading: false,
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
    setLoading: (state) => {
      state.loading = true
    },
  },
})

export const { openLoginDialog, closeLoginDialog, setLoading } =
  loginDialogSlice.actions
export default loginDialogSlice.reducer
