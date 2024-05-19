import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  order: null,
  isDetailOpen: false,
  detailTab: 0,
}

export const ordersSlice = createSlice({
  name: 'ordersReducer',
  initialState,
  reducers: {
    changeDetailTab: (state, { payload }) => {
      state.detailTab = payload
    },
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
    changeOrderStatus: (state, { payload }) => {
      state.order.EstatusId = payload
    },
  },
})

export default ordersSlice.reducer
export const {
  openDetail,
  setOrder,
  closeDetail,
  changeDetailTab,
  changeOrderStatus,
} = ordersSlice.actions
