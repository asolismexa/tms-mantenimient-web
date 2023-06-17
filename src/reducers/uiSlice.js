import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sideBar: {
    open: false,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.sideBar.open = !state.sideBar.open
    },
  },
})

export const selectSideBar = (state) => state.ui.sideBar
export const { toggleSideBar } = uiSlice.actions
export default uiSlice.reducer
