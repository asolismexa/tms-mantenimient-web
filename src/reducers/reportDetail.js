import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dialog: {
    open: false,
  },
  form: {},
}

const reportDetailSlice = createSlice({
  name: 'reportDetail',
  initialState,
  reducers: {
    openDialog: ({ dialog }) => {
      dialog.open = true
    },
    closeDialog: ({ dialog }) => {
      dialog.open = false
    },
    toggleDialog: ({ dialog }) => {
      dialog.open = !dialog.open
    },
  },
})

export const { toggleDialog, openDialog, closeDialog } =
  reportDetailSlice.actions
export const selectReportDetail = (state) => state.reportDetail
export default reportDetailSlice.reducer
