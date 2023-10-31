import { fetchVehicleDetail } from '@/services/vehicles'
import { create } from 'zustand'

const initialState = {
  vehicle: null,
  detail: null,
  isDialogOpen: false,
  loadingVehicleDetail: false
}

export const useCreateReportsStore = create((set) => ({
  ...initialState,
  openDialog: () => {
    set({ isDialogOpen: true })
  },
  closeDialog: () => {
    set({ isDialogOpen: false })
  },
  selectVehicle: (vehicle) => {
    if (!vehicle) {
      set({ vehicle: null, detail: null })
      return
    }
    set({ vehicle, loadingVehicleDetail: true })
    fetchVehicleDetail(vehicle.id)
      .then((data) => set({ detail: data }))
      .finally(() => set({ loadingVehicleDetail: false }))
  },
  resetState: () => {
    set(structuredClone(initialState))
  }
}))
