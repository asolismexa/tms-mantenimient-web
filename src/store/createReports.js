import { create } from 'zustand'

const initialState = {
  vehicle: null,
  isDialogOpen: false
}

export const useCreateReportsStore = create((set) => ({
  ...initialState,
  openDialog: () => {
    set({ isDialogOpen: true })
  },
  closeDialog: () => {
    set({ isDialogOpen: false })
  },
  setVehicle: (vehicle) => {
    set({ vehicle })
  },
  resetState: () => {
    set(structuredClone(initialState))
  }
}))
