import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sideBar: {
    open: false,
  },
  imageViewer: {
    open: false,
    src: null,
    name: '',
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
    openImageViewer(state, action) {
      console.log('Opening ', action.payload.name)
      state.imageViewer.open = true
      state.imageViewer.src = action.payload.src
      state.imageViewer.name = action.payload.name
    },
    closeImageViewer(state) {
      state.imageViewer.open = false
      state.imageViewer.src = null
    },
  },
})

export const selectSideBar = (state) => state.ui.sideBar
export const selectImageViewer = (state) => state.ui.imageViewer
export const {
  toggleSideBar,
  closeSideBar,
  openSideBar,
  openImageViewer,
  closeImageViewer,
} = uiSlice.actions
export default uiSlice.reducer
