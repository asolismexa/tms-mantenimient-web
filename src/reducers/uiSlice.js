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
    openSideBar(state) {
      state.sideBar.open = true
    },
    closeSideBar(state) {
      state.sideBar.open = false
    },
  },
})

export const selectSideBar = (state) => state.ui.sideBar
export const { toggleSideBar, closeSideBar, openSideBar } = uiSlice.actions
export default uiSlice.reducer
