import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  order: null,
  isDetailOpen: false,
}

export const ordersSlice = createSlice({
  name: 'ordersReducer',
  initialState,
  reducers: {
    openDetail: (state, { payload }) => {
      state.isDetailOpen = true
      state.order = payload
    },
    closeDetail: (state) => {
      state.isDetailOpen = false
      state.order = null
    },
    setOrder: (state, { payload }) => {
      state.order = payload
    },
  },
})

export default ordersSlice.reducer
export const { openDetail, setOrder, closeDetail } = ordersSlice.actions
